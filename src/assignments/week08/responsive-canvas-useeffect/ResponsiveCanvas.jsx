import { useEffect, useMemo, useState } from 'react'

// -----------------------------------------------------------------------------
// Shared responsive rule
// -----------------------------------------------------------------------------
// The assignment asks the component to switch between Mobile and Desktop modes.
// A common beginner mistake is to place the breakpoint number directly inside
// several different functions, JSX blocks, and tests. That creates maintenance
// drift because one part of the app may say "768px" while another part secretly
// checks a different number.
//
// By storing the breakpoint in one exported constant, the rendered component,
// helper functions, Live Test Results panel, and Vitest tests all read the same
// source of truth.
export const DESKTOP_BREAKPOINT = 768

// -----------------------------------------------------------------------------
// Helper: decide whether a width is Mobile or Desktop
// -----------------------------------------------------------------------------
// This function performs the smallest possible responsive decision:
//   - widths below 768 are Mobile
//   - widths at 768 or higher are Desktop
//
// Keeping this logic outside the component makes it easy to test the breakpoint
// rule directly without rendering React. That is useful because responsive bugs
// often happen at boundary values such as 767px and 768px.
export function getViewportMode(width) {
  return width < DESKTOP_BREAKPOINT ? 'Mobile' : 'Desktop'
}

// -----------------------------------------------------------------------------
// Helper: convert the mode decision into UI copy/design metadata
// -----------------------------------------------------------------------------
// React components become harder to maintain when JSX is filled with repeated
// ternary expressions such as:
//
//   mode === 'Mobile' ? '...' : '...'
//
// This helper centralizes the descriptive labels used by the canvas. The render
// section can then focus on layout, while this function owns the educational
// explanation of what each mode means.
export function getResponsiveCanvasTheme(width) {
  const mode = getViewportMode(width)

  if (mode === 'Mobile') {
    return {
      mode,
      layoutLabel: 'Single-column mobile layout',
      backgroundLabel: 'Compact teal gradient',
      recommendation:
        'Use a stacked canvas layout so width, height, mode, and status remain readable on narrow screens.',
    }
  }

  return {
    mode,
    layoutLabel: 'Expanded desktop layout',
    backgroundLabel: 'Wide indigo gradient',
    recommendation:
      'Use an expanded canvas layout so viewport measurements, mode status, and effect notes have room to breathe.',
  }
}

// -----------------------------------------------------------------------------
// Helper: build a safe state object from raw width/height values
// -----------------------------------------------------------------------------
// Browser dimensions are normally positive integers, but tests and unusual
// browser states can expose odd values. For example, a minimized browser or a
// mocked test can accidentally provide a negative number, NaN, or a decimal.
//
// The component state should stay predictable, so this helper sanitizes incoming
// dimensions before React stores them:
//   1. Number.isFinite(...) rejects NaN and Infinity.
//   2. Math.round(...) keeps dimensions as readable whole pixels.
//   3. Math.max(0, ...) prevents negative width or height values.
//
// The returned object includes both raw display values and the derived layout
// metadata. That keeps the component state compact and easy for the UI, Live Test
// Results panel, and tests to inspect.
export function createWindowSizeSnapshot(width, height) {
  const safeWidth = Number.isFinite(width) ? Math.max(0, Math.round(width)) : 0
  const safeHeight = Number.isFinite(height) ? Math.max(0, Math.round(height)) : 0
  const theme = getResponsiveCanvasTheme(safeWidth)

  return {
    width: safeWidth,
    height: safeHeight,
    mode: theme.mode,
    layoutLabel: theme.layoutLabel,
    backgroundLabel: theme.backgroundLabel,
    recommendation: theme.recommendation,
  }
}

