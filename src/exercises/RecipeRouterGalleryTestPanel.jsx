import { useMemo, useState } from 'react'
import '../styles/assignment-test-panel.css'
import '../styles/week05-recipe-router-gallery-assignment.css'
import {
  getRecipeById,
  getRecipeRoute,
  parseRecipeIdFromPath,
  recipes,
  resolveRoute,
} from '../assignments/week05/recipe-router-gallery/RecipeRouterBridge'

const testGroups = {
  normal: [
    {
      label: 'Dynamic route path is created',
      expected: '/recipe/1',
      actual: getRecipeRoute('1'),
    },
    {
      label: 'Recipe id 2 resolves to Week 2 data',
      expected: 'Berry Breakfast Toast',
      actual: getRecipeById('2')?.title,
    },
    {
      label: 'Recipe path exposes the id param',
      expected: '3',
      actual: parseRecipeIdFromPath('/recipe/3'),
    },
  ],
  edge: [
    {
      label: 'Missing recipe id returns null',
      expected: null,
      actual: getRecipeById('missing-recipe'),
    },
    {
      label: 'Malformed recipe path is rejected',
      expected: null,
      actual: parseRecipeIdFromPath('/recipes/3'),
    },
    {
      label: 'Unknown route resolves to not-found',
      expected: 'not-found',
      actual: resolveRoute('/does-not-exist').name,
    },
  ],
}

function formatValue(value) {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  return String(value)
}

export default function RecipeRouterGalleryTestPanel() {
  const [activeGroup, setActiveGroup] = useState('normal')
  const allResults = useMemo(() => [...testGroups.normal, ...testGroups.edge], [])
  const activeResults = testGroups[activeGroup]
  const passCount = allResults.filter((test) => Object.is(test.actual, test.expected)).length

  return (
    <section className="assignment-test-panel recipe-router-live-panel">
      <div className="assignment-test-header">
        <div>
          <p className="assignment-test-kicker">Live Test Results</p>
          <h2>Recipe Router Gallery Test Runner</h2>
          <p className="assignment-test-summary">
            These checks mirror the official Vitest cases for route helpers, dynamic recipe ids,
            malformed paths, and missing recipe records.
          </p>
        </div>

        <div className="assignment-test-score">
          <span>{passCount} / {allResults.length}</span>
          <small>Checks passing</small>
        </div>
      </div>

      <div className="assignment-test-controls">
        <button type="button" onClick={() => setActiveGroup('normal')}>
          Normal Cases
        </button>
        <button type="button" onClick={() => setActiveGroup('edge')}>
          Edge Cases
        </button>
      </div>

      <div className="assignment-test-grid">
        {activeResults.map((test) => {
          const passed = Object.is(test.actual, test.expected)

          return (
            <article
              key={test.label}
              className={passed ? 'assignment-test-card passed' : 'assignment-test-card pending'}
            >
              <div className="assignment-test-badge">{passed ? 'PASS' : 'WAIT'}</div>
              <h3>{test.label}</h3>
              <p>Expected: {formatValue(test.expected)}</p>
              <p>Actual: {formatValue(test.actual)}</p>
            </article>
          )
        })}
      </div>

      <div className="recipe-router-test-note">
        <strong>Recipe source:</strong> The routed app uses the same {recipes.length} images exported by
        <code> src/exercises/RecipeGallery.jsx</code> from Week 2 Assignment 1.
      </div>
    </section>
  )
}
