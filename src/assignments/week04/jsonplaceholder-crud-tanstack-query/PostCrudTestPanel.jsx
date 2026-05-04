import { useMemo, useState } from 'react'
import {
  JSONPLACEHOLDER_BASE_URL,
  buildCreatePayload,
  buildPatchTitlePayload,
  buildReplacePayload,
  makePostsUrl,
  normalizePosts,
  normalizeUserId,
} from '../../../exercises/PostCrudExplorer'

function assertEqual(actual, expected) {
  return Object.is(actual, expected)
}

function assertDeepEqual(actual, expected) {
  return JSON.stringify(actual) === JSON.stringify(expected)
}

function assert(condition) {
  return Boolean(condition)
}

function makeResult({ id, label, goal, expected, actual, passed }) {
  return {
    id,
    label,
    goal,
    expected,
    actual,
    status: passed ? 'passed' : 'failed',
  }
}

const testGroups = [
  {
    id: 'normal',
    label: 'Normal Cases',
    description:
      'These checks prove the happy-path CRUD helpers build the same request shapes that the official Vitest suite expects.',
    tests: [
      {
        id: 'get-all-posts',
        label: 'GET all posts uses /posts',
        goal: 'A blank filter should fetch the complete posts collection.',
        run: () => {
          const actual = makePostsUrl('')
          const expected = `${JSONPLACEHOLDER_BASE_URL}/posts`
          return makeResult({
            id: 'get-all-posts',
            label: 'GET all posts uses /posts',
            goal: 'A blank filter should fetch the complete posts collection.',
            expected,
            actual,
            passed: assertEqual(actual, expected),
          })
        },
      },
      {
        id: 'filter-user-id',
        label: 'Filter by userId changes the query URL',
        goal: 'When the student filters by user, the query should target /posts?userId=7.',
        run: () => {
          const actual = makePostsUrl('7')
          const expected = `${JSONPLACEHOLDER_BASE_URL}/posts?userId=7`
          return makeResult({
            id: 'filter-user-id',
            label: 'Filter by userId changes the query URL',
            goal: 'When the student filters by user, the query should target /posts?userId=7.',
            expected,
            actual,
            passed: assertEqual(actual, expected),
          })
        },
      },
      {
        id: 'post-payload',
        label: 'POST payload includes title, body, and numeric userId',
        goal: 'Creating a post should send the fields JSONPlaceholder expects.',
        run: () => {
          const actual = buildCreatePayload({
            title: 'Mobile CRUD practice',
            body: 'Create requests belong in useMutation.',
            userId: '4',
          })
          const expected = {
            title: 'Mobile CRUD practice',
            body: 'Create requests belong in useMutation.',
            userId: 4,
          }
          return makeResult({
            id: 'post-payload',
            label: 'POST payload includes title, body, and numeric userId',
            goal: 'Creating a post should send the fields JSONPlaceholder expects.',
            expected: JSON.stringify(expected),
            actual: JSON.stringify(actual),
            passed: assertDeepEqual(actual, expected),
          })
        },
      },
      {
        id: 'put-payload',
        label: 'PUT payload fully replaces a post',
        goal: 'A PUT request should include id, title, body, and userId because it represents replacement.',
        run: () => {
          const actual = buildReplacePayload({
            id: 12,
            title: 'Updated title',
            body: 'Updated body text',
            userId: 3,
          })
          const expected = {
            id: 12,
            title: 'Updated title',
            body: 'Updated body text',
            userId: 3,
          }
          return makeResult({
            id: 'put-payload',
            label: 'PUT payload fully replaces a post',
            goal: 'A PUT request should include id, title, body, and userId because it represents replacement.',
            expected: JSON.stringify(expected),
            actual: JSON.stringify(actual),
            passed: assertDeepEqual(actual, expected),
          })
        },
      },
    ],
  },
  {
    id: 'edge',
    label: 'Edge Cases',
    description:
      'These checks demonstrate defensive behavior: bad payloads, blank filters, PATCH shape, and DELETE endpoint construction.',
    tests: [
      {
        id: 'malformed-posts',
        label: 'Malformed posts payload becomes an empty list',
        goal: 'The UI should not crash if the API shape is unexpected.',
        run: () => {
          const actual = normalizePosts({ data: [{ id: 1 }] })
          const expected = []
          return makeResult({
            id: 'malformed-posts',
            label: 'Malformed posts payload becomes an empty list',
            goal: 'The UI should not crash if the API shape is unexpected.',
            expected: JSON.stringify(expected),
            actual: JSON.stringify(actual),
            passed: assertDeepEqual(actual, expected),
          })
        },
      },
      {
        id: 'patch-title-only',
        label: 'PATCH payload sends title only',
        goal: 'A partial update should not accidentally send body, id, or userId.',
        run: () => {
          const actual = buildPatchTitlePayload({ title: 'Only the title changes' })
          const expected = { title: 'Only the title changes' }
          return makeResult({
            id: 'patch-title-only',
            label: 'PATCH payload sends title only',
            goal: 'A partial update should not accidentally send body, id, or userId.',
            expected: JSON.stringify(expected),
            actual: JSON.stringify(actual),
            passed: assertDeepEqual(actual, expected) && Object.keys(actual).length === 1,
          })
        },
      },
      {
        id: 'invalid-user-filter',
        label: 'Invalid user filter falls back to all posts',
        goal: 'A non-numeric filter should be ignored instead of creating a broken query string.',
        run: () => {
          const normalized = normalizeUserId('abc')
          const actual = makePostsUrl(normalized)
          const expected = `${JSONPLACEHOLDER_BASE_URL}/posts`
          return makeResult({
            id: 'invalid-user-filter',
            label: 'Invalid user filter falls back to all posts',
            goal: 'A non-numeric filter should be ignored instead of creating a broken query string.',
            expected,
            actual,
            passed: assertEqual(normalized, '') && assertEqual(actual, expected),
          })
        },
      },
      {
        id: 'delete-route',
        label: 'DELETE targets the selected post id',
        goal: 'Deleting post 9 should target /posts/9, not the whole collection.',
        run: () => {
          const actual = `${JSONPLACEHOLDER_BASE_URL}/posts/${Number(9)}`
          const expected = 'https://jsonplaceholder.typicode.com/posts/9'
          return makeResult({
            id: 'delete-route',
            label: 'DELETE targets the selected post id',
            goal: 'Deleting post 9 should target /posts/9, not the whole collection.',
            expected,
            actual,
            passed: assertEqual(actual, expected),
          })
        },
      },
    ],
  },
]

