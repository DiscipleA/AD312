import { describe, expect, it } from 'vitest'
import {
  arraysEqual,
  buildRequiredInsertionSortCases,
  demonstrateInsertionSortStability,
  insertionSort,
  insertionSortInPlace,
  runInsertionSortCase,
} from './InsertionSort'

describe('Week 10 Assignment 1 - Insertion Sort', () => {
  it('normal case 1: sorts a small mixed integer array in ascending order', () => {
    const result = insertionSort([5, 2, 9, 1, 5, 6])

    expect(result.sortedArray).toEqual([1, 2, 5, 5, 6, 9])
    expect(result.passes).toBe(5)
    expect(result.stable).toBe(true)
  })

  it('normal case 2: handles a nearly sorted best-case style array with few shifts', () => {
    const result = insertionSort([1, 2, 3, 5, 4, 6])

    expect(result.sortedArray).toEqual([1, 2, 3, 4, 5, 6])
    expect(result.shifts).toBe(1)
    expect(result.comparisons).toBeLessThan(10)
  })

  it('normal case 3: sorts a reversed worst-case array into ascending order', () => {
    const result = insertionSort([6, 5, 4, 3, 2, 1])

    expect(result.sortedArray).toEqual([1, 2, 3, 4, 5, 6])
    expect(result.shifts).toBe(15)
    expect(result.comparisons).toBe(15)
  })

  it('edge case 1: keeps duplicate values sorted without losing any values', () => {
    const result = insertionSort([4, 4, 2, 4, 1, 2])

    expect(result.sortedArray).toEqual([1, 2, 2, 4, 4, 4])
  })

  it('edge case 2: handles an empty array without comparisons or writes', () => {
    const result = insertionSort([])

    expect(result.sortedArray).toEqual([])
    expect(result.comparisons).toBe(0)
    expect(result.shifts).toBe(0)
    expect(result.writes).toBe(0)
  })

  it('edge case 3: handles a single-element array without comparisons or writes', () => {
    const result = insertionSort([8])

    expect(result.sortedArray).toEqual([8])
    expect(result.comparisons).toBe(0)
    expect(result.shifts).toBe(0)
    expect(result.writes).toBe(0)
  })

  it('confirms the in-place implementation mutates the original array object', () => {
    const values = [10, 4, 6]
    const result = insertionSortInPlace(values)

    expect(values).toEqual([4, 6, 10])
    expect(result.sortedArray).toBe(values)
  })

  it('demonstrates stability with object records that share equal keys', () => {
    const stability = demonstrateInsertionSortStability()

    expect(stability.originalOrderForKeyTwo).toEqual(['A', 'B', 'C'])
    expect(stability.sortedOrderForKeyTwo).toEqual(['A', 'B', 'C'])
    expect(stability.stable).toBe(true)
  })

  it('runs every assignment-required case through the shared helper', () => {
    const cases = buildRequiredInsertionSortCases([6, 2, 9, 1])

    expect(cases.map((testCase) => testCase.id)).toEqual([
      'custom-or-small-array',
      'large-array',
      'nearly-sorted-array',
      'reversed-array',
      'duplicate-values',
      'empty-array',
      'single-element',
    ])

    for (const testCase of cases) {
      const result = runInsertionSortCase(testCase)
      expect(result.passed).toBe(true)
      expect(arraysEqual(result.actual, testCase.expected)).toBe(true)
    }
  })
})
