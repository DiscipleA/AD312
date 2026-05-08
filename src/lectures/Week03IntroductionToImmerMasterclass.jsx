import React, { useEffect, useMemo, useRef, useState } from 'react'
import { produce } from 'immer'
import '../styles/stateMasterclass.css'
import CodeBlock from '../components/CodeBlock'
import { annotateDisplayedCode } from '../utils/educationalCode'

const SlideHeader = ({ title, bullets }) => (
  <div
    style={{
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '30px',
      borderRadius: '12px',
      marginBottom: '25px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
    }}
  >
    <h2
      style={{
        borderBottom: '2px solid #3498db',
        paddingBottom: '10px',
        marginTop: 0,
      }}
    >
      {title}
    </h2>
    <ul style={{ lineHeight: '1.8', fontSize: '1.05rem', marginBottom: 0 }}>
      {bullets.map((bullet, index) => (
        <li key={index}>{bullet}</li>
      ))}
    </ul>
  </div>
)

function SectionWrapper({
  title,
  slideData,
  description,
  rwTitle,
  rwContent,
  broadTitle,
  broadContent,
  narrowTitle,
  narrowContent,
  fullCode,
  explanation,
  children,
}) {
  return (
    <section className="sm-section">
      <h1 className="sm-title">{title}</h1>
      <SlideHeader {...slideData} />

      <p className="sm-description">
        <strong>Description:</strong> {description}
      </p>

      <div className="sm-grid">
        <div className="sm-panel">
          <h3>Real-World Context: {rwTitle}</h3>
          <p className="sm-preline">{rwContent}</p>
        </div>

        <div className="sm-panel">
          <h3>The Broad Scale: {broadTitle}</h3>
          <p className="sm-preline">{broadContent}</p>
        </div>
      </div>

      <div className="sm-narrow">
        <h3>The Narrow Approach: {narrowTitle}</h3>
        <p className="sm-preline">{narrowContent}</p>
      </div>

      <h3 className="sm-subheading">Full Code Example</h3>
      <CodeBlock
        code={annotateDisplayedCode(fullCode, 'react')}
        language="jsx"
        label="React JSX"
      />

      <h3 className="sm-subheading">Code in Action</h3>
      <div className="sm-demo-shell">{children}</div>

      <div className="sm-explanation">
        <h3>Deep Dive: Step-by-Step Code Explanation</h3>
        <div className="sm-preline">{explanation}</div>
      </div>
    </section>
  )
}

function IntroductionToImmerDemo() {
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
    <div>
      <h3 style={{ marginTop: 0 }}>{recipe.name}</h3>
      <p>Servings: {recipe.details.servings}</p>
      <ul style={{ paddingLeft: '20px' }}>
        {recipe.details.ingredients.map((item) => (
          <li key={item.id}>
            {item.name}: {item.quantity}
          </li>
        ))}
      </ul>
      <button className="sm-button" onClick={addSeasoning}>
        Add Oregano
      </button>
    </div>
  )
}

