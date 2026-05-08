import { useEffect, useMemo, useRef, useState } from 'react'
import '../styles/stateMasterclass.css'
import EditableCodeRunner from '../components/interactive-code/EditableCodeRunner'
import CodeBlock from '../components/CodeBlock'

const styles = {
  page: {
    fontFamily: "Arial, Helvetica, sans-serif",
    background: "#f4f6f8",
    color: "#1f2933",
    padding: "32px",
    lineHeight: 1.6
  },
  slide: {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "32px",
    marginBottom: "40px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
  },
  mainTitle: {
    fontSize: "34px",
    margin: "0 0 22px 0",
    paddingLeft: "18px",
    borderLeft: "8px solid #3498db",
    color: "#2c3e50"
  },
  slideHeader: {
    background: "#2c3e50",
    color: "#ffffff",
    padding: "22px",
    borderRadius: "14px",
    marginBottom: "24px"
  },
  concept: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "12px"
  },
  bulletList: {
    margin: 0,
    paddingLeft: "22px"
  },
  sectionTitle: {
    fontSize: "22px",
    color: "#2c3e50",
    marginTop: "26px",
    marginBottom: "12px"
  },
  twoColumn: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginTop: "22px"
  },
  infoCard: {
    background: "#eef6fb",
    border: "2px solid #d6eaf8",
    borderRadius: "14px",
    padding: "20px"
  },
  narrowedBox: {
    background: "#f8fafc",
    border: "2px solid #e5e7eb",
    borderRadius: "14px",
    padding: "20px"
  },
  codeBlock: {
    background: "#111827",
    color: "#f9fafb",
    padding: "22px",
    borderRadius: "14px",
    overflowX: "auto",
    whiteSpace: "pre-wrap",
    fontFamily: "Consolas, Monaco, monospace",
    fontSize: "14px"
  },
  demoBox: {
    padding: "24px",
    border: "3px solid #3498db",
    borderRadius: "14px",
    background: "#ffffff"
  },
  simpleTerms: {
    background: "#fff8e1",
    border: "2px solid #f1c40f",
    borderRadius: "14px",
    padding: "20px",
    marginTop: "18px"
  },
  button: {
    border: "none",
    borderRadius: "10px",
    padding: "10px 14px",
    background: "#3498db",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "bold",
    margin: "6px"
  },
  secondaryButton: {
    border: "2px solid #3498db",
    borderRadius: "10px",
    padding: "10px 14px",
    background: "#ffffff",
    color: "#2c3e50",
    cursor: "pointer",
    fontWeight: "bold",
    margin: "6px"
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "2px solid #cbd5e1",
    margin: "6px",
    minWidth: "180px"
  },
  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "2px solid #cbd5e1",
    margin: "6px"
  },
  demoPanel: {
    background: "#f8fafc",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    padding: "18px",
    marginTop: "12px"
  },
  recap: {
    background: "#2c3e50",
    color: "#ffffff",
    borderRadius: "18px",
    padding: "34px",
    marginTop: "44px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.18)"
  },
  recapTitle: {
    fontSize: "38px",
    margin: "0 0 8px 0",
    color: "#ffffff"
  },
  recapSubtitle: {
    fontSize: "22px",
    color: "#d6eaf8",
    marginBottom: "28px"
  },
  recapGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px"
  },
  recapBlock: {
    background: "#34495e",
    border: "2px solid #5dade2",
    borderRadius: "14px",
    padding: "20px"
  },
  recapTable: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "28px",
    background: "#ffffff",
    color: "#1f2933",
    borderRadius: "14px",
    overflow: "hidden"
  },
  th: {
    background: "#3498db",
    color: "#ffffff",
    textAlign: "left",
    padding: "14px",
    border: "1px solid #d6eaf8"
  },
  td: {
    padding: "14px",
    border: "1px solid #d6eaf8"
  },
  bestPractice: {
    background: "#1abc9c",
    color: "#ffffff",
    borderRadius: "14px",
    padding: "22px",
    marginTop: "28px",
    fontSize: "18px",
    fontWeight: "bold"
  }
};

function SlideHeader({ concept, bullets }) {
  return (
    <div style={styles.slideHeader}>
      <div style={styles.concept}>{concept}</div>
      <ul style={styles.bulletList}>
        {bullets.map((bullet, index) => (
          <li key={`${concept}-bullet-${index}`}>{bullet}</li>
        ))}
      </ul>
    </div>
  )
}

function insertTeachingCommentAfterFunctionOpen(code, functionName, comment) {
  const signature = `function ${functionName}() {`

  if (!code.includes(signature)) return code
  if (code.includes(`ROUTER NAVIGATION DEMO NOTES: ${functionName}`)) return code

  return code.replace(signature, `${signature}\n${comment}`)
}

function polishReactRouterNavigationDemoCode(code, entryComponentName) {
  const comments = {
    BotanicalNavigationDemo: `  /*
   * ROUTER NAVIGATION DEMO NOTES: BotanicalNavigationDemo
   *
   * This demo compares the main React Router navigation tools in one place.
   * Link and NavLink are declarative: the user chooses where to go by clicking.
   * Form is data-driven: the user submits values, then route action logic can
   * decide where the user should land. redirect is server/data-layer navigation,
   * usually returned from loaders or actions. useNavigate is imperative: app
   * logic moves the user because something happened.
   *
   * currentRoute stands in for the browser location. message explains which
   * routing tool caused the navigation. idRef acts like hidden form data so the
   * demo can show a redirect target such as /records/plant-123 without needing
   * a real Remix action function.
   */`,

    TelescopeNavigationDemo: `  /*
   * ROUTER NAVIGATION DEMO NOTES: TelescopeNavigationDemo
   *
   * NavLink is a specialized Link for menus and tabs because it understands
   * active and pending states. Active means the link already matches the current
   * URL. Pending means the app has started navigating to that URL but the next
   * screen or its data is not ready yet.
   *
   * route simulates the current URL. pendingRoute simulates React Router's
   * pending navigation state. linkStyle mirrors the className callback pattern
   * used by NavLink: choose a style based on whether the link is active,
   * pending, or inactive.
   */`,

    SessionEndNotificationDemo: `  /*
   * ROUTER NAVIGATION DEMO NOTES: SessionEndNotificationDemo
   *
   * Link is the basic client-side navigation component. It changes the URL and
   * renders the next route without forcing the browser to reload the whole app.
   * React Router can also prefetch route resources when the user shows intent,
   * such as hovering near a link.
   *
   * route represents the current URL. prefetchMessage makes the invisible
   * optimization visible, so students can see that navigation can prepare data
   * before the final click happens.
   */`,

    TimberSearchDemo: `  /*
   * ROUTER NAVIGATION DEMO NOTES: TimberSearchDemo
   *
   * Form navigation is important because many route changes are driven by user
   * input, not just plain links. A GET form commonly turns inputs into URL search
   * params so the result is bookmarkable, shareable, and restorable after a
   * refresh. A POST form usually calls an action and may redirect afterward.
   *
   * query and grade represent controlled form fields. submitSearch prevents the
   * browser's default full-page form submission, encodes the query safely, then
   * updates route to show the URL React Router would navigate to.
   */`,

    RedirectDemo: `  /*
   * ROUTER NAVIGATION DEMO NOTES: RedirectDemo
   *
   * redirect belongs in loaders and actions when navigation is the result of
   * route logic. A loader might redirect because a user is not authenticated. An
   * action might redirect after creating, updating, or deleting data.
   *
   * hasSession simulates an auth check. runLoader shows gatekeeping before the
   * protected screen renders. runAction shows post-submit navigation to a newly
   * created report page.
   */`,

    SubmersibleMonitorDemo: `  /*
   * ROUTER NAVIGATION DEMO NOTES: SubmersibleMonitorDemo
   *
   * useNavigate is for imperative navigation: the app moves the user because of
   * a condition, timer, system event, or custom callback. It should not replace
   * normal links for ordinary menu navigation because links are more accessible
   * and communicate intent better.
   *
   * isCritical simulates an external condition. useEffect watches that condition
   * and navigates to emergency protocols when the condition becomes true. The
   * manual override button shows another legitimate imperative navigation case.
   */`,
  }

  const comment = comments[entryComponentName]
  return comment ? insertTeachingCommentAfterFunctionOpen(code, entryComponentName, comment) : code
}

function getStaticNavigationReferenceCode(title, codeExample) {
  const comments = {
    'React Router - Navigating': `/*
 * STATIC NAVIGATION REFERENCE: React Router navigation tools
 *
 * This compact reference shows the five navigation tools side by side:
 * Link, NavLink, Form, redirect, and useNavigate. Compare this short route
 * snippet with the larger editable demo above. The snippet shows the canonical
 * API shape; the demo shows the behavior students can click and observe.
 */`,

    'NavLink': `/*
 * STATIC NAVIGATION REFERENCE: NavLink
 *
 * NavLink is best for navigation items that need active or pending styling.
 * Its className or style callback receives route state, so the component can
 * style itself based on the current URL instead of relying on separate manual
 * state tracking.
 */`,

    'Link': `/*
 * STATIC NAVIGATION REFERENCE: Link
 *
 * Link is the default choice for ordinary user navigation. It preserves the
 * single-page app experience by changing routes without a full browser reload.
 * Use it when the user is intentionally choosing another route.
 */`,

    'Form': `/*
 * STATIC NAVIGATION REFERENCE: Form
 *
 * Form connects user input to routing. GET forms turn fields into search params.
 * POST forms call route actions. This keeps navigation, data submission, and URL
 * state connected instead of scattering that logic across unrelated state.
 */`,

    'Redirect': `/*
 * STATIC NAVIGATION REFERENCE: redirect
 *
 * redirect is returned from loader or action logic when the data layer decides
 * the user should go somewhere else. It is ideal for auth checks, missing
 * resources, and successful mutations that should land on a new page.
 */`,

    'useNavigate': `/*
 * STATIC NAVIGATION REFERENCE: useNavigate
 *
 * useNavigate gives component logic a navigate function. Use it sparingly for
 * effects, timers, warnings, custom flows, and events that are not simple link
 * clicks. Prefer Link or NavLink for ordinary navigation.
 */`,
  }

  if (codeExample.includes('STATIC NAVIGATION REFERENCE')) return codeExample

  const comment = comments[title] || `/*
 * STATIC NAVIGATION REFERENCE
 *
 * This compact snippet shows the smaller navigation pattern for this section.
 */`

  return `${comment}\n\n${codeExample}`
}


