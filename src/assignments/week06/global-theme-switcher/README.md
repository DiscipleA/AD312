---
🎓 AD312 Course Platform — Week 6 Assignment 3

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

Week 6 Assignment 3 introduces a global theme switcher using the React Context API. Students build a shared light/dark mode system that can be accessed across an application without passing theme props manually through every component.

The assignment focuses on creating a `ThemeContext`, building a `ThemeProvider`, exposing a `toggleTheme` function, consuming the current theme with `useContext`, and applying dynamic UI styles based on the selected theme.

Students also learn why theme state is a strong example of global application state: many parts of the interface need to respond to the same value, from the page background to cards, buttons, panels, and nested UI components.

🎯 Objective

The Week 6 Assignment 3 focuses on helping students:

* understand why dark mode is a common global UI feature
* use `createContext` to establish shared theme state
* create a custom `ThemeProvider` component
* manage theme state with `useState`
* expose a `toggleTheme` function through Context
* consume theme data with `useContext`
* apply dynamic classes or styles based on the current theme
* understand how CSS and React state work together
* optionally persist a user’s theme preference
* avoid prop drilling for global UI settings
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
* Click the Week 6 Assignment 3 card
* Open the detailed assignment guide

Assignments follow the same interaction pattern as lectures.

🧩 Assignment Model

Week 6 Assignment 3 uses the corrected Week 5+ assignment structure.

1. Assignment Guide Layer

* Located in `src/exercises/Week06ThemeSwitcherAssignmentGuide.jsx`
* Contains the teaching content, setup notes, working preview, source code, test code, Live Test Results, and summary
* Explains how the Vite assignment maps to a standalone React app

2. Live Test Results Layer

* Located in `src/exercises/ThemeSwitcherTestPanel.jsx`
* Provides an in-app visual test panel
* Shows normal and edge cases
* Complements the official Vitest tests

3. Completed Source Layer

* Located in `src/assignments/week06/global-theme-switcher/ThemeSwitcherApp.jsx`
* Contains the completed Vite-safe React implementation
* Demonstrates `createContext`, `ThemeProvider`, `useContext`, theme toggling, and dynamic theme styling

4. Official Test Layer

* Located in `src/assignments/week06/global-theme-switcher/ThemeSwitcherApp.test.jsx`
* Uses Vitest and React Testing Library
* Verifies normal behavior and edge-case behavior

5. README Layer

* Located in `src/assignments/week06/global-theme-switcher/README.md`
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
* global theme state with React Context
* `createContext` setup
* `ThemeProvider` wrapper
* `useContext` consumption
* theme toggle button
* direct light and dark mode controls
* dynamic theme styling
* nested components consuming shared theme state
* safe theme fallback behavior
* optional localStorage persistence pattern
* full source code display
* full Vitest test display
* manual testing instructions
* in-app Live Test Results panel

🌗 Theme Switcher Behavior

The assignment builds a global light/dark mode system.

The Context value includes:

* the current theme string
* a function that toggles between light and dark
* helper behavior for selecting a specific theme
* derived information that allows the UI to know whether dark mode is active

The preview demonstrates that theme state can affect multiple parts of the interface at once, including:

* main layout background
* text color
* card surfaces
* status panels
* buttons
* nested UI components

This makes dark mode a practical example of shared global state.

🧠 Context Theme Behavior

The completed solution creates a shared theme context.

The implementation uses:

* `createContext` to define the shared theme channel
* `ThemeProvider` to own the current theme state
* `useState` to switch between light and dark modes
* `toggleTheme` to flip between the two modes
* `useContext` to let nested components read theme data directly
* dynamic classes or styles to update the interface

The result is a cleaner component tree because nested components can respond to the current theme without receiving manually forwarded theme props.

A simplified structure looks like:

```txt
ThemeProvider
└── ThemePreviewShell
    ├── ThemeSwitcher
    ├── DashboardCard
    └── NestedThemeStatus
```

Each child can access the current theme through Context instead of relying on prop drilling.

🎨 Light and Dark Mode Behavior

The assignment preview includes visible light and dark modes.

Students can experiment with:

* toggling the current theme
* selecting light mode directly
* selecting dark mode directly
* observing the current theme label
* watching multiple UI areas update together
* confirming that nested components receive the same shared theme value

