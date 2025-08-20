import axios, { AxiosRequestConfig } from 'axios'
import * as Effect from '@effect/io/Effect'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

export function buildUrl(path: string) {
  return path.startsWith('/') ? `${API_BASE}${path}` : `${API_BASE}/${path}`
}

export function request<T>(path: string, config?: AxiosRequestConfig): Effect.Effect<never, unknown, T> {
  const url = buildUrl(path)
  // tryPromise exists on the Effect namespace entrypoint; use it directly for better typing
  return Effect.tryPromise(() => axios({ url, ...config }).then((r) => r.data as T))
}

// Authenticated request: types show this Effect requires the AuthService in its environment.
export function requestAuth<T>(path: string, config?: AxiosRequestConfig): Effect.Effect<
  typeof import('./auth.effect').AuthService,
  unknown,
  T
> {
  const url = buildUrl(path)
  return Effect.tryPromise(() => axios({ url, ...config }).then((r) => r.data as T))
}

// small helper to run an Effect at React boundary
export async function runEffectToPromise<R>(eff: Effect.Effect<never, unknown, R>): Promise<R> {
  // use runPromise if available on Effect
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const run = (Effect as any).runPromise as ((e: any) => Promise<R>) | undefined
  if (run) return run(eff)
  // fallback: try to execute (shouldn't happen in @effect/io runtime)
  return Promise.reject(new Error('Effect runtime runPromise not available'))
}