function RecapSection() {
  const concepts = [
    {
      title: "Declarative Navigation (The User's Choice)",
      text: "The foundation of routing relies on <Link> and <NavLink>. These components allow users to move through the application via standard interaction. While <Link> handles simple movement, <NavLink> adds \"Active\" and \"Pending\" awareness, providing immediate visual feedback to the user about where they are and where the app is going."
    },
    {
      title: "Data-Driven Navigation (Forms and Filters)",
      text: "Using the <Form> component with a GET method transforms user input directly into URL search parameters. This bridges the gap between user data entry and the address bar, ensuring that every search or filter is captured in a shareable, bookmarkable URL."
    },
    {
      title: "Logic-Driven Redirection (The Gatekeeper)",
      text: "The redirect function operates within the data layer (Loaders and Actions). It acts as a server-side traffic controller, enforcing rules like authentication and authorization. It prevents unauthorized access by rerouting the user before a component even begins to render on the screen."
    },
    {
      title: "Imperative Navigation (The Automatic Pilot)",
      text: "The useNavigate hook provides the application with the ability to move the user programmatically. This is reserved for scenarios where the app must respond to events—like inactivity timeouts or critical system alerts—without waiting for a physical click from the user."
    }
  ];

  const bestPractices = [
    "Always prefer <Link> or <NavLink> over useNavigate for standard navigation to preserve accessibility.",
    "Use the end prop on <NavLink> for root paths to prevent incorrect \"active\" styling.",
    "Utilize redirect in loaders for clean, early-exit access control.",
    "Ensure useNavigate is wrapped in useEffect or event handlers to avoid render-phase navigation errors."
  ];

  const rows = [
    ["Link", "A standard click-to-go button that doesn't refresh the page."],
    ["NavLink", "A \"smart\" Link that knows if you are currently on that page."],
    ["Form (GET)", "A search box that puts your typed words into the URL address."],
    ["redirect", "A \"U-Turn\" sign sent by the server to force you to a new page."],
    ["useNavigate", "A remote control that lets the code change the page automatically."]
  ];

  return (
    <section style={styles.recap}>
      <h1 style={styles.recapTitle}>React Router Navigation Fundamentals</h1>
      <div style={styles.recapSubtitle}>The Journey from Static Links to Logic-Driven Flow</div>

      <div style={styles.recapGrid}>
        {concepts.map((concept, index) => (
          <div style={styles.recapBlock} key={index}>
            <h2>{concept.title}</h2>
            <p>{concept.text}</p>
          </div>
        ))}
      </div>

      <div style={styles.recapBlock}>
        <h2>Best Practice Highlights:</h2>
        <ul style={styles.bulletList}>
          {bestPractices.map((practice, index) => (
            <li key={index}>{practice}</li>
          ))}
        </ul>
      </div>

      <h2>Concept -&gt; Simple Explanation Table:</h2>
      <table style={styles.recapTable}>
        <thead>
          <tr>
            <th style={styles.th}>Concept</th>
            <th style={styles.th}>Simple Terms</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td style={styles.td}>{row[0]}</td>
              <td style={styles.td}>{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.bestPractice}>
        Effective navigation in React Router (Remix) is about choosing the right level of intent. By combining declarative components for users with imperative logic for the system, you create an application that is both highly accessible and strictly controlled.
      </div>
    </section>
  );
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
      <SlideHeader concept={concept} bullets={bullets} />

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
        <ul>
          {narrowedApproach.map((item, index) => (
            <li key={`${title}-approach-${index}`}>{item}</li>
          ))}
        </ul>
      </div>

      <EditableCodeRunner
        title={`React Router Navigation: ${title}`}
        initialCode={polishReactRouterNavigationDemoCode(demoSource, entryComponentName)}
        entryComponentName={entryComponentName}
        previewLabel="Code in Action"
      />

      <div className="sm-explanation">
        <h3>Static Navigation Reference</h3>
        <p className="sm-preline">
          This colorized reference keeps the shorter original navigation snippet visible.
          Compare it with the larger editable demo above: the snippet shows the compact React Router API,
          while the demo shows how that navigation behavior feels in an interactive UI.
        </p>
        <CodeBlock
          language="jsx"
          label="Navigation Reference"
          code={getStaticNavigationReferenceCode(title, codeExample)}
        />
      </div>

      <div className="sm-explanation">
        <h3>Simple Terms Explanation</h3>
        <p className="sm-preline">{simpleTermsExplanation}</p>
      </div>
    </section>
  )
}

function BotanicalNavigationDemo() {
  const idRef = useRef("plant-123");
  const [currentRoute, setCurrentRoute] = useState("/species-directory");
  const [message, setMessage] = useState("Viewing Species Directory");

  const submitSpecimen = () => {
    setCurrentRoute(`/records/${idRef.current}`);
    setMessage(`Redirected to records/${idRef.current}`);
  };

  const goBack = () => {
    setCurrentRoute("/about-the-reserve");
    setMessage("Moved back to Reserve Info");
  };

  return (
    <div>
      <h3>Botanical Navigation Demo</h3>
      <div style={styles.demoPanel}>
        <button style={styles.secondaryButton} onClick={() => { setCurrentRoute("/about-the-reserve"); setMessage("Reserve Info selected"); }}>
          Reserve Info
        </button>
        <button style={currentRoute === "/species-directory" ? styles.button : styles.secondaryButton} onClick={() => { setCurrentRoute("/species-directory"); setMessage("Species Directory selected"); }}>
          Species Directory
        </button>
        <button style={styles.button} onClick={submitSpecimen}>
          Submit Specimen
        </button>
        <button style={styles.secondaryButton} onClick={goBack}>
          Go Back
        </button>
      </div>
      <p><strong>Current route:</strong> {currentRoute}</p>
      <p><strong>Status:</strong> {message}</p>
    </div>
  );
}

function TelescopeNavigationDemo() {
  const [route, setRoute] = useState("/");
  const [pendingRoute, setPendingRoute] = useState("");

  const navigateWithPending = (nextRoute) => {
    setPendingRoute(nextRoute);
    setTimeout(() => {
      setRoute(nextRoute);
      setPendingRoute("");
    }, 500);
  };

  const linkStyle = (target) => {
    if (pendingRoute === target) {
      return {
        ...styles.secondaryButton,
        background: "#fef3c7",
        border: "2px solid #f59e0b"
      };
    }

    if (route === target) {
      return {
        ...styles.button,
        background: "#16a085"
      };
    }

    return styles.secondaryButton;
  };

  return (
    <div>
      <h3>Telescope Navigation Demo</h3>
      <div style={styles.demoPanel}>
        <button style={linkStyle("/")} onClick={() => navigateWithPending("/")}>
          Array Overview
        </button>
        <button style={linkStyle("/quadrant-alpha")} onClick={() => navigateWithPending("/quadrant-alpha")}>
          Quadrant Alpha
        </button>
        <button style={linkStyle("/deep-space-logs")} onClick={() => navigateWithPending("/deep-space-logs")}>
          Observation Logs
        </button>
      </div>
      <p><strong>Current URL:</strong> {route}</p>
      <p><strong>Pending:</strong> {pendingRoute || "None"}</p>
    </div>
  );
}

function SessionEndNotificationDemo() {
  const [route, setRoute] = useState("/session-expired");
  const [prefetchMessage, setPrefetchMessage] = useState("Move toward the re-authentication link to prefetch.");

  return (
    <div>
      <h3>Session End Notification Demo</h3>
      <div style={styles.demoPanel}>
        <p>
          Your secure session for the <strong>Turbine Telemetry System</strong> has expired.{" "}
          <button
            style={styles.button}
            onMouseEnter={() => setPrefetchMessage("Prefetch intent detected for /auth/portal")}
            onClick={() => setRoute("/auth/portal")}
          >
            Click here to re-authenticate
          </button>
        </p>

        <button style={styles.secondaryButton} onClick={() => setRoute("/public-status")}>
          View System Status (Public)
        </button>
      </div>
      <p><strong>Current route:</strong> {route}</p>
      <p><strong>Prefetch status:</strong> {prefetchMessage}</p>
    </div>
  );
}

function TimberSearchDemo() {
  const [query, setQuery] = useState("");
  const [grade, setGrade] = useState("all");
  const [route, setRoute] = useState("/catalog");

  const submitSearch = (event) => {
    event.preventDefault();
    const safeQuery = encodeURIComponent(query);
    setRoute(`/catalog?query=${safeQuery}&grade=${grade}`);
  };

  return (
    <div>
      <h3>Timber Search Demo</h3>
      <form style={styles.demoPanel} onSubmit={submitSearch}>
        <label htmlFor="demo-material-query">Search Materials:</label>
        <input
          id="demo-material-query"
          style={styles.input}
          type="text"
          value={query}
          placeholder="e.g. Oak, Walnut..."
          onChange={(event) => setQuery(event.target.value)}
        />

        <select style={styles.select} value={grade} onChange={(event) => setGrade(event.target.value)}>
          <option value="all">All Grades</option>
          <option value="premium">Premium</option>
          <option value="reclaimed">Reclaimed</option>
        </select>

        <button style={styles.button} type="submit">Filter Catalog</button>
      </form>
      <p><strong>Generated URL:</strong> {route}</p>
    </div>
  );
}

function RedirectDemo() {
  const reportIdRef = useRef("chem-482");
  const [hasSession, setHasSession] = useState(false);
  const [route, setRoute] = useState("/lab/hazardous-materials");
  const [result, setResult] = useState("No loader or action has run yet.");

  const runLoader = () => {
    if (!hasSession) {
      setRoute("/auth/login");
      setResult("Loader returned redirect(\"/auth/login\")");
    } else {
      setRoute("/lab/hazardous-materials");
      setResult("Loader returned technician session data");
    }
  };

  const runAction = () => {
    setRoute(`/lab/reports/${reportIdRef.current}`);
    setResult(`Action created a report and returned redirect("/lab/reports/${reportIdRef.current}")`);
  };

  return (
    <div>
      <h3>Redirect Demo</h3>
      <div style={styles.demoPanel}>
        <label>
          <input
            type="checkbox"
            checked={hasSession}
            onChange={(event) => setHasSession(event.target.checked)}
          />{" "}
          Technician session exists
        </label>
        <div>
          <button style={styles.button} onClick={runLoader}>Run Loader Gatekeeping</button>
          <button style={styles.secondaryButton} onClick={runAction}>Submit Lab Report Action</button>
        </div>
      </div>
      <p><strong>Current route:</strong> {route}</p>
      <p><strong>Result:</strong> {result}</p>
    </div>
  );
}

