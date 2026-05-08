import { useMemo, useState } from 'react'
import { images } from '../assignments/week02/interactive-recipe-gallery/RecipeGallery'
import '../styles/assignment-test-panel.css'

export default function RecipeGalleryTestPanel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lastAction, setLastAction] = useState('Initial state')

  const isFirstImage = currentIndex === 0
  const isLastImage = currentIndex === images.length - 1
  const currentImage = images[currentIndex]

  function handleReset() {
    setCurrentIndex(0)
    setLastAction('Reset to initial state')
  }

  function handleNext() {
    if (isLastImage) {
      setLastAction('Next boundary check')
      return
    }

    setCurrentIndex((previousIndex) => previousIndex + 1)
    setLastAction('Next button')
  }

  function handlePrevious() {
    if (isFirstImage) {
      setLastAction('Previous boundary check')
      return
    }

    setCurrentIndex((previousIndex) => previousIndex - 1)
    setLastAction('Previous button')
  }

  function handleJumpToLast() {
    setCurrentIndex(images.length - 1)
    setLastAction('Jump to last recipe')
  }

  function handleBoundaryPrevious() {
    setCurrentIndex(0)
    setLastAction('Boundary previous setup')
    setLastAction('Previous boundary check')
  }

  const testResults = useMemo(() => {
    return [
      {
        label: 'Initial gallery starts on Recipe 1',
        passed:
          currentIndex === 0 &&
          (lastAction === 'Initial state' || lastAction === 'Reset to initial state'),
        detail: `Current position: Recipe ${currentIndex + 1} of ${images.length}`,
      },
      {
        label: 'Next advances to the next recipe',
        passed: lastAction === 'Next button' && currentIndex >= 1,
        detail: `Current position after Next path: Recipe ${currentIndex + 1} of ${images.length}`,
      },
      {
        label: 'Previous returns to the earlier recipe',
        passed: lastAction === 'Previous button' && currentIndex < images.length - 1,
        detail: `Current position after Previous path: Recipe ${currentIndex + 1} of ${images.length}`,
      },
      {
        label: 'Jump to last reaches the final recipe',
        passed: lastAction === 'Jump to last recipe' && isLastImage,
        detail: isLastImage
          ? `Final recipe loaded: Recipe ${images.length} of ${images.length}`
          : 'Final recipe not reached yet.',
      },
      {
        label: 'Next boundary prevents moving past the final recipe',
        passed: lastAction === 'Next boundary check' && isLastImage,
        detail: isLastImage
          ? 'Boundary protection kept the gallery on the final recipe.'
          : 'Trigger the boundary check from the last recipe.',
      },
      {
        label: 'Previous boundary prevents moving before the first recipe',
        passed: lastAction === 'Previous boundary check' && isFirstImage,
        detail: isFirstImage
          ? 'Boundary protection kept the gallery on the first recipe.'
          : 'Trigger the boundary check from the first recipe.',
      },
    ]
  }, [currentIndex, isFirstImage, isLastImage, lastAction])

  const passCount = testResults.filter((test) => test.passed).length

  return (
    <section className="assignment-test-panel">
      <div className="assignment-test-header">
        <div>
          <p className="assignment-test-kicker">Live Assignment Checks</p>
          <h2>On-Screen Test Runner</h2>
          <p className="assignment-test-summary">
            This panel gives students a visual pass/fail experience inside the Week 2 recipe gallery assignment.
            It is meant for learning and demonstration, while your Vitest suite remains the official automated test layer.
          </p>
        </div>

        <div className="assignment-test-score">
          <span>{passCount} / {testResults.length}</span>
          <small>Checks currently passing</small>
        </div>
      </div>

      <div className="assignment-test-controls">
        <button type="button" onClick={handleReset}>Reset</button>
        <button type="button" onClick={handlePrevious}>Previous</button>
        <button type="button" onClick={handleNext}>Next</button>
        <button type="button" onClick={handleJumpToLast}>Jump to Last</button>
        <button type="button" onClick={handleBoundaryPrevious}>Check First Boundary</button>
      </div>

      <div className="assignment-test-statebox">
        <p><strong>Current Recipe:</strong> Recipe {currentIndex + 1} of {images.length}</p>
        <p><strong>Current Description:</strong> {currentImage.description}</p>
        <p><strong>Last Action:</strong> {lastAction}</p>
        <p><strong>Previous Available:</strong> {isFirstImage ? 'No' : 'Yes'}</p>
        <p><strong>Next Available:</strong> {isLastImage ? 'No' : 'Yes'}</p>
      </div>

      <div className="assignment-test-grid">
        {testResults.map((test) => (
          <article
            key={test.label}
            className={test.passed ? 'assignment-test-card passed' : 'assignment-test-card pending'}
          >
            <div className="assignment-test-badge">
              {test.passed ? 'PASS' : 'WAIT'}
            </div>
            <h3>{test.label}</h3>
            <p>{test.detail}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
