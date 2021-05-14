import { useState, useCallback } from "react";

const useHTTTP = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // useCallback so as to not make new function on each render
  // useEffect in component in which hook is used requires this (has sendRequest in Dependecny Array)
  const sendRequest = useCallback(async (requestConfig, dataTransformer) => {
    setIsLoading(true);
    setError(null);

    // try sending request
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? requestConfig.body : null,
      });

      // if response is not okay, throw error
      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const responseJSONData = await response.json();

      // transform data to usable form
      dataTransformer(responseJSONData);

      // loading done only if req is successful
      setIsLoading(false);

      // catch any error
    } catch (error) {
      console.log("INSIDE CATCH: ", error.message);
      setError(error.message || "Something went wrong");
      setIsLoading(true);
    }
  }, []);

  return { isLoading, error, sendRequest };
};

export default useHTTTP;
