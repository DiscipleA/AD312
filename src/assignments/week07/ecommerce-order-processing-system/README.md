---
🎓 AD312 Course Platform — Week 7 Assignment 1

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

Week 7 Assignment 1 introduces linked-list reversal through an e-commerce order processing scenario. Students work with a singly linked list where each node represents a customer order. The original list stores orders from oldest to newest, but the fulfillment strategy changes so the most recent orders must be processed first.

This assignment focuses on pointer manipulation, traversal, reversal, and time/space complexity. Students practice reversing links between nodes without converting the entire list into an array or rebuilding the list from scratch.

🎯 Objective

The Week 7 Assignment 1 focuses on helping students:

* define a node-style order record
* build a singly linked list class
* append new orders to the end of the list
* display orders in insertion order
* reverse a linked list by rewiring `next` references
* understand why linked-list reversal is an O(n) operation
* understand why iterative reversal uses O(1) extra space
* verify behavior with normal cases and edge cases
* connect a data-structure algorithm to a realistic e-commerce workflow
* practice console-based testing and visual testing inside the course platform

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
* Select Week 07
* View assignment cards
* Click the E-Commerce Order Processing System assignment card
* Open the detailed assignment guide

Assignments follow the same interaction pattern as lectures.

🧩 Two-Layer Assignment Model

1. Assignment Guide and Visual Test Layer

* Located in `src/exercises/Week07OrderProcessingAssignmentGuide.jsx`
* Uses `src/exercises/OrderProcessingTestPanel.jsx`
* Displays the overview, objectives, working preview, source code, console tests, manual testing notes, and Live Test Results
* Embeds a visual explanation of the linked-list reversal workflow

2. Completed Assignment Source Layer

* Located in `src/assignments/week07/ecommerce-order-processing-system/`
* Contains the completed raw JavaScript implementation
* Contains the console-log test file
* Contains this README file
* Can be run independently through Node for console-based verification

✨ Features

🧱 Platform Features

* Course + Week navigation
* Clickable Topic Cards
* Assignment detail views
* File tree panel
* Theme support for light and dark mode
* Syntax-highlighted source code display
* Contextual assignment file visibility

🧪 Assignment Features

* Raw JavaScript implementation
* `Node` class for individual orders
* `OrderList` class for linked-list behavior
* `append(id, name, item)` method
* `display()` method that returns comma-separated order IDs
* `reverse()` method that reverses the linked list in place
* Method chaining support through `reverse().display()`
* Detailed comments explaining pointer movement
* Console-log tests
* 3 normal test cases
* 3 edge test cases
* In-app Live Test Results panel
* Manual testing instructions
* Time and space complexity explanation

🛒 E-Commerce Order Processing Behavior

The system models an e-commerce order queue.

Originally:

* the head of the list is the first order received
* each appended node represents a newer order
* display shows orders from oldest to newest

After reversal:

* the most recent order becomes the head
* the oldest order moves to the end
* display shows orders from newest to oldest
* the fulfillment team can process last-minute orders first

Example:

```txt
Original order list:
1,2,3

After reverse:
3,2,1
```

The reversal does not create a new list. Instead, it changes each node’s `next` pointer so the direction of the chain is reversed.

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

* Raw JavaScript implementation in `src/assignments/week07/ecommerce-order-processing-system/`

Testing Layer

* Console-log tests
* In-app visual testing panel

Mirror Layer

* Lightweight course reference files under `src/courses/ad312/week07/assignments/`

🧭 Navigation Behavior

* Card-based navigation
* No external routing required
* Controlled through state in `App.jsx`
* Assignment card opens the Week 7 Assignment 1 guide
* File tree updates to show relevant assignment files

📌 Week 7 Assignment Flow

* Assignment appears as a Week 07 assignment card
* Clicking opens the guide inside the main view
* The guide explains the linked-list reversal scenario
* The working preview demonstrates order insertion and reversal
* The Live Test Results panel checks normal and edge cases
* The full source code and console test code appear inside the guide
* File tree stays context-aware

🎨 UI Patterns

🧱 Card-Based Entry

All content begins with clickable cards.

📖 Structured Sections

Assignment uses structured sections:

