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
 * Time complexity: O(m + n)
 *   The algorithm visits each patient node at most once, where m is the number of
 *   HealthMerge records and n is the number of CarePlus records.
 *
 * Extra space complexity: O(1)
 *   The merge reuses the existing patient record nodes. It does not allocate a new
 *   array of records or copy every patient into brand-new nodes.
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
  if (!l1 || !l2) {
    const onlyList = l1 || l2
    if (onlyList) onlyList.prev = null
    return onlyList
  }

  // 2. Identify which list head has the smaller SSN to start the merged list.
  // Using <= keeps records from the first list before same-SSN records from the
  // second list, while still preserving duplicates from both providers.
  let head = l2
  if (l1.ssn <= l2.ssn) head = l1
  head.prev = null

  // 3. Initialize working pointers to step through each list.
  // The selected head is already part of the merged list, so its source pointer
  // advances to the next node before the weaving loop begins.
  let p1 = l1
  if (head === l1) p1 = l1.next

  let p2 = l2
  if (head === l2) p2 = l2.next

  let curr = head

  // 4. Traverse both lists and weave existing nodes together in sorted order.
  // curr always points at the tail of the merged list built so far.
  while (p1 && p2) {
    if (p1.ssn <= p2.ssn) {
      const nextPatient = p1.next
      curr.next = p1
      p1.prev = curr
      curr = curr.next
      p1 = nextPatient
    } else {
      const nextPatient = p2.next
      curr.next = p2
      p2.prev = curr
      curr = curr.next
      p2 = nextPatient
    }
  }

  // 5. Append any remaining elements from the list that was not fully traversed.
  // The remainder is already sorted, so it can attach directly to the tail.
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
