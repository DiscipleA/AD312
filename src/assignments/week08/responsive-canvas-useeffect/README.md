---
# 🎓 AD312 Course Platform — Week 8 Assignment 2

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
* official Vitest tests

Week 8 Assignment 2 introduces the `useEffect` hook as a way to synchronize a React component with an external browser system: the `window` resize event. Students build a responsive canvas-style dashboard that reads the browser viewport dimensions in real time and updates the UI when the screen crosses the mobile/desktop breakpoint.

This assignment focuses on side effects, event listeners, cleanup functions, dependency arrays, and memory-leak prevention. Students learn that React state can describe the UI, but some browser behavior must be connected through effects that attach to and detach from browser APIs carefully.

---

## 🎯 Objective

The Week 8 Assignment 2 focuses on helping students:

* understand what side effects are in React
* use `useEffect` to synchronize with the browser window
* read `window.innerWidth` and `window.innerHeight`
* store live viewport dimensions in React state
* attach a `resize` event listener with `window.addEventListener`
* remove the listener with `window.removeEventListener`
* prevent memory leaks when a component unmounts
* explain why an empty dependency array is used
* understand what can happen if the dependency array is omitted
* switch the UI between Mobile and Desktop modes
* display current width and height values in the interface
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
4. Click the Responsive Canvas assignment card
5. Open the detailed assignment guide inside the main course view

Assignments follow the same interaction pattern as lectures.

---

## 🧩 Corrected Week 5+ Assignment Model

Week 8 Assignment 2 follows the corrected assignment structure used by the current platform.

### 1. Assignment Guide Layer

Located in:

```txt
src/exercises/Week08ResponsiveCanvasAssignmentGuide.jsx
```

This guide contains:

* assignment overview
* objectives
* required technical checks
* working preview
* full source code display
* full test code display
* manual verification
* Live Test Results panel
* key takeaways
* summary

### 2. Live Test Panel Layer

Located in:

```txt
src/exercises/ResponsiveCanvasTestPanel.jsx
```

This panel provides an in-app visual testing experience for normal and edge cases related to viewport changes, responsive mode selection, and event listener cleanup.

### 3. Completed Assignment Source Layer

Located in:

```txt
src/assignments/week08/responsive-canvas-useeffect/
```

This folder contains the completed Vite React implementation, official Vitest tests, and README file.

### 4. Mirror Source Layer

Located in:

