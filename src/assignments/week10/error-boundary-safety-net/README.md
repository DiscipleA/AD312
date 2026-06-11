# 🎓 AD312 Course Platform — Week 10 Assignment 2

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
* chart-based visual demonstrations

Week 10 Assignment 2 introduces React Error Boundaries by building an application safety net for a social media dashboard with trading market data. Students simulate a dashboard where one market price widget can receive corrupted data and crash during rendering.

This assignment focuses on production-style UI resilience. Students learn why Error Boundaries still require class components in modern React, how `getDerivedStateFromError` intercepts render-time crashes, how `componentDidCatch` captures diagnostic information, and how a graceful fallback UI prevents a single broken widget from blanking the entire page.

The assignment also includes browser-based visualization. Students can switch between valid and corrupted market-data scenarios, view market charts, trigger the fallback UI, confirm the rest of the dashboard stays functional, and verify the behavior with Vitest, console-log helper tests, and Live Test Results.

## 🎯 Objective

The Week 10 Assignment 2 focuses on helping students:

* understand why unhandled rendering errors can crash a React component tree
* explain why Error Boundaries still use class components in modern React
* implement an Error Boundary component
* use `getDerivedStateFromError` to intercept render-time crashes
* use `componentDidCatch` to capture error details for diagnostics
* display a friendly fallback UI instead of a blank screen
* isolate a crashing market price widget from the rest of the dashboard
* keep surrounding dashboard widgets functional after one widget fails
* reset the failed widget after changing data scenarios
* test normal rendering behavior
* test corrupted market-data edge cases
* test missing and malformed market values
* visualize market data with charts
* use Live Test Results to confirm expected behavior
* practice console-log testing and automated Vitest testing

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
* Click the Error Boundary assignment card
* Open the detailed assignment guide
* Use the Working Preview, source code, helper code, tests, charts, and Live Test Results panel

Assignments follow the same interaction pattern as lectures.

## 🧩 Three-Layer Assignment Model

### 1. React Safety Net Layer

Located in:

```txt
src/assignments/week10/error-boundary-safety-net/ErrorBoundarySafetyNet.jsx
```

This file contains the reusable React implementation.

It includes:

* class-based Error Boundary
* `getDerivedStateFromError`
* `componentDidCatch`
* fallback UI rendering
* reset behavior
* social dashboard layout
* market price widget
* market chart visualization
* corrupted-data crash simulation
* detailed comments explaining the Error Boundary lifecycle

The Error Boundary itself is intentionally written as a class component because React’s Error Boundary API still depends on class lifecycle methods.

### 2. Helper and Test Logic Layer

Located in:

```txt
src/assignments/week10/error-boundary-safety-net/ErrorBoundarySafetyNet.helpers.js
```

This file contains reusable helper logic.

It includes:

* market scenario definitions
* valid market data examples
* corrupted market data examples
* validation helpers
* chart-data helpers
* scenario-label helpers
* predictable test inputs for console tests and Vitest tests

Separating helper logic from the React UI makes the behavior easier to test and easier to explain.

### 3. Assignment Guide and Live Test Panel Layer

Located in:

```txt
src/exercises/Week10ErrorBoundaryAssignmentGuide.jsx
src/exercises/ErrorBoundarySafetyNetTestPanel.jsx
```

These files present the assignment inside the AD312 course platform.

They include:

* overview
* learning objectives
* working preview
* Error Boundary explanation
* market data safety-net explanation
* source-code display
* helper-code display
* console-test display
* Vitest-test display
* manual verification instructions
* Live Test Results panel
* summary and takeaways

The guide embeds the interactive dashboard so students can test the safety-net behavior visually.

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

* Class-based React Error Boundary
* `getDerivedStateFromError` implementation
* `componentDidCatch` implementation
* Friendly fallback UI
* Reset behavior
* Social dashboard preview
* Market price widget
* Corrupted market-data scenario
* Safe dashboard widgets that continue rendering
* SVG-based market chart visualization
* Scenario coverage chart
* Normal case demonstrations
* Edge case demonstrations
* Full source-code display
* Full helper-code display
* Full console-test display
* Full Vitest-test display
* Manual verification instructions
* Automated testing expectations
* In-app Live Test Results panel

## 🧯 Error Boundary Behavior

By default, an unhandled render error can break the React tree and cause the page to go blank.

