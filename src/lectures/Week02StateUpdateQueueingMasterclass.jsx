import { useEffect, useMemo, useState } from 'react'
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
    <ul style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
      {bullets.map((bullet, index) => (
        <li key={index}>{bullet}</li>
      ))}
    </ul>
  </div>
)

function SectionWrapper({
  title,
  description,
  rwTitle,
  rwContent,
  broadTitle,
  broadContent,
  narrowTitle,
  narrowContent,
  fullCode,
  explanation,
  slideData,
  children,
}) {
  return (
    <section className="sm-section">
      <h1 className="sm-title">{title}</h1>
      <SlideHeader {...slideData} />

      <p className="sm-description">
        <strong>Description:</strong> {description}
      </p>

      <div className="sm-grid">
        <div className="sm-panel">
          <h3>Real-World Context: {rwTitle}</h3>
          <p className="sm-preline">{rwContent}</p>
        </div>

        <div className="sm-panel">
          <h3>The Broad Scale: {broadTitle}</h3>
          <p className="sm-preline">{broadContent}</p>
        </div>
      </div>

      <div className="sm-narrow">
        <h3>The Narrow Approach: {narrowTitle}</h3>
        <p className="sm-preline">{narrowContent}</p>
      </div>

      <h3 className="sm-subheading">Full Code Example</h3>
      <CodeBlock
        code={annotateDisplayedCode(fullCode, 'react')}
        language="jsx"
        label="React JSX"
      />

      <h3 className="sm-subheading">Code in Action</h3>
      <div className="sm-demo-shell">{children}</div>

      <div className="sm-explanation">
        <h3>Simple Code Explanation</h3>
        <div className="sm-preline">{explanation}</div>
      </div>
    </section>
  )
}

