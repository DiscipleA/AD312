import { useMemo, useState } from 'react'
import '../styles/assignment-test-panel.css'
import '../styles/week05-blog-router-mpa-assignment.css'
import {
  getPostById,
  getPostRoute,
  parsePostIdFromPath,
  posts,
  resolveRoute,
} from '../assignments/week05/blog-router-mpa/BlogRouterBridge'

const testGroups = {
  normal: [
    { label: 'Dynamic post route is created', expected: '/post/1', actual: getPostRoute(1) },
    { label: 'Post id 2 resolves to data', expected: 'State Management', actual: getPostById('2')?.title },
    { label: 'Dynamic path exposes postId', expected: '3', actual: parsePostIdFromPath('/post/3') },
  ],
  edge: [
    { label: 'Missing post id returns null', expected: null, actual: getPostById('999') },
    { label: 'Malformed /posts path is rejected', expected: null, actual: parsePostIdFromPath('/posts/3') },
    { label: 'Unknown route resolves to not-found', expected: 'not-found', actual: resolveRoute('/missing-page').name },
  ],
}

function formatValue(value) {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  return String(value)
}

export default function BlogRouterTestPanel() {
  const [activeGroup, setActiveGroup] = useState('normal')
  const allResults = useMemo(() => [...testGroups.normal, ...testGroups.edge], [])
  const activeResults = testGroups[activeGroup]
  const passCount = allResults.filter((test) => Object.is(test.actual, test.expected)).length

  return (
    <section className="assignment-test-panel blog-router-live-panel">
      <div className="assignment-test-header">
        <div>
          <p className="assignment-test-kicker">Live Test Results</p>
          <h2>Blog Router MPA Test Runner</h2>
          <p className="assignment-test-summary">
            These checks mirror the official Vitest cases for dynamic post routes, route params,
            missing posts, malformed paths, and unknown route fallback behavior.
          </p>
        </div>

        <div className="assignment-test-score">
          <span>{passCount} / {allResults.length}</span>
          <small>Checks passing</small>
        </div>
      </div>

      <div className="assignment-test-controls">
        <button type="button" onClick={() => setActiveGroup('normal')}>Normal Cases</button>
        <button type="button" onClick={() => setActiveGroup('edge')}>Edge Cases</button>
      </div>

      <div className="assignment-test-grid">
        {activeResults.map((test) => {
          const passed = Object.is(test.actual, test.expected)

          return (
            <article key={test.label} className={passed ? 'assignment-test-card passed' : 'assignment-test-card pending'}>
              <div className="assignment-test-badge">{passed ? 'PASS' : 'WAIT'}</div>
              <h3>{test.label}</h3>
              <p>Expected: {formatValue(test.expected)}</p>
              <p>Actual: {formatValue(test.actual)}</p>
            </article>
          )
        })}
      </div>

      <div className="blog-router-test-note">
        <strong>Data source:</strong> The preview uses the same three-post data shape requested for
        <code> app/data/posts.js</code>. Current post count: {posts.length}.
      </div>
    </section>
  )
}
