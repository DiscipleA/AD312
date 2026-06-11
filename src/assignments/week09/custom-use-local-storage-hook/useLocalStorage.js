import { useCallback, useEffect, useState } from 'react'

// This assignment is centered on one reusable idea:
// a component should be able to use browser persistence almost as easily as it
// uses normal React state. React already gives us useState for short-term memory,
// but useState resets when the page refreshes. localStorage gives us longer-term
// browser memory, but reading and writing localStorage directly inside every
// component would create repeated, messy, error-prone code.
//
// The custom hook below combines both tools:
// 1. useState keeps the current value available for React rendering.
// 2. localStorage keeps a backup copy that survives a page refresh.
// 3. useEffect watches for state changes and writes those changes to storage.

export const STORAGE_KEY = 'ad312-week09-streaming-preferences'

export const defaultStreamingPreferences = {
  theme: 'light',
  autoplay: false,
  captions: true,
  volume: 65,
  quality: 'auto',
  savedShows: ['React Patterns Live'],
}

export function resolveInitialValue(initialValue) {
  // React's useState accepts either a direct value or an initializer function:
  //
  //   useState({ theme: 'dark' })
  //   useState(() => ({ theme: 'dark' }))
  //
  // The function form is important when creating the initial value is expensive
  // or when it should only happen once during the first render. This helper keeps
  // our custom hook compatible with that same useState pattern. If initialValue is
  // a function, we call it only when the hook needs an initial fallback. If it is
  // already a plain value, we return it directly.
  return typeof initialValue === 'function' ? initialValue() : initialValue
}

export function readStoredValue(key, initialValue, storage = globalThis.localStorage) {
  // Reading localStorage is intentionally wrapped in a helper for three reasons:
  //
  // 1. Testability: Vitest can pass a fake storage object without depending on the
  //    real browser storage implementation.
  // 2. Safety: localStorage can be unavailable in server-side rendering, privacy
  //    restricted browsers, or unusual embedded environments.
  // 3. Error handling: JSON.parse can throw if the stored value is corrupted or if
  //    a previous version of the app saved invalid data.
  const fallbackValue = resolveInitialValue(initialValue)

  try {
    if (!storage || typeof storage.getItem !== 'function') {
      return fallbackValue
    }

    const rawValue = storage.getItem(key)

    if (rawValue === null) {
      return fallbackValue
    }

    return JSON.parse(rawValue)
  } catch (error) {
    // A custom hook should protect the component using it. If localStorage has bad
    // data, the UI should still render with a safe default instead of crashing.
    return fallbackValue
  }
}

export function writeStoredValue(key, value, storage = globalThis.localStorage) {
  // localStorage stores strings only. React state can be objects, arrays, booleans,
  // numbers, or strings, so we serialize the current state value with JSON.stringify.
  // Returning a status object lets the GUI and tests explain whether persistence
  // worked without throwing errors into the component tree.
  try {
    if (!storage || typeof storage.setItem !== 'function') {
      return { ok: false, reason: 'storage-unavailable' }
    }

    storage.setItem(key, JSON.stringify(value))
    return { ok: true, reason: 'saved' }
  } catch (error) {
    return { ok: false, reason: 'write-failed' }
  }
}

export function removeStoredValue(key, storage = globalThis.localStorage) {
  // Removing the stored value is useful for a Reset button. The hook can reset its
  // React state and also clear the browser backup so the next page refresh returns
  // to the original default value.
  try {
    if (!storage || typeof storage.removeItem !== 'function') {
      return { ok: false, reason: 'storage-unavailable' }
    }

    storage.removeItem(key)
    return { ok: true, reason: 'removed' }
  } catch (error) {
    return { ok: false, reason: 'remove-failed' }
  }
}

export function buildPreferenceProfile(preferences) {
  // The visual demo and the test panel both need a clear summary of the current
  // preference state. Keeping this logic in a pure helper makes it easy to test
  // without rendering the whole React component.
  const savedShowCount = Array.isArray(preferences.savedShows) ? preferences.savedShows.length : 0
  const completedPreferences = [
    preferences.theme,
    preferences.quality,
    typeof preferences.volume === 'number',
    typeof preferences.autoplay === 'boolean',
    typeof preferences.captions === 'boolean',
  ].filter(Boolean).length

  return {
    modeLabel: preferences.theme === 'dark' ? 'Dark theater mode' : 'Light browsing mode',
    captionLabel: preferences.captions ? 'Captions on' : 'Captions off',
    autoplayLabel: preferences.autoplay ? 'Autoplay enabled' : 'Autoplay paused',
    qualityLabel: preferences.quality === 'auto' ? 'Auto quality' : `${preferences.quality} quality`,
    savedShowCount,
    completionScore: Math.round((completedPreferences / 5) * 100),
    storageReadinessScore: savedShowCount > 0 ? 100 : 82,
    apiPayloadSize: JSON.stringify(preferences).length,
  }
}

export function useLocalStorage(key, initialValue) {
  // The lazy initializer function is the first major requirement for the lab.
  //
  // If we wrote this instead:
  //
  //   const [value, setValue] = useState(readStoredValue(key, initialValue))
  //
  // React would evaluate readStoredValue during every render before useState gets
  // called. That is unnecessary work. By passing a function to useState, React runs
  // the read only during the first mount. This is the safest place to load the
  // browser backup because it prevents repeated localStorage reads during normal
  // re-renders.
  const [value, setValue] = useState(() => readStoredValue(key, initialValue))
  const [storageStatus, setStorageStatus] = useState('loaded')

  useEffect(() => {
    // The second major requirement is automatic backup.
    //
    // React state changes first. After React commits the render, this effect runs
    // and writes the newest value into localStorage. That means the component code
    // can update state normally, and the hook handles persistence in one reusable
    // place. Every component that imports useLocalStorage receives this behavior
    // without duplicating setItem calls.
    const result = writeStoredValue(key, value)
    setStorageStatus(result.ok ? 'saved' : result.reason)
  }, [key, value])

  const setPersistentValue = useCallback((nextValueOrUpdater) => {
    // React's original setState function supports both direct values and updater
    // functions. A reusable hook should preserve that familiar behavior:
    //
    //   setPreferences(nextObject)
    //   setPreferences((previous) => ({ ...previous, theme: 'dark' }))
    //
    // The updater form is especially important when the next value depends on the
    // previous value, because React may batch multiple state updates together.
    setValue((previousValue) => {
      return typeof nextValueOrUpdater === 'function'
        ? nextValueOrUpdater(previousValue)
        : nextValueOrUpdater
    })
  }, [])

  const resetPersistentValue = useCallback(() => {
    // Resetting has two responsibilities:
    // 1. Clear the localStorage backup so the browser no longer remembers the old
    //    preference.
    // 2. Restore React state to the original initial value so the UI updates right
    //    away without requiring a refresh.
    removeStoredValue(key)
    setValue(resolveInitialValue(initialValue))
    setStorageStatus('reset')
  }, [initialValue, key])

  return [value, setPersistentValue, { reset: resetPersistentValue, status: storageStatus }]
}
