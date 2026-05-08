import { useState } from 'react'

export default function ReactRouterModePreview() {
  const [mode, setMode] = useState('Declarative')

  const descriptions = {
    Declarative: 'Basic URL matching and component navigation.',
    Data: 'Route-level loaders, actions, and data-aware navigation.',
    Framework: 'Route modules, build integration, and the full React Router v7 experience.',
  }

  return (
    <section>
      <button onClick={() => setMode('Declarative')}>Declarative</button>
      <button onClick={() => setMode('Data')}>Data</button>
      <button onClick={() => setMode('Framework')}>Framework</button>
      <h2>{mode}</h2>
      <p>{descriptions[mode]}</p>
    </section>
  )
}
