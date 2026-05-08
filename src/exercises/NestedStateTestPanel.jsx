import { useMemo, useState } from 'react'
import '../styles/assignment-test-panel.css'

const starterProfile = {
  name: 'Jordan Lee',
  email: 'jordan.lee@example.com',
  address: {
    street: '123 React Lane',
    city: 'Component City',
    country: 'Frontendland',
  },
}

const scenarios = [
  {
    id: 'initial-shape',
    label: 'Initial shape',
    description: 'The profile starts with top-level identity fields and a nested address object.',
    run(profile) {
      return Boolean(profile.name && profile.email && profile.address)
    },
  },
  {
    id: 'nested-update',
    label: 'Nested update',
    description: 'Updating the address changes the nested values that are displayed on screen.',
    run(profile) {
      return (
        profile.address.street === '456 State Street' &&
        profile.address.city === 'Hooksville' &&
        profile.address.country === 'Reactonia'
      )
    },
  },
  {
    id: 'parent-preserved',
    label: 'Parent preserved',
    description: 'The top-level name and email remain unchanged while only the nested address is replaced.',
    run(profile) {
      return profile.name === starterProfile.name && profile.email === starterProfile.email
    },
  },
  {
    id: 'blank-values',
    label: 'Blank-safe edge case',
    description: 'The UI should still handle an update where the nested address fields are blank strings.',
    run(profile) {
      return (
        profile.address.street === '' &&
        profile.address.city === '' &&
        profile.address.country === ''
      )
    },
  },
]

export default function NestedStateTestPanel() {
  const [profile, setProfile] = useState(starterProfile)
  const [mode, setMode] = useState('initial')

  function applyProfile(nextAddress, nextMode) {
    setProfile((currentProfile) => ({
      ...currentProfile,
      address: {
        ...currentProfile.address,
        ...nextAddress,
      },
    }))
    setMode(nextMode)
  }

  function resetProfile() {
    setProfile(starterProfile)
    setMode('initial')
  }

  const checks = useMemo(() => {
    return scenarios.map((scenario) => ({
      ...scenario,
      passed:
        scenario.id === 'initial-shape'
          ? scenario.run(starterProfile)
          : mode === 'updated' && scenario.id !== 'blank-values'
            ? scenario.run(profile)
            : mode === 'blank' && scenario.id === 'blank-values'
              ? scenario.run(profile)
              : false,
    }))
  }, [mode, profile])

  const passedCount = checks.filter((item) => item.passed).length

  return (
    <section className="assignment-test-panel">
      <div className="assignment-test-header">
        <div>
          <p className="assignment-test-kicker">Live Test Results</p>
          <h2>Nested State Visual Checks</h2>
          <p className="assignment-test-summary">
            This panel mirrors the assignment logic in an educational way. It helps students
            see what should be true before and after a nested address update, while the real
            automated checks still live in the official Vitest suite.
          </p>
        </div>

        <div className="assignment-test-score">
          <span>{passedCount}/{checks.length}</span>
          <small>checks passing</small>
        </div>
      </div>

      <div className="assignment-test-controls">
        <button
          type="button"
          onClick={() =>
            applyProfile(
              {
                street: '456 State Street',
                city: 'Hooksville',
                country: 'Reactonia',
              },
              'updated'
            )
          }
        >
          Run normal update scenario
        </button>
        <button
          type="button"
          onClick={() =>
            applyProfile(
              {
                street: '',
                city: '',
                country: '',
              },
              'blank'
            )
          }
        >
          Run blank-value edge case
        </button>
        <button type="button" onClick={resetProfile}>
          Reset panel state
        </button>
      </div>

      <div className="assignment-test-statebox">
        <p><strong>Current mode:</strong> {mode}</p>
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Street:</strong> {profile.address.street || '(empty)'}</p>
        <p><strong>City:</strong> {profile.address.city || '(empty)'}</p>
        <p><strong>Country:</strong> {profile.address.country || '(empty)'}</p>
      </div>

      <div className="assignment-test-grid">
        {checks.map((check) => (
          <article
            key={check.id}
            className={`assignment-test-card ${check.passed ? 'passed' : 'pending'}`}
          >
            <span className="assignment-test-badge">
              {check.passed ? 'PASS' : 'WAIT'}
            </span>
            <h3>{check.label}</h3>
            <p>{check.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