function WhyImmerDemo() {
  const [flight, setFlight] = useState({
    id: 'SEA-123',
    status: 'On Time',
    manifest: {
      crew: {
        pilot: 'Capt. Miller',
        cabin: ['Alice', 'Bob'],
      },
      passengers: [
        { seat: '1A', name: 'Dmitriy', checkedIn: false },
        { seat: '1B', name: 'Elena', checkedIn: true },
      ],
    },
  })

  function checkInPassenger(seatNumber) {
    setFlight(
      produce((draft) => {
        const passenger = draft.manifest.passengers.find(
          (person) => person.seat === seatNumber
        )

        if (passenger) {
          passenger.checkedIn = true
        }
      })
    )
  }

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Flight Manifest: {flight.id}</h3>
      <p>Status: {flight.status}</p>
      <ul style={{ paddingLeft: '20px' }}>
        {flight.manifest.passengers.map((passenger) => (
          <li key={passenger.seat} style={{ marginBottom: '10px' }}>
            {passenger.name} ({passenger.seat}) —{' '}
            {passenger.checkedIn ? '✅ Checked In' : '❌ Waiting'}
            {!passenger.checkedIn ? (
              <button
                className="sm-button"
                onClick={() => checkInPassenger(passenger.seat)}
                style={{ marginLeft: '10px' }}
              >
                Check In
              </button>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ProduceFunctionDemo() {
  const nextAlertId = useRef(1)
  const [dashboard, setDashboard] = useState({
    city: 'Seattle',
    lastUpdated: '10:00 AM',
    forecast: {
      temp: 55,
      conditions: 'Cloudy',
      alerts: [],
    },
  })

  function triggerEmergencyAlert(message) {
    setDashboard(
      produce((draft) => {
        draft.lastUpdated = '11:15 AM'
        draft.forecast.temp = 42
        draft.forecast.conditions = 'Storming'
        draft.forecast.alerts.push({
          id: nextAlertId.current,
          severity: 'High',
          message,
        })

        nextAlertId.current += 1
      })
    )
  }

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>{dashboard.city} Forecast</h3>
      <p>Last Sync: {dashboard.lastUpdated}</p>
      <div className="sm-panel" style={{ marginBottom: '16px' }}>
        <p>Temperature: {dashboard.forecast.temp}°F</p>
        <p>Conditions: {dashboard.forecast.conditions}</p>
      </div>
      {dashboard.forecast.alerts.map((alert) => (
        <div key={alert.id} style={{ color: '#ef4444', marginBottom: '8px', fontWeight: 700 }}>
          ALERT: {alert.message}
        </div>
      ))}
      <button
        className="sm-button"
        onClick={() => triggerEmergencyAlert('High Winds Expected')}
      >
        Simulate Storm
      </button>
    </div>
  )
}

function WithoutImmerDemo() {
  const [recipe, setRecipe] = useState({
    title: 'Morning Smoothie',
    ingredients: [
      { id: 1, name: 'Banana', organic: false },
      { id: 2, name: 'Spinach', organic: true },
    ],
  })

  function toggleOrganicStatus(id) {
    const updatedIngredients = recipe.ingredients.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          organic: !item.organic,
        }
      }

      return item
    })

    setRecipe({
      ...recipe,
      ingredients: updatedIngredients,
    })
  }

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>{recipe.title}</h3>
      <ul style={{ paddingLeft: '20px' }}>
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient.id} style={{ marginBottom: '10px' }}>
            {ingredient.name} — {ingredient.organic ? '🌿 Organic' : '🚜 Conventional'}
            <button
              className="sm-button ghost"
              onClick={() => toggleOrganicStatus(ingredient.id)}
              style={{ marginLeft: '10px' }}
            >
              Toggle
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function WithImmerDemo() {
  const nextProduceId = useRef(3)
  const [inventory, setInventory] = useState({
    storeName: 'Fresh Market',
    aisles: {
      produce: [
        { id: 'p1', name: 'Apples', inStock: true },
        { id: 'p2', name: 'Bananas', inStock: false },
      ],
    },
  })

  function restockItem(itemId) {
    setInventory(
      produce((draft) => {
        const item = draft.aisles.produce.find((entry) => entry.id === itemId)

        if (item) {
          item.inStock = true
        }

        draft.aisles.produce.push({
          id: `p${nextProduceId.current}`,
          name: 'Organic Kale',
          inStock: true,
        })

        nextProduceId.current += 1
      })
    )
  }

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>{inventory.storeName}</h3>
      <ul style={{ paddingLeft: '20px' }}>
        {inventory.aisles.produce.map((item) => (
          <li key={item.id}>
            {item.name}: {item.inStock ? '✅ In Stock' : '❌ Restock Needed'}
          </li>
        ))}
      </ul>
      <button className="sm-button" onClick={() => restockItem('p2')}>
        Restock Bananas and Add Kale
      </button>
    </div>
  )
}

