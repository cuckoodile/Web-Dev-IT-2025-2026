import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { BASE_URL } from "../../api/config";

const AuthContext = createContext(undefined);

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verify token on mount
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const apiUrl = BASE_URL;
        const response = await fetch(`${apiUrl}/token/verify/`, {
          method: "POST", // Note: TokenVerifyView expects POST method
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) throw new Error("Invalid token");

        const data = await response.json();
        // The JWT verification just confirms validity
        // We might need separate endpoint to get user details
        // For now, we just need to know that the token is valid
        // So we won't set user data here, but the user will be retrieved when needed
        // Or we could decode the token to get user ID and fetch user details
        // For now, we'll just set the user as authenticated
        setUser({}); // Just mark as authenticated; user details can be fetched later if needed
      } catch (error) {
        console.error("Token verification failed:", error);
        // If access token is invalid, try to refresh it
        await refreshTokenAndVerify();
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, []);

  const refreshTokenAndVerify = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

    if (!refreshToken) {
      // No refresh token, user needs to log in again
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      setUser(null);
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/token/refresh/`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) {
        throw new Error("Could not refresh token");
      }

      const data = await response.json();
      const newAccessToken = data.access;
      localStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken);

      // Now verify the new token
      setUser({}); // Mark as authenticated with the new token
    } catch (error) {
      console.error("Token refresh failed:", error);
      // Refresh failed, remove all tokens
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      setUser(null);
    }
  };

  // Return promises from login/logout so navigation can happen in components
  const login = useCallback((accessToken, userData = null) => {
    console.log("Logging in...");
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    // The refresh token should already be stored in Login component
    if (userData) {
      setUser(userData);
    } else {
      // If no user data provided, just store the token and mark as authenticated
    }
    return Promise.resolve(); // Return promise to allow navigation in calling component
  }, []);

  const logout = useCallback(() => {
    console.log("Logging out...");
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    setUser(null);
    return Promise.resolve(); // Return promise to allow navigation in calling component
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
