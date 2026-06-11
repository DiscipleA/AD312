import { useMemo, useState } from 'react'
import '../styles/assignment-test-panel.css'
import '../styles/week10-error-boundary-assignment.css'
import { buildChartPoints, marketScenarios, summarizeMarketScenario, validateMarketPayload } from '../assignments/week10/error-boundary-safety-net/ErrorBoundarySafetyNet.helpers.js'

const liveChecks = [
  { id: 'healthy-feed', label: 'Healthy feed renders', kind: 'normal', run: () => ({ passed: validateMarketPayload(marketScenarios.healthy.payload).ok, detail: 'Valid symbol, price, percent change, and numeric history are accepted.' }) },
  { id: 'volatile-feed', label: 'Volatile valid feed', kind: 'normal', run: () => ({ passed: validateMarketPayload(marketScenarios.volatile.payload).ok, detail: 'Sharp market movement is not an error when the payload shape is still valid.' }) },
  { id: 'chart-feed', label: 'Market chart data', kind: 'normal', run: () => { const points = buildChartPoints(marketScenarios.healthy.payload.history); return { passed: points.split(' ').length === marketScenarios.healthy.payload.history.length, detail: 'Every history item becomes one SVG point for the market chart.' } } },
  { id: 'corrupted-feed', label: 'Corrupted payload fallback', kind: 'edge', run: () => { const summary = summarizeMarketScenario(marketScenarios.corrupted); return { passed: summary.expectedBoundary, detail: summary.reason } } },
  { id: 'missing-feed', label: 'Missing payload fallback', kind: 'edge', run: () => { const summary = summarizeMarketScenario(marketScenarios.missing); return { passed: summary.expectedBoundary, detail: summary.reason } } },
  { id: 'render-crash', label: 'Render crash isolation', kind: 'edge', run: () => { const summary = summarizeMarketScenario(marketScenarios.thrown); return { passed: summary.expectedBoundary, detail: summary.reason } } },
]

export default function ErrorBoundarySafetyNetTestPanel() {
  const [selectedId, setSelectedId] = useState('healthy-feed')
  const results = useMemo(() => liveChecks.map((check) => ({ ...check, ...check.run() })), [])
  const activeResult = results.find((result) => result.id === selectedId) ?? results[0]
  const passCount = results.filter((result) => result.passed).length
  return <section className="assignment-test-panel error-boundary-live-panel"><div className="assignment-test-header"><div><p className="assignment-test-kicker">Live Assignment Checks</p><h2>Error Boundary Required Test Runner</h2><p className="assignment-test-summary">This panel mirrors the required normal and edge cases: valid widgets render, corrupted widgets fall back, and the rest of the dashboard remains safe.</p></div><div className="assignment-test-score"><span>{passCount} / {results.length}</span><small>Checks passing</small></div></div><div className="assignment-test-controls">{results.map((result) => <button key={result.id} type="button" onClick={() => setSelectedId(result.id)}>{result.label}</button>)}</div><div className="assignment-test-statebox error-boundary-statebox"><p><strong>Selected Case:</strong> {activeResult.label}</p><p><strong>Case Type:</strong> {activeResult.kind === 'normal' ? 'Normal case' : 'Edge case'}</p><p><strong>Expected:</strong> {activeResult.kind === 'normal' ? 'Render the market widget.' : 'Show fallback UI and keep the dashboard alive.'}</p><p><strong>Actual:</strong> {activeResult.detail}</p></div><div className="assignment-test-grid error-boundary-test-grid">{results.map((result) => <article key={result.id} className={result.passed ? 'assignment-test-card passed' : 'assignment-test-card pending'}><div className="assignment-test-badge">{result.passed ? 'PASS' : 'WAIT'}</div><h3>{result.label}</h3><p>{result.detail}</p></article>)}</div></section>
}
