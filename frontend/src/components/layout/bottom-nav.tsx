import { NAV_ITEMS } from "@/lib/nav"
import { cn } from "@/lib/utils"
import type { TabId } from "@/lib/types"

interface BottomNavProps {
  tab: TabId
  onTabChange: (tab: TabId) => void
}

/** Barra de abas inferior (mobile-first). Escondida a partir de `md`. */
export function BottomNav({ tab, onTabChange }: BottomNavProps) {
  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-30 border-t bg-card pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <div className="grid grid-cols-4">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onTabChange(id)}
            aria-current={tab === id ? "page" : undefined}
            className={cn(
              "flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
              tab === id ? "text-primary" : "text-muted-foreground",
            )}
          >
            <Icon className="size-5" />
            {label}
          </button>
        ))}
      </div>
    </nav>
  )
}
