import { Laptop } from "lucide-react"
import { useSchedule } from "@/context/schedule-context"
import { cn } from "@/lib/utils"
import type { Turma } from "@/lib/types"

/** Aula assíncrona (sem horário fixo) — fica numa faixa acima da grade de horas. */
export function AsyncChip({ turma }: { turma: Turma }) {
  const { conflitos } = useSchedule()
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs",
        conflitos.has(turma.id)
          ? "bg-destructive-soft text-destructive"
          : "bg-gold-soft text-gold",
      )}
    >
      <Laptop className="size-3 shrink-0" />
      <span className="truncate font-medium">{turma.disciplina}</span>
    </div>
  )
}
