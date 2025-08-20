import * as Context from '@effect/data/Context'

export interface AuthEnv {
  token: string | null
}

// A simple service tag representing the auth environment (token)
export const AuthService = Context.Tag<AuthEnv>()
