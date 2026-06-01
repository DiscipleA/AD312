# 🎓 AD312 Course Platform — Week 8 Assignment 3

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
* syntax-highlighted source code
* in-app Live Test Results panels
* completed assignment source files
* official Vitest tests

Week 8 Assignment 3 introduces the professional React pattern of integrating a non-React JavaScript library into a React component. Students build a dynamic poll dashboard that uses React state for vote data while using raw Chart.js to imperatively render and update a canvas-based bar chart.

This assignment focuses on using `useEffect` as an escape hatch. React controls the state and buttons, while Chart.js directly controls the real canvas DOM node. Students learn how to instantiate a vanilla JavaScript library, synchronize React state into that library, call imperative update methods, and destroy the library instance during cleanup to prevent canvas errors and memory leaks.

---

## 🎯 Objective

The Week 8 Assignment 3 focuses on helping students:

* understand why some libraries do not know React exists
* use `useRef` to access a real canvas DOM node
* use `useRef` to store a Chart.js instance
* instantiate Chart.js inside `useEffect`
* avoid creating duplicate chart instances on the same canvas
* synchronize React vote state into the existing chart instance
* call Chart.js `.update()` after vote data changes
* call Chart.js `.destroy()` during cleanup
* explain why repeated `new Chart()` calls can break canvas rendering
* build a dynamic poll dashboard
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
4. Click the Chart.js Poll Dashboard assignment card
5. Open the detailed assignment guide inside the main course view

Assignments follow the same interaction pattern as lectures.

---

## 🧩 Corrected Week 5+ Assignment Model

Week 8 Assignment 3 follows the corrected assignment structure used by the current platform.

### 1. Assignment Guide Layer

Located in:

```txt
src/exercises/Week08ChartJsPollDashboardAssignmentGuide.jsx
```

This guide contains:

* assignment overview
* objectives
* Chart.js integration explanation
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
src/exercises/ChartJsPollDashboardTestPanel.jsx
```

This panel provides an in-app visual testing experience for normal and edge cases related to voting behavior, chart synchronization, update calls, and cleanup expectations.

### 3. Completed Assignment Source Layer

Located in:

```txt
src/assignments/week08/chartjs-poll-dashboard/
```

This folder contains the completed Vite React implementation, official Vitest tests, and README file.

### 4. Mirror Source Layer

Located in:

```txt
src/courses/ad312/week08/assignments/chartjs-poll-dashboard/
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
* raw Chart.js integration
* canvas element controlled through `useRef`
* Chart.js instance stored in `chartInstanceRef`
* voting buttons controlled by React state
* real-time chart synchronization
* `.update()` calls for changed vote values
* `.destroy()` cleanup on unmount
* duplicate-chart prevention
* manual verification instructions
* automated Vitest coverage
* in-app Live Test Results panel

---

## 📊 Dynamic Poll Dashboard Behavior

The Dynamic Poll Dashboard displays a poll for favorite JavaScript frameworks.

The user can vote for:

* React
* Vue
* Svelte
* Angular

React manages:

* vote totals
* button clicks
* total vote count
* reset behavior
* rendered labels and counts

Chart.js manages:

* the canvas rendering
* the bar chart instance
* chart data visualization
* imperative chart updates

When a user votes, React updates the vote state. The effect then synchronizes those new vote totals into the existing Chart.js instance and calls `.update()` so the canvas reflects the latest values.

---

## 🌉 React and Non-React Library Bridge

Chart.js is a vanilla JavaScript library. It expects direct access to a real canvas DOM node.

React normally discourages direct DOM mutation, but libraries like Chart.js, D3, Leaflet, and Google Maps often require it. In those cases, `useEffect` becomes the safe bridge between React and the external library.

This assignment demonstrates that bridge:

* `canvasRef` points to the real `<canvas>` element
* `chartInstanceRef` stores the Chart.js object
* `useEffect` creates the chart when needed
* React state changes are pushed into the chart
* cleanup destroys the chart instance

---

## 🔁 useEffect Behavior

The assignment centers on this lifecycle pattern:

1. Component renders the canvas
2. `useEffect` runs after the DOM is available
3. The effect checks whether a chart instance already exists
4. If no chart exists, the effect creates one with `new Chart(...)`
5. If the chart already exists, the effect updates its data values
6. The effect calls `.update()` so Chart.js redraws the bars
7. The cleanup function calls `.destroy()` when the component unmounts

This pattern prevents React from repeatedly creating Chart.js instances on the same canvas.

---

## 🧹 Cleanup Execution

Cleanup is critical because Chart.js attaches event listeners and stores canvas context information internally.

If the component creates a new chart on every render without destroying the old one, the same canvas can become associated with multiple Chart.js instances. That can cause rendering errors, stale listeners, duplicate charts, or broken canvas behavior.

