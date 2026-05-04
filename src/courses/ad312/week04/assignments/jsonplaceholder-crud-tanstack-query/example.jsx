import { QueryClient, QueryClientProvider, useMutation, useQuery } from '@tanstack/react-query'

const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

async function fetchJson(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, options)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.status === 204 ? null : response.json()
}

function PostsPreview() {
  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchJson('/posts'),
  })

  const createPost = useMutation({
    mutationFn: (post) =>
      fetchJson('/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      }),
  })

  if (postsQuery.isPending) return <p>Loading posts...</p>
  if (postsQuery.isError) return <p>Could not load posts.</p>

  return (
    <section>
      <button type="button" onClick={() => createPost.mutate({ title: 'Demo', body: 'Body', userId: 1 })}>
        Create demo post
      </button>
      {postsQuery.data.map((post) => (
        <article key={post.id}>{post.title}</article>
      ))}
    </section>
  )
}

const client = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <PostsPreview />
    </QueryClientProvider>
  )
}
