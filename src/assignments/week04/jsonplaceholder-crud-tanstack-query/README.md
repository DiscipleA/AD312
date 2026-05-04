🎓 AD312 Course Platform — Week 4 Assignment 2

📝 Overview

This project continues the Vite + React learning platform introduced in earlier weeks. Instead of behaving like a basic React app, it functions as a course portfolio and instructional platform.

It supports:

    course switching
    week switching
    clickable lecture and assignment cards
    lecture detail views
    assignment guide pages
    contextual file tree panel
    dark/light theme support

Week 4 Assignment 2 introduces CRUD operations with TanStack Query by using the JSONPlaceholder API. Students learn how to fetch, create, update, patch, delete, and filter server data through query and mutation hooks.

The assignment instructions are written for Expo, but the course platform itself runs in Vite. To keep the platform stable, this assignment uses an Expo Bridge pattern:

    the guide teaches the real Expo workflow
    the displayed source includes Expo-style implementation guidance
    the in-app preview uses a Vite-compatible React version of the same behavior
    the official tests verify the transferable CRUD logic

This allows students to understand the Expo assignment while still using the AD312 course platform for previewing, testing, and documentation.

🎯 Objective

The Week 4 Assignment 2 focuses on helping students:

    understand how TanStack Query manages CRUD server-state workflows
    fetch posts from JSONPlaceholder using GET
    create posts using POST
    fully update posts using PUT
    partially update posts using PATCH
    delete posts using DELETE
    filter posts by userId
    distinguish queries from mutations
    understand optimistic UI-style workflows and mutation feedback
    connect mobile-first Expo instructions to a browser-safe course preview
    continue integrating standalone exercises into a larger app
    practice both manual testing and automated testing

⚙️ How It Works

🧠 App Controller Pattern

The application is controlled centrally through App.jsx, which manages:

    selected course
    selected week
    active lecture
    active assignment
    active content rendering

Instead of separate pages, content is rendered dynamically based on user interaction.

📚 Week-Based Content System

Content is defined through structured data, typically in courseData.js, which determines:

    available weeks
    lecture cards
    assignment cards
    assignment titles
    assignment summaries
    card metadata

🖱 Navigation Flow

    Select Course (e.g., AD312)
    Select Week 04
    View lecture + assignment cards
    Click a card → opens detailed content view

Assignments follow the same interaction pattern as lectures.

🧩 Three-Layer Assignment Model

1. Expo Assignment Source Layer

    Represents the standalone Expo assignment students would build
    Explains Expo setup using create-expo-app
    Uses mobile-first concepts such as ScrollView, FlatList, TextInput, Pressable, and StyleSheet
    Shows how QueryClientProvider wraps the root app

2. Vite-Compatible Exercise Layer

    Located in src/exercises/PostCrudExplorer.jsx
    Runs inside the AD312 course platform
    Mirrors the same CRUD behavior using browser-safe React
    Fully testable with Vitest and React Testing Library

3. Assignment Guide UI Layer

    Located in src/assignments/week04/jsonplaceholder-crud-tanstack-query/...
    Contains teaching content, preview, full code, test code, Expo notes, and testing instructions
    Embeds the standalone Vite-compatible preview

✨ Features

🧱 Platform Features

    Course + Week navigation
    Clickable Topic Cards
    Lecture + Assignment detail views
    File tree panel
    Theme support (light/dark)

🧪 Assignment Features

    Standalone CRUD preview component
    Expo Bridge teaching model
    TanStack Query useQuery for fetching posts
    TanStack Query useMutation for POST, PUT, PATCH, and DELETE
    JSONPlaceholder API integration
    User ID filtering
    Controlled form inputs
    Mutation feedback messages
    Loading-state UI
    Error-state UI
    Success-state UI
    Empty-state handling
    Step-by-step learning guide
    Embedded working preview
    Full syntax display for preview code
    Full syntax display for test code
    Expo setup and implementation guidance
    Manual testing instructions
    Automated testing expectations
    In-app visual test panel

📝 JSONPlaceholder CRUD Behavior

    Posts are fetched from JSONPlaceholder
    The user can filter posts by userId
    A form can create a new post using POST
    Existing posts can be selected for update
    PUT replaces a post title and body
    PATCH updates only the title
    DELETE removes a post from the visible list
    Mutation feedback explains what action occurred
    Query and mutation states are surfaced clearly to the user

🌉 Expo Bridge Behavior

Because the AD312 course platform is built with Vite, the assignment does not attempt to run a full Expo runtime inside the browser app.

Instead:

    Expo setup instructions are included in the guide
    Expo-style implementation concepts are explained
    The in-app preview mirrors the assignment behavior using Vite-compatible React
    Tests run through the existing Vite/Vitest testing system
    Students can still build the standalone Expo app separately

