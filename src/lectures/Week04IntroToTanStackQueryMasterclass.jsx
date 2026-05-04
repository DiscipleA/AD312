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

function ServerStateStatusDemo() {
  const [status, setStatus] = useState('idle')
  const [profile, setProfile] = useState(null)

  function loadProfile() {
    setStatus('loading')
    window.setTimeout(() => {
      setProfile({ name: 'Ari Student', plan: 'AD312 Pro Lab', updated: new Date().toLocaleTimeString() })
      setStatus('success')
    }, 500)
  }

  return (
    <div style={{ padding: '20px', borderRadius: '10px', background: 'rgba(52, 152, 219, 0.08)' }}>
      <h3 style={{ marginTop: 0 }}>Manual Server-State Simulation</h3>
      <p>
        This demo shows the manual states developers often track before introducing TanStack Query.
      </p>
      <button className="sm-button" onClick={loadProfile}>Fetch profile</button>
      <div style={{ marginTop: '16px' }}>
        <strong>Status:</strong> {status}
      </div>
      {profile ? (
        <div style={{ marginTop: '12px' }}>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Plan:</strong> {profile.plan}</p>
          <p><strong>Updated:</strong> {profile.updated}</p>
        </div>
      ) : null}
    </div>
  )
}

function CacheTimelineDemo() {
  const [cacheAge, setCacheAge] = useState(0)
  const [servedFromCache, setServedFromCache] = useState(true)

  function simulateRefetch() {
    setServedFromCache(false)
    window.setTimeout(() => {
      setCacheAge(0)
      setServedFromCache(true)
    }, 450)
  }

  return (
    <div style={{ padding: '20px', borderRadius: '10px', border: '1px solid rgba(52, 152, 219, 0.35)' }}>
      <h3 style={{ marginTop: 0 }}>Cache Thinking</h3>
      <p>Current cache age: {cacheAge} seconds</p>
      <p>Currently serving: {servedFromCache ? 'cached data while the UI stays responsive' : 'fresh network data is being requested'}</p>
      <button className="sm-button" onClick={() => setCacheAge((age) => age + 15)}>Age cache</button>
      <button className="sm-button ghost" onClick={simulateRefetch} style={{ marginLeft: '10px' }}>
        Background refetch
      </button>
    </div>
  )
}

function QueryKeyDemo() {
  const [toolId, setToolId] = useState('camera-101')
  const key = ['rentalTool', toolId]

  return (
    <div style={{ padding: '20px', borderRadius: '10px', background: 'rgba(46, 204, 113, 0.1)' }}>
      <h3 style={{ marginTop: 0 }}>Query Key Builder</h3>
      <p>
        A query key should describe exactly which remote resource is being cached.
      </p>
      <button className="sm-button" onClick={() => setToolId('camera-101')}>Camera</button>
      <button className="sm-button ghost" onClick={() => setToolId('tripod-204')} style={{ marginLeft: '10px' }}>
        Tripod
      </button>
      <pre style={{ marginTop: '18px', overflowX: 'auto' }}>{JSON.stringify(key, null, 2)}</pre>
    </div>
  )
}

function DevExperienceDemo() {
  const [focusCount, setFocusCount] = useState(0)

  return (
    <div style={{ padding: '20px', borderRadius: '10px', background: 'rgba(241, 196, 15, 0.12)' }}>
      <h3 style={{ marginTop: 0 }}>Refetch-on-Focus Mental Model</h3>
      <p>
        When a user returns to a screen, TanStack Query can refetch stale data in the background.
      </p>
      <button className="sm-button" onClick={() => setFocusCount((count) => count + 1)}>
        Simulate returning to tab
      </button>
      <p style={{ marginBottom: 0 }}>Background freshness checks: {focusCount}</p>
    </div>
  )
}

