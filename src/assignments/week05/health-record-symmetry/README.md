---
🎓 AD312 Course Platform — Week 5 Assignment 1

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

Week 5 Assignment 1 introduces singly linked-list analysis through a healthcare scenario. Students represent patient metric readings as a singly linked list and determine whether the record is symmetrical when read forward and backward.

This assignment focuses on raw JavaScript data-structure reasoning. Students practice node construction, pointer traversal, slow/fast pointer movement, in-place reversal, comparison logic, and algorithmic complexity without relying on React state or array-only shortcuts for the core solution.

🎯 Objective

The Week 5 Assignment 1 focuses on helping students:

* define a singly linked-list node for patient metric readings
* build helper functions that create and inspect health records
* use slow and fast pointers to find the middle of a linked list
* reverse the second half of a linked list in place
* compare the first half and reversed second half for symmetry
* return `true` for symmetrical records and `false` for non-symmetrical records
* reason about O(n) time complexity and O(1) extra algorithm space
* test normal and edge cases with console-log tests
* connect pointer mechanics to a realistic healthcare data scenario
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
* Select Week 05
* View lecture and assignment cards
* Click the Patient Health Record Symmetry assignment card
* Open the detailed assignment guide

Assignments follow the same interaction pattern as lectures.

🧩 Two-Layer Assignment Model

1. Assignment Guide and Visual Test Layer

* Located in `src/exercises/Week05HealthRecordSymmetryAssignmentGuide.jsx`
* Uses `src/exercises/HealthRecordSymmetryTestPanel.jsx`
* Displays background, objective, requirements, working preview, source code, console tests, manual testing, complexity notes, and takeaways
* Embeds the health-record preview and Live Test Results panel

2. Completed Assignment Source Layer

* Located in `src/assignments/week05/health-record-symmetry/`
* Contains the raw JavaScript implementation
* Contains the console-log test file
* Contains this README file
* Can be inspected independently from the platform guide

✨ Features

🧱 Platform Features

* Course + Week navigation
* Clickable Topic Cards
* Lecture + Assignment detail views
* File tree panel
* Theme support for light and dark mode
* Syntax-highlighted source code display
* Contextual assignment file visibility

🧪 Assignment Features

* Raw JavaScript linked-list solution
* `Node` class for individual health metric readings
* `HealthMetricNode` alias for preview compatibility
* `createHealthRecord(values)` helper
* `linkedListToArray(head)` helper for preview/test visualization
* `isHealthRecordSymmetric(head)` algorithm
* Slow/fast pointer middle detection
* In-place second-half reversal
* First-half versus second-half comparison
* Console-log tests
* 3 normal cases
* 3 edge cases
* In-app Live Test Results panel
* Manual testing instructions
* Complexity summary

🏥 Health Record Symmetry Behavior

The assignment models patient readings as a linked list.

Example symmetrical record:

```txt
95 -> 102 -> 110 -> 102 -> 95
```

This is symmetrical because the values match when read from the front and from the back.

Example non-symmetrical record:

```txt
80 -> 90 -> 100 -> 110
```

This is not symmetrical because the values do not mirror each other.

The optimized solution does not copy all node values into an array for comparison. Instead, it uses pointer mechanics:

* move `slow` and `fast` pointers to find the middle
* reverse the second half of the list
* compare the left side and reversed right side
* return the boolean result

🏗 Architecture

🧭 High-Level Layers

App Shell

* Controls navigation and rendering

Data Layer

* `courseData.js` defines course/week/card structure

Component Layer

* Sidebar, Header, TopicCard, FileTreePanel, and shared UI components

Content Layer

* Assignment guide component in `src/exercises/`

Assignment Source Layer

* Raw JavaScript implementation in `src/assignments/week05/health-record-symmetry/`

Testing Layer

* Console-log tests
* In-app visual testing panel

Mirror Layer

* Lightweight course reference files under `src/courses/ad312/week05/assignments/`

🧭 Navigation Behavior

* Card-based navigation
* No external routing required
* Controlled through state in `App.jsx`
* Assignment card opens the Week 5 Assignment 1 guide
* File tree updates to show relevant assignment files

📌 Week 5 Assignment Flow

* Assignment appears as a Week 05 assignment card
* Clicking opens the guide inside the main view
* The guide explains the healthcare linked-list scenario
* The working preview demonstrates symmetric and non-symmetric records
* The Live Test Results panel checks normal and edge cases
* Full source code and console test code appear inside the guide
* File tree stays context-aware

🎨 UI Patterns

🧱 Card-Based Entry

All content begins with clickable cards.

