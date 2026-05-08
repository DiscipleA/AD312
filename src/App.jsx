import { useEffect, useMemo, useState } from 'react'
import Sidebar from './components/Sidebar'
import HeaderBar from './components/HeaderBar'
import TopicCard from './components/TopicCard'
import WelcomePanel from './components/WelcomePanel'
import SectionBlock from './components/SectionBlock'
import FileTreePanel from './components/FileTreePanel'
import IntroReactStateMasterclass from './lectures/IntroReactStateMasterclass'
import StateMasterclass from './lectures/StateMasterclass'
import Week02StateUpdateQueueingMasterclass from './lectures/Week02StateUpdateQueueingMasterclass'
import Week02ObjectsInStateMasterclass from './lectures/Week02ObjectsInStateMasterclass'
import Week03ArraysInStateMasterclass from './lectures/Week03ArraysInStateMasterclass'
import Week03IntroductionToImmerMasterclass from './lectures/Week03IntroductionToImmerMasterclass'
import Week04IntroToTanStackQueryMasterclass from './lectures/Week04IntroToTanStackQueryMasterclass'
import Week04QueriesWithTanStackQueryMasterclass from './lectures/Week04QueriesWithTanStackQueryMasterclass'
import Week04TanStackQueryKeysMasterclass from './lectures/Week04TanStackQueryKeysMasterclass'
import Week04QueryFunctionsInTanStackQueryMasterclass from './lectures/Week04QueryFunctionsInTanStackQueryMasterclass'
import Week04IntroToMutationsTanStackQueryMasterclass from './lectures/Week04IntroToMutationsTanStackQueryMasterclass'
import Week05SinglyLinkedListsMasterclass from './lectures/Week05SinglyLinkedListsMasterclass'
import Week05IntroReactRouterMasterclass from './lectures/Week05IntroReactRouterMasterclass'
import Week05ReactRouterRoutePatternsMasterclass from './lectures/Week05ReactRouterRoutePatternsMasterclass'
import Week05ReactRouterNavigationMasterclass from './lectures/Week05ReactRouterNavigationMasterclass'
import Week01CounterAssignmentGuide from './exercises/Week01CounterAssignmentGuide'
import Week02RecipeGalleryAssignmentGuide from './exercises/Week02RecipeGalleryAssignmentGuide'
import Week02ManagingNestedStateAssignmentGuide from './exercises/Week02ManagingNestedStateAssignmentGuide'
import Week02TaskManagerAssignmentGuide from './exercises/Week02TaskManagerAssignmentGuide'
import Week03ShoppingListWithImmerAssignmentGuide from './exercises/Week03ShoppingListWithImmerAssignmentGuide'
import Week03UserProfileWithImmerAssignmentGuide from './exercises/Week03UserProfileWithImmerAssignmentGuide'
import Week04DogApiTanStackQueryAssignmentGuide from './exercises/Week04DogApiTanStackQueryAssignmentGuide'
import Week04JsonPlaceholderCrudAssignmentGuide from './exercises/Week04JsonPlaceholderCrudAssignmentGuide'
import Week05HealthRecordSymmetryAssignmentGuide from './exercises/Week05HealthRecordSymmetryAssignmentGuide'
import Week05RecipeRouterGalleryAssignmentGuide from './exercises/Week05RecipeRouterGalleryAssignmentGuide'
import Week05BlogRouterMpaAssignmentGuide from './exercises/Week05BlogRouterMpaAssignmentGuide'
import { courseData } from './data/courseData'
import './styles/app.css'

const courses = [courseData.ad312, courseData.ad311]

