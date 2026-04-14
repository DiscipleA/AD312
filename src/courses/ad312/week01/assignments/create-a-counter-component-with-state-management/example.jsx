import { useState } from 'react'

export default function CounterAssignmentExample() {
  const [count, setCount] = useState(0)

  return (
    <div className="lesson-example">
      <h3>Counter Assignment</h3>
      <p>Current Count: {count}</p>
      <div className="button-row">
        <button onClick={() => setCount(count - 1)}>-1</button>
        <button onClick={() => setCount(0)}>Reset</button>
        <button onClick={() => setCount(count + 1)}>+1</button>
      </div>
    </div>
  )
}
