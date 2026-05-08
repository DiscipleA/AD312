import RecipeGallery from '../assignments/week02/interactive-recipe-gallery/RecipeGallery'
import RecipeGalleryTestPanel from './RecipeGalleryTestPanel'
import '../styles/week02-recipe-gallery-assignment.css'
import CodeBlock from '../components/CodeBlock'
import { annotateDisplayedCode } from '../utils/educationalCode'

const gallerySyntax = `import { useState } from 'react'
import '../styles/week02-recipe-gallery-assignment.css'

export const images = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',
    description: 'Fresh veggie pasta bowl with herbs and a light sauce.',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=80',
    description: 'Berry breakfast toast topped with cream and fresh fruit.',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
    description: 'Colorful salad plate with greens, vegetables, and grains.',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1200&q=80',
    description: 'Stack of pancakes served with fruit and syrup.',
  },
]

export default function RecipeGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentImage = images[currentIndex]
  const isFirstImage = currentIndex === 0
  const isLastImage = currentIndex === images.length - 1

  function handlePrevious() {
    if (isFirstImage) {
      return
    }

    setCurrentIndex((previousIndex) => previousIndex - 1)
  }

  function handleNext() {
    if (isLastImage) {
      return
    }

    setCurrentIndex((previousIndex) => previousIndex + 1)
  }

  return (
    <section className="recipe-gallery-shell">
      <div className="recipe-gallery-card">
        <p className="recipe-gallery-kicker">Week 2 Assignment Exercise</p>
        <h2>Interactive Recipe Gallery</h2>
        <p className="recipe-gallery-description">
          Practice React state by navigating a predefined list of recipe images with
          clear boundary-aware Previous and Next controls.
        </p>

        <div className="recipe-gallery-stage">
          <div className="recipe-gallery-image-frame">
            <img
              src={currentImage.url}
              alt={currentImage.description}
              className="recipe-gallery-image"
              data-testid="gallery-image"
            />
          </div>

          <div className="recipe-gallery-meta">
            <p className="recipe-gallery-position" data-testid="gallery-position">
              Recipe {currentIndex + 1} of {images.length}
            </p>
            <p className="recipe-gallery-caption" data-testid="gallery-description">
              {currentImage.description}
            </p>
          </div>
        </div>

        <div className="recipe-gallery-controls">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={isFirstImage}
            aria-label="Previous recipe"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={isLastImage}
            aria-label="Next recipe"
          >
            Next
          </button>
        </div>

        <div className="recipe-gallery-notes">
          <h3>What to Observe</h3>
          <ul>
            <li>The displayed image is controlled by the current index in state.</li>
            <li>Clicking Next moves forward one recipe at a time.</li>
            <li>Clicking Previous moves back one recipe at a time.</li>
            <li>Buttons disable at the gallery boundaries so navigation cannot go out of range.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}`

