import { useEffect, useMemo, useRef, useState } from 'react'
import '../styles/stateMasterclass.css'
import CodeBlock from '../components/CodeBlock'
import { annotateDisplayedCode } from '../utils/educationalCode'

const SlideHeader = ({ title, bullets }) => (
  <div
    style={{
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '30px',
      borderRadius: '12px',
      marginBottom: '25px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
    }}
  >
    <h2 style={{ borderBottom: '2px solid #3498db', paddingBottom: '10px', marginTop: 0 }}>
      {title}
    </h2>
    <ul style={{ lineHeight: '1.8', fontSize: '1.05rem', marginBottom: 0 }}>
      {bullets.map((bullet) => (
        <li key={bullet}>{bullet}</li>
      ))}
    </ul>
  </div>
)

function SectionWrapper({
  title,
  slideData,
  description,
  rwTitle,
  rwContent,
  broadTitle,
  broadContent,
  narrowTitle,
  narrowContent,
  fullCode,
  explanation,
  children,
}) {
  return (
    <section className="sm-section">
      <h1 className="sm-title">{title}</h1>
      <SlideHeader title={slideData.title} bullets={slideData.bullets} />

      <p className="sm-description">
        <strong>Description:</strong> {description}
      </p>

      <div className="sm-grid">
        <div className="sm-panel">
          <h3>{rwTitle}</h3>
          <p className="sm-preline">{rwContent}</p>
        </div>

        <div className="sm-panel">
          <h3>{broadTitle}</h3>
          <p className="sm-preline">{broadContent}</p>
        </div>
      </div>

      <div className="sm-narrow">
        <h3>{narrowTitle}</h3>
        <p className="sm-preline">{narrowContent}</p>
      </div>

      <h3 className="sm-subheading">Full Code Example</h3>
      <CodeBlock code={annotateDisplayedCode(fullCode, 'react')} language="jsx" label="React JSX" />

      <h3 className="sm-subheading">Code in Action</h3>
      <div className="sm-demo-shell">{children}</div>

      <div className="sm-explanation">
        <h3>Simple Code Explanation</h3>
        <div className="sm-preline">{explanation}</div>
      </div>
    </section>
  )
}

function MutationIntroDemo() {
  const [status, setStatus] = useState('idle')
  const idRef = useRef(1)

  function registerBand() {
    setStatus('Registering band...')
    idRef.current += 1
  }

  return (
    <div>
      <h3>Band Registration Demo</h3>
      <button className="sm-button" onClick={registerBand}>Register Band</button>
      <p>{status}</p>
      <p>Registration ID: BAND-{idRef.current}</p>
    </div>
  )
}

function BasicMutationDemo() {
  const [posted, setPosted] = useState(false)
  const [pending, setPending] = useState(false)

  function postNotice() {
    setPending(true)
    setPosted(true)
    setPending(false)
  }

  return (
    <div>
      <h3>Park Notice Board</h3>
      <button className="sm-button" disabled={pending} onClick={postNotice}>Post Notice</button>
      {posted ? <p>Notice successfully posted!</p> : null}
    </div>
  )
}

function StatesDemo() {
  const [state, setState] = useState('idle')

  return (
    <div>
      <h3>Library Donation Entry</h3>
      <p>Current State: {state}</p>
      <button className="sm-button" onClick={() => setState('pending')}>Log Donation</button>
      <button className="sm-button" onClick={() => setState('success')}>Simulate Success</button>
      <button className="sm-button" onClick={() => setState('error')}>Simulate Error</button>
      <button className="sm-button ghost" onClick={() => setState('idle')}>Clear Status</button>
    </div>
  )
}

function ResultsDemo() {
  const [result, setResult] = useState(null)

  return (
    <div>
      <h3>League Portal</h3>
      <button
        className="sm-button"
        onClick={() => setResult({ division: 'Community Division', id: 'TEAM-104' })}
      >
        Submit Team Registration
      </button>
      {result ? (
        <div>
          <p>Assigned Division: {result.division}</p>
          <p>Reference Code: {result.id}</p>
        </div>
      ) : null}
    </div>
  )
}

function ResetDemo() {
  const [status, setStatus] = useState('ready')

  return (
    <div>
      <h3>Neighborhood Tool Library</h3>
      {status === 'ready' ? (
        <button className="sm-button" onClick={() => setStatus('error')}>Scan Power Drill</button>
      ) : null}
      {status === 'error' ? (
        <div>
          <p>Scan Failed: Tool is currently unavailable</p>
          <button className="sm-button ghost" onClick={() => setStatus('ready')}>Dismiss & Try New Tool</button>
        </div>
      ) : null}
    </div>
  )
}

function SideEffectsDemo() {
  const [trees, setTrees] = useState([])
  const idRef = useRef(1)

  function recordTree() {
    idRef.current += 1
    setTrees((currentTrees) => [...currentTrees, `Oak tree pin ${idRef.current}`])
  }

  return (
    <div>
      <h3>Tree Map</h3>
      <button className="sm-button" onClick={recordTree}>Record Planted Tree</button>
      <ul>{trees.map((tree) => <li key={tree}>{tree}</li>)}</ul>
    </div>
  )
}

