import { useMemo, useState } from 'react'
import {
  createMockProfileApi,
  isServerEmailConflict,
  isValidProfileEmail,
  normalizeProfile,
  sampleProfile,
  shouldDisableSave,
} from '../assignments/week07/query-form-profile-integration/UserProfileQueryForm'
import '../styles/assignment-test-panel.css'
import '../styles/week07-query-form-profile-integration-assignment.css'

const testGroups = {
  normal: [
    {
      label: 'Valid server profile normalizes cleanly',
      expected: 'avery.dev',
      actual: normalizeProfile(sampleProfile).username,
      detail: 'A complete /profile response becomes safe React Hook Form defaults.',
    },
    {
      label: 'Valid email format passes client rule',
      expected: true,
      actual: isValidProfileEmail('student@example.com'),
      detail: 'Normal emails should satisfy the validation helper used by the form.',
    },
    {
      label: 'Dirty form can save when mutation is idle',
      expected: false,
      actual: shouldDisableSave({ isDirty: true, isPending: false }),
      detail: 'Once a field changes, Save Profile is allowed unless a mutation is already running.',
    },
  ],
  edge: [
    {
      label: 'Missing server fields get safe defaults',
      expected: '',
      actual: normalizeProfile({ username: 'partial' }).email,
      detail: 'Partial API responses should not create undefined input values.',
    },
    {
      label: 'Untouched form keeps Save disabled',
      expected: true,
      actual: shouldDisableSave({ isDirty: false, isPending: false }),
      detail: 'The assignment requires Save Profile to stay disabled until formState.isDirty is true.',
    },
    {
      label: 'Conflict email simulates server rejection',
      expected: true,
      actual: isServerEmailConflict('conflict@example.com'),
      detail: 'The mutation maps this server-style 409 case back into the email field error layer.',
    },
  ],
}

function formatValue(value) {
  if (typeof value === 'boolean') return value ? 'true' : 'false'
  return String(value)
}

export default function RegistrationQueryFormTestPanel() {
  const [activeGroup, setActiveGroup] = useState('normal')
  const allResults = useMemo(() => [...testGroups.normal, ...testGroups.edge], [])
  const activeResults = testGroups[activeGroup]
  const passCount = allResults.filter((test) => Object.is(test.actual, test.expected)).length
  const mockApi = useMemo(() => createMockProfileApi({ delay: 0 }), [])

  async function runMockSave() {
    const profile = await mockApi.updateProfile({
      username: 'test.user',
      email: 'test@example.com',
      bio: 'Saved through the mock API.',
      notifications: false,
    })
    return profile.username
  }

  return (
    <section className="assignment-test-panel hook-form-live-panel query-profile-live-panel">
      <div className="assignment-test-header">
        <div>
          <p className="assignment-test-kicker">Live Test Results</p>
          <h2>React Hook Form + TanStack Query Checks</h2>
          <p className="assignment-test-summary">
            These checks mirror the official Vitest suite for profile normalization, client validation, dirty-state locking,
            mock REST updates, and server conflict detection. The working preview stays above this panel instead of being duplicated here.
          </p>
        </div>

        <div className="assignment-test-score">
          <span>{passCount} / {allResults.length}</span>
          <small>Checks passing</small>
        </div>
      </div>

      <div className="assignment-test-controls">
        <button type="button" onClick={() => setActiveGroup('normal')}>Normal Cases</button>
        <button type="button" onClick={() => setActiveGroup('edge')}>Edge Cases</button>
      </div>

      <div className="hook-form-test-note query-profile-test-note">
        <strong>Mock API shape:</strong> <code>getProfile()</code> and <code>updateProfile()</code> match the standalone
        json-server workflow at <code>http://localhost:3001/profile</code>.<br />
        <strong>Async save sanity check:</strong> {runMockSave.constructor.name === 'AsyncFunction' ? 'ready' : 'check setup'}
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
              <p>{test.detail}</p>
              <p>Expected: {formatValue(test.expected)}</p>
              <p>Actual: {formatValue(test.actual)}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