📖 Structured Sections

Assignment uses structured sections:

* Background
* Objective
* Requirements
* Working Preview
* Live Test Results
* Starter Shape
* Full Source Code
* Console-Log Tests
* Manual Testing
* Complexity Summary
* Takeaways

💻 Embedded Preview

The assignment guide includes a working preview that demonstrates:

* an odd-length symmetric record
* an even-length symmetric record
* a non-symmetric trend
* empty and single-node edge cases
* the boolean result returned by the algorithm

🧾 Syntax as Learning Tool

Full code and test syntax are displayed directly in the UI with syntax highlighting.

Code examples are intended to teach:

* linked-list node construction
* the role of the head pointer
* slow and fast pointer traversal
* why finding the middle matters
* how to reverse the second half of a list
* why references must be preserved before rewiring pointers
* how linked-list palindrome comparison works
* how console tests verify algorithm correctness
* why the solution is O(n) time and O(1) extra space

🧪 Live Test Panel

The app includes a visual test runner:

* shows PASS / WAIT states
* mirrors the six required console-log tests
* displays selected input values
* shows expected versus actual boolean output
* shows list state after the check
* complements the official console test file

This complements, but does not replace, the console-based tests.

🗂 Project Structure

```txt
src/
├── App.jsx
├── components/
├── data/
├── lectures/
├── exercises/
│   ├── Week05HealthRecordSymmetryAssignmentGuide.jsx
│   └── HealthRecordSymmetryTestPanel.jsx
├── assignments/
│   └── week05/
│       └── health-record-symmetry/
│           ├── HealthRecordSymmetry.js
│           ├── HealthRecordSymmetry.console-tests.js
│           ├── HealthRecordSymmetryExplorer.jsx
│           └── README.md
├── styles/
│   └── week05-health-record-symmetry-assignment.css
└── courses/
    └── ad312/
        └── week05/
            └── assignments/
                └── health-record-symmetry/
                    ├── content.md
                    └── example.js
```

🧪 Testing Structure

✅ Console Tests

Located in:

```txt
src/assignments/week05/health-record-symmetry/HealthRecordSymmetry.console-tests.js
```

Includes:

* 3 normal cases
* 3 edge cases

Normal cases verify:

* an odd-length symmetric record returns `true`
* an even-length symmetric record returns `true`
* a non-symmetric trend returns `false`

Edge cases verify:

* an empty record returns `true`
* a single-node record returns `true`
* a two-node non-symmetric record returns `false`

🧠 In-App Test Panel

Located in:

```txt
src/exercises/HealthRecordSymmetryTestPanel.jsx
```

Visual learning tool.

Tracks:

* odd symmetric input
* even symmetric input
* non-symmetric input
* empty-list behavior
* single-node behavior
* two-different-readings behavior
* expected output versus actual output

🔍 Why Both?

| Type | Purpose |
|---|---|
| Console Tests | correctness |
| Test Panel | learning + visualization |

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

4. Navigate to Week 5 Assignment 1

* Select course
* Select Week 05
* Click the Patient Health Record Symmetry assignment card

🧪 How to Run Tests

Run the console test file directly:

```bash
node src/assignments/week05/health-record-symmetry/HealthRecordSymmetry.console-tests.js
```

Run the app and use the Live Test Results panel:

```bash
npm run dev
```

Then open Week 5 Assignment 1 and run the visual normal and edge checks.

⚙️ Complexity Notes

| Operation | Time Complexity | Extra Space Complexity | Explanation |
|---|---:|---:|---|
| `createHealthRecord()` | O(n) | O(n) | Creates one node for each value |
| `linkedListToArray()` | O(n) | O(n) | Visits every node and stores values for display |
| `isHealthRecordSymmetric()` | O(n) | O(1) | Finds the middle, reverses links, and compares nodes in place |

The core algorithm uses constant extra algorithm space because it does not allocate a second list or a full comparison array. It works by changing node references directly.

🎥 Demo

| Demo Title             | Description          | Link |
| ---------------------- | -------------------- | ---- |
| Assignment Walkthrough | Full UI + guide demo |[Week5_A](https://youtu.be/c28KNPcyvug)|

📌 Summary

Week 5 Assignment 1 introduces:

* raw JavaScript linked-list logic
* patient health-record modeling
* slow and fast pointer traversal
* in-place linked-list reversal
* symmetry/palindrome checking
* normal and edge console tests
* visual Live Test Results
* time and space complexity analysis

This assignment prepares students for more advanced linked-list work by showing how pointer manipulation can solve a practical data-analysis problem efficiently.
---
