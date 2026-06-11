/**
 * Week 9 Assignment 1 Console Tests
 * -----------------------------------------------------------------------------
 * Run from the project root with:
 *
 *   node src/assignments/week09/bubble-sort-optimization/BubbleSort.console-tests.js
 *
 * Why this file exists:
 * -----------------------------------------------------------------------------
 * The assignment asks for testing, and the portfolio also includes Vitest tests.
 * This console file gives a second, very transparent testing path where each
 * required case prints its input, expected output, actual output, and operation
 * counts. It is intentionally simple so the algorithm can be checked without
 * opening the browser.
 *
 * What the console tests cover:
 * -----------------------------------------------------------------------------
 * - Random integers: ordinary unsorted input.
 * - Already sorted input: best-case scenario for optimized Bubble Sort.
 * - Descending input: worst-case style input with many swaps.
 * - All identical values: confirms equal values do not cause unnecessary swaps.
 * - Empty array: confirms the algorithm handles no data.
 * - Single-element array: confirms a one-item list is already sorted.
 * - In-place behavior: confirms the in-place function mutates the same array.
 * - Best-case optimization: confirms the optimized version performs less work
 *   than the basic version on already sorted input.
 */
import {
  arraysEqual,
  basicBubbleSort,
  basicBubbleSortInPlace,
  buildRequiredBubbleSortCases,
  optimizedBubbleSort,
  runBubbleSortCase,
} from './BubbleSort.js'

/**
 * Print whether one actual array matches one expected array.
 *
 * Console tests do not have Vitest's expect().toEqual() assertion helpers, so
 * this function creates a readable pass/fail message manually. It returns the
 * boolean result so future console summaries could count failures if needed.
 */
function logArrayTest(label, actual, expected) {
  const passed = arraysEqual(actual, expected)
  console.log(`${passed ? '✅' : '❌'} ${label}`)

  // Only print detailed mismatch data when something fails. That keeps passing
  // output easy to read while still giving enough information to debug a broken
  // implementation.
  if (!passed) {
    console.log('  expected:', expected)
    console.log('  actual:  ', actual)
  }

  return passed
}

/**
 * Print the operation counters returned by one Bubble Sort run.
 *
 * These counters connect the code to the written analysis requirement. The
 * sorted output proves correctness, while passes/comparisons/swaps explain
 * performance behavior.
 */
function logCounts(label, result) {
  console.log(`  ${label} passes:      `, result.passes)
  console.log(`  ${label} comparisons: `, result.comparisons)
  console.log(`  ${label} swaps:       `, result.swaps)
}

console.log('Week 9 Assignment 1 - Bubble Sort Console Tests')
console.log('------------------------------------------------')

// The random case is provided as a fixed array here so the console output is
// repeatable. The GUI still has a random generator button for interactive use.
const requiredCases = buildRequiredBubbleSortCases([42, 7, 19, 3, 25, 11])

// Run every required assignment case through the same comparison helper used by
// the GUI and report. This verifies both algorithms against the same expected
// result for each input category.
for (const testCase of requiredCases) {
  const result = runBubbleSortCase(testCase)

  console.log(`\nCase: ${testCase.label}`)
  console.log('  why this case matters:', testCase.note)
  console.log('  input:               ', testCase.input)
  console.log('  expected ascending:  ', testCase.expected)

  // Correctness checks: both algorithms must produce the exact expected sorted
  // array. If either version fails, the algorithm does not satisfy the main
  // implementation requirement.
  logArrayTest('basic Bubble Sort result matches expected output', result.basicActual, testCase.expected)
  logArrayTest('optimized Bubble Sort result matches expected output', result.optimizedActual, testCase.expected)

  // Performance/analysis checks: these do not pass or fail the same way as a
  // correctness assertion, but they provide the data needed to compare the basic
  // and optimized versions in the report.
  logCounts('basic', result.basic)
  logCounts('optimized', result.optimized)
  console.log('  pass savings:       ', result.passSavings)
  console.log('  comparison savings: ', result.comparisonSavings)
}

console.log('\nIn-place behavior')

// This case demonstrates the theoretical O(1) extra-space version. The function
// rearranges the original array object instead of building a separate sorted
// array. That is why this test checks both the values and object identity.
const inPlaceInput = [10, 4, 6]
const inPlaceResult = basicBubbleSortInPlace(inPlaceInput)
logArrayTest('basic in-place algorithm mutates the same array', inPlaceInput, [4, 6, 10])
console.log('  same array object returned:', inPlaceResult.sortedArray === inPlaceInput)

console.log('\nBest-case optimization comparison')

// Already sorted input is where the early-exit flag matters most. The basic
// version still performs all passes, but the optimized version should stop after
// one pass because it finds no swaps.
const sortedInput = [1, 2, 3, 4, 5, 6]
const basicBest = basicBubbleSort(sortedInput)
const optimizedBest = optimizedBubbleSort(sortedInput)
logCounts('basic best case', basicBest)
logCounts('optimized best case', optimizedBest)
console.log('  optimized exits early:', optimizedBest.passes < basicBest.passes)
console.log('  optimized does fewer comparisons:', optimizedBest.comparisons < basicBest.comparisons)

console.log('\nConsole test run complete.')
