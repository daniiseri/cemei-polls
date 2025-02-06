import { cn } from "@/lib/utils"
import { Dispatch, SetStateAction } from "react"

type OptionProps = {
  id: string
  name: string
  text: string
  value: string
  setSelected: Dispatch<SetStateAction<string | undefined>>
  selected: string | undefined
}

export function Option({ id, name, text, value, selected, setSelected }: OptionProps) {
  return (
    <div>
      <label className={cn("block border border-border text-primary px-2 py-1 rounded cursor-pointer hover:bg-primary hover:text-secondary", selected === value && "bg-primary text-secondary")} htmlFor={id}>
        {text}
      </label>
      <input id={id} className="hidden" type="radio" name={name} value={value} onClick={() => setSelected(value)} />
    </div>
  )
}