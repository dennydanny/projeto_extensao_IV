import { useMemo, useState } from "react"
import { GraduationCap } from "lucide-react"
import { toast } from "sonner"
import { EMPTY_TURMA_FORM, TurmaForm, turmaToForm } from "@/components/cadastro/turma-form"
import { TurmaItem } from "@/components/cadastro/turma-item"
import { EmptyState } from "@/components/shared/empty-state"
import { Panel } from "@/components/shared/panel"
import { useSchedule } from "@/context/schedule-context"
import { DIAS } from "@/lib/constants"
import { sortByStart } from "@/lib/schedule"
import type { Turma } from "@/lib/types"

export function TurmasTab() {
  const { turmas, addTurma, updateTurma, removeTurma } = useSchedule()
  const [editing, setEditing] = useState<Turma | null>(null)
  const [formKey, setFormKey] = useState(0)

  const reset = () => {
    setEditing(null)
    setFormKey((k) => k + 1)
  }

  const grouped = useMemo(
    () =>
      DIAS.map((dia) => ({ dia, items: sortByStart(turmas.filter((t) => t.dia === dia)) })).filter(
        (g) => g.items.length > 0,
      ),
    [turmas],
  )

  return (
    <div className="grid gap-5 lg:grid-cols-5">
      <Panel className="h-fit lg:sticky lg:top-5 lg:col-span-2">
        <h2 className="mb-4 text-sm font-semibold">{editing ? "Editar turma" : "Nova turma"}</h2>
        <TurmaForm
          key={formKey}
          initial={editing ? turmaToForm(editing) : EMPTY_TURMA_FORM}
          editingId={editing?.id ?? null}
          onCancel={reset}
          onSubmit={(input) => {
            if (editing) {
              updateTurma(editing.id, input)
              toast.success("Turma atualizada.")
            } else {
              addTurma(input)
              toast.success("Turma cadastrada.")
            }
            reset()
          }}
        />
      </Panel>

      <div className="flex flex-col gap-5 lg:col-span-3">
        {grouped.length === 0 ? (
          <Panel>
            <EmptyState icon={GraduationCap} title="Nenhuma turma cadastrada" description="Cadastre a primeira turma." />
          </Panel>
        ) : (
          grouped.map(({ dia, items }) => (
            <section key={dia}>
              <h3 className="mb-2 px-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">{dia}</h3>
              <div className="flex flex-col gap-2.5">
                {items.map((t) => (
                  <TurmaItem
                    key={t.id}
                    turma={t}
                    onEdit={() => {
                      setEditing(t)
                      setFormKey((k) => k + 1)
                    }}
                    onDelete={() => {
                      removeTurma(t.id)
                      toast.success("Turma removida.")
                      if (editing?.id === t.id) reset()
                    }}
                  />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  )
}
