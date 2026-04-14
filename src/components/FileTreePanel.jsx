function TreeLine({ label, depth = 0, active = false, subtle = false }) {
  return (
    <div
      className={[
        'tree-line',
        active ? 'active' : '',
        subtle ? 'subtle' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ paddingLeft: `${depth * 18}px` }}
    >
      <span className="tree-bullet">{depth === 0 ? '' : '└─ '}</span>
      <span>{label}</span>
    </div>
  )
}

export default function FileTreePanel({
  activeCourseId,
  selectedWeekId,
  activeLecture,
  activeSlide,
}) {
  const lecture1Open = activeLecture?.lectureId === 'intro-react-state'
  const lecture2Open = activeLecture?.lectureId === 'react-state-snapshot'

  const lecture1Slides = [
    '01 React State (The Component’s Memory)',
    '02 Understanding Component State',
    '03 The Counter Component (Functional State)',
    '04 Text Input State (Controlled Components)',
    '05 Toggle Visibility (Conditional Rendering)',
    '06 Adding State Variable (State vs. Regular)',
    '07 Tracking Form Input (Mirroring)',
    '08 Anatomy of useState',
    '09 Object State & Spread Operator',
    '10 Managing Multiple State Variables',
    '11 Recap',
  ]

  const lecture2Slides = [
    '01 Introduction to React State',
    '02 Deep Dive: What is State in React?',
    '03 Setting State Triggers Re-renders',
    '04 State Updates Are Asynchronous',
    '05 Accessing State in Event Handlers',
    '06 Example: Incrementing State (The "Three Times" Paradox)',
    '07 Example: Delayed State Access',
    '08 State Over Time and Asynchronous Operations',
    '09 State Over Time and Asynchronous Operations: Comprehensive Example',
    '10 Recap',
  ]

  const currentSlides = lecture1Open ? lecture1Slides : lecture2Open ? lecture2Slides : []

  return (
    <aside className="filetree-panel">
      <div className="sidebar-label">Project Tree</div>

      <div className="tree-shell">
        <TreeLine label="src/" depth={0} active />

        <TreeLine label="components/" depth={1} />
        <TreeLine label="Sidebar.jsx" depth={2} />
        <TreeLine label="HeaderBar.jsx" depth={2} />
        <TreeLine label="TopicCard.jsx" depth={2} />
        <TreeLine label="WelcomePanel.jsx" depth={2} />
        <TreeLine label="SectionBlock.jsx" depth={2} />
        <TreeLine label="FileTreePanel.jsx" depth={2} active />

        <TreeLine label="lectures/" depth={1} />
        <TreeLine
          label="IntroReactStateMasterclass.jsx"
          depth={2}
          active={lecture1Open}
          subtle={!lecture1Open}
        />
        <TreeLine
          label="StateMasterclass.jsx"
          depth={2}
          active={lecture2Open}
          subtle={!lecture2Open}
        />

        {activeLecture ? (
          <>
            <TreeLine label="slides/" depth={3} active />
            {currentSlides.map((slideTitle, index) => {
              const cleanTitle = slideTitle.replace(/^\d+\s/, '')
              const isActiveSlide =
                activeSlide &&
                activeSlide.index === index + 1 &&
                activeSlide.title === cleanTitle

              return (
                <TreeLine
                  key={slideTitle}
                  label={slideTitle}
                  depth={4}
                  active={isActiveSlide}
                />
              )
            })}
          </>
        ) : null}

        <TreeLine label="courses/" depth={1} />

        <TreeLine
          label="ad312/"
          depth={2}
          active={activeCourseId === 'ad312'}
        />
        <TreeLine
          label="week01/"
          depth={3}
          active={activeCourseId === 'ad312' && selectedWeekId === 'week01'}
        />
        <TreeLine label="lectures/" depth={4} />
        <TreeLine
          label="introduction-to-react-state/"
          depth={5}
          active={lecture1Open}
        />
        <TreeLine
          label="react-state-as-a-snapshot/"
          depth={5}
          active={lecture2Open}
        />
        <TreeLine label="assignments/" depth={4} />
        <TreeLine
          label="create-a-counter-component-with-state-management/"
          depth={5}
          subtle
        />
        <TreeLine
          label="week02/ ... week11/"
          depth={3}
          subtle={selectedWeekId === 'week01'}
        />

        <TreeLine
          label="ad311/"
          depth={2}
          active={activeCourseId === 'ad311'}
        />
        <TreeLine label="summer/" depth={3} />
        <TreeLine
          label="week01/ ... week11/"
          depth={4}
          subtle={activeCourseId !== 'ad311'}
        />

        <TreeLine label="data/" depth={1} />
        <TreeLine label="courseData.js" depth={2} />

        <TreeLine label="styles/" depth={1} />
        <TreeLine label="app.css" depth={2} active />
        <TreeLine
          label="stateMasterclass.css"
          depth={2}
          active={Boolean(activeLecture)}
          subtle={!activeLecture}
        />

        <TreeLine label="App.jsx" depth={1} active />
        <TreeLine label="main.jsx" depth={1} />
      </div>
    </aside>
  )
}
