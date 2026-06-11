/**
 * Week 10 Assignment 1: Insertion Sort console-log tests
 * -----------------------------------------------------------------------------
 * This file is intentionally simple, plain JavaScript, and Node-friendly.
 *
 * Why include console-log tests when Vitest tests also exist?
 * -----------------------------------------------------------------------------
 * The assignment asks for implementation testing and analysis. Vitest gives the
 * portfolio an official automated test file, while this console test file gives
 * students a direct way to run the raw algorithm outside the React GUI:
 *
 *   node src/assignments/week10/insertion-sort-analysis/InsertionSort.console-tests.js
 *
 * The console output is intentionally descriptive. Each case prints the input,
 * expected output, actual output, and metrics so the student can connect the
 * algorithm's behavior to the report requirements.
 */

import {
  arraysEqual,
  buildRequiredInsertionSortCases,
  demonstrateInsertionSortStability,
  insertionSort,
  insertionSortInPlace,
  runInsertionSortCase,
} from './InsertionSort.js'

/**
 * assert(condition, message)
 * -----------------------------------------------------------------------------
 * A tiny custom assertion helper keeps the console test file dependency-free.
 *
 * If condition is true, the test continues silently.
 * If condition is false, the helper throws an Error and Node stops the script.
 * That makes failures obvious because the terminal shows exactly which expected
 * behavior did not happen.
 */
function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

/**
 * logCase(result)
 * -----------------------------------------------------------------------------
 * Prints one test case in a consistent readable format.
 *
 * The result object comes from runInsertionSortCase(), so it already contains:
 * - label: the name of the required test category,
 * - input: the unsorted values,
 * - expected: the independently calculated sorted answer,
 * - actual: the output from the student's Insertion Sort implementation,
 * - metrics: comparisons, shifts, writes, and timing data,
 * - passed: true/false correctness result.
 */
function logCase(result) {
  const status = result.passed ? 'PASS' : 'FAIL'
  console.log(`${status}: ${result.label}`)
  console.log('  input:   ', JSON.stringify(result.input))
  console.log('  expected:', JSON.stringify(result.expected))
  console.log('  actual:  ', JSON.stringify(result.actual))
  console.log(
    `  metrics: ${result.metrics.comparisons} comparisons, ${result.metrics.shifts} shifts, ${result.metrics.writes} writes`,
  )
}

console.log('Week 10 Assignment 1 - Insertion Sort console tests')
console.log('----------------------------------------------------')

/**
 * Required assignment case coverage
 * -----------------------------------------------------------------------------
 * buildRequiredInsertionSortCases() creates the same categories shown in the GUI
 * Live Test Results panel:
 *
 * 1. Small/custom array
 * 2. Large random array
 * 3. Nearly sorted array for best-case behavior
 * 4. Reversed array for worst-case behavior
 * 5. Duplicate values for equal-value handling
 * 6. Empty array edge case
 * 7. Single-element edge case
 *
 * Each case is passed into runInsertionSortCase(), which sorts the input with
 * the assignment implementation and compares it to the expected sorted result.
 */
for (const testCase of buildRequiredInsertionSortCases([5, 2, 9, 1, 5, 6])) {
  const result = runInsertionSortCase(testCase)
  logCase(result)
  assert(result.passed, `${testCase.label} should sort correctly`)
}

/**
 * In-place behavior check
 * -----------------------------------------------------------------------------
 * The assignment includes a space-complexity discussion, so the raw algorithm
 * should demonstrate traditional in-place sorting behavior. This test confirms
 * that insertionSortInPlace(original) mutates and sorts the same array object.
 */
const original = [3, 1, 2]
const inPlaceResult = insertionSortInPlace(original)
assert(arraysEqual(original, [1, 2, 3]), 'insertionSortInPlace should mutate and sort the original array')
assert(inPlaceResult.sortedArray === original, 'in-place result should reference the original array')
console.log('PASS: in-place sorter mutated the original array and returned the same array reference')

/**
 * Non-mutating wrapper check
 * -----------------------------------------------------------------------------
 * The GUI often needs to preserve the user's original input while still showing
 * a sorted result. insertionSort(values) is the safe wrapper for that situation:
 * it validates the input, copies the array, and then calls the in-place sorter on
 * the copy. This test proves the wrapper sorts correctly without changing the
 * caller's array.
 */
const wrapperInput = [7, 4, 6]
const wrapperResult = insertionSort(wrapperInput)
assert(arraysEqual(wrapperResult.sortedArray, [4, 6, 7]), 'wrapper should sort a copy correctly')
assert(arraysEqual(wrapperInput, [7, 4, 6]), 'wrapper should not mutate the caller input')
console.log('PASS: wrapper sorted a copy while preserving the caller input array')

/**
 * Stability demonstration check
 * -----------------------------------------------------------------------------
 * Stable sorting matters when values have equal sort keys but different
 * secondary information. The demo uses records with key=2 and tags A, B, C.
 * After sorting by key, those three records must still appear as A, B, C.
 */
const stability = demonstrateInsertionSortStability()
assert(stability.stable, 'equal keys should keep original A, B, C order')
console.log('PASS: stability demo preserved order for key=2:', stability.sortedOrderForKeyTwo.join(', '))

console.log('----------------------------------------------------')
console.log('All Insertion Sort console tests passed.')
