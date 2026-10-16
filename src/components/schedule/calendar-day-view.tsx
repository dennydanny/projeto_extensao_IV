import { useEffect, useRef } from "react"
import { CalendarDays } from "lucide-react"
import { AsyncChip } from "@/components/schedule/async-chip"
import { EventLayer } from "@/components/schedule/event-layer"
import { HourLines } from "@/components/schedule/hour-lines"
import { NowLine } from "@/components/schedule/now-line"
import { TimeAxis } from "@/components/schedule/time-axis"
import { GRID_HEIGHT, HOUR_H, HOUR_START, type Dia } from "@/lib/constants"
import { nowOffset, sameDate } from "@/lib/schedule"
import type { Turma } from "@/lib/types"

interface CalendarDayViewProps {
  dia: Dia
  date: Date
  turmas: Turma[] // já filtradas para o dia
  now: Date
  onOpenGroup: (items: Turma[]) => void
}

export function CalendarDayView({ dia, date, turmas, now, onOpenGroup }: CalendarDayViewProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const nowTop = nowOffset(now)
  const asyncList = turmas.filter((t) => !t.inicio)
  const timed = turmas.filter((t) => t.inicio)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = Math.max(0, (18 - HOUR_START) * HOUR_H - 60)
  }, [dia])

  return (
    <div>
      {asyncList.length > 0 && (
        <div className="flex flex-wrap gap-1.5 px-4 pb-2 sm:px-5">
          {asyncList.map((t) => (
            <div key={t.id} className="w-44 max-w-full">
              <AsyncChip turma={t} />
            </div>
          ))}
        </div>
      )}
      <div ref={scrollRef} className="flex max-h-[480px] overflow-y-auto px-4 pb-4 sm:px-5">
        <TimeAxis />
        <div className="relative ml-1 min-w-0 flex-1" style={{ height: GRID_HEIGHT }}>
          <HourLines />
          <EventLayer turmas={turmas} maxCols={4} minHeight={40} onOpenGroup={onOpenGroup} />
          {sameDate(date, now) && nowTop !== null && <NowLine top={nowTop} />}
          {timed.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
              <CalendarDays className="size-5" />
              <p className="text-sm">Nenhuma turma com horário fixo em {dia}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
