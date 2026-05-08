# 🎓 AD312 Course Platform — Week 3 Assignment 1

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

Week 3 Assignment 1 introduces **state management using Immer**, allowing students to work with complex state updates in a more readable and maintainable way through a standalone Shopping List application.

---

## 🎯 Objective

The Week 3 Assignment 1 focuses on helping students:

* understand how Immer simplifies immutable state updates
* work with arrays of objects using a mutation-like syntax
* manage complex state transitions without deeply nested spread operators
* update list-based data structures cleanly
* understand how proxy-based state works under the hood
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
2. Select Week 03
3. View lecture + assignment cards
4. Click a card → opens detailed content view

Assignments follow the same interaction pattern as lectures.

---

### 🧩 Two-Layer Assignment Model

#### 1. Standalone Exercise

* Located in `src/exercises/ShoppingListWithImmer.jsx`
* Runs independently
* Fully testable

#### 2. Assignment Guide (UI Layer)

* Located in `src/assignments/week03/state-management-with-immer-in-react/...`
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

* Standalone Shopping List component
* State updates powered by Immer
* Add, update, and remove list items
* Simplified mutation-style syntax using Immer
* Step-by-step learning guide
* Embedded working preview
* Full syntax display (component + tests)
* Manual testing instructions
* Automated testing expectations
* In-app visual test panel

---

### 🛒 Shopping List Behavior

* Items are displayed in a list
* Users can add new items
* Users can update item properties
* Users can remove items
* State updates appear immediate and consistent
* No manual spread operator required
* State remains immutable internally via Immer

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

* Standalone components (e.g., ShoppingListWithImmer)

#### Testing Layer

* Vitest + React Testing Library
* In-app visual testing panel

---

## 🧭 Navigation Behavior

* Card-based navigation
* No external routing required
* Controlled via state in `App.jsx`

### 📌 Week 3 Assignment Flow

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

The actual `ShoppingListWithImmer` component is rendered inside the guide.

---

### 🧾 Syntax as Learning Tool

Full code and test syntax are displayed directly in the UI.

---

### 🧪 Live Test Panel

The app includes a visual test runner:

* shows PASS / WAIT states
* tracks list state updates
* demonstrates Immer-based updates interactively

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
│   └── week03/
│       └── state-management-with-immer-in-react/
│           ├── Week03ShoppingListWithImmerAssignmentGuide.jsx
│           └── ShoppingListWithImmerTestPanel.jsx
├── exercises/
│   ├── ShoppingListWithImmer.jsx
│   └── ShoppingListWithImmer.test.jsx
├── styles/
│   ├── week03-shoppinglist-immer-assignment.css
│   └── assignment-test-panel.css
```

---

## 🧪 Testing Structure

### ✅ Automated Tests

Located in:

```
src/exercises/ShoppingListWithImmer.test.jsx
```

Includes:

* 3 normal cases
* 3 edge cases

---

### 🧠 In-App Test Panel

* Located in assignment guide
* Visual learning tool
* Tracks:

  * list state
  * item updates
  * add/remove actions
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

### 4. Navigate to Week 3 Assignment

* Select course
* Select Week 03
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
| Assignment Walkthrough | Full UI + guide demo |[Week3_A1](https://youtu.be/GPnVR6FShDw)|

---

## 📌 Summary

Week 3 Assignment 1 introduces:

* Immer-based state management
* simplified immutable updates
* cleaner handling of complex state
* real-world list management patterns

This builds on Week 2 state concepts and prepares students for advanced state management strategies using tools like Immer.
