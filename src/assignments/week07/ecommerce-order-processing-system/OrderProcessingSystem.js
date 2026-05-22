/**
 * Week 7 Assignment 1: E-Commerce Order Processing System
 * -----------------------------------------------------------------------------
 * Raw JavaScript singly linked-list solution.
 *
 * Scenario:
 * An e-commerce platform originally stores orders in the order they arrived.
 * The head points at the first order received. A fulfillment strategy change now
 * requires the newest order to be processed first, so the list must be reversed.
 *
 * Time complexity:
 *   append(id, name, item): O(n), because the method walks to the tail before
 *   adding the new order.
 *   display(): O(n), because every node is visited once to collect order IDs.
 *   reverse(): O(n), because every node has its next pointer rewired one time.
 *
 * Extra space complexity:
 *   append(): O(1) auxiliary space for one new node.
 *   display(): O(n) output space for the returned string/array representation.
 *   reverse(): O(1) auxiliary space because it rewires existing nodes in place.
 */

export class Order {
  constructor(id, name, item, status = 'Pending') {
    this.id = id
    this.name = name
    this.item = item
    this.status = status
  }

  summary() {
    return `${this.id}: ${this.name} ordered ${this.item} (${this.status})`
  }
}

export class Node {
  constructor(id, name, item) {
    // Store the order data in an Order object so the node carries one clear
    // business record, not several unrelated loose values.
    this.order = new Order(id, name, item)

    // Keep these direct aliases so the implementation still matches the short
    // starter shape from the assignment instructions and remains easy to test.
    this.id = this.order.id
    this.name = this.order.name
    this.item = this.order.item

    // next points to the following order in the sequence. A singly linked list
    // can only move forward, so reversing requires carefully changing this link.
    this.next = null
  }
}

export class OrderList {
  constructor() {
    // head is the first node in the current processing order. If head is null,
    // the list is empty.
    this.head = null
  }

  append(id, name, item) {
    const node = new Node(id, name, item)

    // Empty-list case: the new order is both the first and last node.
    if (!this.head) {
      this.head = node
      return this
    }

    // Traverse from head to the current tail. This is O(n) because a singly
    // linked list does not have direct access to the last node by default.
    let curr = this.head
    while (curr.next) {
      curr = curr.next
    }

    // Attach the new order after the old tail.
    curr.next = node
    return this
  }

  display() {
    let curr = this.head
    const res = []

    // Walk node by node and collect order IDs in their current list order.
    while (curr) {
      res.push(curr.id)
      curr = curr.next
    }

    return res.join(',')
  }

  toOrderSummaries() {
    let curr = this.head
    const summaries = []

    while (curr) {
      summaries.push(curr.order.summary())
      curr = curr.next
    }

    return summaries
  }

  reverse() {
    let prev = null
    let curr = this.head

    // Each iteration saves the next node before changing curr.next. Without the
    // saved pointer, the rest of the list would be lost after the link flips.
    while (curr) {
      const next = curr.next
      curr.next = prev
      prev = curr
      curr = next
    }

    // prev now points at the old tail, which becomes the new head.
    this.head = prev
    return this
  }
}

export function createOrderList(orders) {
  const list = new OrderList()

  for (const order of orders) {
    list.append(order.id, order.name, order.item)
  }

  return list
}
