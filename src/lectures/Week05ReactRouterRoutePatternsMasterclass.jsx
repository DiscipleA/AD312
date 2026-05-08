import { useEffect, useMemo, useRef, useState } from 'react'
import '../styles/stateMasterclass.css'
import EditableCodeRunner from '../components/interactive-code/EditableCodeRunner'
import CodeBlock from '../components/CodeBlock'

const styles = {
  page: {
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    background: "#f4f6f8",
    color: "#1f2d3d",
    padding: "32px",
    lineHeight: 1.6,
  },
  slide: {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "32px",
    marginBottom: "36px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
  },
  title: {
    fontSize: "34px",
    fontWeight: 800,
    margin: "0 0 20px",
    paddingLeft: "18px",
    borderLeft: "8px solid #3498db",
    color: "#2c3e50",
  },
  slideHeader: {
    background: "#2c3e50",
    color: "#ffffff",
    padding: "22px",
    borderRadius: "14px",
    marginBottom: "24px",
  },
  slideHeaderTitle: {
    fontSize: "22px",
    fontWeight: 800,
    margin: "0 0 12px",
  },
  bulletList: {
    margin: 0,
    paddingLeft: "22px",
  },
  bullet: {
    marginBottom: "8px",
  },
  sectionLabel: {
    fontSize: "20px",
    fontWeight: 800,
    color: "#2c3e50",
    margin: "22px 0 10px",
  },
  paragraph: {
    fontSize: "16px",
    margin: "0 0 14px",
  },
  twoColumn: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "18px",
    marginTop: "18px",
  },
  card: {
    border: "1px solid #d9e2ec",
    borderRadius: "14px",
    padding: "20px",
    background: "#f8fafc",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: 800,
    color: "#34495e",
    margin: "0 0 10px",
  },
  narrowed: {
    background: "#eef7ff",
    borderLeft: "6px solid #3498db",
    borderRadius: "12px",
    padding: "18px",
  },
  codeBlock: {
    background: "#111827",
    color: "#f9fafb",
    padding: "22px",
    borderRadius: "14px",
    overflowX: "auto",
    whiteSpace: "pre",
    fontFamily:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace",
    fontSize: "14px",
  },
  codeAction: {
    padding: "22px",
    border: "3px solid #3498db",
    borderRadius: "16px",
    background: "#ffffff",
    marginTop: "10px",
  },
  simpleBox: {
    background: "#fff7e6",
    border: "1px solid #f1c27d",
    borderRadius: "14px",
    padding: "20px",
    marginTop: "12px",
  },
  demoButton: {
    border: "none",
    background: "#3498db",
    color: "#ffffff",
    padding: "10px 14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 700,
  },
  secondaryButton: {
    border: "1px solid #3498db",
    background: "#ffffff",
    color: "#3498db",
    padding: "10px 14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 700,
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #cbd5e1",
    borderRadius: "10px",
    fontSize: "15px",
    boxSizing: "border-box",
  },
  demoPanel: {
    border: "1px solid #d9e2ec",
    borderRadius: "14px",
    padding: "18px",
    background: "#f8fafc",
  },
  tag: {
    display: "inline-block",
    background: "#e8f4fd",
    color: "#2c3e50",
    padding: "6px 10px",
    borderRadius: "999px",
    margin: "4px",
    fontWeight: 700,
    fontSize: "13px",
  },
  recap: {
    background: "#2c3e50",
    color: "#ffffff",
    borderRadius: "18px",
    padding: "34px",
    marginTop: "40px",
  },
  recapTitle: {
    fontSize: "38px",
    fontWeight: 900,
    margin: "0 0 8px",
  },
  recapSubtitle: {
    fontSize: "18px",
    color: "#dbeafe",
    margin: "0 0 24px",
  },
  recapGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "18px",
  },
  recapBlock: {
    background: "#34495e",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: "14px",
    padding: "18px",
  },
  recapBlockTitle: {
    fontSize: "18px",
    fontWeight: 800,
    color: "#7dd3fc",
    margin: "0 0 8px",
  },
  recapTable: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "24px",
    background: "#ffffff",
    color: "#1f2d3d",
    borderRadius: "14px",
    overflow: "hidden",
  },
  recapTh: {
    textAlign: "left",
    padding: "14px",
    background: "#3498db",
    color: "#ffffff",
    border: "1px solid #2980b9",
  },
  recapTd: {
    padding: "14px",
    border: "1px solid #d9e2ec",
    verticalAlign: "top",
  },
  bestPractice: {
    marginTop: "24px",
    padding: "22px",
    background: "#102a43",
    border: "2px solid #7dd3fc",
    borderRadius: "14px",
  },
};