const testSyntax = `import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'
import RecipeGallery, { images } from './RecipeGallery'

afterEach(() => {
  cleanup()
})

describe('RecipeGallery standalone exercise', () => {
  test('normal: renders the first recipe by default', () => {
    render(<RecipeGallery />)

    expect(screen.getByTestId('gallery-description')).toHaveTextContent(images[0].description)
    expect(screen.getByTestId('gallery-position')).toHaveTextContent(\`Recipe 1 of \${images.length}\`)
  })

  test('normal: clicking Next moves to the next recipe', () => {
    render(<RecipeGallery />)

    fireEvent.click(screen.getByRole('button', { name: /next recipe/i }))

    expect(screen.getByTestId('gallery-description')).toHaveTextContent(images[1].description)
    expect(screen.getByTestId('gallery-position')).toHaveTextContent(\`Recipe 2 of \${images.length}\`)
  })

  test('normal: clicking Previous after advancing returns to the earlier recipe', () => {
    render(<RecipeGallery />)

    fireEvent.click(screen.getByRole('button', { name: /next recipe/i }))
    fireEvent.click(screen.getByRole('button', { name: /previous recipe/i }))

    expect(screen.getByTestId('gallery-description')).toHaveTextContent(images[0].description)
    expect(screen.getByTestId('gallery-position')).toHaveTextContent(\`Recipe 1 of \${images.length}\`)
  })

  test('edge: Previous is disabled on the first recipe', () => {
    render(<RecipeGallery />)

    const previousButton = screen.getByRole('button', { name: /previous recipe/i })

    expect(previousButton).toBeDisabled()
    expect(screen.getByTestId('gallery-description')).toHaveTextContent(images[0].description)
  })

  test('edge: Next is disabled on the last recipe', () => {
    render(<RecipeGallery />)

    const nextButton = screen.getByRole('button', { name: /next recipe/i })

    for (let index = 1; index < images.length; index += 1) {
      fireEvent.click(nextButton)
    }

    expect(nextButton).toBeDisabled()
    expect(screen.getByTestId('gallery-description')).toHaveTextContent(images[images.length - 1].description)
    expect(screen.getByTestId('gallery-position')).toHaveTextContent(\`Recipe \${images.length} of \${images.length}\`)
  })

  test('edge: navigation does not move before the first or past the last recipe', () => {
    render(<RecipeGallery />)

    const previousButton = screen.getByRole('button', { name: /previous recipe/i })
    const nextButton = screen.getByRole('button', { name: /next recipe/i })

    fireEvent.click(previousButton)
    expect(screen.getByTestId('gallery-description')).toHaveTextContent(images[0].description)

    for (let index = 1; index < images.length; index += 1) {
      fireEvent.click(nextButton)
    }

    fireEvent.click(nextButton)

    expect(screen.getByTestId('gallery-description')).toHaveTextContent(images[images.length - 1].description)
    expect(screen.getByTestId('gallery-position')).toHaveTextContent(\`Recipe \${images.length} of \${images.length}\`)
  })
})`

