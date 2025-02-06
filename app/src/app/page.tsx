'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { joinPollAction } from "./action";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Terminal } from "lucide-react";

export default function JoinPoll() {
  const [state, formAction, isPending] = useActionState(joinPollAction, undefined)

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <form action={formAction}>
        <div className="flex flex-col gap-4">
          {
            state?.errors && (
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
          <Input name="pollId" placeholder="Digite o código da enquete" />
          <Button>
            {
              isPending
                ? <Loader2 className="animate-spin" />
                : <span>Participar da enquete</span>
            }
          </Button>
        </div>
      </form>
    </div>
  )
}