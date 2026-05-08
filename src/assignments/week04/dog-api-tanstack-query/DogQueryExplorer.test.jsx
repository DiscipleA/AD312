import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
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

const goldenPayload = {
  data: breedsPayload.data[0],
}

const factsPayload = {
  data: [
    { id: 'fact-1', type: 'fact', attributes: { body: 'Dogs have a powerful sense of smell.' } },
    { id: 'fact-2', type: 'fact', attributes: { body: 'Puppies are born with closed eyes.' } },
  ],
}

const groupsPayload = {
  data: [
    { id: 'sporting', type: 'group', attributes: { name: 'Sporting Group' } },
    { id: 'herding', type: 'group', attributes: { name: 'Herding Group' } },
  ],
}

function jsonResponse(payload, ok = true, status = 200) {
  return Promise.resolve({
    ok,
    status,
    json: () => Promise.resolve(payload),
  })
}

function installSuccessfulFetchMock() {
  global.fetch = vi.fn((url) => {
    if (String(url).endsWith('/breeds/golden-retriever')) {
      return jsonResponse(goldenPayload)
    }

    if (String(url).endsWith('/breeds')) {
      return jsonResponse(breedsPayload)
    }

    if (String(url).endsWith('/facts')) {
      return jsonResponse(factsPayload)
    }

    if (String(url).endsWith('/groups')) {
      return jsonResponse(groupsPayload)
    }

    return jsonResponse({ data: [] })
  })
}

beforeEach(() => {
  installSuccessfulFetchMock()
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

    expect(screen.queryByText(/Recipe 1 of/i)).not.toBeInTheDocument()
    expect(screen.getAllByText(/choose a breed/i).length).toBeGreaterThan(0)
  })

  test('normal: selecting a breed loads the dependent breed detail query', async () => {
    render(<DogQueryExplorer />)

    const select = await screen.findByTestId('breed-select')
    await waitFor(() => expect(select).not.toBeDisabled())

    fireEvent.change(select, { target: { value: 'golden-retriever' } })

    await waitFor(() => expect(screen.getByTestId('breed-detail-panel')).toHaveTextContent('Golden Retriever'))
    expect(screen.getByTestId('breed-detail-panel')).toHaveTextContent(/friendly sporting dog/i)
    expect(global.fetch).toHaveBeenCalledWith('https://dogapi.dog/api/v2/breeds/golden-retriever')
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
})
