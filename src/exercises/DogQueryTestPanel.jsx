import { useMemo, useState } from 'react'
import '../styles/assignment-test-panel.css'
import '../styles/week04-dog-api-tanstack-query-assignment.css'

const demoBreeds = [
  {
    id: 'golden-retriever',
    name: 'Golden Retriever',
    description: 'A friendly sporting dog known for patience and confidence.',
    life: '10–12 years',
  },
  {
    id: 'corgi',
    name: 'Corgi',
    description: 'A compact herding dog with a bold personality.',
    life: '12–15 years',
  },
]

const demoFacts = [
  'Dogs have a powerful sense of smell.',
  'Puppies are born with closed eyes.',
]

const demoGroups = ['Sporting Group', 'Herding Group']

export default function DogQueryTestPanel() {
  const [selectedBreedId, setSelectedBreedId] = useState('')
  const [breedsRequest, setBreedsRequest] = useState('success')
  const [detailRequest, setDetailRequest] = useState('idle')
  const [lastAction, setLastAction] = useState('Initial query state')

  const selectedBreed = demoBreeds.find((breed) => breed.id === selectedBreedId) ?? null

  function handleReset() {
    setSelectedBreedId('')
    setBreedsRequest('success')
    setDetailRequest('idle')
    setLastAction('Reset to initial query state')
  }

  function handleSelectGolden() {
    setSelectedBreedId('golden-retriever')
    setBreedsRequest('success')
    setDetailRequest('success')
    setLastAction('Selected Golden Retriever')
  }

  function handleBreedsError() {
    setSelectedBreedId('')
    setBreedsRequest('error')
    setDetailRequest('idle')
    setLastAction('Simulated breeds error')
  }

  function handleEmptyBreeds() {
    setSelectedBreedId('')
    setBreedsRequest('empty')
    setDetailRequest('idle')
    setLastAction('Simulated empty breeds response')
  }

  function handleDetailError() {
    setSelectedBreedId('corgi')
    setBreedsRequest('success')
    setDetailRequest('error')
    setLastAction('Simulated detail error')
  }

  const testResults = useMemo(() => {
    return [
      {
        label: 'Breeds load into a dropdown',
        passed: breedsRequest === 'success' && demoBreeds.length > 0,
        detail: 'The breed list is presented as a select box, not a screen full of breed cards.',
      },
      {
        label: 'Selecting a breed shows one detail panel',
        passed: detailRequest === 'success' && Boolean(selectedBreed),
        detail: selectedBreed ? `${selectedBreed.name} is shown in the focused detail area.` : 'Choose a demo breed to pass this check.',
      },
      {
        label: 'Facts and groups are modeled as separate queries',
        passed: demoFacts.length >= 1 && demoGroups.length >= 1,
        detail: 'The assignment includes /facts and /groups as independent server-state requests.',
      },
      {
        label: 'Breed error state is visible',
        passed: breedsRequest === 'error',
        detail: breedsRequest === 'error' ? 'The user receives a clear error message.' : 'Use the error control to simulate a failed request.',
      },
      {
        label: 'Empty successful response is handled',
        passed: breedsRequest === 'empty',
        detail: breedsRequest === 'empty' ? 'The dropdown is disabled when no breeds are available.' : 'Use the empty-response control to test this edge case.',
      },
      {
        label: 'Detail query error is isolated',
        passed: detailRequest === 'error' && selectedBreedId === 'corgi',
        detail: detailRequest === 'error' ? 'The detail panel can fail without pretending the breed list failed.' : 'Use the detail-error control to test this edge case.',
      },
    ]
  }, [breedsRequest, detailRequest, selectedBreed, selectedBreedId])

  const passCount = testResults.filter((test) => test.passed).length

  return (
    <section className="assignment-test-panel dog-query-live-panel">
      <div className="assignment-test-header">
        <div>
          <p className="assignment-test-kicker">Live Assignment Checks</p>
          <h2>On-Screen Test Runner</h2>
          <p className="assignment-test-summary">
            This learning panel mirrors the Week 4 Dog API assignment expectations. It is a visual guide for students,
            while the official Vitest file remains the automated verification layer.
          </p>
        </div>

        <div className="assignment-test-score">
          <span>{passCount} / {testResults.length}</span>
          <small>Checks currently passing</small>
        </div>
      </div>

      <div className="assignment-test-controls">
        <button type="button" onClick={handleReset}>Reset</button>
        <button type="button" onClick={handleSelectGolden}>Select Breed</button>
        <button type="button" onClick={handleBreedsError}>Breed Error</button>
        <button type="button" onClick={handleEmptyBreeds}>Empty Breeds</button>
        <button type="button" onClick={handleDetailError}>Detail Error</button>
      </div>

      <div className="assignment-test-statebox">
        <p><strong>Last Action:</strong> {lastAction}</p>
        <p><strong>Breeds Query:</strong> {breedsRequest}</p>
        <p><strong>Selected Breed:</strong> {selectedBreed?.name ?? 'None selected'}</p>
        <p><strong>Detail Query:</strong> {detailRequest}</p>
      </div>

      <div className="assignment-test-grid">
        {testResults.map((test) => (
          <article
            key={test.label}
            className={test.passed ? 'assignment-test-card passed' : 'assignment-test-card pending'}
          >
            <div className="assignment-test-badge">
              {test.passed ? 'PASS' : 'WAIT'}
            </div>
            <h3>{test.label}</h3>
            <p>{test.detail}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
