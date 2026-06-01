import { act, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { afterEach, describe, expect, test, vi } from 'vitest'
import ResponsiveCanvas, {
  DESKTOP_BREAKPOINT,
  createWindowSizeSnapshot,
  getViewportMode,
} from './ResponsiveCanvas'

// -----------------------------------------------------------------------------
// Test utility: simulate a browser viewport size
// -----------------------------------------------------------------------------
// jsdom does not actually resize a real browser window. It gives tests a window
// object, but the test must manually set innerWidth and innerHeight. Defining the
// properties as configurable and writable lets each test choose a different
// viewport size without affecting the assignment source code.
function setViewport(width, height) {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    writable: true,
    value: width,
  })

  Object.defineProperty(window, 'innerHeight', {
    configurable: true,
    writable: true,
    value: height,
  })
}

// -----------------------------------------------------------------------------
// Test utility: update dimensions and dispatch the resize event
// -----------------------------------------------------------------------------
// This mirrors the real browser workflow:
//   1. the viewport dimensions change
//   2. the browser emits a resize event
//   3. the component's useEffect handler reads the new dimensions
//   4. React state updates and the UI re-renders
//
// Wrapping dispatchEvent in act(...) tells React Testing Library that a state
// update is expected during this interaction.
function resizeViewport(width, height) {
  setViewport(width, height)

  act(() => {
    window.dispatchEvent(new Event('resize'))
  })
}

afterEach(() => {
  // Restoring mocks after each test keeps spies isolated. Without this, a spy on
  // addEventListener or removeEventListener could leak call history into the next
  // test and create false positives or false failures.
  vi.restoreAllMocks()
})

describe('ResponsiveCanvas normal cases', () => {
  test('renders the current desktop width and height on initial mount', () => {
    // Normal case 1:
    // A desktop-sized viewport should render as Desktop immediately on mount.
    // This verifies that the useState initializer reads the current window size
    // instead of waiting for the user to resize the browser first.
    setViewport(1280, 720)

    render(<ResponsiveCanvas />)

    expect(screen.getByText('1280px')).toBeInTheDocument()
    expect(screen.getByText('720px')).toBeInTheDocument()
    expect(screen.getByText('Desktop')).toBeInTheDocument()
  })

  test('renders the current mobile width and height on initial mount', () => {
    // Normal case 2:
    // A phone-sized viewport should render as Mobile. This confirms that the
    // component is not hard-coded to desktop and that the same breakpoint helper
    // used by the source code is reflected in the UI.
    setViewport(390, 844)

    render(<ResponsiveCanvas />)

    expect(screen.getByText('390px')).toBeInTheDocument()
    expect(screen.getByText('844px')).toBeInTheDocument()
    expect(screen.getByText('Mobile')).toBeInTheDocument()
  })

  test('updates the displayed mode when the resize event changes the viewport', () => {
    // Normal case 3:
    // This is the most important behavioral test. It proves that useEffect
    // attached the resize listener and that the listener updates React state after
    // the browser dispatches a resize event.
    setViewport(1200, 800)
    render(<ResponsiveCanvas />)

    resizeViewport(500, 700)

    expect(screen.getByText('500px')).toBeInTheDocument()
    expect(screen.getByText('700px')).toBeInTheDocument()
    expect(screen.getByText('Mobile')).toBeInTheDocument()
  })
})

describe('ResponsiveCanvas edge cases', () => {
  test('treats the exact breakpoint as desktop and one pixel below it as mobile', () => {
    // Edge case 1:
    // Responsive code often fails at the exact breakpoint because developers may
    // mix up <, <=, >, or >=. This test locks down the assignment rule: below 768
    // is Mobile, while 768 itself is Desktop.
    expect(getViewportMode(DESKTOP_BREAKPOINT)).toBe('Desktop')
    expect(getViewportMode(DESKTOP_BREAKPOINT - 1)).toBe('Mobile')
  })

  test('sanitizes unusual dimensions without crashing helper logic', () => {
    // Edge case 2:
    // The helper should stay predictable if it receives unusual values from a
    // mocked test environment or edge browser state. Negative width becomes 0,
    // NaN height becomes 0, and the component safely chooses Mobile.
    const snapshot = createWindowSizeSnapshot(-10, Number.NaN)

    expect(snapshot.width).toBe(0)
    expect(snapshot.height).toBe(0)
    expect(snapshot.mode).toBe('Mobile')
  })

  test('removes the resize listener during cleanup when the component unmounts', () => {
    // Edge case 3:
    // This verifies the cleanup obligation in the assignment prompt. The same
    // function reference that was passed to addEventListener must also be passed
    // to removeEventListener. Otherwise the listener would remain attached after
    // unmount, which is the memory-leak problem useEffect cleanup prevents.
    setViewport(1024, 768)
    const addSpy = vi.spyOn(window, 'addEventListener')
    const removeSpy = vi.spyOn(window, 'removeEventListener')

    const { unmount } = render(<ResponsiveCanvas />)
    const resizeHandler = addSpy.mock.calls.find((call) => call[0] === 'resize')?.[1]

    unmount()

    expect(resizeHandler).toBeTypeOf('function')
    expect(removeSpy).toHaveBeenCalledWith('resize', resizeHandler)
  })
})
