import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import StreamingPreferencesDemo from './StreamingPreferencesDemo'
import {
  STORAGE_KEY,
  buildPreferenceProfile,
  defaultStreamingPreferences,
  readStoredValue,
  resolveInitialValue,
  writeStoredValue,
} from './useLocalStorage'

function createMemoryStorage(seed = {}) {
  const store = new Map(Object.entries(seed))

  return {
    getItem: vi.fn((key) => (store.has(key) ? store.get(key) : null)),
    setItem: vi.fn((key, value) => {
      store.set(key, value)
    }),
    removeItem: vi.fn((key) => {
      store.delete(key)
    }),
    clear: vi.fn(() => {
      store.clear()
    }),
  }
}

beforeEach(() => {
  window.localStorage.clear()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('useLocalStorage helpers', () => {
  it('normal case: resolves a lazy initial value function only when a fallback is needed', () => {
    const initializer = vi.fn(() => ({ theme: 'dark' }))

    expect(resolveInitialValue(initializer)).toEqual({ theme: 'dark' })
    expect(initializer).toHaveBeenCalledTimes(1)
  })

  it('normal case: reads valid JSON from storage before using the default value', () => {
    const storage = createMemoryStorage({ preferences: JSON.stringify({ theme: 'dark', volume: 22 }) })

    expect(readStoredValue('preferences', { theme: 'light' }, storage)).toEqual({ theme: 'dark', volume: 22 })
  })

  it('normal case: writes React state as serialized JSON for browser persistence', () => {
    const storage = createMemoryStorage()
    const result = writeStoredValue('preferences', { theme: 'dark' }, storage)

    expect(result).toEqual({ ok: true, reason: 'saved' })
    expect(storage.setItem).toHaveBeenCalledWith('preferences', JSON.stringify({ theme: 'dark' }))
  })

  it('edge case: falls back safely when localStorage has malformed JSON', () => {
    const storage = createMemoryStorage({ preferences: '{bad json' })

    expect(readStoredValue('preferences', { theme: 'light' }, storage)).toEqual({ theme: 'light' })
  })

  it('edge case: falls back safely when storage is unavailable', () => {
    expect(readStoredValue('preferences', { theme: 'light' }, null)).toEqual({ theme: 'light' })
    expect(writeStoredValue('preferences', { theme: 'dark' }, null)).toEqual({
      ok: false,
      reason: 'storage-unavailable',
    })
  })

  it('edge case: summarizes unexpected savedShows values without crashing', () => {
    const profile = buildPreferenceProfile({
      ...defaultStreamingPreferences,
      savedShows: 'not-an-array',
    })

    expect(profile.savedShowCount).toBe(0)
    expect(profile.completionScore).toBe(100)
  })
})

describe('StreamingPreferencesDemo', () => {
  it('loads default preferences, then backs up changes to localStorage', async () => {
    const user = userEvent.setup()
    render(<StreamingPreferencesDemo />)

    expect(screen.getByText('Light browsing mode')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Dark Mode' }))

    await waitFor(() => {
      const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
      expect(stored.theme).toBe('dark')
    })
  })

  it('loads previously saved preferences on the first render', async () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...defaultStreamingPreferences, theme: 'dark', volume: 15, captions: false }),
    )

    render(<StreamingPreferencesDemo />)

    expect(await screen.findByText('Dark theater mode')).toBeInTheDocument()
    expect(screen.getByText('Captions off')).toBeInTheDocument()
  })

  it('resets browser preferences back to the default state', async () => {
    const user = userEvent.setup()
    render(<StreamingPreferencesDemo />)

    await user.click(screen.getByRole('button', { name: 'Dark Mode' }))
    await user.click(screen.getByRole('button', { name: 'Reset Browser Preference' }))

    await waitFor(() => {
      expect(screen.getByText('Light browsing mode')).toBeInTheDocument()
    })
  })

  it('simulates an API sync after local preference changes', async () => {
    const user = userEvent.setup()
    render(<StreamingPreferencesDemo />)

    await user.click(screen.getByRole('button', { name: 'Simulate API Sync' }))

    expect(screen.getByText('saving')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('synced')).toBeInTheDocument()
    })
  })
})
