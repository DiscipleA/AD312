# 🎓 AD312 Course Platform — Week 10 Assignment 1

---

## 📝 Overview

This project continues the Vite + React learning platform introduced in earlier weeks. Instead of behaving like a basic React app, it functions as a course portfolio and instructional platform.

It supports:

* course switching
* week switching
* clickable lecture and assignment cards
* lecture detail views
* assignment guide pages
* contextual file tree panel
* dark/light theme support
* embedded working previews
* full source-code displays
* console-log tests
* automated Vitest tests
* in-app Live Test Results panels
* downloadable report generation

Week 10 Assignment 1 introduces Insertion Sort as a foundational comparison-based sorting algorithm. Students implement a stable Insertion Sort in raw JavaScript, then analyze how the algorithm behaves across small arrays, large arrays, nearly sorted arrays, reversed arrays, random arrays, and object-record stability cases.

This assignment focuses on algorithm implementation, performance analysis, stability, testing, and reflection. Students practice writing raw JavaScript logic, documenting each key step, measuring comparisons and shifts, explaining best-case, average-case, and worst-case time complexity, and discussing why Insertion Sort is considered an in-place algorithm.

The assignment also includes a browser-based report workflow. Students can interact with required test scenarios in the GUI, run metrics analysis, inspect best-case and worst-case behavior, demonstrate stability, and generate a downloadable report that summarizes the implementation, tests, complexity analysis, stability findings, reflection, practical applications, and variations.

## 🎯 Objective

The Week 10 Assignment 1 focuses on helping students:

* understand how Insertion Sort builds a sorted left side of the array
* implement Insertion Sort in raw JavaScript
* sort numeric arrays in ascending order
* preserve stable ordering for records with equal keys
* explain each major algorithm step through detailed code comments
* test small arrays
* test large arrays
* test nearly sorted arrays as the best-case scenario
* test reversed arrays as the worst-case scenario
* test randomly generated arrays as average-case scenarios
* test edge cases such as empty arrays and single-element arrays
* test duplicate values and negative numbers
* analyze comparison counts and shift counts
* explain best-case `O(n)` time complexity
* explain average-case and worst-case `O(n²)` time complexity
* explain `O(1)` auxiliary space complexity
* explain why Insertion Sort is considered in-place
* demonstrate why the implementation is stable
* compare Insertion Sort with Bubble Sort and QuickSort
* discuss practical applications for small or nearly sorted data
* discuss improvements and variations such as Binary Insertion Sort and TimSort
* generate a concise downloadable report directly from the GUI
* practice console-log testing and automated Vitest testing
* use Live Test Results to visualize normal and edge cases

## ⚙️ How It Works

### 🧠 App Controller Pattern

The application is controlled centrally through `App.jsx`, which manages:

* selected course
* selected week
* active lecture
* active assignment
* active content rendering

Instead of separate pages, content is rendered dynamically based on user interaction.

### 📚 Week-Based Content System

Content is defined through structured data, typically in `courseData.js`, which determines:

* available weeks
* lecture cards
* assignment cards
* assignment titles
* assignment summaries
* card metadata

### 🖱 Navigation Flow

* Select Course, such as AD312
* Select Week 10
* View lecture and assignment cards
* Click the Insertion Sort assignment card
* Open the detailed assignment guide
* Use the Working Preview, metrics analysis, source code, tests, report generation, and Live Test Results panel

Assignments follow the same interaction pattern as lectures.

## 🧩 Three-Layer Assignment Model

### 1. Raw JavaScript Algorithm Layer

Located in:

```txt
src/assignments/week10/insertion-sort-analysis/InsertionSort.js
```

This file contains the reusable JavaScript sorting logic.

It includes:

* stable Insertion Sort
* safe array-copying helper workflow
* numeric array sorting
* object-record sorting by key
* helper functions for generating required test arrays
* helper functions for checking sorted output
* helper functions for measuring performance
* helper functions for demonstrating stability
* detailed comments explaining the algorithm step by step

