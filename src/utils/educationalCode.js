const reactPatterns = [
  {
    regex: /^import /,
    comment:
      '// Import statements bring Hooks, styles, or helper modules into this file before the component can use them.',
  },
  {
    regex: /const \[.*\] = useState\(/,
    comment:
      '// useState returns two linked values: the current snapshot of state and the setter that schedules the next render.',
  },
  {
    regex: /const \[.*\] = useImmer\(/,
    comment:
      '// useImmer returns the current state plus an updater that exposes a draft, so the code can read like mutation while Immer still creates a safe immutable result.',
  },
  {
    regex: /const .* = useMemo\(/,
    comment:
      '// useMemo caches a derived value so React can avoid recomputing it unless its dependencies actually change.',
  },
  {
    regex: /const .* = useRef\(/,
    comment:
      '// useRef stores a mutable value that survives re-renders without forcing the UI to re-render when that value changes.',
  },
  {
    regex: /(const|function) handle[A-Z]/,
    comment:
      '// This event handler contains the state transition logic that runs in response to a user action.',
  },
  {
    regex: /set[A-Z][A-Za-z0-9_]*\(/,
    comment:
      '// Calling a React state setter does not mutate the old value in place; it schedules a new render with the next state snapshot.',
  },
  {
    regex: /=> \[\.\.\./,
    comment:
      '// This functional updater receives the freshest previous state and returns a brand-new array using spread syntax.',
  },
  {
    regex: /\.map\(/,
    comment:
      '// map() rebuilds an entire array by deciding what each item should become in the next immutable version.',
  },
  {
    regex: /\.filter\(/,
    comment:
      '// filter() keeps only the items that pass the rule, which makes it ideal for immutable removals.',
  },
  {
    regex: /\.slice\(/,
    comment:
      '// slice() copies a selected portion of an array without mutating the original source array.',
  },
  {
    regex: /\.push\(/,
    comment:
      '// In ordinary React state, push() would mutate the original array; when it appears in a draft example, the surrounding tool is handling immutability for you.',
  },
  {
    regex: /draft\.find\(/,
    comment:
      '// draft.find() locates the exact object that should change so the code updates only the matching item instead of rebuilding every nested property by hand.',
  },
  {
    regex: /findIndex\(/,
    comment:
      '// findIndex() is helpful before a removal because it tells the draft exactly which array position should be deleted.',
  },
  {
    regex: /splice\(/,
    comment:
      '// splice() mutates the draft array directly here, but Immer converts that draft mutation into a brand-new immutable array snapshot for React.',
  },
  {
    regex: /\.\.\./,
    comment:
      '// The spread operator copies existing array items or object properties into a new value so unrelated data is preserved.',
  },
  {
    regex: /^\s*return \(/,
    comment:
      '// The JSX below is the visual output for the current state snapshot, so every dynamic expression reads from state or derived values.',
  },
  {
    regex: /^export default function /,
    comment:
      '// This file exports the component as the default export so other parts of the app can import and render it directly.',
  },
]

const testPatterns = [
  {
    regex: /^import /,
    comment:
      '// Test files import the rendering utilities, assertions, and the component under test before the scenarios can run.',
  },
  {
    regex: /^afterEach\(/,
    comment:
      '// afterEach() resets the DOM between tests so one test cannot leak state into another test case.',
  },
  {
    regex: /^describe\(/,
    comment:
      '// describe() groups related tests so the suite reads like a specification for one feature.',
  },
  {
    regex: /^\s*test\(/,
    comment:
      '// Each test() block captures one expected behavior, which keeps both success cases and edge cases explicit.',
  },
  {
    regex: /render\(/,
    comment:
      '// render() mounts the component into a test DOM so the assertions can interact with it the way a user would.',
  },
  {
    regex: /fireEvent\./,
    comment:
      '// fireEvent simulates the user action that should trigger the state change or visual update being tested.',
  },
  {
    regex: /screen\.getBy/,
    comment:
      '// screen queries the rendered DOM and intentionally looks for accessible roles, labels, or test IDs that users can perceive.',
  },
  {
    regex: /expect\(/,
    comment:
      '// expect() states the observable result that must be true after the component renders or the simulated event runs.',
  },
]

function shouldSkipLine(trimmedLine) {
  return (
    trimmedLine.length === 0 ||
    trimmedLine.startsWith('//') ||
    trimmedLine.startsWith('/*') ||
    trimmedLine.startsWith('*') ||
    trimmedLine.startsWith('*/')
  )
}

function addComments(lines, patterns) {
  const output = []
  let lastInsertedComment = ''

  for (const line of lines) {
    const trimmed = line.trim()
    const indent = line.match(/^\s*/)?.[0] || ''

    if (!shouldSkipLine(trimmed)) {
      const matchedComments = patterns
        .filter((pattern) => pattern.regex.test(trimmed))
        .map((pattern) => `${indent}${pattern.comment}`)

      for (const comment of matchedComments) {
        if (comment !== lastInsertedComment) {
          output.push(comment)
          lastInsertedComment = comment
        }
      }
    }

    output.push(line)

    if (trimmed.length > 0 && !trimmed.startsWith('//')) {
      lastInsertedComment = ''
    }
  }

  return output
}

export function annotateDisplayedCode(code, mode = 'react') {
  const normalized = code.replace(/\r\n/g, '\n')
  const lines = normalized.split('\n')
  const patterns = mode === 'test' ? testPatterns : reactPatterns

  const header =
    mode === 'test'
      ? [
          '// EDUCATIONAL VIEW: The original test syntax is preserved below.',
          '// Extra comments are layered in only to explain what each testing step proves.',
          '',
        ]
      : [
          '// EDUCATIONAL VIEW: The original component syntax is preserved below.',
          '// Extra comments are layered in only to explain how the React syntax works line by line.',
          '',
        ]

  return [...header, ...addComments(lines, patterns)].join('\n')
}
