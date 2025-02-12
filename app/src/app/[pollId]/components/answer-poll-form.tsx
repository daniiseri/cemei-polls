'use client'

import { useActionState, useEffect, useState, useTransition } from "react"
import { Option } from "@/components/option"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, Terminal } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { pollAction } from "../actions"
import { Tables } from "@/lib/database.types"
import { supabase } from "@/lib/supabase"

type AnswerPollFormProps = {
  pollId: string
}

type Poll = Pick<Tables<'poll'>, 'id' | 'description'> & { option: Pick<Tables<'option'>, 'id' | 'description'>[] }

export default function AnswerPollForm({ pollId }: AnswerPollFormProps) {
  const [state, formAction, isPending] = useActionState(pollAction, undefined)
  const [isLoading, start] = useTransition()
  const [poll, setPoll] = useState<Poll | null>()
  const [selected, setSelected] = useState<string>()

  useEffect(() => {
    start(async () => {
      const { data } = await supabase
        .from('poll')
        .select('id, description, option("id", "description")')
        .eq('id', Number(pollId))

      if (data?.length) {
        const [foundPoll] = data
        setPoll(foundPoll)
      } else setPoll(null)
    })
  }, [pollId])

  if (isLoading) return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="flex items-center gap-4 text-primary">
        <Loader2 className="animate-spin" /> <span className="font-semibold">Buscando enquete</span>
      </div>
    </div>
  )

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      {
        poll
          ? (
            <form action={formAction}>
              <input className="hidden" readOnly name="pollId" value={pollId} />
              <div className="flex flex-col gap-4">
                {
                  state?.errors
                  && (
                    <Alert className="border-red-500 text-red-500">
                      <Terminal className="h-4 w-4" />
                      <AlertTitle>Falha!</AlertTitle>
                      <AlertDescription>
                        {
                          Object.values(state.errors).map(error => error)
                        }
                      </AlertDescription>
                    </Alert>
                  )
                }
                <Input className="text-primary placeholder:text-primary/50" name="studentRecord" placeholder="Digite seu registro (RA)" />
                <h3 className="text-center text-primary font-semibold">{poll.description}</h3>
                {
                  poll.option.map(({ id, description }) => (
                    <Option key={id} name="optionId" value={id.toString()} text={description!} id={id.toString()} setSelected={setSelected} selected={selected} />
                  ))
                }
              </div>

              <div className="mt-5 flex justify-center">
                <Button disabled={isPending} onClick={() => setSelected(undefined)} size='lg'>
                  {
                    isPending
                      ? <Loader2 className="animate-spin" />
                      : <span>Confirmar</span>
                  }
                </Button>
              </div>
            </form>
          ) : typeof poll !== 'undefined' && <h3 className="text-primary font-semibold">Enquete <span className="underline">{pollId}</span> não encontrada!</h3>
      }
    </div>
  )
}