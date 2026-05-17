import { useMemo, useState } from 'react'
import {
  getOppositeTheme,
  getStoredTheme,
  getTheme,
  normalizeThemeName,
  themes,
} from '../assignments/week06/global-theme-switcher/ThemeSwitcherApp'
import '../styles/assignment-test-panel.css'

const testGroups = {
  normal: [
    {
      label: 'Default theme starts in light mode',
      expected: 'light',
      actual: normalizeThemeName('light'),
    },
    {
      label: 'Toggle target from light is dark',
      expected: 'dark',
      actual: getOppositeTheme('light'),
    },
    {
      label: 'Dark mode exposes readable label metadata',
      expected: 'Dark Mode',
      actual: getTheme('dark').label,
    },
  ],
  edge: [
    {
      label: 'Invalid theme names fall back to light',
      expected: 'light',
      actual: normalizeThemeName('not-a-theme'),
    },
    {
      label: 'Theme registry includes only supported modes',
      expected: 'light,dark',
      actual: Object.keys(themes).join(','),
    },
    {
      label: 'Missing localStorage value returns null',
      expected: null,
      actual: getStoredTheme('ad312-week06-missing-theme'),
    },
  ],
}

function formatValue(value) {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  return String(value)
}

export default function ThemeSwitcherTestPanel() {
  const [activeGroup, setActiveGroup] = useState('normal')
  const allResults = useMemo(() => [...testGroups.normal, ...testGroups.edge], [])
  const activeResults = testGroups[activeGroup]
  const passCount = allResults.filter((test) => Object.is(test.actual, test.expected)).length

  return (
    <section className="assignment-test-panel theme-switcher-live-panel">
      <div className="assignment-test-header">
        <div>
          <p className="assignment-test-kicker">Live Test Results</p>
          <h2>Global Theme Switcher Test Runner</h2>
          <p className="assignment-test-summary">
            These checks mirror the official Vitest coverage for normal theme behavior and edge cases such as
            invalid theme values, supported mode limits, and missing saved preferences.
          </p>
        </div>

        <div className="assignment-test-score">
          <span>{passCount} / {allResults.length}</span>
          <small>Checks passing</small>
        </div>
      </div>

      <div className="assignment-test-controls">
        <button type="button" onClick={() => setActiveGroup('normal')}>
          Normal Cases
        </button>
        <button type="button" onClick={() => setActiveGroup('edge')}>
          Edge Cases
        </button>
      </div>

      <div className="assignment-test-grid">
        {activeResults.map((test) => {
          const passed = Object.is(test.actual, test.expected)

          return (
            <article
              key={test.label}
              className={passed ? 'assignment-test-card passed' : 'assignment-test-card pending'}
            >
              <div className="assignment-test-badge">{passed ? 'PASS' : 'WAIT'}</div>
              <h3>{test.label}</h3>
              <p>Expected: {formatValue(test.expected)}</p>
              <p>Actual: {formatValue(test.actual)}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
