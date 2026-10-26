import { Pencil } from "lucide-react"
import { ConfirmDelete } from "@/components/shared/confirm-delete"
import { Panel } from "@/components/shared/panel"
import { Button } from "@/components/ui/button"
import { TIPOS_SALA } from "@/lib/constants"
import { salaIcon } from "@/lib/icons"
import { predioStyle } from "@/lib/predio-style"
import { cn } from "@/lib/utils"
import type { Sala } from "@/lib/types"

interface SalaItemProps {
  sala: Sala
  onEdit: () => void
  onDelete: () => void
}

export function SalaItem({ sala, onEdit, onDelete }: SalaItemProps) {
  const Icon = salaIcon(sala.tipo)
  const ps = predioStyle(sala.predio)
  const tipo = TIPOS_SALA.find((t) => t.id === sala.tipo)?.label

  return (
    <Panel bodyClassName="flex items-center gap-3 p-3.5">
      <div className={cn("flex size-10 shrink-0 items-center justify-center rounded-lg", ps.soft, ps.fg)}>
        <Icon className="size-[18px]" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{sala.nome}</p>
        <p className="truncate text-xs text-muted-foreground">
          {tipo} · {sala.predio} · {sala.andar}
          {sala.capacidade ? ` · ${sala.capacidade} lugares` : ""}
        </p>
      </div>
      <div className="flex shrink-0 gap-1">
        <Button variant="outline" size="icon" aria-label={`Editar ${sala.nome}`} onClick={onEdit}>
          <Pencil className="size-4" />
        </Button>
        <ConfirmDelete
          label={`Excluir ${sala.nome}`}
          title={`Excluir ${sala.nome}?`}
          description="Essa ação não pode ser desfeita. Salas vinculadas a turmas não podem ser excluídas."
          onConfirm={onDelete}
        />
      </div>
    </Panel>
  )
}