The sorting logic is intentionally written in raw JavaScript so the algorithm can be understood independently of React.

### 2. Assignment Guide UI Layer

Located in:

```txt
src/exercises/Week10InsertionSortAssignmentGuide.jsx
```

This file presents the assignment inside the AD312 course platform.

It includes:

* overview
* learning objectives
* required test scenarios
* Working Preview
* metrics analysis section
* source-code display
* console-test display
* Vitest-test display
* manual verification instructions
* report-generation workflow
* summary and takeaways

The guide embeds the interactive Insertion Sort explorer so students can test the algorithm visually.

### 3. Live Test Panel Layer

Located in:

```txt
src/exercises/InsertionSortTestPanel.jsx
```

This file provides an in-app visual testing panel.

It includes:

* normal cases
* edge cases
* expected outputs
* actual outputs
* pass/fail style feedback
* stability observations
* complexity reminders
* long-array wrapping for readable output

This panel helps students understand what the official tests are checking.

## ✨ Features

### 🧱 Platform Features

* Course and week navigation
* Clickable Topic Cards
* Lecture and assignment detail views
* File tree panel
* Dark/light theme support
* Assignment guide pages
* Embedded working previews
* Syntax-highlighted code examples
* Live Test Results panels

### 🧪 Assignment Features

* Stable Insertion Sort implementation
* Raw JavaScript algorithm file
* Small-array scenario
* Large-array scenario
* Nearly sorted best-case scenario
* Reversed worst-case scenario
* Random average-case scenarios
* Empty-array edge case
* Single-element edge case
* Duplicate-value handling
* Negative-number handling
* Object-record stability demonstration
* GUI buttons for required test scenarios
* Metrics Analysis button
* Metrics Analysis output window under the Working Preview
* Downloadable report generation
* Full source-code display
* Full console-test display
* Full Vitest-test display
* Manual verification instructions
* Automated testing expectations
* In-app Live Test Results panel

## 🔢 Insertion Sort Behavior

Insertion Sort builds a sorted section at the left side of the array.

For each value:

```txt
take the current value as the key
compare it with values to the left
shift larger values one position to the right
insert the key into the open position
```

The sorted section grows one item at a time until the full array is sorted.

The algorithm performs especially well when the array is already sorted or nearly sorted because most values are already close to their correct location.

## 🧷 Stability Behavior

Insertion Sort is stable when equal values are not moved ahead of each other.

The key comparison rule is:

```txt
existing value > key value
```

not:

```txt
existing value >= key value
```

This matters because equal-key records should keep their original relative order.

For example, if two records have the same sort key:

```txt
{ key: 2, label: "A" }
{ key: 2, label: "C" }
```

The record labeled `"A"` should remain before the record labeled `"C"` after sorting.

This assignment demonstrates stability by sorting object records with duplicate keys and checking that equal-key records preserve their original order.

## 🧠 Complexity Analysis

### Time Complexity

| Case | Time Complexity | Explanation |
| --- | --- | --- |
| Best Case | `O(n)` | The array is already sorted or nearly sorted, so very few shifts are needed |
| Average Case | `O(n²)` | Many values require comparisons and shifts before insertion |
| Worst Case | `O(n²)` | A reversed array forces each new key to move across most of the sorted section |

Insertion Sort uses nested movement in average and worst cases. Each value may need to move backward through many earlier values, so the number of operations grows quadratically as input size increases.

### Space Complexity

Insertion Sort is considered an in-place sorting algorithm because it rearranges values inside the working array instead of building a second full array.

Its auxiliary space complexity is:

```txt
O(1)
```

Only a small number of variables are needed for the key value, loop indexes, counters, and temporary placement.

### Best-Case Behavior

The best-case scenario occurs when the input is already sorted or nearly sorted.

In this situation:

* most comparisons stop quickly
* few shifts are needed
* the sorted left side is already mostly valid
* the algorithm behaves close to linear time

