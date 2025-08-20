import React, { createContext, useContext, useEffect, useState } from 'react'
import { LoginRequest, LoginResponse, UserInfo } from '../types/auth'
import { setAuthToken } from '../services/apiClient'
import { request as effectRequest, runEffectToPromise } from '../services/effectApi'

interface AuthContextValue {
  token: string | null
  user: UserInfo | null
  login: (creds: LoginRequest) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('jpi_token'))
  const [user, setUser] = useState<UserInfo | null>(null)

  useEffect(() => {
    setAuthToken(token)
    if (!token) {
      setUser(null)
      return
    }
    // Optionally validate token and fetch user info
    // For now, assume token contains everything after login
    const stored = localStorage.getItem('jpi_user')
    if (stored) setUser(JSON.parse(stored))
  }, [token])

  async function login(creds: LoginRequest) {
    // use effect-based request and run at boundary
    const eff = effectRequest<LoginResponse>('/auth/login', { method: 'POST', data: creds })
    const resp = await runEffectToPromise(eff)
    setToken(resp.token)
    setAuthToken(resp.token)
    const info: UserInfo = { id: '', username: resp.username, email: resp.email, role: resp.role }
    setUser(info)
    localStorage.setItem('jpi_token', resp.token)
    localStorage.setItem('jpi_user', JSON.stringify(info))
  }

  function logout() {
    setToken(null)
    setUser(null)
    setAuthToken(undefined)
    localStorage.removeItem('jpi_token')
    localStorage.removeItem('jpi_user')
  }

  return <AuthContext.Provider value={{ token, user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
