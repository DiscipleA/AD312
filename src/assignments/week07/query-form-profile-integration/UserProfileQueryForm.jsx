import { useEffect } from 'react'
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

// This assignment intentionally separates two kinds of state:
// 1. Server state: data that belongs to the API/database and is managed by TanStack Query.
// 2. Form state: temporary input values, validation errors, and dirty flags managed by React Hook Form.
// Keeping those responsibilities separate prevents common enterprise bugs such as stale forms,
// duplicated loading flags, and manual synchronization between local state and remote data.

// The required query key from the assignment instructions. Using a constant avoids mistyping
// the cache identity in useQuery(), invalidateQueries(), and tests. TanStack Query treats this
// array as the stable address for the cached profile record.
export const USER_PROFILE_QUERY_KEY = ['userProfile']

// The portfolio preview cannot require students to run json-server in the browser shell, so the
// component receives an API adapter. In a standalone app, this adapter can call
// http://localhost:3001/profile. In this portfolio and in Vitest, it can use a mock implementation
// with the same getProfile() / updateProfile() shape.
export const sampleProfile = {
  username: 'avery.dev',
  email: 'avery@example.com',
  bio: 'Frontend developer who cares about accessible, resilient form workflows.',
  notifications: true,
}

// React Hook Form should always receive complete default values. If the server returns a partial
// profile, this helper fills missing fields with safe defaults instead of letting inputs become
// uncontrolled or undefined.
export function normalizeProfile(profile = {}) {
  return {
    username: profile.username ?? '',
    email: profile.email ?? '',
    bio: profile.bio ?? '',
    notifications: Boolean(profile.notifications),
  }
}

// This validation helper mirrors the email rule used by the form and the mock API. Keeping it as a
// named helper gives tests and the Live Test Results panel something deterministic to verify without
// needing to render the whole React component for every small rule.
export function isValidProfileEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// The assignment asks students to simulate a server-side 409 Conflict when this email is submitted.
// This helper makes that server constraint explicit and easy to test.
export function isServerEmailConflict(email) {
  return String(email).trim().toLowerCase() === 'conflict@example.com'
}

// The Save button should be disabled until the user edits a field, and it should stay disabled while
// the mutation is pending. That prevents duplicate writes and makes React Hook Form's isDirty flag
// visible as part of the interface contract.
export function shouldDisableSave({ isDirty, isPending }) {
  return !isDirty || isPending
}

// A small async pause lets the preview demonstrate loading and saving states without depending on a
// real network. Tests pass delay: 0 so they stay fast and deterministic.
function wait(delay) {
  return new Promise((resolve) => window.setTimeout(resolve, delay))
}

// Browser-safe mock REST adapter used by the portfolio preview and Vitest. It behaves like a tiny
// /profile endpoint: getProfile reads the current record, updateProfile validates and replaces it,
// then returns the saved server copy.
export function createMockProfileApi({ initialProfile = sampleProfile, delay = 450 } = {}) {
  let serverProfile = normalizeProfile(initialProfile)

  return {
    async getProfile() {
      await wait(delay)
      // Return a clone so callers cannot mutate the mock database by reference.
      return { ...serverProfile }
    },

    async updateProfile(nextProfile) {
      await wait(delay)

      if (isServerEmailConflict(nextProfile.email)) {
        const error = new Error('That email is already registered on the server.')
        error.status = 409
        error.field = 'email'
        throw error
      }

      if (!isValidProfileEmail(nextProfile.email)) {
        const error = new Error('The server rejected the email format.')
        error.status = 422
        error.field = 'email'
        throw error
      }

      serverProfile = normalizeProfile(nextProfile)
      return { ...serverProfile }
    },
  }
}

// Real json-server adapter for a standalone Vite project. The guide asks students to run json-server
// at http://localhost:3001/profile. This adapter shows the production-style HTTP shape while the
// portfolio preview uses createMockProfileApi() for stability.
export const jsonServerProfileApi = {
  async getProfile() {
    const response = await fetch('http://localhost:3001/profile')
    if (!response.ok) {
      throw new Error('Unable to load profile from json-server.')
    }
    return normalizeProfile(await response.json())
  },

  async updateProfile(profile) {
    if (isServerEmailConflict(profile.email)) {
      const error = new Error('That email is already registered on the server.')
      error.status = 409
      error.field = 'email'
      throw error
    }

    const response = await fetch('http://localhost:3001/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(normalizeProfile(profile)),
    })

    if (!response.ok) {
      throw new Error('Unable to save profile to json-server.')
    }

    return normalizeProfile(await response.json())
  },
}

// A default mock API keeps the embedded portfolio demo runnable even when json-server is not open.
const defaultProfileApi = createMockProfileApi()

