import { useMemo, useState } from 'react'
import '../styles/assignment-test-panel.css'
import '../styles/week07-ecommerce-order-processing-assignment.css'
import { OrderList, createOrderList } from '../assignments/week07/ecommerce-order-processing-system/OrderProcessingSystem'

const scenarios = {
  normalDisplayAdded: {
    label: 'Normal 1: display added orders',
    kind: 'normal',
    orders: [
      { id: 1, name: 'Alice', item: 'Book' },
      { id: 2, name: 'Bob', item: 'Pen' },
      { id: 3, name: 'Charlie', item: 'Tape' },
    ],
    action: 'display',
    expected: '1,2,3',
    explanation: 'Orders display in the same first-to-last sequence in which they were appended.',
  },
  normalReverseNewestFirst: {
    label: 'Normal 2: reverse newest first',
    kind: 'normal',
    orders: [
      { id: 1, name: 'Alice', item: 'Book' },
      { id: 2, name: 'Bob', item: 'Pen' },
      { id: 3, name: 'Charlie', item: 'Tape' },
    ],
    action: 'reverse',
    expected: '3,2,1',
    explanation: 'The last appended order becomes the new head after pointer reversal.',
  },
  normalReverseTwice: {
    label: 'Normal 3: reverse back to original',
    kind: 'normal',
    orders: [
      { id: 1, name: 'Alice', item: 'Book' },
      { id: 2, name: 'Bob', item: 'Pen' },
      { id: 3, name: 'Charlie', item: 'Tape' },
    ],
    action: 'reverseTwice',
    expected: '1,2,3',
    explanation: 'Reversing twice confirms the list links were rewired correctly rather than only displayed backward.',
  },
  edgeEmptyDisplay: {
    label: 'Edge 1: empty list display',
    kind: 'edge',
    orders: [],
    action: 'display',
    expected: '',
    explanation: 'Displaying an empty list returns an empty string without crashing.',
  },
  edgeEmptyReverse: {
    label: 'Edge 2: empty list reverse',
    kind: 'edge',
    orders: [],
    action: 'reverse',
    expected: '',
    explanation: 'Reversing an empty list keeps the head null and still returns an empty display.',
  },
  edgeSingleReverse: {
    label: 'Edge 3: single order reverse',
    kind: 'edge',
    orders: [{ id: 99, name: 'Zack', item: 'Phone' }],
    action: 'reverse',
    expected: '99',
    explanation: 'A one-node list remains the same after reversal because there are no links to flip.',
  },
}

function buildList(orders) {
  return createOrderList(orders)
}

function runScenario(scenario) {
  const list = buildList(scenario.orders)

  if (scenario.action === 'reverse') {
    list.reverse()
  }

  if (scenario.action === 'reverseTwice') {
    list.reverse().reverse()
  }

  const actual = list.display()

  return {
    ...scenario,
    actual,
    passed: actual === scenario.expected,
  }
}

function formatOrders(orders) {
  if (!orders.length) return 'empty list'
  return orders.map((order) => `${order.id}: ${order.name} → ${order.item}`).join(' | ')
}

export default function OrderProcessingTestPanel() {
  const [selectedKey, setSelectedKey] = useState('normalDisplayAdded')
  const results = useMemo(() => Object.values(scenarios).map(runScenario), [])
  const activeResult = runScenario(scenarios[selectedKey])
  const passCount = results.filter((result) => result.passed).length

  return (
    <section className="assignment-test-panel order-processing-live-panel">
      <div className="assignment-test-header">
        <div>
          <p className="assignment-test-kicker">Live Assignment Checks</p>
          <h2>Order Processing Console Test Runner</h2>
          <p className="assignment-test-summary">
            This panel mirrors the required three normal and three edge console-log cases. It verifies append,
            display, reverse, empty-list behavior, and single-node reversal using the same raw JavaScript classes.
          </p>
        </div>

        <div className="assignment-test-score">
          <span>{passCount} / {results.length}</span>
          <small>Checks passing</small>
        </div>
      </div>

      <div className="assignment-test-controls">
        {Object.entries(scenarios).map(([key, scenario]) => (
          <button key={key} type="button" onClick={() => setSelectedKey(key)}>
            {scenario.label}
          </button>
        ))}
      </div>

      <div className="assignment-test-statebox">
        <p><strong>Selected Case:</strong> {activeResult.label}</p>
        <p><strong>Input Orders:</strong> {formatOrders(activeResult.orders)}</p>
        <p><strong>Action:</strong> {activeResult.action}</p>
        <p><strong>Expected display():</strong> {activeResult.expected || 'empty string'}</p>
        <p><strong>Actual display():</strong> {activeResult.actual || 'empty string'}</p>
        <p><strong>Why this matters:</strong> {activeResult.explanation}</p>
      </div>

      <div className="assignment-test-grid">
        {results.map((result) => (
          <article
            key={result.label}
            className={result.passed ? 'assignment-test-card passed' : 'assignment-test-card pending'}
          >
            <div className="assignment-test-badge">{result.passed ? 'PASS' : 'WAIT'}</div>
            <h3>{result.label}</h3>
            <p>
              Expected {result.expected || 'empty string'} and received {result.actual || 'empty string'}.
              {result.kind === 'edge' ? ' Edge case protected.' : ' Normal behavior confirmed.'}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
