import { useMemo, useState } from 'react'
import CodeBlock from '../components/CodeBlock'
import BubbleSortTestPanel from './BubbleSortTestPanel'
import solutionSyntax from '../assignments/week09/bubble-sort-optimization/BubbleSort.js?raw'
import consoleTestSyntax from '../assignments/week09/bubble-sort-optimization/BubbleSort.console-tests.js?raw'
import vitestSyntax from '../assignments/week09/bubble-sort-optimization/BubbleSort.test.js?raw'
import {
  buildBubbleSortPdfReport,
  downloadPdfFile,
} from '../assignments/week09/bubble-sort-optimization/BubbleSortPdfReport'
import {
  basicBubbleSort,
  buildRequiredBubbleSortCases,
  explainBubbleSortComplexity,
  generateRandomIntegerArray,
  optimizedBubbleSort,
} from '../assignments/week09/bubble-sort-optimization/BubbleSort'
import '../styles/week09-bubble-sort-assignment.css'

const starterSyntax = `function bubbleSort(arr) {
  for (let pass = 0; pass < arr.length - 1; pass++) {
    for (let i = 0; i < arr.length - 1 - pass; i++) {
      if (arr[i] > arr[i + 1]) {
        const temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
      }
    }
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

export default function Week09BubbleSortAssignmentGuide() {
  const [draftInput, setDraftInput] = useState('42, 7, 19, 3, 25, 11')
  const [submittedInput, setSubmittedInput] = useState('42, 7, 19, 3, 25, 11')
  const [lastAction, setLastAction] = useState('Example integer array loaded')
  const [reportStatus, setReportStatus] = useState('Report has not been generated yet.')

  const parsed = useMemo(() => parseIntegerInput(submittedInput), [submittedInput])
  const complexity = useMemo(() => explainBubbleSortComplexity(), [])
  const preview = useMemo(() => {
    const basic = basicBubbleSort(parsed.values)
    const optimized = optimizedBubbleSort(parsed.values)
    const requiredResults = buildRequiredBubbleSortCases(parsed.values).map((testCase) => ({
      ...testCase,
      basic: basicBubbleSort(testCase.input),
      optimized: optimizedBubbleSort(testCase.input),
    }))

    return { basic, optimized, requiredResults }
  }, [parsed.values])

  function runPreview() {
    setSubmittedInput(draftInput)
    setLastAction('Bubble Sort preview rebuilt from current input')
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
      sorted: '1, 2, 3, 4, 5, 6',
      descending: '9, 7, 5, 3, 1',
      same: '4, 4, 4, 4',
      empty: '',
      single: '8',
    }

    const nextInput = cases[kind]
    setDraftInput(nextInput)
    setSubmittedInput(nextInput)
    setLastAction(`Loaded ${kind || 'required'} test case`)
  }

  function generateReport() {
    const report = buildBubbleSortPdfReport({ customInput: parsed.values })
    downloadPdfFile('bubble-sort-week09-assignment1-report.pdf', report)
    setReportStatus('PDF report generated. Your browser should download bubble-sort-week09-assignment1-report.pdf.')
  }

  return (
    <article className="bubble-sort-assignment-guide">
      <header className="bubble-sort-hero-card bubble-sort-card">
        <p className="bubble-sort-kicker">AD312 • Week 09 • Assignment 01</p>
        <h1>Exploring and Optimizing Bubble Sort</h1>
        <p>
          Implement Bubble Sort in raw JavaScript, compare a basic full-pass version with an
          optimized early-exit version, test every required case, analyze complexity and stability,
          and generate a downloadable PDF report directly from the GUI.
        </p>
      </header>

      <section className="bubble-sort-card">
        <h2>Assignment Objective</h2>
        <p>
          This assignment solidifies Bubble Sort by connecting implementation, testing, optimization,
          and analysis. The completed source sorts integer arrays in ascending order, records passes,
          comparisons, and swaps, and explains why the optimized version improves the best case.
        </p>
      </section>

      <section className="bubble-sort-card">
        <h2>Required Test Coverage</h2>
        <ul className="bubble-sort-checklist">
          <li>Randomly generated array of integers.</li>
          <li>Array already sorted in ascending order for the best-case scenario.</li>
          <li>Array sorted in descending order for the worst-case scenario.</li>
          <li>Array where all elements are identical.</li>
          <li>Empty array edge case.</li>
          <li>Single-element array edge case.</li>
        </ul>
      </section>

      <section className="bubble-sort-preview-card">
        <div className="bubble-sort-preview-header">
          <p className="bubble-sort-kicker">Working Preview</p>
          <h2>Bubble Sort Lab</h2>
          <p>
            Enter comma-separated integers, run both algorithms, compare pass/comparison/swap counts,
            load required test cases, and generate the same report content requested by the assignment.
          </p>
        </div>

        <label className="bubble-sort-input-label" htmlFor="bubble-sort-input">
          Integer Array
          <input
            id="bubble-sort-input"
            value={draftInput}
            onChange={(event) => setDraftInput(event.target.value)}
            placeholder="42, 7, 19, 3, 25, 11"
          />
        </label>

        <div className="bubble-sort-actions" aria-label="Bubble sort controls">
          <button type="button" className="bubble-sort-primary-action" onClick={runPreview}>
            Run Bubble Sort
          </button>
          <button type="button" className="bubble-sort-secondary-action" onClick={loadRandomArray}>
            Generate Random Array
          </button>
          <button type="button" className="bubble-sort-report-action" onClick={generateReport}>
            Generate PDF Report
          </button>
        </div>

        <div className="bubble-sort-actions bubble-sort-case-actions" aria-label="Required case loaders">
          <button type="button" onClick={() => loadRequiredCase('sorted')}>Load Sorted</button>
          <button type="button" onClick={() => loadRequiredCase('descending')}>Load Descending</button>
          <button type="button" onClick={() => loadRequiredCase('same')}>Load Same Values</button>
          <button type="button" onClick={() => loadRequiredCase('empty')}>Load Empty</button>
          <button type="button" onClick={() => loadRequiredCase('single')}>Load Single</button>
          <span className="bubble-sort-action-note">{lastAction}</span>
        </div>

        <div className="bubble-sort-result-grid">
          <article className={parsed.invalidValues.length ? 'bubble-sort-warn' : 'bubble-sort-pass'}>
            <span>Input Status</span>
            <strong>{parsed.invalidValues.length ? `Check: ${parsed.invalidValues.join(', ')}` : 'All entered values are integers'}</strong>
          </article>
          <article>
            <span>Original Input</span>
            <strong>{formatArray(parsed.values)}</strong>
          </article>
          <article className="bubble-sort-pass">
            <span>Basic Bubble Sort</span>
            <strong>{formatArray(preview.basic.sortedArray)}</strong>
            <small>{preview.basic.passes} passes • {preview.basic.comparisons} comparisons • {preview.basic.swaps} swaps</small>
          </article>
          <article className="bubble-sort-pass">
            <span>Optimized Bubble Sort</span>
            <strong>{formatArray(preview.optimized.sortedArray)}</strong>
            <small>{preview.optimized.passes} passes • {preview.optimized.comparisons} comparisons • {preview.optimized.swaps} swaps</small>
          </article>
          <article>
            <span>Optimization</span>
            <strong>{Math.max(0, preview.basic.passes - preview.optimized.passes)} fewer passes • {Math.max(0, preview.basic.comparisons - preview.optimized.comparisons)} fewer comparisons</strong>
          </article>
          <article>
            <span>Report</span>
            <strong>{reportStatus}</strong>
          </article>
        </div>
      </section>

      <BubbleSortTestPanel />

      <section className="bubble-sort-card">
        <h2>Starter Shape</h2>
        <p>
          This compact version shows the core adjacent-comparison pattern. The completed version below
          adds validation, metrics, required test helpers, an optimized early-exit implementation, and
          PDF report generation support.
        </p>
        <CodeBlock language="js" label="Starter JavaScript" code={starterSyntax} />
      </section>

      <section className="bubble-sort-card bubble-sort-analysis-card">
        <h2>Complexity and Stability Summary</h2>
        <p><strong>Time:</strong> {complexity.time}</p>
        <p><strong>Space:</strong> {complexity.space}</p>
        <p><strong>Stability:</strong> {complexity.stability}</p>
      </section>

      <section className="bubble-sort-card">
        <h2>Full Source Code</h2>
        <p>
          The raw JavaScript implementation is the assignment solution. The React guide only imports it
          so the algorithm can be tested visually in the portfolio.
        </p>
        <CodeBlock language="js" label="src/assignments/week09/bubble-sort-optimization/BubbleSort.js" code={solutionSyntax} />
      </section>

      <section className="bubble-sort-card">
        <h2>Console-Log Tests</h2>
        <p>
          These console tests cover the required assignment cases and print operation counts so the
          complexity discussion is connected to visible behavior.
        </p>
        <CodeBlock language="js" label="src/assignments/week09/bubble-sort-optimization/BubbleSort.console-tests.js" code={consoleTestSyntax} />
      </section>

      <section className="bubble-sort-card">
        <h2>Vitest Tests</h2>
        <p>
          The official Vitest file includes at least three normal cases and three edge cases, plus an
          in-place mutation check and shared helper coverage.
        </p>
        <CodeBlock language="js" label="src/assignments/week09/bubble-sort-optimization/BubbleSort.test.js" code={vitestSyntax} />
      </section>

      <section className="bubble-sort-card">
        <h2>Manual Verification</h2>
        <ul>
          <li>Use the preview buttons to load every required test case.</li>
          <li>Confirm the Live Test Results panel passes all six assignment cases.</li>
          <li>Generate the PDF report and open it from your browser downloads.</li>
          <li>Run the raw JavaScript console test file with Node.</li>
          <li>Run the Vitest file for official automated checks.</li>
        </ul>
      </section>

      <section className="bubble-sort-card bubble-sort-summary-card">
        <h2>Summary</h2>
        <p>
          This assignment turns Bubble Sort into a complete learning lab: the GUI demonstrates the
          algorithm, the Live Test Results panel validates each required input category, the report
          documents implementation and analysis, and the tests keep the raw JavaScript solution verifiable.
        </p>
      </section>
    </article>
  )
}
