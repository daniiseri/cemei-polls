'use client'

import { createClient } from "@/lib/supabase/client";
import { toPtBR } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Poll = {
  id: number
  description: string | null
  created_at: string
}

export default function Polls() {
  const [polls, setPolls] = useState<Poll[]>()
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    supabase
      .auth
      .getUser()
      .then(({ data }) => {
        if (data.user) {
          supabase
            .from('poll')
            .select('id, description, created_at')
            .eq('user_id', data.user?.id)
            .then(({ data }) => {
              if (data) {
                setPolls(data)
              }
            })
        }
      })

    const channels = supabase.channel('custom-all-channels')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'poll' },
        (payload) => {
          switch (payload.eventType) {
            case 'INSERT': {
              setPolls(prevState => prevState ? [...prevState, payload.new as Poll] : [payload.new as Poll])
              break;
            }
            case 'DELETE': {
              const { id } = payload.old as { id: number }
              setPolls(prevState => {
                const newState = prevState?.filter((poll) => poll.id !== id)

                return newState
              })
            }
          }
        }
      )
      .subscribe()

    return () => {
      channels.unsubscribe()
    }
  }, [])

  function openPollDetail(pollId: number) {
    router.push(`/polls/${pollId}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div>
          <h3 className="font-bold text-lg">Enquetes</h3>
        </div>
        <Link className="flex items-center border border-border rounded px-2 py-1" href='/new-poll'><Plus /></Link>
      </div>

      <div className="border border-border rounded-md">
        <table className="text-sm w-full">
          <thead>
            <tr className="h-11">
              <th>Código</th>
              <th>Descrição</th>
              <th>Data de criação</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {
              polls?.map(({ id, created_at, description }) => (
                <tr onClick={() => openPollDetail(id)} key={id} className="odd:bg-zinc-50 h-11 cursor-pointer hover:text-lg">
                  <td>{id}</td>
                  <td>{description}</td>
                  <td>{toPtBR(created_at)}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}