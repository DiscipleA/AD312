---

## 🏥 Week 5 Assignment 1: Patient Health Record Symmetry

## 🎯 Objective

Build a raw JavaScript function named `isHealthRecordSymmetric(head)` that checks whether a patient's health metric record is symmetrical.

A health record is represented as a singly linked list:

```txt
95 -> 102 -> 110 -> 102 -> 95
```

This example is symmetrical because the readings are the same forward and backward.

## 🧠 Background

Healthcare records often store time-series readings such as:

* blood sugar levels
* heart rate
* oxygen saturation
* daily symptom scores
* treatment-response measurements

A symmetrical sequence may suggest that a patient returned to a baseline state or that a condition followed a repeating pattern.

## 📁 Required Files

```txt
src/exercises/HealthRecordSymmetry.js
src/exercises/HealthRecordSymmetry.console-tests.js
```

## ✅ Requirements

* Use raw JavaScript only for the algorithm.
* Define a singly linked-list node.
* Each node must store one metric value.
* Each node must store a `next` reference.
* Implement `isHealthRecordSymmetric(head)`.
* Return `true` for symmetrical records.
* Return `false` for non-symmetrical records.
* Include 3 normal console-log tests.
* Include 3 edge console-log tests.

## ⚙️ Recommended Algorithm

Use the optimized linked-list approach:

```txt
1. Use slow and fast pointers to find the middle.
2. Reverse the second half of the list.
3. Compare the first half with the reversed second half.
4. Restore the second half.
5. Return the result.
```

## 📊 Complexity

| Requirement | Target |
| --- | --- |
| Time complexity | `O(n)` |
| Extra space complexity | `O(1)` |
| Input structure | Singly linked list |
| Test style | `console.log` |

## 🧪 Example Console Test Style

```js
console.log(
  'Test 1 (Normal) passed =>',
  isHealthRecordSymmetric(createHealthRecord([95, 102, 110, 102, 95])) === true
)
```

## 🧩 Edge Cases

* empty list
* single-node list
* two-node non-symmetric list

## 🧠 Final Teaching Principle

The head pointer is the only doorway into a singly linked list. When reversing or comparing nodes, always preserve references before rewiring pointers.
