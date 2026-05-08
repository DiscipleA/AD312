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

function QueryFunctionDemo() {
  const idRef = useRef('soil-demo-001')
  const [status, setStatus] = useState('Ready to fetch soil moisture levels.')
  const [moisture, setMoisture] = useState(null)

  function fetchData() {
    setStatus('Promise resolved with successful data payload.')
    setMoisture('42%')
  }

  return (
    <div>
      <h3>Vineyard Sensor</h3>
      <p className="sm-muted">Stable ID: {idRef.current}</p>
      <button className="sm-button" onClick={fetchData}>Fetch Soil Data</button>
      <p>Status: {status}</p>
      {moisture ? <strong>Soil Moisture: {moisture}</strong> : null}
    </div>
  )
}

function BasicsQueryDemo() {
  const idRef = useRef('station-alpha-9')
  const [record, setRecord] = useState('No seismic record selected.')

  return (
    <div>
      <h3>Geological Survey</h3>
      <p className="sm-muted">Station ID: {idRef.current}</p>
      <button className="sm-button" onClick={() => setRecord('Seismic record loaded for station-alpha-9.')}>Load Station Record</button>
      <p>{record}</p>
    </div>
  )
}

function ErrorHandlingDemo() {
  const [pressure, setPressure] = useState(10800)
  const [message, setMessage] = useState('Telemetry link is stable.')

  function checkPressure() {
    if (pressure > 11000) {
      setMessage('Critical Pressure Threshold Exceeded')
    } else {
      setMessage('Telemetry received safely.')
    }
  }

  return (
    <div>
      <h3>Submersible Telemetry</h3>
      <p>Pressure: {pressure}</p>
      <button className="sm-button" onClick={() => setPressure(11150)}>Simulate High Pressure</button>
      <button className="sm-button" onClick={checkPressure}>Check Telemetry</button>
      <p>{message}</p>
    </div>
  )
}

function FetchApiDemo() {
  const [droneStatus, setDroneStatus] = useState('Awaiting satellite uplink response.')
  const [ok, setOk] = useState(true)

  function checkDrone() {
    setDroneStatus(ok ? 'Drone alpha-niner status retrieved successfully.' : 'Satellite uplink communication error')
    setOk(!ok)
  }

  return (
    <div>
      <h3>Autonomous Drone Status</h3>
      <button className="sm-button" onClick={checkDrone}>Check Drone Status</button>
      <p>{droneStatus}</p>
    </div>
  )
}

function QueryVariablesDemo() {
  const [sensorType, setSensorType] = useState('temperature')
  const [page, setPage] = useState(1)

  return (
    <div>
      <h3>Climate Records</h3>
      <p>queryKey: ['climate', {'{'} sensorType: '{sensorType}', page: {page} {'}'}]</p>
      <button className="sm-button" onClick={() => setSensorType(sensorType === 'temperature' ? 'humidity' : 'temperature')}>Toggle Sensor Type</button>
      <button className="sm-button" onClick={() => setPage(page + 1)}>Next Page</button>
    </div>
  )
}

function QueryFunctionContextDemo() {
  const [active, setActive] = useState(false)
  const [status, setStatus] = useState('No tile download is active.')

  function start() {
    setActive(true)
    setStatus('High-resolution tile download started.')
  }

  function cancel() {
    setActive(false)
    setStatus('AbortSignal canceled the outgoing network request.')
  }

  return (
    <div>
      <h3>Satellite Imagery Viewer</h3>
      <button className="sm-button" onClick={start}>Start Tile Download</button>
      <button className="sm-button" onClick={cancel}>Cancel Download</button>
      <p>{status}</p>
      <p className="sm-muted">Active request: {active ? 'Yes' : 'No'}</p>
    </div>
  )
}

