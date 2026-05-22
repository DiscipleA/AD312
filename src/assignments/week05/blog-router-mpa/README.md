---
🎓 AD312 Course Platform — Week 5 Assignment 3

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

Week 5 Assignment 3 asks students to convert a static single-view blog application into a multi-page routing experience. The assignment introduces a persistent layout, a Home feed, an About page, and dynamic blog post detail pages.

The assignment is written for React Router v7+ framework mode, which is part of the Remix framework family. Because the AD312 portfolio runs inside Vite, the in-app preview uses a Vite-safe bridge that demonstrates the same route behavior without replacing the existing app architecture.

🎯 Objective

The Week 5 Assignment 3 focuses on helping students:

* convert a static blog UI into a multi-page route structure
* create a persistent root layout
* render child route content through an `Outlet` pattern in the real framework version
* build a Home feed route
* build an About route
* build a dynamic Post detail route
* use `Link` for post navigation
* use `useParams` in the real framework version to read `postId`
* use `.find()` to locate a matching post record
* use `useNavigate` in the real framework version for programmatic return behavior
* handle missing posts and malformed paths safely
* practice both manual testing and automated testing

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
* Select Week 05
* View lecture and assignment cards
* Click the Blog Multi-Page App assignment card
* Open the detailed assignment guide

Assignments follow the same interaction pattern as lectures.

🧩 Three-Layer Assignment Model

1. React Router Framework Reference Layer

* Represents the standalone React Router framework app students would build
* Explains `app/root.jsx`
* Explains `app/data/posts.js`
* Explains `app/routes/_index.jsx`
* Explains `app/routes/about.jsx`
* Explains `app/routes/post.$postId.jsx`
* Shows how `Outlet`, `Link`, `useParams`, and `useNavigate` fit together

2. Vite-Compatible Bridge Layer

* Located in `src/assignments/week05/blog-router-mpa/BlogRouterBridge.jsx`
* Runs inside the AD312 course platform
* Simulates route changes without adding a second router runtime
* Exports helper functions for route generation, parsing, lookup, and resolution
* Demonstrates Home feed, About page, dynamic post pages, and return-to-feed behavior

3. Assignment Guide and Visual Test Layer

* Located in `src/exercises/Week05BlogRouterMpaAssignmentGuide.jsx`
* Uses `src/exercises/BlogRouterTestPanel.jsx`
* Contains setup commands, data requirements, route structure, working preview, source code, tests, and manual testing notes
* Embeds the Vite-compatible blog routing preview

✨ Features

🧱 Platform Features

* Course + Week navigation
* Clickable Topic Cards
* Lecture + Assignment detail views
* File tree panel
* Theme support for light and dark mode
* Syntax-highlighted source code display
* Contextual assignment file visibility

🧪 Assignment Features

* React Router framework-mode teaching model
* Vite-safe bridge preview
* Persistent navigation layout concept
* Home feed route behavior
* About route behavior
* Dynamic post detail route behavior
* Required three-post data source
* Route helper functions
* `useNavigate`-style return behavior
* Missing-post handling
* Unknown-route fallback behavior
* Full source code display
* Official Vitest tests
* In-app Live Test Results panel
* Manual testing instructions

📰 Blog Router Behavior

The required standalone app should include:

* `/` for the Home feed
* `/about` for the About page
* `/post/:postId` for individual blog post details

Example dynamic route:

```txt
/post/2
```

In a real React Router framework project, `app/routes/post.$postId.jsx` reads `postId` from `useParams()` and finds the matching blog post in `app/data/posts.js`.

The course preview mirrors that behavior with testable helper functions:

* `getPostRoute(id)`
* `parsePostIdFromPath(path)`
* `getPostById(id)`
* `resolveRoute(path)`

🌉 React Router Bridge Behavior

Because the AD312 course platform already controls navigation through `App.jsx`, Assignment 3 does not install a full React Router framework runtime into the portfolio shell.

Instead:

* the guide teaches the real React Router framework workflow
* the route file structure is shown clearly
* the in-app preview uses a bridge component
* helper functions model route behavior in a testable way
* Vitest validates the same route decisions students would implement in a standalone app

This keeps the platform stable while still teaching the framework assignment accurately.

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

React Router Reference Layer

* Explains how the assignment maps to real framework route files

Bridge Source Layer

* Vite-safe preview component and route helpers under `src/assignments/week05/blog-router-mpa/`

Testing Layer

* Vitest + React Testing Library
* In-app visual testing panel

Mirror Layer

* Lightweight course reference files under `src/courses/ad312/week05/assignments/`

🧭 Navigation Behavior

* Card-based navigation
* No external routing required inside the portfolio shell
* Controlled through state in `App.jsx`
* Assignment card opens the Week 5 Assignment 3 guide
* Bridge preview simulates route transitions inside the guide
* File tree updates to show relevant assignment files

📌 Week 5 Assignment Flow

