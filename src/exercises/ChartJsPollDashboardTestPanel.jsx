import { useMemo, useState } from 'react'
import '../styles/assignment-test-panel.css'
import '../styles/week08-chartjs-poll-dashboard-assignment.css'
import {
  buildPollDashboardTestCases,
  runPollDashboardCase,
} from '../assignments/week08/chartjs-poll-dashboard/DynamicPollDashboard'

export default function ChartJsPollDashboardTestPanel() {
  const [selectedId, setSelectedId] = useState('initial-state')
  const results = useMemo(() => buildPollDashboardTestCases().map(runPollDashboardCase), [])
  const activeResult = results.find((result) => result.id === selectedId) ?? results[0]
  const passCount = results.filter((result) => result.passed).length

  return (
    <section className="assignment-test-panel chart-live-panel">
      <div className="assignment-test-header">
        <div>
          <p className="assignment-test-kicker">Live Assignment Checks</p>
          <h2>Chart.js Integration Test Runner</h2>
          <p className="assignment-test-summary">
            This panel validates the data rules that feed the Chart.js dashboard: initial state,
            valid votes, multiple votes, invalid input, reset behavior, and numeric vote totals.
          </p>
        </div>

        <div className="assignment-test-score">
          <span>{passCount} / {results.length}</span>
          <small>Checks passing</small>
        </div>
      </div>

      <div className="assignment-test-controls">
        {results.map((result) => (
          <button key={result.id} type="button" onClick={() => setSelectedId(result.id)}>
            {result.label}
          </button>
        ))}
      </div>

      <div className="assignment-test-statebox">
        <p><strong>Selected Case:</strong> {activeResult.label}</p>
        <p><strong>Case Type:</strong> {activeResult.kind === 'edge' ? 'Edge Case' : 'Normal Case'}</p>
        <p><strong>Expected:</strong> {Array.isArray(activeResult.expected) ? activeResult.expected.join(', ') : activeResult.expected}</p>
        <p><strong>Actual:</strong> {Array.isArray(activeResult.actual) ? activeResult.actual.join(', ') : activeResult.actual}</p>
        <p><strong>Reason:</strong> {activeResult.reason}</p>
      </div>

      <div className="assignment-test-grid">
        {results.map((result) => (
          <article
            key={result.id}
            className={result.passed ? 'assignment-test-card passed' : 'assignment-test-card pending'}
          >
            <div className="assignment-test-badge">{result.passed ? 'PASS' : 'WAIT'}</div>
            <h3>{result.label}</h3>
            <p>
              {result.kind === 'edge' ? 'Edge case protected.' : 'Normal behavior confirmed.'}{' '}
              {result.reason}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
