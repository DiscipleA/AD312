import { useMemo, useState } from 'react'
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
                  <h3 data-testid={`task-title-${task.id}`}>{task.title}</h3>
                  <p data-testid={`task-status-${task.id}`}>
                    {task.completed ? 'Completed' : 'Pending'}
                  </p>
                </div>

                <button
                  type="button"
                  className="task-manager-toggle-button"
                  onClick={() => toggleTaskCompletion(task.id)}
                  data-testid={`toggle-button-${task.id}`}
                  aria-label={`Toggle completion for ${task.title}`}
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
}
