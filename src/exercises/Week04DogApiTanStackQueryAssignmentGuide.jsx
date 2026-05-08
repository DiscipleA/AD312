import DogQueryExplorer from '../assignments/week04/dog-api-tanstack-query/DogQueryExplorer'
import DogQueryTestPanel from './DogQueryTestPanel'
import '../styles/week04-dog-api-tanstack-query-assignment.css'
import CodeBlock from '../components/CodeBlock'
import { annotateDisplayedCode } from '../utils/educationalCode'

const exerciseSyntax = `import { useMemo, useState } from 'react'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import '../styles/week04-dog-api-tanstack-query-assignment.css'

const DOG_API_BASE_URL = 'https://dogapi.dog/api/v2'

export async function fetchJson(endpoint) {
  const response = await fetch(\`\${DOG_API_BASE_URL}\${endpoint}\`)

  if (!response.ok) {
    throw new Error(\`Dog API request failed with status \${response.status}\`)
  }

  return response.json()
}

export function normalizeBreeds(payload) {
  return payload?.data ?? []
}

export function normalizeFacts(payload) {
  return payload?.data ?? []
}

export function normalizeGroups(payload) {
  return payload?.data ?? []
}

export async function fetchBreeds() {
  const payload = await fetchJson('/breeds')
  return normalizeBreeds(payload)
}

export async function fetchBreedDetails({ queryKey }) {
  const [, breedId] = queryKey

  if (!breedId) {
    throw new Error('A breed id is required before breed details can be loaded.')
  }

  const payload = await fetchJson(\`/breeds/\${breedId}\`)
  return payload?.data ?? null
}

export async function fetchDogFacts() {
  const payload = await fetchJson('/facts')
  return normalizeFacts(payload)
}

export async function fetchDogGroups() {
  const payload = await fetchJson('/groups')
  return normalizeGroups(payload)
}

function StatusCallout({ title, children, tone = 'info' }) {
  return (
    <div className={\`dog-query-status dog-query-status-\${tone}\`} role={tone === 'error' ? 'alert' : 'status'}>
      <strong>{title}</strong>
      <span>{children}</span>
    </div>
  )
}

function getBreedName(breed) {
  return breed?.attributes?.name ?? 'Unnamed breed'
}

function getBreedDescription(breed) {
  return breed?.attributes?.description ?? 'No description is available for this breed yet.'
}

function DogQueryExplorerApp() {
  const [selectedBreedId, setSelectedBreedId] = useState('')

  const breedsQuery = useQuery({
    queryKey: ['dog-breeds'],
    queryFn: fetchBreeds,
  })

  const factsQuery = useQuery({
    queryKey: ['dog-facts'],
    queryFn: fetchDogFacts,
  })

  const groupsQuery = useQuery({
    queryKey: ['dog-groups'],
    queryFn: fetchDogGroups,
  })

  const breedDetailsQuery = useQuery({
    queryKey: ['dog-breed-detail', selectedBreedId],
    queryFn: fetchBreedDetails,
    enabled: Boolean(selectedBreedId),
  })

  const breeds = breedsQuery.data ?? []
  const facts = factsQuery.data ?? []
  const groups = groupsQuery.data ?? []

  const selectedBreedFromList = useMemo(() => {
    return breeds.find((breed) => breed.id === selectedBreedId) ?? null
  }, [breeds, selectedBreedId])

  const displayedBreed = breedDetailsQuery.data ?? selectedBreedFromList

  return (
    <section className="dog-query-shell">
      <div className="dog-query-card">
        <p className="dog-query-kicker">Week 4 Assignment Exercise</p>
        <h2>Dog API Explorer with TanStack Query</h2>
        <p className="dog-query-description">
          Practice server-state management by loading dog breeds, selecting one breed from a dropdown,
          and letting TanStack Query manage loading, error, success, caching, and dependent detail requests.
        </p>

        <div className="dog-query-layout">
          <div className="dog-query-panel dog-query-control-panel">
            <h3>Choose a Breed</h3>
            <p>
              The dropdown is powered by the <code>/breeds</code> endpoint. The detail panel only requests
              <code>/breeds/&lbrace;id&rbrace;</code> after you choose a breed.
            </p>

            {breedsQuery.isPending ? (
              <StatusCallout title="Loading breeds">TanStack Query is waiting for the Dog API response.</StatusCallout>
            ) : null}

            {breedsQuery.isError ? (
              <StatusCallout title="Breed request failed" tone="error">
                {breedsQuery.error.message}
              </StatusCallout>
            ) : null}

            {breedsQuery.isSuccess && breeds.length === 0 ? (
              <StatusCallout title="No breeds returned" tone="warning">
                The request succeeded, but the API response did not include any breed records.
              </StatusCallout>
            ) : null}

            <label className="dog-query-select-label" htmlFor="dog-breed-select">
              Dog breed
            </label>
            <select
              id="dog-breed-select"
              value={selectedBreedId}
              onChange={(event) => setSelectedBreedId(event.target.value)}
              disabled={!breedsQuery.isSuccess || breeds.length === 0}
              data-testid="breed-select"
            >
              <option value="">Select a dog breed</option>
              {breeds.map((breed) => (
                <option key={breed.id} value={breed.id}>
                  {getBreedName(breed)}
                </option>
              ))}
            </select>
          </div>

          <div className="dog-query-panel dog-query-detail-panel" data-testid="breed-detail-panel">
            <h3>Selected Breed Detail</h3>

            {!selectedBreedId ? (
              <StatusCallout title="Waiting for selection">
                Choose a breed from the dropdown to run the dependent detail query.
              </StatusCallout>
            ) : null}

            {breedDetailsQuery.isPending && selectedBreedId ? (
              <StatusCallout title="Loading breed detail">
                TanStack Query is fetching the selected breed by id.
              </StatusCallout>
            ) : null}

            {breedDetailsQuery.isError ? (
              <StatusCallout title="Breed detail request failed" tone="error">
                {breedDetailsQuery.error.message}
              </StatusCallout>
            ) : null}

            {displayedBreed ? (
              <article className="dog-query-breed-summary">
                <p className="dog-query-pill">{displayedBreed.type ?? 'breed'}</p>
                <h4>{getBreedName(displayedBreed)}</h4>
                <p>{getBreedDescription(displayedBreed)}</p>
              </article>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

const dogQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 60,
    },
  },
})

export default function DogQueryExplorer() {
  return (
    <QueryClientProvider client={dogQueryClient}>
      <DogQueryExplorerApp />
    </QueryClientProvider>
  )
}`

