import { useState } from 'react'

function FeedbackForm() {
  const [text, setText] = useState('')

  function handleSubmit() {
    setTimeout(() => {
      alert(`You submitted: ${text}`)
    }, 3000)
  }

  return (
    <div className="lesson-example">
      <h3>State Snapshot</h3>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
      <button onClick={handleSubmit}>Submit (3s delay)</button>
    </div>
  )
}

function ScoreTracker() {
  const [score, setScore] = useState(0)

  function tripleKill() {
    setScore((prev) => prev + 1)
    setScore((prev) => prev + 1)
    setScore((prev) => prev + 1)
  }

  return (
    <div className="lesson-example">
      <h3>Functional Updater</h3>
      <p>Score: {score}</p>
      <button onClick={tripleKill}>Triple Kill (+3)</button>
    </div>
  )
}

export default function ReactStateSnapshotExample() {
  return (
    <div className="stack">
      <FeedbackForm />
      <ScoreTracker />
    </div>
  )
}