const updateCoffeeOrder = produce((draft, productId, newSize) => {
  const item = draft.find((product) => product.id === productId)

  if (item) {
    item.size = newSize
    item.lastModified = '2026-04-21T09:30:00.000Z'
  }
})

function CurriedProducersDemo() {
  const [orders, setOrders] = useState([
    { id: 101, type: 'Latte', size: 'Medium' },
    { id: 102, type: 'Cold Brew', size: 'Small' },
  ])

  function handleSizeChange(id, size) {
    setOrders((previousOrders) => updateCoffeeOrder(previousOrders, id, size))
  }

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Current Orders</h3>
      {orders.map((order) => (
        <div key={order.id} className="sm-panel" style={{ marginBottom: '12px' }}>
          <strong>{order.type}</strong> — {order.size}
          <div style={{ marginTop: '10px' }}>
            <button className="sm-button" onClick={() => handleSizeChange(order.id, 'Large')}>
              Upgrade to Large
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

const introCode = `import React, { useRef, useState } from 'react'
import { produce } from 'immer'

export default function IngredientList() {
  // This ref stores the next stable id for any ingredient we append later.
  // We use a ref instead of state because changing an id counter should not
  // force a re-render by itself.
  const nextId = useRef(3)

  // The recipe state is intentionally nested so students can feel the pain
  // of deep updates and then see why Immer removes that boilerplate.
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
    // produce() gives us a draft version of state.
    // The draft is special: we can write push() and direct property edits,
    // but Immer still returns a brand-new immutable result for React.
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
}`

const whyImmerCode = `import React, { useState } from 'react'
import { produce } from 'immer'

export default function FlightManifest() {
  const [flight, setFlight] = useState({
    id: 'SEA-123',
    status: 'On Time',
    manifest: {
      crew: {
        pilot: 'Capt. Miller',
        cabin: ['Alice', 'Bob'],
      },
      passengers: [
        { seat: '1A', name: 'Dmitriy', checkedIn: false },
        { seat: '1B', name: 'Elena', checkedIn: true },
      ],
    },
  })

  function checkInPassenger(seatNumber) {
    // The key lesson here is that we are not mutating React state directly.
    // We are mutating a draft that Immer is tracking.
    setFlight(
      produce((draft) => {
        // find() lets us target the exact passenger object we want to update.
        // Once found, Immer watches the direct assignment and reconstructs
        // only the branches that actually changed.
        const passenger = draft.manifest.passengers.find(
          (person) => person.seat === seatNumber
        )

        if (passenger) {
          passenger.checkedIn = true
        }
      })
    )
  }

  return (
    <section>
      <h2>Flight: {flight.id}</h2>
      <p>Status: {flight.status}</p>

      <ul>
        {flight.manifest.passengers.map((passenger) => (
          <li key={passenger.seat}>
            {passenger.name} ({passenger.seat}) -
            {passenger.checkedIn ? ' Checked In' : ' Waiting'}
            {!passenger.checkedIn ? (
              <button onClick={() => checkInPassenger(passenger.seat)}>
                Check In
              </button>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  )
}`

const produceFunctionCode = `import React, { useRef, useState } from 'react'
import { produce } from 'immer'

export default function WeatherDashboard() {
  const nextAlertId = useRef(1)

  const [dashboard, setDashboard] = useState({
    city: 'Seattle',
    lastUpdated: '10:00 AM',
    forecast: {
      temp: 55,
      conditions: 'Cloudy',
      alerts: [],
    },
  })

  function triggerEmergencyAlert(message) {
    // A single producer can update several related fields together.
    // This is powerful because the state transition stays grouped in one place.
    setDashboard(
      produce((draft) => {
        draft.lastUpdated = '11:15 AM'
        draft.forecast.temp = 42
        draft.forecast.conditions = 'Storming'

        // push() would normally be illegal on React state arrays.
        // Inside an Immer draft, it becomes a readable way to describe
        // the next immutable array we want React to receive.
        draft.forecast.alerts.push({
          id: nextAlertId.current,
          severity: 'High',
          message,
        })

        nextAlertId.current += 1
      })
    )
  }

  return (
    <section>
      <h2>{dashboard.city} Forecast</h2>
      <p>Last Sync: {dashboard.lastUpdated}</p>
      <p>Temperature: {dashboard.forecast.temp}°F</p>
      <p>Conditions: {dashboard.forecast.conditions}</p>

      {dashboard.forecast.alerts.map((alert) => (
        <p key={alert.id}>
          ALERT: {alert.message}
        </p>
      ))}

      <button type="button" onClick={() => triggerEmergencyAlert('High Winds Expected')}>
        Simulate Storm
      </button>
    </section>
  )
}`

const withoutImmerCode = `import React, { useState } from 'react'

export default function RecipeManager() {
  const [recipe, setRecipe] = useState({
    title: 'Morning Smoothie',
    ingredients: [
      { id: 1, name: 'Banana', organic: false },
      { id: 2, name: 'Spinach', organic: true },
    ],
  })

  function toggleOrganicStatus(id) {
    // Step 1: rebuild the nested array with map().
    // We return a new object only for the ingredient that changed.
    const updatedIngredients = recipe.ingredients.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          organic: !item.organic,
        }
      }

      return item
    })

    // Step 2: rebuild the parent object so React gets a fresh reference.
    setRecipe({
      ...recipe,
      ingredients: updatedIngredients,
    })
  }

  return (
    <section>
      <h2>{recipe.title}</h2>
      <ul>
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            {ingredient.name} - {ingredient.organic ? 'Organic' : 'Conventional'}
            <button onClick={() => toggleOrganicStatus(ingredient.id)}>
              Toggle
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}`

const withImmerCode = `import React, { useRef, useState } from 'react'
import { produce } from 'immer'

export default function GroceryInventory() {
  const nextProduceId = useRef(3)

  const [inventory, setInventory] = useState({
    storeName: 'Fresh Market',
    aisles: {
      produce: [
        { id: 'p1', name: 'Apples', inStock: true },
        { id: 'p2', name: 'Bananas', inStock: false },
      ],
    },
  })

  function restockItem(itemId) {
    setInventory(
      produce((draft) => {
        // find() narrows the update to exactly one object in the array.
        const item = draft.aisles.produce.find((entry) => entry.id === itemId)

        if (item) {
          item.inStock = true
        }

        // We can also append a second record in the same transaction.
        // Immer will still produce one clean immutable result for React.
        draft.aisles.produce.push({
          id: \`p\${nextProduceId.current}\`,
          name: 'Organic Kale',
          inStock: true,
        })

        nextProduceId.current += 1
      })
    )
  }

  return (
    <section>
      <h2>{inventory.storeName}</h2>
      <ul>
        {inventory.aisles.produce.map((item) => (
          <li key={item.id}>
            {item.name}: {item.inStock ? 'In Stock' : 'Restock Needed'}
          </li>
        ))}
      </ul>

      <button type="button" onClick={() => restockItem('p2')}>
        Restock Bananas and Add Kale
      </button>
    </section>
  )
}`

const curriedProducerCode = `import React, { useState } from 'react'
import { produce } from 'immer'

// This curried producer stores the update recipe once.
// Later, React can pass in the previous state plus any extra arguments.
const updateCoffeeOrder = produce((draft, productId, newSize) => {
  const item = draft.find((product) => product.id === productId)

  if (item) {
    item.size = newSize
    item.lastModified = '2026-04-21T09:30:00.000Z'
  }
})

export default function CafeOrderSystem() {
  const [orders, setOrders] = useState([
    { id: 101, type: 'Latte', size: 'Medium' },
    { id: 102, type: 'Cold Brew', size: 'Small' },
  ])

  function handleSizeChange(id, size) {
    // React gives us the freshest previous state snapshot.
    // The curried producer turns that snapshot into the next immutable value.
    setOrders((previousOrders) => updateCoffeeOrder(previousOrders, id, size))
  }

  return (
    <section>
      <h2>Current Orders</h2>

      {orders.map((order) => (
        <article key={order.id}>
          <strong>{order.type}</strong> - {order.size}
          <button type="button" onClick={() => handleSizeChange(order.id, 'Large')}>
            Upgrade to Large
          </button>
        </article>
      ))}
    </section>
  )
}`

const sections = [
  {
    title: 'Introduction to Immer',
    slideData: {
      title: 'Introduction to Immer',
      bullets: [
        'Immer is a tiny library that makes immutable updates feel natural.',
        'It lets you write draft-style code while still returning a brand-new state value.',
        'This is especially helpful when state contains nested objects and arrays.',
        'It reduces spread-operator boilerplate without changing React’s immutability rules.',
      ],
    },
    description:
      'Immer is a state-update helper that sits on top of React’s normal immutability rules. React still expects a new state reference whenever data changes, but Immer changes the writing experience: instead of manually rebuilding every nested layer with spread syntax, you describe the change against a draft. That draft looks mutable, but Immer converts it into a safe immutable result before React receives it.',
    rwTitle: 'Editing nested product data without losing clarity',
    rwContent:
      'A commerce app might store product variants, stock counts, discount rules, and shipping metadata inside one nested object. Updating a single nested value by hand can become noisy fast. Immer keeps the code readable while preserving React-safe updates.',
    broadTitle: 'Developer experience and maintainability',
    broadContent:
      'At scale, manual immutable updates often bury the real business intent under layers of spread syntax. Immer improves maintainability because the code reads like the real change you are trying to make instead of a cloning ceremony.',
    narrowTitle: 'Draft-based thinking',
    narrowContent:
      'The core mental model is simple: write the update as though you are editing the value directly, but only inside produce(). Immer records those draft edits and constructs the next immutable state snapshot for React.',
    fullCode: introCode,
    explanation: [
      '1. The state is nested on purpose so students can immediately feel why deep updates are awkward with manual spread syntax.',
      '2. produce() wraps the state transition and hands us a draft object that behaves like a temporary editable worksheet.',
      '3. draft.details.ingredients.push(...) looks mutative, but it does not mutate the real React state object.',
      '4. React still receives a fresh immutable result, so rendering remains predictable and reference checks still work.',
    ].join('\n'),
    demo: <IntroductionToImmerDemo />,
  },
  {
    title: 'Why Immer?',
    slideData: {
      title: 'Why Immer?',
      bullets: [
        'Traditional immutable code can become verbose and hard to scan.',
        'Immer keeps the state transition readable without weakening React rules.',
        'It is especially valuable when one update targets deep data.',
        'The result is less boilerplate and fewer accidental mutation bugs.',
      ],
    },
    description:
      'The strongest argument for Immer is readability under complexity. A simple boolean or top-level string rarely needs a helper, but once a state object contains arrays of objects inside nested objects, the cost of writing every clone manually rises quickly. Immer lets you focus on the business change itself.',
    rwTitle: 'Passenger check-in in a travel dashboard',
    rwContent:
      'A flight dashboard may store crew, passengers, and flight metadata inside one object. Marking one passenger as checked in should be a tiny domain update, not a wall of cloning syntax. Immer keeps the intent front and center.',
    broadTitle: 'Reducing accidental mutation bugs',
    broadContent:
      'Manual cloning works, but it is easy to forget one level. That single omission can silently mutate old state, break debugging assumptions, and stop React from seeing the change correctly. Immer lowers that risk by making the safe path easier to write.',
    narrowTitle: 'Readable nested updates',
    narrowContent:
      'In this example, find() targets one passenger and a single property assignment completes the update. Immer handles the immutable reconstruction work behind the scenes.',
    fullCode: whyImmerCode,
    explanation: [
      '1. The manifest data is nested deeply enough to show why spread chains become repetitive.',
      '2. draft.manifest.passengers.find(...) narrows the operation to the exact passenger object we want to change.',
      '3. passenger.checkedIn = true is safe only because the object belongs to the Immer draft, not to the original React state tree.',
      '4. Immer returns a next state where unchanged branches are preserved and changed branches are rebuilt.',
    ].join('\n'),
    demo: <WhyImmerDemo />,
  },
  {
    title: 'The produce Function',
    slideData: {
      title: 'The produce Function',
      bullets: [
        'produce() is the heart of Immer.',
        'It groups related state changes into one readable transition.',
        'The draft can be updated with direct assignment, push(), splice(), and more.',
        'Immer returns a new immutable result after the recipe finishes.',
      ],
    },
    description:
      'produce() is the API that powers Immer’s learning curve and its practicality. It receives a recipe function, gives that function a draft, and then calculates the next immutable value from the edits you made. This lets one event update several related pieces of state without manually rebuilding every layer yourself.',
    rwTitle: 'Weather alerts updating several values at once',
    rwContent:
      'A weather dashboard may need to update the time stamp, current conditions, temperature, and alerts array together when a storm arrives. produce() is a clean place to keep those related edits grouped in one transaction-like step.',
    broadTitle: 'One transition, many related edits',
    broadContent:
      'State changes often happen in clusters. Instead of scattering logic across multiple helper variables, produce() lets you keep the meaning of the transition in one readable block.',
    narrowTitle: 'Batching draft edits conceptually',
    narrowContent:
      'Although produce() is not React batching, it does let you express a full state transition in one recipe so the final result is coherent, readable, and immutable.',
    fullCode: produceFunctionCode,
    explanation: [
      '1. The same producer updates lastUpdated, forecast values, and the alerts array in one place.',
      '2. That grouping matters because students can see the full state transition as one story instead of three unrelated setter calls.',
      '3. push() is readable here because Immer intercepts it on the draft and calculates the immutable next array.',
      '4. This pattern is a strong fit when several fields must stay synchronized after one user action.',
    ].join('\n'),
    demo: <ProduceFunctionDemo />,
  },
  {
    title: 'Practical Example Without Immer',
    slideData: {
      title: 'Practical Example Without Immer',
      bullets: [
        'Manual immutable updates usually rely on map() plus spread syntax.',
        'This is valid React code and students still need to know it well.',
        'The downside is the amount of structure required for one small change.',
        'This section is the comparison point for the next Immer version.',
      ],
    },
    description:
      'Before students use Immer comfortably, they must understand the manual pattern it is improving. React’s default immutable workflow usually means rebuilding the changed object and every parent container that points to it. That approach is still correct and important to know, but it becomes visually heavy as nesting grows.',
    rwTitle: 'Toggling an ingredient status in a recipe tool',
    rwContent:
      'Even a small nested change requires multiple immutable steps: map over the array, replace the matching object, then rebuild the parent object so React sees a new reference.',
    broadTitle: 'Manual immutability remains foundational',
    broadContent:
      'Immer should not replace understanding. Students still need to know why map(), filter(), and spread syntax work, because Immer succeeds precisely because it produces the same kind of immutable result those techniques create manually.',
    narrowTitle: 'Clone only what changes',
    narrowContent:
      'The map() call rebuilds the array, and the matching object gets a new copy. Then the top-level recipe object also gets rebuilt with a new ingredients reference.',
    fullCode: withoutImmerCode,
    explanation: [
      '1. This is correct React code and should be treated as a core skill, not as something obsolete.',
      '2. map() creates a new array, which is why it is safe for immutable updates.',
      '3. The spread operator creates a new ingredient object only for the changed item, preserving untouched fields.',
      '4. The parent object also needs a new reference, or React would still be pointing at the old recipe object.',
    ].join('\n'),
    demo: <WithoutImmerDemo />,
  },
  {
    title: 'Practical Example With Immer',
    slideData: {
      title: 'Practical Example With Immer',
      bullets: [
        'The business goal stays the same, but the code reads more directly.',
        'We can update one item and append another in the same producer.',
        'Immer handles the immutable result while the code stays close to the user story.',
        'This is where many students feel the value of drafts immediately.',
      ],
    },
    description:
      'This version solves the same core problem as the previous section, but it does so with draft syntax instead of manual rebuild steps. The advantage is not that React stops needing immutability. The advantage is that the code becomes more expressive and easier to audit in peer review.',
    rwTitle: 'Inventory updates in a grocery dashboard',
    rwContent:
      'A store manager might restock one product and add a new shipment item during the same interaction. Immer allows both actions to live inside one readable producer instead of splitting them into multiple cloning stages.',
    broadTitle: 'Readable intent over cloning mechanics',
    broadContent:
      'In code review, a teammate can now see the true business meaning immediately: restock the missing item and append a new item. The reader does not have to mentally decode multiple layers of array and object reconstruction first.',
    narrowTitle: 'One producer, two changes',
    narrowContent:
      'The recipe finds the matching record, updates its availability, and pushes one more item into the produce array. Immer then returns the next immutable inventory object for React.',
    fullCode: withImmerCode,
    explanation: [
      '1. find() keeps the logic focused on a single array item instead of rebuilding everything first.',
      '2. Direct assignment to item.inStock is safe because the item lives on the draft, not on the original state tree.',
      '3. draft.aisles.produce.push(...) demonstrates that Immer can handle append operations in the same recipe.',
      '4. The resulting code is often easier to teach because it mirrors the plain-English story of the UI action.',
    ].join('\n'),
    demo: <WithImmerDemo />,
  },
  {
    title: 'Curried Producers',
    slideData: {
      title: 'Curried Producers',
      bullets: [
        'A curried producer stores the recipe first and receives state later.',
        'This pattern is excellent for reusable update logic.',
        'It works especially well with React functional state setters.',
        'The result is cleaner handlers and more testable state transformations.',
      ],
    },
    description:
      'Curried producers are one of Immer’s most elegant patterns. Instead of calling produce() with state immediately, you define the recipe once and reuse it. Later, React can pass the previous state into that reusable producer. This separates “how state changes” from “when the component decides to apply that change.”',
    rwTitle: 'Reusable size updates in a café ordering system',
    rwContent:
      'A café app may change item sizes from several buttons or several views. A curried producer lets the team centralize the size-update logic in one place instead of rewriting it in every event handler.',
    broadTitle: 'Modularity and testability',
    broadContent:
      'Because the recipe is extracted from the component body, it becomes easier to test and easier to reuse. This also keeps the event handler short, which improves readability in large components.',
    narrowTitle: 'Functional updater compatibility',
    narrowContent:
      'React state setters can receive a function that gets the latest previous state. Curried Immer producers fit naturally into that pattern and help avoid stale-state mistakes.',
    fullCode: curriedProducerCode,
    explanation: [
      '1. updateCoffeeOrder is defined once outside the component, which keeps the actual state logic reusable.',
      '2. The producer still receives the draft first, then any extra arguments such as productId and newSize.',
      '3. setOrders((previousOrders) => ...) ensures React provides the freshest state snapshot at update time.',
      '4. This pattern becomes very useful when several UI controls share the same state-transition logic.',
    ].join('\n'),
    demo: <CurriedProducersDemo />,
  },
]

function RecapSection() {
  const recapRows = [
    ['Immer', 'A helper library that lets us describe nested updates more directly.'],
    ['produce()', 'The API that gives us a draft and returns the next immutable result.'],
    ['Draft', 'A temporary editable version of state that Immer watches for changes.'],
    ['Curried producer', 'A reusable recipe that accepts the previous state later.'],
  ]

  const bestPractices = [
    'Use Immer to improve readability, not to avoid understanding immutability.',
    'Keep the producer focused on state transitions and avoid unrelated side effects inside it.',
    'Prefer functional state setters when the next value depends on the previous snapshot.',
    'Still teach students map(), filter(), and spread syntax because Immer builds on those ideas conceptually.',
  ]

  return (
    <section
      className="sm-section sm-recap-section"
      style={{
        backgroundColor: '#203141',
        color: 'white',
      }}
    >
      <h1 className="sm-title" style={{ color: 'white' }}>
        Best Practices and Recap
      </h1>

      <div className="sm-grid">
        <div className="sm-panel" style={{ background: 'rgba(255,255,255,0.08)', color: 'white' }}>
          <h3>Key Takeaways</h3>
          <ul className="sm-preline" style={{ marginBottom: 0 }}>
            {bestPractices.map((item) => (
              <li key={item} style={{ marginBottom: '10px' }}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="sm-panel" style={{ background: 'rgba(255,255,255,0.08)', color: 'white' }}>
          <h3>Concept Table</h3>
          <div style={{ display: 'grid', gap: '10px' }}>
            {recapRows.map(([term, meaning]) => (
              <div
                key={term}
                style={{
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  background: 'rgba(255,255,255,0.04)',
                }}
              >
                <strong>{term}:</strong> {meaning}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sm-explanation" style={{ background: 'rgba(255,255,255,0.08)', color: 'white' }}>
        <h3>Final Teaching Principle</h3>
        <p className="sm-preline" style={{ marginBottom: 0 }}>
          Immer is not a replacement for React state fundamentals. It is a productivity layer that keeps immutable updates readable when state becomes more complex. Students should leave this lecture knowing both the manual immutable pattern and the draft-based pattern so they can choose the right tool with confidence.
        </p>
      </div>
    </section>
  )
}

export default function Week03IntroductionToImmerMasterclass({
  onBack,
  onSectionChange,
  title = 'Introduction to Immer',
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [sectionsCollapsed, setSectionsCollapsed] = useState(false)
  const activeSection = useMemo(() => sections[activeIndex], [activeIndex])

  useEffect(() => {
    if (!onSectionChange) return

    if (activeIndex < sections.length) {
      onSectionChange({
        index: activeIndex + 1,
        title: sections[activeIndex].title,
      })
      return
    }

    onSectionChange({
      index: sections.length + 1,
      title: 'Best Practices and Recap',
    })
  }, [activeIndex, onSectionChange])

  return (
    <div className="sm-page">
      <div className="sm-toolbar">
        <button className="sm-button ghost" onClick={onBack}>
          ← Back to Week 03
        </button>

        <div className="sm-toolbar-copy">
          <p className="sm-kicker">AD312 • Week 03 • Lecture 02</p>
          <h2>{title}</h2>
        </div>
      </div>

      <div className={`sm-layout ${sectionsCollapsed ? 'sm-layout-sidebar-collapsed' : ''}`}>
        <aside className={`sm-sidebar ${sectionsCollapsed ? 'collapsed' : ''}`}>
          <div className="sm-sidebar-header">
            <div className="sm-sidebar-label">Lecture Sections</div>
            <button
              type="button"
              className="sm-sidebar-toggle"
              aria-label={sectionsCollapsed ? 'Show lecture sections' : 'Hide lecture sections'}
              aria-expanded={!sectionsCollapsed}
              onClick={() => setSectionsCollapsed((isCollapsed) => !isCollapsed)}
            >
              <span aria-hidden="true">{sectionsCollapsed ? '›' : '‹'}</span>
            </button>
          </div>

          {sections.map((section, index) => (
            <button
              key={section.title}
              className={index === activeIndex ? 'sm-nav-button active' : 'sm-nav-button'}
              onClick={() => setActiveIndex(index)}
            >
              <span className="sm-nav-step">{String(index + 1).padStart(2, '0')}</span>
              <span>{section.title}</span>
            </button>
          ))}

          <button
            className={activeIndex === sections.length ? 'sm-nav-button active' : 'sm-nav-button'}
            onClick={() => setActiveIndex(sections.length)}
          >
            <span className="sm-nav-step">{String(sections.length + 1).padStart(2, '0')}</span>
            <span>Best Practices and Recap</span>
          </button>
        </aside>

        <main className="sm-content">
          {activeIndex < sections.length ? (
            <SectionWrapper {...activeSection}>{activeSection.demo}</SectionWrapper>
          ) : (
            <RecapSection />
          )}
        </main>
      </div>
    </div>
  )
}
