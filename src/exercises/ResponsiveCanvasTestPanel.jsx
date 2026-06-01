import { useMemo, useState } from 'react'
import '../styles/assignment-test-panel.css'
import '../styles/week08-responsive-canvas-assignment.css'
import {
  buildResponsiveCanvasTestCases,
  runResponsiveCanvasCase,
} from '../assignments/week08/responsive-canvas-useeffect/ResponsiveCanvas'

export default function ResponsiveCanvasTestPanel() {
  const [selectedId, setSelectedId] = useState('desktop-wide')
  const results = useMemo(() => buildResponsiveCanvasTestCases().map(runResponsiveCanvasCase), [])
  const activeResult = results.find((result) => result.id === selectedId) ?? results[0]
  const passCount = results.filter((result) => result.passed).length

  return (
    <section className="assignment-test-panel responsive-canvas-live-panel">
      <div className="assignment-test-header">
        <div>
          <p className="assignment-test-kicker">Live Assignment Checks</p>
          <h2>Responsive Canvas useEffect Test Runner</h2>
          <p className="assignment-test-summary">
            This panel validates normal desktop/mobile behavior plus edge cases around the exact
            breakpoint, one pixel below the breakpoint, and a tiny browser window.
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
        <p><strong>Viewport:</strong> {activeResult.width}px × {activeResult.height}px</p>
        <p><strong>Expected Mode:</strong> {activeResult.expectedMode}</p>
        <p><strong>Actual Mode:</strong> {activeResult.actualMode}</p>
        <p><strong>Actual Layout:</strong> {activeResult.actualLayout}</p>
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
              Expected {result.expectedMode} for {result.width}px × {result.height}px and received{' '}
              {result.actualMode}. {result.kind === 'edge' ? 'Edge case protected.' : 'Normal case confirmed.'}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
