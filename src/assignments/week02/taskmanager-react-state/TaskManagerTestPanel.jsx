import { useMemo, useState } from 'react'
import '../../../styles/assignment-test-panel.css'

const scenarios = [
  {
    id: 'empty-state',
    label: 'Initial empty state',
    description: 'The panel should begin with zero tasks and an obvious empty-state message.',
    run(state) {
      return state.tasks.length === 0
    },
  },
  {
    id: 'add-task',
    label: 'Add task object',
    description: 'Adding a task should create a new object with a title and completed set to false.',
    run(state) {
      return state.tasks.length >= 1 && state.tasks[0].title === 'Plan Week 2 deliverable' && state.tasks[0].completed === false
    },
  },
  {
    id: 'toggle-complete',
    label: 'Toggle completion',
    description: 'The matching task should flip from pending to completed without mutating other items.',
    run(state) {
      return state.tasks[0]?.completed === true
    },
  },
  {
    id: 'blank-guard',
    label: 'Blank-input edge case',
    description: 'Whitespace-only input should be ignored and should not increase the task count.',
    run(state) {
      return state.lastBlankAttemptIgnored === true
    },
  },
  {
    id: 'multi-task',
    label: 'Multiple tasks remain distinct',
    description: 'Adding another task should keep each task as its own object with its own status.',
    run(state) {
      return state.tasks.length === 2 && state.tasks[0].title !== state.tasks[1].title
    },
  },
  {
    id: 'preserve-other-items',
    label: 'Untouched tasks stay pending',
    description: 'Toggling one task should not automatically toggle a second task.',
    run(state) {
      return state.tasks.length === 2 && state.tasks[0].completed === true && state.tasks[1].completed === false
    },
  },
]

const initialPanelState = {
  tasks: [],
  lastBlankAttemptIgnored: false,
  mode: 'initial',
}

export default function TaskManagerTestPanel() {
  const [panelState, setPanelState] = useState(initialPanelState)

  function runAddScenario() {
    setPanelState({
      tasks: [
        {
          id: 1,
          title: 'Plan Week 2 deliverable',
          completed: false,
        },
      ],
      lastBlankAttemptIgnored: false,
      mode: 'added',
    })
  }

  function runToggleScenario() {
    setPanelState({
      tasks: [
        {
          id: 1,
          title: 'Plan Week 2 deliverable',
          completed: true,
        },
      ],
      lastBlankAttemptIgnored: false,
      mode: 'toggled',
    })
  }

  function runBlankScenario() {
    setPanelState((currentState) => ({
      ...currentState,
      lastBlankAttemptIgnored: true,
      mode: 'blank-ignored',
    }))
  }

  function runMultipleTaskScenario() {
    setPanelState({
      tasks: [
        {
          id: 1,
          title: 'Plan Week 2 deliverable',
          completed: true,
        },
        {
          id: 2,
          title: 'Polish assignment guide content',
          completed: false,
        },
      ],
      lastBlankAttemptIgnored: false,
      mode: 'multiple',
    })
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
          <h2>TaskManager Visual Checks</h2>
          <p className="assignment-test-summary">
            This in-app panel mirrors the same logic students should implement in the
            standalone exercise. It does not replace Vitest, but it makes the expected
            state transitions easy to inspect in a visual, step-by-step way.
          </p>
        </div>

        <div className="assignment-test-score">
          <span>{passedCount}/{checks.length}</span>
          <small>checks passing</small>
        </div>
      </div>

      <div className="assignment-test-controls">
        <button type="button" onClick={runAddScenario}>
          Run add-task scenario
        </button>
        <button type="button" onClick={runToggleScenario}>
          Run toggle scenario
        </button>
        <button type="button" onClick={runBlankScenario}>
          Run blank-input edge case
        </button>
        <button type="button" onClick={runMultipleTaskScenario}>
          Run multi-task scenario
        </button>
        <button type="button" onClick={resetPanelState}>
          Reset panel state
        </button>
      </div>

      <div className="assignment-test-statebox">
        <p><strong>Current mode:</strong> {panelState.mode}</p>
        <p><strong>Total tasks:</strong> {panelState.tasks.length}</p>
        <p><strong>Blank input ignored:</strong> {panelState.lastBlankAttemptIgnored ? 'Yes' : 'No'}</p>
        <p>
          <strong>Task snapshot:</strong>{' '}
          {panelState.tasks.length === 0
            ? 'No tasks currently in panel state.'
            : panelState.tasks.map((task) => `${task.title} (${task.completed ? 'completed' : 'pending'})`).join(', ')}
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
