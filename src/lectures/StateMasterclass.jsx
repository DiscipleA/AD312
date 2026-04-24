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
  syntax,
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
      <CodeBlock
        code={annotateDisplayedCode(syntax, 'react')}
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

function ThemeToggler() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <div className={isDarkMode ? 'sm-demo theme-dark' : 'sm-demo theme-light'}>
      <p>The current theme is {isDarkMode ? 'Dark' : 'Light'}</p>
      <button className="sm-button" onClick={() => setIsDarkMode(!isDarkMode)}>
        Toggle Theme
      </button>
    </div>
  )
}

function QuantitySelector() {
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="sm-demo sm-center">
      <div className="sm-row">
        <button className="sm-button" onClick={() => quantity > 1 && setQuantity(quantity - 1)}>
          -
        </button>
        <span className="sm-stat">Items: {quantity}</span>
        <button className="sm-button" onClick={() => setQuantity(quantity + 1)}>
          +
        </button>
      </div>
      <p className="sm-total">Total Price: ${quantity * 20}</p>
    </div>
  )
}

function LiveSearch() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="sm-demo">
      <input
        className="sm-input"
        type="text"
        placeholder="Search for a user..."
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <p className="sm-muted">
        Results for: <strong>{searchTerm}</strong>
      </p>
    </div>
  )
}

function ScoreTracker() {
  const [score, setScore] = useState(0)

  function tripleKill() {
    setScore((prevScore) => prevScore + 1)
    setScore((prevScore) => prevScore + 1)
    setScore((prevScore) => prevScore + 1)
  }

  return (
    <div className="sm-demo sm-center">
      <h1 className="sm-demo-title">Current Score: {score}</h1>
      <button className="sm-button danger" onClick={tripleKill}>
        Triple Kill! (+3)
      </button>
    </div>
  )
}

function FeedbackForm() {
  const [text, setText] = useState('')

  function handleSubmit() {
    setTimeout(() => {
      alert(`You submitted: ${text}`)
    }, 3000)
  }

  return (
    <div className="sm-demo sm-inline-form">
      <input
        className="sm-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
      <button className="sm-button" onClick={handleSubmit}>
        Submit (3s delay)
      </button>
    </div>
  )
}

function MultiIncrementer() {
  const [number, setNumber] = useState(0)

  function incrementThreeTimes() {
    setNumber((n) => n + 1)
    setNumber((n) => n + 1)
    setNumber((n) => n + 1)
  }

  return (
    <div className="sm-demo sm-center">
      <h1 className="sm-demo-title">Count: {number}</h1>
      <button className="sm-button" onClick={incrementThreeTimes}>
        Add 3 for real
      </button>
    </div>
  )
}

function TimeCapsule() {
  const [number, setNumber] = useState(0)

  function handleAsyncCheck() {
    setNumber(number + 5)
    setTimeout(() => {
      alert(`The captured snapshot value is: ${number}`)
    }, 3000)
  }

  return (
    <div className="sm-demo sm-center">
      <h1 className="sm-demo-title">Number on screen: {number}</h1>
      <button className="sm-button" onClick={handleAsyncCheck}>
        Increment & Alert
      </button>
    </div>
  )
}

function MessageSender() {
  const [message, setMessage] = useState('Hello!')
  const [status, setStatus] = useState('Ready')

  function handleSend() {
    setStatus('Sending...')
    setTimeout(() => {
      console.log(`Action initiated at T1 sent: ${message}`)
      setStatus('Sent!')
    }, 3000)
  }

  return (
    <div className="sm-demo sm-center">
      <div className="sm-row sm-grow">
        <input
          className="sm-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sm-button" onClick={handleSend}>
          Send Message
        </button>
      </div>
      <p className="sm-muted">
        Status: <strong>{status}</strong>
      </p>
    </div>
  )
}

