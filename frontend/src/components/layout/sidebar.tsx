import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Brand } from "@/components/layout/brand"
import { NAV_ITEMS } from "@/lib/nav"
import { cn } from "@/lib/utils"
import type { TabId } from "@/lib/types"

interface SidebarProps {
  tab: TabId
  onTabChange: (tab: TabId) => void
}

/** Navegação lateral — aparece a partir de `md`. No mobile, quem navega é a BottomNav. */
export function Sidebar({ tab, onTabChange }: SidebarProps) {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r bg-card px-4 py-6 md:flex">
      <Brand className="mb-8 px-2" />
      <nav className="flex flex-col gap-1" aria-label="Navegação principal">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant="ghost"
            aria-current={tab === id ? "page" : undefined}
            onClick={() => onTabChange(id)}
            className={cn(
              "h-10 w-full justify-start gap-3 rounded-xl px-3 text-muted-foreground",
              tab === id && "bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            <Icon className="size-[18px]" />
            {label}
          </Button>
        ))}
      </nav>
      <div className="mt-auto flex items-end justify-between px-1 pt-6">
        <div className="px-2">
          <p className="text-xs text-muted-foreground">Coordenação de Curso</p>
          <p className="text-xs text-muted-foreground">Unisapiens · Engetec</p>
        </div>
        <ModeToggle />
      </div>
    </aside>
  )
}
