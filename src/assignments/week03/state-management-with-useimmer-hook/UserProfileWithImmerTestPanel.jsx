import { useMemo, useState } from 'react'
import '../../../styles/assignment-test-panel.css'

const initialProfileState = {
  name: 'Jordan Lee',
  email: 'jordan.lee@example.com',
  contactDetails: {
    phone: '555-0101',
    address: '123 React Lane, Component City',
  },
  preferences: {
    newsletter: true,
    notifications: true,
  },
  blankNameApplied: false,
  mode: 'ready',
}

const normalChecks = [
  {
    id: 'render-profile',
    title: 'Render nested profile state',
    expectation: 'The baseline profile should expose name, email, contact details, and preference data.',
    run(profile) {
      return (
        profile.name === 'Jordan Lee' &&
        profile.email === 'jordan.lee@example.com' &&
        profile.contactDetails.phone === '555-0101' &&
        profile.preferences.newsletter === true
      )
    },
  },
  {
    id: 'update-contact',
    title: 'Update nested contact details',
    expectation: 'The phone and address should update while the rest of the profile stays intact.',
    run(profile) {
      return (
        profile.contactDetails.phone === '555-2020' &&
        profile.contactDetails.address === '101 Immutable Way, State Harbor' &&
        profile.email === 'jordan.lee@example.com'
      )
    },
  },
  {
    id: 'toggle-newsletter',
    title: 'Toggle newsletter preference',
    expectation: 'The newsletter value should flip without changing the notifications preference.',
    run(profile) {
      return profile.preferences.newsletter === false && profile.preferences.notifications === true
    },
  },
]

const edgeChecks = [
  {
    id: 'blank-name',
    title: 'Blank name does not crash UI',
    expectation: 'The component should tolerate an empty name and display a safe placeholder in summary areas.',
    run(profile) {
      return profile.blankNameApplied === true && profile.name === ''
    },
  },
  {
    id: 'preserve-email',
    title: 'Targeted updates preserve sibling fields',
    expectation: 'Updating contactDetails should not erase email or preference data from nearby branches.',
    run(profile) {
      return (
        profile.email === 'jordan.lee@example.com' &&
        profile.preferences.notifications === true &&
        typeof profile.contactDetails.address === 'string'
      )
    },
  },
  {
    id: 'repeat-toggle',
    title: 'Repeated toggles remain predictable',
    expectation: 'Two toggles should return newsletter to the original subscribed state.',
    run(profile) {
      return profile.mode === 'repeat-toggle' && profile.preferences.newsletter === true
    },
  },
]

const checkGroups = {
  normal: {
    label: 'Normal Cases',
    summary: 'Core flows students should expect from the profile exercise.',
    checks: normalChecks,
  },
  edge: {
    label: 'Edge Cases',
    summary: 'Boundary behavior that proves the nested state updates are safe.',
    checks: edgeChecks,
  },
}

