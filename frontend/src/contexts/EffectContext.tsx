import React, { createContext, useContext, useMemo } from 'react'
import * as Effect from '@effect/io/Effect'
import { runEffect } from '../services/effectRuntime'
import axios from 'axios'
import { useAuth } from './AuthContext'

type RunFn = <A>(eff: Effect.Effect<never, unknown, A>) => Promise<A>

const EffectContext = createContext<{ run: RunFn } | undefined>(undefined)

export const EffectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth()

  const run: RunFn = async (eff) => {
    // Set axios default Authorization header for the duration of the effect
    const prev = axios.defaults.headers.common.Authorization
    try {
      if (token) axios.defaults.headers.common.Authorization = `Bearer ${token}`
      return await runEffect(eff)
    } finally {
      // restore previous header
      if (prev === undefined) delete axios.defaults.headers.common.Authorization
      else axios.defaults.headers.common.Authorization = prev
    }
  }

  const value = useMemo(() => ({ run }), [run])

  return <EffectContext.Provider value={value}>{children}</EffectContext.Provider>
}

export function useEffectContext() {
  const ctx = useContext(EffectContext)
  if (!ctx) throw new Error('useEffectContext must be used within EffectProvider')
  return ctx
}
