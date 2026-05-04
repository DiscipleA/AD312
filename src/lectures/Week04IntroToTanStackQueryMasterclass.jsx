import { useEffect, useMemo, useRef, useState } from 'react'
import '../styles/stateMasterclass.css'
import CodeBlock from '../components/CodeBlock'
import { annotateDisplayedCode } from '../utils/educationalCode'

const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    background: "#f4f6f8",
    color: "#1f2d3d",
    padding: "32px",
    lineHeight: 1.6,
  },
  slide: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "32px",
    marginBottom: "40px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  },
  title: {
    fontSize: "34px",
    fontWeight: "800",
    borderLeft: "8px solid #3498db",
    paddingLeft: "18px",
    marginBottom: "22px",
    color: "#2c3e50",
  },
  slideHeader: {
    background: "#2c3e50",
    color: "#ffffff",
    padding: "24px",
    borderRadius: "14px",
    marginBottom: "24px",
  },
  concept: {
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "14px",
    color: "#ecf0f1",
  },
  headerList: {
    margin: 0,
    paddingLeft: "22px",
  },
  paragraph: {
    fontSize: "17px",
    marginBottom: "22px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginBottom: "24px",
  },
  card: {
    background: "#eef6fb",
    border: "1px solid #d6eaf8",
    borderRadius: "14px",
    padding: "20px",
  },
  cardTitle: {
    fontSize: "21px",
    fontWeight: "800",
    marginBottom: "12px",
    color: "#2c3e50",
  },
  narrow: {
    background: "#fff8e6",
    border: "1px solid #f1c40f",
    borderRadius: "14px",
    padding: "20px",
    marginBottom: "24px",
  },
  codeBlock: {
    background: "#1f2937",
    color: "#f8fafc",
    padding: "22px",
    borderRadius: "14px",
    overflowX: "auto",
    whiteSpace: "pre-wrap",
    fontSize: "14px",
    marginBottom: "24px",
  },
  action: {
    padding: "24px",
    border: "3px solid #3498db",
    borderRadius: "14px",
    marginBottom: "24px",
    background: "#f8fcff",
  },
  simple: {
    background: "#eafaf1",
    border: "1px solid #2ecc71",
    borderRadius: "14px",
    padding: "20px",
  },
};

const SlideHeader = ({ concept, bullets }) => (
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
      Concept: {concept}
    </h2>
    <ul style={{ lineHeight: '1.8', fontSize: '1.05rem', marginBottom: 0 }}>
      {bullets.map((bullet, index) => (
        <li key={`${bullet}-${index}`}>{bullet}</li>
      ))}
    </ul>
  </div>
)

function SectionWrapper({
  title,
  concept,
  bullets,
  description,
  realWorld,
  broadScale,
  narrowed,
  code,
  simpleTerms,
  children,
}) {
  return (
    <section className="sm-section">
      <h1 className="sm-title">{title}</h1>
      <SlideHeader concept={concept} bullets={bullets} />

      <p className="sm-description">
        <strong>Description:</strong> {description}
      </p>

      <div className="sm-grid">
        <div className="sm-panel">
          <h3>Real-World Application</h3>
          <p className="sm-preline">{realWorld}</p>
        </div>
        <div className="sm-panel">
          <h3>Broad Scale Usage</h3>
          <p className="sm-preline">{broadScale}</p>
        </div>
      </div>

      <div className="sm-narrow">
        <h3>Narrowed Approach</h3>
        <p className="sm-preline">{narrowed}</p>
      </div>

      <h3 className="sm-subheading">Full Code Example</h3>
      <CodeBlock code={annotateDisplayedCode(code, 'react')} language="jsx" label="React JSX" />

      <h3 className="sm-subheading">Code in Action</h3>
      <div className="sm-demo-shell">{children}</div>

      <div className="sm-explanation">
        <h3>Simple Terms Explanation</h3>
        <p className="sm-preline">{simpleTerms}</p>
      </div>
    </section>
  )
}

