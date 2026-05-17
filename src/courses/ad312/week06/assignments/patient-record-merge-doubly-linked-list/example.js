class Node {
  constructor(ssn, age, name, prev = null, next = null) {
    this.ssn = ssn
    this.age = age
    this.name = name
    this.prev = prev
    this.next = next
  }
}

function mergeLists(l1, l2) {
  if (!l1 || !l2) return l1 || l2

  let head = l2
  if (l1.ssn <= l2.ssn) head = l1

  let p1 = l1
  if (head === l1) p1 = l1.next

  let p2 = l2
  if (head === l2) p2 = l2.next

  let curr = head

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

  curr.next = p1 || p2
  if (curr.next) curr.next.prev = curr

  return head
}

export { Node, mergeLists }
