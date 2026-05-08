import PostCrudExplorer from '../assignments/week04/jsonplaceholder-crud-tanstack-query/PostCrudExplorer'
import vitePreviewSyntax from '../assignments/week04/jsonplaceholder-crud-tanstack-query/PostCrudExplorer.jsx?raw'
import testSyntax from '../assignments/week04/jsonplaceholder-crud-tanstack-query/PostCrudExplorer.test.jsx?raw'
import PostCrudTestPanel from './PostCrudTestPanel'
import '../styles/week04-jsonplaceholder-crud-tanstack-query-assignment.css'
import CodeBlock from '../components/CodeBlock'
import { annotateDisplayedCode } from '../utils/educationalCode'

const expoReferenceSyntax = `import { useState } from 'react'
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

async function fetchJson(endpoint, options = {}) {
  const response = await fetch(API_BASE_URL + endpoint, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!response.ok) {
    throw new Error('Request failed with status ' + response.status)
  }

  return response.status === 204 ? null : response.json()
}

function PostsScreen() {
  const queryClient = useQueryClient()
  const [userId, setUserId] = useState('')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [selectedPost, setSelectedPost] = useState(null)

  const postsQuery = useQuery({
    queryKey: ['posts', userId],
    queryFn: () => fetchJson(userId ? '/posts?userId=' + userId : '/posts'),
  })

  const createPost = useMutation({
    mutationFn: () => fetchJson('/posts', {
      method: 'POST',
      body: JSON.stringify({ title, body, userId: Number(userId) || 1 }),
    }),
    onSuccess(newPost) {
      queryClient.setQueryData(['posts', userId], (currentPosts = []) => [newPost, ...currentPosts])
      setTitle('')
      setBody('')
    },
  })

  const replacePost = useMutation({
    mutationFn: (post) => fetchJson('/posts/' + post.id, {
      method: 'PUT',
      body: JSON.stringify(post),
    }),
  })

  const patchPostTitle = useMutation({
    mutationFn: (post) => fetchJson('/posts/' + post.id, {
      method: 'PATCH',
      body: JSON.stringify({ title: post.title }),
    }),
  })

  const deletePost = useMutation({
    mutationFn: (postId) => fetchJson('/posts/' + postId, { method: 'DELETE' }),
  })

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.heading}>JSONPlaceholder CRUD</Text>
      <TextInput style={styles.input} value={userId} onChangeText={setUserId} placeholder="Filter by user ID" />
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Post title" />
      <TextInput style={styles.input} value={body} onChangeText={setBody} placeholder="Post body" multiline />
      <Pressable style={styles.primaryButton} onPress={() => createPost.mutate()}>
        <Text style={styles.buttonText}>Create Post</Text>
      </Pressable>

      {postsQuery.isPending ? <Text>Loading posts...</Text> : null}
      {postsQuery.isError ? <Text>Could not load posts.</Text> : null}

      <FlatList
        data={postsQuery.data ?? []}
        keyExtractor={(post) => String(post.id)}
        renderItem={({ item }) => (
          <Pressable style={styles.postCard} onPress={() => setSelectedPost(item)}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text>{item.body}</Text>
          </Pressable>
        )}
      />

      {selectedPost ? (
        <View style={styles.actionRow}>
          <Pressable onPress={() => replacePost.mutate({ ...selectedPost, title, body })}>
            <Text>PUT</Text>
          </Pressable>
          <Pressable onPress={() => patchPostTitle.mutate({ id: selectedPost.id, title })}>
            <Text>PATCH</Text>
          </Pressable>
          <Pressable onPress={() => deletePost.mutate(selectedPost.id)}>
            <Text>DELETE</Text>
          </Pressable>
        </View>
      ) : null}
    </SafeAreaView>
  )
}

const client = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <PostsScreen />
    </QueryClientProvider>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 18, gap: 12 },
  heading: { fontSize: 26, fontWeight: '800' },
  input: { borderWidth: 1, borderRadius: 12, padding: 12 },
  primaryButton: { borderRadius: 12, padding: 14, alignItems: 'center' },
  buttonText: { fontWeight: '800' },
  postCard: { borderWidth: 1, borderRadius: 16, padding: 14, marginVertical: 6 },
  postTitle: { fontWeight: '800', marginBottom: 6 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-around', padding: 12 },
})`

