#🎓 AD312 Course Platform — Week 6 Assignment 1

📝 Overview

This project continues the Vite + React learning platform introduced in earlier weeks. Instead of behaving like a basic React app, it functions as a course portfolio and instructional platform.

It supports:

* course switching
* week switching
* clickable lecture and assignment cards
* lecture detail views
* assignment guide pages
* contextual file tree panel
* dark/light theme support
* working previews
* Live Test Results panels

Week 6 Assignment 1 introduces a raw JavaScript data-structure challenge using a doubly linked list. Students work with two sorted patient-record lists and merge them into one sorted list without creating a brand-new list of copied records.

The assignment scenario is based on HealthMerge Inc. acquiring CarePlus. Both healthcare providers already store patient records sorted by SSN. The goal is to combine both sorted lists into one sorted doubly linked list while preserving all records, including duplicate SSNs.

This assignment focuses on linked list pointer management, sorted merging, node reuse, `prev` and `next` references, edge-case handling, and time/space complexity.

🎯 Objective

The Week 6 Assignment 1 focuses on helping students:

* understand how doubly linked list nodes store both `prev` and `next` references
* represent patient records as linked list nodes
* merge two sorted linked lists by SSN
* preserve duplicate SSN records when the same SSN appears in both lists
* reuse existing nodes instead of creating a copied list
* update `prev` pointers correctly while weaving lists together
* handle empty-list edge cases safely
* reason about `O(m + n)` time complexity
* reason about `O(1)` extra space complexity
* practice manual testing with console-log tests
* use the in-app Live Test Results panel as a visual learning aid

⚙️ How It Works

🧠 App Controller Pattern

The application is controlled centrally through `App.jsx`, which manages:

* selected course
* selected week
* active lecture
* active assignment
* active content rendering

Instead of separate pages, content is rendered dynamically based on user interaction.

📚 Week-Based Content System

Content is defined through structured data, typically in `courseData.js`, which determines:

* available weeks
* lecture cards
* assignment cards
* assignment titles
* assignment summaries
* card metadata

🖱 Navigation Flow

* Select Course, such as AD312
* Select Week 06
* View lecture and assignment cards
* Click the Week 6 Assignment 1 card
* Open the detailed assignment guide

Assignments follow the same interaction pattern as lectures.

🧩 Assignment Model

Week 6 Assignment 1 uses the corrected Week 5+ assignment structure.

1. Assignment Guide Layer

* Located in `src/exercises/Week06PatientRecordMergeAssignmentGuide.jsx`
* Contains the teaching content, setup notes, preview, source code, console tests, Live Test Results, and summary
* Explains how the raw JavaScript module maps to the healthcare-record scenario

2. Live Test Results Layer

* Located in `src/exercises/PatientRecordMergeTestPanel.jsx`
* Provides an in-app visual test panel
* Shows normal and edge cases
* Complements the console-log tests

3. Completed Source Layer

* Located in `src/assignments/week06/patient-record-merge-doubly-linked-list/PatientRecordMerge.js`
* Contains the `Node` class and `mergeLists` function
* Uses raw JavaScript only
* Reuses existing linked list nodes

4. Working Preview Layer

* Located in `src/assignments/week06/patient-record-merge-doubly-linked-list/PatientRecordMergeExplorer.jsx`
* Lets students experiment with provider record lists
* Shows HealthMerge records, CarePlus records, and merged output
* Helps visualize pointer-safe merging

5. Console Test Layer

* Located in `src/assignments/week06/patient-record-merge-doubly-linked-list/PatientRecordMerge.console-tests.js`
* Includes normal and edge test cases
* Can be run directly with Node

✨ Features

🧱 Platform Features

* Course and week navigation
* Clickable Topic Cards
* Lecture and assignment detail views
* File tree panel
* Theme support
* Structured guide pages
* Working preview area
* Live Test Results panel

🧪 Assignment Features

* Raw JavaScript implementation
* `Node` class for patient records
* Doubly linked list structure
* Sorted merge by SSN
* Duplicate SSN preservation
* `prev` pointer rewiring
* `next` pointer rewiring
* Empty-list handling
* Working preview with sample patient lists
* Console-log test file
* In-app visual Live Test Results panel
* Complexity explanation
* Full source code display
* Full console test display
* Manual testing instructions

🏥 Patient Record Behavior

Each patient record is represented as a doubly linked list node.

Each node stores:

* `ssn`
* `age`
* `name`
* `prev`
* `next`

The merge function receives:

* the head of HealthMerge’s sorted list
* the head of CarePlus’s sorted list

The function returns:

* the head of one merged sorted doubly linked list

The output list must:

* stay sorted by SSN
* include all records from both providers
* preserve duplicate SSNs
* reuse the existing nodes
* correctly connect `next` links
* correctly reconnect `prev` links

🧠 Doubly Linked List Merge Behavior

The merge algorithm works by:

* checking whether either input list is missing
* choosing the smaller starting head
* walking both lists with two pointers
* connecting the smaller current node after the merged tail
* updating that node’s `prev` pointer to point backward
* advancing through the selected list
* appending any remaining nodes after one list is exhausted
* returning the merged head

The important detail is that the algorithm does not create a new list of copied patient records. It rearranges existing node references.

🏗 Architecture

🧭 High-Level Layers

App Shell

* Controls navigation and rendering

Data Layer

