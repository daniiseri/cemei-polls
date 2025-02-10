'use client'

import { File, House } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef } from "react"

const MENU_ITEMS = [
  { href: "/", text: "Página inicial", icon: <House /> },
  { href: "/polls", text: "Enquetes", icon: <File /> },
] as const

export function SideMenu() {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (ref.current) {
      const after = ref.current.nextElementSibling

      if (after instanceof HTMLElement) {
        after.style.marginLeft = ref.current.offsetWidth + 'px'
      }
    }
  }, [])

  return (
    <aside ref={ref} className="h-screen fixed top-0 left-0 px-4 border-r border-border py-6">
      <nav>
        <ul>
          {
            MENU_ITEMS.map(({ href, icon, text }, index) => (
              <li key={index}>
                <Link href={href}>
                  <div className="flex items-center gap-3 hover:bg-primary/90 hover:text-secondary px-3 py-2 rounded">
                    {icon}
                    <span>{text}</span>
                  </div>
                </Link>
              </li>
            ))
          }
        </ul>
      </nav>
    </aside>
  )
}