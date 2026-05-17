import { Node, mergeLists } from './PatientRecordMerge.js'

const runTest = (msg, l1, l2, expected) => {
  let res = mergeLists(l1, l2), out = []
  while (res) { out.push(`${res.ssn}-${res.name}-${res.age}`); res = res.next }
  console.log(`${msg} passed =>`, out.join(',') === expected, '| Result:', out)
}

runTest('Test 1 (Normal)', new Node(10, 30, 'Alice'), new Node(20, 25, 'Bob'),
  '10-Alice-30,20-Bob-25')
runTest('Test 2 (Normal)', new Node(10, 30, 'Alice'), new Node(10, 22, 'Alex'),
  '10-Alice-30,10-Alex-22')
runTest('Test 3 (Normal)', (() => {
  const n1 = new Node(10, 30, 'Alice')
  const n2 = new Node(30, 25, 'Bob')
  n1.next = n2
  n2.prev = n1
  return n1
})(), new Node(20, 22, 'Alex'),
  '10-Alice-30,20-Alex-22,30-Bob-25')
runTest('Test 1 (Edge)', null, new Node(10, 30, 'Alice'), '10-Alice-30')
runTest('Test 2 (Edge)', null, null, '')
runTest('Test 3 (Edge)', new Node(10, 30, 'Alice'), null,
  '10-Alice-30')
