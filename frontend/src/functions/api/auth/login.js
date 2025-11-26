import { BASE_URL } from "../config";

export default async function login(data) {
  try {
    const response = await fetch(`${BASE_URL}/api/token/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();

    console.log("Login response: ", res);

    if (res.access) {
      localStorage.setItem("token", res.access);
      return res;
    } else {
      throw new Error("Error logging in!");
    }
  } catch (e) {
    throw new Error("Error logging in!");
  }
}
