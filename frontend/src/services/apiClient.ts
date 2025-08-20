import axios, { AxiosRequestConfig } from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

export function setAuthToken(token?: string | null) {
  if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  else delete axios.defaults.headers.common['Authorization']
}

export async function api<T>(path: string, config?: AxiosRequestConfig) {
  const url = path.startsWith('/') ? `${API_BASE}${path}` : `${API_BASE}/${path}`
  const res = await axios({ url, ...config })
  return res.data as T
}
