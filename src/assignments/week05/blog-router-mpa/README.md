---

## 📰 Week 5 Assignment 3: Blog Multi-Page App with React Router

## 🎯 Objective

Convert a static single-view Blog application into a multi-page routing experience.

Students should implement:

* a persistent root layout
* a Home feed route
* an About route
* a dynamic Post route
* programmatic navigation with `useNavigate`
* normal and edge Vitest tests

## 🧭 Framework Context

This assignment is written for React Router v7+ framework mode, which is part of the Remix framework family.

The in-app portfolio preview uses a Vite-safe bridge so students can see the routing behavior without installing a second router runtime inside the AD312 shell.

## 🛠️ Standalone Setup

```bash
npx create-react-router@latest blog-remix-app
cd blog-remix-app
npm install
npm run dev
```

## 📁 Required Route Structure

```txt
app/root.jsx
app/data/posts.js
app/routes/_index.jsx
app/routes/about.jsx
app/routes/post.$postId.jsx
```

## ✅ Requirements

* Use file-based routing.
* Keep navigation visible in `app/root.jsx`.
* Render child route content with `<Outlet />`.
* List all posts on the Home feed.
* Link each post title to `/post/:postId`.
* Use `useParams()` in the dynamic post route.
* Use `.find()` to locate the matching post.
* Use `useNavigate()` for a Return to Feed button.
* Include at least 3 normal tests and 3 edge tests.

## 🧪 Suggested Test Cases

| Type | Case |
| --- | --- |
| Normal | `/post/1` route path is generated |
| Normal | post id `2` finds the correct post |
| Normal | clicking a post title opens a detail page |
| Edge | missing post id returns not found |
| Edge | malformed `/posts/3` path is rejected |
| Edge | unknown route resolves to fallback |

## 🧠 Final Teaching Principle

The route is part of the application state. If a user can share, bookmark, or refresh a page, that state belongs in the URL instead of only inside a component.
