import { useMemo, useState } from 'react'
import '../styles/assignment-test-panel.css'
import '../styles/week05-health-record-symmetry-assignment.css'
import {
  HealthMetricNode,
  createHealthRecord,
  isHealthRecordSymmetric,
  linkedListToArray,
} from '../assignments/week05/health-record-symmetry/HealthRecordSymmetry'

const scenarios = {
  oddSymmetric: {
    label: 'Odd-length symmetric record',
    values: [95, 102, 110, 102, 95],
    expected: true,
  },
  evenSymmetric: {
    label: 'Even-length symmetric record',
    values: [72, 88, 88, 72],
    expected: true,
  },
  notSymmetric: {
    label: 'Non-symmetric trend',
    values: [80, 90, 100, 110],
    expected: false,
  },
  empty: {
    label: 'Empty record',
    values: [],
    expected: true,
  },
  single: {
    label: 'Single reading',
    values: [98],
    expected: true,
  },
  twoDifferent: {
    label: 'Two different readings',
    values: [120, 121],
    expected: false,
  },
}

function runScenario(scenario) {
  const head = scenario.values.length === 1
    ? new HealthMetricNode(scenario.values[0])
    : createHealthRecord(scenario.values)

  const actual = isHealthRecordSymmetric(head)
  const restored = linkedListToArray(head)

  return {
    ...scenario,
    actual,
    restored,
    passed: actual === scenario.expected,
  }
}

export default function HealthRecordSymmetryTestPanel() {
  const [selectedKey, setSelectedKey] = useState('oddSymmetric')
  const results = useMemo(() => Object.values(scenarios).map(runScenario), [])
  const activeResult = runScenario(scenarios[selectedKey])
  const passCount = results.filter((result) => result.passed).length

  return (
    <section className="assignment-test-panel health-live-panel">
      <div className="assignment-test-header">
        <div>
          <p className="assignment-test-kicker">Live Assignment Checks</p>
          <h2>Health Record Symmetry Test Runner</h2>
          <p className="assignment-test-summary">
            This visual panel mirrors the six required console-log tests. It checks three normal cases,
            three edge cases, using the requested concise O(n) / O(1) linked-list palindrome algorithm.
          </p>
        </div>

        <div className="assignment-test-score">
          <span>{passCount} / {results.length}</span>
          <small>Checks passing</small>
        </div>
      </div>

      <div className="assignment-test-controls">
        {Object.entries(scenarios).map(([key, scenario]) => (
          <button key={key} type="button" onClick={() => setSelectedKey(key)}>
            {scenario.label}
          </button>
        ))}
      </div>

      <div className="assignment-test-statebox">
        <p><strong>Selected Case:</strong> {activeResult.label}</p>
        <p><strong>Input:</strong> {activeResult.values.length ? activeResult.values.join(' → ') : 'empty list'}</p>
        <p><strong>Expected:</strong> {String(activeResult.expected)}</p>
        <p><strong>Actual:</strong> {String(activeResult.actual)}</p>
        <p><strong>List After Check:</strong> {activeResult.restored.length ? activeResult.restored.join(' → ') : 'empty list'}</p>
      </div>

      <div className="assignment-test-grid">
        {results.map((result) => (
          <article
            key={result.label}
            className={result.passed ? 'assignment-test-card passed' : 'assignment-test-card pending'}
          >
            <div className="assignment-test-badge">{result.passed ? 'PASS' : 'WAIT'}</div>
            <h3>{result.label}</h3>
            <p>
              Expected {String(result.expected)} and received {String(result.actual)}. List after check:{' '}
              {result.restored.length ? result.restored.join(' → ') : 'empty list'}.
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
