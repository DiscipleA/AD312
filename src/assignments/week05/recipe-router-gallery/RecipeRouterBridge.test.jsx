import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import RecipeRouterBridge, {
  getRecipeById,
  getRecipeRoute,
  parseRecipeIdFromPath,
  recipes,
  resolveRoute,
} from './RecipeRouterBridge'

/*
 * WEEK 5 ASSIGNMENT 2 OFFICIAL TESTS
 * ------------------------------------------------------------
 * These tests cover at least three normal cases and three edge cases.
 *
 * Normal cases prove the happy path: route paths are built correctly, ids match
 * Week 2 recipe data, and /recipe/:id exposes the id. Edge cases protect against
 * missing records, malformed paths, and unknown routes.
 */

describe('Week 5 Assignment 2 recipe router helpers', () => {
  it('normal: creates a dynamic route path for a recipe id', () => {
    // Mirrors <Link to={`/recipe/${recipe.id}`}> in gallery.jsx.
    expect(getRecipeRoute('1')).toBe('/recipe/1')
  })

  it('normal: finds a Week 2 recipe by dynamic id', () => {
    // useParams returns strings, so string id "2" should find the second recipe.
    expect(getRecipeById('2')?.title).toBe('Berry Breakfast Toast')
  })

  it('normal: parses the id from a dynamic recipe path', () => {
    // Simulates the dynamic filename app/routes/recipe.$id.jsx.
    expect(parseRecipeIdFromPath('/recipe/3')).toBe('3')
  })

  it('edge: returns null when a recipe id does not exist', () => {
    // A valid route shape can still contain an id that does not exist.
    expect(getRecipeById('missing-recipe')).toBeNull()
  })

  it('edge: rejects malformed dynamic paths', () => {
    // /recipes/3 is not the required /recipe/:id route shape.
    expect(parseRecipeIdFromPath('/recipes/3')).toBeNull()
  })

  it('edge: resolves unknown paths to not-found', () => {
    // Unknown URLs should resolve to fallback behavior instead of crashing.
    expect(resolveRoute('/does-not-exist').name).toBe('not-found')
  })
})

describe('Week 5 Assignment 2 recipe router preview', () => {
  it('renders the home route and navigates to the gallery', async () => {
    const user = userEvent.setup()

    render(<RecipeRouterBridge />)

    expect(screen.getByRole('heading', { name: /welcome to the recipe dashboard/i })).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: /open gallery/i }))

    expect(screen.getByRole('heading', { name: /^recipe gallery$/i })).toBeInTheDocument()
  })

  it('renders a dynamic recipe detail route from a gallery card link', async () => {
    const user = userEvent.setup()

    render(<RecipeRouterBridge />)

    await user.click(screen.getByRole('link', { name: /^Gallery$/i }))
    await user.click(screen.getByRole('link', { name: new RegExp(`open ${recipes[0].title} recipe detail`, 'i') }))

    expect(screen.getByRole('heading', { name: recipes[0].title })).toBeInTheDocument()
    expect(screen.getByText(/cooking instructions/i)).toBeInTheDocument()
    expect(screen.getByText('/recipe/1')).toBeInTheDocument()
  })
})