### Worst-Case Behavior

The worst-case scenario occurs when the input is reversed.

In this situation:

* every new key belongs near the front
* many earlier values must shift right
* comparisons and shifts increase heavily
* the algorithm demonstrates quadratic behavior

## 🏗 Architecture

### 🧭 High-Level Layers

App Shell

* Controls navigation and rendering

Data Layer

* `courseData.js` defines course, week, and card structure

Component Layer

* Sidebar, Header, TopicCard, FileTreePanel, and shared UI components

Content Layer

* Assignment guide components

Algorithm Layer

* Raw JavaScript Insertion Sort implementation

Testing Layer

* Console-log tests
* Vitest tests
* In-app Live Test Results panel

Report Layer

* Browser-based report generator

## 🧭 Navigation Behavior

* Card-based navigation
* No external routing required
* Controlled through state in `App.jsx`
* Assignment opens inside the existing course-platform detail view
* File tree updates based on the active Week 10 assignment

## 📌 Week 10 Assignment Flow

* Assignment appears as a Week 10 assignment card
* Clicking opens the Insertion Sort guide inside the main view
* The Working Preview renders the Insertion Sort explorer
* Students run required test cases using GUI buttons
* Students generate metrics analysis
* Students review full source code and test code
* Students generate a downloadable report
* File tree stays context-aware
* Live Test Results show normal and edge-case behavior

## 🎨 UI Patterns

### 🧱 Card-Based Entry

All content begins with clickable cards.

### 📖 Structured Sections

Assignment uses structured sections:

* Overview
* Objectives
* Requirements
* Working Preview
* Metrics Analysis
* Full Source Code
* Console Test Code
* Vitest Test Code
* Manual Verification
* Live Test Results
* Report Generation
* Summary

### 💻 Embedded Preview

The actual Insertion Sort explorer is rendered inside the guide.

The preview allows students to:

* run a small-array scenario
* run a large-array scenario
* run a nearly sorted array
* run a reversed array
* run random average-case arrays
* run duplicate-value scenarios
* run stability demonstrations
* view sorted output
* view metrics analysis
* download a generated report

### 🧾 Syntax as Learning Tool

Full code and test syntax are displayed directly in the UI with syntax highlighting.

Code examples are intended to teach:

* raw JavaScript functions
* array cloning
* insertion logic
* key selection
* shifting values
* stable comparison rules
* best-case behavior
* worst-case behavior
* average-case testing
* in-place sorting
* object-record stability
* edge-case testing
* report generation

### 🧪 Live Test Panel

The app includes a visual test runner:

* shows pass/fail style states
* groups normal cases and edge cases
* demonstrates sorting behavior interactively
* shows expected vs actual behavior
* verifies duplicate and stability behavior
* includes complexity reminders
* complements the official Vitest suite

This complements, but does not replace, automated tests.

## 🗂 Project Structure

```txt
src/
├── App.jsx
├── components/
├── data/
├── lectures/
├── assignments/
│   └── week10/
│       └── insertion-sort-analysis/
│           ├── InsertionSort.js
│           ├── InsertionSortPdfReport.js
│           ├── InsertionSort.console-tests.js
│           ├── InsertionSort.test.js
│           └── README.md
├── exercises/
│   ├── Week10InsertionSortAssignmentGuide.jsx
│   └── InsertionSortTestPanel.jsx
├── styles/
│   └── week10-insertion-sort-assignment.css
└── courses/
    └── ad312/
        └── week10/
            └── assignments/
                └── insertion-sort-analysis/
                    ├── content.md
                    └── example.js
```

## 🧪 Testing Structure

### ✅ Automated Tests

Located in:

```txt
src/assignments/week10/insertion-sort-analysis/InsertionSort.test.js
```

Includes:

* at least 3 normal cases
* at least 3 edge cases

Normal cases verify:

