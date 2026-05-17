import { useMemo, useState } from 'react'
import '../styles/assignment-test-panel.css'
import '../styles/week06-patient-record-merge-assignment.css'
import {
  Node,
  createPatientList,
  hasValidPrevLinks,
  listToDisplayStrings,
  mergeLists,
} from '../assignments/week06/patient-record-merge-doubly-linked-list/PatientRecordMerge'

const makeList = (records) => {
  if (records === null) return null
  if (records.length === 1) {
    const only = records[0]
    return new Node(only.ssn, only.age, only.name)
  }
  return createPatientList(records)
}

const scenarios = {
  normalSingleEach: {
    label: 'Normal 1: one record from each provider',
    healthMerge: [{ ssn: 10, age: 30, name: 'Alice' }],
    carePlus: [{ ssn: 20, age: 25, name: 'Bob' }],
    expected: ['10-Alice-30', '20-Bob-25'],
  },
  normalDuplicateSsn: {
    label: 'Normal 2: duplicate SSN preserved',
    healthMerge: [{ ssn: 10, age: 30, name: 'Alice' }],
    carePlus: [{ ssn: 10, age: 22, name: 'Alex' }],
    expected: ['10-Alice-30', '10-Alex-22'],
  },
  normalMiddleInsert: {
    label: 'Normal 3: weave a middle record',
    healthMerge: [
      { ssn: 10, age: 30, name: 'Alice' },
      { ssn: 30, age: 25, name: 'Bob' },
    ],
    carePlus: [{ ssn: 20, age: 22, name: 'Alex' }],
    expected: ['10-Alice-30', '20-Alex-22', '30-Bob-25'],
  },
  edgeMissingFirst: {
    label: 'Edge 1: HealthMerge list is empty',
    healthMerge: null,
    carePlus: [{ ssn: 10, age: 30, name: 'Alice' }],
    expected: ['10-Alice-30'],
  },
  edgeBothMissing: {
    label: 'Edge 2: both lists are empty',
    healthMerge: null,
    carePlus: null,
    expected: [],
  },
  edgeMissingSecond: {
    label: 'Edge 3: CarePlus list is empty',
    healthMerge: [{ ssn: 10, age: 30, name: 'Alice' }],
    carePlus: null,
    expected: ['10-Alice-30'],
  },
}

function formatInput(records) {
  if (records === null) return 'empty list'
  return records.map((record) => `${record.ssn}-${record.name}-${record.age}`).join(' → ')
}

function runScenario(scenario) {
  const mergedHead = mergeLists(makeList(scenario.healthMerge), makeList(scenario.carePlus))
  const actual = listToDisplayStrings(mergedHead)
  const sorted = actual.every((record, index, array) => {
    if (index === 0) return true
    return Number(array[index - 1].split('-')[0]) <= Number(record.split('-')[0])
  })
  const validPrevLinks = hasValidPrevLinks(mergedHead)
  const outputMatches = actual.join(',') === scenario.expected.join(',')

  return {
    ...scenario,
    actual,
    sorted,
    validPrevLinks,
    outputMatches,
    passed: outputMatches && sorted && validPrevLinks,
  }
}

export default function PatientRecordMergeTestPanel() {
  const [selectedKey, setSelectedKey] = useState('normalSingleEach')
  const results = useMemo(() => Object.values(scenarios).map(runScenario), [])
  const activeResult = runScenario(scenarios[selectedKey])
  const passCount = results.filter((result) => result.passed).length

  return (
    <section className="assignment-test-panel patient-merge-live-panel">
      <div className="assignment-test-header">
        <div>
          <p className="assignment-test-kicker">Live Assignment Checks</p>
          <h2>Patient Record Merge Test Runner</h2>
          <p className="assignment-test-summary">
            This visual panel mirrors the required three normal and three edge cases. It checks sorted output,
            duplicate SSN preservation, and valid <code>prev</code> links after the existing doubly linked-list nodes are merged.
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
        <p><strong>HealthMerge Input:</strong> {formatInput(activeResult.healthMerge)}</p>
        <p><strong>CarePlus Input:</strong> {formatInput(activeResult.carePlus)}</p>
        <p><strong>Expected:</strong> {activeResult.expected.length ? activeResult.expected.join(' → ') : 'empty list'}</p>
        <p><strong>Actual:</strong> {activeResult.actual.length ? activeResult.actual.join(' → ') : 'empty list'}</p>
        <p><strong>Sorted by SSN:</strong> {String(activeResult.sorted)}</p>
        <p><strong>Valid prev links:</strong> {String(activeResult.validPrevLinks)}</p>
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
              Expected {result.expected.length ? result.expected.join(' → ') : 'empty list'} and received{' '}
              {result.actual.length ? result.actual.join(' → ') : 'empty list'}.
              Sorted: {String(result.sorted)}. Prev links: {String(result.validPrevLinks)}.
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
