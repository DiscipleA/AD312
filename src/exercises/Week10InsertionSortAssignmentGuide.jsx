import { useMemo, useState } from 'react'
import CodeBlock from '../components/CodeBlock'
import InsertionSortTestPanel from './InsertionSortTestPanel'
import solutionSyntax from '../assignments/week10/insertion-sort-analysis/InsertionSort.js?raw'
import consoleTestSyntax from '../assignments/week10/insertion-sort-analysis/InsertionSort.console-tests.js?raw'
import vitestSyntax from '../assignments/week10/insertion-sort-analysis/InsertionSort.test.js?raw'
import {
  buildInsertionSortPdfReport,
  downloadPdfFile,
} from '../assignments/week10/insertion-sort-analysis/InsertionSortPdfReport'
import {
  analyzeInsertionSortPerformance,
  buildNearlySortedArray,
  buildRequiredInsertionSortCases,
  buildReversedArray,
  demonstrateInsertionSortStability,
  explainInsertionSortComplexity,
  generateRandomIntegerArray,
  insertionSort,
  runInsertionSortCase,
} from '../assignments/week10/insertion-sort-analysis/InsertionSort'
import '../styles/week10-insertion-sort-assignment.css'

const starterSyntax = `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = key;
  }

  return arr;
}`

function parseIntegerInput(input) {
  const invalidValues = []
  const values = input
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const value = Number(item)
      if (!Number.isInteger(value)) {
        invalidValues.push(item)
        return null
      }
      return value
    })
    .filter((value) => value !== null)

  return { values, invalidValues }
}

function formatArray(values) {
  return values.length ? values.join(', ') : 'empty array'
}

