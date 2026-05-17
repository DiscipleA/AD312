# Week 6 Assignment 2 — Refactoring Prop Drilling to Context

Refactor a Vite React component tree from pass-through props to React Context.

The starting problem is:

```txt
App → Dashboard → Sidebar → UserProfile
```

`Dashboard` and `Sidebar` receive a `user` prop only so they can forward it to `UserProfile`. Create a `UserContext`, wrap the app with `UserProvider`, and use `useContext` in `UserProfile` so the deeply nested component can read shared user settings directly.

Include at least three normal Vitest cases and three edge Vitest cases.
