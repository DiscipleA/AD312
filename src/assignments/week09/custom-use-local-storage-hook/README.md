# 🎓 AD312 Course Platform — Week 9 Assignment 2

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

Week 9 Assignment 2 introduces reusable React logic through a custom hook called `useWindowSize`. Students learn how to track the browser window's current width and height, store those values in React state, update them when the browser resizes, and clean up event listeners correctly.

This assignment uses the example of a streaming website. A streaming interface may need a compact mobile layout on phones and a full-sized layout on laptops. Instead of rewriting the same window-size tracking logic in every component, students package the behavior into one reusable hook that any component can import.

This assignment focuses on custom hooks, `useState`, `useEffect`, browser resize events, cleanup functions, responsive UI behavior, and testing hook-driven component behavior in a Vite + React environment.

## 🎯 Objective

The Week 9 Assignment 2 focuses on helping students:

* understand why custom hooks are useful for reusable logic
* create a custom hook whose name starts with `use`
* build a `useWindowSize` hook
* sync the browser window size with React state
* use `useEffect` to attach a `resize` event listener
* clean up after the component by removing the event listener
* understand why cleanup prevents duplicate listeners and memory leaks
* use width and height values to drive a responsive streaming layout
* switch between compact mobile and full desktop-style layouts
* test normal viewport-size cases
* test edge cases such as tiny, zero, and very large viewports
* display working behavior through GUI controls
* visualize viewport behavior with charts
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
* Click the custom `useWindowSize` assignment card
* Open the detailed assignment guide
* Use the Working Preview, source code, tests, charts, and Live Test Results panel

Assignments follow the same interaction pattern as lectures.

## 🧩 Three-Layer Assignment Model

### 1. Custom Hook Layer

Located in:

```txt
src/assignments/week09/custom-use-window-size-hook/useWindowSize.js
```

This file contains the reusable hook logic.

It includes:

* safe initial window-size reading
* React state for width and height
* `useEffect` setup
* `resize` event listener registration
* cleanup with `removeEventListener`
* helper logic for responsive layout labels
* detailed code comments explaining each step

The hook is intentionally separated from the UI so it can be reused by any component that needs the current browser width and height.

### 2. Streaming Preview Component Layer

Located in:

```txt
src/assignments/week09/custom-use-window-size-hook/StreamingWindowSizeDemo.jsx
```

This file demonstrates how the hook can support a streaming website layout.

It includes:

* live browser-size reading
* mobile/tablet/laptop preview presets
* a custom width slider
* compact layout behavior
* full layout behavior
* viewport charts
* streaming-style interface cards
* detailed comments explaining the component logic

The preview helps students see that the hook is not just abstract React logic. It directly affects the interface.

### 3. Assignment Guide and Live Test Panel Layer

Located in:

```txt
src/exercises/Week09UseWindowSizeAssignmentGuide.jsx
src/exercises/UseWindowSizeTestPanel.jsx
```

These files present the assignment inside the AD312 course platform.

They include:

* overview
* objectives
* required hook behavior
* Working Preview
* full source-code display
* full test-code display
* manual testing instructions
* charts
* Live Test Results
* normal and edge-case testing explanations
* summary and takeaways

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

* Reusable `useWindowSize` custom hook
* Browser width and height tracking
* React state synced with window size
* `useEffect` resize listener setup
* Cleanup through `removeEventListener`
* Streaming website responsive preview
* Mobile, tablet, and laptop preview presets
* Custom preview-width slider
* Live browser-size mode
* Viewport comparison charts
* Full source-code display
* Full Vitest-test display
* Manual testing instructions
* Automated testing expectations
* In-app Live Test Results panel

## 🪟 useWindowSize Behavior

The `useWindowSize` hook acts like a reusable package of responsive logic.

Instead of writing resize-tracking code inside every component, a component can import the hook and read:

```txt
width
height
```

The hook performs three main jobs:

* reads the browser's current size
* stores the size in React state
* updates the state whenever the browser resizes

When the component mounts, `useEffect` attaches a resize listener to the browser window.

When the component unmounts, the cleanup function removes the listener.

This cleanup matters because event listeners can remain active even after a component disappears. Removing the listener prevents unnecessary updates, duplicate listeners, and memory leaks.

## 📱 Responsive Streaming Behavior

The assignment uses a streaming website scenario.

The layout changes based on viewport width:

| Width Range | Layout Meaning |
|---|---|
| Small width | compact phone-style layout |
| Medium width | tablet-style layout |
| Large width | full laptop or desktop-style layout |

The preview includes visual controls so students can test different sizes without needing to manually resize the browser window every time.

Students can switch between:

* live browser width
* phone preset
* tablet preset
* laptop preset
* custom slider width

This makes the hook's purpose visible in the GUI.

## 🧠 Hook Concepts

### Custom Hook Naming

React custom hooks must start with the word `use`.

This tells React and tooling that the function may call other hooks such as `useState` and `useEffect`.

### State Synchronization

The hook uses state because the UI must re-render when the window size changes.

When the resize event fires, the hook updates state. React then re-renders components that use the hook.

### Effect Cleanup

The hook removes the event listener during cleanup.

