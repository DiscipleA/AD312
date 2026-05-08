import TaskManager from '../assignments/week02/taskmanager-react-state/TaskManager'
import TaskManagerTestPanel from './TaskManagerTestPanel'
import '../styles/week02-taskmanager-assignment.css'
import CodeBlock from '../components/CodeBlock'
import { annotateDisplayedCode } from '../utils/educationalCode'

const taskManagerSyntax = `import { useMemo, useState } from 'react'
import '../styles/week02-taskmanager-assignment.css'

export const initialTasks = []

export default function TaskManager() {
  const [tasks, setTasks] = useState(initialTasks)
  const [taskTitle, setTaskTitle] = useState('')

  const completedCount = useMemo(() => {
    return tasks.filter((task) => task.completed).length
  }, [tasks])

  const pendingCount = tasks.length - completedCount

  function addTask(title) {
    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      return false
    }

    const nextTask = {
      id: Date.now(),
      title: trimmedTitle,
      completed: false,
    }

    setTasks((currentTasks) => [...currentTasks, nextTask])
    return true
  }

  function toggleTaskCompletion(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    )
  }

  function handleAddTask() {
    const wasAdded = addTask(taskTitle)

    if (wasAdded) {
      setTaskTitle('')
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleAddTask()
    }
  }

  return (
    <section className="task-manager-shell">
      <div className="task-manager-card">
        <p className="task-manager-kicker">Week 2 Assignment Exercise</p>
        <h2>TaskManager with React State</h2>
        <p className="task-manager-description">
          Practice immutable React state updates by adding task objects to an array and
          toggling each task&apos;s completed status with a safe <code>.map()</code>-based update.
        </p>

        <div className="task-manager-toolbar">
          <label className="task-manager-field" htmlFor="task-title-input">
            <span>Task title</span>
            <input
              id="task-title-input"
              value={taskTitle}
              onChange={(event) => setTaskTitle(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter a new task"
              data-testid="task-input"
            />
          </label>

          <button
            type="button"
            className="task-manager-add-button"
            onClick={handleAddTask}
          >
            Add Task
          </button>
        </div>

        <div className="task-manager-summary-grid">
          <div className="task-manager-summary-card">
            <span>Total tasks</span>
            <strong data-testid="total-count">{tasks.length}</strong>
          </div>
          <div className="task-manager-summary-card">
            <span>Completed</span>
            <strong data-testid="completed-count">{completedCount}</strong>
          </div>
          <div className="task-manager-summary-card">
            <span>Pending</span>
            <strong data-testid="pending-count">{pendingCount}</strong>
          </div>
        </div>

        {tasks.length === 0 ? (
          <div className="task-manager-empty-state" data-testid="empty-state">
            No tasks added yet. Add your first task to begin tracking progress.
          </div>
        ) : (
          <div className="task-manager-list" data-testid="task-list">
            {tasks.map((task) => (
              <article key={task.id} className="task-manager-item" data-testid="task-item">
                <div className="task-manager-item-copy">
                  <h3 data-testid={\`task-title-\${task.id}\`}>{task.title}</h3>
                  <p data-testid={\`task-status-\${task.id}\`}>
                    {task.completed ? 'Completed' : 'Pending'}
                  </p>
                </div>

                <button
                  type="button"
                  className="task-manager-toggle-button"
                  onClick={() => toggleTaskCompletion(task.id)}
                  data-testid={\`toggle-button-\${task.id}\`}
                  aria-label={\`Toggle completion for \${task.title}\`}
                >
                  {task.completed ? 'Mark as pending' : 'Mark as completed'}
                </button>
              </article>
            ))}
          </div>
        )}

        <div className="task-manager-tipbox">
          <h3>What this exercise teaches</h3>
          <ul>
            <li>Each task is an object with <code>id</code>, <code>title</code>, and <code>completed</code>.</li>
            <li>Adding a task creates a new array instead of mutating the old one.</li>
            <li>Toggling a task uses <code>.map()</code> to replace only the matching object.</li>
            <li>Blank input is ignored so accidental empty tasks do not enter state.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}`

