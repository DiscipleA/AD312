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

function InventoryDemo() {
  const inventoryId = useRef('warehouse-inventory')
  const inventory = [
    { id: 1, name: 'Textbooks', quantity: 42 },
    { id: 2, name: 'Reference Guides', quantity: 18 },
    { id: 3, name: 'Lab Manuals', quantity: 27 },
  ]

  return (
    <div>
      <p>
        <strong>Query Key:</strong> ['{inventoryId.current}']
      </p>
      <h4>Current Warehouse Stock</h4>
      <ul>
        {inventory.map((item) => (
          <li key={item.id}>
            {item.name}: {item.quantity} units available
          </li>
        ))}
      </ul>
      <p>Cached data appears instantly while the system checks for updates.</p>
    </div>
  )
}

function PartViewerDemo() {
  const [selectedPart, setSelectedPart] = useState(101)
  const parts = {
    101: {
      partName: 'Hydraulic Coupler',
      serialNumber: 'HC-101-A',
      operationalStatus: 'Operational',
    },
    102: {
      partName: 'Pressure Valve',
      serialNumber: 'PV-102-B',
      operationalStatus: 'Inspection Needed',
    },
  }

  return (
    <div>
      <button className="sm-button" onClick={() => setSelectedPart(101)}>
        View Part 101
      </button>
      <button className="sm-button" onClick={() => setSelectedPart(102)}>
        View Part 102
      </button>
      <p>
        <strong>Query Key:</strong> ['industrial-parts', {selectedPart}]
      </p>
      <h4>Component: {parts[selectedPart].partName}</h4>
      <p>Serial Number: {parts[selectedPart].serialNumber}</p>
      <p>Status: {parts[selectedPart].operationalStatus}</p>
    </div>
  )
}

function SafetyManualDemo() {
  const protocols = [
    {
      id: 1,
      title: 'Hard Hat Zone',
      description: 'Wear protective headgear near active work areas.',
    },
    {
      id: 2,
      title: 'Equipment Lockout',
      description: 'Verify machinery is powered down before maintenance.',
    },
  ]

  return (
    <article>
      <p>
        <strong>Query Key:</strong> ['site-safety-protocols']
      </p>
      <h4>Site Safety Standards</h4>
      <ul>
        {protocols.map((protocol) => (
          <li key={protocol.id}>
            <strong>{protocol.title}:</strong> {protocol.description}
          </li>
        ))}
      </ul>
    </article>
  )
}

function UnitMonitorDemo() {
  const [isDetailed, setIsDetailed] = useState(false)
  const sensors = {
    temperature: '21.8°C',
    vibration: 'Normal',
    signal: 'Strong',
  }

  return (
    <div>
      <p>
        <strong>Query Key:</strong> ['logistics-unit', 'TX-99', {'{'} detailed: {String(isDetailed)} {'}'}]
      </p>
      <h4>Unit: TX-99</h4>
      <button className="sm-button" onClick={() => setIsDetailed(!isDetailed)}>
        {isDetailed ? 'Hide' : 'Show'} Detailed Telemetry
      </button>
      {isDetailed ? (
        <pre>{JSON.stringify(sensors, null, 2)}</pre>
      ) : (
        <p>Standard unit status is cached separately from detailed telemetry.</p>
      )}
    </div>
  )
}

function ArchivePanelDemo() {
  const filterA = { author: 'Dr. Aris', year: 2026 }
  const filterB = { year: 2026, author: 'Dr. Aris' }
  const records = [
    { id: 1, title: 'Archive Index Patterns' },
    { id: 2, title: 'Deterministic Catalog Systems' },
  ]

  return (
    <div>
      <p>
        <strong>Filter A:</strong> {JSON.stringify(filterA)}
      </p>
      <p>
        <strong>Filter B:</strong> {JSON.stringify(filterB)}
      </p>
      <p>Results loaded from same cache: Yes</p>
      <ul>
        {records.map((record) => (
          <li key={record.id}>{record.title}</li>
        ))}
      </ul>
    </div>
  )
}

