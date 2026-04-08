import React from "react";
import useFetch from "./hooks/useFetch"; // Import custom hook

function App() {
  // Using custom hook with API URL
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      {/* Heading */}
      <h1>Custom Hook - useFetch</h1>

      {/* Show loading message */}
      {loading && <p>Loading users...</p>}

      {/* Show error message */}
      {error && <p>{error}</p>}

      {/* Show fetched data only when loading is complete */}
      {!loading &&
        !error &&
        data.map((user) => (
          <div
            key={user.id} // Unique key for each item
            style={{
              border: "1px solid gray",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "8px"
            }}
          >
            {/* Display user details */}
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>City: {user.address.city}</p>
          </div>
        ))}
    </div>
  );
}

export default App;
