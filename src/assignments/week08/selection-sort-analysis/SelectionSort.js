/**
 * Week 8 Assignment 1: Implementing and Analyzing Selection Sort
 * -----------------------------------------------------------------------------
 * This file is intentionally written in plain JavaScript instead of React.
 * The goal of the assignment is to study the algorithm itself: how Selection
 * Sort chooses values, how many comparisons it performs, why it is O(n²), why
 * the regular version is in-place, and why the usual swap-based version is not
 * considered stable.
 *
 * Important vocabulary used throughout this file:
 *
 * - Array:
 *   The list of integer values being sorted.
 *
 * - Sorted region:
 *   The left side of the array after each pass. At the end of pass 1, index 0
 *   contains the smallest value for ascending order. At the end of pass 2,
 *   indexes 0 and 1 contain the two smallest values, and so on.
 *
 * - Unsorted region:
 *   The remaining right side of the array that still needs to be searched.
 *
 * - selectedIndex:
 *   The index of the current best candidate found by the inner loop. In
 *   ascending mode, it points to the smallest value found so far. In descending
 *   mode, it points to the largest value found so far.
 *
 * - In-place algorithm:
 *   An algorithm that rearranges the original array using only a constant
 *   amount of extra memory. The swap-based version below is in-place because it
 *   only needs index variables, counters, and one temporary swap operation.
 *
 * - Stable sort:
 *   A sorting algorithm is stable when equal-key records keep their original
 *   relative order. Regular Selection Sort is generally not stable because a
 *   swap can move one equal-key record past another equal-key record.
 *
 * Selection Sort idea in ascending order:
 *
 * 1. Start at index 0.
 * 2. Search the rest of the array for the smallest value.
 * 3. Swap the smallest value into index 0.
 * 4. Move to index 1.
 * 5. Search the rest of the array for the next smallest value.
 * 6. Repeat until the array is sorted.
 *
 * Time complexity:
 *
 * The outer loop runs once for almost every final position in the array.
 * For each outer-loop pass, the inner loop scans the remaining unsorted region.
 * The number of comparisons is approximately:
 *
 *   (n - 1) + (n - 2) + (n - 3) + ... + 1 = n(n - 1) / 2
 *
 * When constants and smaller terms are removed in Big-O notation, that becomes
 * O(n²). This is true even if the array is already sorted, because Selection
 * Sort still scans the remaining unsorted region to confirm the selected value.
 *
 * Space complexity:
 *
 * The regular in-place version is O(1) extra space because it modifies the
 * input array directly and does not allocate a second working array proportional
 * to n. The wrapper function selectionSort() creates a copy only to protect the
 * caller's original input for UI/testing convenience.
 */

/**
 * Validate that the provided value is an array of integers.
 *
 * Why validation matters:
 * Selection Sort can compare many types of JavaScript values, but the assignment
 * specifically asks for an array/list of integers. Rejecting non-integers makes
 * test results predictable and keeps the algorithm aligned with the assignment
 * requirements.
 */
function assertIntegerArray(values) {
  if (!Array.isArray(values)) {
    throw new TypeError('Selection Sort expects an array of integers.')
  }

  for (const value of values) {
    if (!Number.isInteger(value)) {
      throw new TypeError('Selection Sort only accepts integer values.')
    }
  }
}

/**
 * Decide whether a newly scanned value should replace the current candidate.
 *
 * This helper keeps the main sorting loop readable:
 * - Ascending mode chooses the smallest value.
 * - Descending mode chooses the largest value.
 *
 * The loop structure stays the same for both modes. Only the comparison changes.
 */
function shouldReplaceCandidate(candidateValue, currentSelectedValue, direction) {
  if (direction === 'desc') {
    return candidateValue > currentSelectedValue
  }

  return candidateValue < currentSelectedValue
}

/**
 * Sort the provided array in place using regular swap-based Selection Sort.
 *
 * This function mutates the array that is passed into it. That behavior is
 * intentional because the assignment asks us to discuss in-place sorting.
 *
 * Parameters:
 * - values: the actual array that will be rearranged.
 * - direction: 'asc' for ascending order or 'desc' for the optional descending
 *   enhancement.
 *
 * Return value:
 * An object that contains the sorted array plus instrumentation data. The GUI,
 * console tests, Vitest tests, and downloadable report use these counts to show
 * how the algorithm behaves.
 */
