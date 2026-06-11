import { useEffect, useMemo, useState } from 'react'
import {
  STORAGE_KEY,
  buildPreferenceProfile,
  defaultStreamingPreferences,
  useLocalStorage,
} from './useLocalStorage'

const recommendedShows = [
  'React Patterns Live',
  'Hooks After Dark',
  'State Sync Stories',
  'The Browser API Show',
]

function createApiPayload(preferences) {
  // This function simulates the kind of JSON body a real streaming site might send
  // to a backend preferences API. The assignment is focused on localStorage, so we
  // do not need a real network request here. Still, building a realistic payload
  // helps students see how local browser state could later be synchronized with a
  // server-side profile endpoint.
  return {
    endpoint: '/api/preferences',
    method: 'PUT',
    body: {
      theme: preferences.theme,
      autoplay: preferences.autoplay,
      captions: preferences.captions,
      volume: preferences.volume,
      quality: preferences.quality,
      savedShows: preferences.savedShows,
    },
  }
}

export default function StreamingPreferencesDemo() {
  // The component receives three values from the custom hook:
  //
  // preferences: the current React state value used to render the UI.
  // setPreferences: a setter that behaves like React's normal setState setter.
  // storageTools: helper metadata/actions exposed by the hook for reset and status.
  //
  // The component does not call localStorage.getItem or localStorage.setItem itself.
  // That is the point of the assignment: persistence is packaged inside the hook so
  // the component can stay focused on streaming-site UI behavior.
  const [preferences, setPreferences, storageTools] = useLocalStorage(
    STORAGE_KEY,
    () => defaultStreamingPreferences,
  )

  // apiStatus is a small GUI-only state value. It imitates the status message a real
  // app might show while saving a user profile to a server. This is separate from
  // localStorage because localStorage is immediate browser persistence, while an API
  // request would usually be asynchronous.
  const [apiStatus, setApiStatus] = useState('idle')

  const profile = useMemo(() => buildPreferenceProfile(preferences), [preferences])
  const apiPayload = useMemo(() => createApiPayload(preferences), [preferences])

  useEffect(() => {
    // Whenever preferences change, the previous API status is no longer fully current.
    // The localStorage hook has already backed up the change automatically; this line
    // only updates the simulated server-sync label so the user can choose to click the
    // API simulation button again.
    setApiStatus('pending')
  }, [preferences])

  function updatePreference(key, nextValue) {
    // This helper uses the functional-updater form of the custom hook's setter.
    // That mirrors a best practice from React useState: when the new object depends
    // on the previous object, receive the previous object in a callback and return
    // a copied object with the changed field. This avoids mutating the old state.
    setPreferences((previousPreferences) => ({
      ...previousPreferences,
      [key]: nextValue,
    }))
  }

  function handleSaveShow(showTitle) {
    // savedShows is an array, so we still avoid mutation. Instead of pushing into
    // the old array, we create a new array with the spread operator. If the title is
    // already present, the function returns the previous object unchanged so the UI
    // does not create duplicate saved items.
    setPreferences((previousPreferences) => {
      if (previousPreferences.savedShows.includes(showTitle)) {
        return previousPreferences
      }

      return {
        ...previousPreferences,
        savedShows: [...previousPreferences.savedShows, showTitle],
      }
    })
  }

  function handleRemoveShow(showTitle) {
    // filter creates a new array without the selected title. This preserves React's
    // immutability rule and gives the custom hook a new value to back up into
    // localStorage during the next effect cycle.
    setPreferences((previousPreferences) => ({
      ...previousPreferences,
      savedShows: previousPreferences.savedShows.filter((title) => title !== showTitle),
    }))
  }

  function handleApiSync() {
    // This does not contact the internet. It is a controlled API simulation for the
    // portfolio GUI. The timeout imitates the delay of a server request so students
    // can see the difference between instant localStorage backup and asynchronous
    // server synchronization.
    setApiStatus('saving')

    window.setTimeout(() => {
      setApiStatus('synced')
    }, 450)
  }

  return (
    <section className={`local-storage-demo ${preferences.theme === 'dark' ? 'is-theater-dark' : 'is-theater-light'}`}>
      <div className="local-storage-player-card">
        <p className="local-storage-eyebrow">Streaming Preference Preview</p>
        <h3>{profile.modeLabel}</h3>
        <div className="local-storage-player-window" aria-label="Streaming player preview">
          <span className="local-storage-play-icon">▶</span>
          <span>{profile.captionLabel}</span>
        </div>
        <div className="local-storage-player-meta">
          <span>{profile.autoplayLabel}</span>
          <span>{profile.qualityLabel}</span>
          <span>{preferences.volume}% volume</span>
        </div>
      </div>

      <div className="local-storage-controls-card">
        <p className="local-storage-eyebrow">Custom Hook State Controls</p>
        <h3>Persistent Preferences</h3>
        <p>
          Change the controls below, refresh the page, and the values remain because
          <code> useLocalStorage</code> automatically backs up state changes to the browser.
        </p>

        <div className="local-storage-button-row" aria-label="Theme controls">
          <button
            type="button"
            className={preferences.theme === 'light' ? 'active' : ''}
            onClick={() => updatePreference('theme', 'light')}
          >
            Light Mode
          </button>
          <button
            type="button"
            className={preferences.theme === 'dark' ? 'active' : ''}
            onClick={() => updatePreference('theme', 'dark')}
          >
            Dark Mode
          </button>
        </div>

        <div className="local-storage-toggle-grid">
          <label>
            <input
              type="checkbox"
              checked={preferences.autoplay}
              onChange={(event) => updatePreference('autoplay', event.target.checked)}
            />
            Autoplay next episode
          </label>
          <label>
            <input
              type="checkbox"
              checked={preferences.captions}
              onChange={(event) => updatePreference('captions', event.target.checked)}
            />
            Captions enabled
          </label>
        </div>

        <label className="local-storage-slider-label">
          <span>Volume</span>
          <strong>{preferences.volume}%</strong>
          <input
            type="range"
            min="0"
            max="100"
            value={preferences.volume}
            onChange={(event) => updatePreference('volume', Number(event.target.value))}
            aria-label="Volume preference"
          />
        </label>

        <label className="local-storage-select-label">
          <span>Preferred video quality</span>
          <select
            value={preferences.quality}
            onChange={(event) => updatePreference('quality', event.target.value)}
            aria-label="Video quality preference"
          >
            <option value="auto">Auto</option>
            <option value="720p">720p</option>
            <option value="1080p">1080p</option>
            <option value="4k">4K</option>
          </select>
        </label>

        <div className="local-storage-show-list">
          <p className="local-storage-eyebrow">Save Shows</p>
          {recommendedShows.map((showTitle) => (
            <button key={showTitle} type="button" onClick={() => handleSaveShow(showTitle)}>
              + {showTitle}
            </button>
          ))}
        </div>

        <div className="local-storage-saved-list" aria-label="Saved shows list">
          {preferences.savedShows.map((showTitle) => (
            <span key={showTitle}>
              {showTitle}
              <button type="button" onClick={() => handleRemoveShow(showTitle)} aria-label={`Remove ${showTitle}`}>
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="local-storage-status-card">
        <p className="local-storage-eyebrow">Storage + API Simulation</p>
        <h3>Persistence Dashboard</h3>

        <div className="local-storage-stat-grid">
          <article>
            <span>Hook Backup</span>
            <strong>{storageTools.status}</strong>
          </article>
          <article>
            <span>Saved Shows</span>
            <strong>{profile.savedShowCount}</strong>
          </article>
          <article>
            <span>API Status</span>
            <strong>{apiStatus}</strong>
          </article>
        </div>

        <div className="local-storage-chart-panel" aria-label="Preference persistence charts">
          <ChartBar label="Preference completeness" value={profile.completionScore} />
          <ChartBar label="Storage readiness" value={profile.storageReadinessScore} />
          <ChartBar label="API payload size" value={Math.min(100, Math.round(profile.apiPayloadSize / 2.4))} />
        </div>

        <div className="local-storage-api-preview">
          <div>
            <p className="local-storage-eyebrow">Mock API Request</p>
            <strong>{apiPayload.method} {apiPayload.endpoint}</strong>
          </div>
          <pre>{JSON.stringify(apiPayload.body, null, 2)}</pre>
        </div>

        <div className="local-storage-button-row">
          <button type="button" onClick={handleApiSync}>Simulate API Sync</button>
          <button type="button" onClick={storageTools.reset}>Reset Browser Preference</button>
        </div>
      </div>
    </section>
  )
}

function ChartBar({ label, value }) {
  const safeValue = Math.max(0, Math.min(100, value))

  return (
    <div className="local-storage-chart-row">
      <div className="local-storage-chart-label">
        <span>{label}</span>
        <strong>{safeValue}%</strong>
      </div>
      <div className="local-storage-chart-track">
        <span style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  )
}
