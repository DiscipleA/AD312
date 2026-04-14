import { useEffect, useMemo, useState } from 'react'
import '../styles/stateMasterclass.css'

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
      {bullets.map((b, i) => (
        <li key={i}>{b}</li>
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
        <p>{narrowContent}</p>
      </div>

      <h3 className="sm-subheading">Full Code Example</h3>
      <pre className="sm-code">
        <code>{fullCode}</code>
      </pre>

      <h3 className="sm-subheading">Code in Action</h3>
      <div className="sm-demo-shell">{children}</div>

      <div className="sm-explanation">
        <h3>Simple Code Explanation</h3>
        <div className="sm-preline">{explanation}</div>
      </div>
    </section>
  )
}

function LikeButton() {
  const [likes, setLikes] = useState(0)

  return (
    <div className="sm-demo sm-center">
      <p>Total Likes: {likes}</p>
      <button className="sm-button" onClick={() => setLikes(likes + 1)}>
        Like
      </button>
    </div>
  )
}

function ProductDescription() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="sm-demo">
      <h3>Awesome Sneakers</h3>
      {isExpanded && <p>These sneakers feature cloud-foam technology and recycled mesh.</p>}
      <button className="sm-button" onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Show Less' : 'Show More'}
      </button>
    </div>
  )
}

function ItemCounter() {
  const [count, setCount] = useState(1)

  return (
    <div className="sm-demo sm-center">
      <div className="sm-row">
        <button className="sm-button" onClick={() => setCount((prev) => (prev > 0 ? prev - 1 : 0))}>
          -
        </button>
        <span className="sm-stat">Quantity: {count}</span>
        <button className="sm-button" onClick={() => setCount((prev) => prev + 1)}>
          +
        </button>
      </div>
    </div>
  )
}

function GreetingApp() {
  const [name, setName] = useState('')

  return (
    <div className="sm-demo">
      <label>Enter your name: </label>
      <input
        className="sm-input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type here..."
      />
      <p className="sm-demo-title" style={{ marginTop: '10px' }}>
        {name ? `Hello, ${name}!` : 'Please enter your name.'}
      </p>
    </div>
  )
}

function FAQItem() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="sm-demo">
      <h4 style={{ cursor: 'pointer', margin: 0 }} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '▼' : '▶'} What is your return policy?
      </h4>
      {isOpen && (
        <p style={{ marginTop: '12px' }}>
          You can return any item within 30 days for a full refund!
        </p>
      )}
    </div>
  )
}

function RecipeGallery() {
  const recipes = ['Lasagna', 'Street Tacos', 'Greek Salad', 'Sushi Rolls']
  let regularIndex = 0
  const [index, setIndex] = useState(0)

  function nextRecipe() {
    regularIndex = regularIndex + 1
    setIndex(index + 1)
  }

  return (
    <div className="sm-demo sm-center">
      <h2 className="sm-demo-title">Current Recipe: {recipes[index]}</h2>
      <p>(Internal count: {regularIndex} - this won't change on screen!)</p>
      <button
        className="sm-button"
        onClick={nextRecipe}
        disabled={index >= recipes.length - 1}
      >
        Next Recipe
      </button>
    </div>
  )
}

function RegistrationForm() {
  const [username, setUsername] = useState('')
  const [role, setRole] = useState('Developer')

  return (
    <div className="sm-demo sm-stack">
      <h3>Create Your Profile</h3>
      <input
        className="sm-input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter Username"
      />
      <select
        className="sm-input"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="Developer">Developer</option>
        <option value="Designer">Designer</option>
        <option value="Manager">Manager</option>
      </select>
      <div style={{ marginTop: '8px', background: '#f9f9f9', padding: '10px', borderRadius: '10px' }}>
        <strong>Preview Card:</strong>
        <p>Name: {username || '---'}</p>
        <p>Role: {role}</p>
      </div>
    </div>
  )
}

function ThemeSettings() {
  const [theme, setTheme] = useState('light')
  const nextTheme = theme === 'light' ? 'dark' : 'light'

  return (
    <div className={theme === 'light' ? 'sm-demo theme-light' : 'sm-demo theme-dark'}>
      <h3>App Settings</h3>
      <p>
        The current theme is: <strong>{theme}</strong>
      </p>
      <button className="sm-button" onClick={() => setTheme(nextTheme)}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  )
}

function EmployeeForm() {
  const [employee, setEmployee] = useState({
    fullName: '',
    department: 'Engineering',
  })

  function handleNameChange(e) {
    setEmployee({
      ...employee,
      fullName: e.target.value,
    })
  }

  return (
    <div className="sm-demo sm-stack">
      <h3>New Employee Entry</h3>
      <input
        className="sm-input"
        type="text"
        placeholder="Full Name"
        value={employee.fullName}
        onChange={handleNameChange}
      />
      <p>
        Summary: {employee.fullName || '---'} works in {employee.department}
      </p>
    </div>
  )
}

function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)

  return (
    <div className="sm-demo theme-dark">
      <h3>Now Playing: React Tutorial</h3>
      <div
        style={{
          height: '100px',
          border: '1px solid #555',
          marginBottom: '10px',
          display: 'grid',
          placeItems: 'center',
          borderRadius: '10px',
        }}
      >
        {isPlaying ? '▶️ Video is playing...' : '⏸️ Video is paused'}
      </div>
      <button className="sm-button" onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <div style={{ marginTop: '10px' }}>
        <label>Volume: {isMuted ? 0 : volume}</label>
        <input
          className="sm-input"
          type="range"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      </div>
      <button className="sm-button" onClick={() => setIsMuted(!isMuted)}>
        {isMuted ? 'Unmute' : 'Mute'}
      </button>
    </div>
  )
}

