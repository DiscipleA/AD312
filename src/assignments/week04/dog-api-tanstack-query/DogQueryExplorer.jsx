import { useMemo, useState } from 'react'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import '../../../styles/week04-dog-api-tanstack-query-assignment.css'

const DOG_API_BASE_URL = 'https://dogapi.dog/api/v2'

export async function fetchJson(endpoint) {
  const response = await fetch(`${DOG_API_BASE_URL}${endpoint}`)

  if (!response.ok) {
    throw new Error(`Dog API request failed with status ${response.status}`)
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

  const payload = await fetchJson(`/breeds/${breedId}`)
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
    <div className={`dog-query-status dog-query-status-${tone}`} role={tone === 'error' ? 'alert' : 'status'}>
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
                <dl>
                  <div>
                    <dt>Life span</dt>
                    <dd>{displayedBreed.attributes?.life?.min ?? 'Unknown'}–{displayedBreed.attributes?.life?.max ?? 'Unknown'} years</dd>
                  </div>
                  <div>
                    <dt>Male weight</dt>
                    <dd>{displayedBreed.attributes?.male_weight?.min ?? 'Unknown'}–{displayedBreed.attributes?.male_weight?.max ?? 'Unknown'} kg</dd>
                  </div>
                  <div>
                    <dt>Female weight</dt>
                    <dd>{displayedBreed.attributes?.female_weight?.min ?? 'Unknown'}–{displayedBreed.attributes?.female_weight?.max ?? 'Unknown'} kg</dd>
                  </div>
                </dl>
              </article>
            ) : null}
          </div>
        </div>

        <div className="dog-query-resource-grid">
          <section className="dog-query-panel">
            <h3>Dog Facts</h3>
            {factsQuery.isPending ? (
              <StatusCallout title="Loading facts">Fetching facts from the <code>/facts</code> endpoint.</StatusCallout>
            ) : null}
            {factsQuery.isError ? (
              <StatusCallout title="Facts request failed" tone="error">{factsQuery.error.message}</StatusCallout>
            ) : null}
            {factsQuery.isSuccess ? (
              <ul className="dog-query-list" data-testid="facts-list">
                {facts.slice(0, 3).map((fact) => (
                  <li key={fact.id}>{fact.attributes?.body ?? 'Fact text unavailable.'}</li>
                ))}
              </ul>
            ) : null}
          </section>

          <section className="dog-query-panel">
            <h3>Dog Groups</h3>
            {groupsQuery.isPending ? (
              <StatusCallout title="Loading groups">Fetching dog group metadata from the <code>/groups</code> endpoint.</StatusCallout>
            ) : null}
            {groupsQuery.isError ? (
              <StatusCallout title="Groups request failed" tone="error">{groupsQuery.error.message}</StatusCallout>
            ) : null}
            {groupsQuery.isSuccess ? (
              <ul className="dog-query-list" data-testid="groups-list">
                {groups.slice(0, 5).map((group) => (
                  <li key={group.id}>{group.attributes?.name ?? 'Unnamed dog group'}</li>
                ))}
              </ul>
            ) : null}
          </section>
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
}
