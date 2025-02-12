import { z } from "zod"

export const pollSchema = z.object({
  pollId: z.string(),
  description: z.string(),
  studentRecord: z.string()
})

export type PollState =
  | {
    errors?: {
      description?: string[]
      studentRecord?: string[] | string
      pollId?: string[]
    }
  }
  | undefined