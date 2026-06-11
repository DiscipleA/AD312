# 🎓 AD312 Course Platform — Week 9 Assignment 1

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
* automated tests
* in-app Live Test Results panels

Week 9 Assignment 1 introduces Bubble Sort as a foundational comparison-based sorting algorithm. Students implement both a basic Bubble Sort and an optimized Bubble Sort in JavaScript, then compare how both versions behave across normal cases, edge cases, best-case input, worst-case input, and uniform input.

This assignment focuses on algorithmic thinking, testing, optimization, and performance analysis. Students practice writing raw JavaScript logic, documenting each key step, measuring comparisons and swaps, and explaining why Bubble Sort has `O(n²)` average and worst-case time complexity.

The assignment also includes a browser-based report workflow. Students can interact with test cases in the GUI, compare basic and optimized results, and generate a downloadable PDF report that summarizes the implementation, tests, complexity analysis, stability discussion, and optimization findings.

## 🎯 Objective

The Week 9 Assignment 1 focuses on helping students:

* understand how Bubble Sort compares adjacent values
* implement a basic Bubble Sort algorithm in JavaScript
* implement an optimized Bubble Sort algorithm with early-exit detection
* sort integer arrays in ascending order
* explain each key algorithm step through detailed code comments
* test randomly generated arrays
* test already sorted arrays as the best-case scenario
* test descending arrays as the worst-case scenario
* test arrays where all values are identical
* test edge cases such as empty arrays and single-element arrays
* compare basic Bubble Sort against optimized Bubble Sort
* analyze comparison counts, swap counts, pass counts, and early exits
* explain average-case and worst-case `O(n²)` time complexity
* explain best-case improvement for the optimized version
* explain `O(1)` auxiliary space complexity
* explain why Bubble Sort is considered an in-place algorithm
* discuss Bubble Sort stability and equal-value ordering
* generate a concise PDF report directly from the GUI
* practice both manual testing and automated testing

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
* Select Week 09
* View lecture and assignment cards
* Click the Bubble Sort assignment card
* Open the detailed assignment guide
* Use the Working Preview, source code, tests, and Live Test Results panel

Assignments follow the same interaction pattern as lectures.

## 🧩 Three-Layer Assignment Model

### 1. Raw JavaScript Algorithm Layer

Located in:

```txt
src/assignments/week09/bubble-sort-optimization/BubbleSort.js
```

This file contains the reusable JavaScript sorting logic.

It includes:

* basic Bubble Sort
* optimized Bubble Sort
* early-exit detection
* helper functions for cloning arrays
* helper functions for operation counting
* stability-friendly comparison logic
* detailed comments explaining the algorithm step by step

The sorting logic is intentionally written in raw JavaScript so the algorithm can be understood independently of React.

### 2. Assignment Guide UI Layer

Located in:

```txt
src/exercises/Week09BubbleSortAssignmentGuide.jsx
```

This file presents the assignment inside the AD312 course platform.

It includes:

* overview
* learning objectives
* required test cases
* Working Preview
* source-code display
* console-test display
* Vitest-test display
* manual testing instructions
* report-generation section
* summary and takeaways

The guide embeds the interactive Bubble Sort explorer so students can test the algorithm visually.

### 3. Live Test Panel Layer

Located in:

```txt
src/exercises/BubbleSortTestPanel.jsx
```

This file provides an in-app visual testing panel.

It includes:

* normal cases
* edge cases
* expected outputs
* actual outputs
* pass/fail style feedback
* comparison data
* swap data
* optimization observations

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

* Basic Bubble Sort implementation
* Optimized Bubble Sort implementation
* Early-exit mechanism for already sorted input
* Random array test generation
* Already sorted best-case test
* Descending worst-case test
* Identical-values test
* Empty-array edge case
* Single-element edge case
* Negative-number and duplicate-value handling
* GUI buttons for required test cases
* Comparison of basic vs optimized operation counts
* Downloadable PDF report generation
* Full source-code display
* Full console-test display
* Full Vitest-test display
* Manual testing instructions
* Automated testing expectations
* In-app Live Test Results panel

## 🫧 Bubble Sort Behavior

Bubble Sort repeatedly compares adjacent values and swaps them when they are out of order.