* Overview
* Objectives
* Required Order Fields
* Working Preview
* Live Test Results
* Standalone JavaScript Setup
* Completed Source Code
* Console Test Code
* Manual Testing
* Complexity and Architecture Notes
* Summary

💻 Embedded Preview

The assignment guide includes a working preview that demonstrates:

* adding orders
* displaying the original linked list
* reversing the linked list
* displaying the reversed linked list
* explaining which order is now processed first

🧾 Syntax as Learning Tool

Full code and test syntax are displayed directly in the UI with syntax highlighting.

Code examples are intended to teach:

* class construction
* node object structure
* head pointer behavior
* singly linked list traversal
* append logic
* reverse pointer rewiring
* why `next` must be saved before changing `curr.next`
* how `prev`, `curr`, and `next` move through the list
* why reversal is O(n)
* why extra memory usage is O(1)
* how console tests verify algorithm correctness

🧪 Live Test Panel

The app includes a visual test runner:

* shows PASS / WAIT states
* groups normal and edge cases
* demonstrates linked-list reversal expectations
* checks output before and after reversal
* complements the official console-log test file

This complements, but does not replace, the console-based tests.

🗂 Project Structure

```txt
src/
├── App.jsx
├── components/
├── data/
├── lectures/
├── exercises/
│   ├── Week07OrderProcessingAssignmentGuide.jsx
│   └── OrderProcessingTestPanel.jsx
├── assignments/
│   └── week07/
│       └── ecommerce-order-processing-system/
│           ├── OrderProcessingSystem.js
│           ├── OrderProcessingSystem.console-tests.js
│           └── README.md
├── styles/
│   └── week07-ecommerce-order-processing-assignment.css
└── courses/
    └── ad312/
        └── week07/
            └── assignments/
                └── ecommerce-order-processing-system/
                    ├── content.md
                    └── example.js
```

🧪 Testing Structure

✅ Console Tests

Located in:

```txt
src/assignments/week07/ecommerce-order-processing-system/OrderProcessingSystem.console-tests.js
```

Includes:

* 3 normal cases
* 3 edge cases

Normal cases verify:

* orders are appended and displayed in the order they were added
* reversing the list displays the most recent order first
* reversing the list again restores the original order

Edge cases verify:

* an empty list displays as an empty string
* reversing an empty list does not crash
* reversing a single-node list preserves that one order

🧠 In-App Test Panel

Located in:

```txt
src/exercises/OrderProcessingTestPanel.jsx
```

Visual learning tool.

Tracks:

* append behavior
* original display behavior
* reverse behavior
* double-reverse behavior
* empty-list behavior
* single-node behavior
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

4. Navigate to Week 7 Assignment 1

* Select course
* Select Week 07
* Click the E-Commerce Order Processing System assignment card

🧪 How to Run Tests

Run the console test file directly:

```bash
node src/assignments/week07/ecommerce-order-processing-system/OrderProcessingSystem.console-tests.js
```

Run the app and use the Live Test Results panel:

```bash
npm run dev
```

Then open Week 7 Assignment 1 and run the visual normal and edge checks.

⚙️ Complexity Notes

| Operation | Time Complexity | Space Complexity | Explanation |
|---|---:|---:|---|
| `append()` | O(n) | O(1) | Traverses to the end of the list before adding the new node |
| `display()` | O(n) | O(n) | Visits every node and stores each displayed ID in an output array |
| `reverse()` | O(n) | O(1) | Visits each node once and rewires links in place |

The key algorithm is `reverse()`.

It uses three moving references:

* `prev`
* `curr`
* `next`

At each step:

* `next` saves the original next node
* `curr.next` is redirected backward to `prev`
* `prev` moves forward to `curr`
* `curr` moves forward to the saved `next`

When traversal finishes, `prev` points to the new head of the reversed list.

🎥 Demo

| Demo Title | Description | Link |
|---|---|---|
| Assignment Walkthrough | Full UI + guide demo |  |

📌 Summary

Week 7 Assignment 1 introduces:

* singly linked list construction
* e-commerce order modeling
* append traversal
* linked-list display logic
* iterative linked-list reversal
* pointer/reference manipulation
* normal and edge console tests
* visual Live Test Results
* time and space complexity analysis

This assignment prepares students for more advanced data-structure work by showing how a realistic business requirement can be solved through direct linked-list pointer manipulation.
---
