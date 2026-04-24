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
import Week01CounterAssignmentGuide from './assignments/week01/Week01CounterAssignmentGuide'
import Week02RecipeGalleryAssignmentGuide from './assignments/week02/interactive-recipe-gallery/Week02RecipeGalleryAssignmentGuide'
import Week02ManagingNestedStateAssignmentGuide from './assignments/week02/managing-nested-state/Week02ManagingNestedStateAssignmentGuide'
import Week02TaskManagerAssignmentGuide from './assignments/week02/taskmanager-react-state/Week02TaskManagerAssignmentGuide'
import Week03ShoppingListWithImmerAssignmentGuide from './assignments/week03/state-management-with-immer-in-react/Week03ShoppingListWithImmerAssignmentGuide'
import Week03UserProfileWithImmerAssignmentGuide from './assignments/week03/state-management-with-useimmer-hook/Week03UserProfileWithImmerAssignmentGuide'
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
}

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState('ad312')
  const [selectedWeekId, setSelectedWeekId] = useState('week01')
  const [activeLecture, setActiveLecture] = useState(null)
  const [activeAssignment, setActiveAssignment] = useState(null)
  const [activeSlide, setActiveSlide] = useState(null)
  const [theme, setTheme] = useState(() => localStorage.getItem('course-lab-theme') || 'dark')

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
    <div className={`app-shell theme-${theme}`}>
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
      />
    </div>
  )
}