const codeExample1 = `import { useQuery } from '@tanstack/react-query'

function fetchSoilData() {
  // A query function can be any function that returns a Promise.
  // TanStack Query does not care whether the Promise comes from fetch, Axios,
  // GraphQL, IndexedDB, or another asynchronous source. What matters is that
  // the Promise resolves with useful data or rejects/throws when the request fails.
  return fetch('https://api.vineyard-sensors.com/v1/moisture')
    .then((response) => {
      // The browser Fetch API resolves even for many HTTP error statuses.
      // This check converts an unhealthy HTTP response into a thrown Error so
      // TanStack Query can move the query into its error state instead of
      // pretending the request succeeded with bad or missing data.
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      // Returning response.json() keeps the Promise chain alive. The final
      // resolved JSON value becomes the data property returned by useQuery.
      return response.json()
    })
}

export default function SoilMoisturePanel() {
  const soilQuery = useQuery({
    // queryKey names this piece of server state in the cache.
    // A stable key lets TanStack Query reuse, refetch, and invalidate this data.
    queryKey: ['soilMoisture'],

    // queryFn points to the instructions for retrieving the data.
    // Notice that the function reference is passed; it is not called here.
    queryFn: fetchSoilData,
  })

  if (soilQuery.isLoading) {
    return <p>Checking vineyard soil sensors...</p>
  }

  if (soilQuery.isError) {
    return <p role="alert">Sensor request failed: {soilQuery.error.message}</p>
  }

  return <strong>Soil Moisture: {soilQuery.data.moisture}</strong>
}`

const codeExample2 = `import { useQuery } from '@tanstack/react-query'

async function fetchSeismicRecord(stationId) {
  // async/await reads top-to-bottom, which is helpful when a request has several
  // required stages: build the URL, wait for the response, validate it, and parse it.
  const response = await fetch(
    \`https://api.geology-data.org/seismic/\${stationId}\`
  )

  if (!response.ok) {
    throw new Error('Failed to retrieve seismic data')
  }

  return response.json()
}

export default function GeologicalSurveyPanel() {
  const stationQuery = useQuery({
    // The first item describes the resource family; the second item identifies
    // the specific station. Together they create one exact cache address.
    queryKey: ['seismic', 'station-alpha-9'],

    // TanStack Query passes a QueryFunctionContext object into queryFn.
    // Destructuring queryKey from that context keeps the request parameters
    // synchronized with the same key that names the cache entry.
    queryFn: async ({ queryKey }) => {
      const stationId = queryKey[1]
      const data = await fetchSeismicRecord(stationId)
      return data
    },
  })

  if (stationQuery.isPending) {
    return <p>Loading seismic record...</p>
  }

  return <pre>{JSON.stringify(stationQuery.data, null, 2)}</pre>
}`

const codeExample3 = `import { useQuery } from '@tanstack/react-query'

async function fetchSubmersibleTelemetry(sensorId) {
  const response = await fetch(
    \`https://api.deep-sea-research.io/sensors/\${sensorId}\`
  )

  // Network-level failure: the server did not return a healthy HTTP response.
  if (!response.ok) {
    throw new Error('Sensor communication link failed')
  }

  const data = await response.json()

  // Domain-level failure: the request worked, but the returned measurement is
  // unsafe for the user story. Rejecting here teaches TanStack Query that the
  // query should be treated as failed, not as successful data.
  if (data.pressure > 11000) {
    return Promise.reject(new Error('Critical Pressure Threshold Exceeded'))
  }

  return data
}

export default function SubmersibleTelemetryPanel() {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['telemetry', 'depth-sensor-1'],
    queryFn: () => fetchSubmersibleTelemetry('depth-sensor-1'),
  })

  if (isLoading) return <p>Opening telemetry channel...</p>
  if (isError) return <p role="alert">{error.message}</p>

  return <p>Pressure reading: {data.pressure}</p>
}`

const codeExample4 = `import { useQuery } from '@tanstack/react-query'

async function fetchDroneStatus(droneId) {
  const response = await fetch(
    \`https://api.skylink-logistics.com/v1/drones/\${droneId}\`
  )

  // fetch only rejects automatically for lower-level failures such as network
  // interruption. HTTP responses like 404 or 500 still resolve, so the query
  // function must translate those statuses into thrown errors manually.
  if (!response.ok) {
    throw new Error('Satellite uplink communication error')
  }

  return response.json()
}

export default function DroneStatusPanel() {
  const droneQuery = useQuery({
    queryKey: ['drone', 'alpha-niner'],
    queryFn: () => fetchDroneStatus('alpha-niner'),
  })

  if (droneQuery.isFetching) {
    return <p>Contacting satellite uplink...</p>
  }

  if (droneQuery.isError) {
    return <p role="alert">{droneQuery.error.message}</p>
  }

  return <p>Drone Status: {droneQuery.data.status}</p>
}`

