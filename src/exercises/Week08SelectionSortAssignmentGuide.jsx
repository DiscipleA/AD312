import { useMemo, useState } from 'react'
import CodeBlock from '../components/CodeBlock'
import SelectionSortTestPanel from './SelectionSortTestPanel'
import solutionSyntax from '../assignments/week08/selection-sort-analysis/SelectionSort.js?raw'
import consoleTestSyntax from '../assignments/week08/selection-sort-analysis/SelectionSort.console-tests.js?raw'
import vitestSyntax from '../assignments/week08/selection-sort-analysis/SelectionSort.test.js?raw'
import {
  buildFancySelectionSortPdfReport,
  downloadPdfFile,
} from '../assignments/week08/selection-sort-analysis/SelectionSortPdfReport'
import {
  explainSelectionSortStability,
  generateRandomIntegerArray,
  selectionSort,
  stableSelectionSort,
} from '../assignments/week08/selection-sort-analysis/SelectionSort'
import '../styles/week08-selection-sort-assignment.css'

const starterSyntax = `function selectionSortInPlace(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
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

export default function Week08SelectionSortAssignmentGuide() {
  const [draftInput, setDraftInput] = useState('42, 7, 19, 3, 25, 11')
  const [submittedInput, setSubmittedInput] = useState('42, 7, 19, 3, 25, 11')
  const [mode, setMode] = useState('asc')
  const [lastAction, setLastAction] = useState('Example integer array loaded')
  const [reportStatus, setReportStatus] = useState('Report has not been generated yet.')

  const parsed = useMemo(() => parseIntegerInput(submittedInput), [submittedInput])
  const preview = useMemo(() => {
    const regular = selectionSort(parsed.values, mode)
    const descending = selectionSort(parsed.values, 'desc')
    const stable = stableSelectionSort(parsed.values)

    return {
      regular,
      descending,
      stable,
      stability: explainSelectionSortStability(),
    }
  }, [parsed.values, mode])

  function runPreview() {
    setSubmittedInput(draftInput)
    setLastAction('Selection Sort preview rebuilt from current input')
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
    const report = buildFancySelectionSortPdfReport({ customInput: parsed.values })
    downloadPdfFile('selection-sort-week08-assignment1-report.pdf', report)
    setReportStatus('Fancy PDF report generated. Your browser should download selection-sort-week08-assignment1-report.pdf.')
  }

  return (
    <article className="selection-sort-assignment-guide">
      <header className="selection-sort-hero-card selection-sort-card">
        <p className="selection-sort-kicker">AD312 • Week 08 • Assignment 01</p>
        <h1>Implementing and Analyzing Selection Sort</h1>
        <p>
          Implement Selection Sort in raw JavaScript, test it with the required input categories,
          analyze time and space complexity, inspect stability, and generate a fancy downloadable PDF report
          directly from the GUI.
        </p>
      </header>

      <section className="selection-sort-card">
        <h2>Assignment Objective</h2>
        <p>
          The goal is to deepen understanding of Selection Sort through implementation, testing,
          and analysis. The completed source sorts integer arrays in ascending order by default,
          includes a descending enhancement, and demonstrates a stable variant for comparison.
        </p>
      </section>

      <section className="selection-sort-card">
        <h2>Required Test Coverage</h2>
        <ul className="selection-sort-checklist">
          <li>Randomly generated array of integers.</li>
          <li>Array already sorted in ascending order.</li>
          <li>Array sorted in descending order.</li>
          <li>Array with all elements being the same.</li>
          <li>Empty array edge case.</li>
          <li>Single-element array edge case.</li>
        </ul>
      </section>

      <section className="selection-sort-preview-card">
        <div className="selection-sort-preview-header">
          <p className="selection-sort-kicker">Working Preview</p>
          <h2>Selection Sort Lab</h2>
          <p>
            Enter comma-separated integers, choose ascending or descending mode, run the algorithm,
            inspect comparisons/swaps, and generate the same style of report described in the assignment.
          </p>
        </div>

        <label className="selection-sort-input-label" htmlFor="selection-sort-input">
          Integer Array
          <input
            id="selection-sort-input"
            value={draftInput}
            onChange={(event) => setDraftInput(event.target.value)}
            placeholder="42, 7, 19, 3, 25, 11"
          />
        </label>

        <div className="selection-sort-actions" aria-label="Selection sort controls">
          <button type="button" className="selection-sort-primary-action" onClick={runPreview}>
            Run Selection Sort
          </button>
          <button type="button" className="selection-sort-secondary-action" onClick={loadRandomArray}>
            Generate Random Array
          </button>
          <button type="button" className="selection-sort-secondary-action" onClick={() => setMode(mode === 'asc' ? 'desc' : 'asc')}>
            Toggle Mode: {mode === 'asc' ? 'Ascending' : 'Descending'}
          </button>
          <button type="button" className="selection-sort-report-action" onClick={generateReport}>
            Generate Fancy PDF Report
          </button>
        </div>

        <div className="selection-sort-actions selection-sort-case-actions" aria-label="Required case loaders">
          <button type="button" onClick={() => loadRequiredCase('sorted')}>Load Sorted</button>
          <button type="button" onClick={() => loadRequiredCase('descending')}>Load Descending</button>
          <button type="button" onClick={() => loadRequiredCase('same')}>Load Same Values</button>
          <button type="button" onClick={() => loadRequiredCase('empty')}>Load Empty</button>
          <button type="button" onClick={() => loadRequiredCase('single')}>Load Single</button>
          <span className="selection-sort-action-note">{lastAction}</span>
        </div>

        <div className="selection-sort-result-grid">
          <article className={parsed.invalidValues.length ? 'selection-sort-warn' : 'selection-sort-pass'}>
            <span>Input Status</span>
            <strong>{parsed.invalidValues.length ? `Check: ${parsed.invalidValues.join(', ')}` : 'All entered values are integers'}</strong>
          </article>
          <article>
            <span>Original Input</span>
            <strong>{formatArray(parsed.values)}</strong>
          </article>
          <article className="selection-sort-pass">
            <span>{mode === 'asc' ? 'Ascending Result' : 'Descending Result'}</span>
            <strong>{formatArray(preview.regular.sortedArray)}</strong>
            <small>{preview.regular.comparisons} comparisons • {preview.regular.swaps} swaps</small>
          </article>
          <article>
            <span>Stable Variant</span>
            <strong>{formatArray(preview.stable.sortedArray)}</strong>
            <small>{preview.stable.moves} shifts/moves instead of direct swaps</small>
          </article>
          <article>
            <span>Complexity</span>
            <strong>O(n²) time • O(1) extra space for regular in-place Selection Sort</strong>
          </article>
          <article>
            <span>Report</span>
            <strong>{reportStatus}</strong>
          </article>
        </div>
      </section>

      <SelectionSortTestPanel />

      <section className="selection-sort-card">
        <h2>Starter Shape</h2>
        <p>
          This is the compact form of Selection Sort. The completed version below adds validation,
          metrics, descending mode, stable-variant support, and report helpers.
        </p>
        <CodeBlock language="js" label="Starter JavaScript" code={starterSyntax} />
      </section>

      <section className="selection-sort-card">
        <h2>Full Source Code</h2>
        <p>
          The core algorithm uses an outer loop to choose each target position and an inner loop to
          search for the selected minimum or maximum value. The regular in-place version swaps values
          inside the same array.
        </p>
        <CodeBlock language="js" label="src/assignments/week08/selection-sort-analysis/SelectionSort.js" code={solutionSyntax} />
      </section>

      <section className="selection-sort-card">
        <h2>Console-Log Tests</h2>
        <p>
          These console tests keep the raw JavaScript path simple while covering the exact test cases
          requested by the assignment instructions.
        </p>
        <CodeBlock language="js" label="src/assignments/week08/selection-sort-analysis/SelectionSort.console-tests.js" code={consoleTestSyntax} />
      </section>

      <section className="selection-sort-card">
        <h2>Vitest Tests</h2>
        <p>
          The official Vitest file includes at least three normal cases and three edge cases, plus
          checks for in-place mutation, descending mode, and the stable variant.
        </p>
        <CodeBlock language="js" label="src/assignments/week08/selection-sort-analysis/SelectionSort.test.js" code={vitestSyntax} />
      </section>

      <section className="selection-sort-card">
        <h2>Analysis Notes</h2>
        <p>
          Selection Sort uses a nested-loop structure. The outer loop chooses the next final
          sorted position, and the inner loop scans the remaining unsorted values to find the
          next selected value. Because the remaining scan happens once for each selected position,
          the comparison count grows proportionally to n².
        </p>
        <ul>
          <li>The outer loop runs once for each final sorted position except the last automatically placed value.</li>
          <li>The inner loop scans the remaining unsorted portion of the array during every outer-loop pass.</li>
          <li>The comparison pattern is approximately n(n - 1) / 2, which simplifies to O(n²).</li>
          <li>The regular in-place algorithm uses O(1) extra space because it rearranges the same array with only a few index variables.</li>
        </ul>
      </section>

      <section className="selection-sort-card">
        <h2>Stability Notes</h2>
        <p>{preview.stability.summary}</p>
        <p>{preview.stability.reasoning}</p>
        <p>
          The stable enhancement avoids the direct swap. Instead, it saves the selected value,
          shifts the values between the insertion point and selected index, and inserts the selected
          value into its final position. This helps preserve equal-key order, but it can require more
          moves than the regular swap-based version.
        </p>
      </section>

      <section className="selection-sort-card">
        <h2>Manual Verification</h2>
        <ul>
          <li>Use the preview buttons to load each required test case.</li>
          <li>Confirm the Live Test Results panel passes all six required cases.</li>
          <li>Generate the fancy PDF report and open the PDF file from your browser downloads.</li>
          <li>Run the console test file with Node for raw JavaScript verification.</li>
          <li>Run the Vitest file for official automated checks.</li>
        </ul>
      </section>

      <section className="selection-sort-card selection-sort-summary-card">
        <h2>Summary</h2>
        <p>
          This assignment connects algorithm implementation with analysis. The GUI demonstrates the
          sorting process, the Live Test Results panel confirms required behavior, and the downloadable
          PDF report captures implementation, testing, complexity, stability, and enhancement observations.
        </p>
      </section>
    </article>
  )
}
