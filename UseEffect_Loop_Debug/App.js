import React, { useState, useEffect } from "react";

function App() {
  // State to store count
  const [count, setCount] = useState(0);

  // useEffect runs whenever count changes
  useEffect(() => {
    console.log("useEffect running...");
    
    // Update count only till 5 to avoid infinite loop
    if (count < 5) {
      setCount(count + 1);
    }
  }, [count]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Debug useEffect Infinite Loop</h1>
      <p>Count: {count}</p>
    </div>
  );
}

export default App;
