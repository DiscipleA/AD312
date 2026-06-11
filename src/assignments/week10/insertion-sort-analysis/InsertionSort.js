/**
 * Week 10 Assignment 1: Implementing and Analyzing Insertion Sort
 * -----------------------------------------------------------------------------
 * This file is intentionally plain JavaScript. The React portfolio page is only
 * a visual shell that lets the student run the algorithm, view metrics, trigger
 * required cases, and generate the downloadable report from a GUI.
 *
 * The assignment asks for an implementation, analysis, stability proof,
 * reflection, and testing. To make the source code itself useful as a learning
 * artifact, the comments below explain not only what each line does, but also
 * why each line matters for time complexity, space complexity, and stability.
 *
 * BIG IDEA: WHAT INSERTION SORT DOES
 * -----------------------------------------------------------------------------
 * Insertion Sort behaves like sorting cards in your hand:
 *
 * 1. Treat the first value as an already-sorted section.
 * 2. Pick up the next value, called the key.
 * 3. Walk left through the sorted section.
 * 4. Shift every larger value one position to the right.
 * 5. Place the key into the empty position that remains.
 * 6. Repeat until every value has been inserted into the sorted section.
 *
 * At pass i, the left side from index 0 through index i - 1 is already sorted.
 * The algorithm's job is to insert values[i] into the correct position inside
 * that sorted-left region.
 *
 * WHY THIS IMPLEMENTATION IS STABLE
 * -----------------------------------------------------------------------------
 * A stable sorting algorithm keeps equal values in their original relative
 * order. For example, if three records have the same key and appear as A, B, C,
 * they should still appear as A, B, C after sorting.
 *
 * The stability decision happens inside the while loop:
 *
 *   if (values[scanIndex] > key) { ...shift... }
 *
 * Notice that the comparison is strictly greater-than, not greater-than-or-equal.
 * That means an equal value is NOT shifted to the right of the key. Because equal
 * values are left alone, the newer equal item cannot jump ahead of the older
 * equal item. That is the core reason the algorithm is stable.
 *
 * TIME COMPLEXITY SUMMARY
 * -----------------------------------------------------------------------------
 * Best case:    O(n)
 *   The input is already sorted or nearly sorted. The inner loop usually checks
 *   once and stops because the key is already in the right area.
 *
 * Average case: O(n²)
 *   Random input usually makes each key scan part of the sorted-left region.
 *   Those repeated partial scans add up quadratically as n grows.
 *
 * Worst case:   O(n²)
 *   Reversed input forces every key to move all the way to the front. The first
 *   few passes are small, but later passes scan and shift many elements.
 *
 * SPACE COMPLEXITY SUMMARY
 * -----------------------------------------------------------------------------
 * The in-place integer version uses the original array plus a constant number of
 * helper variables: key, index counters, metrics counters, and temporary arrays
 * used only for teaching-step snapshots. The sorting operation itself does not
 * allocate a second array proportional to n, so the algorithmic auxiliary space
 * is O(1). The steps array is extra instrumentation for the portfolio GUI; it is
 * not required by the core Insertion Sort algorithm.
 */

/**
 * now()
 * -----------------------------------------------------------------------------
 * Small timing helper used by the analysis/report sections.
 *
 * Browser environments provide performance.now(), which gives a high-resolution
 * timestamp useful for short-running algorithms. Some Node environments also
 * provide it, but Date.now() is used as a safe fallback so the same raw
 * JavaScript source can run in both the Vite GUI and Node console tests.
 */
function now() {
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    return performance.now()
  }

  return Date.now()
}

/**
 * assertIntegerArray(values)
 * -----------------------------------------------------------------------------
 * Validates the assignment input before sorting begins.
 *
 * Why this helper exists:
 * - The assignment focuses on integer arrays.
 * - Tests should fail loudly when the caller provides unsupported input.
 * - Separating validation from sorting keeps the algorithm easier to read.
 *
 * A TypeError is used because the problem is not that the array is unsorted; the
 * problem is that the value passed to the algorithm is the wrong type or contains
 * wrong-type elements.
 */