```txt
src/courses/ad312/week08/assignments/responsive-canvas-useeffect/
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

* Vite-compatible React component
* `useEffect` side-effect implementation
* browser resize listener integration
* state tracking for live width and height
* Mobile/Desktop mode detection
* responsive breakpoint helper logic
* cleanup function with `removeEventListener`
* dependency-array explanation comment
* manual verification instructions
* automated Vitest coverage
* in-app Live Test Results panel

---

## 🖼 Responsive Canvas Behavior

The Responsive Canvas component listens to the browser viewport and displays:

* current width
* current height
* detected mode
* layout decision notes
* breakpoint rule explanation

When the viewport is below the configured breakpoint, the component reports Mobile mode. When the viewport reaches the desktop breakpoint, it reports Desktop mode.

The component uses React state to store the current viewport snapshot and updates that state whenever the browser fires a resize event.

---

## 🔁 useEffect Behavior

The assignment centers on this lifecycle pattern:

1. Component mounts
2. `useEffect` runs
3. The resize handler reads `window.innerWidth` and `window.innerHeight`
4. The handler updates React state
5. The handler is attached to the browser resize event
6. The component updates when the browser is resized
7. The cleanup function removes the event listener when the component unmounts

This pattern keeps React synchronized with a system outside React’s direct control.

---

## 🧹 Cleanup Obligation

The cleanup function is critical because event listeners live outside React. If a component unmounts and the resize listener remains attached, the browser may keep calling old handler functions that no longer belong to an active component.

The assignment demonstrates why cleanup matters by requiring the effect to return a function that removes the listener:

```txt
window.removeEventListener("resize", handleResize)
```

This prevents memory leaks and avoids stale state updates after unmount.

---

## 🧠 Dependency Array Explanation

The assignment requires a code comment explaining the chosen dependency array.

This implementation uses an empty dependency array because the listener only needs to be attached once when the component mounts and removed once when the component unmounts.

If the dependency array were omitted completely, the effect would run after every render. That could repeatedly attach listeners and create unnecessary cleanup/re-attachment cycles.

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

Contains the actual responsive canvas implementation and tests.

**Mirror Layer**

Contains lightweight source/reference files for the course content tree.

**Testing Layer**

Uses Vitest and React Testing Library.

---

## 🧭 Navigation Behavior

* Card-based navigation
* No external routing required
* Controlled through state in `App.jsx`
* Week 08 assignment card opens the Responsive Canvas assignment guide
* File tree stays context-aware
* Working Preview renders the responsive canvas dashboard
* Live Test Results panel verifies required behavior visually

---

## 🎨 UI Patterns

### 🧱 Card-Based Entry

All assignment content begins with a clickable Topic Card in the Week 08 view.

### 📖 Structured Sections

The assignment guide uses structured sections:

* Overview
* Objective
* Required Technical Checks
* Working Preview
* Full Source Code
* Full Test Code
* Live Test Results
* Manual Verification
* Key Takeaways
* Summary

### 💻 Embedded Preview

The working preview lets students:

* observe current viewport width
* observe current viewport height
* see detected Mobile/Desktop mode
* resize the browser and watch state update
* connect visual changes to the resize effect

### 🧾 Syntax as Learning Tool

Full code and test syntax are displayed directly inside the UI with syntax highlighting.

Code examples are intended to teach:

* `useState`
* `useEffect`
* browser APIs
* event listener attachment
* event listener cleanup
* dependency array decisions
* responsive breakpoint helpers
* derived UI mode
* test expectations

### 🧪 Live Test Panel

The app includes a visual test runner that:

* shows pass/fail states
* separates normal cases and edge cases
* verifies responsive mode decisions
* verifies expected viewport labels
* verifies cleanup expectations
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
│       └── responsive-canvas-useeffect/
│           ├── ResponsiveCanvas.jsx
│           ├── ResponsiveCanvas.test.jsx
│           └── README.md
├── exercises/
│   ├── Week08ResponsiveCanvasAssignmentGuide.jsx
│   └── ResponsiveCanvasTestPanel.jsx
├── styles/
│   └── week08-responsive-canvas-assignment.css
└── courses/
    └── ad312/
        └── week08/
            └── assignments/
                └── responsive-canvas-useeffect/
                    ├── content.md
                    └── example.jsx
```

---

## 🧪 Testing Structure

### ✅ Automated Vitest Tests

Located in:

```txt
src/assignments/week08/responsive-canvas-useeffect/ResponsiveCanvas.test.jsx
```

Includes:

* at least 3 normal cases
* at least 3 edge cases

Normal cases verify:

* the component renders the current window width and height
* the component displays Desktop mode for desktop-sized viewport values
* the component displays Mobile mode for mobile-sized viewport values
* the UI updates after a simulated resize event

Edge cases verify:

* boundary breakpoint behavior
* tiny viewport values
* listener cleanup on component unmount
* safe state synchronization after resize events

### 🧠 In-App Test Panel

Located in:

```txt
src/exercises/ResponsiveCanvasTestPanel.jsx
```

The visual test panel tracks:

* desktop viewport behavior
* mobile viewport behavior
* breakpoint behavior
* resize synchronization
* cleanup expectation
* dependency-array reasoning

---

## 🔍 Why Both?

| Type | Purpose |
|---|---|
| Automated Tests | correctness |
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

### 4. Navigate to Week 8 Assignment 2

* Select course
* Select Week 08
* Click the Mastering useEffect with a Responsive Canvas assignment card

---

## 🧪 How to Run Tests

### Run all tests

```bash
npm run test
```

### Run only this assignment’s tests

```bash
npm run test -- src/assignments/week08/responsive-canvas-useeffect/ResponsiveCanvas.test.jsx
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

| Demo Title             | Description          | Link |
| ---------------------- | -------------------- | ---- |
| Assignment Walkthrough | Full UI + guide demo |[Week8_A2](https://youtu.be/FtRBGqpblJ4)|

---

## 📌 Summary

Week 8 Assignment 2 introduces:

* React side effects with `useEffect`
* browser resize event synchronization
* real-time viewport state tracking
* Mobile/Desktop breakpoint decisions
* event listener setup with `addEventListener`
* event listener cleanup with `removeEventListener`
* dependency-array reasoning
* memory-leak prevention
* automated and visual testing workflows

This assignment prepares students for more advanced useEffect integration work, especially cases where React must coordinate with external browser APIs or non-React systems.
