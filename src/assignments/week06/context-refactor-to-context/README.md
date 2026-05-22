---
🎓 AD312 Course Platform — Week 6 Assignment 2

📝 Overview

This project continues the Vite + React learning platform introduced in earlier weeks. Instead of behaving like a basic React app, it functions as a course portfolio and instructional platform.

It supports:

* course switching
* week switching
* clickable lecture and assignment cards
* lecture detail views
* assignment guide pages
* contextual file tree panel
* dark/light theme support
* working previews
* Live Test Results panels

Week 6 Assignment 2 introduces React Context by refactoring a prop-drilling example. Students begin with a common component tree problem where user settings are passed through multiple layers of components, even when the middle components do not actually use the data.

The assignment focuses on replacing unnecessary pass-through props with a centralized `UserContext`, a `UserProvider`, and the `useContext` hook.

Students learn how Context can make shared application state easier to access, easier to maintain, and easier to reason about as a React application grows.

🎯 Objective

The Week 6 Assignment 2 focuses on helping students:

* identify the pain points of prop drilling
* understand why passing props through unused middle components can become difficult to maintain
* create a React Context with `createContext`
* build a `UserProvider` component
* store user settings in provider state
* consume shared user data with `useContext`
* remove unnecessary props from intermediate components
* display user information in a deeply nested component
* understand how Context supports global or shared state
* use Vite as the standalone React environment
* practice both manual testing and automated testing with Vitest
* use the in-app Live Test Results panel as a visual learning aid

⚙️ How It Works

🧠 App Controller Pattern

The application is controlled centrally through `App.jsx`, which manages:

* selected course
* selected week
* active lecture
* active assignment
* active content rendering

Instead of separate pages, content is rendered dynamically based on user interaction.

📚 Week-Based Content System

Content is defined through structured data, typically in `courseData.js`, which determines:

* available weeks
* lecture cards
* assignment cards
* assignment titles
* assignment summaries
* card metadata

🖱 Navigation Flow

* Select Course, such as AD312
* Select Week 06
* View lecture and assignment cards
* Click the Week 6 Assignment 2 card
* Open the detailed assignment guide

Assignments follow the same interaction pattern as lectures.

🧩 Assignment Model

Week 6 Assignment 2 uses the corrected Week 5+ assignment structure.

1. Assignment Guide Layer

* Located in `src/exercises/Week06ContextRefactorAssignmentGuide.jsx`
* Contains the teaching content, setup notes, working preview, source code, test code, Live Test Results, and summary
* Explains how the Vite assignment maps to a standalone React app

2. Live Test Results Layer

* Located in `src/exercises/ContextRefactorTestPanel.jsx`
* Provides an in-app visual test panel
* Shows normal and edge cases
* Complements the official Vitest tests

3. Completed Source Layer

* Located in `src/assignments/week06/context-refactor-to-context/ContextRefactorApp.jsx`
* Contains the completed Vite-safe React implementation
* Demonstrates `createContext`, `UserProvider`, `useContext`, and prop-drilling removal

4. Official Test Layer

* Located in `src/assignments/week06/context-refactor-to-context/ContextRefactorApp.test.jsx`
* Uses Vitest and React Testing Library
* Verifies normal behavior and edge-case behavior

5. README Layer

* Located in `src/assignments/week06/context-refactor-to-context/README.md`
* Documents assignment purpose, structure, testing, and usage

✨ Features

🧱 Platform Features

* Course and week navigation
* Clickable Topic Cards
* Lecture and assignment detail views
* File tree panel
* Theme support
* Structured guide pages
* Working preview area
* Live Test Results panel

🧪 Assignment Features

* Vite-compatible React implementation
* Prop-drilling “before” scenario
* Refactored Context-based solution
* `createContext` setup
* `UserProvider` wrapper
* `useContext` consumption
* deeply nested `UserProfile` component
* user selection controls
* saved user preference controls
* preview override controls
* distinct visual theme modes
* fallback behavior for unknown users
* full source code display
* full Vitest test display
* manual testing instructions
* in-app Live Test Results panel

👤 Prop Drilling Behavior

The “before” scenario uses a component path like:

```txt
App ➔ Dashboard ➔ Sidebar ➔ UserProfile
```

In the prop-drilling version, the `user` object is passed through `Dashboard` and `Sidebar`, even though those components do not actually need the data for themselves.

That creates unnecessary coupling because:

* `Dashboard` must accept a `user` prop it does not use
* `Sidebar` must accept a `user` prop it does not use
* changing the user data shape may affect components that only pass it along
* deeply nested components become harder to refactor
* the tree becomes more difficult to debug as the app grows

🧠 Context Refactor Behavior

The refactored version creates a shared Context.

The completed solution uses:

* `createContext` to define the shared user context
* `UserProvider` to own the selected user and user preference state
* `useContext` to access user data directly inside nested components
* middle components that no longer receive or forward unnecessary user props

The result is a cleaner component tree:

```txt
UserProvider
└── Dashboard
    └── Sidebar
        └── UserProfile
```

`UserProfile` can read the user directly from context, while `Dashboard` and `Sidebar` can focus on layout instead of passing unused data.

🎨 User Preference Modes

The working preview includes distinct user and visual preference modes.

Students can experiment with:

* selected user
* saved user preference
* preview override mode

This helps demonstrate that shared state can influence more than one part of the UI without manually passing props through every component.

The preview separates:

* saved preference state
* temporary preview override
* current resolved mode
* deeply nested context output

🏗 Architecture

🧭 High-Level Layers

App Shell

* Controls navigation and rendering

Data Layer

* `courseData.js` defines course, week, lecture, and assignment card structure

Component Layer

* Sidebar, Header, TopicCard, FileTreePanel, and shared UI components

Content Layer

