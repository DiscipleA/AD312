---
🎓 AD312 Course Platform — Week 5 Assignment 2

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

Week 5 Assignment 2 continues the Week 2 Recipe Gallery by converting a local-state gallery into a routed multi-page experience. Instead of using Previous and Next buttons to switch visible recipes, students learn how URL state can represent navigation.

The assignment is written for React Router v7+ framework mode, which uses file-based routes in the Remix framework family. Because the AD312 platform itself is a Vite app, the portfolio uses a Vite-safe bridge preview that demonstrates the same routing behavior without installing a competing router runtime inside the course shell.

🎯 Objective

The Week 5 Assignment 2 focuses on helping students:

* convert a state-driven recipe gallery into route-driven navigation
* understand when UI state should become URL state
* create a Home route
* create a Gallery route
* create a dynamic Recipe Detail route
* use a global layout with persistent navigation
* use `Link` for route navigation
* use `useParams` in the real framework version to read dynamic route parameters
* handle missing recipe records safely
* distinguish valid dynamic paths from malformed paths
* connect React Router framework concepts to a stable Vite preview
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
* Click the Recipe Gallery Routing assignment card
* Open the detailed assignment guide

Assignments follow the same interaction pattern as lectures.

🧩 Three-Layer Assignment Model

1. React Router Framework Reference Layer

* Represents the standalone framework assignment students would build
* Explains `app/root.jsx`
* Explains `app/routes/_index.jsx`
* Explains `app/routes/gallery.jsx`
* Explains `app/routes/recipe.$id.jsx`
* Shows how the URL replaces local selected-recipe state

2. Vite-Compatible Bridge Layer

* Located in `src/assignments/week05/recipe-router-gallery/RecipeRouterBridge.jsx`
* Runs inside the AD312 Vite course platform
* Simulates route changes safely with local preview state
* Exports helper functions used by the official Vitest tests
* Demonstrates the same Home, Gallery, and Recipe Detail behavior

3. Assignment Guide and Visual Test Layer

* Located in `src/exercises/Week05RecipeRouterGalleryAssignmentGuide.jsx`
* Uses `src/exercises/RecipeRouterGalleryTestPanel.jsx`
* Contains teaching content, setup commands, route reference code, working preview, source display, test display, and Live Test Results
* Embeds the Vite-compatible bridge preview

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
* Home route behavior
* Gallery route behavior
* Dynamic recipe detail route behavior
* Week 2 recipe data reused in a routed context
* Route helper functions
* Valid dynamic route parsing
* Missing-record handling
* Unknown-route fallback behavior
* Full source code display
* Official Vitest tests
* In-app Live Test Results panel
* Manual testing instructions

🍽️ Recipe Router Gallery Behavior

The original Week 2 gallery used component state to decide which recipe appeared.

Week 5 changes that mental model:

* `/` displays the Home page
* `/gallery` displays all recipe cards
* `/recipe/:id` displays one recipe detail page
* a missing recipe id shows a not-found state
* malformed paths are rejected safely

Example dynamic route:

```txt
/recipe/2
```

In a real React Router framework project, `app/routes/recipe.$id.jsx` would use `useParams()` to read the route parameter. The course preview mirrors that behavior through route helper functions so the concept remains testable inside Vite.

🌉 React Router Bridge Behavior

Because the AD312 course platform already has its own app shell and navigation state, Assignment 2 does not install a full React Router framework runtime into the portfolio.

Instead:

* standalone setup instructions teach the real framework workflow
* route files are shown as reference code
* the in-app preview uses browser-safe React state to simulate navigation
* helper functions model route generation, parsing, and resolution
* Vitest verifies the transferable routing logic

This keeps the platform stable while still teaching the requested routing assignment accurately.

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

* Vite-safe preview component and route helpers under `src/assignments/week05/recipe-router-gallery/`

Testing Layer

* Vitest + React Testing Library
* In-app visual testing panel

Mirror Layer

* Lightweight course reference files under `src/courses/ad312/week05/assignments/`

🧭 Navigation Behavior

* Card-based navigation
* No external routing required inside the portfolio shell
* Controlled through state in `App.jsx`
* Assignment card opens the Week 5 Assignment 2 guide
* Bridge preview simulates route transitions inside the guide
* File tree updates to show relevant assignment files

