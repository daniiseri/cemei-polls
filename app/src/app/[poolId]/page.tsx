'use client'

import { useActionState, useState } from "react"
import { pollAction } from "./actions"
import { Option } from "@/components/option"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, Terminal } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useParams } from "next/navigation"

export default function Page() {
  const { pollId } = useParams<{ pollId: string }>()
  const [state, formAction, isPending] = useActionState(pollAction, undefined)
  const [selected, setSelected] = useState<string>()

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <form action={formAction}>
        <input readOnly name="pollId" value={pollId} />
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
          <h3 className="text-center text-primary font-semibold">Enquete</h3>
          <Option name="description" value="1" text="Opção 01" id="1" setSelected={setSelected} selected={selected} />
          <Option name="description" value="2" text="Opção 02" id="2" setSelected={setSelected} selected={selected} />
          <Option name="description" value="3" text="Opção 03" id="3" setSelected={setSelected} selected={selected} />
          <Option name="description" value="4" text="Opção 04" id="4" setSelected={setSelected} selected={selected} />
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
    </div>
  )
}