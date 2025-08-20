import { Effect, runPromise } from '@effect/io/Effect'

// typed runtime runner
export async function runEffect<R>(eff: Effect<any, unknown, R>): Promise<R> {
  if (typeof runPromise !== 'function') throw new Error('Effect runtime runPromise not available')
  // cast to satisfy runPromise's declared input type (some effects may still require env;
  // the provider should supply them before calling runEffect in typical flows)
  return runPromise(eff as unknown as Effect<never, unknown, R>)
}
