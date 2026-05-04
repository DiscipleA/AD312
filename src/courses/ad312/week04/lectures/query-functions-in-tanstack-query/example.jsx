import { useQuery } from '@tanstack/react-query'

async function fetchDroneStatus({ queryKey, signal }) {
  const [_resource, droneId] = queryKey
  const response = await fetch(`/api/drones/${droneId}`, { signal })

  if (!response.ok) {
    throw new Error('Satellite uplink communication error')
  }

  return response.json()
}

export default function DroneStatusExample() {
  const droneQuery = useQuery({
    queryKey: ['drone', 'alpha-niner'],
    queryFn: fetchDroneStatus,
  })

  if (droneQuery.isLoading) return <p>Loading drone status...</p>
  if (droneQuery.isError) return <p role="alert">{droneQuery.error.message}</p>

  return <p>Drone Status: {droneQuery.data.status}</p>
}