const lectureRegistry = {
  'intro-react-state': {
    component: IntroReactStateMasterclass,
    meta: {
      courseId: 'ad312',
      weekId: 'week01',
      lectureId: 'intro-react-state',
      title: 'Introduction to React State',
      defaultSlideTitle: "React State (The Component’s Memory)",
    },
  },
  'react-state-snapshot': {
    component: StateMasterclass,
    meta: {
      courseId: 'ad312',
      weekId: 'week01',
      lectureId: 'react-state-snapshot',
      title: "React's State as a Snapshot",
      defaultSlideTitle: 'Introduction to React State',
    },
  },
  'state-update-queueing-batching': {
    component: Week02StateUpdateQueueingMasterclass,
    meta: {
      courseId: 'ad312',
      weekId: 'week02',
      lectureId: 'state-update-queueing-batching',
      title: "React's State Update Queueing and Batching Mechanism",
      defaultSlideTitle: 'Introduction to React and State Management',
    },
  },
  'objects-in-react-state': {
    component: Week02ObjectsInStateMasterclass,
    meta: {
      courseId: 'ad312',
      weekId: 'week02',
      lectureId: 'objects-in-react-state',
      title: 'Updating Objects in React State',
      defaultSlideTitle: 'Introduction to State in React',
    },
  },
  'updating-arrays-in-state': {
    component: Week03ArraysInStateMasterclass,
    meta: {
      courseId: 'ad312',
      weekId: 'week03',
      lectureId: 'updating-arrays-in-state',
      title: 'Introduction to Updating Arrays in React State',
      defaultSlideTitle: 'Introduction to Array Immutability',
    },
  },
  'introduction-to-immer': {
    component: Week03IntroductionToImmerMasterclass,
    meta: {
      courseId: 'ad312',
      weekId: 'week03',
      lectureId: 'introduction-to-immer',
      title: 'Introduction to Immer',
      defaultSlideTitle: 'Introduction to Immer',
    },
  },
  'introduction-to-tanstack-query': {
    component: Week04IntroToTanStackQueryMasterclass,
    meta: {
      courseId: 'ad312',
      weekId: 'week04',
      lectureId: 'introduction-to-tanstack-query',
      title: 'Introduction to TanStack Query',
      defaultSlideTitle: 'Introduction to TanStack Query',
    },
  },
  'queries-with-tanstack-query': {
    component: Week04QueriesWithTanStackQueryMasterclass,
    meta: {
      courseId: 'ad312',
      weekId: 'week04',
      lectureId: 'queries-with-tanstack-query',
      title: 'Queries with TanStack Query',
      defaultSlideTitle: 'Introduction to TanStack Query',
    },
  },
  'tanstack-query-keys': {
    component: Week04TanStackQueryKeysMasterclass,
    meta: {
      courseId: 'ad312',
      weekId: 'week04',
      lectureId: 'tanstack-query-keys',
      title: 'TanStack Query Keys',
      defaultSlideTitle: 'Introduction to Query Keys',
    },
  },
  'query-functions-in-tanstack-query': {
    component: Week04QueryFunctionsInTanStackQueryMasterclass,
    meta: {
      courseId: 'ad312',
      weekId: 'week04',
      lectureId: 'query-functions-in-tanstack-query',
      title: 'Query Functions in TanStack Query',
      defaultSlideTitle: 'Introduction to Query Functions',
    },
  },
  'intro-to-mutations-tanstack-query': {
    component: Week04IntroToMutationsTanStackQueryMasterclass,
    meta: {
      courseId: 'ad312',
      weekId: 'week04',
      lectureId: 'intro-to-mutations-tanstack-query',
      title: 'Introduction to Mutations in TanStack Query',
      defaultSlideTitle: 'Introduction to Mutations',
    },
  },
  'singly-linked-lists': {
    component: Week05SinglyLinkedListsMasterclass,
    meta: {
      courseId: 'ad312',
      weekId: 'week05',
      lectureId: 'singly-linked-lists',
      title: 'Introduction to Singly Linked Lists',
      defaultSlideTitle: 'Introduction to Singly Linked Lists',
    },
  },
  'intro-react-router': {
    component: Week05IntroReactRouterMasterclass,
    meta: {
      courseId: 'ad312',
      weekId: 'week05',
      lectureId: 'intro-react-router',
      title: 'Introduction to React Router',
      defaultSlideTitle: 'Introduction to React Router v7',
    },
  },

  'react-router-route-patterns': {
    component: Week05ReactRouterRoutePatternsMasterclass,
    meta: {
      courseId: 'ad312',
      weekId: 'week05',
      lectureId: 'react-router-route-patterns',
      title: 'React Router Route Patterns',
      defaultSlideTitle: 'Configuring Routes',
    },
  },

  'react-router-navigation': {
    component: Week05ReactRouterNavigationMasterclass,
    meta: {
      courseId: 'ad312',
      weekId: 'week05',
      lectureId: 'react-router-navigation',
      title: 'Navigation with React Router',
      defaultSlideTitle: 'React Router - Navigating',
    },
  },
}
const assignmentRegistry = {
  'counter-state-management': {
    component: Week01CounterAssignmentGuide,
    meta: {
      courseId: 'ad312',
      weekId: 'week01',
      assignmentId: 'counter-state-management',
      title: 'Create a Counter Component with State Management',
    },
  },
  'interactive-recipe-gallery': {
    component: Week02RecipeGalleryAssignmentGuide,
    meta: {
      courseId: 'ad312',
      weekId: 'week02',
      assignmentId: 'interactive-recipe-gallery',
      title: 'Building an Interactive Recipe Gallery with React',
    },
  },
  'managing-nested-state': {
    component: Week02ManagingNestedStateAssignmentGuide,
    meta: {
      courseId: 'ad312',
      weekId: 'week02',
      assignmentId: 'managing-nested-state',
      title: 'Managing Nested State in React',
    },
  },
  'taskmanager-react-state': {
    component: Week02TaskManagerAssignmentGuide,
    meta: {
      courseId: 'ad312',
      weekId: 'week02',
      assignmentId: 'taskmanager-react-state',
      title: 'TaskManager with React State',
    },
  },
  'state-management-with-immer-in-react': {
    component: Week03ShoppingListWithImmerAssignmentGuide,
    meta: {
      courseId: 'ad312',
      weekId: 'week03',
      assignmentId: 'state-management-with-immer-in-react',
      title: 'State Management with Immer in React',
    },
  },
  'state-management-with-useimmer-hook': {
    component: Week03UserProfileWithImmerAssignmentGuide,
    meta: {
      courseId: 'ad312',
      weekId: 'week03',
      assignmentId: 'state-management-with-useimmer-hook',
      title: 'State Management with useImmer Hook',
    },
  },
  'dog-api-tanstack-query': {
    component: Week04DogApiTanStackQueryAssignmentGuide,
    meta: {
      courseId: 'ad312',
      weekId: 'week04',
      assignmentId: 'dog-api-tanstack-query',
      title: 'Dog API Explorer with TanStack Query',
    },
  },
  'jsonplaceholder-crud-tanstack-query': {
    component: Week04JsonPlaceholderCrudAssignmentGuide,
    meta: {
      courseId: 'ad312',
      weekId: 'week04',
      assignmentId: 'jsonplaceholder-crud-tanstack-query',
      title: 'JSONPlaceholder CRUD with TanStack Query',
    },
  },
  'health-record-symmetry': {
    component: Week05HealthRecordSymmetryAssignmentGuide,
    meta: {
      courseId: 'ad312',
      weekId: 'week05',
      assignmentId: 'health-record-symmetry',
      title: 'Patient Health Record Symmetry with Singly Linked Lists',
    },
  },
  'recipe-router-gallery': {
    component: Week05RecipeRouterGalleryAssignmentGuide,
    meta: {
      courseId: 'ad312',
      weekId: 'week05',
      assignmentId: 'recipe-router-gallery',
      title: 'Recipe Gallery Routing with React Router',
    },
  },
  'blog-router-mpa': {
    component: Week05BlogRouterMpaAssignmentGuide,
    meta: {
      courseId: 'ad312',
      weekId: 'week05',
      assignmentId: 'blog-router-mpa',
      title: 'Blog Multi-Page App with React Router',
    },
  },
}

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState('ad312')
  const [selectedWeekId, setSelectedWeekId] = useState('week01')
  const [activeLecture, setActiveLecture] = useState(null)
  const [activeAssignment, setActiveAssignment] = useState(null)
  const [activeSlide, setActiveSlide] = useState(null)
  const [theme, setTheme] = useState(() => localStorage.getItem('course-lab-theme') || 'dark')
  const [isFileTreeCollapsed, setIsFileTreeCollapsed] = useState(false)

  useEffect(() => {
    localStorage.setItem('course-lab-theme', theme)
    document.documentElement.style.colorScheme = theme
  }, [theme])

  const activeCourse = useMemo(
    () => courses.find((course) => course.id === selectedCourse),
    [selectedCourse]
  )

  const activeWeek = useMemo(() => {
    return (
      activeCourse.weeks.find((week) => week.id === selectedWeekId) ||
      activeCourse.weeks[0]
    )
  }, [activeCourse, selectedWeekId])

  const ActiveLectureComponent = activeLecture
    ? lectureRegistry[activeLecture.lectureId]?.component || null
    : null

  const ActiveAssignmentComponent = activeAssignment
    ? assignmentRegistry[activeAssignment.assignmentId]?.component || null
    : null

  function handleSelectCourse(courseId) {
    const nextCourse = courses.find((course) => course.id === courseId)
    setSelectedCourse(courseId)
    setSelectedWeekId(nextCourse.weeks[0]?.id || 'week01')
    setActiveLecture(null)
    setActiveAssignment(null)
    setActiveSlide(null)
  }

  function handleSelectWeek(weekId) {
    setSelectedWeekId(weekId)
    setActiveLecture(null)
    setActiveAssignment(null)
    setActiveSlide(null)
  }

  function handleOpenLecture(lecture) {
    setActiveAssignment(null)
    setActiveLecture(lecture)
    setActiveSlide({
      index: 1,
      title: lecture.defaultSlideTitle,
    })
  }

  function handleBackFromLecture() {
    setActiveLecture(null)
    setActiveSlide(null)
  }

  function handleOpenAssignment(assignment) {
    setActiveLecture(null)
    setActiveSlide(null)
    setActiveAssignment(assignment)
  }

  function handleBackFromAssignment() {
    setActiveAssignment(null)
  }

  function handleToggleTheme() {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  const isShowingLecture = Boolean(activeLecture)
  const isShowingAssignment = Boolean(activeAssignment)

  return (
    <div className={`app-shell theme-${theme}${isFileTreeCollapsed ? ' filetree-collapsed' : ''}`}>
      <Sidebar
        courses={courses}
        selectedCourse={selectedCourse}
        onSelectCourse={handleSelectCourse}
        selectedWeekId={selectedWeekId}
        onSelectWeek={handleSelectWeek}
      />

      <div className="main-area">
        <HeaderBar
          course={activeCourse}
          week={activeWeek}
          theme={theme}
          onToggleTheme={handleToggleTheme}
        />

        <main className="content-area">
          {isShowingLecture && ActiveLectureComponent ? (
            <ActiveLectureComponent
              onBack={handleBackFromLecture}
              onSectionChange={setActiveSlide}
              title={activeLecture.title}
            />
          ) : isShowingAssignment && ActiveAssignmentComponent ? (
            <>
              <div style={{ marginBottom: '20px' }}>
                <button className="sm-button ghost" onClick={handleBackFromAssignment}>
                  ← Back to {activeWeek.label}
                </button>
              </div>

              <ActiveAssignmentComponent />
            </>
          ) : (
            <>
              <WelcomePanel course={activeCourse} week={activeWeek} />

              <div className="content-grid">
                <SectionBlock
                  title="Lecture Topics"
                  emptyMessage="No lecture topics added for this week yet."
                >
                  {activeWeek.lectures.map((item) => {
                    const lectureEntry = lectureRegistry[item.id]
                    const isClickableLecture = activeCourse.id === 'ad312' && Boolean(lectureEntry)

                    return (
                      <TopicCard
                        key={item.id}
                        item={item}
                        clickable={isClickableLecture}
                        onClick={isClickableLecture ? () => handleOpenLecture(lectureEntry.meta) : undefined}
                      />
                    )
                  })}
                </SectionBlock>

                <SectionBlock
                  title="Assignments"
                  emptyMessage="No assignments added for this week yet."
                >
                  {activeWeek.assignments.map((item) => {
                    const assignmentEntry = assignmentRegistry[item.id]

                    return (
                      <TopicCard
                        key={item.id}
                        item={item}
                        clickable={Boolean(assignmentEntry)}
                        onClick={
                          assignmentEntry
                            ? () => handleOpenAssignment(assignmentEntry.meta)
                            : undefined
                        }
                      />
                    )
                  })}
                </SectionBlock>
              </div>
            </>
          )}
        </main>
      </div>

      <FileTreePanel
        activeCourseId={selectedCourse}
        selectedWeekId={selectedWeekId}
        activeLecture={activeLecture}
        activeAssignment={activeAssignment}
        activeSlide={activeSlide}
        isCollapsed={isFileTreeCollapsed}
        onToggleCollapsed={() => setIsFileTreeCollapsed((current) => !current)}
      />
    </div>
  )
}