export default function Week04JsonPlaceholderCrudAssignmentGuide() {
  return (
    <div className="assignment-guide-shell crud-assignment-guide">
      <div className="assignment-hero crud-assignment-hero">
        <p className="assignment-kicker">Week 4 Assignment 2 · Expo Bridge Pattern</p>
        <h1>JSONPlaceholder CRUD with TanStack Query</h1>
        <p className="assignment-summary">
          Build a mobile-first CRUD workflow with TanStack Query mutations. The target assignment is written
          for Expo, while this course platform displays a Vite-compatible preview so the AD312 shell remains
          stable and testable.
        </p>
      </div>

      <section className="assignment-section">
        <h2>Overview</h2>
        <p>
          This assignment moves beyond read-only queries. You will use JSONPlaceholder to practice the full
          request lifecycle: <code>GET</code>, <code>POST</code>, <code>PUT</code>, <code>PATCH</code>, and
          <code>DELETE</code>. The important learning goal is not that JSONPlaceholder permanently stores the
          data. It does not. The goal is to understand how TanStack Query organizes read operations with
          <code>useQuery</code> and write operations with <code>useMutation</code>.
        </p>
        <p>
          Because the course shell is a Vite React app, the live preview below uses normal browser elements.
          The assignment guide still includes the full Expo-style source so students can build the same flow
          with <code>SafeAreaView</code>, <code>Text</code>, <code>TextInput</code>, <code>Pressable</code>, and
          <code>FlatList</code> in a real Expo project.
        </p>
      </section>

      <section className="assignment-section">
        <h2>Learning Objectives</h2>
        <ul>
          <li>Fetch JSONPlaceholder posts with a TanStack Query <code>useQuery</code> hook.</li>
          <li>Create new posts with a <code>POST</code> mutation.</li>
          <li>Fully replace an existing post with a <code>PUT</code> mutation.</li>
          <li>Partially update only the title field with a <code>PATCH</code> mutation.</li>
          <li>Delete a selected post with a <code>DELETE</code> mutation.</li>
          <li>Filter the posts query by user id using the query key as part of the cache identity.</li>
        </ul>
      </section>

      <section className="assignment-section">
        <h2>Expo Setup Instructions</h2>
        <CodeBlock
          language="bash"
          label="Expo setup commands"
          code={`npx create-expo-app@latest crud-query-app\ncd crud-query-app\nnpm install @tanstack/react-query\nnpx expo start`}
        />
        <p>
          In Expo, run the assignment on Expo Go, an iOS simulator, or an Android emulator. The React Native
          UI should prioritize readable mobile layout, large tap targets, and clear separation between the
          query list and mutation actions.
        </p>
      </section>

      <section className="assignment-section">
        <h2>Live Vite Preview</h2>
        <p>
          Use this preview to verify the same data flow inside the course platform. It keeps the app aligned
          with Week 4 Assignment 1 and Week 2 Assignment 2 presentation patterns without embedding a native
          Expo runtime inside Vite.
        </p>
        <PostCrudExplorer />
      </section>

      <section className="assignment-section">
        <h2>Build Strategy</h2>
        <ol>
          <li>Create a top-level <code>QueryClient</code> and wrap the app with <code>QueryClientProvider</code>.</li>
          <li>Use <code>useQuery</code> for the posts list because fetching is read-oriented server state.</li>
          <li>Use <code>useMutation</code> for write operations because POST, PUT, PATCH, and DELETE change server data.</li>
          <li>Keep selected-post state local because it is UI state, not server state.</li>
          <li>Update or invalidate cached posts after mutations so the visible list stays aligned with the latest action.</li>
        </ol>
      </section>

      <section className="assignment-section">
        <h2>Full Vite Preview Source</h2>
        <p>
          This is the browser-safe implementation used by the course platform. The syntax is shown in full
          because students should be able to compare query functions, mutation functions, cache updates, and
          UI state in one complete file.
        </p>
        <CodeBlock code={annotateDisplayedCode(vitePreviewSyntax)} language="jsx" label="PostCrudExplorer.jsx" />
      </section>

      <section className="assignment-section">
        <h2>Full Expo Reference Source</h2>
        <p>
          This is the version students would adapt in a standalone Expo app. It uses React Native primitives
          and <code>StyleSheet</code>, while preserving the same TanStack Query concepts as the Vite preview.
        </p>
        <CodeBlock code={annotateDisplayedCode(expoReferenceSyntax)} language="jsx" label="Expo App.jsx reference" />
      </section>

      <section className="assignment-section">
        <h2>Official Test Syntax</h2>
        <p>
          The official Vitest file verifies normal cases and edge cases. The tests focus on URL construction,
          payload construction, defensive API handling, and visible query behavior in the Vite preview.
        </p>
        <CodeBlock code={annotateDisplayedCode(testSyntax, 'test')} language="jsx" label="PostCrudExplorer.test.jsx" />
      </section>

      <PostCrudTestPanel />

      <section className="assignment-section">
        <h2>Manual Verification Checklist</h2>
        <ul>
          <li>The posts list loads from <code>/posts</code>.</li>
          <li>Entering a user id changes the query to <code>/posts?userId=&lt;id&gt;</code>.</li>
          <li>Submitting the create form sends a <code>POST</code> request.</li>
          <li>Selecting a post enables <code>PUT</code>, <code>PATCH</code>, and <code>DELETE</code> controls.</li>
          <li>The PATCH action sends only the title field, not the entire post body.</li>
          <li>The UI clearly communicates loading, error, success, and empty states.</li>
        </ul>
      </section>
    </div>
  )
}
