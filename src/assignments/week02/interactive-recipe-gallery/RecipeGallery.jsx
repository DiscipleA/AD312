import { useState } from 'react'
import '../../../styles/week02-recipe-gallery-assignment.css'

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
}