function NewsTickerDemo() {
  const [headlines, setHeadlines] = useState([
    'React teams standardize server-state handling',
    'Background refetching improves dashboard freshness',
  ])

  function addHeadline() {
    setHeadlines((current) => [
      `Breaking update ${current.length + 1}: cache stayed responsive`,
      ...current,
    ])
  }

  return (
    <div style={{ padding: '20px', borderRadius: '10px', border: '1px solid rgba(241, 196, 15, 0.5)' }}>
      <h3 style={{ marginTop: 0 }}>News Cache Preview</h3>
      <button className="sm-button" onClick={addHeadline}>Simulate fresh headline</button>
      <ul>
        {headlines.map((headline) => (
          <li key={headline}>{headline}</li>
        ))}
      </ul>
    </div>
  )
}

function TransitAppDemo() {
  const [activeCount, setActiveCount] = useState(12)
  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleTimeString())

  function refreshFleet() {
    setActiveCount((count) => count + 1)
    setLastUpdate(new Date().toLocaleTimeString())
  }

  return (
    <div style={{ padding: '20px', borderRadius: '10px', background: 'rgba(155, 89, 182, 0.1)' }}>
      <h3 style={{ marginTop: 0 }}>Transit Fleet Status</h3>
      <p>Active buses: {activeCount}</p>
      <p>Last update: {lastUpdate}</p>
      <button className="sm-button" onClick={refreshFleet}>Refresh fleet data</button>
    </div>
  )
}

function RecapSection() {
  const bestPractices = [
    'Treat server state as data that lives outside React and can change without the current component doing anything.',
    'Use TanStack Query when a screen depends on remote data that needs loading, error, cache, retry, or refetch behavior.',
    'Give every query a stable query key so the cache has a predictable address for that specific resource.',
    'Keep query functions focused: make the request, check the response, and return usable data or throw a meaningful error.',
  ]

  const recapRows = [
    ['Server State', 'Remote data owned by an API, backend, database, or service rather than the component itself.'],
    ['Query Key', 'The cache address TanStack Query uses to identify, reuse, refetch, and invalidate data.'],
    ['Query Function', 'The async function that explains how to retrieve the remote resource.'],
    ['QueryClientProvider', 'The provider that gives the React tree access to one shared query cache.'],
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
          TanStack Query is not just a fetch helper. It is a server-state synchronization layer.
          The important shift is moving from manually fetching and storing everything yourself to
          describing the remote data a component needs and letting the query cache manage the lifecycle.
        </p>
      </div>
    </section>
  )
}

