import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import BlogRouterBridge, {
  getPostById,
  getPostRoute,
  parsePostIdFromPath,
  posts,
  resolveRoute,
} from './BlogRouterBridge'

/*
 * Week 5 Assignment 3 official Vitest tests
 * ------------------------------------------------------------
 * These tests cover both helper-level route logic and UI-level navigation.
 */
describe('Week 5 Assignment 3 blog router helpers', () => {
  it('normal: creates a dynamic post route path', () => {
    expect(getPostRoute(1)).toBe('/post/1')
  })

  it('normal: finds a blog post by dynamic id', () => {
    expect(getPostById('2')?.title).toBe('State Management')
  })

  it('normal: parses the postId from a dynamic post path', () => {
    expect(parsePostIdFromPath('/post/3')).toBe('3')
  })

  it('edge: returns null when a post id does not exist', () => {
    expect(getPostById('999')).toBeNull()
  })

  it('edge: rejects malformed post paths', () => {
    expect(parsePostIdFromPath('/posts/3')).toBeNull()
  })

  it('edge: resolves unknown paths to not-found', () => {
    expect(resolveRoute('/missing-page').name).toBe('not-found')
  })
})

describe('Week 5 Assignment 3 blog router preview', () => {
  it('renders the home feed and navigates to the about route', async () => {
    const user = userEvent.setup()

    render(<BlogRouterBridge />)

    expect(screen.getByRole('heading', { name: /home feed/i })).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: /^About$/i }))

    expect(screen.getByRole('heading', { name: /about this blog/i })).toBeInTheDocument()
  })

  it('renders a dynamic post route from a feed card link', async () => {
    const user = userEvent.setup()

    render(<BlogRouterBridge />)

    await user.click(screen.getByRole('link', { name: new RegExp(`open ${posts[0].title} post`, 'i') }))

    expect(screen.getByRole('heading', { name: posts[0].title })).toBeInTheDocument()
    expect(screen.getByText(/use link instead of anchor tags/i)).toBeInTheDocument()
    expect(screen.getByText('/post/1')).toBeInTheDocument()
  })

  it('uses the Return to Feed button to simulate useNavigate', async () => {
    const user = userEvent.setup()

    render(<BlogRouterBridge />)

    await user.click(screen.getByRole('link', { name: new RegExp(`open ${posts[1].title} post`, 'i') }))
    expect(screen.getByRole('heading', { name: posts[1].title })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /return to feed/i }))

    expect(screen.getByRole('heading', { name: /home feed/i })).toBeInTheDocument()
  })
})
