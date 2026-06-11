export const healthyMarketPayload = {
  symbol: 'ACME',
  companyName: 'Acme Social Trading Index',
  price: 184.62,
  change: 2.18,
  percentChange: 1.2,
  updatedAt: 'Live feed: 10:42 AM',
  history: [172, 174, 173, 176, 181, 179, 183, 184.62],
}

export const volatileMarketPayload = {
  symbol: 'VOLT',
  companyName: 'Volatile Momentum Fund',
  price: 96.45,
  change: -4.12,
  percentChange: -4.09,
  updatedAt: 'Live feed: 10:44 AM',
  history: [112, 109, 115, 103, 99, 105, 94, 96.45],
}

export const corruptedMarketPayload = {
  symbol: 'BAD',
  companyName: 'Corrupted Market Server',
  price: Number.NaN,
  change: 'server-error',
  percentChange: null,
  updatedAt: '',
  history: [188, 'offline', null, undefined, 191],
}

export const marketScenarios = {
  healthy: { id: 'healthy', label: 'Healthy market feed', description: 'Complete numeric data should render the market widget and chart.', payload: healthyMarketPayload },
  volatile: { id: 'volatile', label: 'Volatile valid feed', description: 'Sharp price movement is valid when the payload shape is still correct.', payload: volatileMarketPayload },
  corrupted: { id: 'corrupted', label: 'Corrupted market payload', description: 'Bad server values should crash only the market widget.', payload: corruptedMarketPayload },
  missing: { id: 'missing', label: 'Missing market payload', description: 'Null data should be caught by the boundary fallback.', payload: null },
  thrown: { id: 'thrown', label: 'Render-time exception', description: 'A simulated third-party render crash should be isolated.', payload: healthyMarketPayload, forceWidgetCrash: true },
}

export function isFiniteNumber(value) {
  return typeof value === 'number' && Number.isFinite(value)
}

export function validateMarketPayload(payload) {
  const problems = []

  if (!payload || typeof payload !== 'object') {
    return { ok: false, problems: ['Market payload must be an object.'] }
  }

  if (typeof payload.symbol !== 'string' || payload.symbol.trim() === '') problems.push('symbol must be a non-empty string')
  if (typeof payload.companyName !== 'string' || payload.companyName.trim() === '') problems.push('companyName must be a non-empty string')
  if (!isFiniteNumber(payload.price)) problems.push('price must be a finite number')
  if (!isFiniteNumber(payload.change)) problems.push('change must be a finite number')
  if (!isFiniteNumber(payload.percentChange)) problems.push('percentChange must be a finite number')
  if (!Array.isArray(payload.history) || payload.history.length < 2) problems.push('history must contain at least two numeric prices')
  else if (!payload.history.every(isFiniteNumber)) problems.push('history must contain only finite numbers')

  return { ok: problems.length === 0, problems }
}

export function buildChartPoints(history, width = 320, height = 120, padding = 14) {
  if (!Array.isArray(history) || history.length < 2 || !history.every(isFiniteNumber)) return ''
  const min = Math.min(...history)
  const max = Math.max(...history)
  const spread = max - min || 1
  const usableWidth = width - padding * 2
  const usableHeight = height - padding * 2
  return history.map((value, index) => {
    const x = padding + (index / (history.length - 1)) * usableWidth
    const y = padding + ((max - value) / spread) * usableHeight
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
}

export function summarizeMarketScenario(scenario) {
  const validation = validateMarketPayload(scenario?.payload)
  if (scenario?.forceWidgetCrash) {
    return { id: scenario.id, label: scenario.label, shouldRenderWidget: false, expectedBoundary: true, reason: 'The widget intentionally throws during render.' }
  }
  return {
    id: scenario?.id ?? 'unknown',
    label: scenario?.label ?? 'Unknown scenario',
    shouldRenderWidget: validation.ok,
    expectedBoundary: !validation.ok,
    reason: validation.ok ? 'Valid market data should render the widget.' : validation.problems.join('; '),
  }
}
