import { useState } from 'react'

export default function RoutePatternPreview() {
  const [itemId, setItemId] = useState('camera-99')

  return (
    <section>
      <label>
        Item ID
        <input value={itemId} onChange={(event) => setItemId(event.target.value)} />
      </label>
      <p>Route pattern: /inventory/:itemId</p>
      <p>Current URL: /inventory/{itemId || ':itemId'}</p>
    </section>
  )
}
