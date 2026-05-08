import {
  Node,
  HealthMetricNode,
  createHealthRecord,
  isHealthRecordSymmetric,
} from './HealthRecordSymmetry.js'

// Week 5 Assignment 1 console tests
// These tests use raw JavaScript console.log checks.

console.log(
  'Test 1 (Normal) passed =>',
  isHealthRecordSymmetric(createHealthRecord([95, 102, 110, 102, 95])) === true
)

console.log(
  'Test 2 (Normal) passed =>',
  isHealthRecordSymmetric(createHealthRecord([72, 88, 88, 72])) === true
)

console.log(
  'Test 3 (Normal) passed =>',
  isHealthRecordSymmetric(createHealthRecord([80, 90, 100, 110])) === false
)

console.log(
  'Test 1 (Edge) passed =>',
  isHealthRecordSymmetric(null) === true
)

console.log(
  'Test 2 (Edge) passed =>',
  isHealthRecordSymmetric(new Node(98)) === true
)

console.log(
  'Test 3 (Edge) passed =>',
  isHealthRecordSymmetric(createHealthRecord([120, 121])) === false
)

console.log(
  'Extra Check (HealthMetricNode alias) passed =>',
  isHealthRecordSymmetric(new HealthMetricNode(75)) === true
)
