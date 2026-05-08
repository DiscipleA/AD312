import { Link, useParams } from 'react-router'
import { recipes } from '../data/recipes'

export default function RecipeDetail() {
  const { id } = useParams()
  const recipe = recipes.find((item) => String(item.id) === id)

  if (!recipe) {
    return <Link to="/gallery">Back to Gallery</Link>
  }

  return (
    <section>
      <img src={recipe.image} alt={recipe.title} />
      <h1>{recipe.title}</h1>
      <p>Cooking Instructions: Add full instructions here.</p>
      <Link to="/gallery">Back to Gallery</Link>
    </section>
  )
}
