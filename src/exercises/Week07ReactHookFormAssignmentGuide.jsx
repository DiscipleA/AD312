import CodeBlock from '../components/CodeBlock'
import UserRegistrationForm from '../assignments/week07/react-hook-form-registration/UserRegistrationForm'
import RegistrationFormTestPanel from './RegistrationFormTestPanel'
import formSource from '../assignments/week07/react-hook-form-registration/UserRegistrationForm.jsx?raw'
import testSource from '../assignments/week07/react-hook-form-registration/UserRegistrationForm.test.jsx?raw'
import '../styles/week07-react-hook-form-registration-assignment.css'

const setupSource = `npm create vite@latest hook-form-assignment -- --template react
cd hook-form-assignment
npm install
npm install react-hook-form
npm run dev`

const appSource = `// src/App.jsx
import UserRegistrationForm from './UserRegistrationForm'
import './App.css'

export default function App() {
  return (
    <main>
      <UserRegistrationForm />
    </main>
  )
}`

export default function Week07ReactHookFormAssignmentGuide() {
  return (
    <article className="hook-form-assignment-guide">
      <header className="hook-form-hero-card hook-form-card">
        <p className="hook-form-kicker">AD312 • Week 07 • Assignment 02</p>
        <h1>Advanced Performance Forms with React Hook Form</h1>
        <p>
          Build a highly performant client-side registration form using React Hook Form. The goal is to rely on
          registered uncontrolled fields, library-managed validation subscriptions, draft caching, and async submit
          lifecycle state instead of manually tracking every input with local component state.
        </p>
      </header>

      <section className="hook-form-card">
        <h2>Overview</h2>
        <p>
          Traditional controlled forms often store every keystroke in React state. React Hook Form uses a ref-based
          registration model that keeps form values close to the DOM while exposing validation state, watched values,
          and submission lifecycle flags through focused subscriptions.
        </p>
      </section>

      <section className="hook-form-card">
        <h2>Objectives</h2>
        <ul className="hook-form-checklist">
          <li>Register all form fields with React Hook Form's <code>register</code> function.</li>
          <li>Declare validation rules inside the registration configuration for each field.</li>
          <li>Use <code>watch</code> to compare Confirm Password against the current Password value.</li>
          <li>Use <code>setValue</code> during mount to restore cached drafts from <code>localStorage</code>.</li>
          <li>Use <code>isSubmitting</code> and <code>isValid</code> from <code>formState</code> for button and loading states.</li>
          <li>Reset the form and clear the cached draft after a successful simulated async submission.</li>
          <li>Include at least three normal Vitest cases and three edge Vitest cases.</li>
        </ul>
      </section>

      <section className="hook-form-card">
        <h2>Required Form Fields</h2>
        <div className="hook-form-field-grid">
          <article><strong>Full Name</strong><span>Required, minimum 3 characters.</span></article>
          <article><strong>Email Address</strong><span>Required, robust regex pattern.</span></article>
          <article><strong>Password</strong><span>Required, 8+ characters with uppercase, lowercase, and number.</span></article>
          <article><strong>Confirm Password</strong><span>Required, must match the watched password value.</span></article>
          <article><strong>Role / Account Type</strong><span>Required dropdown with Developer, Designer, Product Manager.</span></article>
          <article><strong>Terms & Conditions</strong><span>Required checkbox that must evaluate to true.</span></article>
        </div>
      </section>

      <UserRegistrationForm submissionDelay={900} />
      <RegistrationFormTestPanel />

      <section className="hook-form-card">
        <h2>Standalone Vite Setup</h2>
        <p>
          Build the standalone version in a Vite React project and install React Hook Form. Component files should use
          the <code>.jsx</code> extension so Vite HMR can update them cleanly during development.
        </p>
        <CodeBlock language="bash" label="Vite + React Hook Form Setup" code={setupSource} />
      </section>

      <section className="hook-form-card">
        <h2>Standalone App Entry</h2>
        <p>
          In a standalone Vite app, keep the app entry small and render the registration component from your main
          application shell.
        </p>
        <CodeBlock language="jsx" label="src/App.jsx" code={appSource} />
      </section>

      <section className="hook-form-card">
        <h2>Completed Source Code</h2>
        <p>
          The completed component avoids manual input state. It registers fields, restores cached drafts with
          <code>setValue</code>, writes watched drafts to <code>localStorage</code>, and uses an async submit handler to
          simulate a network delay before resetting the form.
        </p>
        <CodeBlock language="jsx" label="src/assignments/week07/react-hook-form-registration/UserRegistrationForm.jsx" code={formSource} />
      </section>

      <section className="hook-form-card">
        <h2>Official Vitest Tests</h2>
        <p>
          The tests cover normal helper validation, semantic field rendering, successful async submission, required-field
          errors, password mismatch behavior, malformed draft handling, role metadata, and predictable submission summaries.
        </p>
        <CodeBlock language="jsx" label="src/assignments/week07/react-hook-form-registration/UserRegistrationForm.test.jsx" code={testSource} />
      </section>

      <section className="hook-form-card hook-form-grid-two">
        <div>
          <h2>Manual Testing</h2>
          <ul>
            <li>Confirm Full Name receives focus when the form mounts.</li>
            <li>Submit an empty form and verify each validation message appears.</li>
            <li>Enter a weak password and confirm the password rule blocks submission.</li>
            <li>Enter mismatched passwords and confirm Confirm Password reports the mismatch.</li>
            <li>Fill the form, refresh, and confirm the draft is restored from <code>localStorage</code>.</li>
            <li>Submit valid data and confirm the form resets and the cache is cleared.</li>
          </ul>
        </div>
        <div>
          <h2>Performance Takeaway</h2>
          <p>
            React Hook Form lets the browser own most field values while React subscribes to only the state it needs.
            That keeps large forms responsive, avoids unnecessary controlled-input re-renders, and still gives you strong
            validation and lifecycle state for production-style forms.
          </p>
        </div>
      </section>
    </article>
  )
}
