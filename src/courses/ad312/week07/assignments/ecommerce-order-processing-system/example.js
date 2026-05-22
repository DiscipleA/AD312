class Node {
  constructor(id, name, item) {
    this.id = id
    this.name = name
    this.item = item
    this.next = null
  }
}

class OrderList {
  constructor() {
    this.head = null
  }

  append(id, name, item) {
    const node = new Node(id, name, item)
    if (!this.head) {
      this.head = node
      return this
    }

    let curr = this.head
    while (curr.next) curr = curr.next
    curr.next = node
    return this
  }

  display() {
    const ids = []
    let curr = this.head
    while (curr) {
      ids.push(curr.id)
      curr = curr.next
    }
    return ids.join(',')
  }

  reverse() {
    let prev = null
    let curr = this.head

    while (curr) {
      const next = curr.next
      curr.next = prev
      prev = curr
      curr = next
    }

    this.head = prev
    return this
  }
}
