import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'
import TaskManager from './TaskManager'

afterEach(() => {
  cleanup()
})

describe('TaskManager standalone exercise', () => {
  test('normal: renders an empty state before any tasks are added', () => {
    render(<TaskManager />)

    expect(screen.getByTestId('empty-state')).toBeInTheDocument()
    expect(screen.getByTestId('total-count')).toHaveTextContent('0')
    expect(screen.getByTestId('completed-count')).toHaveTextContent('0')
    expect(screen.getByTestId('pending-count')).toHaveTextContent('0')
  })

  test('normal: adds a new task from the input field', () => {
    render(<TaskManager />)

    fireEvent.change(screen.getByTestId('task-input'), { target: { value: 'Prepare project reflection' } })
    fireEvent.click(screen.getByRole('button', { name: /add task/i }))

    expect(screen.queryByTestId('empty-state')).not.toBeInTheDocument()
    expect(screen.getByText('Prepare project reflection')).toBeInTheDocument()
    expect(screen.getAllByText('Pending').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByTestId('total-count')).toHaveTextContent('1')
    expect(screen.getByTestId('completed-count')).toHaveTextContent('0')
    expect(screen.getByTestId('pending-count')).toHaveTextContent('1')
  })

  test('normal: toggles a task from pending to completed', () => {
    render(<TaskManager />)

    fireEvent.change(screen.getByTestId('task-input'), { target: { value: 'Review object spread syntax' } })
    fireEvent.click(screen.getByRole('button', { name: /add task/i }))
    fireEvent.click(screen.getByRole('button', { name: /toggle completion for review object spread syntax/i }))

    expect(screen.getAllByText('Completed').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByTestId('completed-count')).toHaveTextContent('1')
    expect(screen.getByTestId('pending-count')).toHaveTextContent('0')
  })

  test('edge: ignores blank or whitespace-only task titles', () => {
    render(<TaskManager />)

    fireEvent.change(screen.getByTestId('task-input'), { target: { value: '   ' } })
    fireEvent.click(screen.getByRole('button', { name: /add task/i }))

    expect(screen.getByTestId('empty-state')).toBeInTheDocument()
    expect(screen.getByTestId('total-count')).toHaveTextContent('0')
  })

  test('edge: toggling one task does not change the status of other tasks', () => {
    render(<TaskManager />)

    fireEvent.change(screen.getByTestId('task-input'), { target: { value: 'Draft state notes' } })
    fireEvent.click(screen.getByRole('button', { name: /add task/i }))
    fireEvent.change(screen.getByTestId('task-input'), { target: { value: 'Record recap video' } })
    fireEvent.click(screen.getByRole('button', { name: /add task/i }))

    fireEvent.click(screen.getByRole('button', { name: /toggle completion for draft state notes/i }))

    expect(screen.getByText('Draft state notes')).toBeInTheDocument()
    expect(screen.getByText('Record recap video')).toBeInTheDocument()
    expect(screen.getByTestId('completed-count')).toHaveTextContent('1')
    expect(screen.getByTestId('pending-count')).toHaveTextContent('1')
    expect(screen.getAllByText('Completed').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Pending').length).toBeGreaterThanOrEqual(2)
  })

  test('edge: repeated toggles switch a task back and forth predictably', () => {
    render(<TaskManager />)

    fireEvent.change(screen.getByTestId('task-input'), { target: { value: 'Verify test cases' } })
    fireEvent.click(screen.getByRole('button', { name: /add task/i }))

    const toggleButton = screen.getByRole('button', { name: /toggle completion for verify test cases/i })

    fireEvent.click(toggleButton)
    expect(screen.getAllByText('Completed').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByTestId('completed-count')).toHaveTextContent('1')

    fireEvent.click(toggleButton)
    expect(screen.getAllByText('Pending').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByTestId('completed-count')).toHaveTextContent('0')
    expect(screen.getByTestId('pending-count')).toHaveTextContent('1')
  })
})
