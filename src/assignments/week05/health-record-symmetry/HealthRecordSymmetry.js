/**
 * Week 5 Assignment 1: Health Record Symmetry
 * ------------------------------------------------------------
 * Raw JavaScript solution using the exact short linked-list palindrome
 * approach requested for the assignment.
 *
 * Time complexity: O(n)
 * Extra space complexity: O(1)
 *
 * Note:
 * This version reverses the second half of the list during the check.
 * It does not restore the original linked-list structure afterward because
 * the requested implementation is kept exactly in that concise style.
 */

export class Node {
  constructor(val, next = null) { this.val = val; this.next = next; }
}

// Compatibility alias for the existing assignment preview and guide imports.
export const HealthMetricNode = Node

export function createHealthRecord(values) {
  if (!Array.isArray(values) || values.length === 0) return null

  const head = new Node(values[0])
  let current = head

  for (let index = 1; index < values.length; index += 1) {
    current.next = new Node(values[index])
    current = current.next
  }

  return head
}

export function linkedListToArray(head) {
  const values = []
  let current = head

  while (current !== null) {
    values.push(current.val)
    current = current.next
  }

  return values
}

export function isHealthRecordSymmetric(head) {
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
}
