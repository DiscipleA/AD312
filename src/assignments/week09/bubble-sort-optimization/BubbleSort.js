/**
 * Week 9 Assignment 1: Exploring and Optimizing Bubble Sort
 * -----------------------------------------------------------------------------
 * This file is intentionally written in plain JavaScript.
 *
 * The portfolio page uses React only as a teaching shell so the algorithm can be
 * tested with buttons, tables, and a downloadable report. The algorithm itself
 * stays framework-free because the assignment asks for JavaScript Bubble Sort,
 * not React state management.
 *
 * BIG IDEA: What Bubble Sort does
 * -----------------------------------------------------------------------------
 * Bubble Sort repeatedly compares two neighboring values:
 *
 *   values[index] and values[index + 1]
 *
 * If the left value is larger than the right value, the two values are swapped.
 * This pushes larger values toward the end of the array one comparison at a
 * time. That is why the algorithm is called Bubble Sort: large values “bubble”
 * to the right side of the list after repeated adjacent swaps.
 *
 * WHY THE BASIC VERSION IS O(n²)
 * -----------------------------------------------------------------------------
 * The basic version uses two loops:
 *
 * 1. The outer loop counts passes through the array.
 * 2. The inner loop compares adjacent values during each pass.
 *
 * When loops are nested like this, the amount of work grows roughly like n * n.
 * More precisely, Bubble Sort performs about n(n - 1) / 2 adjacent comparisons
 * in the full-pass version. In Big-O notation, constant factors and lower-order
 * terms are removed, so this becomes O(n²).
 *
 * WHY THE OPTIMIZED VERSION CAN BE FASTER
 * -----------------------------------------------------------------------------
 * The optimized version uses a hasSwapped flag.
 *
 * - At the start of each pass, hasSwapped is reset to false.
 * - If any swap happens, hasSwapped becomes true.
 * - If the pass finishes and hasSwapped is still false, the array is already
 *   sorted, so the algorithm stops early.
 *
 * This does not change the average or worst-case complexity class, which is
 * still O(n²), but it improves the best case. An already sorted array only needs
 * one pass to prove that no swaps are needed, so the best case becomes O(n).
 *
 * SPACE COMPLEXITY
 * -----------------------------------------------------------------------------
 * The in-place sorting functions rearrange the same array object. They only use
 * a small, fixed number of extra variables such as pass, index, temporary, and
 * hasSwapped. Because that extra memory does not grow with the input length, the
 * in-place algorithm uses O(1) extra space.
 *
 * The public wrapper functions make a shallow copy before sorting. That copy is
 * not part of the theoretical in-place algorithm; it is a safety layer for this
 * portfolio app so the GUI, tests, and report can compare the original input
 * with the sorted output without accidentally changing the original test case.
 *
 * STABILITY
 * -----------------------------------------------------------------------------
 * Bubble Sort is stable when it swaps only on a strict greater-than comparison:
 *
 *   if (leftValue > rightValue) swap
 *
 * Equal values are not swapped. That means equal elements keep the same relative
 * order they had before sorting.
 */

/**
 * Validate the assignment input before sorting.
 *
 * JavaScript is flexible and would allow arrays containing strings, decimals,
 * objects, null, undefined, and many other values. That flexibility is not good
 * for this assignment because the instructions specifically ask for arrays/lists
 * of integers. This helper keeps the implementation honest:
 *
 * - The input must be an array.
 * - Every item in the array must be an integer.
 *
 * Keeping validation in one function also prevents the basic and optimized
 * implementations from repeating the same guard code.
 */
export function assertIntegerArray(values) {
  if (!Array.isArray(values)) {
    throw new TypeError('Bubble Sort expects an array of integers.')
  }

  for (const value of values) {
    if (!Number.isInteger(value)) {
      throw new TypeError('Bubble Sort only accepts integer values.')
    }
  }
}

/**
 * Compare two arrays value by value.
 *
 * JavaScript arrays are reference values. That means this expression:
 *
 *   [1, 2, 3] === [1, 2, 3]
 *
 * is false because the two arrays are two different objects in memory. For test
 * logic, we need to compare the contents instead. This helper checks:
 *
 * 1. Both arrays have the same length.
 * 2. Every value at every index is the same.
 *
 * The helper is shared by the GUI, Live Test Results panel, console tests, and
 * Vitest tests so every verification layer uses the same comparison rule.
 */
export function arraysEqual(left, right) {
  return left.length === right.length && left.every((value, index) => value === right[index])
}

/**
 * Format an array for human-readable GUI and report output.
 *
 * The algorithm should work with real arrays, but the interface and report need
 * a clean string representation. Empty arrays are shown as [] so edge cases are
 * easy to read in the generated report.
 */
export function formatArray(values) {
  return values.length ? `[${values.join(', ')}]` : '[]'
}

/**
 * Generate a random integer array for the required random-array test category.
 *
 * Parameters are configurable so the GUI can create small readable examples,
 * while the report/testing helpers can reuse the same function for larger or
 * different ranges if needed.
 */
