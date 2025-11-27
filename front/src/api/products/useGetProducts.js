import { useQuery } from "@tanstack/react-query";

import { BASE_URL } from "../config";

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    retry: false,
    // refetchInterval: 1000,   <-- Refetch Cooldown on miliseconds
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5,

    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/products/`);
      // http://127.0.0.1:8000/api/products/

      if (!response.ok) {
        throw new Error("Failed to load products");
      }

      const data = await response.json();

      return data;
    },
  });
};