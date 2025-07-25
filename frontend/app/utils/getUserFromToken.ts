import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  email: string;
  exp: number;
  iat: number;
};

export function getUserFromToken(): DecodedToken | null {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token) as DecodedToken;
    return decoded;
  } catch (err) {
    console.error("Failed to decode token", err);
    return null;
  }
}
