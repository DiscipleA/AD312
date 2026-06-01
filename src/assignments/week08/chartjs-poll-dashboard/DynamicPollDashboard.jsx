import { useEffect, useMemo, useRef, useState } from 'react'
import Chart from 'chart.js/auto'

export const POLL_OPTIONS = [
  { id: 'react', label: 'React', color: '#61dafb' },
  { id: 'vue', label: 'Vue', color: '#42b883' },
  { id: 'svelte', label: 'Svelte', color: '#ff3e00' },
  { id: 'angular', label: 'Angular', color: '#dd0031' },
]

export function createInitialVotes(options = POLL_OPTIONS) {
  /*
    The poll stores votes in an object instead of an array because object keys give us a stable,
    descriptive lookup table: votes.react, votes.vue, votes.svelte, and votes.angular. That makes
    the React state easier to read than remembering that index 0 means React or index 2 means Svelte.

    The helper receives the options array so the component, the Live Test Results panel, and the Vitest
    file all build their initial state from the same source of truth. If the poll choices change later,
    this helper automatically creates matching zero counts for the new choices.
  */
  return options.reduce((voteMap, option) => {
    voteMap[option.id] = 0
    return voteMap
  }, {})
}

export function getVoteValues(votes, options = POLL_OPTIONS) {
  /*
    Chart.js expects the bar heights as an ordered array. React state is stored as an object for clear
    updates, so this helper bridges the two shapes. The labels and values must be produced in the same
    option order; otherwise, the React label could say "Vue" while Chart.js draws React's vote count.
  */
  return options.map((option) => Number(votes[option.id] ?? 0))
}

export function getTotalVotes(votes) {
  return Object.values(votes).reduce((total, count) => total + Number(count || 0), 0)
}

export function getLeadingOption(votes, options = POLL_OPTIONS) {
  /*
    This helper supports the text summary shown next to the chart. It intentionally handles ties by
    keeping the first option that reached the high score. That keeps the UI deterministic instead of
    changing randomly when two frameworks have the same number of votes.
  */
  return options.reduce(
    (leader, option) => {
      const count = Number(votes[option.id] ?? 0)
      if (count > leader.count) {
        return { id: option.id, label: option.label, count }
      }
      return leader
    },
    { id: '', label: 'No votes yet', count: -1 },
  )
}

export function castVote(votes, optionId, options = POLL_OPTIONS) {
  /*
    React state must be treated as immutable. Instead of changing the existing votes object directly,
    this function returns a new object with one updated key. That gives React a new reference, which
    tells React that state changed and the component should re-render.

    Invalid option IDs are ignored and return the original object. This is useful for defensive UI code
    and for edge-case testing because a malformed vote should not create surprise state such as
    votes.undefined or votes.not-real.
  */
  const optionExists = options.some((option) => option.id === optionId)
  if (!optionExists) {
    return votes
  }

  return {
    ...votes,
    [optionId]: Number(votes[optionId] ?? 0) + 1,
  }
}

export function resetVotes(options = POLL_OPTIONS) {
  return createInitialVotes(options)
}

export function buildPollDashboardTestCases() {
  const emptyVotes = createInitialVotes()
  const oneReactVote = castVote(emptyVotes, 'react')
  const threeVoteRace = castVote(castVote(castVote(emptyVotes, 'vue'), 'vue'), 'svelte')
  const invalidVoteAttempt = castVote(emptyVotes, 'not-a-framework')
  const resetAfterVotes = resetVotes()

  return [
    {
      id: 'initial-state',
      kind: 'normal',
      label: 'Initial chart state',
      expected: [0, 0, 0, 0],
      actual: getVoteValues(emptyVotes),
      reason: 'The dashboard should start with every framework at zero votes.',
    },
    {
      id: 'single-vote-sync',
      kind: 'normal',
      label: 'Single vote synchronizes data',
      expected: [1, 0, 0, 0],
      actual: getVoteValues(oneReactVote),
      reason: 'A React vote should update React state and become the first Chart.js bar value.',
    },
    {
      id: 'multiple-vote-leader',
      kind: 'normal',
      label: 'Multiple votes identify leader',
      expected: 'Vue',
      actual: getLeadingOption(threeVoteRace).label,
      reason: 'Repeated Vue votes should make Vue the dashboard leader.',
    },
    {
      id: 'invalid-vote-ignored',
      kind: 'edge',
      label: 'Invalid vote ignored',
      expected: [0, 0, 0, 0],
      actual: getVoteValues(invalidVoteAttempt),
      reason: 'A malformed vote ID must not create a new data key or mutate valid poll totals.',
    },
    {
      id: 'reset-edge',
      kind: 'edge',
      label: 'Reset restores zero state',
      expected: [0, 0, 0, 0],
      actual: getVoteValues(resetAfterVotes),
      reason: 'Reset must clear every chart bar without changing the poll labels.',
    },
    {
      id: 'total-votes-edge',
      kind: 'edge',
      label: 'Total votes remain numeric',
      expected: 3,
      actual: getTotalVotes(threeVoteRace),
      reason: 'The summary must add numeric vote counts without string concatenation or NaN output.',
    },
  ]
}

