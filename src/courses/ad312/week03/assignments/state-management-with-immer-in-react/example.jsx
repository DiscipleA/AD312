import { useImmer } from 'use-immer'

export default function ShoppingListWithImmerMirrorExample() {
  const [items, updateItems] = useImmer([
    {
      id: 1,
      name: 'Apples',
      quantity: 2,
      details: {
        category: 'Produce',
        notes: 'Starter item for the mirror example.',
      },
    },
  ])

  function addStarterNote(itemId) {
    updateItems((draft) => {
      const item = draft.find((entry) => entry.id === itemId)

      if (!item) {
        return
      }

      item.details.notes = 'Updated through a readable draft mutation.'
    })
  }

  return (
    <div className="lesson-example">
      <h3>Shopping List with Immer</h3>
      {items.map((item) => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button onClick={() => addStarterNote(item.id)}>Update note</button>
        </div>
      ))}
    </div>
  )
}
