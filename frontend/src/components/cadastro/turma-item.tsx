import { Pencil } from "lucide-react"
import { ClassCard } from "@/components/schedule/class-card"
import { ConfirmDelete } from "@/components/shared/confirm-delete"
import { Button } from "@/components/ui/button"
import { useSchedule } from "@/context/schedule-context"
import type { Turma } from "@/lib/types"

interface TurmaItemProps {
  turma: Turma
  onEdit: () => void
  onDelete: () => void
}

export function TurmaItem({ turma, onEdit, onDelete }: TurmaItemProps) {
  const { conflitos } = useSchedule()
  return (
    <div className="flex items-start gap-2">
      <ClassCard turma={turma} conflito={conflitos.has(turma.id)} compact className="min-w-0 flex-1" />
      <div className="flex shrink-0 flex-col gap-1">
        <Button variant="outline" size="icon" aria-label={`Editar ${turma.disciplina}`} onClick={onEdit}>
          <Pencil className="size-4" />
        </Button>
        <ConfirmDelete
          label={`Excluir ${turma.disciplina}`}
          title="Excluir esta turma?"
          description={`${turma.disciplina} (${turma.curso} · ${turma.periodo}) será removida da grade.`}
          onConfirm={onDelete}
        />
      </div>
    </div>
  )
}
