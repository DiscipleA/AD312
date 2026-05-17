import { useMemo, useState } from 'react'
import '../styles/assignment-test-panel.css'
import '../styles/week06-context-refactor-assignment.css'
import { describePropPath, getPreviewTheme, getUserById } from '../assignments/week06/context-refactor-to-context/ContextRefactorApp'

const testGroups = {
  normal: [
    {
      label: 'Default context user is Maya Chen',
      expected: 'Maya Chen',
      actual: getUserById('maya').name,
    },
    {
      label: 'Nested profile can display user email',
      expected: 'andre.patel@healthmerge.example',
      actual: getUserById('andre').email,
    },
    {
      label: 'Original prop-drilling path is documented',
      expected: 'App → Dashboard → Sidebar → UserProfile',
      actual: describePropPath().join(' → '),
    },
  ],
  edge: [
    {
      label: 'Missing user id falls back safely',
      expected: 'Maya Chen',
      actual: getUserById('not-a-real-user').name,
    },
    {
      label: 'User preference resolves Temporary Staff mode',
      expected: 'sunriseReview',
      actual: getPreviewTheme(getUserById('temp'), 'user'),
    },
    {
      label: 'Explicit high contrast override wins',
      expected: 'highContrast',
      actual: getPreviewTheme(getUserById('maya'), 'highContrast'),
    },
  ],
}

function formatValue(value) {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  return String(value)
}

export default function ContextRefactorTestPanel() {
  const [activeGroup, setActiveGroup] = useState('normal')
  const allResults = useMemo(() => [...testGroups.normal, ...testGroups.edge], [])
  const activeResults = testGroups[activeGroup]
  const passCount = allResults.filter((test) => Object.is(test.actual, test.expected)).length

  return (
    <section className="assignment-test-panel context-refactor-live-panel">
      <div className="assignment-test-header">
        <div>
          <p className="assignment-test-kicker">Live Test Results</p>
          <h2>Context Refactor Test Runner</h2>
          <p className="assignment-test-summary">
            These checks mirror the official Vitest coverage for normal context usage and edge cases such as
            unknown users, user-preference theme resolution, and explicit preview-mode overrides.
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
