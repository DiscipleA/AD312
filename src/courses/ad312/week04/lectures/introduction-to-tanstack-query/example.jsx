import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

const queryClient = new QueryClient()

async function fetchBooks() {
  const response = await fetch('https://api.library.example/books')

  if (!response.ok) {
    throw new Error('Unable to load the book catalog.')
  }

  return response.json()
}

function BookList() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
  })

  if (isPending) return <p>Fetching catalog...</p>
  if (isError) return <p role="alert">{error.message}</p>

  return (
    <ul>
      {data.map((book) => (
        <li key={book.id}>{book.title}</li>
      ))}
    </ul>
  )
}

export default function TanStackQueryIntroExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <BookList />
    </QueryClientProvider>
  )
}