const testSyntax = `import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'
import TaskManager from './TaskManager'

afterEach(() => {
  cleanup()
})

describe('TaskManager standalone exercise', () => {
  test('normal: renders an empty state before any tasks are added', () => {
    render(<TaskManager />)

    expect(screen.getByTestId('empty-state')).toBeInTheDocument()
    expect(screen.getByTestId('total-count')).toHaveTextContent('0')
    expect(screen.getByTestId('completed-count')).toHaveTextContent('0')
    expect(screen.getByTestId('pending-count')).toHaveTextContent('0')
  })

  test('normal: adds a new task from the input field', () => {
    render(<TaskManager />)

    fireEvent.change(screen.getByTestId('task-input'), { target: { value: 'Prepare project reflection' } })
    fireEvent.click(screen.getByRole('button', { name: /add task/i }))

    expect(screen.queryByTestId('empty-state')).not.toBeInTheDocument()
    expect(screen.getByText('Prepare project reflection')).toBeInTheDocument()
    expect(screen.getAllByText('Pending').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByTestId('total-count')).toHaveTextContent('1')
    expect(screen.getByTestId('completed-count')).toHaveTextContent('0')
    expect(screen.getByTestId('pending-count')).toHaveTextContent('1')
  })

  test('normal: toggles a task from pending to completed', () => {
    render(<TaskManager />)

    fireEvent.change(screen.getByTestId('task-input'), { target: { value: 'Review object spread syntax' } })
    fireEvent.click(screen.getByRole('button', { name: /add task/i }))
    fireEvent.click(screen.getByRole('button', { name: /toggle completion for review object spread syntax/i }))

    expect(screen.getByText('Completed')).toBeInTheDocument()
    expect(screen.getByTestId('completed-count')).toHaveTextContent('1')
    expect(screen.getByTestId('pending-count')).toHaveTextContent('0')
  })

  test('edge: ignores blank or whitespace-only task titles', () => {
    render(<TaskManager />)

    fireEvent.change(screen.getByTestId('task-input'), { target: { value: '   ' } })
    fireEvent.click(screen.getByRole('button', { name: /add task/i }))

    expect(screen.getByTestId('empty-state')).toBeInTheDocument()
    expect(screen.getByTestId('total-count')).toHaveTextContent('0')
  })

  test('edge: toggling one task does not change the status of other tasks', () => {
    render(<TaskManager />)

    fireEvent.change(screen.getByTestId('task-input'), { target: { value: 'Draft state notes' } })
    fireEvent.click(screen.getByRole('button', { name: /add task/i }))
    fireEvent.change(screen.getByTestId('task-input'), { target: { value: 'Record recap video' } })
    fireEvent.click(screen.getByRole('button', { name: /add task/i }))

    fireEvent.click(screen.getByRole('button', { name: /toggle completion for draft state notes/i }))

    expect(screen.getByText('Draft state notes')).toBeInTheDocument()
    expect(screen.getByText('Record recap video')).toBeInTheDocument()
    expect(screen.getByTestId('completed-count')).toHaveTextContent('1')
    expect(screen.getByTestId('pending-count')).toHaveTextContent('1')
    expect(screen.getAllByText('Completed').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Pending').length).toBeGreaterThanOrEqual(2)
  })

  test('edge: repeated toggles switch a task back and forth predictably', () => {
    render(<TaskManager />)

    fireEvent.change(screen.getByTestId('task-input'), { target: { value: 'Verify test cases' } })
    fireEvent.click(screen.getByRole('button', { name: /add task/i }))

    const toggleButton = screen.getByRole('button', { name: /toggle completion for verify test cases/i })

    fireEvent.click(toggleButton)
    expect(screen.getAllByText('Completed').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByTestId('completed-count')).toHaveTextContent('1')

    fireEvent.click(toggleButton)
    expect(screen.getAllByText('Pending').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByTestId('completed-count')).toHaveTextContent('0')
    expect(screen.getByTestId('pending-count')).toHaveTextContent('1')
  })
})`

