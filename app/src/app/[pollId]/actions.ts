import { supabase } from "@/lib/supabase"
import { pollSchema, PollState } from "./definitions"

export async function pollAction(state: PollState, formData: FormData) {
  const validatedFields = pollSchema.safeParse({
    pollId: formData.get('pollId'),
    optionId: formData.get('optionId'),
    studentRecord: formData.get('studentRecord')
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  const { optionId, studentRecord, pollId } = validatedFields.data

  try {
    const { error } = await supabase
      .from('answers')
      .insert([{
        option_id: Number(optionId),
        student_record: studentRecord,
        poll_id: Number(pollId)
      }])

    if (error) {
      if (error.code === "23505") {
        return {
          errors: {
            studentRecord: `(${studentRecord}) já participou da enquete`
          }
        }
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
    }
  }
}