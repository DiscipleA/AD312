import { useState } from 'react'

class ListNode {
  constructor(value, next = null) {
    this.value = value
    this.next = next
  }
}

export default function LinkedListPreview() {
  const [head, setHead] = useState(() => new ListNode('Head'))

  function addNode() {
    setHead((currentHead) => ({
      ...currentHead,
      next: new ListNode('Next'),
    }))
  }

  return (
    <section>
      <button onClick={addNode}>Add node</button>
      <p>Head value: {head.value}</p>
      <p>Next value: {head.next ? head.next.value : 'None yet'}</p>
    </section>
  )
}
