import { useEffect, useMemo, useState } from 'react'
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import '../../../styles/week04-jsonplaceholder-crud-tanstack-query-assignment.css'

export const JSONPLACEHOLDER_BASE_URL = 'https://jsonplaceholder.typicode.com'

export function normalizeUserId(value) {
  const trimmedValue = String(value ?? '').trim()
  return trimmedValue
}

export function makePostsUrl(userId = '') {
  const normalizedUserId = normalizeUserId(userId)
  const query = normalizedUserId ? `?userId=${encodeURIComponent(normalizedUserId)}` : ''
  return `${JSONPLACEHOLDER_BASE_URL}/posts${query}`
}

export function normalizePosts(payload) {
  return Array.isArray(payload) ? payload : []
}

export function buildCreatePayload({ title, body, userId }) {
  return {
    title: String(title ?? '').trim(),
    body: String(body ?? '').trim(),
    userId: Number(userId) || 1,
  }
}

export function buildReplacePayload({ id, title, body, userId }) {
  return {
    id: Number(id),
    title: String(title ?? '').trim(),
    body: String(body ?? '').trim(),
    userId: Number(userId) || 1,
  }
}

export function buildPatchTitlePayload({ title }) {
  return {
    title: String(title ?? '').trim(),
  }
}

export function getMutationStatusText(mutation, idleText) {
  if (mutation.isPending) return 'Request in progress...'
  if (mutation.isError) return mutation.error?.message ?? 'The request failed.'
  if (mutation.isSuccess) return 'Request completed successfully.'
  return idleText
}

export async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`JSONPlaceholder request failed with status ${response.status}`)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export async function fetchPosts({ queryKey }) {
  const [, userId] = queryKey
  const payload = await fetchJson(makePostsUrl(userId))
  return normalizePosts(payload)
}

export async function createPostRequest(postInput) {
  return fetchJson(`${JSONPLACEHOLDER_BASE_URL}/posts`, {
    method: 'POST',
    body: JSON.stringify(buildCreatePayload(postInput)),
  })
}

export async function replacePostRequest(postInput) {
  const payload = buildReplacePayload(postInput)

  if (!payload.id) {
    throw new Error('A post id is required before a PUT request can run.')
  }

  return fetchJson(`${JSONPLACEHOLDER_BASE_URL}/posts/${payload.id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export async function patchPostTitleRequest(postInput) {
  const id = Number(postInput?.id)

  if (!id) {
    throw new Error('A post id is required before a PATCH request can run.')
  }

  return fetchJson(`${JSONPLACEHOLDER_BASE_URL}/posts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(buildPatchTitlePayload(postInput)),
  })
}

export async function deletePostRequest(id) {
  const numericId = Number(id)

  if (!numericId) {
    throw new Error('A post id is required before a DELETE request can run.')
  }

  await fetchJson(`${JSONPLACEHOLDER_BASE_URL}/posts/${numericId}`, {
    method: 'DELETE',
  })

  return numericId
}

function StatusCallout({ title, children, tone = 'info' }) {
  return (
    <div className={`crud-status crud-status-${tone}`} role={tone === 'error' ? 'alert' : 'status'}>
      <strong>{title}</strong>
      <span>{children}</span>
    </div>
  )
}

function MutationStatus({ label, mutation, idleText }) {
  const tone = mutation.isError ? 'error' : mutation.isSuccess ? 'success' : 'info'

  return (
    <p className={`crud-mutation-status crud-mutation-status-${tone}`} data-testid={`${label}-status`}>
      {getMutationStatusText(mutation, idleText)}
    </p>
  )
}