export default function Week10InsertionSortAssignmentGuide() {
  const [draftInput, setDraftInput] = useState('42, 7, 19, 3, 25, 11')
  const [submittedInput, setSubmittedInput] = useState('42, 7, 19, 3, 25, 11')
  const [lastAction, setLastAction] = useState('Example integer array loaded')
  const [reportStatus, setReportStatus] = useState('Report has not been generated yet.')
  const [analysis, setAnalysis] = useState(null)

  const parsed = useMemo(() => parseIntegerInput(submittedInput), [submittedInput])
  const complexity = useMemo(() => explainInsertionSortComplexity(), [])
  const stability = useMemo(() => demonstrateInsertionSortStability(), [])
  const preview = useMemo(() => {
    const sorted = insertionSort(parsed.values)
    const requiredResults = buildRequiredInsertionSortCases(parsed.values).map(runInsertionSortCase)

    return { sorted, requiredResults }
  }, [parsed.values])

  function runPreview() {
    setSubmittedInput(draftInput)
    setLastAction('Insertion Sort preview rebuilt from current input')
  }

  function loadRandomArray() {
    const randomValues = generateRandomIntegerArray(8, 1, 99)
    const nextInput = randomValues.join(', ')
    setDraftInput(nextInput)
    setSubmittedInput(nextInput)
    setLastAction('Random array generated and sorted')
  }

  function loadRequiredCase(kind) {
    const cases = {
      small: '5, 2, 9, 1, 5, 6',
      large: generateRandomIntegerArray(24, 1, 999).join(', '),
      nearly: buildNearlySortedArray(12).join(', '),
      reversed: buildReversedArray(12).join(', '),
      duplicates: '4, 4, 2, 4, 1, 2',
      empty: '',
      single: '8',
    }

    const nextInput = cases[kind]
    setDraftInput(nextInput)
    setSubmittedInput(nextInput)
    setLastAction(`Loaded ${kind || 'required'} test case`)
  }

  function runAnalysis() {
    setAnalysis(analyzeInsertionSortPerformance())
    setLastAction('Best, worst, and average-case metrics generated')
  }

  function generateReport() {
    const report = buildInsertionSortPdfReport({ customInput: parsed.values })
    downloadPdfFile('insertion-sort-week10-assignment1-report.pdf', report)
    setReportStatus('PDF report generated. Your browser should download insertion-sort-week10-assignment1-report.pdf.')
  }

  return (
    <article className="insertion-sort-assignment-guide">
      <header className="insertion-sort-hero-card insertion-sort-card">
        <p className="insertion-sort-kicker">AD312 • Week 10 • Assignment 01</p>
        <h1>Implementing and Analyzing Insertion Sort</h1>
        <p>
          Implement stable Insertion Sort in raw JavaScript, test the required array categories,
          analyze best/worst/average performance, prove stability with object records, reflect on
          practical use cases, and generate a downloadable PDF report directly from the GUI.
        </p>
      </header>

      <section className="insertion-sort-card">
        <h2>Assignment Objective</h2>
        <p>
          The completed work focuses on the algorithm itself. The sorting implementation is plain
          JavaScript, while this React page acts as the portfolio interface for running experiments,
          viewing metrics, launching Live Test Results, and downloading the final report.
        </p>
      </section>

      <section className="insertion-sort-card">
        <h2>Required Test Coverage</h2>
        <ul className="insertion-sort-checklist">
          <li>Small array correctness check.</li>
          <li>Large randomly generated array.</li>
          <li>Nearly sorted array for best-case analysis.</li>
          <li>Reversed array for worst-case analysis.</li>
          <li>Duplicate values and object-record stability demonstration.</li>
          <li>Empty array and single-element edge cases.</li>
        </ul>
      </section>

      <section className="insertion-sort-preview-card">
        <div className="insertion-sort-preview-header">
          <p className="insertion-sort-kicker">Working Preview</p>
          <h2>Insertion Sort Lab</h2>
          <p>
            Enter comma-separated integers, run the stable insertion sort implementation, load every
            required test category, generate metrics analysis, and download the PDF report requested
            by the assignment.
          </p>
        </div>

        <label className="insertion-sort-input-label" htmlFor="insertion-sort-input">
          Integer Array
          <input
            id="insertion-sort-input"
            value={draftInput}
            onChange={(event) => setDraftInput(event.target.value)}
            placeholder="42, 7, 19, 3, 25, 11"
          />
        </label>

        <div className="insertion-sort-action-group" aria-label="Primary insertion sort controls">
          <button type="button" className="insertion-sort-primary-action" onClick={runPreview}>
            Run Insertion Sort
          </button>
          <button type="button" className="insertion-sort-secondary-action" onClick={loadRandomArray}>
            Generate Random Array
          </button>
          <button type="button" className="insertion-sort-metrics-action" onClick={runAnalysis}>
            Run Metrics Analysis
          </button>
          <button type="button" className="insertion-sort-report-action" onClick={generateReport}>
            Generate PDF Report
          </button>
        </div>

        <div className="insertion-sort-case-toolbar" aria-label="Required insertion sort case loaders">
          <span>Load required case:</span>
          <button type="button" onClick={() => loadRequiredCase('small')}>Small Array</button>
          <button type="button" onClick={() => loadRequiredCase('large')}>Large Random</button>
          <button type="button" onClick={() => loadRequiredCase('nearly')}>Nearly Sorted</button>
          <button type="button" onClick={() => loadRequiredCase('reversed')}>Reversed</button>
          <button type="button" onClick={() => loadRequiredCase('duplicates')}>Duplicates</button>
          <button type="button" onClick={() => loadRequiredCase('empty')}>Empty</button>
          <button type="button" onClick={() => loadRequiredCase('single')}>Single</button>
        </div>

        <p className="insertion-sort-action-note">{lastAction}</p>

        <div className="insertion-sort-result-grid">
          <article className={parsed.invalidValues.length ? 'insertion-sort-warn' : 'insertion-sort-pass'}>
            <span>Input Status</span>
            <strong>{parsed.invalidValues.length ? `Check: ${parsed.invalidValues.join(', ')}` : 'All entered values are integers'}</strong>
          </article>
          <article>
            <span>Original Input</span>
            <strong>{formatArray(parsed.values)}</strong>
          </article>
          <article className="insertion-sort-pass">
            <span>Stable Insertion Sort</span>
            <strong>{formatArray(preview.sorted.sortedArray)}</strong>
            <small>{preview.sorted.passes} passes • {preview.sorted.comparisons} comparisons • {preview.sorted.shifts} shifts • {preview.sorted.writes} writes</small>
          </article>
          <article>
            <span>Stability Demo</span>
            <strong>{stability.stable ? 'Equal-key order preserved' : 'Needs review'}</strong>
            <small>Expected key=2 order: {JSON.stringify(stability.originalOrderForKeyTwo)}. Observed: {JSON.stringify(stability.sortedOrderForKeyTwo)}.</small>
          </article>
          <article>
            <span>Space Complexity</span>
            <strong>O(1) auxiliary space</strong>
            <small>The in-place function shifts values inside the same array.</small>
          </article>
          <article>
            <span>Report</span>
            <strong>{reportStatus}</strong>
          </article>
        </div>

        <div className="insertion-sort-metrics-window" aria-live="polite">
          <div>
            <p className="insertion-sort-kicker">Metrics Analysis Window</p>
            <h3>Best, Worst, and Average Case Metrics</h3>
            <p>
              Use the <strong>Run Metrics Analysis</strong> button to generate the timing, comparison,
              shift, and write measurements that support the report tables.
            </p>
          </div>

          {analysis ? (
            <>
              <div className="insertion-sort-table-wrap">
                <table className="insertion-sort-table">
                  <thead>
                    <tr>
                      <th>Scenario</th>
                      <th>n</th>
                      <th>ms</th>
                      <th>Comparisons</th>
                      <th>Shifts</th>
                      <th>Writes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Best / nearly sorted</td>
                      <td>{analysis.best.sortedArray.length}</td>
                      <td>{analysis.best.elapsedMs}</td>
                      <td>{analysis.best.comparisons}</td>
                      <td>{analysis.best.shifts}</td>
                      <td>{analysis.best.writes}</td>
                    </tr>
                    <tr>
                      <td>Worst / reversed</td>
                      <td>{analysis.worst.sortedArray.length}</td>
                      <td>{analysis.worst.elapsedMs}</td>
                      <td>{analysis.worst.comparisons}</td>
                      <td>{analysis.worst.shifts}</td>
                      <td>{analysis.worst.writes}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="insertion-sort-table-wrap">
                <table className="insertion-sort-table">
                  <thead>
                    <tr>
                      <th>n</th>
                      <th>Trials</th>
                      <th>Avg ms</th>
                      <th>Avg comparisons</th>
                      <th>Avg shifts</th>
                      <th>Avg writes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysis.average.map((row) => (
                      <tr key={row.size}>
                        <td>{row.size}</td>
                        <td>{row.trials}</td>
                        <td>{row.averageMs}</td>
                        <td>{row.averageComparisons}</td>
                        <td>{row.averageShifts}</td>
                        <td>{row.averageWrites}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="insertion-sort-metrics-empty">
              <p>No generated metrics yet. The report generator can still run, but this window lets you inspect the measurements inside the GUI first.</p>
            </div>
          )}
        </div>
      </section>

      <InsertionSortTestPanel />

      <section className="insertion-sort-card">
        <h2>Analysis and Reflection Summary</h2>
        <div className="insertion-sort-reflection-grid">
          <article>
            <h3>Best Case</h3>
            <p>{complexity.bestCase}</p>
          </article>
          <article>
            <h3>Worst Case</h3>
            <p>{complexity.worstCase}</p>
          </article>
          <article>
            <h3>Average Case</h3>
            <p>{complexity.averageCase}</p>
          </article>
          <article>
            <h3>Space Complexity</h3>
            <p>{complexity.space}</p>
          </article>
          <article>
            <h3>Efficiency</h3>
            <p>{complexity.smallVsLarge}</p>
          </article>
          <article>
            <h3>Applications and Variations</h3>
            <p>{complexity.applications} {complexity.improvements}</p>
          </article>
        </div>
      </section>

      <section className="insertion-sort-card">
        <h2>Starter Algorithm Shape</h2>
        <p>
          This compact version shows the basic shift-and-insert idea. The completed source adds
          validation, metrics, stability helpers, generated analysis data, console tests, Vitest tests,
          and report-generation helpers.
        </p>
        <CodeBlock code={starterSyntax} language="javascript" />
      </section>

      <section className="insertion-sort-card">
        <h2>Completed Source Code</h2>
        <p>
          The source file is intentionally raw JavaScript. React only imports these helpers so the
          assignment can be tested through the GUI.
        </p>
        <CodeBlock code={solutionSyntax} language="javascript" />
      </section>

      <section className="insertion-sort-card">
        <h2>Console Tests</h2>
        <p>
          These tests stay simple and runnable with Node. They verify required cases, in-place behavior,
          non-mutating wrapper behavior, and stable object ordering.
        </p>
        <CodeBlock code={consoleTestSyntax} language="javascript" />
      </section>

      <section className="insertion-sort-card">
        <h2>Vitest Tests</h2>
        <p>
          The official Vitest suite includes at least three normal cases and three edge cases, plus
          stability and in-place behavior checks.
        </p>
        <CodeBlock code={vitestSyntax} language="javascript" />
      </section>

      <section className="insertion-sort-card">
        <h2>Manual Verification</h2>
        <ul>
          <li>Use the preview buttons to load every required Insertion Sort test case.</li>
          <li>Click Run Metrics Analysis and confirm the best, worst, and average tables appear under the preview.</li>
          <li>Confirm the Live Test Results panel passes the required algorithm and stability checks.</li>
          <li>Generate the PDF report and open it from your browser downloads.</li>
          <li>Run the raw JavaScript console test file with Node.</li>
          <li>Run the Vitest file for official automated checks.</li>
        </ul>
      </section>

      <section className="insertion-sort-card insertion-sort-summary-card">
        <h2>Summary</h2>
        <p>
          This assignment turns Insertion Sort into a full learning lab: the GUI demonstrates the
          stable raw JavaScript algorithm, the metrics window supports the report analysis, the Live
          Test Results panel validates required cases, the PDF report documents implementation and
          reflection, and the console/Vitest tests keep the solution verifiable.
        </p>
      </section>

      <section className="insertion-sort-card">
        <h2>How to Run Locally</h2>
        <CodeBlock
          language="bash"
          code={`npm install
npm test -- src/assignments/week10/insertion-sort-analysis/InsertionSort.test.js
node src/assignments/week10/insertion-sort-analysis/InsertionSort.console-tests.js
npm run build`}
        />
      </section>
    </article>
  )
}
