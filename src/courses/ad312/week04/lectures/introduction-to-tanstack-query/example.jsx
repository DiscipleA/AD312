import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

const queryClient = new QueryClient()

async function fetchCourseAnnouncements() {
  const response = await fetch('/api/course-announcements')

  if (!response.ok) {
    throw new Error('Unable to load course announcements.')
  }

  return response.json()
}

function CourseAnnouncements() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['course-announcements'],
    queryFn: fetchCourseAnnouncements,
  })

  if (isLoading) return <p>Loading announcements...</p>
  if (isError) return <p>{error.message}</p>

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

export default function TanStackQueryIntroExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <CourseAnnouncements />
    </QueryClientProvider>
  )
}