export function assertIntegerArray(values) {
  if (!Array.isArray(values)) {
    throw new TypeError('Insertion Sort expects an array of integers.')
  }

  for (const value of values) {
    if (!Number.isInteger(value)) {
      throw new TypeError('Insertion Sort only accepts integer values.')
    }
  }
}

/**
 * arraysEqual(left, right)
 * -----------------------------------------------------------------------------
 * Compares two arrays position-by-position.
 *
 * Sorting tests need more than a length check. Two arrays can have the same
 * length and still be in the wrong order. This helper first confirms both arrays
 * have the same length, then verifies every value at every index.
 */
export function arraysEqual(left, right) {
  return left.length === right.length && left.every((value, index) => value === right[index])
}

/**
 * isSortedAscending(values)
 * -----------------------------------------------------------------------------
 * Confirms that an array is in nondecreasing order.
 *
 * Nondecreasing means each value may be equal to or greater than the previous
 * value. This is the correct ascending-order check for arrays with duplicates.
 */
export function isSortedAscending(values) {
  return values.every((value, index) => index === 0 || values[index - 1] <= value)
}

/**
 * formatArray(values)
 * -----------------------------------------------------------------------------
 * Converts an array into a compact readable string for report/GUI output.
 * Empty arrays are displayed as [] so the edge case is clear to the user.
 */
export function formatArray(values) {
  return values.length ? `[${values.join(', ')}]` : '[]'
}

/**
 * generateRandomIntegerArray(length, min, max)
 * -----------------------------------------------------------------------------
 * Builds random integer arrays for average-case and GUI testing.
 *
 * Random arrays are useful because they usually do not represent the best case
 * or worst case. They help demonstrate average-case behavior, where each key
 * often moves some distance left but usually not all the way to index 0.
 */
export function generateRandomIntegerArray(length = 8, min = 1, max = 99) {
  return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min)
}

/**
 * buildNearlySortedArray(length)
 * -----------------------------------------------------------------------------
 * Creates a mostly sorted input for best-case style analysis.
 *
 * A perfectly sorted array would usually produce the absolute best case for
 * Insertion Sort because every key is already greater than or equal to the value
 * before it. This helper makes the case slightly more realistic by swapping the
 * final two values, which creates one tiny local disorder while keeping the
 * overall array nearly sorted.
 */
export function buildNearlySortedArray(length = 20) {
  const values = Array.from({ length }, (_, index) => index + 1)

  if (values.length > 3) {
    const last = values.length - 1
    const temporary = values[last]
    values[last] = values[last - 1]
    values[last - 1] = temporary
  }

  return values
}

/**
 * buildReversedArray(length)
 * -----------------------------------------------------------------------------
 * Creates descending input for worst-case analysis.
 *
 * Descending order is difficult for ascending Insertion Sort because every new
 * key belongs before all values that are already in the sorted-left section.
 * That means pass 1 shifts one value, pass 2 shifts two values, pass 3 shifts
 * three values, and so on. The total grows toward n² behavior.
 */
export function buildReversedArray(length = 20) {
  return Array.from({ length }, (_, index) => length - index)
}

/**
 * insertionSortInPlace(values)
 * -----------------------------------------------------------------------------
 * Stable in-place Insertion Sort for integer arrays.
 *
 * IMPORTANT MUTATION NOTE:
 * This function sorts the array object that is passed into it. That mutation is
 * intentional because the assignment asks for a space-complexity discussion and
 * Insertion Sort is traditionally described as an in-place algorithm.
 *
 * For React GUI work and many tests, mutation can be inconvenient because it can
 * change the caller's original data. The insertionSort(values) wrapper below
 * solves that by copying first, then calling this in-place function.
 */