This keeps the app stable when components mount, unmount, or re-render during development.

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

Hook Layer

* Reusable `useWindowSize` logic

Demo Layer

* Streaming interface preview

Testing Layer

* Vitest tests
* In-app Live Test Results panel
* Chart-based visual checks

## 🧭 Navigation Behavior

* Card-based navigation
* No external routing required
* Controlled through state in `App.jsx`
* Assignment opens inside the existing course-platform detail view
* File tree updates based on the active Week 9 assignment

## 📌 Week 9 Assignment Flow

* Assignment appears as a Week 09 assignment card
* Clicking opens the custom hook guide inside the main view
* The Working Preview renders the streaming layout demo
* Students test live and simulated viewport widths
* Students review full hook and component source code
* Students review full Vitest test code
* File tree stays context-aware
* Live Test Results show normal and edge-case behavior
* Charts visualize layout behavior across viewport sizes

## 🎨 UI Patterns

### 🧱 Card-Based Entry

All content begins with clickable cards.

### 📖 Structured Sections

Assignment uses structured sections:

* Overview
* Objectives
* Hook Requirements
* Working Preview
* Full Source Code
* Full Test Code
* Manual Testing
* Live Test Results
* Charts
* Summary

### 💻 Embedded Preview

The actual streaming layout demo is rendered inside the guide.

The preview allows students to:

* view the current browser width and height
* simulate a phone viewport
* simulate a tablet viewport
* simulate a laptop viewport
* use a slider to test custom widths
* observe the layout changing visually
* connect hook state to real UI behavior

### 🧾 Syntax as Learning Tool

Full code and test syntax are displayed directly in the UI with syntax highlighting.

Code examples are intended to teach:

* custom hook naming
* `useState`
* `useEffect`
* browser event listeners
* cleanup functions
* responsive breakpoints
* conditional rendering
* reusable logic
* component-level usage of hook output
* normal test cases
* edge test cases

### 🧪 Live Test Panel

The app includes a visual test runner:

* shows pass/fail style states
* groups normal cases and edge cases
* demonstrates hook expectations interactively
* shows expected vs actual behavior
* includes viewport charts
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
│       └── custom-use-window-size-hook/
│           ├── useWindowSize.js
│           ├── StreamingWindowSizeDemo.jsx
│           ├── StreamingWindowSizeDemo.test.jsx
│           └── README.md
├── exercises/
│   ├── Week09UseWindowSizeAssignmentGuide.jsx
│   └── UseWindowSizeTestPanel.jsx
├── styles/
│   └── week09-use-window-size-assignment.css
└── courses/
    └── ad312/
        └── week09/
            └── assignments/
                └── custom-use-window-size-hook/
                    ├── content.md
                    └── example.jsx
```

## 🧪 Testing Structure

### ✅ Automated Tests

Located in:

```txt
src/assignments/week09/custom-use-window-size-hook/StreamingWindowSizeDemo.test.jsx
```

Includes:

* at least 3 normal cases
* at least 3 edge cases

Normal cases verify:

* a mobile-size width selects the compact layout
* a tablet-size width selects the tablet layout
* a laptop-size width selects the full layout
* the hook-driven demo displays width and height values
* preset controls update the visual preview

Edge cases verify:

* very small widths are handled safely
* zero or unusual dimensions do not crash the layout helper logic
* very large widths are treated as full layout widths
* cleanup removes resize listeners when the component unmounts
* the component remains stable when resize events fire

### 🧠 In-App Test Panel

Located in:

```txt
src/exercises/UseWindowSizeTestPanel.jsx
```

Visual learning tool.

Tracks:

* viewport width
* viewport height
* layout mode
* expected layout label
* actual layout label
* normal cases
* edge cases
* chart-based behavior

## 🔍 Why Both?

| Type | Purpose |
|---|---|
| Automated Tests | correctness |
| Test Panel | learning + visualization |
| Charts | visual comparison of responsive behavior |

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

### 4. Navigate to Week 9 Assignment 2

* Select course
* Select Week 09
* Click the custom `useWindowSize` assignment card

## 🧪 How to Run Tests

### Run all tests

```bash
npm run test
```

### Run only this assignment’s tests

```bash
npm run test -- src/assignments/week09/custom-use-window-size-hook/StreamingWindowSizeDemo.test.jsx
```

### Watch mode

```bash
npm run test:watch
```

### UI mode optional

```bash
npm run test:ui
```

## 🎥 Demo

| Demo Title             | Description          | Link |
| ---------------------- | -------------------- | ---- |
| Assignment Walkthrough | Full UI + guide demo |[Week9_A2](https://youtu.be/5EjKHrgndAQ)|


## 📌 Summary

Week 9 Assignment 2 introduces:

* custom hooks as reusable logic packages
* `useWindowSize`
* browser width and height tracking
* syncing browser values with React state
* `useEffect` event listener setup
* cleanup with `removeEventListener`
* responsive streaming-layout behavior
* GUI-based viewport simulation
* chart-based responsive testing
* Vitest testing
* in-app Live Test Results

This assignment prepares students to package browser-aware behavior into reusable hooks that can be shared across many components without duplicating logic.