The Error Boundary prevents that by wrapping the risky market widget.

When valid market data is selected:

* the dashboard renders normally
* the market widget displays price information
* the chart displays market history
* the rest of the dashboard stays visible

When corrupted market data is selected:

* the market widget throws during render
* the Error Boundary catches the crash
* the fallback UI replaces the broken widget area
* the surrounding dashboard remains usable
* the page does not go blank

## 🧠 Why Class Components Are Still Used

Modern React applications usually prefer function components and hooks. However, React Error Boundaries still require class components because the Error Boundary API depends on lifecycle methods that are only available in class components.

For this assignment:

* `getDerivedStateFromError` runs after a child component throws during render
* `componentDidCatch` receives the error and component stack information
* the class component stores whether an error has occurred
* the class component decides whether to render children or fallback UI
* function components can still be used inside the protected dashboard area

The Error Boundary is class-based, while the dashboard widgets can remain function components.

## 📌 Error Boundary Lifecycle Behavior

| Method | Purpose |
| --- | --- |
| `getDerivedStateFromError` | Updates boundary state after a child throws during render |
| `componentDidCatch` | Captures error details for logging, diagnostics, or reporting |
| `render` | Chooses between normal children and fallback UI |
| reset handler | Clears the error state so the protected area can try rendering again |

## 📊 Market Data Dashboard Behavior

The working preview simulates a social media dashboard with a trading market widget.

It includes:

* social media account summary
* safe dashboard cards
* market price widget
* market movement chart
* valid market-data scenarios
* corrupted market-data scenarios
* reset and recovery behavior

This helps students see that an Error Boundary protects a specific UI region instead of protecting only abstract code.

## 📈 Chart Behavior

The assignment includes market-data charts so students can visually compare safe and unsafe states.

Charts may show:

| Chart Area | Purpose |
| --- | --- |
| Market price line chart | Shows normal price movement when data is valid |
| Scenario coverage chart | Shows which normal and edge scenarios are protected |
| Fallback area | Shows how the UI changes when corrupted data crashes the widget |

These charts support the dashboard story and make the safety-net behavior easier to understand.

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

Safety Net Layer

* Error Boundary class component
* Dashboard widgets
* Market data widget
* Fallback UI

Testing Layer

* Console-log helper tests
* Vitest tests
* In-app Live Test Results panel

Chart Layer

* SVG-based market visualization
* Scenario coverage visualization

## 🧭 Navigation Behavior

* Card-based navigation
* No external routing required
* Controlled through state in `App.jsx`
* Assignment opens inside the existing course-platform detail view
* File tree updates based on the active Week 10 assignment

## 📌 Week 10 Assignment Flow

* Assignment appears as a Week 10 assignment card
* Clicking opens the Error Boundary guide inside the main view
* The Working Preview renders the social dashboard
* Students switch between safe and corrupted market-data scenarios
* Students observe how the Error Boundary isolates the failed widget
* Students confirm the full page does not go blank
* Students review full source code, helper code, and test code
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
* Error Boundary Explanation
* Market Data Safety Net
* Full Source Code
* Helper Code
* Console Test Code
* Vitest Test Code
* Manual Verification
* Live Test Results
* Summary

### 💻 Embedded Preview

The actual Error Boundary dashboard is rendered inside the guide.

The preview allows students to:

* view a safe social dashboard
* switch to corrupted market data
* trigger a controlled widget crash
* see the fallback UI appear
* confirm the rest of the dashboard remains usable
* reset the failed widget
* view market-data chart output
* compare normal and edge scenarios

### 🧾 Syntax as Learning Tool

Full code and test syntax are displayed directly in the UI with syntax highlighting.

Code examples are intended to teach:

* class component structure
* constructor state setup
* `getDerivedStateFromError`
* `componentDidCatch`
* fallback UI rendering
* render-time crash isolation
* reset behavior
* function components inside a class-protected area
* market data validation
* chart rendering
* normal test cases
* edge test cases

### 🧪 Live Test Panel

The app includes a visual test runner:

