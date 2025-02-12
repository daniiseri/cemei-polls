import { z } from "zod"

export const pollSchema = z.object({
  pollId: z.string(),
  optionId: z.string(),
  studentRecord: z.string()
})

export type PollState =
  | {
    errors?: {
      optionId?: string[]
      studentRecord?: string[] | string
      pollId?: string[]
    }
  }
  | undefined