export function runPollDashboardCase(testCase) {
  const passed = Array.isArray(testCase.expected)
    ? JSON.stringify(testCase.expected) === JSON.stringify(testCase.actual)
    : testCase.expected === testCase.actual

  return {
    ...testCase,
    passed,
  }
}

export default function DynamicPollDashboard() {
  const canvasRef = useRef(null)
  const chartInstanceRef = useRef(null)
  const [votes, setVotes] = useState(() => createInitialVotes())

  const voteValues = useMemo(() => getVoteValues(votes), [votes])
  const totalVotes = useMemo(() => getTotalVotes(votes), [votes])
  const leader = useMemo(() => getLeadingOption(votes), [votes])

  function handleVote(optionId) {
    setVotes((currentVotes) => castVote(currentVotes, optionId))
  }

  function handleReset() {
    setVotes(resetVotes())
  }

  useEffect(() => {
    /*
      This effect is responsible for connecting React to the non-React Chart.js library. Chart.js does
      not render through React's virtual DOM. It expects a real <canvas> DOM node and then manages the
      canvas drawing itself. The ref gives React a safe way to hand that real DOM node to Chart.js after
      the component has mounted.

      The chartInstanceRef is also important. A normal local variable would be recreated on every render,
      but a ref persists between renders without causing re-renders. That is exactly what we need for an
      imperative library instance: React state drives the data, while the ref remembers the outside object.
    */
    if (!canvasRef.current || chartInstanceRef.current) {
      return undefined
    }

    chartInstanceRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: POLL_OPTIONS.map((option) => option.label),
        datasets: [
          {
            label: 'Votes',
            data: voteValues,
            backgroundColor: POLL_OPTIONS.map((option) => option.color),
            borderRadius: 10,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 250,
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label(context) {
                return `${context.parsed.y} vote${context.parsed.y === 1 ? '' : 's'}`
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0,
            },
          },
        },
      },
    })

    // Creating a brand-new Chart() on every React render without destroying the old instance can make
    // Chart.js believe the same canvas is already owned by another chart, causing canvas reuse errors,
    // duplicate event listeners, stale drawing contexts, and memory leaks. The cleanup below destroys
    // the imperative chart object when React removes this component from the page.
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
        chartInstanceRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    /*
      This second effect performs the synchronization work. React owns the votes state, but Chart.js owns
      the already-created canvas drawing. When votes change, we do not create another Chart instance.
      Instead, we mutate the existing Chart.js data array, then call .update(), which is the imperative
      command Chart.js provides for redrawing the chart with fresh data.
    */
    if (!chartInstanceRef.current) {
      return
    }

    chartInstanceRef.current.data.datasets[0].data = voteValues
    chartInstanceRef.current.update()
  }, [voteValues])

  return (
    <section className="poll-dashboard-shell" aria-label="Dynamic poll dashboard with Chart.js">
      <div className="poll-dashboard-copy">
        <p className="chart-assignment-kicker">Chart.js Integration Lab</p>
        <h3>Favorite JavaScript Framework Poll</h3>
        <p>
          Vote for a framework and watch React state synchronize with a raw Chart.js bar chart.
          React controls the buttons and vote totals; Chart.js imperatively controls the canvas.
        </p>
      </div>

      <div className="poll-dashboard-layout">
        <div className="poll-vote-panel">
          <div className="poll-summary-card">
            <span>Total Votes</span>
            <strong>{totalVotes}</strong>
            <small>{leader.count > 0 ? `${leader.label} is leading` : 'Waiting for first vote'}</small>
          </div>

          <div className="poll-button-stack" aria-label="Poll voting buttons">
            {POLL_OPTIONS.map((option) => (
              <button key={option.id} type="button" onClick={() => handleVote(option.id)}>
                Vote {option.label}
                <span>{votes[option.id]}</span>
              </button>
            ))}
          </div>

          <button className="poll-reset-button" type="button" onClick={handleReset}>
            Reset Poll
          </button>
        </div>

        <div className="poll-chart-card">
          <canvas ref={canvasRef} role="img" aria-label="Bar chart showing poll vote totals" />
        </div>
      </div>
    </section>
  )
}
