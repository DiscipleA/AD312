import { MarketWidgetErrorBoundary, MarketPriceWidget, healthyMarketPayload } from '../../../../../../assignments/week10/error-boundary-safety-net/ErrorBoundarySafetyNet.jsx'

export default function ErrorBoundarySafetyNetExample() {
  return <MarketWidgetErrorBoundary><MarketPriceWidget payload={healthyMarketPayload} /></MarketWidgetErrorBoundary>
}
