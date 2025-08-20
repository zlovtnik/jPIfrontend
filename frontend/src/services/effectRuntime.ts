import { Effect, runPromise } from '@effect/io/Effect'

// typed runtime runner
export async function runEffect<R>(eff: Effect<any, unknown, R>): Promise<R> {
  if (typeof runPromise !== 'function') throw new Error('Effect runtime runPromise not available')
  // cast to any for runtime call — the effect environment will be provided by EffectProvider when possible
  return runPromise(eff as any)
}
