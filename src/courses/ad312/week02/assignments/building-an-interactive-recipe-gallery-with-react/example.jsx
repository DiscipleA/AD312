import { useState } from 'react'

const recipes = [
  'Veggie pasta bowl',
  'Berry breakfast toast',
  'Colorful salad plate',
]

export default function RecipeGalleryMirrorExample() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const isFirst = currentIndex === 0
  const isLast = currentIndex === recipes.length - 1

  return (
    <div className="lesson-example">
      <h3>Recipe Gallery</h3>
      <p>{recipes[currentIndex]}</p>
      <div className="button-row">
        <button onClick={() => setCurrentIndex((index) => index - 1)} disabled={isFirst}>
          Previous
        </button>
        <button onClick={() => setCurrentIndex((index) => index + 1)} disabled={isLast}>
          Next
        </button>
      </div>
    </div>
  )
}
