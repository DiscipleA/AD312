---
# 🎓 AD312 Course Platform — Week 8 Assignment 1

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
* syntax-highlighted source code
* in-app Live Test Results panels
* completed assignment source files
* official test files
* downloadable learning artifacts

Week 8 Assignment 1 introduces algorithm implementation and analysis through **Selection Sort**. Students implement the Selection Sort algorithm in JavaScript, test it against required input categories, analyze its time and space complexity, and examine whether the algorithm is stable.

This assignment focuses on connecting raw JavaScript algorithm logic with an interactive course-platform experience. Students can run sorting examples through the GUI, inspect the sorted output, view operation counts, run console-log tests, run Vitest tests, and generate a polished downloadable PDF report summarizing the implementation, testing, complexity analysis, and stability observations.

---

## 🎯 Objective

The Week 8 Assignment 1 focuses on helping students:

* implement Selection Sort in raw JavaScript
* sort arrays of integers in ascending order
* understand how the outer loop selects each sorted position
* understand how the inner loop scans the remaining unsorted portion
* explain why nested loops produce **O(n²)** time complexity
* explain why regular Selection Sort uses **O(1)** extra space
* understand why Selection Sort is considered an in-place algorithm
* test required normal and edge-case inputs
* compare ascending and descending sorting behavior
* examine why regular Selection Sort is generally not stable
* explore a stable Selection Sort variant
* generate a downloadable PDF report from the GUI
* practice both manual testing and automated testing

---

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

1. Select Course, such as AD312
2. Select Week 08
3. View lecture and assignment cards
4. Click the Selection Sort assignment card
5. Open the detailed assignment guide inside the main course view

Assignments follow the same interaction pattern as lectures.

---

## 🧩 Corrected Week 5+ Assignment Model

Week 8 Assignment 1 follows the corrected assignment structure used by the current platform.

### 1. Assignment Guide Layer

Located in:

```txt
src/exercises/Week08SelectionSortAssignmentGuide.jsx
```

This guide contains:

* assignment overview
* objectives
* required test case explanation
* working preview
* full source code display
* full test code display
* manual testing notes
* Live Test Results panel
* key takeaways
* summary

### 2. Live Test Panel Layer

Located in:

```txt
src/exercises/SelectionSortTestPanel.jsx
```

This panel provides an in-app visual testing experience. It checks the required cases from the assignment prompt and presents pass/fail feedback directly inside the course platform.

### 3. Completed Assignment Source Layer

Located in:

```txt
src/assignments/week08/selection-sort-analysis/
```

This folder contains the completed JavaScript implementation, console-log tests, Vitest tests, README file, and PDF report helper.

### 4. Mirror Source Layer

Located in:

```txt
src/courses/ad312/week08/assignments/selection-sort-analysis/
```

This mirror layer provides lightweight course-content reference files that parallel the runtime assignment.

---

## ✨ Features

### 🧱 Platform Features

* Course and week navigation
* Clickable Topic Cards
* Assignment detail view
* Contextual Project Tree panel
* Theme support for light and dark mode
* Syntax-highlighted code examples
* Working Preview section
* Live Test Results panel

### 🧪 Assignment Features

* Raw JavaScript Selection Sort implementation
* Ascending sort behavior
* Descending sort enhancement
* Stable Selection Sort variant
* Required test case buttons in the GUI
* Operation count tracking
* Comparisons and swaps display
* Time complexity explanation
* Space complexity explanation
* Stability explanation
* Console-log test file
* Vitest test file
* Downloadable PDF report generator
* Manual verification section
* Key Takeaways section

---

## 🔢 Selection Sort Behavior

The main Selection Sort implementation sorts arrays in ascending order.

The algorithm works by:

* treating the beginning of the array as the sorted region
* treating the rest of the array as the unsorted region
* scanning the unsorted region to find the smallest value
* swapping the smallest value into the next sorted position
* repeating until the entire array is sorted

Example:

```txt
Input:
[64, 25, 12, 22, 11]

Output:
[11, 12, 22, 25, 64]
```

