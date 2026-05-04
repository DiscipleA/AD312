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

function SectionWrapper({ title, concept, bullets, description, realWorld, broadScale, narrowed, code, simple, children }) {
  return (
    <section className="sm-section">
      <h1 className="sm-title">{title}</h1>
      <SlideHeader title={concept} bullets={bullets} />
      <p className="sm-description"><strong>Description:</strong> {description}</p>
      <div className="sm-grid">
        <div className="sm-panel"><h3>Real-World Context</h3><p className="sm-preline">{realWorld}</p></div>
        <div className="sm-panel"><h3>The Broad Scale</h3><p className="sm-preline">{broadScale}</p></div>
      </div>
      <div className="sm-narrow"><h3>The Narrow Approach</h3><p className="sm-preline">{narrowed}</p></div>
      <h3 className="sm-subheading">Full Code Example</h3>
      <CodeBlock code={annotateDisplayedCode(code, 'react')} language="jsx" label="React JSX" />
      <h3 className="sm-subheading">Code in Action</h3>
      <div className="sm-demo-shell">{children}</div>
      <div className="sm-explanation"><h3>Simple Code Explanation</h3><div className="sm-preline">{simple}</div></div>
    </section>
  )
}

function GardenInventoryDemo() {
  const id = useRef("garden-demo");
  return <ul id={id.current}><li>Plot 1: Available</li><li>Plot 2: Reserved</li><li>Plot 3: Needs nutrients</li></ul>;
}

function BirdSightingsDemo() {
  return <div><h3>Current Local Sightings</h3><ul><li>Blue Jay - Observed at 8:30 AM</li><li>Red-tailed Hawk - Observed at 9:15 AM</li></ul></div>;
}

function TrailDetailsDemo() {
  const [trailId, setTrailId] = useState(101);
  const trail = trailId === 101 ? { name: "Mountain Loop", difficulty: "Moderate", length: 4.2 } : { name: "River Trail", difficulty: "Easy", length: 2.8 };
  return <article><button className="sm-button" onClick={() => setTrailId(trailId === 101 ? 102 : 101)}>Switch Trail</button><h2>{trail.name}</h2><p>Difficulty: {trail.difficulty}</p><p>Length: {trail.length} miles</p></article>;
}

function ToolLibraryDemo() {
  return <section><h2>Available for Rent</h2><ul><li><strong>Cordless Drill</strong> - Good</li><li><strong>Circular Saw</strong> - Excellent</li></ul></section>;
}

function EventCalendarDemo() {
  return <main><h1>Observatory Schedule</h1><p style={{ fontSize: "0.8rem" }}>Updating data in background...</p><ul><li><strong>Meteor Watch</strong>: 10:00 PM - Perseids</li><li><strong>Moon Viewing</strong>: 8:00 PM - Lunar Surface</li></ul></main>;
}

function SeedVaultDemo() {
  const [status, setStatus] = useState("success");
  return <div><button className="sm-button" onClick={() => setStatus(status === "success" ? "pending" : status === "pending" ? "error" : "success")}>Change Status</button>{status === "pending" && <span>Checking the seed vault...</span>}{status === "error" && <span>Vault Error: The seed vault is temporarily unreachable</span>}{status === "success" && <ul><li>Heirloom Tomato (Vegetable)</li><li>Sunflower (Flower)</li></ul>}</div>;
}

function MigrationTrackerDemo() {
  const [fetchStatus, setFetchStatus] = useState("idle");
  return <div><h2>Whale Migration Live Feed</h2><button className="sm-button" onClick={() => setFetchStatus(fetchStatus === "idle" ? "fetching" : fetchStatus === "fetching" ? "paused" : "idle")}>Cycle fetchStatus</button>{fetchStatus === "fetching" && <p>🛰️ Satellite link active: Fetching data...</p>}{fetchStatus === "paused" && <p>⚠️ Connection lost: Retrying when signal returns...</p>}{fetchStatus === "idle" && <p>✅ Link idle: Data synchronized.</p>}<hr /><ul><li>Orion: Last seen at 47.6°N, 122.3°W</li></ul></div>;
}