const testSyntax = `import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import DogQueryExplorer, { normalizeBreeds, normalizeFacts, normalizeGroups } from './DogQueryExplorer'

const breedsPayload = {
  data: [
    {
      id: 'golden-retriever',
      type: 'breed',
      attributes: {
        name: 'Golden Retriever',
        description: 'A friendly sporting dog known for patience and confidence.',
        life: { min: 10, max: 12 },
        male_weight: { min: 29, max: 34 },
        female_weight: { min: 25, max: 29 },
      },
    },
    {
      id: 'corgi',
      type: 'breed',
      attributes: {
        name: 'Corgi',
        description: 'A compact herding dog with a bold personality.',
        life: { min: 12, max: 15 },
        male_weight: { min: 10, max: 14 },
        female_weight: { min: 10, max: 13 },
      },
    },
  ],
}

function jsonResponse(payload, ok = true, status = 200) {
  return Promise.resolve({
    ok,
    status,
    json: () => Promise.resolve(payload),
  })
}

beforeEach(() => {
  global.fetch = vi.fn((url) => {
    if (String(url).endsWith('/breeds/golden-retriever')) {
      return jsonResponse({ data: breedsPayload.data[0] })
    }

    if (String(url).endsWith('/breeds')) {
      return jsonResponse(breedsPayload)
    }

    if (String(url).endsWith('/facts')) {
      return jsonResponse({ data: [{ id: 'fact-1', attributes: { body: 'Dogs have a powerful sense of smell.' } }] })
    }

    if (String(url).endsWith('/groups')) {
      return jsonResponse({ data: [{ id: 'sporting', attributes: { name: 'Sporting Group' } }] })
    }

    return jsonResponse({ data: [] })
  })
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('DogQueryExplorer standalone exercise', () => {
  test('normal: loads breeds into a dropdown instead of rendering every breed as cards', async () => {
    render(<DogQueryExplorer />)

    const select = await screen.findByTestId('breed-select')

    await waitFor(() => {
      expect(select).toHaveTextContent('Golden Retriever')
      expect(select).toHaveTextContent('Corgi')
    })
  })

  test('normal: selecting a breed loads the dependent breed detail query', async () => {
    render(<DogQueryExplorer />)

    const select = await screen.findByTestId('breed-select')
    await waitFor(() => expect(select).not.toBeDisabled())

    fireEvent.change(select, { target: { value: 'golden-retriever' } })

    await waitFor(() => expect(screen.getByTestId('breed-detail-panel')).toHaveTextContent('Golden Retriever'))
    expect(screen.getByTestId('breed-detail-panel')).toHaveTextContent(/friendly sporting dog/i)
  })

  test('normal: displays dog facts and dog groups from separate endpoints', async () => {
    render(<DogQueryExplorer />)

    expect(await screen.findByText(/powerful sense of smell/i)).toBeInTheDocument()
    expect(await screen.findByText('Sporting Group')).toBeInTheDocument()
  })

  test('edge: normalizers return an empty array when the API payload has no data field', () => {
    expect(normalizeBreeds({})).toEqual([])
    expect(normalizeFacts(null)).toEqual([])
    expect(normalizeGroups(undefined)).toEqual([])
  })

  test('edge: shows an error message when the breeds request fails', async () => {
    global.fetch = vi.fn((url) => {
      if (String(url).endsWith('/breeds')) {
        return jsonResponse({ errors: [] }, false, 500)
      }

      return jsonResponse({ data: [] })
    })

    render(<DogQueryExplorer />)

    expect(await screen.findByRole('alert')).toHaveTextContent('Dog API request failed with status 500')
  })

  test('edge: keeps the dropdown disabled when the successful breed response is empty', async () => {
    global.fetch = vi.fn((url) => {
      if (String(url).endsWith('/breeds')) {
        return jsonResponse({ data: [] })
      }

      return jsonResponse({ data: [] })
    })

    render(<DogQueryExplorer />)

    const select = await screen.findByTestId('breed-select')

    await waitFor(() => expect(select).toBeDisabled())
    expect(screen.getByText(/No breeds returned/i)).toBeInTheDocument()
  })
})`

