import RecipeRouterBridge from '../assignments/week05/recipe-router-gallery/RecipeRouterBridge'
import bridgeSource from '../assignments/week05/recipe-router-gallery/RecipeRouterBridge.jsx?raw'
import testSource from '../assignments/week05/recipe-router-gallery/RecipeRouterBridge.test.jsx?raw'
import RecipeRouterGalleryTestPanel from './RecipeRouterGalleryTestPanel'
import '../styles/week05-recipe-router-gallery-assignment.css'
import CodeBlock from '../components/CodeBlock'

const remixRouteReference = `// app/root.jsx
import { Link, Outlet } from 'react-router'

export default function RootLayout() {
  return (
    <main>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/gallery">Gallery</Link>
      </nav>

      <Outlet />
    </main>
  )
}

// app/routes/_index.jsx
export default function Home() {
  return <h1>Welcome to the Recipe Dashboard</h1>
}

// app/routes/gallery.jsx
import { Link } from 'react-router'
import { recipes } from '../data/recipes'

export default function Gallery() {
  return (
    <section>
      <h1>Recipe Gallery</h1>

      {recipes.map((recipe) => (
        <Link key={recipe.id} to={\`/recipe/\${recipe.id}\`}>
          <img src={recipe.image} alt={recipe.title} />
          <h2>{recipe.title}</h2>
        </Link>
      ))}
    </section>
  )
}

// app/routes/recipe.$id.jsx
import { Link, useParams } from 'react-router'
import { recipes } from '../data/recipes'

export default function RecipeDetail() {
  const { id } = useParams()
  const recipe = recipes.find((item) => String(item.id) === id)

  if (!recipe) {
    return (
      <section>
        <h1>Recipe Not Found</h1>
        <Link to="/gallery">Back to Gallery</Link>
      </section>
    )
  }

  return (
    <section>
      <img src={recipe.image} alt={recipe.title} />
      <h1>{recipe.title}</h1>
      <p>Cooking Instructions: Add full instructions here.</p>
      <Link to="/gallery">Back to Gallery</Link>
    </section>
  )
}`

export default function Week05RecipeRouterGalleryAssignmentGuide() {
  return (
    <article className="recipe-router-assignment-guide">
      <header className="recipe-router-hero-card recipe-router-card">
        <p className="recipe-router-kicker">AD312 • Week 05 • Assignment 02</p>
        <h1>Recipe Gallery Routing with React Router</h1>
        <p>
          Continue the Week 2 Recipe Gallery by transforming it from a single-page state-based component
          into a modern multi-page routing experience with Home, Gallery, and Recipe Detail routes.
        </p>
      </header>

      <section className="recipe-router-card">
        <div>
          <h2>Overview</h2>
          <p>
            In Week 2, the Recipe Gallery used local React state to move between images with Previous
            and Next buttons. In this assignment, the same gallery becomes URL-driven. Students should
            be able to navigate to <code>/gallery</code> and click a recipe card that behaves like a
            route link to <code>/recipe/:id</code>.
          </p>
        </div>
        <div>
          <h2>Framework Note</h2>
          <p>
            The instructions are written for React Router v7+ framework mode, which is part of the
            Remix framework family. The course preview below uses a Vite-safe bridge, so the portfolio
            stays stable while still teaching the required file-based routing model.
          </p>
        </div>
      </section>

      <section className="recipe-router-card">
        <h2>Objectives</h2>
        <ul className="recipe-router-checklist">
          <li>Implement file-based routing for client-side navigation.</li>
          <li>Create a dynamic route for individual recipe detail pages.</li>
          <li>Use <code>useParams</code> to extract URL parameters.</li>
          <li>Add a global layout with Home and Gallery navigation links.</li>
          <li>Replace Week 2 Previous/Next state navigation with recipe-card route links.</li>
          <li>Include at least three normal and three edge test cases.</li>
        </ul>
      </section>

      <section className="recipe-router-card">
        <h2>Standalone Setup</h2>
        <p>
          Use these commands when building the actual React Router framework project outside this Vite
          portfolio shell.
        </p>
        <CodeBlock
          language="bash"
          label="React Router Framework Setup"
          code={`npx create-react-router@latest recipe-router-app
cd recipe-router-app
npm install
npm run dev`}
        />
      </section>

      <section className="recipe-router-card">
        <h2>Required Route Structure</h2>
        <div className="recipe-router-route-table">
          <article>
            <strong>app/routes/_index.jsx</strong>
            <span>/</span>
            <p>Home dashboard route.</p>
          </article>
          <article>
            <strong>app/routes/gallery.jsx</strong>
            <span>/gallery</span>
            <p>Full gallery route using all Week 2 recipe images.</p>
          </article>
          <article>
            <strong>app/routes/recipe.$id.jsx</strong>
            <span>/recipe/:id</span>
            <p>Dynamic detail route that reads the id with <code>useParams</code>.</p>
          </article>
        </div>
      </section>

      <RecipeRouterBridge />
      <RecipeRouterGalleryTestPanel />

      <section className="recipe-router-card">
        <h2>React Router Framework Reference</h2>
        <p>
          This is the framework-style code students should be aiming to understand. The Vite preview
          above simulates the same route behavior without installing React Router into this portfolio app.
        </p>
        <CodeBlock language="jsx" label="React Router Route Files" code={remixRouteReference} />
      </section>

      <section className="recipe-router-card">
        <h2>In-App Preview Source</h2>
        <p>
          The preview source below uses the Week 2 gallery data and a tiny route resolver so students
          can click through Home, Gallery, and Recipe Detail inside the course platform.
        </p>
        <CodeBlock language="jsx" label="src/exercises/RecipeRouterBridge.jsx" code={bridgeSource} />
      </section>

      <section className="recipe-router-card">
        <h2>Official Vitest Tests</h2>
        <p>
          These tests include normal route helper behavior, dynamic id parsing, missing records,
          malformed paths, unknown route fallback, and clickable gallery-card navigation.
        </p>
        <CodeBlock language="jsx" label="src/exercises/RecipeRouterBridge.test.jsx" code={testSource} />
      </section>

      <section className="recipe-router-card">
        <div>
          <h2>Manual Testing</h2>
          <ul>
            <li>Open the Home route and click Gallery.</li>
            <li>Click each recipe card and confirm the route changes to <code>/recipe/:id</code>.</li>
            <li>Confirm every detail page shows an image, title, and cooking instructions placeholder.</li>
            <li>Use Back to Gallery to return to the full recipe list.</li>
          </ul>
        </div>
        <div>
          <h2>Takeaways</h2>
          <p>
            Week 2 taught component state. Week 5 shows when navigation should become URL state. The
            recipe id belongs in the route because users should be able to link directly to a specific
            recipe detail page.
          </p>
        </div>
      </section>
    </article>
  )
}
