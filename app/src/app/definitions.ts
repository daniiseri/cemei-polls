import { z } from "zod";

export const joinPollSchema = z.object({
  pollId: z.string()
})

export type JoinPollState =
  | {
    errors?: {
      pollId?: string[]
    }
  }
  | undefined
  | void