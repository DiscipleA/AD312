import { useState } from 'react'

export default function IntroductionToReactStateExample() {
  const [count, setCount] = useState(0)

  return (
    <div className="lesson-example">
      <h3>Intro to State</h3>
      <p>Count: {count}</p>
      <div className="button-row">
        <button onClick={() => setCount(count - 1)}>-1</button>
        <button onClick={() => setCount(count + 1)}>+1</button>
      </div>
    </div>
  )
}
