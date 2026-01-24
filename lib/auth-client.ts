import { createAuthClient } from 'better-auth/react'

// Use public env variable if available, otherwise auto-detect from window.location
const baseURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL

export const { signIn, signUp, signOut, useSession } = createAuthClient(
    baseURL ? { baseURL } : undefined
)