import React, { useState, useCallback } from "react";

// Child component wrapped with React.memo
// This prevents unnecessary re-renders
// unless props change
const Child = React.memo(({ onClick }) => {
  console.log("Child Component Rendered");

  return (
    <div style={{ marginTop: "20px" }}>
      {/* Button calls function received from parent */}
      <button onClick={onClick}>Click Child Button</button>
    </div>
  );
});

function App() {
  // State to store count value
  const [count, setCount] = useState(0);

  // useCallback keeps the same function reference
  // across re-renders
  const handleClick = useCallback(() => {
    console.log("Child button clicked");
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {/* Heading */}
      <h1>Re-render Optimization</h1>

      {/* Display current count */}
      <p>Count: {count}</p>

      {/* Button to update parent state */}
      <button onClick={() => setCount(count + 1)}>
        Increase Count
      </button>

      {/* Passing memoized callback to child */}
      <Child onClick={handleClick} />
    </div>
  );
}

export default App;
