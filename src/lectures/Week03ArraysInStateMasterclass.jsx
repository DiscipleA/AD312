import React, { useEffect, useMemo, useRef, useState } from 'react'
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
    <h2
      style={{
        borderBottom: '2px solid #3498db',
        paddingBottom: '10px',
        marginTop: 0,
      }}
    >
      {title}
    </h2>
    <ul style={{ lineHeight: '1.8', fontSize: '1.05rem', marginBottom: 0 }}>
      {bullets.map((bullet, index) => (
        <li key={index}>{bullet}</li>
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

function TagCloudManagerDemo() {
  const [tags, setTags] = useState(['React', 'Frontend'])

  const addNewTag = () => {
    const freshTag = `Topic-${tags.length + 1}`
    setTags([...tags, freshTag])
  }

  const removeLastTag = () => {
    setTags(tags.filter((_, index) => index !== tags.length - 1))
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h3 style={{ marginTop: 0 }}>Article Keywords</h3>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
        {tags.map((tag, i) => (
          <span key={i} style={{ background: '#eee', padding: '5px 10px', borderRadius: '4px' }}>
            {tag}
          </span>
        ))}
      </div>
      <button className="sm-button" onClick={addNewTag}>Add Keyword</button>
      <button className="sm-button ghost" onClick={removeLastTag} style={{ marginLeft: '10px' }}>
        Undo Last
      </button>
    </div>
  )
}

function SkillBadgeEditorDemo() {
  const [skills, setSkills] = useState([
    { id: 1, name: 'JavaScript', level: 'Intermediate' },
    { id: 2, name: 'CSS', level: 'Beginner' },
  ])
  const nextSkillId = useRef(3)

  const promoteSkill = (id) => {
    setSkills(skills.map((skill) => (skill.id === id ? { ...skill, level: 'Expert' } : skill)))
  }

  const deleteSkill = (id) => {
    setSkills(skills.filter((skill) => skill.id !== id))
  }

  const addSkill = () => {
    const newSkill = { id: nextSkillId.current++, name: 'New Skill', level: 'Learning' }
    setSkills([...skills, newSkill])
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <h4 style={{ marginTop: 0 }}>Professional Skills</h4>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {skills.map((skill) => (
          <li
            key={skill.id}
            style={{ marginBottom: '10px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}
          >
            <strong>{skill.name}</strong> — {skill.level}
            <button className="sm-button" onClick={() => promoteSkill(skill.id)} style={{ marginLeft: '10px' }}>
              Promote
            </button>
            <button
              className="sm-button danger"
              onClick={() => deleteSkill(skill.id)}
              style={{ marginLeft: '5px' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button className="sm-button" onClick={addSkill} style={{ marginTop: '10px', fontWeight: 'bold' }}>
        + Add Skill
      </button>
    </div>
  )
}

function ServerLogMonitorDemo() {
  const [logs, setLogs] = useState([
    { id: 1, timestamp: '12:00:00', status: 'INIT', message: 'System Booting...' },
  ])
  const nextLogId = useRef(2)

  const generateLogEntry = () => {
    const newEntry = {
      id: nextLogId.current++,
      timestamp: new Date().toLocaleTimeString(),
      status: 'OK',
      message: 'Heartbeat signal received.',
    }
    setLogs((prevLogs) => [...prevLogs, newEntry])
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#1e1e1e', color: '#00ff00', borderRadius: '5px' }}>
      <h4 style={{ marginTop: 0 }}>System Status Logs</h4>
      <div style={{ maxHeight: '150px', overflowY: 'auto', marginBottom: '10px', fontSize: '0.9rem' }}>
        {logs.map((log) => (
          <div key={log.id}>
            [{log.timestamp}] <span style={{ color: '#aaa' }}>{log.status}:</span> {log.message}
          </div>
        ))}
      </div>
      <button
        className="sm-button"
        onClick={generateLogEntry}
        style={{ backgroundColor: '#333', color: '#fff', border: '1px solid #00ff00', cursor: 'pointer' }}
      >
        Ping Server
      </button>
    </div>
  )
}

function WorkspaceTabManagerDemo() {
  const [tabs, setTabs] = useState([
    { id: 't1', title: 'Dashboard', active: true },
    { id: 't2', title: 'API Docs', active: false },
    { id: 't3', title: 'Terminal', active: false },
  ])

  const closeTab = (tabId) => {
    const updatedTabs = tabs.filter((tab) => tab.id !== tabId)
    setTabs(updatedTabs)
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <div style={{ display: 'flex', borderBottom: '2px solid #eee', flexWrap: 'wrap' }}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            style={{
              padding: '10px',
              marginRight: '5px',
              background: tab.active ? '#fff' : '#f0f0f0',
              border: '1px solid #ddd',
              borderBottom: 'none',
            }}
          >
            {tab.title}
            <button
              onClick={() => closeTab(tab.id)}
              style={{ marginLeft: '8px', border: 'none', background: 'transparent', cursor: 'pointer' }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      {tabs.length === 0 && <p style={{ marginTop: '20px', color: '#666' }}>No active tabs.</p>}
    </div>
  )
}

function ReadingProgressTrackerDemo() {
  const [books, setBooks] = useState([
    { id: 'b1', title: 'The Great Gatsby', progress: 10 },
    { id: 'b2', title: '1984', progress: 45 },
    { id: 'b3', title: 'Moby Dick', progress: 0 },
  ])

  const updateProgress = (bookId) => {
    setBooks(
      books.map((book) => {
        if (book.id === bookId) {
          return { ...book, progress: Math.min(book.progress + 10, 100) }
        }
        return book
      })
    )
  }

  return (
    <div style={{ padding: '20px', maxWidth: '400px', border: '1px solid #ddd' }}>
      <h3 style={{ marginTop: 0 }}>My Library Progress</h3>
      {books.map((book) => (
        <div key={book.id} style={{ marginBottom: '15px' }}>
          <div>
            <strong>{book.title}</strong>: {book.progress}%
          </div>
          <div style={{ width: '100%', background: '#eee', height: '10px' }}>
            <div style={{ width: `${book.progress}%`, background: '#4caf50', height: '100%' }} />
          </div>
          <button className="sm-button" onClick={() => updateProgress(book.id)} style={{ marginTop: '5px' }}>
            Read 10%
          </button>
        </div>
      ))}
    </div>
  )
}

function RadioPlaylistArrangerDemo() {
  const [songs, setSongs] = useState([
    { id: 's1', title: 'Morning Jazz', duration: '3:45' },
    { id: 's2', title: 'News Bulletin', duration: '5:00' },
  ])
  const nextAdId = useRef(1)

  const insertUrgentAd = (index) => {
    const ad = { id: `ad-${nextAdId.current++}`, title: '*** URGENT SPONSOR ***', duration: '0:30' }
    const updatedPlaylist = [...songs.slice(0, index), ad, ...songs.slice(index)]
    setSongs(updatedPlaylist)
  }

  return (
    <div style={{ padding: '20px', border: '2px solid #333', borderRadius: '10px' }}>
      <h4 style={{ marginTop: 0 }}>Broadcast Queue</h4>
      <ol>
        {songs.map((song, idx) => (
          <li key={song.id} style={{ marginBottom: '8px' }}>
            {song.title} ({song.duration})
            <button
              className="sm-button ghost"
              onClick={() => insertUrgentAd(idx)}
              style={{ marginLeft: '10px', fontSize: '0.7rem' }}
            >
              Insert Ad Above
            </button>
          </li>
        ))}
      </ol>
      <button className="sm-button" onClick={() => insertUrgentAd(songs.length)}>
        Add Ad to End
      </button>
    </div>
  )
}

function GreenhouseMonitorDemo() {
  const [sensors, setSensors] = useState([
    { id: 'zone-1', type: 'Humidity', value: 45, status: 'Stable' },
    { id: 'zone-2', type: 'Temperature', value: 22, status: 'Stable' },
    { id: 'zone-3', type: 'CO2', value: 400, status: 'Stable' },
  ])

  const triggerAlert = (sensorId) => {
    setSensors(
      sensors.map((sensor) =>
        sensor.id === sensorId
          ? { ...sensor, status: 'Alert', value: sensor.value + 10 }
          : sensor
      )
    )
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f4f0', borderRadius: '12px' }}>
      <h3 style={{ marginTop: 0 }}>Zone Environment Controls</h3>
      <div style={{ display: 'grid', gap: '10px' }}>
        {sensors.map((sensor) => (
          <div
            key={sensor.id}
            style={{
              padding: '15px',
              background: sensor.status === 'Alert' ? '#ffdada' : '#fff',
              border: '1px solid #ccc',
              borderRadius: '8px',
            }}
          >
            <strong>{sensor.type}</strong>: {sensor.value}
            <span style={{ marginLeft: '10px', color: sensor.status === 'Alert' ? 'red' : 'green' }}>
              ({sensor.status})
            </span>
            <button className="sm-button" onClick={() => triggerAlert(sensor.id)} style={{ display: 'block', marginTop: '10px' }}>
              Simulate Surge
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function SportsCommentaryFeedDemo() {
  const [feed, setFeed] = useState({
    matchName: 'Global Finals 2026',
    events: [{ id: 1, time: "12'", text: 'Match Started', type: 'INFO' }],
  })
  const nextEventId = useRef(2)

  const updateFeed = (producer) => {
    setFeed((prev) => {
      const draft = { ...prev, events: [...prev.events] }
      producer(draft)
      return draft
    })
  }

  const addCommentary = (text) => {
    updateFeed((draft) => {
      draft.events.push({
        id: nextEventId.current++,
        time: "45'",
        text,
        type: 'LIVE',
      })
    })
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #000', borderRadius: '10px' }}>
      <h2 style={{ marginTop: 0 }}>{feed.matchName}</h2>
      <div style={{ height: '200px', overflowY: 'scroll', background: '#f9f9f9', padding: '10px' }}>
        {feed.events.map((event) => (
          <p key={event.id}>
            <strong>{event.time}</strong>: {event.text}
          </p>
        ))}
      </div>
      <button
        className="sm-button"
        onClick={() => addCommentary('Goal scored by the visiting team!')}
        style={{ marginTop: '10px', padding: '10px', background: '#28a745', color: 'white' }}
      >
        Add Goal Update
      </button>
    </div>
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
          marginTop: 0,
        }}
      >
        Best Practices and Recap
      </h1>
      <p
        style={{
          textAlign: 'center',
          color: '#3498db',
          fontSize: '1.2rem',
        }}
      >
        The React Array Immutability Journey
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '40px' }}>
        <div>
          <h3>1. Immutability Creates Predictable UI Behavior</h3>
          <p style={{ lineHeight: 1.7 }}>
            The central rule across the lecture is simple: never mutate React state directly. Arrays and objects
            in state should be treated as read-only snapshots. When you need to add, remove, replace, or insert
            data, you build a new array or object reference. That new reference is what signals React that
            meaningful work needs to happen.
          </p>

          <h3>2. React Relies on Reference Changes, Not Deep Detective Work</h3>
          <p style={{ lineHeight: 1.7 }}>
            React is optimized for speed. It does not perform an expensive deep inspection of every nested value
            whenever state changes. Instead, it checks whether the reference has changed. If the reference is
            new, React moves forward with reconciliation. If the reference is unchanged because you mutated the
            original value, React may assume nothing important happened.
          </p>

          <p style={{ color: '#3498db', lineHeight: 1.7 }}>
            <strong>Best Practice:</strong> Prefer non-mutating methods such as <code>[...arr, item]</code>,{' '}
            <code>filter()</code>, <code>map()</code>, and <code>slice()</code> when updating arrays in state.
          </p>
        </div>

        <div>
          <h3>3. Each Operation Has an Immutable Tool</h3>
          <p style={{ lineHeight: 1.7 }}>
            The lecture showed that there is a dependable tool for every array update pattern. Use spread syntax
            for appending items, <code>filter()</code> for removals, <code>map()</code> for replacements, and a
            combination of <code>slice()</code> with spread for insertions at exact positions. For complex
            nested structures, selectively copy only the changed object while preserving the rest.
          </p>

          <h3>4. Simplicity Still Matters at Scale</h3>
          <p style={{ lineHeight: 1.7 }}>
            As data structures become deeper, manual immutable updates can grow verbose. That is where tools
            like Immer help. Immer lets developers write mutable-looking logic against a draft while still
            producing fully immutable state updates behind the scenes. This keeps code more readable without
            abandoning React’s rendering model.
          </p>

          <table style={{ width: '100%', textAlign: 'left', borderTop: '1px solid #3498db', marginTop: '20px' }}>
            <thead>
              <tr>
                <th style={{ padding: '10px 8px 10px 0' }}>Concept</th>
                <th style={{ padding: '10px 0' }}>Simple Terms</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '8px 8px 8px 0' }}>Immutability</td>
                <td style={{ padding: '8px 0' }}>Use a new sheet of paper instead of scribbling on the old one.</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 8px 8px 0' }}>Spread</td>
                <td style={{ padding: '8px 0' }}>Photocopy the old list onto a brand-new page.</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 8px 8px 0' }}>Filter</td>
                <td style={{ padding: '8px 0' }}>A strainer that keeps what passes the rule and drops the rest.</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 8px 8px 0' }}>Map</td>
                <td style={{ padding: '8px 0' }}>An assembly line that rebuilds every item and swaps only the target one.</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 8px 8px 0' }}>Slice + Spread</td>
                <td style={{ padding: '8px 0' }}>Cut the loaf into two parts and place the new piece in the middle.</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 8px 8px 0' }}>Immer</td>
                <td style={{ padding: '8px 0' }}>A smart assistant that lets you write simply and copies safely for you.</td>
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
        <h3 style={{ textAlign: 'center', color: '#3498db', marginTop: 0 }}>
          Final Best Practice: Maintain Predictability
        </h3>
        <p style={{ textAlign: 'center', lineHeight: 1.8, marginBottom: 0 }}>
          Immutable state updates keep React applications predictable, debuggable, and scalable. When every
          update creates a fresh reference, React can re-render with confidence, memoization stays reliable, and
          complex state transitions remain understandable to both the framework and the developer. The more your
          code respects predictable immutable updates, the easier it becomes to build interfaces that stay
          correct under real-world complexity.
        </p>
      </div>
    </section>
  )
}

const sections = [
  {
    title: 'Introduction to Array Immutability',
    slideData: {
      title: 'Concept: Introduction to Array Immutability',
      bullets: [
        'Immutable vs. Mutable: Understand why immutability is key in React.',
        "React's Re-rendering: How immutability affects React's rendering process.",
        'State Management: Importance of not mutating state directly.',
        'Code Logic: Direct mutation (e.g., .push()) is not recommended; the immutable approach (e.g., spread operator [...]) is the standard for creating new state.',
      ],
    },
    description:
      "In React, immutability refers to the practice of never modifying the original state object or array directly. Instead, when a change is needed, we create a completely new copy with the updated values. This is fundamental because React uses Shallow Comparison to detect changes. If you mutate an existing array, the reference in memory remains the same, and React’s reconciliation engine may fail to trigger a re-render, leaving the UI out of sync with the data.",
    rwTitle: 'Instagram',
    rwContent:
      "Instagram uses immutability when handling Photo Filter Previewing. When a user taps a filter, the app doesn't change the pixel data of the original image object. Instead, it generates a new state representing the applied filter. This allows the UI to instantly swap between the 'Original' and 'Filtered' views without destructive data loss, ensuring a smooth and undoable user experience.",
    broadTitle: 'UI Consistency and Predictability',
    broadContent:
      "From an architectural standpoint, immutability ensures UI Consistency and Predictability. In large-scale applications, tracking down bugs caused by 'side effects' (where one part of the code accidentally changes data used by another) is incredibly difficult. By treating state as read-only, developers can implement Time-Travel Debugging and high-performance memoization, as the system can quickly determine if an update is necessary just by checking if the object reference has changed.",
    narrowTitle: 'Spread Operator for New References',
    narrowContent:
      "The technical implementation relies on the ES6 Spread Operator (...). This operator performs a shallow copy of the existing array elements into a newly initialized array literal. By placing the new item after the spread (for example, [...oldArray, newItem]), we ensure that the new reference is created in a single, expressive line of code, fulfilling React's requirement for a state change notification.",
    fullCode: `import React, { useState } from 'react';

/**
 * Concept: Array Immutability
 * Implementation: A "Tag Cloud" manager for an article editor.
 */
const TagCloudManager = () => {
  const [tags, setTags] = useState(['React', 'Frontend']);

  const addNewTag = () => {
    const freshTag = \`Topic-\${tags.length + 1}\`;

    // IMMUTABLE PATTERN:
    // We do not use tags.push().
    // We create a new array reference via the spread operator.
    setTags([...tags, freshTag]);
  };

  const removeLastTag = () => {
    // IMMUTABLE PATTERN:
    // .filter() returns a BRAND NEW array,
    // which React recognizes as a state change.
    setTags(tags.filter((_, index) => index !== tags.length - 1));
  };

  return (
    <div>
      <h3>Article Keywords</h3>

      <div>
        {tags.map((tag, i) => (
          <span key={i}>{tag}</span>
        ))}
      </div>

      <button onClick={addNewTag}>Add Keyword</button>
      <button onClick={removeLastTag}>Undo Last</button>
    </div>
  );
};

export default TagCloudManager;`,
    explanation: [
      '1. const [tags, setTags] = useState(...): We are telling React to watch the tags variable. The setTags function is the only authorized way to change it.',
      '2. [...tags, freshTag]: Imagine your array is a physical list on a piece of paper. Instead of scribbling on that same paper, the spread operator acts like a photocopier. It copies everything from the old paper onto a brand-new sheet, and then we write the freshTag at the bottom of the new sheet.',
      '3. The reason for the new sheet: React is smart about performance. It does not inspect every single item deeply. It checks whether the reference changed. A new array tells React meaningful work happened.',
      '4. Memory management: The old array can eventually be cleaned up by garbage collection once nothing else needs it.',
    ].join('\n'),
    demo: <TagCloudManagerDemo />,
  },
  {
    title: 'Common Operations on Arrays',
    slideData: {
      title: 'Concept: Common Operations on Arrays',
      bullets: [
        'Methods to Avoid: push, pop, splice, direct assignment (arr[index] = value).',
        'Preferred Methods: Add with concat or [...arr, newItem].',
        'Preferred Methods: Remove with filter or slice.',
        'Preferred Methods: Replace with map.',
        'Code Examples: Adding with [...numbers, 4].',
        'Code Examples: Removing with numbers.filter(number => number !== 2).',
        'Code Examples: Replacing with numbers.map(num => num === 2 ? 20 : num).',
      ],
    },
    description:
      'React development requires a shift from mutative array methods to non-mutative ones. Methods like push or splice modify the array in place, which fails to create a new memory reference. To update state correctly, we use functional programming patterns: the spread operator for addition, .filter() for removal, and .map() for replacement. Each of these preferred methods returns a brand new array, ensuring React detects the state change and updates the DOM.',
    rwTitle: 'Spotify',
    rwContent:
      "Spotify utilizes these patterns within their Current Queue logic. When a user removes a track from the queue, Spotify does not delete the item from the existing array in memory. Instead, it runs a .filter() to create a new queue array excluding that specific track ID. This allows the UI to animate the removal smoothly while maintaining a predictable undo/redo stack.",
    broadTitle: 'Unidirectional Data Flow',
    broadContent:
      "Architecturally, using non-mutative methods supports Unidirectional Data Flow. When an array is passed down as a prop to multiple child components, ensuring that no component can accidentally mutate the original data is vital. This pattern prevents hard-to-reproduce bugs by guaranteeing that data remains stable across the component tree unless explicitly updated by a central state setter.",
    narrowTitle: 'map() for Replacements',
    narrowContent:
      "The technical heavy lifting for replacing items is handled by .map(). Unlike a loop that might modify values in place, .map() iterates through every element and uses a condition to decide whether to return the original item or a modified version. This results in a one-to-one mapping of the old array to a new one, preserving order while updating specific data points.",
    fullCode: `import React, { useRef, useState } from 'react';

/**
 * Concept: Common Array Operations (Add, Remove, Replace)
 * Implementation: A dynamic "Skill Badge" editor for a professional resume.
 */
const SkillBadgeEditor = () => {
  const [skills, setSkills] = useState([
    { id: 1, name: 'JavaScript', level: 'Intermediate' },
    { id: 2, name: 'CSS', level: 'Beginner' }
  ]);
  const nextSkillId = useRef(3);

  // REPLACE: Using .map() to update a specific object's property
  const promoteSkill = (id) => {
    setSkills(skills.map(skill =>
      skill.id === id ? { ...skill, level: 'Expert' } : skill
    ));
  };

  // REMOVE: Using .filter() to exclude an item by ID
  const deleteSkill = (id) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  // ADD: Using spread syntax to append a new object
  const addSkill = () => {
    const newSkill = { id: nextSkillId.current++, name: 'New Skill', level: 'Learning' };
    setSkills([...skills, newSkill]);
  };

  return (
    <div>
      <h4>Professional Skills</h4>

      <ul>
        {skills.map(skill => (
          <li key={skill.id}>
            <strong>{skill.name}</strong> — {skill.level}
            <button onClick={() => promoteSkill(skill.id)}>Promote</button>
            <button onClick={() => deleteSkill(skill.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <button onClick={addSkill}>+ Add Skill</button>
    </div>
  );
};

export default SkillBadgeEditor;`,
    explanation: [
      '1. skill.id === id ? { ...skill, level: "Expert" } : skill: For every skill in the list, we ask whether it is the one we want to change. If yes, we copy the object and overwrite just the level.',
      '2. skill => skill.id !== id: Think of .filter() as a gatekeeper. Only the skills that pass the rule are copied into the new array.',
      '3. [...skills, newSkill]: This creates a new container, pours in the existing skills, and drops the new one in at the end.',
      '4. Why avoid push(): push() changes the existing array in place, so React does not get the clean new reference it expects.',
    ].join('\n'),
    demo: <SkillBadgeEditorDemo />,
  },
  {
    title: 'Adding Items to an Array',
    slideData: {
      title: 'Concept: Adding Items to an Array',
      bullets: [
        'Spread Syntax: Using [...arr, newItem] to add items.',
        'Functional update form: setItems(prevItems => [...prevItems, newItem]).',
        'Code Logic: copy the old array and append the new element.',
      ],
    },
    description:
      "Adding items to a React state array requires the creation of a new array instance. The ES6 spread syntax is the industry-standard way to accomplish this. By wrapping the spread operator and the new element inside square brackets, you are explicitly defining a new array in memory. This is critical because React's useState hook relies on referential equality — it only triggers an update if the memory address of the new state is different from the old one.",
    rwTitle: 'Discord',
    rwContent:
      "Discord uses this pattern for its message history stream. As new messages arrive, the client does not push them into the existing array. Instead, it spreads the current message list and appends the new message to the end. This ensures the component re-renders instantly and related features respond to the updated state predictably.",
    broadTitle: 'Performance Optimization',
    broadContent:
      'At a broad architectural level, this approach supports fast comparisons. Because spread syntax creates a new reference, React and memoization strategies can quickly see that something changed.',
    narrowTitle: 'Functional Updates Prevent Stale State',
    narrowContent:
      'When the next state depends on the previous state, the functional update form is best practice. It ensures that rapid consecutive updates always use the freshest available snapshot instead of a stale closure value.',
    fullCode: `import React, { useRef, useState } from 'react';

/**
 * Concept: Adding Items to an Array (Spread Syntax)
 * Implementation: A "Live Log" monitor for a local server simulation.
 */
const ServerLogMonitor = () => {
  const [logs, setLogs] = useState([
    { id: 1, timestamp: '12:00:00', status: 'INIT', message: 'System Booting...' }
  ]);
  const nextLogId = useRef(2);

  const generateLogEntry = () => {
    const newEntry = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      status: 'OK',
      message: 'Heartbeat signal received.'
    };

    // FUNCTIONAL UPDATE:
    // always append against the newest available log snapshot
    setLogs(prevLogs => [...prevLogs, newEntry]);
  };

  return (
    <div>
      <h4>System Status Logs</h4>

      <div>
        {logs.map(log => (
          <div key={log.id}>
            [{log.timestamp}] {log.status}: {log.message}
          </div>
        ))}
      </div>

      <button onClick={generateLogEntry}>Ping Server</button>
    </div>
  );
};

export default ServerLogMonitor;`,
    explanation: [
      '1. prevLogs => [...prevLogs, newEntry]: prevLogs is a fresh snapshot of the array at the exact moment React applies the update.',
      '2. ...prevLogs copies each existing item into a new array.',
      '3. newEntry is appended after the old items, so the resulting array is both complete and brand new.',
      '4. This is safer than referencing logs directly when multiple quick updates may happen in one event cycle.',
    ].join('\n'),
    demo: <ServerLogMonitorDemo />,
  },
  {
    title: 'Removing Items from an Array',
    slideData: {
      title: 'Concept: Removing Items from an Array',
      bullets: [
        'Use filter() to remove items without mutating the original array.',
        'Keep the items that should remain in the next state.',
        'Common pattern: items.filter(item => item.id !== idToRemove).',
      ],
    },
    description:
      'To remove an item from a React state array, we use .filter(). In JavaScript, .filter() is a non-mutative operation; it iterates through the existing array and produces a brand new array reference containing only the elements that pass a rule. Because a new reference is created, React identifies that the state has changed and updates the DOM accordingly.',
    rwTitle: 'Gmail',
    rwContent:
      "Gmail applies this logic when a user discards a draft. The application does not modify the master list directly. Instead, it filters the current collection to exclude the draft ID that should disappear.",
    broadTitle: 'Data Integrity',
    broadContent:
      'In large applications, filter() helps protect data integrity. The old version of the array stays untouched, while the new version reflects the latest UI truth.',
    narrowTitle: 'Boolean Predicate Logic',
    narrowContent:
      "The function passed to .filter() must return true for items you want to keep and false for items you want to discard. When deleting by ID, item.id !== idToRemove is the common pattern because it means keep every item whose ID does not match the one we want to remove.",
    fullCode: `import React, { useState } from 'react';

/**
 * Concept: Removing Items (The Filter Pattern)
 * Implementation: A "Tab Manager" for a specialized browser workspace.
 */
const WorkspaceTabManager = () => {
  const [tabs, setTabs] = useState([
    { id: 't1', title: 'Dashboard', active: true },
    { id: 't2', title: 'API Docs', active: false },
    { id: 't3', title: 'Terminal', active: false }
  ]);

  const closeTab = (tabId) => {
    // FILTER PATTERN:
    // Keep every tab whose ID is NOT the one we clicked.
    const updatedTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(updatedTabs);
  };

  return (
    <div>
      {tabs.map((tab) => (
        <div key={tab.id}>
          {tab.title}
          <button onClick={() => closeTab(tab.id)}>×</button>
        </div>
      ))}

      {tabs.length === 0 && <p>No active tabs.</p>}
    </div>
  );
};

export default WorkspaceTabManager;`,
    explanation: [
      '1. tabs.filter(...): Think of this like a sieve. You pour the entire array through it.',
      '2. tab.id !== tabId: Every tab whose ID does not match the target is allowed into the new array.',
      '3. The matching tab fails the test and is left out of the next state.',
      '4. React receives a new array reference, so the UI can cleanly remove the item from the screen.',
    ].join('\n'),
    demo: <WorkspaceTabManagerDemo />,
  },
  {
    title: 'Modifying Items in an Array',
    slideData: {
      title: 'Concept: Modifying Items in an Array',
      bullets: [
        'Use map() to transform items based on conditions.',
        'When array items are objects, combine map() with object spread.',
        'Update only the target item while returning all others unchanged.',
      ],
    },
    description:
      'To modify a specific item within a React state array, we use .map(). We cannot simply target an index and reassign its value because that mutates the original reference. Instead, .map() iterates through the entire array and builds a completely new one. For each element, we decide whether to return the original item or a new updated version.',
    rwTitle: 'Airbnb',
    rwContent:
      "Airbnb uses this pattern for guest counters and stay details. When you change one category, the parent array is rebuilt immutably so the UI and calculations stay synchronized.",
    broadTitle: 'Component Reusability',
    broadContent:
      'This approach supports reusable child components. Parent components can safely update just one item while preserving the shape and stability of the surrounding list.',
    narrowTitle: 'Map-and-Spread for Arrays of Objects',
    narrowContent:
      'The usual pattern is array.map(item => item.id === target ? { ...item, someField: newValue } : item). This preserves all other properties while changing the one field that should update.',
    fullCode: `import React, { useState } from 'react';

/**
 * Concept: Modifying Array Items (The Map Pattern)
 * Implementation: A "Reading Progress" tracker for an e-book library.
 */
const ReadingProgressTracker = () => {
  const [books, setBooks] = useState([
    { id: 'b1', title: 'The Great Gatsby', progress: 10 },
    { id: 'b2', title: '1984', progress: 45 },
    { id: 'b3', title: 'Moby Dick', progress: 0 }
  ]);

  const updateProgress = (bookId) => {
    setBooks(books.map(book => {
      if (book.id === bookId) {
        return { ...book, progress: Math.min(book.progress + 10, 100) };
      }

      return book;
    }));
  };

  return (
    <div>
      {books.map(book => (
        <div key={book.id}>
          <strong>{book.title}</strong>: {book.progress}%
          <button onClick={() => updateProgress(book.id)}>Read 10%</button>
        </div>
      ))}
    </div>
  );
};

export default ReadingProgressTracker;`,
    explanation: [
      '1. books.map(book => ...): Every book is inspected one by one.',
      '2. if (book.id === bookId): This is the conditional checkpoint that decides whether the current item is the one we want to update.',
      '3. { ...book, progress: ... }: We copy the object and overwrite only the progress field so no other metadata is lost.',
      '4. return book for every non-target item preserves the rest of the array exactly as it was.',
    ].join('\n'),
    demo: <ReadingProgressTrackerDemo />,
  },
  {
    title: 'Advanced Operations',
    slideData: {
      title: 'Concept: Advanced Operations',
      bullets: [
        'Use slice() plus spread when inserting at a specific position.',
        'Avoid splice() because it mutates the original array.',
        'Pattern: [...items.slice(0, index), newItem, ...items.slice(index)].',
      ],
    },
    description:
      'Inserting an item into a specific index requires a more surgical immutable pattern. Because we cannot use splice() against React state, we use .slice() to carve the array into two parts: everything before the target index and everything from the target index onward. We then use spread syntax to stitch those pieces back together around the new element.',
    rwTitle: 'Adobe Express',
    rwContent:
      'Design and layer-management tools use this pattern when inserting an item between existing layers. The order is rebuilt cleanly without mutating the original collection.',
    broadTitle: 'Deterministic State',
    broadContent:
      'This pattern helps preserve deterministic state transitions. Developers can clearly see what came before the insertion point, what was inserted, and what remained after it.',
    narrowTitle: 'slice() Creates Safe Boundaries',
    narrowContent:
      'slice(0, index) returns the items before the insertion point, while slice(index) returns the items at and after that point. Because slice() does not mutate the original array, it is ideal for building a new ordered result.',
    fullCode: `import React, { useRef, useState } from 'react';

/**
 * Concept: Advanced Insertion (Spread + Slice)
 * Implementation: A "Playlist Arranger" for a radio station broadcast.
 */
const RadioPlaylistArranger = () => {
  const [songs, setSongs] = useState([
    { id: 's1', title: 'Morning Jazz', duration: '3:45' },
    { id: 's2', title: 'News Bulletin', duration: '5:00' }
  ]);
  const nextAdId = useRef(1);

  const insertUrgentAd = (index) => {
    const ad = { id: \`ad-\${nextAdId.current++}\`, title: '*** URGENT SPONSOR ***', duration: '0:30' };

    const updatedPlaylist = [
      ...songs.slice(0, index),
      ad,
      ...songs.slice(index)
    ];

    setSongs(updatedPlaylist);
  };

  return (
    <div>
      <ol>
        {songs.map((song, idx) => (
          <li key={song.id}>
            {song.title} ({song.duration})
            <button onClick={() => insertUrgentAd(idx)}>Insert Ad Above</button>
          </li>
        ))}
      </ol>

      <button onClick={() => insertUrgentAd(songs.length)}>Add Ad to End</button>
    </div>
  );
};

export default RadioPlaylistArranger;`,
    explanation: [
      '1. songs.slice(0, index) copies the items before the insertion point.',
      '2. The new ad object is placed between the two slices.',
      '3. songs.slice(index) copies everything from the insertion point onward.',
      '4. Spread syntax merges all pieces into one brand-new ordered array.',
    ].join('\n'),
    demo: <RadioPlaylistArrangerDemo />,
  },
  {
    title: 'Handling Complex State Updates',
    slideData: {
      title: 'Concept: Handling Complex State Updates',
      bullets: [
        'Shallow vs. selective deep copying matters for arrays of objects.',
        'Use map() plus object spread when changing one nested item.',
        'Create a new array and a new object for the element being updated.',
      ],
    },
    description:
      'Complex state involves arrays of objects or nested structures. A shallow copy of an array only copies the top-level container; the objects inside still point at their original memory addresses. To update a nested property correctly, we create a new array reference and a new object reference for the specific item being changed. This gives React a clear path for recognizing what changed.',
    rwTitle: 'Trello',
    rwContent:
      'Trello-style card metadata updates depend on this pattern. The app identifies the specific card object, creates an updated version of that card, and places it into a new list or column array.',
    broadTitle: 'Foundation for Larger State Systems',
    broadContent:
      'These patterns prepare developers for Redux-style reducers, state persistence, undo/redo flows, and other architectural systems that depend on immutable data transitions.',
    narrowTitle: 'Selective Deep Copying',
    narrowContent:
      'The critical idea is selective copying: copy the top-level array, then copy only the object that needs to change. Leave the rest alone so your code stays efficient and predictable.',
    fullCode: `import React, { useState } from 'react';

/**
 * Concept: Complex State (Nested Object Updates)
 * Implementation: A "Smart Greenhouse" sensor dashboard.
 */
const GreenhouseMonitor = () => {
  const [sensors, setSensors] = useState([
    { id: 'zone-1', type: 'Humidity', value: 45, status: 'Stable' },
    { id: 'zone-2', type: 'Temperature', value: 22, status: 'Stable' },
    { id: 'zone-3', type: 'CO2', value: 400, status: 'Stable' }
  ]);

  const triggerAlert = (sensorId) => {
    setSensors(sensors.map(sensor =>
      sensor.id === sensorId
        ? { ...sensor, status: 'Alert', value: sensor.value + 10 }
        : sensor
    ));
  };

  return (
    <div>
      {sensors.map(sensor => (
        <div key={sensor.id}>
          <strong>{sensor.type}</strong>: {sensor.value} ({sensor.status})
          <button onClick={() => triggerAlert(sensor.id)}>Simulate Surge</button>
        </div>
      ))}
    </div>
  );
};

export default GreenhouseMonitor;`,
    explanation: [
      '1. { ...sensor, status: "Alert", value: sensor.value + 10 } copies the sensor object and overwrites only the fields that should change.',
      '2. sensors.map(...) rebuilds the array while keeping untouched objects stable.',
      '3. Copying only the changed object is more precise than blindly reconstructing everything deeply.',
      '4. This pattern scales well for arrays of records, cards, items, and dashboards.',
    ].join('\n'),
    demo: <GreenhouseMonitorDemo />,
  },
  {
    title: 'Using Immer for Simplicity',
    slideData: {
      title: 'Concept: Using Immer for Simplicity',
      bullets: [
        'Immer simplifies immutable operations by letting you write draft-style logic.',
        'Developers can write push() and assignment syntax against a safe draft.',
        'The library then produces a new immutable result for React.',
      ],
    },
    description:
      "Immer is a popular library that allows developers to work with immutable state using convenient, mutable-style syntax. It works by creating a temporary draft state. You apply changes to the draft as if it were normal JavaScript, and then Immer calculates a brand-new immutable state object. This removes much of the cognitive overhead that appears in deeply nested spread updates.",
    rwTitle: 'Figma',
    rwContent:
      'Tools with deeply nested document trees benefit from Immer-style logic because developers can focus on the business change instead of manually rebuilding every parent level by hand.',
    broadTitle: 'Reducing Technical Debt',
    broadContent:
      'As state objects grow more complex, manual spread patterns can become noisy and error-prone. Immer helps teams keep code readable while preserving React’s immutable rendering model.',
    narrowTitle: 'Draft Producer Functions',
    narrowContent:
      'The typical approach uses a producer function that receives a draft. The developer writes the intended mutation against that draft, and Immer computes the final immutable next state. In this lecture demo, the UI simulates the same developer experience with a custom updateFeed helper so the concept stays visible without introducing a new dependency into the current project.',
    fullCode: `import React, { useRef, useState } from 'react';

/**
 * Concept: Immer for Simplicity
 * Implementation: A "Live Commentary" feed for a sports broadcast.
 */
const SportsCommentaryFeed = () => {
  const [feed, setFeed] = useState({
    matchName: 'Global Finals 2026',
    events: [{ id: 1, time: "12'", text: 'Match Started', type: 'INFO' }]
  });
  const nextEventId = useRef(2);

  // This helper simulates Immer-style draft updates for teaching purposes.
  const updateFeed = (producer) => {
    setFeed((prev) => {
      const draft = {
        ...prev,
        events: [...prev.events]
      };

      producer(draft);
      return draft;
    });
  };

  const addCommentary = (text) => {
    updateFeed((draft) => {
      draft.events.push({
        id: nextEventId.current++,
        time: "45'",
        text,
        type: 'LIVE'
      });
    });
  };

  return (
    <div>
      <h2>{feed.matchName}</h2>

      <div>
        {feed.events.map(event => (
          <p key={event.id}>
            <strong>{event.time}</strong>: {event.text}
          </p>
        ))}
      </div>

      <button onClick={() => addCommentary('Goal scored by the visiting team!')}>
        Add Goal Update
      </button>
    </div>
  );
};

export default SportsCommentaryFeed;`,
    explanation: [
      '1. Immer is a convenience layer around immutable thinking. It lets you write draft-style updates instead of hand-writing every spread combination yourself.',
      '2. In the current project, the demo uses an updateFeed helper to mimic the teaching idea without adding a new dependency.',
      '3. draft.events.push(...) is safe in this simulated approach because the helper already copied the outer object and the events array before running the producer.',
      '4. The core lesson remains the same: React still needs a fresh immutable result, even if developer ergonomics improve.',
    ].join('\n'),
    demo: <SportsCommentaryFeedDemo />,
  },
]

export default function Week03ArraysInStateMasterclass({
  onBack,
  onSectionChange,
  title = 'Introduction to Updating Arrays in React State',
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [sectionsCollapsed, setSectionsCollapsed] = useState(false)
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
      title: 'Best Practices and Recap',
    })
  }, [activeIndex, onSectionChange])

  return (
    <div className="sm-page">
      <div className="sm-toolbar">
        <button className="sm-button ghost" onClick={onBack}>
          ← Back to Week 03
        </button>

        <div className="sm-toolbar-copy">
          <p className="sm-kicker">AD312 • Week 03 • Lecture 01</p>
          <h2>{title}</h2>
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
            <span>Best Practices and Recap</span>
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