function SensorMonitorDemo() {
  const [activeSensor, setActiveSensor] = useState('A-101')
  const sensorData = {
    'A-101': { temperature: 22, status: 'Stable' },
    'B-202': { temperature: 25, status: 'Warming' },
    'C-303': { temperature: 19, status: 'Cooling' },
  }

  return (
    <div>
      <select
        className="sm-input"
        onChange={(event) => setActiveSensor(event.target.value)}
        value={activeSensor}
      >
        <option value="A-101">Zone A - Sensor 101</option>
        <option value="B-202">Zone B - Sensor 202</option>
        <option value="C-303">Zone C - Sensor 303</option>
      </select>
      <p>
        <strong>Query Key:</strong> ['industrial-sensor', '{activeSensor}']
      </p>
      <h4>Monitoring Sensor: {activeSensor}</h4>
      <p>Current Temperature: {sensorData[activeSensor].temperature}°C</p>
      <p>Status: {sensorData[activeSensor].status}</p>
    </div>
  )
}

function RecapSection() {
  const blocks = [
    {
      title: 'Query Keys Identify Server State',
      text:
        'A query key is the address TanStack Query uses to store, find, share, refresh, and invalidate a piece of server state.',
    },
    {
      title: 'Arrays Create Predictable Cache Shape',
      text:
        'Modern TanStack Query keys are arrays. The first value usually names the resource, while later values add IDs, filters, or options.',
    },
    {
      title: 'Variables Make Queries Reactive',
      text:
        'When a value inside the query key changes, TanStack Query treats the request as a different cache entry and can fetch the matching data automatically.',
    },
    {
      title: 'Deterministic Hashing Prevents Cache Drift',
      text:
        'Object property order inside a query key does not fragment the cache, so logically identical filter objects can resolve to the same stored result.',
    },
  ]

  const concepts = [
    ['Simple key', 'A stable array such as ["site-safety-protocols"] for one shared resource.'],
    ['Complex key', 'An array that includes IDs, booleans, or filter objects for precise cache identity.'],
    ['Dependency behavior', 'The query key behaves like the dependency list for server-state synchronization.'],
    ['Cache confidence', 'Stable keys reduce duplicate requests and keep related UI areas aligned.'],
  ]

  return (
    <section className="sm-section sm-recap-section">
      <h1 className="sm-title">Best Practices and Recap</h1>

      <div className="sm-grid">
        {blocks.map((block) => (
          <div className="sm-panel" key={block.title}>
            <h3>{block.title}</h3>
            <p>{block.text}</p>
          </div>
        ))}
      </div>

      <div className="sm-narrow">
        <h3>Core Query Key Vocabulary</h3>
        <table className="sm-table">
          <thead>
            <tr>
              <th>Concept</th>
              <th>What it means in practice</th>
            </tr>
          </thead>
          <tbody>
            {concepts.map(([concept, meaning]) => (
              <tr key={concept}>
                <td>{concept}</td>
                <td>{meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sm-explanation">
        <h3>Simple Terms Explanation</h3>
        <p>
          Query keys are like labeled folders in TanStack Query's cache. A simple
          folder can hold one shared list. A detailed folder can include an ID,
          a filter, or an option object. When the folder label changes, TanStack
          Query knows the screen is asking for different server data and can
          synchronize that exact request.
        </p>
      </div>
    </section>
  )
}

const rawSlides = [
  {
    "title": "Introduction to TanStack Query",
    "slideData": {
      "title": "Server State Management and Caching Foundations",
      "bullets": [
        "Overview of TanStack Query as a tool for managing server state",
        "Importance of efficient query caching",
        "Introduction to the concept of Query Keys"
      ]
    },
    "description": "TanStack Query (formerly React Query) is a powerful asynchronous state management library designed specifically to handle \"server state.\" Unlike client state (UI toggles or local inputs), server state is persisted remotely, requires asynchronous fetching/updating, and can become \"stale\" without the user's knowledge. The library automates the complexities of fetching, caching, synchronizing, and updating data between the client and server. A core mechanism of this system is the Query Key—a unique identifier used by the library to manage the cache, determine when to refetch, and share data across different components of the application.",
    "rwTitle": "Real-World Application",
    "rwContent": "Imagine an application for a local library that displays a list of currently available textbooks. Instead of refetching the entire database every time a user navigates back to the main list, TanStack Query stores the previous results in a cache. If the user returns to the list within a specific timeframe, the application instantly displays the cached data while silently checking the server for any newly added or borrowed books to ensure the information remains accurate.",
    "broadTitle": "Broad Scale Usage",
    "broadContent": "At an architectural level, TanStack Query acts as a dedicated synchronization layer between the frontend and backend. By moving data-fetching logic out of standard useEffect hooks and local component state, it centralizes the management of loading states, error handling, and data expiration. This significantly reduces boilerplate code and prevents redundant network requests across the entire system, leading to higher performance and a more predictable data flow in large-scale applications.",
    "narrowTitle": "Narrowed Approach",
    "narrowContent": "Technically, the library utilizes a \"QueryClient\" to hold the cache and \"Query Keys\" to index that cache. When a query is initiated, the library checks if a matching key already exists in memory. If it does, it provides the cached data; if not, it triggers the fetch function. The Query Key is typically structured as an array, allowing for granular identification of specific data sets, which enables features like automatic background refetching when the key changes.",
    "fullCode": "import React from 'react';\nimport { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';\n\nconst queryClient = new QueryClient();\n\nasync function fetchInventory() {\n  const response = await fetch('https://api.example.com/inventory');\n  if (!response.ok) {\n    throw new Error('Network response was not ok');\n  }\n  return response.json();\n}\n\nfunction InventoryDisplay() {\n  const { data, isLoading, error } = useQuery({\n    queryKey: ['warehouse-inventory'],\n    queryFn: fetchInventory,\n  });\n\n  if (isLoading) return <div>Loading current stock...</div>;\n  if (error) return <div>An error occurred: {error.message}</div>;\n\n  return (\n    <div>\n      <h1>Current Warehouse Stock</h1>\n      <ul>\n        {data.map((item) => (\n          <li key={item.id}>\n            {item.name}: {item.quantity} units available\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}\n\nexport default function App() {\n  return (\n    <QueryClientProvider client={queryClient}>\n      <InventoryDisplay />\n    </QueryClientProvider>\n  );\n}",
    "explanation": "First, we import the necessary tools: QueryClient acts as the central brain for our data storage, and QueryClientProvider wraps our app so every part of it can talk to that brain. The fetchInventory function is a standard asynchronous helper that reaches out to a specific URL (the API) to grab a list of items and their quantities. It includes a safety check to make sure the server actually answered correctly. Inside the InventoryDisplay component, we use the useQuery hook. This is where the magic happens. We give it a 'queryKey' called ['warehouse-inventory']. Think of this like a label on a folder in a filing cabinet. When the component loads, TanStack Query looks in its \"filing cabinet\" (the cache) for the 'warehouse-inventory' label. If the folder is empty, it runs our fetchInventory function. The hook automatically gives us three variables: 'data' (the actual list of items), 'isLoading' (a true/false value telling us if the fetch is still happening), and 'error' (which tells us if something went wrong). We use these variables to decide what the user sees: a loading message if we are waiting, an error message if the fetch failed, or the actual list of stock items if the fetch was successful. Finally, the App function ensures the whole system is active by providing the queryClient to the entire component tree.",
    "demoName": "InventoryDemo"
  },
  {
    "title": "What are Query Keys?",
    "slideData": {
      "title": "Deterministic Cache Indexing",
      "bullets": [
        "Requirements: Must be serializable and unique",
        "Role in cache management and data optimization"
      ]
    },
    "description": "Query Keys are the fundamental indexing mechanism in TanStack Query. They are structured as arrays to allow for hierarchical data organization. Every time a query is executed, the library hashes the Query Key to create a stable reference in the global cache. This allows the system to determine if data for a specific request already exists, if it needs to be updated, or if it can be shared across multiple components. For the system to function correctly, these keys must be serializable (usually meaning they consist of strings, numbers, or plain objects) and must be globally unique to the specific data set they represent.",
    "rwTitle": "Real-World Application",
    "rwContent": "Think of a large hardware store that uses an organization system for its aisles. A simple key like ['aisle-4'] might show you everything in that aisle. However, a more specific key like ['aisle-4', 'power-drills', 'brand-x'] allows the system to pinpoint exactly one shelf. If a customer (component) asks for 'power-drills' in 'aisle-4', the system knows exactly which \"cache bucket\" to look into without searching the entire store.",
    "broadTitle": "Broad Scale Usage",
    "broadContent": "In large-scale architectures, Query Keys enable \"Automatic Dependency Tracking.\" By including variables like IDs, page numbers, or filter strings in the key array, the developer creates a reactive link between the application state and the network layer. When a variable inside the key changes, TanStack Query automatically recognizes that the cache entry is no longer a perfect match for the current request and triggers a fresh fetch. This ensures that the UI remains in sync with the underlying data requirements without manual intervention or complex state synchronization logic.",
    "narrowTitle": "Narrowed Approach",
    "narrowContent": "From a technical implementation standpoint, the order of elements in the array matters. TanStack Query uses deterministic hashing, meaning ['items', { id: 1 }] is functionally identical to ['items', { id: 1 }], but ['items', 'active'] is different from ['active', 'items']. Because keys must be serializable, they should not contain functions or complex class instances. This strictness ensures that the cache can be reliably hydrated or dehydrated (saved to or loaded from local storage) if needed.",
    "fullCode": "import React, { useState } from 'react';\nimport { useQuery } from '@tanstack/react-query';\n\nasync function fetchPartDetails(partId) {\n  const response = await fetch(`https://api.example.com/parts/${partId}`);\n  if (!response.ok) {\n    throw new Error('Failed to fetch part data');\n  }\n  return response.json();\n}\n\nfunction PartViewer({ partId }) {\n  const { data, isLoading } = useQuery({\n    queryKey: ['industrial-parts', partId],\n    queryFn: () => fetchPartDetails(partId),\n  });\n\n  if (isLoading) return <div>Checking part database...</div>;\n\n  return (\n    <div>\n      <h2>Component: {data.partName}</h2>\n      <p>Serial Number: {data.serialNumber}</p>\n      <p>Status: {data.operationalStatus}</p>\n    </div>\n  );\n}\n\nexport default function WorkshopApp() {\n  const [selectedPart, setSelectedPart] = useState(101);\n\n  return (\n    <div>\n      <button onClick={() => setSelectedPart(101)}>View Part 101</button>\n      <button onClick={() => setSelectedPart(102)}>View Part 102</button>\n      <PartViewer partId={selectedPart} />\n    </div>\n  );\n}",
    "explanation": "We start with a helper function fetchPartDetails that takes a specific ID and asks the server for information about that specific industrial part. Inside the PartViewer component, we call the useQuery hook. Look closely at the queryKey: ['industrial-parts', partId]. This is an array. The first part, 'industrial-parts', tells the system the general category. The second part, partId, is a variable that changes based on what the user clicks. If the user clicks \"View Part 101\", the key becomes ['industrial-parts', 101]. TanStack Query checks its memory for that exact label. If it's not there, it fetches the data and saves it under that label. If the user then clicks \"View Part 102\", the key changes to ['industrial-parts', 102]. Because this is a different label, the system knows this is different data and performs a new fetch. If the user clicks back to \"View Part 101\", the system sees the label ['industrial-parts', 101] in its memory and can show the data instantly while it checks for updates in the background. This array-based labeling system is what allows the app to be fast and organized without the developer having to manually write code to \"clear\" or \"update\" the screen every time the ID changes.",
    "demoName": "PartViewerDemo"
  },
  {
    "title": "Simple Query Keys",
    "slideData": {
      "title": "Static Cache Mapping",
      "bullets": [
        "Explanation of simple query keys as arrays with constant values",
        "Use cases:",
        "Generic list/index resources",
        "Non-hierarchical resources"
      ]
    },
    "description": "Simple Query Keys represent the most basic form of cache indexing in TanStack Query. They consist of arrays containing constant values, such as strings or numbers, that do not change during the component's lifecycle. These keys are used when the data being fetched is global or static in nature, meaning the request doesn't depend on dynamic user input or variable IDs. By using a simple, constant array, you create a permanent \"home\" in the cache for specific resources, ensuring that any component requesting that same key will always point to the exact same data entry.",
    "rwTitle": "Real-World Application",
    "rwContent": "Consider a construction site management application that needs to display a list of available heavy machinery. Since the entire list of equipment is a single resource that doesn't change based on which supervisor is looking at it, a simple query key like ['heavy-machinery-list'] is used. This allows the system to fetch the list once and share it across the \"Maintenance Dashboard,\" the \"Scheduling View,\" and the \"Inventory Report\" without triggering multiple network requests for the same static information.",
    "broadTitle": "Broad Scale Usage",
    "broadContent": "In a broader architectural context, simple query keys are the building blocks for \"Resource Indexing.\" They are typically used for top-level collections or configuration data that provides context to the rest of the application. Because these keys are constants, they are highly predictable, making it easy to perform manual cache invalidation. For example, if a new piece of equipment is added to the fleet, the developer can simply tell TanStack Query to \"refetch everything under the 'heavy-machinery-list' key,\" and every component currently displaying that list will update simultaneously.",
    "narrowTitle": "Narrowed Approach",
    "narrowContent": "Technically, even a simple key must be wrapped in an array. While earlier versions of the library allowed plain strings, the modern standard requires the array structure for consistency. When TanStack Query encounters a key like ['inventory'], it serializes this into a unique string internally. Since the array contains no variables, the hash remains identical every time the component renders, preventing unnecessary re-fetches and ensuring the \"stale-while-revalidate\" logic works perfectly for non-dynamic assets.",
    "fullCode": "import React from 'react';\nimport { useQuery } from '@tanstack/react-query';\n\nasync function fetchSafetyProtocols() {\n  const response = await fetch('https://api.example.com/safety-docs');\n  if (!response.ok) {\n    throw new Error('Could not load safety documentation');\n  }\n  return response.json();\n}\n\nfunction SafetyManual() {\n  const { data, isLoading } = useQuery({\n    queryKey: ['site-safety-protocols'],\n    queryFn: fetchSafetyProtocols,\n  });\n\n  if (isLoading) return <div>Loading protocols...</div>;\n\n  return (\n    <article>\n      <h2>Site Safety Standards</h2>\n      <ul>\n        {data.map((protocol) => (\n          <li key={protocol.id}>\n            <strong>{protocol.title}:</strong> {protocol.description}\n          </li>\n        ))}\n      </ul>\n    </article>\n  );\n}\n\nexport default function JobSiteApp() {\n  return (\n    <main>\n      <h1>Project Management Portal</h1>\n      <section>\n        <SafetyManual />\n      </section>\n    </main>\n  );\n}",
    "explanation": "We define a function fetchSafetyProtocols that acts like a messenger. Its only job is to go to the server, grab the safety document data, and bring it back. Inside our SafetyManual component, we use the useQuery hook to manage this process. We assign the queryKey as ['site-safety-protocols']. This is a \"Simple Key\" because it is just a fixed string inside an array. It never changes. Because the key is a constant, TanStack Query treats this like a permanent reserved spot in the browser's memory. When the app starts, it checks: \"Do I already have something labeled 'site-safety-protocols'?\" Since the answer is \"No\" the first time, it runs the fetchSafetyProtocols function. While the messenger is away, isLoading is true, and we show a \"Loading...\" message. Once the data arrives, it is saved under that specific label. If you were to open the SafetyManual in five different places on the screen, they would all see the label, see that the data is already there, and show it instantly without asking the messenger to run to the server five separate times.",
    "demoName": "SafetyManualDemo"
  },
  {
    "title": "Complex Array Keys with Variables",
    "slideData": {
      "title": "Dynamic Dependency Indexing",
      "bullets": [
        "Use of strings and serializable objects in query keys for detailed identification",
        "Suitable for:",
        "    - Hierarchical or nested resources",
        "    - Queries with additional parameters",
        "Examples:"
      ]
    },
    "description": "Complex Array Keys leverage the power of deterministic hashing to handle dynamic data requirements. By including variables like IDs, boolean flags, or configuration objects within the key array, you create a unique signature for every specific state of a request. This ensures that the cache correctly distinguishes between \"all items\" and \"items filtered by category.\" Because TanStack Query treats the entire array as a dependency, any change to a variable inside the key will automatically trigger a transition to a new cache entry, enabling seamless and reactive data synchronization.",
    "rwTitle": "Real-World Application",
    "rwContent": "In a high-traffic logistics portal, a dispatcher might need to view a specific shipping container's details while also applying a \"thermal-view\" toggle. By using a complex key like ['shipping-container', containerId, { thermal: isThermalActive }], the application can cache the standard view and the thermal view separately. If the dispatcher switches back and forth, both views are stored in the cache and appear instantly, preventing the server from having to re-process complex imaging data every time a toggle is flipped.",
    "broadTitle": "Broad Scale Usage",
    "broadContent": "Architecturally, complex keys are essential for \"Granular Cache Management.\" They allow developers to create a nested hierarchy within the global cache state. This becomes critical when implementing features like pagination, infinite scroll, or complex multi-parameter filtering. Since objects within keys are also hashed deterministically, the order of properties in a filter object does not change the key's identity, ensuring that the system remains robust even when dynamic UI components generate filter objects in varying orders.",
    "narrowTitle": "Narrowed Approach",
    "narrowContent": "Technically, when a variable in a complex key changes, the query is considered \"outdated\" or \"not found\" relative to the new key. This triggers a state change from success back to pending for that specific key. However, TanStack Query's placeholderData or keepPreviousData patterns can be used alongside complex keys to maintain the previous UI on screen while the new data for the updated key is being fetched, providing a smooth user experience during rapid filter changes.",
    "fullCode": "import React, { useState } from 'react';\nimport { useQuery } from '@tanstack/react-query';\n\nasync function fetchLogisticsData(unitId, options) {\n  const queryParams = new URLSearchParams({ \n    includeSensorData: options.detailed.toString() \n  });\n  const response = await fetch(`https://api.example.com/units/${unitId}?${queryParams}`);\n  if (!response.ok) throw new Error('Sensor data unavailable');\n  return response.json();\n}\n\nfunction UnitMonitor({ unitId }) {\n  const [isDetailed, setIsDetailed] = useState(false);\n\n  const { data, isLoading } = useQuery({\n    queryKey: ['logistics-unit', unitId, { detailed: isDetailed }],\n    queryFn: () => fetchLogisticsData(unitId, { detailed: isDetailed }),\n  });\n\n  if (isLoading) return <div>Syncing unit telemetry...</div>;\n\n  return (\n    <div>\n      <h3>Unit: {data.unitName}</h3>\n      <button onClick={() => setIsDetailed(!isDetailed)}>\n        {isDetailed ? 'Hide' : 'Show'} Detailed Telemetry\n      </button>\n      {isDetailed && <pre>{JSON.stringify(data.sensors, null, 2)}</pre>}\n    </div>\n  );\n}\n\nexport default function LogisticsApp() {\n  return <UnitMonitor unitId=\"TX-99\" />;\n}",
    "explanation": "The fetchLogisticsData function is our specialized fetcher. It takes a unitId and an options object to build a very specific URL for the server. Inside UnitMonitor, we have a state variable called isDetailed. This is a simple true/false switch controlled by the user. The useQuery hook uses a \"Complex Key\": ['logistics-unit', unitId, { detailed: isDetailed }]. This key acts like a precise GPS coordinate for the data. It tells the system: \"Find me the information for this specific unit, specifically in this detail mode.\" If isDetailed is false, the key is ['logistics-unit', 'TX-99', { detailed: false }]. The data is fetched and stored there. If the user clicks the button and isDetailed becomes true, the key immediately changes to ['logistics-unit', 'TX-99', { detailed: true }]. TanStack Query sees this as a brand-new request because the label has changed. It fetches the high-detail data and stores it in a second, separate spot in memory. Because both versions are saved under their own complex labels, switching back and forth is instantaneous. The app doesn't have to \"forget\" the simple view to show the detailed view; it keeps both organized and ready.",
    "demoName": "UnitMonitorDemo"
  },
  {
    "title": "Deterministic Hashing of Query Keys",
    "slideData": {
      "title": "Predictable Cache Identity Mapping",
      "bullets": [
        "Concept of deterministic hashing for query keys",
        "Implications for object order in arrays and their impact on query equality",
        "Examples of equivalent queries despite different object key orders"
      ]
    },
    "description": "TanStack Query employs deterministic hashing to ensure that query keys provide a stable and predictable identity for cache entries. Deterministic hashing means that as long as the data structure (the array and its contents) is semantically the same, the library will generate the exact same hash, regardless of how the JavaScript objects were constructed in memory. This is a critical feature because it prevents the cache from fragmenting when different parts of an application generate the same logical request using objects with keys in a different order. Without this, the library would treat the same data request as two different entities, leading to redundant network calls and cache misses.",
    "rwTitle": "Real-World Application",
    "rwContent": "Consider a sophisticated digital archive system where researchers can filter documents by both \"publication date\" and \"author name.\" One researcher might use a search tool that generates a filter object as { author: 'Smith', year: 2024 }, while another researcher’s tool generates { year: 2024, author: 'Smith' }. Because TanStack Query uses deterministic hashing, the system recognizes that these two researchers are looking for the exact same archive folder. It delivers the cached results to both researchers instantly, even though the \"labels\" on their requests had the information in a different order.",
    "broadTitle": "Broad Scale Usage",
    "broadContent": "In large-scale front-end architectures, deterministic hashing simplifies state management by making the data layer \"order-agnostic\" regarding object properties. This allows developers to pass dynamic configuration objects directly into query keys without worrying about manual sorting or serialization. It ensures that the \"Global Cache\" remains lean and efficient, as it prevents the creation of duplicate entries that differ only by property sequence. This reliability is vital when building complex dashboards where multiple independent widgets might request the same data using various property-ordering logic.",
    "narrowTitle": "Narrowed Approach",
    "narrowContent": "Technically, TanStack Query achieves this by alphabetically sorting the keys of any objects found within the query key array before hashing them. It is important to note, however, that while the order of keys inside an object does not matter, the order of items inside the array itself does. ['archives', { year: 2024 }] is the same as ['archives', { YEAR: 2024 }] (if casing matched), but ['archives', 2024] is fundamentally different from [2024, 'archives']. This distinction allows for hierarchical organization while maintaining flexibility for object-based parameters.",
    "fullCode": "import React from 'react';\nimport { useQuery } from '@tanstack/react-query';\n\nasync function fetchArchiveRecords(filters) {\n  const response = await fetch(`https://api.example.com/archives?author=${filters.author}&year=${filters.year}`);\n  if (!response.ok) throw new Error('Archive fetch failed');\n  return response.json();\n}\n\nfunction ArchivePanel({ author, year }) {\n  const filterA = { author, year };\n  const filterB = { year, author };\n\n  const query1 = useQuery({\n    queryKey: ['research-records', filterA],\n    queryFn: () => fetchArchiveRecords(filterA),\n  });\n\n  const query2 = useQuery({\n    queryKey: ['research-records', filterB],\n    queryFn: () => fetchArchiveRecords(filterB),\n  });\n\n  return (\n    <div>\n      <p>Results loaded from same cache: {query1.data === query2.data ? 'Yes' : 'No'}</p>\n      <ul>\n        {query1.data?.map(record => <li key={record.id}>{record.title}</li>)}\n      </ul>\n    </div>\n  );\n}\n\nexport default function LibraryApp() {\n  return <ArchivePanel author=\"Dr. Aris\" year={2026} />;\n}",
    "explanation": "The fetchArchiveRecords function is a helper that takes a filter object and asks the server for matching records. Inside the ArchivePanel, we create two objects: filterA and filterB. filterA lists the author then the year. filterB lists the year then the author. In standard JavaScript, these might look different to a computer. However, when we use them in useQuery as part of the queryKey, TanStack Query performs \"Deterministic Hashing.\" Think of it like a smart filing clerk. When you give the clerk a label that says \"Apples and Oranges,\" and another person gives a label that says \"Oranges and Apples,\" the clerk is smart enough to realize those are the same thing. The clerk alphabetizes the words internally to \"Apples, Oranges\" every time. Because the clerk (TanStack Query) does this sorting, both query1 and query2 look at the exact same spot in the cache memory. This prevents the app from doing double the work and ensures that if query1 finishes loading, query2 instantly has the data too, because they are effectively the same request.",
    "demoName": "ArchivePanelDemo"
  },
  {
    "title": "Dependency Management with Query Keys",
    "slideData": {
      "title": "Reactive Data Synchronization",
      "bullets": [
        "Role of query keys as dependencies for query functions",
        "Ensuring independent caching and automatic refetching on variable changes",
        "Practical example:",
        "    - Fetching a todo by ID and ensuring it updates when todoId changes"
      ]
    },
    "description": "Query keys function as a dependency array for your asynchronous data fetching. Similar to the dependency array in a useEffect hook, TanStack Query monitors the elements within the query key. When any variable included in the key changes, the library recognizes that the existing cache entry no longer matches the current requirements. This triggers an automatic refetch of the data and ensures that each unique combination of variables maintains its own independent cache entry. This reactive nature allows developers to build interfaces that stay in sync with application state without writing manual \"imperative\" code to re-fetch data.",
    "rwTitle": "Real-World Application",
    "rwContent": "In a commercial HVAC monitoring system, a technician may be viewing the performance metrics of a specific rooftop unit. The query key would include the unit's serial number. If the technician selects a different unit from a dropdown menu, the serial number variable changes. TanStack Query automatically detects this change in the \"dependency,\" stops showing the data for the old unit, and fetches the fresh data for the newly selected unit, ensuring the technician never sees mismatched information.",
    "broadTitle": "Broad Scale Usage",
    "broadContent": "On an architectural scale, dependency management through query keys enables \"Declarative Data Fetching.\" Instead of explicitly telling the application when to fetch (e.g., \"fetch on button click\" or \"fetch on mount\"), the developer describes what the data depends on. This reduces the risk of \"stale data\" bugs in complex systems where multiple state changes might affect what should be displayed. It centralizes the logic of data requirements, making the codebase easier to maintain and reason about as the application grows.",
    "narrowTitle": "Narrowed Approach",
    "narrowContent": "Technically, when a dependency in the query key changes, TanStack Query transitions the query to a loading state (or fetching state if using previous data). The library uses a deep equality check on the key array. Because variables like IDs or filter strings are passed into the key, they act as unique identifiers for the fetch operation. This mechanism ensures that data for ID: 1 and ID: 2 are cached separately and do not overwrite each other, allowing for instant \"back-and-forth\" navigation between different data states.",
    "fullCode": "import React, { useState } from 'react';\nimport { useQuery } from '@tanstack/react-query';\n\nasync function fetchSensorReading(sensorId) {\n  const response = await fetch(`https://api.example.com/sensors/${sensorId}`);\n  if (!response.ok) throw new Error('Failed to reach sensor');\n  return response.json();\n}\n\nfunction SensorMonitor({ sensorId }) {\n  const { data, isLoading, isFetching } = useQuery({\n    queryKey: ['industrial-sensor', sensorId],\n    queryFn: () => fetchSensorReading(sensorId),\n    staleTime: 10000,\n  });\n\n  if (isLoading) return <div>Initializing sensor link...</div>;\n\n  return (\n    <div style={{ opacity: isFetching ? 0.5 : 1 }}>\n      <h3>Monitoring Sensor: {sensorId}</h3>\n      <p>Current Temperature: {data.temperature}°C</p>\n      <p>Status: {data.status}</p>\n      {isFetching && <p>Updating reading...</p>}\n    </div>\n  );\n}\n\nexport default function FacilityDashboard() {\n  const [activeSensor, setActiveSensor] = useState('A-101');\n\n  return (\n    <div>\n      <select onChange={(e) => setActiveSensor(e.target.value)} value={activeSensor}>\n        <option value=\"A-101\">Zone A - Sensor 101</option>\n        <option value=\"B-202\">Zone B - Sensor 202</option>\n        <option value=\"C-303\">Zone C - Sensor 303</option>\n      </select>\n      <hr />\n      <SensorMonitor sensorId={activeSensor} />\n    </div>\n  );\n}",
    "explanation": "In this example, the FacilityDashboard has a dropdown menu that changes the activeSensor state. This activeSensor value is passed as a prop called sensorId to our SensorMonitor component. Inside useQuery, we put sensorId directly into the queryKey: ['industrial-sensor', sensorId]. This tells TanStack Query: \"The data you are holding is specifically tied to this ID.\" If the user switches the dropdown from 'A-101' to 'B-202', the sensorId variable changes. TanStack Query is constantly watching that array. As soon as it sees 'B-202' instead of 'A-101', it says, \"Wait, the label changed! I don't have a folder for 'B-202' yet, or the one I have might be old.\" It immediately runs the fetchSensorReading function again using the new ID. By using isFetching, we can even dim the screen slightly to show the user that we are updating the information for the new sensor. The staleTime: 10000 means that if you switch back to 'A-101' within 10 seconds, it will show the previous data instantly because it was \"dependently\" saved in its own spot.",
    "demoName": "SensorMonitorDemo"
  }
]

const demoRegistry = {
  InventoryDemo,
  PartViewerDemo,
  SafetyManualDemo,
  UnitMonitorDemo,
  ArchivePanelDemo,
  SensorMonitorDemo,
}

const slides = rawSlides.map((slide) => ({
  ...slide,
  Demo: demoRegistry[slide.demoName],
}))

export default function Week04TanStackQueryKeysMasterclass({ onBack, onSectionChange }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [sectionsCollapsed, setSectionsCollapsed] = useState(false)
  const activeSection = useMemo(() => slides[activeIndex], [activeIndex])
  const ActiveDemo = activeSection?.Demo

  useEffect(() => {
    if (!onSectionChange) return

    if (activeIndex < slides.length) {
      onSectionChange({
        index: activeIndex + 1,
        title: activeSection.title,
      })
      return
    }

    onSectionChange({
      index: slides.length + 1,
      title: 'Best Practices and Recap',
    })
  }, [activeIndex, activeSection, onSectionChange])

  return (
    <div className="sm-page">
      <div className="sm-toolbar">
        <button className="sm-button ghost" onClick={onBack}>
          ← Back to Week 04
        </button>
        <div className="sm-toolbar-copy">
          <p className="sm-kicker">AD312 • Week 04 • Lecture 03</p>
          <h2>TanStack Query Keys</h2>
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

