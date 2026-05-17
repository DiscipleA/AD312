# Integrating Patient Records from Two Healthcare Providers

HealthMerge Inc. acquired CarePlus. Both providers have patient records sorted by SSN in separate doubly linked lists.

Build a raw JavaScript module that merges both sorted lists into one sorted list without dropping duplicate SSN records.

## Requirements

- Define a patient `Node` with `ssn`, `age`, `name`, `prev`, and `next`.
- Implement `mergeLists(l1, l2)`.
- Preserve both records when the same SSN appears in both lists.
- Keep the merged list sorted by SSN.
- Maintain correct doubly linked-list `prev` references.
- Include three normal test cases and three edge test cases.

## Complexity Target

- Time: O(m + n)
- Extra space: O(1)