function SlideHeader({ title, bullets }) {
  return (
    <div style={styles.slideHeader}>
      <h2 style={styles.slideHeaderTitle}>{title}</h2>
      <ul style={styles.bulletList}>
        {bullets.map((bullet, index) => (
          <li key={`${title}-bullet-${index}`} style={styles.bullet}>
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  )
}

function RecapSection() {
  const rows = [
    {
      concept: "Route Definition and Mapping",
      simple:
        "The code starts by importing two specific tools from the react-router library: 'route', which is a helper function to create a single route entry, and 'RouteConfig', which is a set of rules (a type) that our list must follow.",
    },
    {
      concept: "File System Routing Integration",
      simple:
        "This code combines two different ways of building a website map.",
    },
    {
      concept: "Component and Data Integration",
      simple: "This file is the \"brain\" for a specific page.",
    },
    {
      concept: "Hierarchical Route Structure",
      simple: "This setup creates a \"box within a box\" structure.",
    },
    {
      concept: "Path Namespacing and Organization",
      simple:
        "The prefix tool is like a \"Copy-Paste\" assistant for your website addresses.",
    },
    {
      concept: "URL Variable Capture",
      simple:
        "A dynamic segment is like a \"Fill-in-the-Blank\" part of a website address.",
    },
    {
      concept: "Complex URL Variable Mapping",
      simple:
        "Multiple dynamic segments are like having a \"Multi-Level Fill-in-the-Blank\" address.",
    },
    {
      concept: "Flexible URL Pattern Matching",
      simple:
        "An optional segment is like a \"Maybe\" part of a website address.",
    },
    {
      concept: "Catch-all Route Matching",
      simple:
        "A splat route is like a \"Giant Net\" for your website address.",
    },
    {
      concept: "Global Error and Fallback Handling",
      simple:
        "The catch-all splat is like the \"Else\" at the end of a long list of instructions.",
    },
  ];

  return (
    <section style={styles.recap}>
      <h1 style={styles.recapTitle}>Recap</h1>
      <p style={styles.recapSubtitle}>
        Configuring Routes, Route Modules, Nested Routes, Route Prefixes, Dynamic Segments, Optional Segments, Splats, and Splat - catchall
      </p>

      <div style={styles.recapGrid}>
        <div style={styles.recapBlock}>
          <h3 style={styles.recapBlockTitle}>Route Structure</h3>
          <p style={styles.paragraph}>
            Routes are configured in app/routes.ts. Each route has two required parts: a URL pattern to match the URL and a file path to the route module that defines its behavior.
          </p>
        </div>
        <div style={styles.recapBlock}>
          <h3 style={styles.recapBlockTitle}>Route Behavior</h3>
          <p style={styles.paragraph}>
            The files referenced in routes.ts define each route's behavior.
          </p>
        </div>
        <div style={styles.recapBlock}>
          <h3 style={styles.recapBlockTitle}>Route Organization</h3>
          <p style={styles.paragraph}>
            Routes can be nested inside parents routes. You can add a path prefix. No need to introduce a parent route. Doesn’t introduce a new route into the route tree. Modifies the paths of its children.
          </p>
        </div>
        <div style={styles.recapBlock}>
          <h3 style={styles.recapBlockTitle}>Route Matching</h3>
          <p style={styles.paragraph}>
            Dynamic segments starts with :. Optional segments use adding a ? to the end of the segment. Splats are also known as "catchall" and "star" segments.
          </p>
        </div>
      </div>

      <table style={styles.recapTable}>
        <thead>
          <tr>
            <th style={styles.recapTh}>Concept</th>
            <th style={styles.recapTh}>Simple Terms</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.concept}>
              <td style={styles.recapTd}>{row.concept}</td>
              <td style={styles.recapTd}>{row.simple}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.bestPractice}>
        <h3 style={{ ...styles.recapBlockTitle, marginTop: 0 }}>
          Final best practice block
        </h3>
        <p style={styles.paragraph}>
          Use app/routes.ts as the Master Index, use Route Modules as the "brain" for each page, use nested routes when layout needs to stay in place, use prefixes when only the URL needs to be organized, use dynamic and optional segments when the URL needs variables, and place the splat catchall at the very end so the application remains in control even when a user navigates to a broken or typed link.
        </p>
      </div>
    </section>
  );
}


function insertTeachingCommentAfterFunctionOpen(code, functionName, comment) {
  const signature = `function ${functionName}() {`

  if (!code.includes(signature)) return code
  if (code.includes(`ROUTER DEMO TEACHING NOTES: ${functionName}`)) return code

  return code.replace(signature, `${signature}
${comment}`)
}

function polishReactRouterDemoCode(code, entryComponentName) {
  const demoComments = {
    ConfiguringRoutesDemo: `  /*
   * ROUTER DEMO TEACHING NOTES: ConfiguringRoutesDemo
   *
   * This demo focuses on the most direct mental model for React Router:
   * a route table connects URL patterns to route modules.
   *
   * In a real Remix / React Router framework project, route configuration
   * is how the app answers this question:
   *
   *   "When the browser is at this URL, which file should render?"
   *
   * The route path is not just a label. It is a matching rule. When the
   * current URL matches that rule, React Router loads the matching route
   * module and renders its component.
   *
   * In this demo, selectedPath acts like the current browser location.
   * The routes object acts like a small route manifest. Clicking a button
   * simulates navigation by changing selectedPath.
   */`,

    FileNamingRoutesDemo: `  /*
   * ROUTER DEMO TEACHING NOTES: FileNamingRoutesDemo
   *
   * This demo shows file-based routing. Instead of writing every route by
   * hand, the project structure helps describe the URL structure.
   *
   * The important idea:
   *
   *   file path -> route path
   *
   * For example, a file named routes/about.tsx can become /about.
   * A home or index file can become the root route.
   *
   * File naming conventions reduce repetitive route configuration, but
   * students still need to understand the route that each file represents.
   * The file is not magic by itself. It becomes powerful because React Router
   * knows how to translate the convention into a route definition.
   */`,

    RouteModulesDemo: `  /*
   * ROUTER DEMO TEACHING NOTES: RouteModulesDemo
   *
   * A route module is the file that owns one route's behavior.
   *
   * In Remix-style React Router, a route module may contain more than just
   * a visual component. It can also define data loading, form actions,
   * metadata, error handling, and boundaries for that route.
   *
   * In this simplified browser-safe demo, teamId acts like a URL param from
   * a route such as /teams/:teamId. The teams object stands in for data that
   * a real loader might fetch from an API, database, or server function.
   *
   * The key teaching point is that the route module becomes the single place
   * where a screen's URL, data needs, and UI behavior come together.
   */`,

    NestedRoutesDemo: `  /*
   * ROUTER DEMO TEACHING NOTES: NestedRoutesDemo
   *
   * Nested routes let a parent route keep shared layout on screen while child
   * routes change inside that layout.
   *
   * This is why dashboards, account pages, docs sections, and admin panels
   * often use nested routing. The parent route owns the stable frame:
   *
   *   sidebar, tabs, header, wrapper, shared context
   *
   * The child route owns the changing content.
   *
   * In real React Router code, the parent route renders an <Outlet />.
   * The <Outlet /> is the placeholder where the matched child route appears.
   * Here, active simulates which child route is currently selected.
   */`,

    RoutePrefixesDemo: `  /*
   * ROUTER DEMO TEACHING NOTES: RoutePrefixesDemo
   *
   * A route prefix groups related URLs under the same starting path.
   *
   * For example:
   *
   *   /settings/profile
   *   /settings/notifications
   *   /settings/privacy
   *
   * The prefix is /settings. The child routes are profile, notifications,
   * and privacy.
   *
   * A prefix is useful when routes belong to the same URL namespace, even
   * when they do not need a new shared visual layout. Students should notice
   * the distinction between grouping URLs and nesting visual UI.
   */`,

    DynamicSegmentsDemo: `  /*
   * ROUTER DEMO TEACHING NOTES: DynamicSegmentsDemo
   *
   * A dynamic segment captures part of the URL and gives it a name.
   *
   * Route pattern:
   *
   *   /inventory/:itemId
   *
   * Example URL:
   *
   *   /inventory/camera-99
   *
   * Captured params:
   *
   *   { itemId: "camera-99" }
   *
   * This lets one route module handle many detail pages. Instead of creating
   * a separate route for every product, the route captures the changing part
   * of the URL and uses it to load or display the correct item.
   */`,

    MultipleDynamicSegmentsDemo: `  /*
   * ROUTER DEMO TEACHING NOTES: MultipleDynamicSegmentsDemo
   *
   * A route can capture more than one dynamic value.
   *
   * Route pattern:
   *
   *   /stores/:storeId/items/:sku
   *
   * Example URL:
   *
   *   /stores/store-42/items/sku-1001
   *
   * Captured params:
   *
   *   {
   *     storeId: "store-42",
   *     sku: "sku-1001"
   *   }
   *
   * This pattern is helpful when a resource is identified by more than one
   * URL value. The page might need both the store id and the item sku to know
   * exactly what data to fetch or display.
   */`,

    OptionalSegmentsDemo: `  /*
   * ROUTER DEMO TEACHING NOTES: OptionalSegmentsDemo
   *
   * Optional segments let a route match URLs with or without a specific part.
   *
   * A common example is a language or locale prefix:
   *
   *   /docs/intro
   *   /fr/docs/intro
   *   /es/docs/intro
   *
   * The language segment may be present, but it does not have to be.
   *
   * The important detail is that optional does not mean ignored. The app still
   * needs a stable fallback when the segment is missing. In this demo, "en"
   * becomes the default language when no language segment is selected.
   */`,

    SplatsDemo: `  /*
   * ROUTER DEMO TEACHING NOTES: SplatsDemo
   *
   * A splat captures the rest of a URL after a known base path.
   *
   * Route pattern:
   *
   *   /files/*
   *
   * Example URL:
   *
   *   /files/images/summer/beach.jpg
   *
   * Captured splat:
   *
   *   images/summer/beach.jpg
   *
   * Unlike a normal dynamic segment, a splat can include slashes. That makes
   * it useful for file browsers, documentation paths, archives, nested folders,
   * and any case where the remaining path depth is flexible.
   */`,

    SplatCatchallDemo: `  /*
   * ROUTER DEMO TEACHING NOTES: SplatCatchallDemo
   *
   * A catch-all splat route is often used as the final fallback route.
   *
   * If no earlier route matches the URL, the catch-all route can render a
   * friendly 404 page instead of leaving the user with a confusing blank
   * screen.
   *
   * The order and specificity of routes matters. Specific routes should match
   * first. The catch-all should behave like the safety net at the end of the
   * route tree.
   *
   * In this demo, knownRoutes represents paths that matched earlier. If the
   * current path is not known, the catch-all behavior takes over.
   */`,
  }

  const comment = demoComments[entryComponentName]
  if (!comment) return code

  return insertTeachingCommentAfterFunctionOpen(code, entryComponentName, comment)
}

function getStaticRoutePatternReferenceCode(title, codeExample) {
  const referenceComments = {
    'Configuring Routes': `/*
 * STATIC ROUTE PATTERN REFERENCE: Configuring Routes
 *
 * This compact example shows the central route configuration idea.
 *
 * Read it as:
 *
 *   URL pattern -> route module file
 *
 * The route helper defines which route module should own a specific URL.
 * This smaller snippet is not trying to show the full UI. It is here so
 * students can compare the clean route definition with the larger runnable
 * demo above.
 */`,

    'Routes via file naming conventions': `/*
 * STATIC ROUTE PATTERN REFERENCE: File Naming Conventions
 *
 * This compact example shows how route files can describe URLs.
 *
 * The file name or folder position becomes part of the route definition.
 * This is helpful because students can look at the project tree and predict
 * which URLs the app supports.
 *
 * The larger demo above visualizes the transformation from file path to URL.
 */`,

    'Route Modules': `/*
 * STATIC ROUTE PATTERN REFERENCE: Route Modules
 *
 * A route module is the code file responsible for a specific route.
 *
 * In a full React Router / Remix-style app, the module may include:
 *
 *   loader data
 *   action handling
 *   metadata
 *   error boundaries
 *   the component rendered for the route
 *
 * This short snippet highlights that the route module is more than just a
 * visual component file.
 */`,

    'Nested Routes': `/*
 * STATIC ROUTE PATTERN REFERENCE: Nested Routes
 *
 * Nested routes describe parent-child UI.
 *
 * The parent route keeps the shared layout. The child route renders inside
 * the parent's <Outlet />.
 *
 * This lets students separate layout responsibility from screen-specific
 * content responsibility.
 */`,

    'Route Prefixes': `/*
 * STATIC ROUTE PATTERN REFERENCE: Route Prefixes
 *
 * A prefix groups related URLs under the same starting path.
 *
 * Prefixes are useful for organization:
 *
 *   /settings/profile
 *   /settings/privacy
 *   /settings/notifications
 *
 * The important distinction is that a prefix organizes paths, while nested
 * routes usually also imply a shared layout.
 */`,

    'Dynamic Segments': `/*
 * STATIC ROUTE PATTERN REFERENCE: Dynamic Segments
 *
 * A dynamic segment is a named placeholder inside the URL.
 *
 * Example:
 *
 *   /inventory/:itemId
 *
 * The :itemId part captures the actual value from the browser URL. The route
 * module can then use that value to load or display the correct record.
 */`,

    'Multiple Dynamic Segments': `/*
 * STATIC ROUTE PATTERN REFERENCE: Multiple Dynamic Segments
 *
 * Multiple dynamic segments capture multiple named values from the same URL.
 *
 * Example:
 *
 *   /stores/:storeId/items/:sku
 *
 * This gives the route module enough information to identify a nested or
 * related resource.
 */`,

    'Optional Segments': `/*
 * STATIC ROUTE PATTERN REFERENCE: Optional Segments
 *
 * Optional segments allow a route to match more than one URL shape.
 *
 * This is especially useful for routes where a prefix may or may not exist,
 * such as a language code.
 *
 * The app should still provide a clear default when the optional segment is
 * missing.
 */`,

    'Splats': `/*
 * STATIC ROUTE PATTERN REFERENCE: Splats
 *
 * A splat captures the remaining unmatched part of the URL.
 *
 * It is useful when the number of remaining path segments is flexible.
 *
 * Think of it as:
 *
 *   "Capture everything after this point."
 */`,

    'Splat - catchall': `/*
 * STATIC ROUTE PATTERN REFERENCE: Catch-All Splat
 *
 * A catch-all route handles URLs that did not match the known route list.
 *
 * This is commonly used for 404 pages.
 *
 * Specific routes should match first. The catch-all route should be the
 * fallback at the end.
 */`,
  }

  const comment = referenceComments[title] || `/*
 * STATIC ROUTE PATTERN REFERENCE
 *
 * This compact snippet shows the smaller route pattern for this section.
 * Compare it with the larger editable demo above to see how the idea becomes
 * interactive in the browser.
 */`

  if (codeExample.includes('STATIC ROUTE PATTERN REFERENCE')) {
    return codeExample
  }

  return `${comment}

${codeExample}`
}

function SectionWrapper({
  title,
  concept,
  bullets,
  description,
  realWorldApplication,
  broadScaleUsage,
  narrowedApproach,
  codeExample,
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
        title={`React Router Route Patterns: ${title}`}
        initialCode={polishReactRouterDemoCode(demoSource, entryComponentName)}
        entryComponentName={entryComponentName}
        previewLabel="Code in Action"
      />

      <div className="sm-explanation">
        <h3>Static Route Pattern Reference</h3>
        <p className="sm-preline">
          This colorized reference keeps the shorter original route-pattern snippet visible.
          Compare it with the larger editable demo above: the snippet shows the compact routing idea,
          while the demo shows how that idea behaves in an interactive UI.
        </p>
        <CodeBlock
          language="jsx"
          label="Route Pattern Reference"
          code={getStaticRoutePatternReferenceCode(title, codeExample)}
        />
      </div>

      <div className="sm-explanation">
        <h3>Simple Terms Explanation</h3>
        <p className="sm-preline">{simpleTermsExplanation}</p>
      </div>
    </section>
  )
}

const configuringRoutesCode = `import {
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  route("legal/privacy-policy", "./routes/privacy.tsx"),
  route("legal/terms-of-service", "./routes/terms.tsx"),
] satisfies RouteConfig;`;

const fileNamingRoutesCode = `import {
  type RouteConfig,
  route,
} from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

export default [
  route("/", "./home.tsx"),

  ...(await flatRoutes()),
] satisfies RouteConfig;`;

const routeModulesCode = `import type { Route } from "./+types/team";

export async function loader({ params }: Route.LoaderArgs) {
  let team = await fetchTeamData(params.teamId);
  return { 
    name: team.officialName,
    rank: team.currentRank 
  };
}

export default function Component({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div>
      <h1>{loaderData.name}</h1>
      <p>Rank: {loaderData.rank}</p>
    </div>
  );
}`;

const nestedRoutesCode = `import {
  type RouteConfig,
  route,
  index,
} from "@react-router/dev/routes";

// In app/routes.ts
export default [
  route("account", "./layouts/account-layout.tsx", [
    index("./pages/profile-overview.tsx"),
    route("security", "./pages/security-settings.tsx"),
    route("billing", "./pages/billing-history.tsx"),
  ]),
] satisfies RouteConfig;

// In app/layouts/account-layout.tsx
import { Outlet } from "react-router";

export default function AccountLayout() {
  return (
    <main className="flex">
      <nav>
        <a href="/account">Overview</a>
        <a href="/account/security">Security</a>
        <a href="/account/billing">Billing</a>
      </nav>
      <section className="content-area">
        <Outlet />
      </section>
    </main>
  );
}`;

const routePrefixesCode = `import {
  type RouteConfig,
  route,
  prefix,
} from "@react-router/dev/routes";

export default [
  // All these routes will start with /settings/
  ...prefix("settings", [
    route("profile", "./pages/profile-edit.tsx"),
    route("notifications", "./pages/notif-prefs.tsx"),
    route("privacy", "./pages/privacy-toggle.tsx"),
  ]),
] satisfies RouteConfig;`;

const dynamicSegmentsCode = `// In app/routes.ts
route("inventory/:itemId", "./routes/item-detail.tsx")

// In app/routes/item-detail.tsx
import type { Route } from "./+types/item-detail";

export async function loader({ params }: Route.LoaderArgs) {
  // params.itemId is captured from the URL
  const item = await database.getItem(params.itemId);
  return { item };
}

export default function Component({ params }: Route.ComponentProps) {
  return (
    <div>
      <h2>Viewing Item ID: {params.itemId}</h2>
    </div>
  );
}`;

const multipleDynamicSegmentsCode = `// In app/routes.ts
route("v1/store/:storeId/items/:sku", "./routes/store-item.tsx")

// In app/routes/store-item.tsx
import type { Route } from "./+types/store-item";

export async function loader({ params }: Route.LoaderArgs) {
  // Accessing multiple variables from the single params object
  const { storeId, sku } = params;
  const itemData = await fetchItemBySku(storeId, sku);
  return { itemData };
}

export default function Component({ loaderData }: Route.ComponentProps) {
  return (
    <article>
      <h1>{loaderData.itemData.title}</h1>
      <p>Store Location ID: {loaderData.itemData.location}</p>
    </article>
  );
}`;

const optionalSegmentsCode = `// In app/routes.ts
route(":lang?/docs/:section", "./routes/documentation.tsx")

// In app/routes/documentation.tsx
import type { Route } from "./+types/documentation";

export async function loader({ params }: Route.LoaderArgs) {
  // If :lang is missing, default to 'en'
  const language = params.lang || "en";
  const content = await fetchDocs(language, params.section);
  return { content, language };
}

export default function Component({ loaderData }: Route.ComponentProps) {
  return (
    <article>
      <p>Current Language: {loaderData.language}</p>
      <div>{loaderData.content}</div>
    </article>
  );
}`;

const splatsCode = `// In app/routes.ts
route("archive/*", "./routes/archive-viewer.tsx")

// In app/routes/archive-viewer.tsx
import type { Route } from "./+types/archive-viewer";

export async function loader({ params }: Route.LoaderArgs) {
  // Capture everything after archive/
  const fullPath = params["*"]; 
  const data = await fetchArchiveData(fullPath);
  return { data, fullPath };
}

export default function Component({ loaderData }: Route.ComponentProps) {
  return (
    <section>
      <h1>Archive Path: {loaderData.fullPath}</h1>
      <pre>{JSON.stringify(loaderData.data, null, 2)}</pre>
    </section>
  );
}`;

const splatCatchallCode = `// In app/routes.ts (MUST BE THE LAST ENTRY)
export default [
  route("/", "./routes/home.tsx"),
  route("about", "./routes/about.tsx"),
  // ... other routes ...
  route("*", "./routes/not-found.tsx"),
] satisfies RouteConfig;

// In app/routes/not-found.tsx
export function loader() {
  throw new Response("The page you are looking for does not exist.", {
    status: 404,
    statusText: "Not Found",
  });
}

export default function Component() {
  return (
    <main>
      <h1>404 - Lost in Space</h1>
      <p>We couldn't find that page.</p>
      <a href="/">Go Home</a>
    </main>
  );
}`;

function ConfiguringRoutesDemo() {
  const routeIdRef = useRef("route-map-demo");
  const [selectedPath, setSelectedPath] = useState("legal/privacy-policy");

  const routes = {
    "legal/privacy-policy": "./routes/privacy.tsx",
    "legal/terms-of-service": "./routes/terms.tsx",
  };

  return (
    <div id={routeIdRef.current} style={styles.demoPanel}>
      <h4 style={styles.cardTitle}>Central Route Index</h4>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {Object.keys(routes).map((path) => (
          <button
            key={path}
            type="button"
            style={
              selectedPath === path ? styles.demoButton : styles.secondaryButton
            }
            onClick={() => setSelectedPath(path)}
          >
            /{path}
          </button>
        ))}
      </div>
      <div style={{ marginTop: "18px" }}>
        <strong>URL pattern:</strong> /{selectedPath}
      </div>
      <div>
        <strong>Route module:</strong> {routes[selectedPath]}
      </div>
    </div>
  );
}

function FileNamingRoutesDemo() {
  const demoIdRef = useRef("fs-routes-demo");
  const files = ["home.tsx", "routes/about.tsx", "routes/contact.tsx"];
  const generatedRoutes = files.map((file) => {
    if (file === "home.tsx") {
      return "/";
    }
    return `/${file.replace("routes/", "").replace(".tsx", "")}`;
  });

  return (
    <div id={demoIdRef.current} style={styles.demoPanel}>
      <h4 style={styles.cardTitle}>File System Routing Integration</h4>
      <div>
        {files.map((file) => (
          <span key={file} style={styles.tag}>
            {file}
          </span>
        ))}
      </div>
      <div style={{ marginTop: "18px" }}>
        <strong>Generated routes:</strong>
        <div>
          {generatedRoutes.map((routePath) => (
            <span key={routePath} style={styles.tag}>
              {routePath}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function RouteModulesDemo() {
  const demoIdRef = useRef("route-module-demo");
  const [teamId, setTeamId] = useState("falcons");

  const teams = {
    falcons: { officialName: "Metro Falcons", currentRank: 2 },
    tigers: { officialName: "North Tigers", currentRank: 5 },
    comets: { officialName: "River Comets", currentRank: 1 },
  };

  const team = teams[teamId];

  return (
    <div id={demoIdRef.current} style={styles.demoPanel}>
      <h4 style={styles.cardTitle}>Loader Data Into Component</h4>
      <select
        value={teamId}
        onChange={(event) => setTeamId(event.target.value)}
        style={styles.input}
      >
        <option value="falcons">falcons</option>
        <option value="tigers">tigers</option>
        <option value="comets">comets</option>
      </select>
      <div style={{ marginTop: "18px", background: "#ffffff", padding: "16px", borderRadius: "12px" }}>
        <h3 style={{ margin: "0 0 8px" }}>{team.officialName}</h3>
        <p style={styles.paragraph}>Rank: {team.currentRank}</p>
      </div>
    </div>
  );
}

function NestedRoutesDemo() {
  const demoIdRef = useRef("nested-routes-demo");
  const [active, setActive] = useState("Overview");

  const content = {
    Overview: "Profile overview content is rendered in the Outlet area.",
    Security: "Security settings content is rendered in the Outlet area.",
    Billing: "Billing history content is rendered in the Outlet area.",
  };

  return (
    <div id={demoIdRef.current} style={styles.demoPanel}>
      <h4 style={styles.cardTitle}>Account Layout With Outlet Area</h4>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "160px 1fr",
          gap: "16px",
        }}
      >
        <nav
          style={{
            background: "#ffffff",
            borderRadius: "12px",
            padding: "12px",
            border: "1px solid #d9e2ec",
          }}
        >
          {Object.keys(content).map((item) => (
            <button
              key={item}
              type="button"
              style={{
                ...(active === item ? styles.demoButton : styles.secondaryButton),
                width: "100%",
                marginBottom: "8px",
              }}
              onClick={() => setActive(item)}
            >
              {item}
            </button>
          ))}
        </nav>
        <section
          style={{
            background: "#ffffff",
            borderRadius: "12px",
            padding: "18px",
            border: "1px dashed #3498db",
          }}
        >
          <strong>&lt;Outlet /&gt;</strong>
          <p style={styles.paragraph}>{content[active]}</p>
        </section>
      </div>
    </div>
  );
}

function RoutePrefixesDemo() {
  const demoIdRef = useRef("route-prefixes-demo");
  const routes = ["profile", "notifications", "privacy"];

  return (
    <div id={demoIdRef.current} style={styles.demoPanel}>
      <h4 style={styles.cardTitle}>Prefix Applied To Independent Routes</h4>
      <div style={{ marginBottom: "12px" }}>
        <span style={styles.tag}>prefix("settings", [...])</span>
      </div>
      {routes.map((routeName) => (
        <div
          key={routeName}
          style={{
            background: "#ffffff",
            border: "1px solid #d9e2ec",
            borderRadius: "12px",
            padding: "12px",
            marginBottom: "10px",
          }}
        >
          /settings/{routeName} → ./pages/{routeName}
        </div>
      ))}
    </div>
  );
}

function DynamicSegmentsDemo() {
  const demoIdRef = useRef("dynamic-segments-demo");
  const [itemId, setItemId] = useState("camera-99");

  return (
    <div id={demoIdRef.current} style={styles.demoPanel}>
      <h4 style={styles.cardTitle}>URL Variable Capture</h4>
      <label>
        Item ID
        <input
          value={itemId}
          onChange={(event) => setItemId(event.target.value)}
          style={{ ...styles.input, marginTop: "8px" }}
        />
      </label>
      <div style={{ marginTop: "18px" }}>
        <div style={styles.tag}>/inventory/{itemId || ":itemId"}</div>
      </div>
      <div style={{ marginTop: "12px" }}>
        <strong>params.itemId:</strong> {itemId || "undefined"}
      </div>
    </div>
  );
}

function MultipleDynamicSegmentsDemo() {
  const demoIdRef = useRef("multiple-dynamic-segments-demo");
  const [storeId, setStoreId] = useState("store-42");
  const [sku, setSku] = useState("sku-1001");

  return (
    <div id={demoIdRef.current} style={styles.demoPanel}>
      <h4 style={styles.cardTitle}>Complex URL Variable Mapping</h4>
      <div style={styles.twoColumn}>
        <label>
          Store ID
          <input
            value={storeId}
            onChange={(event) => setStoreId(event.target.value)}
            style={{ ...styles.input, marginTop: "8px" }}
          />
        </label>
        <label>
          SKU
          <input
            value={sku}
            onChange={(event) => setSku(event.target.value)}
            style={{ ...styles.input, marginTop: "8px" }}
          />
        </label>
      </div>
      <div style={{ marginTop: "18px" }}>
        <span style={styles.tag}>/v1/store/{storeId}/items/{sku}</span>
      </div>
      <div style={{ marginTop: "12px" }}>
        <strong>params:</strong> {"{"} storeId: "{storeId}", sku: "{sku}" {"}"}
      </div>
    </div>
  );
}

function OptionalSegmentsDemo() {
  const demoIdRef = useRef("optional-segments-demo");
  const [language, setLanguage] = useState("");
  const [section, setSection] = useState("intro");

  const effectiveLanguage = language || "en";
  const url = language
    ? `/${language}/docs/${section}`
    : `/docs/${section}`;

  return (
    <div id={demoIdRef.current} style={styles.demoPanel}>
      <h4 style={styles.cardTitle}>Flexible URL Pattern Matching</h4>
      <div style={styles.twoColumn}>
        <label>
          Optional Language
          <input
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            placeholder="fr"
            style={{ ...styles.input, marginTop: "8px" }}
          />
        </label>
        <label>
          Section
          <input
            value={section}
            onChange={(event) => setSection(event.target.value)}
            style={{ ...styles.input, marginTop: "8px" }}
          />
        </label>
      </div>
      <div style={{ marginTop: "18px" }}>
        <span style={styles.tag}>{url}</span>
      </div>
      <div style={{ marginTop: "12px" }}>
        <strong>Current Language:</strong> {effectiveLanguage}
      </div>
    </div>
  );
}

function SplatsDemo() {
  const demoIdRef = useRef("splats-demo");
  const [path, setPath] = useState("images/summer/beach.jpg");

  return (
    <div id={demoIdRef.current} style={styles.demoPanel}>
      <h4 style={styles.cardTitle}>Catch-all Route Matching</h4>
      <label>
        Archive Path
        <input
          value={path}
          onChange={(event) => setPath(event.target.value)}
          style={{ ...styles.input, marginTop: "8px" }}
        />
      </label>
      <div style={{ marginTop: "18px" }}>
        <span style={styles.tag}>/archive/{path}</span>
      </div>
      <div style={{ marginTop: "12px" }}>
        <strong>params["*"]:</strong> {path}
      </div>
    </div>
  );
}

function SplatCatchallDemo() {
  const demoIdRef = useRef("splat-catchall-demo");
  const [path, setPath] = useState("/unknown/deep/link");

  const knownRoutes = ["/", "/about"];
  const isKnown = knownRoutes.includes(path);

  return (
    <div id={demoIdRef.current} style={styles.demoPanel}>
      <h4 style={styles.cardTitle}>Global Error and Fallback Handling</h4>
      <label>
        Requested URL
        <input
          value={path}
          onChange={(event) => setPath(event.target.value)}
          style={{ ...styles.input, marginTop: "8px" }}
        />
      </label>
      <div
        style={{
          marginTop: "18px",
          background: isKnown ? "#ecfdf5" : "#fff1f2",
          border: isKnown ? "1px solid #10b981" : "1px solid #fb7185",
          borderRadius: "12px",
          padding: "16px",
        }}
      >
        {isKnown ? (
          <div>
            <strong>Matched route:</strong> {path}
          </div>
        ) : (
          <div>
            <h3 style={{ margin: "0 0 8px" }}>404 - Lost in Space</h3>
            <p style={styles.paragraph}>We couldn't find that page.</p>
            <button type="button" style={styles.demoButton} onClick={() => setPath("/")}>
              Go Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const demoSources = {
  ConfiguringRoutesDemo: { entryComponentName: 'ConfiguringRoutesDemo', source: "const styles = {\n  page: {\n    fontFamily:\n      \"Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif\",\n    background: \"#f4f6f8\",\n    color: \"#1f2d3d\",\n    padding: \"32px\",\n    lineHeight: 1.6,\n  },\n  slide: {\n    background: \"#ffffff\",\n    borderRadius: \"18px\",\n    padding: \"32px\",\n    marginBottom: \"36px\",\n    boxShadow: \"0 12px 30px rgba(0,0,0,0.08)\",\n  },\n  title: {\n    fontSize: \"34px\",\n    fontWeight: 800,\n    margin: \"0 0 20px\",\n    paddingLeft: \"18px\",\n    borderLeft: \"8px solid #3498db\",\n    color: \"#2c3e50\",\n  },\n  slideHeader: {\n    background: \"#2c3e50\",\n    color: \"#ffffff\",\n    padding: \"22px\",\n    borderRadius: \"14px\",\n    marginBottom: \"24px\",\n  },\n  slideHeaderTitle: {\n    fontSize: \"22px\",\n    fontWeight: 800,\n    margin: \"0 0 12px\",\n  },\n  bulletList: {\n    margin: 0,\n    paddingLeft: \"22px\",\n  },\n  bullet: {\n    marginBottom: \"8px\",\n  },\n  sectionLabel: {\n    fontSize: \"20px\",\n    fontWeight: 800,\n    color: \"#2c3e50\",\n    margin: \"22px 0 10px\",\n  },\n  paragraph: {\n    fontSize: \"16px\",\n    margin: \"0 0 14px\",\n  },\n  twoColumn: {\n    display: \"grid\",\n    gridTemplateColumns: \"repeat(auto-fit, minmax(280px, 1fr))\",\n    gap: \"18px\",\n    marginTop: \"18px\",\n  },\n  card: {\n    border: \"1px solid #d9e2ec\",\n    borderRadius: \"14px\",\n    padding: \"20px\",\n    background: \"#f8fafc\",\n  },\n  cardTitle: {\n    fontSize: \"18px\",\n    fontWeight: 800,\n    color: \"#34495e\",\n    margin: \"0 0 10px\",\n  },\n  narrowed: {\n    background: \"#eef7ff\",\n    borderLeft: \"6px solid #3498db\",\n    borderRadius: \"12px\",\n    padding: \"18px\",\n  },\n  codeBlock: {\n    background: \"#111827\",\n    color: \"#f9fafb\",\n    padding: \"22px\",\n    borderRadius: \"14px\",\n    overflowX: \"auto\",\n    whiteSpace: \"pre\",\n    fontFamily:\n      \"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace\",\n    fontSize: \"14px\",\n  },\n  codeAction: {\n    padding: \"22px\",\n    border: \"3px solid #3498db\",\n    borderRadius: \"16px\",\n    background: \"#ffffff\",\n    marginTop: \"10px\",\n  },\n  simpleBox: {\n    background: \"#fff7e6\",\n    border: \"1px solid #f1c27d\",\n    borderRadius: \"14px\",\n    padding: \"20px\",\n    marginTop: \"12px\",\n  },\n  demoButton: {\n    border: \"none\",\n    background: \"#3498db\",\n    color: \"#ffffff\",\n    padding: \"10px 14px\",\n    borderRadius: \"10px\",\n    cursor: \"pointer\",\n    fontWeight: 700,\n  },\n  secondaryButton: {\n    border: \"1px solid #3498db\",\n    background: \"#ffffff\",\n    color: \"#3498db\",\n    padding: \"10px 14px\",\n    borderRadius: \"10px\",\n    cursor: \"pointer\",\n    fontWeight: 700,\n  },\n  input: {\n    width: \"100%\",\n    padding: \"10px 12px\",\n    border: \"1px solid #cbd5e1\",\n    borderRadius: \"10px\",\n    fontSize: \"15px\",\n    boxSizing: \"border-box\",\n  },\n  demoPanel: {\n    border: \"1px solid #d9e2ec\",\n    borderRadius: \"14px\",\n    padding: \"18px\",\n    background: \"#f8fafc\",\n  },\n  tag: {\n    display: \"inline-block\",\n    background: \"#e8f4fd\",\n    color: \"#2c3e50\",\n    padding: \"6px 10px\",\n    borderRadius: \"999px\",\n    margin: \"4px\",\n    fontWeight: 700,\n    fontSize: \"13px\",\n  },\n  recap: {\n    background: \"#2c3e50\",\n    color: \"#ffffff\",\n    borderRadius: \"18px\",\n    padding: \"34px\",\n    marginTop: \"40px\",\n  },\n  recapTitle: {\n    fontSize: \"38px\",\n    fontWeight: 900,\n    margin: \"0 0 8px\",\n  },\n  recapSubtitle: {\n    fontSize: \"18px\",\n    color: \"#dbeafe\",\n    margin: \"0 0 24px\",\n  },\n  recapGrid: {\n    display: \"grid\",\n    gridTemplateColumns: \"repeat(auto-fit, minmax(300px, 1fr))\",\n    gap: \"18px\",\n  },\n  recapBlock: {\n    background: \"#34495e\",\n    border: \"1px solid rgba(255,255,255,0.18)\",\n    borderRadius: \"14px\",\n    padding: \"18px\",\n  },\n  recapBlockTitle: {\n    fontSize: \"18px\",\n    fontWeight: 800,\n    color: \"#7dd3fc\",\n    margin: \"0 0 8px\",\n  },\n  recapTable: {\n    width: \"100%\",\n    borderCollapse: \"collapse\",\n    marginTop: \"24px\",\n    background: \"#ffffff\",\n    color: \"#1f2d3d\",\n    borderRadius: \"14px\",\n    overflow: \"hidden\",\n  },\n  recapTh: {\n    textAlign: \"left\",\n    padding: \"14px\",\n    background: \"#3498db\",\n    color: \"#ffffff\",\n    border: \"1px solid #2980b9\",\n  },\n  recapTd: {\n    padding: \"14px\",\n    border: \"1px solid #d9e2ec\",\n    verticalAlign: \"top\",\n  },\n  bestPractice: {\n    marginTop: \"24px\",\n    padding: \"22px\",\n    background: \"#102a43\",\n    border: \"2px solid #7dd3fc\",\n    borderRadius: \"14px\",\n  },\n};\n\nfunction ConfiguringRoutesDemo() {\n  const routeIdRef = useRef(\"route-map-demo\");\n  const [selectedPath, setSelectedPath] = useState(\"legal/privacy-policy\");\n\n  const routes = {\n    \"legal/privacy-policy\": \"./routes/privacy.tsx\",\n    \"legal/terms-of-service\": \"./routes/terms.tsx\",\n  };\n\n  return (\n    <div id={routeIdRef.current} style={styles.demoPanel}>\n      <h4 style={styles.cardTitle}>Central Route Index</h4>\n      <div style={{ display: \"flex\", gap: \"10px\", flexWrap: \"wrap\" }}>\n        {Object.keys(routes).map((path) => (\n          <button\n            key={path}\n            type=\"button\"\n            style={\n              selectedPath === path ? styles.demoButton : styles.secondaryButton\n            }\n            onClick={() => setSelectedPath(path)}\n          >\n            /{path}\n          </button>\n        ))}\n      </div>\n      <div style={{ marginTop: \"18px\" }}>\n        <strong>URL pattern:</strong> /{selectedPath}\n      </div>\n      <div>\n        <strong>Route module:</strong> {routes[selectedPath]}\n      </div>\n    </div>\n  );\n}\n\nexport default ConfiguringRoutesDemo;" },
  FileNamingRoutesDemo: { entryComponentName: 'FileNamingRoutesDemo', source: "const styles = {\n  page: {\n    fontFamily:\n      \"Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif\",\n    background: \"#f4f6f8\",\n    color: \"#1f2d3d\",\n    padding: \"32px\",\n    lineHeight: 1.6,\n  },\n  slide: {\n    background: \"#ffffff\",\n    borderRadius: \"18px\",\n    padding: \"32px\",\n    marginBottom: \"36px\",\n    boxShadow: \"0 12px 30px rgba(0,0,0,0.08)\",\n  },\n  title: {\n    fontSize: \"34px\",\n    fontWeight: 800,\n    margin: \"0 0 20px\",\n    paddingLeft: \"18px\",\n    borderLeft: \"8px solid #3498db\",\n    color: \"#2c3e50\",\n  },\n  slideHeader: {\n    background: \"#2c3e50\",\n    color: \"#ffffff\",\n    padding: \"22px\",\n    borderRadius: \"14px\",\n    marginBottom: \"24px\",\n  },\n  slideHeaderTitle: {\n    fontSize: \"22px\",\n    fontWeight: 800,\n    margin: \"0 0 12px\",\n  },\n  bulletList: {\n    margin: 0,\n    paddingLeft: \"22px\",\n  },\n  bullet: {\n    marginBottom: \"8px\",\n  },\n  sectionLabel: {\n    fontSize: \"20px\",\n    fontWeight: 800,\n    color: \"#2c3e50\",\n    margin: \"22px 0 10px\",\n  },\n  paragraph: {\n    fontSize: \"16px\",\n    margin: \"0 0 14px\",\n  },\n  twoColumn: {\n    display: \"grid\",\n    gridTemplateColumns: \"repeat(auto-fit, minmax(280px, 1fr))\",\n    gap: \"18px\",\n    marginTop: \"18px\",\n  },\n  card: {\n    border: \"1px solid #d9e2ec\",\n    borderRadius: \"14px\",\n    padding: \"20px\",\n    background: \"#f8fafc\",\n  },\n  cardTitle: {\n    fontSize: \"18px\",\n    fontWeight: 800,\n    color: \"#34495e\",\n    margin: \"0 0 10px\",\n  },\n  narrowed: {\n    background: \"#eef7ff\",\n    borderLeft: \"6px solid #3498db\",\n    borderRadius: \"12px\",\n    padding: \"18px\",\n  },\n  codeBlock: {\n    background: \"#111827\",\n    color: \"#f9fafb\",\n    padding: \"22px\",\n    borderRadius: \"14px\",\n    overflowX: \"auto\",\n    whiteSpace: \"pre\",\n    fontFamily:\n      \"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace\",\n    fontSize: \"14px\",\n  },\n  codeAction: {\n    padding: \"22px\",\n    border: \"3px solid #3498db\",\n    borderRadius: \"16px\",\n    background: \"#ffffff\",\n    marginTop: \"10px\",\n  },\n  simpleBox: {\n    background: \"#fff7e6\",\n    border: \"1px solid #f1c27d\",\n    borderRadius: \"14px\",\n    padding: \"20px\",\n    marginTop: \"12px\",\n  },\n  demoButton: {\n    border: \"none\",\n    background: \"#3498db\",\n    color: \"#ffffff\",\n    padding: \"10px 14px\",\n    borderRadius: \"10px\",\n    cursor: \"pointer\",\n    fontWeight: 700,\n  },\n  secondaryButton: {\n    border: \"1px solid #3498db\",\n    background: \"#ffffff\",\n    color: \"#3498db\",\n    padding: \"10px 14px\",\n    borderRadius: \"10px\",\n    cursor: \"pointer\",\n    fontWeight: 700,\n  },\n  input: {\n    width: \"100%\",\n    padding: \"10px 12px\",\n    border: \"1px solid #cbd5e1\",\n    borderRadius: \"10px\",\n    fontSize: \"15px\",\n    boxSizing: \"border-box\",\n  },\n  demoPanel: {\n    border: \"1px solid #d9e2ec\",\n    borderRadius: \"14px\",\n    padding: \"18px\",\n    background: \"#f8fafc\",\n  },\n  tag: {\n    display: \"inline-block\",\n    background: \"#e8f4fd\",\n    color: \"#2c3e50\",\n    padding: \"6px 10px\",\n    borderRadius: \"999px\",\n    margin: \"4px\",\n    fontWeight: 700,\n    fontSize: \"13px\",\n  },\n  recap: {\n    background: \"#2c3e50\",\n    color: \"#ffffff\",\n    borderRadius: \"18px\",\n    padding: \"34px\",\n    marginTop: \"40px\",\n  },\n  recapTitle: {\n    fontSize: \"38px\",\n    fontWeight: 900,\n    margin: \"0 0 8px\",\n  },\n  recapSubtitle: {\n    fontSize: \"18px\",\n    color: \"#dbeafe\",\n    margin: \"0 0 24px\",\n  },\n  recapGrid: {\n    display: \"grid\",\n    gridTemplateColumns: \"repeat(auto-fit, minmax(300px, 1fr))\",\n    gap: \"18px\",\n  },\n  recapBlock: {\n    background: \"#34495e\",\n    border: \"1px solid rgba(255,255,255,0.18)\",\n    borderRadius: \"14px\",\n    padding: \"18px\",\n  },\n  recapBlockTitle: {\n    fontSize: \"18px\",\n    fontWeight: 800,\n    color: \"#7dd3fc\",\n    margin: \"0 0 8px\",\n  },\n  recapTable: {\n    width: \"100%\",\n    borderCollapse: \"collapse\",\n    marginTop: \"24px\",\n    background: \"#ffffff\",\n    color: \"#1f2d3d\",\n    borderRadius: \"14px\",\n    overflow: \"hidden\",\n  },\n  recapTh: {\n    textAlign: \"left\",\n    padding: \"14px\",\n    background: \"#3498db\",\n    color: \"#ffffff\",\n    border: \"1px solid #2980b9\",\n  },\n  recapTd: {\n    padding: \"14px\",\n    border: \"1px solid #d9e2ec\",\n    verticalAlign: \"top\",\n  },\n  bestPractice: {\n    marginTop: \"24px\",\n    padding: \"22px\",\n    background: \"#102a43\",\n    border: \"2px solid #7dd3fc\",\n    borderRadius: \"14px\",\n  },\n};\n\nfunction FileNamingRoutesDemo() {\n  const demoIdRef = useRef(\"fs-routes-demo\");\n  const files = [\"home.tsx\", \"routes/about.tsx\", \"routes/contact.tsx\"];\n  const generatedRoutes = files.map((file) => {\n    if (file === \"home.tsx\") {\n      return \"/\";\n    }\n    return `/${file.replace(\"routes/\", \"\").replace(\".tsx\", \"\")}`;\n  });\n\n  return (\n    <div id={demoIdRef.current} style={styles.demoPanel}>\n      <h4 style={styles.cardTitle}>File System Routing Integration</h4>\n      <div>\n        {files.map((file) => (\n          <span key={file} style={styles.tag}>\n            {file}\n          </span>\n        ))}\n      </div>\n      <div style={{ marginTop: \"18px\" }}>\n        <strong>Generated routes:</strong>\n        <div>\n          {generatedRoutes.map((routePath) => (\n            <span key={routePath} style={styles.tag}>\n              {routePath}\n            </span>\n          ))}\n        </div>\n      </div>\n    </div>\n  );\n}\n\nexport default FileNamingRoutesDemo;" },
  RouteModulesDemo: { entryComponentName: 'RouteModulesDemo', source: "const styles = {\n  page: {\n    fontFamily:\n      \"Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif\",\n    background: \"#f4f6f8\",\n    color: \"#1f2d3d\",\n    padding: \"32px\",\n    lineHeight: 1.6,\n  },\n  slide: {\n    background: \"#ffffff\",\n    borderRadius: \"18px\",\n    padding: \"32px\",\n    marginBottom: \"36px\",\n    boxShadow: \"0 12px 30px rgba(0,0,0,0.08)\",\n  },\n  title: {\n    fontSize: \"34px\",\n    fontWeight: 800,\n    margin: \"0 0 20px\",\n    paddingLeft: \"18px\",\n    borderLeft: \"8px solid #3498db\",\n    color: \"#2c3e50\",\n  },\n  slideHeader: {\n    background: \"#2c3e50\",\n    color: \"#ffffff\",\n    padding: \"22px\",\n    borderRadius: \"14px\",\n    marginBottom: \"24px\",\n  },\n  slideHeaderTitle: {\n    fontSize: \"22px\",\n    fontWeight: 800,\n    margin: \"0 0 12px\",\n  },\n  bulletList: {\n    margin: 0,\n    paddingLeft: \"22px\",\n  },\n  bullet: {\n    marginBottom: \"8px\",\n  },\n  sectionLabel: {\n    fontSize: \"20px\",\n    fontWeight: 800,\n    color: \"#2c3e50\",\n    margin: \"22px 0 10px\",\n  },\n  paragraph: {\n    fontSize: \"16px\",\n    margin: \"0 0 14px\",\n  },\n  twoColumn: {\n    display: \"grid\",\n    gridTemplateColumns: \"repeat(auto-fit, minmax(280px, 1fr))\",\n    gap: \"18px\",\n    marginTop: \"18px\",\n  },\n  card: {\n    border: \"1px solid #d9e2ec\",\n    borderRadius: \"14px\",\n    padding: \"20px\",\n    background: \"#f8fafc\",\n  },\n  cardTitle: {\n    fontSize: \"18px\",\n    fontWeight: 800,\n    color: \"#34495e\",\n    margin: \"0 0 10px\",\n  },\n  narrowed: {\n    background: \"#eef7ff\",\n    borderLeft: \"6px solid #3498db\",\n    borderRadius: \"12px\",\n    padding: \"18px\",\n  },\n  codeBlock: {\n    background: \"#111827\",\n    color: \"#f9fafb\",\n    padding: \"22px\",\n    borderRadius: \"14px\",\n    overflowX: \"auto\",\n    whiteSpace: \"pre\",\n    fontFamily:\n      \"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace\",\n    fontSize: \"14px\",\n  },\n  codeAction: {\n    padding: \"22px\",\n    border: \"3px solid #3498db\",\n    borderRadius: \"16px\",\n    background: \"#ffffff\",\n    marginTop: \"10px\",\n  },\n  simpleBox: {\n    background: \"#fff7e6\",\n    border: \"1px solid #f1c27d\",\n    borderRadius: \"14px\",\n    padding: \"20px\",\n    marginTop: \"12px\",\n  },\n  demoButton: {\n    border: \"none\",\n    background: \"#3498db\",\n    color: \"#ffffff\",\n    padding: \"10px 14px\",\n    borderRadius: \"10px\",\n    cursor: \"pointer\",\n    fontWeight: 700,\n  },\n  secondaryButton: {\n    border: \"1px solid #3498db\",\n    background: \"#ffffff\",\n    color: \"#3498db\",\n    padding: \"10px 14px\",\n    borderRadius: \"10px\",\n    cursor: \"pointer\",\n    fontWeight: 700,\n  },\n  input: {\n    width: \"100%\",\n    padding: \"10px 12px\",\n    border: \"1px solid #cbd5e1\",\n    borderRadius: \"10px\",\n    fontSize: \"15px\",\n    boxSizing: \"border-box\",\n  },\n  demoPanel: {\n    border: \"1px solid #d9e2ec\",\n    borderRadius: \"14px\",\n    padding: \"18px\",\n    background: \"#f8fafc\",\n  },\n  tag: {\n    display: \"inline-block\",\n    background: \"#e8f4fd\",\n    color: \"#2c3e50\",\n    padding: \"6px 10px\",\n    borderRadius: \"999px\",\n    margin: \"4px\",\n    fontWeight: 700,\n    fontSize: \"13px\",\n  },\n  recap: {\n    background: \"#2c3e50\",\n    color: \"#ffffff\",\n    borderRadius: \"18px\",\n    padding: \"34px\",\n    marginTop: \"40px\",\n  },\n  recapTitle: {\n    fontSize: \"38px\",\n    fontWeight: 900,\n    margin: \"0 0 8px\",\n  },\n  recapSubtitle: {\n    fontSize: \"18px\",\n    color: \"#dbeafe\",\n    margin: \"0 0 24px\",\n  },\n  recapGrid: {\n    display: \"grid\",\n    gridTemplateColumns: \"repeat(auto-fit, minmax(300px, 1fr))\",\n    gap: \"18px\",\n  },\n  recapBlock: {\n    background: \"#34495e\",\n    border: \"1px solid rgba(255,255,255,0.18)\",\n    borderRadius: \"14px\",\n    padding: \"18px\",\n  },\n  recapBlockTitle: {\n    fontSize: \"18px\",\n    fontWeight: 800,\n    color: \"#7dd3fc\",\n    margin: \"0 0 8px\",\n  },\n  recapTable: {\n    width: \"100%\",\n    borderCollapse: \"collapse\",\n    marginTop: \"24px\",\n    background: \"#ffffff\",\n    color: \"#1f2d3d\",\n    borderRadius: \"14px\",\n    overflow: \"hidden\",\n  },\n  recapTh: {\n    textAlign: \"left\",\n    padding: \"14px\",\n    background: \"#3498db\",\n    color: \"#ffffff\",\n    border: \"1px solid #2980b9\",\n  },\n  recapTd: {\n    padding: \"14px\",\n    border: \"1px solid #d9e2ec\",\n    verticalAlign: \"top\",\n  },\n  bestPractice: {\n    marginTop: \"24px\",\n    padding: \"22px\",\n    background: \"#102a43\",\n    border: \"2px solid #7dd3fc\",\n    borderRadius: \"14px\",\n  },\n};\n\nfunction RouteModulesDemo() {\n  const demoIdRef = useRef(\"route-module-demo\");\n  const [teamId, setTeamId] = useState(\"falcons\");\n\n  const teams = {\n    falcons: { officialName: \"Metro Falcons\", currentRank: 2 },\n    tigers: { officialName: \"North Tigers\", currentRank: 5 },\n    comets: { officialName: \"River Comets\", currentRank: 1 },\n  };\n\n  const team = teams[teamId];\n\n  return (\n    <div id={demoIdRef.current} style={styles.demoPanel}>\n      <h4 style={styles.cardTitle}>Loader Data Into Component</h4>\n      <select\n        value={teamId}\n        onChange={(event) => setTeamId(event.target.value)}\n        style={styles.input}\n      >\n        <option value=\"falcons\">falcons</option>\n        <option value=\"tigers\">tigers</option>\n        <option value=\"comets\">comets</option>\n      </select>\n      <div style={{ marginTop: \"18px\", background: \"#ffffff\", padding: \"16px\", borderRadius: \"12px\" }}>\n        <h3 style={{ margin: \"0 0 8px\" }}>{team.officialName}</h3>\n        <p style={styles.paragraph}>Rank: {team.currentRank}</p>\n      </div>\n    </div>\n  );\n}\n\nexport default RouteModulesDemo;" },
  NestedRoutesDemo: { entryComponentName: 'NestedRoutesDemo', source: "const styles = {\n  page: {\n    fontFamily:\n      \"Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif\",\n    background: \"#f4f6f8\",\n    color: \"#1f2d3d\",\n    padding: \"32px\",\n    lineHeight: 1.6,\n  },\n  slide: {\n    background: \"#ffffff\",\n    borderRadius: \"18px\",\n    padding: \"32px\",\n    marginBottom: \"36px\",\n    boxShadow: \"0 12px 30px rgba(0,0,0,0.08)\",\n  },\n  title: {\n    fontSize: \"34px\",\n    fontWeight: 800,\n    margin: \"0 0 20px\",\n    paddingLeft: \"18px\",\n    borderLeft: \"8px solid #3498db\",\n    color: \"#2c3e50\",\n  },\n  slideHeader: {\n    background: \"#2c3e50\",\n    color: \"#ffffff\",\n    padding: \"22px\",\n    borderRadius: \"14px\",\n    marginBottom: \"24px\",\n  },\n  slideHeaderTitle: {\n    fontSize: \"22px\",\n    fontWeight: 800,\n    margin: \"0 0 12px\",\n  },\n  bulletList: {\n    margin: 0,\n    paddingLeft: \"22px\",\n  },\n  bullet: {\n    marginBottom: \"8px\",\n  },\n  sectionLabel: {\n    fontSize: \"20px\",\n    fontWeight: 800,\n    color: \"#2c3e50\",\n    margin: \"22px 0 10px\",\n  },\n  paragraph: {\n    fontSize: \"16px\",\n    margin: \"0 0 14px\",\n  },\n  twoColumn: {\n    display: \"grid\",\n    gridTemplateColumns: \"repeat(auto-fit, minmax(280px, 1fr))\",\n    gap: \"18px\",\n    marginTop: \"18px\",\n  },\n  card: {\n    border: \"1px solid #d9e2ec\",\n    borderRadius: \"14px\",\n    padding: \"20px\",\n    background: \"#f8fafc\",\n  },\n  cardTitle: {\n    fontSize: \"18px\",\n    fontWeight: 800,\n    color: \"#34495e\",\n    margin: \"0 0 10px\",\n  },\n  narrowed: {\n    background: \"#eef7ff\",\n    borderLeft: \"6px solid #3498db\",\n    borderRadius: \"12px\",\n    padding: \"18px\",\n  },\n  codeBlock: {\n    background: \"#111827\",\n    color: \"#f9fafb\",\n    padding: \"22px\",\n    borderRadius: \"14px\",\n    overflowX: \"auto\",\n    whiteSpace: \"pre\",\n    fontFamily:\n      \"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace\",\n    fontSize: \"14px\",\n  },\n  codeAction: {\n    padding: \"22px\",\n    border: \"3px solid #3498db\",\n    borderRadius: \"16px\",\n    background: \"#ffffff\",\n    marginTop: \"10px\",\n  },\n  simpleBox: {\n    background: \"#fff7e6\",\n    border: \"1px solid #f1c27d\",\n    borderRadius: \"14px\",\n    padding: \"20px\",\n    marginTop: \"12px\",\n  },\n  demoButton: {\n    border: \"none\",\n    background: \"#3498db\",\n    color: \"#ffffff\",\n    padding: \"10px 14px\",\n    borderRadius: \"10px\",\n    cursor: \"pointer\",\n    fontWeight: 700,\n  },\n  secondaryButton: {\n    border: \"1px solid #3498db\",\n    background: \"#ffffff\",\n    color: \"#3498db\",\n    padding: \"10px 14px\",\n    borderRadius: \"10px\",\n    cursor: \"pointer\",\n    fontWeight: 700,\n  },\n  input: {\n    width: \"100%\",\n    padding: \"10px 12px\",\n    border: \"1px solid #cbd5e1\",\n    borderRadius: \"10px\",\n    fontSize: \"15px\",\n    boxSizing: \"border-box\",\n  },\n  demoPanel: {\n    border: \"1px solid #d9e2ec\",\n    borderRadius: \"14px\",\n    padding: \"18px\",\n    background: \"#f8fafc\",\n  },\n  tag: {\n    display: \"inline-block\",\n    background: \"#e8f4fd\",\n    color: \"#2c3e50\",\n    padding: \"6px 10px\",\n    borderRadius: \"999px\",\n    margin: \"4px\",\n    fontWeight: 700,\n    fontSize: \"13px\",\n  },\n  recap: {\n    background: \"#2c3e50\",\n    color: \"#ffffff\",\n    borderRadius: \"18px\",\n    padding: \"34px\",\n    marginTop: \"40px\",\n  },\n  recapTitle: {\n    fontSize: \"38px\",\n    fontWeight: 900,\n    margin: \"0 0 8px\",\n  },\n  recapSubtitle: {\n    fontSize: \"18px\",\n    color: \"#dbeafe\",\n    margin: \"0 0 24px\",\n  },\n  recapGrid: {\n    display: \"grid\",\n    gridTemplateColumns: \"repeat(auto-fit, minmax(300px, 1fr))\",\n    gap: \"18px\",\n  },\n  recapBlock: {\n    background: \"#34495e\",\n    border: \"1px solid rgba(255,255,255,0.18)\",\n    borderRadius: \"14px\",\n    padding: \"18px\",\n  },\n  recapBlockTitle: {\n    fontSize: \"18px\",\n    fontWeight: 800,\n    color: \"#7dd3fc\",\n    margin: \"0 0 8px\",\n  },\n  recapTable: {\n    width: \"100%\",\n    borderCollapse: \"collapse\",\n    marginTop: \"24px\",\n    background: \"#ffffff\",\n    color: \"#1f2d3d\",\n    borderRadius: \"14px\",\n    overflow: \"hidden\",\n  },\n  recapTh: {\n    textAlign: \"left\",\n    padding: \"14px\",\n    background: \"#3498db\",\n    color: \"#ffffff\",\n    border: \"1px solid #2980b9\",\n  },\n  recapTd: {\n    padding: \"14px\",\n    border: \"1px solid #d9e2ec\",\n    verticalAlign: \"top\",\n  },\n  bestPractice: {\n    marginTop: \"24px\",\n    padding: \"22px\",\n    background: \"#102a43\",\n    border: \"2px solid #7dd3fc\",\n    borderRadius: \"14px\",\n  },\n};\n\nfunction NestedRoutesDemo() {\n  const demoIdRef = useRef(\"nested-routes-demo\");\n  const [active, setActive] = useState(\"Overview\");\n\n  const content = {\n    Overview: \"Profile overview content is rendered in the Outlet area.\",\n    Security: \"Security settings content is rendered in the Outlet area.\",\n    Billing: \"Billing history content is rendered in the Outlet area.\",\n  };\n\n  return (\n    <div id={demoIdRef.current} style={styles.demoPanel}>\n      <h4 style={styles.cardTitle}>Account Layout With Outlet Area</h4>\n      <div\n        style={{\n          display: \"grid\",\n          gridTemplateColumns: \"160px 1fr\",\n          gap: \"16px\",\n        }}\n      >\n        <nav\n          style={{\n            background: \"#ffffff\",\n            borderRadius: \"12px\",\n            padding: \"12px\",\n            border: \"1px solid #d9e2ec\",\n          }}\n        >\n          {Object.keys(content).map((item) => (\n            <button\n              key={item}\n              type=\"button\"\n              style={{\n                ...(active === item ? styles.demoButton : styles.secondaryButton),\n                width: \"100%\",\n                marginBottom: \"8px\",\n              }}\n              onClick={() => setActive(item)}\n            >\n              {item}\n            </button>\n          ))}\n        </nav>\n        <section\n          style={{\n            background: \"#ffffff\",\n            borderRadius: \"12px\",\n            padding: \"18px\",\n            border: \"1px dashed #3498db\",\n          }}\n        >\n          <strong>&lt;Outlet /&gt;</strong>\n          <p style={styles.paragraph}>{content[active]}</p>\n        </section>\n      </div>\n    </div>\n  );\n}\n\nexport default NestedRoutesDemo;" },
  RoutePrefixesDemo: { entryComponentName: 'RoutePrefixesDemo', source: "const styles = {\n  page: {\n    fontFamily:\n      \"Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif\",\n    background: \"#f4f6f8\",\n    color: \"#1f2d3d\",\n    padding: \"32px\",\n    lineHeight: 1.6,\n  },\n  slide: {\n    background: \"#ffffff\",\n    borderRadius: \"18px\",\n    padding: \"32px\",\n    marginBottom: \"36px\",\n    boxShadow: \"0 12px 30px rgba(0,0,0,0.08)\",\n  },\n  title: {\n    fontSize: \"34px\",\n    fontWeight: 800,\n    margin: \"0 0 20px\",\n    paddingLeft: \"18px\",\n    borderLeft: \"8px solid #3498db\",\n    color: \"#2c3e50\",\n  },\n  slideHeader: {\n    background: \"#2c3e50\",\n    color: \"#ffffff\",\n    padding: \"22px\",\n    borderRadius: \"14px\",\n    marginBottom: \"24px\",\n  },\n  slideHeaderTitle: {\n    fontSize: \"22px\",\n    fontWeight: 800,\n    margin: \"0 0 12px\",\n  },\n  bulletList: {\n    margin: 0,\n    paddingLeft: \"22px\",\n  },\n  bullet: {\n    marginBottom: \"8px\",\n  },\n  sectionLabel: {\n    fontSize: \"20px\",\n    fontWeight: 800,\n    color: \"#2c3e50\",\n    margin: \"22px 0 10px\",\n  },\n  paragraph: {\n    fontSize: \"16px\",\n    margin: \"0 0 14px\",\n  },\n  twoColumn: {\n    display: \"grid\",\n    gridTemplateColumns: \"repeat(auto-fit, minmax(280px, 1fr))\",\n    gap: \"18px\",\n    marginTop: \"18px\",\n  },\n  card: {\n    border: \"1px solid #d9e2ec\",\n    borderRadius: \"14px\",\n    padding: \"20px\",\n    background: \"#f8fafc\",\n  },\n  cardTitle: {\n    fontSize: \"18px\",\n    fontWeight: 800,\n    color: \"#34495e\",\n    margin: \"0 0 10px\",\n  },\n  narrowed: {\n    background: \"#eef7ff\",\n    borderLeft: \"6px solid #3498db\",\n    borderRadius: \"12px\",\n    padding: \"18px\",\n  },\n  codeBlock: {\n    background: \"#111827\",\n    color: \"#f9fafb\",\n    padding: \"22px\",\n    borderRadius: \"14px\",\n    overflowX: \"auto\",\n    whiteSpace: \"pre\",\n    fontFamily:\n      \"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace\",\n    fontSize: \"14px\",\n  },\n  codeAction: {\n    padding: \"22px\",\n    border: \"3px solid #3498db\",\n    borderRadius: \"16px\",\n    background: \"#ffffff\",\n    marginTop: \"10px\",\n  },\n  simpleBox: {\n    background: \"#fff7e6\",\n    border: \"1px solid #f1c27d\",\n    borderRadius: \"14px\",\n    padding: \"20px\",\n    marginTop: \"12px\",\n  },\n  demoButton: {\n    border: \"none\",\n    background: \"#3498db\",\n    color: \"#ffffff\",\n    padding: \"10px 14px\",\n    borderRadius: \"10px\",\n    cursor: \"pointer\",\n    fontWeight: 700,\n  },\n  secondaryButton: {\n    border: \"1px solid #3498db\",\n    background: \"#ffffff\",\n    color: \"#3498db\",\n    padding: \"10px 14px\",\n    borderRadius: \"10px\",\n    cursor: \"pointer\",\n    fontWeight: 700,\n  },\n  input: {\n    width: \"100%\",\n    padding: \"10px 12px\",\n    border: \"1px solid #cbd5e1\",\n    borderRadius: \"10px\",\n    fontSize: \"15px\",\n    boxSizing: \"border-box\",\n  },\n  demoPanel: {\n    border: \"1px solid #d9e2ec\",\n    borderRadius: \"14px\",\n    padding: \"18px\",\n    background: \"#f8fafc\",\n  },\n  tag: {\n    display: \"inline-block\",\n    background: \"#e8f4fd\",\n    color: \"#2c3e50\",\n    padding: \"6px 10px\",\n    borderRadius: \"999px\",\n    margin: \"4px\",\n    fontWeight: 700,\n    fontSize: \"13px\",\n  },\n  recap: {\n    background: \"#2c3e50\",\n    color: \"#ffffff\",\n    borderRadius: \"18px\",\n    padding: \"34px\",\n    marginTop: \"40px\",\n  },\n  recapTitle: {\n    fontSize: \"38px\",\n    fontWeight: 900,\n    margin: \"0 0 8px\",\n  },\n  recapSubtitle: {\n    fontSize: \"18px\",\n    color: \"#dbeafe\",\n    margin: \"0 0 24px\",\n  },\n  recapGrid: {\n    display: \"grid\",\n    gridTemplateColumns: \"repeat(auto-fit, minmax(300px, 1fr))\",\n    gap: \"18px\",\n  },\n  recapBlock: {\n    background: \"#34495e\",\n    border: \"1px solid rgba(255,255,255,0.18)\",\n    borderRadius: \"14px\",\n    padding: \"18px\",\n  },\n  recapBlockTitle: {\n    fontSize: \"18px\",\n    fontWeight: 800,\n    color: \"#7dd3fc\",\n    margin: \"0 0 8px\",\n  },\n  recapTable: {\n    width: \"100%\",\n    borderCollapse: \"collapse\",\n    marginTop: \"24px\",\n    background: \"#ffffff\",\n    color: \"#1f2d3d\",\n    borderRadius: \"14px\",\n    overflow: \"hidden\",\n  },\n  recapTh: {\n    textAlign: \"left\",\n    padding: \"14px\",\n    background: \"#3498db\",\n    color: \"#ffffff\",\n    border: \"1px solid #2980b9\",\n  },\n  recapTd: {\n    padding: \"14px\",\n    border: \"1px solid #d9e2ec\",\n    verticalAlign: \"top\",\n  },\n  bestPractice: {\n    marginTop: \"24px\",\n    padding: \"22px\",\n    background: \"#102a43\",\n    border: \"2px solid #7dd3fc\",\n    borderRadius: \"14px\",\n  },\n};\n\nfunction RoutePrefixesDemo() {\n  const demoIdRef = useRef(\"route-prefixes-demo\");\n  const routes = [\"profile\", \"notifications\", \"privacy\"];\n\n  return (\n    <div id={demoIdRef.current} style={styles.demoPanel}>\n      <h4 style={styles.cardTitle}>Prefix Applied To Independent Routes</h4>\n      <div style={{ marginBottom: \"12px\" }}>\n        <span style={styles.tag}>prefix(\"settings\", [...])</span>\n      </div>\n      {routes.map((routeName) => (\n        <div\n          key={routeName}\n          style={{\n            background: \"#ffffff\",\n            border: \"1px solid #d9e2ec\",\n            borderRadius: \"12px\",\n            padding: \"12px\",\n            marginBottom: \"10px\",\n          }}\n        >\n          /settings/{routeName} \u2192 ./pages/{routeName}\n        </div>\n      ))}\n    </div>\n  );\n}\n\nexport default RoutePrefixesDemo;" },
  DynamicSegmentsDemo: { entryComponentName: 'DynamicSegmentsDemo', source: "const styles = {\n  page: {\n    fontFamily:\n      \"Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif\",\n    background: \"#f4f6f8\",\n    color: \"#1f2d3d\",\n    padding: \"32px\",\n    lineHeight: 1.6,\n  },\n  slide: {\n    background: \"#ffffff\",\n    borderRadius: \"18px\",\n    padding: \"32px\",\n    marginBottom: \"36px\",\n    boxShadow: \"0 12px 30px rgba(0,0,0,0.08)\",\n  },\n  title: {\n    fontSize: \"34px\",\n    fontWeight: 800,\n    margin: \"0 0 20px\",\n    paddingLeft: \"18px\",\n    borderLeft: \"8px solid #3498db\",\n    color: \"#2c3e50\",\n  },\n  slideHeader: {\n    background: \"#2c3e50\",\n    color: \"#ffffff\",\n    padding: \"22px\",\n    borderRadius: \"14px\",\n    marginBottom: \"24px\",\n  },\n  slideHeaderTitle: {\n    fontSize: \"22px\",\n    fontWeight: 800,\n    margin: \"0 0 12px\",\n  },\n  bulletList: {\n    margin: 0,\n    paddingLeft: \"22px\",\n  },\n  bullet: {\n    marginBottom: \"8px\",\n  },\n  sectionLabel: {\n    fontSize: \"20px\",\n    fontWeight: 800,\n    color: \"#2c3e50\",\n    margin: \"22px 0 10px\",\n  },\n  paragraph: {\n    fontSize: \"16px\",\n    margin: \"0 0 14px\",\n  },\n  twoColumn: {\n    display: \"grid\",\n    gridTemplateColumns: \"repeat(auto-fit, minmax(280px, 1fr))\",\n    gap: \"18px\",\n    marginTop: \"18px\",\n  },\n  card: {\n    border: \"1px solid #d9e2ec\",\n    borderRadius: \"14px\",\n    padding: \"20px\",\n    background: \"#f8fafc\",\n  },\n  cardTitle: {\n    fontSize: \"18px\",\n    fontWeight: 800,\n    color: \"#34495e\",\n    margin: \"0 0 10px\",\n  },\n  narrowed: {\n    background: \"#eef7ff\",\n    borderLeft: \"6px solid #3498db\",\n    borderRadius: \"12px\",\n    padding: \"18px\",\n  },\n  codeBlock: {\n    background: \"#111827\",\n    color: \"#f9fafb\",\n    padding: \"22px\",\n    borderRadius: \"14px\",\n    overflowX: \"auto\",\n    whiteSpace: \"pre\",\n    fontFamily:\n      \"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace\",\n    fontSize: \"14px\",\n  },\n  codeAction: {\n    padding: \"22px\",\n    border: \"3px solid #3498db\",\n    borderRadius: \"16px\",\n    background: \"#ffffff\",\n    marginTop: \"10px\",\n  },\n  simpleBox: {\n    background: \"#fff7e6\",\n    border: \"1px solid #f1c27d\",\n    borderRadius: \"14px\",\n    padding: \"20px\",\n    marginTop: \"12px\",\n  },\n  demoButton: {\n    border: \"none\",\n    background: \"#3498db\",\n    color: \"#ffffff\",\n    padding: \"10px 14px\",\n    borderRadius: \"10px\",\n    cursor: \"pointer\",\n    fontWeight: 700,\n  },\n  secondaryButton: {\n    border: \"1px solid #3498db\",\n    background: \"#ffffff\",\n    color: \"#3498db\",\n    padding: \"10px 14px\",\n    borderRadius: \"10px\",\n    cursor: \"pointer\",\n    fontWeight: 700,\n  },\n  input: {\n    width: \"100%\",\n    padding: \"10px 12px\",\n    border: \"1px solid #cbd5e1\",\n    borderRadius: \"10px\",\n    fontSize: \"15px\",\n    boxSizing: \"border-box\",\n  },\n  demoPanel: {\n    border: \"1px solid #d9e2ec\",\n    borderRadius: \"14px\",\n    padding: \"18px\",\n    background: \"#f8fafc\",\n  },\n  tag: {\n    display: \"inline-block\",\n    background: \"#e8f4fd\",\n    color: \"#2c3e50\",\n    padding: \"6px 10px\",\n    borderRadius: \"999px\",\n    margin: \"4px\",\n    fontWeight: 700,\n    fontSize: \"13px\",\n  },\n  recap: {\n    background: \"#2c3e50\",\n    color: \"#ffffff\",\n    borderRadius: \"18px\",\n    padding: \"34px\",\n    marginTop: \"40px\",\n  },\n  recapTitle: {\n    fontSize: \"38px\",\n    fontWeight: 900,\n    margin: \"0 0 8px\",\n  },\n  recapSubtitle: {\n    fontSize: \"18px\",\n    color: \"#dbeafe\",\n    margin: \"0 0 24px\",\n  },\n  recapGrid: {\n    display: \"grid\",\n    gridTemplateColumns: \"repeat(auto-fit, minmax(300px, 1fr))\",\n    gap: \"18px\",\n  },\n  recapBlock: {\n    background: \"#34495e\",\n    border: \"1px solid rgba(255,255,255,0.18)\",\n    borderRadius: \"14px\",\n    padding: \"18px\",\n  },\n  recapBlockTitle: {\n    fontSize: \"18px\",\n    fontWeight: 800,\n    color: \"#7dd3fc\",\n    margin: \"0 0 8px\",\n  },\n  recapTable: {\n    width: \"100%\",\n    borderCollapse: \"collapse\",\n    marginTop: \"24px\",\n    background: \"#ffffff\",\n    color: \"#1f2d3d\",\n    borderRadius: \"14px\",\n    overflow: \"hidden\",\n  },\n  recapTh: {\n    textAlign: \"left\",\n    padding: \"14px\",\n    background: \"#3498db\",\n    color: \"#ffffff\",\n    border: \"1px solid #2980b9\",\n  },\n  recapTd: {\n    padding: \"14px\",\n    border: \"1px solid #d9e2ec\",\n    verticalAlign: \"top\",\n  },\n  bestPractice: {\n    marginTop: \"24px\",\n    padding: \"22px\",\n    background: \"#102a43\",\n    border: \"2px solid #7dd3fc\",\n    borderRadius: \"14px\",\n  },\n};\n\nfunction DynamicSegmentsDemo() {\n  const demoIdRef = useRef(\"dynamic-segments-demo\");\n  const [itemId, setItemId] = useState(\"camera-99\");\n\n  return (\n    <div id={demoIdRef.current} style={styles.demoPanel}>\n      <h4 style={styles.cardTitle}>URL Variable Capture</h4>\n      <label>\n        Item ID\n        <input\n          value={itemId}\n          onChange={(event) => setItemId(event.target.value)}\n          style={{ ...styles.input, marginTop: \"8px\" }}\n        />\n      </label>\n      <div style={{ marginTop: \"18px\" }}>\n        <div style={styles.tag}>/inventory/{itemId || \":itemId\"}</div>\n      </div>\n      <div style={{ marginTop: \"12px\" }}>\n        <strong>params.itemId:</strong> {itemId || \"undefined\"}\n      </div>\n    </div>\n  );\n}\n\nexport default DynamicSegmentsDemo;" },
  MultipleDynamicSegmentsDemo: { entryComponentName: 'MultipleDynamicSegmentsDemo', source: "const styles = {\n  page: {\n    fontFamily:\n      \"Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif\",\n    background: \"#f4f6f8\",\n    color: \"#1f2d3d\",\n    padding: \"32px\",\n    lineHeight: 1.6,\n  },\n  slide: {\n    background: \"#ffffff\",\n    borderRadius: \"18px\",\n    padding: \"32px\",\n    marginBottom: \"36px\",\n    boxShadow: \"0 12px 30px rgba(0,0,0,0.08)\",\n  },\n  title: {\n    fontSize: \"34px\",\n    fontWeight: 800,\n    margin: \"0 0 20px\",\n    paddingLeft: \"18px\",\n    borderLeft: \"8px solid #3498db\",\n    color: \"#2c3e50\",\n  },\n  slideHeader: {\n    background: \"#2c3e50\",\n    color: \"#ffffff\",\n    padding: \"22px\",\n    borderRadius: \"14px\",\n    marginBottom: \"24px\",\n  },\n  slideHeaderTitle: {\n    fontSize: \"22px\",\n    fontWeight: 800,\n    margin: \"0 0 12px\",\n  },\n  bulletList: {\n    margin: 0,\n    paddingLeft: \"22px\",\n  },\n  bullet: {\n    marginBottom: \"8px\",\n  },\n  sectionLabel: {\n    fontSize: \"20px\",\n    fontWeight: 800,\n    color: \"#2c3e50\",\n    margin: \"22px 0 10px\",\n  },\n  paragraph: {\n    fontSize: \"16px\",\n    margin: \"0 0 14px\",\n  },\n  twoColumn: {\n    display: \"grid\",\n    gridTemplateColumns: \"repeat(auto-fit, minmax(280px, 1fr))\",\n    gap: \"18px\",\n    marginTop: \"18px\",\n  },\n  card: {\n    border: \"1px solid #d9e2ec\",\n    borderRadius: \"14px\",\n    padding: \"20px\",\n    background: \"#f8fafc\",\n  },\n  cardTitle: {\n    fontSize: \"18px\",\n    fontWeight: 800,\n    color: \"#34495e\",\n    margin: \"0 0 10px\",\n  },\n  narrowed: {\n    background: \"#eef7ff\",\n    borderLeft: \"6px solid #3498db\",\n    borderRadius: \"12px\",\n    padding: \"18px\",\n  },\n  codeBlock: {\n    background: \"#111827\",\n    color: \"#f9fafb\",\n    padding: \"22px\",\n    borderRadius: \"14px\",\n    overflowX: \"auto\",\n    whiteSpace: \"pre\",\n    fontFamily:\n      \"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace\",\n    fontSize: \"14px\",\n  },\n  codeAction: {\n    padding: \"22px\",\n    border: \"3px solid #3498db\",\n    borderRadius: \"16px\",\n    background: \"#ffffff\",\n    marginTop: \"10px\",\n  },\n  simpleBox: {\n    background: \"#fff7e6\",\n    border: \"1px solid #f1c27d\",\n    borderRadius: \"14px\",\n    padding: \"20px\",\n    marginTop: \"12px\",\n  },\n  demoButton: {\n    border: \"none\",\n    background: \"#3498db\",\n    color: \"#ffffff\",\n    padding: \"10px 14px\",\n    borderRadius: \"10px\",\n    cursor: \"pointer\",\n    fontWeight: 700,\n  },\n  secondaryButton: {\n    border: \"1px solid #3498db\",\n    background: \"#ffffff\",\n    color: \"#3498db\",\n    padding: \"10px 14px\",\n    borderRadius: \"10px\",\n    cursor: \"pointer\",\n    fontWeight: 700,\n  },\n  input: {\n    width: \"100%\",\n    padding: \"10px 12px\",\n    border: \"1px solid #cbd5e1\",\n    borderRadius: \"10px\",\n    fontSize: \"15px\",\n    boxSizing: \"border-box\",\n  },\n  demoPanel: {\n    border: \"1px solid #d9e2ec\",\n    borderRadius: \"14px\",\n    padding: \"18px\",\n    background: \"#f8fafc\",\n  },\n  tag: {\n    display: \"inline-block\",\n    background: \"#e8f4fd\",\n    color: \"#2c3e50\",\n    padding: \"6px 10px\",\n    borderRadius: \"999px\",\n    margin: \"4px\",\n    fontWeight: 700,\n    fontSize: \"13px\",\n  },\n  recap: {\n    background: \"#2c3e50\",\n    color: \"#ffffff\",\n    borderRadius: \"18px\",\n    padding: \"34px\",\n    marginTop: \"40px\",\n  },\n  recapTitle: {\n    fontSize: \"38px\",\n    fontWeight: 900,\n    margin: \"0 0 8px\",\n  },\n  recapSubtitle: {\n    fontSize: \"18px\",\n    color: \"#dbeafe\",\n    margin: \"0 0 24px\",\n  },\n  recapGrid: {\n    display: \"grid\",\n    gridTemplateColumns: \"repeat(auto-fit, minmax(300px, 1fr))\",\n    gap: \"18px\",\n  },\n  recapBlock: {\n    background: \"#34495e\",\n    border: \"1px solid rgba(255,255,255,0.18)\",\n    borderRadius: \"14px\",\n    padding: \"18px\",\n  },\n  recapBlockTitle: {\n    fontSize: \"18px\",\n    fontWeight: 800,\n    color: \"#7dd3fc\",\n    margin: \"0 0 8px\",\n  },\n  recapTable: {\n    width: \"100%\",\n    borderCollapse: \"collapse\",\n    marginTop: \"24px\",\n    background: \"#ffffff\",\n    color: \"#1f2d3d\",\n    borderRadius: \"14px\",\n    overflow: \"hidden\",\n  },\n  recapTh: {\n    textAlign: \"left\",\n    padding: \"14px\",\n    background: \"#3498db\",\n    color: \"#ffffff\",\n    border: \"1px solid #2980b9\",\n  },\n  recapTd: {\n    padding: \"14px\",\n    border: \"1px solid #d9e2ec\",\n    verticalAlign: \"top\",\n  },\n  bestPractice: {\n    marginTop: \"24px\",\n    padding: \"22px\",\n    background: \"#102a43\",\n    border: \"2px solid #7dd3fc\",\n    borderRadius: \"14px\",\n  },\n};\n\nfunction MultipleDynamicSegmentsDemo() {\n  const demoIdRef = useRef(\"multiple-dynamic-segments-demo\");\n  const [storeId, setStoreId] = useState(\"store-42\");\n  const [sku, setSku] = useState(\"sku-1001\");\n\n  return (\n    <div id={demoIdRef.current} style={styles.demoPanel}>\n      <h4 style={styles.cardTitle}>Complex URL Variable Mapping</h4>\n      <div style={styles.twoColumn}>\n        <label>\n          Store ID\n          <input\n            value={storeId}\n            onChange={(event) => setStoreId(event.target.value)}\n            style={{ ...styles.input, marginTop: \"8px\" }}\n          />\n        </label>\n        <label>\n          SKU\n          <input\n            value={sku}\n            onChange={(event) => setSku(event.target.value)}\n            style={{ ...styles.input, marginTop: \"8px\" }}\n          />\n        </label>\n      </div>\n      <div style={{ marginTop: \"18px\" }}>\n        <span style={styles.tag}>/v1/store/{storeId}/items/{sku}</span>\n      </div>\n      <div style={{ marginTop: \"12px\" }}>\n        <strong>params:</strong> {\"{\"} storeId: \"{storeId}\", sku: \"{sku}\" {\"}\"}\n      </div>\n    </div>\n  );\n}\n\nexport default MultipleDynamicSegmentsDemo;" },
  OptionalSegmentsDemo: { entryComponentName: 'OptionalSegmentsDemo', source: "const styles = {\n  page: {\n    fontFamily:\n      \"Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif\",\n    background: \"#f4f6f8\",\n    color: \"#1f2d3d\",\n    padding: \"32px\",\n    lineHeight: 1.6,\n  },\n  slide: {\n    background: \"#ffffff\",\n    borderRadius: \"18px\",\n    padding: \"32px\",\n    marginBottom: \"36px\",\n    boxShadow: \"0 12px 30px rgba(0,0,0,0.08)\",\n  },\n  title: {\n    fontSize: \"34px\",\n    fontWeight: 800,\n    margin: \"0 0 20px\",\n    paddingLeft: \"18px\",\n    borderLeft: \"8px solid #3498db\",\n    color: \"#2c3e50\",\n  },\n  slideHeader: {\n    background: \"#2c3e50\",\n    color: \"#ffffff\",\n    padding: \"22px\",\n    borderRadius: \"14px\",\n    marginBottom: \"24px\",\n  },\n  slideHeaderTitle: {\n    fontSize: \"22px\",\n    fontWeight: 800,\n    margin: \"0 0 12px\",\n  },\n  bulletList: {\n    margin: 0,\n    paddingLeft: \"22px\",\n  },\n  bullet: {\n    marginBottom: \"8px\",\n  },\n  sectionLabel: {\n    fontSize: \"20px\",\n    fontWeight: 800,\n    color: \"#2c3e50\",\n    margin: \"22px 0 10px\",\n  },\n  paragraph: {\n    fontSize: \"16px\",\n    margin: \"0 0 14px\",\n  },\n  twoColumn: {\n    display: \"grid\",\n    gridTemplateColumns: \"repeat(auto-fit, minmax(280px, 1fr))\",\n    gap: \"18px\",\n    marginTop: \"18px\",\n  },\n  card: {\n    border: \"1px solid #d9e2ec\",\n    borderRadius: \"14px\",\n    padding: \"20px\",\n    background: \"#f8fafc\",\n  },\n  cardTitle: {\n    fontSize: \"18px\",\n    fontWeight: 800,\n    color: \"#34495e\",\n    margin: \"0 0 10px\",\n  },\n  narrowed: {\n    background: \"#eef7ff\",\n    borderLeft: \"6px solid #3498db\",\n    borderRadius: \"12px\",\n    padding: \"18px\",\n  },\n  codeBlock: {\n    background: \"#111827\",\n    color: \"#f9fafb\",\n    padding: \"22px\",\n    borderRadius: \"14px\",\n    overflowX: \"auto\",\n    whiteSpace: \"pre\",\n    fontFamily:\n      \"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace\",\n    fontSize: \"14px\",\n  },\n  codeAction: {\n    padding: \"22px\",\n    border: \"3px solid #3498db\",\n    borderRadius: \"16px\",\n    background: \"#ffffff\",\n    marginTop: \"10px\",\n  },\n  simpleBox: {\n    background: \"#fff7e6\",\n    border: \"1px solid #f1c27d\",\n    borderRadius: \"14px\",\n    padding: \"20px\",\n    marginTop: \"12px\",\n  },\n  demoButton: {\n    border: \"none\",\n    background: \"#3498db\",\n    color: \"#ffffff\",\n    padding: \"10px 14px\",\n    borderRadius: \"10px\",\n    cursor: \"pointer\",\n    fontWeight: 700,\n  },\n  secondaryButton: {\n    border: \"1px solid #3498db\",\n    background: \"#ffffff\",\n    color: \"#3498db\",\n    padding: \"10px 14px\",\n    borderRadius: \"10px\",\n    cursor: \"pointer\",\n    fontWeight: 700,\n  },\n  input: {\n    width: \"100%\",\n    padding: \"10px 12px\",\n    border: \"1px solid #cbd5e1\",\n    borderRadius: \"10px\",\n    fontSize: \"15px\",\n    boxSizing: \"border-box\",\n  },\n  demoPanel: {\n    border: \"1px solid #d9e2ec\",\n    borderRadius: \"14px\",\n    padding: \"18px\",\n    background: \"#f8fafc\",\n  },\n  tag: {\n    display: \"inline-block\",\n    background: \"#e8f4fd\",\n    color: \"#2c3e50\",\n    padding: \"6px 10px\",\n    borderRadius: \"999px\",\n    margin: \"4px\",\n    fontWeight: 700,\n    fontSize: \"13px\",\n  },\n  recap: {\n    background: \"#2c3e50\",\n    color: \"#ffffff\",\n    borderRadius: \"18px\",\n    padding: \"34px\",\n    marginTop: \"40px\",\n  },\n  recapTitle: {\n    fontSize: \"38px\",\n    fontWeight: 900,\n    margin: \"0 0 8px\",\n  },\n  recapSubtitle: {\n    fontSize: \"18px\",\n    color: \"#dbeafe\",\n    margin: \"0 0 24px\",\n  },\n  recapGrid: {\n    display: \"grid\",\n    gridTemplateColumns: \"repeat(auto-fit, minmax(300px, 1fr))\",\n    gap: \"18px\",\n  },\n  recapBlock: {\n    background: \"#34495e\",\n    border: \"1px solid rgba(255,255,255,0.18)\",\n    borderRadius: \"14px\",\n    padding: \"18px\",\n  },\n  recapBlockTitle: {\n    fontSize: \"18px\",\n    fontWeight: 800,\n    color: \"#7dd3fc\",\n    margin: \"0 0 8px\",\n  },\n  recapTable: {\n    width: \"100%\",\n    borderCollapse: \"collapse\",\n    marginTop: \"24px\",\n    background: \"#ffffff\",\n    color: \"#1f2d3d\",\n    borderRadius: \"14px\",\n    overflow: \"hidden\",\n  },\n  recapTh: {\n    textAlign: \"left\",\n    padding: \"14px\",\n    background: \"#3498db\",\n    color: \"#ffffff\",\n    border: \"1px solid #2980b9\",\n  },\n  recapTd: {\n    padding: \"14px\",\n    border: \"1px solid #d9e2ec\",\n    verticalAlign: \"top\",\n  },\n  bestPractice: {\n    marginTop: \"24px\",\n    padding: \"22px\",\n    background: \"#102a43\",\n    border: \"2px solid #7dd3fc\",\n    borderRadius: \"14px\",\n  },\n};\n\nfunction OptionalSegmentsDemo() {\n  const demoIdRef = useRef(\"optional-segments-demo\");\n  const [language, setLanguage] = useState(\"\");\n  const [section, setSection] = useState(\"intro\");\n\n  const effectiveLanguage = language || \"en\";\n  const url = language\n    ? `/${language}/docs/${section}`\n    : `/docs/${section}`;\n\n  return (\n    <div id={demoIdRef.current} style={styles.demoPanel}>\n      <h4 style={styles.cardTitle}>Flexible URL Pattern Matching</h4>\n      <div style={styles.twoColumn}>\n        <label>\n          Optional Language\n          <input\n            value={language}\n            onChange={(event) => setLanguage(event.target.value)}\n            placeholder=\"fr\"\n            style={{ ...styles.input, marginTop: \"8px\" }}\n          />\n        </label>\n        <label>\n          Section\n          <input\n            value={section}\n            onChange={(event) => setSection(event.target.value)}\n            style={{ ...styles.input, marginTop: \"8px\" }}\n          />\n        </label>\n      </div>\n      <div style={{ marginTop: \"18px\" }}>\n        <span style={styles.tag}>{url}</span>\n      </div>\n      <div style={{ marginTop: \"12px\" }}>\n        <strong>Current Language:</strong> {effectiveLanguage}\n      </div>\n    </div>\n  );\n}\n\nexport default OptionalSegmentsDemo;" },
  SplatsDemo: { entryComponentName: 'SplatsDemo', source: "const styles = {\n  page: {\n    fontFamily:\n      \"Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif\",\n    background: \"#f4f6f8\",\n    color: \"#1f2d3d\",\n    padding: \"32px\",\n    lineHeight: 1.6,\n  },\n  slide: {\n    background: \"#ffffff\",\n    borderRadius: \"18px\",\n    padding: \"32px\",\n    marginBottom: \"36px\",\n    boxShadow: \"0 12px 30px rgba(0,0,0,0.08)\",\n  },\n  title: {\n    fontSize: \"34px\",\n    fontWeight: 800,\n    margin: \"0 0 20px\",\n    paddingLeft: \"18px\",\n    borderLeft: \"8px solid #3498db\",\n    color: \"#2c3e50\",\n  },\n  slideHeader: {\n    background: \"#2c3e50\",\n    color: \"#ffffff\",\n    padding: \"22px\",\n    borderRadius: \"14px\",\n    marginBottom: \"24px\",\n  },\n  slideHeaderTitle: {\n    fontSize: \"22px\",\n    fontWeight: 800,\n    margin: \"0 0 12px\",\n  },\n  bulletList: {\n    margin: 0,\n    paddingLeft: \"22px\",\n  },\n  bullet: {\n    marginBottom: \"8px\",\n  },\n  sectionLabel: {\n    fontSize: \"20px\",\n    fontWeight: 800,\n    color: \"#2c3e50\",\n    margin: \"22px 0 10px\",\n  },\n  paragraph: {\n    fontSize: \"16px\",\n    margin: \"0 0 14px\",\n  },\n  twoColumn: {\n    display: \"grid\",\n    gridTemplateColumns: \"repeat(auto-fit, minmax(280px, 1fr))\",\n    gap: \"18px\",\n    marginTop: \"18px\",\n  },\n  card: {\n    border: \"1px solid #d9e2ec\",\n    borderRadius: \"14px\",\n    padding: \"20px\",\n    background: \"#f8fafc\",\n  },\n  cardTitle: {\n    fontSize: \"18px\",\n    fontWeight: 800,\n    color: \"#34495e\",\n    margin: \"0 0 10px\",\n  },\n  narrowed: {\n    background: \"#eef7ff\",\n    borderLeft: \"6px solid #3498db\",\n    borderRadius: \"12px\",\n    padding: \"18px\",\n  },\n  codeBlock: {\n    background: \"#111827\",\n    color: \"#f9fafb\",\n    padding: \"22px\",\n    borderRadius: \"14px\",\n    overflowX: \"auto\",\n    whiteSpace: \"pre\",\n    fontFamily:\n      \"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace\",\n    fontSize: \"14px\",\n  },\n  codeAction: {\n    padding: \"22px\",\n    border: \"3px solid #3498db\",\n    borderRadius: \"16px\",\n    background: \"#ffffff\",\n    marginTop: \"10px\",\n  },\n  simpleBox: {\n    background: \"#fff7e6\",\n    border: \"1px solid #f1c27d\",\n    borderRadius: \"14px\",\n    padding: \"20px\",\n    marginTop: \"12px\",\n  },\n  demoButton: {\n    border: \"none\",\n    background: \"#3498db\",\n    color: \"#ffffff\",\n    padding: \"10px 14px\",\n    borderRadius: \"10px\",\n    cursor: \"pointer\",\n    fontWeight: 700,\n  },\n  secondaryButton: {\n    border: \"1px solid #3498db\",\n    background: \"#ffffff\",\n    color: \"#3498db\",\n    padding: \"10px 14px\",\n    borderRadius: \"10px\",\n    cursor: \"pointer\",\n    fontWeight: 700,\n  },\n  input: {\n    width: \"100%\",\n    padding: \"10px 12px\",\n    border: \"1px solid #cbd5e1\",\n    borderRadius: \"10px\",\n    fontSize: \"15px\",\n    boxSizing: \"border-box\",\n  },\n  demoPanel: {\n    border: \"1px solid #d9e2ec\",\n    borderRadius: \"14px\",\n    padding: \"18px\",\n    background: \"#f8fafc\",\n  },\n  tag: {\n    display: \"inline-block\",\n    background: \"#e8f4fd\",\n    color: \"#2c3e50\",\n    padding: \"6px 10px\",\n    borderRadius: \"999px\",\n    margin: \"4px\",\n    fontWeight: 700,\n    fontSize: \"13px\",\n  },\n  recap: {\n    background: \"#2c3e50\",\n    color: \"#ffffff\",\n    borderRadius: \"18px\",\n    padding: \"34px\",\n    marginTop: \"40px\",\n  },\n  recapTitle: {\n    fontSize: \"38px\",\n    fontWeight: 900,\n    margin: \"0 0 8px\",\n  },\n  recapSubtitle: {\n    fontSize: \"18px\",\n    color: \"#dbeafe\",\n    margin: \"0 0 24px\",\n  },\n  recapGrid: {\n    display: \"grid\",\n    gridTemplateColumns: \"repeat(auto-fit, minmax(300px, 1fr))\",\n    gap: \"18px\",\n  },\n  recapBlock: {\n    background: \"#34495e\",\n    border: \"1px solid rgba(255,255,255,0.18)\",\n    borderRadius: \"14px\",\n    padding: \"18px\",\n  },\n  recapBlockTitle: {\n    fontSize: \"18px\",\n    fontWeight: 800,\n    color: \"#7dd3fc\",\n    margin: \"0 0 8px\",\n  },\n  recapTable: {\n    width: \"100%\",\n    borderCollapse: \"collapse\",\n    marginTop: \"24px\",\n    background: \"#ffffff\",\n    color: \"#1f2d3d\",\n    borderRadius: \"14px\",\n    overflow: \"hidden\",\n  },\n  recapTh: {\n    textAlign: \"left\",\n    padding: \"14px\",\n    background: \"#3498db\",\n    color: \"#ffffff\",\n    border: \"1px solid #2980b9\",\n  },\n  recapTd: {\n    padding: \"14px\",\n    border: \"1px solid #d9e2ec\",\n    verticalAlign: \"top\",\n  },\n  bestPractice: {\n    marginTop: \"24px\",\n    padding: \"22px\",\n    background: \"#102a43\",\n    border: \"2px solid #7dd3fc\",\n    borderRadius: \"14px\",\n  },\n};\n\nfunction SplatsDemo() {\n  const demoIdRef = useRef(\"splats-demo\");\n  const [path, setPath] = useState(\"images/summer/beach.jpg\");\n\n  return (\n    <div id={demoIdRef.current} style={styles.demoPanel}>\n      <h4 style={styles.cardTitle}>Catch-all Route Matching</h4>\n      <label>\n        Archive Path\n        <input\n          value={path}\n          onChange={(event) => setPath(event.target.value)}\n          style={{ ...styles.input, marginTop: \"8px\" }}\n        />\n      </label>\n      <div style={{ marginTop: \"18px\" }}>\n        <span style={styles.tag}>/archive/{path}</span>\n      </div>\n      <div style={{ marginTop: \"12px\" }}>\n        <strong>params[\"*\"]:</strong> {path}\n      </div>\n    </div>\n  );\n}\n\nexport default SplatsDemo;" },
  SplatCatchallDemo: { entryComponentName: 'SplatCatchallDemo', source: "const styles = {\n  page: {\n    fontFamily:\n      \"Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif\",\n    background: \"#f4f6f8\",\n    color: \"#1f2d3d\",\n    padding: \"32px\",\n    lineHeight: 1.6,\n  },\n  slide: {\n    background: \"#ffffff\",\n    borderRadius: \"18px\",\n    padding: \"32px\",\n    marginBottom: \"36px\",\n    boxShadow: \"0 12px 30px rgba(0,0,0,0.08)\",\n  },\n  title: {\n    fontSize: \"34px\",\n    fontWeight: 800,\n    margin: \"0 0 20px\",\n    paddingLeft: \"18px\",\n    borderLeft: \"8px solid #3498db\",\n    color: \"#2c3e50\",\n  },\n  slideHeader: {\n    background: \"#2c3e50\",\n    color: \"#ffffff\",\n    padding: \"22px\",\n    borderRadius: \"14px\",\n    marginBottom: \"24px\",\n  },\n  slideHeaderTitle: {\n    fontSize: \"22px\",\n    fontWeight: 800,\n    margin: \"0 0 12px\",\n  },\n  bulletList: {\n    margin: 0,\n    paddingLeft: \"22px\",\n  },\n  bullet: {\n    marginBottom: \"8px\",\n  },\n  sectionLabel: {\n    fontSize: \"20px\",\n    fontWeight: 800,\n    color: \"#2c3e50\",\n    margin: \"22px 0 10px\",\n  },\n  paragraph: {\n    fontSize: \"16px\",\n    margin: \"0 0 14px\",\n  },\n  twoColumn: {\n    display: \"grid\",\n    gridTemplateColumns: \"repeat(auto-fit, minmax(280px, 1fr))\",\n    gap: \"18px\",\n    marginTop: \"18px\",\n  },\n  card: {\n    border: \"1px solid #d9e2ec\",\n    borderRadius: \"14px\",\n    padding: \"20px\",\n    background: \"#f8fafc\",\n  },\n  cardTitle: {\n    fontSize: \"18px\",\n    fontWeight: 800,\n    color: \"#34495e\",\n    margin: \"0 0 10px\",\n  },\n  narrowed: {\n    background: \"#eef7ff\",\n    borderLeft: \"6px solid #3498db\",\n    borderRadius: \"12px\",\n    padding: \"18px\",\n  },\n  codeBlock: {\n    background: \"#111827\",\n    color: \"#f9fafb\",\n    padding: \"22px\",\n    borderRadius: \"14px\",\n    overflowX: \"auto\",\n    whiteSpace: \"pre\",\n    fontFamily:\n      \"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace\",\n    fontSize: \"14px\",\n  },\n  codeAction: {\n    padding: \"22px\",\n    border: \"3px solid #3498db\",\n    borderRadius: \"16px\",\n    background: \"#ffffff\",\n    marginTop: \"10px\",\n  },\n  simpleBox: {\n    background: \"#fff7e6\",\n    border: \"1px solid #f1c27d\",\n    borderRadius: \"14px\",\n    padding: \"20px\",\n    marginTop: \"12px\",\n  },\n  demoButton: {\n    border: \"none\",\n    background: \"#3498db\",\n    color: \"#ffffff\",\n    padding: \"10px 14px\",\n    borderRadius: \"10px\",\n    cursor: \"pointer\",\n    fontWeight: 700,\n  },\n  secondaryButton: {\n    border: \"1px solid #3498db\",\n    background: \"#ffffff\",\n    color: \"#3498db\",\n    padding: \"10px 14px\",\n    borderRadius: \"10px\",\n    cursor: \"pointer\",\n    fontWeight: 700,\n  },\n  input: {\n    width: \"100%\",\n    padding: \"10px 12px\",\n    border: \"1px solid #cbd5e1\",\n    borderRadius: \"10px\",\n    fontSize: \"15px\",\n    boxSizing: \"border-box\",\n  },\n  demoPanel: {\n    border: \"1px solid #d9e2ec\",\n    borderRadius: \"14px\",\n    padding: \"18px\",\n    background: \"#f8fafc\",\n  },\n  tag: {\n    display: \"inline-block\",\n    background: \"#e8f4fd\",\n    color: \"#2c3e50\",\n    padding: \"6px 10px\",\n    borderRadius: \"999px\",\n    margin: \"4px\",\n    fontWeight: 700,\n    fontSize: \"13px\",\n  },\n  recap: {\n    background: \"#2c3e50\",\n    color: \"#ffffff\",\n    borderRadius: \"18px\",\n    padding: \"34px\",\n    marginTop: \"40px\",\n  },\n  recapTitle: {\n    fontSize: \"38px\",\n    fontWeight: 900,\n    margin: \"0 0 8px\",\n  },\n  recapSubtitle: {\n    fontSize: \"18px\",\n    color: \"#dbeafe\",\n    margin: \"0 0 24px\",\n  },\n  recapGrid: {\n    display: \"grid\",\n    gridTemplateColumns: \"repeat(auto-fit, minmax(300px, 1fr))\",\n    gap: \"18px\",\n  },\n  recapBlock: {\n    background: \"#34495e\",\n    border: \"1px solid rgba(255,255,255,0.18)\",\n    borderRadius: \"14px\",\n    padding: \"18px\",\n  },\n  recapBlockTitle: {\n    fontSize: \"18px\",\n    fontWeight: 800,\n    color: \"#7dd3fc\",\n    margin: \"0 0 8px\",\n  },\n  recapTable: {\n    width: \"100%\",\n    borderCollapse: \"collapse\",\n    marginTop: \"24px\",\n    background: \"#ffffff\",\n    color: \"#1f2d3d\",\n    borderRadius: \"14px\",\n    overflow: \"hidden\",\n  },\n  recapTh: {\n    textAlign: \"left\",\n    padding: \"14px\",\n    background: \"#3498db\",\n    color: \"#ffffff\",\n    border: \"1px solid #2980b9\",\n  },\n  recapTd: {\n    padding: \"14px\",\n    border: \"1px solid #d9e2ec\",\n    verticalAlign: \"top\",\n  },\n  bestPractice: {\n    marginTop: \"24px\",\n    padding: \"22px\",\n    background: \"#102a43\",\n    border: \"2px solid #7dd3fc\",\n    borderRadius: \"14px\",\n  },\n};\n\nfunction SplatCatchallDemo() {\n  const demoIdRef = useRef(\"splat-catchall-demo\");\n  const [path, setPath] = useState(\"/unknown/deep/link\");\n\n  const knownRoutes = [\"/\", \"/about\"];\n  const isKnown = knownRoutes.includes(path);\n\n  return (\n    <div id={demoIdRef.current} style={styles.demoPanel}>\n      <h4 style={styles.cardTitle}>Global Error and Fallback Handling</h4>\n      <label>\n        Requested URL\n        <input\n          value={path}\n          onChange={(event) => setPath(event.target.value)}\n          style={{ ...styles.input, marginTop: \"8px\" }}\n        />\n      </label>\n      <div\n        style={{\n          marginTop: \"18px\",\n          background: isKnown ? \"#ecfdf5\" : \"#fff1f2\",\n          border: isKnown ? \"1px solid #10b981\" : \"1px solid #fb7185\",\n          borderRadius: \"12px\",\n          padding: \"16px\",\n        }}\n      >\n        {isKnown ? (\n          <div>\n            <strong>Matched route:</strong> {path}\n          </div>\n        ) : (\n          <div>\n            <h3 style={{ margin: \"0 0 8px\" }}>404 - Lost in Space</h3>\n            <p style={styles.paragraph}>We couldn't find that page.</p>\n            <button type=\"button\" style={styles.demoButton} onClick={() => setPath(\"/\")}>\n              Go Home\n            </button>\n          </div>\n        )}\n      </div>\n    </div>\n  );\n}\n\nexport default SplatCatchallDemo;" }
}

const slides = [
      {
        title: "Configuring Routes",
        concept: "Route Definition and Mapping",
        bullets: [
          "Routes are configured in app/routes.ts",
          "Each route has two required parts",
          "a URL pattern to match the URL",
          "a file path to the route module that defines its behavior.",
        ],
        description:
          "In modern React development using the Remix/React Router framework, routing is handled through a centralized configuration file located at app/routes.ts. This approach moves away from traditional component-based routing declarations and instead uses a structured configuration array. Each entry in this configuration acts as a bridge between a specific web address (the URL pattern) and the physical code file (the route module) that should execute when that address is visited. This decoupling allows the application to understand the entire navigation structure before any specific UI components are even loaded.",
        realWorldApplication:
          "Imagine a massive legal document archive. Instead of wandering through floors of physical folders, the system uses a Master Index located at the front desk. This index lists specific codes (URL patterns) and the exact shelf location (file path) where the relevant documents are stored. When a clerk requests a specific code, the index immediately points them to the correct shelf, ensuring that only the requested file is retrieved and processed.",
        broadScaleUsage:
          "At an architectural level, centralized route configuration enables high-performance features like pre-fetching and parallel data loading. Because the framework has a complete map of every route in the app/routes.ts file, it can optimize the delivery of assets. When a user hovers over a link, the system can look up the associated file path in the config and begin downloading the necessary logic and data before the user even clicks, drastically reducing perceived latency in large-scale applications.",
        narrowedApproach:
          "To implement a route, you use the route function imported from the framework's development package. This function accepts two primary string arguments: the path (e.g., \"about-us\") and the relative path to the .tsx file that contains the component and logic for that page. The configuration array is then exported as the default value, often using TypeScript's \"satisfies\" operator to ensure the object structure strictly adheres to the expected RouteConfig type, preventing runtime errors caused by typos in the configuration.",
        codeExample: configuringRoutesCode,
        simpleTermsExplanation:
          "The code starts by importing two specific tools from the react-router library: 'route', which is a helper function to create a single route entry, and 'RouteConfig', which is a set of rules (a type) that our list must follow. We then create a default export which is a list (an array) contained in square brackets. Inside this list, we call the 'route' function twice. The first one says: \"If the user goes to the website address ending in /legal/privacy-policy, look inside the 'routes' folder and run the code found in 'privacy.tsx'.\" The second one does the same for the terms of service. Finally, 'satisfies RouteConfig' acts like a quality control inspector, double-checking that we haven't forgotten any required information or made a mistake in how we wrote our list.",
        Demo: ConfiguringRoutesDemo,
      },
      {
        title: "Routes via file naming conventions",
        concept: "File System Routing Integration",
        bullets: [
          "@react-router/fs-routes provides a file system routing convention",
        ],
        description:
          "While manual route configuration offers maximum control, the React Router ecosystem also supports \"File System Routing\" through the @react-router/fs-routes package. This approach automates the creation of routes by scanning the physical folder structure of the project. Instead of writing a manual entry for every single page, the developer can use a helper function to automatically generate route definitions based on where files are placed on the disk. This creates a hybrid environment where specific core routes can be defined manually while the rest of the application's pages are discovered automatically.",
        realWorldApplication:
          "Consider a large corporate office building with a smart directory system. Instead of a manager manually typing every employee's room number into a central computer, the system simply detects when a nameplate is slid into a door holder. If a new employee moves into room 405, the directory automatically updates to show they are there because the physical \"file\" (the employee) exists in that specific \"folder\" (the room).",
        broadScaleUsage:
          "In large-scale enterprise applications, file system routing significantly reduces \"configuration fatigue\" and merge conflicts in version control. When dozens of developers are adding new features simultaneously, they don't all need to edit the same central app/routes.ts file. By relying on naming conventions, the project architecture becomes more scalable and self-documenting, as the folder structure directly mirrors the website's URL structure, making it easier for new engineers to navigate the codebase.",
        narrowedApproach:
          "The technical implementation involves importing the flatRoutes function from the @react-router/fs-routes package. Inside the main configuration array in app/routes.ts, the developer uses the spread operator (...) combined with await flatRoutes() to inject the automatically discovered routes. This allows the application to combine a manually defined home route (using the standard route() function) with a collection of dynamic routes generated from the file system. The use of await indicates that the file system scan is an asynchronous process that must complete before the final configuration is settled.",
        codeExample: fileNamingRoutesCode,
        simpleTermsExplanation:
          "This code combines two different ways of building a website map. First, we import our usual tools and a new one called 'flatRoutes'. Inside our main list (the export default array), we start by manually setting the very first page: the home page at \"/\". Then, we see three dots followed by a command in parentheses: '...(await flatRoutes())'. The 'flatRoutes()' part is like a robot that goes out and explores your project folders to see what other pages you've created. The 'await' word tells the code to wait until the robot is finished exploring. The three dots (the spread operator) take everything the robot found and \"pours\" those items directly into our main list. Finally, 'satisfies RouteConfig' ensures that the combination of our manual home page and the robot's discovered pages all fit the correct technical format required by the app.",
        Demo: FileNamingRoutesDemo,
      },
      {
        title: "Route Modules",
        concept: "Component and Data Integration",
        bullets: [
          "The files referenced in routes.ts define each route's behavior.",
        ],
        description:
          "A Route Module is the core functional unit of a React Router application. While the configuration file maps URLs to files, the Route Module itself defines what happens when that URL is accessed. These modules are responsible for two primary tasks: fetching the necessary data (via a \"loader\" function) and rendering the user interface (via a default React component). By co-locating the data fetching logic and the UI logic in a single file, the framework ensures that the UI always has the specific data it needs to display, creating a tight link between the server-side data and the client-side presentation.",
        realWorldApplication:
          "Think of a restaurant's kitchen operations for a specific dish, like a signature steak. The \"loader\" is the prep cook who gathers the specific cut of meat and ingredients based on the order details. The \"Component\" is the executive chef who takes those prepared ingredients and plates them beautifully for the customer. Both must work in the same kitchen area (the same file) to ensure that the chef isn't waiting for ingredients and the prep cook provides exactly what the chef needs for that specific recipe.",
        broadScaleUsage:
          "In high-traffic applications, this pattern prevents the \"waterfall\" effect, where a page loads, then triggers a script, which then fetches data, causing multiple loading spinners. Because the loader runs on the server (or during the routing transition), the framework can fetch data for multiple nested routes in parallel. This architecture ensures that the page remains interactive and fully populated with data the moment the transition finishes, providing a seamless experience even when dealing with complex datasets or slow network connections.",
        narrowedApproach:
          "Technically, a Route Module exports two main entities. First is an async function loader, which receives params (like an ID from the URL) and returns the data needed for the page. Second is a default function Component, which receives loaderData as a prop. To ensure type safety, developers import a special Route type from a generated folder, which allows TypeScript to automatically know the shape of the data being passed from the loader to the component. This prevents common bugs where the UI tries to access data properties that don't exist or haven't loaded yet.",
        codeExample: routeModulesCode,
        simpleTermsExplanation:
          "This file is the \"brain\" for a specific page. At the top, we import 'Route', which is a set of instructions that helps the computer keep track of our data types. The 'loader' function is like a personal shopper; it looks at the 'params' (the specific ID in the website address) and goes out to 'fetch' the correct information from a database. Once it has the data, it returns it in a neat package. Below that, the 'Component' is the artist. It receives that package of information as 'loaderData'. Inside the HTML tags, we tell the artist exactly where to put the information, like putting the team's name inside a large heading (h1) and their rank inside a paragraph (p). Because the loader and the component are in the same file, the artist always knows exactly what's inside the package the shopper is bringing back.",
        Demo: RouteModulesDemo,
      },
      {
        title: "Nested Routes",
        concept: "Hierarchical Route Structure",
        bullets: ["Routes can be nested inside parents routes"],
        description:
          "Nested routing is a powerful feature of React Router that allows for the creation of complex, hierarchical user interfaces. In this pattern, a \"parent\" route serves as a structural layout that contains \"child\" routes. When a child route is visited, both the parent component and the child component are rendered simultaneously. This allows developers to maintain persistent UI elements—such as navigation bars, sidebars, or headers—at the parent level while swapping out only the interior content based on the specific child sub-path. This creates a cohesive user experience where the entire page doesn't need to refresh or re-render when navigating between related sub-sections.",
        realWorldApplication:
          "Think of a large department store. The \"Parent Route\" is the physical building itself, providing the general atmosphere, lighting, and exterior walls. The \"Child Routes\" are the specific sections like \"Men's Clothing\" or \"Home Goods.\" When you walk from one section to another, you are still inside the same building (the parent), but the specific inventory and displays (the child content) change based on which aisle you are in. You don't leave the building and re-enter just to see a different department.",
        broadScaleUsage:
          "In sophisticated web applications, nested routes are essential for memory management and state preservation. By nesting routes, the application can keep the parent's state (like a user's scroll position in a sidebar or a typed search query) intact while the user explores different child views. It also allows the framework to perform \"partial loads,\" where only the data for the new child route is fetched, rather than re-fetching data for the entire page. This results in significantly faster transitions and a more \"app-like\" feel for the end user.",
        narrowedApproach:
          "Technically, nesting is achieved in app/routes.ts by passing an array of child routes as the third argument to the route() function. To display these children within the parent's layout, the parent component must use the <Outlet /> component imported from react-router. The <Outlet /> acts as a placeholder or a \"portal\" that tells the parent exactly where the child content should be injected into the JSX. Additionally, the index() function can be used to define which child should show up by default when only the parent's path is visited.",
        codeExample: nestedRoutesCode,
        simpleTermsExplanation:
          "This setup creates a \"box within a box\" structure. In our route list, we create a parent route called \"account\". Inside that parent, we have a list of children: an 'index' (the default starting page), \"security\", and \"billing\". The parent layout file is like a picture frame. It has a navigation menu on the left that stays there no matter what. Inside the main section of that frame, we put the <Outlet /> tag. You can think of the <Outlet /> as a \"Reserved Parking\" spot. When a user clicks on \"Security,\" the security page code drives into that parking spot. If they click \"Billing,\" the security page leaves, and the billing page parks there instead. The frame (the navigation and layout) never moves, only the content inside the \"Reserved Parking\" spot changes.",
        Demo: NestedRoutesDemo,
      },
      {
        title: "Route Prefixes",
        concept: "Path Namespacing and Organization",
        bullets: [
          "you can add a path prefix",
          "No need to introduce a parent route",
          "Doesn’t introduce a new route into the route tree",
          "Modifies the paths of its children",
        ],
        description:
          "Route prefixes provide a way to group related routes under a common URL path segment without the overhead of creating a nested layout. Unlike nested routing, which requires a parent component and an <Outlet />, a prefix is purely organizational. It prepends a specific string to the URL of every route defined within its block. This allows developers to create logical \"namespaces\" in their URL structure (like grouping all administrative tools under \"/admin\") while keeping the actual route components completely independent from one another.",
        realWorldApplication:
          "Imagine a large community center that offers various classes. They have \"Yoga,\" \"Pottery,\" and \"Painting.\" To make things organized, the website uses a prefix called \"classes.\" So the URLs become \"classes/yoga\" and \"classes/pottery.\" Even though they all start with \"classes,\" the Yoga room and the Pottery studio are completely separate places with their own rules and setups. They don't share a \"parent\" room; the word \"classes\" is just a label used on the hallway sign to help people find the right door.",
        broadScaleUsage:
          "In large-scale application development, prefixes are essential for maintaining a clean and predictable URL API. They allow teams to modularize their routing configuration. For instance, an e-commerce platform might have dozens of routes related to the checkout process. By using a \"checkout\" prefix, the developers ensure that all these routes are automatically namespaced, reducing the risk of path collisions and making the routing table much easier to read and maintain as the project grows to include hundreds of different pages.",
        narrowedApproach:
          "Technically, the prefix() function is used within the app/routes.ts file. It takes two arguments: the prefix string (the shared path) and an array of routes. Every route() defined inside that array will automatically have the prefix prepended to its own path. It is important to note that this does not create a \"parent\" route in the technical sense; there is no shared layout component being rendered. It is simply a syntactic sugar that transforms prefix(\"admin\", [route(\"users\", \"./users.tsx\")]) into the equivalent of route(\"admin/users\", \"./users.tsx\").",
        codeExample: routePrefixesCode,
        simpleTermsExplanation:
          "The prefix tool is like a \"Copy-Paste\" assistant for your website addresses. Instead of typing \"/settings/profile,\" \"/settings/notifications,\" and \"/settings/privacy\" over and over again, you tell the computer: \"Everything in this specific list should start with the word 'settings'.\" You wrap your routes inside the prefix(\"settings\", [...]) function. The computer then automatically glues \"settings/\" to the front of every link inside that list. This keeps your code looking clean and organized, but because it's just a prefix, each page (like the profile page or the privacy page) still acts as its own completely separate screen with no shared background or borders.",
        Demo: RoutePrefixesDemo,
      },
      {
        title: "Dynamic Segments",
        concept: "URL Variable Capture",
        bullets: [
          "starts with :",
          "provided as params to other router APIs",
        ],
        description:
          "Dynamic segments are the primary mechanism for creating flexible, data-driven routes in React Router. By prefixing a path segment with a colon (e.g., :teamId), developers create a \"variable\" within the URL structure. This segment acts as a wildcard that matches any string provided in that position of the web address. These captured values are then automatically extracted by the framework and passed into critical functions like loaders and actions as \"params.\" This allows a single route module to dynamically render content for thousands of different records—such as individual users, products, or posts—simply by reading the ID provided in the browser's address bar.",
        realWorldApplication:
          "Consider a massive public library with millions of books. The library doesn't build a separate building for every single book title. Instead, they have a \"Book Details\" desk. When you walk up to that desk, you provide a unique ISBN or catalog number. The desk (the route) is the same for everyone, but the information you get back depends entirely on the specific ID you handed over. The colon in :teamId is like the blank line on a library request form where you write the specific book code you are looking for.",
        broadScaleUsage:
          "In high-scale systems, dynamic segments are vital for SEO and deep-linking. They allow every piece of content in a database to have its own unique, shareable URL without requiring the developer to manually define every possible path. Furthermore, because these params are available globally within the routing context, the framework can use them to intelligently manage cache keys. If a user navigates from /teams/red-sox to /teams/yankees, the framework recognizes that the :teamId has changed and knows exactly which data needs to be re-fetched while keeping the rest of the application layout stable.",
        narrowedApproach:
          "To implement a dynamic segment, you define the path in app/routes.ts using the colon syntax: route(\"teams/:teamId\", \"./team.tsx\"). Inside the team.tsx module, the loader function receives an object containing a params key. This params object will have a property that matches the name used in the route definition (in this case, params.teamId). By using TypeScript and the generated Route types, the developer gets full \"IntelliSense\" and type safety, meaning the code editor will automatically suggest teamId and confirm that it is a string, drastically reducing the chance of runtime errors when accessing URL variables.",
        codeExample: dynamicSegmentsCode,
        simpleTermsExplanation:
          "A dynamic segment is like a \"Fill-in-the-Blank\" part of a website address. When we write teams/:teamId, the colon tells the computer: \"The word 'teams' will stay the same, but the next part is a variable that the user will provide.\" If a user types website.com/teams/123, the computer grabs that \"123\" and stores it in a variable called teamId. Inside our code, we can then reach into a special container called params to pull that number out. We use it twice: first in the loader to tell the database exactly which team's info to go find, and second in the Component to display that ID right on the screen. It’s one single file that can magically transform to show information for any team just by changing the ID in the URL.",
        Demo: DynamicSegmentsDemo,
      },
      {
        title: "Multiple Dynamic Segments",
        concept: "Complex URL Variable Mapping",
        bullets: [
          "You can have multiple dynamic segments in one route path:",
        ],
        description:
          "React Router allows for highly specific and hierarchical data targeting by supporting multiple dynamic segments within a single URL path. By including more than one colon-prefixed variable (e.g., :categoryId and :productId), developers can create routes that reflect complex data relationships. This is particularly useful for deep-linking into specific items that exist within a nested category or ownership structure. Each dynamic segment acts as an independent variable that the framework captures and bundles into a single params object, providing the developer with all the identifiers necessary to pinpoint a unique record in a database.",
        realWorldApplication:
          "Think of a large global shipping company. To track a package, they don't just use a single number. They might use a URL like region/:regionId/hub/:hubId/parcel/:parcelId. The :regionId tells you which part of the world it's in, the :hubId tells you the specific sorting facility, and the :parcelId is the unique code for the box itself. By using multiple segments, the tracking page knows exactly which regional database to query and which specific item to display without needing three separate search pages.",
        broadScaleUsage:
          "In enterprise-level application architecture, multiple dynamic segments enable \"context-aware\" routing. This allows for better data isolation and security. For example, in a multi-tenant platform, every URL might start with :orgId, ensuring that every subsequent data fetch (like :reportId or :userId) is scoped correctly to that specific organization. This prevents data leakage between clients and allows the framework to manage sophisticated caching layers where assets are invalidated based on the specific combination of URL parameters.",
        narrowedApproach:
          "Technically, the route() function in app/routes.ts is defined with a string containing multiple variables: route(\"c/:categoryId/p/:productId\", \"./product.tsx\"). When a user visits a matching URL, the loader function in product.tsx receives a params object that contains keys for every dynamic segment defined. Using TypeScript with the generated Route type is especially critical here, as it provides a typed object containing both categoryId and productId as strings. This ensures that the developer can safely use these values to make compound database queries (e.g., \"Find the product with this ID that belongs to this specific category\").",
        codeExample: multipleDynamicSegmentsCode,
        simpleTermsExplanation:
          "Multiple dynamic segments are like having a \"Multi-Level Fill-in-the-Blank\" address. In the example c/:categoryId/p/:productId, we have two blanks to fill. If a user goes to website.com/c/electronics/p/camera-99, the computer is smart enough to realize that \"electronics\" belongs in the categoryId bucket and \"camera-99\" belongs in the productId bucket. Inside the code, we get a single container called params that holds both pieces of information at once. We then use both pieces of info—like a set of GPS coordinates—to find the exact product in the exact category. This makes the website address very descriptive for both the user and the computer, showing exactly where you are in a large collection of items.",
        Demo: MultipleDynamicSegmentsDemo,
      },
      {
        title: "Optional Segments",
        concept: "Flexible URL Pattern Matching",
        bullets: ["adding a ? to the end of the segment."],
        description:
          "Optional segments allow a single route definition to match multiple URL patterns by making a specific part of the path non-mandatory. By appending a question mark (?) to a segment name (e.g., :lang?), the router is instructed to match the URL whether that segment is present or not. This is highly effective for implementing features like localization, where a language code might be present in the URL but should default to a standard value if omitted. It consolidates what would otherwise require two separate route entries into one manageable definition, ensuring that the same logic and component are used for both the specific and general versions of a path.",
        realWorldApplication:
          "Think of a standard registration form at a professional conference. The form has a field for \"Middle Name.\" Because some people don't have middle names, that specific line on the paper is marked with an asterisk or labeled \"Optional.\" Whether you fill it in or leave it blank, you are still filling out the same registration form and handing it to the same clerk. The ? in a URL works exactly like that \"Optional\" label on the paper form.",
        broadScaleUsage:
          "In global-scale applications, optional segments are critical for maintaining clean URL structures while supporting advanced features. For instance, a platform might use an optional :version? segment at the start of its API routes. This allows developers to access the latest features via /api/users while still supporting legacy integrations that might explicitly call /api/v1/users. This approach simplifies the routing table and allows the underlying code to handle versioning or localization logic internally, rather than splitting the application into dozens of nearly identical route files.",
        narrowedApproach:
          "Technically, the ? is placed at the end of a dynamic segment or a static path segment in app/routes.ts. When the segment is omitted by the user, the corresponding key in the params object will simply be undefined. Within the loader or the Component, developers can then use default values to handle the missing data. For example, if :lang? is undefined, the code can default to \"en\". In the case of static segments like edit?, the route will match both /users/123 and /users/123/edit, allowing the UI to toggle between \"view mode\" and \"edit mode\" based on the presence of that segment.",
        codeExample: optionalSegmentsCode,
        simpleTermsExplanation:
          "An optional segment is like a \"Maybe\" part of a website address. By adding a ? to a word in our route, we tell the computer: \"This part might be here, or it might not—either way, it's okay.\" If a user types website.com/fr/docs/intro, the computer sees \"fr\" as the language. If they just type website.com/docs/intro, the computer doesn't get confused or show an error; it just realizes the language part is missing. Inside our code, we use a simple \"OR\" trick (||) to say: \"Use the language the user typed, OR just use 'en' if they didn't type anything.\" This allows one single file to handle both cases perfectly.",
        Demo: OptionalSegmentsDemo,
      },
      {
        title: "Splats",
        concept: "Catch-all Route Matching",
        bullets: ['Also known as "catchall" and "star" segments'],
        description:
          "Splat routes, denoted by an asterisk (*), serve as a \"catch-all\" mechanism within the React Router system. While dynamic segments match a single specific part of a URL, a splat segment matches everything that remains in the URL path from that point forward. This is exceptionally useful for handling unknown numbers of URL segments or for creating 404 \"Not Found\" pages. When a splat route is matched, the framework captures the entire trailing portion of the URL string and provides it to the developer, allowing the application to process deep, arbitrary paths through a single route module.",
        realWorldApplication:
          "Imagine a massive hardware store with a \"Custom Orders\" desk. Most desks handle specific things like \"Paint\" or \"Plumbing.\" However, the Custom Orders desk is told: \"Take anything else that comes through the door, no matter how many items they have or what they are.\" If a customer brings in a list of twelve different obscure parts, the clerk at the Custom Orders desk accepts the entire list at once. The * is the sign above that desk that says \"Everything Else.\"",
        broadScaleUsage:
          "In complex, content-heavy architectures, splat routes are indispensable for building dynamic file browsers or documentation systems. For example, a cloud storage platform uses a splat route to handle user folders. Whether a user accesses /files/photos, /files/work/2026/spreadsheets, or any other depth of folders, the same splat route captures the entire path. This prevents the need to define infinite nested routes and allows the application to dynamically parse the captured path string to navigate deep hierarchies efficiently.",
        narrowedApproach:
          "Technically, a splat is defined in app/routes.ts by adding /* to the end of a path: route(\"files/*\", \"./files.tsx\"). Inside the loader or Component of the associated module, the captured string is accessed via the params object using the literal \"*\" key. For instance, if the URL is /files/images/summer/beach.jpg, the value of params[\"*\"] will be \"images/summer/beach.jpg\". By using the generated Route types, TypeScript ensures the developer knows that the splat parameter is available and that it contains the raw string of the captured URL remainder.",
        codeExample: splatsCode,
        simpleTermsExplanation:
          "A splat route is like a \"Giant Net\" for your website address. While regular routes look for specific words, the * tells the computer: \"Grab everything else that follows this point.\" If your route is files/* and someone types website.com/files/folder1/folder2/my-image.png, the regular routes would get confused by all those extra slashes. But the splat route just scoops up folder1/folder2/my-image.png as one big string. Inside your code, you use a special key—the actual star symbol \"*\"—to reach into the params bucket and pull that whole string out. It’s the ultimate way to handle links that can be as long or as short as the user wants.",
        Demo: SplatsDemo,
      },
      {
        title: "Splat - catchall",
        concept: "Global Error and Fallback Handling",
        bullets: [
          "splat to catch requests that don't match any route:",
        ],
        description:
          "The \"Splat - catchall\" pattern is a specific implementation of the splat (*) segment designed to handle invalid or non-existent URLs. In a routing configuration, the order of routes matters; the router attempts to match the URL against defined paths from top to bottom. By placing a splat route at the very end of the configuration, it acts as a safety net. If a user enters a URL that does not match any of the preceding specific routes, the catch-all route triggers. This is the standard architectural method for implementing custom 404 \"Page Not Found\" experiences, ensuring the application remains in control even when a user navigates to a broken or typed link.",
        realWorldApplication:
          "Imagine a high-end concierge desk at a hotel. They have specialists for \"Dinner Reservations,\" \"Theater Tickets,\" and \"Transportation.\" However, they also have a general \"Information\" desk. If a guest asks for something that doesn't fall into the main categories—like \"Where can I find a specific brand of vintage fountain pen?\"—the specific specialists won't know what to do. The guest is directed to the Information desk, which is trained to handle any request that doesn't fit a standard category, often by politely explaining that the request cannot be fulfilled or offering an alternative.",
        broadScaleUsage:
          "In production-grade web applications, the catch-all route is vital for maintaining a professional brand image and providing helpful navigation when things go wrong. Instead of the browser displaying a generic, ugly system error, the catch-all route allows the developer to render a branded 404 page with helpful links back to the home page or a search bar. Architecturally, it also allows for server-side logging of \"dead links,\" giving developers insight into common navigation errors or outdated external links that need to be redirected.",
        narrowedApproach:
          "To implement a catch-all, a route is added to the bottom of the array in app/routes.ts with the path set to simply \"*\". The corresponding module, often named catchall.tsx or 404.tsx, typically contains a loader function that throws a Response object with a 404 status code. React Router's error handling logic catches this thrown response and renders the closest error boundary or the module's component. This ensures that the browser receives the correct HTTP status code (important for SEO) while the user sees a helpful, designed interface.",
        codeExample: splatCatchallCode,
        simpleTermsExplanation:
          "The catch-all splat is like the \"Else\" at the end of a long list of instructions. We list out all our real pages first. At the very bottom, we add a route with just a star *. This star tells the computer: \"If you've checked every other page in this list and haven't found a match, use this one.\" Inside that page's code, we use a special command called throw new Response. This is like the computer raising its hand and saying, \"Wait, there's an error here!\" We give it the number 404, which is the universal code for \"Not Found.\" Then, the Component section draws a nice message on the screen with a link to take the user back home so they don't get stuck on a blank screen.",
        Demo: SplatCatchallDemo,
      },
    ]

const lectureSectionTitles = slides.map((slide) => slide.title)
const lectureSections = slides.map((slide, index) => {
  /*
   * Production-build safety note:
   * Do not use slide.Demo.name to look up demoSources.
   *
   * In local Vite dev mode, function names such as ConfiguringRoutesDemo or
   * BotanicalNavigationDemo usually remain readable. In a production build,
   * minification can rename those functions to short names like "t".
   *
   * That caused Netlify production to crash with:
   *
   *   TypeError: can't access property "source", t is undefined
   *
   * The slides and demoSources were created in the same order, so index-based
   * lookup is stable in both development and production.
   */
  const demo = Object.values(demoSources)[index]

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
      codeExample={slide.codeExample}
      demoSource={demo.source}
      entryComponentName={demo.entryComponentName}
      simpleTermsExplanation={slide.simpleTermsExplanation}
    />
  )
})

export default function Week05ReactRouterRoutePatternsMasterclass({
  onBack,
  onSectionChange,
  title = 'React Router Route Patterns',
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
          <p className="sm-kicker">AD312 • Week 05 • Lecture 03</p>
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
