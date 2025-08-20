import { describe, it, expect } from 'vitest'
import { listDonations } from '../src/services/donations.effect'
import { runEffect } from '../src/services/effectRuntime'

describe('donations.effect', () => {
  it('fetches donations via effect', async () => {
    const res = await runEffect(listDonations())
    expect(Array.isArray(res)).toBe(true)
    expect(res.length).toBeGreaterThan(0)
    expect(res[0]).toHaveProperty('amount')
  })
})