function SubmersibleMonitorDemo() {
  const [isCritical, setIsCritical] = useState(false);
  const [route, setRoute] = useState("/submersible/monitor");
  const [pressure, setPressure] = useState(870);

  useEffect(() => {
    if (isCritical) {
      setRoute("/emergency/protocols");
    }
  }, [isCritical]);

  const handleManualOverride = () => {
    setRoute("/manual-controls");
  };

  return (
    <div>
      <h3>Submersible Monitor Demo</h3>
      <div style={styles.demoPanel}>
        <p><strong>Hull Pressure:</strong> {pressure} PSI</p>
        <button style={styles.secondaryButton} onClick={() => setPressure((value) => value + 15)}>
          Increase Pressure Reading
        </button>
        <button style={styles.button} onClick={handleManualOverride}>
          Engage Override
        </button>
        <button style={styles.secondaryButton} onClick={() => setIsCritical(true)}>
          Detect Critical Breach
        </button>
        <button style={styles.secondaryButton} onClick={() => { setIsCritical(false); setRoute("/submersible/monitor"); }}>
          Reset Monitor
        </button>
      </div>
      <p><strong>Current route:</strong> {route}</p>
      <p><strong>Critical breach detected:</strong> {isCritical ? "true" : "false"}</p>
    </div>
  );
}

