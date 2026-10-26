import type { ReactNode } from "react"
import { BottomNav } from "@/components/layout/bottom-nav"
import { MobileHeader } from "@/components/layout/mobile-header"
import { Sidebar } from "@/components/layout/sidebar"
import type { TabId } from "@/lib/types"

interface AppShellProps {
  tab: TabId
  onTabChange: (tab: TabId) => void
  children: ReactNode
}

export function AppShell({ tab, onTabChange, children }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar tab={tab} onTabChange={onTabChange} />
      <div className="flex min-w-0 flex-1 flex-col">
        <MobileHeader />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 pb-24 sm:px-6 md:pb-8 lg:px-8">
          {children}
        </main>
      </div>
      <BottomNav tab={tab} onTabChange={onTabChange} />
    </div>
  )
}
