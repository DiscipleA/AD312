import ContextRefactorApp from '../assignments/week06/context-refactor-to-context/ContextRefactorApp'
import ContextRefactorTestPanel from './ContextRefactorTestPanel'
import appSource from '../assignments/week06/context-refactor-to-context/ContextRefactorApp.jsx?raw'
import testSource from '../assignments/week06/context-refactor-to-context/ContextRefactorApp.test.jsx?raw'
import '../styles/week06-context-refactor-assignment.css'
import CodeBlock from '../components/CodeBlock'

const beforeScenarioSource = `// BEFORE: App.jsx
const user = {
  name: 'Maya Chen',
  email: 'maya.chen@healthmerge.example',
  themePreference: 'dark',
}

export default function App() {
  return <Dashboard user={user} />
}

// BEFORE: Dashboard.jsx
export default function Dashboard({ user }) {
  // Dashboard does not use user. It only forwards the prop.
  return <Sidebar user={user} />
}

// BEFORE: Sidebar.jsx
export default function Sidebar({ user }) {
  // Sidebar also does not use user. It only forwards the prop.
  return <UserProfile user={user} />
}

// BEFORE: UserProfile.jsx
export default function UserProfile({ user }) {
  return (
    <article>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </article>
  )
}`

const contextFileSource = `// src/UserContext.jsx
import { createContext, useContext, useMemo, useState } from 'react'

export const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: 'Maya Chen',
    email: 'maya.chen@healthmerge.example',
    themePreference: 'dark',
  })

  const value = useMemo(() => ({ user, setUser }), [user])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUserSettings() {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUserSettings must be used inside UserProvider')
  }

  return context
}`

const afterShapeSource = `// AFTER: App.jsx
import { UserProvider } from './UserContext'
import Dashboard from './Dashboard'

export default function App() {
  return (
    <UserProvider>
      <Dashboard />
    </UserProvider>
  )
}

// AFTER: Dashboard.jsx
import Sidebar from './Sidebar'

export default function Dashboard() {
  // No user prop needed here.
  return <Sidebar />
}

// AFTER: Sidebar.jsx
import UserProfile from './UserProfile'

export default function Sidebar() {
  // No user prop needed here either.
  return <UserProfile />
}

// AFTER: UserProfile.jsx
import { useUserSettings } from './UserContext'

export default function UserProfile() {
  const { user } = useUserSettings()

  return (
    <article>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </article>
  )
}`

export default function Week06ContextRefactorAssignmentGuide() {
  return (
    <article className="context-refactor-assignment-guide">
      <header className="context-refactor-hero-card context-refactor-card">
        <p className="context-refactor-kicker">AD312 • Week 06 • Assignment 02</p>
        <h1>Refactoring Prop Drilling to Context</h1>
        <p>
          Refactor a Vite React component tree so user settings no longer travel through unnecessary middle
          components. Use the Context API and <code>useContext</code> to let deeply nested components read shared state directly.
        </p>
      </header>

      <section className="context-refactor-card">
        <h2>Overview</h2>
        <p>
          As applications grow, passing data through multiple component layers can make code difficult to maintain
          and debug. In this assignment, the original tree is <code>App → Dashboard → Sidebar → UserProfile</code>.
          Dashboard and Sidebar do not actually use the user object, so the refactor centralizes that data in a provider.
        </p>
      </section>

      <section className="context-refactor-card">
        <h2>Objectives</h2>
        <ul className="context-refactor-checklist">
          <li>Identify the maintenance problem caused by prop drilling.</li>
          <li>Create a <code>UserContext</code> with <code>createContext()</code>.</li>
          <li>Create a <code>UserProvider</code> that stores user settings state.</li>
          <li>Wrap the top-level app with the provider.</li>
          <li>Use <code>useContext</code> in <code>UserProfile.jsx</code>.</li>
          <li>Remove unnecessary <code>user</code> props from Dashboard and Sidebar.</li>
          <li>Include at least three normal Vitest cases and three edge Vitest cases.</li>
        </ul>
      </section>

      <section className="context-refactor-card">
        <h2>Standalone Vite Setup</h2>
        <p>
          Build the standalone version in a fresh Vite React project. Keep component files as <code>.jsx</code>
          files so Vite Hot Module Replacement can update them cleanly while you work.
        </p>
        <CodeBlock
          language="bash"
          label="Vite Setup"
          code={`npm create vite@latest context-refactor-app -- --template react
cd context-refactor-app
npm install
npm run dev`}
        />
      </section>

      <ContextRefactorApp />
      <ContextRefactorTestPanel />

      <section className="context-refactor-card">
        <h2>The Before Scenario</h2>
        <p>
          This is the prop-drilling version students are refactoring away from. Notice that Dashboard and Sidebar
          accept <code>user</code> even though neither component uses it for its own UI.
        </p>
        <CodeBlock language="jsx" label="Before Refactor: Prop Drilling" code={beforeScenarioSource} />
      </section>

      <section className="context-refactor-card">
        <h2>Create the UserContext</h2>
        <p>
          The context file owns the shared state and exposes a small custom hook. The hook gives students a clear
          error if a component tries to read context outside the provider.
        </p>
        <CodeBlock language="jsx" label="src/UserContext.jsx" code={contextFileSource} />
      </section>

      <section className="context-refactor-card">
        <h2>After Refactor File Shape</h2>
        <p>
          After the provider is in place, the middle components no longer need pass-through props. The deeply nested
          profile component reads the shared user directly from context.
        </p>
        <CodeBlock language="jsx" label="After Refactor: Context API" code={afterShapeSource} />
      </section>

      <section className="context-refactor-card">
        <h2>Completed Portfolio Preview Source</h2>
        <p>
          The in-app preview below keeps the same concept Vite students should build, while adding controls that make
          the context-driven user and theme state visible inside the course platform.
        </p>
        <CodeBlock language="jsx" label="src/assignments/week06/context-refactor-to-context/ContextRefactorApp.jsx" code={appSource} />
      </section>

      <section className="context-refactor-card">
        <h2>Official Vitest Tests</h2>
        <p>
          These tests cover normal context rendering, nested access through Dashboard and Sidebar, user updates,
          fallback behavior, explicit theme overrides, and the error case for using the consumer outside the provider.
        </p>
        <CodeBlock language="jsx" label="src/assignments/week06/context-refactor-to-context/ContextRefactorApp.test.jsx" code={testSource} />
      </section>

      <section className="context-refactor-card context-refactor-grid-two">
        <div>
          <h2>Manual Testing</h2>
          <ul>
            <li>Click each user scenario and confirm the profile updates without passing props through Dashboard or Sidebar.</li>
            <li>Toggle User Preference, Light, and Dark to see context-driven theme behavior.</li>
            <li>Confirm the profile still renders name, email, role, department, and resolved theme.</li>
            <li>Run the Vitest file and confirm the normal and edge tests pass.</li>
          </ul>
        </div>
        <div>
          <h2>Takeaways</h2>
          <p>
            Context is a good fit when shared data is needed deeply in the tree and intermediate components only pass
            it along. It should reduce prop drilling without replacing simple parent-to-child props everywhere.
          </p>
        </div>
      </section>
    </article>
  )
}
