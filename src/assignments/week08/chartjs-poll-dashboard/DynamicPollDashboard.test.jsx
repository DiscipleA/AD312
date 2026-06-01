import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import DynamicPollDashboard, {
  buildPollDashboardTestCases,
  castVote,
  createInitialVotes,
  getLeadingOption,
  getTotalVotes,
  getVoteValues,
  runPollDashboardCase,
} from './DynamicPollDashboard'

vi.mock('chart.js/auto', () => {
  /*
    The real Chart.js library talks to the canvas drawing API. jsdom, which powers Vitest browser-like
    tests, does not draw real charts. This mock keeps the test focused on the assignment requirement:
    React must instantiate Chart once, push state changes into the existing chart data, call update(),
    and call destroy() during cleanup.
  */
  const MockChart = vi.fn(function MockChart(canvas, config) {
    this.canvas = canvas
    this.config = config
    this.data = {
      labels: [...config.data.labels],
      datasets: config.data.datasets.map((dataset) => ({ ...dataset, data: [...dataset.data] })),
    }
    this.update = vi.fn()
    this.destroy = vi.fn()
  })

  return {
    default: MockChart,
  }
})

import Chart from 'chart.js/auto'

describe('DynamicPollDashboard helper functions', () => {
  it('normal case: creates one zero vote count for every poll option', () => {
    const votes = createInitialVotes()

    expect(getVoteValues(votes)).toEqual([0, 0, 0, 0])
    expect(getTotalVotes(votes)).toBe(0)
  })

  it('normal case: casts a valid vote immutably', () => {
    const originalVotes = createInitialVotes()
    const nextVotes = castVote(originalVotes, 'react')

    expect(nextVotes).not.toBe(originalVotes)
    expect(getVoteValues(nextVotes)).toEqual([1, 0, 0, 0])
  })

  it('normal case: identifies the leading option after multiple votes', () => {
    const votes = castVote(castVote(castVote(createInitialVotes(), 'vue'), 'vue'), 'svelte')

    expect(getLeadingOption(votes).label).toBe('Vue')
    expect(getTotalVotes(votes)).toBe(3)
  })

  it('edge case: ignores invalid vote IDs without mutating the original object', () => {
    const originalVotes = createInitialVotes()
    const nextVotes = castVote(originalVotes, 'not-real')

    expect(nextVotes).toBe(originalVotes)
    expect(getVoteValues(nextVotes)).toEqual([0, 0, 0, 0])
  })

  it('edge case: treats missing vote keys as zero when building chart values', () => {
    expect(getVoteValues({ react: 2 })).toEqual([2, 0, 0, 0])
  })

  it('edge case: all Live Test Results cases pass with expected values', () => {
    const results = buildPollDashboardTestCases().map(runPollDashboardCase)

    expect(results).toHaveLength(6)
    expect(results.every((result) => result.passed)).toBe(true)
  })
})

describe('DynamicPollDashboard Chart.js integration', () => {
  beforeEach(() => {
    Chart.mockClear()
  })

  it('normal case: instantiates one Chart.js bar chart on mount', () => {
    render(<DynamicPollDashboard />)

    expect(Chart).toHaveBeenCalledTimes(1)
    expect(Chart.mock.calls[0][1].type).toBe('bar')
    expect(Chart.mock.instances[0].data.datasets[0].data).toEqual([0, 0, 0, 0])
  })

  it('normal case: voting updates the existing chart instead of creating a second chart', async () => {
    const user = userEvent.setup()
    render(<DynamicPollDashboard />)
    const chart = Chart.mock.instances[0]

    await user.click(screen.getByRole('button', { name: /vote react/i }))

    expect(Chart).toHaveBeenCalledTimes(1)
    expect(chart.data.datasets[0].data).toEqual([1, 0, 0, 0])
    expect(chart.update).toHaveBeenCalled()
  })

  it('edge case: cleanup destroys the Chart.js instance when the component unmounts', () => {
    const { unmount } = render(<DynamicPollDashboard />)
    const chart = Chart.mock.instances[0]

    act(() => {
      unmount()
    })

    expect(chart.destroy).toHaveBeenCalledTimes(1)
  })
})
