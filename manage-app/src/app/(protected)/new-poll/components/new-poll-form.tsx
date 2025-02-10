'use client'

import { useTransition } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, Terminal, Trash2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Poll, pollSchema } from "../definitions"
import { newPollAction } from "../actions"
import { useRouter } from "next/navigation"

type NewPollFormProps = {
  isParallel?: boolean
}

export default function NewPollForm({ isParallel }: NewPollFormProps) {
  const [isPending, startTransition] = useTransition()
  const { control, handleSubmit, register, formState: { errors } } = useForm<Poll>({
    resolver: zodResolver(pollSchema)
  })
  const router = useRouter()

  const { append, fields, remove } = useFieldArray({
    control,
    name: 'options'
  })

  function newOption() {
    append({
      description: `Opção ${fields.length + 1}`
    })
  }

  function removeOption(index: number) {
    remove(index)
  }

  async function onSubmit(data: Poll) {
    startTransition(async () => {
      await newPollAction(undefined, data)

      if (isParallel) {
        router.back()
      }
    })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        {
          Object.values(errors).length ? (
            <Alert className="border-red-500 text-red-500">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Falha!</AlertTitle>
              <AlertDescription>
                {
                  Object.values(errors).map(error => error.message)
                }
              </AlertDescription>
            </Alert>
          ) : null
        }

        <Input {...register('description')} placeholder="Digite uma descrição para a enquete" />

        {
          fields.map((_, index) => (
            <div key={index} className="flex items-center  gap-2">
              <Input {...register(`options.${index}.description`)} />
              <Trash2 onClick={() => removeOption(index)} className="cursor-pointer hover:scale-110 opacity-50 hover:opacity-100" />
            </div>
          ))
        }
        <Button className="w-full justify-start bg-transparent text-black hover:bg-transparent opacity-50 hover:opacity-100" type="button" onClick={newOption}>Nova opção</Button>
        <Button disabled={fields.length < 2}>
          {
            isPending
              ? <Loader2 className="animate-spin" />
              : <span>Criar enquete</span>
          }
        </Button>
      </div>
    </form>
  )
}