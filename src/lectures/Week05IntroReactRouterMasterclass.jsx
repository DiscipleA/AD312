import { useEffect, useMemo, useState } from 'react'
import '../styles/stateMasterclass.css'
import EditableCodeRunner from '../components/interactive-code/EditableCodeRunner'

const SlideHeader = ({ title, bullets }) => (
  <div
    style={ {
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '30px',
      borderRadius: '12px',
      marginBottom: '25px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
    } }
  >
    <h2 style={ { borderBottom: '2px solid #3498db', paddingBottom: '10px', marginTop: 0 } }>
      {title}
    </h2>
    <ul style={ { lineHeight: '1.8', fontSize: '1.05rem', marginBottom: 0 } }>
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
  realWorldApplication,
  broadScaleUsage,
  narrowedApproach,
  demoSource,
  entryComponentName,
  simpleTermsExplanation,
}) {
  return (
    <section className="sm-section">
      <h1 className="sm-title">{title}</h1>
      <SlideHeader title={concept} bullets={bullets} />

      <p className="sm-description">
        <strong>Description:</strong> {description}
      </p>

      <div className="sm-grid">
        <div className="sm-panel">
          <h3>Real-World Application</h3>
          <p className="sm-preline">{realWorldApplication}</p>
        </div>

        <div className="sm-panel">
          <h3>Broad Scale Usage</h3>
          <p className="sm-preline">{broadScaleUsage}</p>
        </div>
      </div>

      <div className="sm-narrow">
        <h3>Narrowed Approach</h3>
        <p className="sm-preline">{narrowedApproach}</p>
      </div>

      <EditableCodeRunner
        title={`React Router: ${title}`}
        initialCode={demoSource}
        entryComponentName={entryComponentName}
        previewLabel="Code in Action"
      />

      <div className="sm-explanation">
        <h3>Simple Terms Explanation</h3>
        <p className="sm-preline">{simpleTermsExplanation}</p>
      </div>
    </section>
  )
}

