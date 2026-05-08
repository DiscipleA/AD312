import { useMemo, useState } from 'react'
import { images as week02RecipeImages } from '../../week02/interactive-recipe-gallery/RecipeGallery'
import '../../../styles/week05-recipe-router-gallery-assignment.css'

/*
 * WEEK 5 ASSIGNMENT 2 BRIDGE NOTE
 * ------------------------------------------------------------
 * The real assignment is written for React Router / Remix framework mode, where
 * route files live in app/routes and the router reads the URL. This portfolio is
 * already a Vite React shell, so this file demonstrates the same routing ideas
 * without replacing the existing course architecture.
 *
 * Teaching connection:
 * Week 2 used component state to decide which recipe image appeared. Week 5 moves
 * that decision into URL-like state: /gallery and /recipe/:id. The cards are links,
 * the dynamic id comes from the route string, and missing ids become edge cases.
 */

export const recipes = week02RecipeImages.map((image, index) => {
  /*
   * Reuse the exact Week 2 Recipe Gallery images so this assignment feels like
   * a continuation, not a brand-new app. The extra title/category/time fields
   * turn each image into a recipe record suitable for a detail route.
   */
  const recipeTitles = [
    'Fresh Veggie Pasta Bowl',
    'Berry Breakfast Toast',
    'Colorful Grain Salad',
    'Fruit Pancake Stack',
  ]

  const cookingTimes = ['25 minutes', '10 minutes', '18 minutes', '20 minutes']
  const categories = ['Dinner', 'Breakfast', 'Lunch', 'Brunch']

  return {
    id: String(image.id),
    title: recipeTitles[index] ?? `Recipe ${image.id}`,
    image: image.url,
    summary: image.description,
    cookingTime: cookingTimes[index] ?? '15 minutes',
    category: categories[index] ?? 'Recipe',
  }
})

export const routeDefinitions = [
  { file: 'app/routes/_index.jsx', path: '/', purpose: 'Home dashboard route' },
  {
    file: 'app/routes/gallery.jsx',
    path: '/gallery',
    purpose: 'Full gallery route converted from the Week 2 state-based Recipe Gallery',
  },
  {
    file: 'app/routes/recipe.$id.jsx',
    path: '/recipe/:id',
    purpose: 'Dynamic recipe detail route that reads the id with useParams',
  },
]

export function getRecipeById(id) {
  /*
   * useParams() returns route params as strings. Comparing with String(id)
   * prevents number-vs-string bugs when matching /recipe/:id to recipe data.
   */
  return recipes.find((recipe) => recipe.id === String(id)) ?? null
}

export function getRecipeRoute(id) {
  /*
   * This mirrors the route-link expression students would write:
   * <Link to={`/recipe/${recipe.id}`}>.
   */
  return `/recipe/${id}`
}

export function parseRecipeIdFromPath(pathname) {
  /*
   * React Router parses dynamic segments automatically. This bridge parser
   * only accepts the required /recipe/:id shape and rejects lookalikes such as
   * /recipes/3 so tests can protect the route naming requirement.
   */
  const match = pathname.match(/^\/recipe\/([^/]+)$/)
  return match ? decodeURIComponent(match[1]) : null
}

export function resolveRoute(pathname) {
  /*
   * This is the preview's route matcher. It answers the same question React
   * Router answers internally: which route module should render for this URL?
   */
  if (pathname === '/') return { name: 'home' }
  if (pathname === '/gallery') return { name: 'gallery' }

  const recipeId = parseRecipeIdFromPath(pathname)

  if (recipeId) {
    return {
      name: 'recipe-detail',
      id: recipeId,
      recipe: getRecipeById(recipeId),
    }
  }

  return { name: 'not-found' }
}

