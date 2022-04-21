//https://betterprogramming.pub/clean-api-call-with-react-hooks-3bd6438a375a

import { useState } from "react";

export default (apiFunc: (x: any) => any) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const request = async (...args: any) => {
    setLoading(true);
    try {
        //@ts-ignore
      const result = await apiFunc(...args);
      setData(result.data);
    } catch (err: any) {
      setError(err.message || "Unexpected Error!");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    request
  };
};