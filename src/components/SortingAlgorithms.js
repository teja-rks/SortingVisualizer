// components/SortingAlgorithms.js

export function bubbleSort(arr) {
    let newArr = [...arr];
    for (let i = 0; i < newArr.length; i++) {
      for (let j = 0; j < newArr.length - i - 1; j++) {
        if (newArr[j] > newArr[j + 1]) {
          [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]];
        }
      }
    }
    return newArr;
  }
  
  export function selectionSort(arr) {
    let newArr = [...arr];
    for (let i = 0; i < newArr.length; i++) {
      let minIndex = i;
      for (let j = i + 1; j < newArr.length; j++) {
        if (newArr[j] < newArr[minIndex]) {
          minIndex = j;
        }
      }
      [newArr[i], newArr[minIndex]] = [newArr[minIndex], newArr[i]];
    }
    return newArr;
  }
  
  export function insertionSort(arr) {
    let newArr = [...arr];
    for (let i = 1; i < newArr.length; i++) {
      let key = newArr[i];
      let j = i - 1;
      while (j >= 0 && newArr[j] > key) {
        newArr[j + 1] = newArr[j];
        j--;
      }
      newArr[j + 1] = key;
    }
    return newArr;
  }
  
  export function quickSort(arr) {
    if (arr.length <= 1) return arr;
    let pivot = arr[arr.length - 1];
    let left = arr.filter(el => el < pivot);
    let right = arr.filter(el => el > pivot);
    return [...quickSort(left), pivot, ...quickSort(right)];
  }
  
  export function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
  
    let result = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) result.push(left[i++]);
      else result.push(right[j++]);
    }
    return [...result, ...left.slice(i), ...right.slice(j)];
  }
  