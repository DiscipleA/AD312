import {
  basicBubbleSort,
  buildRequiredBubbleSortCases,
  explainBubbleSortComplexity,
  formatArray,
  optimizedBubbleSort,
  runBubbleSortCase,
} from './BubbleSort'

const PAGE_WIDTH = 595.28
const PAGE_HEIGHT = 841.89
const MARGIN = 48
const FOOTER_Y = 30
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2

const COLORS = {
  white: '1 1 1',
  black: '0.05 0.08 0.12',
  slate: '0.29 0.35 0.43',
  blue: '0.73 0.92 1',
  blueDark: '0.08 0.28 0.45',
  border: '0.82 0.87 0.92',
}

function escapePdfText(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
}

function wrapText(value, maxWidth, fontSize = 10) {
  const averageCharacterWidth = fontSize * 0.52
  const maxCharacters = Math.max(18, Math.floor(maxWidth / averageCharacterWidth))
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
    if (y - height < 70) {
      newPage()
    }
  }

  function heading(value, size = 18) {
    ensureSpace(size + 22)
    text(value, MARGIN, y, { size, font: 'F2', color: COLORS.black })
    y -= size + 12
  }

  function paragraph(value, options = {}) {
    const { size = 10, indent = 0, lineHeight = size + 5 } = options
    const lines = wrapText(value, CONTENT_WIDTH - indent, size)
    ensureSpace(lines.length * lineHeight + 10)
    for (const currentLine of lines) {
      text(currentLine, MARGIN + indent, y, { size, color: COLORS.black })
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
    const chunkSize = 34

    for (let index = 0; index < lines.length; index += chunkSize) {
      const chunk = lines.slice(index, index + chunkSize)
      ensureSpace(chunk.length * lineHeight + 28)
      fillColor(COLORS.blue)
      rect(MARGIN, y - chunk.length * lineHeight - 14, CONTENT_WIDTH, chunk.length * lineHeight + 22)
      y -= 18
      for (const sourceLine of chunk) {
        const trimmed = sourceLine.length > 82 ? `${sourceLine.slice(0, 79)}...` : sourceLine
        text(trimmed, MARGIN + 10, y, { size: 8.5, font: 'F3', color: COLORS.black })
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
      text(header, x + 5, y - 8, { size: 8.5, font: 'F2', color: COLORS.black })
      x += widths[index]
    })
    y -= rowHeight

    for (const row of rows) {
      x = MARGIN
      strokeColor(COLORS.border)
      line(MARGIN, y + 4, MARGIN + CONTENT_WIDTH, y + 4)
      row.forEach((cell, index) => {
        text(cell, x + 5, y - 8, { size: 8, color: COLORS.black })
        x += widths[index]
      })
      y -= rowHeight
    }
    y -= 12
  }

  function footer() {
    strokeColor(COLORS.border)
    line(MARGIN, 52, PAGE_WIDTH - MARGIN, 52)
    text('AD312 Week 9 Assignment 1 - Bubble Sort Basic vs Optimized Report', MARGIN, FOOTER_Y, { size: 8, color: COLORS.slate })
    text(`Page ${pageNumber}`, PAGE_WIDTH - MARGIN - 42, FOOTER_Y, { size: 8, color: COLORS.slate })
  }

  function finishPage() {
    if (commands.length) {
      footer()
      pages.push(commands.join('\n'))
    }
  }

  function newPage() {
    if (commands.length) {
      finishPage()
    }
    pageNumber += 1
    commands = []
    y = PAGE_HEIGHT - MARGIN
    fillColor(COLORS.white)
    rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT)
  }

  newPage()

  return {
    heading,
    paragraph,
    bullet,
    codeBlock,
    table,
    finish() {
      finishPage()
      return pages
    },
  }
}