* `courseData.js` defines course, week, lecture, and assignment card structure

Component Layer

* Sidebar, Header, TopicCard, FileTreePanel, and shared UI components

Content Layer

* Assignment guide components inside `src/exercises/`

Assignment Source Layer

* Completed assignment code inside `src/assignments/week06/...`

Testing Layer

* Console-log tests
* In-app visual Live Test Results panel

Mirror Layer

* Lightweight source/reference files inside `src/courses/ad312/week06/...`

🧭 Navigation Behavior

* Card-based navigation
* No external routing required
* Controlled through state in `App.jsx`
* Assignment opens inside the main course platform view

📌 Week 6 Assignment Flow

* Assignment appears as a Week 06 assignment card
* Clicking opens the guide inside the main view
* The guide renders the working preview
* The guide renders the Live Test Results panel
* The guide displays full source code
* The guide displays full console test code
* The Project Tree stays context-aware

🎨 UI Patterns

🧱 Card-Based Entry

All content begins with clickable cards.

📖 Structured Sections

Assignment uses structured sections:

* Overview
* Objectives
* Standalone JavaScript Setup
* Working Preview
* Live Test Results
* Starter Shape
* Full Source Code
* Console-Log Tests
* Manual Testing
* Complexity Summary
* Takeaways

💻 Embedded Preview

The working preview renders `PatientRecordMergeExplorer`.

Students can use the preview to:

* compare HealthMerge and CarePlus lists
* switch between normal and edge scenarios
* inspect parsed records
* inspect the merged sorted result
* verify that backward `prev` links remain valid

🧾 Syntax as Learning Tool

Full source and test syntax are displayed directly in the UI with syntax highlighting.

Code examples are intended to teach:

* class construction
* node structure
* `prev` references
* `next` references
* linked list heads
* pointer traversal
* sorted merging
* duplicate preservation
* empty-list handling
* time complexity
* space complexity

🧪 Live Test Panel

The app includes a visual test runner.

It demonstrates:

* simple sorted merge behavior
* duplicate SSN behavior
* interleaving records from both lists
* one empty list
* two empty lists
* preserving backward `prev` links

This complements, but does not replace, the console-log tests.

🗂 Project Structure

```txt
src/
├── App.jsx
├── components/
├── data/
├── lectures/
├── exercises/
│   ├── Week06PatientRecordMergeAssignmentGuide.jsx
│   └── PatientRecordMergeTestPanel.jsx
├── assignments/
│   └── week06/
│       └── patient-record-merge-doubly-linked-list/
│           ├── PatientRecordMerge.js
│           ├── PatientRecordMergeExplorer.jsx
│           ├── PatientRecordMerge.console-tests.js
│           └── README.md
├── styles/
│   └── week06-patient-record-merge-assignment.css
└── courses/
    └── ad312/
        └── week06/
            └── assignments/
                └── patient-record-merge-doubly-linked-list/
                    ├── content.md
                    └── example.js
```

🧪 Testing Structure

✅ Console-Log Tests

Located in:

```txt
src/assignments/week06/patient-record-merge-doubly-linked-list/PatientRecordMerge.console-tests.js
```

Includes:

* 3 normal cases
* 3 edge cases

Normal cases verify:

* two one-node lists merge in sorted order
* duplicate SSNs are preserved
* records from both lists interleave correctly

Edge cases verify:

* first list is empty
* both lists are empty
* second list is empty

🧠 In-App Test Panel

Located in:

```txt
src/exercises/PatientRecordMergeTestPanel.jsx
```

Visual learning tool.

Tracks:

* sorted output
* duplicate preservation
* interleaving behavior
* empty-list handling
* valid backward links
* expected vs actual output

🔍 Why Both?

| Type | Purpose |
|---|---|
| Console Tests | quick raw JavaScript verification |
| Test Panel | learning, visualization, and guided feedback |

🚀 How to Run

1. Install dependencies

```bash
npm install
```

2. Start development server

```bash
npm run dev
```

3. Open app

```txt
http://localhost:5173/
```

4. Navigate to Week 6 Assignment 1

* Select course
* Select Week 06
* Click the Patient Record Merge assignment card

🧪 How to Run Console Tests

Run this assignment’s console tests:

```bash
node src/assignments/week06/patient-record-merge-doubly-linked-list/PatientRecordMerge.console-tests.js
```

Expected behavior:

* all six test messages should print `passed => true`
* output arrays should show merged patient records in sorted SSN order

This assignment does not require a Vitest test file.

🎥 Demo

| Demo Title             | Description          | Link |
| ---------------------- | -------------------- | ---- |
| Assignment Walkthrough Part 1| Full UI + guide demo |[Week6_A1P1](https://youtu.be/wzFikjaOCRI)|
| Assignment Walkthrough Part 2| Full UI + guide demo |[Week6_A1P2](https://youtu.be/zFYrczDq-hA)|

📌 Summary

Week 6 Assignment 1 introduces:

* raw JavaScript linked list practice
* doubly linked list node structure
* sorted merging by SSN
* healthcare-style patient record modeling
* duplicate record preservation
* `prev` and `next` pointer rewiring
* edge-case handling for empty lists
* console-log testing
* visual Live Test Results feedback
* time and space complexity analysis

The assignment prepares students for more advanced data-structure work by showing how pointer-based algorithms can solve realistic record-integration problems without relying on arrays, sorting helpers, or copied data structures.
---
