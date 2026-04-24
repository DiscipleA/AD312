import { useState } from 'react'

export default function StateQueueingExample() {
  const [score, setScore] = useState(0)

  function addThreePoints() {
    setScore((currentScore) => currentScore + 1)
    setScore((currentScore) => currentScore + 1)
    setScore((currentScore) => currentScore + 1)
  }

  return (
    <div className="lesson-example">
      <h3>Queued State Updates</h3>
      <p>Score: {score}</p>
      <button onClick={addThreePoints}>Add 3 points</button>
    </div>
  )
}