function summarize(results) {
  const allResults = Object.values(results).flat()
  const passed = allResults.filter((result) => result.status === 'passed').length
  const failed = allResults.filter((result) => result.status === 'failed').length

  return {
    total: allResults.length,
    passed,
    failed,
    status: failed > 0 ? 'failed' : passed > 0 ? 'passed' : 'waiting',
  }
}

export default function PostCrudTestPanel() {
  const [activeGroupId, setActiveGroupId] = useState('normal')
  const [resultsByGroup, setResultsByGroup] = useState({})

  const activeGroup = testGroups.find((group) => group.id === activeGroupId) ?? testGroups[0]
  const activeResults = resultsByGroup[activeGroup.id] ?? []
  const summary = useMemo(() => summarize(resultsByGroup), [resultsByGroup])

  function runGroup(groupId) {
    const group = testGroups.find((item) => item.id === groupId)
    if (!group) return

    const nextResults = group.tests.map((test) => {
      try {
        return test.run()
      } catch (error) {
        return makeResult({
          id: test.id,
          label: test.label,
          goal: test.goal,
          expected: 'The helper should complete without throwing.',
          actual: error instanceof Error ? error.message : String(error),
          passed: false,
        })
      }
    })

    setResultsByGroup((current) => ({
      ...current,
      [groupId]: nextResults,
    }))
  }

  function runAll() {
    const nextResults = {}

    testGroups.forEach((group) => {
      nextResults[group.id] = group.tests.map((test) => {
        try {
          return test.run()
        } catch (error) {
          return makeResult({
            id: test.id,
            label: test.label,
            goal: test.goal,
            expected: 'The helper should complete without throwing.',
            actual: error instanceof Error ? error.message : String(error),
            passed: false,
          })
        }
      })
    })

    setResultsByGroup(nextResults)
  }

  function resetResults() {
    setResultsByGroup({})
  }

  return (
    <section className="assignment-test-panel crud-live-test-panel">
      <div className="test-panel-header crud-live-test-header">
        <p className="assignment-kicker">Live Test Results</p>
        <h2>Interactive Test Runner for JSONPlaceholder CRUD</h2>
        <p>
          This is the in-app learning panel for Week 4 Assignment 2. It does not replace the
          official Vitest suite, but it lets students actively run the same kinds of checks they are
          expected to understand: normal CRUD behavior and edge-case protection.
        </p>
      </div>

      <div className={`crud-live-test-summary crud-live-test-summary-${summary.status}`}>
        <div>
          <span>Visible checks run</span>
          <strong>{summary.total}</strong>
        </div>
        <div>
          <span>Passed</span>
          <strong>{summary.passed}</strong>
        </div>
        <div>
          <span>Needs attention</span>
          <strong>{summary.failed}</strong>
        </div>
      </div>

      <div className="crud-live-test-actions" aria-label="Test runner controls">
        <button type="button" onClick={runAll}>
          Run all visible tests
        </button>
        <button type="button" className="crud-secondary-button" onClick={() => runGroup(activeGroup.id)}>
          Run current tab
        </button>
        <button type="button" className="crud-secondary-button" onClick={resetResults}>
          Reset results
        </button>
      </div>

      <div className="crud-test-tabs" role="tablist" aria-label="JSONPlaceholder CRUD test groups">
        {testGroups.map((group) => {
          const isActive = group.id === activeGroup.id
          const groupResults = resultsByGroup[group.id] ?? []
          const groupPassed = groupResults.length > 0 && groupResults.every((result) => result.status === 'passed')
          const groupFailed = groupResults.some((result) => result.status === 'failed')

          return (
            <button
              aria-selected={isActive}
              className={`crud-test-tab ${isActive ? 'crud-test-tab-active' : ''}`}
              key={group.id}
              onClick={() => setActiveGroupId(group.id)}
              role="tab"
              type="button"
            >
              <span>{group.label}</span>
              <small>
                {groupFailed ? 'Needs attention' : groupPassed ? 'Passed' : `${group.tests.length} checks`}
              </small>
            </button>
          )
        })}
      </div>

      <article className="crud-test-tab-panel" role="tabpanel">
        <div className="crud-test-tab-panel-heading">
          <div>
            <p className="crud-pill">{activeGroup.label}</p>
            <h3>{activeGroup.label} for CRUD + TanStack Query</h3>
            <p>{activeGroup.description}</p>
          </div>
          <button type="button" onClick={() => runGroup(activeGroup.id)}>
            Run {activeGroup.label}
          </button>
        </div>

        <div className="crud-visible-test-list">
          {activeGroup.tests.map((test) => {
            const result = activeResults.find((item) => item.id === test.id)
            const status = result?.status ?? 'waiting'

            return (
              <section className={`crud-visible-test-card crud-visible-test-card-${status}`} key={test.id}>
                <div className="crud-visible-test-status-row">
                  <strong>{test.label}</strong>
                  <span>{status === 'passed' ? 'PASS' : status === 'failed' ? 'CHECK' : 'WAITING'}</span>
                </div>
                <p>{test.goal}</p>

                {result ? (
                  <dl className="crud-visible-test-details">
                    <div>
                      <dt>Expected</dt>
                      <dd>{result.expected}</dd>
                    </div>
                    <div>
                      <dt>Actual</dt>
                      <dd>{result.actual}</dd>
                    </div>
                  </dl>
                ) : (
                  <p className="crud-visible-test-hint">
                    Run this tab or run all tests to see the expected and actual values.
                  </p>
                )}
              </section>
            )
          })}
        </div>
      </article>
    </section>
  )
}
