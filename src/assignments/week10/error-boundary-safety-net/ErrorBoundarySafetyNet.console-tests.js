import { buildChartPoints, corruptedMarketPayload, healthyMarketPayload, marketScenarios, summarizeMarketScenario, validateMarketPayload, volatileMarketPayload } from './ErrorBoundarySafetyNet.helpers.js'

function assert(condition, message) { if (!condition) throw new Error(message) }
function logResult(label, callback) { try { callback(); console.log(`PASS: ${label}`) } catch (error) { console.error(`FAIL: ${label}`); console.error(error.message); process.exitCode = 1 } }

console.log('Week 10 Assignment 2 — Error Boundary Safety Net console checks')
console.log('These helper tests validate the data conditions that cause the React Error Boundary demo to render normally or fall back safely.\n')

logResult('normal case: healthy market payload validates successfully', () => { const result = validateMarketPayload(healthyMarketPayload); assert(result.ok === true, 'Healthy market data should be valid.'); assert(result.problems.length === 0, 'Healthy market data should not report problems.') })
logResult('normal case: volatile but valid market payload still renders', () => { const result = validateMarketPayload(volatileMarketPayload); assert(result.ok === true, 'Volatile market data can move sharply but must remain numeric.') })
logResult('normal case: SVG chart points are generated from valid history', () => { const points = buildChartPoints(healthyMarketPayload.history); assert(points.split(' ').length === healthyMarketPayload.history.length, 'Every history value should produce one chart point.'); assert(points.includes(','), 'Chart output should be SVG x,y coordinate text.') })
logResult('edge case: corrupted market payload is rejected before rendering', () => { const result = validateMarketPayload(corruptedMarketPayload); assert(result.ok === false, 'Corrupted payload should be marked invalid.'); assert(result.problems.length >= 1, 'Corrupted payload should explain why it is invalid.') })
logResult('edge case: null market payload expects Error Boundary fallback', () => { const summary = summarizeMarketScenario(marketScenarios.missing); assert(summary.expectedBoundary === true, 'Missing data should be handled by the fallback UI.'); assert(summary.shouldRenderWidget === false, 'Missing data should not render the market widget.') })
logResult('edge case: forced render exception expects Error Boundary fallback', () => { const summary = summarizeMarketScenario(marketScenarios.thrown); assert(summary.expectedBoundary === true, 'A thrown render error should activate the boundary.'); assert(summary.reason.includes('throws'), 'The summary should identify the intentional render crash.') })

console.log('\nConsole safety-net checks complete.')
