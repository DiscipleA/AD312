🎓 AD312 Course Platform — Week 7 Assignment 2

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

Week 7 Assignment 2 introduces advanced client-side form architecture with React Hook Form. Students build a user registration form that relies on registered uncontrolled fields, validation subscriptions, watched values, lifecycle helpers, and async submission state instead of manually storing every keystroke in local component state.

This assignment focuses on form performance, validation, draft caching, submission lifecycle behavior, and testable user-input workflows in a Vite React environment.

🎯 Objective

The Week 7 Assignment 2 focuses on helping students:

* register input fields with React Hook Form’s `register` function
* declare validation rules inside field registration configuration
* validate full name, email, password, confirm password, role, and terms fields
* use `watch()` to compare confirm password against the current password value
* use lifecycle logic to restore cached drafts from `localStorage`
* use React Hook Form helpers such as `setValue`, `reset`, and `formState`
* display field-level validation messages
* show async submission state through `isSubmitting`
* reset the form and clear cached draft data after successful simulated submission
* practice manual testing, Vitest testing, and in-app visual testing

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
* Select Week 07
* View assignment cards
* Click the Advanced Performance Forms with React Hook Form assignment card
* Open the detailed assignment guide

Assignments follow the same interaction pattern as lectures.

🧩 Two-Layer Assignment Model

1. Assignment Guide and Visual Test Layer

* Located in `src/exercises/Week07ReactHookFormAssignmentGuide.jsx`
* Uses `src/exercises/RegistrationFormTestPanel.jsx`
* Displays teaching content, required fields, working preview, Live Test Results, setup instructions, full source code, full test code, and manual testing guidance
* Embeds the completed registration form as the working preview

2. Completed Assignment Source Layer

* Located in `src/assignments/week07/react-hook-form-registration/`
* Contains the completed React Hook Form implementation
* Contains the official Vitest test file
* Contains this README file
* Can be tested independently through the project’s Vitest setup

✨ Features

🧱 Platform Features

* Course + Week navigation
* Clickable Topic Cards
* Assignment detail views
* File tree panel
* Theme support for light and dark mode
* Syntax-highlighted source code display
* Contextual assignment file visibility

🧪 Assignment Features

* React Hook Form registration workflow
* Full Name required validation with minimum length
* Email required validation with regex pattern checking
* Password validation with length, uppercase, lowercase, and number requirements
* Confirm Password validation using watched password value
* Role / Account Type dropdown validation
* Terms & Conditions checkbox validation
* Auto-focus on the Full Name input
* Draft caching with `watch()` and `localStorage`
* Cached draft restoration on mount
* Simulated async submission delay
* Submit button lifecycle state using `isSubmitting`
* Form reset after successful submission
* Cache clearing after successful submission
* 3 normal Vitest cases
* 3+ edge Vitest cases
* In-app Live Test Results panel

📝 Registration Form Behavior

The form contains the following required fields:

* Full Name
* Email Address
* Password
* Confirm Password
* Role / Account Type
* Terms & Conditions

Students learn that React Hook Form does not require every field to be represented by a separate `useState` call. Instead, the form registers inputs, tracks validation internally, and exposes only the state the UI needs.

The form also demonstrates a realistic draft flow:

* user begins typing
* `watch()` observes form changes
* a side-effect stores the draft in `localStorage`
* revisiting the form can restore the draft
* successful submission resets the form
* successful submission clears the cached draft

No real account is created. The submit process simulates a client-side registration lifecycle so students can focus on form architecture and validation behavior.

🏗 Architecture

🧭 High-Level Layers

App Shell

* Controls navigation and rendering

Data Layer

* `courseData.js` defines course/week/card structure

Component Layer

* Sidebar, Header, TopicCard, FileTreePanel, and shared UI components

Content Layer

* Assignment guide component in `src/exercises/`

Assignment Source Layer

* React Hook Form component and tests in `src/assignments/week07/react-hook-form-registration/`

Testing Layer

* Vitest + React Testing Library
* In-app visual testing panel

Mirror Layer

* Lightweight course reference files under `src/courses/ad312/week07/assignments/`

🧭 Navigation Behavior

* Card-based navigation
* No external routing required
* Controlled through state in `App.jsx`
* Assignment card opens the Week 7 Assignment 2 guide
* File tree updates to show relevant assignment files

📌 Week 7 Assignment Flow

* Assignment appears as a Week 07 assignment card
* Clicking opens the guide inside the main view
* The guide explains the React Hook Form performance model
* Required form fields appear before the working preview
* The working preview renders the completed registration form
* The Live Test Results panel appears after the preview
* Setup, app entry, source code, tests, and manual testing notes appear lower in the guide
* File tree stays context-aware

