import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { act } from 'react'
import { vi, afterEach, describe, test, expect } from 'vitest'
import Counter from './Counter'

afterEach(() => {
  cleanup()
  vi.useRealTimers()
  vi.clearAllMocks()
})

describe('Counter standalone exercise', () => {
  test('normal: renders with an initial count of 0', () => {
    render(<Counter />)
    expect(screen.getByTestId('count-value')).toHaveTextContent('0')
  })

  test('normal: Increment button increases the count by 1', () => {
    render(<Counter />)

    fireEvent.click(screen.getByRole('button', { name: /^increment$/i }))
    expect(screen.getByTestId('count-value')).toHaveTextContent('1')
  })

  test('normal: Increment After Delay increases the count by 1 after 2 seconds', async () => {
    vi.useFakeTimers()
    render(<Counter />)

    fireEvent.click(screen.getByRole('button', { name: /increment after delay/i }))
    expect(screen.getByTestId('count-value')).toHaveTextContent('0')

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000)
    })

    expect(screen.getByTestId('count-value')).toHaveTextContent('1')
  })

  test('edge: Increment Twice only increases the count by 1 because of batching and snapshot behavior', () => {
    render(<Counter />)

    fireEvent.click(screen.getByRole('button', { name: /^increment twice$/i }))
    expect(screen.getByTestId('count-value')).toHaveTextContent('1')
  })

  test('edge: Correct Increment Twice increases the count by 2 using updater functions', () => {
    render(<Counter />)

    fireEvent.click(screen.getByRole('button', { name: /correct increment twice/i }))
    expect(screen.getByTestId('count-value')).toHaveTextContent('2')
  })

  test('edge: two delayed clicks queue correctly and resolve to a total increase of 2', async () => {
    vi.useFakeTimers()
    render(<Counter />)

    const delayedButton = screen.getByRole('button', { name: /increment after delay/i })

    fireEvent.click(delayedButton)
    fireEvent.click(delayedButton)

    expect(screen.getByTestId('count-value')).toHaveTextContent('0')

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000)
    })

    expect(screen.getByTestId('count-value')).toHaveTextContent('2')
  })
})
