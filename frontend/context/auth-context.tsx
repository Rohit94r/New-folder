"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { isAuthenticated, getUser, logout } from "@/lib/auth"

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (userData: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in on initial load
    const checkAuthStatus = () => {
      const authStatus = isAuthenticated()
      setIsLoggedIn(authStatus)
      
      if (authStatus) {
        const userData = getUser()
        setUser(userData)
      }
    }
    
    checkAuthStatus()
  }, [])

  const login = (userData: any) => {
    // Store user data in localStorage (token should be stored by auth.ts login function)
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(userData));
    }
    setUser(userData)
    setIsLoggedIn(true)
  }

  const logoutUser = () => {
    logout()
    setUser(null)
    setIsLoggedIn(false)
  }

  const value = {
    user,
    isLoggedIn,
    login,
    logout: logoutUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}