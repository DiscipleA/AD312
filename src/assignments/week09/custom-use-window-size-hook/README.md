# 🎓 AD312 Course Platform — Week 9 Assignment 3

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
* automated tests
* in-app Live Test Results panels

Week 9 Assignment 3 introduces persistent browser state through a custom hook called `useLocalStorage`. Students learn how to combine React state with the browser's `localStorage` API so user preferences can survive page refreshes.

This assignment uses the example of a streaming website preferences panel. A user can enable dark mode, change video preferences, adjust volume, save shows, and refresh the page without losing their settings. Instead of writing localStorage loading and saving logic directly inside every component, students package that behavior into one reusable custom hook.

This assignment focuses on `useState`, lazy initial state loading, `useEffect`, localStorage reading and writing, JSON serialization, reset behavior, error handling, and persistent UI preferences in a Vite + React environment.

---

## 🎯 Objective

The Week 9 Assignment 3 focuses on helping students:

* understand why persistent browser state is useful
* create a reusable `useLocalStorage` custom hook
* combine React state with browser storage
* use `useState` to hold the current value
* use a function inside `useState` to load initial data safely
* read saved values from `localStorage`
* fall back to default values when no saved value exists
* serialize values with `JSON.stringify`
* parse saved values with `JSON.parse`
* use `useEffect` to automatically save state updates
* reset saved data when needed
* protect the app from malformed localStorage values
* protect the app from unavailable storage environments
* build a streaming preferences GUI
* test normal persistence cases
* test edge cases and storage failure scenarios
* include Live Test Results, charts, API simulation, and GUI buttons
* practice both manual testing and automated testing

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
* Select Week 09
* View lecture and assignment cards
* Click the custom `useLocalStorage` assignment card
* Open the detailed assignment guide
* Use the Working Preview, source code, tests, charts, mock API simulation, and Live Test Results panel

Assignments follow the same interaction pattern as lectures.

## 🧩 Three-Layer Assignment Model

### 1. Custom Hook Layer

Located in:

```txt
src/assignments/week09/custom-use-local-storage-hook/useLocalStorage.js
```

This file contains the reusable persistence logic.

It includes:

* a `useLocalStorage` custom hook
* lazy initial loading with `useState`
* safe localStorage reads
* JSON parsing
* automatic backups with `useEffect`
* JSON serialization
* reset helper behavior
* storage error handling
* malformed data protection
* detailed comments explaining each key step

The hook is intentionally separated from the UI so any component can reuse persistent state without duplicating localStorage logic.

### 2. Streaming Preferences Demo Layer

Located in:

```txt
src/assignments/week09/custom-use-local-storage-hook/StreamingPreferencesDemo.jsx
```

This file demonstrates how persistent state can support a streaming website.

It includes:

* dark mode preference
* video quality preference
* captions preference
* autoplay preference
* volume preference
* saved shows
* GUI buttons
* reset controls
* mock API simulation
* charts
* detailed comments explaining component behavior

The preview shows how a user preference can change the UI immediately and remain saved across refreshes.

### 3. Assignment Guide and Live Test Panel Layer

Located in:

```txt
src/exercises/Week09UseLocalStorageAssignmentGuide.jsx
src/exercises/UseLocalStorageTestPanel.jsx
```

These files present the assignment inside the AD312 course platform.

They include:

* overview
* objectives
* required hook behavior
* Working Preview
* full source-code display
* full test-code display
* manual testing instructions
* charts
* API simulation
* Live Test Results
* normal and edge-case testing explanations
* summary and takeaways

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

* Reusable `useLocalStorage` custom hook
* React state combined with browser storage
* Lazy initializer inside `useState`
* Automatic backup with `useEffect`
* `localStorage.getItem`
* `localStorage.setItem`
* JSON serialization and parsing
* Reset-to-default behavior
* Storage error protection
* Malformed JSON protection
* Streaming preferences GUI
* Dark Mode persistence demo
* Volume, captions, autoplay, and quality controls
* Saved shows behavior
* Mock API simulation
* Charts
* GUI buttons
* Full source-code display
* Full Vitest-test display
* Manual testing instructions
* Automated testing expectations
* In-app Live Test Results panel