export function insertionSortInPlace(values) {
  // Validate before doing any work. If the input is invalid, the function stops
  // before partially sorting or mutating anything.
  assertIntegerArray(values)

  // Metrics counters make the performance analysis concrete instead of only
  // theoretical. They are displayed in the GUI and included in the report.
  let comparisons = 0
  let shifts = 0
  let writes = 0

  // The steps array records teaching snapshots for each pass. These snapshots
  // are not required for the algorithm itself, but they help the portfolio show
  // how the array changes over time.
  const steps = []
  const startedAt = now()

  // Start at index 1 because a one-element left section is already sorted.
  // Each loop pass expands the sorted-left section by inserting one new key.
  for (let index = 1; index < values.length; index += 1) {
    // The key is the value currently being inserted into the sorted-left region.
    // We store it before shifting so it is not overwritten when larger values
    // move one position to the right.
    const key = values[index]

    // scanIndex begins immediately to the left of key. It walks left through the
    // sorted portion while values are larger than key.
    let scanIndex = index - 1

    // beforePass is a teaching snapshot. It lets the GUI/report show what the
    // array looked like before this insertion pass began.
    const beforePass = values.slice()

    // The inner loop performs the actual searching-and-shifting work.
    // It stops when either:
    // - scanIndex falls off the left side, meaning key belongs at index 0, or
    // - the value at scanIndex is less than or equal to key, meaning key belongs
    //   immediately after scanIndex.
    while (scanIndex >= 0) {
      comparisons += 1

      // STABILITY DETAIL:
      // Shift only when the previous value is strictly greater than key.
      // Do NOT shift equal values. If this condition used >= instead of >,
      // equal values could be moved behind newer equal values, breaking stable
      // ordering for duplicate keys or records.
      if (values[scanIndex] > key) {
        // Move the larger value one slot to the right. This creates or extends
        // the opening where key will eventually be inserted.
        values[scanIndex + 1] = values[scanIndex]
        shifts += 1
        writes += 1

        // Continue scanning left because key might belong even earlier.
        scanIndex -= 1
      } else {
        // The sorted-left value is <= key, so key belongs after it. Because the
        // left section was already sorted, no earlier values need to be checked.
        break
      }
    }

    // Insert key into the final opening. If no shifts happened, this writes key
    // back to the same position; that still makes the pass logic uniform.
    values[scanIndex + 1] = key
    writes += 1

    // Store a detailed pass record for the GUI/report. The afterPass snapshot is
    // a copy so later mutations do not change this historical step.
    steps.push({
      pass: index,
      key,
      insertedAt: scanIndex + 1,
      beforePass,
      afterPass: values.slice(),
      shiftsThisPass: beforePass.reduce((count, value, valueIndex) => count + (value !== values[valueIndex] ? 1 : 0), 0),
    })
  }

  // Return both the sorted data and the metrics needed by the assignment's
  // implementation, analysis, stability, and report sections.
  return {
    algorithm: 'Stable Insertion Sort',
    sortedArray: values,
    comparisons,
    shifts,
    writes,
    passes: Math.max(values.length - 1, 0),
    elapsedMs: Number((now() - startedAt).toFixed(3)),
    steps,
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1) auxiliary space',
    stable: true,
  }
}

/**
 * insertionSort(values)
 * -----------------------------------------------------------------------------
 * Non-mutating convenience wrapper around insertionSortInPlace().
 *
 * Why this wrapper is useful:
 * - The real algorithm remains in-place.
 * - The GUI can sort user input without changing the original preview array.
 * - Tests can verify the sorted result while also confirming caller data is safe.
 */
export function insertionSort(values) {
  assertIntegerArray(values)
  return insertionSortInPlace(values.slice())
}

/**
 * stableInsertionSortByKey(items, keyName)
 * -----------------------------------------------------------------------------
 * Stable Insertion Sort for objects, used to demonstrate stability.
 *
 * Instead of sorting numbers directly, this helper sorts records by a selected
 * key, such as { key: 2, tag: 'A' }. The tag acts like a secondary identity that
 * lets us prove whether equal keys kept their original order.
 */