export function selectionSortInPlace(values, direction = 'asc') {
  assertIntegerArray(values)

  if (!['asc', 'desc'].includes(direction)) {
    throw new Error("direction must be either 'asc' or 'desc'.")
  }

  // Count how many times the inner loop compares two values. This helps prove
  // why Selection Sort grows quadratically as the input size increases.
  let comparisons = 0

  // Count actual swaps. An already sorted array still has O(n²) comparisons,
  // but it can have zero swaps because every selected value is already in place.
  let swaps = 0

  // Store a teaching trace for the GUI/report. This is not required by the core
  // algorithm, but it helps explain each pass to a student reading the output.
  const steps = []

  // The outer loop chooses the final value for index i. After each pass, one
  // more value belongs to the sorted region on the left side of the array.
  // We stop at length - 1 because the last remaining value is automatically in
  // the correct position after all earlier positions have been selected.
  for (let i = 0; i < values.length - 1; i += 1) {
    // Assume the first value in the unsorted region is the best candidate until
    // the inner loop finds a smaller/larger value.
    let selectedIndex = i

    // The inner loop scans only the unsorted region to the right of i. This is
    // where the O(n²) behavior comes from: for each outer-loop pass, we perform
    // another scan over the remaining values.
    for (let j = i + 1; j < values.length; j += 1) {
      comparisons += 1

      // If values[j] is a better candidate than values[selectedIndex], remember
      // its index. We do not swap immediately because Selection Sort performs at
      // most one swap per outer-loop pass.
      if (shouldReplaceCandidate(values[j], values[selectedIndex], direction)) {
        selectedIndex = j
      }
    }

    // If the selected value is not already at position i, swap it into place.
    // This is the moment that can make regular Selection Sort unstable: a direct
    // swap may move one equal-key record behind another equal-key record.
    if (selectedIndex !== i) {
      const beforeSwap = values.slice()
      const selectedValue = values[selectedIndex]
      const displacedValue = values[i]

      ;[values[i], values[selectedIndex]] = [values[selectedIndex], values[i]]
      swaps += 1

      steps.push({
        pass: i + 1,
        selectedIndex,
        selectedValue,
        displacedValue,
        beforeSwap,
        afterSwap: values.slice(),
      })
    } else {
      // Even when no swap happens, record the pass so the GUI/report can show
      // that the algorithm still performed a scan for this sorted position.
      steps.push({
        pass: i + 1,
        selectedIndex,
        selectedValue: values[selectedIndex],
        displacedValue: values[i],
        beforeSwap: values.slice(),
        afterSwap: values.slice(),
      })
    }
  }

  return {
    sortedArray: values,
    comparisons,
    swaps,
    steps,
    direction,
  }
}

/**
 * Non-mutating wrapper around the in-place algorithm.
 *
 * The algorithm being studied is still the in-place Selection Sort above, but
 * this wrapper copies the input first so the preview and tests can compare the
 * original input against the sorted output without losing the original order.
 */
export function selectionSort(values, direction = 'asc') {
  const copy = [...values]
  return selectionSortInPlace(copy, direction)
}

/**
 * Stable Selection Sort variant.
 *
 * Regular Selection Sort swaps the selected minimum directly into position i.
 * This stable variant avoids that direct swap. Instead, it:
 *
 * 1. Finds the selected value.
 * 2. Saves it in selectedValue.
 * 3. Shifts every value between i and selectedIndex one position to the right.
 * 4. Inserts selectedValue at position i.
 *
 * Because shifting preserves the order of the values that were between i and
 * selectedIndex, equal-key records are less likely to jump past each other.
 * This improves stability, but it performs more moves than the swap-based
 * version. It is still O(n²) time because the nested search remains.
 */
export function stableSelectionSortInPlace(values, direction = 'asc') {
  assertIntegerArray(values)

  if (!['asc', 'desc'].includes(direction)) {
    throw new Error("direction must be either 'asc' or 'desc'.")
  }

  let comparisons = 0
  let moves = 0
  const steps = []

  for (let i = 0; i < values.length - 1; i += 1) {
    let selectedIndex = i

    for (let j = i + 1; j < values.length; j += 1) {
      comparisons += 1

      if (shouldReplaceCandidate(values[j], values[selectedIndex], direction)) {
        selectedIndex = j
      }
    }

    const selectedValue = values[selectedIndex]
    const beforeShift = values.slice()

    // Shift values right one slot until the selected value can be inserted at i.
    // This replaces the direct swap from regular Selection Sort.
    while (selectedIndex > i) {
      values[selectedIndex] = values[selectedIndex - 1]
      selectedIndex -= 1
      moves += 1
    }

    values[i] = selectedValue

    steps.push({
      pass: i + 1,
      selectedValue,
      beforeShift,
      afterShift: values.slice(),
    })
  }

  return {
    sortedArray: values,
    comparisons,
    moves,
    steps,
    direction,
  }
}