For ascending order:

```txt
if left value > right value:
    swap them
```

After each full pass through the array, the largest unsorted value has moved toward the end of the array.

The basic version continues making passes even if the array becomes sorted early.

The optimized version tracks whether any swaps happened during a pass. If no swaps occur, the algorithm knows the array is already sorted and exits early.

This makes the optimized version especially useful for already sorted or nearly sorted input.

## 🚀 Optimization Behavior

The optimized Bubble Sort version includes a `swapped` flag.

During each pass:

* the flag starts as `false`
* if a swap happens, the flag becomes `true`
* after the pass ends, the algorithm checks the flag
* if no swap happened, the loop stops early

This improves the best-case scenario from repeated unnecessary passes to a single pass through the array.

For an already sorted array:

* basic Bubble Sort still performs multiple passes
* optimized Bubble Sort exits after one pass
* both versions return the same sorted result
* optimized Bubble Sort performs fewer operations

## 🧠 Complexity Analysis

### Time Complexity

| Case | Basic Bubble Sort | Optimized Bubble Sort |
|---|---|---|
| Best Case | `O(n²)` | `O(n)` |
| Average Case | `O(n²)` | `O(n²)` |
| Worst Case | `O(n²)` | `O(n²)` |

Bubble Sort has quadratic behavior because it uses nested iteration.

For each pass, the algorithm compares neighboring elements. With many unsorted values, multiple passes are required. As the input size grows, the number of comparisons grows roughly in proportion to `n²`.

The optimized version improves the best case because it can stop after detecting that no swaps are needed.

### Space Complexity

Bubble Sort is considered an in-place sorting algorithm because it rearranges values inside the working array instead of building a second full array.

Its auxiliary space complexity is:

```txt
O(1)
```

Only a small number of variables are needed for counters, loop indexes, swap tracking, and temporary values.

### Stability

Bubble Sort can be stable when it only swaps values when the left value is strictly greater than the right value.

That means equal values are not swapped with each other.

The comparison rule is:

```txt
left > right
```

not:

```txt
left >= right
```

Because equal values are left in their original order, Bubble Sort can preserve the relative order of duplicate elements.

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

* Raw JavaScript Bubble Sort implementation

Testing Layer

* Console-log tests
* Vitest tests
* In-app Live Test Results panel

Report Layer

* Browser-based PDF report generator

## 🧭 Navigation Behavior

* Card-based navigation
* No external routing required
* Controlled through state in `App.jsx`
* Assignment opens inside the existing course-platform detail view
* File tree updates based on the active Week 9 assignment

## 📌 Week 9 Assignment Flow

* Assignment appears as a Week 09 assignment card
* Clicking opens the Bubble Sort guide inside the main view
* The Working Preview renders the Bubble Sort explorer
* Students run test cases using GUI buttons
* Students compare basic and optimized results
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
* Required Test Cases
* Working Preview
* Full Source Code
* Console Test Code
* Vitest Test Code
* Manual Testing
* Live Test Results
* Report Generation
* Summary

### 💻 Embedded Preview

The actual Bubble Sort explorer is rendered inside the guide.

The preview allows students to:

* run a randomly generated array
* run an already sorted array
* run a descending array
* run an identical-values array
* run an empty array
* run a single-element array
* compare basic and optimized Bubble Sort
* view operation counts
* download a generated PDF report

### 🧾 Syntax as Learning Tool

Full code and test syntax are displayed directly in the UI with syntax highlighting.

Code examples are intended to teach:

* raw JavaScript functions
* array cloning
* adjacent comparison
* swap logic
* nested loops
* early-exit optimization
* operation counting
* best-case behavior
* worst-case behavior
* in-place sorting
* stability
* edge-case testing
* report generation

### 🧪 Live Test Panel

The app includes a visual test runner:

