import * as Context from '@effect/data/Context'
import axios, { AxiosRequestConfig } from 'axios'

export interface ApiClient {
  request<T>(path: string, config?: AxiosRequestConfig): Promise<T>
}

export const ApiClient = Context.Tag<ApiClient>()

const API_BASE = import.meta.env.VITE_API_URL || '/api'

export function createDefaultApiClient(token?: string | null): ApiClient {
  const instance = axios.create({ baseURL: API_BASE })
  if (token) instance.defaults.headers.common.Authorization = `Bearer ${token}`

  return {
    request: (path: string, config?: AxiosRequestConfig) => {
      const url = path.startsWith('/') ? path : `/${path}`
      return instance({ url, ...config }).then((r) => r.data)
    }
  }
}
