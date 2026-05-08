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
}
