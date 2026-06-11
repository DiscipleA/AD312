import { useMemo, useState } from 'react'
import {
  buildPreferenceProfile,
  defaultStreamingPreferences,
  readStoredValue,
  resolveInitialValue,
  writeStoredValue,
} from '../assignments/week09/custom-use-local-storage-hook/useLocalStorage'

function createPanelStorage(seed = {}) {
  const store = new Map(Object.entries(seed))

  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null
    },
    setItem(key, value) {
      store.set(key, value)
    },
    removeItem(key) {
      store.delete(key)
    },
  }
}

const testCases = [
  {
    id: 'lazy-initializer',
    type: 'Normal',
    title: 'Lazy initializer provides the first value',
    description: 'Confirms the hook can use the function form of useState to create the default preference only when needed.',
    run() {
      const value = resolveInitialValue(() => ({ theme: 'dark' }))
      return value.theme === 'dark'
    },
  },
  {
    id: 'valid-json',
    type: 'Normal',
    title: 'Valid browser backup is loaded',
    description: 'Confirms localStorage data wins over the default value when the saved JSON is valid.',
    run() {
      const storage = createPanelStorage({ prefs: JSON.stringify({ theme: 'dark', volume: 40 }) })
      return readStoredValue('prefs', defaultStreamingPreferences, storage).theme === 'dark'
    },
  },
  {
    id: 'write-json',
    type: 'Normal',
    title: 'State is serialized for automatic backup',
    description: 'Confirms a React state object can be converted to JSON before localStorage receives it.',
    run() {
      const storage = createPanelStorage()
      return writeStoredValue('prefs', { theme: 'dark' }, storage).ok === true
    },
  },
  {
    id: 'empty-storage',
    type: 'Edge',
    title: 'Missing storage entry uses the fallback',
    description: 'Confirms a first-time visitor still receives a safe preference object.',
    run() {
      const storage = createPanelStorage()
      return readStoredValue('prefs', defaultStreamingPreferences, storage).theme === 'light'
    },
  },
  {
    id: 'malformed-json',
    type: 'Edge',
    title: 'Malformed JSON does not crash the UI',
    description: 'Confirms corrupted browser data falls back to a safe initial value.',
    run() {
      const storage = createPanelStorage({ prefs: '{not-valid-json' })
      return readStoredValue('prefs', defaultStreamingPreferences, storage).quality === 'auto'
    },
  },
  {
    id: 'storage-unavailable',
    type: 'Edge',
    title: 'Unavailable storage is handled safely',
    description: 'Confirms the helper reports storage-unavailable instead of throwing an error.',
    run() {
      return writeStoredValue('prefs', defaultStreamingPreferences, null).reason === 'storage-unavailable'
    },
  },
]

export default function UseLocalStorageTestPanel() {
  const [results, setResults] = useState({})

  const summary = useMemo(() => {
    const completed = testCases.filter((testCase) => results[testCase.id] === true).length
    return {
      completed,
      total: testCases.length,
      percent: Math.round((completed / testCases.length) * 100),
      normal: testCases.filter((testCase) => testCase.type === 'Normal' && results[testCase.id] === true).length,
      edge: testCases.filter((testCase) => testCase.type === 'Edge' && results[testCase.id] === true).length,
    }
  }, [results])

  function runCase(testCase) {
    setResults((previousResults) => ({
      ...previousResults,
      [testCase.id]: Boolean(testCase.run()),
    }))
  }

  function runAll() {
    const nextResults = {}
    testCases.forEach((testCase) => {
      nextResults[testCase.id] = Boolean(testCase.run())
    })
    setResults(nextResults)
  }

  return (
    <section className="local-storage-test-panel">
      <div className="local-storage-test-header">
        <p className="local-storage-kicker">Live Test Results</p>
        <h2>useLocalStorage Test Dashboard</h2>
        <p>
          Run the required normal and edge cases directly in the GUI. These tests mirror the Vitest coverage
          and demonstrate lazy initialization, JSON backup, safe fallbacks, and unavailable-storage handling.
        </p>
        <button type="button" onClick={runAll}>Run All GUI Tests</button>
      </div>

      <div className="local-storage-test-summary">
        <article>
          <span>Passed</span>
          <strong>{summary.completed}/{summary.total}</strong>
        </article>
        <article>
          <span>Normal Cases</span>
          <strong>{summary.normal}/3</strong>
        </article>
        <article>
          <span>Edge Cases</span>
          <strong>{summary.edge}/3</strong>
        </article>
      </div>

      <div className="local-storage-chart-panel" aria-label="Live test result chart">
        <ChartBar label="Overall completion" value={summary.percent} />
        <ChartBar label="Normal coverage" value={Math.round((summary.normal / 3) * 100)} />
        <ChartBar label="Edge coverage" value={Math.round((summary.edge / 3) * 100)} />
      </div>

      <div className="local-storage-test-grid">
        {testCases.map((testCase) => {
          const status = results[testCase.id]
          return (
            <article key={testCase.id} className={status ? 'passed' : ''}>
              <p className="local-storage-kicker">{testCase.type} Case</p>
              <h3>{testCase.title}</h3>
              <p>{testCase.description}</p>
              <div className="local-storage-test-actions">
                <button type="button" onClick={() => runCase(testCase)}>Run Case</button>
                <span>{status === true ? 'PASS' : 'WAITING'}</span>
              </div>
            </article>
          )
        })}
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
