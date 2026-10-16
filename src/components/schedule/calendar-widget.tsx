import { useMemo, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { CalendarDayView } from "@/components/schedule/calendar-day-view"
import { CalendarWeekView } from "@/components/schedule/calendar-week-view"
import { ClusterDialog, type ClusterData } from "@/components/schedule/cluster-dialog"
import { Panel } from "@/components/shared/panel"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useSchedule } from "@/context/schedule-context"
import { useNow } from "@/hooks/use-now"
import { DIAS } from "@/lib/constants"
import { formatDayLabel, formatWeekRange, getWeekDates, sameDate } from "@/lib/schedule"

type View = "semana" | "dia"

/** Calendário da home: alterna entre visão Semana e Dia. */
export function CalendarWidget() {
  const { turmas } = useSchedule()
  const now = useNow()
  const weekDates = useMemo(() => getWeekDates(), [])
  const [view, setView] = useState<View>("semana")
  const [dayIdx, setDayIdx] = useState(() => {
    const i = weekDates.findIndex((d) => sameDate(d, new Date()))
    return i === -1 ? 0 : i
  })
  const [cluster, setCluster] = useState<ClusterData | null>(null)

  const dia = DIAS[dayIdx]
  const turmasDoDia = useMemo(() => turmas.filter((t) => t.dia === dia), [turmas, dia])

  return (
    <Panel padded={false}>
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 pt-4 pb-3 sm:px-5">
        <div className="flex items-center gap-2">
          <ToggleGroup
            type="single"
            variant="outline"
            size="sm"
            value={view}
            onValueChange={(v) => v && setView(v as View)}
            aria-label="Modo de visualização"
          >
            <ToggleGroupItem
              value="semana"
              className="px-3.5 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              Semana
            </ToggleGroupItem>
            <ToggleGroupItem
              value="dia"
              className="px-3.5 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              Dia
            </ToggleGroupItem>
          </ToggleGroup>

          {view === "dia" && (
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="size-8"
                aria-label="Dia anterior"
                onClick={() => setDayIdx((i) => (i + DIAS.length - 1) % DIAS.length)}
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="size-8"
                aria-label="Próximo dia"
                onClick={() => setDayIdx((i) => (i + 1) % DIAS.length)}
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          )}
        </div>
        <p className="text-sm font-medium">
          {view === "semana" ? formatWeekRange(weekDates) : formatDayLabel(dia, weekDates[dayIdx])}
        </p>
      </div>

      {view === "semana" ? (
        <CalendarWeekView
          turmas={turmas}
          weekDates={weekDates}
          now={now}
          onOpenGroup={(d, items) => setCluster({ dia: d, items })}
        />
      ) : (
        <CalendarDayView
          dia={dia}
          date={weekDates[dayIdx]}
          turmas={turmasDoDia}
          now={now}
          onOpenGroup={(items) => setCluster({ dia, items })}
        />
      )}

      <ClusterDialog data={cluster} onClose={() => setCluster(null)} />
    </Panel>
  )
}