const demoSources = {
  BotanicalNavigationDemo: { entryComponentName: 'BotanicalNavigationDemo', source: "const styles = {\n  page: {\n    fontFamily: \"Arial, Helvetica, sans-serif\",\n    background: \"#f4f6f8\",\n    color: \"#1f2933\",\n    padding: \"32px\",\n    lineHeight: 1.6\n  },\n  slide: {\n    background: \"#ffffff\",\n    borderRadius: \"18px\",\n    padding: \"32px\",\n    marginBottom: \"40px\",\n    boxShadow: \"0 10px 30px rgba(0,0,0,0.08)\"\n  },\n  mainTitle: {\n    fontSize: \"34px\",\n    margin: \"0 0 22px 0\",\n    paddingLeft: \"18px\",\n    borderLeft: \"8px solid #3498db\",\n    color: \"#2c3e50\"\n  },\n  slideHeader: {\n    background: \"#2c3e50\",\n    color: \"#ffffff\",\n    padding: \"22px\",\n    borderRadius: \"14px\",\n    marginBottom: \"24px\"\n  },\n  concept: {\n    fontSize: \"20px\",\n    fontWeight: \"bold\",\n    marginBottom: \"12px\"\n  },\n  bulletList: {\n    margin: 0,\n    paddingLeft: \"22px\"\n  },\n  sectionTitle: {\n    fontSize: \"22px\",\n    color: \"#2c3e50\",\n    marginTop: \"26px\",\n    marginBottom: \"12px\"\n  },\n  twoColumn: {\n    display: \"grid\",\n    gridTemplateColumns: \"repeat(auto-fit, minmax(280px, 1fr))\",\n    gap: \"20px\",\n    marginTop: \"22px\"\n  },\n  infoCard: {\n    background: \"#eef6fb\",\n    border: \"2px solid #d6eaf8\",\n    borderRadius: \"14px\",\n    padding: \"20px\"\n  },\n  narrowedBox: {\n    background: \"#f8fafc\",\n    border: \"2px solid #e5e7eb\",\n    borderRadius: \"14px\",\n    padding: \"20px\"\n  },\n  codeBlock: {\n    background: \"#111827\",\n    color: \"#f9fafb\",\n    padding: \"22px\",\n    borderRadius: \"14px\",\n    overflowX: \"auto\",\n    whiteSpace: \"pre-wrap\",\n    fontFamily: \"Consolas, Monaco, monospace\",\n    fontSize: \"14px\"\n  },\n  demoBox: {\n    padding: \"24px\",\n    border: \"3px solid #3498db\",\n    borderRadius: \"14px\",\n    background: \"#ffffff\"\n  },\n  simpleTerms: {\n    background: \"#fff8e1\",\n    border: \"2px solid #f1c40f\",\n    borderRadius: \"14px\",\n    padding: \"20px\",\n    marginTop: \"18px\"\n  },\n  button: {\n    border: \"none\",\n    borderRadius: \"10px\",\n    padding: \"10px 14px\",\n    background: \"#3498db\",\n    color: \"#ffffff\",\n    cursor: \"pointer\",\n    fontWeight: \"bold\",\n    margin: \"6px\"\n  },\n  secondaryButton: {\n    border: \"2px solid #3498db\",\n    borderRadius: \"10px\",\n    padding: \"10px 14px\",\n    background: \"#ffffff\",\n    color: \"#2c3e50\",\n    cursor: \"pointer\",\n    fontWeight: \"bold\",\n    margin: \"6px\"\n  },\n  input: {\n    padding: \"10px\",\n    borderRadius: \"8px\",\n    border: \"2px solid #cbd5e1\",\n    margin: \"6px\",\n    minWidth: \"180px\"\n  },\n  select: {\n    padding: \"10px\",\n    borderRadius: \"8px\",\n    border: \"2px solid #cbd5e1\",\n    margin: \"6px\"\n  },\n  demoPanel: {\n    background: \"#f8fafc\",\n    border: \"2px solid #e5e7eb\",\n    borderRadius: \"12px\",\n    padding: \"18px\",\n    marginTop: \"12px\"\n  },\n  recap: {\n    background: \"#2c3e50\",\n    color: \"#ffffff\",\n    borderRadius: \"18px\",\n    padding: \"34px\",\n    marginTop: \"44px\",\n    boxShadow: \"0 10px 30px rgba(0,0,0,0.18)\"\n  },\n  recapTitle: {\n    fontSize: \"38px\",\n    margin: \"0 0 8px 0\",\n    color: \"#ffffff\"\n  },\n  recapSubtitle: {\n    fontSize: \"22px\",\n    color: \"#d6eaf8\",\n    marginBottom: \"28px\"\n  },\n  recapGrid: {\n    display: \"grid\",\n    gridTemplateColumns: \"repeat(auto-fit, minmax(300px, 1fr))\",\n    gap: \"20px\"\n  },\n  recapBlock: {\n    background: \"#34495e\",\n    border: \"2px solid #5dade2\",\n    borderRadius: \"14px\",\n    padding: \"20px\"\n  },\n  recapTable: {\n    width: \"100%\",\n    borderCollapse: \"collapse\",\n    marginTop: \"28px\",\n    background: \"#ffffff\",\n    color: \"#1f2933\",\n    borderRadius: \"14px\",\n    overflow: \"hidden\"\n  },\n  th: {\n    background: \"#3498db\",\n    color: \"#ffffff\",\n    textAlign: \"left\",\n    padding: \"14px\",\n    border: \"1px solid #d6eaf8\"\n  },\n  td: {\n    padding: \"14px\",\n    border: \"1px solid #d6eaf8\"\n  },\n  bestPractice: {\n    background: \"#1abc9c\",\n    color: \"#ffffff\",\n    borderRadius: \"14px\",\n    padding: \"22px\",\n    marginTop: \"28px\",\n    fontSize: \"18px\",\n    fontWeight: \"bold\"\n  }\n};\n\nfunction BotanicalNavigationDemo() {\n  const idRef = useRef(\"plant-123\");\n  const [currentRoute, setCurrentRoute] = useState(\"/species-directory\");\n  const [message, setMessage] = useState(\"Viewing Species Directory\");\n\n  const submitSpecimen = () => {\n    setCurrentRoute(`/records/${idRef.current}`);\n    setMessage(`Redirected to records/${idRef.current}`);\n  };\n\n  const goBack = () => {\n    setCurrentRoute(\"/about-the-reserve\");\n    setMessage(\"Moved back to Reserve Info\");\n  };\n\n  return (\n    <div>\n      <h3>Botanical Navigation Demo</h3>\n      <div style={styles.demoPanel}>\n        <button style={styles.secondaryButton} onClick={() => { setCurrentRoute(\"/about-the-reserve\"); setMessage(\"Reserve Info selected\"); }}>\n          Reserve Info\n        </button>\n        <button style={currentRoute === \"/species-directory\" ? styles.button : styles.secondaryButton} onClick={() => { setCurrentRoute(\"/species-directory\"); setMessage(\"Species Directory selected\"); }}>\n          Species Directory\n        </button>\n        <button style={styles.button} onClick={submitSpecimen}>\n          Submit Specimen\n        </button>\n        <button style={styles.secondaryButton} onClick={goBack}>\n          Go Back\n        </button>\n      </div>\n      <p><strong>Current route:</strong> {currentRoute}</p>\n      <p><strong>Status:</strong> {message}</p>\n    </div>\n  );\n}\n\nexport default BotanicalNavigationDemo;" },
  TelescopeNavigationDemo: { entryComponentName: 'TelescopeNavigationDemo', source: "const styles = {\n  page: {\n    fontFamily: \"Arial, Helvetica, sans-serif\",\n    background: \"#f4f6f8\",\n    color: \"#1f2933\",\n    padding: \"32px\",\n    lineHeight: 1.6\n  },\n  slide: {\n    background: \"#ffffff\",\n    borderRadius: \"18px\",\n    padding: \"32px\",\n    marginBottom: \"40px\",\n    boxShadow: \"0 10px 30px rgba(0,0,0,0.08)\"\n  },\n  mainTitle: {\n    fontSize: \"34px\",\n    margin: \"0 0 22px 0\",\n    paddingLeft: \"18px\",\n    borderLeft: \"8px solid #3498db\",\n    color: \"#2c3e50\"\n  },\n  slideHeader: {\n    background: \"#2c3e50\",\n    color: \"#ffffff\",\n    padding: \"22px\",\n    borderRadius: \"14px\",\n    marginBottom: \"24px\"\n  },\n  concept: {\n    fontSize: \"20px\",\n    fontWeight: \"bold\",\n    marginBottom: \"12px\"\n  },\n  bulletList: {\n    margin: 0,\n    paddingLeft: \"22px\"\n  },\n  sectionTitle: {\n    fontSize: \"22px\",\n    color: \"#2c3e50\",\n    marginTop: \"26px\",\n    marginBottom: \"12px\"\n  },\n  twoColumn: {\n    display: \"grid\",\n    gridTemplateColumns: \"repeat(auto-fit, minmax(280px, 1fr))\",\n    gap: \"20px\",\n    marginTop: \"22px\"\n  },\n  infoCard: {\n    background: \"#eef6fb\",\n    border: \"2px solid #d6eaf8\",\n    borderRadius: \"14px\",\n    padding: \"20px\"\n  },\n  narrowedBox: {\n    background: \"#f8fafc\",\n    border: \"2px solid #e5e7eb\",\n    borderRadius: \"14px\",\n    padding: \"20px\"\n  },\n  codeBlock: {\n    background: \"#111827\",\n    color: \"#f9fafb\",\n    padding: \"22px\",\n    borderRadius: \"14px\",\n    overflowX: \"auto\",\n    whiteSpace: \"pre-wrap\",\n    fontFamily: \"Consolas, Monaco, monospace\",\n    fontSize: \"14px\"\n  },\n  demoBox: {\n    padding: \"24px\",\n    border: \"3px solid #3498db\",\n    borderRadius: \"14px\",\n    background: \"#ffffff\"\n  },\n  simpleTerms: {\n    background: \"#fff8e1\",\n    border: \"2px solid #f1c40f\",\n    borderRadius: \"14px\",\n    padding: \"20px\",\n    marginTop: \"18px\"\n  },\n  button: {\n    border: \"none\",\n    borderRadius: \"10px\",\n    padding: \"10px 14px\",\n    background: \"#3498db\",\n    color: \"#ffffff\",\n    cursor: \"pointer\",\n    fontWeight: \"bold\",\n    margin: \"6px\"\n  },\n  secondaryButton: {\n    border: \"2px solid #3498db\",\n    borderRadius: \"10px\",\n    padding: \"10px 14px\",\n    background: \"#ffffff\",\n    color: \"#2c3e50\",\n    cursor: \"pointer\",\n    fontWeight: \"bold\",\n    margin: \"6px\"\n  },\n  input: {\n    padding: \"10px\",\n    borderRadius: \"8px\",\n    border: \"2px solid #cbd5e1\",\n    margin: \"6px\",\n    minWidth: \"180px\"\n  },\n  select: {\n    padding: \"10px\",\n    borderRadius: \"8px\",\n    border: \"2px solid #cbd5e1\",\n    margin: \"6px\"\n  },\n  demoPanel: {\n    background: \"#f8fafc\",\n    border: \"2px solid #e5e7eb\",\n    borderRadius: \"12px\",\n    padding: \"18px\",\n    marginTop: \"12px\"\n  },\n  recap: {\n    background: \"#2c3e50\",\n    color: \"#ffffff\",\n    borderRadius: \"18px\",\n    padding: \"34px\",\n    marginTop: \"44px\",\n    boxShadow: \"0 10px 30px rgba(0,0,0,0.18)\"\n  },\n  recapTitle: {\n    fontSize: \"38px\",\n    margin: \"0 0 8px 0\",\n    color: \"#ffffff\"\n  },\n  recapSubtitle: {\n    fontSize: \"22px\",\n    color: \"#d6eaf8\",\n    marginBottom: \"28px\"\n  },\n  recapGrid: {\n    display: \"grid\",\n    gridTemplateColumns: \"repeat(auto-fit, minmax(300px, 1fr))\",\n    gap: \"20px\"\n  },\n  recapBlock: {\n    background: \"#34495e\",\n    border: \"2px solid #5dade2\",\n    borderRadius: \"14px\",\n    padding: \"20px\"\n  },\n  recapTable: {\n    width: \"100%\",\n    borderCollapse: \"collapse\",\n    marginTop: \"28px\",\n    background: \"#ffffff\",\n    color: \"#1f2933\",\n    borderRadius: \"14px\",\n    overflow: \"hidden\"\n  },\n  th: {\n    background: \"#3498db\",\n    color: \"#ffffff\",\n    textAlign: \"left\",\n    padding: \"14px\",\n    border: \"1px solid #d6eaf8\"\n  },\n  td: {\n    padding: \"14px\",\n    border: \"1px solid #d6eaf8\"\n  },\n  bestPractice: {\n    background: \"#1abc9c\",\n    color: \"#ffffff\",\n    borderRadius: \"14px\",\n    padding: \"22px\",\n    marginTop: \"28px\",\n    fontSize: \"18px\",\n    fontWeight: \"bold\"\n  }\n};\n\nfunction TelescopeNavigationDemo() {\n  const [route, setRoute] = useState(\"/\");\n  const [pendingRoute, setPendingRoute] = useState(\"\");\n\n  const navigateWithPending = (nextRoute) => {\n    setPendingRoute(nextRoute);\n    setTimeout(() => {\n      setRoute(nextRoute);\n      setPendingRoute(\"\");\n    }, 500);\n  };\n\n  const linkStyle = (target) => {\n    if (pendingRoute === target) {\n      return {\n        ...styles.secondaryButton,\n        background: \"#fef3c7\",\n        border: \"2px solid #f59e0b\"\n      };\n    }\n\n    if (route === target) {\n      return {\n        ...styles.button,\n        background: \"#16a085\"\n      };\n    }\n\n    return styles.secondaryButton;\n  };\n\n  return (\n    <div>\n      <h3>Telescope Navigation Demo</h3>\n      <div style={styles.demoPanel}>\n        <button style={linkStyle(\"/\")} onClick={() => navigateWithPending(\"/\")}>\n          Array Overview\n        </button>\n        <button style={linkStyle(\"/quadrant-alpha\")} onClick={() => navigateWithPending(\"/quadrant-alpha\")}>\n          Quadrant Alpha\n        </button>\n        <button style={linkStyle(\"/deep-space-logs\")} onClick={() => navigateWithPending(\"/deep-space-logs\")}>\n          Observation Logs\n        </button>\n      </div>\n      <p><strong>Current URL:</strong> {route}</p>\n      <p><strong>Pending:</strong> {pendingRoute || \"None\"}</p>\n    </div>\n  );\n}\n\nexport default TelescopeNavigationDemo;" },
  SessionEndNotificationDemo: { entryComponentName: 'SessionEndNotificationDemo', source: "const styles = {\n  page: {\n    fontFamily: \"Arial, Helvetica, sans-serif\",\n    background: \"#f4f6f8\",\n    color: \"#1f2933\",\n    padding: \"32px\",\n    lineHeight: 1.6\n  },\n  slide: {\n    background: \"#ffffff\",\n    borderRadius: \"18px\",\n    padding: \"32px\",\n    marginBottom: \"40px\",\n    boxShadow: \"0 10px 30px rgba(0,0,0,0.08)\"\n  },\n  mainTitle: {\n    fontSize: \"34px\",\n    margin: \"0 0 22px 0\",\n    paddingLeft: \"18px\",\n    borderLeft: \"8px solid #3498db\",\n    color: \"#2c3e50\"\n  },\n  slideHeader: {\n    background: \"#2c3e50\",\n    color: \"#ffffff\",\n    padding: \"22px\",\n    borderRadius: \"14px\",\n    marginBottom: \"24px\"\n  },\n  concept: {\n    fontSize: \"20px\",\n    fontWeight: \"bold\",\n    marginBottom: \"12px\"\n  },\n  bulletList: {\n    margin: 0,\n    paddingLeft: \"22px\"\n  },\n  sectionTitle: {\n    fontSize: \"22px\",\n    color: \"#2c3e50\",\n    marginTop: \"26px\",\n    marginBottom: \"12px\"\n  },\n  twoColumn: {\n    display: \"grid\",\n    gridTemplateColumns: \"repeat(auto-fit, minmax(280px, 1fr))\",\n    gap: \"20px\",\n    marginTop: \"22px\"\n  },\n  infoCard: {\n    background: \"#eef6fb\",\n    border: \"2px solid #d6eaf8\",\n    borderRadius: \"14px\",\n    padding: \"20px\"\n  },\n  narrowedBox: {\n    background: \"#f8fafc\",\n    border: \"2px solid #e5e7eb\",\n    borderRadius: \"14px\",\n    padding: \"20px\"\n  },\n  codeBlock: {\n    background: \"#111827\",\n    color: \"#f9fafb\",\n    padding: \"22px\",\n    borderRadius: \"14px\",\n    overflowX: \"auto\",\n    whiteSpace: \"pre-wrap\",\n    fontFamily: \"Consolas, Monaco, monospace\",\n    fontSize: \"14px\"\n  },\n  demoBox: {\n    padding: \"24px\",\n    border: \"3px solid #3498db\",\n    borderRadius: \"14px\",\n    background: \"#ffffff\"\n  },\n  simpleTerms: {\n    background: \"#fff8e1\",\n    border: \"2px solid #f1c40f\",\n    borderRadius: \"14px\",\n    padding: \"20px\",\n    marginTop: \"18px\"\n  },\n  button: {\n    border: \"none\",\n    borderRadius: \"10px\",\n    padding: \"10px 14px\",\n    background: \"#3498db\",\n    color: \"#ffffff\",\n    cursor: \"pointer\",\n    fontWeight: \"bold\",\n    margin: \"6px\"\n  },\n  secondaryButton: {\n    border: \"2px solid #3498db\",\n    borderRadius: \"10px\",\n    padding: \"10px 14px\",\n    background: \"#ffffff\",\n    color: \"#2c3e50\",\n    cursor: \"pointer\",\n    fontWeight: \"bold\",\n    margin: \"6px\"\n  },\n  input: {\n    padding: \"10px\",\n    borderRadius: \"8px\",\n    border: \"2px solid #cbd5e1\",\n    margin: \"6px\",\n    minWidth: \"180px\"\n  },\n  select: {\n    padding: \"10px\",\n    borderRadius: \"8px\",\n    border: \"2px solid #cbd5e1\",\n    margin: \"6px\"\n  },\n  demoPanel: {\n    background: \"#f8fafc\",\n    border: \"2px solid #e5e7eb\",\n    borderRadius: \"12px\",\n    padding: \"18px\",\n    marginTop: \"12px\"\n  },\n  recap: {\n    background: \"#2c3e50\",\n    color: \"#ffffff\",\n    borderRadius: \"18px\",\n    padding: \"34px\",\n    marginTop: \"44px\",\n    boxShadow: \"0 10px 30px rgba(0,0,0,0.18)\"\n  },\n  recapTitle: {\n    fontSize: \"38px\",\n    margin: \"0 0 8px 0\",\n    color: \"#ffffff\"\n  },\n  recapSubtitle: {\n    fontSize: \"22px\",\n    color: \"#d6eaf8\",\n    marginBottom: \"28px\"\n  },\n  recapGrid: {\n    display: \"grid\",\n    gridTemplateColumns: \"repeat(auto-fit, minmax(300px, 1fr))\",\n    gap: \"20px\"\n  },\n  recapBlock: {\n    background: \"#34495e\",\n    border: \"2px solid #5dade2\",\n    borderRadius: \"14px\",\n    padding: \"20px\"\n  },\n  recapTable: {\n    width: \"100%\",\n    borderCollapse: \"collapse\",\n    marginTop: \"28px\",\n    background: \"#ffffff\",\n    color: \"#1f2933\",\n    borderRadius: \"14px\",\n    overflow: \"hidden\"\n  },\n  th: {\n    background: \"#3498db\",\n    color: \"#ffffff\",\n    textAlign: \"left\",\n    padding: \"14px\",\n    border: \"1px solid #d6eaf8\"\n  },\n  td: {\n    padding: \"14px\",\n    border: \"1px solid #d6eaf8\"\n  },\n  bestPractice: {\n    background: \"#1abc9c\",\n    color: \"#ffffff\",\n    borderRadius: \"14px\",\n    padding: \"22px\",\n    marginTop: \"28px\",\n    fontSize: \"18px\",\n    fontWeight: \"bold\"\n  }\n};\n\nfunction SessionEndNotificationDemo() {\n  const [route, setRoute] = useState(\"/session-expired\");\n  const [prefetchMessage, setPrefetchMessage] = useState(\"Move toward the re-authentication link to prefetch.\");\n\n  return (\n    <div>\n      <h3>Session End Notification Demo</h3>\n      <div style={styles.demoPanel}>\n        <p>\n          Your secure session for the <strong>Turbine Telemetry System</strong> has expired.{\" \"}\n          <button\n            style={styles.button}\n            onMouseEnter={() => setPrefetchMessage(\"Prefetch intent detected for /auth/portal\")}\n            onClick={() => setRoute(\"/auth/portal\")}\n          >\n            Click here to re-authenticate\n          </button>\n        </p>\n\n        <button style={styles.secondaryButton} onClick={() => setRoute(\"/public-status\")}>\n          View System Status (Public)\n        </button>\n      </div>\n      <p><strong>Current route:</strong> {route}</p>\n      <p><strong>Prefetch status:</strong> {prefetchMessage}</p>\n    </div>\n  );\n}\n\nexport default SessionEndNotificationDemo;" },
  TimberSearchDemo: { entryComponentName: 'TimberSearchDemo', source: "const styles = {\n  page: {\n    fontFamily: \"Arial, Helvetica, sans-serif\",\n    background: \"#f4f6f8\",\n    color: \"#1f2933\",\n    padding: \"32px\",\n    lineHeight: 1.6\n  },\n  slide: {\n    background: \"#ffffff\",\n    borderRadius: \"18px\",\n    padding: \"32px\",\n    marginBottom: \"40px\",\n    boxShadow: \"0 10px 30px rgba(0,0,0,0.08)\"\n  },\n  mainTitle: {\n    fontSize: \"34px\",\n    margin: \"0 0 22px 0\",\n    paddingLeft: \"18px\",\n    borderLeft: \"8px solid #3498db\",\n    color: \"#2c3e50\"\n  },\n  slideHeader: {\n    background: \"#2c3e50\",\n    color: \"#ffffff\",\n    padding: \"22px\",\n    borderRadius: \"14px\",\n    marginBottom: \"24px\"\n  },\n  concept: {\n    fontSize: \"20px\",\n    fontWeight: \"bold\",\n    marginBottom: \"12px\"\n  },\n  bulletList: {\n    margin: 0,\n    paddingLeft: \"22px\"\n  },\n  sectionTitle: {\n    fontSize: \"22px\",\n    color: \"#2c3e50\",\n    marginTop: \"26px\",\n    marginBottom: \"12px\"\n  },\n  twoColumn: {\n    display: \"grid\",\n    gridTemplateColumns: \"repeat(auto-fit, minmax(280px, 1fr))\",\n    gap: \"20px\",\n    marginTop: \"22px\"\n  },\n  infoCard: {\n    background: \"#eef6fb\",\n    border: \"2px solid #d6eaf8\",\n    borderRadius: \"14px\",\n    padding: \"20px\"\n  },\n  narrowedBox: {\n    background: \"#f8fafc\",\n    border: \"2px solid #e5e7eb\",\n    borderRadius: \"14px\",\n    padding: \"20px\"\n  },\n  codeBlock: {\n    background: \"#111827\",\n    color: \"#f9fafb\",\n    padding: \"22px\",\n    borderRadius: \"14px\",\n    overflowX: \"auto\",\n    whiteSpace: \"pre-wrap\",\n    fontFamily: \"Consolas, Monaco, monospace\",\n    fontSize: \"14px\"\n  },\n  demoBox: {\n    padding: \"24px\",\n    border: \"3px solid #3498db\",\n    borderRadius: \"14px\",\n    background: \"#ffffff\"\n  },\n  simpleTerms: {\n    background: \"#fff8e1\",\n    border: \"2px solid #f1c40f\",\n    borderRadius: \"14px\",\n    padding: \"20px\",\n    marginTop: \"18px\"\n  },\n  button: {\n    border: \"none\",\n    borderRadius: \"10px\",\n    padding: \"10px 14px\",\n    background: \"#3498db\",\n    color: \"#ffffff\",\n    cursor: \"pointer\",\n    fontWeight: \"bold\",\n    margin: \"6px\"\n  },\n  secondaryButton: {\n    border: \"2px solid #3498db\",\n    borderRadius: \"10px\",\n    padding: \"10px 14px\",\n    background: \"#ffffff\",\n    color: \"#2c3e50\",\n    cursor: \"pointer\",\n    fontWeight: \"bold\",\n    margin: \"6px\"\n  },\n  input: {\n    padding: \"10px\",\n    borderRadius: \"8px\",\n    border: \"2px solid #cbd5e1\",\n    margin: \"6px\",\n    minWidth: \"180px\"\n  },\n  select: {\n    padding: \"10px\",\n    borderRadius: \"8px\",\n    border: \"2px solid #cbd5e1\",\n    margin: \"6px\"\n  },\n  demoPanel: {\n    background: \"#f8fafc\",\n    border: \"2px solid #e5e7eb\",\n    borderRadius: \"12px\",\n    padding: \"18px\",\n    marginTop: \"12px\"\n  },\n  recap: {\n    background: \"#2c3e50\",\n    color: \"#ffffff\",\n    borderRadius: \"18px\",\n    padding: \"34px\",\n    marginTop: \"44px\",\n    boxShadow: \"0 10px 30px rgba(0,0,0,0.18)\"\n  },\n  recapTitle: {\n    fontSize: \"38px\",\n    margin: \"0 0 8px 0\",\n    color: \"#ffffff\"\n  },\n  recapSubtitle: {\n    fontSize: \"22px\",\n    color: \"#d6eaf8\",\n    marginBottom: \"28px\"\n  },\n  recapGrid: {\n    display: \"grid\",\n    gridTemplateColumns: \"repeat(auto-fit, minmax(300px, 1fr))\",\n    gap: \"20px\"\n  },\n  recapBlock: {\n    background: \"#34495e\",\n    border: \"2px solid #5dade2\",\n    borderRadius: \"14px\",\n    padding: \"20px\"\n  },\n  recapTable: {\n    width: \"100%\",\n    borderCollapse: \"collapse\",\n    marginTop: \"28px\",\n    background: \"#ffffff\",\n    color: \"#1f2933\",\n    borderRadius: \"14px\",\n    overflow: \"hidden\"\n  },\n  th: {\n    background: \"#3498db\",\n    color: \"#ffffff\",\n    textAlign: \"left\",\n    padding: \"14px\",\n    border: \"1px solid #d6eaf8\"\n  },\n  td: {\n    padding: \"14px\",\n    border: \"1px solid #d6eaf8\"\n  },\n  bestPractice: {\n    background: \"#1abc9c\",\n    color: \"#ffffff\",\n    borderRadius: \"14px\",\n    padding: \"22px\",\n    marginTop: \"28px\",\n    fontSize: \"18px\",\n    fontWeight: \"bold\"\n  }\n};\n\nfunction TimberSearchDemo() {\n  const [query, setQuery] = useState(\"\");\n  const [grade, setGrade] = useState(\"all\");\n  const [route, setRoute] = useState(\"/catalog\");\n\n  const submitSearch = (event) => {\n    event.preventDefault();\n    const safeQuery = encodeURIComponent(query);\n    setRoute(`/catalog?query=${safeQuery}&grade=${grade}`);\n  };\n\n  return (\n    <div>\n      <h3>Timber Search Demo</h3>\n      <form style={styles.demoPanel} onSubmit={submitSearch}>\n        <label htmlFor=\"demo-material-query\">Search Materials:</label>\n        <input\n          id=\"demo-material-query\"\n          style={styles.input}\n          type=\"text\"\n          value={query}\n          placeholder=\"e.g. Oak, Walnut...\"\n          onChange={(event) => setQuery(event.target.value)}\n        />\n\n        <select style={styles.select} value={grade} onChange={(event) => setGrade(event.target.value)}>\n          <option value=\"all\">All Grades</option>\n          <option value=\"premium\">Premium</option>\n          <option value=\"reclaimed\">Reclaimed</option>\n        </select>\n\n        <button style={styles.button} type=\"submit\">Filter Catalog</button>\n      </form>\n      <p><strong>Generated URL:</strong> {route}</p>\n    </div>\n  );\n}\n\nexport default TimberSearchDemo;" },
  RedirectDemo: { entryComponentName: 'RedirectDemo', source: "const styles = {\n  page: {\n    fontFamily: \"Arial, Helvetica, sans-serif\",\n    background: \"#f4f6f8\",\n    color: \"#1f2933\",\n    padding: \"32px\",\n    lineHeight: 1.6\n  },\n  slide: {\n    background: \"#ffffff\",\n    borderRadius: \"18px\",\n    padding: \"32px\",\n    marginBottom: \"40px\",\n    boxShadow: \"0 10px 30px rgba(0,0,0,0.08)\"\n  },\n  mainTitle: {\n    fontSize: \"34px\",\n    margin: \"0 0 22px 0\",\n    paddingLeft: \"18px\",\n    borderLeft: \"8px solid #3498db\",\n    color: \"#2c3e50\"\n  },\n  slideHeader: {\n    background: \"#2c3e50\",\n    color: \"#ffffff\",\n    padding: \"22px\",\n    borderRadius: \"14px\",\n    marginBottom: \"24px\"\n  },\n  concept: {\n    fontSize: \"20px\",\n    fontWeight: \"bold\",\n    marginBottom: \"12px\"\n  },\n  bulletList: {\n    margin: 0,\n    paddingLeft: \"22px\"\n  },\n  sectionTitle: {\n    fontSize: \"22px\",\n    color: \"#2c3e50\",\n    marginTop: \"26px\",\n    marginBottom: \"12px\"\n  },\n  twoColumn: {\n    display: \"grid\",\n    gridTemplateColumns: \"repeat(auto-fit, minmax(280px, 1fr))\",\n    gap: \"20px\",\n    marginTop: \"22px\"\n  },\n  infoCard: {\n    background: \"#eef6fb\",\n    border: \"2px solid #d6eaf8\",\n    borderRadius: \"14px\",\n    padding: \"20px\"\n  },\n  narrowedBox: {\n    background: \"#f8fafc\",\n    border: \"2px solid #e5e7eb\",\n    borderRadius: \"14px\",\n    padding: \"20px\"\n  },\n  codeBlock: {\n    background: \"#111827\",\n    color: \"#f9fafb\",\n    padding: \"22px\",\n    borderRadius: \"14px\",\n    overflowX: \"auto\",\n    whiteSpace: \"pre-wrap\",\n    fontFamily: \"Consolas, Monaco, monospace\",\n    fontSize: \"14px\"\n  },\n  demoBox: {\n    padding: \"24px\",\n    border: \"3px solid #3498db\",\n    borderRadius: \"14px\",\n    background: \"#ffffff\"\n  },\n  simpleTerms: {\n    background: \"#fff8e1\",\n    border: \"2px solid #f1c40f\",\n    borderRadius: \"14px\",\n    padding: \"20px\",\n    marginTop: \"18px\"\n  },\n  button: {\n    border: \"none\",\n    borderRadius: \"10px\",\n    padding: \"10px 14px\",\n    background: \"#3498db\",\n    color: \"#ffffff\",\n    cursor: \"pointer\",\n    fontWeight: \"bold\",\n    margin: \"6px\"\n  },\n  secondaryButton: {\n    border: \"2px solid #3498db\",\n    borderRadius: \"10px\",\n    padding: \"10px 14px\",\n    background: \"#ffffff\",\n    color: \"#2c3e50\",\n    cursor: \"pointer\",\n    fontWeight: \"bold\",\n    margin: \"6px\"\n  },\n  input: {\n    padding: \"10px\",\n    borderRadius: \"8px\",\n    border: \"2px solid #cbd5e1\",\n    margin: \"6px\",\n    minWidth: \"180px\"\n  },\n  select: {\n    padding: \"10px\",\n    borderRadius: \"8px\",\n    border: \"2px solid #cbd5e1\",\n    margin: \"6px\"\n  },\n  demoPanel: {\n    background: \"#f8fafc\",\n    border: \"2px solid #e5e7eb\",\n    borderRadius: \"12px\",\n    padding: \"18px\",\n    marginTop: \"12px\"\n  },\n  recap: {\n    background: \"#2c3e50\",\n    color: \"#ffffff\",\n    borderRadius: \"18px\",\n    padding: \"34px\",\n    marginTop: \"44px\",\n    boxShadow: \"0 10px 30px rgba(0,0,0,0.18)\"\n  },\n  recapTitle: {\n    fontSize: \"38px\",\n    margin: \"0 0 8px 0\",\n    color: \"#ffffff\"\n  },\n  recapSubtitle: {\n    fontSize: \"22px\",\n    color: \"#d6eaf8\",\n    marginBottom: \"28px\"\n  },\n  recapGrid: {\n    display: \"grid\",\n    gridTemplateColumns: \"repeat(auto-fit, minmax(300px, 1fr))\",\n    gap: \"20px\"\n  },\n  recapBlock: {\n    background: \"#34495e\",\n    border: \"2px solid #5dade2\",\n    borderRadius: \"14px\",\n    padding: \"20px\"\n  },\n  recapTable: {\n    width: \"100%\",\n    borderCollapse: \"collapse\",\n    marginTop: \"28px\",\n    background: \"#ffffff\",\n    color: \"#1f2933\",\n    borderRadius: \"14px\",\n    overflow: \"hidden\"\n  },\n  th: {\n    background: \"#3498db\",\n    color: \"#ffffff\",\n    textAlign: \"left\",\n    padding: \"14px\",\n    border: \"1px solid #d6eaf8\"\n  },\n  td: {\n    padding: \"14px\",\n    border: \"1px solid #d6eaf8\"\n  },\n  bestPractice: {\n    background: \"#1abc9c\",\n    color: \"#ffffff\",\n    borderRadius: \"14px\",\n    padding: \"22px\",\n    marginTop: \"28px\",\n    fontSize: \"18px\",\n    fontWeight: \"bold\"\n  }\n};\n\nfunction RedirectDemo() {\n  const reportIdRef = useRef(\"chem-482\");\n  const [hasSession, setHasSession] = useState(false);\n  const [route, setRoute] = useState(\"/lab/hazardous-materials\");\n  const [result, setResult] = useState(\"No loader or action has run yet.\");\n\n  const runLoader = () => {\n    if (!hasSession) {\n      setRoute(\"/auth/login\");\n      setResult(\"Loader returned redirect(\\\"/auth/login\\\")\");\n    } else {\n      setRoute(\"/lab/hazardous-materials\");\n      setResult(\"Loader returned technician session data\");\n    }\n  };\n\n  const runAction = () => {\n    setRoute(`/lab/reports/${reportIdRef.current}`);\n    setResult(`Action created a report and returned redirect(\"/lab/reports/${reportIdRef.current}\")`);\n  };\n\n  return (\n    <div>\n      <h3>Redirect Demo</h3>\n      <div style={styles.demoPanel}>\n        <label>\n          <input\n            type=\"checkbox\"\n            checked={hasSession}\n            onChange={(event) => setHasSession(event.target.checked)}\n          />{\" \"}\n          Technician session exists\n        </label>\n        <div>\n          <button style={styles.button} onClick={runLoader}>Run Loader Gatekeeping</button>\n          <button style={styles.secondaryButton} onClick={runAction}>Submit Lab Report Action</button>\n        </div>\n      </div>\n      <p><strong>Current route:</strong> {route}</p>\n      <p><strong>Result:</strong> {result}</p>\n    </div>\n  );\n}\n\nexport default RedirectDemo;" },
  SubmersibleMonitorDemo: { entryComponentName: 'SubmersibleMonitorDemo', source: "const styles = {\n  page: {\n    fontFamily: \"Arial, Helvetica, sans-serif\",\n    background: \"#f4f6f8\",\n    color: \"#1f2933\",\n    padding: \"32px\",\n    lineHeight: 1.6\n  },\n  slide: {\n    background: \"#ffffff\",\n    borderRadius: \"18px\",\n    padding: \"32px\",\n    marginBottom: \"40px\",\n    boxShadow: \"0 10px 30px rgba(0,0,0,0.08)\"\n  },\n  mainTitle: {\n    fontSize: \"34px\",\n    margin: \"0 0 22px 0\",\n    paddingLeft: \"18px\",\n    borderLeft: \"8px solid #3498db\",\n    color: \"#2c3e50\"\n  },\n  slideHeader: {\n    background: \"#2c3e50\",\n    color: \"#ffffff\",\n    padding: \"22px\",\n    borderRadius: \"14px\",\n    marginBottom: \"24px\"\n  },\n  concept: {\n    fontSize: \"20px\",\n    fontWeight: \"bold\",\n    marginBottom: \"12px\"\n  },\n  bulletList: {\n    margin: 0,\n    paddingLeft: \"22px\"\n  },\n  sectionTitle: {\n    fontSize: \"22px\",\n    color: \"#2c3e50\",\n    marginTop: \"26px\",\n    marginBottom: \"12px\"\n  },\n  twoColumn: {\n    display: \"grid\",\n    gridTemplateColumns: \"repeat(auto-fit, minmax(280px, 1fr))\",\n    gap: \"20px\",\n    marginTop: \"22px\"\n  },\n  infoCard: {\n    background: \"#eef6fb\",\n    border: \"2px solid #d6eaf8\",\n    borderRadius: \"14px\",\n    padding: \"20px\"\n  },\n  narrowedBox: {\n    background: \"#f8fafc\",\n    border: \"2px solid #e5e7eb\",\n    borderRadius: \"14px\",\n    padding: \"20px\"\n  },\n  codeBlock: {\n    background: \"#111827\",\n    color: \"#f9fafb\",\n    padding: \"22px\",\n    borderRadius: \"14px\",\n    overflowX: \"auto\",\n    whiteSpace: \"pre-wrap\",\n    fontFamily: \"Consolas, Monaco, monospace\",\n    fontSize: \"14px\"\n  },\n  demoBox: {\n    padding: \"24px\",\n    border: \"3px solid #3498db\",\n    borderRadius: \"14px\",\n    background: \"#ffffff\"\n  },\n  simpleTerms: {\n    background: \"#fff8e1\",\n    border: \"2px solid #f1c40f\",\n    borderRadius: \"14px\",\n    padding: \"20px\",\n    marginTop: \"18px\"\n  },\n  button: {\n    border: \"none\",\n    borderRadius: \"10px\",\n    padding: \"10px 14px\",\n    background: \"#3498db\",\n    color: \"#ffffff\",\n    cursor: \"pointer\",\n    fontWeight: \"bold\",\n    margin: \"6px\"\n  },\n  secondaryButton: {\n    border: \"2px solid #3498db\",\n    borderRadius: \"10px\",\n    padding: \"10px 14px\",\n    background: \"#ffffff\",\n    color: \"#2c3e50\",\n    cursor: \"pointer\",\n    fontWeight: \"bold\",\n    margin: \"6px\"\n  },\n  input: {\n    padding: \"10px\",\n    borderRadius: \"8px\",\n    border: \"2px solid #cbd5e1\",\n    margin: \"6px\",\n    minWidth: \"180px\"\n  },\n  select: {\n    padding: \"10px\",\n    borderRadius: \"8px\",\n    border: \"2px solid #cbd5e1\",\n    margin: \"6px\"\n  },\n  demoPanel: {\n    background: \"#f8fafc\",\n    border: \"2px solid #e5e7eb\",\n    borderRadius: \"12px\",\n    padding: \"18px\",\n    marginTop: \"12px\"\n  },\n  recap: {\n    background: \"#2c3e50\",\n    color: \"#ffffff\",\n    borderRadius: \"18px\",\n    padding: \"34px\",\n    marginTop: \"44px\",\n    boxShadow: \"0 10px 30px rgba(0,0,0,0.18)\"\n  },\n  recapTitle: {\n    fontSize: \"38px\",\n    margin: \"0 0 8px 0\",\n    color: \"#ffffff\"\n  },\n  recapSubtitle: {\n    fontSize: \"22px\",\n    color: \"#d6eaf8\",\n    marginBottom: \"28px\"\n  },\n  recapGrid: {\n    display: \"grid\",\n    gridTemplateColumns: \"repeat(auto-fit, minmax(300px, 1fr))\",\n    gap: \"20px\"\n  },\n  recapBlock: {\n    background: \"#34495e\",\n    border: \"2px solid #5dade2\",\n    borderRadius: \"14px\",\n    padding: \"20px\"\n  },\n  recapTable: {\n    width: \"100%\",\n    borderCollapse: \"collapse\",\n    marginTop: \"28px\",\n    background: \"#ffffff\",\n    color: \"#1f2933\",\n    borderRadius: \"14px\",\n    overflow: \"hidden\"\n  },\n  th: {\n    background: \"#3498db\",\n    color: \"#ffffff\",\n    textAlign: \"left\",\n    padding: \"14px\",\n    border: \"1px solid #d6eaf8\"\n  },\n  td: {\n    padding: \"14px\",\n    border: \"1px solid #d6eaf8\"\n  },\n  bestPractice: {\n    background: \"#1abc9c\",\n    color: \"#ffffff\",\n    borderRadius: \"14px\",\n    padding: \"22px\",\n    marginTop: \"28px\",\n    fontSize: \"18px\",\n    fontWeight: \"bold\"\n  }\n};\n\nfunction SubmersibleMonitorDemo() {\n  const [isCritical, setIsCritical] = useState(false);\n  const [route, setRoute] = useState(\"/submersible/monitor\");\n  const [pressure, setPressure] = useState(870);\n\n  useEffect(() => {\n    if (isCritical) {\n      setRoute(\"/emergency/protocols\");\n    }\n  }, [isCritical]);\n\n  const handleManualOverride = () => {\n    setRoute(\"/manual-controls\");\n  };\n\n  return (\n    <div>\n      <h3>Submersible Monitor Demo</h3>\n      <div style={styles.demoPanel}>\n        <p><strong>Hull Pressure:</strong> {pressure} PSI</p>\n        <button style={styles.secondaryButton} onClick={() => setPressure((value) => value + 15)}>\n          Increase Pressure Reading\n        </button>\n        <button style={styles.button} onClick={handleManualOverride}>\n          Engage Override\n        </button>\n        <button style={styles.secondaryButton} onClick={() => setIsCritical(true)}>\n          Detect Critical Breach\n        </button>\n        <button style={styles.secondaryButton} onClick={() => { setIsCritical(false); setRoute(\"/submersible/monitor\"); }}>\n          Reset Monitor\n        </button>\n      </div>\n      <p><strong>Current route:</strong> {route}</p>\n      <p><strong>Critical breach detected:</strong> {isCritical ? \"true\" : \"false\"}</p>\n    </div>\n  );\n}\n\nexport default SubmersibleMonitorDemo;" }
}

