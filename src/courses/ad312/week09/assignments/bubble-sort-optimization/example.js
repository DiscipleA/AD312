export function optimizedBubbleSortInPlace(values) {
  for (let pass = 0; pass < values.length - 1; pass += 1) {
    let hasSwapped = false

    for (let index = 0; index < values.length - 1 - pass; index += 1) {
      if (values[index] > values[index + 1]) {
        const temporary = values[index]
        values[index] = values[index + 1]
        values[index + 1] = temporary
        hasSwapped = true
      }
    }

    if (!hasSwapped) {
      break
    }
  }

  return values
}
