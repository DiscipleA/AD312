# 🎓 AD312 Course Platform — Week 3 Assignment 2

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

Week 3 Assignment 2 introduces **state management using the `useImmer` hook**, allowing students to work with deeply nested state structures in a more intuitive and readable way through a standalone User Profile application.

---

## 🎯 Objective

The Week 3 Assignment 2 focuses on helping students:

* understand how `useImmer` simplifies complex state updates
* manage deeply nested objects using a mutation-style syntax
* eliminate the need for multiple spread operators
* update nested properties (e.g., contact details and preferences)
* maintain clean and maintainable state logic
* understand how proxy-based updates preserve immutability
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

* Located in `src/exercises/UserProfileWithImmer.jsx`
* Runs independently
* Fully testable

#### 2. Assignment Guide (UI Layer)

* Located in `src/assignments/week03/state-management-with-useimmer-hook/...`
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

* Standalone User Profile component
* Nested state structure managed with `useImmer`
* Direct-style updates to deeply nested fields
* Toggle-based preference updates
* Controlled form inputs for user data
* Step-by-step learning guide
* Embedded working preview
* Full syntax display (component + tests)
* Manual testing instructions
* Automated testing expectations
* In-app visual test panel

---

### 👤 User Profile Behavior

* Profile information (name, email) is displayed
* Nested contact details (phone, address) are editable
* Preferences (newsletter, notifications) can be toggled
* Updates happen through direct mutation of draft state
* UI reflects changes immediately
* No manual spread operator is required
* State remains immutable internally via `useImmer`

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

* Standalone components (e.g., UserProfileWithImmer)

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

The actual `UserProfileWithImmer` component is rendered inside the guide.

---

### 🧾 Syntax as Learning Tool

Full code and test syntax are displayed directly in the UI.

---

### 🧪 Live Test Panel

The app includes a visual test runner:

* shows PASS / WAIT states
* tracks nested state updates
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
│       └── state-management-with-useimmer-hook/
│           ├── Week03UserProfileWithImmerAssignmentGuide.jsx
│           └── UserProfileWithImmerTestPanel.jsx
├── exercises/
│   ├── UserProfileWithImmer.jsx
│   └── UserProfileWithImmer.test.jsx
├── styles/
│   ├── week03-userprofile-immer-assignment.css
│   └── assignment-test-panel.css
```

---

## 🧪 Testing Structure

### ✅ Automated Tests

Located in:

```
src/exercises/UserProfileWithImmer.test.jsx
```

Includes:

* 3 normal cases
* 3 edge cases

---

### 🧠 In-App Test Panel

* Located in assignment guide
* Visual learning tool
* Tracks:

  * nested profile state
  * contact updates
  * preference toggles
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
| Assignment Walkthrough | Full UI + guide demo |[Week3_A2](https://youtu.be/gLLvkJiyl9Q)|

---

## 📌 Summary

Week 3 Assignment 2 introduces:

* `useImmer` for managing deeply nested state
* mutation-style updates with guaranteed immutability
* cleaner and more maintainable state logic
* real-world profile management patterns

This builds directly on Week 3 Assignment 1 and prepares students for advanced state management techniques in larger React applications.
