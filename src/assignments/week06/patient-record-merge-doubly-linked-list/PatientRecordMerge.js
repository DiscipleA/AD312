/**
 * Week 6 Assignment 1: Integrating Patient Records from Two Healthcare Providers
 * --------------------------------------------------------------------------------
 * Raw JavaScript doubly linked-list merge.
 *
 * Scenario:
 * HealthMerge and CarePlus each store patient records in a sorted linked list.
 * Each node contains an SSN, age, full name, a prev reference, and a next reference.
 * The task is to weave the two already-sorted lists into one sorted list by SSN.
 *
 * Time complexity: O(n + m)
 *   n is the number of nodes in the first provider list and m is the number of
 *   nodes in the second provider list. The merge compares and advances through
 *   the existing records once, so total work grows linearly with both lists.
 *
 * Extra space complexity: O(1)
 *   The algorithm reuses the existing patient record nodes. It only keeps a few
 *   pointer variables in memory instead of allocating an array of copied records
 *   or constructing an entirely new linked list.
 */

export class Node {
  constructor(ssn, age, name, prev = null, next = null) {
    this.ssn = ssn
    this.age = age
    this.name = name
    this.prev = prev
    this.next = next
  }
}

export function mergeLists(l1, l2) {
  // 1. Handle edge cases if either list is missing.
  // If one provider has no records, the merged result is simply the other list.
  // The returned list is still a valid head, so its prev link should be null.
  if (!l1 || !l2) {
    const onlyList = l1 || l2
    if (onlyList) onlyList.prev = null
    return onlyList
  }

  // 2. Identify which list head has the smaller SSN to start the merged list.
  // Using <= keeps a HealthMerge record before a CarePlus record when the SSNs
  // match, but it does not remove duplicates. Both records remain in the output.
  let head = l2
  if (l1.ssn <= l2.ssn) head = l1
  head.prev = null

  // 3. Initialize working pointers to step through each list.
  // The chosen head is already part of the merged list, so the pointer for that
  // source list moves to the next node before the main weaving loop begins.
  let p1 = l1
  if (head === l1) p1 = l1.next

  let p2 = l2
  if (head === l2) p2 = l2.next

  let curr = head

  // 4. Traverse both lists and weave them together in sorted order.
  // curr is always the tail of the merged list built so far. On each iteration,
  // the smaller current SSN node is attached after curr, its prev pointer is
  // rewired backward to curr, and then that source list advances by one node.
  while (p1 && p2) {
    if (p1.ssn <= p2.ssn) {
      curr.next = p1
      p1.prev = curr
      p1 = p1.next
    } else {
      curr.next = p2
      p2.prev = curr
      p2 = p2.next
    }
    curr = curr.next
  }

  // 5. Append any remaining elements from the list that was not fully traversed.
  // The leftover section is already sorted, so it can be attached in one pointer
  // operation instead of looping through every remaining node again.
  curr.next = p1 || p2
  if (curr.next) {
    curr.next.prev = curr
  }

  return head
}

export function createPatientList(records) {
  if (!Array.isArray(records) || records.length === 0) return null

  const head = new Node(records[0].ssn, records[0].age, records[0].name)
  let current = head

  for (let index = 1; index < records.length; index += 1) {
    const record = records[index]
    const nextNode = new Node(record.ssn, record.age, record.name, current)
    current.next = nextNode
    current = nextNode
  }

  return head
}

export function listToArray(head) {
  const output = []
  let current = head

  while (current) {
    output.push({ ssn: current.ssn, age: current.age, name: current.name })
    current = current.next
  }

  return output
}

export function listToDisplayStrings(head) {
  return listToArray(head).map((record) => `${record.ssn}-${record.name}-${record.age}`)
}

export function hasValidPrevLinks(head) {
  let previous = null
  let current = head

  while (current) {
    if (current.prev !== previous) return false
    previous = current
    current = current.next
  }

  return true
}
