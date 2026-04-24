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
        <h3>Deep Dive: Step-by-Step Code Explanation</h3>
        <div className="sm-preline">{explanation}</div>
      </div>
    </section>
  )
}

function RecapSection() {
  return (
    <section
      className="sm-section sm-recap-section"
      style={{
        backgroundColor: '#203141',
        color: 'white',
        borderRadius: '20px',
        padding: '56px 36px',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          margin: '0 0 10px 0',
          color: 'white',
          fontWeight: 800,
        }}
      >
        Recap and Best Practices
      </h1>

      <p
        style={{
          textAlign: 'center',
          color: '#3498db',
          fontSize: '1.2rem',
          margin: '0 0 50px 0',
        }}
      >
        The React State Journey
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
        }}
      >
        <div>
          <h3
            style={{
              borderBottom: '1px solid #3498db',
              paddingBottom: '10px',
              marginTop: 0,
              color: 'white',
            }}
          >
            1. State as a Managed Snapshot
          </h3>
          <p style={{ color: '#bdc3c7' }}>
            State is not just a variable; it is a snapshot of your UI. To change what users see, you must
            replace the old snapshot with a brand new one.
          </p>

          <h3
            style={{
              borderBottom: '1px solid #3498db',
              paddingBottom: '10px',
              marginTop: '30px',
              color: 'white',
            }}
          >
            2. The Asynchronous Nature of Updates
          </h3>
          <p style={{ color: '#bdc3c7' }}>
            React batches updates for performance. It waits until your event handler finishes before performing
            the re-paint.
          </p>

          <p
            style={{
              color: '#3498db',
              background: 'rgba(52, 152, 219, 0.1)',
              padding: '15px',
              borderRadius: '8px',
              lineHeight: 1.5,
            }}
          >
            <strong>Best Practice:</strong> Always use the updater function pattern{' '}
            <code>{`setVal((prev) => prev + 1)`}</code> to ensure you are building on the latest data.
          </p>
        </div>

        <div>
          <h3
            style={{
              borderBottom: '1px solid #3498db',
              paddingBottom: '10px',
              marginTop: 0,
              color: 'white',
            }}
          >
            3. Each Render Has Its Own Snapshot
          </h3>
          <p style={{ color: '#bdc3c7' }}>
            When an event happens, it captures the state at that exact moment. This ensures a consistent user
            experience even if things change mid-flight.
          </p>

          <h3
            style={{
              borderBottom: '1px solid #3498db',
              paddingBottom: '10px',
              marginTop: '30px',
              color: 'white',
            }}
          >
            4. Summary of Key Concepts
          </h3>

          <table
            style={{
              width: '100%',
              textAlign: 'left',
              borderCollapse: 'collapse',
              marginTop: '15px',
              color: '#bdc3c7',
            }}
          >
            <thead>
              <tr style={{ color: '#3498db' }}>
                <th style={{ padding: '8px' }}>Concept</th>
                <th style={{ padding: '8px' }}>Simple Terms</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #2c3e50' }}>
                <td style={{ padding: '8px' }}>Mutation</td>
                <td style={{ padding: '8px' }}>Painting an old house</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #2c3e50' }}>
                <td style={{ padding: '8px' }}>Immutability</td>
                <td style={{ padding: '8px' }}>Moving to a new house</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #2c3e50' }}>
                <td style={{ padding: '8px' }}>Spread (...)</td>
                <td style={{ padding: '8px' }}>Photocopying data</td>
              </tr>
              <tr>
                <td style={{ padding: '8px' }}>Nesting</td>
                <td style={{ padding: '8px' }}>Russian Dolls</td>
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
        <h3
          style={{
            textAlign: 'center',
            color: '#3498db',
            margin: '0 0 10px 0',
          }}
        >
          Final Best Practice: Isolated Memory
        </h3>
        <p
          style={{
            textAlign: 'center',
            color: '#ecf0f1',
            margin: 0,
          }}
        >
          Maintainable architecture relies on keeping state private and local. Only lift state when absolutely
          necessary. Every component should be the master of its own memory.
        </p>
      </div>
    </section>
  )
}

