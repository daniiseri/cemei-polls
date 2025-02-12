import { PollDetails } from "./components/poll-details"

export default async function PollDetailsPage({ params }: { params: Promise<{ pollId: string }> }) {
  return (
    <PollDetails params={params} />
  )
}