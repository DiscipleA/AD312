# Dog API Explorer with TanStack Query

Use TanStack Query to retrieve dog breeds, dog facts, dog groups, and one selected breed detail from the Dog API.

The assignment focuses on server-state fundamentals:

- wrapping the app in `QueryClientProvider`
- using `useQuery` with clear query keys
- handling `isPending`, `isError`, and success states
- choosing a breed from a dropdown instead of rendering every breed as a card
- using a dependent detail query for `/breeds/{id}`
- testing normal flows and edge cases with mocked API responses