The implementation avoids mutating the original input array by copying it before sorting. This keeps the preview and tests safer while still demonstrating the in-place behavior of the internal sorting process.

---

## 📊 Algorithm Analysis

### ⏱ Time Complexity

Selection Sort uses nested loops.

The outer loop runs once for each final sorted position. The inner loop scans the remaining unsorted values to find the smallest item.

This produces roughly:

```txt
n + (n - 1) + (n - 2) + ... + 1
```

That pattern simplifies to quadratic growth, which is why Selection Sort has:

```txt
O(n²)
```

time complexity.

### 🧠 Space Complexity

Regular Selection Sort uses only a small number of extra variables, such as:

* current index
* selected minimum index
* temporary swap value
* comparison counter
* swap counter

Because it does not require a second full array during the internal sorting process, it is considered an in-place algorithm with:

```txt
O(1)
```

extra space.

### 🔁 Stability

Regular Selection Sort is generally **not stable**.

A stable sorting algorithm preserves the relative order of equal-key records. Selection Sort may reorder equal-key records because it swaps a selected minimum value with the value at the current sorted position.

The assignment includes a stability demonstration and a stable Selection Sort variant to help explain this behavior.

---

## 🧪 Required Test Cases

The assignment requires the Selection Sort implementation to be tested with:

* a randomly generated array of integers
* an array already sorted in ascending order
* an array sorted in descending order
* an array with all elements being the same
* an empty array
* an array with one element

These cases are represented in both the GUI and the automated tests.

---

## 🧾 Downloadable PDF Report

The assignment includes a PDF report generator.

The report summarizes:

* implementation details
* selected test cases
* sorted results
* complexity analysis
* operation counts
* stability observations
* enhancement notes
* final findings

The report is generated from the browser and downloaded as:

```txt
selection-sort-week08-assignment1-report.pdf
```

The PDF report supports the assignment requirement to prepare a brief report summarizing code implementation, testing, complexity, stability, and enhancement observations.

---

## 🏗 Architecture

### 🧭 High-Level Layers

**App Shell**

Controls navigation and rendering.

**Data Layer**

`courseData.js` defines course, week, lecture, and assignment card structure.

**Component Layer**

Reusable platform components such as Sidebar, Header, TopicCard, CodeBlock, and FileTreePanel.

**Assignment Guide Layer**

Provides the instructional page shown inside the course platform.

**Exercise/Test Panel Layer**

Provides visual testing inside the assignment guide.

**Completed Source Layer**

Contains the actual assignment implementation and tests.

**Mirror Layer**

Contains lightweight source/reference files for the course content tree.

**Testing Layer**

Uses console-log tests and Vitest tests.

---

## 🧭 Navigation Behavior

* Card-based navigation
* No external routing required
* Controlled through state in `App.jsx`
* Week 08 assignment card opens the Selection Sort assignment guide
* File tree stays context-aware
* Working Preview renders the interactive Selection Sort GUI
* Live Test Results panel verifies required behavior visually

---

## 🎨 UI Patterns

### 🧱 Card-Based Entry

All assignment content begins with a clickable Topic Card in the Week 08 view.

### 📖 Structured Sections

The assignment guide uses structured sections:

* Overview
* Objective
* Required Test Cases
* Working Preview
* Full Source Code
* Full Console Test Code
* Full Vitest Test Code
* Live Test Results
* Manual Verification
* Key Takeaways
* Summary

### 💻 Embedded Preview

The working preview lets students:

* run required sorting cases
* inspect input and output arrays
* compare ascending and descending results
* view comparison and swap counts
* trigger the report download

### 🧾 Syntax as Learning Tool

Full code and test syntax are displayed directly inside the UI with syntax highlighting.

Code examples are intended to teach:

* algorithm setup
* array copying
* loop structure
* selected minimum tracking
* swap behavior
* operation counting
* ascending sort logic
* descending sort logic
* stable sort logic
* report generation
* test expectations

### 🧪 Live Test Panel

The app includes a visual test runner that:

