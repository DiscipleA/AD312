import PatientRecordMergeExplorer from '../assignments/week06/patient-record-merge-doubly-linked-list/PatientRecordMergeExplorer'
import PatientRecordMergeTestPanel from './PatientRecordMergeTestPanel'
import solutionSyntax from '../assignments/week06/patient-record-merge-doubly-linked-list/PatientRecordMerge.js?raw'
import consoleTestSyntax from '../assignments/week06/patient-record-merge-doubly-linked-list/PatientRecordMerge.console-tests.js?raw'
import '../styles/week06-patient-record-merge-assignment.css'
import CodeBlock from '../components/CodeBlock'

const starterSyntax = `class Node {
  constructor(ssn, age, name, prev = null, next = null) {
    this.ssn = ssn;
    this.age = age;
    this.name = name;
    this.prev = prev;
    this.next = next;
  }
}

function mergeLists(l1, l2) {
  // 1. Handle edge cases if either list is missing
  if (!l1 || !l2) {
    return l1 || l2;
  }

  // 2. Identify which list head has the smaller SSN to start the merged list
  let head = l2;
  if (l1.ssn <= l2.ssn) head = l1;

  // 3. Initialize working pointers to step through each list
  let p1 = l1; if (head === l1) p1 = l1.next;
  let p2 = l2; if (head === l2) p2 = l2.next;
  let curr = head;

  // 4. Traverse both lists and weave them together in sorted order
  while (p1 && p2) {
    if (p1.ssn <= p2.ssn) {
      curr.next = p1;
      p1.prev = curr;
      p1 = p1.next;
    } else {
      curr.next = p2;
      p2.prev = curr;
      p2 = p2.next;
    }
    curr = curr.next;
  }

  // 5. Append any remaining elements from the list that wasn't fully traversed
  curr.next = p1 || p2;
  if (curr.next) {
    curr.next.prev = curr;
  }

  return head;
}`

export default function Week06PatientRecordMergeAssignmentGuide() {
  return (
    <article className="patient-merge-assignment-guide">
      <header className="patient-merge-hero-card patient-merge-card">
        <p className="patient-merge-kicker">AD312 • Week 06 • Assignment 01</p>
        <h1>Integrating Patient Records from Two Healthcare Providers</h1>
        <p>
          Build a raw JavaScript module that merges two sorted doubly linked lists of patient records into
          one sorted list by SSN while preserving every record from HealthMerge and CarePlus.
        </p>
      </header>

      <section className="patient-merge-card">
        <h2>Background</h2>
        <p>
          HealthMerge Inc. has acquired CarePlus. Both providers store digital patient records sorted by SSN
          so healthcare professionals can quickly find a patient. The acquisition leaves the organization with
          two sorted lists that now need to behave like one integrated record system.
        </p>
        <p>
          Each patient record is represented by a doubly linked-list node containing an <code>ssn</code>,
          <code>age</code>, <code>name</code>, <code>prev</code> reference, and <code>next</code> reference.
        </p>
      </section>

      <section className="patient-merge-card">
        <h2>Requirements</h2>
        <ul className="patient-merge-checklist">
          <li>Use raw JavaScript for the data structure and algorithm.</li>
          <li>Implement a <code>Node</code> class with <code>ssn</code>, <code>age</code>, <code>name</code>, <code>prev</code>, and <code>next</code>.</li>
          <li>Implement <code>mergeLists(l1, l2)</code> for two sorted doubly linked lists.</li>
          <li>Merge by reusing existing nodes rather than copying all patient records into an array.</li>
          <li>Keep duplicate SSN records from both providers in the output.</li>
          <li>Return a sorted merged list and maintain correct <code>prev</code> links.</li>
          <li>Include three normal test cases and three edge test cases.</li>
        </ul>
      </section>

      <PatientRecordMergeExplorer />
      <PatientRecordMergeTestPanel />

      <section className="patient-merge-card">
        <h2>Starter Shape</h2>
        <p>
          Use the same raw JavaScript algorithm shape as the assignment handout. The production module below
          exports this logic so the guide, working preview, and console tests can import it safely.
        </p>
        <CodeBlock language="js" label="Starter JavaScript" code={starterSyntax} />
      </section>

      <section className="patient-merge-card">
        <h2>Full Source Code</h2>
        <p>
          The merge uses two provider pointers and one current tail pointer. Each loop step attaches the smaller
          SSN node to the merged list, updates its <code>prev</code> reference, and advances only the list that supplied that node.
        </p>
        <CodeBlock language="js" label="src/assignments/week06/patient-record-merge-doubly-linked-list/PatientRecordMerge.js" code={solutionSyntax} />
      </section>

      <section className="patient-merge-card">
        <h2>Console-Log Tests</h2>
        <p>
          These console checks follow the requested raw JavaScript style and print whether each expected merge result passed.
        </p>
        <CodeBlock language="js" label="src/assignments/week06/patient-record-merge-doubly-linked-list/PatientRecordMerge.console-tests.js" code={consoleTestSyntax} />
      </section>

      <section className="patient-merge-card patient-merge-grid-two">
        <div>
          <h2>Manual Testing</h2>
          <ul>
            <li>Merge one smaller HealthMerge SSN with one larger CarePlus SSN.</li>
            <li>Merge matching SSNs and confirm both patient records remain in the output.</li>
            <li>Merge lists where one provider record belongs in the middle of the other provider list.</li>
            <li>Try empty-list edge cases for one or both providers.</li>
          </ul>
        </div>
        <div>
          <h2>Complexity Summary</h2>
          <p><strong>Time:</strong> O(m + n), because each node from both provider lists is visited once.</p>
          <p><strong>Extra Space:</strong> O(1), because the algorithm rewires existing nodes instead of storing all records in a new array.</p>
          <p><strong>Data Integrity:</strong> duplicate SSNs are preserved because equal values are still appended, not discarded.</p>
        </div>
      </section>

      <section className="patient-merge-card">
        <h2>Takeaways</h2>
        <p>
          Doubly linked-list merging is about careful pointer ownership. Keep track of the current merged tail,
          save the next source node before rewiring, update both <code>next</code> and <code>prev</code>, and never drop a duplicate
          patient record just because two records share the same SSN.
        </p>
      </section>
    </article>
  )
}