function RecapSection() {
  const bestPractices = [
    'Start with the lightest routing mode that solves the project problem. Declarative mode is excellent when the router only needs to map URLs to components.',
    'Use Data mode when navigation and data need to cooperate through loaders, actions, pending UI, and route-level error boundaries.',
    'Use Framework mode when the app benefits from route modules, file-based conventions, type generation, SSR or pre-rendering workflows, and an opinionated build pipeline.',
    'Treat the URL as application state. Paths, params, and nested route segments should describe what the user is viewing and what data the app needs.',
    'Keep navigation semantic. Use router-aware navigation such as Link/NavLink patterns instead of forcing full page reloads with ordinary anchor behavior.',
  ]

  const recapRows = [
    [
      'Declarative Mode',
      'The component-first mode. Use BrowserRouter, Routes, Route, Link, and Outlet when routing should stay simple and data fetching can remain in components or external tools.',
    ],
    [
      'Data Mode',
      'The data-aware mode. Use route objects, loaders, actions, RouterProvider, and navigation state when data should be coordinated before or during navigation.',
    ],
    [
      'Framework Mode',
      'The full application mode. Use route modules, generated types, build tooling, and server-aware conventions when the router becomes the backbone of the app architecture.',
    ],
    [
      'Loader',
      'A route-level function that prepares read data for a page before the component renders, reducing loading waterfalls and keeping data requirements close to the URL.',
    ],
    [
      'Action',
      'A route-level function that handles writes such as form submissions or mutations, then lets the router coordinate revalidation and navigation feedback.',
    ],
    [
      'Outlet',
      'The placeholder where a parent route renders its active child route, which makes nested layouts possible without duplicating shared UI.',
    ],
    [
      'Navigation State',
      'The router’s way of exposing pending transitions so the UI can show loading, submitting, or optimistic feedback during route changes.',
    ],
  ]

  return (
    <section className="sm-section sm-recap-section" style={ { backgroundColor: '#203141', color: 'white' } }>
      <h1 className="sm-title" style={ { color: 'white' } }>Best Practices and Recap</h1>

      <div className="sm-grid">
        <div className="sm-panel" style={ { background: 'rgba(255,255,255,0.08)', color: 'white' } }>
          <h3>Key Takeaways</h3>
          <ul className="sm-preline" style={ { marginBottom: 0 } }>
            {bestPractices.map((item) => (
              <li key={item} style={ { marginBottom: '10px' } }>{item}</li>
            ))}
          </ul>
        </div>

        <div className="sm-panel" style={ { background: 'rgba(255,255,255,0.08)', color: 'white' } }>
          <h3>Concept Table</h3>
          <div style={ { display: 'grid', gap: '10px' } }>
            {recapRows.map(([term, meaning]) => (
              <div
                key={term}
                style={ {
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  background: 'rgba(255,255,255,0.04)',
                } }
              >
                <strong>{term}:</strong> {meaning}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sm-explanation" style={ { background: 'rgba(255,255,255,0.08)', color: 'white' } }>
        <h3>Final Teaching Principle</h3>
        <p className="sm-preline" style={ { marginBottom: 0 } }>
          React Router v7 is best understood as a routing spectrum rather than a single setup style. A professional React developer does not automatically choose the most powerful mode. They choose the mode that matches the project’s navigation, data, deployment, and team needs while keeping the routing layer clear, predictable, and maintainable.
        </p>
      </div>
    </section>
  )
}

const codeExample1 = `import { type Route } from "./+types/exhibit";

export async function loader({ params }: Route.LoaderArgs) {
  const res = await fetch(\`https://api.museum.org/artifacts/\${params.id}\`);
  return await res.json();
}

export default function ExhibitDetail({ loaderData }: Route.ComponentProps) {
  return (
    <section>
      <h1>{loaderData.title}</h1>
      <p>{loaderData.description}</p>
      <div className="metadata">
        <span>Origin: {loaderData.origin}</span>
        <span>Date: {loaderData.year}</span>
      </div>
    </section>
  );
}`;

const codeExample2 = `import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "woodworking-tips",
        async loader() {
          const response = await fetch("/api/tips");
          return response.json();
        },
        Component() {
          return (
            <div>
              <h2>Essential Shop Tips</h2>
              <p>Always wear safety glasses when operating the lathe.</p>
            </div>
          );
        },
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}`;

const codeExample3 = `import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Mineral Collection Home</h1>
      <button onClick={() => navigate("/gallery")}>Go to Gallery</button>
    </div>
  );
}

function Gallery() {
  return (
    <div>
      <h1>Local Mineral Gallery</h1>
      <Link to="/">Back to Home</Link>
      <ul>
        <li>Quartz</li>
        <li>Feldspar</li>
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link style={{ marginRight: "10px" }} to="/">Home</Link>
        <Link to="/gallery">Gallery</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}`;

const codeExample4 = `import { createBrowserRouter, RouterProvider, useLoaderData, Form } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/forest-plot/:id",
    loader: async ({ params }) => {
      const res = await fetch(\`/api/plots/\${params.id}\`);
      if (!res.ok) throw new Response("Not Found", { status: 404 });
      return res.json();
    },
    action: async ({ request, params }) => {
      const formData = await request.formData();
      await fetch(\`/api/plots/\${params.id}/notes\`, {
        method: "POST",
        body: JSON.stringify({ note: formData.get("observation") }),
      });
      return { ok: true };
    },
    element: <PlotDetails />,
    errorElement: <div className="error">Failed to load plot data.</div>
  },
]);

function PlotDetails() {
  const plot = useLoaderData();
  return (
    <div>
      <h2>{plot.name}</h2>
      <p>Soil PH: {plot.soilPh}</p>
      <Form method="post">
        <textarea name="observation" placeholder="Add field note..." />
        <button type="submit">Save Note</button>
      </Form>
    </div>
  );
}

export default function App() {
  return <RouterProvider router={router} />;
}`;

const codeExample5 = `// routes/catalog.tsx
import type { Route } from "./+types/catalog";
import { data } from "react-router";

export async function loader({ params }: Route.LoaderArgs) {
  const book = await fetch(\`https://api.library.org/books/\${params.isbn}\`);
  if (!book) {
    throw data("Book not found", { status: 404 });
  }
  return { 
    title: book.title, 
    author: book.author,
    available: book.isStocked 
  };
}

export default function BookDetails({ loaderData }: Route.ComponentProps) {
  return (
    <main>
      <h1>{loaderData.title}</h1>
      <h3>By: {loaderData.author}</h3>
      <p>Status: {loaderData.available ? "In Stock" : "On Loan"}</p>
    </main>
  );
}`;

const codeExample6 = `// vite.config.ts - Setting up the Framework Strategy
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths()],
});

// app/routes/transit-map.tsx
import type { Route } from "./+types/transit-map";

export async function loader() {
  const routes = await fetch("https://api.city.gov/transit/routes");
  return { routes: await routes.json() };
}

export default function TransitPortal({ loaderData }: Route.ComponentProps) {
  return (
    <div className="portal-container">
      <header>City Transit Transparency Portal</header>
      <nav>
        {loaderData.routes.map((route: any) => (
          <button key={route.id}>{route.name}</button>
        ))}
      </nav>
      <main>Select a route to view real-time data.</main>
    </div>
  );
}`;

const codeExample7 = `import { createBrowserRouter, RouterProvider, useLoaderData } from "react-router-dom";

// Standard Data Strategy Setup
const router = createBrowserRouter([
  {
    path: "/lab-results/:sampleId",
    loader: async ({ params }) => {
      const response = await fetch(\`/api/v1/samples/\${params.sampleId}/analysis\`);
      if (response.status === 401) throw new Error("Unauthorized Access");
      return response.json();
    },
    Component() {
      const analysis = useLoaderData();
      return (
        <article className="analysis-view">
          <header>Sample ID: {analysis.id}</header>
          <section>
            <h3>Chemical Breakdown</h3>
            <ul>
              {analysis.results.map((r: any) => (
                <li key={r.compound}>{r.compound}: {r.value}%</li>
              ))}
            </ul>
          </section>
        </article>
      );
    },
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}`;

const codeExample8 = `import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

function ClippingView({ clippingId }) {
  const [clipping, setClipping] = useState(null);

  useEffect(() => {
    fetch(\`/api/archives/clippings/\${clippingId}\`)
      .then(res => res.json())
      .then(data => setClipping(data));
  }, [clippingId]);

  if (!clipping) return <div>Searching Archives...</div>;

  return (
    <article>
      <h2>{clipping.headline}</h2>
      <p>Date: {clipping.publishDate}</p>
      <div className="content">{clipping.text}</div>
    </article>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Archive Home</h1>} />
        <Route path="/view/:clippingId" element={<ClippingView />} />
      </Routes>
    </BrowserRouter>
  );
}`;


const slides = [
{
  "title": "Introduction to React Router v7",
  "concept": "Framework Evolution and Unified Routing",
  "bullets": [
    "The Bridge: Connects React 18 to React 19.",
    "Multi-Strategy: Scales from a simple library to a full-stack framework.",
    "Flexibility: \"Use it maximally or as minimally as you want.\"",
    "Legacy: React Router v7 is the official evolution of Remix v2."
  ],
  "description": "React Router v7 represents a significant architectural shift by merging the capabilities of the Remix framework back into the core React Router library. It serves as a generational bridge, providing compatibility across React 18 and 19. The \"Multi-Strategy\" approach means developers can use it strictly for client-side routing or opt-in to full-stack features like Server-Side Rendering (SSR) and data loaders. This evolution ensures that the features pioneered in Remix—such as nested routing and optimized data fetching—are now standard in the most widely used routing library for React.",
  "realWorldApplication": "A large-scale museum archival system migrating its interface. The development team can start by using the library for simple URL navigation between exhibit galleries, but as requirements grow, they can enable server-side features to pre-render high-resolution artifact descriptions without changing their underlying routing architecture.",
  "broadScaleUsage": "In modern web architecture, this unified approach reduces technical debt by eliminating the need to choose between a \"router\" and a \"framework\" at the start of a project. By aligning with the Remix v2 codebase, React Router v7 provides a stable, enterprise-grade foundation that supports progressive enhancement, allowing an application to grow from a simple Single Page Application (SPA) into a high-performance, server-rendered platform.",
  "narrowedApproach": "Technically, React Router v7 utilizes a \"Framework Mode\" and a \"Library Mode.\" In the full-stack context, it leverages `loaders` for data fetching and `actions` for data mutations. The route configuration is centralized, often using the `routes.ts` file to define the hierarchy of the application. This allows for fine-grained control over how specific segments of the URL map to React components and their associated data dependencies.",
  "simpleTermsExplanation": "This code shows how a modern React Router v7 \"route module\" works. First, we have a 'loader' function. Think of this as a pre-order system: before the page even shows up on the screen, the loader goes out to the internet to grab the specific data needed for that page. It uses 'params.id' to know exactly which item to look for based on the URL. Once the data arrives, it is passed into the 'ExhibitDetail' component through 'loaderData'. Inside the component, we simply layout that data using standard HTML tags. By doing the data fetching in the loader instead of inside the component with 'useEffect', the page feels much faster because the data and the UI arrive at the same time, preventing those annoying loading spinners that pop up after a page loads.",
  "codeExample": codeExample1
},
{
  "title": "The Three Modes of v7",
  "concept": "Progressive Enhancement in Architectural Modes",
  "bullets": [
    "Declarative: Basic URL matching and navigation.",
    "Data: Adds data loading, actions, and state management.",
    "Framework: The \"Full Battery\" experience via Vite plugin.",
    "Additive Logic: Each mode adds features while trading off some architectural manual control."
  ],
  "description": "React Router v7 operates on a spectrum of complexity referred to as \"modes.\" The journey begins with Declarative mode, which handles the fundamental task of mapping URLs to components. Moving into Data mode introduces the \"Remix\" philosophy of server-side data synchronization using loaders and actions, effectively managing application state through the URL. Finally, Framework mode utilizes a dedicated Vite plugin to automate routing configurations, provide type-safe routing, and handle advanced bundling optimizations. This additive logic allows developers to scale their application's infrastructure only when the complexity of the project demands it.",
  "realWorldApplication": "A community woodworking shop starts a digital presence with a simple site where each URL just shows a different static page about shop hours or tool safety (Declarative). As they grow, they add the ability for members to log in and see their specific certification status via data fetching (Data). Eventually, the site becomes a high-traffic platform with automatic SEO optimization and complex build steps managed by the framework's integrated build tools (Framework).",
  "broadScaleUsage": "From an architectural standpoint, these modes represent a \"pay-as-you-go\" complexity model. High-performance enterprise applications benefit from Framework mode because it provides the most optimized user experience with the least amount of manual configuration. However, legacy systems or lightweight internal tools might stick to Declarative or Data modes to maintain maximum control over their existing build pipelines and minimize dependencies.",
  "narrowedApproach": "In technical execution, the transition between modes involves shifting from a component-based route definition (standard `<Route>` tags) to a data-driven configuration. In Framework mode, the Vite plugin (`@react-router/dev/vite`) takes over the build process, enabling features like \"Hydration\" and \"Single Fetch.\" This mode trade-off means the developer relinquishes control over the entry-point setup in exchange for automated performance gains and integrated server-side capabilities.",
  "simpleTermsExplanation": "This code demonstrates the \"Data Mode\" of React Router. We use a function called 'createBrowserRouter' to build a map of our website. Inside this map, we define a 'path' (the URL address) and an 'element' (the main structure). For the 'woodworking-tips' sub-page, we added a 'loader'. This loader is like a personal assistant who runs ahead to the database ('/api/tips') to grab all the information before the visitor arrives at the page. The 'Component' part then takes that information and displays it. By using 'RouterProvider' at the bottom, we tell the entire app to follow this map. This approach is more advanced than basic navigation because it links the data fetching directly to the URL address, making the app feel more robust and organized.",
  "codeExample": codeExample2
},
{
  "title": "Mode 1 – Declarative (The Basics)",
  "concept": "Component-Based Navigation and Client-Side Routing",
  "bullets": [
    "Core APIs: <BrowserRouter>, <Link>, useNavigate.",
    "Best for: Simple apps, migrating from Create React App, or apps with independent data layers.",
    "Setup: Wrap your app in a provider and define routes within React rendering."
  ],
  "description": "Declarative mode is the entry-level implementation of React Router v7. It focuses on the component-based approach where the UI describes \"what\" should be rendered based on the current URL. This mode utilizes the traditional `<BrowserRouter>` to sync the UI with the browser's address bar. It is the primary choice for developers who want to keep their data-fetching logic separate from their routing logic—often using standard React hooks like `useEffect`. This mode provides the most familiar experience for those coming from older versions of React Router or migrations from legacy environments like Create React App.",
  "realWorldApplication": "A neighborhood hobbyist group creating a gallery of locally found minerals. The site uses a simple menu to switch between \"Home,\" \"Gallery,\" and \"Contact Us.\" Each click updates the URL and shows a different set of pictures. Because the data is small and static, the group doesn't need complex data management; they just need a reliable way to navigate between different views of their collection.",
  "broadScaleUsage": "On an architectural level, Declarative mode is ideal for client-side only applications (SPAs) that do not require server-side rendering or advanced data synchronization. It is highly portable and easy to implement in existing React projects without altering the build process. While it lacks the automated performance optimizations of the more advanced modes, its simplicity makes it a \"safe\" starting point for prototypes or applications where the routing structure is relatively flat and uncomplicated.",
  "narrowedApproach": "The technical setup involves wrapping the root of the component tree in a `<BrowserRouter>`. Individual routes are defined using the `<Routes>` and `<Route>` components. Navigation is handled either declaratively through the `<Link>` component—which prevents a full page reload—or imperatively using the `useNavigate` hook for logic-based transitions (like redirecting after a successful form submission).",
  "simpleTermsExplanation": "This code shows the most basic way to make a website with multiple pages using React. First, we import tools like 'BrowserRouter' and 'Link'. Think of 'BrowserRouter' as the \"brain\" that keeps track of the URL in your browser's address bar. Inside the 'App' component, we use 'Routes' to define a list of addresses. For example, if the address is just '/', the computer shows the 'Home' component. If the address is '/gallery', it shows the 'Gallery' component. To move between these pages without the whole screen flickering or reloading, we use the 'Link' tag instead of a regular '<a>' tag. We also show the 'useNavigate' hook inside the 'Home' component—this is like an invisible remote control that lets you change the page using a button click or other logic. It's the simplest way to get from A to B in a React app.",
  "codeExample": codeExample3
},
{
  "title": "Mode 2 – Data (Enhanced Performance)",
  "concept": "Data Decoupling and Parallelized Fetching",
  "bullets": [
    "Core APIs: createBrowserRouter, RouterProvider.",
    "Features: loader, action, useFetcher.",
    "Benefit: Decouples data fetching from rendering to prevent 'loading waterfalls.'",
    "Control: High control over bundling and server abstractions."
  ],
  "description": "Data mode shifts the routing logic from a component-based model to a configuration-based model. By using `createBrowserRouter`, the application defines its data requirements upfront. This allows the router to start fetching data for a page at the exact same moment it starts loading the code for that page's components. This \"decoupling\" is critical for performance; it eliminates \"loading waterfalls\" where a parent component must render, then fetch data, and only then allow a child component to start its own fetching. This mode provides the engine of the Remix framework while allowing developers to maintain full control over their own build tools and server environment without necessarily adopting the full Framework mode plugin.",
  "realWorldApplication": "An scientific research station monitoring forest health. When a researcher clicks on a specific \"Plot Map,\" the application needs to load the map interface, the current soil moisture data, and the history of tree growth simultaneously. In Data mode, all three pieces of information begin downloading the second the link is clicked, ensuring the researcher doesn't have to wait for three separate \"loading...\" spinners to finish one after another.",
  "broadScaleUsage": "Architecturally, Data mode is the \"sweet spot\" for high-performance SPAs. It introduces a formal way to handle side effects (via `actions`) and background data syncing (via `useFetcher`) without the overhead of a complex global state management library. By utilizing the URL as the primary source of truth for the application's state, it creates a more resilient and predictable user experience that mirrors how the traditional web was designed to function.",
  "narrowedApproach": "The technical implementation requires a shift from `<BrowserRouter>` to `createBrowserRouter`. Routes are defined as objects containing `path`, `loader` (for GET requests), and `action` (for POST/PUT/DELETE requests). The `RouterProvider` component is then used to inject this configuration into the React tree. This setup enables the router to intercept navigation events and manage the \"pending\" state of the application globally, allowing for smoother transitions and better error handling through `errorElement`.",
  "simpleTermsExplanation": "This code shows the \"Data Mode\" in action, which is all about speed and efficiency. Instead of putting our data fetching inside the component where it has to wait its turn, we move it to a 'loader'. Imagine a restaurant where the waiter (the loader) takes your order and starts the kitchen cooking before you've even sat down at the table. By the time you sit down (the component renders), the food (the data) is already arriving! We also use an 'action' for saving data. Instead of writing a complex 'handleSubmit' function with lots of manual 'fetch' calls, we use the 'Form' component. When you click \"Save Note,\" the router automatically sends the data to our 'action' function. This keeps our UI clean and ensures that the data on the screen stays perfectly in sync with our database without us having to write extra code to \"refresh\" the page.",
  "codeExample": codeExample4
},
{
  "title": "Mode 3 – Framework (The Full Experience)",
  "concept": "Full-Stack Optimization and Type-Safe Route Modules",
  "bullets": [
    "Powered by: Vite Plugin.",
    "Features: * Automatic Code Splitting.",
    "Type-safe hrefs and Params.",
    "SSR, SPA, or Static Rendering (SSG).",
    "Route Module API: Clean separation of data and UI."
  ],
  "description": "Framework mode is the most advanced tier of React Router v7, where the library functions as a complete full-stack framework. It is driven by a specialized Vite plugin that automates the build process, enabling powerful features like automatic code splitting—where the browser only downloads the code necessary for the current view. This mode offers ultimate flexibility in rendering strategies, allowing developers to choose between Server-Side Rendering (SSR) for SEO, Single Page Application (SPA) for interactivity, or Static Site Generation (SSG) for speed, all within the same project. The \"Route Module API\" enforces a strict architectural pattern where data requirements (loaders/actions) and UI components live in specialized files, ensuring a highly maintainable and scalable codebase.",
  "realWorldApplication": "A large-scale public library system managing a global catalog. The system uses SSR for the search pages so that books are easily indexed by search engines, but switches to SPA behavior once a user logs in to manage their personal loans. Because the system is massive, Framework mode’s automatic code splitting ensures that a user looking for a children's book doesn't accidentally download the heavy code used for the administrative archival dashboard.",
  "broadScaleUsage": "In terms of architecture, Framework mode provides a \"unified compiler\" experience. By integrating deeply with Vite, it can generate type definitions for your routes automatically. This means if a developer changes a URL parameter name in the configuration, the TypeScript compiler will immediately flag every link in the application that points to that route as an error. This level of safety and automation is essential for enterprise teams where multiple developers are working on hundreds of interconnected routes simultaneously.",
  "narrowedApproach": "The technical foundation shifts to a file-based or centralized configuration that the Vite plugin (`@react-router/dev/vite`) parses during development. This mode introduces the concept of \"+types,\" which are generated files that provide full type safety for `loaderData` and `params` within your components. It also enables \"Single Fetch,\" a mechanism that bundles multiple data requests into a single network call to the server, significantly reducing latency on mobile devices or slow connections.",
  "simpleTermsExplanation": "This code represents the \"Framework Mode,\" the highest level of organization. Notice the import at the top from './+types/catalog'—this is like having a digital assistant that automatically checks your work. It ensures that if the 'loader' says it's sending a 'title', the 'BookDetails' component knows exactly what that 'title' is (like a string of text) without you having to manually define it. The 'loader' acts as the gatekeeper, fetching the book info using a unique ID (the ISBN). If the book doesn't exist, it throws a clear 404 error. The component itself stays very \"clean\"—it doesn't have to worry about HOW to get data; it just receives the 'loaderData' and displays it. This separation makes the code much easier to fix or update later because the \"brain\" (the loader) and the \"face\" (the component) are separate but perfectly connected by types.",
  "codeExample": codeExample5
},
{
  "title": "Picking Your Strategy - Framework",
  "concept": "Strategic Adoption and Migration Paths",
  "bullets": [
    "Starting a new project",
    "Coming from Remix/Next.js",
    "Want SSR/SSG built-in"
  ],
  "description": "Choosing the \"Framework\" strategy in React Router v7 is an architectural commitment to a full-stack, opinionated environment. This strategy is most appropriate for greenfield projects where the team wants to leverage modern web standards like server-side rendering (SSR) or static site generation (SSG) from day one. It is specifically designed as the successor for teams currently using Remix or Next.js, providing a familiar mental model centered around nested routes and server-integrated data flow. By opting into this strategy, developers gain access to an optimized compiler and build pipeline that simplifies complex tasks like pre-rendering, server-side data hydration, and deployment-ready assets.",
  "realWorldApplication": "A regional government launch of a new public transit transparency portal. Since the portal needs to be extremely fast on mobile devices and highly searchable (SEO) for citizens looking up routes, the team chooses the Framework strategy. This allows them to use SSR for the initial page load—ensuring the bus schedules appear instantly—while maintaining the smooth interactivity of a React app for real-time map updates.",
  "broadScaleUsage": "From a strategic business perspective, the Framework mode reduces \"integration friction.\" Instead of a team spending weeks stitching together various libraries for routing, data fetching, and server rendering, the Framework strategy provides a pre-integrated \"paved road.\" This allows for faster time-to-market and ensures that the application follows industry best practices for performance and accessibility by default, rather than as an afterthought.",
  "narrowedApproach": "Technically, this strategy involves using the `react-router` CLI or a Vite template configured with the `@react-router/dev` plugin. It moves the application toward a \"Route Module\" structure where specific conventions—like exporting a `loader` or a `default` component—enable the framework to perform tree-shaking and route-based code splitting automatically. This approach leverages the server for more than just serving static files; it utilizes the server as a compute layer to handle heavy data transformations before they ever reach the client's browser.",
  "simpleTermsExplanation": "This code shows how you \"turn on\" the Framework strategy and use it. First, in the 'vite.config.ts' file, we tell our build tool (Vite) to use the 'reactRouter' plugin. This is like plugging in a powerful engine into a car—it upgrades everything from how the car starts to how it handles the road. Then, in the 'transit-map.tsx' file, we see the \"Route Module\" pattern. We have a 'loader' that grabs transit data from a government website. Because we are in Framework mode, this fetching happens on the server before the user even sees the page. The 'TransitPortal' component then gets that data automatically. This strategy is perfect when you want the framework to handle the \"heavy lifting\" of making the site fast and reliable, leaving you to focus just on the features and design.",
  "codeExample": codeExample6
},
{
  "title": "Picking Your Strategy - Data",
  "concept": "Hybrid Performance and Custom Infrastructure Control",
  "bullets": [
    "Want data features + custom build",
    "Happy with v6.4 Data Routers",
    "Need control over server layers"
  ],
  "description": "The \"Data\" strategy in React Router v7 is a targeted middle ground for developers who require the advanced data synchronization capabilities of Remix—such as loaders, actions, and automatic revalidation—but wish to maintain an existing or custom-built infrastructure. This strategy is the natural progression for teams already utilizing the \"Data Routers\" introduced in React Router v6.4. It allows the application to benefit from decoupled data fetching (preventing loading waterfalls) while granting the developer absolute authority over the bundling process, server middleware, and deployment environment without the abstractions of the full Framework mode.",
  "realWorldApplication": "A large medical laboratory managing complex blood sample tracking. The lab already has a highly specific security layer and custom server environment that cannot be easily migrated to a new framework build system. By choosing the Data strategy, they can implement efficient data loaders to fetch patient histories and actions to update sample statuses in real-time, all while keeping their specialized, battle-tested server infrastructure exactly as it is.",
  "broadScaleUsage": "Architecturally, the Data strategy is chosen when the \"Standard Paved Road\" of a framework doesn't fit specific organizational constraints. It provides the high-performance benefits of a modern router—specifically the ability to fetch data in parallel with code—while remaining \"library-like\" in its integration. This makes it ideal for enterprise-level SPAs that are part of a larger micro-frontend architecture or those that require deep integration with non-standard backend technologies.",
  "narrowedApproach": "Technically, this approach relies on `createBrowserRouter` or `createHashRouter`. The developer manually defines a route object tree where each route specifies its `loader` and `action`. Unlike Framework mode, there is no automatic code-splitting managed by a plugin; the developer handles dynamic imports manually via `lazy` if needed. This mode focuses on the \"Data API\" of React Router v7, ensuring that the URL remains the source of truth for the application's data state through hooks like `useLoaderData` and `useNavigation`.",
  "simpleTermsExplanation": "This code shows the \"Data Strategy\" in practice. Here, we are using 'createBrowserRouter' to define exactly how our app handles data for specific addresses. The 'loader' is the star of the show; it is a specialized function that acts as a scout. When a user navigates to a sample's page, the scout runs to the server, checks if the user is allowed to see the data (the 401 check), and brings back the analysis results. Inside the 'Component', we use 'useLoaderData' to catch whatever the scout brought back. This strategy is \"Data-First\" because it ensures that the information is ready and verified before the page even tries to draw itself on the screen. It gives you the power of a framework's data handling while letting you keep total control over how your app is built and hosted.",
  "codeExample": codeExample7
},
{
  "title": "Use Declarative if...",
  "concept": "Simplified Integration and Legacy Compatibility",
  "bullets": [
    "Need total simplicity",
    "Migrating from CRA/v6",
    "Using a separate data sync lib"
  ],
  "description": "The \"Declarative\" strategy is the recommended path when the primary goal of the project is maximum simplicity and minimum architectural overhead. It is specifically designed for developers migrating legacy applications from Create React App (CRA) or early versions of React Router v6 who wish to keep their existing component-based routing patterns intact. Furthermore, this strategy is ideal for applications that already rely on specialized third-party data synchronization libraries (like TanStack Query or SWR), as it allows the router to focus purely on navigation while the external library handles the complexities of state and data fetching.",
  "realWorldApplication": "A small-town history society maintaining a digital archive of old newspaper clippings. The site is currently a basic React application built years ago. To keep maintenance costs and complexity low, the society chooses the Declarative strategy. This allows them to quickly update their routing to v7 for security and compatibility without having to rewrite how their data is loaded or how their site is hosted on a simple static server.",
  "broadScaleUsage": "Architecturally, the Declarative approach serves as a \"decoupled router.\" By not forcing the developer to use integrated loaders or actions, it provides the greatest amount of flexibility for specialized UI patterns. In a large micro-frontend ecosystem, for example, individual teams might choose the Declarative strategy to ensure their specific module doesn't conflict with the global data-fetching strategies of the parent application, maintaining a strict \"separation of concerns\" between the URL and the data layer.",
  "narrowedApproach": "Technically, this strategy utilizes the `<BrowserRouter>` provider at the application root. Routes are declared nested within the UI tree using the `<Routes>` and `<Route>` components. This approach follows the standard React lifecycle; components are mounted, and then data is typically fetched within a `useEffect` hook or via a custom hook from a separate library. This \"rendering-first\" approach ensures that the application remains easy to debug and compatible with any standard React development environment without needing specialized Vite plugins or server-side logic.",
  "simpleTermsExplanation": "This code shows the \"Declarative\" way of doing things, which is the most straightforward approach. It feels very much like standard React. We use 'BrowserRouter' to wrap the whole app, and then 'Routes' to list our pages. Inside the 'ClippingView' component, we use the familiar 'useState' and 'useEffect' tools. When the page loads, the 'useEffect' starts a search for the newspaper clipping data. While it's searching, we show a \"Searching Archives...\" message. Once the data arrives, we update our state, and the page automatically updates to show the headline and text. This is the best choice if you want to keep your code simple and don't want to learn the more complex \"loader\" and \"action\" systems used in the other modes.",
  "codeExample": codeExample8
}
];

const demoSources = [
  { entryComponentName: 'FrameworkEvolutionDemo', source: String.raw`import React, { useRef, useState } from 'react';

const styles = {
  page: {
    fontFamily: "Arial, Helvetica, sans-serif",
    background: "#f4f7f9",
    color: "#1f2d3d",
    padding: "32px",
    lineHeight: 1.6,
  },
  slide: {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "32px",
    marginBottom: "40px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  title: {
    fontSize: "34px",
    fontWeight: "800",
    marginBottom: "20px",
    paddingLeft: "18px",
    borderLeft: "8px solid #3498db",
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
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "12px",
  },
  headerList: {
    margin: 0,
    paddingLeft: "24px",
  },
  sectionHeading: {
    fontSize: "22px",
    fontWeight: "800",
    color: "#2c3e50",
    marginTop: "26px",
    marginBottom: "12px",
  },
  paragraph: {
    fontSize: "16px",
    marginBottom: "16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "#eef6fb",
    borderRadius: "14px",
    padding: "20px",
    border: "1px solid #d6eaf8",
    marginTop: "16px",
  },
  code: {
    background: "#17202a",
    color: "#ecf0f1",
    padding: "22px",
    borderRadius: "14px",
    overflowX: "auto",
    whiteSpace: "pre-wrap",
    fontSize: "14px",
    lineHeight: 1.5,
  },
  action: {
    padding: "24px",
    border: "3px solid #3498db",
    borderRadius: "16px",
    background: "#ffffff",
    marginTop: "12px",
  },
  simple: {
    background: "#fff8e1",
    borderLeft: "8px solid #f1c40f",
    borderRadius: "12px",
    padding: "20px",
    marginTop: "18px",
  },
  demoButton: {
    background: "#3498db",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    padding: "10px 16px",
    cursor: "pointer",
    fontWeight: "700",
    marginRight: "10px",
    marginTop: "10px",
  },
  mutedButton: {
    background: "#ecf0f1",
    color: "#2c3e50",
    border: "1px solid #bdc3c7",
    borderRadius: "10px",
    padding: "10px 16px",
    cursor: "pointer",
    fontWeight: "700",
    marginRight: "10px",
    marginTop: "10px",
  },
  input: {
    width: "100%",
    minHeight: "70px",
    borderRadius: "10px",
    padding: "10px",
    border: "1px solid #bdc3c7",
    boxSizing: "border-box",
  },
};

// React Router logic focus for this demo:
// This example models the high-level evolution of React Router v7.
// The \`mode\` state acts like the routing strategy a team chooses for an app.
// The URL-looking string \`/artifacts/{artifactIdRef.current}\` represents the way
// route parameters describe which resource a page should load.
// In a real React Router v7 route module, that route parameter would be read by
// a loader through \`params.id\`, then the loader would fetch the matching artifact.
// Here, the artifact object is local mock data so students can focus on the
// route/data relationship without needing a real API server.
// Clicking the strategy buttons updates React state, which lets the preview show
// how the same route can be understood as a simple library route or as a fuller
// framework route with stronger data-loading support.
function FrameworkEvolutionDemo() {
  const artifactIdRef = useRef("artifact-1872");
  const [mode, setMode] = useState("Library Mode");

  const artifact = {
    title: "Hand-Carved Maritime Compass",
    description: "A preserved navigation tool from a regional coastal archive.",
    origin: "Harbor Workshop",
    year: "1872",
  };

  return (
    <div>
      <h3>Museum Route Preview</h3>
      <p>
        Active artifact route: <strong>/artifacts/{artifactIdRef.current}</strong>
      </p>
      <button style={styles.demoButton} onClick={() => setMode("Library Mode")}>Library Mode</button>
      <button style={styles.demoButton} onClick={() => setMode("Framework Mode")}>Framework Mode</button>
      <div style={styles.card}>
        <p><strong>Current Strategy:</strong> {mode}</p>
        <h4>{artifact.title}</h4>
        <p>{artifact.description}</p>
        <p>Origin: {artifact.origin}</p>
        <p>Date: {artifact.year}</p>
      </div>
    </div>
  );
}

export default FrameworkEvolutionDemo;` },
  { entryComponentName: 'ThreeModesDemo', source: String.raw`import React, { useRef, useState } from 'react';

const styles = {
  page: {
    fontFamily: "Arial, Helvetica, sans-serif",
    background: "#f4f7f9",
    color: "#1f2d3d",
    padding: "32px",
    lineHeight: 1.6,
  },
  slide: {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "32px",
    marginBottom: "40px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  title: {
    fontSize: "34px",
    fontWeight: "800",
    marginBottom: "20px",
    paddingLeft: "18px",
    borderLeft: "8px solid #3498db",
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
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "12px",
  },
  headerList: {
    margin: 0,
    paddingLeft: "24px",
  },
  sectionHeading: {
    fontSize: "22px",
    fontWeight: "800",
    color: "#2c3e50",
    marginTop: "26px",
    marginBottom: "12px",
  },
  paragraph: {
    fontSize: "16px",
    marginBottom: "16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "#eef6fb",
    borderRadius: "14px",
    padding: "20px",
    border: "1px solid #d6eaf8",
    marginTop: "16px",
  },
  code: {
    background: "#17202a",
    color: "#ecf0f1",
    padding: "22px",
    borderRadius: "14px",
    overflowX: "auto",
    whiteSpace: "pre-wrap",
    fontSize: "14px",
    lineHeight: 1.5,
  },
  action: {
    padding: "24px",
    border: "3px solid #3498db",
    borderRadius: "16px",
    background: "#ffffff",
    marginTop: "12px",
  },
  simple: {
    background: "#fff8e1",
    borderLeft: "8px solid #f1c40f",
    borderRadius: "12px",
    padding: "20px",
    marginTop: "18px",
  },
  demoButton: {
    background: "#3498db",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    padding: "10px 16px",
    cursor: "pointer",
    fontWeight: "700",
    marginRight: "10px",
    marginTop: "10px",
  },
  mutedButton: {
    background: "#ecf0f1",
    color: "#2c3e50",
    border: "1px solid #bdc3c7",
    borderRadius: "10px",
    padding: "10px 16px",
    cursor: "pointer",
    fontWeight: "700",
    marginRight: "10px",
    marginTop: "10px",
  },
  input: {
    width: "100%",
    minHeight: "70px",
    borderRadius: "10px",
    padding: "10px",
    border: "1px solid #bdc3c7",
    boxSizing: "border-box",
  },
};

// React Router logic focus for this demo:
// React Router v7 can be used in multiple modes, and this demo makes those modes
// visible through a simple state-driven selector.
// \`mode\` stores the currently selected strategy, similar to choosing how much of
// React Router's routing/data/framework system a project wants to adopt.
// The \`details\` object is a small route-strategy lookup table: each key is a mode,
// and each value explains what that mode adds to the application.
// Mapping over \`Object.keys(details)\` mirrors the way route configuration often
// maps route definitions into UI links or navigation choices.
// The active button styling reinforces the idea that only one routing strategy is
// active at a time, even though all strategies are available to compare.
function ThreeModesDemo() {
  const [mode, setMode] = useState("Declarative");
  const details = {
    Declarative: "Basic URL matching and navigation.",
    Data: "Adds data loading, actions, and state management.",
    Framework: "The full battery experience via Vite plugin.",
  };

  return (
    <div>
      <h3>Woodworking Shop Mode Selector</h3>
      {Object.keys(details).map((item) => (
        <button key={item} style={mode === item ? styles.demoButton : styles.mutedButton} onClick={() => setMode(item)}>{item}</button>
      ))}
      <div style={styles.card}>
        <h4>{mode}</h4>
        <p>{details[mode]}</p>
      </div>
    </div>
  );
}

export default ThreeModesDemo;` },
  { entryComponentName: 'DeclarativeBasicsDemo', source: String.raw`import React, { useRef, useState } from 'react';

const styles = {
  page: {
    fontFamily: "Arial, Helvetica, sans-serif",
    background: "#f4f7f9",
    color: "#1f2d3d",
    padding: "32px",
    lineHeight: 1.6,
  },
  slide: {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "32px",
    marginBottom: "40px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  title: {
    fontSize: "34px",
    fontWeight: "800",
    marginBottom: "20px",
    paddingLeft: "18px",
    borderLeft: "8px solid #3498db",
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
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "12px",
  },
  headerList: {
    margin: 0,
    paddingLeft: "24px",
  },
  sectionHeading: {
    fontSize: "22px",
    fontWeight: "800",
    color: "#2c3e50",
    marginTop: "26px",
    marginBottom: "12px",
  },
  paragraph: {
    fontSize: "16px",
    marginBottom: "16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "#eef6fb",
    borderRadius: "14px",
    padding: "20px",
    border: "1px solid #d6eaf8",
    marginTop: "16px",
  },
  code: {
    background: "#17202a",
    color: "#ecf0f1",
    padding: "22px",
    borderRadius: "14px",
    overflowX: "auto",
    whiteSpace: "pre-wrap",
    fontSize: "14px",
    lineHeight: 1.5,
  },
  action: {
    padding: "24px",
    border: "3px solid #3498db",
    borderRadius: "16px",
    background: "#ffffff",
    marginTop: "12px",
  },
  simple: {
    background: "#fff8e1",
    borderLeft: "8px solid #f1c40f",
    borderRadius: "12px",
    padding: "20px",
    marginTop: "18px",
  },
  demoButton: {
    background: "#3498db",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    padding: "10px 16px",
    cursor: "pointer",
    fontWeight: "700",
    marginRight: "10px",
    marginTop: "10px",
  },
  mutedButton: {
    background: "#ecf0f1",
    color: "#2c3e50",
    border: "1px solid #bdc3c7",
    borderRadius: "10px",
    padding: "10px 16px",
    cursor: "pointer",
    fontWeight: "700",
    marginRight: "10px",
    marginTop: "10px",
  },
  input: {
    width: "100%",
    minHeight: "70px",
    borderRadius: "10px",
    padding: "10px",
    border: "1px solid #bdc3c7",
    boxSizing: "border-box",
  },
};

// React Router logic focus for this demo:
// Declarative routing is about connecting a URL path to a rendered UI screen.
// The \`route\` state simulates the browser URL because this small preview is not
// mounting a real BrowserRouter inside the editable sandbox.
// Clicking Home or Gallery is similar to using \`<Link to="/...">\` or \`navigate()\`.
// The conditional render checks the current route and chooses the matching screen,
// which is the same core idea that \`<Routes>\` and \`<Route>\` perform in React Router.
// This preview is intentionally simple: the important idea is that the URL state
// decides which component tree the user sees.
function DeclarativeBasicsDemo() {
  const [route, setRoute] = useState("/");

  return (
    <div>
      <h3>Mineral Collection Navigation</h3>
      <button style={styles.demoButton} onClick={() => setRoute("/")}>Home</button>
      <button style={styles.demoButton} onClick={() => setRoute("/gallery")}>Gallery</button>
      <div style={styles.card}>
        <p>Current URL: <strong>{route}</strong></p>
        {route === "/" ? (
          <div>
            <h4>Mineral Collection Home</h4>
            <button style={styles.demoButton} onClick={() => setRoute("/gallery")}>Go to Gallery</button>
          </div>
        ) : (
          <div>
            <h4>Local Mineral Gallery</h4>
            <ul>
              <li>Quartz</li>
              <li>Feldspar</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeclarativeBasicsDemo;` },
  { entryComponentName: 'DataEnhancedPerformanceDemo', source: String.raw`import React, { useRef, useState } from 'react';

const styles = {
  page: {
    fontFamily: "Arial, Helvetica, sans-serif",
    background: "#f4f7f9",
    color: "#1f2d3d",
    padding: "32px",
    lineHeight: 1.6,
  },
  slide: {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "32px",
    marginBottom: "40px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  title: {
    fontSize: "34px",
    fontWeight: "800",
    marginBottom: "20px",
    paddingLeft: "18px",
    borderLeft: "8px solid #3498db",
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
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "12px",
  },
  headerList: {
    margin: 0,
    paddingLeft: "24px",
  },
  sectionHeading: {
    fontSize: "22px",
    fontWeight: "800",
    color: "#2c3e50",
    marginTop: "26px",
    marginBottom: "12px",
  },
  paragraph: {
    fontSize: "16px",
    marginBottom: "16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "#eef6fb",
    borderRadius: "14px",
    padding: "20px",
    border: "1px solid #d6eaf8",
    marginTop: "16px",
  },
  code: {
    background: "#17202a",
    color: "#ecf0f1",
    padding: "22px",
    borderRadius: "14px",
    overflowX: "auto",
    whiteSpace: "pre-wrap",
    fontSize: "14px",
    lineHeight: 1.5,
  },
  action: {
    padding: "24px",
    border: "3px solid #3498db",
    borderRadius: "16px",
    background: "#ffffff",
    marginTop: "12px",
  },
  simple: {
    background: "#fff8e1",
    borderLeft: "8px solid #f1c40f",
    borderRadius: "12px",
    padding: "20px",
    marginTop: "18px",
  },
  demoButton: {
    background: "#3498db",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    padding: "10px 16px",
    cursor: "pointer",
    fontWeight: "700",
    marginRight: "10px",
    marginTop: "10px",
  },
  mutedButton: {
    background: "#ecf0f1",
    color: "#2c3e50",
    border: "1px solid #bdc3c7",
    borderRadius: "10px",
    padding: "10px 16px",
    cursor: "pointer",
    fontWeight: "700",
    marginRight: "10px",
    marginTop: "10px",
  },
  input: {
    width: "100%",
    minHeight: "70px",
    borderRadius: "10px",
    padding: "10px",
    border: "1px solid #bdc3c7",
    boxSizing: "border-box",
  },
};

// React Router logic focus for this demo:
// Data mode moves data loading closer to the route definition.
// \`plotId\` simulates a dynamic route parameter like \`/forest-plot/:id\`.
// The \`plotData\` object stands in for loader data that would normally come from
// a route loader before the screen renders.
// Selecting a plot changes the route-like parameter, and the UI immediately reads
// the matching data object, similar to how \`useLoaderData()\` gives a component
// the data that belongs to the active route.
// The \`note\` state models form/action behavior: in real Data Router code, a form
// submit could call an \`action\` function to write data back to the server.
function DataEnhancedPerformanceDemo() {
  const [plotId, setPlotId] = useState("plot-12");
  const [note, setNote] = useState("");
  const plotData = {
    "plot-12": { name: "North Ridge Plot", soilPh: "6.4", moisture: "42%" },
    "plot-18": { name: "Creekside Plot", soilPh: "5.9", moisture: "58%" },
  };
  const plot = plotData[plotId];

  return (
    <div>
      <h3>Forest Research Station</h3>
      <button style={styles.demoButton} onClick={() => setPlotId("plot-12")}>Load Plot 12</button>
      <button style={styles.demoButton} onClick={() => setPlotId("plot-18")}>Load Plot 18</button>
      <div style={styles.card}>
        <h4>{plot.name}</h4>
        <p>Soil PH: {plot.soilPh}</p>
        <p>Soil Moisture: {plot.moisture}</p>
        <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Add field note..." style={styles.input} />
        <p>Saved note preview: <strong>{note || "No note yet"}</strong></p>
      </div>
    </div>
  );
}

export default DataEnhancedPerformanceDemo;` },
  { entryComponentName: 'FrameworkFullExperienceDemo', source: String.raw`import React, { useRef, useState } from 'react';

const styles = {
  page: {
    fontFamily: "Arial, Helvetica, sans-serif",
    background: "#f4f7f9",
    color: "#1f2d3d",
    padding: "32px",
    lineHeight: 1.6,
  },
  slide: {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "32px",
    marginBottom: "40px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  title: {
    fontSize: "34px",
    fontWeight: "800",
    marginBottom: "20px",
    paddingLeft: "18px",
    borderLeft: "8px solid #3498db",
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
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "12px",
  },
  headerList: {
    margin: 0,
    paddingLeft: "24px",
  },
  sectionHeading: {
    fontSize: "22px",
    fontWeight: "800",
    color: "#2c3e50",
    marginTop: "26px",
    marginBottom: "12px",
  },
  paragraph: {
    fontSize: "16px",
    marginBottom: "16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "#eef6fb",
    borderRadius: "14px",
    padding: "20px",
    border: "1px solid #d6eaf8",
    marginTop: "16px",
  },
  code: {
    background: "#17202a",
    color: "#ecf0f1",
    padding: "22px",
    borderRadius: "14px",
    overflowX: "auto",
    whiteSpace: "pre-wrap",
    fontSize: "14px",
    lineHeight: 1.5,
  },
  action: {
    padding: "24px",
    border: "3px solid #3498db",
    borderRadius: "16px",
    background: "#ffffff",
    marginTop: "12px",
  },
  simple: {
    background: "#fff8e1",
    borderLeft: "8px solid #f1c40f",
    borderRadius: "12px",
    padding: "20px",
    marginTop: "18px",
  },
  demoButton: {
    background: "#3498db",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    padding: "10px 16px",
    cursor: "pointer",
    fontWeight: "700",
    marginRight: "10px",
    marginTop: "10px",
  },
  mutedButton: {
    background: "#ecf0f1",
    color: "#2c3e50",
    border: "1px solid #bdc3c7",
    borderRadius: "10px",
    padding: "10px 16px",
    cursor: "pointer",
    fontWeight: "700",
    marginRight: "10px",
    marginTop: "10px",
  },
  input: {
    width: "100%",
    minHeight: "70px",
    borderRadius: "10px",
    padding: "10px",
    border: "1px solid #bdc3c7",
    boxSizing: "border-box",
  },
};

// React Router logic focus for this demo:
// Framework mode treats routes as complete modules that can own their data, UI,
// error handling, and server/client behavior.
// The \`isbn\` state simulates a route parameter such as \`/catalog/:isbn\`.
// The \`books\` object acts like loader data returned for the selected parameter.
// In a real framework route file, the loader would fetch the book before the
// component renders, and the component would receive typed loader data.
// Toggling between books shows how a single route module can respond to different
// parameters while keeping the same page structure.
function FrameworkFullExperienceDemo() {
  const [isbn, setIsbn] = useState("978-0-ARCHIVE");
  const books = {
    "978-0-ARCHIVE": { title: "Children's Atlas of Local Rivers", author: "Mira Cole", available: true },
    "978-0-HISTORY": { title: "Regional Library Field Notes", author: "Jon Bell", available: false },
  };
  const book = books[isbn];

  return (
    <div>
      <h3>Public Library Catalog Route Module</h3>
      <button style={styles.demoButton} onClick={() => setIsbn("978-0-ARCHIVE")}>Children's Book</button>
      <button style={styles.demoButton} onClick={() => setIsbn("978-0-HISTORY")}>History Book</button>
      <div style={styles.card}>
        <p>Route parameter: <strong>{isbn}</strong></p>
        <h4>{book.title}</h4>
        <p>By: {book.author}</p>
        <p>Status: {book.available ? "In Stock" : "On Loan"}</p>
      </div>
    </div>
  );
}

export default FrameworkFullExperienceDemo;` },
  { entryComponentName: 'PickingFrameworkDemo', source: String.raw`import React, { useRef, useState } from 'react';

const styles = {
  page: {
    fontFamily: "Arial, Helvetica, sans-serif",
    background: "#f4f7f9",
    color: "#1f2d3d",
    padding: "32px",
    lineHeight: 1.6,
  },
  slide: {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "32px",
    marginBottom: "40px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  title: {
    fontSize: "34px",
    fontWeight: "800",
    marginBottom: "20px",
    paddingLeft: "18px",
    borderLeft: "8px solid #3498db",
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
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "12px",
  },
  headerList: {
    margin: 0,
    paddingLeft: "24px",
  },
  sectionHeading: {
    fontSize: "22px",
    fontWeight: "800",
    color: "#2c3e50",
    marginTop: "26px",
    marginBottom: "12px",
  },
  paragraph: {
    fontSize: "16px",
    marginBottom: "16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "#eef6fb",
    borderRadius: "14px",
    padding: "20px",
    border: "1px solid #d6eaf8",
    marginTop: "16px",
  },
  code: {
    background: "#17202a",
    color: "#ecf0f1",
    padding: "22px",
    borderRadius: "14px",
    overflowX: "auto",
    whiteSpace: "pre-wrap",
    fontSize: "14px",
    lineHeight: 1.5,
  },
  action: {
    padding: "24px",
    border: "3px solid #3498db",
    borderRadius: "16px",
    background: "#ffffff",
    marginTop: "12px",
  },
  simple: {
    background: "#fff8e1",
    borderLeft: "8px solid #f1c40f",
    borderRadius: "12px",
    padding: "20px",
    marginTop: "18px",
  },
  demoButton: {
    background: "#3498db",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    padding: "10px 16px",
    cursor: "pointer",
    fontWeight: "700",
    marginRight: "10px",
    marginTop: "10px",
  },
  mutedButton: {
    background: "#ecf0f1",
    color: "#2c3e50",
    border: "1px solid #bdc3c7",
    borderRadius: "10px",
    padding: "10px 16px",
    cursor: "pointer",
    fontWeight: "700",
    marginRight: "10px",
    marginTop: "10px",
  },
  input: {
    width: "100%",
    minHeight: "70px",
    borderRadius: "10px",
    padding: "10px",
    border: "1px solid #bdc3c7",
    boxSizing: "border-box",
  },
};

// React Router logic focus for this demo:
// Framework strategy is useful when a product needs routing, data loading, pending
// UI, error boundaries, and build integration to work together as one system.
// \`selectedRoute\` behaves like the active route segment in a transit portal.
// The \`routes\` array is local mock data that stands in for data a framework loader
// might fetch from a city API before rendering the route.
// \`routes.find(...)\` derives the active route record from the selected route name,
// which is similar to reading loader data for the currently matched route.
// The nav buttons demonstrate route-like navigation without mounting a full router.
function PickingFrameworkDemo() {
  const [selectedRoute, setSelectedRoute] = useState("Blue Line");
  const routes = [
    { id: "blue", name: "Blue Line", status: "On schedule" },
    { id: "green", name: "Green Loop", status: "Minor delay" },
    { id: "gold", name: "Gold Express", status: "On schedule" },
  ];
  const active = routes.find((route) => route.name === selectedRoute);

  return (
    <div>
      <h3>City Transit Transparency Portal</h3>
      <nav>
        {routes.map((route) => (
          <button key={route.id} style={selectedRoute === route.name ? styles.demoButton : styles.mutedButton} onClick={() => setSelectedRoute(route.name)}>{route.name}</button>
        ))}
      </nav>
      <div style={styles.card}>
        <h4>{active.name}</h4>
        <p>{active.status}</p>
        <p>Select a route to view real-time data.</p>
      </div>
    </div>
  );
}

export default PickingFrameworkDemo;` },
  { entryComponentName: 'PickingDataDemo', source: String.raw`import React, { useRef, useState } from 'react';

const styles = {
  page: {
    fontFamily: "Arial, Helvetica, sans-serif",
    background: "#f4f7f9",
    color: "#1f2d3d",
    padding: "32px",
    lineHeight: 1.6,
  },
  slide: {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "32px",
    marginBottom: "40px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  title: {
    fontSize: "34px",
    fontWeight: "800",
    marginBottom: "20px",
    paddingLeft: "18px",
    borderLeft: "8px solid #3498db",
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
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "12px",
  },
  headerList: {
    margin: 0,
    paddingLeft: "24px",
  },
  sectionHeading: {
    fontSize: "22px",
    fontWeight: "800",
    color: "#2c3e50",
    marginTop: "26px",
    marginBottom: "12px",
  },
  paragraph: {
    fontSize: "16px",
    marginBottom: "16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "#eef6fb",
    borderRadius: "14px",
    padding: "20px",
    border: "1px solid #d6eaf8",
    marginTop: "16px",
  },
  code: {
    background: "#17202a",
    color: "#ecf0f1",
    padding: "22px",
    borderRadius: "14px",
    overflowX: "auto",
    whiteSpace: "pre-wrap",
    fontSize: "14px",
    lineHeight: 1.5,
  },
  action: {
    padding: "24px",
    border: "3px solid #3498db",
    borderRadius: "16px",
    background: "#ffffff",
    marginTop: "12px",
  },
  simple: {
    background: "#fff8e1",
    borderLeft: "8px solid #f1c40f",
    borderRadius: "12px",
    padding: "20px",
    marginTop: "18px",
  },
  demoButton: {
    background: "#3498db",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    padding: "10px 16px",
    cursor: "pointer",
    fontWeight: "700",
    marginRight: "10px",
    marginTop: "10px",
  },
  mutedButton: {
    background: "#ecf0f1",
    color: "#2c3e50",
    border: "1px solid #bdc3c7",
    borderRadius: "10px",
    padding: "10px 16px",
    cursor: "pointer",
    fontWeight: "700",
    marginRight: "10px",
    marginTop: "10px",
  },
  input: {
    width: "100%",
    minHeight: "70px",
    borderRadius: "10px",
    padding: "10px",
    border: "1px solid #bdc3c7",
    boxSizing: "border-box",
  },
};

// React Router logic focus for this demo:
// Data strategy is a good fit when a project wants route-level loaders/actions but
// still wants control over its custom build and server infrastructure.
// \`sampleId\` simulates a dynamic route parameter like \`/lab-results/:sampleId\`.
// The \`samples\` object represents data returned by a loader after checking the
// current route parameter and user permissions.
// The \`analysis\` variable is derived from the active sample ID, similar to how a
// route component reads \`useLoaderData()\` after the loader completes.
// Rendering \`analysis.results.map(...)\` shows how route data becomes UI once the
// matched route has provided the correct server-state payload.
function PickingDataDemo() {
  const [sampleId, setSampleId] = useState("S-104");
  const samples = {
    "S-104": { id: "S-104", results: [{ compound: "Glucose", value: 14 }, { compound: "Protein", value: 7 }] },
    "S-220": { id: "S-220", results: [{ compound: "Sodium", value: 11 }, { compound: "Potassium", value: 5 }] },
  };
  const analysis = samples[sampleId];

  return (
    <div>
      <h3>Medical Laboratory Sample Tracking</h3>
      <button style={styles.demoButton} onClick={() => setSampleId("S-104")}>Sample S-104</button>
      <button style={styles.demoButton} onClick={() => setSampleId("S-220")}>Sample S-220</button>
      <article style={styles.card}>
        <header><strong>Sample ID: {analysis.id}</strong></header>
        <section>
          <h4>Chemical Breakdown</h4>
          <ul>
            {analysis.results.map((result) => (
              <li key={result.compound}>{result.compound}: {result.value}%</li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
}

export default PickingDataDemo;` },
  { entryComponentName: 'UseDeclarativeDemo', source: String.raw`import React, { useRef, useState } from 'react';

const styles = {
  page: {
    fontFamily: "Arial, Helvetica, sans-serif",
    background: "#f4f7f9",
    color: "#1f2d3d",
    padding: "32px",
    lineHeight: 1.6,
  },
  slide: {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "32px",
    marginBottom: "40px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  title: {
    fontSize: "34px",
    fontWeight: "800",
    marginBottom: "20px",
    paddingLeft: "18px",
    borderLeft: "8px solid #3498db",
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
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "12px",
  },
  headerList: {
    margin: 0,
    paddingLeft: "24px",
  },
  sectionHeading: {
    fontSize: "22px",
    fontWeight: "800",
    color: "#2c3e50",
    marginTop: "26px",
    marginBottom: "12px",
  },
  paragraph: {
    fontSize: "16px",
    marginBottom: "16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "#eef6fb",
    borderRadius: "14px",
    padding: "20px",
    border: "1px solid #d6eaf8",
    marginTop: "16px",
  },
  code: {
    background: "#17202a",
    color: "#ecf0f1",
    padding: "22px",
    borderRadius: "14px",
    overflowX: "auto",
    whiteSpace: "pre-wrap",
    fontSize: "14px",
    lineHeight: 1.5,
  },
  action: {
    padding: "24px",
    border: "3px solid #3498db",
    borderRadius: "16px",
    background: "#ffffff",
    marginTop: "12px",
  },
  simple: {
    background: "#fff8e1",
    borderLeft: "8px solid #f1c40f",
    borderRadius: "12px",
    padding: "20px",
    marginTop: "18px",
  },
  demoButton: {
    background: "#3498db",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    padding: "10px 16px",
    cursor: "pointer",
    fontWeight: "700",
    marginRight: "10px",
    marginTop: "10px",
  },
  mutedButton: {
    background: "#ecf0f1",
    color: "#2c3e50",
    border: "1px solid #bdc3c7",
    borderRadius: "10px",
    padding: "10px 16px",
    cursor: "pointer",
    fontWeight: "700",
    marginRight: "10px",
    marginTop: "10px",
  },
  input: {
    width: "100%",
    minHeight: "70px",
    borderRadius: "10px",
    padding: "10px",
    border: "1px solid #bdc3c7",
    boxSizing: "border-box",
  },
};

// React Router logic focus for this demo:
// Declarative mode is best when navigation should stay simple and data fetching
// can remain inside React components or a separate library such as TanStack Query.
// \`clippingId\` simulates a route parameter or selected URL segment.
// The \`clippings\` object represents data that might be loaded by a component-level
// effect or by a separate data-fetching library after the route renders.
// Choosing a clipping updates local state, which stands in for navigating to a
// different URL-backed resource.
// This keeps the router focused on screen selection while the component owns the
// data-loading style.
function UseDeclarativeDemo() {
  const [clippingId, setClippingId] = useState("clip-1934");
  const clippings = {
    "clip-1934": {
      headline: "Town Square Fountain Opens",
      publishDate: "May 14, 1934",
      text: "Residents gathered to celebrate the dedication of the new fountain.",
    },
    "clip-1948": {
      headline: "Library Adds New Reading Room",
      publishDate: "October 2, 1948",
      text: "The town library expanded with a quiet reading room for local students.",
    },
  };
  const clipping = clippings[clippingId];

  return (
    <div>
      <h3>Small-Town History Society Archive</h3>
      <button style={styles.demoButton} onClick={() => setClippingId("clip-1934")}>View 1934 Clipping</button>
      <button style={styles.demoButton} onClick={() => setClippingId("clip-1948")}>View 1948 Clipping</button>
      <article style={styles.card}>
        <h4>{clipping.headline}</h4>
        <p>Date: {clipping.publishDate}</p>
        <div>{clipping.text}</div>
      </article>
    </div>
  );
}

export default UseDeclarativeDemo;` },
]


const lectureSectionTitles = slides.map((slide) => slide.title)
const lectureSections = slides.map((slide, index) => {
  const demo = demoSources[index]
  return (
    <SectionWrapper
      key={slide.title}
      title={slide.title}
      concept={slide.concept}
      bullets={slide.bullets}
      description={slide.description}
      realWorldApplication={slide.realWorldApplication}
      broadScaleUsage={slide.broadScaleUsage}
      narrowedApproach={slide.narrowedApproach}
      demoSource={demo.source}
      entryComponentName={demo.entryComponentName}
      simpleTermsExplanation={slide.simpleTermsExplanation}
    />
  )
})

export default function Week05IntroReactRouterMasterclass({
  onBack,
  onSectionChange,
  title = 'Introduction to React Router',
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [sectionsCollapsed, setSectionsCollapsed] = useState(false)
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
          ← Back to Week 05
        </button>

        <div className="sm-toolbar-copy">
          <p className="sm-kicker">AD312 • Week 05 • Lecture 02</p>
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

