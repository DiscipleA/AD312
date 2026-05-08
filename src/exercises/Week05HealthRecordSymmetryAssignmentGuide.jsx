import HealthRecordSymmetryExplorer from '../assignments/week05/health-record-symmetry/HealthRecordSymmetryExplorer'
import solutionSyntax from '../assignments/week05/health-record-symmetry/HealthRecordSymmetry.js?raw'
import consoleTestSyntax from '../assignments/week05/health-record-symmetry/HealthRecordSymmetry.console-tests.js?raw'
import HealthRecordSymmetryTestPanel from './HealthRecordSymmetryTestPanel'
import '../styles/week05-health-record-symmetry-assignment.css'
import CodeBlock from '../components/CodeBlock'

const starterSyntax = `class Node {
  constructor(val, next = null) { this.val = val; this.next = next; }
}

function isHealthRecordSymmetric(head) {
  let slow = head, fast = head, prev = null;
  // 1. Find the middle of the list
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }
  // 2. Reverse the second half of the list
  while (slow) {
    let temp = slow.next;
    slow.next = prev;
    prev = slow;
    slow = temp;
  }
  // 3. Compare the first half and the reversed second half
  let left = head, right = prev;
  while (right) {
    if (left.val !== right.val) return false;
    left = left.next;
    right = right.next;
  }
  return true;
}`

export default function Week05HealthRecordSymmetryAssignmentGuide() {
  return (
    <article className="health-assignment-guide">
      <header className="health-hero-card health-card">
        <p className="health-kicker">AD312 • Week 05 • Assignment 01</p>
        <h1>Patient Health Record Symmetry with Singly Linked Lists</h1>
        <p>
          Build a raw JavaScript function that analyzes a patient health record represented as a singly
          linked list and determines whether the sequence of metric readings forms a symmetrical pattern.
        </p>
      </header>

      <section className="health-card">
        <div>
          <h2>Background</h2>
          <p>
            Healthcare records often contain time-series readings such as blood sugar, heart rate,
            oxygen saturation, or other vital signs. A symmetrical sequence can suggest that a patient
            returned to a baseline state after treatment or that a condition is recurring in a cyclic pattern.
          </p>
        </div>
        <div>
          <h2>Objective</h2>
          <p>
            Implement <code>isHealthRecordSymmetric(head)</code>. The function should return <code>true</code>
            when the linked-list values read the same forward and backward, and <code>false</code> otherwise.
          </p>
        </div>
      </section>

      <section className="health-card">
        <h2>Requirements</h2>
        <ul className="health-checklist">
          <li>Use raw JavaScript only for the assignment logic.</li>
          <li>Define a singly linked-list node with one metric value and one <code>next</code> reference.</li>
          <li>Create <code>isHealthRecordSymmetric(head)</code>.</li>
          <li>Use an efficient O(n) time approach.</li>
          <li>Use O(1) extra algorithm space by reversing the second half of the list in-place.</li>
          <li>Include three normal console-log tests and three edge console-log tests.</li>
        </ul>
      </section>

      <HealthRecordSymmetryExplorer />
      <HealthRecordSymmetryTestPanel />

      <section className="health-card">
        <h2>Starter Shape</h2>
        <p>
          Start with a node class and the required function name. The finished solution below shows the
          concise slow/fast pointer version used for this assignment.
        </p>
        <CodeBlock language="js" label="Starter JavaScript" code={starterSyntax} />
      </section>

      <section className="health-card">
        <h2>Full Source Code</h2>
        <p>
          This implementation follows the requested concise slow/fast pointer approach: it finds
          the middle, reverses the second half, and compares both sides. The exact short version does
          not restore the list afterward, so the Live Test Results panel grades the required boolean result.
        </p>
        <CodeBlock language="js" label="src/exercises/HealthRecordSymmetry.js" code={solutionSyntax} />
      </section>

      <section className="health-card">
        <h2>Console-Log Tests</h2>
        <p>
          These tests follow the requested raw JavaScript style. They include three normal cases
          and three edge cases for the required symmetry result.
        </p>
        <CodeBlock language="js" label="src/exercises/HealthRecordSymmetry.console-tests.js" code={consoleTestSyntax} />
      </section>

      <section className="health-card">
        <div>
          <h2>Manual Testing</h2>
          <ul>
            <li>Try an odd symmetric record such as <code>95, 102, 110, 102, 95</code>.</li>
            <li>Try an even symmetric record such as <code>72, 88, 88, 72</code>.</li>
            <li>Try a non-symmetric trend such as <code>80, 90, 100, 110</code>.</li>
            <li>Try edge cases: empty, one reading, and two different readings.</li>
          </ul>
        </div>
        <div>
          <h2>Complexity Summary</h2>
          <p><strong>Time:</strong> O(n), because the algorithm walks through the list a constant number of times.</p>
          <p><strong>Extra Space:</strong> O(1), because it changes pointers in-place instead of copying all values.</p>
          <p><strong>Mutation note:</strong> The requested short algorithm reverses the second half during analysis and does not restore it.</p>
        </div>
      </section>

      <section className="health-card">
        <h2>Takeaways</h2>
        <p>
          This assignment connects linked-list pointer mechanics to a healthcare scenario. The big idea is
          that efficient algorithms often require preserving references carefully: save the next node before
          rewiring, compare from both ends, and understand how reversing pointers changes the list structure.
        </p>
      </section>
    </article>
  )
}
