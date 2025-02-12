import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { joinPollSchema, JoinPollState } from "./definitions";

export async function joinPollAction(_: JoinPollState, formData: FormData) {
  const validatedFields = joinPollSchema.safeParse({
    pollId: formData.get('pollId')
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  const { pollId } = validatedFields.data

  try {
    const { data } = await supabase
      .from('poll')
      .select('id')
      .eq('id', Number(pollId))

    if (!data?.length) {
      return {
        errors: {
          pollId: ['Enquete não encontrada!']
        }
      }
    }
  } catch (error) {
    return console.error(error)
  }

  redirect(`/${pollId}`)
}