import Counter from '../../exercises/Counter'
import AssignmentTestPanel from './AssignmentTestPanel'
import '../../styles/week01-counter-assignment.css'

const counterSyntax = `import { useState } from 'react'
import '../styles/counter-exercise.css'

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
}`

const testSyntax = `import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react'
import { vi } from 'vitest'
import Counter from './Counter'

describe('Counter standalone exercise', () => {
  test('normal: renders with an initial count of 0', () => {
    render(<Counter />)
    expect(screen.getByTestId('count-value')).toHaveTextContent('0')
  })

  test('normal: Increment button increases the count by 1', async () => {
    const user = userEvent.setup()
    render(<Counter />)

    await user.click(screen.getByRole('button', { name: 'Increment' }))
    expect(screen.getByTestId('count-value')).toHaveTextContent('1')
  })

  test('normal: Increment After Delay increases the count by 1 after 2 seconds', async () => {
    vi.useFakeTimers()
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<Counter />)

    await user.click(screen.getByRole('button', { name: 'Increment After Delay' }))
    expect(screen.getByTestId('count-value')).toHaveTextContent('0')

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(screen.getByTestId('count-value')).toHaveTextContent('1')
    vi.useRealTimers()
  })

  test('edge: Increment Twice only increases the count by 1 because of batching and snapshot behavior', async () => {
    const user = userEvent.setup()
    render(<Counter />)

    await user.click(screen.getByRole('button', { name: 'Increment Twice' }))
    expect(screen.getByTestId('count-value')).toHaveTextContent('1')
  })

  test('edge: Correct Increment Twice increases the count by 2 using updater functions', async () => {
    const user = userEvent.setup()
    render(<Counter />)

    await user.click(screen.getByRole('button', { name: 'Correct Increment Twice' }))
    expect(screen.getByTestId('count-value')).toHaveTextContent('2')
  })

  test('edge: two delayed clicks queue correctly and resolve to a total increase of 2', async () => {
    vi.useFakeTimers()
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<Counter />)

    await user.click(screen.getByRole('button', { name: 'Increment After Delay' }))
    await user.click(screen.getByRole('button', { name: 'Increment After Delay' }))

    expect(screen.getByTestId('count-value')).toHaveTextContent('0')

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(screen.getByTestId('count-value')).toHaveTextContent('2')
    vi.useRealTimers()
  })
})`