export function generateRandomIntegerArray(length = 8, min = 1, max = 99) {
  return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min)
}

/**
 * Basic Bubble Sort: in-place implementation.
 *
 * IMPORTANT: This function mutates the provided array.
 *
 * That mutation is intentional because Bubble Sort is commonly taught as an
 * in-place sorting algorithm. In-place means the original array is rearranged
 * instead of creating a second array that grows with the input size.
 *
 * The function also records operation counts and pass-by-pass snapshots. Those
 * statistics are not required for sorting, but they make the assignment easier
 * to analyze in the GUI and downloadable report.
 */
export function basicBubbleSortInPlace(values) {
  // Validate first so invalid inputs fail before any partial mutation happens.
  assertIntegerArray(values)

  // comparisons counts adjacent comparisons, not loop iterations in general.
  // This number helps explain why Bubble Sort grows quadratically.
  let comparisons = 0

  // swaps counts how many times two neighboring values trade positions.
  // Descending input normally creates many swaps; sorted input creates none.
  let swaps = 0

  // passes counts full sweeps through the current unsorted portion of the array.
  let passes = 0

  // steps stores before/after snapshots for teaching and report generation.
  // Each snapshot uses slice() so later mutations do not rewrite old history.
  const steps = []

  // Cache the length once. The array length does not change during Bubble Sort.
  const n = values.length

  // The outer loop controls how many passes Bubble Sort performs.
  // For an array of n values, at most n - 1 passes are needed because the final
  // remaining value is automatically in the correct position after the others
  // have bubbled into place.
  for (let pass = 0; pass < n - 1; pass += 1) {
    // Capture the array at the beginning of this pass for explanation output.
    const beforePass = values.slice()
    passes += 1

    // The inner loop compares adjacent pairs.
    //
    // The expression n - 1 - pass is the key Bubble Sort optimization that even
    // the basic version should use: after each pass, the largest remaining value
    // is already at the end, so there is no reason to compare inside the sorted
    // tail of the array.
    for (let index = 0; index < n - 1 - pass; index += 1) {
      comparisons += 1

      // Compare neighbors. If the left neighbor is larger, the two values are
      // out of ascending order and must be swapped.
      //
      // Notice this uses > and not >=. That detail matters for stability. Equal
      // values are left alone, which preserves their original relative order.
      if (values[index] > values[index + 1]) {
        // Store the left value before overwriting it. Without this temporary
        // variable, the original left value would be lost during the swap.
        const temporary = values[index]

        // Move the smaller right value one position to the left.
        values[index] = values[index + 1]

        // Move the saved larger value one position to the right.
        values[index + 1] = temporary

        // Count the swap so the report can compare how much work each case did.
        swaps += 1
      }
    }

    // Save this pass for the visual trace. Basic Bubble Sort never exits early,
    // so exitedEarly is always false here.
    steps.push({
      pass: pass + 1,
      beforePass,
      afterPass: values.slice(),
      swappedInPass: !arraysEqual(beforePass, values),
      exitedEarly: false,
    })
  }

  // Return both the sorted result and the metrics needed for analysis.
  return {
    algorithm: 'Basic Bubble Sort',
    sortedArray: values,
    comparisons,
    swaps,
    passes,
    steps,
    earlyExitUsed: false,
  }
}

/**
 * Optimized Bubble Sort: in-place implementation with early exit.
 *
 * This version performs the same adjacent comparison and swap logic as the basic
 * version, but it adds one observation:
 *
 * If a complete pass makes zero swaps, every adjacent pair is already in sorted
 * order. Therefore the whole array is sorted, and the algorithm can stop.
 */
export function optimizedBubbleSortInPlace(values) {
  assertIntegerArray(values)

  let comparisons = 0
  let swaps = 0
  let passes = 0
  const steps = []
  const n = values.length

  for (let pass = 0; pass < n - 1; pass += 1) {
    const beforePass = values.slice()

    // Reset the flag at the beginning of every pass. The question for each pass
    // is: “Did this specific pass need at least one swap?”
    let hasSwapped = false
    passes += 1

    for (let index = 0; index < n - 1 - pass; index += 1) {
      comparisons += 1

      if (values[index] > values[index + 1]) {
        const temporary = values[index]
        values[index] = values[index + 1]
        values[index + 1] = temporary
        swaps += 1

        // The flag becomes true only when this pass actually changed the array.
        // A true value means Bubble Sort must continue because unsorted pairs
        // were still found during this pass.
        hasSwapped = true
      }
    }

    // If no swap happened during the entire pass, the array is sorted.
    const exitedEarly = !hasSwapped

    steps.push({
      pass: pass + 1,
      beforePass,
      afterPass: values.slice(),
      swappedInPass: hasSwapped,
      exitedEarly,
    })

    // Early exit is the optimization requested in the assignment. It especially
    // improves the already-sorted best case because the algorithm stops after
    // one pass instead of completing every possible pass.
    if (exitedEarly) {
      break
    }
  }

  return {
    algorithm: 'Optimized Bubble Sort',
    sortedArray: values,
    comparisons,
    swaps,
    passes,
    steps,
    earlyExitUsed: true,
  }
}

