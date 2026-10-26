import { Pencil } from "lucide-react"
import { ConfirmDelete } from "@/components/shared/confirm-delete"
import { Panel } from "@/components/shared/panel"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Professor } from "@/lib/types"

interface ProfessorItemProps {
  professor: Professor
  onEdit: () => void
  onDelete: () => void
}

const initials = (nome: string) =>
  nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()

export function ProfessorItem({ professor, onEdit, onDelete }: ProfessorItemProps) {
  const extra = professor.disciplinas.length - 3
  return (
    <Panel bodyClassName="flex items-center gap-3 p-3.5">
      <Avatar className="size-10">
        <AvatarFallback className="bg-predio-anexo2-soft font-serif text-sm font-semibold text-predio-anexo2">
          {initials(professor.nome)}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{professor.nome}</p>
        <p className="truncate text-xs text-muted-foreground">{professor.email || "sem e-mail cadastrado"}</p>
        {professor.disciplinas.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {professor.disciplinas.slice(0, 3).map((d) => (
              <Badge key={d} variant="secondary" className="rounded-full font-medium text-muted-foreground">
                {d}
              </Badge>
            ))}
            {extra > 0 && (
              <Badge variant="secondary" className="rounded-full font-medium text-muted-foreground">
                +{extra}
              </Badge>
            )}
          </div>
        )}
      </div>
      <div className="flex shrink-0 gap-1">
        <Button variant="outline" size="icon" aria-label={`Editar ${professor.nome}`} onClick={onEdit}>
          <Pencil className="size-4" />
        </Button>
        <ConfirmDelete
          label={`Excluir ${professor.nome}`}
          title={`Excluir ${professor.nome}?`}
          description="Essa ação não pode ser desfeita. Professores vinculados a turmas não podem ser excluídos."
          onConfirm={onDelete}
        />
      </div>
    </Panel>
  )
}
