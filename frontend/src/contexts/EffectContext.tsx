import React, { createContext, useContext, useMemo } from 'react'
import * as Effect from '@effect/io/Effect'
import { runEffect } from '../services/effectRuntime'
import { useAuth } from './AuthContext'
import { AuthService } from '../services/auth.effect'
import { ApiClient, createDefaultApiClient } from '../services/apiClient.effect'

type RunFn = <A>(eff: Effect.Effect<never, unknown, A>) => Promise<A>

const EffectContext = createContext<{ run: RunFn } | undefined>(undefined)

export const EffectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth()

  const run: RunFn = async (eff) => {
    const authValue = { token }
  // Provide the AuthService into the effect environment using typed helper
  // create a typed ApiClient using current token and provide both services
  const client = createDefaultApiClient(token)
  // provide ApiClient then AuthService so the effect can require either
  const withClient = Effect.provideService(ApiClient, client)(eff)
  const provided = Effect.provideService(AuthService, authValue)(withClient)
  return runEffect(provided)
  }

  const value = useMemo(() => ({ run }), [run])

  return <EffectContext.Provider value={value}>{children}</EffectContext.Provider>
}

export function useEffectContext() {
  const ctx = useContext(EffectContext)
  if (!ctx) throw new Error('useEffectContext must be used within EffectProvider')
  return ctx
}

// Optional accessor: returns the context or undefined when not inside a provider
export function useOptionalEffectContext() {
  return useContext(EffectContext)
}