The assignment requires a comment above the cleanup return block explaining why repeated `new Chart()` calls without `.destroy()` can create canvas rendering errors.

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

Contains the actual Chart.js dashboard implementation and tests.

**Mirror Layer**

Contains lightweight source/reference files for the course content tree.

**Testing Layer**

Uses Vitest and React Testing Library.

**External Library Layer**

Uses Chart.js as the non-React canvas-rendering library.

---

## 🧭 Navigation Behavior

* Card-based navigation
* No external routing required
* Controlled through state in `App.jsx`
* Week 08 assignment card opens the Chart.js Poll Dashboard assignment guide
* File tree stays context-aware
* Working Preview renders the Dynamic Poll Dashboard
* Live Test Results panel verifies required behavior visually

---

## 🎨 UI Patterns

### 🧱 Card-Based Entry

All assignment content begins with a clickable Topic Card in the Week 08 view.

### 📖 Structured Sections

The assignment guide uses structured sections:

* Overview
* Objective
* Chart.js Integration Requirements
* Working Preview
* Full Source Code
* Full Test Code
* Live Test Results
* Manual Verification
* Key Takeaways
* Summary

### 💻 Embedded Preview

The working preview lets students:

* vote for poll options
* observe React state changes
* watch the Chart.js bar chart update
* reset the poll
* connect state changes to imperative canvas updates

### 🧾 Syntax as Learning Tool

Full code and test syntax are displayed directly inside the UI with syntax highlighting.

Code examples are intended to teach:

* `useState`
* `useEffect`
* `useRef`
* DOM node access
* Chart.js setup
* chart instance persistence
* imperative `.update()` calls
* cleanup with `.destroy()`
* non-React library integration
* test expectations

### 🧪 Live Test Panel

The app includes a visual test runner that:

* shows pass/fail states
* separates normal cases and edge cases
* verifies voting behavior
* verifies chart synchronization expectations
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
│       └── chartjs-poll-dashboard/
│           ├── DynamicPollDashboard.jsx
│           ├── DynamicPollDashboard.test.jsx
│           └── README.md
├── exercises/
│   ├── Week08ChartJsPollDashboardAssignmentGuide.jsx
│   └── ChartJsPollDashboardTestPanel.jsx
├── styles/
│   └── week08-chartjs-poll-dashboard-assignment.css
└── courses/
    └── ad312/
        └── week08/
            └── assignments/
                └── chartjs-poll-dashboard/
                    ├── content.md
                    └── example.jsx
```

---

## 🧪 Testing Structure

### ✅ Automated Vitest Tests

Located in:

```txt
src/assignments/week08/chartjs-poll-dashboard/DynamicPollDashboard.test.jsx
```

Includes:

* at least 3 normal cases
* at least 3 edge cases

Normal cases verify:

* the poll dashboard renders all voting options
* clicking a vote button updates the visible vote count
* the total vote count updates after voting
* the reset button clears the vote totals

Edge cases verify:

* the chart is not duplicated unnecessarily
* chart update behavior is called after state changes
* cleanup destroys the chart instance on unmount
* zero-vote state renders safely
* repeated votes do not break chart synchronization

### 🧠 In-App Test Panel

Located in:

```txt
src/exercises/ChartJsPollDashboardTestPanel.jsx
```

The visual test panel tracks:

* initial poll state
* single-vote behavior
* repeated-vote behavior
* reset behavior
* chart synchronization expectation
* cleanup expectation
* duplicate-chart prevention

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

### 4. Navigate to Week 8 Assignment 3

* Select course
* Select Week 08
* Click the Chart.js Integration assignment card

---

## 📦 Dependency Note

This assignment uses Chart.js.

The dependency should be present in `package.json`:

```bash
npm install chart.js
```

If dependencies have already been installed in the project, running `npm install` from the project root should install Chart.js along with the rest of the project dependencies.

---

## 🧪 How to Run Tests

### Run all tests

```bash
npm run test
```

### Run only this assignment’s tests

```bash
npm run test -- src/assignments/week08/chartjs-poll-dashboard/DynamicPollDashboard.test.jsx
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
| Assignment Walkthrough | Full UI + guide demo |[Week8_A3](https://youtu.be/-63HUNVaTEs)|

---

## 📌 Summary

Week 8 Assignment 3 introduces:

* React integration with a non-React JavaScript library
* Chart.js bar chart setup
* canvas access through `useRef`
* persistent chart instances through `chartInstanceRef`
* state synchronization between React and Chart.js
* imperative `.update()` calls
* cleanup with `.destroy()`
* duplicate chart prevention
* memory-leak prevention
* automated and visual testing workflows

This assignment builds directly on Week 8 Assignment 2. Week 8 Assignment 2 focuses on synchronizing React with the browser window. Week 8 Assignment 3 expands that idea by synchronizing React state with an external charting library that directly controls a real DOM canvas.
