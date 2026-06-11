import { useEffect, useState } from 'react'

// The assignment uses 768px as the layout breakpoint because it is a common
// teaching-friendly boundary between a compact phone/tablet-style layout and a
// fuller laptop/desktop-style layout. Keeping the value in one exported constant
// prevents the hook, helpers, preview, Live Test Results panel, and Vitest tests
// from drifting into different breakpoint rules.
export const MOBILE_BREAKPOINT = 768

export function getViewportMode(width) {
  // This helper is intentionally small and pure: it receives a value, returns a
  // label, and does not read the browser directly. That makes the breakpoint rule
  // easy to test with Vitest because tests can pass exact numbers like 767, 768,
  // 0, or an invalid value without resizing the real browser window.
  if (!Number.isFinite(width) || width < 0) {
    // Browser measurements should normally be finite, non-negative numbers.
    // Returning "Unknown" gives the UI and tests a safe state for malformed input
    // instead of pretending a bad value is a real phone or laptop width.
    return 'Unknown'
  }

  // Widths below the breakpoint use the compact layout. Widths equal to or above
  // the breakpoint use the full layout. The exact 768px boundary matters because
  // it is one of the edge cases the tests should protect.
  return width < MOBILE_BREAKPOINT ? 'Mobile' : 'Full'
}

export function buildStreamingLayoutProfile({ width, height }) {
  // The preview component needs more than the raw width and height. It needs a
  // teaching-friendly profile that explains which layout should appear, how many
  // columns it should use, and what recommendation the streaming site should show.
  // This helper keeps that decision logic outside the JSX so it can be tested on
  // its own and reused by the Live Test Results panel.
  const mode = getViewportMode(width)

  if (mode === 'Unknown') {
    // Unknown data should still produce a complete object. Returning the same
    // shape as the normal profiles lets the UI render safely without checking for
    // missing properties before every line of JSX.
    return {
      width,
      height,
      mode,
      layoutName: 'Unknown viewport',
      columns: 0,
      playerPlacement: 'Waiting for browser size information',
      recommendation: 'Read the browser window before choosing a layout.',
      chartValue: 0,
    }
  }

  const isMobile = mode === 'Mobile'

  return {
    width,
    height,
    mode,
    layoutName: isMobile ? 'Compact phone layout' : 'Full laptop layout',
    columns: isMobile ? 1 : 3,
    playerPlacement: isMobile
      ? 'Video player appears above compact title and action controls.'
      : 'Video player appears beside details, recommendations, and playback tools.',
    recommendation: isMobile
      ? 'Use larger tap targets, stacked content, and less side information.'
      : 'Use wider panels, richer metadata, and multi-column recommendations.',

    // The chart value is a simple visual scale for the GUI. It is clamped between
    // 0 and 100 so extremely small or extremely large widths cannot make the bar
    // overflow its container. The 1440px divisor is not part of the hook itself;
    // it is only a preview/reporting choice for a readable chart.
    chartValue: Math.max(0, Math.min(100, Math.round((width / 1440) * 100))),
  }
}

export function readBrowserWindowSize(browserWindow = globalThis.window) {
  // The hook runs in the browser, but tests may execute in jsdom or in a context
  // where a window-like object is passed manually. Accepting browserWindow as a
  // parameter keeps this read function testable and prevents the code from being
  // tightly coupled to one global object.
  if (!browserWindow) {
    // A defensive fallback keeps the hook from crashing if it is evaluated in a
    // non-browser environment. Returning zeros is safer than returning undefined
    // because consuming components can still render width and height numbers.
    return { width: 0, height: 0 }
  }

  return {
    // innerWidth and innerHeight describe the viewport area available to the page.
    // They are the values that change when the user resizes the browser window,
    // rotates a device, or changes the available browser viewport.
    width: browserWindow.innerWidth,
    height: browserWindow.innerHeight,
  }
}

export function useWindowSize() {
  // A custom hook is a normal JavaScript function that follows React's hook rules.
  // The name must start with "use" because React tooling treats that naming pattern
  // as a signal that this function may call other hooks such as useState/useEffect.
  // That naming rule protects hook order and helps ESLint catch incorrect usage.
  //
  // The reason this hook exists is reuse: without it, every component that needs
  // browser width/height would have to create the same state, add the same resize
  // listener, and remember the same cleanup logic. Packaging the behavior here
  // gives every component one reliable import: useWindowSize().
  const [size, setSize] = useState(() => {
    // Passing a function to useState creates a lazy initializer. React calls this
    // function only during the first render, not on every re-render. That is useful
    // here because reading window.innerWidth/window.innerHeight is an initial setup
    // step, not something we need to repeat while React is reconciling unchanged UI.
    //
    // This also avoids a visual "unknown size" flash in normal browser usage. The
    // component starts with the current viewport dimensions before any resize event
    // has occurred.
    return readBrowserWindowSize()
  })

  useEffect(() => {
    // useEffect is the correct place to synchronize React with systems outside of
    // React. The browser resize event is external: React does not own it, and it
    // will not automatically update component state when the window changes size.
    // The effect runs after mount and creates the bridge between the browser event
    // and React state.
    function handleResize() {
      // Every time the browser fires a resize event, this handler reads the current
      // viewport dimensions and stores them in React state. Calling setSize tells
      // React that the hook's value changed, so any component using this hook will
      // re-render with the fresh width and height.
      //
      // The state object is replaced rather than mutated. React state updates should
      // provide a new value so React can schedule rendering correctly and consumers
      // receive a clean snapshot of the latest browser dimensions.
      setSize(readBrowserWindowSize())
    }

    // Calling the handler once inside the effect closes a small timing gap. If the
    // viewport changes between the first render and the effect setup, this call
    // refreshes the state immediately. It is also helpful in tests because a test
    // can adjust innerWidth before the component mounts and then assert that the
    // mounted hook reflects that value.
    handleResize()

    // Register the event listener with the exact function reference that cleanup
    // will later remove. addEventListener does not create a React subscription; it
    // attaches a browser-level listener, so React will not remove it automatically.
    window.addEventListener('resize', handleResize)

    return () => {
      // Cleanup is required for correctness and memory safety. When the component
      // using this hook unmounts, the old listener must be removed so it does not
      // continue running after the UI that created it is gone.
      //
      // Without cleanup, repeated mounting/unmounting could stack duplicate resize
      // listeners. That would cause extra setState calls, confusing test results,
      // unnecessary re-renders, and possible memory leaks because old closures stay
      // connected to the browser event system.
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // The empty dependency array means the effect has a single mount/unmount lifecycle.
  // That is appropriate because handleResize reads from window at event time and does
  // not depend on changing props or local variables. Reattaching the listener on every
  // render would be wasteful and could accidentally create duplicate subscriptions if
  // cleanup logic were ever changed incorrectly.
  return size
}
