import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import PostCrudExplorer, {
  JSONPLACEHOLDER_BASE_URL,
  buildCreatePayload,
  buildPatchTitlePayload,
  fetchJson,
  makePostsUrl,
  normalizePosts,
} from './PostCrudExplorer'

const samplePosts = [
  { id: 1, userId: 1, title: 'first title', body: 'first body' },
  { id: 2, userId: 2, title: 'second title', body: 'second body' },
]

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

function mockJsonResponse(payload, options = {}) {
  return Promise.resolve({
    ok: options.ok ?? true,
    status: options.status ?? 200,
    json: () => Promise.resolve(payload),
  })
}

describe('PostCrudExplorer assignment helpers and UI', () => {
  test('normal: builds the all-posts URL when no user filter is provided', () => {
    expect(makePostsUrl('')).toBe(`${JSONPLACEHOLDER_BASE_URL}/posts`)
  })

  test('normal: builds a filtered posts URL when a user id is provided', () => {
    expect(makePostsUrl(' 3 ')).toBe(`${JSONPLACEHOLDER_BASE_URL}/posts?userId=3`)
  })

  test('normal: trims form fields before building a POST payload', () => {
    expect(buildCreatePayload({ title: '  Hello  ', body: '  World  ', userId: '4' })).toEqual({
      title: 'Hello',
      body: 'World',
      userId: 4,
    })
  })

  test('edge: normalizePosts returns an empty array for malformed API payloads', () => {
    expect(normalizePosts(null)).toEqual([])
    expect(normalizePosts({ data: samplePosts })).toEqual([])
  })

  test('edge: PATCH payload sends only the title field', () => {
    expect(buildPatchTitlePayload({ id: 7, title: '  patched title  ', body: 'ignored body' })).toEqual({
      title: 'patched title',
    })
  })

  test('edge: fetchJson throws a helpful error when the server returns an error response', async () => {
    vi.stubGlobal('fetch', vi.fn(() => mockJsonResponse({ message: 'nope' }, { ok: false, status: 500 })))

    await expect(fetchJson(`${JSONPLACEHOLDER_BASE_URL}/posts`)).rejects.toThrow(
      'JSONPlaceholder request failed with status 500'
    )
  })

  test('normal: renders posts returned by the GET query', async () => {
    vi.stubGlobal('fetch', vi.fn(() => mockJsonResponse(samplePosts)))

    render(<PostCrudExplorer />)

    expect(await screen.findByText(/first title/i)).toBeInTheDocument()
    expect(screen.getByText(/second title/i)).toBeInTheDocument()
  })

  test('normal: applying a user filter requests the filtered JSONPlaceholder URL', async () => {
    const fetchMock = vi
      .fn()
      .mockImplementationOnce(() => mockJsonResponse(samplePosts))
      .mockImplementationOnce(() => mockJsonResponse([samplePosts[1]]))

    vi.stubGlobal('fetch', fetchMock)

    render(<PostCrudExplorer />)

    await screen.findByText(/first title/i)
    fireEvent.change(screen.getByTestId('user-filter-input'), { target: { value: '2' } })
    fireEvent.click(screen.getByRole('button', { name: /apply filter/i }))

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(`${JSONPLACEHOLDER_BASE_URL}/posts?userId=2`, expect.any(Object))
    })
  })
})
