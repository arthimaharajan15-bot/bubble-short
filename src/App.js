import React, { useState } from "react";
import "./App.css";

function App() {
  const [array, setArray] = useState([]);
  const [comparing, setComparing] = useState([]);
  const [sortedIndex, setSortedIndex] = useState(-1);
  const [isSorting, setIsSorting] = useState(false);

  const generateArray = () => {
    if (isSorting) return;
    const size = Math.floor(Math.random() * 10) + 10; // 10–20
    const newArray = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 100) + 10
    );
    setArray(newArray);
    setSortedIndex(-1);
  };

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  const bubbleSort = async () => {
    setIsSorting(true);
    let arr = [...array];
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setComparing([j, j + 1]);
        await sleep(500);

        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
          await sleep(500);
        }
      }
      setSortedIndex(n - i - 1);
    }
    setSortedIndex(0);
    setComparing([]);
    setIsSorting(false);
  };

  return (
    <div className="container">
      <h1>Bubble Sort Visualizer</h1>

      <div className="bar-container">
        {array.map((value, index) => {
          let color = "blue";

          if (comparing.includes(index)) color = "red";
          else if (index >= sortedIndex && sortedIndex !== -1)
            color = "green";

          return (
            <div
              key={index}
              className="bar"
              style={{
                height: value * 3 + "px",
                backgroundColor: color,
              }}
            ></div>
          );
        })}
      </div>

      <div className="buttons">
        <button onClick={generateArray} disabled={isSorting}>
          Generate New Array
        </button>
        <button onClick={bubbleSort} disabled={isSorting}>
          Start Sorting
        </button>
      </div>
    </div>
  );
}

export default App;