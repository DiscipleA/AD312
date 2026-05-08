#🎓 AD312 Course Platform — Week 4 Assignment 1

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

Week 4 Assignment 1 introduces **server-state management using TanStack Query and the Dog API**, allowing students to retrieve, cache, process, and display asynchronous API data through a standalone Dog Query Explorer application.

Students practice working with real API responses, request states, query functions, selected data, and structured UI rendering.

---

## 🎯 Objective

The Week 4 Assignment 1 focuses on helping students:

* understand how TanStack Query manages server-state
* fetch data from an external API
* use query hooks to retrieve dog breeds, facts, and groups
* handle request states such as `isPending`, `isError`, and `isSuccess`
* process API response structures safely
* use a dropdown to select a dog breed without overwhelming the UI
* display detailed information for a selected dog breed
* keep data-fetching logic separated from presentation logic
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
2. Select Week 04
3. View lecture + assignment cards
4. Click a card → opens detailed content view

Assignments follow the same interaction pattern as lectures.

---

### 🧩 Two-Layer Assignment Model

#### 1. Standalone Exercise

* Located in `src/exercises/DogQueryExplorer.jsx`
* Runs independently
* Fully testable
* Uses TanStack Query to retrieve data from the Dog API

#### 2. Assignment Guide (UI Layer)

* Located in `src/assignments/week04/dog-api-tanstack-query/...`
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

* Standalone Dog Query Explorer component
* TanStack Query `useQuery` hooks
* External API requests to the Dog API
* Breed dropdown selection
* Selected breed detail display
* Dog facts display
* Dog groups display
* Loading-state UI
* Error-state UI
* Success-state UI
* Empty-state handling
* Step-by-step learning guide
* Embedded working preview
* Full syntax display (component + tests)
* Manual testing instructions
* Automated testing expectations
* In-app visual test panel

---

### 🐶 Dog Query Behavior

* Dog breeds are fetched from the Dog API
* Breeds are displayed in a dropdown box
* Selecting a breed displays that breed’s details
* Dog facts are fetched and displayed in a separate section
* Dog groups are fetched and displayed in a separate section
* Loading states appear while requests are pending
* Error states appear when requests fail
* Successful responses are rendered clearly
* Empty or malformed API data is handled safely

---

## 🏗 Architecture

### 🧭 High-Level Layers

#### App Shell

* Controls navigation and rendering

#### Data Layer

* `courseData.js` defines structure

#### Component Layer

* Sidebar, Header, TopicCard, FileTreePanel, etc.

#### Content Layer

* Lecture + Assignment components

#### Exercise Layer

* Standalone components (e.g., DogQueryExplorer)

#### Testing Layer

* Vitest + React Testing Library
* In-app visual testing panel

---

## 🧭 Navigation Behavior

* Card-based navigation
* No external routing required
* Controlled via state in `App.jsx`

### 📌 Week 4 Assignment Flow

* Assignment appears as a card
* Clicking opens guide inside main view
* UI remains consistent with lectures and assignments
* File tree stays context-aware
* The working preview renders the standalone Dog Query Explorer exercise

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

The actual `DogQueryExplorer` component is rendered inside the guide.

---

### 🧾 Syntax as Learning Tool

Full code and test syntax are displayed directly in the UI.

The displayed syntax helps students understand:

* how imports connect the component to TanStack Query
* how query keys identify cached data
* how query functions retrieve API data
* how request states control UI feedback
* how dropdown selection controls the focused detail panel
* how tests verify normal and edge-case behavior

---

### 🧪 Live Test Panel

The app includes a visual test runner:

* shows PASS / WAIT states
* tracks query behavior
* demonstrates API response handling interactively
* separates normal cases and edge cases
* complements the official Vitest suite

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
│   └── week04/
│       └── dog-api-tanstack-query/
│           ├── Week04DogApiTanStackQueryAssignmentGuide.jsx
│           ├── DogQueryTestPanel.jsx
│           └── README.md
├── exercises/
│   ├── DogQueryExplorer.jsx
│   └── DogQueryExplorer.test.jsx
├── styles/
│   └── week04-dog-api-tanstack-query-assignment.css
└── courses/
    └── ad312/
        └── week04/
            └── assignments/
                └── dog-api-tanstack-query/
                    ├── content.md
                    └── example.jsx
```

---

## 🧪 Testing Structure

### ✅ Automated Tests

Located in:

```bash
src/exercises/DogQueryExplorer.test.jsx
```

Includes:

* 3 normal cases
* 3 edge cases

---

### 🧠 In-App Test Panel

* Located in assignment guide
* Visual learning tool
* Tracks:

  * breed fetching
  * breed dropdown rendering
  * selected breed detail rendering
  * dog facts rendering
  * dog groups rendering
  * loading and error-state handling
  * empty or malformed response handling
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

### 4. Navigate to Week 4 Assignment

* Select course
* Select Week 04
* Click assignment card

---

## 🧪 How to Run Tests

### Run all tests

```bash
npm run test
```

### Run this assignment’s tests

```bash
npm run test -- src/exercises/DogQueryExplorer.test.jsx
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
| Assignment Walkthrough | Full UI + guide demo |[Week4_A1](https://youtu.be/pRsQFPyUhvM)|

---

## 📌 Summary

Week 4 Assignment 1 introduces:

* TanStack Query for server-state management
* API data retrieval from the Dog API
* query hooks for breeds, facts, and groups
* dropdown-based selection for a readable UI
* request-state handling with loading, error, and success feedback
* full syntax and test visibility
* automated and in-app visual testing

This builds directly on the Week 4 TanStack Query lectures and prepares students for CRUD operations and mutation workflows in Week 4 Assignment 2.
