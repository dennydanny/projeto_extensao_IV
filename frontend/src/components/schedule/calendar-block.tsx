import type { CSSProperties } from "react"
import { AlertTriangle } from "lucide-react"
import { useSchedule } from "@/context/schedule-context"
import { predioStyle } from "@/lib/predio-style"
import { cn } from "@/lib/utils"
import type { Turma } from "@/lib/types"

interface CalendarBlockProps {
  turma: Turma
  style: CSSProperties
  /** Mostra só o título (para colunas estreitas da visão semanal) */
  dense?: boolean
  onClick: () => void
}

export function CalendarBlock({ turma, style, dense, onClick }: CalendarBlockProps) {
  const { getSala, getProfessor, conflitos } = useSchedule()
  const sala = getSala(turma.salaId)
  const professor = getProfessor(turma.professorId)
  const ps = predioStyle(sala?.predio)
  const conflito = conflitos.has(turma.id)

  return (
    <button
      type="button"
      onClick={onClick}
      style={style}
      aria-label={`${turma.disciplina}, ${turma.inicio} às ${turma.fim}. Ver turmas deste horário`}
      className={cn(
        "absolute overflow-hidden rounded-lg border-l-[3px] px-2 py-1 text-left transition-transform hover:z-20 hover:scale-[1.02] hover:shadow-md focus-visible:z-20",
        conflito
          ? "border-l-destructive bg-destructive-soft text-destructive"
          : cn(ps.soft, ps.fg, ps.borderL),
      )}
    >
      <p className="truncate text-[11px] font-semibold leading-tight">{turma.disciplina}</p>
      {!dense && (
        <p className="mt-0.5 truncate text-[10px] leading-tight text-muted-foreground">
          {sala?.nome ?? "Online"}
          {professor ? ` · ${professor.nome.split(" ")[0]}` : ""}
        </p>
      )}
      {conflito && (
        <p className="flex items-center gap-0.5 text-[10px] font-semibold leading-tight">
          <AlertTriangle className="size-2.5" />
          conflito
        </p>
      )}
    </button>
  )
}
