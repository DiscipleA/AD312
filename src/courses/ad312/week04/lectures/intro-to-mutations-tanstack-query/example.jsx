import { useMutation, useQueryClient } from '@tanstack/react-query'

async function updateBoothStatus(boothId) {
  const response = await fetch(`/api/booths/${boothId}/checkin`, {
    method: 'PATCH',
  })

  if (!response.ok) {
    throw new Error('Could not update booth status')
  }

  return response.json()
}

export default function VendorCheckInExample() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: updateBoothStatus,
    onMutate: async (boothId) => {
      await queryClient.cancelQueries({ queryKey: ['booths', boothId] })
      const previousBooth = queryClient.getQueryData(['booths', boothId])
      return { previousBooth }
    },
    onError: (_error, boothId, context) => {
      queryClient.setQueryData(['booths', boothId], context.previousBooth)
    },
    onSettled: (_data, _error, boothId) => {
      queryClient.invalidateQueries({ queryKey: ['booths', boothId] })
    },
  })

  return (
    <button onClick={() => mutation.mutate('BOOTH_42')} disabled={mutation.isPending}>
      {mutation.isPending ? 'Updating...' : 'Check In Vendor'}
    </button>
  )
}
