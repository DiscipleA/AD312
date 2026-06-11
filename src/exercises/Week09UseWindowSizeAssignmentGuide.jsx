import CodeBlock from '../components/CodeBlock'
import UseWindowSizeTestPanel from './UseWindowSizeTestPanel'
import StreamingWindowSizeDemo from '../assignments/week09/custom-use-window-size-hook/StreamingWindowSizeDemo'
import hookSyntax from '../assignments/week09/custom-use-window-size-hook/useWindowSize.js?raw'
import demoSyntax from '../assignments/week09/custom-use-window-size-hook/StreamingWindowSizeDemo.jsx?raw'
import vitestSyntax from '../assignments/week09/custom-use-window-size-hook/StreamingWindowSizeDemo.test.jsx?raw'
import '../styles/week09-use-window-size-assignment.css'

export default function Week09UseWindowSizeAssignmentGuide() {
  return (
    <article className="use-window-assignment-guide">
      <header className="use-window-assignment-hero use-window-card">
        <p className="use-window-kicker">AD312 • Week 09 • Assignment 02</p>
        <h1>Packaging Reusable Logic into a Custom Hook</h1>
        <p>
          Build a reusable <code>useWindowSize</code> hook for a streaming website so components can
          instantly read the browser width and height, switch between mobile and full layouts, and avoid
          duplicating resize-event logic across the application.
        </p>
      </header>

      <section className="use-window-card">
        <h2>Assignment Objective</h2>
        <p>
          A streaming website needs a compact mobile layout for phones and a full-sized layout for laptops.
          The hook below packages browser window tracking into a reusable function so the layout decision can
          be shared by any component that imports the hook.
        </p>
      </section>

      <section className="use-window-card use-window-requirements-card">
        <h2>Required Technical Checks</h2>
        <ul className="use-window-checklist">
          <li>Create a custom hook whose function name starts with <code>use</code>.</li>
          <li>Use React state to store the browser&apos;s current width and height.</li>
          <li>Use <code>useEffect</code> to synchronize React state with the browser resize event.</li>
          <li>Remove the resize event listener during cleanup to prevent duplicate listeners and memory leaks.</li>
          <li>Include detailed educational comments explaining the hook, the effect, and the cleanup logic.</li>
          <li>Provide at least three normal test cases and three edge test cases.</li>
        </ul>
      </section>

      <section className="use-window-preview-card">
        <div className="use-window-preview-header">
          <p className="use-window-kicker">Working Preview</p>
          <h2>Streaming Layout Preview</h2>
          <p>
            Resize the browser window or use the preview controls. The hook still reads the real browser
            width and height, while the simulator makes phone, tablet, and laptop layout changes visible
            directly inside the working preview.
          </p>
        </div>

        <StreamingWindowSizeDemo />
      </section>

      <UseWindowSizeTestPanel />

      <section className="use-window-card">
        <h2>Implementation Notes</h2>
        <p>
          The custom hook is intentionally separated from the streaming preview. That separation is the key
          learning goal: the hook owns the reusable browser synchronization logic, while the component owns the
          visual decision about how a streaming website should respond to that data.
        </p>
        <p>
          The helper functions are exported with the hook so the Live Test Results panel and Vitest suite can
          test layout decisions without needing to manually resize the browser for every case.
        </p>
      </section>

      <section className="use-window-card">
        <h2>Custom Hook Source Code</h2>
        <p>
          This source includes detailed comments explaining the custom-hook naming rule, the state initializer,
          the resize handler, the useEffect lifecycle, the empty dependency array, and the cleanup function.
        </p>
        <CodeBlock code={hookSyntax} language="js" />
      </section>

      <section className="use-window-card">
        <h2>Streaming Preview Component Source Code</h2>
        <p>
          The preview component imports the hook, receives the live browser size, and translates that size into
          a streaming layout profile with a simple viewport-width chart.
        </p>
        <CodeBlock code={demoSyntax} language="jsx" />
      </section>

      <section className="use-window-card">
        <h2>Vitest Coverage</h2>
        <p>
          The official tests include normal cases for laptop, tablet, and phone widths plus edge cases for one
          pixel below the breakpoint, the exact breakpoint, invalid widths, resize updates, and cleanup behavior.
        </p>
        <CodeBlock code={vitestSyntax} language="jsx" />
      </section>

      <section className="use-window-card">
        <h2>How to Run the Tests</h2>
        <CodeBlock
          language="bash"
          code={`npm test -- src/assignments/week09/custom-use-window-size-hook/StreamingWindowSizeDemo.test.jsx\nnpm run build`}
        />
      </section>

      <section className="use-window-card">
        <h2>Manual Verification</h2>
        <ul className="use-window-checklist">
          <li>Open the working preview and confirm the current browser width and height are visible.</li>
          <li>Resize below 768px and confirm the layout reports Mobile.</li>
          <li>Resize to 768px or wider and confirm the layout reports Full.</li>
          <li>Use the Live Test Results buttons and confirm all normal and edge cases pass.</li>
          <li>Review the chart and confirm narrower widths show shorter bars than wider widths.</li>
          <li>Run the Vitest command to confirm resize behavior and cleanup are tested automatically.</li>
        </ul>
      </section>

      <section className="use-window-card">
        <h2>Key Takeaways</h2>
        <ul className="use-window-checklist">
          <li><strong>Custom hooks package reusable logic:</strong> components can share browser-size state without duplicating event code.</li>
          <li><strong>useEffect synchronizes with external systems:</strong> the browser resize event lives outside React, so the hook subscribes after mount.</li>
          <li><strong>Cleanup matters:</strong> removing the listener prevents old components from responding after they unmount.</li>
          <li><strong>State drives rendering:</strong> when the resize handler updates width and height, React re-renders the consuming component.</li>
          <li><strong>Helper functions improve testing:</strong> breakpoint logic can be tested directly and also demonstrated visually in the GUI.</li>
        </ul>
      </section>

      <section className="use-window-card">
        <h2>Summary</h2>
        <p>
          This assignment demonstrates how a custom hook turns browser window tracking into a reusable package.
          The hook reads the current size, keeps state synchronized through useEffect, removes its listener during
          cleanup, and gives the streaming preview a clean way to choose the correct responsive layout.
        </p>
      </section>
    </article>
  )
}
