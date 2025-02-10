'use client'

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export function Modal({ children }: { children: ReactNode }) {
  const router = useRouter()

  function back() {
    router.back()
  }

  return (
    <div>
      <div onClick={back} className="fixed left-0 top-0 bg-black/50 h-screen w-full" />
      <div className="fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-white rounded px-3 py-2 w-1/2 h-4/5 overflow-auto">
        {children}
      </div>
    </div>
  )
}