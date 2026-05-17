export const courseData = {
  ad312: {
    id: 'ad312',
    title: 'AD312',
    subtitle: 'Intermediate Dev 2',
    status: 'Active',
    weeks: [
      {
        id: 'week01',
        label: 'Week 01',
        lectures: [
          {
            id: 'intro-react-state',
            title: 'Introduction to React State',
            type: 'lecture',
            summary: 'Lecture + quiz placeholder based on screenshot.',
            status: 'ready',
          },
          {
            id: 'react-state-snapshot',
            title: "React's State as a Snapshot",
            type: 'lecture',
            summary: 'Lecture, reading, quiz, and state behavior examples.',
            status: 'ready',
          },
        ],
        assignments: [
          {
            id: 'counter-state-management',
            title: 'Create a Counter Component with State Management',
            type: 'assignment',
            summary: 'Week 01 assignment placeholder and starter example.',
            status: 'ready',
          },
        ],
      },    
      {
        id: 'week02',
        label: 'Week 02',
        lectures: [
          {
            id: 'state-update-queueing-batching',
            title: "React's State Update Queueing and Batching Mechanism",
            type: 'lecture',
            summary:
              'Masterclass lecture on state snapshots, update queues, batching, and functional updater patterns.',
            status: 'ready',
          },
          {
            id: 'objects-in-react-state',
            title: 'Updating Objects in React State',
            type: 'lecture',
            summary:
              'Masterclass lecture on immutable object updates, nested object patterns, spread syntax, and list management in React state.',
            status: 'ready',
          },
        ],
        assignments: [
          {
            id: 'interactive-recipe-gallery',
            title: 'Building an Interactive Recipe Gallery with React',
            type: 'assignment',
            summary:
              'Week 02 assignment card placeholder for recipe gallery state interactions.',
            status: 'ready',
          },
          {
            id: 'managing-nested-state',
            title: 'Managing Nested State in React',
            type: 'assignment',
            summary:
              'Rich Week 02 assignment on immutable nested object updates, spread syntax, and functional state setters.',
            status: 'ready',
          },
          {
            id: 'taskmanager-react-state',
            title: 'TaskManager with React State',
            type: 'assignment',
            summary:
              'Rich Week 02 assignment on adding task objects, toggling completion immutably, and testing array-based state updates.',
            status: 'ready',
          },
        ],
      },
      {
        id: 'week03',
        label: 'Week 03',
        lectures: [
          {
            id: 'updating-arrays-in-state',
            title: 'Introduction to Updating Arrays in React State',
            type: 'lecture',
            summary:
              'Masterclass lecture on array immutability, array operations, insertion patterns, complex updates, and Immer-style thinking.',
            status: 'ready',
          },
          {
            id: 'introduction-to-immer',
            title: 'Introduction to Immer',
            type: 'lecture',
            summary:
              'Masterclass lecture on draft-based immutable updates, produce(), nested state ergonomics, and curried producers in React.',
            status: 'ready',
          },
        ],
        assignments: [
          {
            id: 'state-management-with-immer-in-react',
            title: 'State Management with Immer in React',
            type: 'assignment',
            summary:
              'Build a shopping-list exercise that uses useImmer for array updates, nested object edits, item removal, and test-driven verification.',
            status: 'ready',
          },
          {
            id: 'state-management-with-useimmer-hook',
            title: 'State Management with useImmer Hook',
            type: 'assignment',
            summary:
              'Build a nested user-profile exercise that updates contact details and newsletter preferences with useImmer, full-code guidance, and test-driven verification.',
            status: 'ready',
          },
        ],
      },
      {
        id: 'week04',
        label: 'Week 04',
        lectures: [
          {
            id: 'introduction-to-tanstack-query',
            title: 'Introduction to TanStack Query',
            type: 'lecture',
            summary:
              'Masterclass lecture on server state, query keys, caching, background refetching, and getting started with TanStack Query in React.',
            status: 'ready',
          },
          {
            id: 'queries-with-tanstack-query',
            title: 'Queries with TanStack Query',
            type: 'lecture',
            summary:
              'Deep masterclass on query fundamentals, query keys, query functions, useQuery syntax, query result states, and fetchStatus.',
            status: 'ready',
          },
          {
            id: 'tanstack-query-keys',
            title: 'TanStack Query Keys',
            type: 'lecture',
            summary:
              'Deep masterclass on query keys as cache identity, simple keys, complex keys with variables, deterministic hashing, and dependency-driven refetching.',
            status: 'ready',
          },
          {
            id: 'query-functions-in-tanstack-query',
            title: 'Query Functions in TanStack Query',
            type: 'lecture',
            summary:
              'Deep masterclass on query functions, Promise-based data retrieval, fetch error handling, dynamic query variables, QueryFunctionContext, and request cancellation.',
            status: 'ready',
          },
          {
            id: 'intro-to-mutations-tanstack-query',
            title: 'Introduction to Mutations in TanStack Query',
            type: 'lecture',
            summary:
              'Deep masterclass on TanStack Query mutations, mutation functions, mutate(), pending/error/success states, reset(), lifecycle side effects, optimistic updates, rollback, and cache invalidation.',
            status: 'ready',
          },
        ],
        assignments: [
          {
            id: 'dog-api-tanstack-query',
            title: 'Dog API Explorer with TanStack Query',
            type: 'assignment',
            summary:
              'Build a Dog API explorer that uses TanStack Query for breeds, selected breed details, facts, groups, request states, and test-driven verification.',
            status: 'ready',
          },
          {
            id: 'jsonplaceholder-crud-tanstack-query',
            title: 'JSONPlaceholder CRUD with TanStack Query',
            type: 'assignment',
            summary:
              'Use the Expo Bridge pattern to practice GET, POST, PUT, PATCH, DELETE, and user-id filtering with TanStack Query and JSONPlaceholder.',
            status: 'ready',
          },
        ],
      },
      {
        id: 'week05',
        label: 'Week 05',
        lectures: [
          {
            id: 'intro-react-router',
            title: 'Introduction to React Router',
            type: 'lecture',
            summary:
              'Masterclass lecture on React Router v7 modes, declarative routing, data routers, framework mode, route loaders/actions, and editable Code in Action examples.',
            status: 'ready',
          },

          {
            id: 'singly-linked-lists',
            title: 'Introduction to Singly Linked Lists',
            type: 'lecture',
            summary:
              'Masterclass lecture on node structure, head references, traversal, insertion, deletion, and editable linked-list code examples.',
            status: 'ready',
          },

          {
            id: 'react-router-route-patterns',
            title: 'React Router Route Patterns',
            type: 'lecture',
            summary:
              'Masterclass lecture on configuring routes, file naming conventions, route modules, nested routes, prefixes, dynamic segments, optional segments, splats, and catch-all 404 routing in React Router.',
            status: 'ready',
          },

          {
            id: 'react-router-navigation',
            title: 'Navigation with React Router',
            type: 'lecture',
            summary:
              'Masterclass lecture on Link, NavLink, Form, redirect, and useNavigate for client-side, data-driven, and imperative navigation in React Router / Remix.',
            status: 'ready',
          },


        ],
        assignments: [
          {
            id: 'health-record-symmetry',
            title: 'Patient Health Record Symmetry with Singly Linked Lists',
            type: 'assignment',
            summary:
              'Use raw JavaScript and singly linked-list pointers to determine whether a patient health metric sequence is symmetrical, with console-log normal and edge tests.',
            status: 'ready',
          },

          {
            id: 'recipe-router-gallery',
            title: 'Recipe Gallery Routing with React Router',
            type: 'assignment',
            summary:
              'Continue the Week 2 Recipe Gallery by converting it into a React Router framework-style app with Home, Gallery, and dynamic Recipe Detail routes.',
            status: 'ready',
          },

          {
            id: 'blog-router-mpa',
            title: 'Blog Multi-Page App with React Router',
            type: 'assignment',
            summary:
              'Convert a static Blog app into a React Router / Remix-style multi-page app with Home, About, dynamic Post routes, Outlet layout, useParams, and useNavigate.',
            status: 'ready',
          },


        ],
      },
      {
        id: 'week06',
        label: 'Week 06',
        lectures: [],
        assignments: [
          {
            id: 'patient-record-merge-doubly-linked-list',
            title: 'Integrating Patient Records from Two Healthcare Providers',
            type: 'assignment',
            summary:
              'Use raw JavaScript and doubly linked-list pointers to merge two sorted patient-record lists by SSN while preserving duplicate records.',
            status: 'ready',
          },
          {
            id: 'context-refactor-to-context',
            title: 'Refactoring Prop Drilling to Context',
            type: 'assignment',
            summary:
              'Refactor a Vite React prop-drilling component tree into a Context API provider pattern with useContext, Vitest coverage, and a live preview.',
            status: 'ready',
          },
          {
            id: 'global-theme-switcher',
            title: 'Building a Global Theme/Dark Mode Switcher',
            type: 'assignment',
            summary:
              'Build a Vite React global light/dark theme switcher with Context API, useContext, dynamic UI styles, Vitest coverage, and a live preview.',
            status: 'ready',
          },
        ],
      },
      ...Array.from({ length: 5 }, (_, index) => ({
        id: `week${String(index + 7).padStart(2, '0')}`,
        label: `Week ${String(index + 7).padStart(2, '0')}`,
        lectures: [],
        assignments: [],
      })),

    ],
  },
  ad311: {
    id: 'ad311',
    title: 'AD311',
    subtitle: 'Summer Track',
    status: 'Planned',
    weeks: Array.from({ length: 11 }, (_, index) => ({
      id: `week${String(index + 1).padStart(2, '0')}`,
      label: `Summer Week ${String(index + 1).padStart(2, '0')}`,
      lectures: [],
      assignments: [],
    })),
  },
}