* Assignment appears as a Week 05 assignment card
* Clicking opens the guide inside the main view
* The guide explains the multi-page blog conversion
* Setup commands show how to create a standalone React Router app
* Required data and route structure are shown before the preview
* The embedded preview demonstrates Home, About, Post Detail, and Return to Feed behavior
* The Live Test Results panel checks normal and edge route behavior
* File tree stays context-aware

🎨 UI Patterns

🧱 Card-Based Entry

All content begins with clickable cards.

📖 Structured Sections

Assignment uses structured sections:

* Overview
* Framework Note
* Objectives
* Standalone Setup
* Required Data Source
* Required Route Structure
* Working Preview
* Live Test Results
* React Router Framework Reference
* In-App Preview Source
* Official Vitest Tests
* Manual Testing
* Takeaways

💻 Embedded Preview

The actual `BlogRouterBridge` component is rendered inside the guide.

The preview demonstrates:

* Home feed rendering
* About page navigation
* dynamic post detail navigation
* missing post fallback behavior
* Return to Feed behavior that mirrors `useNavigate`

🧾 Syntax as Learning Tool

Full code and test syntax are displayed directly in the UI with syntax highlighting.

Code examples are intended to teach:

* root layout structure
* persistent navigation
* `Outlet` placement in the real framework version
* `Link` for route transitions
* dynamic route filenames
* `useParams` for `postId`
* route params as strings
* `.find()` record lookup
* missing resource handling
* malformed path handling
* `useNavigate` for programmatic navigation
* how the bridge maps to the real route files

🧪 Live Test Panel

The app includes a visual test runner:

* shows PASS / WAIT states
* includes Normal Cases and Edge Cases tabs
* demonstrates route helper expectations
* shows expected versus actual values
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
│   ├── Week05BlogRouterMpaAssignmentGuide.jsx
│   └── BlogRouterTestPanel.jsx
├── assignments/
│   └── week05/
│       └── blog-router-mpa/
│           ├── BlogRouterBridge.jsx
│           ├── BlogRouterBridge.test.jsx
│           └── README.md
├── styles/
│   └── week05-blog-router-mpa-assignment.css
└── courses/
    └── ad312/
        └── week05/
            └── assignments/
                └── blog-router-mpa/
                    ├── content.md
                    └── example.jsx
```

🧪 Testing Structure

✅ Automated Tests

Located in:

```txt
src/assignments/week05/blog-router-mpa/BlogRouterBridge.test.jsx
```

Includes:

* at least 3 normal cases
* at least 3 edge cases
* additional UI navigation checks

Normal cases verify:

* dynamic post route paths are created correctly
* a post id resolves to the correct blog post
* a dynamic post path exposes the expected `postId`
* the preview can navigate from Home to About
* clicking a post card renders the detail page
* Return to Feed simulates `useNavigate` behavior

Edge cases verify:

* a missing post id returns `null`
* malformed paths such as `/posts/3` are rejected
* unknown paths resolve to a not-found route

🧠 In-App Test Panel

Located in:

```txt
src/exercises/BlogRouterTestPanel.jsx
```

Visual learning tool.

Tracks:

* dynamic post route generation
* post id lookup
* dynamic path parsing
* missing post behavior
* malformed path behavior
* unknown route fallback behavior

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

4. Navigate to Week 5 Assignment 3

* Select course
* Select Week 05
* Click the Blog Multi-Page App assignment card

🧭 How to Run the Standalone React Router Version

1. Create a new React Router framework app

```bash
npx create-react-router@latest blog-remix-app
```

2. Enter the project folder

```bash
cd blog-remix-app
```

3. Install dependencies

```bash
npm install
```

4. Start the dev server

```bash
npm run dev
```

5. Build the required route structure

```txt
app/root.jsx
app/data/posts.js
app/routes/_index.jsx
app/routes/about.jsx
app/routes/post.$postId.jsx
```

The standalone version should follow the same Home, About, and dynamic Post behavior shown in the course-platform preview.

🧪 How to Run Tests

Run all tests:

```bash
npm run test
```

Run only this assignment’s tests:

```bash
npm run test -- src/assignments/week05/blog-router-mpa/BlogRouterBridge.test.jsx
```

Watch mode:

```bash
npm run test:watch
```

UI mode, if configured:

```bash
npm run test:ui
```

🎥 Demo

| Demo Title             | Description          | Link |
| ---------------------- | -------------------- | ---- |
| Assignment Walkthrough | Full UI + guide demo |[Week5_A3](https://youtu.be/L8Kb5qaZ_Vg)|

📌 Summary

Week 5 Assignment 3 introduces:

* React Router framework-style multi-page application structure
* persistent root layout thinking
* Home, About, and dynamic Post routes
* `Outlet`, `Link`, `useParams`, and `useNavigate` concepts
* dynamic route params
* missing resource handling
* malformed path handling
* Vite-safe bridge implementation
* automated and visual testing workflows

This assignment helps students understand why real multi-page application state belongs in the URL when users need to bookmark, share, refresh, or directly open a specific blog post.
---
