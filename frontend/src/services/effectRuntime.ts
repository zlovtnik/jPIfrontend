import { Effect, runPromise } from '@effect/io/Effect'

// typed runtime runner
export async function runEffect<R>(eff: Effect<never, unknown, R>): Promise<R> {
  if (typeof runPromise !== 'function') throw new Error('Effect runtime runPromise not available')
  return runPromise(eff)
}
