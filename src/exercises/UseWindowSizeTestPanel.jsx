import { useMemo, useState } from 'react'
import '../styles/assignment-test-panel.css'
import '../styles/week09-use-window-size-assignment.css'
import {
  MOBILE_BREAKPOINT,
  buildStreamingLayoutProfile,
  getViewportMode,
} from '../assignments/week09/custom-use-window-size-hook/useWindowSize'

const viewportCases = [
  {
    id: 'laptop-normal',
    label: 'Laptop Normal',
    kind: 'normal',
    width: 1366,
    height: 768,
    expectedMode: 'Full',
    reason: 'A laptop-sized window should use the richer full streaming layout.',
  },
  {
    id: 'tablet-normal',
    label: 'Tablet Normal',
    kind: 'normal',
    width: 900,
    height: 700,
    expectedMode: 'Full',
    reason: 'A wide tablet is still above the breakpoint, so it keeps the full layout.',
  },
  {
    id: 'phone-normal',
    label: 'Phone Normal',
    kind: 'normal',
    width: 390,
    height: 844,
    expectedMode: 'Mobile',
    reason: 'A phone-sized width should use compact controls and stacked content.',
  },
  {
    id: 'below-breakpoint',
    label: 'Breakpoint - 1',
    kind: 'edge',
    width: MOBILE_BREAKPOINT - 1,
    height: 720,
    expectedMode: 'Mobile',
    reason: 'One pixel below the breakpoint must still be classified as mobile.',
  },
  {
    id: 'exact-breakpoint',
    label: 'Exact Breakpoint',
    kind: 'edge',
    width: MOBILE_BREAKPOINT,
    height: 720,
    expectedMode: 'Full',
    reason: 'The breakpoint itself belongs to the full layout rule.',
  },
  {
    id: 'tiny-window',
    label: 'Tiny Window',
    kind: 'edge',
    width: 240,
    height: 320,
    expectedMode: 'Mobile',
    reason: 'Very small windows still need a safe compact layout instead of broken UI.',
  },
]

function runViewportCase(testCase) {
  const profile = buildStreamingLayoutProfile({
    width: testCase.width,
    height: testCase.height,
  })

  return {
    ...testCase,
    actualMode: getViewportMode(testCase.width),
    profile,
    passed: profile.mode === testCase.expectedMode,
    chartValue: profile.chartValue,
  }
}

export default function UseWindowSizeTestPanel() {
  const [selectedId, setSelectedId] = useState('laptop-normal')
  const results = useMemo(() => viewportCases.map(runViewportCase), [])
  const activeResult = results.find((result) => result.id === selectedId) ?? results[0]
  const passCount = results.filter((result) => result.passed).length
  const maxWidth = Math.max(...results.map((result) => result.width))

  return (
    <section className="assignment-test-panel use-window-live-panel">
      <div className="assignment-test-header">
        <div>
          <p className="assignment-test-kicker">Live Assignment Checks</p>
          <h2>useWindowSize Hook Test Runner with Charts</h2>
          <p className="assignment-test-summary">
            These live checks mirror the required normal and edge cases for the custom hook. The chart
            visualizes how each viewport width maps to the Mobile or Full streaming layout decision.
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
        <p><strong>Layout Name:</strong> {activeResult.profile.layoutName}</p>
        <p><strong>Reason:</strong> {activeResult.reason}</p>
      </div>

      <div className="use-window-chart-panel" aria-label="Viewport test case chart">
        <div className="use-window-chart-header">
          <h3>Viewport Width Comparison Chart</h3>
          <p>The vertical marker represents the {MOBILE_BREAKPOINT}px layout breakpoint.</p>
        </div>

        <div className="use-window-chart-grid">
          {results.map((result) => {
            const widthPercent = Math.max(4, Math.round((result.width / maxWidth) * 100))

            return (
              <article key={result.id} className={result.id === selectedId ? 'selected' : ''}>
                <div className="use-window-chart-row-label">
                  <span>{result.label}</span>
                  <strong>{result.width}px</strong>
                </div>
                <div className="use-window-chart-track">
                  <span style={{ width: `${widthPercent}%` }} />
                </div>
                <small>{result.actualMode}</small>
              </article>
            )
          })}
        </div>
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
              Expected {result.expectedMode} for {result.width}px and received {result.actualMode}.{' '}
              {result.kind === 'edge' ? 'Edge case protected.' : 'Normal case confirmed.'}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
