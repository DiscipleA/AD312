import CodeBlock from '../components/CodeBlock'
import ResponsiveCanvasTestPanel from './ResponsiveCanvasTestPanel'
import ResponsiveCanvas from '../assignments/week08/responsive-canvas-useeffect/ResponsiveCanvas'
import sourceSyntax from '../assignments/week08/responsive-canvas-useeffect/ResponsiveCanvas.jsx?raw'
import vitestSyntax from '../assignments/week08/responsive-canvas-useeffect/ResponsiveCanvas.test.jsx?raw'
import '../styles/week08-responsive-canvas-assignment.css'

export default function Week08ResponsiveCanvasAssignmentGuide() {
  return (
    <article className="responsive-canvas-assignment-guide">
      <header className="responsive-assignment-hero responsive-assignment-card">
        <p className="responsive-assignment-kicker">AD312 • Week 08 • Assignment 02</p>
        <h1>Mastering useEffect with a Responsive Canvas</h1>
        <p>
          Build a Vite React component that synchronizes with the browser window size using useEffect,
          displays live width and height values, switches between Mobile and Desktop modes, and cleans
          up the resize listener to prevent memory leaks.
        </p>
      </header>

      <section className="responsive-assignment-card">
        <h2>Assignment Objective</h2>
        <p>
          The purpose of this assignment is to practice React side effects. The component must interact
          with an external browser system, the window resize event, while keeping React state synchronized
          with the current viewport dimensions.
        </p>
      </section>

      <section className="responsive-assignment-card responsive-requirements-card">
        <h2>Required Technical Checks</h2>
        <ul className="responsive-checklist">
          <li>Track window.innerWidth and window.innerHeight in React state.</li>
          <li>Attach a resize listener with window.addEventListener inside useEffect.</li>
          <li>Return a cleanup function that removes the resize listener on unmount.</li>
          <li>Display the current width and height directly in the UI.</li>
          <li>Switch the visual mode between Mobile and Desktop at the responsive breakpoint.</li>
          <li>Include a dependency-array comment explaining why an empty dependency array is used.</li>
        </ul>
      </section>

      <section className="responsive-preview-card">
        <div className="responsive-preview-header">
          <p className="responsive-assignment-kicker">Working Preview</p>
          <h2>Responsive Canvas Demo</h2>
          <p>
            Resize the browser or device preview area. The canvas preview below reads the live window dimensions,
            updates state after each resize event, and changes its presentation between Mobile and Desktop.
          </p>
        </div>

        <ResponsiveCanvas />
      </section>

      <ResponsiveCanvasTestPanel />

      <section className="responsive-assignment-card">
        <h2>Implementation Notes</h2>
        <p>
          This solution uses useEffect because the component must synchronize with a system outside
          React: the browser window. The effect attaches one resize listener on mount, updates state from
          the current browser dimensions, and removes that same listener during cleanup.
        </p>
        <p>
          The breakpoint helper is intentionally separated from the visual component so both the UI and
          tests use the same rule: widths below 768px are Mobile, and widths at 768px or wider are Desktop.
        </p>
      </section>

      <section className="responsive-assignment-card">
        <h2>Completed Source Code</h2>
        <p>
          The source includes detailed comments around the useEffect setup, the resize handler, the cleanup
          obligation, the empty dependency array, and the helper functions used by the Live Test Results panel.
        </p>
        <CodeBlock code={sourceSyntax} language="jsx" />
      </section>

      <section className="responsive-assignment-card">
        <h2>Vitest Coverage</h2>
        <p>
          The official tests include three normal cases and three edge cases. They verify desktop rendering,
          mobile rendering, resize-state updates, breakpoint boundaries, safe helper behavior, and cleanup of
          the resize listener when the component unmounts.
        </p>
        <CodeBlock code={vitestSyntax} language="jsx" />
      </section>

      <section className="responsive-assignment-card">
        <h2>How to Run the Tests</h2>
        <CodeBlock
          language="bash"
          code={`npm test -- src/assignments/week08/responsive-canvas-useeffect/ResponsiveCanvas.test.jsx\nnpm run build`}
        />
      </section>

      <section className="responsive-assignment-card">
        <h2>Manual Verification</h2>
        <ul className="responsive-checklist">
          <li>Open the working preview and confirm the current width and height are visible on screen.</li>
          <li>Resize the browser wider than 768px and confirm the component reports Desktop mode.</li>
          <li>Resize the browser below 768px and confirm the component reports Mobile mode.</li>
          <li>Confirm the layout description, background label, and breakpoint rule update with the mode.</li>
          <li>Navigate away from the assignment and return to confirm the resize listener cleanup does not leave duplicate behavior behind.</li>
          <li>Run the Vitest command to verify the normal cases, breakpoint edge cases, and cleanup behavior.</li>
        </ul>
      </section>

      <section className="responsive-assignment-card">
        <h2>Key Takeaways</h2>
        <ul className="responsive-checklist">
          <li><strong>useEffect is the synchronization boundary:</strong> it connects React state to browser events that React does not control directly.</li>
          <li><strong>The resize handler translates browser data into React state:</strong> window.innerWidth and window.innerHeight become renderable UI values.</li>
          <li><strong>The empty dependency array creates one stable lifecycle:</strong> the listener is attached once on mount and removed once on unmount.</li>
          <li><strong>Cleanup prevents memory leaks:</strong> removing the same handler reference keeps old components from responding after they leave the page.</li>
          <li><strong>Breakpoint helpers make testing easier:</strong> the Mobile/Desktop rule can be verified without manually resizing the browser every time.</li>
        </ul>
      </section>

      <section className="responsive-assignment-card">
        <h2>Summary</h2>
        <p>
          This assignment demonstrates the complete useEffect lifecycle for browser event synchronization:
          initialize state, attach the external listener, update React state from the handler, document the
          dependency array, and clean up the listener to prevent memory leaks.
        </p>
      </section>
    </article>
  )
}
