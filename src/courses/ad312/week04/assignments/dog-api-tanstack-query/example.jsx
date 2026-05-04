import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

async function fetchBreeds() {
  const response = await fetch('https://dogapi.dog/api/v2/breeds')

  if (!response.ok) {
    throw new Error('Unable to load dog breeds.')
  }

  const payload = await response.json()
  return payload.data ?? []
}

function DogBreedSelect() {
  const breedsQuery = useQuery({
    queryKey: ['dog-breeds'],
    queryFn: fetchBreeds,
  })

  if (breedsQuery.isPending) return <p>Loading breeds...</p>
  if (breedsQuery.isError) return <p>Unable to load breeds.</p>

  return (
    <select aria-label="Dog breed">
      <option value="">Select a dog breed</option>
      {breedsQuery.data.map((breed) => (
        <option key={breed.id} value={breed.id}>
          {breed.attributes.name}
        </option>
      ))}
    </select>
  )
}

const queryClient = new QueryClient()

export default function Example() {
  return (
    <QueryClientProvider client={queryClient}>
      <DogBreedSelect />
    </QueryClientProvider>
  )
}
