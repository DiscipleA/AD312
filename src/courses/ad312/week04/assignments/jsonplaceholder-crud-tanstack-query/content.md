# JSONPlaceholder CRUD with TanStack Query

Students build a mobile-first CRUD workflow using TanStack Query and JSONPlaceholder.

The target assignment is Expo-based, but the AD312 platform uses the Expo Bridge pattern:

- real Expo setup and reference source are shown in the guide;
- the live preview is implemented safely in Vite React;
- official Vitest tests verify the shared data-fetching and mutation behavior.

Core operations:

- GET `/posts`
- POST `/posts`
- PUT `/posts/{id}`
- PATCH `/posts/{id}`
- DELETE `/posts/{id}`
- filter posts by `userId`
