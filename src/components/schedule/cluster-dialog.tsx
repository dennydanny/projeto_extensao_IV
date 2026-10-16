import { ClassCard } from "@/components/schedule/class-card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useSchedule } from "@/context/schedule-context"
import { hasTime, sortByStart, timeToMin } from "@/lib/schedule"
import type { Dia } from "@/lib/constants"
import type { Turma } from "@/lib/types"

export interface ClusterData {
  dia: Dia
  items: Turma[]
}

interface ClusterDialogProps {
  data: ClusterData | null
  onClose: () => void
}

/** Lista TODAS as turmas que acontecem no mesmo bloco de horário. */
export function ClusterDialog({ data, onClose }: ClusterDialogProps) {
  const { conflitos } = useSchedule()
  const items = sortByStart(data?.items ?? [])
  const timed = items.filter(hasTime)
  const range = timed.length
    ? `${timed.reduce((a, b) => (timeToMin(a.inicio) <= timeToMin(b.inicio) ? a : b)).inicio} – ${timed.reduce((a, b) => (timeToMin(a.fim) >= timeToMin(b.fim) ? a : b)).fim}`
    : "horário simultâneo"

  return (
    <Dialog open={data !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[85vh] gap-4 overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif">
            {items.length} {items.length === 1 ? "turma" : "turmas"} neste horário
          </DialogTitle>
          <DialogDescription>
            {data?.dia} · {range}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2.5">
          {items.map((t) => (
            <ClassCard key={t.id} turma={t} conflito={conflitos.has(t.id)} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