function MessageSenderFinal() {
  const [recipient, setRecipient] = useState('Alice')
  const [message, setMessage] = useState('')

  function sendMessage() {
    setTimeout(() => {
      alert(`Message to ${recipient}: ${message}`)
    }, 5000)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        sendMessage()
      }}
      className="sm-demo sm-stack"
    >
      <select
        className="sm-input"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      >
        <option value="Alice">Alice</option>
        <option value="Bob">Bob</option>
      </select>

      <input
        className="sm-input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />

      <button className="sm-button success" type="submit">
        Send Message
      </button>
    </form>
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
      }}
    >
      <h1 style={{ textAlign: 'center', fontSize: '2.5rem' }}>
        Recap and Best Practices: The React State Journey
      </h1>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '40px' }}>
        We’ve reached the final slide! Per your instructions, I will now synthesize
        everything we have covered into a conclusive summary.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <div>
          <h3>1. State as a Managed Snapshot</h3>
          <p>
            On a broad scale, React State is a snapshot of your UI at a specific point
            in time. While regular variables are ignored by the browser, State is managed
            by React to keep the UI in sync.
          </p>
          <p>
            Example: <code>{`const [isDarkMode, setIsDarkMode] = useState(false);`}</code>.
            Changing this discards the old snapshot and creates a new one, triggering a re-render.
          </p>

          <h3>2. The Asynchronous Nature of Updates</h3>
          <p>
            React state updates are asynchronous and batched. This performance optimization
            prevents the screen from flickering or slowing down.
          </p>
          <p>
            <strong>The Best Practice:</strong> If updating based on a previous value, always use
            the updater function: <code>{`setScore(prev => prev + 1);`}</code>
          </p>
        </div>

        <div>
          <h3>3. Each Render Has Its Own Snapshot</h3>
          <p>
            Every render is a fresh execution of a function with its own local variables.
            Event handlers capture these variables at the moment they are created.
          </p>
          <p>
            Even if you change state on your screen after an action starts, the action is
            locked into the snapshot from initiation time. This ensures consistency and predictability.
          </p>

          <h3>4. Summary of Key Concepts</h3>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              color: '#333',
              background: '#ecf0f1',
              borderRadius: '10px',
            }}
          >
            <thead>
              <tr style={{ background: '#34495e', color: 'white' }}>
                <th style={{ padding: '10px' }}>Concept</th>
                <th style={{ padding: '10px' }}>Simple Terms</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #bdc3c7' }}>
                  State vs. Variables
                </td>
                <td style={{ padding: '10px', borderBottom: '1px solid #bdc3c7' }}>
                  State tells browser to "Redraw!"
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #bdc3c7' }}>
                  Batching
                </td>
                <td style={{ padding: '10px', borderBottom: '1px solid #bdc3c7' }}>
                  React waits for end of function to update screen.
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #bdc3c7' }}>
                  Snapshots
                </td>
                <td style={{ padding: '10px', borderBottom: '1px solid #bdc3c7' }}>
                  A "time capsule" from an action's start.
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px' }}>Updater Functions</td>
                <td style={{ padding: '10px' }}>Tells React: "Use the most recent version."</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: '40px', padding: '20px', borderTop: '2px solid #34495e' }}>
        <h3>Final Best Practice: Utilize Effects</h3>
        <p>
          The recap slide mentions utilizing Effects like useEffect for operations on updated
          state. The next step in your journey is learning how to react to state changes.
        </p>
        <p style={{ fontStyle: 'italic', color: '#bdc3c7' }}>
          You now have a solid foundation of how data flows through a React component.
          By mastering the Snapshot Model, you can avoid the most common bugs in modern web development!
        </p>
      </div>
    </div>
  )
}

