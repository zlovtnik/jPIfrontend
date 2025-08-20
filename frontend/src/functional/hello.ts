import * as Effect from '@effect/io/Effect'

export const hello = Effect.succeed('Hello from effect-ts!')

export const helloUpper = Effect.map(hello, (s: string) => s.toUpperCase())