function BookCatalogDemo() {
  const books = useRef([
    { id: 1, title: "Designing Data-Driven Interfaces" },
    { id: 2, title: "Practical Server State" },
    { id: 3, title: "Caching for Modern Apps" },
  ]);

  return (
    <div>
      <h3>Fetching catalog...</h3>
      <ul>
        {books.current.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}

function RecipeAppDemo() {
  const [loading, setLoading] = useState(false);
  const recipes = useRef([
    { id: 1, name: "Chef's Citrus Rice" },
    { id: 2, name: "Garden Herb Stew" },
  ]);

  return (
    <div>
      <h3>Chef's Specials</h3>
      <button className="sm-button" onClick={() => setLoading(!loading)}>
        {loading ? "Finish Loading" : "Simulate Loading"}
      </button>
      {loading ? (
        <div>Loading recipes...</div>
      ) : (
        <pre>{JSON.stringify(recipes.current, null, 2)}</pre>
      )}
    </div>
  );
}

function EmployeeProfileDemo() {
  const employee = useRef({
    fullName: "Jordan Rivera",
    department: "Operations",
    employmentStatus: "Active",
  });

  return (
    <div>
      <h2>{employee.current.fullName}</h2>
      <p>Department: {employee.current.department}</p>
      <p>Status: {employee.current.employmentStatus}</p>
    </div>
  );
}

function ToolDetailViewDemo() {
  const [reserved, setReserved] = useState(false);
  const tool = useRef({
    modelName: "Power Drill XR-24",
    price: 18,
    warehouseLocation: "North Depot",
  });

  return (
    <article>
      <h1>{tool.current.modelName}</h1>
      <p>Daily Rate: ${tool.current.price}</p>
      <p>Location: {tool.current.warehouseLocation}</p>
      <button className="sm-button" onClick={() => setReserved(true)}>
        {reserved ? "Reserved" : "Reserve Now"}
      </button>
    </article>
  );
}

function NewsTickerDemo() {
  const articles = useRef([
    { id: 1, title: "Global markets open steadily" },
    { id: 2, title: "City launches transit upgrades" },
    { id: 3, title: "Technology teams adopt new data standards" },
  ]);

  return (
    <div>
      <strong>Loading latest news complete:</strong>
      <div>
        {articles.current.map((article) => (
          <span key={article.id}> | {article.title}</span>
        ))}
      </div>
    </div>
  );
}

function TransitAppDemo() {
  const bus = useRef({
    activeCount: 42,
    timestamp: "2026-04-29T15:30:00",
  });

  return (
    <div>
      <h3>Current Fleet Status</h3>
      <p>Active Buses: {bus.current.activeCount}</p>
      <p>Last Update: {new Date(bus.current.timestamp).toLocaleTimeString()}</p>
    </div>
  );
}

function RecapSection() {
  const bestPractices = [
    'Server state is data that lives outside React and must stay synchronized with a remote source.',
    'TanStack Query replaces repetitive loading, error, caching, and refetching code with one consistent query lifecycle.',
    'QueryClient acts as the central cache manager, while QueryClientProvider makes that cache available to the component tree.',
    'Professional server-state code separates what data is requested from how the interface displays that data.',
  ]

  const recapRows = [
    ['Deduplication', 'Downloading once for multiple components that request the same server data.'],
    ['Stale Data', 'Cached data that may still be visible but is eligible to be checked against the server again.'],
    ['Query Client', 'The central hub that stores cached query data and coordinates query behavior.'],
    ['Garbage Collection', 'Removing inactive cached data after a period of time to protect memory.'],
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
          TanStack Query is a state synchronizer that moves server data management out of scattered component code and into a predictable cache system.
          Instead of hand-writing loading flags, error flags, duplicate request guards, refresh logic, and cache behavior in every screen, developers describe the data they need and let TanStack Query coordinate reliability and performance at scale.
        </p>
      </div>
    </section>
  )
}

const lectureSectionTitles = ['Introduction to TanStack Query', 'Motivation Behind TanStack Query', 'Challenges of Managing Server State', 'Why TanStack Query?', 'Features and Benefits', 'Getting Started with TanStack Query']

const lectureSections = [
  <SectionWrapper
        title="Introduction to TanStack Query"
        concept="Server State Management"
        bullets={[
          "Introduction to TanStack Query (formerly React Query)",
          "Essential for fetching, caching, synchronizing, and updating server state in web applications",
          "Simplifies complex data handling tasks, making them manageable",
        ]}
        description="TanStack Query is a powerful asynchronous state management library designed specifically for handling data that lives outside your application (server state). Unlike local state management which focuses on UI toggles or form inputs, this library automates the lifecycle of network requests. It provides built-in solutions for challenges that developers usually have to solve manually, such as avoiding duplicate requests for the same data, updating stale information in the background, and managing loading or error states."
        realWorld='Imagine a library catalog system where multiple patrons are looking at book availability. When a patron opens a book details page, the system fetches the current status. Instead of forcing a full page reload every time the patron navigates back and forth, the system stores that information temporarily. If another patron borrows the book, the system can automatically refresh the status in the background so the first patron doesn&apos;t see outdated "Available" text when it is actually "Checked Out."'
        broadScale="At an architectural level, TanStack Query acts as a caching layer between the frontend UI and the backend API. It shifts the responsibility of data consistency from individual components to a centralized manager. This reduces the total number of network calls (bandwidth optimization) and ensures that different parts of a large-scale application—like a sidebar and a main content area—always display the exact same data without needing complex event emitters or manual prop drilling."
        narrowed='Technically, the library utilizes a "Query Client" to maintain a cache. It uses unique keys to identify specific data requests. When a component requests data with a specific key, the library first checks if valid data exists in the cache. If it does, it serves it immediately. Simultaneously, it evaluates if the data is "stale" based on a configuration; if so, it triggers a background fetch to update the cache and re-render the UI only if the data has changed.'
        code={`import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

const queryClient = new QueryClient();

function BookCatalog() {
  return (
    <QueryClientProvider client={queryClient}>
      <BookList />
    </QueryClientProvider>
  );
}

function BookList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const response = await fetch('https://api.library.example/books');
      return response.json();
    },
  });

  if (isLoading) return <div>Fetching catalog...</div>;
  if (isError) return <div>Error loading books.</div>;

  return (
    <ul>
      {data.map((book) => (
        <li key={book.id}>{book.title}</li>
      ))}
    </ul>
  );
}`}
        simpleTerms="The code starts by creating a QueryClient, which is like a specialized filing cabinet for all the information we get from the internet. The QueryClientProvider wraps the application, making this filing cabinet available to every component inside it. Inside the BookList component, we use a hook called useQuery. We give this hook a 'queryKey' called ['books'], which acts like a label on a folder in our filing cabinet. The 'queryFn' is the actual instruction on how to go get the data—in this case, using a fetch request to a library API. The hook automatically gives us three variables: 'data' (the actual list of books), 'isLoading' (a true/false value telling us if we are still waiting for the internet), and 'isError' (a true/false value telling us if something went wrong). This prevents us from having to manually create multiple pieces of state for loading and errors, and it ensures that if we ask for ['books'] in another component, the library knows to check the 'books' folder in the filing cabinet first before trying to use the internet again."
      >
        <BookCatalogDemo />
      </SectionWrapper>,

  <SectionWrapper
        title="Motivation Behind TanStack Query"
        concept="Standardization of Server State"
        bullets={[
          "Core web frameworks lack a standardized method for data-fetching",
          "Developers often create bespoke or complicated solutions",
          "Server state challenges: remote persistence, asynchronous operations, shared ownership, and susceptibility to becoming outdated",
        ]}
        description='The motivation behind TanStack Query stems from the inherent difficulty in managing "server state"—data that is hosted remotely and requires asynchronous requests to access or modify. Standard web frameworks provide tools for UI state but do not offer a built-in, unified way to handle the complexities of network communication. This forces developers to write repetitive code for every request, leading to custom solutions that are difficult to maintain and often buggy when dealing with shared data that can be changed by other users at any time.'
        realWorld='Consider a collaborative recipe book where many chefs contribute simultaneously. If one chef updates a "Spices" list, a second chef viewing that same page may still see the old version. Without a standardized system, the developer must manually write code to check for updates, handle errors if the internet drops, and ensure the data doesn&apos;t disappear when navigating between pages. TanStack Query provides the standardized "engine" to handle these background syncs automatically.'
        broadScale='From an architectural perspective, relying on "bespoke" solutions creates technical debt. When a team uses many different patterns for fetching data, it becomes nearly impossible to implement global features like "refetch all data when the window is refocused" or "deduplicate identical requests happening at the same time." By adopting a standardized approach, an entire organization can ensure that all data fetching follows the same reliable lifecycle, significantly reducing the surface area for bugs in large-scale applications.'
        narrowed='The technical problem with the "traditional" approach is the manual orchestration of side effects. As seen in the code provided in image_7d7811.png, using a combination of local state and effect hooks requires the developer to manage the loading lifecycle, error handling, and data storage for every single API endpoint. This becomes unmanageable as the application grows, as it lacks built-in logic for caching or identifying when data has become "stale" and needs a refresh.'
        code={`import React, { useState, useEffect } from 'react';

function RecipeApp() {
  const [recipes, setRecipes] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    fetch('https://api.cookbook.example/recipes')
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((json) => {
        if (isMounted) {
          setRecipes(json);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <div>Loading recipes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Chef's Specials</h1>
      <pre>{JSON.stringify(recipes, null, 2)}</pre>
    </div>
  );
}`}
        simpleTerms='This code demonstrates the "bespoke" way of doing things that TanStack Query aims to replace. We have to create three separate "containers" (useState) just to track the status of one list of recipes: one for the data, one for errors, and one for the loading spinner. Inside the useEffect, we manually call the fetch function. We have to add extra logic, like the &apos;isMounted&apos; variable, to make sure the app doesn&apos;t crash if the user leaves the page before the internet responds. We also have to manually check if the response was successful and manually set the loading state to false at the very end. If we wanted to add a "refresh" button or cache this data so it loads instantly next time, we would have to write even more complex code. This "traditional" method is fragile because it requires the developer to remember every single edge case every time they want to show data from a server.'
      >
        <RecipeAppDemo />
      </SectionWrapper>,

  <SectionWrapper
        title="Challenges of Managing Server State"
        concept="Infrastructure Complexity in Data Synchronization"
        bullets={[
          "Caching and deduplicating requests are complex but critical",
          "Automatic updates for outdated data",
          "Performance issues like pagination and lazy loading",
          "Memory management and query result memoization",
        ]}
        description='Managing server state involves solving technical hurdles that go far beyond simple data fetching. Developers must ensure that the same request isn&apos;t sent multiple times simultaneously (deduplication) and that data is stored locally (caching) to prevent unnecessary network traffic. Furthermore, server state is inherently "stale" the moment it arrives; therefore, systems must be built to automatically detect when data is outdated and trigger a silent refresh. Additional complexities arise when handling large datasets, requiring efficient memory management to clear out unused data and memoization to prevent the UI from re-rendering unless the data truly changes.'
        realWorld='Think of an airline reservation system where thousands of users are looking at seat maps. If two components on the same page—the seat picker and the price summary—both need the current seat availability, the system should only ask the server once. As seats are booked by other travelers, the app needs to refresh that map automatically without the user clicking a "refresh" button. If the user searches for flights across 50 different dates (pagination), the system must manage that memory so the app doesn&apos;t slow down from holding too much historical data.'
        broadScale='On an architectural level, these challenges represent the "plumbing" of a modern web application. Without a robust strategy for memory management and request deduplication, an application&apos;s performance degrades linearly as it grows. Centralizing these concerns allows developers to implement "Stale-While-Revalidate" patterns, where the user is shown slightly older data instantly while the newest data is fetched in the background. This creates a perceived performance boost that is vital for maintaining user engagement in high-traffic enterprise environments.'
        narrowed='Technically, solving these issues requires a sophisticated internal state machine. To handle deduplication, the system must track "in-flight" promises and share the result with all subscribers. For memory management, it utilizes a "garbage collection" logic where cached data is deleted after a period of inactivity (cacheTime). Memoization is achieved by performing a deep comparison between the new server response and the existing cached object, ensuring that the React component tree only updates if a functional change in the data has occurred.'
        code={`import { useQuery } from '@tanstack/react-query';

async function fetchEmployeeDetails(employeeId) {
  const response = await fetch(\`https://api.workplace.example/staff/\${employeeId}\`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

function EmployeeProfile({ employeeId }) {
  const { isLoading, error, data } = useQuery({
    queryKey: ['employee', employeeId],
    queryFn: () => fetchEmployeeDetails(employeeId),
    staleTime: 60000, 
    gcTime: 300000,   
  });

  if (isLoading) return <div>Synchronizing employee records...</div>;
  if (error) return <div>Access Error: {error.message}</div>;

  return (
    <div>
      <h2>{data.fullName}</h2>
      <p>Department: {data.department}</p>
      <p>Status: {data.employmentStatus}</p>
    </div>
  );
}`}
        simpleTerms='This code uses TanStack Query to solve the "plumbing" problems mentioned in the slide. We use the useQuery hook and provide a &apos;queryKey&apos; that includes the specific employeeId. This acts like a unique ID card for this specific piece of data; if five different components ask for [&apos;employee&apos;, 101], the library only sends one request to the server and shares the result with all of them (deduplication). We added &apos;staleTime&apos;, which tells the app: "If we fetched this employee less than 60 seconds ago, don&apos;t bother the server again; just use the local copy." We also added &apos;gcTime&apos; (Garbage Collection Time), which tells the app to wait 5 minutes after the user leaves this page before deleting the employee&apos;s data from the computer&apos;s memory. This keeps the app fast and prevents it from hogging memory. The hook handles the &apos;isLoading&apos; and &apos;error&apos; states automatically, so we don&apos;t have to write manual &apos;if&apos; statements and extra variables to track the progress of the internet request.'
      >
        <EmployeeProfileDemo />
      </SectionWrapper>,

  <SectionWrapper
        title="Why TanStack Query?"
        concept="Developer Efficiency and User Experience"
        bullets={[
          "Reduces boilerplate and complex code",
          "Enhances maintainability and simplifies feature development",
          "Directly benefits end-users by improving application responsiveness and speed",
        ]}
        description='TanStack Query serves as a specialized toolset that replaces the repetitive and error-prone "boilerplate" code typically required for data fetching. By abstracting away the manual management of loading indicators, error states, and data storage, it allows developers to focus on the core functionality of their application rather than the underlying infrastructure. This simplification leads to a more maintainable codebase that is easier for teams to navigate and extend. Furthermore, the library&apos;s focus on efficient data synchronization ensures that end-users experience a faster, more fluid interface that feels highly responsive to their actions.'
        realWorld='Imagine a massive online equipment rental platform. Instead of writing custom logic for every single tool listing to handle data loading, the development team uses TanStack Query to standardize the process. When a contractor searches for a "power drill," the application uses cached results to show items instantly, while silently checking in the background if the availability has changed. This eliminates the frustrating "blank screen" experience for the contractor and makes it much easier for the developers to add new categories of equipment without recreating the data-fetching logic from scratch.'
        broadScale='In large-scale enterprise environments, the "Why" behind TanStack Query is rooted in organizational velocity. By reducing the complexity of the data layer, organizations can onboard new developers faster and ship features with fewer regressions. The built-in performance optimizations ensure that as the application scales to millions of users, the backend is protected from redundant traffic through intelligent caching and request deduplication, maintaining high speed and responsiveness across the entire ecosystem.'
        narrowed='Technically, the library achieves these benefits by providing high-level hooks that encapsulate the entire request lifecycle. Instead of manually coordinating useState and useEffect across multiple files, a single hook call manages the connection between the UI and the remote server state. It uses a sophisticated caching engine to ensure that data is only fetched when absolutely necessary, and it utilizes background synchronization to keep the client-side data updated without interrupting the user&apos;s current task.'
        code={`import { useQuery } from '@tanstack/react-query';

async function fetchEquipmentDetails(id) {
  const response = await fetch(\`https://api.rental-hub.example/tools/\${id}\`);
  if (!response.ok) throw new Error('Failed to load tool details');
  return response.json();
}

function ToolDetailView({ toolId }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['tool', toolId],
    queryFn: () => fetchEquipmentDetails(toolId),
    refetchOnWindowFocus: true, 
  });

  if (isLoading) return <div>Optimizing rental catalog...</div>;
  if (error) return <div>Connectivity Alert: {error.message}</div>;

  return (
    <article>
      <h1>{data.modelName}</h1>
      <p>Daily Rate: \${data.price}</p>
      <p>Location: {data.warehouseLocation}</p>
      <button>Reserve Now</button>
    </article>
  );
}`}
        simpleTerms='This code shows why this library is a favorite for developers. In the ToolDetailView component, we use the useQuery hook to do all the heavy lifting. Without it, we would have needed to write several lines of code to track whether the tool data is still loading or if there was a mistake. Here, the library gives us isLoading and error variables automatically. We also added refetchOnWindowFocus: true. This is a "feature development" win: it means if the user clicks away to look at another website and then clicks back to our app, the app will automatically check if the rental price or availability has changed. The end-user wins because the app feels "smart" and always shows current info, and the developer wins because they only had to write one line of code to make that magic happen.'
      >
        <ToolDetailViewDemo />
      </SectionWrapper>,

  <SectionWrapper
        title="Features and Benefits"
        concept="Developer Ecosystem and Optimization"
        bullets={[
          "Handles caching, background updates, and data deduplication efficiently",
          "Optimizes performance, saving bandwidth and improving responsiveness",
          "Minimal configuration needed, customizable for advanced usage",
          "Tools available (e.g., ESLint Plugin Query) to assist in development",
        ]}
        description='TanStack Query provides a robust set of features designed to automate the most difficult aspects of asynchronous data management. It focuses on efficiency by ensuring that data is stored locally for quick access and that the application stays synchronized with the server through background updates without manual intervention. By managing request deduplication, it prevents redundant network traffic, which directly contributes to a faster user experience. Furthermore, the library is built to be "plug-and-play," requiring very little setup for basic features while remaining highly extensible for complex enterprise requirements. The ecosystem also includes developer aids, such as specialized linting plugins, to ensure best practices are followed during implementation.'
        realWorld='Imagine a global news platform where journalists are constantly publishing updates. Using TanStack Query, the platform can ensure that readers see headlines instantly from a local cache. In the background, the library silently checks for new breaking news every few minutes. If two different sections of the homepage (like "Top Stories" and "Breaking News") both need the same article data, the library deduplicates the request so the reader&apos;s device only downloads that article once. This saves the user&apos;s mobile data and makes the app feel incredibly fast.'
        broadScale='At a macro level, these features represent a shift toward high-performance, resilient web architecture. By optimizing bandwidth through deduplication and caching, applications become more accessible to users on slower connections or restricted data plans. The availability of tools like ESLint plugins allows large engineering teams to maintain high code quality and consistency across hundreds of different components, reducing the likelihood of "memory leaks" or performance bottlenecks as the application matures.'
        narrowed='Technically, the "minimal configuration" refers to the library&apos;s sensible defaults; out of the box, it considers data "stale" immediately, forcing a background refetch to ensure accuracy. However, developers can customize this by adjusting the staleTime and gcTime parameters. The integration of tools like the ESLint Plugin Query works by analyzing the code statically to catch common mistakes, such as missing query keys or improper hook usage, which prevents runtime errors before the code is even deployed.'
        code={`import { useQuery } from '@tanstack/react-query';

async function fetchNewsHeadlines() {
  const response = await fetch('https://api.global-news.example/v1/headlines');
  if (!response.ok) throw new Error('Network failure while fetching headlines');
  return response.json();
}

function NewsTicker() {
  const { data, status, error } = useQuery({
    queryKey: ['headlines'],
    queryFn: fetchNewsHeadlines,
    staleTime: 30000, 
    retry: 3,
  });

  if (status === 'pending') return <div>Loading latest news...</div>;
  if (status === 'error') return <div>Update Failed: {error.message}</div>;

  return (
    <marquee>
      {data.map((article) => (
        <span key={article.id}> | {article.title}</span>
      ))}
    </marquee>
  );
}`}
        simpleTerms='This code highlights the "Features and Benefits" of the library. First, it shows "minimal configuration" because we only really need a queryKey and a queryFn to get started. However, we also used "customization for advanced usage" by adding staleTime: 30000. This tells the app: "Once you download the news, don&apos;t ask the server for it again for 30 seconds." This is how the library "saves bandwidth." We also added a retry: 3 setting, which means if the user goes through a tunnel and their internet blips, the library won&apos;t just give up and show an error; it will quietly try to fetch the news again up to three times. The use of status === &apos;pending&apos; is a built-in feature that makes the responsiveness better, as we can show a specific message to the user while the library is handling the background work.'
      >
        <NewsTickerDemo />
      </SectionWrapper>,

  <SectionWrapper
        title="Getting Started with TanStack Query"
        concept="Installation and Compatibility"
        bullets={[
          "Installation via NPM or direct import from CDN",
          "Compatible with React v18+ and modern browsers",
          "Simplifies integration into new or existing projects",
          "Quick start examples available for immediate implementation",
        ]}
        description='Getting started with TanStack Query is designed to be a low-friction process, offering multiple installation pathways to suit different development environments. It is built specifically for modern web standards, requiring React version 18 or higher and support from modern web browsers to utilize its full feature set. The library is architected to be non-intrusive, allowing developers to integrate it into greenfield projects or existing legacy systems without requiring a complete overhaul of the current data-fetching logic. To accelerate the learning curve, the ecosystem provides immediate "Quick Start" resources that demonstrate the core mechanics of the library.'
        realWorld='Imagine a city&apos;s public transit agency launching a new "Route Finder" feature. The developers can quickly install TanStack Query using NPM to begin managing real-time bus location data. Because the agency&apos;s existing website is built on React 18, they can drop the library in and immediately start replacing their older, manual data-fetching methods. By following a quick start example for a basic fetch request, they can have a working live-map prototype running in hours rather than days.'
        broadScale='In an enterprise setting, the ease of installation and high compatibility ensure that TanStack Query can become a standard tool across many different internal teams. Standardizing on a library that works reliably in modern browsers reduces the time spent on "cross-browser" bug fixing for the data layer. Furthermore, the ability to simplify integration into existing projects means that large organizations can incrementally migrate their applications to more efficient state management patterns without interrupting their release cycles.'
        narrowed='Technically, the installation via NPM adds the @tanstack/react-query package to the project&apos;s dependencies, ensuring it is bundled and optimized during the build process. For projects that do not use a build step, the CDN option allows the library to be loaded directly via a script tag. The requirement for React v18+ is critical because TanStack Query leverages modern React features like concurrent rendering to provide its seamless "loading" and "background update" experiences.'
        code={`import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const transitQueryClient = new QueryClient();

function TransitApp() {
  return (
    <QueryClientProvider client={transitQueryClient}>
      <BusRouteDisplay />
    </QueryClientProvider>
  );
}

async function fetchBusLocation() {
  const response = await fetch('https://api.city-transit.example/v1/live-bus');
  if (!response.ok) throw new Error('Transit data unavailable');
  return response.json();
}

function BusRouteDisplay() {
  const { data, status } = useQuery({
    queryKey: ['busLocation'],
    queryFn: fetchBusLocation,
  });

  if (status === 'pending') return <div>Tracking buses...</div>;
  if (status === 'error') return <div>Network Error: Station signal lost.</div>;

  return (
    <div>
      <h3>Current Fleet Status</h3>
      <p>Active Buses: {data.activeCount}</p>
      <p>Last Update: {new Date(data.timestamp).toLocaleTimeString()}</p>
    </div>
  );
}`}
        simpleTerms='This code demonstrates how to "get started" by following the three main steps. First, we create the QueryClient, which acts as the brain of the operation, holding all our cached data. Second, we wrap our whole app in the QueryClientProvider, which is like plugging the app into a power source so every component can talk to that brain. Third, inside our BusRouteDisplay, we use the useQuery hook to fetch data. This shows "simplified integration" because we don&apos;t have to write any code to store the data ourselves; the library handles the fetch, checks the status, and gives us a simple pending or error label to use for our UI. This allows us to get a "quick start" on building features because we only focus on what to show the user, not how to manage the technical details of the internet request.'
      >
        <TransitAppDemo />
      </SectionWrapper>
]

export default function Week04IntroToTanStackQueryMasterclass({
  onBack,
  onSectionChange,
  title = 'Introduction to TanStack Query',
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeSection = useMemo(() => lectureSections[activeIndex], [activeIndex])

  useEffect(() => {
    if (!onSectionChange) return

    if (activeIndex < lectureSectionTitles.length) {
      onSectionChange({
        index: activeIndex + 1,
        title: lectureSectionTitles[activeIndex],
      })
      return
    }

    onSectionChange({
      index: lectureSectionTitles.length + 1,
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

          {lectureSectionTitles.map((sectionTitle, index) => (
            <button
              key={sectionTitle}
              className={index === activeIndex ? 'sm-nav-button active' : 'sm-nav-button'}
              onClick={() => setActiveIndex(index)}
            >
              <span className="sm-nav-step">{String(index + 1).padStart(2, '0')}</span>
              <span>{sectionTitle}</span>
            </button>
          ))}

          <button
            className={activeIndex === lectureSectionTitles.length ? 'sm-nav-button active' : 'sm-nav-button'}
            onClick={() => setActiveIndex(lectureSectionTitles.length)}
          >
            <span className="sm-nav-step">{String(lectureSectionTitles.length + 1).padStart(2, '0')}</span>
            <span>Best Practices and Recap</span>
          </button>
        </aside>

        <main className="sm-content">
          {activeIndex < lectureSections.length ? activeSection : <RecapSection />}
        </main>
      </div>
    </div>
  )
}