const sections = [
  {
    title: 'Introduction to React State',
    description:
      'Based on the slide provided, we are diving into the heart of React: State. This is what transforms a static page into a "living" application.',
    slideData: {
      title: 'Introduction to React State',
      bullets: [
        'Understanding React state is foundational.',
        'State vs. regular variables.',
        'React state enables dynamic UIs.',
      ],
    },
    rwTitle: 'The Shopping Cart',
    rwContent:
      `Think of a shopping app like Amazon. When you click "Add to Cart," the little number on the cart icon updates immediately.

Without State: You would have to refresh the entire page to see the updated number.

With State: React "remembers" the number of items and instantly re-renders just that part of the screen when the number changes.`,
    broadTitle: 'State vs. Regular Variables',
    broadContent:
      `On a broad scale, the difference is all about Re-rendering.

Regular Variables: In standard JavaScript, if you change a variable like let count = 5;, the computer knows the value changed, but the browser doesn't care. The UI stays exactly as it was.

React State: When you update state, React screams to the browser, "Hey! The data changed! Redraw this component right now!" This is why React state enables Dynamic UIs—the interface is always a reflection of the current data.`,
    narrowTitle: 'A Simple Toggle',
    narrowContent:
      'Let’s look at a common "Light/Dark Mode" toggle. We use the useState hook to manage this.',
    syntax: `import React, { useState } from 'react';

function ThemeToggler() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div>
      <p>The current theme is {isDarkMode ? 'Dark' : 'Light'}</p>
      <button onClick={() => setIsDarkMode(!isDarkMode)}>Toggle Theme</button>
    </div>
  );
}`,
    explanation:
      `const [isDarkMode, setIsDarkMode] = useState(false);

isDarkMode: This is our variable (the "State"). It starts as false (Light mode).

setIsDarkMode: This is a special "setter" function. We must use this to change the value if we want the screen to update.

setIsDarkMode(!isDarkMode);

This tells React: "Take whatever the current value is and flip it (True to False, or False to True)."

The Re-render:

As soon as setIsDarkMode is called, React notices the change and automatically runs the code inside the return block again, updating the backgroundColor and text on the screen instantly.`,
    demo: <ThemeToggler />,
  },
  {
    title: 'Deep Dive: What is State in React?',
    description:
      "Building on introduction, this slide defines State as the data of a component at a specific moment in time. The key takeaway here is that state isn't just a container for data—it's a trigger for action.",
    slideData: {
      title: 'What is State in React?',
      bullets: [
        'Data of the component at a specific time.',
        'State is a trigger for action.',
        'Updating state triggers component re-render.',
      ],
    },
    rwTitle: `The "Like" Button`,
    rwContent:
      `Think of a Twitter (X) or Instagram feed. When you tap the heart icon:

The State Change: The "liked" status for that specific post flips from false to true.

The UI Response: The heart instantly turns red, and the like count increments by one.

If this were a regular variable, the data might change in the background, but the heart would stay gray until you manually refreshed your feed.`,
    broadTitle: 'Data Ownership and Lifecycle',
    broadContent:
      `On a broad scale, state allows components to be autonomous.

In a large app, you might have hundreds of components. State ensures that if one specific "Comment" component is being edited, only that component re-renders. React is smart enough to leave the rest of the page alone, making the app feel fast and responsive. It manages the "lifecycle" of this data—keeping it alive as long as the component is on the screen.`,
    narrowTitle: 'The Counter Component',
    narrowContent:
      `The code in your screenshot is the "Hello World" of React state. Let’s look at a slightly more practical application: a Product Quantity Selector for an e-commerce site.`,
    syntax: `import React, { useState } from 'react';

function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div>
      <button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>-</button>
      <span>Items: {quantity}</span>
      <button onClick={() => setQuantity(quantity + 1)}>+</button>
    </div>
  );
}`,
    explanation:
      `const [quantity, setQuantity] = useState(1);

quantity: This is the current "snapshot" of our data. React watches this.

1: This is the initial state. The counter starts at 1 because you can't buy zero items in this specific logic.

setQuantity(quantity + 1)

This is the Update. We never do quantity = quantity + 1. We must use the setter function so React knows it's time to re-render.

Updating state triggers component re-render

The moment setQuantity is called, React re-runs the QuantitySelector function. It calculates the new value for {quantity} and the new "Total Price" calculation, then updates the browser screen to match.`,
    demo: <QuantitySelector />,
  },
  {
    title: 'Setting State Triggers Re-renders',
    description:
      `This slide highlights a crucial distinction in React's "under the hood" mechanics: updating state isn't an immediate variable assignment; it’s a request for a refresh.`,
    slideData: {
      title: 'Setting State Triggers Re-renders',
      bullets: [
        "setState doesn't change state directly.",
        'It tells React to update and schedule re-render.',
        'Essential for UI updates in response to data.',
      ],
    },
    rwTitle: 'Notifications Bell',
    rwContent:
      `Consider a YouTube notification bell. When a new notification arrives, the red number doesn't just "appear" because a variable was changed. The app receives data, calls a state setter, and React re-renders the bell component to show the "1". If you clicked the bell and it didn't trigger a re-render, the data might say you have 0 unread messages, but the screen would stubbornly keep showing the "1".`,
    broadTitle: 'Scheduling and Optimization',
    broadContent:
      `On a broad scale, React uses Scheduling. When you call setCount, you aren't changing the count variable for the current line of code. Instead, you are telling React: "Hey, I have a new value. When you have a millisecond, please update the state and redraw the UI."

This is essential for performance. If you updated 10 different states at once, React could "batch" them together and perform just one single re-render instead of 10, keeping the app smooth and preventing "stuttering" on the screen.`,
    narrowTitle: 'The Text Input',
    narrowContent:
      'A classic example of this is a Search Bar or Live Preview where every keystroke needs to be reflected on the screen immediately.',
    syntax: `import React, { useState } from 'react';

function LiveSearch() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input onChange={handleInputChange} />
      <p>Results for: {searchTerm}</p>
    </div>
  );
}`,
    explanation:
      `setSearchTerm(event.target.value);

This is the "Trigger." It does not change the searchTerm variable instantly inside this function.

Instead, it sends a message to React: "Update the state and schedule a re-render."

Essential for UI updates

React receives that message, clears the old "snapshot" of the component, and executes the LiveSearch function again.

The Re-render Result

On this second run, searchTerm now contains the new text from the input, and the <strong> tag is updated on your screen to match what you just typed.`,
    demo: <LiveSearch />,
  },
  {
    title: 'State Updates Are Asynchronous',
    description:
      `This slide addresses one of the most common "gotchas" in React development: the fact that state updates do not happen the very instant you call the setter function.`,
    slideData: {
      title: 'State Updates Are Asynchronous',
      bullets: [
        'State updates are batched for performance.',
        "Updates don't happen immediately.",
        'Implications for sequential logic.',
      ],
    },
    rwTitle: `The "Order Summary" Page`,
    rwContent:
      `Imagine you are building a Food Delivery App (like DoorDash).

You have a "Delivery Fee" state and a "Total Price" state.

If you update the delivery fee, and then immediately try to calculate the total price using that fee in the same function, you might get an old total.

The Glitch: The user sees the delivery fee change to $5.00, but the total price still reflects the old $2.00 fee because the "Total" calculation happened before React finished updating the "Fee" state.`,
    broadTitle: 'Batching for Performance',
    broadContent:
      `On a broad scale, React is a Master of Efficiency. If you have a function that updates three different states:

setUserName('Dmitriy')

setUserEmail('test@email.com')

setLoggedIn(true)

React doesn't want to re-render the whole app three times in a row—that would be a waste of processing power. Instead, it batches them. It collects all the updates, waits for the function to finish, and then performs one single re-render with all the new data. This keeps the UI smooth but means you can't rely on the "new" value inside the same function where you set it.`,
    narrowTitle: 'The Stale State Trap',
    narrowContent:
      'The code in your screenshot shows a console.log(count) returning the old value. Let’s look at how to fix this using a Functional Update when you need to perform sequential logic.',
    syntax: `import React, { useState } from 'react';

function ScoreTracker() {
  const [score, setScore] = useState(0);

  const tripleKill = () => {
    setScore(prevScore => prevScore + 1);
    setScore(prevScore => prevScore + 1);
    setScore(prevScore => prevScore + 1);
  };
}`,
    explanation:
      `Updates don't happen immediately

In your screenshot, setCount(count + 1) tells React to change the count later. When you console.log(count) right after, you are logging the "snapshot" of the variable as it existed when the function started.

prevScore => prevScore + 1

This is the "Narrow" solution. Instead of giving React a number, you give it a function.

This function says: "Hey React, I don't know what the current value is right now, but whatever it is when you finally get around to updating it, please add 1 to it."

The Result

This ensures that even if updates are batched or asynchronous, each step of the logic has access to the most recent value from the previous update.`,
    demo: <ScoreTracker />,
  },
  {
    title: 'Accessing State in Event Handlers',
    description:
      `This concept explains the "Snapshot" behavior of React. When a component renders, it's like taking a photograph of the data at that exact microsecond. Any event handler (like a button click) created during that render is "holding" that photograph.`,
    slideData: {
      title: 'Accessing State in Event Handlers',
      bullets: [
        'Event handlers capture state at render time.',
        'Ensures consistency across time.',
        'Snapshot behavior ensures predictability.',
      ],
    },
    rwTitle: `The "Send Message" Delay`,
    rwContent:
      `Imagine a messaging app like Slack or WhatsApp.

You type a message and hit "Send."

Usually, there is a tiny delay (maybe a network request) before the message actually sends.

If you quickly change the text in the input box after clicking send but before the message finishes sending, the app should still send the original text you clicked "Send" on.

Why? Because the "Send" event handler captured a snapshot of the message state at the moment you clicked the button. This prevents the app from sending a half-edited version of your text.`,
    broadTitle: 'Consistency and Predictability',
    broadContent:
      `On a broad scale, this behavior is what makes React "functional." It ensures that for a specific render, the UI and the logic are perfectly synced.

If state could change in the middle of a function executing, it would be impossible to debug. You might start a function where isLoggedIn is true and end the same function where it is false. By using snapshots, React ensures that inside one specific execution of your event handler, the world stays consistent.`,
    narrowTitle: 'The Alert Snapshot',
    narrowContent:
      'This is the classic way to demonstrate how an event handler "remembers" the state from the time it was triggered, even if the state changes later.',
    syntax: `import React, { useState } from 'react';

function FeedbackForm() {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    setTimeout(() => {
      alert(\`You submitted: \${text}\`);
    }, 3000);
  };

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}`,
    explanation:
      `Event handlers capture state at render time

When you click "Submit," the handleSubmit function starts. At that moment, it looks at the text variable and "locks it in."

Snapshot behavior ensures consistency

Even if you type new things into the input during those 3 seconds of the setTimeout, the alert will show the text that was there when you clicked the button.

State updates in handlers reflect post-re-render

If you want to see the "new" value, you have to wait for the component to re-render. The current running function is stuck with the "snapshot" it was born with.`,
    demo: <FeedbackForm />,
  },
  {
    title: `Example: Incrementing State (The "Three Times" Paradox)`,
    description:
      `This slide provides a perfect "Stress Test" for your understanding of React state. It illustrates why calling a state setter three times in a row doesn't always result in the math you expect.`,
    slideData: {
      title: 'Example: Incrementing State',
      bullets: [
        'Button click increments by 1, not 3.',
        'React batches state updates.',
        'Snapshot prevents sequential math.',
      ],
    },
    rwTitle: `The "Save" Spinner`,
    rwContent:
      `Imagine a Google Docs style editor.

When you type, the app might want to perform two state updates: setHasUnsavedChanges(true) and setLastEditTime(Date.now()).

Even though these are two separate commands, React batches them. You don't want the "Saving..." spinner to flicker on and off twice in a fraction of a second. You want one smooth UI update that reflects both changes.`,
    broadTitle: 'Batched Updates & Snapshot Logic',
    broadContent:
      `On a broad scale, this behavior proves that React State is Immutable within a single render. When the incrementThreeTimes function runs, the value of number is "frozen." If number starts at 0, every single line inside that function sees number as 0.

setNumber(0 + 1) -> React schedules an update to 1.

setNumber(0 + 1) -> React replaces the previous schedule with a new schedule to 1.

setNumber(0 + 1) -> React replaces it again with a schedule to 1.

React isn't doing math sequentially; it's listening to the last instruction it received for that specific render cycle.`,
    narrowTitle: `Fixing the "Plus 3" Logic`,
    narrowContent:
      'If you actually want to increment a value multiple times within one event, you must use the updater function (passing a callback). This bypasses the snapshot by asking React for the "pending" state.',
    syntax: `import React, { useState } from 'react';

function MultiIncrementer() {
  const [number, setNumber] = useState(0);

  const incrementThreeTimes = () => {
    setNumber(n => n + 1);
    setNumber(n => n + 1);
    setNumber(n => n + 1);
  };
}`,
    explanation:
      `number + 1 (The screenshot's version):

It uses the "snapshot" value. Since number is 0 when the button is clicked, you are effectively calling setNumber(1) three times in a row. React sees the final request as setNumber(1) and renders exactly that.

n => n + 1 (The fix):

This tells React: "Take whatever the pending state is from the last line and add 1 to it."

React batches state updates

Even if you use the "fix" above, React still only re-renders the screen once. It calculates the final result (3) behind the scenes and then performs a single, efficient UI update.`,
    demo: <MultiIncrementer />,
  },
  {
    title: 'Example: Delayed State Access',
    description:
      `This slide explores the "Persistence of the Snapshot." It proves that even if an action happens several seconds into the future, it is still bound by the laws of the render that created it.`,
    slideData: {
      title: 'Example: Delayed State Access',
      bullets: [
        'Synchronous alert shows old value.',
        'setTimeout shows old value due to snapshot.',
        'Snapshot model in async code.',
      ],
    },
    rwTitle: 'Delayed Form Submission',
    rwContent:
      `Imagine an app like Airbnb.

You click "Book Now," but your internet is slow.

A "Processing..." spinner appears.

While it’s spinning, you change the number of guests in the background.

The Snapshot Safety: The app should still send the booking request for the original number of guests you clicked "Book" on. If it didn't use a snapshot, the app might charge you for 1 guest but book a room for 4 because you changed the state while the first request was still "in flight."`,
    broadTitle: 'Snapshot Model in Async Operations',
    broadContent:
      `On a broad scale, this highlights how React handles Closures. When handleClick is called, it creates a little "bubble" of time. Everything inside that bubble (including the setTimeout) has access to the variables as they existed right then.

Even though the UI updates on the screen to show "5" almost immediately, the alert function is sitting inside that time bubble from the past. It doesn't care what the screen says; it only knows what its "snapshot" told it when it was born.`,
    narrowTitle: `The "Time Capsule" Effect`,
    narrowContent:
      'The code in your screenshot demonstrates that setTimeout acts like a time capsule.',
    syntax: `import React, { useState } from 'react';

function TimeCapsule() {
  const [number, setNumber] = useState(0);

  const handleAsyncCheck = () => {
    setNumber(number + 5);

    setTimeout(() => {
      alert(\`The captured snapshot value is: \${number}\`);
    }, 3000);
  };
}`,
    explanation:
      `setNumber(number + 5)

This requests a re-render. React will eventually run this whole component again where number will be 5.

setTimeout(() => { alert(...) }, 3000)

This function is defined during the render where number is 0.

It "captures" that 0.

alert("Number is still \${number}")

Three seconds later, the alert pops up. Even though the <h1> on your screen has said "5" for the last three seconds, the alert will say "0".

This is because the alert is reading from its own "snapshot" of the data, not the live data on the screen.`,
    demo: <TimeCapsule />,
  },
  {
    title: 'State Over Time and Asynchronous Operations',
    description:
      `This slide summarizes the philosophical "why" behind React's snapshot behavior. It emphasizes that consistency isn't just a technical detail—it's a safeguard against bugs that occur when data changes while an action is still in progress.`,
    slideData: {
      title: 'State Over Time and Async',
      bullets: [
        'Snapshot vital for consistency.',
        'Actions use state from initiation time.',
        'Prevents timing issues.',
      ],
    },
    rwTitle: `The "Double-Click" Purchase`,
    rwContent:
      `Imagine an e-commerce app like Uber Eats.

You click "Place Order." The app starts an asynchronous network request to the server.

While the "Place Order" request is "in flight," you realize you forgot a soda and quickly add it to your cart.

The Snapshot Prevention: Because the "Place Order" action uses the state from its initiation time, the order sent to the kitchen is exactly what you saw when you clicked the button. It prevents a "timing issue" where the kitchen might receive an order for a burger but a payment for a burger plus a soda.`,
    broadTitle: `Preventing "Race Conditions"`,
    broadContent:
      `On a broad scale, this behavior prevents Race Conditions. A race condition happens when the outcome of a program depends on the sequence or timing of uncontrollable events. By locking in a snapshot, React ensures that an action started at 12:00:01 PM will always use the 12:00:01 PM data, even if the user or the network changes things at 12:00:02 PM.`,
    narrowTitle: 'The Message Sender',
    narrowContent:
      `Let’s look at a "Message Sender" where we intentionally delay the action to see how it ignores later changes to the input.`,
    syntax: `import React, { useState } from 'react';

function MessageSender() {
  const [message, setMessage] = useState('Hello!');
  const [status, setStatus] = useState('Ready');

  const handleSend = () => {
    setStatus('Sending...');
    setTimeout(() => {
      console.log(\`Action initiated at T1 sent: \${message}\`);
      setStatus('Sent!');
    }, 3000);
  };
}`,
    explanation:
      `Actions use state from their initiation time

The moment handleSend is triggered, the message variable is "captured." If message was "Hello!", that string is now baked into the setTimeout function.

Prevents inconsistencies

If you type "Wait, don't send!" into the box while the timer is running, the message state updates on the screen, but the scheduled action doesn't care. It stays consistent with what the user intended when they clicked "Send."

State snapshot vital for consistency

This ensures that "Status: Sent!" actually corresponds to the message that was logged, not a hybrid of the old message and new typing.`,
    demo: <MessageSender />,
  },
  {
    title: 'State Over Time and Asynchronous Operations: Comprehensive Example',
    description:
      `This slide provides a complex, multi-state example that ties together everything we’ve discussed about snapshots, event handlers, and asynchronous timing. It demonstrates how React maintains "intentionality"—ensuring the app executes exactly what the user requested at the moment they clicked the button.`,
    slideData: {
      title: 'State Over Time: Comprehensive Example',
      bullets: [
        'Multi-state form example.',
        'Inputs and selects captured at once.',
        'Predictable data flow for complex forms.',
      ],
    },
    rwTitle: `The "Customer Support" Chat`,
    rwContent:
      `Imagine you are using a support chat like Zendesk or Intercom.

You select "Billing Department" from a dropdown and type "I have a question about my invoice."

You hit "Send."

While the "Sending..." indicator is spinning, you realize you actually need the "Technical Support" department, so you change the dropdown.

The Snapshot Result: Because of the logic shown in the code, the message is still sent to the Billing Department. This is actually a feature! It prevents the message from being routed to the wrong place just because you started preparing for your next question before the first one finished sending.`,
    broadTitle: 'Orchestrating Multiple States',
    broadContent:
      `On a broad scale, this example shows how React handles Independent Snapshots. A component isn't just one big snapshot; it’s a collection of snapshots for every piece of state (recipient and message).

When sendMessage is triggered, React effectively "prints" a physical copy of the entire current UI data. Even if the "live" data on the screen changes (as the user interacts with inputs and selects), the "printed" copy remains unchanged inside the setTimeout function. This provides a predictable data flow that is essential for complex forms.`,
    narrowTitle: `The "Locked-In" Form`,
    narrowContent:
      `Let's analyze the specific behavior of the code in your screenshot.`,
    syntax: `import React, { useState } from 'react';

function MessageSenderFinal() {
  const [recipient, setRecipient] = useState('Alice');
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    setTimeout(() => {
      alert(\`Message to \${recipient}: \${message}\`);
    }, 5000);
  };
}`,
    explanation:
      `setTimeout(() => { ... }, 5000)

This creates a 5-second window where the user can mess with the form. They can change the name from "Alice" to "Bob" or delete the entire message.

alert('Message to \${recipient}: \${message}')

No matter what the user does during those 5 seconds, the alert will display the values that were in the boxes the moment the "Send Message" button was pressed.

e.preventDefault()

This is a standard React pattern to prevent the entire webpage from refreshing when a form is submitted, allowing React to handle the logic "internally" via the sendMessage function.`,
    demo: <MessageSenderFinal />,
  },
]

export default function StateMasterclass({ onBack, onSectionChange, title = "React's State as a Snapshot" }) {
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
          <p className="sm-kicker">AD312 • Week 01 • Lecture 02</p>
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
            <span className="sm-nav-step">10</span>
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
