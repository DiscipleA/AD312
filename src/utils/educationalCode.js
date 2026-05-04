const reactPatterns = [
  {
    regex: /^import /,
    comment:
      '// Imports load the React APIs, helper libraries, components, and styles this file depends on before the component renders.',
    onceKey: 'imports',
  },
  {
    regex: /from 'use-immer'|from "use-immer"/,
    comment:
      '// use-immer gives this assignment the useImmer Hook, which exposes a draft so nested state can be edited with readable intent-first syntax.',
    onceKey: 'use-immer-import',
  },
  {
    regex: /export const initial[A-Za-z0-9_]*\s*=\s*[{[]/,
    comment:
      '// Exporting the initial data lets tests verify the same baseline object that the UI renders for students.',
  },
  {
    regex: /const \[.*\] = useState\(/,
    comment:
      '// useState returns the current state snapshot plus a setter that schedules the next render with a new value.',
  },
  {
    regex: /const \[.*\] = useImmer\(/,
    comment:
      '// useImmer returns the current state plus an updater. Inside the updater callback, draft changes are converted into a safe immutable React state update.',
  },
  {
    regex: /const .* = useMemo\(/,
    comment:
      '// useMemo derives a display value from state and recalculates it only when the listed dependencies change.',
  },
  {
    regex: /const .* = useRef\(/,
    comment:
      '// useRef stores a mutable value that survives re-renders without forcing the component to render again.',
  },
  {
    regex: /(const|function) handle[A-Z]/,
    comment:
      '// This event handler translates a user action into a focused state update.',
  },
  {
    regex: /(const|function) update[A-Z]/,
    comment:
      '// This helper centralizes update logic so related state changes stay easy to reuse and explain.',
  },
  {
    regex: /(const|function) toggle[A-Z]/,
    comment:
      '// This toggle helper flips a boolean value while preserving the rest of the state object.',
  },
  {
    regex: /event\.target\.value/,
    comment:
      '// event.target.value is the latest value from the controlled input, so the UI and state stay synchronized.',
  },
  {
    regex: /update[A-Za-z0-9_]*\(\(draft\) => \{/,
    comment:
      '// The draft object is temporary. You can assign to it directly here, and Immer will produce the next immutable state snapshot for React.',
  },
  {
    regex: /draft\.[A-Za-z0-9_.]+\s*=/,
    comment:
      '// This direct-looking assignment is safe because it happens inside Immer’s draft callback, not against the live React state object.',
  },
  {
    regex: /set[A-Z][A-Za-z0-9_]*\(/,
    comment:
      '// Calling a React state setter schedules a new render; it should not mutate the previous state value directly.',
  },
  {
    regex: /=> \[\.\.\./,
    comment:
      '// This functional updater receives the freshest previous state and returns a brand-new array using spread syntax.',
  },
  {
    regex: /\.map\(/,
    comment:
      '// map() rebuilds an array by deciding what each item should become in the next immutable version.',
  },
  {
    regex: /\.filter\(/,
    comment:
      '// filter() creates a new array containing only the items that pass the rule, which makes it useful for immutable removals.',
  },
  {
    regex: /\.slice\(/,
    comment:
      '// slice() copies part of an array without mutating the original source array.',
  },
  {
    regex: /\.push\(/,
    comment:
      '// push() would be unsafe on normal React state, but it is acceptable here only when the surrounding code is editing an Immer draft.',
  },
  {
    regex: /draft\.find\(/,
    comment:
      '// draft.find() locates the exact object that should change, so the update targets one item instead of rebuilding unrelated data.',
  },
  {
    regex: /findIndex\(/,
    comment:
      '// findIndex() identifies the array position to remove before the draft uses a mutating array method.',
  },
  {
    regex: /splice\(/,
    comment:
      '// splice() mutates the draft array here, and Immer turns that draft mutation into a new immutable array for React.',
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
      '// This file exports the component as the default export so the assignment guide and tests can import it directly.',
  },
]

const testPatterns = [
  {
    regex: /^import /,
    comment:
      '// Test imports bring in the render helpers, assertions, and component under test before any scenario runs.',
    onceKey: 'test-imports',
  },
  {
    regex: /^afterEach\(/,
    comment:
      '// afterEach() resets the test DOM between cases so one scenario cannot leak state into the next one.',
  },
  {
    regex: /^describe\(/,
    comment:
      '// describe() groups these assertions into one readable specification for the standalone exercise.',
  },
  {
    regex: /^\s*test\(/,
    comment:
      '// Each test() block captures one behavior students should be able to explain, not just a hidden grading rule.',
  },
  {
    regex: /render\(/,
    comment:
      '// render() mounts the component in a test DOM so the test can interact with it like a user would.',
  },
  {
    regex: /fireEvent\./,
    comment:
      '// fireEvent simulates the user action that should trigger a visible state change.',
  },
  {
    regex: /screen\.getBy/,
    comment:
      '// screen queries the rendered DOM through visible text, roles, labels, or test IDs that represent observable UI.',
  },
  {
    regex: /expect\(/,
    comment:
      '// expect() states the result that must be true after rendering or after the simulated interaction completes.',
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
  const insertedOnce = new Set()
  let lastInsertedComment = ''

  for (const line of lines) {
    const trimmed = line.trim()
    const indent = line.match(/^\s*/)?.[0] || ''

    if (!shouldSkipLine(trimmed)) {
      const matchedComments = patterns
        .filter((pattern) => {
          if (!pattern.regex.test(trimmed)) return false
          if (pattern.onceKey && insertedOnce.has(pattern.onceKey)) return false
          if (pattern.onceKey) insertedOnce.add(pattern.onceKey)
          return true
        })
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
          '// Extra comments explain what each assertion proves and how each user interaction is simulated.',
          '',
        ]
      : [
          '// EDUCATIONAL VIEW: The original component syntax is preserved below.',
          '// Extra comments explain the React, useImmer, and JSX syntax line by line without changing the real source file.',
          '',
        ]

  return [...header, ...addComments(lines, patterns)].join('\n')
}
