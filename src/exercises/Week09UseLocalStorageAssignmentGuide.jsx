import CodeBlock from '../components/CodeBlock'
import UseLocalStorageTestPanel from './UseLocalStorageTestPanel'
import StreamingPreferencesDemo from '../assignments/week09/custom-use-local-storage-hook/StreamingPreferencesDemo'
import hookSyntax from '../assignments/week09/custom-use-local-storage-hook/useLocalStorage.js?raw'
import demoSyntax from '../assignments/week09/custom-use-local-storage-hook/StreamingPreferencesDemo.jsx?raw'
import vitestSyntax from '../assignments/week09/custom-use-local-storage-hook/StreamingPreferencesDemo.test.jsx?raw'
import '../styles/week09-use-local-storage-assignment.css'

export default function Week09UseLocalStorageAssignmentGuide() {
  return (
    <article className="local-storage-assignment-guide">
      <header className="local-storage-assignment-hero local-storage-card">
        <p className="local-storage-kicker">AD312 • Week 09 • Assignment 03</p>
        <h1>Syncing State with LocalStorage using a Custom Hook</h1>
        <p>
          Build a reusable <code>useLocalStorage</code> hook that behaves like React state while automatically
          backing up preference changes to the browser so the user&apos;s settings survive page refreshes.
        </p>
      </header>

      <section className="local-storage-card">
        <h2>Assignment Objective</h2>
        <p>
          A streaming website should remember the user&apos;s theme, captions, autoplay, volume, quality, and saved
          shows. Instead of repeating localStorage code inside every component, this assignment packages the
          loading and saving behavior into one reusable custom hook.
        </p>
      </section>

      <section className="local-storage-card local-storage-requirements-card">
        <h2>Required Technical Checks</h2>
        <ul className="local-storage-checklist">
          <li>Create a custom hook called <code>useLocalStorage</code>.</li>
          <li>Combine React <code>useState</code> with the browser&apos;s <code>localStorage</code> API.</li>
          <li>Use the function form of <code>useState</code> to load initial data safely only once.</li>
          <li>Use <code>useEffect</code> to watch state updates and automatically back up the newest value.</li>
          <li>Explain every important hook and component decision with detailed code comments.</li>
          <li>Provide at least three normal test cases and three edge test cases.</li>
        </ul>
      </section>

      <section className="local-storage-preview-card">
        <div className="local-storage-preview-header">
          <p className="local-storage-kicker">Working Preview</p>
          <h2>Persistent Streaming Preferences</h2>
          <p>
            Change the GUI controls, refresh the page, and the preferences remain. The hook owns browser
            persistence, while the component focuses on rendering the streaming-site experience.
          </p>
        </div>
        <StreamingPreferencesDemo />
      </section>

      <UseLocalStorageTestPanel />

      <section className="local-storage-card">
        <h2>Implementation Notes</h2>
        <p>
          The hook intentionally mirrors the familiar <code>useState</code> API. The consuming component receives a
          value and setter, but the hook adds browser backup behavior through localStorage and useEffect.
        </p>
        <p>
          The working preview also includes a mock API simulation. This keeps the assignment faithful to browser
          storage while showing how persisted user preferences could later be synchronized with a backend service.
        </p>
      </section>

      <section className="local-storage-card">
        <h2>Custom Hook Source Code</h2>
        <p>
          The hook source includes detailed comments for lazy state initialization, safe JSON parsing, automatic
          backup with useEffect, setter compatibility, reset behavior, and storage error handling.
        </p>
        <CodeBlock code={hookSyntax} language="js" />
      </section>

      <section className="local-storage-card">
        <h2>Streaming Preferences Component Source Code</h2>
        <p>
          The component source explains how the hook is consumed, why immutable updates matter, how the mock API
          payload is produced, and how the chart dashboard reflects the current preference state.
        </p>
        <CodeBlock code={demoSyntax} language="jsx" />
      </section>

      <section className="local-storage-card">
        <h2>Vitest Coverage</h2>
        <p>
          The official tests include normal cases for lazy initialization, valid storage reads, and JSON writes,
          plus edge cases for malformed JSON, missing storage, unexpected data shape, loading stored preferences,
          reset behavior, and the API simulation.
        </p>
        <CodeBlock code={vitestSyntax} language="jsx" />
      </section>

      <section className="local-storage-card">
        <h2>How to Run the Tests</h2>
        <CodeBlock
          language="bash"
          code={`npm test -- src/assignments/week09/custom-use-local-storage-hook/StreamingPreferencesDemo.test.jsx\nnpm run build`}
        />
      </section>

      <section className="local-storage-card">
        <h2>Manual Verification</h2>
        <ul className="local-storage-checklist">
          <li>Switch to Dark Mode, refresh the page, and confirm the dark preference remains.</li>
          <li>Change volume, quality, captions, and autoplay, then confirm the chart dashboard updates.</li>
          <li>Add and remove saved shows to confirm array state is persisted immutably.</li>
          <li>Click Simulate API Sync to see the mock backend status move from pending/saving to synced.</li>
          <li>Click Reset Browser Preference and confirm the preview returns to the default preference object.</li>
          <li>Run the Live Test Results and Vitest suite to confirm normal and edge cases pass.</li>
        </ul>
      </section>

      <section className="local-storage-card">
        <h2>Key Takeaways</h2>
        <ul className="local-storage-checklist">
          <li><strong>Custom hooks remove duplication:</strong> localStorage logic lives in one reusable package.</li>
          <li><strong>Lazy initialization is safer:</strong> the browser backup is read only during the first state setup.</li>
          <li><strong>useEffect performs the backup:</strong> whenever state changes, the hook serializes the newest value.</li>
          <li><strong>Components stay clean:</strong> the streaming preview updates preferences without directly calling localStorage.</li>
          <li><strong>Storage needs guardrails:</strong> malformed JSON and unavailable storage should not crash the UI.</li>
        </ul>
      </section>

      <section className="local-storage-card">
        <h2>Summary</h2>
        <p>
          This assignment demonstrates how a custom hook can combine React state with browser persistence. The
          hook safely loads initial data, automatically saves updates, exposes a familiar setter API, and lets the
          streaming preference component keep its code focused on the user experience.
        </p>
      </section>
    </article>
  )
}