export default function Week04DogApiTanStackQueryAssignmentGuide() {
  return (
    <div className="assignment-guide-shell dog-query-assignment-guide">
      <div className="assignment-hero">
        <p className="assignment-kicker">Week 4 Assignment</p>
        <h1>Dog API Explorer with TanStack Query</h1>
        <p className="assignment-summary">
          Build a standalone React exercise that retrieves dog breeds, facts, and groups from the Dog API,
          manages asynchronous request states with TanStack Query, and displays one selected breed through
          a focused dropdown-driven interface.
        </p>
      </div>

      <section className="assignment-section">
        <h2>Overview</h2>
        <p>
          This assignment moves from local React state into server state. The data does not live inside your
          component permanently; it comes from an API, can take time to arrive, can fail, and can be cached
          for reuse. TanStack Query gives you a structured way to represent those states without manually
          writing separate loading flags, error flags, and repeated fetch effects.
        </p>
        <p>
          The user interface should stay focused. Instead of rendering every dog breed as a large card grid,
          this implementation loads the breed list into a dropdown. Once a dog is selected, the app performs
          a dependent detail query and displays only that selected breed on screen.
        </p>
      </section>

      <section className="assignment-section">
        <h2>Learning Objectives</h2>
        <ul>
          <li>Install and use <code>@tanstack/react-query</code> inside a Vite React project.</li>
          <li>Wrap the app with <code>QueryClientProvider</code> so query hooks can access a shared query client.</li>
          <li>Use <code>useQuery</code> to request dog breeds, facts, groups, and selected breed details.</li>
          <li>Handle <code>isPending</code>, <code>isError</code>, and successful data states in the rendered UI.</li>
          <li>Use a dropdown to keep the breed selection interface readable and focused.</li>
          <li>Write tests for normal request flows and edge cases such as failures and empty responses.</li>
        </ul>
      </section>

      <section className="assignment-section">
        <h2>Step-by-Step Build Instructions</h2>

        <h3>Step 1: Install TanStack Query</h3>
        <p>
          In a standalone Vite version of this exercise, install the query library before using the hooks:
        </p>
        <CodeBlock code="npm install @tanstack/react-query" language="bash" label="Terminal" />

        <h3>Step 2: Create the standalone exercise file</h3>
        <p>
          Create <code>src/exercises/DogQueryExplorer.jsx</code>. The component defines small fetch helpers,
          creates query functions for each endpoint, and keeps the selected breed id in local state because
          the dropdown choice is client-side UI state.
        </p>

        <h3>Step 3: Use one query per server-state concern</h3>
        <p>
          The breed list, facts, groups, and selected breed detail each use a separate query key. This keeps
          TanStack Query&apos;s cache identities clear and prevents one request from overwriting another request&apos;s data.
        </p>

        <h3>Step 4: Use a dependent detail query</h3>
        <p>
          The breed detail query uses <code>enabled: Boolean(selectedBreedId)</code>. That tells TanStack Query
          not to request <code>/breeds/&lbrace;id&rbrace;</code> until the user has actually selected a breed.
        </p>

        <h3>Step 5: Test both happy paths and edge cases</h3>
        <p>
          Your official Vitest file should prove that the dropdown loads, a selected breed appears, facts and groups
          render, empty API payloads are safe, request failures are visible, and empty successful breed lists disable
          the dropdown.
        </p>
      </section>

      <section className="assignment-section">
        <h2>Working Exercise Preview</h2>
        <DogQueryExplorer />
      </section>

      <section className="assignment-section">
        <h2>Live Test Results</h2>
        <p>
          This in-app panel is a visual teaching companion. It does not replace the official test file, but it helps
          students see the same normal and edge-case expectations represented on screen.
        </p>
        <DogQueryTestPanel />
      </section>

      <section className="assignment-section">
        <h2>Full Exercise Syntax</h2>
        <p>
          The displayed version keeps the complete component structure visible and adds instructional comments so
          students can understand why each query key, query function, and rendered state exists.
        </p>
        <CodeBlock code={annotateDisplayedCode(exerciseSyntax)} language="jsx" label="src/exercises/DogQueryExplorer.jsx" />
      </section>

      <section className="assignment-section">
        <h2>Full Test Syntax</h2>
        <p>
          These tests mock the Dog API so the suite verifies the React behavior without depending on the live network.
          There are three normal tests and three edge-case tests.
        </p>
        <CodeBlock code={annotateDisplayedCode(testSyntax, 'test')} language="jsx" label="src/exercises/DogQueryExplorer.test.jsx" />
      </section>

      <section className="assignment-section">
        <h2>Manual Verification Checklist</h2>
        <ul>
          <li>The breed dropdown loads names from the Dog API.</li>
          <li>The screen does not render every breed as a large card collection.</li>
          <li>Selecting one breed displays that breed&apos;s detail panel.</li>
          <li>Facts and groups appear in their own sections.</li>
          <li>Loading, error, success, and empty states are readable in light and dark mode.</li>
          <li>The official Vitest suite passes after installing dependencies.</li>
        </ul>
      </section>

      <section className="assignment-section">
        <h2>How to Run the Tests</h2>
        <CodeBlock code="npm test -- src/exercises/DogQueryExplorer.test.jsx" language="bash" label="Terminal" />
      </section>

      <section className="assignment-section">
        <h2>Student Takeaways</h2>
        <ul>
          <li>TanStack Query separates server-state concerns from local UI state.</li>
          <li>A query key identifies cached data, while a query function retrieves that data.</li>
          <li>Dependent queries are useful when one request should wait for a user choice.</li>
          <li>Dropdown-based selection can keep a large API response usable and readable.</li>
          <li>Tests should cover both successful request flows and realistic API edge cases.</li>
        </ul>
      </section>
    </div>
  )
}
