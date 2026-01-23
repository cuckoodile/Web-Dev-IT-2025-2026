import { useQuery } from "@tanstack/react-query";

import { BASE_URL } from "../config";

export const useGetProducts = (filters = {}) => {
  const queryParams = new URLSearchParams();
  
  if (filters.search) {
    queryParams.append("search", filters.search);
  }
  if (filters.ordering) {
    queryParams.append("ordering", filters.ordering);
  }
  if (filters.page) {
    queryParams.append("page", filters.page);
  }

  const queryString = queryParams.toString();
  const url = queryString ? `${BASE_URL}/products/?${queryString}` : `${BASE_URL}/products/`;

  return useQuery({
    queryKey: ["products", filters],
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5,

    queryFn: async () => {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to load products");
      }

      const data = await response.json();
      console.log("Fetched products: ", data);

      return data;
    },
  });
};

