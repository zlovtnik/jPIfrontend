import * as Effect from '@effect/io/Effect'
import { requestAuth } from './effectApi'
import { Member } from '../types/member'

const BASE = '/members'

export function listMembers(): Effect.Effect<typeof import('./auth.effect').AuthService, unknown, Member[]> {
  return requestAuth<Member[]>(BASE)
}

export function getMember(id: string): Effect.Effect<typeof import('./auth.effect').AuthService, unknown, Member> {
  return requestAuth<Member>(`${BASE}/${id}`)
}

export function createMember(payload: Member): Effect.Effect<typeof import('./auth.effect').AuthService, unknown, Member> {
  return requestAuth<Member>(BASE, { method: 'POST', data: payload })
}

export function updateMember(id: string, payload: Member): Effect.Effect<typeof import('./auth.effect').AuthService, unknown, Member> {
  return requestAuth<Member>(`${BASE}/${id}`, { method: 'PUT', data: payload })
}

export function deleteMember(id: string): Effect.Effect<typeof import('./auth.effect').AuthService, unknown, void> {
  return requestAuth<void>(`${BASE}/${id}`, { method: 'DELETE' })
}