function buildPdfDocument(pageStreams) {
  const objects = []

  function addObject(body) {
    objects.push(body)
    return objects.length
  }

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

  let pdf = '%PDF-1.4\n% Bubble Sort Report\n'
  const offsets = [0]

  objects.forEach((body, index) => {
    offsets.push(pdf.length)
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`
  })

  const xrefOffset = pdf.length
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
  for (let index = 1; index < offsets.length; index += 1) {
    pdf += `${String(offsets[index]).padStart(10, '0')} 00000 n \n`
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`
  return pdf
}

export function basicBubbleSortSourceForReport() {
  return `export function basicBubbleSortInPlace(values) {
  let comparisons = 0;
  let swaps = 0;
  let passes = 0;

  for (let pass = 0; pass < values.length - 1; pass += 1) {
    passes += 1;

    for (let index = 0; index < values.length - 1 - pass; index += 1) {
      comparisons += 1;

      if (values[index] > values[index + 1]) {
        const temporary = values[index];
        values[index] = values[index + 1];
        values[index + 1] = temporary;
        swaps += 1;
      }
    }
  }

  return { sortedArray: values, comparisons, swaps, passes };
}`
}

export function optimizedBubbleSortSourceForReport() {
  return `export function optimizedBubbleSortInPlace(values) {
  let comparisons = 0;
  let swaps = 0;
  let passes = 0;

  for (let pass = 0; pass < values.length - 1; pass += 1) {
    let hasSwapped = false;
    passes += 1;

    for (let index = 0; index < values.length - 1 - pass; index += 1) {
      comparisons += 1;

      if (values[index] > values[index + 1]) {
        const temporary = values[index];
        values[index] = values[index + 1];
        values[index + 1] = temporary;
        swaps += 1;
        hasSwapped = true;
      }
    }

    if (!hasSwapped) break;
  }

  return { sortedArray: values, comparisons, swaps, passes };
}`
}

export function buildBubbleSortPdfReport({ customInput = [42, 7, 19, 3, 25, 11] } = {}) {
  const writer = makePdfWriter()
  const requiredResults = buildRequiredBubbleSortCases(customInput).map((testCase) => runBubbleSortCase(testCase))
  const complexity = explainBubbleSortComplexity()
  const customBasic = basicBubbleSort(customInput)
  const customOptimized = optimizedBubbleSort(customInput)

  writer.heading('Bubble Sort Report (Basic vs Optimized)', 22)
  writer.paragraph(`Generated: ${new Date().toISOString()} Browser: Portfolio GUI`)

  writer.heading('Objective')
  writer.paragraph('Implement Bubble Sort in JavaScript, create an optimized early-exit version, verify correctness with required test cases, compare behavior, and analyze performance, space complexity, and stability.')

  writer.heading('Implementations')
  writer.bullet('Basic Bubble Sort always performs the full pass structure, so already sorted input still receives the normal nested-loop scan.')
  writer.bullet('Optimized Bubble Sort uses a hasSwapped flag to stop early when a complete pass makes no swaps.')
  writer.bullet('Both implementations sort integer arrays in ascending order and expose passes, comparisons, and swaps for analysis.')

  writer.codeBlock('Basic Bubble Sort (source)', basicBubbleSortSourceForReport())
  writer.codeBlock('Optimized Bubble Sort (source)', optimizedBubbleSortSourceForReport())

  writer.heading('Test Cases (Correctness)')
  writer.paragraph('The GUI, console tests, and Vitest file cover random integers, already sorted best-case input, descending worst-case input, uniform values, an empty array, and a single-element array.')
  writer.table(
    ['Case', 'Input', 'Expected', 'Pass'],
    requiredResults.map((result) => [
      result.label,
      formatArray(result.input),
      formatArray(result.expected),
      result.passed ? 'PASS' : 'CHECK',
    ]),
    [150, 130, 130, 70]
  )

  writer.heading('Representative Operation Counts')
  writer.paragraph('These counts explain the optimization. The largest improvement appears on already sorted and all-identical input because the optimized version exits after one pass.')
  writer.table(
    ['Case', 'Basic Passes', 'Opt Passes', 'Basic Comps', 'Opt Comps'],
    requiredResults.map((result) => [
      result.label,
      String(result.basic.passes),
      String(result.optimized.passes),
      String(result.basic.comparisons),
      String(result.optimized.comparisons),
    ]),
    [170, 80, 80, 85, 85]
  )

  writer.heading('Custom GUI Input Result')
  writer.paragraph(`Custom input: ${formatArray(customInput)}`)
  writer.paragraph(`Basic result: ${formatArray(customBasic.sortedArray)} (${customBasic.passes} passes, ${customBasic.comparisons} comparisons, ${customBasic.swaps} swaps).`)
  writer.paragraph(`Optimized result: ${formatArray(customOptimized.sortedArray)} (${customOptimized.passes} passes, ${customOptimized.comparisons} comparisons, ${customOptimized.swaps} swaps).`)

  writer.heading('Analysis')
  writer.paragraph(`Time Complexity: ${complexity.time}`)
  writer.paragraph(`Space Complexity: ${complexity.space}`)
  writer.paragraph(`Stability: ${complexity.stability}`)

  writer.heading('How to Reproduce')
  writer.paragraph('Run the raw JavaScript console checks and official Vitest checks from the project root:')
  writer.codeBlock('Commands', 'node src/assignments/week09/bubble-sort-optimization/BubbleSort.console-tests.js\nnpm test -- src/assignments/week09/bubble-sort-optimization/BubbleSort.test.js')

  return buildPdfDocument(writer.finish())
}

export function downloadPdfFile(filename, pdfSource) {
  const blob = new Blob([pdfSource], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
