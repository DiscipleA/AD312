import { OrderList, createOrderList } from './OrderProcessingSystem.js'

function logTest(label, actual, expected) {
  const passed = actual === expected
  console.log(`${label} passed =>`, passed)
  if (!passed) {
    console.log('  expected:', expected)
    console.log('  actual:  ', actual)
  }
}

// ==========================================
// Test Cases (3 Normal & 3 Edge)
// ==========================================

const list = new OrderList()
const empty = new OrderList()
const single = new OrderList()

// Populate lists
list.append(1, 'Alice', 'Book')
list.append(2, 'Bob', 'Pen')
list.append(3, 'Charlie', 'Tape')

single.append(99, 'Zack', 'Phone')

// Normal Tests
logTest('Test 1 (Normal - display added order)', list.display(), '1,2,3')
logTest('Test 2 (Normal - reverse newest first)', list.reverse().display(), '3,2,1')
logTest('Test 3 (Normal - reverse back to original)', list.reverse().display(), '1,2,3')

// Edge Tests
logTest('Test 1 (Edge - empty list display)', empty.display(), '')
logTest('Test 2 (Edge - empty list reverse)', empty.reverse().display(), '')
logTest('Test 3 (Edge - single node reverse)', single.reverse().display(), '99')

// Helper-function sanity check for students who build lists from data arrays.
const helperList = createOrderList([
  { id: 10, name: 'Nia', item: 'Keyboard' },
  { id: 11, name: 'Omar', item: 'Mouse' },
])
logTest('Extra Check (Helper - createOrderList)', helperList.reverse().display(), '11,10')
