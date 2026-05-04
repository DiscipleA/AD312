# 🎓 AD312 Course Platform — Week 2 Assignment 2

---

## 📝 Overview

This project continues the Vite + React learning platform introduced in Week 1. Instead of behaving like a basic React app, it functions as a **course portfolio and instructional platform**.

It supports:

* course switching
* week switching
* clickable lecture and assignment cards
* lecture detail views
* assignment guide pages
* contextual file tree panel
* dark/light theme support

Week 2 Assignment 2 introduces a **nested state management assignment** built around a standalone UserProfile component, combined with a rich in-app guide and a visual test panel.

---

## 🎯 Objective

The Week 2 Assignment 2 focuses on helping students:

* understand how React manages object-based state
* update nested state without mutation
* use spread syntax to preserve parent and nested object data
* use functional state setters for reliable updates
* keep top-level profile data stable while changing nested address fields
* learn how standalone exercises integrate into a larger app
* practice both manual testing and automated testing

---

## ⚙️ How It Works

### 🧠 App Controller Pattern

The application is controlled centrally (via `App.jsx`), which manages:

* selected course
* selected week
* active lecture
* active assignment
* active content rendering

Instead of separate pages, content is rendered dynamically based on user interaction.

---

### 📚 Week-Based Content System

Content is defined through structured data (likely `courseData.js`), which determines:

* available weeks
* lecture cards
* assignment cards
* titles and metadata

---

### 🖱 Navigation Flow

1. Select Course (e.g., AD312)
2. Select Week 02
3. View lecture + assignment cards
4. Click a card → opens detailed content view

Assignments follow the same interaction pattern as lectures.

---

### 🧩 Two-Layer Assignment Model

#### 1. Standalone Exercise

* Located in `src/exercises/UserProfile.jsx`
* Runs independently
* Fully testable

#### 2. Assignment Guide (UI Layer)

* Located in `src/assignments/week02/managing-nested-state/...`
* Contains teaching content, preview, and testing instructions
* Embeds the standalone exercise

---

## ✨ Features

### 🧱 Platform Features

* Course + Week navigation
* Clickable Topic Cards
* Lecture + Assignment detail views
* File tree panel
* Theme support (light/dark)

---

### 🧪 Assignment Features

* Standalone UserProfile component
* Nested `userProfile` state object
* Controlled inputs for address editing
* Immutable nested object updates
* Functional state setter usage
* Embedded working preview
* Full syntax display (component + tests)
* Manual testing instructions
* Automated testing expectations
* In-app visual test panel

---

### 🧍 UserProfile Behavior

* Default profile values render on screen
* Street, city, and country inputs are editable
* Clicking Update Address applies the nested address update
* Top-level profile fields remain unchanged
* Profile summary stays aligned with the rendered nested fields
* Empty string updates are handled without crashing
* Repeated updates replace the address with the latest values

---

## 🏗 Architecture

### 🧭 High-Level Layers

#### App Shell

* Controls navigation and rendering

#### Data Layer

* `courseData.js` defines structure

#### Component Layer

* Sidebar, Header, TopicCard, etc.

#### Content Layer

* Lecture + Assignment components

#### Exercise Layer

* Standalone components (e.g., UserProfile)

#### Testing Layer

* Vitest + React Testing Library
* In-app visual testing panel

---

## 🧭 Navigation Behavior

* Card-based navigation
* No external routing required
* Controlled via state in `App.jsx`

### 📌 Week 2 Assignment Flow

* Assignment appears as a card
* Clicking opens guide inside main view
* UI remains consistent with lectures
* File tree stays context-aware

---

## 🎨 UI Patterns

### 🧱 Card-Based Entry

All content begins with clickable cards.

### 📖 Structured Sections

Assignment uses structured sections:

* Overview
* Objectives
* Instructions
* Preview
* Syntax
* Testing
* Results

---

### 💻 Embedded Preview

The actual `UserProfile` component is rendered inside the guide.

---

### 🧾 Syntax as Learning Tool

Full code and test syntax are displayed directly in the UI.

---

### 🧪 Live Test Panel

The app includes a visual test runner:

* shows PASS / WAIT states
* tracks nested address updates
* verifies that profile data remains stable
* demonstrates immutable object updates interactively

This complements (not replaces) automated tests.

---

## 🗂 Project Structure

```bash
src/
├── App.jsx
├── components/
│   ├── CodeBlock.jsx
│   ├── Sidebar.jsx
│   ├── HeaderBar.jsx
│   ├── TopicCard.jsx
│   ├── WelcomePanel.jsx
│   ├── SectionBlock.jsx
│   └── FileTreePanel.jsx
├── data/
│   └── courseData.js
├── assignments/
│   └── week02/
│       └── managing-nested-state/
│           ├── Week02ManagingNestedStateAssignmentGuide.jsx
│           └── NestedStateTestPanel.jsx
├── exercises/
│   ├── UserProfile.jsx
│   └── UserProfile.test.jsx
├── styles/
│   ├── week02-managing-nested-state-assignment.css
│   └── assignment-test-panel.css
└── vitest.config.js
```

---

## 🧪 Testing Structure

### ✅ Automated Tests

Located in:

```
src/exercises/UserProfile.test.jsx
```

Includes:

* 3 normal cases
* 3 edge cases

---

### 🧠 In-App Test Panel

* Located in assignment guide
* Visual learning tool
* Tracks:

  * street
  * city
  * country
  * profile summary
  * pass status

---

### 🔍 Why Both?

| Type            | Purpose                  |
| --------------- | ------------------------ |
| Automated Tests | correctness              |
| Test Panel      | learning + visualization |

---

## 🚀 How to Run

### 1. Install dependencies

```bash
npm install
```

---

### 2. Start development server

```bash
npm run dev
```

---

### 3. Open app

```bash
http://localhost:5173/
```

---

### 4. Navigate to Week 2 Assignment

* Select course
* Select Week 02
* Click assignment card

---

## 🧪 How to Run Tests

### Run all tests

```bash
npm run test
```

### Watch mode

```bash
npm run test:watch
```

### UI mode (optional)

```bash
npm run test:ui
```

---

## 🎥 Demo

| Demo Title             | Description           | Link |
| ---------------------- | --------------------- | ---- |
| Assignment Walkthrough | Full UI + guide demo  |      |

---

## 📌 Summary

Week 2 Assignment 2 extends the platform by focusing on nested object state:

* immutable updates to nested data
* functional state setters
* controlled form inputs
* stable top-level profile data
* standalone exercise testing
* visual in-app testing

This builds directly on the Week 2 object-state lecture and prepares students for more advanced state-management patterns in later weeks.