const codeExample5 = `import { useQuery } from '@tanstack/react-query'

function fetchClimateRecords({ queryKey }) {
  // The query key works like a labeled envelope. The first value names the
  // resource family; the second value carries the exact variables needed by the
  // query function. Keeping these variables in the key makes caching automatic.
  const [_resourceName, { sensorType, page }] = queryKey

  return fetch(
    \`https://api.eco-monitor.org/data?type=\${sensorType}&page=\${page}\`
  ).then((response) => {
    if (!response.ok) {
      throw new Error('Failed to fetch climate records')
    }

    return response.json()
  })
}

export default function ClimateData({ sensorType, page }) {
  const result = useQuery({
    // When sensorType or page changes, the queryKey changes. TanStack Query then
    // knows this is a different cache entry and should run the query function for
    // the new variables instead of mixing old and new records together.
    queryKey: ['climate', { sensorType, page }],
    queryFn: fetchClimateRecords,
  })

  if (result.isLoading) return <p>Loading climate records...</p>

  return (
    <ul>
      {result.data.records.map((record) => (
        <li key={record.id}>{record.label}</li>
      ))}
    </ul>
  )
}`

const codeExample6 = `import { useQuery } from '@tanstack/react-query'

async function fetchSatelliteImagery({ signal }) {
  // signal is an AbortSignal supplied by TanStack Query. Passing it to fetch lets
  // the browser cancel the request if the component unmounts, the query becomes
  // obsolete, or the user navigates to a different region before the image loads.
  const response = await fetch(
    'https://api.orbital-viewer.com/v2/tiles/current',
    { signal }
  )

  if (!response.ok) {
    throw new Error('Satellite tile server unreachable')
  }

  return response.json()
}

export default function SatelliteImageryPanel() {
  const imageryQuery = useQuery({
    queryKey: ['satellite', 'active-region'],
    queryFn: fetchSatelliteImagery,
  })

  if (imageryQuery.isFetching) return <p>Downloading active tile...</p>
  if (imageryQuery.isError) return <p role="alert">{imageryQuery.error.message}</p>

  return <img src={imageryQuery.data.tileUrl} alt="Current satellite tile" />
}`

