import { useMemo, useState } from 'react'
import UserProfileWithImmer from '../../../exercises/UserProfileWithImmer'
import '../../../styles/assignment-test-panel.css'

const checks = [
  {
    id: 'render-profile',
    title: 'Render initial nested profile state',
    description:
      'The UI should immediately show the default name, email, phone, address, and preferences so students can see the baseline structure they are about to update.',
  },
  {
    id: 'update-contact',
    title: 'Update nested contact details with draft syntax',
    description:
      'Changing phone or address should update only the relevant nested contact fields, which demonstrates how useImmer removes spread-heavy boilerplate.',
  },
  {
    id: 'toggle-newsletter',
    title: 'Toggle newsletter without harming unrelated state',
    description:
      'The newsletter checkbox should switch between subscribed and not subscribed while leaving notifications, email, and contact details intact.',
  },
  {
    id: 'edge-cases',
    title: 'Handle edge cases safely',
    description:
      'Blank names, repeated changes, and isolated nested updates should still render predictable output and should not break the component tree.',
  },
]

export default function UserProfileWithImmerTestPanel() {
  const [completedChecks, setCompletedChecks] = useState([])
  const [interactionCount, setInteractionCount] = useState(0)

  function markCheck(id) {
    setCompletedChecks((current) => (current.includes(id) ? current : [...current, id]))
    setInteractionCount((current) => current + 1)
  }

  const score = useMemo(() => `${completedChecks.length}/${checks.length}`, [completedChecks])

  return (
    <section className="assignment-test-panel">
      <div className="assignment-test-header">
        <div>
          <p className="assignment-test-kicker">Live Test Results</p>
          <h2>Educational validation panel for the useImmer profile exercise</h2>
          <p className="assignment-test-summary">
            This visible panel does not replace Vitest. Instead, it helps students rehearse the
            same expectations visually before or while running the official test suite.
          </p>
        </div>

        <div className="assignment-test-score">
          <span>{score}</span>
          <small>Checks marked complete</small>
        </div>
      </div>

      <div className="assignment-test-controls">
        {checks.map((check) => (
          <button key={check.id} type="button" onClick={() => markCheck(check.id)}>
            Mark: {check.title}
          </button>
        ))}
      </div>

      <div className="assignment-test-statebox">
        <p><strong>Interactions:</strong> {interactionCount}</p>
        <p><strong>Completed checks:</strong> {completedChecks.join(', ') || 'None yet'}</p>
        <p>
          <strong>Why this matters:</strong> students should compare what they see in this demo with
          what the formal test cases assert in the real <code>.test.jsx</code> file.
        </p>
      </div>

      <div className="assignment-test-grid">
        {checks.map((check) => {
          const passed = completedChecks.includes(check.id)

          return (
            <article
              key={check.id}
              className={`assignment-test-card ${passed ? 'passed' : 'pending'}`}
            >
              <span className="assignment-test-badge">{passed ? 'PASS' : 'WAIT'}</span>
              <h3>{check.title}</h3>
              <p>{check.description}</p>
            </article>
          )
        })}
      </div>

      <div style={{ marginTop: '20px' }}>
        <UserProfileWithImmer />
      </div>
    </section>
  )
}