function RouterPreviewLink({
  to,
  currentPath,
  onNavigate,
  children,
  className = 'recipe-router-link',
  ...props
}) {
  const isActive = currentPath === to

  function handleClick(event) {
    /*
     * A real <Link> prevents a full page reload and lets React Router update
     * the location. This preview keeps that behavior visible by storing the
     * target path in local state.
     */
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

function AppLayout({ currentPath, onNavigate, children }) {
  return (
    <section className="recipe-router-app-shell">
      <nav className="recipe-router-navbar" aria-label="Recipe app navigation">
        <div>
          <p className="recipe-router-kicker">Week 2 Recipe Gallery → Week 5 Routing</p>
          <h3>Recipe Router App</h3>
        </div>

        <div className="recipe-router-navlinks">
          <RouterPreviewLink to="/" currentPath={currentPath} onNavigate={onNavigate}>
            Home
          </RouterPreviewLink>
          <RouterPreviewLink to="/gallery" currentPath={currentPath} onNavigate={onNavigate}>
            Gallery
          </RouterPreviewLink>
        </div>
      </nav>

      {children}
    </section>
  )
}

function HomeRoute({ currentPath, onNavigate }) {
  return (
    <section className="recipe-router-route-card">
      <p className="recipe-router-route-file">app/routes/_index.jsx</p>
      <h2>Welcome to the Recipe Dashboard</h2>
      <p>
        This route is the new home dashboard for the same recipe gallery students built in Week 2.
        Instead of moving through recipes with local Previous and Next state, this version introduces
        URL-based navigation.
      </p>

      <RouterPreviewLink
        to="/gallery"
        currentPath={currentPath}
        onNavigate={onNavigate}
        className="recipe-router-primary"
      >
        Open Gallery
      </RouterPreviewLink>
    </section>
  )
}

function GalleryRoute({ currentPath, onNavigate }) {
  return (
    <section className="recipe-router-route-card">
      <p className="recipe-router-route-file">app/routes/gallery.jsx</p>
      <h2>Recipe Gallery</h2>
      <p>
        This is the Week 2 Recipe Gallery converted into a routing experience. The old Next and
        Previous buttons are removed. Every recipe is visible, and each card is a link to a
        dynamic route such as <code>/recipe/1</code>.
      </p>

      <div className="recipe-router-gallery-grid">
        {recipes.map((recipe) => (
          <RouterPreviewLink
            key={recipe.id}
            to={getRecipeRoute(recipe.id)}
            currentPath={currentPath}
            onNavigate={onNavigate}
            className="recipe-router-recipe-card"
            aria-label={`Open ${recipe.title} recipe detail`}
          >
            <img src={recipe.image} alt={recipe.summary} />
            <span>{recipe.category}</span>
            <strong>{recipe.title}</strong>
            <small>{getRecipeRoute(recipe.id)}</small>
          </RouterPreviewLink>
        ))}
      </div>
    </section>
  )
}

function RecipeDetailRoute({ id, currentPath, onNavigate }) {
  const recipe = getRecipeById(id)

  if (!recipe) {
    return (
      <section className="recipe-router-route-card recipe-router-not-found" role="status">
        <p className="recipe-router-route-file">app/routes/recipe.$id.jsx</p>
        <h2>Recipe Not Found</h2>
        <p>
          The dynamic route captured <code>{id}</code>, but that id does not exist in the recipe data.
        </p>
        <RouterPreviewLink
          to="/gallery"
          currentPath={currentPath}
          onNavigate={onNavigate}
          className="recipe-router-primary"
        >
          Back to Gallery
        </RouterPreviewLink>
      </section>
    )
  }

  return (
    <section className="recipe-router-route-card recipe-router-detail-card">
      <p className="recipe-router-route-file">app/routes/recipe.$id.jsx</p>
      <img src={recipe.image} alt={`${recipe.title} preview`} />

      <div>
        <span>{recipe.category} • {recipe.cookingTime}</span>
        <h2>{recipe.title}</h2>
        <p>{recipe.summary}</p>

        <div className="recipe-router-instructions">
          <h3>Cooking Instructions</h3>
          <p>
            Placeholder instructions: prepare ingredients, follow the cooking steps, plate the dish,
            and serve. In a full React Router framework app, this route would read the id with
            <code> useParams()</code>, find the matching recipe, and render its full instructions.
          </p>
        </div>

        <RouterPreviewLink
          to="/gallery"
          currentPath={currentPath}
          onNavigate={onNavigate}
          className="recipe-router-primary"
        >
          Back to Gallery
        </RouterPreviewLink>
      </div>
    </section>
  )
}

function NotFoundRoute({ currentPath, onNavigate }) {
  return (
    <section className="recipe-router-route-card recipe-router-not-found" role="status">
      <p className="recipe-router-route-file">fallback route</p>
      <h2>Route Not Found</h2>
      <p>This preview could not match the current path to Home, Gallery, or Recipe Detail.</p>
      <RouterPreviewLink
        to="/"
        currentPath={currentPath}
        onNavigate={onNavigate}
        className="recipe-router-primary"
      >
        Back Home
      </RouterPreviewLink>
    </section>
  )
}

export default function RecipeRouterBridge() {
  const [currentPath, setCurrentPath] = useState('/')
  const route = useMemo(() => resolveRoute(currentPath), [currentPath])

  let renderedRoute

  if (route.name === 'home') {
    renderedRoute = <HomeRoute currentPath={currentPath} onNavigate={setCurrentPath} />
  }

  if (route.name === 'gallery') {
    renderedRoute = <GalleryRoute currentPath={currentPath} onNavigate={setCurrentPath} />
  }

  if (route.name === 'recipe-detail') {
    renderedRoute = <RecipeDetailRoute id={route.id} currentPath={currentPath} onNavigate={setCurrentPath} />
  }

  if (route.name === 'not-found') {
    renderedRoute = <NotFoundRoute currentPath={currentPath} onNavigate={setCurrentPath} />
  }

  return (
    <div className="recipe-router-preview">
      <div className="recipe-router-address-bar">
        <span>Current route</span>
        <strong>{currentPath}</strong>
      </div>

      <AppLayout currentPath={currentPath} onNavigate={setCurrentPath}>
        {renderedRoute}
      </AppLayout>

      <div className="recipe-router-route-map">
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
