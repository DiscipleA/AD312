import { useEffect, useMemo, useState } from 'react'
import Sidebar from './components/Sidebar'
import HeaderBar from './components/HeaderBar'
import TopicCard from './components/TopicCard'
import WelcomePanel from './components/WelcomePanel'
import SectionBlock from './components/SectionBlock'
import FileTreePanel from './components/FileTreePanel'
import IntroReactStateMasterclass from './lectures/IntroReactStateMasterclass'
import StateMasterclass from './lectures/StateMasterclass'
import Week01CounterAssignmentGuide from './assignments/week01/Week01CounterAssignmentGuide'
import { courseData } from './data/courseData'
import './styles/app.css'

const courses = [courseData.ad312, courseData.ad311]

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
          {isShowingLecture ? (
            activeLecture.lectureId === 'intro-react-state' ? (
              <IntroReactStateMasterclass
                onBack={handleBackFromLecture}
                onSectionChange={setActiveSlide}
                title={activeLecture.title}
              />
            ) : (
              <StateMasterclass
                onBack={handleBackFromLecture}
                onSectionChange={setActiveSlide}
                title={activeLecture.title}
              />
            )
          ) : isShowingAssignment ? (
            <>
              <div style={{ marginBottom: '20px' }}>
                <button className="sm-button ghost" onClick={handleBackFromAssignment}>
                  ← Back to Week 01
                </button>
              </div>

              <Week01CounterAssignmentGuide />
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
                    const isClickableLecture =
                      activeCourse.id === 'ad312' &&
                      activeWeek.id === 'week01' &&
                      (item.id === 'intro-react-state' || item.id === 'react-state-snapshot')

                    const lectureMeta =
                      item.id === 'intro-react-state'
                        ? {
                            courseId: 'ad312',
                            weekId: 'week01',
                            lectureId: 'intro-react-state',
                            title: 'Introduction to React State',
                            defaultSlideTitle: "React State (The Component’s Memory)",
                          }
                        : {
                            courseId: 'ad312',
                            weekId: 'week01',
                            lectureId: 'react-state-snapshot',
                            title: "React's State as a Snapshot",
                            defaultSlideTitle: 'Introduction to React State',
                          }

                    return (
                      <TopicCard
                        key={item.id}
                        item={item}
                        clickable={isClickableLecture}
                        onClick={isClickableLecture ? () => handleOpenLecture(lectureMeta) : undefined}
                      />
                    )
                  })}
                </SectionBlock>

                <SectionBlock
                  title="Assignments"
                  emptyMessage="No assignments added for this week yet."
                >
                  {activeWeek.assignments.map((item) => {
                    const isClickableAssignment =
                      activeCourse.id === 'ad312' &&
                      activeWeek.id === 'week01' &&
                      item.id === 'counter-state-management'

                    const assignmentMeta = {
                      courseId: 'ad312',
                      weekId: 'week01',
                      assignmentId: 'counter-state-management',
                      title: 'Create a Counter Component with State Management',
                    }

                    return (
                      <TopicCard
                        key={item.id}
                        item={item}
                        clickable={isClickableAssignment}
                        onClick={
                          isClickableAssignment
                            ? () => handleOpenAssignment(assignmentMeta)
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
        activeSlide={activeSlide}
      />
    </div>
  )
}