const slides = [
  {
    title: "Introduction to TanStack Query",
    concept: "Server State Management",
    bullets: ["Overview of TanStack Query", "Importance of managing server state in React apps", "How React Query simplifies fetching, caching, and updating server state"],
    description: `TanStack Query (formerly known as React Query) is a powerful asynchronous state management library designed specifically for web applications. Unlike traditional state management libraries that focus on global client state, TanStack Query specializes in "server state"—data that is owned by a remote source and requires asynchronous APIs to fetch or update. It addresses the inherent challenges of server state, such as caching, deduplicating multiple requests for the same data, updating "out of date" data in the background, and managing loading or error states. By providing a declarative syntax, it removes the need for complex useEffect hooks and manual state tracking for API calls.`,
    realWorld: `A community garden plot reservation system where users view available soil patches and their current nutrient levels. Since multiple users might be viewing the same garden layout simultaneously, the data needs to stay synchronized with the central database to prevent double-booking.`,
    broadScale: `In large-scale enterprise architectures, managing data consistency across various components is critical. TanStack Query acts as a specialized synchronization layer that sits between the UI and the remote data source. It ensures that the application remains performant by reducing unnecessary network traffic through aggressive caching and intelligent background revalidation, which prevents the UI from becoming stale or unresponsive during high-latency periods.`,
    narrowed: `Technically, the library implements a stale-while-revalidate caching strategy. When a component requests data, TanStack Query first checks if a fresh version exists in the cache. If the data is deemed "stale" based on configurable timers, it returns the cached data immediately to keep the UI snappy while simultaneously triggering a background fetch to update the cache and the UI once the new data arrives.`,
    code: `import React from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function GardenInventory() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['soilInventory'],
    queryFn: async () => {
      const response = await fetch('https://api.communitygarden.org/plots');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

  if (isLoading) return <span>Loading garden data...</span>;
  if (error) return <span>Error: {error.message}</span>;

  return (
    <ul>
      {data.map((plot) => (
        <li key={plot.id}>
          Plot {plot.number}: {plot.status}
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GardenInventory />
    </QueryClientProvider>
  );
}`,
    simple: `This code sets up a specialized delivery system for information. First, we create a QueryClient, which acts like a warehouse manager that keeps track of all the data we've downloaded. The QueryClientProvider wraps our entire app so that every part of the program can talk to this manager. Inside the GardenInventory function, we use a tool called useQuery. We give it a 'queryKey' called 'soilInventory', which is like a label on a box in the warehouse so the manager knows where to find it later. The 'queryFn' is the actual instruction manual on how to go out to the internet and get the data using the fetch command. The useQuery tool is very smart: it automatically gives us a variable called 'isLoading' which is true while the data is traveling, an 'error' variable if something breaks, and the 'data' variable once the info arrives. We use these to show a loading message, an error message, or finally, a list of garden plots. This replaces the old, messy way of manually creating variables for loading and errors every time we want to talk to a server.`,
    Demo: GardenInventoryDemo
  },
  {
    title: "What is a Query?",
    concept: "Query Fundamentals",
    bullets: ["Definition of a Query in React Query context", "Key components: Unique Key and Promise-based Query Function", "Use case distinction between Queries and Mutations"],
    description: `In the context of TanStack Query, a Query is a declarative dependency on an asynchronous source of data that is tied to a unique key. It represents a "read" operation. A query is responsible for fetching data and managing the lifecycle of that request, including its cached state. Unlike a standard fetch call, a Query is managed by the library to handle automatic re-fetching, caching, and state synchronization across multiple components.`,
    realWorld: `A community nature reserve tracking system where visitors can view a live list of local bird sightings. The Query handles fetching the list from the sightings database and ensures the list stays updated as new sightings are reported by other observers.`,
    broadScale: `In complex applications, Queries serve as the primary mechanism for data retrieval. They allow developers to decouple data fetching from component rendering logic. By using unique keys, the library can intelligently share data between disparate parts of the UI, ensuring that if two different components need the same "bird sightings" data, only one network request is actually executed. This creates a highly efficient data layer that minimizes redundant server load.`,
    narrowed: `A Query consists of two main pillars. First, the Unique Key (usually an array) acts as a serialized identity for the data, allowing the cache to index and retrieve it. Second, the Query Function is a function that must return a Promise that either resolves the data or throws an error. While Queries are for fetching (GET), Mutations are used for creating, updating, or deleting data (POST/PATCH/DELETE) on the server.`,
    code: `import React from 'react';
import { useQuery } from '@tanstack/react-query';

async function fetchBirdSightings() {
  const response = await fetch('https://api.naturereserve.org/sightings');
  if (!response.ok) {
    throw new Error('Could not fetch sightings');
  }
  return response.json();
}

function BirdSightingsList() {
  const { data, status, error } = useQuery({
    queryKey: ['birdSightings', 'local-park'],
    queryFn: fetchBirdSightings,
  });

  if (status === 'pending') {
    return <div>Searching for birds...</div>;
  }

  if (status === 'error') {
    return <div>Error finding birds: {error.message}</div>;
  }

  return (
    <div>
      <h3>Current Local Sightings</h3>
      <ul>
        {data.map((sighting) => (
          <li key={sighting.id}>
            {sighting.species} - Observed at {sighting.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BirdSightingsList;`,
    simple: `Think of a Query as a "Standing Order" for information. 1. The Unique Key (['birdSightings', 'local-park']) is like a specific catalog number in a library. If you ask for that number, the librarian (TanStack Query) knows exactly which book you want. If the book is already on the desk, they give it to you instantly instead of walking to the back of the library. 2. The Query Function (fetchBirdSightings) is the specific set of directions the librarian follows to go get a new copy of the book if they don't have it yet. It must be a "Promise," which is like a guarantee that says, "I will either come back with the book or come back and tell you why I couldn't find it." 3. The Status variables allow your app to react to the journey. 'pending' is like waiting at the desk while the librarian is in the aisles. 'error' is what happens if the librarian discovers the book is missing. 'data' is the actual book placed in your hands. 4. The distinction between Queries and Mutations is simple: A Query is like reading a book (gathering info), while a Mutation is like writing a new entry into the library's guestbook (changing or adding info).`,
    Demo: BirdSightingsDemo
  },
  {
    title: "Query Key and Query Function",
    concept: "Dynamic Data Dependency",
    bullets: ["Query Key: Unique identifier for each query", "Query Function: Returns a promise that fetches data"],
    description: `This slide expands on the relationship between the Query Key and the Query Function, specifically how they work together to handle dynamic data. The Query Key is not limited to static strings; it is an array that can include variables, such as IDs. Whenever a value inside the Query Key array changes, TanStack Query treats it as a new dependency and automatically triggers a fresh fetch using the Query Function. This ensures that the UI always stays synchronized with the specific parameters provided, such as viewing details for a specific item among many.`,
    realWorld: `A National Park trail guide where a user clicks on different trails to see specific topographical data. Each trail has a unique ID. When the user switches from "Mountain Loop" to "River Trail," the Query Key updates with the new trail ID, prompting the system to fetch the correct elevation map for that specific location.`,
    broadScale: `In production-level applications, dynamic keys are essential for handling paginated data, filtered search results, and detailed "single-item" views. By making the data fetching logic dependent on the key, developers can create highly reactive interfaces where the data layer automatically responds to changes in the URL or component props. This reduces the need for manual event handlers to trigger re-fetches and ensures that different items are cached separately under their own unique identifiers in the global query cache.`,
    narrowed: `Technically, the Query Key must be serializable and unique to the data being fetched. When a variable like todoId is included in the key, TanStack Query uses it to create a specific cache entry for that ID. The Query Function is then defined to accept these parameters, allowing it to construct the correct API endpoint. The library effectively uses the key as a "dependency array" similar to how useEffect works, but specifically optimized for asynchronous state management and caching logic.`,
    code: `import React from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchTrailDetails = async (trailId) => {
  const response = await fetch(\`https://api.parks.gov/trails/\${trailId}\`);
  if (!response.ok) {
    throw new Error('Trail not found');
  }
  return response.json();
};

function TrailDetails({ trailId }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['trail', trailId],
    queryFn: () => fetchTrailDetails(trailId),
  });

  if (isLoading) return <div>Loading trail specs...</div>;
  if (error) return <div>Failed to load trail: {error.message}</div>;

  return (
    <article>
      <h2>{data.name}</h2>
      <p>Difficulty: {data.difficulty}</p>
      <p>Length: {data.length} miles</p>
    </article>
  );
}

export default TrailDetails;`,
    simple: `Think of this like a digital library with an automated retrieval robot. 1. The Query Key (['trail', trailId]) is the specific address on the shelf. If you change the trailId from 101 to 102, you are giving the robot a new address. 2. The Query Function (fetchTrailDetails) is the set of mechanical steps the robot takes to get to that shelf and bring back the book. 3. Because the trailId is inside the key, the robot knows that "Trail 101" and "Trail 102" are two different books. It won't give you the map for the "Mountain Loop" if you specifically asked for the "River Trail." 4. If you ask for "Trail 101," the robot fetches it and remembers it. If you switch to "Trail 102," it fetches that too. If you switch back to "Trail 101," the robot doesn't have to go all the way back to the server; it just grabs the copy it already saved from earlier because it recognizes the address in the key. This makes the app feel incredibly fast because it only does the "hard work" of fetching once for each unique ID.`,
    Demo: TrailDetailsDemo
  },
  {
    title: "Using the useQuery Hook",
    concept: "Hook Implementation and Syntax",
    bullets: ["Introduction to the useQuery hook", "Syntax and basic usage example", "Code snippet demonstrating useQuery in a React component"],
    description: `The useQuery hook is the primary tool for fetching and managing server state within a React component. It is a custom hook that accepts an options object—primarily the queryKey and the queryFn—and returns an object containing the result of the query along with several state flags. These flags, such as isPending, isError, and isSuccess, allow developers to handle the various stages of an asynchronous request natively within the component's render logic, eliminating the need for manual state management via useState and useEffect.`,
    realWorld: `A community tool library where neighbors can browse available power tools for rent. When a user opens the "Available Tools" page, the useQuery hook immediately initiates a request to the library's database to fetch the current inventory list while showing a "Checking tool shed..." loading message.`,
    broadScale: `In production environments, useQuery provides a standardized way to consume asynchronous data. By utilizing the returned state flags, applications can maintain a consistent user experience with predictable loading and error states across the entire platform. Because the hook is tied to TanStack's global cache, if multiple components call the same hook with the same key, they will all share the same data and state, ensuring the UI remains synchronized without redundant network overhead.`,
    narrowed: `Technically, the hook returns a "Query Observer" result. isPending is true when there is no data and the query is currently fetching. isError is true if the queryFn throws an error, at which point the error object becomes available. Once the data is successfully fetched, the component re-renders, isPending becomes false, and the data variable contains the resolved response. This declarative pattern allows for "guard clauses" at the top of the component to handle edge cases before the main UI is rendered.`,
    code: `import React from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchToolInventory = async () => {
  const response = await fetch('https://api.neighborhoodtools.org/inventory');
  if (!response.ok) {
    throw new Error('The tool shed is currently locked');
  }
  return response.json();
};

function ToolLibrary() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['tools'],
    queryFn: fetchToolInventory,
  });

  if (isPending) {
    return <span>Opening the tool shed...</span>;
  }

  if (isError) {
    return <span>Access Denied: {error.message}</span>;
  }

  return (
    <section>
      <h2>Available for Rent</h2>
      <ul>
        {data.map((tool) => (
          <li key={tool.id}>
            <strong>{tool.name}</strong> - {tool.condition}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ToolLibrary;`,
    simple: `Using the useQuery hook is like hiring a dedicated assistant to run an errand for you. 1. The Request: You give the assistant a label for the task (queryKey: ['tools']) and the instructions on how to do it (queryFn: fetchToolInventory). 2. The Waiting Period (isPending): As soon as the task starts, your assistant holds up a sign saying "I'm working on it." In your code, you use if (isPending) to show the user a loading spinner or message so they aren't looking at a blank screen. 3. The Problem (isError): If the assistant runs into a locked door or a flat tire, they come back and tell you exactly what went wrong. You use if (isError) to show that message (error.message) to the user. 4. The Success (data): If everything goes right, the assistant hands you the bag of tools. Because you already handled the "Waiting" and "Error" scenarios above, the rest of your code can safely assume the bag is full of data. You then use .map() to go through that bag and list out every tool for the user to see.`,
    Demo: ToolLibraryDemo
  },
  {
    title: "Understanding Query Results",
    concept: "Query State Management",
    bullets: ["Structure of the result object from useQuery", "Key states: isPending, isError, isSuccess", "Properties of the result object: data, error, isFetching"],
    description: `This slide delves deeper into the specific properties returned by the useQuery hook, which allow for granular control over the UI based on the request's lifecycle. While previous slides introduced basic flags, this focus highlights the distinction between primary states (like success or error) and secondary background states (like fetching). Understanding these properties is essential for creating a "zero-flicker" UI where the application can distinguish between the very first time data is loaded versus when data is being refreshed in the background while the old data is still visible.`,
    realWorld: `An astronomical event calendar for a local observatory. When a user first opens the app, they see a "Scanning the skies..." message (isPending). Once the schedule appears (isSuccess), the user can browse. If the app checks for updates 5 minutes later, a small, unobtrusive spinning icon might appear in the corner (isFetching) to indicate a background refresh is happening without removing the current schedule from the screen.`,
    broadScale: `In high-performance applications, utilizing the full range of query results prevents unnecessary UI "popping." By distinguishing between isPending (no data yet) and isFetching (re-validating existing data), developers can implement sophisticated loading patterns. This ensures that users are always informed of the application's network activity while maintaining access to the information already on their screen, leading to a much more stable and professional feel.`,
    narrowed: `Technically, the result object contains a state machine. isPending is a derived state indicating the query has no data and is currently fetching. isSuccess means the query has data and no errors. isError means an error occurred during the last attempt. Crucially, isFetching is a boolean that is true whenever the query is in the process of a request (including background updates), regardless of whether it already has data or not. This allows for conditional rendering logic that is much more precise than a simple "loading" toggle.`,
    code: `import React from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchObservatorySchedule = async () => {
  const response = await fetch('https://api.local-observatory.org/events');
  if (!response.ok) {
    throw new Error('Celestial coordinates unreachable');
  }
  return response.json();
};

function EventCalendar() {
  const { data, error, isFetching, isSuccess, isError } = useQuery({
    queryKey: ['celestialEvents'],
    queryFn: fetchObservatorySchedule,
  });

  return (
    <main>
      <h1>Observatory Schedule</h1>
      {isFetching && !data && <p>Searching the stars for the first time...</p>}
      {isFetching && data && <p style={{ fontSize: '0.8rem' }}>Updating data in background...</p>}
      {isError && <p>Error: {error.message}</p>}
      {isSuccess && (
        <section>
          <ul>
            {data.map((event) => (
              <li key={event.id}>
                <strong>{event.name}</strong>: {event.time} - {event.object}
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

export default EventCalendar;`,
    simple: `Think of these results as the different statuses of a high-tech telescope. 1. isPending: This is like the telescope just being turned on. The lens cover is still on, and there is absolutely nothing to see yet. You show a big loading message here. 2. isSuccess: The telescope has successfully focused on a star. You can now see the image clearly. The data variable holds that image. 3. isError: A cloud moved in front of the lens. You can't see the star, and the error tells you why (the "cloud"). 4. isFetching: This is a special light on the side of the telescope that blinks whenever the telescope is actively moving or adjusting its focus. - If the light is blinking and you have no image yet, it's a "First-time Load." - If the light is blinking but you already have a clear image on the screen, it's a "Background Refresh." The user can keep looking at the current image while the telescope silently works to make it even sharper or check if anything has changed. 5. data and error: These are the actual things the telescope gives you—either the beautiful photo of the galaxy or a report explaining why the photo failed.`,
    Demo: EventCalendarDemo
  },
  {
    title: "Handling Different States",
    concept: "State Rendering Strategies",
    bullets: ["Strategies for handling loading, error, and success states"],
    description: `This slide explores structural patterns for handling the various states returned by TanStack Query within a React component. While previous examples used boolean flags (like isPending), this approach utilizes the status string property. By leveraging a switch statement or conditional returns, developers can create a clear, exhaustive mapping of the query's lifecycle to specific UI outputs. This ensures that the user is never left with a broken or ambiguous interface, as every possible outcome of the asynchronous request is explicitly accounted for in the component logic.`,
    realWorld: `A community seed bank inventory. When a gardener searches for "Heirloom Tomatoes," the UI switches between a "Checking the vault..." loading state, an "Out of stock / Connection error" message, and finally a grid showing available seed packets once the data arrives.`,
    broadScale: `In large-scale applications, adopting a consistent state-handling strategy is vital for maintainability. Using the status field in a switch block is often preferred over multiple if statements because it visually organizes the different UI "modes." This pattern makes it easier for teams to ensure that error boundaries and loading skeletons are implemented uniformly across hundreds of different data-driven components, reducing the likelihood of "unhandled state" bugs.`,
    narrowed: `Technically, the status property is a string that can be 'pending', 'error', or 'success'. In this specific implementation, a switch(status) block acts as a router for the render function. The 'loading' (pending) case is handled first to prevent accessing data while it is undefined. The 'error' case captures the failure, and the default case (success) safely assumes the data is ready for mapping. This creates a waterfall effect that guarantees the correct UI is shown at the correct time.`,
    code: `import React from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchSeedInventory = async () => {
  const response = await fetch('https://api.communityseeds.org/inventory');
  if (!response.ok) {
    throw new Error('The seed vault is temporarily unreachable');
  }
  return response.json();
};

function SeedVault() {
  const { status, data, error } = useQuery({
    queryKey: ['seeds'],
    queryFn: fetchSeedInventory,
  });

  switch (status) {
    case 'pending':
      return <span>Checking the seed vault...</span>;
    case 'error':
      return <span>Vault Error: {error.message}</span>;
    case 'success':
      return (
        <div>
          <h3>Available Seeds</h3>
          <ul>
            {data.map((seed) => (
              <li key={seed.id}>
                {seed.variety} ({seed.type})
              </li>
            ))}
          </ul>
        </div>
      );
    default:
      return null;
  }
}

export default SeedVault;`,
    simple: `Think of this strategy as a "Control Room" with a three-way switch. 1. The 'pending' Position: This is the first stop. If the data is still on its way, the switch is stuck here. You use this to show a "Loading" message so the user knows the app is working. It protects the rest of the code—if you tried to list the seeds before they arrived, the app would crash. 2. The 'error' Position: If the request fails (like a broken internet connection), the switch automatically flips here. Instead of a blank screen or a crash, the user sees a helpful message explaining what went wrong. 3. The 'success' (default) Position: Once the seeds are successfully "delivered," the switch moves to this final position. Since we've already checked for waiting and errors, we can be 100% sure the data exists. We then use .map() to turn that data into a list on the screen. Using a switch statement makes your code look like a clear set of tracks: the program enters, finds the track that matches the current status, and follows it to the correct UI.`,
    Demo: SeedVaultDemo
  },
  {
    title: "Advanced: fetchStatus",
    concept: "Network Request States",
    bullets: ["Definition and role of fetchStatus", "Possible values: 'fetching', 'paused', 'idle'", "Practical implications of different fetchStatus values in UI handling"],
    description: `While the primary status property (like 'success' or 'error') tells us about the state of the data in the cache, fetchStatus provides a high-resolution view of the actual network request itself. This distinction is critical for understanding "Network Mode" logic in TanStack Query. A query might be in a 'success' state because it has data from a previous fetch, but simultaneously have a fetchStatus of 'fetching' because it is currently re-validating that data in the background. This property allows developers to build UIs that respond specifically to connectivity issues or the actual movement of data over the wire.`,
    realWorld: `A field research app for a marine biologist tracking whale migrations. When the researcher is at sea with an unstable satellite connection, the fetchStatus might move to 'paused'. The UI can then display a message saying, "Connection lost; waiting for signal to resume update," while still showing the last known whale coordinates retrieved from the cache.`,
    broadScale: `In production environments, fetchStatus is essential for handling offline scenarios and background synchronization. It allows for the creation of "Global Loading Indicators" that only appear when a network request is actually in progress, regardless of which specific component triggered it. By monitoring 'paused', applications can intelligently notify users that their data might be out of date due to network interruptions, rather than simply showing a generic error or a stale screen without context.`,
    narrowed: `Technically, fetchStatus has three distinct values: 'fetching' means the queryFn is currently running; 'paused' means the query wants to fetch but is blocked (usually due to no network connection); and 'idle' means the query is not doing anything at the moment. This operates independently of the data status. For example, if a user navigates to a page while offline, the data status might be 'pending' (no data yet) while the fetchStatus is 'paused' (waiting for internet).`,
    code: `import React from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchMigrationData = async () => {
  const response = await fetch('https://api.ocean-research.org/migrations');
  if (!response.ok) {
    throw new Error('Satellite link failure');
  }
  return response.json();
};

function MigrationTracker() {
  const { data, status, fetchStatus } = useQuery({
    queryKey: ['whaleMigrations'],
    queryFn: fetchMigrationData,
  });

  return (
    <div>
      <h2>Whale Migration Live Feed</h2>
      {fetchStatus === 'fetching' && <p>🛰️ Satellite link active: Fetching data...</p>}
      {fetchStatus === 'paused' && <p>⚠️ Connection lost: Retrying when signal returns...</p>}
      {fetchStatus === 'idle' && <p>✅ Link idle: Data synchronized.</p>}
      <hr />
      {status === 'pending' && fetchStatus === 'fetching' && (
        <p>Initializing tracker for the first time...</p>
      )}
      {status === 'success' && (
        <ul>
          {data.map((whale) => (
            <li key={whale.id}>
              {whale.name}: Last seen at {whale.coordinates}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MigrationTracker;`,
    simple: `Think of fetchStatus as a "Network Activity Light" on a modem. 1. 'fetching': The light is blinking rapidly. The computer is actively talking to the internet right now to get your migration data. 2. 'paused': The light is solid orange. The computer wants to talk to the internet, but the cable is unplugged. It isn't giving up; it’s just sitting there waiting for you to plug the cable back in so it can resume exactly where it left off. 3. 'idle': The light is off. The computer has finished its job and is currently resting because it doesn't need to send or receive anything at this moment. The big advantage here is that you can tell the user exactly what is happening with their connection. Instead of just saying "Loading...", you can say "I'm trying to load, but your Wi-Fi is down" by checking if fetchStatus === 'paused'. This makes the app feel much smarter and more helpful during travel or in areas with poor reception.`,
    Demo: MigrationTrackerDemo
  }
];

