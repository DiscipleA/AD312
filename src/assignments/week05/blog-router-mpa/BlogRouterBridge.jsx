import { useMemo, useState } from 'react'
import '../../../styles/week05-blog-router-mpa-assignment.css'

/*
 * Week 5 Assignment 3: Blog Router Bridge
 * ------------------------------------------------------------
 * This file is intentionally written as a Vite-safe preview of the React Router
 * / Remix assignment. The real standalone assignment should use React Router
 * framework files such as app/root.jsx and app/routes/post.$postId.jsx.
 *
 * Why use a bridge inside this portfolio?
 * The AD312 course shell is already a Vite app with its own navigation system.
 * Installing and mounting a second full React Router framework runtime inside
 * it would be disruptive. Instead, this bridge models the same route behavior:
 *
 *   /              -> Home feed
 *   /about         -> About page
 *   /post/:postId  -> Dynamic post page
 *
 * Students can click through the preview and see how URL-shaped state replaces
 * a static single-view blog screen. The source code below explains the same
 * concepts they will use in a standalone Remix / React Router project.
 */

/*
 * This data mirrors the assignment requirement for app/data/posts.js.
 *
 * In a real React Router framework app, this array would usually live in:
 *
 *   app/data/posts.js
 *
 * The dynamic route module, app/routes/post.$postId.jsx, would import the data,
 * read postId from useParams(), and find the matching object.
 */
export const posts = [
  {
    id: 1,
    title: 'React Router Tips',
    content: 'Use Link instead of anchor tags so route changes stay inside the app shell without a full browser reload.',
  },
  {
    id: 2,
    title: 'State Management',
    content: 'Context API and Redux solve different problems. Use Context for shared app values and Redux for more structured global state workflows.',
  },
  {
    id: 3,
    title: 'The Future of Web',
    content: 'AI and React are merging through smarter tooling, better code assistance, and interfaces that adapt to user intent.',
  },
]

export const routeDefinitions = [
  {
    file: 'app/root.jsx',
    path: 'layout shell',
    purpose: 'Persistent navigation layout with <Outlet /> for child routes.',
  },
  {
    file: 'app/routes/_index.jsx',
    path: '/',
    purpose: 'Home feed route that lists every blog post title as a link.',
  },
  {
    file: 'app/routes/about.jsx',
    path: '/about',
    purpose: 'Static informational page explaining the blog purpose.',
  },
  {
    file: 'app/routes/post.$postId.jsx',
    path: '/post/:postId',
    purpose: 'Dynamic post route that reads postId with useParams.',
  },
]

/*
 * getPostById centralizes the lookup logic used by the dynamic route.
 *
 * React Router's useParams() returns strings because URL segments are text.
 * The data ids are numbers, so we convert both sides to String before comparing.
 * This avoids bugs where "1" and 1 refer to the same post but fail strict
 * comparison because their types are different.
 */
export function getPostById(postId) {
  return posts.find((post) => String(post.id) === String(postId)) ?? null
}

/*
 * getPostRoute builds the path that a <Link> should point to.
 *
 * In the real Home route, each post title would render something like:
 *
 *   <Link to={`/post/${post.id}`}>{post.title}</Link>
 *
 * That route path then matches app/routes/post.$postId.jsx.
 */
export function getPostRoute(postId) {
  return `/post/${postId}`
}

/*
 * parsePostIdFromPath simulates the route-param extraction React Router does.
 *
 * In the real assignment, students should not hand-write this parser. They
 * should call useParams() inside app/routes/post.$postId.jsx:
 *
 *   const { postId } = useParams()
 *
 * This helper exists only so the Vite preview and Vitest tests can demonstrate
 * the same dynamic-segment behavior without installing a full router.
 */
export function parsePostIdFromPath(pathname) {
  const match = pathname.match(/^\/post\/([^/]+)$/)
  return match ? decodeURIComponent(match[1]) : null
}

/*
 * resolveRoute is the bridge's tiny route matcher.
 *
 * Think of it as a simplified teaching version of React Router's route matching.
 * It receives a path string and decides which "route module" should render.
 *
 * The order matters:
 *   1. Exact static routes are checked first.
 *   2. Dynamic /post/:postId is checked next.
 *   3. Anything else becomes not-found.
 */
export function resolveRoute(pathname) {
  if (pathname === '/') return { name: 'home' }
  if (pathname === '/about') return { name: 'about' }

  const postId = parsePostIdFromPath(pathname)

  if (postId !== null) {
    return {
      name: 'post-detail',
      postId,
      post: getPostById(postId),
    }
  }

  return { name: 'not-found' }
}

/*
 * RouterPreviewLink acts like React Router's <Link>.
 *
 * It renders a real <a href="..."> element for accessibility and browser
 * semantics, but it prevents the default full-page reload. Instead, it updates
 * local preview state so the portfolio can simulate route navigation.
 */
function RouterPreviewLink({
  to,
  currentPath,
  onNavigate,
  children,
  className = 'blog-router-link',
  ...props
}) {
  const isActive = currentPath === to

  function handleClick(event) {
    event.preventDefault()
    onNavigate(to)
  }

  return (
    <a
      href={to}
      className={isActive ? `${className} active` : className}
      onClick={handleClick}
      aria-current={isActive ? 'page' : undefined}
      {...props}
    >
      {children}
    </a>
  )
}

/*
 * BlogLayout models app/root.jsx.
 *
 * The key React Router concept here is persistence. The nav bar should stay on
 * screen while the child route changes underneath it. In a real framework app,
 * <Outlet /> marks the place where child routes render.
 */