/**
 * Non-mutating wrapper for the stable variant.
 */
export function stableSelectionSort(values, direction = 'asc') {
  const copy = [...values]
  return stableSelectionSortInPlace(copy, direction)
}

/**
 * Build a random integer array for the GUI's "Generate Random Array" button.
 *
 * The function normalizes min/max so the caller cannot accidentally create an
 * invalid range. It also prevents negative lengths by clamping size to zero.
 */
export function generateRandomIntegerArray(length = 8, min = 1, max = 99) {
  const size = Math.max(0, Number(length) || 0)
  const low = Math.ceil(Number(min) || 0)
  const high = Math.floor(Number(max) || 0)
  const lower = Math.min(low, high)
  const upper = Math.max(low, high)

  return Array.from({ length: size }, () => (
    Math.floor(Math.random() * (upper - lower + 1)) + lower
  ))
}

/**
 * Build the exact categories required by the assignment instructions.
 *
 * This helper is shared by the GUI, console tests, Vitest tests, and report
 * generator so every layer is validating the same required behavior:
 * random input, already sorted input, descending input, all-same input, empty
 * input, and single-element input.
 */
export function buildRequiredSelectionSortCases(randomArray = [42, 7, 19, 3, 25, 11]) {
  return [
    {
      id: 'random-array',
      label: 'Random array of integers',
      kind: 'normal',
      input: [...randomArray],
      expected: [...randomArray].sort((a, b) => a - b),
    },
    {
      id: 'already-sorted',
      label: 'Already sorted ascending',
      kind: 'normal',
      input: [1, 2, 3, 4, 5, 6],
      expected: [1, 2, 3, 4, 5, 6],
    },
    {
      id: 'descending-input',
      label: 'Descending input',
      kind: 'normal',
      input: [9, 7, 5, 3, 1],
      expected: [1, 3, 5, 7, 9],
    },
    {
      id: 'same-elements',
      label: 'All elements are the same',
      kind: 'edge',
      input: [4, 4, 4, 4],
      expected: [4, 4, 4, 4],
    },
    {
      id: 'empty-array',
      label: 'Empty array',
      kind: 'edge',
      input: [],
      expected: [],
    },
    {
      id: 'single-element',
      label: 'Single-element array',
      kind: 'edge',
      input: [8],
      expected: [8],
    },
  ]
}

/**
 * Small comparison helper for tests and the Live Test Results panel.
 */
export function arraysEqual(left, right) {
  return left.length === right.length && left.every((value, index) => value === right[index])
}

/**
 * Run one required Selection Sort test case and return a GUI-friendly result.
 *
 * Why this helper exists:
 * - The Live Test Results panel should not duplicate sorting logic.
 * - The guide, console tests, Vitest tests, and report should all rely on the
 *   same source-of-truth algorithm behavior.
 * - Returning expected/actual/pass/comparison/swap data in one object makes the
 *   GUI easy to render and keeps the test output transparent for the student.
 *
 * The optional direction argument supports the descending enhancement. When the
 * direction is "desc", the expected ascending array is reversed before the pass
 * check is performed.
 */
export function runSelectionSortCase(testCase, direction = 'asc') {
  const result = selectionSort(testCase.input, direction)
  const expected = direction === 'desc' ? [...testCase.expected].reverse() : testCase.expected

  return {
    ...testCase,
    actual: result.sortedArray,
    expected,
    passed: arraysEqual(result.sortedArray, expected),
    comparisons: result.comparisons,
    swaps: result.swaps,
    steps: result.steps,
  }
}

/**
 * Run all assignment-required Selection Sort cases.
 *
 * This is the helper imported by the visual Live Test Results panel. It keeps
 * the required cases synchronized with the assignment instructions:
 * random array, already sorted array, descending array, all-same array, empty
 * array, and single-element array.
 */
export function runRequiredSelectionSortCases(randomArray) {
  return buildRequiredSelectionSortCases(randomArray).map((testCase) => runSelectionSortCase(testCase))
}

/**
 * Convert a comma-separated text input into integers for the GUI.
 *
 * Empty input is valid because the assignment explicitly requires an empty-array
 * edge case. Invalid values are collected instead of throwing so the preview can
 * show a friendly message beside the user's input.
 */
