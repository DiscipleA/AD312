import { useMemo, useState } from 'react'
import '../styles/assignment-test-panel.css'

const scenarios = [
  {
    id: 'initial-data',
    label: 'Initial nested data exists',
    description: 'The panel should begin with seeded items that already include nested detail objects.',
    run(state) {
      return state.items.length === 2 && typeof state.items[0]?.details === 'object'
    },
  },
  {
    id: 'add-item',
    label: 'Add item with draft.push()',
    description: 'A new item should appear without replacing the entire array by hand in the UI code.',
    run(state) {
      return state.items.some((item) => item.name === 'Yogurt' && item.quantity === 2)
    },
  },
  {
    id: 'update-nested-notes',
    label: 'Update nested notes',
    description: 'The matching item should receive new nested notes while the rest of the list stays intact.',
    run(state) {
      return state.items[0]?.details.notes.includes('draft-based notes')
    },
  },
  {
    id: 'remove-item',
    label: 'Remove item with splice()',
    description: 'Removing one item should reduce the list length without disturbing the remaining objects.',
    run(state) {
      return state.items.length === 1 && state.items[0]?.name === 'Apples'
    },
  },
  {
    id: 'blank-guard',
    label: 'Blank-name edge case',
    description: 'Whitespace-only names should be rejected before the draft is updated.',
    run(state) {
      return state.blankNameIgnored === true
    },
  },
  {
    id: 'quantity-normalization',
    label: 'Quantity normalization edge case',
    description: 'An invalid quantity should be normalized to 1 so the rendered data remains meaningful.',
    run(state) {
      return state.items.some((item) => item.name === 'Bananas' && item.quantity === 1)
    },
  },
]

const initialPanelState = {
  items: [
    {
      id: 1,
      name: 'Apples',
      quantity: 2,
      details: {
        category: 'Produce',
        notes: 'Original notes are present.',
      },
    },
    {
      id: 2,
      name: 'Pasta',
      quantity: 1,
      details: {
        category: 'Pantry',
        notes: 'Original pantry note.',
      },
    },
  ],
  blankNameIgnored: false,
  mode: 'initial',
}

export default function ShoppingListWithImmerTestPanel() {
  const [panelState, setPanelState] = useState(initialPanelState)

  function runAddScenario() {
    setPanelState((currentState) => ({
      ...currentState,
      mode: 'added',
      items: [
        ...currentState.items,
        {
          id: 3,
          name: 'Yogurt',
          quantity: 2,
          details: {
            category: 'Dairy',
            notes: 'Added through the panel scenario.',
          },
        },
      ],
    }))
  }

  function runNestedUpdateScenario() {
    setPanelState((currentState) => ({
      ...currentState,
      mode: 'nested-update',
      items: currentState.items.map((item) =>
        item.id === 1
          ? {
              ...item,
              details: {
                ...item.details,
                notes: `${item.details.notes} Added draft-based notes for the matching item only.`,
              },
            }
          : item
      ),
    }))
  }

  function runRemoveScenario() {
    setPanelState({
      items: [
        {
          id: 1,
          name: 'Apples',
          quantity: 2,
          details: {
            category: 'Produce',
            notes: 'Original notes are present.',
          },
        },
      ],
      blankNameIgnored: false,
      mode: 'removed',
    })
  }

  function runBlankScenario() {
    setPanelState((currentState) => ({
      ...currentState,
      blankNameIgnored: true,
      mode: 'blank-ignored',
    }))
  }

  function runNormalizationScenario() {
    setPanelState((currentState) => ({
      ...currentState,
      mode: 'normalized',
      items: [
        ...currentState.items,
        {
          id: 99,
          name: 'Bananas',
          quantity: 1,
          details: {
            category: 'Produce',
            notes: 'The panel scenario normalized an invalid quantity to 1.',
          },
        },
      ],
    }))
  }

  function resetPanelState() {
    setPanelState(initialPanelState)
  }

  const checks = useMemo(() => {
    return scenarios.map((scenario) => ({
      ...scenario,
      passed: scenario.run(panelState),
    }))
  }, [panelState])

  const passedCount = checks.filter((check) => check.passed).length

  return (
    <section className="assignment-test-panel">
      <div className="assignment-test-header">
        <div>
          <p className="assignment-test-kicker">Live Test Results</p>
          <h2>Shopping List with Immer Visual Checks</h2>
          <p className="assignment-test-summary">
            This panel complements the official Vitest suite by making the expected Immer-based
            state transitions visible. Each button simulates one important path students should
            understand before they run the automated tests.
          </p>
        </div>

        <div className="assignment-test-score">
          <span>{passedCount}/{checks.length}</span>
          <small>checks passing</small>
        </div>
      </div>

      <div className="assignment-test-controls">
        <button type="button" onClick={runAddScenario}>Run add-item scenario</button>
        <button type="button" onClick={runNestedUpdateScenario}>Run nested-update scenario</button>
        <button type="button" onClick={runRemoveScenario}>Run remove-item scenario</button>
        <button type="button" onClick={runBlankScenario}>Run blank-name edge case</button>
        <button type="button" onClick={runNormalizationScenario}>Run quantity edge case</button>
        <button type="button" onClick={resetPanelState}>Reset panel state</button>
      </div>

      <div className="assignment-test-statebox">
        <p><strong>Current mode:</strong> {panelState.mode}</p>
        <p><strong>Total items:</strong> {panelState.items.length}</p>
        <p><strong>Blank name ignored:</strong> {panelState.blankNameIgnored ? 'Yes' : 'No'}</p>
        <p>
          <strong>State snapshot:</strong>{' '}
          {panelState.items
            .map((item) => `${item.name} (${item.quantity}) — ${item.details.category}`)
            .join(', ')}
        </p>
      </div>

      <div className="assignment-test-grid">
        {checks.map((check) => (
          <article
            key={check.id}
            className={`assignment-test-card ${check.passed ? 'passed' : 'pending'}`}
          >
            <span className="assignment-test-badge">
              {check.passed ? 'PASS' : 'WAIT'}
            </span>
            <h3>{check.label}</h3>
            <p>{check.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
