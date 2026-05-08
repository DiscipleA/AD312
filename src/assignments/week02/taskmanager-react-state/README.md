# 🎓 AD312 Course Platform — Week 2 Assignment 3

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

Week 2 Assignment 3 introduces a **task management system using React state**, combining array-based state, event-driven updates, and conditional rendering into a more applied, real-world scenario.

---

## 🎯 Objective

The Week 2 Assignment 3 focuses on helping students:

* manage dynamic lists using React state
* add and remove items from an array
* update UI based on user-driven actions
* handle multiple state transitions in a single component
* understand how state drives real-world application behavior
* continue integrating standalone exercises into a larger app
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

* Located in `src/exercises/TaskManager.jsx`
* Runs independently
* Fully testable

#### 2. Assignment Guide (UI Layer)

* Located in `src/assignments/week02/taskmanager-react-state/...`
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

* Standalone Task Manager component
* Dynamic task list rendering
* Add and remove task functionality
* Controlled input handling
* Real-time UI updates based on state
* Step-by-step learning guide
* Embedded working preview
* Full syntax display (component + tests)
* Manual testing instructions
* Automated testing expectations
* In-app visual test panel

---

### 📋 Task Manager Behavior

* Tasks are displayed as a list
* Users can add new tasks
* Users can remove existing tasks
* Input field controls new task creation
* UI updates immediately after each action
* Empty task input is handled safely
* Task list always reflects current state

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

* Standalone components (e.g., TaskManager)

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

The actual `TaskManager` component is rendered inside the guide.

---

### 🧾 Syntax as Learning Tool

Full code and test syntax are displayed directly in the UI.

---

### 🧪 Live Test Panel

The app includes a visual test runner:

* shows PASS / WAIT states
* tracks task list state
* demonstrates UI updates interactively

This complements (not replaces) automated tests.

---

## 🗂 Project Structure

```bash
src/
├── App.jsx
├── components/
├── data/
├── lectures/
├── assignments/
│   └── week02/
│       └── taskmanager-react-state/
│           ├── Week02TaskManagerAssignmentGuide.jsx
│           └── TaskManagerTestPanel.jsx
├── exercises/
│   ├── TaskManager.jsx
│   └── TaskManager.test.jsx
├── styles/
│   ├── week02-taskmanager-assignment.css
│   └── assignment-test-panel.css
```

---

## 🧪 Testing Structure

### ✅ Automated Tests

Located in:

```
src/exercises/TaskManager.test.jsx
```

Includes:

* 3 normal cases
* 3 edge cases

---

### 🧠 In-App Test Panel

* Located in assignment guide
* Visual learning tool
* Tracks:

  * task list
  * add/remove actions
  * UI updates
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

| Demo Title             | Description          | Link |
| ---------------------- | -------------------- | ---- |
| Assignment Walkthrough | Full UI + guide demo |[Week2_A3](https://youtu.be/VtYc4LQ8ftA)|

---

## 📌 Summary

Week 2 Assignment 3 extends the platform by introducing:

* dynamic list management using state
* user-driven data manipulation
* real-time UI updates from state changes
* combined application of arrays, events, and rendering

This builds on earlier Week 2 assignments and prepares students for more advanced state management patterns in later weeks.
