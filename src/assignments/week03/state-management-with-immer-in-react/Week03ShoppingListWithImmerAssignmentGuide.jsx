import ShoppingListWithImmer from '../../../exercises/ShoppingListWithImmer'
import ShoppingListWithImmerTestPanel from './ShoppingListWithImmerTestPanel'
import CodeBlock from '../../../components/CodeBlock'
import { annotateDisplayedCode } from '../../../utils/educationalCode'
import componentSource from '../../../exercises/ShoppingListWithImmer.jsx?raw'
import testSource from '../../../exercises/ShoppingListWithImmer.test.jsx?raw'
import '../../../styles/week03-shopping-list-immer-assignment.css'

const installCommands = `npm install use-immer`

export default function Week03ShoppingListWithImmerAssignmentGuide() {
  return (
    <section className="assignment-guide-shell week03-immer-guide">
      <div className="assignment-hero week03-immer-guide__hero">
        <p className="week03-immer-guide__kicker">Week 3 Assignment</p>
        <h1>State Management with Immer in React</h1>
        <p className="week03-immer-guide__lede">
          Build a standalone shopping-list exercise that uses <code>useImmer</code> to manage
          an array of shopping items with nested details. Students should be able to add items,
          update nested properties, remove items, and verify the behavior with both visible checks
          and Vitest tests.
        </p>
      </div>

      <article className="assignment-section week03-immer-guide__section">
        <h2>Overview</h2>
        <p>
          In this assignment, you will learn to manage more complex React state using the
          <code>useImmer</code> Hook from the <code>use-immer</code> package. Instead of
          manually rebuilding arrays and nested objects with repeated spread syntax, you will
          update a draft version of state and let Immer preserve immutability for you.
        </p>
        <p>
          The exercise uses a shopping list because it combines array operations with nested
          object data. That makes it a strong example of when draft-based state updates are
          easier to read than manual immutable update patterns.
        </p>
      </article>

      <article className="assignment-section week03-immer-guide__section">
        <h2>Learning Objectives</h2>
        <ul>
          <li>Initialize array-based React state with <code>useImmer</code>.</li>
          <li>Create shopping-list items with nested <code>details</code> data.</li>
          <li>Update existing items by editing the matching draft object directly.</li>
          <li>Remove items from draft state safely and predictably.</li>
          <li>Write automated tests for both normal flows and edge-case behavior.</li>
        </ul>
      </article>

      <article className="assignment-section week03-immer-guide__section">
        <h2>Step-by-Step Build Instructions</h2>

        <h3>Step 1: Install the Immer Hook package</h3>
        <p>
          The project already includes <code>immer</code>, but this assignment also needs the
          <code>useImmer</code> Hook from the <code>use-immer</code> package.
        </p>
        <CodeBlock
          code={installCommands}
          language="bash"
          label="Install command"
          showLineNumbers={false}
        />

        <h3>Step 2: Create the standalone exercise file</h3>
        <p>
          Create <code>src/exercises/ShoppingListWithImmer.jsx</code>. Keep this component
          standalone so it can be rendered independently of the larger course shell.
        </p>

        <h3>Step 3: Initialize array state with nested item objects</h3>
        <p>
          Use <code>useImmer</code> to create a shopping-list array. Each item should include
          <code>id</code>, <code>name</code>, <code>quantity</code>, and a nested
          <code>details</code> object with <code>category</code> and <code>notes</code>.
        </p>

        <h3>Step 4: Add an item with a draft update</h3>
        <p>
          Create an <code>addItem</code> handler that pushes a new item object into the draft
          array. This shows how Immer lets you write intent-first update logic while still
          preserving immutable React state internally.
        </p>

        <h3>Step 5: Update an existing nested item</h3>
        <p>
          Create an <code>updateItem</code> helper that finds an item by <code>id</code> and
          updates properties directly on the matching draft object, including nested fields
          such as <code>details.notes</code>.
        </p>

        <h3>Step 6: Remove an item safely</h3>
        <p>
          Create a <code>removeItem</code> helper that removes an item by <code>id</code>. You
          can use <code>splice</code> after locating the matching index in the draft array.
        </p>

        <h3>Step 7: Build a UI that makes state changes visible</h3>
        <p>
          Render the shopping-list items and include controls that let the user add, update,
          and remove items. The list should update immediately so the state transitions are easy
          to observe in real time.
        </p>

        <h3>Step 8: Test both normal behavior and edge cases</h3>
        <p>
          Write at least three normal-case tests and at least three edge-case tests. Your suite
          should verify adding items, updating nested details, removing items, and handling
          invalid input safely.
        </p>
      </article>

      <article className="assignment-section week03-immer-guide__section">
        <h2>Live standalone preview</h2>
        <p>
          The rendered exercise below is the real standalone component from <code>src/exercises</code>.
          Students can interact with it here, then compare the behavior to the displayed source
          file and test suite.
        </p>
        <div className="week03-immer-guide__demo-shell">
          <ShoppingListWithImmer />
        </div>
      </article>

      <article className="assignment-section week03-immer-guide__section">
        <h2>Full Exercise Code</h2>
        <p>
          This code block mirrors the real implementation file and then layers in deeper
          educational comments so the syntax reads like a guided walkthrough.
        </p>
        <CodeBlock
          code={annotateDisplayedCode(componentSource, 'react')}
          language="jsx"
          label="ShoppingListWithImmer.jsx"
        />
      </article>

      <article className="assignment-section week03-immer-guide__section">
        <h2>Full Test Suite</h2>
        <p>
          These tests cover both normal behavior and edge cases so students can connect the
          user experience they see in the browser to the formal expectations in the automated
          test layer.
        </p>
        <CodeBlock
          code={annotateDisplayedCode(testSource, 'test')}
          language="jsx"
          label="ShoppingListWithImmer.test.jsx"
        />
      </article>

      <article className="assignment-section week03-immer-guide__section">
        <h2>Manual Verification Checklist</h2>
        <ol>
          <li>Add a new shopping item and confirm that it appears in the rendered list.</li>
          <li>Update an existing item and verify that nested notes change correctly.</li>
          <li>Remove an item and confirm that the remaining items stay intact.</li>
          <li>Try a blank item name and confirm that no invalid item is added.</li>
          <li>Try an invalid quantity and confirm that the component handles it safely.</li>
        </ol>
      </article>

      <article className="assignment-section week03-immer-guide__section">
        <h2>Run the Automated Tests</h2>
        <ol>
          <li><code>npm install</code></li>
          <li><code>npm install use-immer</code></li>
          <li><code>npx vitest run src/exercises/ShoppingListWithImmer.test.jsx</code></li>
          <li><code>npm run dev</code></li>
        </ol>
        <p>
          The visual test panel below supports the learning experience, but the Vitest file
          remains the official automated verification layer.
        </p>
      </article>

      <ShoppingListWithImmerTestPanel />

      <article className="assignment-section week03-immer-guide__section">
        <h2>Common Mistakes and Takeaways</h2>
        <ul>
          <li>Do not mutate state outside the <code>useImmer</code> draft callback.</li>
          <li>Make sure updates target the correct item by <code>id</code>.</li>
          <li>Remember that nested fields such as <code>details.notes</code> still need clear update logic.</li>
          <li>Keep the displayed guide code aligned with the real exercise and test files.</li>
        </ul>
      </article>
    </section>
  )
}
