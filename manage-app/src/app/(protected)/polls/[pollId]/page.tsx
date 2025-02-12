import { createClient } from "@/lib/supabase/server"

export default async function PollDetail({ params }: { params: Promise<{ pollId: string }> }) {
  const { pollId } = await params
  const supabase = await createClient()

  const { data } = await supabase.from('poll').select('description').eq('id', Number(pollId))

  const { data: options } = await supabase
    .from('option')
    .select('id, description')
    .eq('poll_id', Number(pollId))

  const { data: answers } = await supabase
    .from('answers')
    .select('*')
    .eq('poll_id', Number(pollId))

  const result: Record<number, { count: number, description: string }> = {}

  if (!options || !answers) return null

  for (const option of options) {
    const { data } = await supabase.from('answers').select('id').eq('option_id', option.id)
    const count = data?.length
    result[option.id] = { count: count || 0, description: option.description! }
  }

  return (
    <div className="h-full">
      <header>
        <h3 className="text-lg font-semibold">{data?.[0].description}</h3>
      </header>

      <ul className="space-y-1">
        {
          Object.entries(result).map(([key, value]) => (
            <li key={key} className="flex gap-4">
              <div className="w-20">
                <span>{value.description}</span>
              </div>
              <div className="flex relative w-80 h-auto">
                <div style={{ width: `${value.count / answers.length * 100}%` }} className={`bg-primary h-full`} />
                <div style={{ width: `${(answers.length - value.count) / answers.length * 100}%` }} className="bg-primary/50 h-full" />
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-secondary">{value.count} ({value.count / answers.length * 100}%)</div>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )

}