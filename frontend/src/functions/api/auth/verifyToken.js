import { BASE_URL } from "../config";

export default async function verifyToken( token ) {
  try {
    const response = await fetch(`${BASE_URL}/api/token/verify/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({token}),
    });

    console.log(response.status, "Verification status");

    return response.status;
  } catch (e) {
    throw new Error("Error verifying token!" + e.message);
  }
}