export default function Week02TaskManagerAssignmentGuide() {
  return (
    <div className="assignment-guide-shell">
      <div className="assignment-hero">
        <p className="assignment-kicker">Week 2 Assignment</p>
        <h1>TaskManager with React State</h1>
        <p className="assignment-summary">
          Build a small task dashboard that practices two essential immutable update skills:
          adding new task objects to an array and toggling a specific task object without
          mutating the rest of the state. This assignment extends the Week 2 object-state
          lesson into a practical task-management interface.
        </p>
      </div>

      <section className="assignment-section">
        <h2>Overview</h2>
        <p>
          In this assignment, the learner builds a simple TaskManager component with React
          state. Each task is represented as an object containing an <code>id</code>, a
          <code>title</code>, and a <code>completed</code> flag. The interface lets the user
          add new tasks and then toggle each task between pending and completed states.
        </p>
        <p>
          Although the UI is small, the state logic models a very common real-world React
          pattern: managing arrays of objects and updating them immutably. That makes this
          assignment a strong bridge from lecture concepts to larger dashboards, planners,
          and CRUD-style interfaces.
        </p>
      </section>

      <section className="assignment-section">
        <h2>Learning Objectives</h2>
        <ul>
          <li>Create array-based state with task objects stored inside it.</li>
          <li>Add new task objects immutably using the functional state setter pattern.</li>
          <li>Toggle one task at a time with <code>.map()</code> and object spread syntax.</li>
          <li>Render task status clearly so state changes are visible after each interaction.</li>
          <li>Test both normal cases and edge cases with Vitest.</li>
          <li>Understand why array/object mutation should be avoided in React state.</li>
        </ul>
      </section>

      <section className="assignment-section">
        <h2>Build Strategy</h2>

        <h3>Step 1: Create the standalone exercise component</h3>
        <p>
          Create <code>src/exercises/TaskManager.jsx</code>. Keep it standalone-capable so
          it can still represent the original assignment exercise, while also fitting inside
          the course portfolio shell as a previewable component.
        </p>

        <h3>Step 2: Initialize task state</h3>
        <p>
          Start with <code>const [tasks, setTasks] = useState([])</code>. Each task will
          later be stored as an object with <code>id</code>, <code>title</code>, and
          <code>completed</code> fields.
        </p>

        <h3>Step 3: Add a controlled input for task titles</h3>
        <p>
          The original assignment allows a predefined task, but in this course app it is
          more educational to let the learner type a title. Controlled input makes the add
          flow clearer and easier to verify in tests.
        </p>

        <h3>Step 4: Write <code>addTask</code> carefully</h3>
        <p>
          Trim the input first, ignore blank values, then create a new task object with a
          unique id and <code>completed: false</code>. Append that object by returning a new
          array from the setter rather than mutating the previous state.
        </p>

        <h3>Step 5: Write <code>toggleTaskCompletion</code> with <code>.map()</code></h3>
        <p>
          Iterate over the tasks array with <code>.map()</code>. For the matching task id,
          return a new object with the same properties but the opposite completion value.
          For every other task, return the existing task unchanged.
        </p>

        <h3>Step 6: Render useful status feedback</h3>
        <p>
          Show the total number of tasks, how many are completed, and how many are still
          pending. This reinforces the relationship between the state array and the UI.
        </p>
      </section>

      <section className="assignment-section">
        <h2>Conceptual Explanation</h2>
        <p>
          React state should be treated as immutable. That means you should not push a new
          item directly into the existing <code>tasks</code> array, and you should not flip
          <code>task.completed</code> by mutating the original task object. Instead, create
          a new array and a new object for the task you are changing.
        </p>
        <p>
          This assignment is especially useful because it combines two patterns that appear
          constantly in React apps: appending objects to a list and updating a single object
          inside that list without breaking the others.
        </p>
      </section>

      <section className="assignment-section">
        <h2>Data Structure and State Logic</h2>
        <p>
          The data model is intentionally simple:
        </p>
        <ul>
          <li><code>tasks</code> is an array.</li>
          <li>Each entry in the array is an object.</li>
          <li>Each object contains <code>id</code>, <code>title</code>, and <code>completed</code>.</li>
        </ul>
        <p>
          This structure teaches learners how arrays and objects work together in React
          state. It also lays groundwork for later topics like task filters, editing, bulk
          actions, and persistence.
        </p>
      </section>

      <section className="assignment-section">
        <h2>Event Handler Explanation</h2>
        <p>
          The <code>handleAddTask</code> path reads the input, validates it, creates a task,
          and updates state. The <code>toggleTaskCompletion</code> path receives a task id and
          transforms only the matching item. These handlers are small, but they represent a
          scalable React pattern: event-driven UI updates powered by immutable data changes.
        </p>
      </section>

      <section className="assignment-section">
        <h2>Edge Cases to Think About</h2>
        <ul>
          <li>What should happen if the user clicks Add Task on a blank input?</li>
          <li>What should happen if there are no tasks yet?</li>
          <li>What should happen if one task is toggled while others remain untouched?</li>
          <li>What should happen if the same task is toggled multiple times?</li>
        </ul>
        <p>
          The provided implementation and Vitest suite cover each of those situations so the
          learner can see both the happy path and the boundary behavior.
        </p>
      </section>

      <section className="assignment-section">
        <h2>Working Exercise Preview</h2>
        <p>
          The preview below is the same standalone exercise component that the tests target.
          Keeping the exercise separate from the guide makes the assignment architecture more
          transparent and consistent with the rest of the course platform.
        </p>
        <TaskManager />
      </section>

      <section className="assignment-section">
        <h2>Full Exercise Syntax</h2>
        <p>
          Use this as a complete reference implementation for the standalone TaskManager
          exercise component.
        </p>
        <CodeBlock
          code={annotateDisplayedCode(taskManagerSyntax, 'react')}
          language="jsx"
          label="Component"
        />
      </section>

      <section className="assignment-section">
        <h2>Official Test Syntax</h2>
        <p>
          The tests below demonstrate three normal-flow checks and three edge-case checks,
          matching the assignment requirement for balanced verification coverage.
        </p>
        <CodeBlock
          code={annotateDisplayedCode(testSyntax, 'test')}
          language="test"
          label="Vitest"
        />
      </section>

      <section className="assignment-section">
        <h2>How to Run the Tests</h2>
        <ol>
          <li>Open the project in the terminal.</li>
          <li>Run <code>npm install</code> if dependencies are not installed yet.</li>
          <li>Run <code>npm run test</code> to execute the full Vitest suite.</li>
          <li>Run <code>npm run test -- TaskManager</code> if you want to focus on this exercise.</li>
        </ol>
      </section>

      <section className="assignment-section">
        <h2>Manual Verification Checklist</h2>
        <ul>
          <li>Add a task and confirm it appears immediately in the list.</li>
          <li>Confirm a new task starts in the pending state.</li>
          <li>Toggle that task and confirm the status changes to completed.</li>
          <li>Add a second task and confirm toggling one does not toggle the other.</li>
          <li>Try entering only spaces and confirm no empty task is added.</li>
          <li>Confirm the summary counts stay aligned with what is displayed.</li>
        </ul>
      </section>

      <section className="assignment-section">
        <h2>Common Mistakes</h2>
        <ul>
          <li>Using <code>tasks.push(...)</code> instead of returning a new array.</li>
          <li>Mutating <code>task.completed</code> directly instead of creating a new object.</li>
          <li>Forgetting to trim the input before creating a task.</li>
          <li>Using the non-functional setter form in places where previous state matters.</li>
          <li>Failing to give each rendered task a stable <code>key</code>.</li>
        </ul>
      </section>

      <section className="assignment-section">
        <h2>Student Takeaways</h2>
        <p>
          After this assignment, learners should be more confident with arrays of objects in
          React state. They should understand how to add new records immutably, how to update
          one matching record with <code>.map()</code>, and how to verify those behaviors
          through both visible UI checks and official automated tests.
        </p>
      </section>

      <TaskManagerTestPanel />
    </div>
  )
}
