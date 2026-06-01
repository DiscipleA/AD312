import CodeBlock from '../components/CodeBlock'
import ChartJsPollDashboardTestPanel from './ChartJsPollDashboardTestPanel'
import DynamicPollDashboard from '../assignments/week08/chartjs-poll-dashboard/DynamicPollDashboard'
import sourceSyntax from '../assignments/week08/chartjs-poll-dashboard/DynamicPollDashboard.jsx?raw'
import vitestSyntax from '../assignments/week08/chartjs-poll-dashboard/DynamicPollDashboard.test.jsx?raw'
import '../styles/week08-chartjs-poll-dashboard-assignment.css'

export default function Week08ChartJsPollDashboardAssignmentGuide() {
  return (
    <article className="chart-assignment-guide">
      <header className="chart-assignment-hero chart-assignment-card">
        <p className="chart-assignment-kicker">AD312 • Week 08 • Assignment 03</p>
        <h1>Bridging React with Non-React Libraries: Chart.js Integration</h1>
        <p>
          Build a dynamic poll dashboard that uses React state for voting while safely controlling a raw
          Chart.js bar chart through refs, useEffect, imperative updates, and cleanup.
        </p>
      </header>

      <section className="chart-assignment-card">
        <h2>Assignment Objective</h2>
        <p>
          React manages UI through declarative state, but many professional libraries expect direct control
          over real DOM nodes. This assignment uses Chart.js as a non-React library so you can practice
          using useEffect as a controlled escape hatch.
        </p>
      </section>

      <section className="chart-assignment-card chart-requirements-card">
        <h2>Required Technical Checks</h2>
        <ul className="chart-checklist">
          <li>Use a canvas ref so Chart.js receives a real DOM canvas node.</li>
          <li>Use chartInstanceRef.current to store the imperative Chart.js instance between renders.</li>
          <li>Instantiate new Chart(canvasRef.current, config) only when no chart instance exists.</li>
          <li>When React votes state changes, mutate the existing chart data and call .update().</li>
          <li>Return cleanup that calls .destroy() so Chart.js releases canvas resources and event listeners.</li>
          <li>Add the required comment explaining why repeated new Chart() calls can break canvas rendering.</li>
        </ul>
      </section>

      <section className="chart-preview-card">
        <div className="chart-preview-header">
          <p className="chart-assignment-kicker">Working Preview</p>
          <h2>Dynamic Poll Dashboard</h2>
          <p>
            Click the voting buttons. React updates the vote state, then the effect synchronizes those
            values into the existing Chart.js instance without creating a second chart on the same canvas.
          </p>
        </div>

        <DynamicPollDashboard />
      </section>

      <ChartJsPollDashboardTestPanel />

      <section className="chart-assignment-card">
        <h2>Implementation Notes</h2>
        <p>
          The component separates React-owned state from Chart.js-owned canvas drawing. React handles the
          button clicks and vote totals. Chart.js owns the bar chart object, which is stored in a ref so it
          survives re-renders without becoming React state.
        </p>
        <p>
          The source uses one effect for safe Chart.js creation and teardown, and a second effect for pushing
          fresh vote values into the already-created chart. That keeps the lifecycle clean while still proving
          the important professional pattern: instantiate once, update imperatively, destroy on cleanup.
        </p>
      </section>

      <section className="chart-assignment-card">
        <h2>Completed Source Code</h2>
        <p>
          The source includes detailed comments explaining refs, canvas ownership, Chart.js instantiation,
          state synchronization, .update(), .destroy(), and why unmanaged repeated chart creation causes errors.
        </p>
        <CodeBlock code={sourceSyntax} language="jsx" />
      </section>

      <section className="chart-assignment-card">
        <h2>Vitest Coverage</h2>
        <p>
          The official tests include normal and edge cases for poll helpers plus component-level checks that
          Chart.js is instantiated once, updated after a vote, and destroyed during cleanup.
        </p>
        <CodeBlock code={vitestSyntax} language="jsx" />
      </section>

      <section className="chart-assignment-card">
        <h2>How to Run the Tests</h2>
        <CodeBlock
          language="bash"
          code={`npm install\nnpm test -- src/assignments/week08/chartjs-poll-dashboard/DynamicPollDashboard.test.jsx\nnpm run build`}
        />
      </section>

      <section className="chart-assignment-card">
        <h2>Manual Verification</h2>
        <ul className="chart-checklist">
          <li>Open the working preview and confirm the Chart.js canvas renders without errors.</li>
          <li>Click each voting button and confirm the visible vote count increments for the matching framework.</li>
          <li>Confirm the chart bars update after React vote state changes instead of creating a second chart.</li>
          <li>Use Reset Poll and confirm every vote total returns to zero while the chart remains mounted and usable.</li>
          <li>Navigate away from the assignment and return to confirm the Chart.js instance is destroyed and recreated safely.</li>
          <li>Run the Vitest command to verify helper logic, voting edge cases, chart instantiation, chart updates, and cleanup.</li>
        </ul>
      </section>

      <section className="chart-assignment-card">
        <h2>Key Takeaways</h2>
        <ul className="chart-checklist">
          <li><strong>Refs bridge React to imperative libraries:</strong> canvasRef provides the real DOM node and chartInstanceRef stores the Chart.js object.</li>
          <li><strong>React owns the data, Chart.js owns the drawing:</strong> votes live in React state while the chart renders through its own canvas API.</li>
          <li><strong>Do not create a new chart on every render:</strong> reuse the existing instance, mutate its dataset, and call .update().</li>
          <li><strong>Cleanup is required:</strong> .destroy() releases Chart.js canvas ownership, listeners, and cached rendering resources.</li>
          <li><strong>useEffect is the escape hatch:</strong> it lets React coordinate safely with libraries that were not designed for React.</li>
        </ul>
      </section>

      <section className="chart-assignment-card">
        <h2>Summary</h2>
        <p>
          This assignment demonstrates the main useEffect pattern for non-React libraries: grab a real DOM
          node with a ref, create the library instance at the right time, keep React state synchronized with
          imperative library APIs, and clean up resources when React removes the component.
        </p>
      </section>
    </article>
  )
}
