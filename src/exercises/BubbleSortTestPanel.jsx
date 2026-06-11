import { useMemo, useState } from 'react'
import '../styles/assignment-test-panel.css'
import '../styles/week09-bubble-sort-assignment.css'
import {
  buildRequiredBubbleSortCases,
  runBubbleSortCase,
} from '../assignments/week09/bubble-sort-optimization/BubbleSort'

const defaultRandom = [42, 7, 19, 3, 25, 11]

function formatArray(values) {
  return values.length ? `[${values.join(', ')}]` : '[]'
}

export default function BubbleSortTestPanel() {
  const [selectedId, setSelectedId] = useState('random-array')
  const results = useMemo(() => (
    buildRequiredBubbleSortCases(defaultRandom).map((testCase) => runBubbleSortCase(testCase))
  ), [])
  const activeResult = results.find((result) => result.id === selectedId) ?? results[0]
  const passCount = results.filter((result) => result.passed).length

  return (
    <section className="assignment-test-panel bubble-sort-live-panel">
      <div className="assignment-test-header">
        <div>
          <p className="assignment-test-kicker">Live Assignment Checks</p>
          <h2>Bubble Sort Required Test Runner</h2>
          <p className="assignment-test-summary">
            This panel mirrors the required assignment cases and compares the basic algorithm
            against the optimized early-exit version.
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
        <p><strong>Basic Actual:</strong> {formatArray(activeResult.basicActual)}</p>
        <p><strong>Optimized Actual:</strong> {formatArray(activeResult.optimizedActual)}</p>
        <p><strong>Basic:</strong> {activeResult.basic.passes} passes • {activeResult.basic.comparisons} comparisons • {activeResult.basic.swaps} swaps</p>
        <p><strong>Optimized:</strong> {activeResult.optimized.passes} passes • {activeResult.optimized.comparisons} comparisons • {activeResult.optimized.swaps} swaps</p>
        <p><strong>Savings:</strong> {activeResult.passSavings} passes • {activeResult.comparisonSavings} comparisons</p>
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
              Expected {formatArray(result.expected)}. Basic returned {formatArray(result.basicActual)};
              optimized returned {formatArray(result.optimizedActual)}.
              {result.kind === 'edge' ? ' Edge case protected.' : ' Normal case confirmed.'}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
