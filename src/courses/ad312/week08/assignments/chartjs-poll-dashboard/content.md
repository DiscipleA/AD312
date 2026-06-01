# Bridging React with Non-React Libraries: Chart.js Integration

Build a Dynamic Poll Dashboard that uses React state for vote buttons while a raw Chart.js bar chart renders the current vote totals on a canvas.

The assignment focuses on useEffect as an escape hatch for libraries that expect direct DOM access. The implementation creates one Chart.js instance, stores it in a ref, synchronizes fresh vote state through `.data` and `.update()`, and destroys the chart during cleanup.