export function parseIntegerInput(inputText) {
  if (!inputText.trim()) {
    return { values: [], invalidValues: [] }
  }

  const parts = inputText.split(',').map((part) => part.trim())
  const values = []
  const invalidValues = []

  for (const part of parts) {
    const numericValue = Number(part)

    if (part === '' || !Number.isInteger(numericValue)) {
      invalidValues.push(part || '(blank)')
    } else {
      values.push(numericValue)
    }
  }

  return { values, invalidValues }
}

/**
 * Explain why regular Selection Sort is generally not stable.
 *
 * The numeric algorithm sorts values correctly, but stability is easier to see
 * with labeled records. The keys determine sort order; the labels reveal whether
 * equal-key records kept their original relative order.
 */
export function explainSelectionSortStability() {
  return {
    summary: 'Regular Selection Sort is generally not stable because swapping can move equal-key records past each other.',
    example: [
      { key: 2, label: 'A' },
      { key: 2, label: 'B' },
      { key: 1, label: 'C' },
    ],
    reasoning: 'When the minimum key 1 is swapped into the first position, record 2A can move behind 2B, changing the original relative order of equal key values.',
  }
}

/**
 * Format arrays consistently in the GUI/report.
 */
export function formatArray(values) {
  return `[${values.join(', ')}]`
}

/**
 * Build the downloadable Markdown report from live algorithm results.
 *
 * This function exists so the GUI report button can generate a real file from
 * the same implementation and test cases that the student can run on screen.
 */
export function buildSelectionSortReport({ customInput = [42, 7, 19, 3, 25, 11] } = {}) {
  const rows = runRequiredSelectionSortCases(customInput.length ? customInput : [42, 7, 19, 3, 25, 11])

  const descending = selectionSort(customInput.length ? customInput : [5, 1, 9, 3], 'desc')
  const stable = stableSelectionSort(customInput.length ? customInput : [3, 1, 3, 2])
  const stability = explainSelectionSortStability()

  return `# Selection Sort Implementation & Analysis Report

Generated from the AD312 Week 8 Assignment 1 GUI.

## Implementation Included

### Regular Selection Sort (ascending)

The implementation scans the unsorted portion of the array, selects the smallest value, and swaps it into the next sorted position.

\`\`\`js
for (let i = 0; i < values.length - 1; i += 1) {
  let selectedIndex = i

  for (let j = i + 1; j < values.length; j += 1) {
    if (values[j] < values[selectedIndex]) {
      selectedIndex = j
    }
  }

  if (selectedIndex !== i) {
    ;[values[i], values[selectedIndex]] = [values[selectedIndex], values[i]]
  }
}
\`\`\`

### Optional Descending Enhancement

Descending order uses the same loop structure but reverses the candidate comparison so the largest value is selected each pass.

Descending result for current input: ${formatArray(descending.sortedArray)}

### Optional Stable Variant

The stable variant avoids the direct swap. It removes the selected value and shifts the values between the target position and selected position to the right before insertion.

Stable variant result for current input: ${formatArray(stable.sortedArray)}

## Test Cases and Results

| Case | Input | Expected | Actual | Comparisons | Swaps | Result |
|---|---|---|---|---:|---:|---|
${rows.map((row) => `| ${row.label} | ${formatArray(row.input)} | ${formatArray(row.expected)} | ${formatArray(row.actual)} | ${row.comparisons} | ${row.swaps} | ${row.passed ? 'Pass' : 'Fail'} |`).join('\n')}

## Time Complexity Analysis

Selection Sort has O(n²) time complexity. The outer loop chooses each final sorted position. For every outer-loop pass, the inner loop scans the remaining unsorted portion of the array. That nested scanning pattern creates approximately n(n - 1) / 2 comparisons, which simplifies to O(n²).

## Space Complexity Analysis

The regular swap-based implementation is O(1) extra space because it sorts the original array in place. It only needs a fixed number of extra variables such as loop indexes, selectedIndex, counters, and temporary swap values.

## Stability Analysis

${stability.summary}

Example records: ${JSON.stringify(stability.example)}

${stability.reasoning}

## Enhancement Observations

- Descending sort required changing the comparison from selecting the minimum value to selecting the maximum value.
- The stable variant can preserve equal-key ordering by shifting values instead of swapping directly.
- The stable variant still has O(n²) time complexity because it still uses nested scanning.
- The stable variant may perform more moves than regular Selection Sort.
`
}

/**
 * Browser download helper used by the assignment GUI.
 */
export function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
