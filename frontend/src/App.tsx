
import { useState } from "react"

import { Sidebar } from "@/components/layout/sidebar"
import { BottomNav } from "@/components/layout/bottom-nav"
import { ThemeProvider } from "@/components/theme-provider"
import { ScheduleProvider } from "@/context/schedule-context"

import { PainelPage } from "@/pages/painel-page"
import { HojePage } from "@/pages/hoje-page"
import { SemanaPage } from "@/pages/semana-page"
import { CadastroPage } from "@/pages/cadastro-page"

import type { CadastroTab, TabId } from "@/lib/types"

function AppContent() {
  const [tab, setTab] = useState<TabId>("painel")
  const [cadastroTab, setCadastroTab] = useState<CadastroTab>("turmas")

  function handleNavigate(nextTab: TabId, nextCadastroTab?: CadastroTab) {
    setTab(nextTab)

    if (nextCadastroTab) {
      setCadastroTab(nextCadastroTab)
    }
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar tab={tab} onTabChange={setTab} />

      <div className="min-w-0 flex-1">
        <main className="mx-auto w-full max-w-[1600px] p-4 pb-20 md:p-6">
          {tab === "painel" && (
            <PainelPage onNavigate={handleNavigate} />
          )}

          {tab === "hoje" && <HojePage />}

          {tab === "semana" && <SemanaPage />}

          {tab === "cadastro" && (
            <CadastroPage
              tab={cadastroTab}
              onTabChange={setCadastroTab}
            />
          )}
        </main>
      </div>

      <BottomNav tab={tab} onTabChange={setTab} />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <ScheduleProvider>
        <AppContent />
      </ScheduleProvider>
    </ThemeProvider>
  )
}

export default App