export function stableInsertionSortByKey(items, keyName = 'key') {
  if (!Array.isArray(items)) {
    throw new TypeError('Stable object Insertion Sort expects an array of objects.')
  }

  // Copy the array so the stability demo does not mutate the original record
  // list. The object references themselves are intentionally preserved because
  // the goal is to reorder records, not clone their fields.
  const values = items.slice()
  let comparisons = 0
  let shifts = 0

  for (let index = 1; index < values.length; index += 1) {
    const current = values[index]
    let scanIndex = index - 1

    while (scanIndex >= 0) {
      comparisons += 1

      // Same stability rule as the integer sorter: move only records with keys
      // strictly greater than the current key. Equal-key records are left in
      // front of the current record, preserving their original sequence.
      if (values[scanIndex][keyName] > current[keyName]) {
        values[scanIndex + 1] = values[scanIndex]
        shifts += 1
        scanIndex -= 1
      } else {
        break
      }
    }

    values[scanIndex + 1] = current
  }

  return { sortedItems: values, comparisons, shifts, stable: true }
}

/**
 * demonstrateInsertionSortStability()
 * -----------------------------------------------------------------------------
 * Builds a small object-record example that proves stable behavior.
 *
 * Three records share key=2 and start in this tag order: A, B, C.
 * After sorting by key, records with key=1 should come first and key=3 should
 * come last, but the key=2 group must still appear as A, B, C. If the order ever
 * becomes B, A, C or C, A, B, the implementation would not be stable.
 */
export function demonstrateInsertionSortStability() {
  const records = [
    { key: 2, tag: 'A', description: 'first record with key 2' },
    { key: 1, tag: 'X', description: 'record with key 1' },
    { key: 2, tag: 'B', description: 'second record with key 2' },
    { key: 3, tag: 'Z', description: 'record with key 3' },
    { key: 2, tag: 'C', description: 'third record with key 2' },
  ]

  const result = stableInsertionSortByKey(records, 'key')
  const originalOrderForKeyTwo = records.filter((record) => record.key === 2).map((record) => record.tag)
  const sortedOrderForKeyTwo = result.sortedItems.filter((record) => record.key === 2).map((record) => record.tag)

  return {
    records,
    sortedItems: result.sortedItems,
    originalOrderForKeyTwo,
    sortedOrderForKeyTwo,
    stable: arraysEqual(originalOrderForKeyTwo, sortedOrderForKeyTwo),
  }
}

/**
 * runInsertionSortCase(testCase)
 * -----------------------------------------------------------------------------
 * Runs one required assignment case and returns a structured result object.
 *
 * The GUI Live Test Results panel uses this helper so every test card can show:
 * - the original input,
 * - the expected sorted result,
 * - the actual sorted result,
 * - the recorded metrics,
 * - and whether the case passed.
 */
export function runInsertionSortCase(testCase) {
  const result = insertionSort(testCase.input)

  return {
    ...testCase,
    actual: result.sortedArray,
    metrics: result,
    passed: arraysEqual(result.sortedArray, testCase.expected) && isSortedAscending(result.sortedArray),
  }
}

/**
 * buildRequiredInsertionSortCases(customInput)
 * -----------------------------------------------------------------------------
 * Creates the assignment's required case list.
 *
 * Required categories from the instructions:
 * - small array,
 * - large array,
 * - nearly sorted array,
 * - reversed array,
 * - duplicate values / stability-sensitive values,
 * - empty array,
 * - single-element array.
 *
 * The expected value for each case is produced with JavaScript's built-in sort
 * on a copy. That does not replace the student's algorithm; it simply gives the
 * test harness an independent expected answer to compare against.
 */
export function buildRequiredInsertionSortCases(customInput = [42, 7, 19, 3, 25, 11]) {
  const small = [5, 2, 9, 1, 5, 6]
  const large = generateRandomIntegerArray(60, 1, 999)
  const nearlySorted = buildNearlySortedArray(12)
  const reversed = buildReversedArray(12)
  const duplicates = [4, 4, 2, 4, 1, 2]

  return [
    {
      id: 'custom-or-small-array',
      label: 'Small/custom array',
      input: customInput.length ? customInput.slice() : small,
      expected: (customInput.length ? customInput.slice() : small).sort((a, b) => a - b),
      scenario: 'General correctness check',
    },
    {
      id: 'large-array',
      label: 'Large random array',
      input: large,
      expected: large.slice().sort((a, b) => a - b),
      scenario: 'Larger input performance check',
    },
    {
      id: 'nearly-sorted-array',
      label: 'Nearly sorted array',
      input: nearlySorted,
      expected: nearlySorted.slice().sort((a, b) => a - b),
      scenario: 'Best-case / near-best-case check',
    },
    {
      id: 'reversed-array',
      label: 'Reversed array',
      input: reversed,
      expected: reversed.slice().sort((a, b) => a - b),
      scenario: 'Worst-case check',
    },
    {
      id: 'duplicate-values',
      label: 'Duplicate values',
      input: duplicates,
      expected: duplicates.slice().sort((a, b) => a - b),
      scenario: 'Equal value handling for stability-sensitive logic',
    },
    {
      id: 'empty-array',
      label: 'Empty array',
      input: [],
      expected: [],
      scenario: 'Edge case with no elements',
    },
    {
      id: 'single-element',
      label: 'Single element',
      input: [8],
      expected: [8],
      scenario: 'Edge case with one element',
    },
  ]
}