const sections = [
  {
    title: 'Introduction to TanStack Query',
    slideData: {
      title: 'Concept: Introduction to TanStack Query',
      bullets: [
        'Server state is remote data that belongs to a backend, API, database, or service rather than the browser component itself.',
        'TanStack Query gives React apps a standard way to fetch, cache, synchronize, and update server state.',
        'The library reduces repetitive loading, error, retry, and caching code that usually appears around fetch requests.',
        'The main mental model: React state remembers local UI decisions; TanStack Query manages remote data lifecycles.',
      ],
    },
    description:
      'TanStack Query is a powerful asynchronous state-management library used for managing server state in React applications. Instead of manually coordinating fetch calls, loading flags, error flags, cached results, and refetch behavior in every component, developers describe the data they need with a query key and a query function. The library then handles the lifecycle around that remote data.',
    rwTitle: 'A student dashboard',
    rwContent:
      'Imagine a school dashboard that shows a student profile, assignment scores, course announcements, and instructor feedback. Those pieces of information do not originate inside the component. They live on a server and may change while the student is using the app. TanStack Query helps the dashboard show available cached data quickly while also checking for newer information in the background.',
    broadTitle: 'Moving from local memory to synchronization',
    broadContent:
      'At a broad architectural level, TanStack Query separates client-state concerns from server-state concerns. Local UI state answers questions like “is this dropdown open?” Server state answers questions like “what data does the backend currently have?” Keeping those responsibilities separate makes larger React apps easier to reason about, test, and scale.',
    narrowTitle: 'useQuery describes a remote resource',
    narrowContent:
      'The useQuery hook is the central entry point. A queryKey names the resource in the cache, and a queryFn performs the actual asynchronous request. From there, TanStack Query exposes status, data, error, and refetch behavior without requiring a custom useEffect chain in the component.',
    fullCode: `import React from 'react';
import { useQuery } from '@tanstack/react-query';

/**
 * Concept: Introduction to TanStack Query
 * Implementation: Student profile panel
 *
 * This example is intentionally written as a complete component instead of a tiny snippet.
 * In a real app, the profile data lives on a server, so the component should not treat it
 * like ordinary local UI state. TanStack Query gives the component a clean contract:
 * describe the data, fetch the data, and let the query cache manage the lifecycle.
 */
async function fetchStudentProfile() {
  // fetch() returns a Promise because the browser has to leave the React app,
  // contact a remote API, wait for a response, and then bring data back.
  const response = await fetch('/api/student-profile');

  // React components should not silently accept failed server responses.
  // Throwing an Error lets TanStack Query place the query into an error state,
  // which gives the UI a predictable branch for failure messages.
  if (!response.ok) {
    throw new Error('Unable to load the student profile.');
  }

  // The query function returns the parsed data. TanStack Query stores this value
  // in its cache under the queryKey used by the component below.
  return response.json();
}

export default function StudentProfilePanel() {
  const { data, isLoading, isError, error } = useQuery({
    // The queryKey is the address of this data in the cache.
    // If another component asks for ['studentProfile'], TanStack Query can reuse
    // the same cached result instead of immediately making a duplicate request.
    queryKey: ['studentProfile'],

    // The queryFn is the actual async work. Keeping it separate makes the component
    // easier to read and makes the data-fetching responsibility explicit.
    queryFn: fetchStudentProfile,
  });

  if (isLoading) {
    return <p>Loading student profile...</p>;
  }

  if (isError) {
    return <p role="alert">Profile failed to load: {error.message}</p>;
  }

  return (
    <section>
      <h2>{data.name}</h2>
      <p>Program: {data.program}</p>
      <p>Current course: {data.currentCourse}</p>
    </section>
  );
}`,
    explanation: [
      '1. fetchStudentProfile is separated from the component so the component can focus on rendering while the function focuses on remote data retrieval.',
      '2. queryKey: ["studentProfile"] gives the cache a stable address for this data. That address is what makes reuse and deduplication possible.',
      '3. queryFn: fetchStudentProfile tells TanStack Query exactly how to retrieve the data when the cache needs it.',
      '4. isLoading and isError replace the manual loading/error state variables that students often write with useState and useEffect.',
    ].join('\n'),
    demo: <ServerStateStatusDemo />,
  },
  {
    title: 'Motivation Behind TanStack Query',
    slideData: {
      title: 'Concept: Why React Apps Need Server-State Tools',
      bullets: [
        'Manual fetch logic becomes repetitive as an app grows.',
        'Loading, error, success, retry, and refresh states often get duplicated across many components.',
        'Caching prevents the app from asking the server for the same data over and over.',
        'Background refetching keeps the interface fresh without freezing the user experience.',
      ],
    },
    description:
      'The motivation behind TanStack Query is that server-state management has a lot of hidden complexity. A simple fetch call may look easy at first, but production applications must also think about stale data, request failures, retries, race conditions, duplicate requests, and how long cached data should be trusted.',
    rwTitle: 'An equipment rental site',
    rwContent:
      'A rental platform may show a camera as available, but another customer can reserve it seconds later. Without background synchronization, the page can become misleading. TanStack Query helps the UI stay responsive while still checking whether the server has newer availability data.',
    broadTitle: 'Consistency across teams',
    broadContent:
      'When every developer invents their own data-fetching pattern, the app becomes difficult to maintain. TanStack Query gives teams a shared vocabulary: query keys, query functions, stale time, cache time, invalidation, and refetching. That consistency reduces bugs and makes code reviews clearer.',
    narrowTitle: 'Replacing manual effect plumbing',
    narrowContent:
      'The narrow implementation shift is moving away from repeated useEffect blocks that manually track loading, data, and errors. useQuery places those common concerns behind one declarative call while still allowing advanced customization when the app needs it.',
    fullCode: `import React, { useEffect, useState } from 'react';

/**
 * Concept: Manual server-state management before TanStack Query
 * Implementation: Equipment availability panel
 *
 * This complete example shows the kind of code TanStack Query is designed to reduce.
 * It works, but the component has to manually track data, loading, error, cleanup,
 * and the timing of the network request. As more screens need similar behavior,
 * this manual pattern becomes repetitive and easier to get wrong.
 */
export default function ManualAvailabilityPanel({ toolId }) {
  const [tool, setTool] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let shouldIgnoreResult = false;

    async function loadTool() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/tools/' + toolId);

        if (!response.ok) {
          throw new Error('Could not load this rental tool.');
        }

        const nextTool = await response.json();

        // This guard protects the component from trying to update state after
        // it has unmounted or after a newer request has replaced this one.
        if (!shouldIgnoreResult) {
          setTool(nextTool);
        }
      } catch (caughtError) {
        if (!shouldIgnoreResult) {
          setError(caughtError);
        }
      } finally {
        if (!shouldIgnoreResult) {
          setIsLoading(false);
        }
      }
    }

    loadTool();

    return () => {
      shouldIgnoreResult = true;
    };
  }, [toolId]);

  if (isLoading) return <p>Checking equipment availability...</p>;
  if (error) return <p role="alert">{error.message}</p>;

  return (
    <article>
      <h2>{tool.name}</h2>
      <p>Status: {tool.available ? 'Available' : 'Reserved'}</p>
      <p>Daily rate: \${tool.dailyRate}</p>
    </article>
  );
}`,
    explanation: [
      '1. This example is valid React, but notice how much infrastructure surrounds one request: three pieces of state, one effect, one cleanup guard, try/catch/finally, and multiple rendering branches.',
      '2. The cleanup flag protects against updating state after the component has become stale, which is a common source of subtle bugs in manual fetching code.',
      '3. TanStack Query does not remove the need to understand async code. It standardizes this lifecycle so every component does not have to rebuild it from scratch.',
      '4. This is why TanStack Query becomes more valuable as an app grows: the repeated server-state pattern becomes centralized and predictable.',
    ].join('\n'),
    demo: <CacheTimelineDemo />,
  },
  {
    title: 'Challenges of Managing Server State',
    slideData: {
      title: 'Concept: Server-State Challenges',
      bullets: [
        'Server data can be stale because the source of truth lives outside the browser.',
        'Multiple components may need the same data at the same time.',
        'Requests can fail, retry, overlap, or finish in an unexpected order.',
        'The UI must remain understandable while data is loading, refreshing, or unavailable.',
      ],
    },
    description:
      'Server state is challenging because React does not own it. The backend owns it. A component may render cached data from earlier, request fresh data now, show an error later, or need to update after another user changes the same resource. TanStack Query gives structure to these moving parts.',
    rwTitle: 'A collaborative project board',
    rwContent:
      'If two teammates update the same project board, one browser can easily show outdated cards. A query cache can keep the interface fast while still refetching when the data should be considered stale, reducing the chance that users act on old information.',
    broadTitle: 'Distributed state',
    broadContent:
      'At scale, server state is distributed across browsers, APIs, databases, and background jobs. No single component has complete control over when that data changes. A server-state library helps the frontend cooperate with that distributed reality instead of pretending all data is local.',
    narrowTitle: 'Keys, invalidation, and freshness',
    narrowContent:
      'The practical tools are query keys, freshness settings, and invalidation. A query key identifies the cached resource. Freshness settings decide when cached data should be trusted. Invalidation tells the cache that related data should be refetched after a meaningful change.',
    fullCode: `import React from 'react';
import { useQuery } from '@tanstack/react-query';

/**
 * Concept: Query keys describe server-state identity
 * Implementation: Rental tool detail screen
 *
 * The challenge here is that different tool IDs represent different remote resources.
 * The query key must include the dynamic toolId so TanStack Query does not confuse
 * the cached data for one tool with the cached data for another tool.
 */
async function fetchRentalTool(toolId) {
  const response = await fetch('/api/rental-tools/' + toolId);

  if (!response.ok) {
    throw new Error('The rental tool could not be loaded.');
  }

  return response.json();
}

export default function RentalToolDetail({ toolId }) {
  const { data, isPending, isError, error, isFetching } = useQuery({
    // The first item names the type of resource. The second item identifies
    // the exact resource instance. Together, they become the cache address.
    queryKey: ['rentalTool', toolId],

    // The query function closes over toolId, so it fetches the matching tool.
    // TanStack Query calls this when the cache has no data or when refetching is needed.
    queryFn: () => fetchRentalTool(toolId),

    // staleTime tells TanStack Query how long the cached data can be considered fresh.
    // During this time, the UI can avoid unnecessary refetches for the same key.
    staleTime: 60 * 1000,
  });

  if (isPending) return <p>Loading rental tool...</p>;
  if (isError) return <p role="alert">{error.message}</p>;

  return (
    <article>
      <h2>{data.name}</h2>
      <p>Location: {data.location}</p>
      <p>Status: {data.available ? 'Available' : 'Reserved'}</p>
      {isFetching ? <small>Refreshing availability in the background...</small> : null}
    </article>
  );
}`,
    explanation: [
      '1. queryKey: ["rentalTool", toolId] is more precise than ["rentalTool"] because each tool has its own cache entry.',
      '2. isPending describes the first load when the UI does not have usable data yet.',
      '3. isFetching can be true even while old data remains visible, which supports background refresh without blanking out the screen.',
      '4. staleTime prevents excessive requests by allowing recently fetched data to remain fresh for a defined period.',
    ].join('\n'),
    demo: <QueryKeyDemo />,
  },
  {
    title: 'Why TanStack Query?',
    slideData: {
      title: 'Concept: Why TanStack Query?',
      bullets: [
        'It reduces repetitive boilerplate around asynchronous data.',
        'It gives applications caching and background synchronization by default.',
        'It provides a predictable model for loading, success, error, and refreshing states.',
        'It helps teams build features faster without hiding the important server-state concepts.',
      ],
    },
    description:
      'TanStack Query is useful because it solves a recurring problem rather than a one-time problem. Any serious React app eventually has many screens that fetch remote data. Without a shared pattern, each screen grows its own custom fetching logic. TanStack Query gives those screens one consistent server-state model.',
    rwTitle: 'A pricing page that must stay current',
    rwContent:
      'A rental company may update pricing, discounts, or availability throughout the day. If a customer returns to a tab after several minutes, the app should not quietly show old prices. TanStack Query can refetch when the window regains focus, keeping the UI aligned with the server.',
    broadTitle: 'Better user experience through freshness',
    broadContent:
      'The broad benefit is that users get interfaces that feel fast and trustworthy. Cached data makes screens appear quickly. Background refetching keeps those screens current. Retry behavior helps temporary network problems recover without forcing the user to refresh manually.',
    narrowTitle: 'Options describe behavior declaratively',
    narrowContent:
      'Options such as refetchOnWindowFocus, retry, staleTime, and enabled let developers describe how a query should behave. The component remains focused on rendering while the query configuration captures the server-state policy.',
    fullCode: `import React from 'react';
import { useQuery } from '@tanstack/react-query';

/**
 * Concept: TanStack Query feature behavior
 * Implementation: Tool detail view with refetch-on-focus
 *
 * This example shows how behavior that would otherwise require custom event listeners,
 * timers, and manual retry logic can be expressed as query options. The component still
 * stays readable because the server-state policy is colocated with the query.
 */
async function fetchToolDetail(toolId) {
  const response = await fetch('/api/tools/' + toolId + '/detail');

  if (!response.ok) {
    throw new Error('Tool detail is temporarily unavailable.');
  }

  return response.json();
}

export default function ToolDetailView({ toolId }) {
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['toolDetail', toolId],
    queryFn: () => fetchToolDetail(toolId),

    // The UI may show cached data immediately, but after 30 seconds that data
    // is considered stale and eligible for a background refresh.
    staleTime: 30 * 1000,

    // When the user returns to the browser tab, TanStack Query can check whether
    // stale data should be updated. This is useful for prices, availability, and dashboards.
    refetchOnWindowFocus: true,

    // Temporary failures happen on real networks. Retrying helps the app recover
    // from brief connection issues without immediately giving up on the user.
    retry: 2,
  });

  if (isLoading) return <p>Optimizing rental catalog...</p>;
  if (isError) return <p role="alert">Connectivity alert: {error.message}</p>;

  return (
    <article>
      <h2>{data.modelName}</h2>
      <p>Daily rate: \${data.price}</p>
      <p>Location: {data.warehouseLocation}</p>
      <button>Reserve Now</button>
      {isFetching ? <small>Checking for the newest availability...</small> : null}
    </article>
  );
}`,
    explanation: [
      '1. staleTime controls how long the cached result is treated as fresh, which reduces unnecessary requests.',
      '2. refetchOnWindowFocus helps protect users from acting on old data after returning to a tab.',
      '3. retry gives the app resilience against temporary network failures.',
      '4. The component still renders ordinary JSX, but the async lifecycle is now governed by one consistent query configuration.',
    ].join('\n'),
    demo: <DevExperienceDemo />,
  },
  {
    title: 'Features and Benefits',
    slideData: {
      title: 'Concept: Developer Ecosystem and Optimization',
      bullets: [
        'Caching can make screens feel faster and reduce repeated network traffic.',
        'Background updates allow old data to remain visible while fresh data is requested.',
        'Request deduplication prevents multiple components from firing duplicate requests for the same query key.',
        'Configuration options let teams tune behavior for simple apps or complex enterprise screens.',
      ],
    },
    description:
      'TanStack Query provides a feature set aimed at performance and maintainability. It can cache data, deduplicate requests, retry failed requests, refresh stale data, and expose useful status flags. These features improve both developer experience and user experience because the application becomes less repetitive and more responsive.',
    rwTitle: 'A global news platform',
    rwContent:
      'A news homepage might show the same article data in a breaking-news banner, a topic list, and a sidebar. With a shared query key, those areas can rely on the same cached result instead of each component downloading the same article independently.',
    broadTitle: 'Bandwidth, speed, and trust',
    broadContent:
      'Caching and deduplication reduce unnecessary traffic, which helps performance on slow connections and mobile networks. Background updates improve trust because users can keep reading while the app silently checks for newer information.',
    narrowTitle: 'Status values shape the interface',
    narrowContent:
      'The returned query object gives the component information such as pending, error, success, fetching, and data values. That vocabulary makes it easier to design precise UI states instead of relying on vague booleans scattered across a component.',
    fullCode: `import React from 'react';
import { useQuery } from '@tanstack/react-query';

/**
 * Concept: Caching, retrying, and background updates
 * Implementation: News ticker
 *
 * This complete example demonstrates how a query can be simple at the call site
 * while still carrying useful behavior. The cache stores headlines, staleTime limits
 * excessive refetching, and retry gives the network request a chance to recover.
 */
async function fetchNewsHeadlines() {
  const response = await fetch('/api/news/headlines');

  if (!response.ok) {
    throw new Error('Network failure while fetching headlines.');
  }

  return response.json();
}

export default function NewsTicker() {
  const { data, status, error, isFetching } = useQuery({
    // Every component that asks for ['headlines'] can share this cached result.
    queryKey: ['headlines'],

    // This function is the single source of truth for how headline data is retrieved.
    queryFn: fetchNewsHeadlines,

    // For 30 seconds, the headlines can be reused from cache without another request.
    staleTime: 30 * 1000,

    // If the network briefly fails, TanStack Query retries before surfacing the error.
    retry: 3,
  });

  if (status === 'pending') return <p>Loading latest news...</p>;
  if (status === 'error') return <p role="alert">Update failed: {error.message}</p>;

  return (
    <section>
      <h2>Latest Headlines</h2>
      {isFetching ? <small>Refreshing headlines...</small> : null}
      <ul>
        {data.map((article) => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>
    </section>
  );
}`,
    explanation: [
      '1. status gives the UI a readable state machine: pending, error, or success.',
      '2. staleTime helps the app avoid asking for the same headlines too frequently.',
      '3. retry: 3 means a short network interruption does not immediately become a failed user experience.',
      '4. isFetching lets the app show that a background refresh is happening while existing data remains available.',
    ].join('\n'),
    demo: <NewsTickerDemo />,
  },
  {
    title: 'Getting Started with TanStack Query',
    slideData: {
      title: 'Concept: Installation and Provider Setup',
      bullets: [
        'Install the React adapter package with npm install @tanstack/react-query.',
        'Create a QueryClient to hold cache and query configuration.',
        'Wrap the React tree with QueryClientProvider so child components can use useQuery.',
        'Start with one query, then standardize additional server-state screens over time.',
      ],
    },
    description:
      'Getting started with TanStack Query requires two pieces: a QueryClient and a QueryClientProvider. The QueryClient is the cache manager. The provider makes that client available to components below it in the React tree. Once the provider is in place, components can call useQuery to request server data.',
    rwTitle: 'A public transit route finder',
    rwContent:
      'A transit agency can add TanStack Query to a React 18 app and begin with a single live-bus query. The provider sits near the app root, and individual route components use query keys such as ["busLocation", routeId] to request specific data.',
    broadTitle: 'Incremental adoption',
    broadContent:
      'Teams do not need to rewrite an entire app at once. They can add the provider, convert one server-state screen, and then gradually move repeated fetch logic into TanStack Query as the pattern proves itself.',
    narrowTitle: 'Provider before hooks',
    narrowContent:
      'The key technical rule is that useQuery must run inside a React tree that has access to QueryClientProvider. Without the provider, the hook has no shared client to talk to, so the cache and query lifecycle cannot function.',
    fullCode: `import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

/**
 * Concept: Getting started with TanStack Query
 * Implementation: Transit fleet status app
 *
 * This complete example shows the provider setup and one child component using useQuery.
 * The QueryClient is created outside the component so React does not create a brand-new
 * cache on every render. The provider then shares that client with the component tree.
 */
const transitQueryClient = new QueryClient();

async function fetchBusLocation() {
  const response = await fetch('/api/transit/live-bus');

  if (!response.ok) {
    throw new Error('Transit data unavailable.');
  }

  return response.json();
}

function BusRouteDisplay() {
  const { data, status, error } = useQuery({
    // This key identifies the live bus summary in the shared query cache.
    queryKey: ['busLocation'],

    // This function performs the network request when the query needs data.
    queryFn: fetchBusLocation,
  });

  if (status === 'pending') return <p>Tracking buses...</p>;
  if (status === 'error') return <p role="alert">Network error: {error.message}</p>;

  return (
    <section>
      <h2>Current Fleet Status</h2>
      <p>Active buses: {data.activeCount}</p>
      <p>Last update: {new Date(data.timestamp).toLocaleTimeString()}</p>
    </section>
  );
}

export default function TransitApp() {
  return (
    <QueryClientProvider client={transitQueryClient}>
      <BusRouteDisplay />
    </QueryClientProvider>
  );
}`,
    explanation: [
      '1. new QueryClient() creates the cache manager that stores query results and query metadata.',
      '2. QueryClientProvider makes that cache manager available to any component below it.',
      '3. BusRouteDisplay can call useQuery because it is rendered inside the provider.',
      '4. The app starts small, but this same provider can support many future queries across the application.',
    ].join('\n'),
    demo: <TransitAppDemo />,
  },
]

export default function Week04IntroToTanStackQueryMasterclass({
  onBack,
  onSectionChange,
  title = 'Introduction to TanStack Query',
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
      title: 'Best Practices and Recap',
    })
  }, [activeIndex, onSectionChange])

  return (
    <div className="sm-page">
      <div className="sm-toolbar">
        <button className="sm-button ghost" onClick={onBack}>
          ← Back to Week 04
        </button>

        <div className="sm-toolbar-copy">
          <p className="sm-kicker">AD312 • Week 04 • Lecture 01</p>
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
