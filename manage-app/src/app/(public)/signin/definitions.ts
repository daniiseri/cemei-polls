import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

export type SigninState =
  | {
    errors?: {
      email?: string[]
      password?: string[]
    }
  }
  | void
  | undefined