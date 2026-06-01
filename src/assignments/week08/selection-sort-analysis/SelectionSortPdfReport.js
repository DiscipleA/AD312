import {
  buildRequiredSelectionSortCases,
  explainSelectionSortStability,
  formatArray,
  runSelectionSortCase,
  selectionSort,
  stableSelectionSort,
} from './SelectionSort'

/**
 * Week 8 Assignment 1: Fancy PDF report generator
 * -----------------------------------------------------------------------------
 * This file intentionally uses plain browser JavaScript instead of a third-party
 * PDF package. That keeps the assignment self-contained and avoids adding a new
 * dependency just to download a polished report.
 *
 * The generator below creates a real PDF file by writing standard PDF drawing
 * commands into content streams. It is not meant to replace professional PDF
 * libraries, but it is perfect for this assignment because it demonstrates that
 * the GUI can turn live Selection Sort results into a downloadable report.
 *
 * High-level PDF idea:
 * - A PDF is made of objects: catalog, pages, page objects, font objects, and
 *   content stream objects.
 * - Each page has a content stream. The content stream contains drawing commands
 *   such as "draw a rectangle" or "write this text at x/y".
 * - At the end, an xref table tells the PDF reader where each object starts.
 *
 * The assignment-facing report is intentionally "fancy": it includes a title
 * banner, summary metric cards, color-coded pass/fail rows, section dividers,
 * a readable code panel, and a footer on every page.
 */

const PAGE_WIDTH = 612
const PAGE_HEIGHT = 792
const MARGIN = 54
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2
const FOOTER_Y = 34

const COLORS = {
  navy: [22, 38, 63],
  blue: [37, 99, 235],
  sky: [224, 242, 254],
  mint: [220, 252, 231],
  amber: [254, 243, 199],
  rose: [255, 228, 230],
  slate: [71, 85, 105],
  softSlate: [241, 245, 249],
  border: [203, 213, 225],
  white: [255, 255, 255],
  black: [15, 23, 42],
  green: [22, 163, 74],
  red: [220, 38, 38],
}

function rgb([r, g, b]) {
  return `${(r / 255).toFixed(3)} ${(g / 255).toFixed(3)} ${(b / 255).toFixed(3)}`
}

function escapePdfText(value) {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/•/g, '-')
    .replace(/²/g, '^2')
    .replace(/≤/g, '<=')
    .replace(/≥/g, '>=')
    .replace(/—/g, '-')
    .replace(/–/g, '-')
}

function estimateTextWidth(text, fontSize) {
  return String(text).length * fontSize * 0.52
}

function wrapText(text, maxWidth, fontSize) {
  const words = String(text).split(/\s+/).filter(Boolean)
  const lines = []
  let line = ''

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word

    if (estimateTextWidth(candidate, fontSize) <= maxWidth) {
      line = candidate
    } else {
      if (line) lines.push(line)
      line = word
    }
  }

  if (line) lines.push(line)
  return lines.length ? lines : ['']
}

