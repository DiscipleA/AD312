import { useMemo, useState } from 'react'
import {
  createSubmissionSummary,
  hasDraftValues,
  isStrongPassword,
  isValidEmail,
  passwordsMatch,
  roleOptions,
  safeParseDraft,
} from '../assignments/week07/react-hook-form-registration/UserRegistrationForm'
import '../styles/assignment-test-panel.css'
import '../styles/week07-react-hook-form-registration-assignment.css'

const testGroups = {
  normal: [
    {
      label: 'Valid email pattern passes',
      expected: true,
      actual: isValidEmail('avery@example.com'),
      detail: 'A normal registration needs a real email-shaped value.',
    },
    {
      label: 'Strong password passes policy',
      expected: true,
      actual: isStrongPassword('Secure123'),
      detail: 'The password includes uppercase, lowercase, number, and 8+ characters.',
    },
    {
      label: 'Matching password confirmation passes',
      expected: true,
      actual: passwordsMatch('Secure123', 'Secure123'),
      detail: 'Confirm Password must mirror the currently watched password value.',
    },
  ],
  edge: [
    {
      label: 'Malformed email fails',
      expected: false,
      actual: isValidEmail('not-an-email'),
      detail: 'A missing domain or extension should not satisfy the email rule.',
    },
    {
      label: 'Weak password fails',
      expected: false,
      actual: isStrongPassword('password'),
      detail: 'A lowercase-only password is too weak for the stated policy.',
    },
    {
      label: 'Broken draft cache is ignored',
      expected: null,
      actual: safeParseDraft('{broken json'),
      detail: 'Malformed localStorage content should not crash the form.',
    },
  ],
}

function formatValue(value) {
  if (value === null) return 'null'
  if (typeof value === 'boolean') return value ? 'true' : 'false'
  return String(value)
}

export default function RegistrationFormTestPanel() {
  const [activeGroup, setActiveGroup] = useState('normal')
  const allResults = useMemo(() => [...testGroups.normal, ...testGroups.edge], [])
  const activeResults = testGroups[activeGroup]
  const passCount = allResults.filter((test) => Object.is(test.actual, test.expected)).length

  return (
    <section className="assignment-test-panel hook-form-live-panel">
      <div className="assignment-test-header">
        <div>
          <p className="assignment-test-kicker">Live Test Results</p>
          <h2>React Hook Form Validation Checks</h2>
          <p className="assignment-test-summary">
            These browser-safe checks mirror the official Vitest coverage for validation rules, password matching,
            role metadata, submission summaries, and malformed draft-cache handling.
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

      <div className="hook-form-test-note">
        <strong>Role options:</strong> {roleOptions.join(', ')}<br />
        <strong>Sample summary:</strong> {createSubmissionSummary({ fullName: 'Mina Park', role: 'Designer', email: 'mina@example.com' })}
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
