#🎓 AD312 Course Platform — Week 7 Assignment 3

---

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

Week 7 Assignment 3 integrates React Hook Form with TanStack Query to model an enterprise profile-editing workflow. Students learn how to separate form client-state from remote server-state by loading profile data through `useQuery`, hydrating the form with `reset()`, saving updates through `useMutation`, invalidating cached data, and mapping simulated server validation errors back into field-level form errors.

This assignment focuses on the architecture used in production React applications where form state, server cache state, network status, and validation feedback must work together without unnecessary synchronization bugs.

🎯 Objective

The Week 7 Assignment 3 focuses on helping students:

* fetch profile data with TanStack Query’s `useQuery`
* use a stable query key such as `["userProfile"]`
* hydrate React Hook Form fields with server data through `reset()`
* update profile data through a mutation workflow
* distinguish form client-state from server-state
* disable save actions when the form is not dirty
* disable save actions while a mutation is pending
* invalidate the profile query after a successful mutation
* reset the form with updated server data after successful save
* map a simulated 409 email conflict into `setError("email")`
* understand how a Vite-safe mock API maps to a standalone `json-server` workflow
* practice Vitest testing and visual Live Test Results

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
* Click the Enterprise Server-State Integration assignment card
* Open the detailed assignment guide

Assignments follow the same interaction pattern as lectures.

🧩 Three-Layer Assignment Model

1. Assignment Guide and Visual Test Layer

* Located in `src/exercises/Week07QueryFormIntegrationAssignmentGuide.jsx`
* Uses `src/exercises/RegistrationQueryFormTestPanel.jsx`
* Displays teaching content, required profile fields, working preview, Live Test Results, setup instructions, mock REST data, source code, test code, and manual testing guidance
* Embeds the completed profile editor as the working preview

2. Completed Assignment Source Layer

* Located in `src/assignments/week07/query-form-profile-integration/`
* Contains the completed React Hook Form + TanStack Query implementation
* Contains the official Vitest test file
* Contains the mock `profile-db.json` data reference
* Contains this README file

3. Standalone Mock REST API Layer

* Uses `json-server` in the standalone workflow
* Serves profile data from a `/profile` endpoint
* Mirrors the browser-safe mock API used inside the AD312 course platform

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

* React Hook Form form client-state
* TanStack Query server-state cache
* `useQuery` profile loading
* `useMutation` profile saving
* Query key: `["userProfile"]`
* Form hydration through `reset(profile)`
* Dirty-state locking with `formState.isDirty`
* Pending-state locking with mutation status
* Cache invalidation with `queryClient.invalidateQueries`
* Server response reset after successful mutation
* Simulated 409 Conflict for `conflict@example.com`
* Field-level server error mapping with `setError("email")`
* Vite-safe mock API inside the portfolio
* Standalone `json-server` instructions
* 3 normal Vitest cases
* 3 edge Vitest cases
* In-app Live Test Results panel

🧾 Profile Editor Behavior

The profile editor manages a single profile record with:

* username
* email
* bio
* notifications

The profile is loaded from the mock server layer. Once the data is available, React Hook Form is hydrated with `reset(profile)`. This makes the fetched server data the clean default form state.

The Save Profile button is intentionally disabled when:

* the form has not changed
* the mutation is currently pending

This behavior comes from the assignment requirement to combine `formState.isDirty` with the mutation’s pending state. A disabled button means there are no unsaved changes yet, not that the form is broken.

When a save succeeds:

* the mutation returns the updated profile
* the profile query is invalidated
* the form is reset with the saved server data
* the dirty state returns to false

When the email is `conflict@example.com`:

* the mock API simulates a server-side conflict
* the mutation rejects with a server-style error
* `setError("email")` maps that error to the email field
* the UI displays a localized email validation message

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

* React Hook Form + TanStack Query component and tests in `src/assignments/week07/query-form-profile-integration/`

Mock API Layer

* Browser-safe API adapter for preview and tests
* `json-server` setup guidance for standalone development

Testing Layer

* Vitest + React Testing Library
* In-app visual testing panel

Mirror Layer

* Lightweight course reference files under `src/courses/ad312/week07/assignments/`

🧭 Navigation Behavior

* Card-based navigation
* No external routing required
* Controlled through state in `App.jsx`
* Assignment card opens the Week 7 Assignment 3 guide
* File tree updates to show relevant assignment files

📌 Week 7 Assignment Flow

* Assignment appears as a Week 07 assignment card
* Clicking opens the guide inside the main view
* The guide explains the enterprise server-state form architecture
* Required profile fields appear before the working preview
* The working preview renders the completed profile editor
* The Live Test Results panel appears after the preview
* Setup, mock REST data, app entry, source code, tests, and manual testing notes appear lower in the guide
* File tree stays context-aware

🎨 UI Patterns

🧱 Card-Based Entry

All content begins with clickable cards.

📖 Structured Sections

Assignment uses structured sections:

* Overview
* Objectives
* Required Profile Fields
* Working Preview
* Live Test Results
* Standalone Vite Setup
* Mock REST API Data
* Standalone App Entry
* Completed Source Code
* Official Vitest Tests
* Manual Testing
* Architecture Takeaway

💻 Embedded Preview

The assignment guide includes a working preview that demonstrates:

