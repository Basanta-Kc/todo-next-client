import { httpClient } from "@/utils/httpClient";
import axios from "axios";
import { useState, useEffect } from "react";

export function useQuery(url) {
  const [data, setData] = useState([]);
  const [refetchData, setRefetchData] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const refetch = () => setRefetchData(!refetchData)

  useEffect(() => {
    setIsLoading(true)
    httpClient
      .get(url)
      .then((res) => {
        setData(res.data.data);
        setError(null);
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        setError(err?.response?.data?.message ?? "Something Went Wrong");
      });
  }, [refetchData,url]);

  return {
    data,
    error,
    isLoading,
    refetch
  };
}