* shows pass/fail states
* verifies required test cases
* separates normal cases and edge cases
* demonstrates expected vs actual behavior
* complements the official Vitest suite

This complements, but does not replace, automated tests.

---

## 🗂 Project Structure

```txt
src/
├── App.jsx
├── components/
├── data/
├── lectures/
├── assignments/
│   └── week08/
│       └── selection-sort-analysis/
│           ├── SelectionSort.js
│           ├── SelectionSort.console-tests.js
│           ├── SelectionSort.test.js
│           ├── SelectionSortPdfReport.js
│           └── README.md
├── exercises/
│   ├── Week08SelectionSortAssignmentGuide.jsx
│   └── SelectionSortTestPanel.jsx
├── styles/
│   └── week08-selection-sort-assignment.css
└── courses/
    └── ad312/
        └── week08/
            └── assignments/
                └── selection-sort-analysis/
                    ├── content.md
                    └── example.js
```

---

## 🧪 Testing Structure

### ✅ Console Tests

Located in:

```txt
src/assignments/week08/selection-sort-analysis/SelectionSort.console-tests.js
```

The console-log test file provides raw JavaScript verification.

It checks:

* random array sorting
* already sorted array sorting
* descending input sorting
* all-same value sorting
* empty array behavior
* single-element array behavior
* descending enhancement behavior
* stable Selection Sort behavior
* operation count behavior
* original input protection

Run it with:

```bash
node src/assignments/week08/selection-sort-analysis/SelectionSort.console-tests.js
```

### ✅ Automated Vitest Tests

Located in:

```txt
src/assignments/week08/selection-sort-analysis/SelectionSort.test.js
```

Includes:

* at least 3 normal cases
* at least 3 edge cases

Normal cases verify:

* unsorted arrays are sorted in ascending order
* already sorted arrays remain sorted
* descending arrays are sorted correctly
* duplicate values are handled correctly

Edge cases verify:

* empty arrays return empty arrays
* single-element arrays return safely
* invalid input is rejected safely
* original input arrays are not unexpectedly mutated
* stable sorting preserves equal-key order

### 🧠 In-App Test Panel

Located in:

```txt
src/exercises/SelectionSortTestPanel.jsx
```

The visual test panel tracks:

* required normal cases
* required edge cases
* expected sorted output
* actual sorted output
* pass/fail status
* operation counts

---

## 🔍 Why Both?

| Type | Purpose |
|---|---|
| Console Tests | raw JavaScript verification |
| Automated Vitest Tests | correctness |
| Live Test Panel | learning + visualization |
| Manual Verification | student-facing confirmation |

---

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

### 4. Navigate to Week 8 Assignment 1

* Select course
* Select Week 08
* Click the Selection Sort assignment card

---

## 🧪 How to Run Tests

### Run all tests

```bash
npm run test
```

### Run only this assignment’s Vitest tests

```bash
npm run test -- src/assignments/week08/selection-sort-analysis/SelectionSort.test.js
```

### Run this assignment’s console tests

```bash
node src/assignments/week08/selection-sort-analysis/SelectionSort.console-tests.js
```

### Watch mode

```bash
npm run test:watch
```

### UI mode, optional

```bash
npm run test:ui
```

---

## 🎥 Demo

| Demo Title | Description | Link |
|---|---|---|
| Assignment Walkthrough | Full Selection Sort GUI, tests, and PDF report demo |  |

---

## 📌 Summary

Week 8 Assignment 1 introduces:

* Selection Sort implementation in JavaScript
* ascending sorting behavior
* descending sorting enhancement
* stable Selection Sort variant
* required normal and edge-case testing
* operation count analysis
* O(n²) time complexity reasoning
* O(1) in-place space complexity reasoning
* stability analysis
* console-log test verification
* Vitest automated testing
* Live Test Results visualization
* downloadable PDF report generation

This assignment connects algorithm implementation with analysis. Students do not only write Selection Sort; they also test it, explain its behavior, observe its limitations, and document their findings in a generated report.
