import { useState } from 'react'

export default function NavigationPreview() {
  const [route, setRoute] = useState('/dashboard')

  return (
    <section>
      <button onClick={() => setRoute('/dashboard')}>Dashboard</button>
      <button onClick={() => setRoute('/reports')}>Reports</button>
      <p>Current route: {route}</p>
    </section>
  )
}