function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3

  function handleNext() {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          Step {currentStep} of {totalSteps}
        </div>
        <div
          style={{
            width: '100%',
            height: '10px',
            background: '#eee',
            borderRadius: '5px',
            marginTop: '10px',
          }}
        >
          <div
            style={{
              width: `${(currentStep / totalSteps) * 100}%`,
              height: '100%',
              background: '#3498db',
              borderRadius: '5px',
              transition: 'width 0.3s',
            }}
          />
        </div>
      </div>
      <div
        style={{
          minHeight: '80px',
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          marginBottom: '20px',
          background: 'white',
        }}
      >
        {currentStep === 1 && <p>👋 Welcome! Let&apos;s start by verifying your email address.</p>}
        {currentStep === 2 && <p>⚙️ Great! Now let&apos;s configure your notification preferences.</p>}
        {currentStep === 3 && <p>🚀 Final Step: Invite your team to get started.</p>}
      </div>
      <button
        onClick={handleNext}
        disabled={currentStep === totalSteps}
        style={{
          padding: '12px 24px',
          background: currentStep === totalSteps ? '#ccc' : '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: currentStep === totalSteps ? 'not-allowed' : 'pointer',
          fontWeight: 'bold',
        }}
      >
        {currentStep === totalSteps ? 'All Done!' : 'Next Step'}
      </button>
    </div>
  )
}

