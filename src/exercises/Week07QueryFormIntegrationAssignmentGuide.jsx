import CodeBlock from '../components/CodeBlock'
import UserProfileQueryFormPreview from '../assignments/week07/query-form-profile-integration/UserProfileQueryForm'
import RegistrationQueryFormTestPanel from './RegistrationQueryFormTestPanel'
import formSource from '../assignments/week07/query-form-profile-integration/UserProfileQueryForm.jsx?raw'
import testSource from '../assignments/week07/query-form-profile-integration/UserProfileQueryForm.test.jsx?raw'
import '../styles/week07-query-form-profile-integration-assignment.css'

const setupSource = `npm create vite@latest query-form-integration -- --template react
cd query-form-integration
npm install
npm install @tanstack/react-query react-hook-form
npm install -D json-server
npm run dev`

const mockServerSource = `{
  "profile": {
    "username": "avery.dev",
    "email": "avery@example.com",
    "bio": "Frontend developer who cares about accessible, resilient form workflows.",
    "notifications": true
  }
}`

const appSource = `// src/App.jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UserProfileQueryFormPreview from './UserProfileQueryForm'
import './App.css'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <UserProfileQueryFormPreview />
      </main>
    </QueryClientProvider>
  )
}`

export default function Week07QueryFormIntegrationAssignmentGuide() {
  return (
    <article className="hook-form-assignment-guide query-profile-assignment-guide">
      <header className="hook-form-hero-card hook-form-card">
        <p className="hook-form-kicker">AD312 • Week 07 • Assignment 03</p>
        <h1>Enterprise Server-State Integration with TanStack Query & React Hook Form</h1>
        <p>
          Combine React Hook Form and TanStack Query to fetch a profile from a mock REST API, hydrate a form with
          server data, save edits through a mutation, invalidate cached data, and map server-side validation failures
          back into field-level form errors.
        </p>
      </header>

      <section className="hook-form-card">
        <h2>Overview</h2>
        <p>
          This assignment builds on Assignment 2's React Hook Form workflow. The new skill is separating local form
          state from remote server state: TanStack Query owns the <code>['userProfile']</code> cache and network lifecycle,
          while React Hook Form owns validation, dirty tracking, and field-level error display.
        </p>
      </section>

      <section className="hook-form-card">
        <h2>Objectives</h2>
        <ul className="hook-form-checklist">
          <li>Fetch profile data with <code>useQuery</code> using the key <code>['userProfile']</code>.</li>
          <li>Hydrate React Hook Form with server data through <code>reset()</code>.</li>
          <li>Save profile edits with <code>useMutation</code> and a PUT-style API adapter.</li>
          <li>Invalidate the profile cache with <code>queryClient.invalidateQueries</code> after save.</li>
          <li>Disable Save Profile when <code>formState.isDirty</code> is false or the mutation is pending.</li>
          <li>Map a simulated <code>409 Conflict</code> for <code>conflict@example.com</code> into <code>setError('email')</code>.</li>
          <li>Include at least three normal Vitest cases and three edge Vitest cases.</li>
        </ul>
      </section>

      <section className="hook-form-card">
        <h2>Required Profile Fields</h2>
        <div className="hook-form-field-grid">
          <article><strong>Username</strong><span>Required string loaded from the server profile.</span></article>
          <article><strong>Email</strong><span>Required email with client validation and simulated server conflict handling.</span></article>
          <article><strong>Bio</strong><span>Textarea field for longer profile text.</span></article>
          <article><strong>Notifications</strong><span>Boolean checkbox stored as part of the profile record.</span></article>
        </div>
      </section>

      <UserProfileQueryFormPreview />
      <RegistrationQueryFormTestPanel />

      <section className="hook-form-card">
        <h2>Standalone Vite Setup</h2>
        <p>
          In a standalone project, install React Hook Form, TanStack Query, and json-server. The portfolio preview uses a
          browser-safe mock API, but the source comments and setup below show how the same component maps to
          <code>http://localhost:3001/profile</code>.
        </p>
        <CodeBlock language="bash" label="Vite + React Hook Form + TanStack Query Setup" code={setupSource} />
      </section>

      <section className="hook-form-card">
        <h2>Mock REST API Data</h2>
        <p>
          Create a small json-server database with one <code>profile</code> object, then run it on port <code>3001</code>.
        </p>
        <CodeBlock language="json" label="profile-db.json" code={mockServerSource} />
        <CodeBlock
          language="bash"
          label="Run json-server"
          code="npx json-server --watch src/assignments/week07/query-form-profile-integration/profile-db.json --port 3001"
        />
      </section>

      <section className="hook-form-card">
        <h2>Standalone App Entry</h2>
        <p>
          TanStack Query hooks require a <code>QueryClientProvider</code>. In this course shell, the preview wraps itself so it
          does not change the app architecture; in a standalone Vite app, place the provider near the app root.
        </p>
        <CodeBlock language="jsx" label="src/App.jsx" code={appSource} />
      </section>

      <section className="hook-form-card">
        <h2>Completed Source Code</h2>
        <p>
          The source code includes detailed comments explaining the mock REST adapter, query key, form hydration,
          mutation lifecycle, cache invalidation, disabled Save Profile behavior, and server error mapping.
        </p>
        <CodeBlock language="jsx" label="src/assignments/week07/query-form-profile-integration/UserProfileQueryForm.jsx" code={formSource} />
      </section>

      <section className="hook-form-card">
        <h2>Official Vitest Tests</h2>
        <p>
          These tests include three normal cases and three edge cases. They verify helper logic, query hydration,
          dirty-state locking, and server conflict mapping through React Testing Library.
        </p>
        <CodeBlock language="jsx" label="src/assignments/week07/query-form-profile-integration/UserProfileQueryForm.test.jsx" code={testSource} />
      </section>

      <section className="hook-form-card hook-form-grid-two">
        <div>
          <h2>Manual Testing</h2>
          <ul>
            <li>Confirm the preview first shows a loading block, then hydrates fields from the mock API.</li>
            <li>Notice Save Profile starts disabled because no field is dirty yet.</li>
            <li>Edit Username or Bio and confirm Save Profile becomes enabled.</li>
            <li>Save a valid profile and confirm the success banner appears.</li>
            <li>Enter <code>conflict@example.com</code> and confirm the email field receives the server error.</li>
            <li>Run the official Vitest file and confirm all normal and edge cases pass.</li>
          </ul>
        </div>
        <div>
          <h2>Architecture Takeaway</h2>
          <p>
            React Hook Form should not become a server cache, and TanStack Query should not become a field validator.
            This assignment keeps each library in its strongest role: Query manages remote truth, and Hook Form manages
            the user editing experience.
          </p>
        </div>
      </section>
    </article>
  )
}