const rawSlides = [
  {
    title: 'Introduction to Query Functions',
    slideData: {
      title: 'Defining and implementing core data-fetching functions for TanStack Query.',
      bullets: [
        'Definition: Any function that returns a promise, resolving data or throwing an error.',
        'Purpose: Essential for fetching data in TanStack Query.',
        'Flexibility: Compatible with various data fetching libraries and APIs.',
      ],
    },
    description: 'A Query Function is the fundamental unit of data retrieval in modern state management libraries like TanStack Query. It is an asynchronous declaration that must return a Promise. This promise serves two outcomes: it either resolves with the successful data payload or rejects with an error object. Because the library relies on the standard Promise API, developers are not locked into a specific fetching tool; they can use native Fetch, Axios, or even GraphQL clients. The library monitors the lifecycle of this promise to automatically handle loading and error states.',
    rwTitle: 'Real-World Application',
    rwContent: 'A specialized agricultural monitoring system retrieves soil moisture levels from remote sensors located across a vineyard. The UI does not need to know the low-level networking details; it only needs a query function that reliably resolves with the current sensor payload or throws a meaningful error when the sensor network fails.',
    broadTitle: 'Broad Scale Usage',
    broadContent: 'In distributed system architectures, the query function acts as the bridge between client-side UI state and external data sources. By decoupling fetching logic from UI components, applications gain maintainability: teams can swap endpoints, transport libraries, or data transformations without rewriting the component that displays the result.',
    narrowTitle: 'Narrowed Approach',
    narrowContent: 'Technically, a query function is passed into the queryFn property of the useQuery hook. It is triggered based on the status of its associated queryKey. If the key is unique and no cached data exists, the function executes and gives TanStack Query the Promise it needs to track loading, success, error, retry, and cache behavior.',
    fullCode: codeExample1,
    explanation: 'The code starts by creating fetchSoilData, a function that returns the Promise produced by fetch. Because talking to the internet takes time, that Promise acts like a placeholder for a future answer. The response.ok check matters because native fetch can resolve even when the server sends an error status. Throwing an Error gives TanStack Query a clean failure signal. In useQuery, queryKey gives the data a stable cache identity, and queryFn tells the library exactly how to retrieve that data.',
    demoName: 'QueryFunctionDemo',
  },
  {
    title: 'Basics of Query Functions',
    slideData: {
      title: 'Implementing diverse patterns for data fetching, including parameterized requests and context-aware functions.',
      bullets: [
        'Simple Fetch Example: Using a fetch function directly.',
        'Fetch with Parameters: Dynamic data fetching using an ID.',
        'Async/Await Fetch: Handling asynchronous requests in readable order.',
        'Using Query Function Context: Accessing queryKey for dynamic parameters.',
      ],
    },
    description: 'This slide expands on the versatility of the query function by demonstrating common implementation patterns. Beyond simple direct calls, it highlights how to pass dynamic variables into fetching logic. It also introduces async/await syntax, which provides a cleaner, more readable way to manage asynchronous flow compared with long promise chains. Finally, it introduces context usage, where TanStack Query automatically passes a context object to queryFn so the function can extract parameters directly from the queryKey array.',
    rwTitle: 'Real-World Application',
    rwContent: 'A geological survey application retrieves specific seismic data records based on a station unique identifier or geographic coordinate. The station ID belongs in both the cache identity and the request logic, so the displayed record always matches the selected station.',
    broadTitle: 'Broad Scale Usage',
    broadContent: 'In complex data-driven architectures, these patterns enable reusable and scalable fetching modules. By utilizing parameters and context, developers can write generalized functions that serve multiple UI views, reduce duplication, and keep network requests synchronized with the state represented by query keys.',
    narrowTitle: 'Narrowed Approach',
    narrowContent: 'When using parameters, wrap the fetching call in an arrow function such as () => fetchById(id) so it does not run during render. When using context, destructure { queryKey } from the argument TanStack Query passes to queryFn. This allows queryKey[1] to become the dynamic ID for the request, keeping the cache label and request parameter aligned.',
    fullCode: codeExample2,
    explanation: 'fetchSeismicRecord uses async/await so each step reads in the order it happens: wait for the server, validate the response, then parse JSON. The useQuery configuration uses a queryKey array with a resource name and a station ID. Inside queryFn, TanStack Query hands the same queryKey to the function. Reading queryKey[1] means the function pulls the station ID from the cache identity instead of duplicating that value somewhere else.',
    demoName: 'BasicsQueryDemo',
  },
  {
    title: 'Handling and Throwing Errors',
    slideData: {
      title: 'Managing failure states within query functions to ensure application resilience.',
      bullets: [
        'Importance of Error Handling: Ensures robust data fetching workflows.',
        'Throwing Errors: Example of throwing an error based on conditions.',
        'Error Propagation: How TanStack Query uses thrown errors to manage query state.',
      ],
    },
    description: 'Error handling is a critical pillar of asynchronous programming. In TanStack Query, a query is considered failed only if the query function throws an error or returns a rejected promise. This slide illustrates how to manually trigger failure states based on business logic or API response codes. By explicitly throwing an error, the developer signals that the query should transition to isError and potentially trigger retry logic, an error boundary, or a user-facing warning.',
    rwTitle: 'Real-World Application',
    rwContent: 'A deep-sea research submersible telemetry system must trigger an alert if pressure readings exceed safe structural limits or if the connection to a sensor is lost. The request may succeed technically, but the returned measurement can still represent a dangerous failure state.',
    broadTitle: 'Broad Scale Usage',
    broadContent: 'In large-scale enterprise applications, unified error propagation allows centralized monitoring and logging. By standardizing how errors are thrown in query functions, teams can implement global error handlers that provide consistent feedback and automatically report issues to telemetry dashboards.',
    narrowTitle: 'Narrowed Approach',
    narrowContent: 'There are two primary ways to signal a failure in an async query function: throw new Error() or return Promise.reject(new Error()). Both are caught by TanStack Query internal state machine. The hook then exposes the error object, which can be used to render accessible warnings or log diagnostic information.',
    fullCode: codeExample3,
    explanation: 'This example distinguishes network failure from domain failure. If response.ok is false, the request itself failed. If the JSON payload says pressure is over the safe threshold, the application rejects the Promise even though the server responded. Both paths teach TanStack Query that the result is not usable data, so the UI can safely render an error message instead of trying to display a broken or dangerous reading.',
    demoName: 'ErrorHandlingDemo',
  },
  {
    title: 'Integration with Fetch API',
    slideData: {
      title: 'Closing the gap between native Fetch API behavior and TanStack Query error tracking.',
      bullets: [
        'Default Behavior: fetch does not throw errors automatically for HTTP error statuses.',
        'Manual Error Handling: Throw errors when HTTP response is not OK.',
        'Example: Implementing error handling in a query function using fetch.',
      ],
    },
    description: 'While the native Fetch API is powerful, it has a behavior that can lead to silent failures: it does not throw an error for 4xx or 5xx HTTP status codes. Instead, it resolves the promise normally if the server responded. To make Fetch compatible with TanStack Query error states, developers must manually check response.ok. If it is false, an error must be thrown so the library knows the data fetching attempt was unsuccessful.',
    rwTitle: 'Real-World Application',
    rwContent: 'A specialized logistics portal monitors the status of autonomous delivery drones through a satellite link. If the server responds with an error status, the UI must not pretend the drone status is valid; it needs to show a clear communication failure.',
    broadTitle: 'Broad Scale Usage',
    broadContent: 'Professional API integrations need truthful state. Without response.ok checks, an application might display a successful state with empty or malformed data. Standardizing this manual throwing pattern across all query functions creates a predictable and resilient network layer.',
    narrowTitle: 'Narrowed Approach',
    narrowContent: 'Use the response.ok boolean immediately after await fetch(). If the condition is false, execute throw new Error(). This halts the function and propagates the error to useQuery, which updates isError, error, failureCount, and related query state fields.',
    fullCode: codeExample4,
    explanation: 'Fetch has a blind spot: a 404 or 500 response is still a completed HTTP conversation. response.ok tells us whether that conversation actually produced acceptable data. Throwing an Error converts a bad HTTP status into the failure language TanStack Query understands. That keeps the UI honest and prevents a false success screen.',
    demoName: 'FetchApiDemo',
  },
  {
    title: 'Advanced Use: Query Function Variables and Context',
    slideData: {
      title: 'Leveraging query keys for identification and dynamic parameter passing.',
      bullets: [
        'Role of Query Keys: Identification and parameter passing.',
        'Refactoring Query Functions: Example of a reusable fetch function.',
        'Benefits of Refactoring: Cleaner code and reusable components.',
      ],
    },
    description: 'The queryKey does more than identify cached data. It can also serve as a transport mechanism for parameters. By including variables like sensor type or page number directly in the queryKey array, developers can refactor fetching logic into standalone, reusable functions. These functions receive a context object containing queryKey, allowing them to construct dynamic API requests without being tied to one component scope.',
    rwTitle: 'Real-World Application',
    rwContent: 'An environmental monitoring platform filters historical climate records based on data type and pagination. Temperature page 1, humidity page 1, and temperature page 2 are three different data requests and should not overwrite each other in cache.',
    broadTitle: 'Broad Scale Usage',
    broadContent: 'This pattern promotes modularity. Teams can maintain a centralized library of API services where endpoint or transformation changes happen once, while every component using the agreed queryKey structure benefits automatically.',
    narrowTitle: 'Narrowed Approach',
    narrowContent: 'Pass the function reference directly to queryFn. TanStack Query calls it with context. Destructure { queryKey }, then use array destructuring to ignore the resource label and extract the variable object. Those values are injected into the URL, and the key change also gives TanStack Query a unique cache address.',
    fullCode: codeExample5,
    explanation: 'The queryKey becomes a specialized delivery envelope. The first value labels the resource family. The second value carries exact variables. fetchClimateRecords opens that envelope by destructuring queryKey, then builds the URL from sensorType and page. This lets one fetch function serve many screens while still caching each variable combination separately.',
    demoName: 'QueryVariablesDemo',
  },
  {
    title: 'Understanding QueryFunctionContext',
    slideData: {
      title: 'Using QueryFunctionContext to manage request lifecycles and metadata.',
      bullets: [
        'Components: queryKey, signal, meta, pageParam, direction.',
        'Usage: How these components control and inform query functions.',
        'Practical Example: Using AbortSignal for query cancellation.',
      ],
    },
    description: 'QueryFunctionContext is an object automatically passed to every queryFn by TanStack Query. Earlier examples focused on queryKey; this slide introduces signal and related metadata. The signal property is an AbortSignal instance that allows the library to communicate with the browser Fetch API and cancel outgoing network requests when a component unmounts, a query becomes stale, or a newer request replaces an older one.',
    rwTitle: 'Real-World Application',
    rwContent: 'A satellite imagery viewer must cancel high-resolution tile downloads if the user quickly pans or zooms to a different geographic region. Canceling irrelevant downloads saves bandwidth and keeps the next interaction responsive.',
    broadTitle: 'Broad Scale Usage',
    broadContent: 'In high-performance web applications, automatic request cancellation prevents network waterfall congestion. Only relevant, active requests consume resources. Additional context fields like meta and pageParam standardize pagination and supplemental request configuration across the data layer.',
    narrowTitle: 'Narrowed Approach',
    narrowContent: 'Destructure { signal } from the context object and pass it to fetch as fetch(url, { signal }). When TanStack Query determines the request is no longer needed, it triggers the signal and the browser terminates the HTTP connection.',
    fullCode: codeExample6,
    explanation: 'signal is the stop button for a request. The query function receives it from TanStack Query and passes it to fetch. If the component unmounts or the request is replaced, TanStack Query aborts the signal. The browser then stops the download instead of wasting resources on data the user will never see.',
    demoName: 'QueryFunctionContextDemo',
  },
]

