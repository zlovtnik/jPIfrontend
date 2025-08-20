import { setupServer } from 'msw/node'
import { rest } from 'msw'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

export const server = setupServer(
  // members list
  rest.get(`${API_BASE}/members`, (req, res, ctx) => {
    return res(
      ctx.json([
        { id: '1', firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com' },
        { id: '2', firstName: 'Bob', lastName: 'Jones', email: 'bob@example.com' }
      ])
    )
  }),
  // donations list
  rest.get(`${API_BASE}/donations`, (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 'd1', amount: '100.00', donationType: 'TITHE', donationDate: '2025-01-01' }
      ])
    )
  })
)
