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
      ...Array.from({ length: 8 }, (_, index) => ({
        id: `week${String(index + 4).padStart(2, '0')}`,
        label: `Week ${String(index + 4).padStart(2, '0')}`,
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