/**
 * Non-mutating wrapper for the basic algorithm.
 *
 * The in-place algorithm is useful for explaining space complexity, but a UI can
 * become confusing if clicking a button permanently changes the original input.
 * This wrapper copies the array first, then sorts the copy.
 */
export function basicBubbleSort(values) {
  return basicBubbleSortInPlace([...values])
}

/**
 * Non-mutating wrapper for the optimized algorithm.
 *
 * Keeping this wrapper parallel to basicBubbleSort makes it easy for the GUI,
 * console tests, Vitest tests, and report generator to compare both algorithms
 * without duplicating copy logic.
 */
export function optimizedBubbleSort(values) {
  return optimizedBubbleSortInPlace([...values])
}

/**
 * Build the exact test categories required by the assignment instructions.
 *
 * The assignment specifically asks for:
 * - a randomly generated array,
 * - an already sorted array,
 * - a descending array,
 * - an all-identical array,
 * - an empty array,
 * - and a single-element array.
 *
 * This function centralizes those cases so the GUI, Live Test Results, console
 * tests, Vitest tests, and PDF report all agree on what “required coverage”
 * means for this assignment.
 */
export function buildRequiredBubbleSortCases(randomValues = [42, 7, 19, 3, 25, 11]) {
  return [
    {
      id: 'random-array',
      label: 'Random integers',
      kind: 'normal',
      input: randomValues,
      expected: [...randomValues].sort((a, b) => a - b),
      note: 'Confirms ordinary unsorted input is sorted ascending.',
    },
    {
      id: 'already-sorted',
      label: 'Already sorted / best case',
      kind: 'normal',
      input: [1, 2, 3, 4, 5, 6],
      expected: [1, 2, 3, 4, 5, 6],
      note: 'Shows the optimized algorithm can stop after one clean pass.',
    },
    {
      id: 'descending-input',
      label: 'Descending / worst case',
      kind: 'normal',
      input: [9, 7, 5, 3, 1],
      expected: [1, 3, 5, 7, 9],
      note: 'Forces many swaps because every adjacent pair starts reversed.',
    },
    {
      id: 'same-elements',
      label: 'All identical values',
      kind: 'edge',
      input: [4, 4, 4, 4],
      expected: [4, 4, 4, 4],
      note: 'Equal values should remain unchanged and demonstrate stability behavior.',
    },
    {
      id: 'empty-array',
      label: 'Empty array',
      kind: 'edge',
      input: [],
      expected: [],
      note: 'No passes, comparisons, or swaps should be needed.',
    },
    {
      id: 'single-element',
      label: 'Single element',
      kind: 'edge',
      input: [8],
      expected: [8],
      note: 'One value is already sorted by definition.',
    },
  ]
}

/**
 * Run both Bubble Sort versions against one test case.
 *
 * This helper creates the comparison object used throughout the assignment:
 *
 * - Did the basic version sort correctly?
 * - Did the optimized version sort correctly?
 * - How many passes did each version use?
 * - How many adjacent comparisons did each version make?
 * - How many swaps did each version perform?
 *
 * Keeping this comparison in one place prevents the GUI and tests from drifting
 * into different definitions of success.
 */
export function runBubbleSortCase(testCase) {
  const basic = basicBubbleSort(testCase.input)
  const optimized = optimizedBubbleSort(testCase.input)
  const basicPassed = arraysEqual(basic.sortedArray, testCase.expected)
  const optimizedPassed = arraysEqual(optimized.sortedArray, testCase.expected)

  return {
    ...testCase,
    basic,
    optimized,
    basicActual: basic.sortedArray,
    optimizedActual: optimized.sortedArray,
    passed: basicPassed && optimizedPassed,
    passSavings: Math.max(0, basic.passes - optimized.passes),
    comparisonSavings: Math.max(0, basic.comparisons - optimized.comparisons),
  }
}

/**
 * Build the concise complexity explanation used by the guide and report.
 *
 * The wording is stored in code instead of hardcoded separately in multiple UI
 * locations, which keeps the assignment explanation consistent everywhere it is
 * displayed.
 */
export function explainBubbleSortComplexity() {
  return {
    time: 'Average and worst case are O(n²) because nested passes repeatedly compare adjacent values. Optimized Bubble Sort improves the best case to O(n) when a sorted array completes one pass with no swaps.',
    space: 'The in-place algorithms use O(1) extra space because they rearrange the same array with a few variables instead of allocating another array proportional to n.',
    stability: 'Bubble Sort is stable when it swaps only when the left value is strictly greater than the right value. Equal values are not swapped, so their relative order is preserved.',
  }
}
