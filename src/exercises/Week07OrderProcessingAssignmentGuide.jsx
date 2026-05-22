import { useMemo, useState } from 'react'
import CodeBlock from '../components/CodeBlock'
import OrderProcessingTestPanel from './OrderProcessingTestPanel'
import solutionSyntax from '../assignments/week07/ecommerce-order-processing-system/OrderProcessingSystem.js?raw'
import consoleTestSyntax from '../assignments/week07/ecommerce-order-processing-system/OrderProcessingSystem.console-tests.js?raw'
import { createOrderList } from '../assignments/week07/ecommerce-order-processing-system/OrderProcessingSystem'
import '../styles/week07-ecommerce-order-processing-assignment.css'

const starterSyntax = `class Node {
    constructor(id, name, item) {
        this.id = id;
        this.name = name;
        this.item = item;
        this.next = null;
    }
}

class OrderList {
    constructor() {
        this.head = null;
    }

    append(id, name, item) {
        const node = new Node(id, name, item);
        
        if (!this.head) {
            this.head = node;
            return;
        }

        let curr = this.head;
        while (curr.next) {
            curr = curr.next;
        }
        curr.next = node;
    }

    display() {
        let curr = this.head;
        const res = [];
        
        while (curr) {
            res.push(curr.id);
            curr = curr.next;
        }
        return res.join(",");
    }

    reverse() {
        let prev = null;
        let curr = this.head;

        while (curr) {
            let next = curr.next; // Save the next node
            curr.next = prev;     // Reverse the pointer
            prev = curr;          // Move prev forward
            curr = next;          // Move curr forward
        }

        this.head = prev;
        return this; // Allows method chaining like .reverse().display()
    }
}`

const exampleOrders = [
  { id: 1, name: 'Alice', item: 'Book' },
  { id: 2, name: 'Bob', item: 'Pen' },
  { id: 3, name: 'Charlie', item: 'Tape' },
]

function parseOrders(input) {
  const invalidRows = []
  const orders = input
    .split(';')
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const [idText, nameText, itemText] = chunk.split('-').map((part) => part.trim())
      const id = Number(idText)

      if (!Number.isFinite(id) || !nameText || !itemText) {
        invalidRows.push(chunk)
        return null
      }

      return { id, name: nameText, item: itemText }
    })
    .filter(Boolean)

  return { orders, invalidRows }
}

function formatOrderDetails(list) {
  const summaries = list.toOrderSummaries()
  if (!summaries.length) return 'empty list'
  return summaries.join(' → ')
}

