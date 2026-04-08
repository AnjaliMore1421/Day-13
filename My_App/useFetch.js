import { useState, useEffect } from "react";

// Custom Hook to fetch data from any API URL
function useFetch(url) {
  // State to store fetched data
  const [data, setData] = useState([]);

  // State to handle loading status
  const [loading, setLoading] = useState(true);

  // State to store any error message
  const [error, setError] = useState("");

  // useEffect runs when component mounts
  // and whenever the URL changes
  useEffect(() => {
    fetch(url) // API call
      .then((response) => response.json()) // Convert response to JSON
      .then((result) => {
        setData(result); // Save fetched data
        setLoading(false); // Stop loading
      })
      .catch(() => {
        setError("Failed to fetch data"); // Handle error
        setLoading(false); // Stop loading
      });
  }, [url]); // Dependency array

  // Return states so component can use them
  return { data, loading, error };
}

export default useFetch;
