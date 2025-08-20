import * as Effect from '@effect/io/Effect'
import { request } from './effectApi'
import { Member } from '../types/member'

const BASE = '/members'

export function listMembers(): Effect.Effect<never, unknown, Member[]> {
  return request<Member[]>(BASE)
}

export function getMember(id: string): Effect.Effect<never, unknown, Member> {
  return request<Member>(`${BASE}/${id}`)
}

export function createMember(payload: Member): Effect.Effect<never, unknown, Member> {
  return request<Member>(BASE, { method: 'POST', data: payload })
}

export function updateMember(id: string, payload: Member): Effect.Effect<never, unknown, Member> {
  return request<Member>(`${BASE}/${id}`, { method: 'PUT', data: payload })
}

export function deleteMember(id: string): Effect.Effect<never, unknown, void> {
  return request<void>(`${BASE}/${id}`, { method: 'DELETE' })
}
