"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export interface UserProfile {
  fullName: string
  mobile: string
  state: string
  district: string
  landSize: number
  primaryCrop: string
  irrigationType: string
  annualIncome: number
  casteCategory: string
  isProfileComplete: boolean
}

export interface User {
  id: string
  fullName: string
  mobile: string
  role: "farmer" | "admin"
  profile?: UserProfile
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
  updateProfile: (profile: Partial<UserProfile>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = useCallback((userData: User) => {
    setUser(userData)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const updateProfile = useCallback((profileData: Partial<UserProfile>) => {
    setUser((prev) => {
      if (!prev) return null
      return {
        ...prev,
        profile: {
          ...prev.profile,
          ...profileData,
        } as UserProfile,
      }
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
