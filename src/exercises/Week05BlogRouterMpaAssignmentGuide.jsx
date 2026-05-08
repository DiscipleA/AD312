import BlogRouterBridge from '../assignments/week05/blog-router-mpa/BlogRouterBridge'
import bridgeSource from '../assignments/week05/blog-router-mpa/BlogRouterBridge.jsx?raw'
import testSource from '../assignments/week05/blog-router-mpa/BlogRouterBridge.test.jsx?raw'
import BlogRouterTestPanel from './BlogRouterTestPanel'
import '../styles/week05-blog-router-mpa-assignment.css'
import CodeBlock from '../components/CodeBlock'

const setupCommands = `npx create-react-router@latest blog-remix-app
cd blog-remix-app
npm install
npm run dev`

const postsDataReference = `// app/data/posts.js
export const posts = [
  { id: 1, title: 'React Router Tips', content: 'Use Link instead of anchor tags...' },
  { id: 2, title: 'State Management', content: 'Context API vs Redux...' },
  { id: 3, title: 'The Future of Web', content: 'AI and React are merging...' },
]`

const remixRouteReference = `// app/root.jsx
import { Link, Outlet } from 'react-router'

export default function RootLayout() {
  return (
    <main>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      {/* Outlet is where the matched child route renders. */}
      <Outlet />
    </main>
  )
}

// app/routes/_index.jsx
import { Link } from 'react-router'
import { posts } from '../data/posts'

export default function Home() {
  return (
    <section>
      <h1>Blog Feed</h1>
      {posts.map((post) => (
        <article key={post.id}>
          <Link to={\`/post/\${post.id}\`}>{post.title}</Link>
        </article>
      ))}
    </section>
  )
}

// app/routes/about.jsx
export default function About() {
  return <p>This blog organizes content into route-based views.</p>
}

// app/routes/post.$postId.jsx
import { useNavigate, useParams } from 'react-router'
import { posts } from '../data/posts'

export default function PostView() {
  const { postId } = useParams()
  const navigate = useNavigate()
  const post = posts.find((item) => String(item.id) === postId)

  if (!post) {
    return (
      <section>
        <h1>Post Not Found</h1>
        <button onClick={() => navigate('/')}>Return to Feed</button>
      </section>
    )
  }

  return (
    <section>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <button onClick={() => navigate('/')}>Return to Feed</button>
    </section>
  )
}`

export default function Week05BlogRouterMpaAssignmentGuide() {
  return (
    <article className="blog-router-assignment-guide">
      <header className="blog-router-hero-card blog-router-card">
        <p className="blog-router-kicker">AD312 • Week 05 • Assignment 03</p>
        <h1>Blog Multi-Page App with React Router</h1>
        <p>
          Convert a static single-view Blog application into a functional multi-page routing experience
          with a Home feed, About page, dynamic Post view, persistent layout, and programmatic navigation.
        </p>
      </header>

      <section className="blog-router-card">
        <h2>Overview</h2>
        <p>
          For this assignment, you will take the role of a frontend developer tasked with organizing
          blog content into logical route views. The standalone instructions use React Router framework
          mode, which is part of the Remix framework family.
        </p>

        <h2>Framework Note</h2>
        <p>
          The instructions are specifically tailored for React Router / Remix. The in-app preview below
          uses a Vite-safe bridge so this existing AD312 portfolio shell remains stable while still showing
          the required route behavior.
        </p>
      </section>

      <section className="blog-router-card">
        <h2>Objectives</h2>
        <ul className="blog-router-checklist">
          <li>Utilize file-based routing to manage application views.</li>
          <li>Implement a persistent Navigation Layout using the <code>&lt;Outlet /&gt;</code> pattern.</li>
          <li>Use dynamic routing to load specific blog posts based on their ID.</li>
          <li>Practice <code>useNavigate</code> for programmatic navigation back to the Home feed.</li>
          <li>Include at least three normal Vitest cases and three edge Vitest cases.</li>
        </ul>
      </section>

      <section className="blog-router-card">
        <h2>Standalone Setup</h2>
        <p>Use these commands when building the actual React Router framework project outside this Vite portfolio shell.</p>
        <CodeBlock language="bash" label="React Router Framework Setup" code={setupCommands} />
      </section>

      <section className="blog-router-card">
        <h2>Required Data Source</h2>
        <p>Create <code>app/data/posts.js</code> and export the three-post array shown below.</p>
        <CodeBlock language="js" label="app/data/posts.js" code={postsDataReference} />
      </section>

      <section className="blog-router-card">
        <h2>Required Route Structure</h2>
        <div className="blog-router-route-table">
          <article><strong>app/root.jsx</strong><span>layout shell</span><p>Contains the persistent nav and <code>&lt;Outlet /&gt;</code>.</p></article>
          <article><strong>app/routes/_index.jsx</strong><span>/</span><p>Displays the Home feed with links to individual posts.</p></article>
          <article><strong>app/routes/about.jsx</strong><span>/about</span><p>Displays a simple About page.</p></article>
          <article><strong>app/routes/post.$postId.jsx</strong><span>/post/:postId</span><p>Displays a dynamic post by reading <code>postId</code> from <code>useParams()</code>.</p></article>
        </div>
      </section>

      <BlogRouterBridge />
      <BlogRouterTestPanel />

      <section className="blog-router-card">
        <h2>React Router Framework Reference</h2>
        <p>
          This is the framework-style code students should be aiming to understand. It shows the persistent
          root layout, Home feed links, About route, dynamic Post route, and <code>useNavigate()</code> return behavior.
        </p>
        <CodeBlock language="jsx" label="React Router Blog Route Files" code={remixRouteReference} />
      </section>

      <section className="blog-router-card">
        <h2>In-App Preview Source</h2>
        <p>The preview source below is deeply commented to explain the relationship between the Vite-safe bridge and the real route files.</p>
        <CodeBlock language="jsx" label="src/exercises/BlogRouterBridge.jsx" code={bridgeSource} />
      </section>

      <section className="blog-router-card">
        <h2>Official Vitest Tests</h2>
        <p>These tests cover normal route behavior, dynamic post ids, malformed paths, missing records, unknown fallback routes, link-driven navigation, and useNavigate-style return behavior.</p>
        <CodeBlock language="jsx" label="src/exercises/BlogRouterBridge.test.jsx" code={testSource} />
      </section>

      <section className="blog-router-card">
        <h2>Manual Testing</h2>
        <ul>
          <li>Open the Home feed and confirm all blog titles are visible.</li>
          <li>Click each title and confirm the route changes to <code>/post/:postId</code>.</li>
          <li>Open About and confirm the layout nav stays visible.</li>
          <li>Use Return to Feed on a post page to simulate <code>useNavigate()</code>.</li>
          <li>Try a missing post id and confirm the not-found state is handled.</li>
        </ul>

        <h2>Takeaways</h2>
        <p>
          Static single-view apps hide navigation inside component state. Multi-page applications expose
          navigation through the URL, so users can bookmark, share, refresh, and directly open specific blog posts.
        </p>
      </section>
    </article>
  )
}
