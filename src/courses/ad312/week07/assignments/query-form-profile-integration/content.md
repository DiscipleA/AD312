# Week 7 Assignment 3: React Hook Form + TanStack Query Profile Integration

Build a Vite React profile editor that combines React Hook Form with TanStack Query. The form loads a `/profile` record, hydrates fields with `reset()`, saves updates through a mutation, invalidates the `['userProfile']` cache, and maps a simulated server-side email conflict back to the email field with `setError()`.

## Requirements

- Install `@tanstack/react-query`, `react-hook-form`, and `json-server`.
- Fetch `http://localhost:3001/profile` with `useQuery` using the key `['userProfile']`.
- Hydrate the form using React Hook Form's `reset()` API.
- Save updates with a PUT-style `useMutation` adapter.
- Invalidate the profile query after successful mutation.
- Disable Save Profile when the form is not dirty or the mutation is pending.
- Simulate a `409 Conflict` for `conflict@example.com` and map it to `setError('email')`.
- Include at least three normal Vitest cases and three edge Vitest cases.
