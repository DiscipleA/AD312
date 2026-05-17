import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import ThemeSwitcherApp, {
  DashboardShell,
  ThemeProvider,
  getOppositeTheme,
  getStoredTheme,
  getTheme,
  normalizeThemeName,
  useTheme,
} from './ThemeSwitcherApp'

function BrokenThemeConsumer() {
  useTheme()
  return <p>should not render</p>
}

describe('Week 6 Assignment 3 - Global Theme/Dark Mode Switcher', () => {
  it('normal: renders the default light theme from the provider', () => {
    render(<ThemeSwitcherApp />)

    expect(screen.getAllByText(/Light Mode/).length).toBeGreaterThan(0)
    expect(screen.getByText('theme: light')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Switch to Dark Mode' })).toBeInTheDocument()
  })

  it('normal: toggles from light mode to dark mode through ThemeSwitcher', async () => {
    const user = userEvent.setup()
    render(<ThemeSwitcherApp />)

    await user.click(screen.getByRole('button', { name: 'Switch to Dark Mode' }))

    expect(screen.getAllByText(/Dark Mode/).length).toBeGreaterThan(0)
    expect(screen.getByText('theme: dark')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Switch to Light Mode' })).toBeInTheDocument()
  })

  it('normal: nested dashboard consumers render under ThemeProvider without theme props', () => {
    render(
      <ThemeProvider initialTheme="dark">
        <DashboardShell />
      </ThemeProvider>,
    )

    expect(screen.getByLabelText('Dashboard shell')).toBeInTheDocument()
    expect(screen.getByLabelText('Nested theme consumer')).toBeInTheDocument()
    expect(screen.getByText(/This nested panel uses/)).toBeInTheDocument()
  })

  it('normal: explicit light and dark buttons set the requested theme', async () => {
    const user = userEvent.setup()
    render(<ThemeSwitcherApp initialTheme="dark" />)

    await user.click(screen.getByRole('button', { name: '☀️ Light' }))
    expect(screen.getByText('theme: light')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '🌙 Dark' }))
    expect(screen.getByText('theme: dark')).toBeInTheDocument()
  })

  it('edge: invalid initial themes safely normalize to light', () => {
    expect(normalizeThemeName('sepia')).toBe('light')
    expect(getTheme('sepia').label).toBe('Light Mode')
  })

  it('edge: opposite theme helper only returns valid theme keys', () => {
    expect(getOppositeTheme('light')).toBe('dark')
    expect(getOppositeTheme('dark')).toBe('light')
    expect(getOppositeTheme('not-real')).toBe('dark')
  })

  it('edge: storage helper ignores malformed saved preferences', () => {
    window.localStorage.setItem('ad312-theme-test', 'purple')
    expect(getStoredTheme('ad312-theme-test')).toBeNull()

    window.localStorage.setItem('ad312-theme-test', 'dark')
    expect(getStoredTheme('ad312-theme-test')).toBe('dark')
  })

  it('edge: persisted preferences can override the initial theme', () => {
    window.localStorage.setItem('ad312-theme-persisted', 'dark')

    render(<ThemeSwitcherApp initialTheme="light" persistPreference storageKey="ad312-theme-persisted" />)

    expect(screen.getByText('theme: dark')).toBeInTheDocument()
  })

  it('edge: throws a helpful error when useTheme is used outside ThemeProvider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => render(<BrokenThemeConsumer />)).toThrow('useTheme must be used inside ThemeProvider')

    spy.mockRestore()
  })
})