export function UserProfileQueryForm({ api = defaultProfileApi }) {
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isDirty },
  } = useForm({
    mode: 'onChange',
    defaultValues: normalizeProfile(),
  })

  // useQuery owns server-state loading. The component does not create its own isLoading state,
  // because TanStack Query already tracks the request lifecycle and caches the result under
  // USER_PROFILE_QUERY_KEY.
  const profileQuery = useQuery({
    queryKey: USER_PROFILE_QUERY_KEY,
    queryFn: api.getProfile,
  })

  // When the query succeeds, reset() hydrates React Hook Form with the server payload. reset() is
  // important because it also tells React Hook Form these values are the new clean baseline, so
  // formState.isDirty starts false after loading.
  useEffect(() => {
    if (profileQuery.data) {
      reset(normalizeProfile(profileQuery.data))
    }
  }, [profileQuery.data, reset])

  const updateProfileMutation = useMutation({
    mutationFn: api.updateProfile,

    async onSuccess(updatedProfile) {
      // Invalidate the cache so any other component subscribed to ['userProfile'] knows that the
      // server copy changed and should be refreshed.
      await queryClient.invalidateQueries({ queryKey: USER_PROFILE_QUERY_KEY })

      // Reset with the saved server response so the form no longer thinks it has unsaved changes.
      reset(normalizeProfile(updatedProfile))
    },

    onError(error) {
      // Server validation belongs next to the field the user can fix. A 409 email conflict is mapped
      // directly to the email field with setError(), rather than shown as a disconnected global alert.
      if (error.field === 'email' || error.status === 409) {
        setError('email', {
          type: 'server',
          message: error.message || 'That email is already registered on the server.',
        })
      }
    },
  })

  const onSubmit = (values) => {
    updateProfileMutation.mutate(normalizeProfile(values))
  }

  if (profileQuery.isLoading) {
    return (
      <section className="hook-form-preview-card query-profile-preview-card" aria-label="Working Preview">
        <p className="hook-form-kicker">Working Preview</p>
        <h2>Profile Editor</h2>
        <div className="hook-form-loading-banner">Loading profile from mock REST API...</div>
      </section>
    )
  }

  if (profileQuery.isError) {
    return (
      <section className="hook-form-preview-card query-profile-preview-card" aria-label="Working Preview">
        <p className="hook-form-kicker">Working Preview</p>
        <h2>Profile Editor</h2>
        <div className="query-profile-error-banner">Unable to load profile. Check the API adapter and try again.</div>
      </section>
    )
  }

  return (
    <section className="hook-form-preview-card query-profile-preview-card" aria-label="Working Preview">
      <div className="hook-form-preview-header query-profile-preview-header">
        <div>
          <p className="hook-form-kicker">Working Preview</p>
          <h2>Profile Editor</h2>
          <p>
            Server data loads through <code>useQuery</code>, hydrates the form through <code>reset()</code>, and saves
            changes through a <code>useMutation</code> PUT-style adapter.
          </p>
        </div>
        <span className="query-profile-cache-pill">Cache key: [&quot;userProfile&quot;]</span>
      </div>

      <form className="hook-form-form query-profile-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <label>
          Username
          <input
            autoFocus
            {...register('username', {
              required: 'Username is required.',
              minLength: { value: 3, message: 'Username must be at least 3 characters.' },
            })}
          />
          <span className="hook-form-error-layer">{errors.username?.message}</span>
        </label>

        <label>
          Email
          <input
            type="email"
            {...register('email', {
              required: 'Email is required.',
              validate: (value) => isValidProfileEmail(value) || 'Enter a valid email address.',
            })}
          />
          <span className="hook-form-error-layer">{errors.email?.message}</span>
        </label>

        <label className="query-profile-wide-field">
          Bio
          <textarea
            rows="4"
            {...register('bio', {
              maxLength: { value: 180, message: 'Bio must stay under 180 characters.' },
            })}
          />
          <span className="hook-form-error-layer">{errors.bio?.message}</span>
        </label>

        <label className="hook-form-checkbox-row query-profile-wide-field">
          <input type="checkbox" {...register('notifications')} />
          <span>Receive profile and account notifications</span>
        </label>

        <div className="hook-form-footer-row query-profile-wide-field">
          <button
            type="submit"
            disabled={shouldDisableSave({ isDirty, isPending: updateProfileMutation.isPending })}
          >
            {updateProfileMutation.isPending ? 'Saving Profile...' : 'Save Profile'}
          </button>
          <span>{isDirty ? 'Unsaved changes ready to save.' : 'No unsaved changes yet. Edit a field to enable Save Profile.'}</span>
        </div>
      </form>

      {updateProfileMutation.isSuccess && (
        <div className="hook-form-loading-banner">Profile saved, cache invalidated, and form dirty state reset.</div>
      )}

      <div className="query-profile-server-card">
        <h3>Last saved server profile</h3>
        <dl>
          <div>
            <dt>Username</dt>
            <dd>{normalizeProfile(profileQuery.data).username}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{normalizeProfile(profileQuery.data).email}</dd>
          </div>
          <div>
            <dt>Notifications</dt>
            <dd>{normalizeProfile(profileQuery.data).notifications ? 'Enabled' : 'Disabled'}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

// This wrapper gives the standalone preview a fresh QueryClient. The assignment guide imports this
// wrapper so the working preview can run without changing the app-wide course shell.
export default function UserProfileQueryFormPreview(props) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <UserProfileQueryForm {...props} />
    </QueryClientProvider>
  )
}