function RecapSection() {
  const bestPractices = [
    'Describe reads from the server with queries instead of manually coordinating fetch calls, loading flags, error flags, and cached values.',
    'Always give a query a stable, descriptive query key so TanStack Query can identify exactly which cached resource belongs to which UI request.',
    'Write query functions as contracts: they should return usable data when the request succeeds and throw clear errors when the request fails.',
    'Separate first-load feedback from background-refresh feedback so users understand whether the app is empty, stale, refreshing, or offline.',
  ]

  const recapRows = [
    ['Query Key', 'A unique cache address for one specific server-state request.'],
    ['Query Function', 'The async instruction that retrieves the data and either resolves usable JSON or throws an error.'],
    ['isPending', 'The first-load state when the query has not resolved data yet.'],
    ['isFetching', 'A network-activity signal that can be true even while cached data is already visible.'],
    ['status', 'The state of the data result: pending, error, or success.'],
    ['fetchStatus', 'The state of the actual network request: fetching, paused, or idle.'],
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
          TanStack Query removes the manual labor of data fetching so the UI can reliably reflect server state
          across changing data, repeated visits, background refreshes, and unpredictable network conditions.
          The query key names the data, the query function retrieves it, and the result fields help the interface
          explain exactly what is happening.
        </p>
      </div>
    </section>
  )
}

