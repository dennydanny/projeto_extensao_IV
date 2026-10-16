import { useEffect, useRef } from "react"
import { AsyncChip } from "@/components/schedule/async-chip"
import { EventLayer } from "@/components/schedule/event-layer"
import { HourLines } from "@/components/schedule/hour-lines"
import { NowLine } from "@/components/schedule/now-line"
import { TimeAxis } from "@/components/schedule/time-axis"
import { DIAS, DIAS_CURTO, GRID_HEIGHT, HOUR_H, HOUR_START } from "@/lib/constants"
import { nowOffset, sameDate } from "@/lib/schedule"
import { cn } from "@/lib/utils"
import type { Turma } from "@/lib/types"

interface CalendarWeekViewProps {
  turmas: Turma[]
  weekDates: Date[]
  now: Date
  onOpenGroup: (dia: (typeof DIAS)[number], items: Turma[]) => void
}

export function CalendarWeekView({ turmas, weekDates, now, onOpenGroup }: CalendarWeekViewProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const nowTop = nowOffset(now)

  // abre já mostrando o período noturno, onde está a maior parte das aulas
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = Math.max(0, (18 - HOUR_START) * HOUR_H - 60)
  }, [])

  const byDia = DIAS.map((dia) => turmas.filter((t) => t.dia === dia))
  const hasAsync = byDia.some((list) => list.some((t) => !t.inicio))

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[760px]">
        {/* cabeçalho dos dias */}
        <div className="flex border-b">
          <div className="w-12 shrink-0" />
          {DIAS.map((dia, i) => {
            const isToday = sameDate(weekDates[i], now)
            return (
              <div
                key={dia}
                className={cn(
                  "flex h-10 min-w-0 flex-1 items-center justify-center gap-1.5 border-l text-xs font-semibold",
                  isToday ? "text-primary" : "text-muted-foreground",
                )}
              >
                {DIAS_CURTO[dia]}
                <span
                  className={cn(
                    "flex size-5 items-center justify-center rounded-full text-[11px]",
                    isToday && "bg-primary text-primary-foreground",
                  )}
                >
                  {weekDates[i].getDate()}
                </span>
              </div>
            )
          })}
        </div>

        {/* aulas assíncronas */}
        {hasAsync && (
          <div className="flex border-b">
            <div className="w-12 shrink-0" />
            {byDia.map((list, i) => (
              <div key={DIAS[i]} className="flex min-w-0 flex-1 flex-col gap-1 border-l px-1 py-1.5">
                {list
                  .filter((t) => !t.inicio)
                  .map((t) => (
                    <AsyncChip key={t.id} turma={t} />
                  ))}
              </div>
            ))}
          </div>
        )}

        {/* grade de horas */}
        <div ref={scrollRef} className="flex max-h-[460px] overflow-y-auto">
          <TimeAxis />
          {DIAS.map((dia, i) => {
            const isToday = sameDate(weekDates[i], now)
            return (
              <div
                key={dia}
                className={cn("relative min-w-0 flex-1 border-l", isToday && "bg-primary/5")}
                style={{ height: GRID_HEIGHT }}
              >
                <HourLines />
                <EventLayer
                  turmas={byDia[i]}
                  maxCols={3}
                  dense
                  minHeight={26}
                  onOpenGroup={(items) => onOpenGroup(dia, items)}
                />
                {isToday && nowTop !== null && <NowLine top={nowTop} />}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
