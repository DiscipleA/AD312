import React, { useRef, useState } from 'react'
import { produce } from 'immer'

export default function IngredientList() {
  const nextId = useRef(3)
  const [recipe, setRecipe] = useState({
    name: 'Classic Marinara',
    details: {
      servings: 4,
      ingredients: [
        { id: 1, name: 'Tomatoes', quantity: '28oz' },
        { id: 2, name: 'Garlic', quantity: '3 cloves' },
      ],
    },
  })

  function addSeasoning() {
    setRecipe(
      produce((draft) => {
        draft.details.ingredients.push({
          id: nextId.current,
          name: 'Dried Oregano',
          quantity: '1 tsp',
        })

        nextId.current += 1
      })
    )
  }

  return (
    <section>
      <h2>{recipe.name}</h2>
      <ul>
        {recipe.details.ingredients.map((item) => (
          <li key={item.id}>
            {item.name}: {item.quantity}
          </li>
        ))}
      </ul>

      <button type="button" onClick={addSeasoning}>
        Add Oregano
      </button>
    </section>
  )
}