export default function Week02RecipeGalleryAssignmentGuide() {
  return (
    <div className="assignment-guide-shell">
      <div className="assignment-hero">
        <p className="assignment-kicker">Week 2 Assignment</p>
        <h1>Building an Interactive Recipe Gallery with React</h1>
        <p className="assignment-summary">
          Build a standalone React gallery that renders recipe images from a predefined
          list, tracks the current image with state, and prevents navigation beyond the
          first or last item.
        </p>
      </div>

      <section className="assignment-section">
        <h2>Overview</h2>
        <p>
          This assignment is designed to help you practice state-driven rendering with a
          concrete visual example. Instead of updating a number like a counter, you will
          store the current gallery index in React state and use that value to decide
          which recipe image and description should appear on screen.
        </p>
        <p>
          Because this is an index-based interface, boundary checks matter. The user
          should be able to move forward and backward through the list, but never beyond
          the valid range of items.
        </p>
      </section>

      <section className="assignment-section">
        <h2>Learning Objectives</h2>
        <ul>
          <li>Use the useState Hook to control which gallery item is displayed.</li>
          <li>Render dynamic content from a predefined array of recipe image objects.</li>
          <li>Implement Next and Previous handlers that update state predictably.</li>
          <li>Apply boundary checks so the UI never moves outside the valid index range.</li>
          <li>Write automated tests for both normal flows and edge-case behavior.</li>
        </ul>
      </section>

      <section className="assignment-section">
        <h2>Step-by-Step Build Instructions</h2>

        <h3>Step 1: Create the standalone exercise file</h3>
        <p>
          Create <code>src/exercises/RecipeGallery.jsx</code>. Keep this component
          standalone so it can be rendered independently of the larger course shell.
        </p>

        <h3>Step 2: Define the image list</h3>
        <p>
          Create and export an <code>images</code> array. Each item should include an
          <code>id</code>, a <code>url</code>, and a <code>description</code>. This array
          becomes the data source for the gallery.
        </p>

        <h3>Step 3: Track the current index with useState</h3>
        <p>
          Initialize <code>currentIndex</code> with a value of <code>0</code>. This means
          the gallery starts by showing the first recipe in the list.
        </p>

        <h3>Step 4: Derive the current gallery item</h3>
        <p>
          Read the current item with <code>const currentImage = images[currentIndex]</code>.
          This is a simple but important pattern: state stores the position, and the UI is
          derived from that position.
        </p>

        <h3>Step 5: Build the Previous button handler</h3>
        <p>
          Create a function that moves the index backward by 1. Add a boundary check so it
          returns early when the user is already on the first image.
        </p>

        <h3>Step 6: Build the Next button handler</h3>
        <p>
          Create a function that moves the index forward by 1. Add a boundary check so it
          returns early when the user is already on the last image.
        </p>

        <h3>Step 7: Disable controls at the boundaries</h3>
        <p>
          Use booleans like <code>isFirstImage</code> and <code>isLastImage</code> to keep
          the UI clear. Disabling the buttons helps the student visually understand when
          navigation is no longer allowed.
        </p>

        <h3>Step 8: Render the active image and description</h3>
        <p>
          Display the current image, its description, and a position label such as
          <code>Recipe 2 of 4</code>. This makes the state change visible and easy to test.
        </p>

        <h3>Step 9: Keep styling self-contained</h3>
        <p>
          Apply CSS that makes the gallery readable in both dark and light mode. The goal
          is a polished exercise surface that still feels consistent with the Week 1
          assignment experience.
        </p>

        <h3>Step 10: Test both normal and edge cases</h3>
        <p>
          This assignment explicitly requires at least 3 normal tests and at least 3 edge
          tests. Your automated test suite should prove that the gallery renders correctly,
          navigates correctly, and never escapes its valid index boundaries.
        </p>
      </section>

      <section className="assignment-section">
        <h2>Working Component Preview</h2>
        <RecipeGallery />
      </section>

      <section className="assignment-section">
        <h2>Why This Assignment Matters</h2>
        <p>
          This gallery is a direct extension of the Week 2 lecture ideas. Instead of
          storing a simple number for a counter, you are storing a position inside a
          collection and using that position to drive the rendered UI. That is a very real
          pattern in React applications: tabs, image carousels, steppers, onboarding flows,
          and product galleries all rely on the same basic idea.
        </p>
      </section>

      <section className="assignment-section">
        <h2>Full Component Syntax</h2>
        <CodeBlock
          code={annotateDisplayedCode(gallerySyntax, 'react')}
          language="jsx"
          label="Component"
        />
      </section>

      <section className="assignment-section">
        <h2>How to Test the Component Manually</h2>
        <ol>
          <li>Run the development server with <code>npm run dev</code>.</li>
          <li>Open the Week 2 assignment inside the course portfolio app.</li>
          <li>Confirm the gallery starts on Recipe 1.</li>
          <li>Confirm the Previous button is disabled on the first recipe.</li>
          <li>Click Next once and confirm the image, description, and position label all change.</li>
          <li>Continue clicking Next until the final recipe appears.</li>
          <li>Confirm the Next button becomes disabled on the last recipe.</li>
          <li>Click Previous and confirm the gallery moves back correctly.</li>
        </ol>
      </section>

      <section className="assignment-section">
        <h2>Automated Test Expectations</h2>
        <p>This assignment includes 6 test cases total:</p>
        <ul>
          <li>3 normal cases</li>
          <li>3 edge cases</li>
        </ul>
        <p>
          These tests verify initial rendering, forward navigation, backward navigation,
          and boundary protection at both ends of the gallery.
        </p>
      </section>

      <section className="assignment-section">
        <h2>Live Test Results</h2>
        <p>
          Use this interactive panel to demonstrate pass and wait states directly inside the
          assignment tab. This is a visual learning aid that complements the real automated Vitest suite.
        </p>
        <RecipeGalleryTestPanel />
      </section>


      <section className="assignment-section">
        <h2>Full Test Syntax</h2>
        <CodeBlock
          code={annotateDisplayedCode(testSyntax, 'test')}
          language="test"
          label="Vitest"
        />
      </section>

      <section className="assignment-section">
        <h2>How to Run the Tests</h2>
        <ol>
          <li>Install dependencies with <code>npm install</code>.</li>
          <li>Run all tests once with <code>npm run test</code>.</li>
          <li>Run in watch mode with <code>npm run test:watch</code>.</li>
          <li>Use the optional UI runner with <code>npm run test:ui</code>.</li>
        </ol>
      </section>

      <section className="assignment-section">
        <h2>What the Student Should Learn</h2>
        <ul>
          <li>State can store position, not just simple counters or booleans.</li>
          <li>Rendering can be derived from an array plus a current index.</li>
          <li>Boundary checks protect the UI from invalid state transitions.</li>
          <li>Disabled controls are a clear way to communicate valid user actions.</li>
          <li>Automated tests help confirm both the happy path and edge conditions.</li>
        </ul>
      </section>
    </div>
  )
}
