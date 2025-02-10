'use server'

import { createClient } from "@/lib/supabase/server";
import { Poll, PollState } from "./definitions";

export async function newPollAction(_: PollState, formData: Poll) {
  const { description, options } = formData

  try {
    const supabase = await createClient()
    const { user } = (await supabase.auth.getUser()).data

    if (user) {
      const { data, error } = await supabase
        .from('poll')
        .insert([
          { description, user_id: user.id }
        ])
        .select('id')

      if (error) {
        return console.log(error)
      }

      const [poll] = data

      await supabase
        .from('option')
        .insert(options.map(({ description }) => ({ description, poll_id: poll.id })))
    }
  } catch (error) {
    console.error(error)
  }
}