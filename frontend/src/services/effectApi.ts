import axios, { AxiosRequestConfig } from 'axios'
import * as Effect from '@effect/io/Effect'
import { ApiClient, createDefaultApiClient } from './apiClient.effect'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

export function buildUrl(path: string) {
  return path.startsWith('/') ? `${API_BASE}${path}` : `${API_BASE}/${path}`
}

export function request<T>(path: string, config?: AxiosRequestConfig): Effect.Effect<never, unknown, T> {
  const url = buildUrl(path)
  // use axios directly for unauthenticated requests (suitable for login)
  return Effect.tryPromise(() => axios({ url, ...config }).then((r) => r.data as T))
}

// Authenticated request: this Effect requires the ApiClient service in the environment.
export function requestAuth<T>(path: string, config?: AxiosRequestConfig): Effect.Effect<
  typeof ApiClient,
  unknown,
  T
> {
  // Authenticated request: build a client from current token (fallback to local storage)
  return Effect.tryPromise(() => {
    const token = localStorage.getItem('jpi_token')
    const client = createDefaultApiClient(token)
    return client.request<T>(path, config)
  })
}
