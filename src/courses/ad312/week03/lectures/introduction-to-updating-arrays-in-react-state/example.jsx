import { useState } from 'react'

export default function UpdatingArraysMirrorExample() {
  const [tags, setTags] = useState(['React', 'Frontend'])

  function addTag() {
    setTags((currentTags) => [...currentTags, `Topic-${currentTags.length + 1}`])
  }

  function removeLastTag() {
    setTags((currentTags) => currentTags.slice(0, -1))
  }

  return (
    <div className="lesson-example">
      <h3>Updating Arrays in State</h3>
      <p>{tags.join(', ')}</p>
      <div className="button-row">
        <button onClick={addTag}>Add tag</button>
        <button onClick={removeLastTag} disabled={tags.length === 0}>
          Remove last tag
        </button>
      </div>
    </div>
  )
}