function RecapSection() {
  return (
    <div
      style={{
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '50px',
        borderRadius: '20px',
        marginTop: '60px',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '10px' }}>
        Recap and Best Practices
      </h1>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '40px', color: '#3498db' }}>
        The React State Journey
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <div>
          <h3>1. State as a Managed Snapshot</h3>
          <p style={{ lineHeight: '1.6' }}>
            React State is a snapshot of your UI at a specific point in time. Changing state discards the old snapshot and creates a new one, triggering a re-render.
          </p>

          <h3>2. The Asynchronous Nature of Updates</h3>
          <p style={{ lineHeight: '1.6' }}>
            React state updates are asynchronous and batched. This optimization prevents the screen from flickering or slowing down during rapid interactions.
          </p>
          <p>
            <strong>Best Practice:</strong> Use the updater function pattern <code>setScore(prev =&gt; prev + 1)</code> when updating based on previous values.
          </p>
        </div>

        <div>
          <h3>3. Each Render Has Its Own Snapshot</h3>
          <p style={{ lineHeight: '1.6' }}>
            Every render is a fresh execution of a function with its own local variables. Event handlers capture these variables at the moment they are created, ensuring consistency across time.
          </p>

          <h3>4. Summary of Key Concepts</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #3498db' }}>
                <th style={{ textAlign: 'left', padding: '12px' }}>Concept</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>Simple Terms</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #4a6278' }}>
                <td style={{ padding: '12px' }}>State vs. Variables</td>
                <td style={{ padding: '12px' }}>State tells browser to "Redraw!"</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #4a6278' }}>
                <td style={{ padding: '12px' }}>Batching</td>
                <td style={{ padding: '12px' }}>React waits for function end to update.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #4a6278' }}>
                <td style={{ padding: '12px' }}>Snapshots</td>
                <td style={{ padding: '12px' }}>A "time capsule" from an action's start.</td>
              </tr>
              <tr>
                <td style={{ padding: '12px' }}>Updater Functions</td>
                <td style={{ padding: '12px' }}>Uses the most recent version of data.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div
        style={{
          marginTop: '40px',
          padding: '25px',
          backgroundColor: '#34495e',
          borderRadius: '10px',
          textAlign: 'center',
          borderLeft: '6px solid #3498db',
        }}
      >
        <h3 style={{ marginTop: 0 }}>Final Best Practice: Isolated Memory</h3>
        <p style={{ marginBottom: 0 }}>
          Remember that state is local and private; each instance of a component maintains its own isolated memory, which is essential for a scalable and maintainable architecture.
        </p>
      </div>
    </div>
  )
}