🎨 UI Patterns

🧱 Card-Based Entry

All content begins with clickable cards.

📖 Structured Sections

Assignment uses structured sections:

* Overview
* Objectives
* Required Form Fields
* Working Preview
* Live Test Results
* Standalone Vite Setup
* Standalone App Entry
* Completed Source Code
* Official Vitest Tests
* Manual Testing
* Performance Takeaway

💻 Embedded Preview

The assignment guide includes a working preview that demonstrates:

* field registration
* validation error rendering
* role selection
* required terms acceptance
* password confirmation matching
* draft caching behavior
* simulated submission lifecycle
* reset after success

🧾 Syntax as Learning Tool

Full code and test syntax are displayed directly in the UI with syntax highlighting.

Code examples are intended to teach:

* React Hook Form setup
* `register()` field binding
* validation rule objects
* `watch()` for cross-field validation
* `setValue()` for restoring cached drafts
* `reset()` for cleaning form state
* `formState.errors`
* `formState.isSubmitting`
* localStorage side effects
* async submission behavior
* React Testing Library user-event workflows
* validation and edge-case expectations

🧪 Live Test Panel

The app includes a visual test runner:

* shows PASS / WAIT states
* groups normal and edge cases
* demonstrates validation expectations interactively
* complements the official Vitest suite

This complements, but does not replace, automated tests.

🗂 Project Structure

```txt
src/
├── App.jsx
├── components/
├── data/
├── lectures/
├── exercises/
│   ├── Week07ReactHookFormAssignmentGuide.jsx
│   └── RegistrationFormTestPanel.jsx
├── assignments/
│   └── week07/
│       └── react-hook-form-registration/
│           ├── UserRegistrationForm.jsx
│           ├── UserRegistrationForm.test.jsx
│           └── README.md
├── styles/
│   └── week07-react-hook-form-registration-assignment.css
└── courses/
    └── ad312/
        └── week07/
            └── assignments/
                └── react-hook-form-registration/
                    ├── content.md
                    └── example.jsx
```

🧪 Testing Structure

✅ Automated Tests

Located in:

```txt
src/assignments/week07/react-hook-form-registration/UserRegistrationForm.test.jsx
```

Includes:

* at least 3 normal cases
* at least 3 edge cases

Normal cases verify:

* required fields can be completed successfully
* valid form submission displays the async submission lifecycle
* cached draft data can be restored from `localStorage`

Edge cases verify:

* empty required fields show validation messages
* invalid email format blocks submission
* weak password values block submission
* mismatched confirm password values block submission
* unchecked terms prevent successful registration

🧠 In-App Test Panel

Located in:

```txt
src/exercises/RegistrationFormTestPanel.jsx
```

Visual learning tool.

Tracks:

* required validation behavior
* email validation behavior
* password validation behavior
* confirm password matching
* role selection
* terms checkbox requirement
* draft caching behavior
* async submit/reset behavior

🔍 Why Both?

| Type | Purpose |
|---|---|
| Automated Tests | correctness |
| Test Panel | learning + visualization |

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

4. Navigate to Week 7 Assignment 2

* Select course
* Select Week 07
* Click the Advanced Performance Forms with React Hook Form assignment card

🧪 How to Run Tests

Run all tests:

```bash
npm run test
```

Run only this assignment’s tests:

```bash
npm run test -- src/assignments/week07/react-hook-form-registration/UserRegistrationForm.test.jsx
```

Watch mode:

```bash
npm run test:watch
```

UI mode, if available:

```bash
npm run test:ui
```

⚙️ Performance Notes

Traditional controlled forms often update React state on every keystroke. React Hook Form uses a ref-based registration model so most field values stay close to the DOM while validation and lifecycle state are exposed through focused subscriptions.

This assignment highlights:

* fewer unnecessary re-renders
* simpler validation configuration
* cleaner submit lifecycle state
* safer field-level error rendering
* better scalability for larger forms

🎥 Demo

| Demo Title             | Description          | Link |
| ---------------------- | -------------------- | ---- |
| Assignment Walkthrough | Full UI + guide demo |[Week7_A2](https://youtu.be/FtRBGqpblJ4)|

📌 Summary

Week 7 Assignment 2 introduces:

* React Hook Form
* uncontrolled field registration
* field-level validation
* cross-field password confirmation
* draft caching with `watch()` and `localStorage`
* async submission lifecycle state
* form reset behavior
* Vitest and React Testing Library coverage
* visual Live Test Results

This assignment prepares students for integrating form client-state with server-state workflows in Week 7 Assignment 3.
---
