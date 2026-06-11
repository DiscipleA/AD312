import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import StreamingWindowSizeDemo from './StreamingWindowSizeDemo'
import {
  MOBILE_BREAKPOINT,
  buildStreamingLayoutProfile,
  getViewportMode,
  readBrowserWindowSize,
} from './useWindowSize'

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

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Week 9 Assignment 2 - useWindowSize custom hook helpers', () => {
  it('normal case: classifies a laptop-sized viewport as the full layout', () => {
    expect(getViewportMode(1280)).toBe('Full')
  })

  it('normal case: classifies a phone-sized viewport as the mobile layout', () => {
    expect(getViewportMode(390)).toBe('Mobile')
  })

  it('normal case: builds a full streaming layout profile with three columns', () => {
    const profile = buildStreamingLayoutProfile({ width: 1200, height: 800 })

    expect(profile.mode).toBe('Full')
    expect(profile.layoutName).toBe('Full laptop layout')
    expect(profile.columns).toBe(3)
    expect(profile.chartValue).toBeGreaterThan(0)
  })

  it('edge case: treats one pixel below the breakpoint as mobile', () => {
    expect(getViewportMode(MOBILE_BREAKPOINT - 1)).toBe('Mobile')
  })

  it('edge case: treats the exact breakpoint as full layout', () => {
    expect(getViewportMode(MOBILE_BREAKPOINT)).toBe('Full')
  })

  it('edge case: returns an unknown profile for invalid negative widths', () => {
    const profile = buildStreamingLayoutProfile({ width: -20, height: 700 })

    expect(profile.mode).toBe('Unknown')
    expect(profile.columns).toBe(0)
  })
})

describe('Week 9 Assignment 2 - useWindowSize component behavior', () => {
  it('renders the current browser width and height from the hook', () => {
    setViewport(1024, 768)

    render(<StreamingWindowSizeDemo />)

    expect(screen.getByText('1024px × 768px')).toBeInTheDocument()
    expect(screen.getByText('Full')).toBeInTheDocument()
  })

  it('updates the rendered size after the resize event fires', () => {
    setViewport(1024, 768)
    render(<StreamingWindowSizeDemo />)

    setViewport(430, 932)
    fireEvent(window, new Event('resize'))

    expect(screen.getByText('430px × 932px')).toBeInTheDocument()
    expect(screen.getByText('Mobile')).toBeInTheDocument()
  })

  it('removes the resize listener during cleanup when the component unmounts', () => {
    const addSpy = vi.spyOn(window, 'addEventListener')
    const removeSpy = vi.spyOn(window, 'removeEventListener')

    const { unmount } = render(<StreamingWindowSizeDemo />)
    unmount()

    expect(addSpy).toHaveBeenCalledWith('resize', expect.any(Function))
    expect(removeSpy).toHaveBeenCalledWith('resize', expect.any(Function))
  })

  it('reads zero dimensions safely when no browser window object is provided', () => {
    expect(readBrowserWindowSize(null)).toEqual({ width: 0, height: 0 })
  })
})