const sections = [
  {
    title: "React State (The Component’s Memory)",
    description:
      'State is data that changes over time and, most importantly, causes the UI to update automatically whenever it does change.',
    slideData: {
      title: 'Concept: React State',
      bullets: [
        "Defined as a component's memory",
        'Changes over time',
        'Causes automatic UI updates',
      ],
    },
    rwTitle: `The Shopping Cart`,
        rwContent:
      `Imagine you are browsing an e-commerce app like Amazon. When you click "Add to Cart," the number on the little cart icon at the top right changes from 0 to 1. That number is State. The app needs to "remember" how many items you've selected so far. Without state, the webpage wouldn't know you clicked anything, and the UI would stay frozen at zero.`,
            broadTitle: `System Logic`,
                broadContent:
      `On a broad level, state management is the backbone of "Single Page Applications" (SPAs). It allows a website to feel like a mobile app. Instead of refreshing the whole page to show new data, React just updates the specific "memory" (state) of a component, and only that tiny part of the screen re-renders.`,
                    narrowTitle: `Specific UI Component`,
                        narrowContent:
      `In a specific component, like a Toggle Switch or a Search Bar, state is used to track a single piece of information: "Is this switch ON or OFF?" "What letters has the user typed into this box so far?" `,
                            fullCode: `import React, { useState } from 'react';

function LikeButton() { 
  const [likes, setLikes] = useState(0); 

  return ( 
    <div> 
      <p>Total Likes: {likes}</p> 
      <button onClick={() => setLikes(likes + 1)}> 
        Like 
      </button> 
    </div> 
  ); 
}`,
    explanation:
      `const [likes, setLikes] = useState(0): This is how we tell React, "I want this component to remember a number." likes is the current number (the memory). setLikes is the only way we are allowed to change that memory. 0 is where we start.

{likes}: This tells React to display the current value of the memory right there on the screen.

onClick={() => setLikes(likes + 1)}: This is the "trigger." When the user clicks, it fires the setLikes function. React then says, "Oh, the memory changed! I need to re-draw the button on the screen with the new number."`,
        demo: <LikeButton />,
  },
  {
    title: 'Understanding Component State',
    description:
      'Components are self-contained units that manage their own behavior and respond to events like clicks or hovers.',
    slideData: {
      title: 'Component Self-Containment',
      bullets: [
        'Manages look (presentation)',
        'Manages behavior (state)',
        'Responds to events',
      ],
    },
    rwTitle: `A Netflix Movie Card`,
        rwContent:
      `Think about a movie card on Netflix.

Presentation: It shows the movie poster and title.

Behavior (State): When you hover your mouse over it, the card expands and starts playing a preview.

The card component is "watching" for an event (the mouse hover). When that event happens, the card updates its internal state from isHovering: false to isHovering: true. This change in state tells the component to swap the static image for a video player.`,
            broadTitle: `Encapsulation`,
                broadContent:
      `On a large scale, this is called encapsulation. It means that if you have 20 movie cards on a screen, each one has its own independent memory. If you hover over one card, only that card expands. The others don't care because their internal state remains unchanged. This prevents a "messy" app where one small action accidentally triggers changes everywhere else.`,
                    narrowTitle: `Event Handling`,
                        narrowContent:
      `In a specific component, state is the bridge between a User Action and a UI Change.

Event: User clicks a "Show More" button.
State Change: isExpanded becomes true.
UI Response: Extra text suddenly appears.`,
                            fullCode: `import React, { useState } from 'react';

function ProductDescription() { 
  const [isExpanded, setIsExpanded] = useState(false); 

  const toggleText = () => { 
    setIsExpanded(!isExpanded); 
  }; 

  return ( 
    <div style={{ border: '1px solid #ccc', padding: '10px' }}> 
      <h3>Awesome Sneakers</h3> 
      {isExpanded && <p>These sneakers feature cloud-foam technology and recycled mesh.</p>} 
      <button onClick={toggleText}> 
        {isExpanded ? 'Show Less' : 'Show More'} 
      </button> 
    </div> 
  ); 
}`,
    explanation:
      `const [isExpanded, setIsExpanded] = useState(false): We’re creating a "boolean" memory (True/False). We start at false because we want the extra info hidden initially.

toggleText: This is the logic/behavior. It’s a small helper that says, "Whatever the memory is right now, flip it to the opposite."

{isExpanded && <p>...</p>}: This is a React trick. It says: "If isExpanded is true, draw this paragraph. If it's false, act like this code doesn't exist."

onClick={toggleText}: This connects the physical click of the button to the behavior we defined.`,
        demo: <ProductDescription />,
  },
  {
    title: 'The Counter Component (Functional State)',
    description:
      "Uses the useState hook to create mathematical memory and update it safely using the 'prev' pattern.",
    slideData: {
      title: 'Functional Updates',
      bullets: [
        "Mathematical 'memory'",
        'Safe update functions',
        'Prevents skipped clicks',
      ],
    },
    rwTitle: `A Quantity Selector`,
        rwContent:
      `You see this exact logic on Instacart or Uber Eats. When you are looking at a burrito, there is a + button. Every time you click it, the number goes up.

The State (count): The number of burritos in your order.
The Event (increment): The act of clicking that plus sign.
The UI Update: The text on the screen instantly changing from 1 to 2.`,
            broadTitle: `Predictable Data Flow`,
                broadContent:
      `On a broad scale, this example highlights Declarative Programming. You aren't telling the computer how to change the HTML text manually (like you would in old-school JavaScript). Instead, you just update the State, and React "declares" what the UI should look like based on that state. This makes large apps much easier to debug because the UI is always a direct reflection of the data.`,
                    narrowTitle: `Updater Functions`,
                        narrowContent:
      `Look closely at the code: setCount(prevCount => prevCount + 1). This is a "narrow" but vital best practice. Instead of just saying setCount(count + 1), we use a function that takes the previous state. This ensures that even if a user clicks the button ten times in one second, React processes every single click accurately without skipping a beat.`,
                            fullCode: `import { useState } from 'react';

function ItemCounter() { 
  const [count, setCount] = useState(1); 

  const increment = () => { 
    setCount(prevCount => prevCount + 1); 
  }; 

  const decrement = () => { 
    setCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0)); 
  }; 

  return ( 
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}> 
      <button onClick={decrement}>-</button> 
      <span>Quantity: {count}</span> 
      <button onClick={increment}>+</button> 
    </div> 
  ); 
}`,
    explanation:
      `const [count, setCount] = useState(0): count is our "Memory Variable." setCount is our "Remote Control" to change that memory.

prevCount => prevCount + 1: This is like saying, "Hey React, take whatever the number is right this second and add one to it." It’s the safest way to update numbers.

onClick={increment}: Notice there are no parentheses () after increment here. We are passing the instructions to the button, not running them immediately. The button will run the instructions only when it's actually clicked.

{count}: This is a placeholder. React replaces it with the actual number in the memory every time the component "re-renders."`,
        demo: <ItemCounter />,
  },
  {
    title: 'Text Input State (Controlled Components)',
    description:
      "Introduces the pattern where React 'captures' every keystroke to sync state with user input.",
    slideData: {
      title: 'Controlled Inputs',
      bullets: [
        'Capturing keystrokes',
        'Single Source of Truth',
        'Form Validation base',
      ],
    },
    rwTitle: `A Search Bar or Login Form`,
        rwContent:
      `Think about the search bar on Google or YouTube. As you type, the dropdown menu updates to show suggestions that match your letters.

The State (text): Stores exactly what you have typed so far (e.g., "how to bak").
The Event (onChange): Every time you hit a key, an event fires.
The Result: React updates the state, and the UI shows the new letters inside the box instantly.`,
            broadTitle: `Single Source of Truth`,
                broadContent:
      `In traditional HTML/JavaScript, the "input" field held its own value, and you had to "grab" it when you needed it. In React, we use the "Single Source of Truth" principle. The React State is the boss. If the state says the text is empty, the input box stays empty. This makes form validation (like checking for a valid email) much easier because you always know exactly what the user has typed.`,
                    narrowTitle: `Two-Way Binding`,
                        narrowContent:
      `The code in a slide creates a loop:

The user types a letter.
onChange catches that letter and sends it to setText.
setText updates the state.
React re-renders the component and sets the input's value to the new state.

This happens so fast (milliseconds) that the user never notices the loop.`,
                            fullCode: `import { useState } from 'react';

function GreetingApp() { 
  const [name, setName] = useState(""); 

  return ( 
    <div style={{ padding: '20px' }}> 
      <label>Enter your name: </label> 
      <input  
        type="text"  
        value={name}  
        onChange={(e) => setName(e.target.value)}  
        placeholder="Type here..." 
      /> 
      <p style={{ marginTop: '10px', fontWeight: 'bold' }}> 
        {name ? \`Hello, \${name}!\` : "Please enter your name."} 
      </p> 
    </div> 
  ); 
}`,
    explanation:
      `const [text, setText] = useState(""): We start the memory with an empty string because the box starts empty.

value={text}: This is the "Control." It tells the input box: "Don't just show whatever the user types; show exactly what is in our React memory."

onChange={(e) => setText(e.target.value)}: e is the "event" (the keystroke). e.target is the input box itself. e.target.value is the current string inside the box. We send that string to setText to update our memory.

{name ? ... : ...}: This is a ternary operator. It checks if the memory has anything in it. If yes, it greets you; if no, it asks for your name.`,
        demo: <GreetingApp />,
  },
  {
    title: 'Toggle Visibility (Conditional Rendering)',
    description:
      'Using Boolean state to hide or show elements—a fundamental concept called Conditional Rendering.',
    slideData: {
      title: 'Conditional Rendering',
      bullets: [
        'Boolean true/false',
        'Conditional UI shaping',
        'The && Operator',
      ],
    },
    rwTitle: `The Password Eye or Mobile Menu`,
        rwContent:
      `You see this logic every time you log into a site:

The Password Field: You click a little "eye" icon to reveal your password. Clicking it again hides it.

Mobile Hamburger Menu: You tap the three lines, and the menu appears. Tap again, and it vanishes.

The State (isVisible): Is the menu open? (True or False).`,
            broadTitle: `Layout Control`,
                broadContent:
      `On a broad scale, this is how "Conditional UI" works. Instead of creating different pages for every scenario, you have one page that "shapes" itself based on state. If isLoggedIn is false, show the Login Form. If isLoggedIn is true, show the User Dashboard.`,
                    narrowTitle: `The Logical && Operator`,
                        narrowContent:
      `There is a specific JavaScript trick: {isVisible && <p>...</p>}. In React, this means: "If the thing on the left is true, render the thing on the right. If it's false, do nothing." It is the cleanest way to add or remove a single element from the DOM without writing long "if/else" statements.`,
                            fullCode: `import { useState } from 'react';

function FAQItem() { 
  const [isOpen, setIsOpen] = useState(false); 

  return ( 
    <div style={{ borderBottom: '1px solid #ddd', padding: '10px' }}> 
      <h4 style={{ cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}> 
        {isOpen ? '▼' : '▶'} What is your return policy? 
      </h4> 
      {isOpen && ( 
        <p style={{ color: '#666' }}> 
          You can return any item within 30 days for a full refund! 
        </p> 
      )} 
    </div> 
  ); 
}`,
    explanation:
      `const [isVisible, setIsVisible] = useState(true): In your screenshot, it starts as true, meaning the message "Now you see me!" is visible the moment the page loads.

setIsVisible(!isVisible): The exclamation mark ! is the "NOT" operator. It's a shortcut for "give me the opposite." If isVisible is true, !isVisible is false. This creates the "toggle" effect back and forth.

{isVisible && ...}: Think of the && as a gatekeeper.`,
        demo: <FAQItem />,
  },
  {
    title: 'Adding State Variable (State vs. Regular)',
    description:
      `The "aha!" moment: Regular variables change in background, State variables shout to browser to redraw.`,
    slideData: {
      title: 'React Render Cycle',
      bullets: [
        'State vs. Regular Variables',
        'Binding data and display',
        'Redraw triggers',
      ],
    },
    rwTitle: 'Recipe Gallery',
    rwContent:
      `A "Next" button using "let index = 0" won't move the photo. Browser doesn't know it needs to redraw.`,
    broadTitle: 'React Render Cycle',
    broadContent:
      `useState registers variables with React's tracking. Change = Re-run function to see what's new.`,
    narrowTitle: 'Tracking an Index',
    narrowContent:
      'State narrows down to a single number: the index of current item (Lasagna = 0, Tacos = 1).',
    fullCode: `import { useState } from 'react';

function RecipeGallery() { 
  const recipes = ['Lasagna', 'Street Tacos', 'Greek Salad', 'Sushi Rolls']; 
  let regularIndex = 0;  
  const [index, setIndex] = useState(0); 

  const nextRecipe = () => { 
    regularIndex = regularIndex + 1;  
    setIndex(index + 1);  
  }; 

  return ( 
    <div style={{ textAlign: 'center', padding: '20px' }}> 
      <h2>Current Recipe: {recipes[index]}</h2> 
      <p>(Internal count: {regularIndex} - this won't change on screen!)</p> 
      <button onClick={nextRecipe} disabled={index >= recipes.length - 1}> 
        Next Recipe 
      </button> 
    </div> 
  ); 
}`,
    explanation:
      `regularIndex: Like a note in your pocket (only you know).
useState index: Like a giant scoreboard for everyone.`,
    demo: <RecipeGallery />,
  },
  {
    title: 'Tracking Form Input (Mirroring)',
    description:
      `State acts as a "live mirror" of user actions, creating a responsive feedback loop.`,
    slideData: {
      title: 'Live State Mirroring',
      bullets: [
        'Profile Editor logic',
        'Synthetic Events',
        'Real-time sync',
      ],
    },
    rwTitle: `Profile Editor or Live Search`,
        rwContent:
      `Think about updating your username on a social media profile like LinkedIn or Discord.

The State (name): As you type your new handle, the page shows you a preview of how it will look on your profile card.

The Mirror Effect: The text in the <p> tag updates instantly with every character, giving you immediate confirmation of what you’ve typed before you even hit "Save." `,
            broadTitle: `Form Validation`,
                broadContent:
      `On a large scale, tracking form input is the first step toward client-side validation. Because the state knows exactly what is in the box at all times, you can instantly check if an email is formatted correctly, if a password is long enough, or if a username is already taken—all without the user needing to click a "Submit" button first.`,
                    narrowTitle: `The Synthetic Event`,
                        narrowContent:
      `The code uses (e) => setName(e.target.value). In a narrowed sense, this is React handling a Synthetic Event. React wraps the browser's native event into its own system (e) to ensure that form tracking works identically across every browser (Chrome, Safari, Firefox), making your app more stable.`,
                            fullCode: `import { useState } from 'react';

function RegistrationForm() { 
  const [username, setUsername] = useState(""); 
  const [role, setRole] = useState("Developer"); 

  return ( 
    <div style={{ padding: '20px', border: '1px solid #ddd' }}> 
      <h3>Create Your Profile</h3> 
      <input  
        type="text"  
        value={username}  
        onChange={(e) => setUsername(e.target.value)}  
        placeholder="Enter Username" 
      /> 
      <select value={role} onChange={(e) => setRole(e.target.value)}> 
        <option value="Developer">Developer</option> 
        <option value="Designer">Designer</option> 
        <option value="Manager">Manager</option> 
      </select> 
      <div style={{ marginTop: '20px', background: '#f9f9f9', padding: '10px' }}> 
        <strong>Preview Card:</strong> 
        <p>Name: {username || "---"}</p> 
        <p>Role: {role}</p> 
      </div> 
    </div> 
  ); 
}`,
    explanation:
      `const [name, setName] = useState(""): We set up a dedicated memory slot specifically for the string of text the user enters.

value={name}: This is the "locking" mechanism. It forces the input box to always show exactly what is in the React memory.

onChange={(e) => ...}: This is the "listener." Every time the user adds a letter, deletes one, or pastes text, this function fires.

e.target.value: This is the bridge. It grabs the current string inside the actual HTML element and hands it over to React's setName function to update the memory.

<p>Your name is: {name}</p>: This is the payoff. Because React re-renders whenever name changes, this paragraph stays perfectly in sync with the input box.`,
        demo: <RegistrationForm />,
  },
  {
    title: 'Anatomy of useState',
    description:
      'Technical structure of the hook: naming conventions and parts returned (value vs setter).',
    slideData: {
      title: 'useState Breakdown',
      bullets: [
        'Array Destructuring',
        'Reflective Naming',
        'Read-only vs. Updater',
      ],
    },
    rwTitle: `The Volume Slider`,
        rwContent:
      `Imagine a volume slider in a music app like Spotify.

Initial State: When you open the app, the volume starts at a specific level (e.g., 50).

Reflective Naming: You wouldn't name the state x; you’d name it volume.

The Setter: When you slide the bar, the setVolume function is called to update that memory.`,
            broadTitle: `Naming Conventions & Readability`,
                broadContent:
      `On a broad scale, Reflective Naming is a professional standard. In large apps with hundreds of components, using names like [data, setData] everywhere makes the code impossible to read. Following the pattern [thing, setThing] allows any developer on a team to instantly understand what that piece of memory is for.`,
                    narrowTitle: `Array Destructuring`,
                        narrowContent:
      `The useState call uses a JavaScript feature called Array Destructuring.
const [state, setState] = useState(initialValue);

state: The current value (Read-only).

setState: The function to change the value (The "Updater").

initialValue: What the state starts as during the very first render.`,
                            fullCode: `import { useState } from 'react';

function ThemeSettings() { 
  const [theme, setTheme] = useState('light'); 

  const toggleTheme = () => { 
    const nextTheme = theme === 'light' ? 'dark' : 'light'; 
    setTheme(nextTheme); 
  }; 

  return ( 
    <div style={{ backgroundColor: theme === 'light' ? '#fff' : '#333' }}> 
      <h3>App Settings</h3> 
      <p>The current theme is: <strong>{theme}</strong></p> 
      <button onClick={toggleTheme}> 
        Switch Mode 
      </button> 
    </div> 
  ); 
}`,
    explanation:
      `useState('light'): We are passing 'light' as the Initial State. This is the starting point.

const [theme, setTheme]: We are grabbing the two things React gives us.

theme is the variable we use to decide what colors to show on the screen.

setTheme is the "trigger" we use when the user clicks the button.

Reflective Naming: By calling it theme, the logic theme === 'light' reads almost like a plain English sentence.

setTheme(nextTheme): This is the only way to change the theme. You can never do theme = 'dark'; React won't see that change. You must use the setter function to tell React to refresh the screen.`,
        demo: <ThemeSettings />,
  },
  {
    title: 'Object State & Spread Operator',
    description:
      'Using an Object instead of a single value to remember multiple related pieces of info.',
    slideData: {
      title: 'Complex State Objects',
      bullets: [
        'State Consolidation',
        'Immutability Rule',
        'Spread Operator Copying',
      ],
    },
    rwTitle: `A User Profile Settings Page`,
        rwContent:
      `Think of the "Settings" page on Instagram or X (Twitter).

The State (user): A single object containing your bio, location, website, and display name.

The Update: When you change your bio, you don't want your location or website to disappear. React has to "keep" the old data while adding the new character you just typed.`,
            broadTitle: `State Consolidation`,
                broadContent:
      `On a broad scale, grouping related data into an object reduces "State Bloat." Instead of having 10 different useState lines for a complex form, you have one or two objects. This makes it easier to send the final data to a database because it's already organized in the format the server expects.`,
                    narrowTitle: `The Spread Operator (...)`,
                        narrowContent:
      `The slide shows a vital React rule: State is Immutable. You cannot just change one piece of an object directly. You must create a brand new object.

The Spread Operator (...user) is the tool for this. It says: "Copy everything from the old version of the user, then overwrite just the name (or age)." `,
                            fullCode: `import { useState } from 'react';

function EmployeeForm() { 
  const [employee, setEmployee] = useState({ 
    fullName: '', 
    department: 'Engineering' 
  }); 

  const handleNameChange = (e) => { 
    setEmployee({ 
      ...employee,            
      fullName: e.target.value 
    }); 
  }; 

  return ( 
    <div> 
      <h3>New Employee Entry</h3> 
      <input value={employee.fullName} onChange={handleNameChange} /> 
      <p>Summary: {employee.fullName} works in {employee.department}</p> 
    </div> 
  ); 
}`,
    explanation:
      `useState({ name: '', age: 0 }): We are starting our memory with a "dictionary" (object) that has two slots ready to go.

...user (The Copycat): This is the most important part of the code. If you forget ...user and just write setUser({ name: e.target.value }), the age will be deleted from memory. The spread operator acts like a photocopier that keeps the rest of the object safe.

user.name and user.age: Since the data is inside an object, we use "dot notation" to tell React exactly which piece of the memory we want to display.

onChange Logic: Each input is responsible for updating its specific "key" in the object while using the spread operator to preserve the others.`,
        demo: <EmployeeForm />,
  },
  {
    title: 'Managing Multiple State Variables',
    description:
      'Handling complexity by calling useState multiple times or grouping data into objects.',
    slideData: {
      title: 'Managing Complexity',
      bullets: [
        'Independent useState calls',
        'State Objects vs. Variables',
        'Independent updates',
      ],
    },
    rwTitle: `A Video Player`,
        rwContent:
      `Think about the interface of YouTube or Netflix. A single video player component has to remember a lot of different things at once:

isPlaying: (Boolean) Is the video running or paused?

volume: (Number) How loud is the audio?

currentTime: (Number) Where are you in the movie?

isMuted: (Boolean) Is the sound toggled off?`,
            broadTitle: `State Organization`,
                broadContent:
      `On a broad scale, the decision between multiple variables and a single object is about scalability.

Multiple useState calls: Best when pieces of data are independent (e.g., changing the volume doesn't affect whether the video is paused).

State Objects: Best when data is tightly coupled (e.g., a "User Profile" with a name, email, and bio that are almost always updated together).`,
                    narrowTitle: `Independent Updates`,
                        narrowContent:
      `In a narrowed sense, React is designed to handle multiple useState hooks flawlessly. Each hook has its own "slot" in the component. When you update the volume, React is smart enough to leave isPlaying exactly as it was. This keeps the logic clean and prevents unnecessary complexity.`,
                            fullCode: `import { useState } from 'react';

function VideoPlayer() { 
  const [isPlaying, setIsPlaying] = useState(false); 
  const [volume, setVolume] = useState(80); 
  const [isMuted, setIsMuted] = useState(false); 

  return ( 
    <div style={{ padding: '20px', background: '#222', color: '#fff' }}> 
      <h3>Now Playing: React Tutorial</h3> 
      <div style={{ height: '100px', border: '1px solid #555' }}> 
        {isPlaying ? '▶️ Video is playing...' : '⏸️ Video is paused'} 
      </div> 
      <button onClick={() => setIsPlaying(!isPlaying)}> 
        {isPlaying ? 'Pause' : 'Play'} 
      </button> 
      <div style={{ marginTop: '10px' }}> 
        <label>Volume: {isMuted ? 0 : volume}</label> 
        <input type="range" value={volume} onChange={(e) => setVolume(Number(e.target.value))} /> 
      </div> 
      <button onClick={() => setIsMuted(!isMuted)}> 
        {isMuted ? 'Unmute' : 'Mute'} 
      </button> 
    </div> 
  ); 
}`,
    explanation:
      `Multiple useState lines: Each line creates a separate "folder" in the component's memory. Updating one does not disturb the others.

setIsPlaying(!isPlaying): This is the independent toggle. It only looks at the isPlaying memory.

Number(e.target.value): Since input values usually come back as strings, we convert them to a number before saving them into our volume state.

isMuted ? 0 : volume: This is a great real-world logic example. We don't change the volume memory when muting; we just choose to show 0 on the screen if isMuted is true.

When to Combine into an Object?

If you find yourself passing five or more related state variables to another component, it’s usually time to combine them into an object (like the UserInfo example we saw earlier). This keeps your component "props" clean and your data structured.`,
        demo: <VideoPlayer />,
  },
]

export default function IntroReactStateMasterclass({
  onBack,
  onSectionChange,
  title = 'Introduction to React State',
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
    } else {
      onSectionChange({
        index: sections.length + 1,
        title: 'Recap',
      })
    }
  }, [activeIndex, onSectionChange])

  return (
    <div className="sm-page">
      <div className="sm-toolbar">
        <button className="sm-button ghost" onClick={onBack}>
          ← Back to Week 01
        </button>

        <div className="sm-toolbar-copy">
          <p className="sm-kicker">AD312 • Week 01 • Lecture 01</p>
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
            <span className="sm-nav-step">11</span>
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
