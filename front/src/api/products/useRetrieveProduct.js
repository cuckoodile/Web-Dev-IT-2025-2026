import { useQuery } from "@tanstack/react-query";

import { BASE_URL } from "../config";

export const useRetrieveProduct = (id) => {
  return useQuery({
    queryKey: [`product${id}`],
    // product1
    // product2
    // product3....
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5,

    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/products/${id}/`);

      if (!response.ok) {
        throw new Error("Failed to load products");
      }

      const data = await response.json();

      return data;
    },
  });
};