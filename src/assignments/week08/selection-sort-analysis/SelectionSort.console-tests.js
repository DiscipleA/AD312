/**
 * Week 8 Assignment 1 Console Tests
 * -----------------------------------------------------------------------------
 * These tests are intentionally simple and runnable with Node:
 *
 *   node src/assignments/week08/selection-sort-analysis/SelectionSort.console-tests.js
 *
 * Why console tests are included:
 * - They keep the raw JavaScript algorithm easy to verify outside the React UI.
 * - They mirror the assignment's required test categories.
 * - They print comparisons and swaps so the complexity discussion is connected
 *   to visible algorithm behavior.
 *
 * These console tests do not replace Vitest. They are a lightweight manual
 * verification layer. The official automated checks still live in
 * SelectionSort.test.js.
 */
import {
  arraysEqual,
  buildRequiredSelectionSortCases,
  selectionSort,
  selectionSortInPlace,
  stableSelectionSort,
} from './SelectionSort.js'

/**
 * Print a consistent pass/fail line for array-based tests.
 *
 * A helper keeps every test output in the same shape. When a test fails, it also
 * prints the expected and actual arrays so the mistake can be diagnosed quickly.
 */
function logArrayTest(label, actual, expected) {
  const passed = arraysEqual(actual, expected)
  console.log(`${passed ? '✅' : '❌'} ${label}`)

  if (!passed) {
    console.log('  expected:', expected)
    console.log('  actual:  ', actual)
  }

  return passed
}

/**
 * Print operation counts for the selected test case.
 *
 * The counts are not just decoration. They support the report's analysis:
 * - comparisons show the nested-loop scan work
 * - swaps show how many times the algorithm actually rearranged values
 */
function logOperationCounts(result) {
  console.log('  comparisons:', result.comparisons)
  console.log('  swaps:      ', result.swaps)
}

console.log('Week 8 Assignment 1 - Selection Sort Console Tests')
console.log('---------------------------------------------------')

// This fixed "random" array gives repeatable console output. A truly random
// array is useful in the GUI, but deterministic console tests are easier to
// review because the expected result is always the same.
const requiredCases = buildRequiredSelectionSortCases([42, 7, 19, 3, 25, 11])

// Required assignment cases:
// 1. randomly generated / random-like array
// 2. already sorted ascending array
// 3. descending array
// 4. all elements the same
// 5. empty array
// 6. single-element array
for (const testCase of requiredCases) {
  console.log(`\nCase: ${testCase.label}`)
  console.log('  input:   ', testCase.input)
  console.log('  expected:', testCase.expected)

  const result = selectionSort(testCase.input)

  logArrayTest('ascending Selection Sort result matches expected output', result.sortedArray, testCase.expected)
  logOperationCounts(result)
}

console.log('\nEnhancement: descending order')
// The descending enhancement does not require a second algorithm. It uses the
// same outer/inner loop structure and reverses the candidate comparison so the
// largest value is selected each pass.
const descendingResult = selectionSort([5, 1, 9, 3], 'desc')
logArrayTest('descending mode sorts largest to smallest', descendingResult.sortedArray, [9, 5, 3, 1])
logOperationCounts(descendingResult)

console.log('\nEnhancement: stable Selection Sort variant')
// The stable variant is tested with duplicate values so we can discuss the
// stability topic. For plain numbers, the visible sorted result is the same, but
// the implementation uses shifting rather than direct swapping.
const stableResult = stableSelectionSort([3, 1, 3, 2])
logArrayTest('stable variant still returns sorted numeric output', stableResult.sortedArray, [1, 2, 3, 3])
console.log('  comparisons:', stableResult.comparisons)
console.log('  moves:      ', stableResult.moves)

console.log('\nIn-place behavior')
// This test proves that selectionSortInPlace mutates the original array object.
// That is the key reason the regular algorithm can be described as O(1) extra
// space: it rearranges the given array rather than building a second array.
const inPlaceInput = [10, 4, 6]
const inPlaceResult = selectionSortInPlace(inPlaceInput)
logArrayTest('core algorithm mutates the same array in place', inPlaceInput, [4, 6, 10])
console.log('  same array object returned:', inPlaceResult.sortedArray === inPlaceInput)

console.log('\nConsole test run complete.')
