import * as Effect from '@effect/io/Effect'
import { request } from './effectApi'
import { Donation } from '../types/donation'

const BASE = '/donations'

export function listDonations(): Effect.Effect<never, unknown, Donation[]> {
  return request<Donation[]>(BASE)
}

export function getDonation(id: string): Effect.Effect<never, unknown, Donation> {
  return request<Donation>(`${BASE}/${id}`)
}

export function createDonation(payload: Donation): Effect.Effect<never, unknown, Donation> {
  return request<Donation>(BASE, { method: 'POST', data: payload })
}

export function updateDonation(id: string, payload: Donation): Effect.Effect<never, unknown, Donation> {
  return request<Donation>(`${BASE}/${id}`, { method: 'PUT', data: payload })
}

export function deleteDonation(id: string): Effect.Effect<never, unknown, void> {
  return request<void>(`${BASE}/${id}`, { method: 'DELETE' })
}
