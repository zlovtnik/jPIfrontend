import { useEffect, useRef, useState } from 'react'
import * as Effect from '@effect/io/Effect'
import { useEffectContext } from '../contexts/EffectContext'

export type EffectState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: unknown }

export function useEffectIO<R>(effFactory: () => Effect.Effect<never, unknown, R>, deps: any[] = []) {
  const { run } = useEffectContext()
  const mounted = useRef(true)
  const [state, setState] = useState<EffectState<R>>({ status: 'idle' })

  useEffect(() => {
    mounted.current = true
    setState({ status: 'loading' })
    let cancelled = false

    ;(async () => {
      try {
        const eff = effFactory()
        const res = await run(eff)
        if (!cancelled && mounted.current) setState({ status: 'success', data: res })
      } catch (e) {
        if (!cancelled && mounted.current) setState({ status: 'error', error: e })
      }
    })()

    return () => {
      cancelled = true
      mounted.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return state
}
