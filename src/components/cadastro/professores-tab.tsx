import { useState } from "react"
import { Users } from "lucide-react"
import { toast } from "sonner"
import {
  EMPTY_PROFESSOR_FORM,
  ProfessorForm,
  professorToForm,
} from "@/components/cadastro/professor-form"
import { ProfessorItem } from "@/components/cadastro/professor-item"
import { EmptyState } from "@/components/shared/empty-state"
import { Panel } from "@/components/shared/panel"
import { useSchedule } from "@/context/schedule-context"
import type { Professor } from "@/lib/types"

export function ProfessoresTab() {
  const { professores, addProfessor, updateProfessor, removeProfessor } = useSchedule()
  const [editing, setEditing] = useState<Professor | null>(null)
  const [formKey, setFormKey] = useState(0)

  const reset = () => {
    setEditing(null)
    setFormKey((k) => k + 1)
  }

  return (
    <div className="grid gap-5 lg:grid-cols-5">
      <Panel className="h-fit lg:sticky lg:top-5 lg:col-span-2">
        <h2 className="mb-4 text-sm font-semibold">{editing ? "Editar professor" : "Novo professor"}</h2>
        <ProfessorForm
          key={formKey}
          initial={editing ? professorToForm(editing) : EMPTY_PROFESSOR_FORM}
          editing={!!editing}
          onCancel={reset}
          onSubmit={(input) => {
            if (editing) {
              updateProfessor(editing.id, input)
              toast.success("Professor atualizado.")
            } else {
              addProfessor(input)
              toast.success("Professor cadastrado.")
            }
            reset()
          }}
        />
      </Panel>

      <div className="flex flex-col gap-2.5 lg:col-span-3">
        {professores.length === 0 ? (
          <Panel>
            <EmptyState icon={Users} title="Nenhum professor cadastrado" description="Cadastre o primeiro professor." />
          </Panel>
        ) : (
          professores.map((p) => (
            <ProfessorItem
              key={p.id}
              professor={p}
              onEdit={() => {
                setEditing(p)
                setFormKey((k) => k + 1)
              }}
              onDelete={() => {
                const res = removeProfessor(p.id)
                if (!res.ok) return toast.error(res.message)
                toast.success("Professor removido.")
                if (editing?.id === p.id) reset()
              }}
            />
          ))
        )}
      </div>
    </div>
  )
}
