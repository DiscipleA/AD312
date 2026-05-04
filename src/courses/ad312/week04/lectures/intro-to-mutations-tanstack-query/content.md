# Introduction to Mutations in TanStack Query

This Week 04 lecture introduces TanStack Query mutations as the write-side companion to queries. Queries read server state; mutations create, update, delete, submit, upload, register, or otherwise modify server state in response to deliberate user actions.

The lecture follows the same Week 04 masterclass flow: conceptual framing, real-world context, broad architectural usage, narrowed technical implementation, full code examples, interactive demos, and a best-practices recap.

Core topics include:

- using `useMutation` for imperative server write actions
- defining a `mutationFn` that returns a Promise
- calling `mutation.mutate()` from event handlers
- reading mutation states such as `isPending`, `isError`, and `isSuccess`
- using mutation `data` and `error` to render meaningful feedback
- clearing terminal states with `mutation.reset()`
- coordinating side effects with `onMutate`, `onError`, `onSuccess`, and `onSettled`
- using invalidation and rollback patterns to keep the UI aligned with server truth

The runtime lecture component lives in `src/lectures/Week04IntroToMutationsTanStackQueryMasterclass.jsx`.
