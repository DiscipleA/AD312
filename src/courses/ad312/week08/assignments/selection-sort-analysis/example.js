function selectionSortInPlace(arr) {
  for (let i = 0; i < arr.length - 1; i += 1) {
    let minIndex = i

    for (let j = i + 1; j < arr.length; j += 1) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }

    if (minIndex !== i) {
      ;[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
  }

  return arr
}
