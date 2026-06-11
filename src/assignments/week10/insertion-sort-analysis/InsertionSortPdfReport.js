import {
  analyzeInsertionSortPerformance,
  buildRequiredInsertionSortCases,
  demonstrateInsertionSortStability,
  explainInsertionSortComplexity,
  formatArray,
  insertionSort,
  runInsertionSortCase,
} from './InsertionSort'

const PAGE_WIDTH = 595.28
const PAGE_HEIGHT = 841.89
const MARGIN = 42
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2

const COLORS = {
  white: '1 1 1',
  black: '0.05 0.08 0.12',
  slate: '0.29 0.35 0.43',
  blue: '0.73 0.92 1',
  green: '0.80 0.95 0.82',
  border: '0.82 0.87 0.92',
}

function escapePdfText(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
}

function wrapText(value, maxWidth, fontSize = 10) {
  const maxCharacters = Math.max(20, Math.floor(maxWidth / (fontSize * 0.52)))
  const words = String(value).split(/\s+/)
  const lines = []
  let current = ''

  for (const word of words) {
    const next = current ? `${current} ${word}` : word
    if (next.length > maxCharacters && current) {
      lines.push(current)
      current = word
    } else {
      current = next
    }
  }

  if (current) lines.push(current)
  return lines
}

function makePdfWriter() {
  const pages = []
  let commands = []
  let pageNumber = 0
  let y = PAGE_HEIGHT - MARGIN

  function command(value) {
    commands.push(value)
  }

  function fillColor(color) {
    command(`${color} rg`)
  }

  function strokeColor(color) {
    command(`${color} RG`)
  }

  function rect(x, yValue, width, height, fill = true) {
    command(`${x.toFixed(2)} ${yValue.toFixed(2)} ${width.toFixed(2)} ${height.toFixed(2)} re ${fill ? 'f' : 'S'}`)
  }

  function line(x1, y1, x2, y2) {
    command(`${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S`)
  }

  function text(value, x, yValue, options = {}) {
    const { size = 10, font = 'F1', color = COLORS.black } = options
    fillColor(color)
    command(`BT /${font} ${size} Tf ${x.toFixed(2)} ${yValue.toFixed(2)} Td (${escapePdfText(value)}) Tj ET`)
  }

  function ensureSpace(height = 80) {
    if (y - height < 72) newPage()
  }

  function heading(value, size = 18) {
    ensureSpace(size + 26)
    text(value, MARGIN, y, { size, font: 'F2' })
    y -= size + 12
  }

  function paragraph(value, options = {}) {
    const { size = 10, indent = 0, lineHeight = size + 5 } = options
    const lines = wrapText(value, CONTENT_WIDTH - indent, size)
    ensureSpace(lines.length * lineHeight + 12)
    for (const currentLine of lines) {
      text(currentLine, MARGIN + indent, y, { size })
      y -= lineHeight
    }
    y -= 4
  }

  function bullet(value) {
    paragraph(`• ${value}`, { indent: 14 })
  }

  function codeBlock(label, source) {
    heading(label, 12)
    const lines = String(source).split('\n')
    const lineHeight = 13
    for (let index = 0; index < lines.length; index += 30) {
      const chunk = lines.slice(index, index + 30)
      ensureSpace(chunk.length * lineHeight + 28)
      fillColor(COLORS.blue)
      rect(MARGIN, y - chunk.length * lineHeight - 14, CONTENT_WIDTH, chunk.length * lineHeight + 22)
      y -= 18
      for (const sourceLine of chunk) {
        const trimmed = sourceLine.length > 86 ? `${sourceLine.slice(0, 83)}...` : sourceLine
        text(trimmed, MARGIN + 10, y, { size: 8.25, font: 'F3' })
        y -= lineHeight
      }
      y -= 16
    }
  }

  function table(headers, rows, widths) {
    const rowHeight = 18
    ensureSpace((rows.length + 1) * rowHeight + 20)
    let x = MARGIN
    fillColor(COLORS.blue)
    rect(MARGIN, y - rowHeight + 5, CONTENT_WIDTH, rowHeight)
    headers.forEach((header, index) => {
      text(header, x + 4, y - 8, { size: 7.5, font: 'F2' })
      x += widths[index]
    })
    y -= rowHeight

    for (const row of rows) {
      x = MARGIN
      strokeColor(COLORS.border)
      line(MARGIN, y + 4, MARGIN + CONTENT_WIDTH, y + 4)
      row.forEach((cell, index) => {
        text(cell, x + 4, y - 8, { size: 7.25 })
        x += widths[index]
      })
      y -= rowHeight
    }
    y -= 12
  }

  function footer() {
    strokeColor(COLORS.border)
    line(MARGIN, 52, PAGE_WIDTH - MARGIN, 52)
    text('AD312 Week 10 Assignment 1 - Insertion Sort Implementation & Analysis Report', MARGIN, 30, { size: 7.5, color: COLORS.slate })
    text(`Page ${pageNumber}`, PAGE_WIDTH - MARGIN - 42, 30, { size: 7.5, color: COLORS.slate })
  }

  function finishPage() {
    if (commands.length) {
      footer()
      pages.push(commands.join('\n'))
    }
  }

  function newPage() {
    if (commands.length) finishPage()
    pageNumber += 1
    commands = []
    y = PAGE_HEIGHT - MARGIN
    fillColor(COLORS.white)
    rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT)
  }

  newPage()

  return { heading, paragraph, bullet, codeBlock, table, finish() { finishPage(); return pages } }
}

