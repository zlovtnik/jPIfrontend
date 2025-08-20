import { beforeAll, afterAll, afterEach, vi } from 'vitest'
import { server } from './server'

// Provide a no-op mock for react-helmet-async in the test environment
vi.mock('react-helmet-async', () => ({
	HelmetProvider: ({ children }: any) => children,
	Helmet: ({ children }: any) => children,
}))

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