* small arrays are sorted in ascending order
* nearly sorted arrays are sorted correctly
* reversed arrays are sorted correctly
* large random arrays are sorted correctly
* object records sort by key while preserving stability

Edge cases verify:

* empty arrays return empty arrays
* single-element arrays return unchanged arrays
* duplicate values are handled correctly
* negative numbers sort correctly
* already sorted arrays remain sorted
* original input arrays are not accidentally mutated when using the safe helper workflow

### 🧾 Console Tests

Located in:

```txt
src/assignments/week10/insertion-sort-analysis/InsertionSort.console-tests.js
```

The console tests provide a simple command-line style verification workflow.

They cover:

* small arrays
* large arrays
* nearly sorted arrays
* reversed arrays
* random arrays
* empty arrays
* single-element arrays
* duplicate values
* negative values
* stability with object records

These tests are helpful because they make the algorithm behavior visible outside the browser UI.

### 🧠 In-App Test Panel

Located in:

```txt
src/exercises/InsertionSortTestPanel.jsx
```

Visual learning tool.

Tracks:

* input arrays
* expected sorted output
* actual sorted output
* pass/fail status
* normal sorting cases
* edge sorting cases
* duplicate-value behavior
* stability behavior
* complexity expectations

## 🔍 Why Both?

| Type | Purpose |
| --- | --- |
| Automated Tests | correctness |
| Console Tests | simple algorithm verification |
| Test Panel | learning + visualization |
| Downloadable Report | assignment documentation |

## 🚀 How to Run

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

### 3. Open app

```txt
http://localhost:5173/
```

### 4. Navigate to Week 10 Assignment 1

* Select course
* Select Week 10
* Click the Insertion Sort assignment card

## 🧪 How to Run Tests

### Run all tests

```bash
npm run test
```

### Run only this assignment’s Vitest tests

```bash
npm run test -- src/assignments/week10/insertion-sort-analysis/InsertionSort.test.js
```

### Run console-log tests

```bash
node src/assignments/week10/insertion-sort-analysis/InsertionSort.console-tests.js
```

### Watch mode

```bash
npm run test:watch
```

### UI mode optional

```bash
npm run test:ui
```

## 📄 Report Generation

This assignment includes a browser-based report generator.

Students can use the GUI to generate a downloadable report that summarizes:

* Insertion Sort implementation
* required test cases
* test outcomes
* best-case analysis
* worst-case analysis
* average-case analysis
* time complexity
* space complexity
* stability demonstration
* efficiency discussion
* practical applications
* improvements and variations
* final observations

The report generator supports the assignment requirement to compile a concise report from the implementation, testing, analysis, and reflection work.

## 🧪 Manual Verification

Use the browser UI to manually confirm:

* small arrays sort in ascending order
* large random arrays sort in ascending order
* nearly sorted arrays require fewer operations
* reversed arrays require more operations
* duplicate values remain sorted correctly
* object records with equal keys preserve original order
* metrics analysis appears under the Working Preview
* downloadable report generation works
* Live Test Results show passing normal and edge cases

## 🎥 Demo

| Demo Title             | Description          | Link |
| ---------------------- | -------------------- | ---- |
| Assignment Walkthrough | Full UI + guide demo |[Week10_A1](https://youtu.be/6WFbEX9Qpp8)|

## 📌 Summary

Week 10 Assignment 1 introduces:

* Insertion Sort as a comparison-based sorting algorithm
* raw JavaScript algorithm implementation
* stable sorting logic
* small, large, nearly sorted, reversed, random, empty, and single-element test cases
* best-case `O(n)` behavior
* average-case and worst-case `O(n²)` behavior
* `O(1)` auxiliary space complexity
* in-place sorting behavior
* object-record stability demonstration
* console-log testing
* Vitest testing
* in-app Live Test Results
* downloadable report generation

This assignment connects algorithm theory with practical implementation by showing how Insertion Sort can be implemented, tested, measured, explained, and documented inside the AD312 course platform.
