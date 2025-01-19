import React, { useState, useEffect } from 'react';
import './styles.css';
import { 
  bubbleSort,
  selectionSort,
  insertionSort,
  quickSort,
  mergeSort
} from './SortingAlgorithms.js';

const getUniqueRandomNumber = (existingNumbers, min, max) => {
    let number;
    do {
      number = Math.floor(Math.random() * (max - min + 1) + min);
    } while (existingNumbers.includes(number));
    return number;
  };
  
  // Function to generate array with unique values
  const generateUniqueArray = (size) => {
    const numbers = [];
    const min = 10; // Minimum value
    const max = 99; // Maximum value
  
    // Check if range has enough unique numbers
    if (max - min + 1 < size) {
      throw new Error('Range is too small to generate unique values');
    }
  
    for (let i = 0; i < size; i++) {
      numbers.push(getUniqueRandomNumber(numbers, min, max));
    }
  
    return numbers;
  };
  
  // Updated component code
  const SortingVisualizer = () => {
    const [array, setArray] = useState([]);
    const [colorMap, setColorMap] = useState({});
    const [comparing, setComparing] = useState([]);
    const [swapping, setSwapping] = useState([]);
    const [isSorting, setIsSorting] = useState(false);
    const [passes, setPasses] = useState(0);
    const [currentAlgorithm, setCurrentAlgorithm] = useState('bubble');
  
    const generateArray = () => {
      try {
        const newArray = generateUniqueArray(10);
        const newColorMap = {};
        newArray.forEach(value => {
          newColorMap[value] = `hsl(${Math.random() * 360}, 70%, 50%)`;
        });
        setArray(newArray);
        setColorMap(newColorMap);
        setComparing([]);
        setSwapping([]);
        setPasses(0);
      } catch (error) {
        console.error('Error generating array:', error);
      }
    };
  
    // Rest of the component code remains the same
    // ...


  useEffect(() => {
    generateArray();
  }, []);


  const animate = async (animations) => {
    for (const step of animations) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setArray(step.array);
      setComparing(step.comparing || []);
      setSwapping(step.swapping || []);
      if (step.passes !== undefined) setPasses(step.passes);
    }
    setComparing([]);
    setSwapping([]);
  };

  const handleSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    
    let animations;
    switch (currentAlgorithm) {
      case 'bubble':
        animations = bubbleSort([...array]);
        break;
      case 'selection':
        animations = selectionSort([...array]);
        break;
      case 'insertion':
        animations = insertionSort([...array]);
        break;
      case 'quick':
        animations = quickSort([...array]);
        break;
      case 'merge':
        animations = mergeSort([...array]);
        break;
      default:
        animations = [];
    }

    await animate(animations);
    setIsSorting(false);
  };

  return (
    <div className="container">
      <h1 className="title">Sorting Visualizer</h1>

      <div className="controls">
        <div className="pass-counter">
          Passes: {passes}
        </div>
        <select
          className="algorithm-select"
          value={currentAlgorithm}
          onChange={(e) => setCurrentAlgorithm(e.target.value)}
          disabled={isSorting}
        >
          <option value="bubble">Bubble Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="insertion">Insertion Sort</option>
          <option value="quick">Quick Sort</option>
          <option value="merge">Merge Sort</option>
        </select>
      </div>

      <div className="visualization-container">
        {array.map((value, index) => (
          <div
            key={index}
            className={`array-bar ${comparing.includes(index) ? 'comparing' : ''} 
                       ${swapping.includes(index) ? 'swapping' : ''}`}
            style={{
              height: `${value * 2}px`,
              width: `${90 / array.length}%`,
              left: `${index * (100 / array.length)}%`,
              backgroundColor: colorMap[value]
            }}
          >
            <div className="array-bar-label">{value}</div>
          </div>
        ))}
      </div>

      <div className="button-container">
        <button
          className="button generate"
          onClick={generateArray}
          disabled={isSorting}
        >
          Generate New Array
        </button>
        <button
          className="button sort"
          onClick={handleSort}
          disabled={isSorting}
        >
          Sort
        </button>
      </div>

      <div className="status-message">
        {isSorting 
          ? `${currentAlgorithm.charAt(0).toUpperCase() + currentAlgorithm.slice(1)} Sort in progress...` 
          : "Select an algorithm and click 'Sort' to begin"}
      </div>
    </div>
  );
};

export default SortingVisualizer;