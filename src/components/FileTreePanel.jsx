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
                        : []

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
          label="week05/ ... week11/"
          depth={3}
          subtle={activeCourseId !== 'ad312' || ['week01', 'week02', 'week03', 'week04'].includes(selectedWeekId)}
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
          label="Week01CounterAssignmentGuide.jsx"
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
          label="Week02RecipeGalleryAssignmentGuide.jsx"
          depth={4}
          active={week02RecipeGalleryOpen}
          subtle={!week02RecipeGalleryOpen}
        />
        <TreeLine
          label="RecipeGalleryTestPanel.jsx"
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
          label="Week02ManagingNestedStateAssignmentGuide.jsx"
          depth={4}
          active={week02NestedStateOpen}
          subtle={!week02NestedStateOpen}
        />
        <TreeLine
          label="NestedStateTestPanel.jsx"
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
          label="Week02TaskManagerAssignmentGuide.jsx"
          depth={4}
          active={week02TaskManagerOpen}
          subtle={!week02TaskManagerOpen}
        />
        <TreeLine
          label="TaskManagerTestPanel.jsx"
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
          label="Week03ShoppingListWithImmerAssignmentGuide.jsx"
          depth={4}
          active={week03ShoppingListOpen}
          subtle={!week03ShoppingListOpen}
        />
        <TreeLine
          label="ShoppingListWithImmerTestPanel.jsx"
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
          label="Week03UserProfileWithImmerAssignmentGuide.jsx"
          depth={4}
          active={week03UserProfileWithImmerOpen}
          subtle={!week03UserProfileWithImmerOpen}
        />
        <TreeLine
          label="UserProfileWithImmerTestPanel.jsx"
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
          label="Week04DogApiTanStackQueryAssignmentGuide.jsx"
          depth={4}
          active={week04DogQueryOpen}
          subtle={!week04DogQueryOpen}
        />
        <TreeLine
          label="DogQueryTestPanel.jsx"
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
          label="Week04JsonPlaceholderCrudAssignmentGuide.jsx"
          depth={4}
          active={week04JsonPlaceholderCrudOpen}
          subtle={!week04JsonPlaceholderCrudOpen}
        />
        <TreeLine
          label="PostCrudTestPanel.jsx"
          depth={4}
          active={week04JsonPlaceholderCrudOpen}
          subtle={!week04JsonPlaceholderCrudOpen}
        />
        <TreeLine label="exercises/" depth={1} />
        <TreeLine label="Counter.jsx" depth={2} active={week01AssignmentOpen} subtle={!week01AssignmentOpen} />
        <TreeLine label="Counter.test.jsx" depth={2} active={week01AssignmentOpen} subtle={!week01AssignmentOpen} />
        <TreeLine
          label="RecipeGallery.jsx"
          depth={2}
          active={week02RecipeGalleryOpen}
          subtle={!week02RecipeGalleryOpen}
        />
        <TreeLine
          label="RecipeGallery.test.jsx"
          depth={2}
          active={week02RecipeGalleryOpen}
          subtle={!week02RecipeGalleryOpen}
        />
        <TreeLine
          label="UserProfile.jsx"
          depth={2}
          active={week02NestedStateOpen}
          subtle={!week02NestedStateOpen}
        />
        <TreeLine
          label="UserProfile.test.jsx"
          depth={2}
          active={week02NestedStateOpen}
          subtle={!week02NestedStateOpen}
        />
        <TreeLine
          label="TaskManager.jsx"
          depth={2}
          active={week02TaskManagerOpen}
          subtle={!week02TaskManagerOpen}
        />
        <TreeLine
          label="TaskManager.test.jsx"
          depth={2}
          active={week02TaskManagerOpen}
          subtle={!week02TaskManagerOpen}
        />
        <TreeLine
          label="ShoppingListWithImmer.jsx"
          depth={2}
          active={week03ShoppingListOpen}
          subtle={!week03ShoppingListOpen}
        />
        <TreeLine
          label="ShoppingListWithImmer.test.jsx"
          depth={2}
          active={week03ShoppingListOpen}
          subtle={!week03ShoppingListOpen}
        />
        <TreeLine
          label="UserProfileWithImmer.jsx"
          depth={2}
          active={week03UserProfileWithImmerOpen}
          subtle={!week03UserProfileWithImmerOpen}
        />
        <TreeLine
          label="UserProfileWithImmer.test.jsx"
          depth={2}
          active={week03UserProfileWithImmerOpen}
          subtle={!week03UserProfileWithImmerOpen}
        />

        <TreeLine
          label="DogQueryExplorer.jsx"
          depth={2}
          active={week04DogQueryOpen}
          subtle={!week04DogQueryOpen}
        />
        <TreeLine
          label="DogQueryExplorer.test.jsx"
          depth={2}
          active={week04DogQueryOpen}
          subtle={!week04DogQueryOpen}
        />
        <TreeLine
          label="PostCrudExplorer.jsx"
          depth={2}
          active={week04JsonPlaceholderCrudOpen}
          subtle={!week04JsonPlaceholderCrudOpen}
        />
        <TreeLine
          label="PostCrudExplorer.test.jsx"
          depth={2}
          active={week04JsonPlaceholderCrudOpen}
          subtle={!week04JsonPlaceholderCrudOpen}
        />
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
          label="assignment-test-panel.css"
          depth={2}
          active={week01AssignmentOpen || week02RecipeGalleryOpen || week02NestedStateOpen || week02TaskManagerOpen || week03ShoppingListOpen || week03UserProfileWithImmerOpen || week04DogQueryOpen || week04JsonPlaceholderCrudOpen}
          subtle={!(week01AssignmentOpen || week02RecipeGalleryOpen || week02NestedStateOpen || week02TaskManagerOpen || week03ShoppingListOpen || week03UserProfileWithImmerOpen || week04DogQueryOpen || week04JsonPlaceholderCrudOpen)}
        />

        <TreeLine label="App.jsx" depth={1} active />
        <TreeLine label="main.jsx" depth={1} />
      </div>
    </aside>
  )
}
