import * as Effect from '@effect/io/Effect'
import { requestAuth } from './effectApi'
import { Donation } from '../types/donation'

const BASE = '/donations'

export function listDonations(): Effect.Effect<typeof import('./apiClient.effect').ApiClient, unknown, Donation[]> {
  return requestAuth<Donation[]>(BASE)
}

export function getDonation(id: string): Effect.Effect<typeof import('./apiClient.effect').ApiClient, unknown, Donation> {
  return requestAuth<Donation>(`${BASE}/${id}`)
}

export function createDonation(payload: Donation): Effect.Effect<typeof import('./apiClient.effect').ApiClient, unknown, Donation> {
  return requestAuth<Donation>(BASE, { method: 'POST', data: payload })
}

export function updateDonation(id: string, payload: Donation): Effect.Effect<typeof import('./apiClient.effect').ApiClient, unknown, Donation> {
  return requestAuth<Donation>(`${BASE}/${id}`, { method: 'PUT', data: payload })
}

export function deleteDonation(id: string): Effect.Effect<typeof import('./apiClient.effect').ApiClient, unknown, void> {
  return requestAuth<void>(`${BASE}/${id}`, { method: 'DELETE' })
}