This helps demonstrate that Context is not only useful for user data. It is also useful for global UI preferences.

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
* The guide displays the ThemeContext setup
* The guide displays the completed Theme Switcher source
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
* ThemeContext Requirements
* Provider and Toggle Logic
* Completed Portfolio Preview Source
* Official Vitest Tests
* Manual Testing
* Takeaways

💻 Embedded Preview

The working preview renders `ThemeSwitcherApp`.

Students can use the preview to:

* toggle between light and dark mode
* choose a mode directly
* inspect the active theme label
* see multiple panels update at the same time
* confirm nested components consume theme through Context
* connect Context state to visual UI changes

🧾 Syntax as Learning Tool

Full source and test syntax are displayed directly in the UI with syntax highlighting.

Code examples are intended to teach:

* `createContext`
* Provider components
* `useState`
* `useContext`
* custom context values
* toggle functions
* dynamic styling
* CSS classes driven by React state
* optional persistence with localStorage
* safe fallback handling
* test expectations
* user interaction testing

🧪 Live Test Panel

The app includes a visual test runner.

It demonstrates:

* default theme behavior
* toggling from light to dark
* toggling from dark to light
* direct light mode selection
* direct dark mode selection
* invalid theme fallback behavior
* nested context consumption
* UI state matching the current theme

This complements, but does not replace, automated tests.

🗂 Project Structure

```txt
src/
├── App.jsx
├── components/
├── data/
├── lectures/
├── exercises/
│   ├── Week06ThemeSwitcherAssignmentGuide.jsx
│   └── ThemeSwitcherTestPanel.jsx
├── assignments/
│   └── week06/
│       └── global-theme-switcher/
│           ├── ThemeSwitcherApp.jsx
│           ├── ThemeSwitcherApp.test.jsx
│           └── README.md
├── styles/
│   └── week06-theme-switcher-assignment.css
└── courses/
    └── ad312/
        └── week06/
            └── assignments/
                └── global-theme-switcher/
                    ├── content.md
                    └── example.jsx
```

🧪 Testing Structure

✅ Automated Tests

Located in:

```txt
src/assignments/week06/global-theme-switcher/ThemeSwitcherApp.test.jsx
```

Includes:

* at least 3 normal cases
* at least 3 edge cases

Normal cases may verify:

* the default theme renders correctly
* clicking the toggle button changes the active theme
* selecting light mode directly applies light mode
* selecting dark mode directly applies dark mode
* nested components display the same shared theme value

Edge cases may verify:

* invalid theme values fall back safely
* repeated toggles keep the UI in a valid state
* stored theme values are normalized before use
* missing storage access does not break rendering
* the provider still renders children safely

🧠 In-App Test Panel

Located in:

```txt
src/exercises/ThemeSwitcherTestPanel.jsx
```

Visual learning tool.

Tracks:

* initial theme behavior
* toggle behavior
* direct mode selection
* nested theme consumption
* invalid value fallback
* visual state synchronization

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

4. Navigate to Week 6 Assignment 3

* Select course
* Select Week 06
* Click the Global Theme / Dark Mode Switcher assignment card

⚡ How to Run the Standalone Vite Version

1. Create a new Vite React app

```bash
npm create vite@latest theme-switcher-app -- --template react
```

2. Enter the project folder

```bash
cd theme-switcher-app
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
src/ThemeContext.jsx
src/ThemeSwitcher.jsx
src/components/Dashboard.jsx
src/components/ThemeStatus.jsx
```

6. Wrap the application with `ThemeProvider`

The standalone version should follow the same Context behavior shown in the course-platform preview.

🧪 How to Run Tests

Run all tests:

```bash
npm run test
```

Run only this assignment’s tests:

```bash
npm run test -- src/assignments/week06/global-theme-switcher/ThemeSwitcherApp.test.jsx
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
| Assignment Walkthrough | Full UI + guide demo |[Week6_A3](https://youtu.be/cFFIc2qddhs)|

📌 Summary

Week 6 Assignment 3 introduces:

* global UI state with React Context
* light and dark mode as a shared application setting
* `createContext`
* Provider components
* `useContext`
* theme toggling logic
* dynamic classes and visual styling
* nested components consuming shared theme state
* optional localStorage persistence
* automated Vitest coverage
* visual Live Test Results feedback

This assignment builds directly on Week 6 Assignment 2. Assignment 2 uses Context to solve prop drilling for user data, while Assignment 3 applies the same Context pattern to a global UI preference that affects the look and feel of the entire application.
---