* loading a server-backed profile
* hydrating form defaults
* editing profile fields
* enabling the save button only when edits exist
* saving through a mutation
* invalidating cached profile data
* resetting the form after success
* displaying server-side email conflict errors

🧾 Syntax as Learning Tool

Full code and test syntax are displayed directly in the UI with syntax highlighting.

Code examples are intended to teach:

* `QueryClientProvider`
* `useQuery`
* query keys
* mock API adapter functions
* `useMutation`
* `queryClient.invalidateQueries`
* React Hook Form `register`
* React Hook Form `reset`
* React Hook Form `setError`
* `formState.isDirty`
* mutation pending state
* server validation error mapping
* test setup with QueryClient wrappers
* async React Testing Library expectations

🧪 Live Test Panel

The app includes a visual test runner:

* shows PASS / WAIT states
* groups normal and edge cases
* checks profile normalization expectations
* checks email validation expectations
* checks mock API loading behavior
* checks dirty-state locking
* checks server conflict behavior
* complements the official Vitest suite

The Live Test Results panel does not duplicate the working preview. It stays focused on test visualization.

🗂 Project Structure

```txt
src/
├── App.jsx
├── components/
├── data/
├── lectures/
├── exercises/
│   ├── Week07QueryFormIntegrationAssignmentGuide.jsx
│   └── RegistrationQueryFormTestPanel.jsx
├── assignments/
│   └── week07/
│       └── query-form-profile-integration/
│           ├── UserProfileQueryForm.jsx
│           ├── UserProfileQueryForm.test.jsx
│           ├── profile-db.json
│           └── README.md
├── styles/
│   └── week07-query-form-profile-integration-assignment.css
└── courses/
    └── ad312/
        └── week07/
            └── assignments/
                └── query-form-profile-integration/
                    ├── content.md
                    └── example.jsx
```

🧪 Testing Structure

✅ Automated Tests

Located in:

```txt
src/assignments/week07/query-form-profile-integration/UserProfileQueryForm.test.jsx
```

Includes:

* at least 3 normal cases
* at least 3 edge cases

Normal cases verify:

* loading state appears while profile data is being fetched
* server data hydrates the form fields
* editing profile data enables the Save Profile button
* successful save updates the displayed server profile
* valid email values pass client validation

Edge cases verify:

* save button remains disabled when there are no unsaved changes
* invalid email format blocks submission
* simulated `conflict@example.com` server rejection maps to the email field
* missing optional profile fields are normalized safely
* mutation pending state prevents duplicate save behavior

🧠 In-App Test Panel

Located in:

```txt
src/exercises/RegistrationQueryFormTestPanel.jsx
```

Visual learning tool.

Tracks:

* query hydration behavior
* profile normalization behavior
* email validation behavior
* mock API behavior
* dirty-state save locking
* successful mutation expectations
* server conflict handling
* edge-case handling

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

4. Navigate to Week 7 Assignment 3

* Select course
* Select Week 07
* Click the Enterprise Server-State Integration with TanStack Query & React Hook Form assignment card

🌐 How to Run the Standalone Mock REST API Version

1. Install dependencies

```bash
npm install @tanstack/react-query react-hook-form
npm install -D json-server
```

2. Create `profile-db.json`

```json
{
  "profile": {
    "username": "avery.dev",
    "email": "avery@example.com",
    "bio": "Frontend developer focused on accessible product experiences.",
    "notifications": true
  }
}
```

3. Start json-server

```bash
npx json-server --watch profile-db.json --port 3001
```

4. Use the endpoint

```txt
http://localhost:3001/profile
```

5. Start the Vite app

```bash
npm run dev
```

🧪 How to Run Tests

Run all tests:

```bash
npm run test
```

Run only this assignment’s tests:

```bash
npm run test -- src/assignments/week07/query-form-profile-integration/UserProfileQueryForm.test.jsx
```

Watch mode:

```bash
npm run test:watch
```

UI mode, if available:

```bash
npm run test:ui
```

🏢 Architecture Notes

This assignment demonstrates the separation between form client-state and server-state.

React Hook Form owns:

* field registration
* validation state
* dirty state
* local form values
* field-level errors

TanStack Query owns:

* server data loading
* cached profile data
* loading status
* mutation status
* cache invalidation
* server refresh behavior

The mock API owns:

* network-like fetch behavior
* update behavior
* simulated server-side conflicts

This separation reduces bugs because form state does not need to manually duplicate or reimplement server-cache state.

🎥 Demo

| Demo Title             | Description          | Link |
| ---------------------- | -------------------- | ---- |
| Assignment Walkthrough | Full UI + guide demo |[Week7_A3](https://youtu.be/-63HUNVaTEs)|

📌 Summary

Week 7 Assignment 3 introduces:

* React Hook Form + TanStack Query integration
* query-based profile loading
* form hydration with `reset()`
* mutation-based profile updates
* query cache invalidation
* dirty-state save locking
* pending-state save locking
* server validation error mapping with `setError()`
* Vite-safe mock API design
* standalone `json-server` workflow
* Vitest and React Testing Library coverage
* visual Live Test Results

This assignment builds directly on Week 7 Assignment 2 by moving from client-only validation and draft behavior into an enterprise server-state form workflow.
---