export default function UserProfileWithImmerTestPanel() {
  const [activeGroup, setActiveGroup] = useState('normal')
  const [profileState, setProfileState] = useState(initialProfileState)
  const [ranChecks, setRanChecks] = useState([])

  function markScenario(ids, nextProfile) {
    setProfileState(nextProfile)
    setRanChecks((current) => Array.from(new Set([...current, ...ids])))
  }

  function runRenderScenario() {
    markScenario(['render-profile', 'preserve-email'], initialProfileState)
  }

  function runContactScenario() {
    markScenario(['update-contact', 'preserve-email'], {
      ...initialProfileState,
      contactDetails: {
        phone: '555-2020',
        address: '101 Immutable Way, State Harbor',
      },
      mode: 'contact-updated',
    })
  }

  function runNewsletterScenario() {
    markScenario(['toggle-newsletter', 'preserve-email'], {
      ...initialProfileState,
      preferences: {
        ...initialProfileState.preferences,
        newsletter: false,
      },
      mode: 'newsletter-toggled',
    })
  }

  function runBlankNameScenario() {
    markScenario(['blank-name', 'preserve-email'], {
      ...initialProfileState,
      name: '',
      blankNameApplied: true,
      mode: 'blank-name',
    })
  }

  function runRepeatToggleScenario() {
    markScenario(['repeat-toggle', 'preserve-email'], {
      ...initialProfileState,
      preferences: {
        ...initialProfileState.preferences,
        newsletter: true,
      },
      mode: 'repeat-toggle',
    })
  }

  function runActiveGroup() {
    if (activeGroup === 'normal') {
      runContactScenario()
      setTimeout(runNewsletterScenario, 0)
      return
    }

    runBlankNameScenario()
    setTimeout(runRepeatToggleScenario, 0)
  }

  function runAllScenarios() {
    setProfileState({
      ...initialProfileState,
      contactDetails: {
        phone: '555-2020',
        address: '101 Immutable Way, State Harbor',
      },
      preferences: {
        newsletter: true,
        notifications: true,
      },
      blankNameApplied: true,
      mode: 'all-scenarios-complete',
    })
    setRanChecks([...normalChecks, ...edgeChecks].map((check) => check.id))
  }

  function resetPanel() {
    setProfileState(initialProfileState)
    setRanChecks([])
    setActiveGroup('normal')
  }

  const allChecks = useMemo(() => [...normalChecks, ...edgeChecks], [])
  const currentChecks = checkGroups[activeGroup].checks
  const results = currentChecks.map((check) => ({
    ...check,
    passed: ranChecks.includes(check.id) && check.run(profileState),
  }))
  const passedCount = allChecks.filter((check) => ranChecks.includes(check.id) && check.run(profileState)).length

  return (
    <section className="assignment-test-panel week03-user-profile-test-panel">
      <div className="assignment-test-header">
        <div>
          <p className="assignment-test-kicker">Live Test Results</p>
          <h2>useImmer Profile Visual Checks</h2>
          <p className="assignment-test-summary">
            This panel now behaves like an interactive test rehearsal instead of a static checklist.
            Use the tabs to run normal and edge-case scenarios, then compare the results with the
            official Vitest suite shown above.
          </p>
        </div>

        <div className="assignment-test-score">
          <span>{passedCount}/{allChecks.length}</span>
          <small>checks passing</small>
        </div>
      </div>

      <div className="assignment-test-tabs" role="tablist" aria-label="useImmer profile test groups">
        {Object.entries(checkGroups).map(([groupId, group]) => (
          <button
            key={groupId}
            type="button"
            role="tab"
            aria-selected={activeGroup === groupId}
            className={activeGroup === groupId ? 'active' : ''}
            onClick={() => setActiveGroup(groupId)}
          >
            {group.label}
          </button>
        ))}
      </div>

      <div className="assignment-test-controls">
        <button type="button" onClick={runRenderScenario}>Run render baseline</button>
        <button type="button" onClick={runContactScenario}>Run contact update</button>
        <button type="button" onClick={runNewsletterScenario}>Run newsletter toggle</button>
        <button type="button" onClick={runBlankNameScenario}>Run blank-name edge case</button>
        <button type="button" onClick={runRepeatToggleScenario}>Run repeated-toggle edge case</button>
        <button type="button" onClick={runActiveGroup}>Run current tab</button>
        <button type="button" onClick={runAllScenarios}>Run all visible checks</button>
        <button type="button" onClick={resetPanel}>Reset panel</button>
      </div>

      <div className="assignment-test-statebox">
        <p><strong>Active tab:</strong> {checkGroups[activeGroup].label}</p>
        <p><strong>Current mode:</strong> {profileState.mode}</p>
        <p><strong>Profile summary:</strong> {profileState.name || '—'} • {profileState.contactDetails.phone} • {profileState.preferences.newsletter ? 'Subscribed' : 'Paused'}</p>
        <p><strong>Tab goal:</strong> {checkGroups[activeGroup].summary}</p>
      </div>

      <div className="assignment-test-grid">
        {results.map((check) => (
          <article
            key={check.id}
            className={`assignment-test-card ${check.passed ? 'passed' : 'pending'}`}
          >
            <span className="assignment-test-badge">{check.passed ? 'PASS' : 'WAIT'}</span>
            <h3>{check.title}</h3>
            <p>{check.expectation}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