/**
 * analyzeInsertionSortPerformance()
 * -----------------------------------------------------------------------------
 * Generates the metrics used by the Metrics Analysis button and report.
 *
 * The function intentionally measures three different scenarios:
 * - best/near-best case with a nearly sorted array,
 * - worst case with a reversed array,
 * - average-style cases using random arrays of several sizes.
 *
 * Timings can vary by browser, computer, and current system load, so comparisons,
 * shifts, and writes are often more reliable for explaining the algorithmic
 * pattern. The elapsed time is still useful because the assignment asks students
 * to record time taken under different conditions.
 */
export function analyzeInsertionSortPerformance() {
  const bestInput = buildNearlySortedArray(500)
  const worstInput = buildReversedArray(500)
  const averageSizes = [50, 100, 200, 400]

  const best = insertionSort(bestInput)
  const worst = insertionSort(worstInput)
  const average = averageSizes.map((size) => {
    const trials = Array.from({ length: 5 }, () => insertionSort(generateRandomIntegerArray(size, 1, 10000)))
    const totals = trials.reduce(
      (summary, trial) => ({
        elapsedMs: summary.elapsedMs + trial.elapsedMs,
        comparisons: summary.comparisons + trial.comparisons,
        shifts: summary.shifts + trial.shifts,
        writes: summary.writes + trial.writes,
      }),
      { elapsedMs: 0, comparisons: 0, shifts: 0, writes: 0 },
    )

    return {
      size,
      trials: trials.length,
      averageMs: Number((totals.elapsedMs / trials.length).toFixed(3)),
      averageComparisons: Math.round(totals.comparisons / trials.length),
      averageShifts: Math.round(totals.shifts / trials.length),
      averageWrites: Math.round(totals.writes / trials.length),
    }
  })

  return { best, worst, average }
}

/**
 * explainInsertionSortComplexity()
 * -----------------------------------------------------------------------------
 * Centralizes the written analysis text used by the GUI and PDF report.
 *
 * Keeping this text in one helper prevents the guide, Live Test Results, and
 * report from drifting into different explanations of the same algorithm.
 */
export function explainInsertionSortComplexity() {
  return {
    bestCase: 'Nearly sorted input performs well because the inner loop usually stops after one comparison. This creates O(n) behavior when almost no values need shifting.',
    worstCase: 'Reversed input is inefficient because every new key must shift across the entire sorted-left section. The nested scan produces O(n²) comparisons and shifts.',
    averageCase: 'Random input usually requires each key to scan part of the sorted-left section, so the average case is O(n²), slower than best case but often less extreme than reversed input.',
    space: 'The integer implementation is in-place because it rearranges one array and uses a constant amount of extra memory, so auxiliary space is O(1).',
    smallVsLarge: 'Insertion Sort is competitive for small arrays because the code is simple and overhead is low. For large random arrays, O(n²) growth makes QuickSort, MergeSort, or hybrid algorithms more practical.',
    applications: 'Insertion Sort is useful for tiny lists, nearly sorted incremental data, simple stable in-place ordering, and as the small-run sorter inside hybrid strategies.',
    improvements: 'Binary insertion sort can reduce comparisons by finding the insertion position with binary search. TimSort uses insertion-style sorting on small runs before merging them.',
  }
}