const demoRegistry = {
  QueryFunctionDemo,
  BasicsQueryDemo,
  ErrorHandlingDemo,
  FetchApiDemo,
  QueryVariablesDemo,
  QueryFunctionContextDemo,
}

const slides = rawSlides.map((slide) => ({
  ...slide,
  Demo: demoRegistry[slide.demoName],
}))

function RecapSection() {
  const bestPractices = [
    'Keep query functions focused on one responsibility: receive query context, run the request, validate the response, and return usable data.',
    'Always throw an error when a request fails so TanStack Query can move the query into its error state instead of treating a bad response as successful data.',
    'Keep dynamic values in the query key, then read them from QueryFunctionContext so cache identity and fetch behavior stay synchronized.',
    'Pass the provided AbortSignal into fetch when a request may become outdated, slow, or replaced by a newer query.',
  ]

  const recapRows = [
    ['Query Function', 'The async instruction that tells TanStack Query how to retrieve one specific server-state resource.'],
    ['Promise Contract', 'The query function must resolve usable data or reject/throw so TanStack Query can classify the result correctly.'],
    ['response.ok Check', 'The Fetch API does not throw for HTTP error statuses, so the query function must check the response before returning JSON.'],
    ['QueryFunctionContext', 'The object TanStack Query passes into a query function so it can access queryKey, signal, meta, and pagination context.'],
    ['AbortSignal', 'A cancellation signal that lets TanStack Query stop outdated requests instead of wasting network work.'],
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
          A query key identifies what server data the UI needs, while a query function defines how that data is retrieved.
          Keeping those responsibilities separate makes TanStack Query predictable: the cache can identify the request,
          the function can execute the request, and the result fields can explain whether the screen is loading, successful,
          refreshing, cancelled, or in an error state.
        </p>
      </div>
    </section>
  )
}

export default function Week04QueryFunctionsInTanStackQueryMasterclass({ onBack, onSectionChange }) {
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
        <button className="sm-button ghost" onClick={onBack}>← Back to Week 04</button>
        <div className="sm-toolbar-copy">
          <p className="sm-kicker">AD312 • Week 04 • Lecture 04</p>
          <h2>Query Functions in TanStack Query</h2>
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
