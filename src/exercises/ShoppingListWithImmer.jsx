import { useMemo, useState } from 'react'
import { useImmer } from 'use-immer'
import '../styles/week03-shopping-list-immer-assignment.css'

export const initialShoppingList = [
  {
    id: 1,
    name: 'Apples',
    quantity: 2,
    details: {
      category: 'Produce',
      notes: 'Great for quick snacks and oatmeal toppings.',
    },
  },
  {
    id: 2,
    name: 'Pasta',
    quantity: 1,
    details: {
      category: 'Pantry',
      notes: 'Useful for a fast dinner after class.',
    },
  },
]

export function normalizeQuantityInput(value) {
  const parsedValue = Number.parseInt(String(value), 10)

  if (Number.isNaN(parsedValue) || parsedValue < 1) {
    return 1
  }

  return parsedValue
}

export default function ShoppingListWithImmer() {
  const [shoppingList, updateShoppingList] = useImmer(initialShoppingList)
  const [nextId, setNextId] = useState(3)
  const [form, setForm] = useState({
    name: '',
    quantity: '1',
    category: 'Produce',
    notes: '',
  })

  const summary = useMemo(() => {
    const totalQuantity = shoppingList.reduce((sum, item) => sum + item.quantity, 0)
    const uniqueCategories = new Set(shoppingList.map((item) => item.details.category)).size

    return {
      itemCount: shoppingList.length,
      totalQuantity,
      uniqueCategories,
    }
  }, [shoppingList])

  function updateFormField(field, value) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }))
  }

  function resetForm() {
    setForm({
      name: '',
      quantity: '1',
      category: 'Produce',
      notes: '',
    })
  }

  function addItem() {
    const trimmedName = form.name.trim()

    if (!trimmedName) {
      return false
    }

    const normalizedQuantity = normalizeQuantityInput(form.quantity)

    updateShoppingList((draft) => {
      draft.push({
        id: nextId,
        name: trimmedName,
        quantity: normalizedQuantity,
        details: {
          category: form.category.trim() || 'Uncategorized',
          notes: form.notes.trim() || 'No notes yet.',
        },
      })
    })

    setNextId((currentId) => currentId + 1)
    resetForm()
    return true
  }

  function updateItem(itemId, recipe) {
    updateShoppingList((draft) => {
      const item = draft.find((entry) => entry.id === itemId)

      if (!item) {
        return
      }

      recipe(item)
    })
  }

  function increaseQuantity(itemId) {
    updateItem(itemId, (item) => {
      item.quantity += 1
    })
  }

  function markPantryStaple(itemId) {
    updateItem(itemId, (item) => {
      item.details.category = 'Pantry staple'
    })
  }

  function appendStudyNote(itemId) {
    updateItem(itemId, (item) => {
      const currentNotes = item.details.notes === 'No notes yet.' ? '' : item.details.notes
      item.details.notes = `${currentNotes}${currentNotes ? ' ' : ''}Remember to compare this update with a manual spread-based version.`
    })
  }

  function removeItem(itemId) {
    updateShoppingList((draft) => {
      const itemIndex = draft.findIndex((entry) => entry.id === itemId)

      if (itemIndex === -1) {
        return
      }

      draft.splice(itemIndex, 1)
    })
  }

  return (
    <section className="shopping-immer-shell">
      <div className="shopping-immer-card">
        <div className="shopping-immer-hero">
          <div>
            <p className="shopping-immer-kicker">Week 03 Standalone Exercise</p>
            <h2>Shopping List with useImmer</h2>
            <p className="shopping-immer-intro">
              This component stores an array of shopping items where each item contains nested
              detail data. The exercise demonstrates how a draft lets you write readable updates
              while Immer still preserves React-style immutability behind the scenes.
            </p>
          </div>

          <div className="shopping-immer-summary-grid">
            <article className="shopping-immer-summary-card">
              <span>Total items</span>
              <strong data-testid="summary-item-count">{summary.itemCount}</strong>
            </article>
            <article className="shopping-immer-summary-card">
              <span>Total quantity</span>
              <strong data-testid="summary-total-quantity">{summary.totalQuantity}</strong>
            </article>
            <article className="shopping-immer-summary-card">
              <span>Categories</span>
              <strong data-testid="summary-category-count">{summary.uniqueCategories}</strong>
            </article>
          </div>
        </div>

        <div className="shopping-immer-form-grid">
          <label className="shopping-immer-field">
            <span>Item name</span>
            <input
              value={form.name}
              onChange={(event) => updateFormField('name', event.target.value)}
              placeholder="Enter an item name"
              data-testid="item-name-input"
            />
          </label>

          <label className="shopping-immer-field">
            <span>Quantity</span>
            <input
              type="number"
              min="1"
              value={form.quantity}
              onChange={(event) => updateFormField('quantity', event.target.value)}
              data-testid="item-quantity-input"
            />
          </label>

          <label className="shopping-immer-field">
            <span>Category</span>
            <select
              value={form.category}
              onChange={(event) => updateFormField('category', event.target.value)}
              data-testid="item-category-input"
            >
              <option value="Produce">Produce</option>
              <option value="Pantry">Pantry</option>
              <option value="Dairy">Dairy</option>
              <option value="Frozen">Frozen</option>
            </select>
          </label>

          <label className="shopping-immer-field shopping-immer-field-wide">
            <span>Notes</span>
            <textarea
              value={form.notes}
              onChange={(event) => updateFormField('notes', event.target.value)}
              placeholder="Add optional notes about how the item will be used"
              rows="3"
              data-testid="item-notes-input"
            />
          </label>
        </div>

        <div className="shopping-immer-action-row">
          <button type="button" className="shopping-immer-primary-button" onClick={addItem}>
            Add item with Immer
          </button>
          <button type="button" className="shopping-immer-secondary-button" onClick={resetForm}>
            Reset form
          </button>
        </div>

        {shoppingList.length === 0 ? (
          <div className="shopping-immer-empty-state" data-testid="shopping-empty-state">
            The shopping list is empty. Add an item to practice draft-based updates.
          </div>
        ) : (
          <div className="shopping-immer-list" data-testid="shopping-list">
            {shoppingList.map((item) => (
              <article key={item.id} className="shopping-immer-item" data-testid={`shopping-item-${item.id}`}>
                <div className="shopping-immer-item-copy">
                  <div className="shopping-immer-item-heading">
                    <h3>{item.name}</h3>
                    <span data-testid={`item-quantity-${item.id}`}>Quantity: {item.quantity}</span>
                  </div>
                  <p data-testid={`item-category-${item.id}`}>Category: {item.details.category}</p>
                  <p data-testid={`item-notes-${item.id}`}>Notes: {item.details.notes}</p>
                </div>

                <div className="shopping-immer-item-actions">
                  <button
                    type="button"
                    onClick={() => increaseQuantity(item.id)}
                    aria-label={`Increase quantity for ${item.name}`}
                  >
                    Increase quantity
                  </button>
                  <button
                    type="button"
                    onClick={() => markPantryStaple(item.id)}
                    aria-label={`Mark ${item.name} as pantry staple`}
                  >
                    Update category
                  </button>
                  <button
                    type="button"
                    onClick={() => appendStudyNote(item.id)}
                    aria-label={`Add study note for ${item.name}`}
                  >
                    Update notes
                  </button>
                  <button
                    type="button"
                    className="shopping-immer-danger-button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    Remove item
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="shopping-immer-tipbox">
          <h3>Why this exercise matters</h3>
          <ul>
            <li>The list itself is an array, so adding and removing items usually requires immutable array logic.</li>
            <li>Each item also contains nested object data, which normally requires careful object spreading.</li>
            <li>useImmer gives you a draft so the code reads like mutation while Immer safely produces the next immutable snapshot.</li>
            <li>The UI makes it easy to compare add, nested update, and removal operations in one place.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