## 💾 useLocalStorage Behavior

The `useLocalStorage` hook acts like React's `useState`, but with automatic browser backup.

A normal `useState` value disappears when the page refreshes.

The `useLocalStorage` hook keeps the same state-style API while saving the value into `localStorage`.

The hook performs three main jobs:

* loads the initial value safely
* returns state and a setter function
* saves the value automatically whenever it changes

This means components can manage persistent preferences without manually repeating storage code.

## 🧠 Lazy Initial State Loading

The hook uses a function inside `useState`.

This is important because React only runs that function during the initial render.

That means the hook reads from localStorage only when the component first needs its starting value.

This avoids unnecessary storage reads on every render.

The hook checks:

* whether localStorage has a saved value
* whether the saved value can be parsed
* whether the default value should be used instead
* whether storage is unavailable or throws an error

This keeps the UI safe even when storage data is missing, broken, or blocked.

## 🔁 Automatic Backup with useEffect

The hook uses `useEffect` to watch for state changes.

Whenever the state value changes, the effect saves the newest value into localStorage.

The save process generally follows this idea:

```txt
state changes
useEffect runs
value is serialized with JSON.stringify
serialized value is saved with localStorage.setItem
```

This keeps React state and browser storage synchronized.

## 🎬 Streaming Preferences Behavior

The assignment uses a streaming website scenario.

The demo allows students to update preferences such as:

* Dark Mode
* captions
* autoplay
* video quality
* volume
* saved shows

These preferences represent small user settings that are appropriate for localStorage.

When the user changes a setting, the component updates immediately and the hook saves the new value.

When the page refreshes, the hook loads the saved value back into React state.

## 🌐 Mock API Simulation

The assignment includes a mock API simulation to show how saved preferences could be synchronized with a remote service.

The API simulation is not a real backend. It is a teaching tool that helps students compare:

* local browser persistence
* remote server-style syncing
* immediate UI state updates
* delayed save feedback

This helps students understand that localStorage is useful for browser preferences, while APIs are useful for server-owned data.

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

Hook Layer

* Reusable `useLocalStorage` persistence logic

Demo Layer

* Streaming preferences preview

Testing Layer

* Vitest tests
* In-app Live Test Results panel
* Chart-based visual checks
* Mock API simulation

## 🧭 Navigation Behavior

* Card-based navigation
* No external routing required
* Controlled through state in `App.jsx`
* Assignment opens inside the existing course-platform detail view
* File tree updates based on the active Week 9 assignment

## 📌 Week 9 Assignment Flow

* Assignment appears as a Week 09 assignment card
* Clicking opens the custom localStorage hook guide inside the main view
* The Working Preview renders the streaming preferences demo
* Students update preferences through GUI controls
* Students observe persistence behavior
* Students test reset and storage behavior
* Students review full hook and component source code
* Students review full Vitest test code
* File tree stays context-aware
* Live Test Results show normal and edge-case behavior
* Charts and API simulation reinforce the storage workflow

## 🎨 UI Patterns

### 🧱 Card-Based Entry

All content begins with clickable cards.

### 📖 Structured Sections

Assignment uses structured sections:

* Overview
* Objectives
* Hook Requirements
* Working Preview
* Full Source Code
* Full Test Code
* Manual Testing
* Live Test Results
* Charts
* API Simulation
* Summary

### 💻 Embedded Preview

The actual streaming preferences demo is rendered inside the guide.

The preview allows students to:

* toggle Dark Mode
* update video quality
* toggle captions
* toggle autoplay
* change volume
* save shows
* simulate a preference sync
* reset preferences
* observe localStorage-backed state

### 🧾 Syntax as Learning Tool

