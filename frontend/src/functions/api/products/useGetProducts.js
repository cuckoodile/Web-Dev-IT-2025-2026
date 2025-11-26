import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../config";

export default function useGetProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: GetProductAPI,
    refetchOnWindowFocus: false,
    retry: false,
  });
}

const GetProductAPI = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/products/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const res = await response.json();

    return res
  } catch (e) {
    throw new Error("Error fetching products: " + (e.message || e));
  }
};