function BlogLayout({ currentPath, onNavigate, children }) {
  return (
    <section className="blog-router-app-shell">
      <nav className="blog-router-navbar" aria-label="Blog app navigation">
        <div>
          <p className="blog-router-kicker">React Router / Remix MPA</p>
          <h3>Blog Remix App</h3>
        </div>

        <div className="blog-router-navlinks">
          <RouterPreviewLink to="/" currentPath={currentPath} onNavigate={onNavigate}>
            Home
          </RouterPreviewLink>
          <RouterPreviewLink to="/about" currentPath={currentPath} onNavigate={onNavigate}>
            About
          </RouterPreviewLink>
        </div>
      </nav>

      {children}
    </section>
  )
}

/*
 * HomeRoute models app/routes/_index.jsx.
 *
 * The Home route is the feed page. It maps over every post and turns each title
 * into a link. This is the main difference between a static single-view blog
 * and a navigable multi-page experience: each post can now have its own URL.
 */
function HomeRoute({ currentPath, onNavigate }) {
  return (
    <section className="blog-router-route-card">
      <p className="blog-router-route-file">app/routes/_index.jsx</p>
      <h2>Home Feed</h2>
      <p>
        The feed route lists every blog post title. Each card below behaves like a
        <code> Link</code> to a dynamic post route such as <code>/post/1</code>.
      </p>

      <div className="blog-router-post-list">
        {posts.map((post) => (
          <RouterPreviewLink
            key={post.id}
            to={getPostRoute(post.id)}
            currentPath={currentPath}
            onNavigate={onNavigate}
            className="blog-router-post-card"
            aria-label={`Open ${post.title} post`}
          >
            <span>Post {post.id}</span>
            <strong>{post.title}</strong>
            <small>{getPostRoute(post.id)}</small>
          </RouterPreviewLink>
        ))}
      </div>
    </section>
  )
}

function AboutRoute() {
  return (
    <section className="blog-router-route-card">
      <p className="blog-router-route-file">app/routes/about.jsx</p>
      <h2>About This Blog</h2>
      <p>
        This blog demonstrates how a frontend developer can organize content into
        logical route views: a feed, an about page, and a dynamic post detail page.
      </p>
    </section>
  )
}

/*
 * PostViewRoute models app/routes/post.$postId.jsx.
 *
 * In the real route module:
 *
 *   const { postId } = useParams()
 *
 * would read the dynamic part of the URL. If the user visits /post/2, postId
 * would be "2". Then the route can use .find() to locate the matching post.
 *
 * This component also models useNavigate with the Return to Feed button.
 */
function PostViewRoute({ postId, onNavigate }) {
  const post = getPostById(postId)

  if (!post) {
    return (
      <section className="blog-router-route-card blog-router-not-found" role="status">
        <p className="blog-router-route-file">app/routes/post.$postId.jsx</p>
        <h2>Post Not Found</h2>
        <p>
          The dynamic route captured <code>{postId}</code>, but no blog post has that id.
          This is an important edge case for dynamic routing.
        </p>
        <button type="button" className="blog-router-primary" onClick={() => onNavigate('/')}>
          Return to Feed
        </button>
      </section>
    )
  }

  return (
    <section className="blog-router-route-card blog-router-post-detail">
      <p className="blog-router-route-file">app/routes/post.$postId.jsx</p>
      <span>Post {post.id}</span>
      <h2>{post.title}</h2>
      <p>{post.content}</p>

      <button type="button" className="blog-router-primary" onClick={() => onNavigate('/')}>
        Return to Feed
      </button>

      <p className="blog-router-programmatic-note">
        The button above represents <code>useNavigate()</code>: navigation triggered by code
        instead of a normal link click.
      </p>
    </section>
  )
}

function NotFoundRoute({ onNavigate }) {
  return (
    <section className="blog-router-route-card blog-router-not-found" role="status">
      <p className="blog-router-route-file">fallback route</p>
      <h2>Route Not Found</h2>
      <p>The preview could not match this path to Home, About, or Dynamic Post.</p>
      <button type="button" className="blog-router-primary" onClick={() => onNavigate('/')}>
        Return Home
      </button>
    </section>
  )
}

export default function BlogRouterBridge() {
  /*
   * currentPath is the preview's substitute for browser URL state.
   * React Router would normally read the real browser location and match route
   * modules automatically. Here, clicking links updates currentPath so students
   * can see the route transition inside the course platform.
   */
  const [currentPath, setCurrentPath] = useState('/')
  const route = useMemo(() => resolveRoute(currentPath), [currentPath])

  let renderedRoute

  if (route.name === 'home') {
    renderedRoute = <HomeRoute currentPath={currentPath} onNavigate={setCurrentPath} />
  }

  if (route.name === 'about') {
    renderedRoute = <AboutRoute />
  }

  if (route.name === 'post-detail') {
    renderedRoute = <PostViewRoute postId={route.postId} onNavigate={setCurrentPath} />
  }

  if (route.name === 'not-found') {
    renderedRoute = <NotFoundRoute onNavigate={setCurrentPath} />
  }

  return (
    <div className="blog-router-preview">
      <div className="blog-router-address-bar">
        <span>Current route</span>
        <strong>{currentPath}</strong>
      </div>

      <BlogLayout currentPath={currentPath} onNavigate={setCurrentPath}>
        {renderedRoute}
      </BlogLayout>

      <div className="blog-router-route-map">
        {routeDefinitions.map((routeDefinition) => (
          <article key={routeDefinition.file}>
            <strong>{routeDefinition.file}</strong>
            <span>{routeDefinition.path}</span>
            <p>{routeDefinition.purpose}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
