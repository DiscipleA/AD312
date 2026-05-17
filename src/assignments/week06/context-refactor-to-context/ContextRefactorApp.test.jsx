import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import ContextRefactorApp, {
  Dashboard,
  UserProvider,
  describePropPath,
  getModeById,
  getModeLabel,
  getPreviewTheme,
  getUserById,
  useUserSettings,
} from './ContextRefactorApp'

function BrokenConsumer() {
  useUserSettings()
  return <p>should not render</p>
}

describe('Week 6 Assignment 2 - Refactoring Prop Drilling to Context', () => {
  it('normal: renders the default user from UserProvider context', () => {
    render(<ContextRefactorApp />)

    expect(screen.getAllByText('Maya Chen').length).toBeGreaterThan(0)
    expect(screen.getByText('maya.chen@healthmerge.example')).toBeInTheDocument()
    expect(screen.getAllByText('Clinical Light').length).toBeGreaterThan(0)
  })

  it('normal: switches deeply nested profile data when the selected user changes', async () => {
    const user = userEvent.setup()
    render(<ContextRefactorApp />)

    await user.click(screen.getByRole('button', { name: 'Andre Patel' }))

    expect(screen.getByText('andre.patel@healthmerge.example')).toBeInTheDocument()
    expect(screen.getByText('Integration admin')).toBeInTheDocument()
    expect(screen.getAllByText('Midnight Ops').length).toBeGreaterThan(0)
  })

  it('normal: explicit preview mode overrides the selected user preference', async () => {
    const user = userEvent.setup()
    render(<ContextRefactorApp />)

    await user.click(screen.getByRole('button', { name: 'Temporary Staff' }))
    await user.click(screen.getAllByRole('button', { name: 'High Contrast' })[1])

    expect(screen.getAllByText('High Contrast').length).toBeGreaterThan(0)
    expect(screen.getByText('Limited intake access')).toBeInTheDocument()
  })

  it('normal: Dashboard can render under UserProvider without receiving a user prop', () => {
    render(
      <UserProvider initialUserId="andre">
        <Dashboard />
      </UserProvider>,
    )

    expect(screen.getByLabelText('Dashboard component')).toBeInTheDocument()
    expect(screen.getByText('No user prop needed here')).toBeInTheDocument()
    expect(screen.getByText('Andre Patel')).toBeInTheDocument()
  })

  it('edge: unknown user ids fall back to a safe default user', () => {
    expect(getUserById('missing-user').name).toBe('Maya Chen')
  })

  it('edge: unknown preview modes fall back to the default mode metadata', () => {
    expect(getModeById('not-real').label).toBe('Use User Preference')
    expect(getModeLabel('not-real')).toBe('Use User Preference')
  })

  it('edge: user preference mode can be changed separately from explicit overrides', () => {
    const andre = getUserById('andre')

    expect(getPreviewTheme(andre, 'user')).toBe('midnightOps')
    expect(getPreviewTheme(andre, 'user', 'highContrast')).toBe('highContrast')
    expect(getPreviewTheme(andre, 'sunriseReview', 'highContrast')).toBe('sunriseReview')
  })

  it('edge: documents the original prop-drilling path in order', () => {
    expect(describePropPath()).toEqual(['App', 'Dashboard', 'Sidebar', 'UserProfile'])
  })

  it('edge: throws a helpful error when context is consumed outside the provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => render(<BrokenConsumer />)).toThrow('useUserSettings must be used inside UserProvider')

    spy.mockRestore()
  })
})

