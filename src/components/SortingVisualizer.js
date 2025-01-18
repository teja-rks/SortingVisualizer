// components/SortingVisualizer.js
import React, { useState, useEffect } from 'react';
import ArrayBar from './ArrayBar';
import { bubbleSort, quickSort, mergeSort, insertionSort, selectionSort } from './SortingAlgorithms';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);

  useEffect(() => {
    generateArray();
  }, []);

  const generateArray = () => {
    const arr = Array.from({ length: 30 }, () => Math.floor(Math.random() * 500) + 50);
    setArray(arr);
  };

  return (
    <div className="visualizer">
      <ArrayBar array={array} />
      <button onClick={generateArray}>Generate New Array</button>
      <button onClick={() => setArray([...bubbleSort(array)])}>Bubble Sort</button>
      <button onClick={() => setArray([...selectionSort(array)])}>Selection Sort</button>
      <button onClick={() => setArray([...insertionSort(array)])}>Insertion Sort</button>
      <button onClick={() => setArray([...quickSort(array)])}>Quick Sort</button>
      <button onClick={() => setArray([...mergeSort(array)])}>Merge Sort</button>
    </div>
  );
};

export default SortingVisualizer;
