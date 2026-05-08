---

## 🍽️ Week 5 Assignment 2: Recipe Gallery Routing with React Router

## 🎯 Objective

Convert the Week 2 Recipe Gallery from local state navigation into a routed multi-page application.

Students should implement:

* a Home route
* a Gallery route
* a dynamic Recipe Detail route
* a global navigation layout
* tests for normal and edge routing cases

## 🧭 Framework Context

This assignment is written for React Router v7+ framework mode, which uses a file-based routing system in `app/routes`.

The in-app course preview uses a Vite-safe bridge so the portfolio can demonstrate the behavior without installing React Router into the existing shell.

## 🛠️ Standalone Setup

```bash
npx create-react-router@latest recipe-router-app
cd recipe-router-app
npm install
npm run dev
```

## 📁 Required Route Structure

```txt
app/root.jsx
app/routes/_index.jsx
app/routes/gallery.jsx
app/routes/recipe.$id.jsx
```

## ✅ Requirements

* Continue the Week 2 Recipe Gallery.
* Remove the old Previous and Next state-based buttons.
* Render the full recipe list on `/gallery`.
* Wrap each recipe card in a route link to `/recipe/:id`.
* Use `useParams` in the detail route.
* Display image, title, and placeholder cooking instructions.
* Add a Back to Gallery link.
* Add global Home and Gallery navigation.
* Include at least 3 normal tests and 3 edge tests.

## 🧪 Suggested Test Cases

| Type | Case |
| --- | --- |
| Normal | `/recipe/1` resolves to recipe id `1` |
| Normal | recipe id `2` finds the correct recipe |
| Normal | clicking a gallery card opens a detail page |
| Edge | missing recipe id returns not found |
| Edge | malformed `/recipes/3` path is rejected |
| Edge | unknown path resolves to fallback |

## 🧠 Final Teaching Principle

Week 2 used component state to choose which recipe appears. Week 5 uses the URL to represent navigation state so users can bookmark, share, and directly open a specific recipe.