function createPdfPainter() {
  const pages = []
  let commands = []
  let pageNumber = 0

  function push(command) {
    commands.push(command)
  }

  function fillColor(color) {
    push(`${rgb(color)} rg`)
  }

  function strokeColor(color) {
    push(`${rgb(color)} RG`)
  }

  function rect(x, y, width, height, fill = true) {
    push(`${x.toFixed(2)} ${y.toFixed(2)} ${width.toFixed(2)} ${height.toFixed(2)} ${fill ? 're f' : 're S'}`)
  }

  function line(x1, y1, x2, y2) {
    push(`${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S`)
  }

  function text(value, x, y, options = {}) {
    const {
      size = 10,
      font = 'F1',
      color = COLORS.black,
      align = 'left',
    } = options

    let adjustedX = x
    const textValue = String(value)

    if (align === 'center') {
      adjustedX = x - estimateTextWidth(textValue, size) / 2
    }

    if (align === 'right') {
      adjustedX = x - estimateTextWidth(textValue, size)
    }

    fillColor(color)
    push(`BT /${font} ${size} Tf ${adjustedX.toFixed(2)} ${y.toFixed(2)} Td (${escapePdfText(textValue)}) Tj ET`)
  }

  function wrappedText(value, x, y, maxWidth, options = {}) {
    const { size = 10, lineHeight = size + 4, font = 'F1', color = COLORS.black } = options
    const lines = wrapText(value, maxWidth, size)
    let currentY = y

    for (const currentLine of lines) {
      text(currentLine, x, currentY, { size, font, color })
      currentY -= lineHeight
    }

    return currentY
  }

  function footer() {
    strokeColor(COLORS.border)
    line(MARGIN, 52, PAGE_WIDTH - MARGIN, 52)
    text('AD312 Week 8 Assignment 1 - Selection Sort Implementation & Analysis', MARGIN, FOOTER_Y, {
      size: 8,
      color: COLORS.slate,
    })
    text(`Page ${pageNumber}`, PAGE_WIDTH - MARGIN, FOOTER_Y, {
      size: 8,
      color: COLORS.slate,
      align: 'right',
    })
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
    fillColor(COLORS.white)
    rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT)
  }

  newPage()

  return {
    fillColor,
    strokeColor,
    rect,
    line,
    text,
    wrappedText,
    newPage,
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

  let pdf = '%PDF-1.4\n% Fancy Selection Sort Report\n'
  const offsets = [0]

  objects.forEach((body, index) => {
    offsets.push(pdf.length)
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`
  })

  const xrefOffset = pdf.length
  pdf += `xref\n0 ${objects.length + 1}\n`
  pdf += '0000000000 65535 f \n'

  for (let index = 1; index < offsets.length; index += 1) {
    pdf += `${String(offsets[index]).padStart(10, '0')} 00000 n \n`
  }

  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`
  return pdf
}

function drawSectionHeader(painter, title, y) {
  painter.fillColor(COLORS.navy)
  painter.rect(MARGIN, y - 6, CONTENT_WIDTH, 28)
  painter.text(title, MARGIN + 14, y + 4, { size: 14, font: 'F2', color: COLORS.white })
  return y - 30
}

function drawMetricCard(painter, x, y, width, title, value, note, fill) {
  painter.fillColor(fill)
  painter.rect(x, y - 72, width, 72)
  painter.strokeColor(COLORS.border)
  painter.rect(x, y - 72, width, 72, false)
  painter.text(title, x + 12, y - 18, { size: 9, font: 'F2', color: COLORS.slate })
  painter.text(value, x + 12, y - 40, { size: 16, font: 'F2', color: COLORS.navy })
  painter.wrappedText(note, x + 12, y - 56, width - 24, { size: 7.5, lineHeight: 9, color: COLORS.slate })
}

function drawResultTable(painter, rows, y) {
  const columns = [132, 90, 90, 70, 64, 50]
  const headers = ['Case', 'Input', 'Expected', 'Actual', 'Comparisons', 'Result']
  let x = MARGIN

  painter.fillColor(COLORS.navy)
  painter.rect(MARGIN, y - 24, CONTENT_WIDTH, 24)

  headers.forEach((header, index) => {
    painter.text(header, x + 6, y - 16, { size: 8.5, font: 'F2', color: COLORS.white })
    x += columns[index]
  })

  let currentY = y - 24

  rows.forEach((row, rowIndex) => {
    const rowHeight = 38
    const fill = row.passed ? (rowIndex % 2 === 0 ? COLORS.mint : COLORS.white) : COLORS.rose
    painter.fillColor(fill)
    painter.rect(MARGIN, currentY - rowHeight, CONTENT_WIDTH, rowHeight)
    painter.strokeColor(COLORS.border)
    painter.rect(MARGIN, currentY - rowHeight, CONTENT_WIDTH, rowHeight, false)

    const cells = [
      row.label,
      formatArray(row.input),
      formatArray(row.expected),
      formatArray(row.actual),
      String(row.comparisons),
      row.passed ? 'PASS' : 'FAIL',
    ]

    x = MARGIN
    cells.forEach((cell, index) => {
      const color = index === 5 ? (row.passed ? COLORS.green : COLORS.red) : COLORS.black
      painter.wrappedText(cell, x + 6, currentY - 13, columns[index] - 12, {
        size: index === 5 ? 8.5 : 7.5,
        lineHeight: 8.5,
        font: index === 5 ? 'F2' : 'F1',
        color,
      })
      x += columns[index]
    })

    currentY -= rowHeight
  })

  return currentY - 16
}

function drawCodePanel(painter, y) {
  const codeLines = [
    'for (let i = 0; i < values.length - 1; i += 1) {',
    '  let selectedIndex = i',
    '',
    '  for (let j = i + 1; j < values.length; j += 1) {',
    '    if (values[j] < values[selectedIndex]) {',
    '      selectedIndex = j',
    '    }',
    '  }',
    '',
    '  if (selectedIndex !== i) {',
    '    ;[values[i], values[selectedIndex]] = [values[selectedIndex], values[i]]',
    '  }',
    '}',
  ]

  painter.fillColor(COLORS.softSlate)
  painter.rect(MARGIN, y - 178, CONTENT_WIDTH, 178)
  painter.strokeColor(COLORS.border)
  painter.rect(MARGIN, y - 178, CONTENT_WIDTH, 178, false)
  painter.text('Core ascending Selection Sort loop', MARGIN + 14, y - 20, {
    size: 11,
    font: 'F2',
    color: COLORS.navy,
  })

  let currentY = y - 42
  codeLines.forEach((line) => {
    painter.text(line || ' ', MARGIN + 16, currentY, { size: 8.4, font: 'F3', color: COLORS.black })
    currentY -= 11
  })

  return y - 198
}

export function buildFancySelectionSortPdfReport({ customInput = [42, 7, 19, 3, 25, 11] } = {}) {
  const safeInput = customInput.length ? customInput : [42, 7, 19, 3, 25, 11]
  const rows = buildRequiredSelectionSortCases(safeInput).map((testCase) => runSelectionSortCase(testCase))
  const regular = selectionSort(safeInput)
  const descending = selectionSort(safeInput, 'desc')
  const stable = stableSelectionSort(safeInput)
  const stability = explainSelectionSortStability()
  const passedCount = rows.filter((row) => row.passed).length
  const painter = createPdfPainter()

  painter.fillColor(COLORS.navy)
  painter.rect(0, PAGE_HEIGHT - 168, PAGE_WIDTH, 168)
  painter.fillColor(COLORS.blue)
  painter.rect(0, PAGE_HEIGHT - 188, PAGE_WIDTH, 20)
  painter.text('AD312 COURSE PORTFOLIO', MARGIN, PAGE_HEIGHT - 62, {
    size: 10,
    font: 'F2',
    color: COLORS.sky,
  })
  painter.text('Selection Sort', MARGIN, PAGE_HEIGHT - 96, {
    size: 30,
    font: 'F2',
    color: COLORS.white,
  })
  painter.text('Implementation & Analysis Report', MARGIN, PAGE_HEIGHT - 124, {
    size: 18,
    font: 'F2',
    color: COLORS.white,
  })
  painter.wrappedText(
    'Generated from the Week 8 Assignment 1 GUI. The report summarizes the raw JavaScript implementation, required test cases, complexity analysis, stability discussion, and optional enhancements.',
    MARGIN,
    PAGE_HEIGHT - 148,
    CONTENT_WIDTH - 40,
    { size: 9.5, lineHeight: 12, color: COLORS.sky },
  )

  drawMetricCard(painter, MARGIN, PAGE_HEIGHT - 230, 156, 'Test Summary', `${passedCount}/${rows.length} Passed`, 'Required normal and edge cases generated from the same algorithm helpers used by the GUI.', COLORS.mint)
  drawMetricCard(painter, MARGIN + 176, PAGE_HEIGHT - 230, 156, 'Time Complexity', 'O(n^2)', 'Nested loops scan the shrinking unsorted region, creating about n(n - 1) / 2 comparisons.', COLORS.amber)
  drawMetricCard(painter, MARGIN + 352, PAGE_HEIGHT - 230, 156, 'Space Complexity', 'O(1)', 'The regular in-place version rearranges the original array with a fixed number of variables.', COLORS.sky)

  let y = PAGE_HEIGHT - 332
  y = drawSectionHeader(painter, '1. Implementation Summary', y)
  y = painter.wrappedText(
    `The implementation sorts an array of integers in ascending order by repeatedly selecting the smallest value from the unsorted region and swapping it into the next sorted position. The same loop structure can also sort descending by selecting the largest value instead. Current GUI input: ${formatArray(safeInput)}. Ascending result: ${formatArray(regular.sortedArray)}. Descending result: ${formatArray(descending.sortedArray)}.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    { size: 10.5, lineHeight: 14, color: COLORS.black },
  )
  y -= 12
  y = drawCodePanel(painter, y)

  y = drawSectionHeader(painter, '2. Required Test Cases and Results', y)
  y = drawResultTable(painter, rows, y)

  painter.newPage()
  y = PAGE_HEIGHT - 82
  y = drawSectionHeader(painter, '3. Complexity Analysis', y)
  y = painter.wrappedText(
    'Selection Sort has O(n^2) time complexity because the outer loop chooses each final sorted position, while the inner loop scans the remaining unsorted region to find the next selected value. The total comparison count follows (n - 1) + (n - 2) + ... + 1, which equals n(n - 1) / 2 and simplifies to O(n^2). This pattern still happens when the input is already sorted because Selection Sort must scan to confirm each selected value.',
    MARGIN,
    y,
    CONTENT_WIDTH,
    { size: 10.5, lineHeight: 15, color: COLORS.black },
  )

  y -= 18
  drawMetricCard(painter, MARGIN, y, 156, 'Current Input', `${safeInput.length} Values`, `${regular.comparisons} comparisons and ${regular.swaps} swaps in ascending mode.`, COLORS.softSlate)
  drawMetricCard(painter, MARGIN + 176, y, 156, 'In-place Version', 'O(1) Space', 'Uses loop indexes, selectedIndex, counters, and a temporary swap operation.', COLORS.mint)
  drawMetricCard(painter, MARGIN + 352, y, 156, 'Stable Variant', `${stable.moves} Moves`, 'Uses shifting instead of direct swapping to better preserve equal-key order.', COLORS.amber)

  y -= 104
  y = drawSectionHeader(painter, '4. Stability Analysis', y)
  y = painter.wrappedText(
    `${stability.summary} Example records: ${JSON.stringify(stability.example)}. ${stability.reasoning}`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    { size: 10.5, lineHeight: 15, color: COLORS.black },
  )

  y -= 18
  y = drawSectionHeader(painter, '5. Enhancement Observations', y)
  const enhancements = [
    `Descending result for the current input: ${formatArray(descending.sortedArray)}. The only algorithmic change is the candidate comparison: choose the largest value instead of the smallest value.`,
    `Stable Selection Sort result for the current input: ${formatArray(stable.sortedArray)}. The stable variant avoids direct swapping by shifting values right and inserting the selected value into the sorted position.`,
    'The stable variant still has O(n^2) time complexity because it still performs the nested search. It may also perform more moves than regular Selection Sort.',
  ]

  enhancements.forEach((item, index) => {
    painter.fillColor(index % 2 === 0 ? COLORS.softSlate : COLORS.white)
    painter.rect(MARGIN, y - 54, CONTENT_WIDTH, 48)
    painter.strokeColor(COLORS.border)
    painter.rect(MARGIN, y - 54, CONTENT_WIDTH, 48, false)
    painter.text(`${index + 1}`, MARGIN + 14, y - 26, { size: 14, font: 'F2', color: COLORS.blue })
    painter.wrappedText(item, MARGIN + 40, y - 18, CONTENT_WIDTH - 56, { size: 9.5, lineHeight: 12, color: COLORS.black })
    y -= 58
  })

  y -= 6
  y = drawSectionHeader(painter, '6. Final Finding', y)
  painter.wrappedText(
    'Selection Sort is easy to understand and useful for learning how comparison-based sorting works, but it is inefficient for large inputs because its comparison count grows quadratically. Its main strengths are simplicity and O(1) extra space in the regular in-place version. Its weaknesses are O(n^2) time and lack of guaranteed stability in the swap-based version.',
    MARGIN,
    y,
    CONTENT_WIDTH,
    { size: 10.5, lineHeight: 15, color: COLORS.black },
  )

  return buildPdfDocument(painter.finish())
}

export function downloadPdfFile(filename, pdfContent) {
  const bytes = new Uint8Array(pdfContent.length)

  for (let index = 0; index < pdfContent.length; index += 1) {
    bytes[index] = pdfContent.charCodeAt(index) & 0xff
  }

  const blob = new Blob([bytes], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
