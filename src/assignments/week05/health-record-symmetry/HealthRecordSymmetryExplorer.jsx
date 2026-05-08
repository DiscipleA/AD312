import { useMemo, useState } from 'react'
import { createHealthRecord, isHealthRecordSymmetric, linkedListToArray } from './HealthRecordSymmetry'
import '../../../styles/week05-health-record-symmetry-assignment.css'

const presets = [
  { label: 'Blood sugar returns to baseline', values: [95, 102, 110, 102, 95] },
  { label: 'Even heart-rate symmetry', values: [72, 88, 88, 72] },
  { label: 'Increasing trend, not symmetric', values: [80, 90, 100, 110] },
  { label: 'Single reading', values: [98] },
]

function parseMetrics(input) {
  return input
    .split(',')
    .map((value) => Number(value.trim()))
    .filter((value) => Number.isFinite(value))
}

export default function HealthRecordSymmetryExplorer() {
  const [metricInput, setMetricInput] = useState('95, 102, 110, 102, 95')
  const values = useMemo(() => parseMetrics(metricInput), [metricInput])
  const head = useMemo(() => createHealthRecord(values), [values])
  const symmetric = useMemo(() => isHealthRecordSymmetric(head), [head])
  const restoredValues = useMemo(() => linkedListToArray(head), [head])

  return (
    <section className="health-preview-card">
      <div className="health-preview-header">
        <p className="health-kicker">Working Preview</p>
        <h3>Patient Health Record Symmetry Checker</h3>
        <p>
          Type comma-separated metric readings. The preview builds a singly linked list, checks whether
          the sequence is symmetrical, and shows the list state after the requested pointer algorithm runs.
        </p>
      </div>

      <label className="health-input-label" htmlFor="health-metric-input">
        Health metric sequence
      </label>
      <input
        id="health-metric-input"
        value={metricInput}
        onChange={(event) => setMetricInput(event.target.value)}
        placeholder="95, 102, 110, 102, 95"
      />

      <div className="health-preset-row">
        {presets.map((preset) => (
          <button key={preset.label} type="button" onClick={() => setMetricInput(preset.values.join(', '))}>
            {preset.label}
          </button>
        ))}
      </div>

      <div className="health-result-grid">
        <article>
          <span>Parsed Readings</span>
          <strong>{values.length ? values.join(' → ') : 'No valid readings'}</strong>
        </article>
        <article className={symmetric ? 'health-pass' : 'health-warn'}>
          <span>Symmetry Result</span>
          <strong>{symmetric ? 'Symmetrical pattern detected' : 'Not symmetrical'}</strong>
        </article>
        <article>
          <span>List After Check</span>
          <strong>{restoredValues.length ? restoredValues.join(' → ') : 'Empty list'}</strong>
        </article>
      </div>
    </section>
  )
}
