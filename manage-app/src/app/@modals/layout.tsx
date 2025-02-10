import { Modal } from "@/components/modal";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Modal>
      {children}
    </Modal>
  )
}