* shows pass/fail style states
* groups normal cases and edge cases
* demonstrates sorting behavior interactively
* shows expected vs actual behavior
* compares operation counts
* explains why optimized Bubble Sort improves best-case performance
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
│   └── week09/
│       └── bubble-sort-optimization/
│           ├── BubbleSort.js
│           ├── BubbleSortPdfReport.js
│           ├── BubbleSort.console-tests.js
│           ├── BubbleSort.test.js
│           └── README.md
├── exercises/
│   ├── Week09BubbleSortAssignmentGuide.jsx
│   └── BubbleSortTestPanel.jsx
├── styles/
│   └── week09-bubble-sort-assignment.css
└── courses/
    └── ad312/
        └── week09/
            └── assignments/
                └── bubble-sort-optimization/
                    ├── content.md
                    └── example.js
```

## 🧪 Testing Structure

### ✅ Automated Tests

Located in:

```txt
src/assignments/week09/bubble-sort-optimization/BubbleSort.test.js
```

Includes:

* at least 3 normal cases
* at least 3 edge cases

Normal cases verify:

* randomly ordered arrays are sorted in ascending order
* already sorted arrays remain sorted
* descending arrays are sorted correctly
* optimized Bubble Sort returns the same sorted result as basic Bubble Sort
* optimized Bubble Sort performs fewer operations in the best case

Edge cases verify:

* empty arrays return empty arrays
* single-element arrays return unchanged arrays
* identical-value arrays remain valid and stable
* duplicate values are handled correctly
* negative numbers are sorted correctly
* original input arrays are not accidentally mutated when using the safe helper workflow

### 🧾 Console Tests

Located in:

```txt
src/assignments/week09/bubble-sort-optimization/BubbleSort.console-tests.js
```

The console tests provide a simple command-line style verification workflow.

They cover:

* random arrays
* already sorted arrays
* descending arrays
* identical values
* empty arrays
* single-element arrays
* duplicate values
* negative values
* basic vs optimized comparison

These tests are helpful because they make the algorithm behavior visible outside the browser UI.

### 🧠 In-App Test Panel

Located in:

```txt
src/exercises/BubbleSortTestPanel.jsx
```

Visual learning tool.

Tracks:

* input arrays
* expected sorted output
* actual sorted output
* pass/fail status
* basic Bubble Sort operation counts
* optimized Bubble Sort operation counts
* early-exit behavior
* edge-case handling

## 🔍 Why Both?

| Type | Purpose |
|---|---|
| Automated Tests | correctness |
| Console Tests | simple algorithm verification |
| Test Panel | learning + visualization |
| PDF Report | assignment documentation |

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

### 4. Navigate to Week 9 Assignment 1

* Select course
* Select Week 09
* Click the Bubble Sort assignment card

## 🧪 How to Run Tests

### Run all tests

```bash
npm run test
```

### Run only this assignment’s Vitest tests

```bash
npm run test -- src/assignments/week09/bubble-sort-optimization/BubbleSort.test.js
```

### Run console-log tests

```bash
node src/assignments/week09/bubble-sort-optimization/BubbleSort.console-tests.js
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

Students can use the GUI to generate a downloadable PDF report that summarizes:

* basic Bubble Sort code
* optimized Bubble Sort code
* required test cases
* test outcomes
* comparison counts
* swap counts
* pass counts
* best-case optimization behavior
* time complexity
* space complexity
* stability discussion
* final observations

The report generator supports the assignment requirement to compile a concise report from the implementation, testing, optimization, and analysis work.

## 🎥 Demo

|| Demo Title             | Description          | Link |
| ---------------------- | -------------------- | ---- |
| Assignment Walkthrough | Full UI + guide demo |[Week9_A1](https://youtu.be/t4qg_KJCxGE)|


## 📌 Summary

Week 9 Assignment 1 introduces:

* Bubble Sort as a comparison-based sorting algorithm
* basic Bubble Sort implementation
* optimized Bubble Sort with early-exit detection
* JavaScript algorithm testing
* random, sorted, descending, uniform, empty, and single-element test cases
* operation-count comparison
* `O(n²)` average and worst-case time complexity
* optimized `O(n)` best-case behavior
* `O(1)` auxiliary space complexity
* in-place sorting behavior
* Bubble Sort stability
* console-log testing
* Vitest testing
* in-app Live Test Results
* downloadable report generation

This assignment prepares students for deeper algorithm analysis by showing how a simple sorting algorithm can be implemented, tested, optimized, measured, and explained inside the AD312 course platform.