export default function Week07OrderProcessingAssignmentGuide() {
  const [draftInput, setDraftInput] = useState('1-Alice-Book; 2-Bob-Pen; 3-Charlie-Tape')
  const [submittedInput, setSubmittedInput] = useState('1-Alice-Book; 2-Bob-Pen; 3-Charlie-Tape')
  const [lastAction, setLastAction] = useState('Example order list loaded')

  const parsed = useMemo(() => parseOrders(submittedInput), [submittedInput])
  const preview = useMemo(() => {
    const originalList = createOrderList(parsed.orders)
    const reversedList = createOrderList(parsed.orders).reverse()

    return {
      originalDisplay: originalList.display(),
      reversedDisplay: reversedList.display(),
      originalDetails: formatOrderDetails(originalList),
      reversedDetails: formatOrderDetails(reversedList),
    }
  }, [parsed.orders])

  function runPreview() {
    setSubmittedInput(draftInput)
    setLastAction('Preview rebuilt from current orders')
  }

  function resetPreview() {
    const resetValue = exampleOrders.map((order) => `${order.id}-${order.name}-${order.item}`).join('; ')
    setDraftInput(resetValue)
    setSubmittedInput(resetValue)
    setLastAction('Example order list loaded')
  }

  return (
    <article className="order-processing-assignment-guide">
      <header className="order-processing-hero-card order-processing-card">
        <p className="order-processing-kicker">AD312 • Week 07 • Assignment 01</p>
        <h1>E-Commerce Order Processing System</h1>
        <p>
          Build a raw JavaScript singly linked list for e-commerce orders, then reverse the links so the
          most recent purchases are processed first for last-minute fulfillment.
        </p>
      </header>

      <section className="order-processing-card">
        <h2>Background</h2>
        <p>
          The platform receives orders over time and appends each one to the end of a singly linked list.
          In the original sequence, the head is the first order received. The new fulfillment rule asks the
          system to process the newest orders first, which means the linked list must be reversed in place.
        </p>
      </section>

      <section className="order-processing-card">
        <h2>Requirements</h2>
        <ul className="order-processing-checklist">
          <li>Define an <code>Order</code> class for order ID, customer name, item details, and status.</li>
          <li>Define a singly linked-list <code>Node</code> that points to the next order.</li>
          <li>Implement an <code>OrderList</code> class with <code>append</code>, <code>display</code>, and <code>reverse</code>.</li>
          <li>Use raw JavaScript only for the data structure and algorithm.</li>
          <li>Reverse the list by manipulating node links, not by sorting or rebuilding from an array.</li>
          <li>Include three normal console-log tests and three edge console-log tests.</li>
          <li>Explain time complexity and extra space complexity for the core operations.</li>
        </ul>
      </section>

      <section className="order-processing-preview-card">
        <div className="order-processing-preview-header">
          <p className="order-processing-kicker">Working Preview</p>
          <h2>Newest Orders First</h2>
          <p>
            Enter orders as semicolon-separated values in <code>ID-Customer-Item</code> format. The preview builds
            a raw JavaScript linked list, displays the appended order, reverses the node pointers, and shows
            the new processing order.
          </p>
        </div>

        <label className="order-processing-input-label" htmlFor="order-processing-input">
          Orders
          <input
            id="order-processing-input"
            value={draftInput}
            onChange={(event) => setDraftInput(event.target.value)}
            placeholder="1-Alice-Book; 2-Bob-Pen; 3-Charlie-Tape"
          />
        </label>

        <div className="order-processing-actions" aria-label="Order processing controls">
          <button type="button" className="order-processing-primary-action" onClick={runPreview}>
            Run Reverse Preview
          </button>
          <button type="button" className="order-processing-secondary-action" onClick={resetPreview}>
            Reset Example Orders
          </button>
          <span className="order-processing-action-note">{lastAction}</span>
        </div>

        <div className="order-processing-result-grid">
          <article className={parsed.invalidRows.length ? 'order-processing-warn' : 'order-processing-pass'}>
            <span>Input Status</span>
            <strong>{parsed.invalidRows.length ? `Check: ${parsed.invalidRows.join(', ')}` : 'All orders parsed successfully'}</strong>
          </article>
          <article>
            <span>Before Reverse</span>
            <strong>{preview.originalDisplay || 'empty list'}</strong>
            <small>{preview.originalDetails}</small>
          </article>
          <article className="order-processing-pass">
            <span>After Reverse</span>
            <strong>{preview.reversedDisplay || 'empty list'}</strong>
            <small>{preview.reversedDetails}</small>
          </article>
          <article>
            <span>Complexity</span>
            <strong>reverse(): O(n) time • O(1) extra space</strong>
          </article>
        </div>
      </section>

      <OrderProcessingTestPanel />

      <section className="order-processing-card">
        <h2>Starter Shape</h2>
        <p>
          This is the raw JavaScript shape from the assignment instructions. The final version below keeps the
          same linked-list behavior while adding an explicit <code>Order</code> class and deeper educational comments.
        </p>
        <CodeBlock language="js" label="Starter JavaScript" code={starterSyntax} />
      </section>

      <section className="order-processing-card">
        <h2>Full Source Code</h2>
        <p>
          The reversal uses the classic three-pointer approach: <code>prev</code>, <code>curr</code>, and <code>next</code>.
          Saving <code>next</code> before changing <code>curr.next</code> prevents the rest of the order list from being lost.
        </p>
        <CodeBlock language="js" label="src/assignments/week07/ecommerce-order-processing-system/OrderProcessingSystem.js" code={solutionSyntax} />
      </section>

      <section className="order-processing-card">
        <h2>Console-Log Tests</h2>
        <p>
          These tests use helper logging instead of Vitest, matching the requested raw JavaScript console-log style.
          They cover adding orders, displaying the original sequence, reversing the list, and key edge cases.
        </p>
        <CodeBlock language="js" label="src/assignments/week07/ecommerce-order-processing-system/OrderProcessingSystem.console-tests.js" code={consoleTestSyntax} />
      </section>

      <section className="order-processing-card order-processing-grid-two">
        <div>
          <h2>Manual Testing</h2>
          <ul>
            <li>Add three orders and confirm <code>display()</code> returns <code>1,2,3</code>.</li>
            <li>Call <code>reverse()</code> and confirm <code>display()</code> returns <code>3,2,1</code>.</li>
            <li>Reverse twice to verify that pointers were truly rewired.</li>
            <li>Try an empty list and a single-order list to confirm edge behavior.</li>
          </ul>
        </div>
        <div>
          <h2>Complexity Summary</h2>
          <p><strong>append:</strong> O(n) time because the list walks to the tail, O(1) auxiliary space.</p>
          <p><strong>display:</strong> O(n) time and O(n) output space for the returned ID sequence.</p>
          <p><strong>reverse:</strong> O(n) time and O(1) auxiliary space because existing links are rewired in place.</p>
        </div>
      </section>

      <section className="order-processing-card">
        <h2>Takeaways</h2>
        <p>
          Reversing a singly linked list is a pointer-safety exercise. Always save the next node before changing
          the current node’s link, move the previous and current pointers in order, and finally point the list head
          at the old tail so newest orders are processed first.
        </p>
      </section>
    </article>
  )
}
