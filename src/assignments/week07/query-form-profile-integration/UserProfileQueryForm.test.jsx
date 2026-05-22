import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import {
  USER_PROFILE_QUERY_KEY,
  UserProfileQueryForm,
  createMockProfileApi,
  isServerEmailConflict,
  isValidProfileEmail,
  normalizeProfile,
  shouldDisableSave,
} from './UserProfileQueryForm'

// These tests intentionally cover both small pure helpers and the rendered form. Helper tests are
// fast and precise; component tests prove the React Hook Form + TanStack Query integration behaves
// correctly in the browser.

function renderProfileForm({ api = createMockProfileApi({ delay: 0 }) } = {}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  render(
    <QueryClientProvider client={queryClient}>
      <UserProfileQueryForm api={api} />
    </QueryClientProvider>,
  )

  return queryClient
}

describe('Week 7 Assignment 3 - React Hook Form with TanStack Query', () => {
  it('normal case: normalizes a complete server profile for form defaults', () => {
    // normalizeProfile() protects the form from undefined values. A complete server object should
    // pass through with the same user-facing fields.
    expect(
      normalizeProfile({
        username: 'mina.dev',
        email: 'mina@example.com',
        bio: 'Builds forms.',
        notifications: true,
      }),
    ).toEqual({
      username: 'mina.dev',
      email: 'mina@example.com',
      bio: 'Builds forms.',
      notifications: true,
    })
  })

  it('normal case: accepts a valid email format', () => {
    // The same email helper is used by validation rules, Live Test Results, and tests so the rule is
    // easy to reason about and does not drift across layers.
    expect(isValidProfileEmail('student@example.com')).toBe(true)
  })

  it('normal case: loads server profile through the userProfile query key', async () => {
    const queryClient = renderProfileForm()

    expect(screen.getByText(/Loading profile from mock REST API/i)).toBeInTheDocument()

    expect(await screen.findByDisplayValue('avery.dev')).toBeInTheDocument()
    expect(screen.getByDisplayValue('avery@example.com')).toBeInTheDocument()

    // Reading from the QueryClient proves TanStack Query cached the server state under the required
    // ['userProfile'] key rather than hiding it in local component state.
    expect(queryClient.getQueryData(USER_PROFILE_QUERY_KEY)).toMatchObject({ username: 'avery.dev' })
  })

  it('edge case: fills missing server fields with safe defaults', () => {
    // Partial server payloads happen in real systems. The form should remain stable even when the
    // mock API omits optional fields.
    expect(normalizeProfile({ username: 'partial' })).toEqual({
      username: 'partial',
      email: '',
      bio: '',
      notifications: false,
    })
  })

  it('edge case: keeps Save Profile disabled until the form is dirty', async () => {
    renderProfileForm()

    const saveButton = await screen.findByRole('button', { name: /save profile/i })
    expect(saveButton).toBeDisabled()

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'avery.updated' } })

    await waitFor(() => expect(saveButton).not.toBeDisabled())
    expect(shouldDisableSave({ isDirty: true, isPending: false })).toBe(false)
  })

  it('edge case: maps simulated 409 email conflict into the email field error', async () => {
    renderProfileForm()

    await screen.findByDisplayValue('avery.dev')

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'conflict@example.com' },
    })

    const saveButton = screen.getByRole('button', { name: /save profile/i })
    await waitFor(() => expect(saveButton).not.toBeDisabled())
    fireEvent.click(saveButton)

    expect(isServerEmailConflict('conflict@example.com')).toBe(true)
    expect(await screen.findByText(/already registered on the server/i)).toBeInTheDocument()
  })
})