function PracticalSideEffectsDemo() {
  const [checkedIn, setCheckedIn] = useState(false)

  return (
    <div>
      <h3>Vendor Check-In</h3>
      <button className="sm-button" onClick={() => setCheckedIn(true)}>Check In Vendor (Booth 42)</button>
      <p>{checkedIn ? 'Booth is ready!' : 'Booth needs check-in.'}</p>
      {checkedIn ? <button className="sm-button ghost" onClick={() => setCheckedIn(false)}>Rollback</button> : null}
    </div>
  )
}

function RecapSection() {
  const bestPractices = [
    'Use mutations for imperative write actions: create, update, delete, submit, check in, register, upload, or save.',
    'Treat mutation state as a user-feedback contract: disable duplicate actions while pending and show clear success or error outcomes.',
    'Use mutation.reset() when a success or error message should be cleared so the interface can support a clean next attempt.',
    'Use lifecycle hooks intentionally: onMutate prepares optimistic UI, onError rolls back, onSuccess confirms, and onSettled synchronizes related queries.',
  ]

  const recapRows = [
    ['Mutation', 'An imperative server write operation that changes remote data instead of only reading it.'],
    ['mutationFn', 'The Promise-returning function that performs the create, update, delete, upload, or save request.'],
    ['mutate', 'The command you call from an event handler to start the mutation with specific variables.'],
    ['isPending', 'The in-progress state used to block duplicate clicks and communicate that the write is running.'],
    ['reset', 'The method that clears success or error state and returns the mutation to idle.'],
    ['Lifecycle hooks', 'onMutate, onError, onSuccess, and onSettled coordinate optimistic UI, rollback, confirmation, and cache refresh.'],
  ]

  return (
    <section
      className="sm-section sm-recap-section"
      style={{
        backgroundColor: '#203141',
        color: 'white',
      }}
    >
      <h1 className="sm-title" style={{ color: 'white' }}>
        Best Practices and Recap
      </h1>

      <div className="sm-grid">
        <div className="sm-panel" style={{ background: 'rgba(255,255,255,0.08)', color: 'white' }}>
          <h3>Key Takeaways</h3>
          <ul className="sm-preline" style={{ marginBottom: 0 }}>
            {bestPractices.map((item) => (
              <li key={item} style={{ marginBottom: '10px' }}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="sm-panel" style={{ background: 'rgba(255,255,255,0.08)', color: 'white' }}>
          <h3>Concept Table</h3>
          <div style={{ display: 'grid', gap: '10px' }}>
            {recapRows.map(([term, meaning]) => (
              <div
                key={term}
                style={{
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  background: 'rgba(255,255,255,0.04)',
                }}
              >
                <strong>{term}:</strong> {meaning}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sm-explanation" style={{ background: 'rgba(255,255,255,0.08)', color: 'white' }}>
        <h3>Final Teaching Principle</h3>
        <p className="sm-preline" style={{ marginBottom: 0 }}>
          Queries describe the server data a screen wants to read. Mutations describe the user action that changes server data.
          A professional TanStack Query interface does not simply wait for the server; it gives immediate feedback,
          prepares for success, handles failure, and then brings the query cache back into alignment with the server truth.
        </p>
      </div>
    </section>
  )
}

const rawSlides = [
  {
    "title": "Introduction to Mutations",
    "slideData": {
      "title": "Data Modification with Tanstack Query",
      "bullets": [
        "Purpose of Mutations: Used for creating, updating, and deleting data.",
        "Key Tool: useMutation hook from Tanstack Query.",
        "Main Functions: Handle server-side effects and data modifications."
      ]
    },
    "description": "Mutations represent the \"write\" operations in a web application, distinguishing themselves from \"queries\" which are primarily for fetching or reading data. While queries are often cached and automatically re-fetched by Tanstack Query, mutations are imperative actions triggered by user interaction. The useMutation hook provides a standardized way to manage the lifecycle of these asynchronous operations, offering built-in states for tracking whether a request is currently loading, has failed, or has successfully modified the remote state. This centralization ensures that side effects—such as updating a database or clearing a local cache—are handled predictably.",
    "rwTitle": "Real-World Application",
    "rwContent": "A community music festival application where a volunteer needs to register a new local band for a performance slot. The act of submitting the band's details to the festival's database is a mutation.",
    "broadTitle": "Broad Scale Usage",
    "broadContent": "At an architectural level, mutations serve as the bridge between the client-side user interface and the persistent server-side state. By using a dedicated hook like useMutation, developers decouple the UI logic from the network transport logic. This allows for centralized error handling, optimistic updates (showing the change before the server confirms), and automatic synchronization of related data across the entire application once a change is confirmed.",
    "narrowTitle": "Narrowed Approach",
    "narrowContent": "Technically, useMutation accepts a function that returns a promise (the mutation function) and returns an object containing the mutate function and status variables. When the mutate function is called with specific variables, it executes the asynchronous logic, transitioning through 'pending', 'error', and 'success' states, which the UI can then use to disable buttons or show feedback.",
    "fullCode": "import { useMutation } from '@tanstack/react-query';\n\nconst createBandEntry = async (newBand) => {\n  const response = await fetch('https://api.musicfestival.com/bands', {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json',\n    },\n    body: JSON.stringify(newBand),\n  });\n  if (!response.ok) {\n    throw new Error('Network response was not ok');\n  }\n  return response.json();\n};\n\nfunction BandRegistration() {\n  const mutation = useMutation({\n    mutationFn: createBandEntry,\n    onSuccess: () => {\n      console.log('Band successfully registered!');\n    },\n    onError: (error) => {\n      console.error('Registration failed:', error);\n    },\n  });\n\n  const handleSubmit = () => {\n    const bandData = { name: 'The Sound Waves', genre: 'Jazz' };\n    mutation.mutate(bandData);\n  };\n\n  return (\n    <div>\n      {mutation.isPending ? (\n        <p>Registering band...</p>\n      ) : (\n        <>\n          {mutation.isError ? (\n            <p>Error: {mutation.error.message}</p>\n          ) : null}\n          <button onClick={handleSubmit}>Register Band</button>\n        </>\n      )}\n    </div>\n  );\n}",
    "explanation": "First, we define a function called createBandEntry. This function is a set of instructions for the computer to talk to a specific web address and send information about a new music band using the POST method. If the website says something went wrong, the function stops and reports an error. Inside the BandRegistration component, we use the useMutation hook. We tell this hook to use our createBandEntry instructions whenever it's time to save data. The hook gives us back a special \"mutation\" object. This object is like a smart assistant; it keeps track of what’s happening. When we click the 'Register Band' button, we call mutation.mutate. The assistant then starts the saving process. While it's working, the assistant sets mutation.isPending to true, so we can show the user a \"Registering...\" message. If the saving finishes correctly, the onSuccess part runs. If it fails, the assistant stores the error information in mutation.error so we can tell the user exactly what went wrong.",
    "demoName": "MutationIntroDemo"
  },
  {
    "title": "Basic Mutation Setup",
    "slideData": {
      "title": "Implementation of the useMutation Hook",
      "bullets": [
        "Mutation Function: Define how data changes interact with the server.",
        "Example: Adding a new todo item with axios.post.",
        "Trigger Mutation: Use mutate method to initiate data change."
      ]
    },
    "description": "This slide outlines the fundamental structure required to implement a mutation using Tanstack Query. The process is divided into two primary parts: definition and execution. In the definition phase, the useMutation hook is configured with a mutationFn. This function contains the actual asynchronous logic, such as an API call, that tells the server to modify data. In the execution phase, the developer uses the mutate method provided by the hook to fire off that logic. This separation allows the UI to stay reactive to the state of the mutation (like whether it is currently pending) while the background logic handles the network request.",
    "rwTitle": "Real-World Application",
    "rwContent": "Imagine a community bulletin board for a public park. When a visitor wants to post a notice about a lost set of keys, they fill out a digital form. Clicking the \"Post Notice\" button triggers the mutation setup to send that information to the park's central server.",
    "broadTitle": "Broad Scale Usage",
    "broadContent": "From a systems architecture perspective, this setup ensures that data-modifying requests are handled imperatively. Unlike data fetching, which can happen automatically on component mount, mutations require an explicit trigger. This prevents accidental duplicate data entries. Furthermore, by wrapping these requests in useMutation, the application gains a unified way to track \"in-flight\" requests across different components, ensuring the user interface remains synchronized with the server's state.",
    "narrowTitle": "Narrowed Approach",
    "narrowContent": "Technically, the mutationFn is a required property that must return a promise. The mutate function is then called with a single variable (often an object) which is passed directly as an argument to the mutationFn. In the provided code, newTodo is that argument. Tanstack Query manages the transition of states, such as setting isPending to true as soon as mutate is called and back to false once the promise resolves or rejects.",
    "fullCode": "import { useMutation } from '@tanstack/react-query';\nimport axios from 'axios';\n\nfunction ParkNoticeBoard() {\n  const mutation = useMutation({\n    mutationFn: (newNotice) => {\n      return axios.post('/api/notices', newNotice);\n    },\n  });\n\n  const handlePostNotice = () => {\n    const noticeDetails = {\n      id: new Date().toISOString(),\n      content: 'Lost keys found near the north fountain.',\n    };\n    \n    mutation.mutate(noticeDetails);\n  };\n\n  return (\n    <div>\n      <button \n        disabled={mutation.isPending}\n        onClick={handlePostNotice}\n      >\n        Post Notice\n      </button>\n\n      {mutation.isPending && <p>Uploading notice to the board...</p>}\n      {mutation.isError && <p>Failed to post notice. Please try again.</p>}\n      {mutation.isSuccess && <p>Notice successfully posted!</p>}\n    </div>\n  );\n}",
    "explanation": "In this code, we start by importing the necessary tools: useMutation for managing the action and axios for talking to the server. Inside our ParkNoticeBoard function, we set up our mutation \"engine.\" We tell it exactly what to do in the mutationFn section: \"Take whatever new notice info I give you and send it to the server using a POST request.\" Next, we create a function called handlePostNotice. This function is like the finger that flips the switch. It prepares the data—in this case, a message about lost keys—and then calls mutation.mutate(noticeDetails). This command tells the engine we set up earlier to start running. Inside the visual part of the code (the return block), we have a button. We've made the button smart: if mutation.isPending is true (meaning the engine is currently sending the data), the button becomes unclickable so the user doesn't accidentally send it twice. Below the button, we use \"conditional rendering.\" This means the computer checks the status of our engine. If it's currently working, it shows the text \"Uploading notice...\"; if it fails, it shows an error message; and if it finishes successfully, it shows a confirmation message. This keeps the user informed every step of the way.",
    "demoName": "BasicMutationDemo"
  },
  {
    "title": "States of a Mutation",
    "slideData": {
      "title": "Lifecycle and Status Tracking",
      "bullets": [
        "isIdle/idle: Mutation is ready to be executed or just reset.",
        "isPending/pending: Mutation is currently executing.",
        "isError/error: An error occurred during the mutation.",
        "isSuccess/success: Mutation completed successfully."
      ]
    },
    "description": "Managing asynchronous operations requires a clear understanding of the request's current lifecycle phase. Tanstack Query provides these four distinct states to help developers build responsive user interfaces. These boolean flags (like isPending) allow the application to react instantly to changes in the request status. By monitoring these states, a developer can ensure that the user is never left wondering if an action—such as clicking a submit button—actually did something. It transforms a silent background process into a transparent, interactive experience.",
    "rwTitle": "Real-World Application",
    "rwContent": "In a community library catalog system, a librarian uses a digital terminal to log a newly donated book. When the \"Log Donation\" button is clicked, the system moves from an \"Idle\" state to \"Pending\" while it contacts the database. If the internet goes down, it enters the \"Error\" state to warn the librarian; otherwise, it confirms success.",
    "broadTitle": "Broad Scale Usage",
    "broadContent": "At an architectural level, state tracking prevents \"UI desync,\" where the visual interface doesn't match the actual data on the server. By utilizing these standardized states across an entire application, development teams can implement consistent UX patterns for error handling and loading indicators. This reduces the need for custom state management (like useState for every single request) and centralizes the logic for how the application handles data-modifying side effects.",
    "narrowTitle": "Narrowed Approach",
    "narrowContent": "Technically, these states are derived from the internal state machine of the useMutation hook. isIdle is the initial state before mutate() is called. Once mutate() is invoked, the state transitions to isPending. Depending on whether the promise returned by the mutationFn resolves or rejects, the hook finally settles into either isSuccess or isError. Each state transition automatically triggers a re-render of the React component, allowing the UI to update in real-time.",
    "fullCode": "import { useMutation } from '@tanstack/react-query';\n\nconst logBookDonation = async (bookData) => {\n  const response = await fetch('https://api.community-library.org/donations', {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify(bookData),\n  });\n  if (!response.ok) throw new Error('Database connection failed');\n  return response.json();\n};\n\nfunction DonationPortal() {\n  const mutation = useMutation({\n    mutationFn: logBookDonation,\n  });\n\n  const handleDonation = () => {\n    mutation.mutate({ title: 'The Great Gatsby', condition: 'Excellent' });\n  };\n\n  return (\n    <div style={{ padding: '20px', border: '1px solid #ccc' }}>\n      <h3>Library Donation Entry</h3>\n      \n      {mutation.isIdle && (\n        <p>System ready. Please click below to log the new donation.</p>\n      )}\n\n      {mutation.isPending && (\n        <p style={{ color: 'blue' }}>Processing donation record... Please wait.</p>\n      )}\n\n      {mutation.isError && (\n        <p style={{ color: 'red' }}>Error: {mutation.error.message}</p>\n      )}\n\n      {mutation.isSuccess && (\n        <p style={{ color: 'green' }}>Record saved! The book has been added to the catalog.</p>\n      )}\n\n      <button \n        disabled={mutation.isPending} \n        onClick={handleDonation}\n      >\n        Log Donation\n      </button>\n\n      {(mutation.isError || mutation.isSuccess) && (\n        <button onClick={() => mutation.reset()} style={{ marginLeft: '10px' }}>\n          Clear Status\n        </button>\n      )}\n    </div>\n  );\n}",
    "explanation": "Think of the mutation state as a traffic light for your data. When the component first loads, the light is essentially white or \"Idle\"—it’s just sitting there waiting for you to do something. As soon as you click the \"Log Donation\" button, the code calls mutation.mutate(), and the light turns yellow or \"Pending.\" This tells the computer: \"I'm working on it, don't let the user click the button again yet!\" If the computer successfully sends the book information to the library's digital shelf, the light turns green or \"Success.\" This triggers the code to show a message saying the record was saved. However, if something goes wrong—like a broken internet connection—the light turns red or \"Error.\" The computer then looks inside the mutation.error box to find out exactly what went wrong and displays that message to the user. Finally, we added a \"Clear Status\" button that uses mutation.reset(). This basically turns the light back to white (\"Idle\"), clearing out the success or error messages so the librarian can start logging the next book from scratch.",
    "demoName": "StatesDemo"
  },
  {
    "title": "Handling Mutation Results",
    "slideData": {
      "title": "Processing Asynchronous Outcomes",
      "bullets": [
        "Error Handling: Access error property if mutation fails.",
        "Success Handling: Access data property on successful completion.",
        "UI Feedback: Update the user interface based on mutation state."
      ]
    },
    "description": "This slide emphasizes the importance of managing the data returned by a mutation, whether that result is a success or a failure. In a real-world application, a mutation doesn't just happen in a vacuum; the server usually responds with either the newly created object (success) or a specific error message (failure). Tanstack Query automatically populates the error and data properties of the mutation object based on the outcome of the mutationFn. This allows developers to create a reactive UI that provides meaningful feedback, such as displaying the specific reason a request failed or showing confirmation details directly from the server's response.",
    "rwTitle": "Real-World Application",
    "rwContent": "A community sports league coordinator uses a portal to register a new local soccer team. When the registration is submitted, the server might return a unique \"Team ID\" and a \"Division Assignment.\" The UI uses the data property to display these details to the coordinator immediately upon success.",
    "broadTitle": "Broad Scale Usage",
    "broadContent": "Architecturally, handling results within the mutation hook promotes a \"data-driven\" UI. Instead of relying on local state variables to mirror what we think happened on the server, we rely on the actual response stored in mutation.data. This ensures that the client-side state is an accurate reflection of the server-side reality. It also standardizes error handling across the application, as the error object provides a consistent interface for catching and displaying network or validation issues.",
    "narrowTitle": "Narrowed Approach",
    "narrowContent": "Technically, when the promise in mutationFn resolves, the resolved value is assigned to the data property. Conversely, if the promise rejects, the caught error is assigned to the error property. In React, because the mutation object is part of the component's state, any change to these properties triggers a re-render. This allows for declarative UI patterns using short-circuit evaluation (e.g., mutation.isError && <div>...</div>) to show or hide elements based on the result.",
    "fullCode": "import { useMutation } from '@tanstack/react-query';\n\nconst registerSoccerTeam = async (newTeam) => {\n  const response = await fetch('https://api.local-sports-league.org/teams', {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify(newTeam),\n  });\n  if (!response.ok) {\n    const errorData = await response.json();\n    throw new Error(errorData.message || 'League registration failed');\n  }\n  return response.json();\n};\n\nfunction TeamRegistration() {\n  const mutation = useMutation({\n    mutationFn: registerSoccerTeam,\n  });\n\n  const handleRegister = () => {\n    mutation.mutate({ name: 'North End United', colors: ['Blue', 'White'] });\n  };\n\n  return (\n    <div style={{ border: '2px solid black', padding: '15px' }}>\n      <h2>League Portal</h2>\n      <button onClick={handleRegister} disabled={mutation.isPending}>\n        Submit Team Registration\n      </button>\n\n      {mutation.isError && (\n        <div style={{ color: 'darkred', marginTop: '10px' }}>\n          <strong>Registration Error:</strong> {mutation.error.message}\n        </div>\n      )}\n\n      {mutation.isSuccess && (\n        <div style={{ color: 'darkgreen', marginTop: '10px' }}>\n          <strong>Success!</strong> Team Registered.\n          <p>Assigned Division: {mutation.data.division}</p>\n          <p>Reference Code: {mutation.data.id}</p>\n        </div>\n      )}\n    </div>\n  );\n}",
    "explanation": "Think of the mutation result as a \"receipt\" from the server. When you ask the code to register a soccer team, it goes off to talk to the league's main computer. Once it's done, it comes back with one of two things. If everything went perfectly, it brings back a \"Success Receipt,\" which Tanstack Query stores in mutation.data. This receipt contains information the league's computer generated, like which division the team was put into. In our code, we check mutation.isSuccess, and if it's true, we open that data box and show the user the division and their new reference code. If something went wrong—maybe the team name was already taken—the computer sends back an \"Error Report,\" which is stored in mutation.error. We check mutation.isError, and if it's true, we show a red warning message. We specifically look inside the error report (mutation.error.message) to tell the user exactly why the registration didn't work. This way, the user isn't just staring at a broken button; they know exactly what the server said happened.",
    "demoName": "ResultsDemo"
  },
  {
    "title": "Resetting Mutation State",
    "slideData": {
      "title": "Manually Clearing Mutation Status",
      "bullets": [
        "Reset Usage: Clear previous results or errors.",
        "Example: Resetting after an error to allow re-submission.",
        "User Interaction: Button or event to trigger state reset."
      ]
    },
    "description": "The reset function is a crucial utility provided by the useMutation hook that allows developers to manually return a mutation to its initial state. In many user interfaces, once an error occurs or a success message is displayed, the UI might become \"stuck\" in that state. For instance, an error message might block the view of a form, or a success confirmation might prevent a user from performing the same action again. By invoking mutation.reset(), the error and data properties are cleared, and the status flags like isError and isSuccess are set back to false. This essentially \"reboots\" the mutation's internal state machine, making the UI clean and ready for a fresh attempt or a new entry.",
    "rwTitle": "Real-World Application",
    "rwContent": "At a local neighborhood tool library, a member tries to check out a specialized power drill. If the system returns an error because the drill is already reserved, a \"Try Again\" or \"Clear\" button can trigger a reset. This removes the error alert and allows the member to immediately scan a different tool without refreshing the whole page.",
    "broadTitle": "Broad Scale Usage",
    "broadContent": "Architecturally, the reset method supports the principle of \"recoverable interfaces.\" It ensures that terminal states (success or failure) do not become permanent obstacles in a single-page application. By providing a standardized way to clear these states, Tanstack Query helps developers maintain a predictable flow of user interactions. This is especially important in complex forms or dashboards where multiple mutations might occur in sequence, as it prevents the \"ghosting\" of data from previous operations into the current view.",
    "narrowTitle": "Narrowed Approach",
    "narrowContent": "Technically, calling mutation.reset() updates the hook's internal state to status: 'idle'. This transition triggers a React re-render. Developers typically bind this function to an onClick handler of a \"Dismiss\" or \"Retry\" button. It is also common to call reset automatically when a user starts typing in an input field again, ensuring that old error messages disappear as soon as the user attempts to fix the problem.",
    "fullCode": "import { useMutation } from '@tanstack/react-query';\n\nconst checkoutTool = async (toolId) => {\n  const response = await fetch('https://api.neighborhood-tools.org/checkout', {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify({ id: toolId }),\n  });\n  if (!response.ok) throw new Error('Tool is currently unavailable');\n  return response.json();\n};\n\nfunction ToolScanner() {\n  const mutation = useMutation({\n    mutationFn: checkoutTool,\n  });\n\n  const handleScan = () => {\n    mutation.mutate('DRILL-X100');\n  };\n\n  return (\n    <div style={{ padding: '20px', textAlign: 'center' }}>\n      <h1>Neighborhood Tool Library</h1>\n      \n      {!mutation.isSuccess && !mutation.isError && (\n        <button onClick={handleScan} disabled={mutation.isPending}>\n          Scan Power Drill\n        </button>\n      )}\n\n      {mutation.isPending && <p>Verifying tool status...</p>}\n\n      {mutation.isError && (\n        <div style={{ background: '#ffdada', padding: '10px' }}>\n          <p>Scan Failed: {mutation.error.message}</p>\n          <button onClick={() => mutation.reset()}>Dismiss & Try New Tool</button>\n        </div>\n      )}\n\n      {mutation.isSuccess && (\n        <div style={{ background: '#daffda', padding: '10px' }}>\n          <p>Checkout Complete! Please return by Tuesday.</p>\n          <button onClick={() => mutation.reset()}>Scan Next Item</button>\n        </div>\n      )}\n    </div>\n  );\n}",
    "explanation": "The reset function is like the \"C\" (Clear) button on a calculator. When you use the mutation to check out a tool, the computer goes through a process. If it hits a snag, it displays an error message. Without a reset, that red error message would just stay on the screen forever, even if the person picked up a different tool to scan. In our code, we've added a button that says \"Dismiss & Try New Tool.\" When this button is clicked, it runs mutation.reset(). Instantly, Tanstack Query wipes the \"Error\" memory clean. It’s like magic—the error message disappears, and the original \"Scan\" button comes back. This is also useful after a success. Once the green \"Checkout Complete\" message shows up, the user can click the button to reset the system so they can scan the next tool in their pile. It keeps the screen organized and makes sure the user always knows what to do next.",
    "demoName": "ResetDemo"
  },
  {
    "title": "Advanced Use Cases - Side Effects",
    "slideData": {
      "title": "Mutation Lifecycle Hooks and Optimistic Logic",
      "bullets": [
        "Lifecycle Hooks: onMutate, onError, onSuccess, onSettled.",
        "Purpose: Manage side effects throughout the mutation process.",
        "Optimistic Updates: Prepare UI changes before mutation confirmation."
      ]
    },
    "description": "While basic mutations handle simple data changes, real-world applications often require complex coordination between the client and server. Lifecycle hooks are specialized functions that trigger at specific moments during a mutation's journey. onMutate fires the instant the request starts, onSuccess and onError trigger based on the result, and onSettled runs regardless of the outcome. These hooks allow developers to perform \"Optimistic Updates\"—a technique where the UI is updated immediately as if the request has already succeeded. This makes the application feel significantly faster by eliminating the perceived wait time of network latency.",
    "rwTitle": "Real-World Application",
    "rwContent": "In a community park tree-planting initiative, a volunteer uses an app to pin the location of a newly planted sapling. With optimistic updates, the pin appears on the shared map the moment they tap \"Drop Pin,\" even if the server takes a few seconds to record the coordinates.",
    "broadTitle": "Broad Scale Usage",
    "broadContent": "From an architectural perspective, these hooks serve as the \"orchestration layer\" for side effects. They allow developers to synchronize the local cache with the server without manual boilerplate. For example, onSuccess can be used to invalidate other related queries, forcing them to re-fetch and ensure the entire app reflects the new data. onMutate can return a \"context\" object containing the previous state, which onError can then use to roll back the UI if the server request fails, ensuring data integrity.",
    "narrowTitle": "Narrowed Approach",
    "narrowContent": "Technically, each hook receives specific arguments. onMutate receives the variables passed to mutate. onSuccess receives the server's data response and the variables. onError receives the error, the variables, and the context returned by onMutate. This \"Context Sharing\" is critical for error recovery. By returning a snapshot of the current data in onMutate, you ensure that onError has exactly what it needs to restore the previous state if the network call is unsuccessful.",
    "fullCode": "import { useMutation, useQueryClient } from '@tanstack/react-query';\n\nconst plantTree = async (newTree) => {\n  const response = await fetch('https://api.park-initiative.org/trees', {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify(newTree),\n  });\n  if (!response.ok) throw new Error('Failed to record tree location');\n  return response.json();\n};\n\nfunction TreeMap() {\n  const queryClient = useQueryClient();\n\n  const mutation = useMutation({\n    mutationFn: plantTree,\n    onMutate: async (newTree) => {\n      // Logic to snap current state for rollback would go here\n      console.log('Optimistically adding tree to map...');\n      return { temporaryId: Date.now() }; \n    },\n    onError: (error, variables, context) => {\n      console.error(\\`Rollback: Removing tree with temp ID \\${context.temporaryId}\\`);\n      alert(\\`Error: \\${error.message}. The map has been reset.\\`);\n    },\n    onSuccess: (data) => {\n      console.log(\\`Success: Tree officially recorded with server ID \\${data.id}\\`);\n      // Refresh the main tree list query\n      queryClient.invalidateQueries({ queryKey: ['trees'] });\n    },\n    onSettled: () => {\n      console.log('Mutation cycle complete.');\n    }\n  });\n\n  const handlePlanting = () => {\n    mutation.mutate({ species: 'Oak', lat: 47.6, lng: -122.3 });\n  };\n\n  return (\n    <div>\n      <button onClick={handlePlanting}>Record Planted Tree</button>\n      {mutation.isPending && <p>Syncing with park database...</p>}\n    </div>\n  );\n}",
    "explanation": "Lifecycle hooks are like a team of specialized assistants that handle different parts of a project. The onMutate assistant is the \"Early Bird.\" As soon as you click the button, it runs. Its job is to do things immediately, like showing a new icon on a map so the app feels fast. It can also \"take a picture\" of how things look right now and save it as \"context\" just in case things go wrong later. The onSuccess assistant is the \"Confirmation Officer.\" It only shows up if the server says \"Okay, I saved it!\" Its job is to do the final cleanup, like replacing a temporary ID with a real one from the server or telling other parts of the app to refresh their data. The onError assistant is the \"Cleanup Crew.\" If the server says \"Wait, I couldn't save that!\", this assistant jumps in. It looks at the \"picture\" taken by the Early Bird assistant and uses it to put the app back exactly the way it was before the error happened. The onSettled assistant is the \"Janitor.\" It doesn't care if the project succeeded or failed; it just shows up at the very end to turn off the loading lights or do any final chores. Together, they make sure the user sees a smooth, fast interface that knows how to fix itself if the internet cuts out.",
    "demoName": "SideEffectsDemo"
  },
  {
    "title": "Practical Example of Side Effects",
    "slideData": {
      "title": "Applying Lifecycle Hooks for UI Synchronization",
      "bullets": [
        "Before Mutation: Setup optimistic UI updates (onMutate).",
        "Handling Errors: Rollback optimistic updates on failure (onError).",
        "After Success: Confirm optimistic updates or further UI changes (onSuccess)."
      ]
    },
    "description": "This slide demonstrates the practical application of the lifecycle hooks introduced previously. It focuses on the sequential logic of a mutation and how each stage contributes to a robust user experience. By utilizing onMutate, the developer can \"prime\" the interface for success, creating a perceived performance boost. The onError and onSuccess hooks then act as the final arbiters of the UI's state, ensuring that the visual display either confirms the change once validated by the server or gracefully reverts to a stable previous state if a network or logic error occurs. This pattern is the gold standard for creating professional-grade asynchronous interfaces.",
    "rwTitle": "Real-World Application",
    "rwContent": "In a community craft fair portal, an organizer might want to mark a specific vendor booth as \"Checked In.\" The moment they tap the button, the booth turns green (optimistic update via onMutate). If the server confirms the check-in, the green status is finalized (onSuccess). If the server rejects the request—perhaps due to a duplicate entry—the booth instantly reverts to its original color (onError), preventing the organizer from having incorrect information.",
    "broadTitle": "Broad Scale Usage",
    "broadContent": "At a systems level, this pattern enforces \"State Integrity.\" Without these hooks, the client and server can easily fall out of sync, leading to a confusing experience where a user thinks an action was successful when it actually failed. By standardizing these side effects within the useMutation hook, the architecture becomes \"self-healing.\" This reduces the complexity of manual state management across disparate components, as the mutation logic itself handles the transitions between speculative, confirmed, and failed states.",
    "narrowTitle": "Narrowed Approach",
    "narrowContent": "Technically, the onMutate hook is unique because its return value becomes the context argument for onError, onSuccess, and onSettled. This allows for a \"snapshot and restore\" mechanism. Developers use onMutate to record the current state of the data in the cache, then onError uses that recorded state to perform a rollback. This ensures that the user interface never remains in a \"lied to\" state after a request failure.",
    "fullCode": "import { useMutation, useQueryClient } from '@tanstack/react-query';\n\nconst updateBoothStatus = async (boothId) => {\n  const response = await fetch(\\`https://api.craft-fair.com/booths/\\${boothId}/checkin\\`, {\n    method: 'PATCH',\n  });\n  if (!response.ok) throw new Error('Could not update booth status');\n  return response.json();\n};\n\nfunction VendorCheckIn() {\n  const queryClient = useQueryClient();\n\n  const mutation = useMutation({\n    mutationFn: updateBoothStatus,\n    onMutate: async (boothId) => {\n      // Step 1: Cancel any outgoing refetches (so they don't overwrite our optimistic update)\n      await queryClient.cancelQueries({ queryKey: ['booths', boothId] });\n\n      // Step 2: Snapshot the previous value\n      const previousBooth = queryClient.getQueryData(['booths', boothId]);\n\n      // Step 3: Optimistically update the UI\n      console.log('Optimistically marking booth as Checked In');\n      \n      // Return context object with snapshotted value\n      return { previousBooth };\n    },\n    onError: (err, boothId, context) => {\n      // Step 4: Roll back to the previous state using the context\n      console.error('Error occurred, rolling back booth status');\n      queryClient.setQueryData(['booths', boothId], context.previousBooth);\n    },\n    onSuccess: (data) => {\n      // Step 5: Finalize and confirm\n      console.log('Booth status successfully confirmed on server');\n    },\n    onSettled: (data, error, boothId) => {\n      // Step 6: Always refetch after error or success to keep data in sync\n      queryClient.invalidateQueries({ queryKey: ['booths', boothId] });\n    },\n  });\n\n  return (\n    <div>\n      <button onClick={() => mutation.mutate('BOOTH_42')}>\n        Check In Vendor (Booth 42)\n      </button>\n      {mutation.isPending && <span>Updating...</span>}\n      {mutation.isError && <span style={{ color: 'red' }}>Update failed!</span>}\n      {mutation.isSuccess && <span style={{ color: 'green' }}>Booth is ready!</span>}\n    </div>\n  );\n}",
    "explanation": "This code acts like a very careful record-keeper for a craft fair. When the organizer clicks \"Check In,\" the onMutate assistant immediately jumps into action. It \"freezes\" the current records and takes a quick note of what the booth looked like before. Then, it changes the booth to \"Checked In\" right away so the organizer sees instant results. It hands that note (the \"previousBooth\" info) over to the system as \"context.\" If everything goes well, the onSuccess assistant simply logs a success message, confirming that the change we showed the organizer matches the server. However, if the server says \"Stop! There's an error!\", the onError assistant takes that note (the \"context\") we saved earlier. It uses the information in that note to change the booth back to its old status. This way, if the internet died, the booth doesn't stay green incorrectly—it goes back to showing it still needs check-in. Finally, the onSettled assistant makes sure to double-check the server one last time by refreshing the data. This \"Snapshot, Change, and Rollback\" process ensures the app is always fast but never wrong.",
    "demoName": "PracticalSideEffectsDemo"
  }
]

const demoRegistry = {
  MutationIntroDemo,
  BasicMutationDemo,
  StatesDemo,
  ResultsDemo,
  ResetDemo,
  SideEffectsDemo,
  PracticalSideEffectsDemo,
}

const slides = rawSlides.map((slide) => ({
  ...slide,
  Demo: demoRegistry[slide.demoName],
}))

export default function Week04IntroToMutationsTanStackQueryMasterclass({ onBack, onSectionChange }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [sectionsCollapsed, setSectionsCollapsed] = useState(false)
  const activeSection = useMemo(() => slides[activeIndex], [activeIndex])
  const ActiveDemo = activeSection?.Demo

  useEffect(() => {
    if (!onSectionChange) return

    if (activeIndex < slides.length) {
      onSectionChange({ index: activeIndex + 1, title: activeSection.title })
      return
    }

    onSectionChange({ index: slides.length + 1, title: 'Best Practices and Recap' })
  }, [activeIndex, activeSection, onSectionChange])

  return (
    <div className="sm-page">
      <div className="sm-toolbar">
        <button className="sm-button ghost" onClick={onBack}>
          ← Back to Week 04
        </button>
        <div className="sm-toolbar-copy">
          <p className="sm-kicker">AD312 • Week 04 • Lecture 05</p>
          <h2>Introduction to Mutations in TanStack Query</h2>
        </div>
      </div>

      <div className={`sm-layout ${sectionsCollapsed ? 'sm-layout-sidebar-collapsed' : ''}`}>
        <aside className={`sm-sidebar ${sectionsCollapsed ? 'collapsed' : ''}`}>
          <div className="sm-sidebar-header">
            <div className="sm-sidebar-label">Lecture Sections</div>
            <button
              type="button"
              className="sm-sidebar-toggle"
              aria-label={sectionsCollapsed ? 'Show lecture sections' : 'Hide lecture sections'}
              aria-expanded={!sectionsCollapsed}
              onClick={() => setSectionsCollapsed((isCollapsed) => !isCollapsed)}
            >
              <span aria-hidden="true">{sectionsCollapsed ? '›' : '‹'}</span>
            </button>
          </div>
          {slides.map((section, index) => (
            <button
              key={section.title}
              className={index === activeIndex ? 'sm-nav-button active' : 'sm-nav-button'}
              type="button"
              onClick={() => setActiveIndex(index)}
            >
              <span className="sm-nav-step">{String(index + 1).padStart(2, '0')}</span>
              {section.title}
            </button>
          ))}
          <button
            className={activeIndex === slides.length ? 'sm-nav-button active' : 'sm-nav-button'}
            type="button"
            onClick={() => setActiveIndex(slides.length)}
          >
            <span className="sm-nav-step">{String(slides.length + 1).padStart(2, '0')}</span>
            Best Practices and Recap
          </button>
        </aside>

        <main className="sm-content">
          {activeIndex < slides.length ? (
            <SectionWrapper {...activeSection}>{ActiveDemo ? <ActiveDemo /> : null}</SectionWrapper>
          ) : (
            <RecapSection />
          )}
        </main>
      </div>
    </div>
  )
}

