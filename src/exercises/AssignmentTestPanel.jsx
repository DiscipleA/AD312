import { useMemo, useState } from 'react'
import '../styles/assignment-test-panel.css'

export default function AssignmentTestPanel() {
  const [count, setCount] = useState(0)
  const [delayTriggered, setDelayTriggered] = useState(false)
  const [delayResolved, setDelayResolved] = useState(false)
  const [lastAction, setLastAction] = useState('Initial state')

  function resetAll() {
    setCount(0)
    setDelayTriggered(false)
    setDelayResolved(false)
    setLastAction('Reset to initial state')
  }

  function handleIncrement() {
    setCount((prev) => prev + 1)
    setLastAction('Increment button')
  }

  function handleIncrementAfterDelay() {
    setDelayTriggered(true)
    setDelayResolved(false)
    setLastAction('Increment After Delay button')

    setTimeout(() => {
      setCount((prev) => prev + 1)
      setDelayResolved(true)
    }, 2000)
  }

  function handleIncrementTwice() {
    setCount(count + 1)
    setCount(count + 1)
    setLastAction('Increment Twice button')
  }

  function handleCorrectIncrementTwice() {
    setCount((prev) => prev + 1)
    setCount((prev) => prev + 1)
    setLastAction('Correct Increment Twice button')
  }

  const testResults = useMemo(() => {
    return [
      {
        label: 'Initial count starts at 0',
        passed: count === 0 && lastAction === 'Initial state',
        detail: `Current count: ${count}`,
      },
      {
        label: 'Increment adds 1',
        passed: lastAction === 'Increment button' && count >= 1,
        detail: `Current count after increment path: ${count}`,
      },
      {
        label: 'Delayed increment was triggered',
        passed: delayTriggered,
        detail: delayTriggered ? 'Delay action started.' : 'Delay action not started yet.',
      },
      {
        label: 'Delayed increment resolved after timeout',
        passed: delayResolved,
        detail: delayResolved ? 'Delayed update completed.' : 'Waiting for delayed update.',
      },
      {
        label: 'Increment Twice demonstrates snapshot batching',
        passed: lastAction === 'Increment Twice button',
        detail: 'This action is included to demonstrate how repeated direct updates can share the same snapshot.',
      },
      {
        label: 'Correct Increment Twice uses updater functions',
        passed: lastAction === 'Correct Increment Twice button',
        detail: 'This action demonstrates the correct way to stack dependent state updates.',
      },
    ]
  }, [count, delayTriggered, delayResolved, lastAction])

  const passCount = testResults.filter((test) => test.passed).length

  return (
    <section className="assignment-test-panel">
      <div className="assignment-test-header">
        <div>
          <p className="assignment-test-kicker">Live Assignment Checks</p>
          <h2>On-Screen Test Runner</h2>
          <p className="assignment-test-summary">
            This panel gives students a visual pass/fail experience inside the assignment tab.
            It is meant for learning and demonstration, while your Vitest suite remains the official automated test layer.
          </p>
        </div>

        <div className="assignment-test-score">
          <span>{passCount} / {testResults.length}</span>
          <small>Checks currently passing</small>
        </div>
      </div>

      <div className="assignment-test-controls">
        <button type="button" onClick={resetAll}>Reset</button>
        <button type="button" onClick={handleIncrement}>Increment</button>
        <button type="button" onClick={handleIncrementAfterDelay}>Increment After Delay</button>
        <button type="button" onClick={handleIncrementTwice}>Increment Twice</button>
        <button type="button" onClick={handleCorrectIncrementTwice}>Correct Increment Twice</button>
      </div>

      <div className="assignment-test-statebox">
        <p><strong>Current Count:</strong> {count}</p>
        <p><strong>Last Action:</strong> {lastAction}</p>
        <p><strong>Delay Triggered:</strong> {delayTriggered ? 'Yes' : 'No'}</p>
        <p><strong>Delay Resolved:</strong> {delayResolved ? 'Yes' : 'No'}</p>
      </div>

      <div className="assignment-test-grid">
        {testResults.map((test) => (
          <article
            key={test.label}
            className={test.passed ? 'assignment-test-card passed' : 'assignment-test-card pending'}
          >
            <div className="assignment-test-badge">
              {test.passed ? 'PASS' : 'WAIT'}
            </div>
            <h3>{test.label}</h3>
            <p>{test.detail}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
