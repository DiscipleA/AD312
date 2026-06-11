import React from 'react'
import { buildChartPoints, marketScenarios, summarizeMarketScenario, validateMarketPayload } from './ErrorBoundarySafetyNet.helpers.js'
export { buildChartPoints, corruptedMarketPayload, healthyMarketPayload, isFiniteNumber, marketScenarios, summarizeMarketScenario, validateMarketPayload, volatileMarketPayload } from './ErrorBoundarySafetyNet.helpers.js'

export class MarketWidgetErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    // Error Boundary state is intentionally small. `hasError` decides whether
    // children render normally or whether the fallback UI replaces the risky widget.
    this.state = { hasError: false, errorMessage: '' }
  }

  static getDerivedStateFromError(error) {
    /*
      React Error Boundaries still use class lifecycle APIs in modern React.
      This static method runs after a descendant throws while rendering.
      It must be pure: no logging, no network calls, and no parent updates.
      Its job is to convert the thrown error into boundary state so React can
      safely re-render this boundary with fallback UI instead of unmounting the
      entire application tree into a blank page.
    */
    return { hasError: true, errorMessage: error?.message || 'The market widget failed while rendering.' }
  }

  componentDidCatch(error, errorInfo) {
    /*
      componentDidCatch is the logging side of the boundary pattern. The lab
      sends the error to an optional callback so the GUI can show that the crash
      was intercepted. A production app would usually send this information to
      monitoring software such as Sentry, Datadog, or a server log endpoint.
    */
    if (typeof this.props.onError === 'function') {
      this.props.onError({ message: error?.message || 'Unknown widget error', componentStack: errorInfo?.componentStack || '' })
    }
  }

  resetBoundary = () => {
    // Reset clears the boundary state. The parent may also swap corrupted data
    // for safe data through onReset; otherwise the same child could crash again.
    this.setState({ hasError: false, errorMessage: '' })
    if (typeof this.props.onReset === 'function') this.props.onReset()
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="error-boundary-fallback" role="alert" aria-live="polite">
          <p className="error-boundary-kicker">Widget Safety Net Activated</p>
          <h3>Market Price Widget Out of Order</h3>
          <p>The live market widget crashed, but the dashboard stayed online because the Error Boundary sealed off only this component instead of letting the whole page go blank.</p>
          <p className="error-boundary-error-text">Caught error: {this.state.errorMessage}</p>
          <button type="button" onClick={this.resetBoundary}>Reset Market Widget</button>
        </section>
      )
    }
    return this.props.children
  }
}

export function MarketLineChart({ history }) {
  // SVG keeps the chart dependency-free while still making the market feed visual.
  const points = buildChartPoints(history)
  return (
    <svg className="market-line-chart" viewBox="0 0 320 120" role="img" aria-label="Market price history line chart">
      <defs><linearGradient id="marketLineGradient" x1="0" x2="1" y1="0" y2="0"><stop offset="0%" stopColor="#67e8f9" /><stop offset="100%" stopColor="#93c5fd" /></linearGradient></defs>
      <line x1="14" y1="106" x2="306" y2="106" /><line x1="14" y1="14" x2="14" y2="106" />
      <polyline points={points} fill="none" stroke="url(#marketLineGradient)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {points.split(' ').filter(Boolean).map((point) => { const [x, y] = point.split(','); return <circle key={point} cx={x} cy={y} r="3.5" /> })}
    </svg>
  )
}

export function MarketPriceWidget({ payload, forceCrash = false }) {
  /*
    This is the intentionally risky room in the house. The widget depends on a
    live external payload. If the payload is missing, corrupted, or if the
    third-party widget throws, this component fails during render. The boundary
    above it is responsible for catching that failure and protecting the rest of
    the dashboard.
  */
  if (forceCrash) throw new Error('Third-party market widget crashed during render.')
  const validation = validateMarketPayload(payload)
  if (!validation.ok) throw new Error(`Corrupted market data: ${validation.problems.join('; ')}`)
  const direction = payload.change >= 0 ? 'up' : 'down'
  return (
    <section className="market-widget-card" aria-label="Live market widget">
      <div className="market-widget-heading"><div><p className="error-boundary-kicker">Live Market Widget</p><h3>{payload.symbol}</h3><p>{payload.companyName}</p></div><div className={`market-price-pill ${direction}`}><strong>${payload.price.toFixed(2)}</strong><span>{payload.change >= 0 ? '+' : ''}{payload.change.toFixed(2)} ({payload.percentChange.toFixed(2)}%)</span></div></div>
      <MarketLineChart history={payload.history} />
      <p className="market-widget-footer">{payload.updatedAt}</p>
    </section>
  )
}

export function SocialFeedPanel() {
  return <section className="dashboard-feed-card" aria-label="Social feed remains available"><p className="error-boundary-kicker">Social Feed</p><h3>Dashboard still works</h3><ul><li>New comment activity is visible.</li><li>Portfolio alerts continue to render.</li><li>The market widget failure does not blank the whole page.</li></ul></section>
}

export function MarketHealthChart({ scenarios = Object.values(marketScenarios) }) {
  const summaries = scenarios.map(summarizeMarketScenario)
  const healthyCount = summaries.filter((item) => item.shouldRenderWidget).length
  const protectedCount = summaries.filter((item) => item.expectedBoundary).length
  const total = summaries.length || 1
  return <section className="market-health-chart" aria-label="Market safety net chart"><p className="error-boundary-kicker">Safety Net Chart</p><h3>Scenario Coverage</h3><div className="health-bars"><div><span>Normal widget renders</span><strong>{healthyCount}</strong><meter min="0" max={total} value={healthyCount}>{healthyCount}</meter></div><div><span>Boundary fallbacks expected</span><strong>{protectedCount}</strong><meter min="0" max={total} value={protectedCount}>{protectedCount}</meter></div></div></section>
}

export function SafetyNetDashboard({ scenario = marketScenarios.healthy, onBoundaryError, boundaryKey = scenario.id }) {
  return <section className="safety-net-dashboard" aria-label="Social trading dashboard"><SocialFeedPanel /><MarketWidgetErrorBoundary key={boundaryKey} onError={onBoundaryError}><MarketPriceWidget payload={scenario.payload} forceCrash={scenario.forceWidgetCrash} /></MarketWidgetErrorBoundary><MarketHealthChart /></section>
}
