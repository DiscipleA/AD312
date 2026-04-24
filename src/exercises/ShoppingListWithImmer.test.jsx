import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'
import ShoppingListWithImmer from './ShoppingListWithImmer'

afterEach(() => {
  cleanup()
})

describe('ShoppingListWithImmer standalone exercise', () => {
  test('normal: renders the initial shopping list and summary counts', () => {
    render(<ShoppingListWithImmer />)

    expect(screen.getByText('Apples')).toBeInTheDocument()
    expect(screen.getByText('Pasta')).toBeInTheDocument()
    expect(screen.getByTestId('summary-item-count')).toHaveTextContent('2')
    expect(screen.getByTestId('summary-total-quantity')).toHaveTextContent('3')
  })

  test('normal: adds a valid item to the shopping list', () => {
    render(<ShoppingListWithImmer />)

    fireEvent.change(screen.getByLabelText(/item name/i), { target: { value: 'Greek Yogurt' } })
    fireEvent.change(screen.getByTestId('item-quantity-input'), { target: { value: '3' } })
    fireEvent.change(screen.getByTestId('item-category-input'), { target: { value: 'Dairy' } })
    fireEvent.change(screen.getByTestId('item-notes-input'), { target: { value: 'Use for breakfast parfaits.' } })
    fireEvent.click(screen.getByRole('button', { name: /add item with immer/i }))

    expect(screen.getByText('Greek Yogurt')).toBeInTheDocument()
    expect(screen.getByText('Category: Dairy')).toBeInTheDocument()
    expect(screen.getByText('Notes: Use for breakfast parfaits.')).toBeInTheDocument()
    expect(screen.getByTestId('summary-item-count')).toHaveTextContent('3')
  })

  test('normal: updates nested note text for an existing item', () => {
    render(<ShoppingListWithImmer />)

    fireEvent.click(screen.getByRole('button', { name: /add study note for apples/i }))

    expect(screen.getByTestId('item-notes-1')).toHaveTextContent('Remember to compare this update with a manual spread-based version.')
  })

  test('normal: removes an item from the list', () => {
    render(<ShoppingListWithImmer />)

    fireEvent.click(screen.getByRole('button', { name: /remove pasta/i }))

    expect(screen.queryByText('Pasta')).not.toBeInTheDocument()
    expect(screen.getByTestId('summary-item-count')).toHaveTextContent('1')
  })

  test('edge: ignores blank item names so empty items are not added', () => {
    render(<ShoppingListWithImmer />)

    fireEvent.change(screen.getByLabelText(/item name/i), { target: { value: '    ' } })
    fireEvent.click(screen.getByRole('button', { name: /add item with immer/i }))

    expect(screen.getByTestId('summary-item-count')).toHaveTextContent('2')
    expect(screen.queryByTestId('shopping-item-3')).not.toBeInTheDocument()
  })

  test('edge: normalizes invalid quantity input to 1 when adding a new item', () => {
    render(<ShoppingListWithImmer />)

    fireEvent.change(screen.getByLabelText(/item name/i), { target: { value: 'Bananas' } })
    fireEvent.change(screen.getByTestId('item-quantity-input'), { target: { value: '0' } })
    fireEvent.click(screen.getByRole('button', { name: /add item with immer/i }))

    expect(screen.getByText('Bananas')).toBeInTheDocument()
    expect(screen.getByTestId('item-quantity-3')).toHaveTextContent('Quantity: 1')
  })

  test('edge: updating one item leaves other nested notes unchanged', () => {
    render(<ShoppingListWithImmer />)

    fireEvent.click(screen.getByRole('button', { name: /add study note for apples/i }))

    expect(screen.getByTestId('item-notes-1')).toHaveTextContent('Remember to compare this update with a manual spread-based version.')
    expect(screen.getByTestId('item-notes-2')).toHaveTextContent('Useful for a fast dinner after class.')
  })
})
