import { useQuery } from '@tanstack/react-query'

async function fetchStudentProjects() {
  const response = await fetch('/api/student-projects')

  if (!response.ok) {
    throw new Error('Unable to load student projects.')
  }

  return response.json()
}

export default function StudentProjectsQueryExample() {
  const projectsQuery = useQuery({
    queryKey: ['student-projects'],
    queryFn: fetchStudentProjects,
  })

  if (projectsQuery.isLoading) return <p>Loading projects...</p>
  if (projectsQuery.isError) return <p>{projectsQuery.error.message}</p>

  return (
    <ul>
      {projectsQuery.data.map((project) => (
        <li key={project.id}>{project.title}</li>
      ))}
    </ul>
  )
}
