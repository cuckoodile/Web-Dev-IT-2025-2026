import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../config";

export default function useGetUser(token, id) {
  return useQuery({
    queryFn: () => GetUserAPI(token, id),
    queryKey: ["user"],
    retry: false,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  });
}

async function GetUserAPI(token, id) {
  try {
    const response = await fetch(`${BASE_URL}/api/profiles/${id}/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();

    console.log("Fetched user id: " + id + " data ", res);
    return res;
  } catch (e) {
    throw new Error("Error fetching user");
  }
}
