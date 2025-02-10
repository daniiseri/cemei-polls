import { ReactNode } from "react";
import { SideMenu } from "./side-menu";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <SideMenu />
      <div className="px-4 py-6">
        {children}
      </div>
    </div>
  )
}