function buildPdfDocument(pageStreams) {
  const objects = []
  function addObject(body) { objects.push(body); return objects.length }

  const catalogId = addObject('')
  const pagesId = addObject('')
  const fontRegularId = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>')
  const fontBoldId = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>')
  const fontMonoId = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>')
  const pageIds = []

  for (const stream of pageStreams) {
    const contentId = addObject(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`)
    const pageId = addObject(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R /F3 ${fontMonoId} 0 R >> >> /Contents ${contentId} 0 R >>`)
    pageIds.push(pageId)
  }

  objects[catalogId - 1] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`
  objects[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`

  let pdf = '%PDF-1.4\n% Insertion Sort Report\n'
  const offsets = [0]

  objects.forEach((body, index) => {
    offsets.push(pdf.length)
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`
  })

  const xrefOffset = pdf.length
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`
  })
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`

  return new Blob([pdf], { type: 'application/pdf' })
}

export function buildInsertionSortPdfReport({ customInput = [42, 7, 19, 3, 25, 11] } = {}) {
  const writer = makePdfWriter()
  const generatedAt = new Date().toISOString()
  const requiredResults = buildRequiredInsertionSortCases(customInput).map(runInsertionSortCase)
  const performance = analyzeInsertionSortPerformance()
  const stability = demonstrateInsertionSortStability()
  const complexity = explainInsertionSortComplexity()
  const sample = insertionSort(customInput)

  writer.heading('Insertion Sort — Implementation & Analysis Report', 22)
  writer.paragraph(`Generated: ${generatedAt}`)

  writer.heading('Part 1 — Implementation Summary', 16)
  writer.paragraph('A stable JavaScript Insertion Sort implementation was built. The raw algorithm is framework-free, sorts integer arrays in ascending order, records comparisons/shifts/writes, and supports GUI, console, Vitest, and report verification.')
  writer.bullet('Stable Insertion Sort: shifts only values greater than the current key, so equal values preserve relative order.')
  writer.bullet('In-place variant: mutates the original array and uses O(1) auxiliary space.')
  writer.bullet(`Small array sanity check: input ${formatArray(customInput)}, result ${formatArray(sample.sortedArray)}.`)

  writer.heading('Part 2 — Performance Analysis', 16)
  writer.paragraph('Metrics tracked: elapsed time in milliseconds, comparisons, shifts, writes, and passes.')
  writer.heading('Best-case (Nearly Sorted)', 12)
  writer.paragraph(complexity.bestCase)
  writer.heading('Worst-case (Reversed)', 12)
  writer.paragraph(complexity.worstCase)
  writer.table(
    ['Scenario', 'n', 'ms', 'Comparisons', 'Shifts', 'Writes'],
    [
      ['Best/nearly', String(performance.best.sortedArray.length), String(performance.best.elapsedMs), String(performance.best.comparisons), String(performance.best.shifts), String(performance.best.writes)],
      ['Worst/reversed', String(performance.worst.sortedArray.length), String(performance.worst.elapsedMs), String(performance.worst.comparisons), String(performance.worst.shifts), String(performance.worst.writes)],
    ],
    [95, 45, 60, 95, 75, 75],
  )

  writer.heading('Average-case (Random arrays)', 12)
  writer.paragraph(complexity.averageCase)
  writer.table(
    ['n', 'Trials', 'Avg ms', 'Avg comparisons', 'Avg shifts', 'Avg writes'],
    performance.average.map((row) => [String(row.size), String(row.trials), String(row.averageMs), String(row.averageComparisons), String(row.averageShifts), String(row.averageWrites)]),
    [45, 50, 65, 110, 90, 90],
  )

  writer.heading('Required Test Arrays', 12)
  writer.table(
    ['Case', 'Passed', 'Input', 'Output'],
    requiredResults.map((result) => [result.label, result.passed ? 'true' : 'false', formatArray(result.input).slice(0, 28), formatArray(result.actual).slice(0, 28)]),
    [110, 55, 160, 160],
  )

  writer.heading('Space Complexity Discussion', 12)
  writer.paragraph(complexity.space)

  writer.heading('Stability Analysis', 12)
  writer.paragraph('The stability demo sorts object records by key. Records with key=2 begin in tag order A, B, C. After sorting, the key=2 records remain A, B, C, proving equal keys kept their original relative order.')
  writer.bullet(`Expected order for key=2: ${JSON.stringify(stability.originalOrderForKeyTwo)}`)
  writer.bullet(`Observed order for key=2: ${JSON.stringify(stability.sortedOrderForKeyTwo)}`)

  writer.heading('Part 3 — Reflection', 16)
  writer.heading('Efficiency Discussion', 12)
  writer.bullet(complexity.smallVsLarge)
  writer.bullet('Compared with Bubble Sort, Insertion Sort is often better on nearly sorted data because it stops shifting quickly. Compared with QuickSort, it is simpler and stable, but usually slower for large random arrays.')
  writer.heading('Practical Applications', 12)
  writer.bullet(complexity.applications)
  writer.bullet('Examples include sorting short UI lists, maintaining small ordered buffers, and finishing small sorted runs inside hybrid algorithms.')
  writer.heading('Improvements and Variations', 12)
  writer.bullet(complexity.improvements)
  writer.bullet('Binary insertion sort improves search comparisons but still needs shifts, so total movement can remain O(n²).')

  writer.heading('Code Snippet — Stable Inner Loop', 16)
  writer.codeBlock('JavaScript stable insertion loop', `while (scanIndex >= 0) {\n  comparisons += 1;\n\n  if (values[scanIndex] > key) {\n    values[scanIndex + 1] = values[scanIndex];\n    shifts += 1;\n    writes += 1;\n    scanIndex -= 1;\n  } else {\n    break;\n  }\n}\n\nvalues[scanIndex + 1] = key;`)

  writer.heading('How to Reproduce', 16)
  writer.codeBlock('Run project checks', `npm install\nnpm test -- src/assignments/week10/insertion-sort-analysis/InsertionSort.test.js\nnode src/assignments/week10/insertion-sort-analysis/InsertionSort.console-tests.js\nnpm run build`)

  return buildPdfDocument(writer.finish())
}

export function downloadPdfFile(filename, blob) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
