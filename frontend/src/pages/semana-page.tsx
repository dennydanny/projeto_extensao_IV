import { useState } from "react"
import { DayList } from "@/components/schedule/day-list"
import { WeekMatrix } from "@/components/schedule/week-matrix"
import { PageHeader } from "@/components/layout/page-header"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DIAS, DIAS_CURTO, type Dia } from "@/lib/constants"
import { todayDia } from "@/lib/schedule"

export function SemanaPage() {
  const [dia, setDia] = useState<Dia>(todayDia() ?? "Segunda-feira")

  return (
    <div>
      <PageHeader title="Grade semanal" description="Todas as turmas organizadas por dia e faixa de horário" />

      {/* mobile: seletor de dia + lista de cards */}
      <div className="md:hidden">
        <Tabs value={dia} onValueChange={(v) => setDia(v as Dia)}>
          <TabsList className="mb-4 h-auto w-full justify-start gap-1 overflow-x-auto p-1">
            {DIAS.map((d) => (
              <TabsTrigger key={d} value={d} className="shrink-0 px-4 py-2" aria-label={d}>
                {DIAS_CURTO[d]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <DayList dia={dia} />
      </div>

      {/* desktop: matriz faixa × dia */}
      <div className="hidden md:block">
        <WeekMatrix />
      </div>
    </div>
  )
}