function MultiStepOnboarding() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({ role: '', permissions: [] })

  function updatePermissions(permission) {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((entry) => entry !== permission)
        : [...prev.permissions, permission],
    }))
  }

  return (
    <div
      style={{
        padding: '20px',
        maxWidth: '400px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Account Setup: Step {step} of 3
      </h2>

      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <p>Select your primary workspace role:</p>
          {['Admin', 'Editor', 'Viewer'].map((role) => (
            <button
              key={role}
              onClick={() => {
                setFormData({ ...formData, role })
                setStep(2)
              }}
              style={{
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {role}
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <p>Grant granular access:</p>
          {['Analytics', 'Billing', 'User Management'].map((permission) => (
            <label
              key={permission}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <input
                type="checkbox"
                onChange={() => updatePermissions(permission)}
                checked={formData.permissions.includes(permission)}
              />
              <span>{permission}</span>
            </label>
          ))}

          <button
            onClick={() => setStep(3)}
            style={{
              marginTop: '10px',
              backgroundColor: 'black',
              color: 'white',
              padding: '10px',
              borderRadius: '4px',
            }}
          >
            Review Details
          </button>
        </div>
      )}

      {step === 3 && (
        <div style={{ background: '#f3f4f6', padding: '15px', borderRadius: '4px' }}>
          <p>
            <strong>Role:</strong> {formData.role}
          </p>
          <p>
            <strong>Access:</strong> {formData.permissions.join(', ') || 'None'}
          </p>
          <button
            onClick={() => setStep(1)}
            style={{
              color: '#3b82f6',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              marginTop: '10px',
            }}
          >
            Restart
          </button>
        </div>
      )}
    </div>
  )
}

function DashboardFilterSystem() {
  const [filters, setFilters] = useState({
    view: 'grid',
    priority: 'all',
    showArchived: false,
  })

  function toggleView() {
    setFilters((prev) => ({
      ...prev,
      view: prev.view === 'grid' ? 'list' : 'grid',
    }))
  }

  function updatePriority(priority) {
    setFilters((prev) => ({
      ...prev,
      priority,
    }))
  }

  return (
    <div
      style={{
        padding: '20px',
        border: '1px solid #eee',
        borderRadius: '8px',
        background: '#fafafa',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <h3 style={{ margin: 0 }}>Project Pipeline</h3>
        <button
          onClick={toggleView}
          style={{
            padding: '5px 10px',
            background: 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        >
          Switch to {filters.view === 'grid' ? 'List' : 'Grid'} View
        </button>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        {['all', 'high', 'low'].map((priority) => (
          <button
            key={priority}
            onClick={() => updatePriority(priority)}
            style={{
              padding: '5px 15px',
              borderRadius: '20px',
              border: 'none',
              background: filters.priority === priority ? '#2563eb' : '#e5e7eb',
              color: filters.priority === priority ? 'white' : 'black',
              cursor: 'pointer',
            }}
          >
            {priority} Priority
          </button>
        ))}
      </div>

      <div
        style={{
          padding: '40px',
          background: 'white',
          border: '2px dashed #ccc',
          borderRadius: '8px',
          textAlign: 'center',
          color: '#999',
        }}
      >
        Displaying {filters.priority} priority items in {filters.view} mode.
      </div>
    </div>
  )
}

function MultiLayerSecurityGate() {
  const [accessLogs, setAccessLogs] = useState([])
  const [systemStatus, setSystemStatus] = useState('Idle')
  const [securityLevel, setSecurityLevel] = useState(1)

  async function runSystemDiagnostic() {
    setSystemStatus('Scanning...')
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSystemStatus('Active')
    setSecurityLevel(3)
    setAccessLogs((prev) => [...prev, `Scan completed at ${new Date().toLocaleTimeString()}`])
  }

  return (
    <div
      style={{
        padding: '20px',
        background: '#0f172a',
        color: '#4ade80',
        fontFamily: 'monospace',
        borderRadius: '8px',
      }}
    >
      <h2
        style={{
          borderBottom: '1px solid #064e3b',
          paddingBottom: '10px',
          marginBottom: '15px',
        }}
      >
        Terminal: Security Root
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '15px',
          marginBottom: '20px',
        }}
      >
        <div style={{ border: '1px solid #064e3b', padding: '10px' }}>
          <p style={{ fontSize: '0.7rem', color: '#15803d', margin: 0 }}>SYSTEM_STATUS</p>
          <p style={{ fontSize: '1.1rem', margin: 0 }}>{systemStatus}</p>
        </div>

        <div style={{ border: '1px solid #064e3b', padding: '10px' }}>
          <p style={{ fontSize: '0.7rem', color: '#15803d', margin: 0 }}>AUTH_LEVEL</p>
          <p style={{ fontSize: '1.1rem', margin: 0 }}>LVL_{securityLevel}</p>
        </div>
      </div>

      <button
        onClick={runSystemDiagnostic}
        style={{
          width: '100%',
          padding: '10px',
          background: '#064e3b',
          color: '#d1fae5',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        EXECUTE DIAGNOSTIC_OVERRIDE
      </button>

      <div
        style={{
          marginTop: '15px',
          height: '80px',
          overflowY: 'auto',
          background: 'black',
          padding: '10px',
          fontSize: '0.75rem',
        }}
      >
        {accessLogs.map((log, index) => (
          <div key={index}>{`> ${log}`}</div>
        ))}
      </div>
    </div>
  )
}

function MultiStageApprovalWorkflow() {
  const [workflowStatus, setWorkflowStatus] = useState({
    stage: 'Draft',
    approvals: 0,
    isLocked: false,
  })

  function handleRapidApproval() {
    setWorkflowStatus((prev) => ({ ...prev, approvals: prev.approvals + 1 }))
    setWorkflowStatus((prev) => ({ ...prev, approvals: prev.approvals + 1 }))
    setWorkflowStatus((prev) => ({
      ...prev,
      approvals: prev.approvals + 1,
      stage: 'Final Review',
      isLocked: true,
    }))
  }

  return (
    <div
      style={{
        padding: '20px',
        borderLeft: '4px solid #f59e0b',
        background: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', fontFamily: 'monospace' }}>
        DOCUMENT_ID: RFQ-992
      </h2>

      <div style={{ margin: '20px 0' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.8rem',
            marginBottom: '5px',
          }}
        >
          <span>Current Stage:</span>
          <span style={{ fontWeight: 'bold', color: '#d97706' }}>{workflowStatus.stage}</span>
        </div>

        <div
          style={{
            width: '100%',
            background: '#e5e7eb',
            height: '8px',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              background: '#f59e0b',
              height: '100%',
              width: `${(workflowStatus.approvals / 3) * 100}%`,
              transition: 'width 0.5s ease',
            }}
          />
        </div>
      </div>

      <button
        disabled={workflowStatus.isLocked}
        onClick={handleRapidApproval}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '4px',
          border: 'none',
          fontWeight: 'bold',
          background: workflowStatus.isLocked ? '#f3f4f6' : '#fef3c7',
          color: workflowStatus.isLocked ? '#9ca3af' : '#92400e',
          cursor: workflowStatus.isLocked ? 'not-allowed' : 'pointer',
        }}
      >
        {workflowStatus.isLocked ? 'ARCHIVED / LOCKED' : 'EXECUTE TRIPLE APPROVAL'}
      </button>
    </div>
  )
}

function DynamicSystemPermissions() {
  const [accessRoles, setAccessRoles] = useState(['Guest'])

  function upgradeToModerator() {
    setAccessRoles((prev) => prev.filter((role) => role !== 'Guest'))
    setAccessRoles((prev) => [...prev, 'Standard_User'])
    setAccessRoles((prev) => [...prev, 'Moderator_Beta'])
  }

  return (
    <div
      style={{
        padding: '20px',
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        maxWidth: '320px',
      }}
    >
      <h3
        style={{
          fontSize: '0.8rem',
          textTransform: 'uppercase',
          color: '#64748b',
          letterSpacing: '0.1em',
          marginBottom: '15px',
        }}
      >
        User Privilege Matrix
      </h3>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginBottom: '20px',
        }}
      >
        {accessRoles.map((role) => (
          <div
            key={role}
            style={{
              padding: '5px 10px',
              background: 'white',
              border: '1px solid #cbd5e1',
              fontSize: '0.75rem',
              fontFamily: 'monospace',
              borderRadius: '4px',
            }}
          >
            {role}
          </div>
        ))}
      </div>

      <button
        onClick={upgradeToModerator}
        style={{
          width: '100%',
          padding: '10px',
          background: '#4f46e5',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '0.9rem',
          cursor: 'pointer',
        }}
      >
        Elevate Account Status
      </button>
    </div>
  )
}

function DataExportOrchestrator() {
  const [exportTask, setExportTask] = useState({
    status: 'idle',
    progress: 0,
    logs: [],
  })

  function startEmergencyExport() {
    setExportTask({
      status: 'initializing',
      progress: 10,
      logs: ['Emergency Triggered'],
    })
    setExportTask((prev) => ({
      ...prev,
      progress: prev.progress + 15,
      logs: [...prev.logs, 'Applying security protocols...'],
    }))
    setExportTask((prev) => ({
      ...prev,
      status: 'active',
      logs: [...prev.logs, 'Export stream established.'],
    }))
  }

  return (
    <div
      style={{
        padding: '20px',
        background: '#f9fafb',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '15px',
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: '1.1rem' }}>System Exporter</h2>
          <p style={{ margin: 0, fontSize: '0.7rem', color: '#6b7280' }}>
            Status: {exportTask.status.toUpperCase()}
          </p>
        </div>

        <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#4f46e5' }}>
          {exportTask.progress}%
        </div>
      </div>

      <div
        style={{
          background: '#e5e7eb',
          height: '12px',
          borderRadius: '6px',
          marginBottom: '20px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            background: '#6366f1',
            height: '100%',
            width: `${exportTask.progress}%`,
            transition: 'width 0.7s ease',
          }}
        />
      </div>

      <button
        onClick={startEmergencyExport}
        style={{
          width: '100%',
          padding: '12px',
          background: '#dc2626',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        FORCED DATA BYPASS
      </button>

      <div
        style={{
          marginTop: '15px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        {exportTask.logs.map((log, index) => (
          <p
            key={index}
            style={{
              margin: 0,
              fontSize: '10px',
              color: '#9ca3af',
              fontStyle: 'italic',
              fontFamily: 'monospace',
            }}
          >
            {`> ${log}`}
          </p>
        ))}
      </div>
    </div>
  )
}

function DynamicProjectDashboard() {
  const [activeBoard, setActiveBoard] = useState({
    boardName: 'Engineering Sprint',
    lastModified: '2026-04-15',
    isArchived: false,
  })

  function handleArchiveTransition() {
    setActiveBoard((prevBoard) => ({
      ...prevBoard,
      isArchived: !prevBoard.isArchived,
      lastModified: new Date().toISOString().split('T')[0],
    }))
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#f9fafb',
        padding: '20px',
        borderRadius: '8px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '320px',
          padding: '24px',
          borderRadius: '16px',
          transition: 'all 0.5s',
          background: activeBoard.isArchived ? '#1f2937' : 'white',
          color: activeBoard.isArchived ? '#9ca3af' : '#1f2937',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
          filter: activeBoard.isArchived ? 'grayscale(1)' : 'none',
        }}
      >
        <h2 style={{ margin: '0 0 16px 0', fontSize: '1.25rem', fontWeight: '900' }}>
          {activeBoard.boardName}
        </h2>
        <p style={{ fontSize: '0.75rem', marginBottom: '24px' }}>
          Last Sync: {activeBoard.lastModified}
        </p>
        <button
          onClick={handleArchiveTransition}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '12px',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer',
            background: activeBoard.isArchived ? '#2563eb' : 'black',
            color: 'white',
          }}
        >
          {activeBoard.isArchived ? 'RESTORE PROJECT' : 'ARCHIVE REPOSITORY'}
        </button>
      </div>
    </div>
  )
}

function RecapSection() {
  return (
    <section className="sm-section">
      <div
        style={{
          backgroundColor: '#203141',
          color: 'white',
          padding: '60px',
          borderRadius: '20px',
        }}
      >
        <h1 style={{ textAlign: 'center', fontSize: '2.5rem' }}>Recap and Best Practices</h1>
        <p style={{ textAlign: 'center', color: '#3498db', fontSize: '1.2rem' }}>
          The React State Journey
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            marginTop: '40px',
          }}
        >
          <div>
            <h3>1. State as a Managed Snapshot</h3>
            <p>
              React creates a fixed view of the data for every render. You are never
              interacting with a “live” variable, but rather a snapshot that remains
              constant for the life of that specific function call.
            </p>

            <h3>2. The Asynchronous Nature of Updates</h3>
            <p>
              React prioritizes performance by grouping updates. When you trigger
              state changes, you are scheduling a future render, not executing an
              immediate transformation of the current UI.
            </p>

            <p style={{ color: '#3498db' }}>
              <strong>Best Practice:</strong> Use the updater function pattern{' '}
              <code>{`setVal((prev) => prev + 1)`}</code> to avoid stale data.
            </p>
          </div>

          <div>
            <h3>3. Each Render Has Its Own Snapshot</h3>
            <p>
              Event handlers “see” the version of state that existed when the render
              was triggered. This capture ensures UI consistency but requires
              functional updaters for sequential logic.
            </p>

            <h3>4. Summary of Key Concepts</h3>
            <table style={{ width: '100%', textAlign: 'left', borderTop: '1px solid #3498db' }}>
              <thead>
                <tr>
                  <th>Concept</th>
                  <th>Simple Terms</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Batching</td>
                  <td>The restaurant waiter taking the whole order at once.</td>
                </tr>
                <tr>
                  <td>Snapshots</td>
                  <td>A polaroid photo that captures a moment in time.</td>
                </tr>
                <tr>
                  <td>Updaters</td>
                  <td>A recipe for change rather than a final product.</td>
                </tr>
                <tr>
                  <td>Purity</td>
                  <td>A photocopy machine that does not change the original paper.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div
          style={{
            marginTop: '50px',
            padding: '30px',
            background: 'rgba(52, 152, 219, 0.1)',
            borderLeft: '5px solid #3498db',
            borderRadius: '10px',
          }}
        >
          <h3 style={{ textAlign: 'center', color: '#3498db' }}>
            Final Best Practice: Isolated Memory
          </h3>
          <p style={{ textAlign: 'center' }}>
            Keep state local to maintain a clean and maintainable architecture. By
            isolating memory, you ensure that complex updates stay predictable and
            re-renders remain highly targeted, resulting in a snappier and more
            efficient user experience.
          </p>
        </div>
      </div>
    </section>
  )
}

const sections = [
  {
    title: 'Introduction to React and State Management',
    description:
      'React is a declarative JavaScript library where the UI is a function of state. State management is the process of managing the data that changes over time within an application. When state changes, React automatically triggers a re-render, calculates the difference between the previous and current state, and updates the DOM efficiently.',
    slideData: {
      title: 'Concept: Introduction to React and State Management',
      bullets: [
        'Introduction to React',
        'Importance of state management',
        'Overview of state updates and re-renders',
      ],
    },
    rwTitle: 'Netflix',
    rwContent:
      'Netflix uses complex state management for its Billboard Hero section. When a user hovers over a movie title, the state transitions from a static image to a video preview. That state change must be managed carefully so the video fetches and plays only when the specific UI element is active.',
    broadTitle: 'Architectural Logic',
    broadContent:
      'At an architectural level, state management ensures UI consistency. By lifting state to a common ancestor, multiple components can stay in sync. This prevents “zombie data,” where one part of the screen shows a stale value while another shows the update.',
    narrowTitle: 'Batching of Updates',
    narrowContent:
      'A critical logic detail is batching. React groups multiple state updates into a single re-render cycle for performance. In modern React (18+), this automatic batching happens even inside promises and setTimeouts, reducing the overhead of reconciliation.',
    fullCode: `import React, { useState } from 'react';

const MultiStepOnboarding = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ role: '', permissions: [] });

  const updatePermissions = (perm) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(perm)
        ? prev.permissions.filter((p) => p !== perm)
        : [...prev.permissions, perm],
    }));
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Account Setup: Step {step} of 3</h2>

      {step === 1 && (
        <div className="space-y-4">
          <p>Select your primary workspace role:</p>
          {['Admin', 'Editor', 'Viewer'].map((role) => (
            <button
              key={role}
              onClick={() => {
                setFormData({ ...formData, role });
                setStep(2);
              }}
              className="block w-full p-2 border rounded hover:bg-blue-50"
            >
              {role}
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-2">
          <p>Grant granular access:</p>
          {['Analytics', 'Billing', 'User Management'].map((permission) => (
            <label key={permission} className="flex items-center space-x-2">
              <input
                type="checkbox"
                onChange={() => updatePermissions(permission)}
                checked={formData.permissions.includes(permission)}
              />
              <span>{permission}</span>
            </label>
          ))}
          <button onClick={() => setStep(3)} className="mt-4 bg-black text-white px-4 py-2 rounded">
            Review Details
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="bg-gray-100 p-4 rounded">
          <p><strong>Role:</strong> {formData.role}</p>
          <p><strong>Access:</strong> {formData.permissions.join(', ') || 'None'}</p>
          <button onClick={() => setStep(1)} className="text-sm text-blue-500 mt-2">Restart</button>
        </div>
      )}
    </div>
  );
};`,
    explanation: `1. We use useState(1) to create the current step.
2. useState returns two values: the current state and the setter function.
3. Inside updatePermissions, the spread operator copies the previous object so React receives a new reference.
4. Conditional rendering with step === 1, step === 2, and step === 3 keeps each stage isolated and predictable.`,
    demo: <MultiStepOnboarding />,
  },
  {
    title: 'The Basics of State Updates',
    description:
      'The useState hook is the fundamental building block for reactivity in React. When a state setter function is called, React does not immediately change the variable; instead, it schedules a re-render. During this process, React re-executes the component function, calculates the new UI based on the updated state, and applies the necessary changes to the DOM.',
    slideData: {
      title: 'Concept: The Basics of State Updates',
      bullets: [
        'useState hook for local state',
        'Setting state schedules re-renders',
        'React reactivity and dynamic UI updates',
      ],
    },
    rwTitle: 'Spotify',
    rwContent:
      'Spotify uses basic state updates for its Play/Pause toggle. When you click play, a local state value changes from false to true. That single update triggers multiple visual changes without manually poking the DOM.',
    broadTitle: 'Declarative UI',
    broadContent:
      'This is the heart of declarative UI. Instead of telling the browser exactly how to change each element, you describe what the interface should look like for each state. React handles the DOM work for you.',
    narrowTitle: 'Asynchronous Nature of State',
    narrowContent:
      'Because React batches updates, reading a state variable immediately after calling its setter still gives you the old value from the current render. React preserves that snapshot until the next render runs.',
    fullCode: `import React, { useState } from 'react';

const DashboardFilterSystem = () => {
  const [filters, setFilters] = useState({
    view: 'grid',
    priority: 'all',
    showArchived: false,
  });

  const toggleView = () => {
    setFilters((prev) => ({
      ...prev,
      view: prev.view === 'grid' ? 'list' : 'grid',
    }));
  };

  const updatePriority = (level) => {
    setFilters((prev) => ({ ...prev, priority: level }));
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Project Pipeline</h3>
        <button onClick={toggleView} className="px-3 py-1 bg-white border rounded shadow-sm text-sm">
          Switch to {filters.view === 'grid' ? 'List' : 'Grid'} View
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        {['all', 'high', 'low'].map((priority) => (
          <button
            key={priority}
            onClick={() => updatePriority(priority)}
            className={\`px-4 py-1 rounded-full text-xs capitalize \${
              filters.priority === priority ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }\`}
          >
            {priority} Priority
          </button>
        ))}
      </div>

      <div className={\`gap-4 \${filters.view === 'grid' ? 'grid grid-cols-2' : 'flex flex-col'}\`}>
        <div className="p-8 bg-white border-dashed border-2 rounded text-center text-gray-400">
          Displaying {filters.priority} priority items in {filters.view} mode.
        </div>
      </div>
    </div>
  );
};`,
    explanation: `1. We destructure useState into filters and setFilters.
2. The functional update form ensures React works from the freshest pending state.
3. The spread operator keeps the other filter fields intact.
4. React re-runs the component after the update queue is processed, and the UI reflects the new state snapshot.`,
    demo: <DashboardFilterSystem />,
  },
  {
    title: 'Batching State Updates',
    description:
      'Batching is React’s internal optimization strategy where multiple state updates are grouped into a single re-render cycle. Instead of updating the DOM every time a setter function is called, React waits until the end of the event handler or asynchronous task to flush the changes.',
    slideData: {
      title: 'Concept: Batching State Updates',
      bullets: [
        'Definition of batching in React',
        'Performance benefits of batching',
        'Avoiding unnecessary re-renders',
      ],
    },
    rwTitle: 'Amazon',
    rwContent:
      'Amazon uses batching during checkout. Selecting a shipping speed can update the delivery date, shipping cost, taxes, and total price together. Batching lets all of those appear smoothly in one render.',
    broadTitle: 'Performance and Main Thread',
    broadContent:
      'Every render costs JavaScript work and may trigger layout and paint. Batching reduces that overhead and helps the UI stay responsive in interfaces where many pieces of state change together.',
    narrowTitle: 'Automatic Batching in React 18',
    narrowContent:
      'React 18 expanded batching beyond React event handlers. Updates inside promises, timeouts, and other async flows are batched too, which gives React more control over how and when the UI flushes updates.',
    fullCode: `import React, { useState } from 'react';

const MultiLayerSecurityGate = () => {
  const [accessLogs, setAccessLogs] = useState([]);
  const [systemStatus, setSystemStatus] = useState('Idle');
  const [securityLevel, setSecurityLevel] = useState(1);

  const runSystemDiagnostic = async () => {
    setSystemStatus('Scanning...');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSystemStatus('Active');
    setSecurityLevel(3);
    setAccessLogs((prev) => [...prev, \`Scan completed at \${new Date().toLocaleTimeString()}\`]);
  };

  return (
    <div className="p-5 bg-slate-900 text-green-400 font-mono rounded-md shadow-2xl">
      <h2 className="text-xl border-b border-green-800 mb-4 pb-2">Terminal: Security Root</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border border-green-900 p-3">
          <p className="text-xs text-green-700">SYSTEM_STATUS</p>
          <p className="text-lg">{systemStatus}</p>
        </div>
        <div className="border border-green-900 p-3">
          <p className="text-xs text-green-700">AUTH_LEVEL</p>
          <p className="text-lg">LVL_{securityLevel}</p>
        </div>
      </div>

      <button onClick={runSystemDiagnostic} className="w-full py-2 bg-green-900 text-green-100 rounded">
        EXECUTE DIAGNOSTIC_OVERRIDE
      </button>

      <div className="mt-4 text-xs h-24 overflow-y-auto bg-black p-2 rounded">
        {accessLogs.map((log, index) => (
          <div key={index}>{\`> \${log}\`}</div>
        ))}
      </div>
    </div>
  );
};`,
    explanation: `1. Batching is like a waiter taking the whole table’s order at once instead of making a separate trip for each glass of water.
2. React 18 can continue batching after an async pause, including after await.
3. We still use functional updates for the log array so the newest pending list is always preserved.
4. Even though several pieces of state change, React can paint the final result in one coordinated render.`,
    demo: <MultiLayerSecurityGate />,
  },
  {
    title: 'Example: Counter Component (State Snapshots)',
    description:
      'This section illustrates state as a snapshot. When a component renders, the current state values are fixed for that render cycle. Calling a setter multiple times with the raw state value does not update the variable in real time.',
    slideData: {
      title: 'Concept: State Snapshots',
      bullets: [
        'Counter component example',
        'Attempting to increment by 3',
        'Batching leads to one final render',
        'Fixed state values during render',
      ],
    },
    rwTitle: 'Instagram',
    rwContent:
      'Instagram relies on predictable state snapshots for interactions like quick likes, story controls, and modal transitions. Each event handler works from a consistent view of state so the interface does not tear itself apart mid-click.',
    broadTitle: 'Predictable Rendering',
    broadContent:
      'If state changed immediately in the middle of an event handler, different lines of code could see different values inside the same render. Snapshots avoid that and keep each render internally consistent.',
    narrowTitle: 'Functional Updater Pattern',
    narrowContent:
      'The fix for stale snapshots is to pass a function into the setter. React queues those updater functions and runs them in order during the next render, passing the latest pending state into each one.',
    fullCode: `import React, { useState } from 'react';

const MultiStageApprovalWorkflow = () => {
  const [workflowStatus, setWorkflowStatus] = useState({
    stage: 'Draft',
    approvals: 0,
    isLocked: false,
  });

  const handleRapidApproval = () => {
    setWorkflowStatus((prev) => ({ ...prev, approvals: prev.approvals + 1 }));
    setWorkflowStatus((prev) => ({ ...prev, approvals: prev.approvals + 1 }));
    setWorkflowStatus((prev) => ({
      ...prev,
      approvals: prev.approvals + 1,
      stage: 'Final Review',
      isLocked: true,
    }));
  };

  return (
    <div className="p-6 bg-white border-l-4 border-amber-500 shadow-sm">
      <h2 className="text-lg font-mono font-bold text-gray-800">DOCUMENT_ID: RFQ-992</h2>

      <div className="my-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Current Stage:</span>
          <span className="font-bold text-amber-600">{workflowStatus.stage}</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div className="bg-amber-500 h-full transition-all duration-500" style={{ width: \`\${(workflowStatus.approvals / 3) * 100}%\` }} />
        </div>
      </div>

      <button disabled={workflowStatus.isLocked} onClick={handleRapidApproval} className="w-full py-3 rounded font-bold">
        {workflowStatus.isLocked ? 'ARCHIVED / LOCKED' : 'EXECUTE TRIPLE APPROVAL'}
      </button>
    </div>
  );
};`,
    explanation: `1. A render is like a photo of the current value.
2. If you calculate from a stale photo three times, you repeat the same math three times.
3. Functional updaters avoid that by asking React to use the newest pending value each time.
4. React waits until the event handler finishes and then renders the final result.`,
    demo: <MultiStageApprovalWorkflow />,
  },
  {
    title: 'Updating the Same State Variable Multiple Times',
    description:
      'This section introduces the functional updater pattern as the safest way to update state from previous state. Unlike direct updates that depend on the current render’s snapshot, updater functions are queued and processed sequentially.',
    slideData: {
      title: 'Concept: Sequential Updates',
      bullets: [
        'Direct updates vs updater functions',
        'Sequential updates with n => n + 1',
        'Working from the most current pending state',
      ],
    },
    rwTitle: 'Discord',
    rwContent:
      'Discord uses this pattern for reaction counts and similar live counters. When multiple reactions land quickly, updater functions help the UI move from 10 to 12 instead of letting two stale updates both try to land on 11.',
    broadTitle: 'State Integrity',
    broadContent:
      'Functional updates protect state integrity in concurrent interfaces. They prevent race conditions and stale closures from overwriting newer work.',
    narrowTitle: 'Internal Update Queue',
    narrowContent:
      'When you pass a function to a setter, React pushes that function into an internal queue. During the next render, React walks the queue and feeds the latest pending state into each updater in sequence.',
    fullCode: `import React, { useState } from 'react';

const DynamicSystemPermissions = () => {
  const [accessRoles, setAccessRoles] = useState(['Guest']);

  const upgradeToModerator = () => {
    setAccessRoles((prev) => prev.filter((role) => role !== 'Guest'));
    setAccessRoles((prev) => [...prev, 'Standard_User']);
    setAccessRoles((prev) => [...prev, 'Moderator_Beta']);
  };

  return (
    <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg max-w-sm">
      <h3 className="text-sm font-bold uppercase tracking-widest text-slate-600">
        User Privilege Matrix
      </h3>

      <div className="space-y-2 mb-6">
        {accessRoles.map((role) => (
          <div key={role} className="px-3 py-1 bg-white border text-xs font-mono rounded">
            {role}
          </div>
        ))}
      </div>

      <button onClick={upgradeToModerator} className="w-full py-2 bg-indigo-600 text-white rounded-md">
        Elevate Account Status
      </button>
    </div>
  );
};`,
    explanation: `1. The setter call does not mutate the array immediately.
2. Each updater function is a queued instruction card.
3. React runs those cards in order and hands the latest pending array into the next card.
4. That is why both Standard_User and Moderator_Beta end up in the final array.`,
    demo: <DynamicSystemPermissions />,
  },
  {
    title: 'Advanced State Update Patterns',
    description:
      'This section explores what happens when you mix direct replacement values and updater functions in the same queue. React processes them in order, using direct values as replacements and updater functions as transformations on the current pending state.',
    slideData: {
      title: 'Concept: Advanced State Update Patterns',
      bullets: [
        'Mixing direct updates and updater functions',
        'Queueing and processing of updates',
        'Final state after queued updates',
      ],
    },
    rwTitle: 'Adobe Creative Cloud',
    rwContent:
      'Adobe-style dashboard tools often need to reset a state object and then apply follow-up adjustments. React’s queue makes this predictable by giving each step a defined place in the final update pipeline.',
    broadTitle: 'Atomicity of State',
    broadContent:
      'Queueing updates lets React produce one final render with the right combined outcome instead of exposing the user to half-finished intermediate values.',
    narrowTitle: 'Queue Processing Loop',
    narrowContent:
      'React loops through the update queue during render. A replacement value becomes the new pending state. A function receives the current pending state and returns the next pending state. The final value is what the UI renders.',
    fullCode: `import React, { useState } from 'react';

const DataExportOrchestrator = () => {
  const [exportTask, setExportTask] = useState({
    status: 'idle',
    progress: 0,
    logs: [],
  });

  const startEmergencyExport = () => {
    setExportTask({
      status: 'initializing',
      progress: 10,
      logs: ['Emergency Triggered'],
    });

    setExportTask((prev) => ({
      ...prev,
      progress: prev.progress + 15,
      logs: [...prev.logs, 'Applying security protocols...'],
    }));

    setExportTask((prev) => ({
      ...prev,
      status: 'active',
      logs: [...prev.logs, 'Export stream established.'],
    }));
  };

  return (
    <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-inner max-w-md">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-700">System Exporter</h2>
          <p className="text-xs text-gray-500">Status: <span className="uppercase font-mono">{exportTask.status}</span></p>
        </div>
        <div className="text-2xl font-black text-indigo-600">{exportTask.progress}%</div>
      </div>

      <div className="w-full bg-gray-200 h-3 rounded-full mb-6">
        <div className="bg-indigo-500 h-full rounded-full transition-all duration-700" style={{ width: \`\${exportTask.progress}%\` }}></div>
      </div>

      <button onClick={startEmergencyExport} className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg">
        FORCED DATA BYPASS
      </button>
    </div>
  );
};`,
    explanation: `1. A direct value can establish a new baseline in the queue.
2. Updater functions that come after it build on that baseline instead of the older render snapshot.
3. This allows complex state transitions to stay deterministic.
4. React still renders only the final merged result after queue processing completes.`,
    demo: <DataExportOrchestrator />,
  },
  {
    title: 'Best Practices and Naming Conventions',
    description:
      'To keep state updates predictable, updater functions should be pure, naming should be readable, and state should never be mutated directly. These habits matter even more as your components become larger and more collaborative.',
    slideData: {
      title: 'Concept: Best Practices and Naming Conventions',
      bullets: [
        'Use pure functions as updater functions',
        'Avoid side effects in updater functions',
        'Naming conventions for readability and maintainability',
      ],
    },
    rwTitle: 'Airbnb',
    rwContent:
      'Teams like Airbnb rely on disciplined state naming and immutable updates so engineers can trace logic quickly in large codebases. Clear naming keeps shared React code understandable months later.',
    broadTitle: 'Scalable State Architecture',
    broadContent:
      'Pure updater functions let React safely pause, replay, or discard work in modern rendering modes. Immutability also helps React detect real changes through new object and array references.',
    narrowTitle: 'Referential Equality',
    narrowContent:
      'Never mutate state directly. Instead of pushing into an old array or editing an old object in place, return a new one. React often depends on changed references to know that a re-render should happen.',
    fullCode: `import React, { useState } from 'react';

const DynamicProjectDashboard = () => {
  const [activeBoard, setActiveBoard] = useState({
    boardName: 'Engineering Sprint',
    lastModified: '2026-04-15',
    isArchived: false,
  });

  const handleArchiveTransition = () => {
    setActiveBoard((prevBoard) => ({
      ...prevBoard,
      isArchived: !prevBoard.isArchived,
      lastModified: new Date().toISOString().split('T')[0],
    }));
  };

  return (
    <div className="p-8 bg-gray-50 flex flex-col justify-center items-center">
      <div className={\`p-6 w-full max-w-sm rounded-2xl shadow-xl transition-all duration-500 \${
        activeBoard.isArchived ? 'bg-gray-800 text-gray-400 grayscale' : 'bg-white text-gray-800'
      }\`}>
        <h2 className="text-xl font-black">{activeBoard.boardName}</h2>
        <p className="text-xs mb-6 italic">Last Sync: {activeBoard.lastModified}</p>

        <button onClick={handleArchiveTransition} className="w-full py-3 rounded-xl font-bold text-sm">
          {activeBoard.isArchived ? 'RESTORE PROJECT' : 'ARCHIVE REPOSITORY'}
        </button>
      </div>
    </div>
  );
};`,
    explanation: `1. A pure updater only calculates the next state and returns it.
2. Clear names like prevBoard make future maintenance easier.
3. Side effects do not belong inside updater functions.
4. The spread operator creates a new object reference so React can detect that the state changed.`,
    demo: <DynamicProjectDashboard />,
  },
]

export default function Week02StateUpdateQueueingMasterclass({
  onBack,
  onSectionChange,
  title = "React's State Update Queueing and Batching Mechanism",
}) {
  const [activeIndex, setActiveIndex] = useState(0)

  const activeSection = useMemo(() => sections[activeIndex], [activeIndex])

  useEffect(() => {
    if (!onSectionChange) return

    if (activeIndex < sections.length) {
      onSectionChange({
        index: activeIndex + 1,
        title: sections[activeIndex].title,
      })
      return
    }

    onSectionChange({
      index: sections.length + 1,
      title: 'Recap',
    })
  }, [activeIndex, onSectionChange])

  return (
    <div className="sm-page">
      <div className="sm-toolbar">
        <button className="sm-button ghost" onClick={onBack}>
          ← Back to Week 02
        </button>

        <div className="sm-toolbar-copy">
          <p className="sm-kicker">AD312 • Week 02 • Lecture 01</p>
          <h2>{title}</h2>
        </div>
      </div>

      <div className="sm-layout">
        <aside className="sm-sidebar">
          <div className="sm-sidebar-label">Lecture Sections</div>

          {sections.map((section, index) => (
            <button
              key={section.title}
              className={index === activeIndex ? 'sm-nav-button active' : 'sm-nav-button'}
              onClick={() => setActiveIndex(index)}
            >
              <span className="sm-nav-step">{String(index + 1).padStart(2, '0')}</span>
              <span>{section.title}</span>
            </button>
          ))}

          <button
            className={activeIndex === sections.length ? 'sm-nav-button active' : 'sm-nav-button'}
            onClick={() => setActiveIndex(sections.length)}
          >
            <span className="sm-nav-step">{String(sections.length + 1).padStart(2, '0')}</span>
            <span>Recap</span>
          </button>
        </aside>

        <main className="sm-content">
          {activeIndex < sections.length ? (
            <SectionWrapper {...activeSection}>{activeSection.demo}</SectionWrapper>
          ) : (
            <RecapSection />
          )}
        </main>
      </div>
    </div>
  )
}
