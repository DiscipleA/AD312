import { describe, expect, it } from 'vitest'
import {
  arraysEqual,
  buildRequiredSelectionSortCases,
  selectionSort,
  selectionSortInPlace,
  stableSelectionSort,
} from './SelectionSort'

describe('Week 8 Assignment 1 - Selection Sort', () => {
  it('normal case 1: sorts a randomly ordered integer array in ascending order', () => {
    const result = selectionSort([42, 7, 19, 3, 25, 11])

    expect(result.sortedArray).toEqual([3, 7, 11, 19, 25, 42])
    expect(result.comparisons).toBe(15)
  })

  it('normal case 2: keeps an already sorted array in ascending order', () => {
    const values = [1, 2, 3, 4, 5, 6]
    const result = selectionSort(values)

    expect(result.sortedArray).toEqual([1, 2, 3, 4, 5, 6])
    expect(result.swaps).toBe(0)
  })

  it('normal case 3: sorts a descending array into ascending order', () => {
    const result = selectionSort([9, 7, 5, 3, 1])

    expect(result.sortedArray).toEqual([1, 3, 5, 7, 9])
    expect(result.comparisons).toBe(10)
  })

  it('edge case 1: keeps an all-equal array unchanged', () => {
    const result = selectionSort([4, 4, 4, 4])

    expect(result.sortedArray).toEqual([4, 4, 4, 4])
    expect(result.swaps).toBe(0)
  })

  it('edge case 2: handles an empty array without errors', () => {
    const result = selectionSort([])

    expect(result.sortedArray).toEqual([])
    expect(result.comparisons).toBe(0)
    expect(result.swaps).toBe(0)
  })

  it('edge case 3: handles a single-element array without errors', () => {
    const result = selectionSort([8])

    expect(result.sortedArray).toEqual([8])
    expect(result.comparisons).toBe(0)
    expect(result.swaps).toBe(0)
  })

  it('confirms the core implementation can mutate the original array in place', () => {
    const values = [10, 4, 6]
    const result = selectionSortInPlace(values)

    expect(values).toEqual([4, 6, 10])
    expect(result.sortedArray).toBe(values)
  })

  it('supports the optional descending enhancement', () => {
    const result = selectionSort([5, 1, 9, 3], 'desc')

    expect(result.sortedArray).toEqual([9, 5, 3, 1])
  })

  it('supports the optional stable variant while preserving sorted output', () => {
    const result = stableSelectionSort([3, 1, 3, 2])

    expect(result.sortedArray).toEqual([1, 2, 3, 3])
    expect(result.moves).toBeGreaterThan(0)
  })

  it('runs every assignment-required case through the helper case builder', () => {
    const cases = buildRequiredSelectionSortCases([6, 2, 9, 1])

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
      const result = selectionSort(testCase.input)
      expect(arraysEqual(result.sortedArray, testCase.expected)).toBe(true)
    }
  })
})
