import { useQuery } from '@tanstack/react-query'

async function fetchProjectTasks(projectId, filter) {
  const params = new URLSearchParams(filter)
  const response = await fetch(`/api/projects/${projectId}/tasks?${params}`)

  if (!response.ok) {
    throw new Error('Unable to load project tasks.')
  }

  return response.json()
}

export default function ProjectTasksQueryKeyExample({ projectId, status }) {
  const tasksQuery = useQuery({
    queryKey: ['project-tasks', projectId, { status }],
    queryFn: () => fetchProjectTasks(projectId, { status }),
  })

  if (tasksQuery.isLoading) return <p>Loading project tasks...</p>
  if (tasksQuery.isError) return <p>{tasksQuery.error.message}</p>

  return <pre>{JSON.stringify(tasksQuery.data, null, 2)}</pre>
}
