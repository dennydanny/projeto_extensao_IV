import { useState } from "react"
import { Building2 } from "lucide-react"
import { toast } from "sonner"
import { EMPTY_SALA_FORM, SalaForm, salaToForm } from "@/components/cadastro/sala-form"
import { SalaItem } from "@/components/cadastro/sala-item"
import { EmptyState } from "@/components/shared/empty-state"
import { Panel } from "@/components/shared/panel"
import { useSchedule } from "@/context/schedule-context"
import type { Sala } from "@/lib/types"

export function SalasTab() {
  const { salas, addSala, updateSala, removeSala } = useSchedule()
  const [editing, setEditing] = useState<Sala | null>(null)
  const [formKey, setFormKey] = useState(0) // remonta o formulário ao salvar/cancelar/editar

  const reset = () => {
    setEditing(null)
    setFormKey((k) => k + 1)
  }

  return (
    <div className="grid gap-5 lg:grid-cols-5">
      <Panel className="h-fit lg:sticky lg:top-5 lg:col-span-2">
        <h2 className="mb-4 text-sm font-semibold">
          {editing ? "Editar sala" : "Nova sala ou laboratório"}
        </h2>
        <SalaForm
          key={formKey}
          initial={editing ? salaToForm(editing) : EMPTY_SALA_FORM}
          editing={!!editing}
          onCancel={reset}
          onSubmit={(input) => {
            if (editing) {
              updateSala(editing.id, input)
              toast.success("Sala atualizada.")
            } else {
              addSala(input)
              toast.success("Sala cadastrada.")
            }
            reset()
          }}
        />
      </Panel>

      <div className="flex flex-col gap-2.5 lg:col-span-3">
        {salas.length === 0 ? (
          <Panel>
            <EmptyState
              icon={Building2}
              title="Nenhuma sala cadastrada"
              description="Cadastre a primeira sala ou laboratório."
            />
          </Panel>
        ) : (
          salas.map((s) => (
            <SalaItem
              key={s.id}
              sala={s}
              onEdit={() => {
                setEditing(s)
                setFormKey((k) => k + 1)
              }}
              onDelete={() => {
                const res = removeSala(s.id)
                if (!res.ok) return toast.error(res.message)
                toast.success("Sala removida.")
                if (editing?.id === s.id) reset()
              }}
            />
          ))
        )}
      </div>
    </div>
  )
}
