import UserProfileWithImmer from '../../../exercises/UserProfileWithImmer'
import UserProfileWithImmerTestPanel from './UserProfileWithImmerTestPanel'
import CodeBlock from '../../../components/CodeBlock'
import { annotateDisplayedCode } from '../../../utils/educationalCode'
import componentSource from '../../../exercises/UserProfileWithImmer.jsx?raw'
import testSource from '../../../exercises/UserProfileWithImmer.test.jsx?raw'
import '../../../styles/week03-user-profile-immer-assignment.css'

const installCommands = `npm install immer use-immer`

export default function Week03UserProfileWithImmerAssignmentGuide() {
  return (
    <section className="week03-user-profile-guide">
      <div className="week03-user-profile-guide__hero">
        <div className="week03-user-profile-guide__hero-card">
          <p className="week03-user-profile-guide__kicker">Week 3 Assignment 2</p>
          <h1>State Management with useImmer Hook</h1>
          <p className="week03-user-profile-guide__lede">
            Build a standalone user-profile exercise that manages nested state with the
            <code>useImmer</code> Hook. The goal is to help students move from manual immutable
            updates toward draft-based syntax that is easier to read, easier to teach, and easier
            to maintain when objects become more deeply nested.
          </p>
        </div>

        <div className="week03-user-profile-guide__hero-card">
          <h2>Assignment focus</h2>
          <ul>
            <li>Use a nested <code>userProfile</code> object instead of a single primitive value.</li>
            <li>Update <code>contactDetails</code> without rebuilding every level by hand.</li>
            <li>Toggle <code>newsletter</code> while preserving unrelated state.</li>
            <li>Expose full real code and full real tests as first-class teaching artifacts.</li>
          </ul>
        </div>
      </div>

      <article className="week03-user-profile-guide__section">
        <h2>Overview</h2>
        <p>
          In this assignment, students learn how to manage complex nested React state with
          <code>useImmer</code>. A typical nested update in plain React often requires several spread
          operators because the update must preserve the original object at every level. Immer
          changes the writing experience: the code updates a draft, and Immer produces the next
          immutable state behind the scenes.
        </p>
        <p>
          This makes the assignment especially useful for profile-style data. A profile usually
          contains top-level identity fields, nested contact information, and nested preference
          settings. That is realistic enough to be meaningful, but still small enough for students
          to understand line by line.
        </p>
      </article>

      <article className="week03-user-profile-guide__section">
        <h2>Learning Objectives</h2>
        <ul>
          <li>Initialize nested state with <code>useImmer</code>.</li>
          <li>Update top-level and nested fields using draft syntax.</li>
          <li>Recognize why Immer still preserves React immutability even when the code looks mutable.</li>
          <li>Render controlled inputs that reflect nested state changes immediately.</li>
          <li>Read and explain a real Vitest suite that covers normal flows and edge cases.</li>
        </ul>
      </article>

      <article className="week03-user-profile-guide__section">
        <h2>Step-by-Step Build Strategy</h2>
        <h3>Step 1: Install the Immer utilities</h3>
        <p>
          The standalone assignment instructions mention Vite, and this course platform already uses
          Vite. For this specific assignment, the important package is <code>use-immer</code>, which
          provides the <code>useImmer</code> Hook used in the real exercise implementation below.
        </p>
        <CodeBlock code={installCommands} language="bash" label="Install command" showLineNumbers={false} />

        <h3>Step 2: Create a nested profile shape</h3>
        <p>
          Start with a <code>userProfile</code> object that includes top-level identity data and two
          nested groups: <code>contactDetails</code> and <code>preferences</code>. This lets students
          practice both object updates and nested property updates in a single component.
        </p>

        <h3>Step 3: Update nested contact fields with a focused helper</h3>
        <p>
          Instead of repeating separate Immer update logic in each input handler, build an
          <code>updateContactDetails</code> helper. That keeps the state transition readable and makes
          it clear that both <code>phone</code> and <code>address</code> belong to the same nested
          branch of the state tree.
        </p>

        <h3>Step 4: Toggle newsletter safely</h3>
        <p>
          A newsletter checkbox is a useful teaching case because it shows a boolean flip. The code
          can update <code>draft.preferences.newsletter</code> directly while leaving the rest of the
          profile untouched.
        </p>

        <h3>Step 5: Render structured feedback</h3>
        <p>
          The UI should not hide the state changes. Render the profile as readable list items and as
          a formatted JSON block. That combination helps students connect the visible UI to the
          actual nested object stored in React state.
        </p>
      </article>

      <article className="week03-user-profile-guide__section">
        <h2>Working Demo</h2>
        <div className="week03-user-profile-guide__demo-shell">
          <UserProfileWithImmer />
        </div>
      </article>

      <article className="week03-user-profile-guide__section">
        <h2>Why useImmer is valuable here</h2>
        <div className="week03-user-profile-guide__grid">
          <div>
            <h3>Without Immer</h3>
            <p>
              A manual update often looks like a staircase of spread operators. The code must copy
              the parent object, then copy the nested object, then replace the specific nested field.
              That is correct React thinking, but it becomes noisy as nesting grows.
            </p>
          </div>
          <div>
            <h3>With Immer</h3>
            <p>
              The update logic can focus on intent: which field changed and what the new value should
              be. The draft syntax reads more like direct editing, but Immer still creates the new
              immutable state snapshot React expects.
            </p>
          </div>
        </div>
      </article>

      <article className="week03-user-profile-guide__section">
        <h2>Full Exercise Code</h2>
        <p>
          The code block below mirrors the real component file from this project. Extra educational
          comments are layered in automatically so students can study the syntax line by line without
          switching away from the assignment guide.
        </p>
        <CodeBlock
          code={annotateDisplayedCode(componentSource, 'react')}
          language="jsx"
          label="src/exercises/UserProfileWithImmer.jsx"
        />
      </article>

      <article className="week03-user-profile-guide__section">
        <h2>Testing Expectations</h2>
        <div className="week03-user-profile-guide__checklist">
          <div>
            <h3>Normal cases</h3>
            <p>Render the initial profile, update fields successfully, and toggle newsletter status.</p>
          </div>
          <div>
            <h3>Edge cases</h3>
            <p>Handle blank names safely and prove unrelated nested state stays stable during targeted updates.</p>
          </div>
          <div>
            <h3>Teaching goal</h3>
            <p>The tests should explain behavior, not just validate it. Students should understand why each assertion exists.</p>
          </div>
        </div>
      </article>

      <article className="week03-user-profile-guide__section">
        <h2>Full Test File</h2>
        <p>
          The guide intentionally displays the real test file in full. This keeps the assignment
          transparent: students can see the exact success cases and edge cases the standalone
          exercise must satisfy.
        </p>
        <CodeBlock
          code={annotateDisplayedCode(testSource, 'test')}
          language="jsx"
          label="src/exercises/UserProfileWithImmer.test.jsx"
        />
      </article>

      <article className="week03-user-profile-guide__section">
        <h2>How to run the tests</h2>
        <ol>
          <li>Open the project root in your terminal.</li>
          <li>Run <code>npm install</code> if dependencies are not already installed.</li>
          <li>Run <code>npm test -- UserProfileWithImmer.test.jsx</code> or just <code>npm test</code>.</li>
          <li>Compare the formal results with the visible Live Test Results panel below.</li>
        </ol>
      </article>

      <article className="week03-user-profile-guide__section">
        <h2>Common Mistakes to avoid</h2>
        <ul>
          <li>Mutating state outside the Immer updater callback.</li>
          <li>Assuming draft syntax means React state is being mutated directly.</li>
          <li>Forgetting that controlled inputs should always read from current state.</li>
          <li>Updating one nested field while accidentally overwriting sibling data.</li>
        </ul>
      </article>

      <article className="week03-user-profile-guide__section">
        <h2>Student Takeaways</h2>
        <p>
          By the end of this assignment, students should understand that Immer does not replace React
          state principles. Instead, it provides a more ergonomic way to express those principles.
          The code still respects immutability, but the syntax becomes easier to read when nested
          state grows in complexity.
        </p>
      </article>

      <UserProfileWithImmerTestPanel />
    </section>
  )
}
