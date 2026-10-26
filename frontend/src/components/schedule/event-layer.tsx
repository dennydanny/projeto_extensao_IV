import { useMemo } from "react"
import { CalendarBlock } from "@/components/schedule/calendar-block"
import { OverflowBlock } from "@/components/schedule/overflow-block"
import { HOUR_H } from "@/lib/constants"
import { minutesToTop, packForDisplay } from "@/lib/schedule"
import type { Turma } from "@/lib/types"

interface EventLayerProps {
  turmas: Turma[]
  /** Máximo de colunas lado a lado antes de agrupar em "+N" */
  maxCols: number
  dense?: boolean
  minHeight: number
  onOpenGroup: (items: Turma[]) => void
}

/** Posiciona as aulas de UM dia dentro da coluna do calendário (aulas simultâneas ficam lado a lado). */
export function EventLayer({ turmas, maxCols, dense, minHeight, onOpenGroup }: EventLayerProps) {
  const items = useMemo(() => packForDisplay(turmas, maxCols), [turmas, maxCols])

  return (
    <>
      {items.map((item, idx) => {
        const width = 100 / item.cols
        const style = {
          top: minutesToTop(item.start),
          height: Math.max(((item.end - item.start) / 60) * HOUR_H, minHeight),
          left: `calc(${width * item.col}% + 2px)`,
          width: `calc(${width}% - 4px)`,
        }
        const open = () => onOpenGroup(item.group)

        return item.kind === "overflow" ? (
          <OverflowBlock key={`ov-${idx}`} count={item.count} style={style} onClick={open} />
        ) : (
          <CalendarBlock key={item.turma.id} turma={item.turma} style={style} dense={dense} onClick={open} />
        )
      })}
    </>
  )
}