function PostCrudExplorerApp() {
  const queryClient = useQueryClient()
  const [filterInput, setFilterInput] = useState('')
  const [activeUserIdFilter, setActiveUserIdFilter] = useState('')
  const [selectedPostId, setSelectedPostId] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newBody, setNewBody] = useState('')
  const [newUserId, setNewUserId] = useState('1')
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const [patchTitle, setPatchTitle] = useState('')

  const postsQuery = useQuery({
    queryKey: ['jsonplaceholder-posts', activeUserIdFilter],
    queryFn: fetchPosts,
  })

  const posts = postsQuery.data ?? []

  const selectedPost = useMemo(() => {
    return posts.find((post) => String(post.id) === String(selectedPostId)) ?? null
  }, [posts, selectedPostId])

  useEffect(() => {
    if (!selectedPost) {
      setEditTitle('')
      setEditBody('')
      setPatchTitle('')
      return
    }

    setEditTitle(selectedPost.title ?? '')
    setEditBody(selectedPost.body ?? '')
    setPatchTitle(selectedPost.title ?? '')
  }, [selectedPost])

  function updateCachedPosts(updater) {
    queryClient.setQueryData(['jsonplaceholder-posts', activeUserIdFilter], (currentPosts = []) => {
      return updater(normalizePosts(currentPosts))
    })
  }

  const createMutation = useMutation({
    mutationFn: createPostRequest,
    onSuccess(createdPost) {
      updateCachedPosts((currentPosts) => [createdPost, ...currentPosts])
      setSelectedPostId(String(createdPost.id))
      setNewTitle('')
      setNewBody('')
    },
  })

  const replaceMutation = useMutation({
    mutationFn: replacePostRequest,
    onSuccess(replacedPost) {
      updateCachedPosts((currentPosts) =>
        currentPosts.map((post) => (post.id === replacedPost.id ? { ...post, ...replacedPost } : post))
      )
    },
  })

  const patchMutation = useMutation({
    mutationFn: patchPostTitleRequest,
    onSuccess(patchedPost) {
      updateCachedPosts((currentPosts) =>
        currentPosts.map((post) => (post.id === patchedPost.id ? { ...post, ...patchedPost } : post))
      )
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deletePostRequest,
    onSuccess(deletedId) {
      updateCachedPosts((currentPosts) => currentPosts.filter((post) => post.id !== deletedId))
      if (String(selectedPostId) === String(deletedId)) {
        setSelectedPostId('')
      }
    },
  })

  function handleApplyFilter(event) {
    event.preventDefault()
    setActiveUserIdFilter(normalizeUserId(filterInput))
    setSelectedPostId('')
  }

  function handleCreatePost(event) {
    event.preventDefault()
    createMutation.mutate({ title: newTitle, body: newBody, userId: newUserId })
  }

  function handleReplacePost(event) {
    event.preventDefault()
    if (!selectedPost) return

    replaceMutation.mutate({
      id: selectedPost.id,
      title: editTitle,
      body: editBody,
      userId: selectedPost.userId,
    })
  }

  function handlePatchTitle(event) {
    event.preventDefault()
    if (!selectedPost) return

    patchMutation.mutate({
      id: selectedPost.id,
      title: patchTitle,
    })
  }

  function handleDeleteSelectedPost() {
    if (!selectedPost) return
    deleteMutation.mutate(selectedPost.id)
  }

  return (
    <section className="crud-shell">
      <div className="crud-card crud-hero-card">
        <p className="crud-kicker">Week 4 Assignment Exercise · Expo Bridge Preview</p>
        <h2>JSONPlaceholder CRUD with TanStack Query</h2>
        <p className="crud-description">
          This in-app preview mirrors the Expo assignment flow in a Vite-safe browser environment:
          fetch posts, create a post, replace a post, patch only its title, delete a post, and filter
          the query by user id.
        </p>
      </div>

      <div className="crud-grid">
        <div className="crud-card">
          <h3>1. Query Controls</h3>
          <form className="crud-inline-form" onSubmit={handleApplyFilter}>
            <label htmlFor="user-filter-input">Filter by user ID</label>
            <div className="crud-filter-row">
              <input
                id="user-filter-input"
                value={filterInput}
                onChange={(event) => setFilterInput(event.target.value)}
                placeholder="Example: 1"
                data-testid="user-filter-input"
              />
              <button type="submit">Apply Filter</button>
              <button
                type="button"
                className="crud-secondary-button"
                onClick={() => {
                  setFilterInput('')
                  setActiveUserIdFilter('')
                  setSelectedPostId('')
                }}
              >
                Clear
              </button>
            </div>
          </form>

          {postsQuery.isPending ? (
            <StatusCallout title="Loading posts">TanStack Query is waiting for JSONPlaceholder.</StatusCallout>
          ) : null}

          {postsQuery.isError ? (
            <StatusCallout title="Posts request failed" tone="error">
              {postsQuery.error.message}
            </StatusCallout>
          ) : null}

          {postsQuery.isSuccess && posts.length === 0 ? (
            <StatusCallout title="No posts returned" tone="warning">
              The request succeeded, but the response did not include any post records.
            </StatusCallout>
          ) : null}

          {postsQuery.isSuccess && posts.length > 0 ? (
            <StatusCallout title="Query success" tone="success">
              Showing {posts.length} post{posts.length === 1 ? '' : 's'}
              {activeUserIdFilter ? ` for user ${activeUserIdFilter}` : ' from all users'}.
            </StatusCallout>
          ) : null}
        </div>

        <div className="crud-card">
          <h3>2. Create a Post</h3>
          <form className="crud-form" onSubmit={handleCreatePost}>
            <label htmlFor="new-title-input">Title</label>
            <input
              id="new-title-input"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
              placeholder="New post title"
              data-testid="new-title-input"
            />

            <label htmlFor="new-body-input">Body</label>
            <textarea
              id="new-body-input"
              value={newBody}
              onChange={(event) => setNewBody(event.target.value)}
              placeholder="New post body"
              data-testid="new-body-input"
            />

            <label htmlFor="new-user-input">User ID</label>
            <input
              id="new-user-input"
              value={newUserId}
              onChange={(event) => setNewUserId(event.target.value)}
              data-testid="new-user-input"
            />

            <button type="submit" disabled={createMutation.isPending}>
              Send POST Request
            </button>
          </form>
          <MutationStatus label="create" mutation={createMutation} idleText="POST has not been sent yet." />
        </div>
      </div>

      <div className="crud-card">
        <div className="crud-section-heading-row">
          <div>
            <h3>3. Posts List</h3>
            <p>Select one post to practice PUT, PATCH, and DELETE mutations.</p>
          </div>
          <span className="crud-pill">GET /posts</span>
        </div>

        <div className="crud-post-list" data-testid="posts-list">
          {posts.map((post) => (
            <article
              className={`crud-post-item ${String(post.id) === String(selectedPostId) ? 'crud-post-item-active' : ''}`}
              key={post.id}
            >
              <button
                type="button"
                className="crud-post-select"
                onClick={() => setSelectedPostId(String(post.id))}
              >
                <span>#{post.id} · User {post.userId}</span>
                <strong>{post.title}</strong>
              </button>
            </article>
          ))}
        </div>
      </div>

      <div className="crud-grid">
        <div className="crud-card">
          <h3>4. Selected Post Detail</h3>
          {selectedPost ? (
            <article className="crud-selected-post" data-testid="selected-post-detail">
              <span className="crud-pill">Post #{selectedPost.id}</span>
              <h4>{selectedPost.title}</h4>
              <p>{selectedPost.body}</p>
            </article>
          ) : (
            <StatusCallout title="Waiting for selection">
              Choose a post from the list before running PUT, PATCH, or DELETE.
            </StatusCallout>
          )}
        </div>

        <div className="crud-card">
          <h3>5. Update, Patch, and Delete</h3>
          <form className="crud-form" onSubmit={handleReplacePost}>
            <label htmlFor="edit-title-input">PUT title</label>
            <input
              id="edit-title-input"
              value={editTitle}
              onChange={(event) => setEditTitle(event.target.value)}
              disabled={!selectedPost}
              data-testid="edit-title-input"
            />

            <label htmlFor="edit-body-input">PUT body</label>
            <textarea
              id="edit-body-input"
              value={editBody}
              onChange={(event) => setEditBody(event.target.value)}
              disabled={!selectedPost}
              data-testid="edit-body-input"
            />

            <button type="submit" disabled={!selectedPost || replaceMutation.isPending}>
              Send PUT Request
            </button>
          </form>
          <MutationStatus label="replace" mutation={replaceMutation} idleText="PUT has not been sent yet." />

          <form className="crud-form crud-form-divider" onSubmit={handlePatchTitle}>
            <label htmlFor="patch-title-input">PATCH title only</label>
            <input
              id="patch-title-input"
              value={patchTitle}
              onChange={(event) => setPatchTitle(event.target.value)}
              disabled={!selectedPost}
              data-testid="patch-title-input"
            />
            <button type="submit" disabled={!selectedPost || patchMutation.isPending}>
              Send PATCH Request
            </button>
          </form>
          <MutationStatus label="patch" mutation={patchMutation} idleText="PATCH has not been sent yet." />

          <button
            type="button"
            className="crud-danger-button"
            onClick={handleDeleteSelectedPost}
            disabled={!selectedPost || deleteMutation.isPending}
          >
            Send DELETE Request
          </button>
          <MutationStatus label="delete" mutation={deleteMutation} idleText="DELETE has not been sent yet." />
        </div>
      </div>
    </section>
  )
}

export function createPostCrudQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 1000 * 30,
      },
      mutations: {
        retry: false,
      },
    },
  })
}

const postCrudQueryClient = createPostCrudQueryClient()

export default function PostCrudExplorer() {
  return (
    <QueryClientProvider client={postCrudQueryClient}>
      <PostCrudExplorerApp />
    </QueryClientProvider>
  )
}
