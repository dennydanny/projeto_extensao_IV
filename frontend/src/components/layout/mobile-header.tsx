import { ModeToggle } from "@/components/mode-toggle"
import { Brand } from "@/components/layout/brand"

/** Topo fixo do mobile (some a partir de `md`). */
export function MobileHeader() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b bg-card px-4 py-3 md:hidden">
      <Brand compact />
      <ModeToggle />
    </header>
  )
}
