import { useMemo } from "react"
import { CalendarDays } from "lucide-react"
import { ClassCard } from "@/components/schedule/class-card"
import { EmptyState } from "@/components/shared/empty-state"
import { Panel } from "@/components/shared/panel"
import { useSchedule } from "@/context/schedule-context"
import type { Dia } from "@/lib/constants"
import { sortByStart, timeToMin, todayDia } from "@/lib/schedule"

interface DayListProps {
  dia: Dia
  /** Quando informado e `dia` é hoje, destaca a aula em andamento */
  now?: Date
}

/** Lista de aulas de um dia, em cards (usada em "Hoje" e na "Semana" mobile). */
export function DayList({ dia, now }: DayListProps) {
  const { turmas, conflitos } = useSchedule()
  const aulas = useMemo(() => sortByStart(turmas.filter((t) => t.dia === dia)), [turmas, dia])

  if (aulas.length === 0) {
    return (
      <Panel>
        <EmptyState
          icon={CalendarDays}
          title={`Nenhuma turma em ${dia}`}
          description="Cadastre uma turma para preencher esse dia da semana."
        />
      </Panel>
    )
  }

  const nowMin = now && todayDia(now) === dia ? now.getHours() * 60 + now.getMinutes() : null

  return (
    <div className="flex max-w-2xl flex-col gap-2.5">
      {aulas.map((t) => (
        <ClassCard
          key={t.id}
          turma={t}
          conflito={conflitos.has(t.id)}
          live={
            nowMin !== null &&
            !!t.inicio &&
            !!t.fim &&
            nowMin >= timeToMin(t.inicio) &&
            nowMin <= timeToMin(t.fim)
          }
        />
      ))}
    </div>
  )
}
