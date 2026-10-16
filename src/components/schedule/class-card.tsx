import { AlertTriangle, Laptop, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useSchedule } from "@/context/schedule-context"
import { formatoIcon } from "@/lib/icons"
import { predioStyle } from "@/lib/predio-style"
import { cn } from "@/lib/utils"
import type { Turma } from "@/lib/types"

interface ClassCardProps {
  turma: Turma
  conflito?: boolean
  /** Esconde o selo de formato (Presencial/Síncrona…) */
  compact?: boolean
  /** Mostra o rótulo "Acontecendo agora" */
  live?: boolean
  className?: string
}

export function ClassCard({ turma, conflito, compact, live, className }: ClassCardProps) {
  const { getSala, getProfessor } = useSchedule()
  const sala = getSala(turma.salaId)
  const professor = getProfessor(turma.professorId)
  const style = predioStyle(sala?.predio)
  const FormatoIcon = formatoIcon(turma.formato)

  return (
    <div className={className}>
      {live && (
        <div className="mb-1.5 ml-1 flex items-center gap-1.5">
          <span className="size-1.5 animate-pulse rounded-full bg-gold" />
          <span className="text-xs font-semibold text-gold">Acontecendo agora</span>
        </div>
      )}
      <div
        className={cn(
          "flex gap-3 rounded-xl border bg-card p-3.5",
          live && "border-gold",
          conflito && "border-destructive",
        )}
      >
        <div className="flex w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-muted py-1.5">
          {turma.inicio ? (
            <>
              <span className="text-sm font-semibold leading-tight">{turma.inicio}</span>
              <span className="text-[10px] text-muted-foreground">{turma.fim}</span>
            </>
          ) : (
            <Laptop className="my-1 size-[18px] text-muted-foreground" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-snug">{turma.disciplina}</p>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {turma.curso} · {turma.periodo}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <Badge variant="secondary" className="gap-1 rounded-full font-medium text-muted-foreground">
              <User className="size-3.5" />
              {professor?.nome ?? "A definir"}
            </Badge>
            <Badge
              variant="secondary"
              className={cn("gap-1 rounded-full font-medium", style.soft, style.fg)}
            >
              <FormatoIcon className="size-3.5" />
              {sala?.nome ?? "—"}
            </Badge>
            {!compact && (
              <Badge variant="secondary" className="rounded-full font-medium text-muted-foreground">
                {turma.formato}
              </Badge>
            )}
            {conflito && (
              <Badge
                variant="secondary"
                className="gap-1 rounded-full bg-destructive-soft font-medium text-destructive"
              >
                <AlertTriangle className="size-3.5" />
                Conflito de horário
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
