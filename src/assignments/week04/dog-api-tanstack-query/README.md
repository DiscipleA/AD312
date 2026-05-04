🎓 AD312 Course Platform — Week 4 Assignment 1

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

Week 4 Assignment 1 introduces data fetching with TanStack Query by using the Dog API. Students learn how to retrieve asynchronous data, handle request states, work with multiple API endpoints, and display selected dog breed information in a clear, readable interface.

This assignment focuses on server-state management instead of local-only React state. Students practice using TanStack Query to fetch, cache, and organize API data while keeping the UI responsive and understandable.

🎯 Objective

The Week 4 Assignment 1 focuses on helping students:

    understand how TanStack Query manages server-state
    fetch dog breed data from an external API
    display loading, error, success, and empty states
    use query functions to separate fetching logic from UI logic
    process API response structures safely
    select a dog breed from a dropdown instead of rendering every breed as a large card grid
    display detailed breed information after selection
    fetch and render dog facts
    fetch and render dog groups
    continue integrating standalone exercises into the larger course platform
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

🧩 Two-Layer Assignment Model

1. Standalone Exercise

    Located in src/exercises/DogQueryExplorer.jsx
    Runs independently
    Uses TanStack Query to fetch Dog API data
    Fully testable with Vitest and React Testing Library

2. Assignment Guide (UI Layer)

    Located in src/assignments/week04/dog-api-tanstack-query/...
    Contains teaching content, preview, full code, test code, and testing instructions
    Embeds the standalone exercise
    Explains how the assignment maps to a standalone Vite app

✨ Features

🧱 Platform Features

    Course + Week navigation
    Clickable Topic Cards
    Lecture + Assignment detail views
    File tree panel
    Theme support (light/dark)

🧪 Assignment Features

    Standalone Dog API query component
    TanStack Query provider setup
    Query function examples
    Breed list request
    Dropdown-based breed selection
    Detailed selected-breed panel
    Dog facts request
    Dog groups request
    Loading-state UI
    Error-state UI
    Success-state UI
    Empty-state handling
    Step-by-step learning guide
    Embedded working preview
    Full syntax display for component code
    Full syntax display for test code
    Manual testing instructions
    Automated testing expectations
    In-app visual test panel

🐶 Dog API Behavior

    Breed data is fetched from the Dog API
    Breeds are presented in a dropdown/select control
    Selecting a breed displays the selected breed’s details
    Facts are fetched and displayed in a separate section
    Groups are fetched and displayed in a separate section
    Query states are surfaced clearly to the user
    API response data is normalized before rendering when needed
    UI avoids overwhelming students with a large card grid of every breed

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

Exercise Layer

    Standalone components such as DogQueryExplorer

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
    The embedded preview renders the standalone DogQueryExplorer component
    File tree stays context-aware
    Code and test examples appear inside the assignment guide

🎨 UI Patterns

🧱 Card-Based Entry

All content begins with clickable cards.

📖 Structured Sections

Assignment uses structured sections:

    Overview
    Objectives
    Instructions
    Working Preview
    Full Source Code
    Full Test Code
    Manual Testing
    Live Test Results
    Summary

💻 Embedded Preview

The actual DogQueryExplorer component is rendered inside the guide.

🧾 Syntax as Learning Tool

Full code and test syntax are displayed directly in the UI with syntax highlighting.

Code examples are intended to teach:

    imports
    query client setup
    query keys
    query functions
    request-state handling
    selected state
    conditional rendering
    data normalization
    test expectations

🧪 Live Test Panel

The app includes a visual test runner:

    shows PASS / WAIT states
    groups normal and edge cases
    demonstrates query behavior interactively
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

🧪 Testing Structure

✅ Automated Tests

Located in:

src/exercises/DogQueryExplorer.test.jsx

Includes:

    3 normal cases
    3 edge cases

Normal cases may verify:

    breeds are fetched and rendered into a dropdown
    selecting a breed displays its detail panel
    facts and groups are displayed successfully

Edge cases may verify:

    loading state appears before data resolves
    error state appears when a request fails
    empty or malformed API responses are handled safely

🧠 In-App Test Panel

Located in the assignment guide.

Visual learning tool.

Tracks:

    query state behavior
    breed dropdown behavior
    selected breed rendering
    facts response handling
    groups response handling
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

4. Navigate to Week 4 Assignment 1

    Select course
    Select Week 04
    Click the Dog API with TanStack Query assignment card

🧪 How to Run Tests

Run all tests

npm run test

Run only this assignment’s tests

npm run test -- src/exercises/DogQueryExplorer.test.jsx

Watch mode

npm run test:watch

UI mode (optional)

npm run test:ui

🎥 Demo

| Demo Title | Description | Link |
|---|---|---|
| Assignment Walkthrough | Full UI + guide demo |  |

📌 Summary

Week 4 Assignment 1 introduces:

    TanStack Query for asynchronous server-state
    external API requests using the Dog API
    query keys and query functions
    loading, error, success, and empty UI states
    dropdown-based data selection
    detail rendering for selected records
    facts and groups endpoint integration
    automated and visual testing workflows

This assignment prepares students for more advanced TanStack Query work, especially mutations and CRUD operations in Week 4 Assignment 2.
