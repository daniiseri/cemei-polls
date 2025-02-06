import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { joinPollSchema, JoinPollState } from "./definitions";

export async function joinPollAction(state: JoinPollState, formData: FormData) {
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
    const { count } = await supabase
      .from('poll')
      .select('id')
      .eq('id', pollId)

    if (!count) {
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