const slides = [
  {
    title: "React Router - Navigating",
    concept: "Client-Side Navigation Tools",
    bullets: ["<Link>", "<NavLink>", "<Form>", "redirect", "useNavigate"],
    description: "This slide introduces the core mechanisms for moving between views and managing data transitions within a React Router (Remix) application. Unlike traditional anchor tags that trigger a full page reload, these components and functions leverage the browser History API to update the URL and render new content instantly. The toolset covers declarative navigation for users (Link, NavLink), data-driven navigation (Form), and imperative navigation within logic (redirect, useNavigate).",
    realWorldApplication: "A specialized botanical research database where researchers need to switch between high-resolution leaf scans and soil acidity charts without losing their scroll position or re-downloading the entire application shell.",
    broadScaleUsage: "In high-performance web architecture, these tools form the \"routing layer.\" By using integrated components like <Form> and functions like redirect, the application can synchronize the URL state with the server-state automatically, ensuring that the UI always reflects the current location and data context without manual state management.",
    narrowedApproach: [
      "<Link> and <NavLink> handle basic transitions; <NavLink> specifically adds \"active\" class states for CSS styling.",
      "<Form> is the Remix way to trigger \"actions,\" moving the user to a new route after a data submission.",
      "redirect is used inside Loaders or Actions to send users elsewhere based on logic (e.g., if a resource is not found).",
      "useNavigate provides a hook for triggered movements, such as a timer finishing or a non-form button click."
    ],
    codeExample: `import { 
  Link, 
  NavLink, 
  Form, 
  useNavigate, 
  redirect 
} from "@remix-run/react";

// Example of a redirect within an action
export const action = async ({ request }) => {
  const formData = await request.formData();
  const submissionId = formData.get("submissionId");
  if (!submissionId) {
    return redirect("/error-logs");
  }
  return redirect(\`/records/\${submissionId}\`);
};

export default function BotanicalNavigation() {
  const navigate = useNavigate();

  return (
    <nav>
      {/* Declarative Link */}
      <Link to="/about-the-reserve">Reserve Info</Link>

      {/* NavLink with automatic active styling */}
      <NavLink 
        to="/species-directory"
        className={({ isActive }) => isActive ? "highlighted" : "normal"}
      >
        Species Directory
      </NavLink>

      {/* Form-based navigation */}
      <Form method="post">
        <input type="hidden" name="submissionId" value="plant-123" />
        <button type="submit">Submit Specimen</button>
      </Form>

      {/* Imperative navigation via button */}
      <button onClick={() => navigate(-1)}>
        Go Back
      </button>
    </nav>
  );
}`,
    simpleTermsExplanation: "The code starts by importing the five tools mentioned in the slide. The 'action' function shows how 'redirect' works: it's like a traffic controller that tells the browser, \"Stop, don't stay here, go to this specific URL instead.\" Inside the main component, 'Link' acts like a regular website link but faster because it doesn't refresh the page. 'NavLink' is a smarter version of 'Link' that knows if it is currently \"active\" (meaning the user is on that page), allowing us to change its color or style automatically. The 'Form' component is unique; when you click the submit button, React Router takes over, sends the data, and then moves you to a new page based on the 'action' result. Finally, 'useNavigate' is a hook that gives us a 'navigate' function. We use this for manual control, like the \"Go Back\" button, which tells the browser to move back one step in the history just like the browser's back arrow.",
    Demo: BotanicalNavigationDemo
  },
  {
    title: "NavLink",
    concept: "Context-Aware Navigation",
    bullets: ["for navigation links", "render active and pending states"],
    description: "The NavLink component is a specialized version of the Link component that \"knows\" its own relationship to the current URL. It automatically manages three distinct states: active (you are currently on this route), pending (the application is currently loading this route), and transitioning (a view transition is in progress). This is achieved by the component automatically injecting specific CSS classes or providing a boolean state that can be used to conditionally apply styles. This eliminates the need for manual logic to track which menu item should be highlighted.",
    realWorldApplication: "A specialized dashboard for a telescope array where the sidebar links need to glow green when the user is viewing that specific quadrant’s data, and pulse yellow while the data for a new quadrant is being fetched from the satellite.",
    broadScaleUsage: "In large-scale application architecture, NavLink centralizes the UI feedback loop for navigation. By tying the visual state directly to the router's internal state, it ensures that navigation menus remain synchronized even when the URL is changed by external factors, such as a browser back button or a programmatic redirect.",
    narrowedApproach: [
      "Active State: By default, an active class is added when the to prop matches the current URL. Use the end prop to ensure a link is only active if the path matches exactly (preventing a \"Home\" link from staying active on every sub-page).",
      "Pending State: A pending class is added while the loader for the destination route is running.",
      "Styling: Styles can be applied via traditional CSS selectors (e.g., a.active) or via a function passed to the className or style props for more dynamic logic."
    ],
    codeExample: `import { NavLink } from "@remix-run/react";

export function TelescopeNavigation() {
  return (
    <nav className="sidebar">
      {/* The 'end' prop ensures this is only active for exactly "/" 
        and not every route starting with "/" 
      */}
      <NavLink 
        to="/" 
        end
        className={({ isActive, isPending }) => 
          isPending ? "loading-glow" : isActive ? "active-tab" : "inactive-tab"
        }
      >
        Array Overview
      </NavLink>

      <NavLink 
        to="/quadrant-alpha"
        className={({ isActive }) => isActive ? "active-tab" : "inactive-tab"}
      >
        Quadrant Alpha
      </NavLink>

      <NavLink 
        to="/deep-space-logs"
        style={({ isActive }) => ({
          fontWeight: isActive ? "bold" : "normal",
          color: isActive ? "cyan" : "white"
        })}
      >
        Observation Logs
      </NavLink>
    </nav>
  );
}`,
    simpleTermsExplanation: "The code imports the 'NavLink' component, which is a smarter version of a standard link. Inside the 'TelescopeNavigation' function, we create three links. The first link uses the 'end' prop; this is vital because without it, a link to the homepage would look \"active\" even when you are on a different page. We use a function inside the 'className' prop to check the current status. If 'isPending' is true, it means the app is still grabbing the data for that page, so we give it a \"loading-glow\" class. If 'isActive' is true, it means we have arrived, so we give it the \"active-tab\" class. The third link shows that you don't just have to use classes; you can also use the 'style' prop to change things like font weight or color directly based on whether the link matches the current URL. This makes the navigation menu feel responsive and alive.",
    Demo: TelescopeNavigationDemo
  },
  {
    title: "Link",
    concept: "Standard Declarative Navigation",
    bullets: ["when the link doesn't need active styling"],
    description: "The Link component is the fundamental building block for navigation in React Router (Remix). While NavLink is specialized for navigation menus where \"active\" states matter, the standard Link is used for all other instances of directional movement. It renders an accessibility-compliant anchor tag (<a>) but intercepts the default browser behavior. Instead of a full-page refresh, it instructs the router to update the URL and swap the component tree, preserving application state and providing a seamless transition.",
    realWorldApplication: "An internal documentation portal for a renewable energy firm where a research paper on solar cell efficiency contains inline references. Clicking a reference link jumps the user to the \"Glossary\" page without interrupting the background data sync of the main dashboard.",
    broadScaleUsage: "In scalable web applications, Link components are used to create a \"connected graph\" of content. Because they are declarative, they are searchable by screen readers and indexable by search engines, ensuring that the application remains accessible while maintaining the performance benefits of a Single Page Application (SPA) architecture.",
    narrowedApproach: [
      "Usage: Use Link for call-to-actions, inline text links, or buttons that lead to other routes where visual \"active\" feedback in a menu is unnecessary.",
      "Attributes: It accepts a to prop which can be a string (URL) or an object (allowing for specific state or search parameters to be passed).",
      "Performance: Remix optimizes Link components by pre-fetching the data for the destination route when the user hovers over the link, making the transition feel instantaneous."
    ],
    codeExample: `import { Link } from "@remix-run/react";

export function SessionEndNotification() {
  return (
    <div className="notification-overlay">
      <p>
        Your secure session for the **Turbine Telemetry System** has expired.{" "}
        <Link 
          to="/auth/portal" 
          className="text-link"
          prefetch="intent"
        >
          Click here to re-authenticate
        </Link>
      </p>

      <footer>
        <Link to="/public-status">
          View System Status (Public)
        </Link>
      </footer>
    </div>
  );
}`,
    simpleTermsExplanation: "The code imports the standard 'Link' from the Remix library. Inside our 'SessionEndNotification' component, we are using Link twice. The first one is embedded directly inside a paragraph of text. Unlike a regular HTML link that would make the whole screen go white for a second while the new page loads, this Link tells React, \"Hey, don't refresh the whole browser, just change the URL to '/auth/portal' and show the login component.\" We also added a 'prefetch=\"intent\"' prop; this is a cool feature where the app starts loading the login page data the very moment the user's mouse moves toward the link, so by the time they actually click, the page is already ready. The second link at the bottom shows how Link is used for simple, secondary navigation where we don't need fancy highlighting or \"active\" colors.",
    Demo: SessionEndNotificationDemo
  },
  {
    title: "Form",
    concept: "Navigation via Data Submission",
    bullets: ["Navigate with URLSearchParams provided by the user.", "The user enters “journey”", "-> /search?q=journey"],
    description: "The Form component in React Router (Remix) enhances the standard HTML form by enabling client-side navigation upon submission. When a Form uses the \"get\" method (the default), it serializes the input fields into the URL as search parameters. This pattern is essential for creating shareable, bookmarkable URLs based on user input. Because the router handles the submission, it avoids a full-page refresh while ensuring the browser history is correctly updated with the new query string.",
    realWorldApplication: "A community woodworking shop where members search through a digital catalog of available timber. When a member types \"Cedar\" into the search bar, the URL updates to /timber-lookup?material=Cedar, allowing them to copy that specific link and send it to a colleague.",
    broadScaleUsage: "In modern web architecture, using Form for navigation implements the \"Single Source of Truth\" principle for the URL. By encoding user filters or search queries directly into the URL, the application state becomes declarative. This ensures that if a user refreshes the page or uses the back button, the exact search results or filtered view is reconstructed perfectly from the URL parameters.",
    narrowedApproach: [
      "Component: Use the <Form> component imported from @remix-run/react.",
      "Method: Set method=\"get\" for navigation-based forms (like searches) and method=\"post\" for data-changing actions.",
      "Attributes: The action attribute defines the destination route. The name attribute on input fields determines the key in the URLSearchParams (e.g., name=\"q\" becomes ?q=...)."
    ],
    codeExample: `import { Form } from "@remix-run/react";

export default function TimberSearch() {
  return (
    <section className="search-container">
      <h2>Resource Catalog Search</h2>

      {/* This form defaults to GET. 
          Submitting will navigate to /catalog with the input values in the URL.
      */}
      <Form action="/catalog" method="get">
        <label htmlFor="material-query">Search Materials:</label>
        <input 
          id="material-query"
          type="text" 
          name="query" 
          placeholder="e.g. Oak, Walnut..." 
        />

        <select name="grade">
          <option value="all">All Grades</option>
          <option value="premium">Premium</option>
          <option value="reclaimed">Reclaimed</option>
        </select>

        <button type="submit">Filter Catalog</button>
      </Form>
    </section>
  );
}`,
    simpleTermsExplanation: "The code starts by importing the special 'Form' component from Remix. Inside the 'TimberSearch' component, we set up a form that acts like a GPS for the website. When you type \"Walnut\" into the input (which we named \"query\") and click the button, the 'Form' component prevents the website from doing a clunky old-fashioned refresh. Instead, it looks at the 'action' prop, sees \"/catalog\", and then grabs whatever you typed. It glues them together to create a new URL like /catalog?query=Walnut&grade=all. It then \"navigates\" you to that new address. This is incredibly useful because it means the URL at the top of your browser always matches exactly what you are looking at on the screen, making it easy to save your search for later.",
    Demo: TimberSearchDemo
  },
  {
    title: "Redirect",
    concept: "Server-Side Response Navigation",
    bullets: ["import { redirect } from \"react-router\";", "export async function loader({ request }) { ... }", "return redirect(\"/login\");", "export async function action({ request }) { ... }", "return redirect(`/projects/${project.id}`);"],
    description: "The redirect function is a utility used within Loaders and Actions to trigger navigation from the server-side (or data-layer) logic. Unlike components like Link which are initiated by user clicks, redirect is a response object that tells the browser to go to a different URL after some logic has been processed. In a Loader, it is typically used for access control (sending unauthorized users to a login page). In an Action, it is used after data mutation (like creating a record) to send the user to the newly created resource or a success page.",
    realWorldApplication: "A controlled chemistry laboratory management system where a technician tries to access the \"Hazardous Materials\" log. The system runs a loader to check their certification level; if they aren't certified, the system uses redirect to send them to the \"Training Enrollment\" page instead of showing the sensitive data.",
    broadScaleUsage: "In professional web development, redirect is the backbone of the \"Post-Redirect-Get\" pattern. This ensures that when a user submits data, they aren't left on a page where a simple \"refresh\" would resubmit the form. By redirecting to a new URL after a successful action, you create a cleaner user experience and prevent duplicate data entries in the database.",
    narrowedApproach: [
      "Loaders: Use redirect for \"Gatekeeping.\" If the data required for a page shouldn't be seen (e.g., the user is logged out), return the redirect immediately to stop the component from even trying to render.",
      "Actions: Use redirect for \"Flow Control.\" After successfully processing formData (like saving a new lab report), redirect the user to the view page for that specific report.",
      "Technicality: Technically, redirect returns a Response object with a 302 status code, which React Router intercepts to perform a client-side transition."
    ],
    codeExample: `import { redirect } from "@remix-run/react";
// Mock functions representing database operations
import { getTechnicianSession, createLabReport } from "./db-utils";

// LOADER EXAMPLE: Access Control
export const loader = async ({ request }) => {
  const session = await getTechnicianSession(request);

  if (!session) {
    // Force navigation to login if no session exists
    return redirect("/auth/login");
  }

  return { technician: session.user };
};

// ACTION EXAMPLE: Post-submission navigation
export const action = async ({ request }) => {
  const formData = await request.formData();
  const newReport = await createLabReport({
    sampleId: formData.get("sampleId"),
    findings: formData.get("findings")
  });

  // Navigate to the specific page for the new report
  return redirect(\`/lab/reports/\${newReport.id}\`);
};`,
    simpleTermsExplanation: "The code imports the 'redirect' tool. Think of 'redirect' as a \"U-Turn\" sign that the website sets up dynamically. In the 'loader' function, the website checks if you are allowed to be here. It's like a security guard at the door; if getTechnicianSession comes back empty (meaning you aren't logged in), the code returns a 'redirect(\"/auth/login\")'. This stops you in your tracks and sends you straight to the login page before the rest of the page even loads. In the 'action' function, we are dealing with a form submission. After the code successfully creates a new lab report in the database using the form data, we don't want the user to stay on the empty form. So, we use 'redirect' to automatically \"push\" them over to the page where they can actually see the report they just finished writing. It makes the transition between \"doing work\" and \"seeing results\" feel automatic.",
    Demo: RedirectDemo
  },
  {
    title: "useNavigate",
    concept: "Imperative Client-Side Navigation",
    bullets: ["navigate the user to a new page without the user interacting. (Uncommon)", "Logging them out after inactivity", "Timed UIs like quizzes, etc."],
    description: "The useNavigate hook provides a programmatic way to trigger navigation within the React component tree. While declarative components like Link or Form are preferred for user-initiated actions, useNavigate is essential for \"imperative\" navigation—where the application logic decides to move the user based on side effects or events. Common use cases include redirecting after a timer expires, moving a user after a WebSocket message is received, or handling navigation inside an event handler that requires complex pre-processing.",
    realWorldApplication: "A deep-sea submersible telemetry interface where, if the oxygen sensors detect a critical breach, the application immediately \"navigates\" the user from the manual control dashboard to an emergency evacuation checklist without waiting for the pilot to click a link.",
    broadScaleUsage: "In advanced React architecture, useNavigate allows developers to bridge the gap between non-UI logic and the routing system. By extracting the navigate function, the app can integrate navigation into custom hooks or complex state machines, ensuring the UI remains in sync with background processes (like session timeouts) that occur independently of user clicks.",
    narrowedApproach: [
      "Hook Initialization: Call useNavigate() at the top level of your component or custom hook to get the navigate function.",
      "Navigation: Call navigate(\"/path\") to move forward. You can also pass an integer like navigate(-1) to go back in the browser history.",
      "Side Effects: Always use useNavigate inside a useEffect or an event handler to ensure the navigation doesn't occur during the actual rendering phase, which would cause an error."
    ],
    codeExample: `import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";

// Example of a session watchdog
export function useCriticalAlertSystem(isBreachDetected) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isBreachDetected) {
      // Imperatively moving the user to the emergency protocols
      navigate("/emergency/protocols");
    }
  }, [isBreachDetected, navigate]);
}

export default function SubmersibleMonitor({ sensorStatus }) {
  const navigate = useNavigate();

  // Custom hook usage
  useCriticalAlertSystem(sensorStatus.isCritical);

  const handleManualOverride = () => {
    // Perform complex logic, then navigate
    console.log("Manual override engaged.");
    navigate("/manual-controls");
  };

  return (
    <div>
      <h3>Hull Pressure: {sensorStatus.pressure} PSI</h3>
      <button onClick={handleManualOverride}>Engage Override</button>
    </div>
  );
}`,
    simpleTermsExplanation: "The code imports 'useNavigate' and 'useEffect'. Think of 'useNavigate' as a remote control for the browser's address bar. Usually, a user has to click a link to change the page, but 'useNavigate' lets the code do it for them. In the 'useCriticalAlertSystem' hook, we use 'useEffect' to watch for a \"Breach.\" If the computer detects a problem (isBreachDetected becomes true), the 'navigate' function is called automatically, whisking the user away to a safety page. In the 'SubmersibleMonitor' component, we also use 'navigate' inside a button click handler. This is useful when you want to do something else first—like logging a message to the console—before finally telling the browser to switch to the \"Manual Controls\" page. It gives the programmer total control over when and how the user moves around the app.",
    Demo: SubmersibleMonitorDemo
  }
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

export default function Week05ReactRouterNavigationMasterclass({
  onBack,
  onSectionChange,
  title = 'Navigation with React Router',
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
          <p className="sm-kicker">AD312 • Week 05 • Lecture 04</p>
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