export default function Week04QueriesWithTanStackQueryMasterclass({ onBack, onSectionChange, title = 'Queries with TanStack Query' }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeSection = useMemo(() => slides[activeIndex], [activeIndex])
  const ActiveDemo = activeSection?.Demo

  useEffect(() => {
    if (!onSectionChange) return
    if (activeIndex < slides.length) {
      onSectionChange({ index: activeIndex + 1, title: slides[activeIndex].title })
      return
    }
    onSectionChange({ index: slides.length + 1, title: 'Best Practices and Recap' })
  }, [activeIndex, onSectionChange])

  return (
    <div className="sm-page">
      <div className="sm-toolbar">
        <button className="sm-button ghost" onClick={onBack}>← Back to Week 04</button>
        <div className="sm-toolbar-copy"><p className="sm-kicker">AD312 • Week 04 • Lecture 02</p><h2>{title}</h2></div>
      </div>
      <div className="sm-layout">
        <aside className="sm-sidebar">
          <div className="sm-sidebar-label">Lecture Sections</div>
          {slides.map((section, index) => (
            <button key={section.title} className={index === activeIndex ? 'sm-nav-button active' : 'sm-nav-button'} onClick={() => setActiveIndex(index)}>
              <span className="sm-nav-step">{String(index + 1).padStart(2, '0')}</span><span>{section.title}</span>
            </button>
          ))}
          <button className={activeIndex === slides.length ? 'sm-nav-button active' : 'sm-nav-button'} onClick={() => setActiveIndex(slides.length)}>
            <span className="sm-nav-step">{String(slides.length + 1).padStart(2, '0')}</span><span>Best Practices and Recap</span>
          </button>
        </aside>
        <main className="sm-content">
          {activeIndex < slides.length ? <SectionWrapper {...activeSection}>{ActiveDemo ? <ActiveDemo /> : null}</SectionWrapper> : <RecapSection />}
        </main>
      </div>
    </div>
  )
}