* Assignment guide components inside `src/exercises/`

Assignment Source Layer

* Completed assignment code inside `src/assignments/week06/...`

Testing Layer

* Vitest and React Testing Library
* In-app visual Live Test Results panel

Mirror Layer

* Lightweight source/reference files inside `src/courses/ad312/week06/...`

🧭 Navigation Behavior

* Card-based navigation
* No external routing required
* Controlled through state in `App.jsx`
* Assignment opens inside the main course platform view

📌 Week 6 Assignment Flow

* Assignment appears as a Week 06 assignment card
* Clicking opens the guide inside the main view
* The guide renders the working preview
* The guide renders the Live Test Results panel
* The guide displays the “before” prop-drilling scenario
* The guide displays the completed Context refactor source
* The guide displays the official Vitest test code
* The Project Tree stays context-aware

🎨 UI Patterns

🧱 Card-Based Entry

All content begins with clickable cards.

📖 Structured Sections

Assignment uses structured sections:

* Overview
* Objectives
* Standalone Vite Setup
* Working Preview
* Live Test Results
* Before Scenario
* Create the UserContext
* After Refactor File Shape
* Completed Portfolio Preview Source
* Official Vitest Tests
* Manual Testing
* Takeaways

💻 Embedded Preview

The working preview renders `ContextRefactorApp`.

Students can use the preview to:

* switch between users
* change a user’s saved preference
* temporarily override the preview mode
* inspect the currently resolved user setting
* verify that deeply nested output changes without pass-through props

🧾 Syntax as Learning Tool

Full source and test syntax are displayed directly in the UI with syntax highlighting.

Code examples are intended to teach:

* `createContext`
* Provider components
* custom context values
* `useContext`
* state stored inside a provider
* removing unnecessary props
* fallback behavior
* derived values
* test expectations
* user interaction testing

🧪 Live Test Panel

The app includes a visual test runner.

It demonstrates:

* user data is available in the nested profile
* switching users updates context output
* preference changes update resolved UI behavior
* middle components do not need pass-through user props
* fallback behavior works safely
* explicit mode overrides behave correctly

This complements, but does not replace, automated tests.

🗂 Project Structure

```txt
src/
├── App.jsx
├── components/
├── data/
├── lectures/
├── exercises/
│   ├── Week06ContextRefactorAssignmentGuide.jsx
│   └── ContextRefactorTestPanel.jsx
├── assignments/
│   └── week06/
│       └── context-refactor-to-context/
│           ├── ContextRefactorApp.jsx
│           ├── ContextRefactorApp.test.jsx
│           └── README.md
├── styles/
│   └── week06-context-refactor-assignment.css
└── courses/
    └── ad312/
        └── week06/
            └── assignments/
                └── context-refactor-to-context/
                    ├── content.md
                    └── example.jsx
```

🧪 Testing Structure

✅ Automated Tests

Located in:

```txt
src/assignments/week06/context-refactor-to-context/ContextRefactorApp.test.jsx
```

Includes:

* at least 3 normal cases
* at least 3 edge cases

Normal cases may verify:

* default user data renders through Context
* switching users updates the nested profile
* changing a saved preference updates the resolved mode
* temporary preview override changes the rendered mode

Edge cases may verify:

* unknown user ids fall back safely
* invalid mode values are handled safely
* nested components still render without receiving pass-through user props
* context output stays stable after repeated interactions

🧠 In-App Test Panel

Located in:

```txt
src/exercises/ContextRefactorTestPanel.jsx
```

Visual learning tool.

Tracks:

* selected user behavior
* saved preference behavior
* preview override behavior
* deeply nested profile output
* prop-drilling removal
* safe fallback behavior

🔍 Why Both?

| Type | Purpose |
|---|---|
| Automated Tests | correctness |
| Test Panel | learning, visualization, and guided feedback |

🚀 How to Run

1. Install dependencies

```bash
npm install
```

2. Start development server

```bash
npm run dev
```

3. Open app

```txt
http://localhost:5173/
```

4. Navigate to Week 6 Assignment 2

* Select course
* Select Week 06
* Click the Refactoring Prop Drilling to Context assignment card

⚡ How to Run the Standalone Vite Version

1. Create a new Vite React app

```bash
npm create vite@latest context-refactor-app -- --template react
```

2. Enter the project folder

```bash
cd context-refactor-app
```

3. Install dependencies

```bash
npm install
```

4. Start Vite

```bash
npm run dev
```

5. Create the required files

Typical standalone files may include:

```txt
src/App.jsx
src/UserContext.jsx
src/components/Dashboard.jsx
src/components/Sidebar.jsx
src/components/UserProfile.jsx
```

6. Wrap the application with `UserProvider`

The standalone version should follow the same Context behavior shown in the course-platform preview.

🧪 How to Run Tests

Run all tests:

```bash
npm run test
```

Run only this assignment’s tests:

```bash
npm run test -- src/assignments/week06/context-refactor-to-context/ContextRefactorApp.test.jsx
```

Watch mode:

```bash
npm run test:watch
```

UI mode, if available:

```bash
npm run test:ui
```

🎥 Demo

| Demo Title             | Description          | Link |
| ---------------------- | -------------------- | ---- |
| Assignment Walkthrough | Full UI + guide demo |[Week6_A2](https://youtu.be/X8zIdOJ1VmE)|

📌 Summary

Week 6 Assignment 2 introduces:

* the prop-drilling problem
* React Context as a shared-state solution
* `createContext`
* Provider components
* `useContext`
* deeply nested state consumption
* removal of unnecessary pass-through props
* user settings as shared application state
* visual preference controls
* automated Vitest coverage
* visual Live Test Results feedback

This assignment prepares students for larger React applications where state needs to be shared across multiple layers without making every intermediate component responsible for forwarding props.
---
