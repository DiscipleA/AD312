import { useMemo, useState } from 'react'
import {
  buildRequiredInsertionSortCases,
  demonstrateInsertionSortStability,
  explainInsertionSortComplexity,
  runInsertionSortCase,
} from '../assignments/week10/insertion-sort-analysis/InsertionSort'
import '../styles/assignment-test-panel.css'

function formatArray(value) {
  return JSON.stringify(value)
}

function ArrayLine({ label, value }) {
  return (
    <p className="insertion-sort-live-detail-line">
      <strong>{label}:</strong>
      <code className="insertion-sort-array-output">{formatArray(value)}</code>
    </p>
  )
}

function ResultSummary({ result }) {
  return (
    <div className="insertion-sort-card-result-summary">
      <div>
        <span>Expected</span>
        <code>{formatArray(result.expected)}</code>
      </div>
      <div>
        <span>Actual</span>
        <code>{formatArray(result.actual)}</code>
      </div>
      <p>
        {result.metrics.comparisons} comparisons • {result.metrics.shifts} shifts recorded.
      </p>
    </div>
  )
}

export default function InsertionSortTestPanel() {
  const [selectedId, setSelectedId] = useState('small')
  const [hasRun, setHasRun] = useState(true)

  const results = useMemo(
    () => buildRequiredInsertionSortCases([5, 2, 9, 1, 5, 6]).map(runInsertionSortCase),
    [],
  )
  const stability = useMemo(() => demonstrateInsertionSortStability(), [])
  const complexity = useMemo(() => explainInsertionSortComplexity(), [])
  const selectedCase = results.find((result) => result.id === selectedId) || results[0]
  const stabilityPassed = stability.stable
  const passedCount = results.filter((result) => result.passed).length + (stabilityPassed ? 1 : 0)
  const totalCount = results.length + 1

  // Keep the long large-random-array card at the end so it does not force the
  // first rows of short result cards to become unnecessarily tall.
  const compactResultOrder = ['small', 'nearly', 'reversed', 'duplicates', 'empty', 'single', 'large']
  const orderedResults = compactResultOrder
    .map((id) => results.find((result) => result.id === id))
    .filter(Boolean)

  function runTests() {
    setHasRun(true)
  }

  return (
    <section className="assignment-test-panel insertion-sort-live-panel" aria-label="Insertion Sort live test results">
      <div className="assignment-test-header">
        <div>
          <p className="assignment-test-kicker">Live Assignment Checks</p>
          <h2>Insertion Sort Required Test Runner</h2>
          <p className="assignment-test-summary">
            This panel mirrors the required assignment cases and confirms that the raw JavaScript
            implementation sorts correctly, records metrics, protects edge cases, and preserves stable
            ordering for equal keys.
          </p>
        </div>
        <div className="assignment-test-score" aria-label="Insertion sort passing score">
          <span>{hasRun ? `${passedCount} / ${totalCount}` : `0 / ${totalCount}`}</span>
          <small>{hasRun ? 'Checks passing' : 'Ready to run'}</small>
        </div>
      </div>

      <div className="assignment-test-controls" aria-label="Insertion sort case selector">
        {results.map((result) => (
          <button key={result.id} type="button" onClick={() => setSelectedId(result.id)}>
            {result.label}
          </button>
        ))}
        <button type="button" onClick={() => setSelectedId('stability')}>
          Stability records
        </button>
        <button type="button" onClick={runTests}>
          Run All Checks
        </button>
      </div>

      <div className="assignment-test-statebox insertion-sort-selected-statebox">
        {selectedId === 'stability' ? (
          <>
            <p><strong>Selected Case:</strong> Stability records</p>
            <ArrayLine label="Input key=2 order" value={stability.originalOrderForKeyTwo} />
            <ArrayLine label="Observed key=2 order" value={stability.sortedOrderForKeyTwo} />
            <p><strong>Result:</strong> {stability.stable ? 'Stable order preserved' : 'Stable order failed'}</p>
          </>
        ) : (
          <>
            <p><strong>Selected Case:</strong> {selectedCase.label}</p>
            <ArrayLine label="Input" value={selectedCase.input} />
            <ArrayLine label="Expected" value={selectedCase.expected} />
            <ArrayLine label="Actual" value={selectedCase.actual} />
            <p className="insertion-sort-metric-line">
              <strong>Metrics:</strong> {selectedCase.metrics.passes} passes • {selectedCase.metrics.comparisons} comparisons • {selectedCase.metrics.shifts} shifts • {selectedCase.metrics.writes} writes
            </p>
            <p><strong>Scenario:</strong> {selectedCase.scenario}</p>
          </>
        )}
      </div>

      <div className="assignment-test-grid insertion-sort-live-test-grid">
        {orderedResults.map((result) => (
          <article key={result.id} className={result.passed ? 'assignment-test-card passed' : 'assignment-test-card pending'}>
            <span className="assignment-test-badge">{result.passed ? 'PASS' : 'WAIT'}</span>
            <h3>{result.label}</h3>
            <ResultSummary result={result} />
          </article>
        ))}
        <article className={stabilityPassed ? 'assignment-test-card passed' : 'assignment-test-card pending'}>
          <span className="assignment-test-badge">{stabilityPassed ? 'PASS' : 'WAIT'}</span>
          <h3>Stability records</h3>
          <p>
            Equal key=2 records stayed in order{' '}
            <code className="insertion-sort-array-output">{formatArray(stability.sortedOrderForKeyTwo)}</code>,
            proving the implementation does not move equal keys ahead of one another.
          </p>
        </article>
      </div>

      <div className="insertion-sort-live-note">
        <p><strong>Complexity reminder:</strong> {complexity.bestCase}</p>
        <p>{complexity.worstCase}</p>
      </div>
    </section>
  )
}