Full code and test syntax are displayed directly in the UI with syntax highlighting.

Code examples are intended to teach:

* custom hook naming
* `useState`
* lazy initializer functions
* `useEffect`
* localStorage reads
* localStorage writes
* JSON parsing
* JSON serialization
* fallback default values
* persistent preferences
* reset behavior
* malformed data handling
* storage failure handling
* normal test cases
* edge test cases

### 🧪 Live Test Panel

The app includes a visual test runner:

* shows pass/fail style states
* groups normal cases and edge cases
* demonstrates persistence expectations interactively
* shows expected vs actual behavior
* includes charts
* includes mock API simulation checks
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
│   └── week09/
│       └── custom-use-local-storage-hook/
│           ├── useLocalStorage.js
│           ├── StreamingPreferencesDemo.jsx
│           ├── StreamingPreferencesDemo.test.jsx
│           └── README.md
├── exercises/
│   ├── Week09UseLocalStorageAssignmentGuide.jsx
│   └── UseLocalStorageTestPanel.jsx
├── styles/
│   └── week09-use-local-storage-assignment.css
└── courses/
    └── ad312/
        └── week09/
            └── assignments/
                └── custom-use-local-storage-hook/
                    ├── content.md
                    └── example.jsx
```

## 🧪 Testing Structure

### ✅ Automated Tests

Located in:

```txt
src/assignments/week09/custom-use-local-storage-hook/StreamingPreferencesDemo.test.jsx
```

Includes:

* at least 3 normal cases
* at least 3 edge cases

Normal cases verify:

* default preference values render correctly
* changing preferences updates the UI
* changed preferences are saved to localStorage
* saved localStorage values are loaded on initialization
* reset behavior restores default values

Edge cases verify:

* missing localStorage values fall back safely
* malformed JSON does not crash the app
* unavailable storage is handled safely
* unusual preference values do not break rendering
* localStorage cleanup works between tests

### 🧠 In-App Test Panel

Located in:

```txt
src/exercises/UseLocalStorageTestPanel.jsx
```

Visual learning tool.

Tracks:

* default state loading
* saved state loading
* preference updates
* automatic backup behavior
* reset behavior
* malformed storage handling
* unavailable storage handling
* API simulation behavior
* chart-based persistence behavior

## 🔍 Why Both?

| Type | Purpose |
|---|---|
| Automated Tests | correctness |
| Test Panel | learning + visualization |
| Charts | visual comparison of persistence behavior |
| API Simulation | demonstrates local vs remote saving concepts |

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

### 4. Navigate to Week 9 Assignment 3

* Select course
* Select Week 09
* Click the custom `useLocalStorage` assignment card

## 🧪 How to Run Tests

### Run all tests

```bash
npm run test
```

### Run only this assignment’s tests

```bash
npm run test -- src/assignments/week09/custom-use-local-storage-hook/StreamingPreferencesDemo.test.jsx
```

### Watch mode

```bash
npm run test:watch
```

### UI mode optional

```bash
npm run test:ui
```

## 🎥 Demo

| Demo Title             | Description          | Link |
| ---------------------- | -------------------- | ---- |
| Assignment Walkthrough | Full UI + guide demo |[Week9_A3](https://youtu.be/Tz00o-x0nEE)|


## 📌 Summary

Week 9 Assignment 3 introduces:

* custom hooks for persistent browser state
* `useLocalStorage`
* combining `useState` with localStorage
* lazy initial state loading
* safe localStorage reads
* automatic state backup with `useEffect`
* JSON parsing and serialization
* reset behavior
* Dark Mode persistence
* streaming preference controls
* charts
* mock API simulation
* Vitest testing
* in-app Live Test Results

This assignment builds directly on Week 9 Assignment 2. Assignment 2 focuses on packaging browser-size logic into a reusable custom hook, while Assignment 3 expands the same custom-hook idea into persistent state that survives page refreshes.