export default function Week01CounterAssignmentGuide() {
  return (
    <div className="assignment-guide-shell">
      <div className="assignment-hero">
        <p className="assignment-kicker">Week 1 Assignment</p>
        <h1>Create a Counter Component with State Management</h1>
        <p className="assignment-summary">
          Build a standalone React counter exercise that demonstrates state management,
          delayed updates, batching, and the idea that React state behaves like a snapshot.
        </p>
      </div>

      <section className="assignment-section">
        <h2>Overview</h2>
        <p>
          In this assignment, you will create a standalone React component that helps
          you practice the useState Hook, asynchronous updates, and the difference between
          direct state updates and updater-function state updates.
        </p>
      </section>

      <section className="assignment-section">
        <h2>Learning Objectives</h2>
        <ul>
          <li>Implement state using the useState Hook.</li>
          <li>Understand how state updates can be delayed with setTimeout.</li>
          <li>Observe how React batches multiple state updates.</li>
          <li>Understand why state behaves like a snapshot during a render.</li>
          <li>Write automated tests for both normal and edge-case behavior.</li>
        </ul>
      </section>

      <section className="assignment-section">
        <h2>Step-by-Step Build Instructions</h2>

        <h3>Step 1: Create the standalone exercise file</h3>
        <p>
          Create a new file at <code>src/exercises/Counter.jsx</code>. This component
          should be standalone, which means it can run on its own without needing to be
          embedded into a larger assignment system first.
        </p>

        <h3>Step 2: Import useState</h3>
        <p>
          Import the useState Hook from React. This Hook gives your component memory.
          In this assignment, that memory will be the current count value shown on screen.
        </p>

        <h3>Step 3: Create the count state</h3>
        <p>
          Initialize a count variable with a starting value of 0. This will become the
          source of truth for the number displayed in the UI.
        </p>

        <h3>Step 4: Add the Increment button</h3>
        <p>
          Create a button labeled <strong>Increment</strong>. When clicked, it should
          increase the count by exactly 1 immediately.
        </p>

        <h3>Step 5: Add the delayed increment button</h3>
        <p>
          Create a button labeled <strong>Increment After Delay</strong>. Use setTimeout
          so the count increases after 2 seconds instead of immediately.
        </p>

        <h3>Step 6: Add the batching example</h3>
        <p>
          Create a button labeled <strong>Increment Twice</strong>. Inside that handler,
          call <code>setCount(count + 1)</code> twice in a row. This is intentionally
          designed to demonstrate React batching and snapshot behavior. Even though the
          code appears to update the count twice, React uses the same snapshot value for
          both calls in that render cycle, so the visible result is only +1.
        </p>

        <h3>Step 7: Add the correct batching solution</h3>
        <p>
          Create a button labeled <strong>Correct Increment Twice</strong>. This time,
          call <code>setCount(prevCount =&gt; prevCount + 1)</code> twice. This works
          because each updater function receives the freshest available state value.
        </p>

        <h3>Step 8: Add clear visual output</h3>
        <p>
          Show the current count in a clearly visible display area. The student should
          be able to click each button and immediately understand what changed.
        </p>

        <h3>Step 9: Add explanation notes in the UI</h3>
        <p>
          Add a short note section under the buttons so the component itself teaches the
          student what behavior to expect from each button.
        </p>

        <h3>Step 10: Keep it standalone</h3>
        <p>
          Do not depend on App-level logic. This exercise should be usable on its own,
          which makes it easier to test and later package into a larger master app.
        </p>
      </section>

      <section className="assignment-section">
        <h2>Working Component Preview</h2>
        <Counter />
      </section>

      <section className="assignment-section">
        <h2>Full Component Syntax</h2>
        <pre className="assignment-code-window">
          <code>{counterSyntax}</code>
        </pre>
      </section>

      <section className="assignment-section">
        <h2>How to Test the Component Manually</h2>
        <ol>
          <li>Run the Vite development server with <code>npm run dev</code>.</li>
          <li>Render the standalone component somewhere temporary, such as inside <code>App.jsx</code>.</li>
          <li>Confirm the count starts at 0.</li>
          <li>Click <strong>Increment</strong> once and confirm the count becomes 1.</li>
          <li>Refresh the page and click <strong>Increment After Delay</strong>. Confirm nothing changes immediately, then confirm the count increases after 2 seconds.</li>
          <li>Refresh the page and click <strong>Increment Twice</strong>. Confirm the count only increases by 1.</li>
          <li>Refresh the page and click <strong>Correct Increment Twice</strong>. Confirm the count increases by 2.</li>
          <li>Click the delayed button multiple times and observe that queued updates still resolve correctly.</li>
        </ol>
      </section>

      <section className="assignment-section">
        <h2>Automated Test Expectations</h2>
        <p>
          This assignment includes 6 test cases total:
        </p>
        <ul>
          <li>3 normal cases</li>
          <li>3 edge cases</li>
        </ul>
        <p>
          The goal is to prove that the component behaves correctly during standard use
          and also under conditions that demonstrate batching and delayed updates.
        </p>
      </section>

      <section className="assignment-section">
        <h2>Full Test Syntax</h2>
        <pre className="assignment-code-window">
          <code>{testSyntax}</code>
        </pre>
      </section>

      <section className="assignment-section">
        <h2>Live Test Results</h2>
        <p>
          Use this interactive panel to demonstrate pass and wait states directly inside
          the assignment tab. This is a visual learning aid that complements the real
          automated Vitest suite.
        </p>
        <AssignmentTestPanel />
      </section>


      <section className="assignment-section">
        <h2>How to Run the Tests</h2>
        <ol>
          <li>Install dependencies with <code>npm install</code>.</li>
          <li>Run all tests once with <code>npm run test</code>.</li>
          <li>Run in watch mode with <code>npm run test:watch</code>.</li>
          <li>Use the optional UI runner with <code>npm run test:ui</code>.</li>
        </ol>
      </section>

      <section className="assignment-section">
        <h2>What the Student Should Learn</h2>
        <ul>
          <li>State is the source of truth for UI output.</li>
          <li>React state updates are not always immediate.</li>
          <li>Direct repeated state assignments may use the same snapshot.</li>
          <li>Updater functions are the correct solution when multiple updates depend on previous state.</li>
          <li>Automated tests help verify both expected behavior and tricky edge cases.</li>
        </ul>
      </section>
    </div>
  )
}
