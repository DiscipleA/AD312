import { describe, expect, it } from 'vitest'
import {
  arraysEqual,
  basicBubbleSort,
  basicBubbleSortInPlace,
  buildRequiredBubbleSortCases,
  optimizedBubbleSort,
  runBubbleSortCase,
} from './BubbleSort'

describe('Week 9 Assignment 1 - Bubble Sort', () => {
  it('normal case 1: sorts a randomly ordered integer array in ascending order', () => {
    const input = [42, 7, 19, 3, 25, 11]
    const basic = basicBubbleSort(input)
    const optimized = optimizedBubbleSort(input)

    expect(basic.sortedArray).toEqual([3, 7, 11, 19, 25, 42])
    expect(optimized.sortedArray).toEqual([3, 7, 11, 19, 25, 42])
  })

  it('normal case 2: keeps an already sorted array in ascending order and exits early when optimized', () => {
    const input = [1, 2, 3, 4, 5, 6]
    const basic = basicBubbleSort(input)
    const optimized = optimizedBubbleSort(input)

    expect(basic.sortedArray).toEqual(input)
    expect(optimized.sortedArray).toEqual(input)
    expect(basic.passes).toBe(5)
    expect(optimized.passes).toBe(1)
    expect(optimized.comparisons).toBeLessThan(basic.comparisons)
  })

  it('normal case 3: sorts a descending worst-case array into ascending order', () => {
    const input = [9, 7, 5, 3, 1]
    const basic = basicBubbleSort(input)
    const optimized = optimizedBubbleSort(input)

    expect(basic.sortedArray).toEqual([1, 3, 5, 7, 9])
    expect(optimized.sortedArray).toEqual([1, 3, 5, 7, 9])
    expect(basic.swaps).toBeGreaterThan(0)
  })

  it('edge case 1: keeps an all-equal array unchanged', () => {
    const result = optimizedBubbleSort([4, 4, 4, 4])

    expect(result.sortedArray).toEqual([4, 4, 4, 4])
    expect(result.swaps).toBe(0)
    expect(result.passes).toBe(1)
  })

  it('edge case 2: handles an empty array without errors', () => {
    const result = optimizedBubbleSort([])

    expect(result.sortedArray).toEqual([])
    expect(result.comparisons).toBe(0)
    expect(result.swaps).toBe(0)
    expect(result.passes).toBe(0)
  })

  it('edge case 3: handles a single-element array without errors', () => {
    const result = optimizedBubbleSort([8])

    expect(result.sortedArray).toEqual([8])
    expect(result.comparisons).toBe(0)
    expect(result.swaps).toBe(0)
    expect(result.passes).toBe(0)
  })

  it('confirms the in-place implementation mutates the original array object', () => {
    const values = [10, 4, 6]
    const result = basicBubbleSortInPlace(values)

    expect(values).toEqual([4, 6, 10])
    expect(result.sortedArray).toBe(values)
  })

  it('runs every assignment-required case through the shared helper', () => {
    const cases = buildRequiredBubbleSortCases([6, 2, 9, 1])

    expect(cases).toHaveLength(6)
    expect(cases.map((testCase) => testCase.id)).toEqual([
      'random-array',
      'already-sorted',
      'descending-input',
      'same-elements',
      'empty-array',
      'single-element',
    ])

    for (const testCase of cases) {
      const result = runBubbleSortCase(testCase)
      expect(result.passed).toBe(true)
      expect(arraysEqual(result.basicActual, testCase.expected)).toBe(true)
      expect(arraysEqual(result.optimizedActual, testCase.expected)).toBe(true)
    }
  })
})