This keeps the course platform stable while still teaching the Expo assignment accurately.

🏗 Architecture

🧭 High-Level Layers

App Shell

    Controls navigation and rendering

Data Layer

    courseData.js defines course/week/card structure

Component Layer

    Sidebar, Header, TopicCard, FileTreePanel, etc.

Content Layer

    Lecture + Assignment guide components

Expo Reference Layer

    Explains how the same assignment maps to Expo

Exercise Layer

    Standalone components such as PostCrudExplorer

Testing Layer

    Vitest + React Testing Library
    In-app visual testing panel

🧭 Navigation Behavior

    Card-based navigation
    No external routing required
    Controlled through state in App.jsx

📌 Week 4 Assignment Flow

    Assignment appears as a Week 04 assignment card
    Clicking opens the guide inside the main view
    The embedded preview renders the standalone PostCrudExplorer component
    The guide explains how the same workflow maps to Expo
    File tree stays context-aware
    Code and test examples appear inside the assignment guide

🎨 UI Patterns

🧱 Card-Based Entry

All content begins with clickable cards.

📖 Structured Sections

Assignment uses structured sections:

    Overview
    Objectives
    Expo Setup
    CRUD Requirements
    Working Preview
    Full Source Code
    Full Test Code
    Manual Testing
    Live Test Results
    Summary

💻 Embedded Preview

The actual PostCrudExplorer component is rendered inside the guide.

🧾 Syntax as Learning Tool

Full code and test syntax are displayed directly in the UI with syntax highlighting.

Code examples are intended to teach:

    query client setup
    query keys
    query functions
    mutation functions
    GET requests
    POST requests
    PUT requests
    PATCH requests
    DELETE requests
    controlled forms
    filter inputs
    request-state handling
    test expectations

🧪 Live Test Panel

The app includes a visual test runner:

    shows PASS / WAIT states
    includes Normal Cases and Edge Cases tabs
    demonstrates CRUD expectations interactively
    shows expected vs actual behavior
    complements the official Vitest suite

This complements, but does not replace, automated tests.

🗂 Project Structure

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

🧪 Testing Structure

✅ Automated Tests

Located in:

src/exercises/PostCrudExplorer.test.jsx

Includes:

    at least 3 normal cases
    at least 3 edge cases

Normal cases may verify:

    posts are fetched and displayed
    filtering by userId changes the requested data
    POST, PUT, PATCH, and DELETE actions trigger the correct request behavior

Edge cases may verify:

    empty or invalid filter values are handled safely
    failed API responses show an error state
    PATCH sends only the partial title update
    malformed response data does not break rendering
    delete behavior handles removed posts safely

🧠 In-App Test Panel

Located in the assignment guide.

Visual learning tool.

Tracks:

    GET request behavior
    userId filter behavior
    POST payload shape
    PUT replacement payload shape
    PATCH partial-update payload shape
    DELETE endpoint shape
    edge-case handling

🔍 Why Both?

| Type | Purpose |
|---|---|
| Automated Tests | correctness |
| Test Panel | learning + visualization |

🚀 How to Run

1. Install dependencies

npm install

2. Start development server

npm run dev

3. Open app

http://localhost:5173/

4. Navigate to Week 4 Assignment 2

    Select course
    Select Week 04
    Click the JSONPlaceholder CRUD assignment card

📱 How to Run the Standalone Expo Version

1. Create a new Expo app

npx create-expo-app@latest crud-query-app

2. Enter the project folder

cd crud-query-app

3. Install TanStack Query

npm install @tanstack/react-query

4. Start Expo

npx expo start

5. Open the app

    Use Expo Go on a physical device
    or use an emulator/simulator

6. Wrap the root app with QueryClientProvider

The Expo version should follow the same CRUD behavior shown in the course-platform preview.

🧪 How to Run Tests

Run all tests

npm run test

Run only this assignment’s tests

npm run test -- src/exercises/PostCrudExplorer.test.jsx

Watch mode

npm run test:watch

UI mode (optional)

npm run test:ui

🎥 Demo

| Demo Title | Description | Link |
|---|---|---|
| Assignment Walkthrough | Full UI + guide demo |  |

📌 Summary

Week 4 Assignment 2 introduces:

    TanStack Query CRUD workflows
    GET, POST, PUT, PATCH, and DELETE requests
    JSONPlaceholder API integration
    query and mutation hook usage
    filtering posts by userId
    mobile-first Expo assignment thinking
    Vite-compatible preview and testing through the Expo Bridge pattern
    automated and visual testing workflows

This assignment builds directly on Week 4 Assignment 1. Week 4 Assignment 1 focuses on fetching and displaying API data, while Week 4 Assignment 2 expands into full CRUD behavior with mutations and filtered queries.
