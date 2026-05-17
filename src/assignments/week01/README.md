# 🎓 AD312 Course Platform — Week 1 Assignment

---

## 📝 Overview

This project is a Vite + React learning platform that has evolved into a structured course experience. Instead of behaving like a basic React app, it functions as a **course portfolio and instructional platform**.

It supports:

* course switching
* week switching
* clickable lecture and assignment cards
* lecture detail views
* assignment guide pages
* contextual file tree panel
* dark/light theme support

Week 1 introduces a **state-based React assignment** built around a standalone Counter component, combined with a rich in-app guide and a visual test panel.

---

## 🎯 Objective

The Week 1 assignment focuses on helping students:

* understand how `useState` manages UI state
* observe delayed updates using `setTimeout`
* recognize React batching and snapshot behavior
* compare direct state updates vs updater functions
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
2. Select Week 01
3. View lecture + assignment cards
4. Click a card → opens detailed content view

Assignments follow the same interaction pattern as lectures.

---

### 🧩 Two-Layer Assignment Model

#### 1. Standalone Exercise

* Located in `src/exercises/Counter.jsx`
* Runs independently
* Fully testable

#### 2. Assignment Guide (UI Layer)

* Located in `src/assignments/week01/...`
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

* Standalone Counter component
* Step-by-step learning guide
* Embedded working preview
* Full syntax display (component + tests)
* Manual testing instructions
* Automated testing expectations
* In-app visual test panel

---

### 🔢 Counter Behavior

* **Increment** → +1 instantly
* **Increment After Delay** → +1 after 2 seconds
* **Increment Twice** → only +1 (snapshot behavior)
* **Correct Increment Twice** → +2 (updater functions)

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

* Standalone components (e.g., Counter)

#### Testing Layer

* Vitest + React Testing Library
* In-app visual testing panel

---

## 🧭 Navigation Behavior

* Card-based navigation
* No external routing required
* Controlled via state in `App.jsx`

### 📌 Week 1 Assignment Flow

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

The actual `Counter` component is rendered inside the guide.

---

### 🧾 Syntax as Learning Tool

Full code and test syntax are displayed directly in the UI.

---

### 🧪 Live Test Panel

The app includes a visual test runner:

* shows PASS / WAIT states
* tracks internal state
* demonstrates behavior interactively

This complements (not replaces) automated tests.

---

## 🗂 Project Structure

```bash
src/
├── App.jsx
├── components/
│   ├── Sidebar.jsx
│   ├── HeaderBar.jsx
│   ├── TopicCard.jsx
│   ├── WelcomePanel.jsx
│   ├── SectionBlock.jsx
│   └── FileTreePanel.jsx
├── data/
│   └── courseData.js
├── lectures/
│   ├── IntroReactStateMasterclass.jsx
│   └── StateMasterclass.jsx
├── assignments/
│   └── week01/
│       ├── Week01CounterAssignmentGuide.jsx
│       └── AssignmentTestPanel.jsx
├── exercises/
│   ├── Counter.jsx
│   └── Counter.test.jsx
├── test/
│   └── setup.js
├── styles/
│   ├── app.css
│   ├── stateMasterclass.css
│   ├── counter-exercise.css
│   ├── week01-counter-assignment.css
│   └── assignment-test-panel.css
└── vitest.config.js
```

---

## 🧪 Testing Structure

### ✅ Automated Tests

Located in:

```
src/exercises/Counter.test.jsx
```

Includes:

* 3 normal cases
* 3 edge cases

---

### 🧠 In-App Test Panel

* Located in assignment guide
* Visual learning tool
* Tracks:

  * count
  * actions
  * delayed updates
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

### 4. Navigate to Week 1 Assignment

* Select course
* Select Week 01
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

| Demo Title             | Description           | Link                             |
| ---------------------- | --------------------- | -------------------------------- |
| Assignment Walkthrough | Full UI + guide demo  |[Week1](https://youtu.be/VJRzCoagxfA)|

---

## 📌 Summary

Week 1 establishes the core architecture for the platform:

* centralized app control
* structured content system
* reusable UI patterns
* standalone exercises
* dual-layer testing

This creates a scalable, transparent system that Week 2 and future weeks can extend without breaking consistency.

