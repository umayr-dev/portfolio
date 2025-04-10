"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface User {
  username: string
  isAdmin: boolean
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => boolean
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  logout: () => {},
  isAuthenticated: false,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user", error)
        localStorage.removeItem("user")
      }
    }
  }, [])

  const login = (username: string, password: string) => {
    // Check credentials
    if (username === "umarsoftware" && password === "software") {
      const newUser = { username, isAdmin: true }
      setUser(newUser)
      if (mounted) {
        localStorage.setItem("user", JSON.stringify(newUser))
      }
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
