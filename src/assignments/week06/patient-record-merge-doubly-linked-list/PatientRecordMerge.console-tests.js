import { Node, mergeLists } from './PatientRecordMerge.js'

const runTest = (msg, l1, l2, expected) => {
  let res = mergeLists(l1, l2), out = []
  while (res) { out.push(`${res.ssn}-${res.name}-${res.age}`); res = res.next }
  console.log(`${msg} passed =>`, out.join(',') === expected, '| Result:', out)
}

runTest('Test 1 (Normal)', new Node(10, 30, 'Alice'), new Node(20, 25, 'Bob'),
  '10-Alice-30,20-Bob-25')
runTest('Test 2 (Duplicates)', new Node(10, 30, 'Alice'), new Node(10, 22, 'Alex'),
  '10-Alice-30,10-Alex-22')
runTest('Test 3 (Long)', (() => {
  const n1 = new Node(10, 50, 'Dan')
  const n2 = new Node(40, 60, 'Eli')
  n1.next = n2
  n2.prev = n1
  return n1
})(), new Node(20, 19, 'Eva'),
  '10-Dan-50,20-Eva-19,40-Eli-60')
runTest('Test 4 (First Empty)', null, new Node(10, 30, 'Alice'), '10-Alice-30')
runTest('Test 5 (Both Empty)', null, null, '')
runTest('Test 6 (Single Elements)', new Node(40, 20, 'Jack'), new Node(10, 80, 'Jim'),
  '10-Jim-80,40-Jack-20')
