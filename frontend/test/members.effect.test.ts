import { describe, it, expect } from 'vitest'
import { listMembers } from '../src/services/members.effect'
import { runEffect } from '../src/services/effectRuntime'

describe('members.effect', () => {
  it('fetches members via effect', async () => {
    const res = await runEffect(listMembers())
    expect(Array.isArray(res)).toBe(true)
    expect(res.length).toBeGreaterThan(0)
    expect(res[0]).toHaveProperty('firstName')
  })
})
