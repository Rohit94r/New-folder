// Authentication utility functions
import { authAPI } from "@/lib/api";

// Login function
export const login = async (email: string, password: string) => {
  try {
    const data = await authAPI.login({ email, password });
    
    // Store token in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data));
    }
    
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message || "Login failed" };
  }
};

// Register function
export const register = async (userData: any) => {
  try {
    const data = await authAPI.register(userData);
    
    // Store token in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data));
    }
    
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message || "Registration failed" };
  }
};

// Logout function
export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  }
};

// Get auth token
export const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};

// Get user data
export const getUser = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = getAuthToken();
  return !!token;
};

// Get auth headers for API requests
export const getAuthHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};