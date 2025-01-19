// Bubble Sort
export const bubbleSort = (arr) => {
  const animations = [];
  const n = arr.length;
  let passes = 0;

  for (let i = 0; i < n - 1; i++) {
    passes++;
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      animations.push({
        array: [...arr],
        comparing: [j, j + 1],
        passes
      });

      if (arr[j] > arr[j + 1]) {
        animations.push({
          array: [...arr],
          swapping: [j, j + 1],
          passes
        });

        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;

        animations.push({
          array: [...arr],
          swapping: [j, j + 1],
          passes
        });
      }
    }

    if (!swapped) break;
  }

  return animations;
};

// Selection Sort
export const selectionSort = (arr) => {
  const animations = [];
  const n = arr.length;
  let passes = 0;

  for (let i = 0; i < n - 1; i++) {
    passes++;
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      animations.push({
        array: [...arr],
        comparing: [minIdx, j],
        passes
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      animations.push({
        array: [...arr],
        swapping: [i, minIdx],
        passes
      });

      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];

      animations.push({
        array: [...arr],
        swapping: [i, minIdx],
        passes
      });
    }
  }

  return animations;
};

// Insertion Sort
export const insertionSort = (arr) => {
  const animations = [];
  const n = arr.length;
  let passes = 0;

  for (let i = 1; i < n; i++) {
    passes++;
    let key = arr[i];
    let j = i - 1;

    animations.push({
      array: [...arr],
      comparing: [i, j],
      passes
    });

    while (j >= 0 && arr[j] > key) {
      animations.push({
        array: [...arr],
        swapping: [j, j + 1],
        passes
      });

      arr[j + 1] = arr[j];
      j--;

      animations.push({
        array: [...arr],
        swapping: [j + 1, j + 2],
        passes
      });
    }

    arr[j + 1] = key;
  }

  return animations;
};

// Quick Sort
export const quickSort = (arr) => {
  const animations = [];
  let passes = 0;

  const partition = (low, high) => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      animations.push({
        array: [...arr],
        comparing: [j, high],
        passes
      });

      if (arr[j] < pivot) {
        i++;
        animations.push({
          array: [...arr],
          swapping: [i, j],
          passes
        });

        [arr[i], arr[j]] = [arr[j], arr[i]];

        animations.push({
          array: [...arr],
          swapping: [i, j],
          passes
        });
      }
    }

    animations.push({
      array: [...arr],
      swapping: [i + 1, high],
      passes
    });

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

    animations.push({
      array: [...arr],
      swapping: [i + 1, high],
      passes
    });

    return i + 1;
  };

  const quickSortHelper = (low, high) => {
    if (low < high) {
      passes++;
      const pi = partition(low, high);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    }
  };

  quickSortHelper(0, arr.length - 1);
  return animations;
};

// Merge Sort
export const mergeSort = (arr) => {
  const animations = [];
  let passes = 0;
  const auxArray = [...arr];
  const mainArray = [...arr];

  function merge(start, middle, end) {
    let i = start;
    let j = middle + 1;
    let k = start;

    while (i <= middle && j <= end) {
      // Compare elements
      animations.push({
        array: [...mainArray],
        comparing: [i, j],
        passes
      });

      if (auxArray[i] <= auxArray[j]) {
        // Mark for swapping/placement
        animations.push({
          array: [...mainArray],
          swapping: [k],
          passes
      });

        mainArray[k] = auxArray[i];
        k++;
        i++;
      } else {
        // Mark for swapping/placement
        animations.push({
          array: [...mainArray],
          swapping: [k],
          passes
        });

        mainArray[k] = auxArray[j];
        k++;
        j++;
      }
    }

    while (i <= middle) {
      animations.push({
        array: [...mainArray],
        swapping: [k],
        passes
      });

      mainArray[k] = auxArray[i];
      k++;
      i++;
    }

    while (j <= end) {
      animations.push({
        array: [...mainArray],
        swapping: [k],
        passes
      });

      mainArray[k] = auxArray[j];
      k++;
      j++;
    }

    // Copy back to auxiliary array
    for (let i = start; i <= end; i++) {
      auxArray[i] = mainArray[i];
    }
  }

  function mergeSortHelper(start, end) {
    if (start < end) {
      passes++;
      const middle = Math.floor((start + end) / 2);
      
      mergeSortHelper(start, middle);
      mergeSortHelper(middle + 1, end);
      
      merge(start, middle, end);
    }
  }

  mergeSortHelper(0, arr.length - 1);
  
  // Add final state
  animations.push({
    array: [...mainArray],
    comparing: [],
    swapping: [],
    passes
  });

  return animations;
};