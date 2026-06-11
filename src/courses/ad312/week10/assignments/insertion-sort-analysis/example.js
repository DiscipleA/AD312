export function insertionSort(arr) {
  for (let i = 1; i < arr.length; i += 1) {
    const key = arr[i]
    let j = i - 1

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j]
      j -= 1
    }

    arr[j + 1] = key
  }

  return arr
}
