import { useState } from 'react'

export default function TaskManagerMirrorExample() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Read the prompt', completed: false },
  ])

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  return (
    <div className="lesson-example">
      <h3>TaskManager</h3>
      {tasks.map((task) => (
        <div key={task.id}>
          <span>{task.title}</span>
          <button onClick={() => toggleTask(task.id)}>
            {task.completed ? 'Mark pending' : 'Mark completed'}
          </button>
        </div>
      ))}
    </div>
  )
}
