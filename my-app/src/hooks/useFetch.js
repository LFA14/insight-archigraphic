import { useState, useEffect } from "react"

// Custom hook to fetch data from a given URL
export function useFetch(url) {
    // State to store fetched data
    const [data, setData] = useState(null);

    // State to indicate loading status
    const [loading, setLoading] = useState(true);

    // State to hold error messages if the fetch fails
    const [error, setError] = useState(null);

    // useEffect to handle the fetch operation when the URL changes
    useEffect(() => {
        // Flag to prevent updating state if the component is unmounted
        let isMounted = true;

        // Start loading before initiating fetch
        setLoading(true);

        // Fetch data from the provided URL
        fetch(url)
            .then((response) => response.json()) // Parse response as JSON
            .then((result) => {
                console.log(result); // Log the result to console for debugging

                // Update state only if the component is still mounted
                if (isMounted) {
                    setData(result);      // Set the fetched data
                    setLoading(false);    // Set loading to false
                }
            })
            .catch((err) => {
                // Update error state if there's a problem and component is mounted
                if (isMounted) {
                    setError(err.message); // Set error message
                    setLoading(false);     // Set loading to false
                }
            });

        // Cleanup function to avoid setting state after unmount
        return () => {
            isMounted = false;
        }

    }, [url]) // Re-run effect when the URL changes

    // Return an object containing data, loading, and error states
    return { data, loading, error }
}