📌 Week 5 Assignment Flow

* Assignment appears as a Week 05 assignment card
* Clicking opens the guide inside the main view
* The guide explains the Week 2 to Week 5 transition
* Setup commands show how to create a standalone React Router app
* Route reference code explains the real framework structure
* The embedded preview demonstrates Home, Gallery, and Recipe Detail screens
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
* Required Route Structure
* Working Preview
* Live Test Results
* React Router Framework Reference
* In-App Preview Source
* Official Vitest Tests
* Manual Testing
* Takeaways

💻 Embedded Preview

The actual `RecipeRouterBridge` component is rendered inside the guide.

The preview demonstrates:

* Home page rendering
* Gallery navigation
* clickable recipe cards
* dynamic recipe detail display
* Back to Gallery behavior
* missing route fallback behavior

🧾 Syntax as Learning Tool

Full code and test syntax are displayed directly in the UI with syntax highlighting.

Code examples are intended to teach:

* route file structure
* `Link` navigation
* dynamic route filenames
* `useParams` in the real framework version
* route params as strings
* missing resource handling
* malformed path handling
* URL state versus component state
* why shareable pages belong in the URL
* how bridge helpers preserve testable routing logic

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
│   ├── Week05RecipeRouterGalleryAssignmentGuide.jsx
│   └── RecipeRouterGalleryTestPanel.jsx
├── assignments/
│   └── week05/
│       └── recipe-router-gallery/
│           ├── RecipeRouterBridge.jsx
│           ├── RecipeRouterBridge.test.jsx
│           └── README.md
├── styles/
│   └── week05-recipe-router-gallery-assignment.css
└── courses/
    └── ad312/
        └── week05/
            └── assignments/
                └── recipe-router-gallery/
                    ├── content.md
                    └── example.jsx
```

🧪 Testing Structure

✅ Automated Tests

Located in:

```txt
src/assignments/week05/recipe-router-gallery/RecipeRouterBridge.test.jsx
```

Includes:

* at least 3 normal cases
* at least 3 edge cases
* additional UI navigation checks

Normal cases verify:

* dynamic route paths are created correctly
* a recipe id resolves to the correct Week 2 recipe data
* a dynamic recipe path exposes the expected id parameter
* the preview can navigate from Home to Gallery
* clicking a gallery card renders the detail page

Edge cases verify:

* a missing recipe id returns `null`
* malformed paths such as `/recipes/3` are rejected
* unknown paths resolve to a not-found route

🧠 In-App Test Panel

Located in:

```txt
src/exercises/RecipeRouterGalleryTestPanel.jsx
```

Visual learning tool.

Tracks:

* route path generation
* recipe id lookup
* dynamic route parsing
* missing id behavior
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

4. Navigate to Week 5 Assignment 2

* Select course
* Select Week 05
* Click the Recipe Gallery Routing assignment card

🧭 How to Run the Standalone React Router Version

1. Create a new React Router framework app

```bash
npx create-react-router@latest recipe-router-app
```

2. Enter the project folder

```bash
cd recipe-router-app
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
app/routes/_index.jsx
app/routes/gallery.jsx
app/routes/recipe.$id.jsx
```

The standalone version should follow the same Home, Gallery, and Recipe Detail behavior shown in the course-platform preview.

🧪 How to Run Tests

Run all tests:

```bash
npm run test
```

Run only this assignment’s tests:

```bash
npm run test -- src/assignments/week05/recipe-router-gallery/RecipeRouterBridge.test.jsx
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
| Assignment Walkthrough | Full UI + guide demo |[Week5_A2](https://youtu.be/VXe6Yru_bw8)|

📌 Summary

Week 5 Assignment 2 introduces:

* React Router framework-style thinking
* Home, Gallery, and Recipe Detail route design
* dynamic route params
* `Link`-based navigation
* missing resource handling
* malformed path handling
* URL state instead of local selected-item state
* Vite-safe bridge implementation
* automated and visual testing workflows

This assignment builds on the Week 2 Recipe Gallery by showing when navigation should become part of the URL so users can bookmark, share, refresh, and directly open specific recipe pages.
---
