import { useState } from 'react'
import '../../styles/counter-exercise.css'

export default function Counter() {
  const [count, setCount] = useState(0)

  function handleIncrement() {
    setCount(count + 1)
  }

  function handleIncrementAfterDelay() {
    setTimeout(() => {
      setCount((prevCount) => prevCount + 1)
    }, 2000)
  }

  function handleIncrementTwice() {
    setCount(count + 1)
    setCount(count + 1)
  }

  function handleCorrectIncrementTwice() {
    setCount((prevCount) => prevCount + 1)
    setCount((prevCount) => prevCount + 1)
  }

  return (
    <section className="counter-exercise-shell">
      <div className="counter-card">
        <p className="counter-kicker">Week 1 Assignment Exercise</p>
        <h2>React Counter State Lab</h2>
        <p className="counter-description">
          Use this standalone component to explore state management, delayed updates,
          batching, and the snapshot behavior of React state.
        </p>

        <div className="counter-display-panel">
          <span className="counter-label">Current Count</span>
          <p className="counter-value" data-testid="count-value">
            {count}
          </p>
        </div>

        <div className="counter-button-grid">
          <button type="button" onClick={handleIncrement}>
            Increment
          </button>

          <button type="button" onClick={handleIncrementAfterDelay}>
            Increment After Delay
          </button>

          <button type="button" onClick={handleIncrementTwice}>
            Increment Twice
          </button>

          <button type="button" onClick={handleCorrectIncrementTwice}>
            Correct Increment Twice
          </button>
        </div>

        <div className="counter-notes">
          <h3>What to Observe</h3>
          <ul>
            <li>Increment updates immediately by 1.</li>
            <li>Increment After Delay updates after 2 seconds.</li>
            <li>Increment Twice only increases by 1 because both updates use the same snapshot.</li>
            <li>Correct Increment Twice increases by 2 because updater functions use the latest value.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
