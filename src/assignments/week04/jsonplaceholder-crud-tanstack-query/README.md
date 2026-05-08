#🎓 AD312 Course Platform — Week 4 Assignment 2

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

Week 4 Assignment 2 introduces **CRUD operations using TanStack Query and the JSONPlaceholder API**, allowing students to practice GET, POST, PUT, PATCH, and DELETE workflows in a mobile-first assignment context.

Although the assignment instructions are specifically tailored for Expo, this course platform uses Vite. Therefore, the assignment is integrated through an **Expo Bridge pattern**: students learn the Expo workflow while the course platform provides a Vite-compatible preview, guide, test suite, and visual test panel.

---

## 🎯 Objective

The Week 4 Assignment 2 focuses on helping students:

* understand how TanStack Query manages complex server-state
* use `useQuery` to fetch posts
* use `useMutation` to create, update, patch, and delete posts
* implement GET, POST, PUT, PATCH, and DELETE requests
* filter posts by User ID
* distinguish between query hooks and mutation hooks
* handle loading, error, success, and empty states
* understand how Expo setup differs from Vite setup
* connect mobile-first Expo instructions to a browser-based course preview
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

### 🧩 Three-Layer Assignment Model

#### 1. Expo Assignment Source Layer

* Represents the standalone Expo assignment students would build
* Explains `create-expo-app` setup
* Uses mobile-first React Native concepts
* Shows how `QueryClientProvider` wraps the application root

#### 2. Standalone Exercise

* Located in `src/exercises/PostCrudExplorer.jsx`
* Runs independently inside the Vite course platform
* Mirrors the same CRUD behavior using browser-safe React
* Fully testable

#### 3. Assignment Guide (UI Layer)

* Located in `src/assignments/week04/jsonplaceholder-crud-tanstack-query/...`
* Contains teaching content, preview, Expo notes, and testing instructions
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

* Standalone JSONPlaceholder CRUD component
* Expo Bridge assignment model
* TanStack Query `useQuery` hook
* TanStack Query `useMutation` hooks
* GET request for fetching posts
* POST request for creating posts
* PUT request for fully updating posts
* PATCH request for partially updating posts
* DELETE request for removing posts
* User ID filtering
* Controlled form inputs
* Mutation feedback messages
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

### 📝 JSONPlaceholder CRUD Behavior

* Posts are fetched from JSONPlaceholder
* Posts can be filtered by User ID
* New posts can be created through a controlled form
* Existing posts can be selected and fully updated
* Post titles can be partially updated with PATCH
* Posts can be deleted from the visible list
* Mutation feedback appears after actions
* UI reflects loading, error, success, and empty states
* Request payloads are structured to match the HTTP method being used

---

### 🌉 Expo Bridge Behavior

* The assignment instructions are Expo-focused
* The course platform remains Vite-based
* The guide explains how students would set up the standalone Expo project
* The embedded preview uses browser-safe React
* The concepts remain the same across Expo and Vite
* Students can build the Expo app separately while still learning through the platform

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

#### Expo Reference Layer

* Explains the standalone Expo implementation path

#### Exercise Layer

* Standalone components (e.g., PostCrudExplorer)

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
* Expo-specific instructions are presented inside the guide
* The working preview renders the standalone Post CRUD Explorer exercise

---

## 🎨 UI Patterns

### 🧱 Card-Based Entry

All content begins with clickable cards.

### 📖 Structured Sections

Assignment uses structured sections:

* Overview
* Objectives
* Instructions
* Expo Setup
* Preview
* Syntax
* Testing
* Results

---

### 💻 Embedded Preview

The actual `PostCrudExplorer` component is rendered inside the guide.

---

### 🧾 Syntax as Learning Tool

Full code and test syntax are displayed directly in the UI.

The displayed syntax helps students understand:

* how query hooks retrieve server data
* how mutation hooks create, update, patch, and delete server data
* how request payloads differ between POST, PUT, PATCH, and DELETE
* how controlled inputs support form-driven API requests
* how filtering changes the query being executed
* how tests verify normal and edge-case behavior

---

### 🧪 Live Test Panel

The app includes a visual test runner:

* shows PASS / WAIT states
* includes normal cases and edge cases
* tracks CRUD request behavior
* demonstrates GET, POST, PUT, PATCH, and DELETE expectations
* shows expected vs actual behavior

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
│       └── jsonplaceholder-crud-tanstack-query/
│           ├── Week04JsonPlaceholderCrudAssignmentGuide.jsx
│           ├── PostCrudTestPanel.jsx
│           └── README.md
├── exercises/
│   ├── PostCrudExplorer.jsx
│   └── PostCrudExplorer.test.jsx
├── styles/
│   └── week04-jsonplaceholder-crud-tanstack-query-assignment.css
└── courses/
    └── ad312/
        └── week04/
            └── assignments/
                └── jsonplaceholder-crud-tanstack-query/
                    ├── content.md
                    └── example.jsx
```

---

## 🧪 Testing Structure

### ✅ Automated Tests

Located in:

```bash
src/exercises/PostCrudExplorer.test.jsx
```

Includes:

* 3 normal cases
* 3 edge cases

---

### 🧠 In-App Test Panel

* Located in assignment guide
* Visual learning tool
* Tracks:

  * post fetching
  * user filtering
  * POST payload shape
  * PUT payload shape
  * PATCH payload shape
  * DELETE endpoint behavior
  * failed or invalid response handling
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

## 📱 How to Run the Standalone Expo Version

### 1. Create a new Expo app

```bash
npx create-expo-app@latest crud-query-app
```

---

### 2. Enter the project folder

```bash
cd crud-query-app
```

---

### 3. Install TanStack Query

```bash
npm install @tanstack/react-query
```

---

### 4. Start Expo

```bash
npx expo start
```

---

### 5. Open the app

* Use Expo Go on a physical device
* Or use an emulator/simulator

---

### 6. Wrap the root app with QueryClientProvider

The Expo version should follow the same CRUD behavior shown in the course-platform preview.

---

## 🧪 How to Run Tests

### Run all tests

```bash
npm run test
```

### Run this assignment’s tests

```bash
npm run test -- src/exercises/PostCrudExplorer.test.jsx
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
| Assignment Walkthrough | Full UI + guide demo |[Week4_A2](https://youtu.be/9FKA79xJWvE)|

---

## 📌 Summary

Week 4 Assignment 2 introduces:

* TanStack Query CRUD workflows
* JSONPlaceholder API integration
* GET, POST, PUT, PATCH, and DELETE requests
* query and mutation hook usage
* filtering posts by User ID
* Expo-oriented setup and mobile-first thinking
* Vite-compatible preview through the Expo Bridge pattern
* full syntax and test visibility
* automated and in-app visual testing

This builds directly on Week 4 Assignment 1 and prepares students to manage more realistic server-state workflows in React applications.
