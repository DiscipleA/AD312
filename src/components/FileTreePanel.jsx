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
  activeAssignment,
  activeSlide,
  isCollapsed = false,
  onToggleCollapsed,
}) {
  const lecture1Open = activeLecture?.lectureId === 'intro-react-state'
  const lecture2Open = activeLecture?.lectureId === 'react-state-snapshot'
  const week02Lecture1Open =
    activeLecture?.lectureId === 'state-update-queueing-batching'
  const week02Lecture2Open = activeLecture?.lectureId === 'objects-in-react-state'
  const week03Lecture1Open = activeLecture?.lectureId === 'updating-arrays-in-state'
  const week03Lecture2Open = activeLecture?.lectureId === 'introduction-to-immer'
  const week04Lecture1Open = activeLecture?.lectureId === 'introduction-to-tanstack-query'
  const week04Lecture2Open = activeLecture?.lectureId === 'queries-with-tanstack-query'
  const week04Lecture3Open = activeLecture?.lectureId === 'tanstack-query-keys'
  const week04Lecture4Open = activeLecture?.lectureId === 'query-functions-in-tanstack-query'
  const week04Lecture5Open = activeLecture?.lectureId === 'intro-to-mutations-tanstack-query'
  const week05Lecture1Open = activeLecture?.lectureId === 'singly-linked-lists'
  const week05Lecture2Open = activeLecture?.lectureId === 'intro-react-router'
  const week05Lecture3Open = activeLecture?.lectureId === 'react-router-route-patterns'
  const week05Lecture4Open = activeLecture?.lectureId === 'react-router-navigation'
  const week01AssignmentOpen =
    activeAssignment?.assignmentId === 'counter-state-management'
  const week02RecipeGalleryOpen =
    activeAssignment?.assignmentId === 'interactive-recipe-gallery'
  const week02NestedStateOpen =
    activeAssignment?.assignmentId === 'managing-nested-state'
  const week02TaskManagerOpen =
    activeAssignment?.assignmentId === 'taskmanager-react-state'
  const week03ShoppingListOpen =
    activeAssignment?.assignmentId === 'state-management-with-immer-in-react'
  const week03UserProfileWithImmerOpen =
    activeAssignment?.assignmentId === 'state-management-with-useimmer-hook'

  const week04DogQueryOpen =
    activeAssignment?.assignmentId === 'dog-api-tanstack-query'
  const week04JsonPlaceholderCrudOpen =
    activeAssignment?.assignmentId === 'jsonplaceholder-crud-tanstack-query'

  const week05HealthRecordSymmetryOpen =
    activeAssignment?.assignmentId === 'health-record-symmetry'

  const week05RecipeRouterGalleryOpen =
    activeAssignment?.assignmentId === 'recipe-router-gallery'

  const week05BlogRouterMpaOpen =
    activeAssignment?.assignmentId === 'blog-router-mpa'

  const week06PatientRecordMergeOpen =
    activeAssignment?.assignmentId === 'patient-record-merge-doubly-linked-list'
  const week06ContextRefactorOpen =
    activeAssignment?.assignmentId === 'context-refactor-to-context'
  const week06ThemeSwitcherOpen =
    activeAssignment?.assignmentId === 'global-theme-switcher'
  const week07OrderProcessingOpen =
    activeAssignment?.assignmentId === 'ecommerce-order-processing-system'
  const week07ReactHookFormOpen =
    activeAssignment?.assignmentId === 'react-hook-form-registration'
  const week07QueryFormOpen =
    activeAssignment?.assignmentId === 'query-form-profile-integration'
  const week08SelectionSortOpen =
    activeAssignment?.assignmentId === 'selection-sort-analysis'
  const week08ResponsiveCanvasOpen =
    activeAssignment?.assignmentId === 'responsive-canvas-useeffect'
  const week08ChartJsOpen =
    activeAssignment?.assignmentId === 'chartjs-poll-dashboard'
  const week09BubbleSortOpen =
    activeAssignment?.assignmentId === 'bubble-sort-optimization'
  const week09UseWindowSizeOpen =
    activeAssignment?.assignmentId === 'custom-use-window-size-hook'
  const week09UseLocalStorageOpen =
    activeAssignment?.assignmentId === 'custom-use-local-storage-hook'
  const week10InsertionSortOpen =
    activeAssignment?.assignmentId === 'insertion-sort-analysis'
  const week10ErrorBoundaryOpen =
    activeAssignment?.assignmentId === 'error-boundary-safety-net'

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

  const week02Lecture1Slides = [
    '01 Introduction to React and State Management',
    '02 The Basics of State Updates',
    '03 Batching State Updates',
    '04 Example: Counter Component (State Snapshots)',
    '05 Updating the Same State Variable Multiple Times',
    '06 Advanced State Update Patterns',
    '07 Best Practices and Naming Conventions',
    '08 Recap and Best Practices',
  ]

  const week02Lecture2Slides = [
    '01 Introduction to State in React',
    '02 Why Immutability Matters',
    '03 Direct Mutation: A Common Mistake',
    '04 Correct Way to Update Objects',
    '05 Using Spread Syntax for Updates',
    '06 Updating Nested Objects',
    '07 Managing Lists Immutably',
    '08 Local Mutation vs. State Mutation',
    '09 Benefits of Immutability',
    '10 Recap and Best Practices',
  ]

  const week03Lecture1Slides = [
    '01 Introduction to Array Immutability',
    '02 Common Operations on Arrays',
    '03 Adding Items to an Array',
    '04 Removing Items from an Array',
    '05 Modifying Items in an Array',
    '06 Advanced Operations',
    '07 Handling Complex State Updates',
    '08 Using Immer for Simplicity',
    '09 Best Practices and Recap',
  ]

  const week03Lecture2Slides = [
    '01 Introduction to Immer',
    '02 Why Immer?',
    '03 The produce Function',
    '04 Practical Example Without Immer',
    '05 Practical Example With Immer',
    '06 Curried Producers',
    '07 Best Practices and Recap',
  ]

  const week04Lecture1Slides = [
    '01 Introduction to TanStack Query',
    '02 Motivation Behind TanStack Query',
    '03 Challenges of Managing Server State',
    '04 Why TanStack Query?',
    '05 Features and Benefits',
    '06 Getting Started with TanStack Query',
    '07 Best Practices and Recap',
  ]

  const week04Lecture2Slides = [
    '01 Introduction to TanStack Query',
    '02 What is a Query?',
    '03 Query Key and Query Function',
    '04 Using the useQuery Hook',
    '05 Understanding Query Results',
    '06 Handling Different States',
    '07 Advanced: fetchStatus',
    '08 Best Practices and Recap',
  ]

  const week04Lecture3Slides = [
    '01 Introduction to TanStack Query',
    '02 What are Query Keys?',
    '03 Simple Query Keys',
    '04 Complex Array Keys with Variables',
    '05 Deterministic Hashing of Query Keys',
    '06 Dependency Management with Query Keys',
    '07 Best Practices and Recap',
  ]

  const week04Lecture4Slides = [
    '01 Introduction to Query Functions',
    '02 Basics of Query Functions',
    '03 Handling and Throwing Errors',
    '04 Integration with Fetch API',
    '05 Advanced Use: Query Function Variables and Context',
    '06 Understanding QueryFunctionContext',
    '07 Best Practices and Recap',
  ]

  const week04Lecture5Slides = [
    '01 Introduction to Mutations',
    '02 Basic Mutation Setup',
    '03 States of a Mutation',
    '04 Handling Mutation Results',
    '05 Resetting Mutation State',
    '06 Advanced Use Cases - Side Effects',
    '07 Practical Example of Side Effects',
    '08 Best Practices and Recap',
  ]

  const week05Lecture1Slides = [
    '01 Introduction to Singly Linked Lists',
    '02 Node Structure',
    '03 The Head Node',
    '04 Traversing a Linked List',
    '05 Inserting a New Node',
    '06 Adding a Node at the Beginning',
    '07 Deleting a Node',
    '08 Deleting the First Node',
    '09 Best Practices and Recap',
  ]
  const week05Lecture2Slides = [
    '01 Introduction to React Router v7',
    '02 The Three Modes of v7',
    '03 Mode 1 – Declarative (The Basics)',
    '04 Mode 2 – Data (Enhanced Performance)',
    '05 Mode 3 – Framework (The Full Experience)',
    '06 Picking Your Strategy - Framework',
    '07 Picking Your Strategy - Data',
    '08 Use Declarative if...',
    '09 Best Practices and Recap',
  ]

  const week05Lecture3Slides = [
    '01 Configuring Routes',
    '02 Routes via file naming conventions',
    '03 Route Modules',
    '04 Nested Routes',
    '05 Route Prefixes',
    '06 Dynamic Segments',
    '07 Multiple Dynamic Segments',
    '08 Optional Segments',
    '09 Splats',
    '10 Splat - catchall',
    '11 Best Practices and Recap',
  ]


  const week05Lecture4Slides = [
    '01 React Router - Navigating',
    '02 NavLink',
    '03 Link',
    '04 Form',
    '05 Redirect',
    '06 useNavigate',
    '07 Best Practices and Recap',
  ]

  const currentSlides = lecture1Open
    ? lecture1Slides
    : lecture2Open
      ? lecture2Slides
      : week02Lecture1Open
        ? week02Lecture1Slides
        : week02Lecture2Open
          ? week02Lecture2Slides
          : week03Lecture1Open
            ? week03Lecture1Slides
            : week03Lecture2Open
              ? week03Lecture2Slides
              : week04Lecture1Open
                ? week04Lecture1Slides
                : week04Lecture2Open
                  ? week04Lecture2Slides
                  : week04Lecture3Open
                    ? week04Lecture3Slides
                    : week04Lecture4Open
                      ? week04Lecture4Slides
                      : week04Lecture5Open
                        ? week04Lecture5Slides
                        : week05Lecture1Open
                          ? week05Lecture1Slides
                          : week05Lecture2Open
                          ? week05Lecture2Slides
                          : week05Lecture3Open
                            ? week05Lecture3Slides
                            : week05Lecture4Open
                              ? week05Lecture4Slides
                              : []

  return (
    <aside className={`filetree-panel${isCollapsed ? ' collapsed' : ''}`}>
      <div className="filetree-panel-header">
        <div className="sidebar-label">Project Tree</div>
        <button
          type="button"
          className="filetree-collapse-button"
          onClick={onToggleCollapsed}
          aria-label={isCollapsed ? 'Expand project tree' : 'Collapse project tree'}
          title={isCollapsed ? 'Expand project tree' : 'Collapse project tree'}
        >
          <span aria-hidden="true">{isCollapsed ? '‹' : '›'}</span>
        </button>
      </div>

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
        <TreeLine
          label="Week02StateUpdateQueueingMasterclass.jsx"
          depth={2}
          active={week02Lecture1Open}
          subtle={!week02Lecture1Open}
        />
        <TreeLine
          label="Week02ObjectsInStateMasterclass.jsx"
          depth={2}
          active={week02Lecture2Open}
          subtle={!week02Lecture2Open}
        />
        <TreeLine
          label="Week03ArraysInStateMasterclass.jsx"
          depth={2}
          active={week03Lecture1Open}
          subtle={!week03Lecture1Open}
        />
        <TreeLine
          label="Week03IntroductionToImmerMasterclass.jsx"
          depth={2}
          active={week03Lecture2Open}
          subtle={!week03Lecture2Open}
        />
        <TreeLine
          label="Week04IntroToTanStackQueryMasterclass.jsx"
          depth={2}
          active={week04Lecture1Open}
          subtle={!week04Lecture1Open}
        />
        <TreeLine
          label="Week04QueriesWithTanStackQueryMasterclass.jsx"
          depth={2}
          active={week04Lecture2Open}
          subtle={!week04Lecture2Open}
        />
        <TreeLine
          label="Week04TanStackQueryKeysMasterclass.jsx"
          depth={2}
          active={week04Lecture3Open}
          subtle={!week04Lecture3Open}
        />
        <TreeLine
          label="Week04QueryFunctionsInTanStackQueryMasterclass.jsx"
          depth={2}
          active={week04Lecture4Open}
          subtle={!week04Lecture4Open}
        />
        <TreeLine
          label="Week04IntroToMutationsTanStackQueryMasterclass.jsx"
          depth={2}
          active={week04Lecture5Open}
          subtle={!week04Lecture5Open}
        />
        <TreeLine
          label="Week05SinglyLinkedListsMasterclass.jsx"
          depth={2}
          active={week05Lecture1Open}
          subtle={!week05Lecture1Open}
        />
        <TreeLine
          label="Week05IntroReactRouterMasterclass.jsx"
          depth={2}
          active={week05Lecture2Open}
          subtle={!week05Lecture2Open}
        />
        <TreeLine
          label="Week05ReactRouterRoutePatternsMasterclass.jsx"
          depth={2}
          active={week05Lecture3Open}
          subtle={!week05Lecture3Open}
        />
        <TreeLine
          label="Week05ReactRouterNavigationMasterclass.jsx"
          depth={2}
          active={week05Lecture4Open}
          subtle={!week05Lecture4Open}
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
          active={week01AssignmentOpen}
          subtle={!week01AssignmentOpen}
        />

        <TreeLine
          label="week02/"
          depth={3}
          active={activeCourseId === 'ad312' && selectedWeekId === 'week02'}
        />
        <TreeLine label="lectures/" depth={4} />
        <TreeLine
          label="react-state-update-queueing-and-batching-mechanism/"
          depth={5}
          active={week02Lecture1Open}
        />
        <TreeLine
          label="updating-objects-in-react-state/"
          depth={5}
          active={week02Lecture2Open}
          subtle={!week02Lecture2Open}
        />
        <TreeLine label="assignments/" depth={4} />
        <TreeLine
          label="building-an-interactive-recipe-gallery-with-react/"
          depth={5}
          active={week02RecipeGalleryOpen}
          subtle={!week02RecipeGalleryOpen}
        />
        <TreeLine
          label="managing-nested-state-in-react/"
          depth={5}
          active={week02NestedStateOpen}
          subtle={!week02NestedStateOpen}
        />
        <TreeLine
          label="taskmanager-with-react-state/"
          depth={5}
          active={week02TaskManagerOpen}
          subtle={!week02TaskManagerOpen}
        />
        <TreeLine
          label="week03/"
          depth={3}
          active={activeCourseId === 'ad312' && selectedWeekId === 'week03'}
        />
        <TreeLine label="lectures/" depth={4} />
        <TreeLine
          label="introduction-to-updating-arrays-in-react-state/"
          depth={5}
          active={week03Lecture1Open}
          subtle={!week03Lecture1Open}
        />
        <TreeLine
          label="introduction-to-immer/"
          depth={5}
          active={week03Lecture2Open}
          subtle={!week03Lecture2Open}
        />
        <TreeLine label="assignments/" depth={4} />
        <TreeLine
          label="state-management-with-immer-in-react/"
          depth={5}
          active={week03ShoppingListOpen}
          subtle={!week03ShoppingListOpen}
        />
        <TreeLine
          label="state-management-with-useimmer-hook/"
          depth={5}
          active={week03UserProfileWithImmerOpen}
          subtle={!week03UserProfileWithImmerOpen}
        />
        <TreeLine
          label="week04/"
          depth={3}
          active={activeCourseId === 'ad312' && selectedWeekId === 'week04'}
          subtle={activeCourseId !== 'ad312' || selectedWeekId !== 'week04'}
        />
        <TreeLine label="lectures/" depth={4} subtle={!(week04Lecture1Open || week04Lecture2Open || week04Lecture3Open || week04Lecture4Open || week04Lecture5Open)} />
        <TreeLine
          label="introduction-to-tanstack-query/"
          depth={5}
          active={week04Lecture1Open}
          subtle={!week04Lecture1Open}
        />
        <TreeLine
          label="queries-with-tanstack-query/"
          depth={5}
          active={week04Lecture2Open}
          subtle={!week04Lecture2Open}
        />
        <TreeLine
          label="tanstack-query-keys/"
          depth={5}
          active={week04Lecture3Open}
          subtle={!week04Lecture3Open}
        />
        <TreeLine
          label="query-functions-in-tanstack-query/"
          depth={5}
          active={week04Lecture4Open}
          subtle={!week04Lecture4Open}
        />
        <TreeLine
          label="intro-to-mutations-tanstack-query/"
          depth={5}
          active={week04Lecture5Open}
          subtle={!week04Lecture5Open}
        />
        <TreeLine label="assignments/" depth={4} subtle={!(week04DogQueryOpen || week04JsonPlaceholderCrudOpen)} />
        <TreeLine
          label="dog-api-tanstack-query/"
          depth={5}
          active={week04DogQueryOpen}
          subtle={!week04DogQueryOpen}
        />
        <TreeLine
          label="jsonplaceholder-crud-tanstack-query/"
          depth={5}
          active={week04JsonPlaceholderCrudOpen}
          subtle={!week04JsonPlaceholderCrudOpen}
        />
        <TreeLine
          label="week05/"
          depth={3}
          active={activeCourseId === 'ad312' && selectedWeekId === 'week05'}
          subtle={activeCourseId !== 'ad312' || selectedWeekId !== 'week05'}
        />
        <TreeLine label="lectures/" depth={4} subtle={!(week05Lecture1Open || week05Lecture2Open || week05Lecture3Open || week05Lecture4Open)} />
        <TreeLine
          label="introduction-to-singly-linked-lists/"
          depth={5}
          active={week05Lecture1Open}
          subtle={!week05Lecture1Open}
        />
        <TreeLine
          label="intro-react-router/"
          depth={5}
          active={week05Lecture2Open}
          subtle={!week05Lecture2Open}
        />
        <TreeLine
          label="react-router-route-patterns/"
          depth={5}
          active={week05Lecture3Open}
          subtle={!week05Lecture3Open}
        />
        <TreeLine
          label="react-router-navigation/"
          depth={5}
          active={week05Lecture4Open}
          subtle={!week05Lecture4Open}
        />
        <TreeLine label="assignments/" depth={4} subtle={!(week05HealthRecordSymmetryOpen || week05RecipeRouterGalleryOpen || week05BlogRouterMpaOpen)} />
        <TreeLine
          label="health-record-symmetry/"
          depth={5}
          active={week05HealthRecordSymmetryOpen}
          subtle={!week05HealthRecordSymmetryOpen}
        />
        <TreeLine
          label="recipe-router-gallery/"
          depth={5}
          active={week05RecipeRouterGalleryOpen}
          subtle={!week05RecipeRouterGalleryOpen}
        />
        <TreeLine
          label="blog-router-mpa/"
          depth={5}
          active={week05BlogRouterMpaOpen}
          subtle={!week05BlogRouterMpaOpen}
        />
        <TreeLine
          label="week06/"
          depth={3}
          active={activeCourseId === 'ad312' && selectedWeekId === 'week06'}
          subtle={activeCourseId !== 'ad312' || selectedWeekId !== 'week06'}
        />
        <TreeLine label="assignments/" depth={4} subtle={!(week06PatientRecordMergeOpen || week06ContextRefactorOpen || week06ThemeSwitcherOpen)} />
        <TreeLine
          label="patient-record-merge-doubly-linked-list/"
          depth={5}
          active={week06PatientRecordMergeOpen}
          subtle={!week06PatientRecordMergeOpen}
        />
        <TreeLine
          label="context-refactor-to-context/"
          depth={5}
          active={week06ContextRefactorOpen}
          subtle={!week06ContextRefactorOpen}
        />
        <TreeLine
          label="global-theme-switcher/"
          depth={5}
          active={week06ThemeSwitcherOpen}
          subtle={!week06ThemeSwitcherOpen}
        />
        <TreeLine
          label="week07/"
          depth={3}
          active={activeCourseId === 'ad312' && selectedWeekId === 'week07'}
          subtle={activeCourseId !== 'ad312' || selectedWeekId !== 'week07'}
        />
        <TreeLine label="assignments/" depth={4} subtle={!(week07OrderProcessingOpen || week07ReactHookFormOpen)} />
        <TreeLine
          label="ecommerce-order-processing-system/"
          depth={5}
          active={week07OrderProcessingOpen}
          subtle={!week07OrderProcessingOpen}
        />
        <TreeLine
          label="react-hook-form-registration/"
          depth={5}
          active={week07ReactHookFormOpen}
          subtle={!week07ReactHookFormOpen}
        />
        <TreeLine
          label="week08/"
          depth={3}
          active={activeCourseId === 'ad312' && selectedWeekId === 'week08'}
          subtle={activeCourseId !== 'ad312' || selectedWeekId !== 'week08'}
        />
        <TreeLine label="assignments/" depth={4} subtle={!(week08SelectionSortOpen || week08ResponsiveCanvasOpen || week08ChartJsOpen)} />
        <TreeLine
          label="selection-sort-analysis/"
          depth={5}
          active={week08SelectionSortOpen}
          subtle={!week08SelectionSortOpen}
        />
        <TreeLine
          label="responsive-canvas-useeffect/"
          depth={5}
          active={week08ResponsiveCanvasOpen}
          subtle={!week08ResponsiveCanvasOpen}
        />
        <TreeLine
          label="chartjs-poll-dashboard/"
          depth={5}
          active={week08ChartJsOpen}
          subtle={!week08ChartJsOpen}
        />
        <TreeLine
          label="week09/"
          depth={3}
          active={activeCourseId === 'ad312' && selectedWeekId === 'week09'}
          subtle={activeCourseId !== 'ad312' || selectedWeekId !== 'week09'}
        />
        <TreeLine label="assignments/" depth={4} subtle={!(week09BubbleSortOpen || week09UseWindowSizeOpen || week09UseLocalStorageOpen || week10InsertionSortOpen)} />
        <TreeLine
          label="bubble-sort-optimization/"
          depth={5}
          active={week09BubbleSortOpen}
          subtle={!week09BubbleSortOpen}
        />
        <TreeLine
          label="custom-use-window-size-hook/"
          depth={5}
          active={week09UseWindowSizeOpen}
          subtle={!week09UseWindowSizeOpen}
        />
        <TreeLine
          label="custom-use-local-storage-hook/"
          depth={5}
          active={week09UseLocalStorageOpen}
          subtle={!week09UseLocalStorageOpen}
        />
        <TreeLine
          label="week10/"
          depth={3}
          active={activeCourseId === 'ad312' && selectedWeekId === 'week10'}
          subtle={activeCourseId !== 'ad312' || selectedWeekId !== 'week10'}
        />
        <TreeLine label="assignments/" depth={4} subtle={!(week10InsertionSortOpen || week10ErrorBoundaryOpen)} />
        <TreeLine
          label="insertion-sort-analysis/"
          depth={5}
          active={week10InsertionSortOpen}
          subtle={!week10InsertionSortOpen}
        />
        <TreeLine
          label="error-boundary-safety-net/"
          depth={5}
          active={week10ErrorBoundaryOpen}
          subtle={!week10ErrorBoundaryOpen}
        />
        <TreeLine
          label="week11/"
          depth={3}
          active={activeCourseId === 'ad312' && selectedWeekId === 'week11'}
          subtle={activeCourseId !== 'ad312' || selectedWeekId !== 'week11'}
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

        <TreeLine label="assignments/" depth={1} />
        <TreeLine label="week01/" depth={2} subtle={!week01AssignmentOpen} />
        <TreeLine
          label="Counter.jsx"
          depth={3}
          active={week01AssignmentOpen}
          subtle={!week01AssignmentOpen}
        />
        <TreeLine
          label="week02/"
          depth={2}
          subtle={!(week02RecipeGalleryOpen || week02NestedStateOpen || week02TaskManagerOpen)}
        />
        <TreeLine
          label="interactive-recipe-gallery/"
          depth={3}
          active={week02RecipeGalleryOpen}
          subtle={!week02RecipeGalleryOpen}
        />
        <TreeLine
          label="RecipeGallery.jsx"
          depth={4}
          active={week02RecipeGalleryOpen}
          subtle={!week02RecipeGalleryOpen}
        />
        <TreeLine
          label="RecipeGallery.test.jsx"
          depth={4}
          active={week02RecipeGalleryOpen}
          subtle={!week02RecipeGalleryOpen}
        />
        <TreeLine
          label="managing-nested-state/"
          depth={3}
          active={week02NestedStateOpen}
          subtle={!week02NestedStateOpen}
        />
        <TreeLine
          label="UserProfile.jsx"
          depth={4}
          active={week02NestedStateOpen}
          subtle={!week02NestedStateOpen}
        />
        <TreeLine
          label="UserProfile.test.jsx"
          depth={4}
          active={week02NestedStateOpen}
          subtle={!week02NestedStateOpen}
        />
        <TreeLine
          label="taskmanager-react-state/"
          depth={3}
          active={week02TaskManagerOpen}
          subtle={!week02TaskManagerOpen}
        />
        <TreeLine
          label="TaskManager.jsx"
          depth={4}
          active={week02TaskManagerOpen}
          subtle={!week02TaskManagerOpen}
        />
        <TreeLine
          label="TaskManager.test.jsx"
          depth={4}
          active={week02TaskManagerOpen}
          subtle={!week02TaskManagerOpen}
        />
        <TreeLine
          label="week03/"
          depth={2}
          subtle={!(week03Lecture1Open || week03Lecture2Open || week03ShoppingListOpen || week03UserProfileWithImmerOpen)}
        />
        <TreeLine
          label="state-management-with-immer-in-react/"
          depth={3}
          active={week03ShoppingListOpen}
          subtle={!week03ShoppingListOpen}
        />
        <TreeLine
          label="ShoppingListWithImmer.jsx"
          depth={4}
          active={week03ShoppingListOpen}
          subtle={!week03ShoppingListOpen}
        />
        <TreeLine
          label="ShoppingListWithImmer.test.jsx"
          depth={4}
          active={week03ShoppingListOpen}
          subtle={!week03ShoppingListOpen}
        />
        <TreeLine
          label="state-management-with-useimmer-hook/"
          depth={3}
          active={week03UserProfileWithImmerOpen}
          subtle={!week03UserProfileWithImmerOpen}
        />
        <TreeLine
          label="UserProfileWithImmer.jsx"
          depth={4}
          active={week03UserProfileWithImmerOpen}
          subtle={!week03UserProfileWithImmerOpen}
        />
        <TreeLine
          label="UserProfileWithImmer.test.jsx"
          depth={4}
          active={week03UserProfileWithImmerOpen}
          subtle={!week03UserProfileWithImmerOpen}
        />
        <TreeLine
          label="week04/"
          depth={2}
          subtle={!(week04DogQueryOpen || week04JsonPlaceholderCrudOpen)}
        />
        <TreeLine
          label="dog-api-tanstack-query/"
          depth={3}
          active={week04DogQueryOpen}
          subtle={!week04DogQueryOpen}
        />
        <TreeLine
          label="DogQueryExplorer.jsx"
          depth={4}
          active={week04DogQueryOpen}
          subtle={!week04DogQueryOpen}
        />
        <TreeLine
          label="DogQueryExplorer.test.jsx"
          depth={4}
          active={week04DogQueryOpen}
          subtle={!week04DogQueryOpen}
        />
        <TreeLine
          label="jsonplaceholder-crud-tanstack-query/"
          depth={3}
          active={week04JsonPlaceholderCrudOpen}
          subtle={!week04JsonPlaceholderCrudOpen}
        />
        <TreeLine
          label="PostCrudExplorer.jsx"
          depth={4}
          active={week04JsonPlaceholderCrudOpen}
          subtle={!week04JsonPlaceholderCrudOpen}
        />
        <TreeLine
          label="PostCrudExplorer.test.jsx"
          depth={4}
          active={week04JsonPlaceholderCrudOpen}
          subtle={!week04JsonPlaceholderCrudOpen}
        />
        <TreeLine label="week05/" depth={2} subtle={!(week05HealthRecordSymmetryOpen || week05RecipeRouterGalleryOpen || week05BlogRouterMpaOpen)} />
        <TreeLine
          label="health-record-symmetry/"
          depth={3}
          active={week05HealthRecordSymmetryOpen}
          subtle={!week05HealthRecordSymmetryOpen}
        />
        <TreeLine
          label="HealthRecordSymmetry.js"
          depth={4}
          active={week05HealthRecordSymmetryOpen}
          subtle={!week05HealthRecordSymmetryOpen}
        />
        <TreeLine
          label="HealthRecordSymmetry.console-tests.js"
          depth={4}
          active={week05HealthRecordSymmetryOpen}
          subtle={!week05HealthRecordSymmetryOpen}
        />
        <TreeLine
          label="recipe-router-gallery/"
          depth={3}
          active={week05RecipeRouterGalleryOpen}
          subtle={!week05RecipeRouterGalleryOpen}
        />
        <TreeLine
          label="RecipeRouterBridge.jsx"
          depth={4}
          active={week05RecipeRouterGalleryOpen}
          subtle={!week05RecipeRouterGalleryOpen}
        />
        <TreeLine
          label="RecipeRouterBridge.test.jsx"
          depth={4}
          active={week05RecipeRouterGalleryOpen}
          subtle={!week05RecipeRouterGalleryOpen}
        />
        <TreeLine
          label="blog-router-mpa/"
          depth={3}
          active={week05BlogRouterMpaOpen}
          subtle={!week05BlogRouterMpaOpen}
        />
        <TreeLine
          label="BlogRouterBridge.jsx"
          depth={4}
          active={week05BlogRouterMpaOpen}
          subtle={!week05BlogRouterMpaOpen}
        />
        <TreeLine
          label="BlogRouterBridge.test.jsx"
          depth={4}
          active={week05BlogRouterMpaOpen}
          subtle={!week05BlogRouterMpaOpen}
        />
        <TreeLine label="week06/" depth={2} subtle={!(week06PatientRecordMergeOpen || week06ContextRefactorOpen || week06ThemeSwitcherOpen)} />
        <TreeLine
          label="patient-record-merge-doubly-linked-list/"
          depth={3}
          active={week06PatientRecordMergeOpen}
          subtle={!week06PatientRecordMergeOpen}
        />
        <TreeLine
          label="PatientRecordMerge.js"
          depth={4}
          active={week06PatientRecordMergeOpen}
          subtle={!week06PatientRecordMergeOpen}
        />
        <TreeLine
          label="PatientRecordMergeExplorer.jsx"
          depth={4}
          active={week06PatientRecordMergeOpen}
          subtle={!week06PatientRecordMergeOpen}
        />
        <TreeLine
          label="PatientRecordMerge.console-tests.js"
          depth={4}
          active={week06PatientRecordMergeOpen}
          subtle={!week06PatientRecordMergeOpen}
        />
        <TreeLine
          label="README.md"
          depth={4}
          active={week06PatientRecordMergeOpen}
          subtle={!week06PatientRecordMergeOpen}
        />
        <TreeLine
          label="context-refactor-to-context/"
          depth={3}
          active={week06ContextRefactorOpen}
          subtle={!week06ContextRefactorOpen}
        />
        <TreeLine
          label="ContextRefactorApp.jsx"
          depth={4}
          active={week06ContextRefactorOpen}
          subtle={!week06ContextRefactorOpen}
        />
        <TreeLine
          label="ContextRefactorApp.test.jsx"
          depth={4}
          active={week06ContextRefactorOpen}
          subtle={!week06ContextRefactorOpen}
        />
        <TreeLine
          label="README.md"
          depth={4}
          active={week06ContextRefactorOpen}
          subtle={!week06ContextRefactorOpen}
        />
        <TreeLine
          label="global-theme-switcher/"
          depth={3}
          active={week06ThemeSwitcherOpen}
          subtle={!week06ThemeSwitcherOpen}
        />
        <TreeLine
          label="ThemeSwitcherApp.jsx"
          depth={4}
          active={week06ThemeSwitcherOpen}
          subtle={!week06ThemeSwitcherOpen}
        />
        <TreeLine
          label="ThemeSwitcherApp.test.jsx"
          depth={4}
          active={week06ThemeSwitcherOpen}
          subtle={!week06ThemeSwitcherOpen}
        />
        <TreeLine
          label="README.md"
          depth={4}
          active={week06ThemeSwitcherOpen}
          subtle={!week06ThemeSwitcherOpen}
        />
        <TreeLine label="week07/" depth={2} subtle={!(week07OrderProcessingOpen || week07ReactHookFormOpen || week07QueryFormOpen || week08SelectionSortOpen)} />
        <TreeLine
          label="ecommerce-order-processing-system/"
          depth={3}
          active={week07OrderProcessingOpen}
          subtle={!week07OrderProcessingOpen}
        />
        <TreeLine
          label="OrderProcessingSystem.js"
          depth={4}
          active={week07OrderProcessingOpen}
          subtle={!week07OrderProcessingOpen}
        />
        <TreeLine
          label="OrderProcessingSystem.console-tests.js"
          depth={4}
          active={week07OrderProcessingOpen}
          subtle={!week07OrderProcessingOpen}
        />
        <TreeLine
          label="README.md"
          depth={4}
          active={week07OrderProcessingOpen}
          subtle={!week07OrderProcessingOpen}
        />
        <TreeLine
          label="react-hook-form-registration/"
          depth={3}
          active={week07ReactHookFormOpen}
          subtle={!week07ReactHookFormOpen}
        />
        <TreeLine
          label="UserRegistrationForm.jsx"
          depth={4}
          active={week07ReactHookFormOpen}
          subtle={!week07ReactHookFormOpen}
        />
        <TreeLine
          label="UserRegistrationForm.test.jsx"
          depth={4}
          active={week07ReactHookFormOpen}
          subtle={!week07ReactHookFormOpen}
        />
        <TreeLine
          label="README.md"
          depth={4}
          active={week07ReactHookFormOpen}
          subtle={!week07ReactHookFormOpen}
        />
        <TreeLine
          label="query-form-profile-integration/"
          depth={3}
          active={week07QueryFormOpen}
          subtle={!week07QueryFormOpen}
        />
        <TreeLine
          label="UserProfileQueryForm.jsx"
          depth={4}
          active={week07QueryFormOpen}
          subtle={!week07QueryFormOpen}
        />
        <TreeLine
          label="UserProfileQueryForm.test.jsx"
          depth={4}
          active={week07QueryFormOpen}
          subtle={!week07QueryFormOpen}
        />
        <TreeLine
          label="profile-db.json"
          depth={4}
          active={week07QueryFormOpen}
          subtle={!week07QueryFormOpen}
        />
        <TreeLine
          label="README.md"
          depth={4}
          active={week07QueryFormOpen}
          subtle={!week07QueryFormOpen}
        />
        <TreeLine label="week08/" depth={2} subtle={!(week08SelectionSortOpen || week08ResponsiveCanvasOpen || week08ChartJsOpen)} />
        <TreeLine
          label="selection-sort-analysis/"
          depth={3}
          active={week08SelectionSortOpen}
          subtle={!week08SelectionSortOpen}
        />
        <TreeLine
          label="SelectionSort.js"
          depth={4}
          active={week08SelectionSortOpen}
          subtle={!week08SelectionSortOpen}
        />
        <TreeLine
          label="SelectionSortPdfReport.js"
          depth={4}
          active={week08SelectionSortOpen}
          subtle={!week08SelectionSortOpen}
        />
        <TreeLine
          label="SelectionSort.console-tests.js"
          depth={4}
          active={week08SelectionSortOpen}
          subtle={!week08SelectionSortOpen}
        />
        <TreeLine
          label="SelectionSort.test.js"
          depth={4}
          active={week08SelectionSortOpen}
          subtle={!week08SelectionSortOpen}
        />
        <TreeLine
          label="README.md"
          depth={4}
          active={week08SelectionSortOpen}
          subtle={!week08SelectionSortOpen}
        />
        <TreeLine
          label="responsive-canvas-useeffect/"
          depth={3}
          active={week08ResponsiveCanvasOpen}
          subtle={!week08ResponsiveCanvasOpen}
        />
        <TreeLine
          label="ResponsiveCanvas.jsx"
          depth={4}
          active={week08ResponsiveCanvasOpen}
          subtle={!week08ResponsiveCanvasOpen}
        />
        <TreeLine
          label="ResponsiveCanvas.test.jsx"
          depth={4}
          active={week08ResponsiveCanvasOpen}
          subtle={!week08ResponsiveCanvasOpen}
        />
        <TreeLine
          label="README.md"
          depth={4}
          active={week08ResponsiveCanvasOpen}
          subtle={!week08ResponsiveCanvasOpen}
        />
        <TreeLine
          label="chartjs-poll-dashboard/"
          depth={3}
          active={week08ChartJsOpen}
          subtle={!week08ChartJsOpen}
        />
        <TreeLine
          label="DynamicPollDashboard.jsx"
          depth={4}
          active={week08ChartJsOpen}
          subtle={!week08ChartJsOpen}
        />
        <TreeLine
          label="DynamicPollDashboard.test.jsx"
          depth={4}
          active={week08ChartJsOpen}
          subtle={!week08ChartJsOpen}
        />
        <TreeLine
          label="README.md"
          depth={4}
          active={week08ChartJsOpen}
          subtle={!week08ChartJsOpen}
        />
        <TreeLine label="week09/" depth={2} subtle={!(week09BubbleSortOpen || week09UseWindowSizeOpen || week09UseLocalStorageOpen || week10InsertionSortOpen)} />
        <TreeLine
          label="bubble-sort-optimization/"
          depth={3}
          active={week09BubbleSortOpen}
          subtle={!week09BubbleSortOpen}
        />
        <TreeLine
          label="BubbleSort.js"
          depth={4}
          active={week09BubbleSortOpen}
          subtle={!week09BubbleSortOpen}
        />
        <TreeLine
          label="BubbleSortPdfReport.js"
          depth={4}
          active={week09BubbleSortOpen}
          subtle={!week09BubbleSortOpen}
        />
        <TreeLine
          label="BubbleSort.console-tests.js"
          depth={4}
          active={week09BubbleSortOpen}
          subtle={!week09BubbleSortOpen}
        />
        <TreeLine
          label="BubbleSort.test.js"
          depth={4}
          active={week09BubbleSortOpen}
          subtle={!week09BubbleSortOpen}
        />
        <TreeLine
          label="README.md"
          depth={4}
          active={week09BubbleSortOpen}
          subtle={!week09BubbleSortOpen}
        />
        <TreeLine
          label="custom-use-window-size-hook/"
          depth={3}
          active={week09UseWindowSizeOpen}
          subtle={!week09UseWindowSizeOpen}
        />
        <TreeLine
          label="useWindowSize.js"
          depth={4}
          active={week09UseWindowSizeOpen}
          subtle={!week09UseWindowSizeOpen}
        />
        <TreeLine
          label="StreamingWindowSizeDemo.jsx"
          depth={4}
          active={week09UseWindowSizeOpen}
          subtle={!week09UseWindowSizeOpen}
        />
        <TreeLine
          label="StreamingWindowSizeDemo.test.jsx"
          depth={4}
          active={week09UseWindowSizeOpen}
          subtle={!week09UseWindowSizeOpen}
        />
        <TreeLine
          label="README.md"
          depth={4}
          active={week09UseWindowSizeOpen}
          subtle={!week09UseWindowSizeOpen}
        />
        <TreeLine
          label="custom-use-local-storage-hook/"
          depth={3}
          active={week09UseLocalStorageOpen}
          subtle={!week09UseLocalStorageOpen}
        />
        <TreeLine
          label="useLocalStorage.js"
          depth={4}
          active={week09UseLocalStorageOpen}
          subtle={!week09UseLocalStorageOpen}
        />
        <TreeLine
          label="StreamingPreferencesDemo.jsx"
          depth={4}
          active={week09UseLocalStorageOpen}
          subtle={!week09UseLocalStorageOpen}
        />
        <TreeLine
          label="StreamingPreferencesDemo.test.jsx"
          depth={4}
          active={week09UseLocalStorageOpen}
          subtle={!week09UseLocalStorageOpen}
        />
        <TreeLine
          label="README.md"
          depth={4}
          active={week09UseLocalStorageOpen}
          subtle={!week09UseLocalStorageOpen}
        />
        <TreeLine label="week10/" depth={2} subtle={!(week10InsertionSortOpen || week10ErrorBoundaryOpen)} />
        <TreeLine
          label="insertion-sort-analysis/"
          depth={3}
          active={week10InsertionSortOpen}
          subtle={!week10InsertionSortOpen}
        />
        <TreeLine label="InsertionSort.js" depth={4} active={week10InsertionSortOpen} subtle={!week10InsertionSortOpen} />
        <TreeLine label="InsertionSortPdfReport.js" depth={4} active={week10InsertionSortOpen} subtle={!week10InsertionSortOpen} />
        <TreeLine label="InsertionSort.console-tests.js" depth={4} active={week10InsertionSortOpen} subtle={!week10InsertionSortOpen} />
        <TreeLine label="InsertionSort.test.js" depth={4} active={week10InsertionSortOpen} subtle={!week10InsertionSortOpen} />
        <TreeLine label="README.md" depth={4} active={week10InsertionSortOpen} subtle={!week10InsertionSortOpen} />
        <TreeLine label="error-boundary-safety-net/" depth={3} active={week10ErrorBoundaryOpen} subtle={!week10ErrorBoundaryOpen} />
        <TreeLine label="ErrorBoundarySafetyNet.jsx" depth={4} active={week10ErrorBoundaryOpen} subtle={!week10ErrorBoundaryOpen} />
        <TreeLine label="ErrorBoundarySafetyNet.helpers.js" depth={4} active={week10ErrorBoundaryOpen} subtle={!week10ErrorBoundaryOpen} />
        <TreeLine label="ErrorBoundarySafetyNet.console-tests.js" depth={4} active={week10ErrorBoundaryOpen} subtle={!week10ErrorBoundaryOpen} />
        <TreeLine label="ErrorBoundarySafetyNet.test.jsx" depth={4} active={week10ErrorBoundaryOpen} subtle={!week10ErrorBoundaryOpen} />
        <TreeLine label="README.md" depth={4} active={week10ErrorBoundaryOpen} subtle={!week10ErrorBoundaryOpen} />
        <TreeLine label="exercises/" depth={1} />
        <TreeLine label="Week01CounterAssignmentGuide.jsx" depth={2} active={week01AssignmentOpen} subtle={!week01AssignmentOpen} />
        <TreeLine label="AssignmentTestPanel.jsx" depth={2} active={week01AssignmentOpen} subtle={!week01AssignmentOpen} />
        <TreeLine label="Week02RecipeGalleryAssignmentGuide.jsx" depth={2} active={week02RecipeGalleryOpen} subtle={!week02RecipeGalleryOpen} />
        <TreeLine label="RecipeGalleryTestPanel.jsx" depth={2} active={week02RecipeGalleryOpen} subtle={!week02RecipeGalleryOpen} />
        <TreeLine label="Week02ManagingNestedStateAssignmentGuide.jsx" depth={2} active={week02NestedStateOpen} subtle={!week02NestedStateOpen} />
        <TreeLine label="NestedStateTestPanel.jsx" depth={2} active={week02NestedStateOpen} subtle={!week02NestedStateOpen} />
        <TreeLine label="Week02TaskManagerAssignmentGuide.jsx" depth={2} active={week02TaskManagerOpen} subtle={!week02TaskManagerOpen} />
        <TreeLine label="TaskManagerTestPanel.jsx" depth={2} active={week02TaskManagerOpen} subtle={!week02TaskManagerOpen} />
        <TreeLine label="Week03ShoppingListWithImmerAssignmentGuide.jsx" depth={2} active={week03ShoppingListOpen} subtle={!week03ShoppingListOpen} />
        <TreeLine label="ShoppingListWithImmerTestPanel.jsx" depth={2} active={week03ShoppingListOpen} subtle={!week03ShoppingListOpen} />
        <TreeLine label="Week03UserProfileWithImmerAssignmentGuide.jsx" depth={2} active={week03UserProfileWithImmerOpen} subtle={!week03UserProfileWithImmerOpen} />
        <TreeLine label="UserProfileWithImmerTestPanel.jsx" depth={2} active={week03UserProfileWithImmerOpen} subtle={!week03UserProfileWithImmerOpen} />
        <TreeLine label="Week04DogApiTanStackQueryAssignmentGuide.jsx" depth={2} active={week04DogQueryOpen} subtle={!week04DogQueryOpen} />
        <TreeLine label="DogQueryTestPanel.jsx" depth={2} active={week04DogQueryOpen} subtle={!week04DogQueryOpen} />
        <TreeLine label="Week04JsonPlaceholderCrudAssignmentGuide.jsx" depth={2} active={week04JsonPlaceholderCrudOpen} subtle={!week04JsonPlaceholderCrudOpen} />
        <TreeLine label="PostCrudTestPanel.jsx" depth={2} active={week04JsonPlaceholderCrudOpen} subtle={!week04JsonPlaceholderCrudOpen} />
        <TreeLine label="Week05HealthRecordSymmetryAssignmentGuide.jsx" depth={2} active={week05HealthRecordSymmetryOpen} subtle={!week05HealthRecordSymmetryOpen} />
        <TreeLine label="HealthRecordSymmetryTestPanel.jsx" depth={2} active={week05HealthRecordSymmetryOpen} subtle={!week05HealthRecordSymmetryOpen} />
        <TreeLine label="Week05RecipeRouterGalleryAssignmentGuide.jsx" depth={2} active={week05RecipeRouterGalleryOpen} subtle={!week05RecipeRouterGalleryOpen} />
        <TreeLine label="RecipeRouterGalleryTestPanel.jsx" depth={2} active={week05RecipeRouterGalleryOpen} subtle={!week05RecipeRouterGalleryOpen} />
        <TreeLine label="Week05BlogRouterMpaAssignmentGuide.jsx" depth={2} active={week05BlogRouterMpaOpen} subtle={!week05BlogRouterMpaOpen} />
        <TreeLine label="BlogRouterTestPanel.jsx" depth={2} active={week05BlogRouterMpaOpen} subtle={!week05BlogRouterMpaOpen} />
        <TreeLine label="Week06PatientRecordMergeAssignmentGuide.jsx" depth={2} active={week06PatientRecordMergeOpen} subtle={!week06PatientRecordMergeOpen} />
        <TreeLine label="PatientRecordMergeTestPanel.jsx" depth={2} active={week06PatientRecordMergeOpen} subtle={!week06PatientRecordMergeOpen} />
        <TreeLine label="Week06ContextRefactorAssignmentGuide.jsx" depth={2} active={week06ContextRefactorOpen} subtle={!week06ContextRefactorOpen} />
        <TreeLine label="ContextRefactorTestPanel.jsx" depth={2} active={week06ContextRefactorOpen} subtle={!week06ContextRefactorOpen} />
        <TreeLine label="Week06ThemeSwitcherAssignmentGuide.jsx" depth={2} active={week06ThemeSwitcherOpen} subtle={!week06ThemeSwitcherOpen} />
        <TreeLine label="ThemeSwitcherTestPanel.jsx" depth={2} active={week06ThemeSwitcherOpen} subtle={!week06ThemeSwitcherOpen} />
        <TreeLine label="Week07OrderProcessingAssignmentGuide.jsx" depth={2} active={week07OrderProcessingOpen} subtle={!week07OrderProcessingOpen} />
        <TreeLine label="OrderProcessingTestPanel.jsx" depth={2} active={week07OrderProcessingOpen} subtle={!week07OrderProcessingOpen} />
        <TreeLine label="Week07ReactHookFormAssignmentGuide.jsx" depth={2} active={week07ReactHookFormOpen} subtle={!week07ReactHookFormOpen} />
        <TreeLine label="RegistrationFormTestPanel.jsx" depth={2} active={week07ReactHookFormOpen} subtle={!week07ReactHookFormOpen} />
        <TreeLine label="Week07QueryFormIntegrationAssignmentGuide.jsx" depth={2} active={week07QueryFormOpen} subtle={!week07QueryFormOpen} />
        <TreeLine label="RegistrationQueryFormTestPanel.jsx" depth={2} active={week07QueryFormOpen} subtle={!week07QueryFormOpen} />
        <TreeLine label="Week08SelectionSortAssignmentGuide.jsx" depth={2} active={week08SelectionSortOpen} subtle={!week08SelectionSortOpen} />
        <TreeLine label="SelectionSortTestPanel.jsx" depth={2} active={week08SelectionSortOpen} subtle={!week08SelectionSortOpen} />
        <TreeLine label="Week08ResponsiveCanvasAssignmentGuide.jsx" depth={2} active={week08ResponsiveCanvasOpen} subtle={!week08ResponsiveCanvasOpen} />
        <TreeLine label="ResponsiveCanvasTestPanel.jsx" depth={2} active={week08ResponsiveCanvasOpen} subtle={!week08ResponsiveCanvasOpen} />
        <TreeLine label="Week08ChartJsPollDashboardAssignmentGuide.jsx" depth={2} active={week08ChartJsOpen} subtle={!week08ChartJsOpen} />
        <TreeLine label="ChartJsPollDashboardTestPanel.jsx" depth={2} active={week08ChartJsOpen} subtle={!week08ChartJsOpen} />
        <TreeLine label="Week09BubbleSortAssignmentGuide.jsx" depth={2} active={week09BubbleSortOpen} subtle={!week09BubbleSortOpen} />
        <TreeLine label="BubbleSortTestPanel.jsx" depth={2} active={week09BubbleSortOpen} subtle={!week09BubbleSortOpen} />
        <TreeLine label="Week09UseWindowSizeAssignmentGuide.jsx" depth={2} active={week09UseWindowSizeOpen} subtle={!week09UseWindowSizeOpen} />
        <TreeLine label="UseWindowSizeTestPanel.jsx" depth={2} active={week09UseWindowSizeOpen} subtle={!week09UseWindowSizeOpen} />
        <TreeLine label="Week09UseLocalStorageAssignmentGuide.jsx" depth={2} active={week09UseLocalStorageOpen} subtle={!week09UseLocalStorageOpen} />
        <TreeLine label="UseLocalStorageTestPanel.jsx" depth={2} active={week09UseLocalStorageOpen} subtle={!week09UseLocalStorageOpen} />
        <TreeLine label="Week10InsertionSortAssignmentGuide.jsx" depth={2} active={week10InsertionSortOpen} subtle={!week10InsertionSortOpen} />
        <TreeLine label="InsertionSortTestPanel.jsx" depth={2} active={week10InsertionSortOpen} subtle={!week10InsertionSortOpen} />
        <TreeLine label="Week10ErrorBoundaryAssignmentGuide.jsx" depth={2} active={week10ErrorBoundaryOpen} subtle={!week10ErrorBoundaryOpen} />
        <TreeLine label="ErrorBoundarySafetyNetTestPanel.jsx" depth={2} active={week10ErrorBoundaryOpen} subtle={!week10ErrorBoundaryOpen} />
        <TreeLine label="styles/" depth={1} />
        <TreeLine
          label="week04-dog-api-tanstack-query-assignment.css"
          depth={2}
          active={week04DogQueryOpen}
          subtle={!week04DogQueryOpen}
        />
        <TreeLine
          label="week04-jsonplaceholder-crud-tanstack-query-assignment.css"
          depth={2}
          active={week04JsonPlaceholderCrudOpen}
          subtle={!week04JsonPlaceholderCrudOpen}
        />
        <TreeLine label="app.css" depth={2} active />
        <TreeLine
          label="code-block.css"
          depth={2}
          active={Boolean(activeLecture)}
          subtle={!activeLecture}
        />
        <TreeLine
          label="stateMasterclass.css"
          depth={2}
          active={Boolean(activeLecture)}
          subtle={!activeLecture}
        />
        <TreeLine
          label="week01-counter-assignment.css"
          depth={2}
          active={week01AssignmentOpen}
          subtle={!week01AssignmentOpen}
        />
        <TreeLine
          label="week02-recipe-gallery-assignment.css"
          depth={2}
          active={week02RecipeGalleryOpen}
          subtle={!week02RecipeGalleryOpen}
        />
        <TreeLine
          label="week02-managing-nested-state-assignment.css"
          depth={2}
          active={week02NestedStateOpen}
          subtle={!week02NestedStateOpen}
        />
        <TreeLine
          label="week02-taskmanager-assignment.css"
          depth={2}
          active={week02TaskManagerOpen}
          subtle={!week02TaskManagerOpen}
        />
        <TreeLine
          label="week03-shopping-list-immer-assignment.css"
          depth={2}
          active={week03ShoppingListOpen}
          subtle={!week03ShoppingListOpen}
        />
        <TreeLine
          label="week03-user-profile-immer-assignment.css"
          depth={2}
          active={week03UserProfileWithImmerOpen}
          subtle={!week03UserProfileWithImmerOpen}
        />
        <TreeLine
          label="week05-health-record-symmetry-assignment.css"
          depth={2}
          active={week05HealthRecordSymmetryOpen}
          subtle={!week05HealthRecordSymmetryOpen}
        />
        <TreeLine
          label="week05-recipe-router-gallery-assignment.css"
          depth={2}
          active={week05RecipeRouterGalleryOpen}
          subtle={!week05RecipeRouterGalleryOpen}
        />
        <TreeLine
          label="week05-blog-router-mpa-assignment.css"
          depth={2}
          active={week05BlogRouterMpaOpen}
          subtle={!week05BlogRouterMpaOpen}
        />
        <TreeLine
          label="week06-patient-record-merge-assignment.css"
          depth={2}
          active={week06PatientRecordMergeOpen}
          subtle={!week06PatientRecordMergeOpen}
        />
        <TreeLine
          label="week06-context-refactor-assignment.css"
          depth={2}
          active={week06ContextRefactorOpen}
          subtle={!week06ContextRefactorOpen}
        />
        <TreeLine
          label="week06-theme-switcher-assignment.css"
          depth={2}
          active={week06ThemeSwitcherOpen}
          subtle={!week06ThemeSwitcherOpen}
        />
        <TreeLine
          label="week07-ecommerce-order-processing-assignment.css"
          depth={2}
          active={week07OrderProcessingOpen}
          subtle={!week07OrderProcessingOpen}
        />
        <TreeLine
          label="week07-react-hook-form-registration-assignment.css"
          depth={2}
          active={week07ReactHookFormOpen}
          subtle={!week07ReactHookFormOpen}
        />
        <TreeLine
          label="week07-query-form-profile-integration-assignment.css"
          depth={2}
          active={week07QueryFormOpen}
          subtle={!week07QueryFormOpen}
        />
        <TreeLine
          label="week08-selection-sort-assignment.css"
          depth={2}
          active={week08SelectionSortOpen}
          subtle={!week08SelectionSortOpen}
        />
        <TreeLine
          label="week08-responsive-canvas-assignment.css"
          depth={2}
          active={week08ResponsiveCanvasOpen}
          subtle={!week08ResponsiveCanvasOpen}
        />
        <TreeLine
          label="week08-chartjs-poll-dashboard-assignment.css"
          depth={2}
          active={week08ChartJsOpen}
          subtle={!week08ChartJsOpen}
        />
        <TreeLine
          label="week09-bubble-sort-assignment.css"
          depth={2}
          active={week09BubbleSortOpen}
          subtle={!week09BubbleSortOpen}
        />
        <TreeLine
          label="week09-use-window-size-assignment.css"
          depth={2}
          active={week09UseWindowSizeOpen}
          subtle={!week09UseWindowSizeOpen}
        />
        <TreeLine
          label="week09-use-local-storage-assignment.css"
          depth={2}
          active={week09UseLocalStorageOpen}
          subtle={!week09UseLocalStorageOpen}
        />
        <TreeLine
          label="week10-insertion-sort-assignment.css"
          depth={2}
          active={week10InsertionSortOpen}
          subtle={!week10InsertionSortOpen}
        />
        <TreeLine
          label="week10-error-boundary-assignment.css"
          depth={2}
          active={week10ErrorBoundaryOpen}
          subtle={!week10ErrorBoundaryOpen}
        />
        <TreeLine
          label="assignment-test-panel.css"
          depth={2}
          active={week01AssignmentOpen || week02RecipeGalleryOpen || week02NestedStateOpen || week02TaskManagerOpen || week03ShoppingListOpen || week03UserProfileWithImmerOpen || week04DogQueryOpen || week04JsonPlaceholderCrudOpen || week05HealthRecordSymmetryOpen || week05RecipeRouterGalleryOpen || week05BlogRouterMpaOpen || week06PatientRecordMergeOpen || week06ContextRefactorOpen || week06ThemeSwitcherOpen || week07OrderProcessingOpen || week07ReactHookFormOpen || week07QueryFormOpen || week08SelectionSortOpen || week08ResponsiveCanvasOpen || week08ChartJsOpen || week09BubbleSortOpen || week09UseWindowSizeOpen || week09UseLocalStorageOpen || week10InsertionSortOpen}
          subtle={!(week01AssignmentOpen || week02RecipeGalleryOpen || week02NestedStateOpen || week03ShoppingListOpen || week03UserProfileWithImmerOpen || week04DogQueryOpen || week04JsonPlaceholderCrudOpen || week05HealthRecordSymmetryOpen || week05RecipeRouterGalleryOpen || week05BlogRouterMpaOpen || week06PatientRecordMergeOpen || week06ContextRefactorOpen || week06ThemeSwitcherOpen || week07OrderProcessingOpen || week07ReactHookFormOpen || week07QueryFormOpen || week08SelectionSortOpen || week08ResponsiveCanvasOpen || week08ChartJsOpen || week09BubbleSortOpen || week09UseWindowSizeOpen || week09UseLocalStorageOpen || week10InsertionSortOpen)}
        />

        <TreeLine label="App.jsx" depth={1} active />
        <TreeLine label="main.jsx" depth={1} />
      </div>
    </aside>
  )
}