// -----------------------------------------------------------------------------
// Helper: read the real browser window safely
// -----------------------------------------------------------------------------
// The assignment specifically requires reading window.innerWidth and
// window.innerHeight. That is browser-only data, which means the code should be
// careful when it runs in non-browser environments such as isolated tests,
// server-side rendering, or documentation tools.
//
// When window exists, this function reads the real live dimensions. When window
// does not exist, it returns a harmless default snapshot so importing this file
// does not crash the app.
export function readCurrentWindowSize() {
  if (typeof window === 'undefined') {
    return createWindowSizeSnapshot(1024, 768)
  }

  return createWindowSizeSnapshot(window.innerWidth, window.innerHeight)
}

// -----------------------------------------------------------------------------
// Live Test Results data
// -----------------------------------------------------------------------------
// These test cases power the in-app Live Test Results panel. They intentionally
// mirror the assignment requirements instead of being random examples:
//   - normal desktop behavior
//   - normal mobile behavior
//   - resizing back to desktop
//   - exact breakpoint edge case
//   - one-pixel-below-breakpoint edge case
//   - tiny/minimized window edge case
//
// Keeping these cases in the completed assignment source allows the visual test
// panel and the official tests to stay aligned with the same helper logic.
export function buildResponsiveCanvasTestCases() {
  return [
    {
      id: 'desktop-wide',
      label: 'Normal: desktop width',
      width: 1366,
      height: 768,
      expectedMode: 'Desktop',
      kind: 'normal',
      reason: 'A wide browser window should use the expanded desktop layout.',
    },
    {
      id: 'mobile-narrow',
      label: 'Normal: mobile width',
      width: 390,
      height: 844,
      expectedMode: 'Mobile',
      kind: 'normal',
      reason: 'A phone-sized browser window should use the compact mobile layout.',
    },
    {
      id: 'resize-back-desktop',
      label: 'Normal: resized back to desktop',
      width: 1024,
      height: 700,
      expectedMode: 'Desktop',
      kind: 'normal',
      reason: 'After a user expands the browser, the component should return to desktop mode.',
    },
    {
      id: 'breakpoint-exact',
      label: 'Edge: exact breakpoint',
      width: DESKTOP_BREAKPOINT,
      height: 600,
      expectedMode: 'Desktop',
      kind: 'edge',
      reason: 'The breakpoint itself is treated as desktop because only widths below it are mobile.',
    },
    {
      id: 'breakpoint-minus-one',
      label: 'Edge: one pixel below breakpoint',
      width: DESKTOP_BREAKPOINT - 1,
      height: 600,
      expectedMode: 'Mobile',
      kind: 'edge',
      reason: 'One pixel below the breakpoint should flip the canvas into mobile mode.',
    },
    {
      id: 'tiny-window',
      label: 'Edge: tiny browser window',
      width: 0,
      height: 0,
      expectedMode: 'Mobile',
      kind: 'edge',
      reason: 'A zero-sized or minimized browser should not crash the component.',
    },
  ]
}

// -----------------------------------------------------------------------------
// Live Test Results runner
// -----------------------------------------------------------------------------
// The visual test panel does not need to render and unmount the full component
// for every static helper case. Instead, it can run each test case through the
// same snapshot helper the component uses. This keeps the panel fast, repeatable,
// and focused on the responsive rule.
export function runResponsiveCanvasCase(testCase) {
  const actual = createWindowSizeSnapshot(testCase.width, testCase.height)

  return {
    ...testCase,
    actualMode: actual.mode,
    actualLayout: actual.layoutLabel,
    passed: actual.mode === testCase.expectedMode,
  }
}

