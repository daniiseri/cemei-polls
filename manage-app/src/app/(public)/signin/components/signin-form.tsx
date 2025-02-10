'use client'

import { useActionState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Terminal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signinAction } from "../actions"

export default function SigninForm() {
  const [state, formAction, isPending] = useActionState(signinAction, undefined)

  return (
    <form action={formAction} className="space-y-4">
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

      <Input name="email" type="email" placeholder="Digite seu email" />
      <Input name="password" placeholder="Digite sua senha" />

      <Button>
        {
          isPending
            ? <Loader2 className="animate-spin" />
            : <span>Entrar</span>
        }
      </Button>
    </form>
  )
}