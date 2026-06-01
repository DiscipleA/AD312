import { useMemo, useState } from 'react'
import '../styles/assignment-test-panel.css'
import '../styles/week08-selection-sort-assignment.css'
import {
  buildRequiredSelectionSortCases,
  runSelectionSortCase,
} from '../assignments/week08/selection-sort-analysis/SelectionSort'

const defaultRandom = [42, 7, 19, 3, 25, 11]

function formatArray(values) {
  return values.length ? `[${values.join(', ')}]` : '[]'
}

export default function SelectionSortTestPanel() {
  const [selectedId, setSelectedId] = useState('random-array')
  const results = useMemo(() => (
    buildRequiredSelectionSortCases(defaultRandom).map((testCase) => runSelectionSortCase(testCase))
  ), [])
  const activeResult = results.find((result) => result.id === selectedId) ?? results[0]
  const passCount = results.filter((result) => result.passed).length

  return (
    <section className="assignment-test-panel selection-sort-live-panel">
      <div className="assignment-test-header">
        <div>
          <p className="assignment-test-kicker">Live Assignment Checks</p>
          <h2>Selection Sort Required Test Runner</h2>
          <p className="assignment-test-summary">
            This panel mirrors the required assignment cases: random input, already sorted input,
            descending input, all-same values, an empty array, and a single-element array.
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
        <p><strong>Input:</strong> {formatArray(activeResult.input)}</p>
        <p><strong>Expected:</strong> {formatArray(activeResult.expected)}</p>
        <p><strong>Actual:</strong> {formatArray(activeResult.actual)}</p>
        <p><strong>Comparisons:</strong> {activeResult.comparisons}</p>
        <p><strong>Swaps:</strong> {activeResult.swaps}</p>
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
              Expected {formatArray(result.expected)} and received {formatArray(result.actual)}.
              {result.kind === 'edge' ? ' Edge case protected.' : ' Normal case confirmed.'}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
