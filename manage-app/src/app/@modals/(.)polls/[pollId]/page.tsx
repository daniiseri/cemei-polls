import { PollDetails } from "@/app/(protected)/polls/[pollId]/components/poll-details";

export default function PollDetailsPage({ params }: { params: Promise<{ pollId: string }> }) {
  return (
    <PollDetails params={params} />
  )
}