export default function ResponsiveCanvas({ title = 'Responsive Canvas Dashboard' }) {
  // ---------------------------------------------------------------------------
  // State initialization
  // ---------------------------------------------------------------------------
  // useState can receive either a value or a function. Here we pass the function
  // reference readCurrentWindowSize instead of calling it immediately in JSX.
  //
  // React will call this initializer only during the first render. That matters
  // because reading the browser window is an external lookup, and we do not want
  // to do unnecessary window reads on every render before the resize event even
  // happens.
  //
  // This also means the first visible UI starts with real dimensions instead of a
  // fake placeholder such as 0 x 0.
  const [windowSize, setWindowSize] = useState(readCurrentWindowSize)

  // ---------------------------------------------------------------------------
  // Derived responsive theme
  // ---------------------------------------------------------------------------
  // The component displays both width and height, but only width determines the
  // responsive mode. useMemo communicates that relationship clearly:
  // recalculate the theme only when width changes.
  //
  // This is not required for performance in such a small component, but it is a
  // useful teaching pattern because it separates stored state from values that can
  // be derived from that state.
  const theme = useMemo(() => getResponsiveCanvasTheme(windowSize.width), [windowSize.width])

  useEffect(() => {
    // -------------------------------------------------------------------------
    // Resize handler
    // -------------------------------------------------------------------------
    // This function is the bridge between React and the browser. React does not
    // automatically know when window.innerWidth or window.innerHeight changes.
    // The browser emits a resize event, and this handler translates that external
    // event into a React state update.
    //
    // Each time the handler runs, setWindowSize stores a fresh snapshot. React
    // then re-renders the component so the width, height, mode, layout label, and
    // background styling stay synchronized with the current browser size.
    function handleResize() {
      setWindowSize(readCurrentWindowSize())
    }

    // Running the handler once at the start of the effect immediately syncs state
    // after the component mounts. This protects the UI from a timing edge case
    // where the browser size changes between the initial render and the moment
    // useEffect runs.
    handleResize()

    // -------------------------------------------------------------------------
    // Attach the side effect
    // -------------------------------------------------------------------------
    // This is the assignment's required addEventListener call. It connects the
    // component to a browser system outside React's direct control. The same
    // function reference, handleResize, must later be passed to removeEventListener
    // or the cleanup will not remove the correct listener.
    window.addEventListener('resize', handleResize)

    // -------------------------------------------------------------------------
    // Cleanup obligation
    // -------------------------------------------------------------------------
    // Returning a function from useEffect tells React what to do when the component
    // unmounts. Without this cleanup, the resize listener could remain registered
    // after the component is gone. In a larger app, that can lead to memory leaks,
    // duplicate handlers, and stale state updates from components that no longer
    // exist on the screen.
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  },
  // The empty dependency array is intentional because this effect should attach
  // exactly one resize listener when the component mounts and remove that same
  // listener when the component unmounts. If the dependency array were left out,
  // React would run this effect after every render, repeatedly attaching and
  // cleaning up listeners instead of creating one stable side-effect lifecycle.
  [])

  return (
    <section
      className={`responsive-canvas-card responsive-canvas-card--${theme.mode.toLowerCase()}`}
      data-testid="responsive-canvas-card"
      aria-label="Responsive canvas side effect demo"
    >
      <div className="responsive-canvas-card__header">
        <p className="responsive-canvas-card__kicker">useEffect Side Effect Lab</p>
        <h2>{title}</h2>
        <p>
          This canvas panel listens to the browser resize event, tracks the live viewport dimensions,
          and changes its layout mode when the width crosses the responsive breakpoint.
        </p>
      </div>

      <div className="responsive-canvas-card__status" aria-live="polite">
        <article>
          <span>Current Width</span>
          <strong>{windowSize.width}px</strong>
        </article>
        <article>
          <span>Current Height</span>
          <strong>{windowSize.height}px</strong>
        </article>
        <article>
          <span>Detected Mode</span>
          <strong>{theme.mode}</strong>
        </article>
      </div>

      <div className="responsive-canvas-card__details">
        <p><strong>Layout:</strong> {theme.layoutLabel}</p>
        <p><strong>Background:</strong> {theme.backgroundLabel}</p>
        <p><strong>Canvas Layout Decision:</strong> {theme.recommendation}</p>
        <p><strong>Breakpoint Rule:</strong> Mobile below {DESKTOP_BREAKPOINT}px, desktop at {DESKTOP_BREAKPOINT}px and wider.</p>
      </div>
    </section>
  )
}
