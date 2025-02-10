import { z } from "zod";

const optionSchema = z.object({
  description: z.string(),
})

export const pollSchema = z.object({
  description: z.string(),
  options: z
    .array(optionSchema)
    .min(2, 'Cada enquete deve ter no mínimo duas opções')
})

export type Poll = z.infer<typeof pollSchema>

export type PollState =
  | {
    errors?: {
      description?: string[]
      options?: string[]
    }
  }
  | undefined
  | void