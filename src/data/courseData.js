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
      ...Array.from({ length: 10 }, (_, index) => ({
        id: `week${String(index + 2).padStart(2, '0')}`,
        label: `Week ${String(index + 2).padStart(2, '0')}`,
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
