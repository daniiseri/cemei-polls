import { supabase } from "@/lib/supabase"
import AnswerPollForm from "./components/answer-poll-form"

export default async function Page({ params }: { params: Promise<{ pollId: string }> }) {
  const pollId = (await params).pollId
  const polls = (await supabase.from('poll')
    .select('id')
    .eq('id', Number(pollId))).data

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      {
        !polls
          ? (
            <h3>Enquete não encontrada!</h3>
          ) : <AnswerPollForm pollId={pollId} />
      }
    </div>
  )
}