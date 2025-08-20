import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import { LoginRequest, LoginResponse, UserInfo } from '../types/auth'
import { setAuthToken } from '../services/apiClient'
import { request as effectRequest } from '../services/effectApi'
import { useOptionalEffectContext } from './EffectContext'
import { runEffect } from '../services/effectRuntime'

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

  const maybeCtx = useOptionalEffectContext()

  const login = useCallback(async (creds: LoginRequest) => {
    // use effect-based request and run at boundary
    const eff = effectRequest<LoginResponse>('/auth/login', { method: 'POST', data: creds })
    const resp = maybeCtx ? await maybeCtx.run(eff) : await runEffect(eff)
    setToken(resp.token)
    setAuthToken(resp.token)
    const info: UserInfo = { id: '', username: resp.username, email: resp.email, role: resp.role }
    setUser(info)
    localStorage.setItem('jpi_token', resp.token)
    localStorage.setItem('jpi_user', JSON.stringify(info))
  }, [maybeCtx])

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
    setAuthToken(null)
    localStorage.removeItem('jpi_token')
    localStorage.removeItem('jpi_user')
  }, [])

  const value = useMemo(() => ({ token, user, login, logout }), [token, user, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