* shows pass/fail style states
* groups normal cases and edge cases
* demonstrates safe dashboard behavior
* demonstrates corrupted widget behavior
* shows expected vs actual behavior
* verifies fallback UI behavior
* confirms dashboard isolation
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
│       └── error-boundary-safety-net/
│           ├── ErrorBoundarySafetyNet.jsx
│           ├── ErrorBoundarySafetyNet.helpers.js
│           ├── ErrorBoundarySafetyNet.console-tests.js
│           ├── ErrorBoundarySafetyNet.test.jsx
│           └── README.md
├── exercises/
│   ├── Week10ErrorBoundaryAssignmentGuide.jsx
│   └── ErrorBoundarySafetyNetTestPanel.jsx
├── styles/
│   └── week10-error-boundary-assignment.css
└── courses/
    └── ad312/
        └── week10/
            └── assignments/
                └── error-boundary-safety-net/
                    ├── content.md
                    └── example.jsx
```

## 🧪 Testing Structure

### ✅ Automated Tests

Located in:

```txt
src/assignments/week10/error-boundary-safety-net/ErrorBoundarySafetyNet.test.jsx
```

Includes:

* at least 3 normal cases
* at least 3 edge cases

Normal cases verify:

* dashboard content renders when market data is valid
* market price widget displays valid price information
* market chart renders when price history is valid
* safe dashboard cards remain visible
* reset behavior restores the protected area

Edge cases verify:

* corrupted market data triggers fallback UI
* missing price values are handled by the Error Boundary
* malformed history arrays are handled safely
* one widget crash does not blank the full dashboard
* fallback UI includes a clear recovery message
* Error Boundary reset allows the widget to try rendering again

### 🧾 Console Tests

Located in:

```txt
src/assignments/week10/error-boundary-safety-net/ErrorBoundarySafetyNet.console-tests.js
```

The console tests provide a simple command-line style verification workflow.

They cover:

* valid market data
* corrupted market data
* missing price data
* invalid history data
* scenario labels
* helper-function behavior
* expected safety outcomes

These tests are helpful because they verify the non-React helper logic without requiring the full browser UI.

### 🧠 In-App Test Panel

Located in:

```txt
src/exercises/ErrorBoundarySafetyNetTestPanel.jsx
```

Visual learning tool.

Tracks:

* normal dashboard rendering
* safe market-data behavior
* corrupted market-data behavior
* fallback UI behavior
* reset behavior
* dashboard isolation
* chart rendering
* expected versus actual outcomes

## 🔍 Why Both?

| Type | Purpose |
| --- | --- |
| Automated Tests | correctness |
| Console Tests | helper logic verification |
| Test Panel | learning + visualization |
| Charts | visual scenario understanding |

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

### 4. Navigate to Week 10 Assignment 2

* Select course
* Select Week 10
* Click the Error Boundary Safety Net assignment card

## 🧪 How to Run Tests

### Run all tests

```bash
npm run test
```

### Run only this assignment’s Vitest tests

```bash
npm run test -- src/assignments/week10/error-boundary-safety-net/ErrorBoundarySafetyNet.test.jsx
```

### Run console-log tests

```bash
node src/assignments/week10/error-boundary-safety-net/ErrorBoundarySafetyNet.console-tests.js
```

### Watch mode

```bash
npm run test:watch
```

### UI mode optional

```bash
npm run test:ui
```

## 🧪 Manual Verification

Use the browser UI to manually confirm:

* dashboard renders normally with valid market data
* market price chart appears for safe data
* corrupted market data triggers the fallback UI
* fallback UI replaces only the broken widget area
* the rest of the social dashboard remains visible
* no full-page blank screen occurs
* reset behavior allows the protected widget to retry rendering
* Live Test Results show passing normal and edge cases
* charts remain readable in light and dark mode

## 🎥 Demo

| Demo Title             | Description          | Link |
| ---------------------- | -------------------- | ---- |
| Assignment Walkthrough | Full UI + guide demo |[Week10_A2](https://youtu.be/WmDREnTL1jE)|

## 📌 Summary

Week 10 Assignment 2 introduces:

* React Error Boundaries
* class-based safety net components
* `getDerivedStateFromError`
* `componentDidCatch`
* fallback UI rendering
* render-time crash isolation
* social dashboard resilience
* corrupted market-data simulation
* market chart visualization
* reset and recovery behavior
* console-log helper testing
* Vitest testing
* in-app Live Test Results

This assignment demonstrates why resilient React applications need safety boundaries. Instead of allowing one corrupted market widget to blank the entire page, the Error Boundary seals off the broken area, displays a friendly fallback message, and keeps the rest of the application functional.