function PermissionManager() {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Administrator', access: ['read', 'write', 'delete'] },
    { id: 2, name: 'Editor', access: ['read', 'write'] },
    { id: 3, name: 'Viewer', access: ['read'] },
  ])

  function togglePermission(roleId, permission) {
    setRoles((prevRoles) =>
      prevRoles.map((role) => {
        if (role.id === roleId) {
          const hasPermission = role.access.includes(permission)
          return {
            ...role,
            access: hasPermission
              ? role.access.filter((entry) => entry !== permission)
              : [...role.access, permission],
          }
        }

        return role
      })
    )
  }

  return (
    <div>
      {roles.map((role) => (
        <div
          key={role.id}
          style={{
            marginBottom: '20px',
            padding: '15px',
            border: '1px solid #eee',
            borderRadius: '8px',
            background: 'white',
          }}
        >
          <h4 style={{ margin: '0 0 10px 0' }}>{role.name}</h4>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {['read', 'write', 'delete'].map((permission) => (
              <label
                key={permission}
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <input
                  type="checkbox"
                  checked={role.access.includes(permission)}
                  onChange={() => togglePermission(role.id, permission)}
                />
                {permission}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function LayoutEngine() {
  const [layout, setLayout] = useState({
    theme: 'light',
    config: {
      padding: { top: 10, side: 15 },
      gap: 20,
    },
  })

  function updatePadding(value) {
    setLayout((prev) => ({
      ...prev,
      config: {
        ...prev.config,
        padding: {
          ...prev.config.padding,
          side: parseInt(value, 10),
        },
      },
    }))
  }

  return (
    <div style={{ padding: '20px' }}>
      <label>Adjust Container Side Padding: {layout.config.padding.side}px</label>
      <input
        type="range"
        min="0"
        max="100"
        style={{ width: '100%', margin: '15px 0' }}
        value={layout.config.padding.side}
        onChange={(event) => updatePadding(event.target.value)}
      />
      <div style={{ border: '2px dashed #999', padding: `10px ${layout.config.padding.side}px` }}>
        <div style={{ background: '#2ecc71', color: 'white', padding: '20px', textAlign: 'center' }}>
          Visual Content Box
        </div>
      </div>
    </div>
  )
}

function ProjectDashboard() {
  const [project, setProject] = useState({
    title: 'Q4 Launch',
    status: 'In Progress',
    visibility: 'Private',
    lastUpdated: '2026-04-10',
  })

  function toggleVisibility() {
    setProject((prev) => ({
      ...prev,
      visibility: prev.visibility === 'Private' ? 'Public' : 'Private',
      lastUpdated: new Date().toLocaleDateString(),
    }))
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>{project.title}</h3>
      <p>
        Visibility Status:{' '}
        <span
          style={{
            color: project.visibility === 'Public' ? 'green' : 'red',
            fontWeight: 'bold',
          }}
        >
          {project.visibility}
        </span>
      </p>
      <p style={{ color: '#666', fontSize: '0.9rem' }}>Last System Sync: {project.lastUpdated}</p>
      <button
        onClick={toggleVisibility}
        style={{
          padding: '10px 20px',
          background: '#3182ce',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Make {project.visibility === 'Private' ? 'Public' : 'Private'}
      </button>
    </div>
  )
}

function GridController() {
  const [settings, setSettings] = useState({
    view: 'table',
    filters: {
      priority: 'all',
      showArchived: false,
    },
  })

  function setPriority(value) {
    setSettings((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        priority: value,
      },
    }))
  }

  return (
    <div>
      <p>
        Current Display Filter: <strong>{settings.filters.priority.toUpperCase()}</strong>
      </p>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {['all', 'high', 'low'].map((priority) => (
          <button
            key={priority}
            onClick={() => setPriority(priority)}
            style={{
              padding: '8px 16px',
              background: settings.filters.priority === priority ? '#2c3e50' : '#eee',
              color: settings.filters.priority === priority ? 'white' : 'black',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {priority}
          </button>
        ))}
      </div>
    </div>
  )
}

function SecuritySession() {
  const [session, setSession] = useState({
    id: '99283',
    preferences: {
      notifications: {
        email: true,
        push: false,
      },
    },
  })

  function togglePush() {
    setSession((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        notifications: {
          ...prev.preferences.notifications,
          push: !prev.preferences.notifications.push,
        },
      },
    }))
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', background: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
        <div>
          <strong>Push Notifications</strong>
          <div style={{ fontSize: '0.8rem', color: '#666' }}>Receive alerts on your mobile device</div>
        </div>
        <button
          onClick={togglePush}
          style={{
            padding: '10px 20px',
            borderRadius: '20px',
            border: 'none',
            background: session.preferences.notifications.push ? '#2ecc71' : '#e74c3c',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          {session.preferences.notifications.push ? 'Active' : 'Disabled'}
        </button>
      </div>
    </div>
  )
}

function TaskBoard() {
  const [board, setBoard] = useState({
    columns: [{ id: 'c1', title: 'To Do', tasks: [{ id: 't1', text: 'Define Sprint Goals' }] }],
    metadata: { lastEditBy: 'System' },
  })

  function addTask(columnId, text) {
    setBoard((prev) => {
      const newColumns = prev.columns.map((column) => {
        if (column.id === columnId) {
          return {
            ...column,
            tasks: [...column.tasks, { id: Date.now().toString(), text }],
          }
        }

        return column
      })

      return {
        ...prev,
        columns: newColumns,
        metadata: { ...prev.metadata, lastEditBy: 'User' },
      }
    })
  }

  return (
    <div style={{ background: '#f0f2f5', padding: '20px', borderRadius: '8px' }}>
      <p style={{ fontSize: '0.8rem' }}>Last Update: {board.metadata.lastEditBy}</p>
      {board.columns.map((column) => (
        <div
          key={column.id}
          style={{
            width: '250px',
            background: 'white',
            padding: '15px',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <h4 style={{ margin: '0 0 10px 0' }}>{column.title}</h4>
          <ul style={{ padding: 0, listStyle: 'none' }}>
            {column.tasks.map((task) => (
              <li key={task.id} style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                {task.text}
              </li>
            ))}
          </ul>
          <button
            onClick={() => addTask(column.id, 'New Requirement')}
            style={{ width: '100%', marginTop: '10px', padding: '5px', cursor: 'pointer' }}
          >
            + Add Task
          </button>
        </div>
      ))}
    </div>
  )
}

function RoleCustomizer() {
  const [role, setRole] = useState({
    title: 'New Role',
    meta: { color: '#333', created: '2026-04-16' },
  })

  function transformToAdmin() {
    const draft = { ...role }
    draft.title = 'Master Administrator'
    draft.meta = { ...draft.meta, color: '#d32f2f' }
    setRole(draft)
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ color: role.meta.color }}>Role: {role.title}</h3>
      <button onClick={transformToAdmin} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Apply Admin Template
      </button>
    </div>
  )
}

function FileUploader() {
  const [queue, setQueue] = useState([{ id: 'f1', name: 'user_report.pdf', progress: 0 }])

  function tick(id) {
    setQueue((prev) =>
      prev.map((file) =>
        file.id === id
          ? { ...file, progress: Math.min(file.progress + 20, 100) }
          : file
      )
    )
  }

  return (
    <div>
      {queue.map((file) => (
        <div key={file.id} style={{ marginBottom: '10px' }}>
          <div>
            {file.name} - {file.progress}%
          </div>
          <div style={{ width: '100%', height: '10px', background: '#eee' }}>
            <div style={{ width: `${file.progress}%`, height: '100%', background: '#2ecc71' }} />
          </div>
          <button onClick={() => tick(file.id)} disabled={file.progress === 100} style={{ marginTop: '5px' }}>
            Upload Chunk
          </button>
        </div>
      ))}
    </div>
  )
}

const sections = [
  {
    title: 'Introduction to State in React',
    description:
      'React state is a built-in object used to store data that belongs to a specific component. Unlike standard variables, when state changes, React re-renders the component to ensure the user interface stays in sync with the underlying data.',
    slideData: {
      title: 'Concept: Introduction to State in React',
      bullets: [
        'React state allows components to be dynamic.',
        'State can hold values like numbers, strings, and objects.',
        'Managing state correctly is key to responsive applications.',
      ],
    },
    rwTitle: 'Netflix',
    rwContent:
      'Netflix uses state for hover previews. When a user hovers over a movie card, a local state variable changes and React re-renders the UI from a static thumbnail into a richer preview experience.',
    broadTitle: 'UI Consistency',
    broadContent:
      'Architecturally, state is the source of truth for the UI. By using state instead of direct DOM manipulation, React keeps interfaces declarative and easier to reason about.',
    narrowTitle: 'Array Destructuring',
    narrowContent:
      'The useState hook returns an array with two values: the current state snapshot and the setter function. Calling the setter schedules a re-render rather than changing the UI immediately.',
    fullCode: `import React, { useState } from 'react';

const OnboardingWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <div>
      <p>Step {currentStep}</p>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};`,
    explanation: [
      '1. useState(1) creates component memory with a starting value of 1.',
      '2. currentStep reads the snapshot for this render, while setCurrentStep asks React to prepare the next one.',
      '3. We never assign currentStep directly. The setter tells React the data changed so the component can render again.',
      '4. The updater form prev => prev + 1 is especially useful whenever the new value depends on the previous one.',
    ].join('\n'),
    demo: <OnboardingWizard />,
  },
  {
    title: 'Why Immutability Matters',
    description:
      'In React, immutability means treating state as read-only. Instead of changing an existing object or array, you create a new copy that contains the desired change. This gives React a clean new reference to compare.',
    slideData: {
      title: 'Concept: Why Immutability Matters',
      bullets: [
        'Immutability prevents direct modification of data.',
        'Immutable updates lead to predictable state transitions.',
        'Benefits include easier debugging and optimized performance.',
      ],
    },
    rwTitle: 'Amazon',
    rwContent:
      'Amazon-style filter systems often create new arrays and objects when the user changes criteria instead of mutating old data in place. That preserves previous state and keeps the UI reliable.',
    broadTitle: 'Performance Optimization',
    broadContent:
      'Immutability supports React’s rendering model because new references are easy to detect. This helps React avoid stale UI and makes update behavior more predictable across large applications.',
    narrowTitle: 'Spread Operator Clone',
    narrowContent:
      'The spread operator copies the surrounding structure into a new object or array. When nested data is involved, you must copy the specific nested level you are changing too.',
    fullCode: `const togglePermission = (roleId, permission) => {
  setRoles((prevRoles) =>
    prevRoles.map((role) => {
      if (role.id === roleId) {
        const hasPermission = role.access.includes(permission);
        return {
          ...role,
          access: hasPermission
            ? role.access.filter((entry) => entry !== permission)
            : [...role.access, permission],
        };
      }
      return role;
    })
  );
};`,
    explanation: [
      '1. map() creates a new array instead of editing the existing one.',
      '2. When the target role is found, a new object is returned with a new access array.',
      '3. The other roles are returned unchanged, which avoids unnecessary churn.',
      '4. This keeps the update predictable and gives React a fresh reference where the change happened.',
    ].join('\n'),
    demo: <PermissionManager />,
  },
  {
    title: 'Direct Mutation: A Common Mistake',
    description:
      'Direct mutation happens when you edit a property inside a state object without creating a new object first. Since the reference stays the same, React may not detect that anything changed.',
    slideData: {
      title: 'Concept: Direct Mutation: A Common Mistake',
      bullets: [
        'Directly mutating state does not reliably trigger re-renders.',
        'React compares references, not just nested values.',
        'Mutation causes confusing bugs and stale UI.',
      ],
    },
    rwTitle: 'Spotify',
    rwContent:
      'A music queue UI can break if a developer pushes directly into the current queue array. The underlying data changed, but React may still treat the state as the same reference.',
    broadTitle: 'Predictable Transitions',
    broadContent:
      'Avoiding direct mutation makes every state change explicit. This helps with debugging, testing, and keeping multiple pieces of the UI synchronized.',
    narrowTitle: 'The Reference Trap',
    narrowContent:
      'React commonly relies on referential comparison. If you reuse the same object reference after editing it, React may bail out of rendering because it sees no new container.',
    fullCode: `// Incorrect mutation:
// layout.config.padding.side = 20;
// setLayout(layout);

// Correct immutable update:
const updatePadding = (value) => {
  setLayout((prev) => ({
    ...prev,
    config: {
      ...prev.config,
      padding: {
        ...prev.config.padding,
        side: parseInt(value, 10),
      },
    },
  }));
};`,
    explanation: [
      '1. The incorrect version edits the old object in place and then passes the same container back to React.',
      '2. The correct version rebuilds the path from layout to config to padding.',
      '3. Every changed level receives a fresh object reference.',
      '4. That fresh path tells React exactly where the update lives.',
    ].join('\n'),
    demo: <LayoutEngine />,
  },
  {
    title: 'Correct Way to Update Objects',
    description:
      'The correct React pattern is to use the setter function and build a new object with the spread operator. Old properties are copied forward and only the targeted ones are overwritten.',
    slideData: {
      title: 'Concept: Correct Way to Update Objects',
      bullets: [
        'Always create a new object for updates.',
        'Use the setter to replace old state with the new object.',
        'Spread first, then overwrite the changed property.',
      ],
    },
    rwTitle: 'Airbnb',
    rwContent:
      'Search filter overlays in travel apps often update one setting while preserving all the others. That makes immutable object updates a perfect fit for real production interfaces.',
    broadTitle: 'State History Logic',
    broadContent:
      'When every state transition produces a distinct snapshot, you can preserve previous versions for undo functionality, auditing, or debugging workflows.',
    narrowTitle: 'Property Overwriting',
    narrowContent:
      'In an object like { ...prev, visibility: newValue }, the spread should come first so the later property can overwrite the older value instead of being overwritten by it.',
    fullCode: `const [project, setProject] = useState({
  title: 'Launch',
  visibility: 'Private',
});

const toggleVisibility = () => {
  setProject((prev) => ({
    ...prev,
    visibility: prev.visibility === 'Private' ? 'Public' : 'Private',
    lastUpdated: new Date().toLocaleDateString(),
  }));
};`,
    explanation: [
      '1. The updater function receives the latest available snapshot.',
      '2. ...prev copies forward the untouched fields.',
      '3. visibility and lastUpdated are then replaced or added in the new object.',
      '4. This pattern is the standard way to update object state in React.',
    ].join('\n'),
    demo: <ProjectDashboard />,
  },
  {
    title: 'Using Spread Syntax for Updates',
    description:
      'The spread operator is the core tool React developers use for immutable object updates. It creates a shallow copy of the current container so the original state remains untouched.',
    slideData: {
      title: 'Concept: Using Spread Syntax for Updates',
      bullets: [
        'Spread syntax copies properties into a new object.',
        'It is ideal for partial updates.',
        'Nested objects still require additional spreading.',
      ],
    },
    rwTitle: 'Google Maps',
    rwContent:
      'Preference panels in mapping tools often update one setting such as map type while preserving zoom, filters, or marker visibility. Spread syntax makes that possible without losing unrelated state.',
    broadTitle: 'Partial Updates',
    broadContent:
      'Spread syntax helps preserve all the data you are not changing. This becomes increasingly important as state objects become larger and more collaborative.',
    narrowTitle: 'Shallow Limitation',
    narrowContent:
      'Spread only clones one level deep. If your target lives inside settings.filters, you must spread settings and filters, not just the root object.',
    fullCode: `const setPriority = (value) => {
  setSettings((prev) => ({
    ...prev,
    filters: {
      ...prev.filters,
      priority: value,
    },
  }));
};`,
    explanation: [
      '1. The root settings object is copied with ...prev.',
      '2. The nested filters object also gets its own new copy.',
      '3. Only the priority field is overwritten.',
      '4. showArchived and any sibling values survive because they were copied forward.',
    ].join('\n'),
    demo: <GridController />,
  },
  {
    title: 'Updating Nested Objects',
    description:
      'Nested state updates require care because every object on the path to the changed value must become a new reference. Copying only the top level is not enough.',
    slideData: {
      title: 'Concept: Updating Nested Objects',
      bullets: [
        'Nested updates require new copies at each changed level.',
        'Missing one level can preserve old references.',
        'Functional updates help prevent stale snapshots.',
      ],
    },
    rwTitle: 'Discord',
    rwContent:
      'Permission settings, profile preferences, and server controls often rely on nested state. Updating one nested toggle safely means rebuilding the path to that nested property.',
    broadTitle: 'Memoization',
    broadContent:
      'Clean nested updates help components receive accurate props and support render optimizations. New references at the right levels make changed data easier to detect.',
    narrowTitle: 'Functional Snapshot',
    narrowContent:
      'The updater form prev => ... protects you from stale snapshots and keeps the nested spread logic tied to the latest pending state rather than an older render.',
    fullCode: `const togglePush = () => {
  setSession((prev) => ({
    ...prev,
    preferences: {
      ...prev.preferences,
      notifications: {
        ...prev.preferences.notifications,
        push: !prev.preferences.notifications.push,
      },
    },
  }));
};`,
    explanation: [
      '1. The change happens deep inside preferences.notifications.push.',
      '2. React needs a new notifications object, a new preferences object, and a new session object.',
      '3. Rebuilding the path ensures the update is immutable.',
      '4. This pattern repeats in any deeply nested object structure.',
    ].join('\n'),
    demo: <SecuritySession />,
  },
  {
    title: 'Managing Lists Immutably',
    description:
      'Arrays should also be treated as read-only in React state. Methods like map, filter, and spread return new arrays, which makes them the right tools for immutable updates.',
    slideData: {
      title: 'Concept: Managing Lists Immutably',
      bullets: [
        'Use map, filter, and spread for array updates.',
        'Return new arrays instead of mutating old ones.',
        'Lists of objects often need nested immutable logic.',
      ],
    },
    rwTitle: 'Trello',
    rwContent:
      'Board UIs rely on immutable array updates whenever tasks are added, removed, or reordered. New arrays keep the data flow transparent and reduce hard-to-track bugs.',
    broadTitle: 'Predictable Data Flow',
    broadContent:
      'Manual immutable updates keep state transitions explicit. Although they are a bit more verbose, they make the data flow easier to teach, debug, and maintain.',
    narrowTitle: 'The map() Strategy',
    narrowContent:
      'map() is useful when one item in a list needs to change. You return a new object for the matching item and return the original references for the unchanged items.',
    fullCode: `const addTask = (columnId, text) => {
  setBoard((prev) => {
    const newColumns = prev.columns.map((column) => {
      if (column.id === columnId) {
        return {
          ...column,
          tasks: [...column.tasks, { id: Date.now().toString(), text }],
        };
      }
      return column;
    });

    return {
      ...prev,
      columns: newColumns,
      metadata: { ...prev.metadata, lastEditBy: 'User' },
    };
  });
};`,
    explanation: [
      '1. The columns array is rebuilt with map().',
      '2. Only the matching column receives a new object.',
      '3. The tasks array inside that column is also rebuilt with spread.',
      '4. The final board object wraps the new columns so the overall state stays immutable.',
    ].join('\n'),
    demo: <TaskBoard />,
  },
  {
    title: 'Local Mutation vs. State Mutation',
    description:
      'Local mutation is safe when you mutate a fresh clone that is not yet part of React state. State mutation is unsafe because it edits the real state object that React expects to remain immutable.',
    slideData: {
      title: 'Concept: Local Mutation vs. State Mutation',
      bullets: [
        'Local mutation happens on a fresh clone.',
        'State mutation edits the live state object directly.',
        'Only local mutation is safe before calling the setter.',
      ],
    },
    rwTitle: 'Adobe Express',
    rwContent:
      'Design tools often prepare a draft configuration locally, make several changes to that draft, and then commit one clean update to state. That keeps the UI from entering messy intermediate states.',
    broadTitle: 'Atomic Updates',
    broadContent:
      'Preparing a full draft first and then committing it can make updates easier to read. This supports consistent UI transitions and avoids partially applied state.',
    narrowTitle: 'Sandbox Clones',
    narrowContent:
      'A clone like const draft = { ...role } creates a separate object in memory. Mutating that sandbox is safe because React is still watching the original state object until setRole is called.',
    fullCode: `const transformToAdmin = () => {
  const draft = { ...role };
  draft.title = 'Master Administrator';
  draft.meta = { ...draft.meta, color: '#d32f2f' };
  setRole(draft);
};`,
    explanation: [
      '1. draft is a fresh object, not the original role object.',
      '2. Mutating draft is safe because it is local work, not live state mutation.',
      '3. setRole(draft) commits the finished result in one clean update.',
      '4. This is useful when building a more complex object before storing it in state.',
    ].join('\n'),
    demo: <RoleCustomizer />,
  },
  {
    title: 'Benefits of Immutability',
    description:
      'Immutable state management turns data into a sequence of snapshots instead of a single mutable object. That makes updates easier to track and gives React a reliable signal that something changed.',
    slideData: {
      title: 'Concept: Benefits of Immutability',
      bullets: [
        'Immutability improves debugging and state tracking.',
        'It helps React optimize re-renders.',
        'It supports future feature growth and maintainability.',
      ],
    },
    rwTitle: 'Trello',
    rwContent:
      'Undo and redo systems become much more natural when every update creates a new snapshot. Older versions can be preserved rather than overwritten.',
    broadTitle: 'Time-Travel Debugging',
    broadContent:
      'When state history is preserved as distinct snapshots, debugging tools can inspect or replay how the UI changed over time. That is much harder in a mutation-heavy codebase.',
    narrowTitle: 'Reconciliation Performance',
    narrowContent:
      'New object and array references allow React to quickly determine whether something changed. That helps the reconciliation process stay efficient and predictable.',
    fullCode: `const tick = (id) => {
  setQueue((prev) =>
    prev.map((file) => {
      if (file.id === id) {
        return {
          ...file,
          progress: Math.min(file.progress + 20, 100),
        };
      }
      return file;
    })
  );
};`,
    explanation: [
      '1. The queue array is rebuilt with map().',
      '2. Only the matching file gets a new object with updated progress.',
      '3. The old queue is preserved conceptually as a previous snapshot.',
      '4. That makes the state transition easier for React and easier for humans to understand.',
    ].join('\n'),
    demo: <FileUploader />,
  },
]

export default function Week02ObjectsInStateMasterclass({
  onBack,
  onSectionChange,
  title = 'Updating Objects in React State',
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
      title: 'Recap and Best Practices',
    })
  }, [activeIndex, onSectionChange])

  return (
    <div className="sm-page">
      <div className="sm-toolbar">
        <button className="sm-button ghost" onClick={onBack}>
          ← Back to Week 02
        </button>

        <div className="sm-toolbar-copy">
          <p className="sm-kicker">AD312 • Week 02 • Lecture 02</p>
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
            <span>Recap and Best Practices</span>
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
