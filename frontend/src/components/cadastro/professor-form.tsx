import { useState, type FormEvent } from "react"
import { Check, Plus } from "lucide-react"
import { toast } from "sonner"
import { FormField } from "@/components/shared/form-field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Professor, ProfessorInput } from "@/lib/types"

export interface ProfessorFormValues {
  nome: string
  email: string
  /** separadas por vírgula */
  disciplinas: string
}

export const EMPTY_PROFESSOR_FORM: ProfessorFormValues = { nome: "", email: "", disciplinas: "" }

export const professorToForm = (p: Professor): ProfessorFormValues => ({
  nome: p.nome,
  email: p.email,
  disciplinas: p.disciplinas.join(", "),
})

interface ProfessorFormProps {
  initial: ProfessorFormValues
  editing: boolean
  onSubmit: (input: ProfessorInput) => void
  onCancel: () => void
}

export function ProfessorForm({ initial, editing, onSubmit, onCancel }: ProfessorFormProps) {
  const [v, setV] = useState(initial)
  const set = <K extends keyof ProfessorFormValues>(key: K, value: ProfessorFormValues[K]) =>
    setV((prev) => ({ ...prev, [key]: value }))

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!v.nome.trim()) {
      toast.error("Informe o nome do professor.")
      return
    }
    onSubmit({
      nome: v.nome.trim(),
      email: v.email.trim(),
      disciplinas: v.disciplinas.split(",").map((d) => d.trim()).filter(Boolean),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
      <FormField label="Nome completo" htmlFor="prof-nome">
        <Input
          id="prof-nome"
          placeholder="Ex.: Cláudio Roberto"
          value={v.nome}
          onChange={(e) => set("nome", e.target.value)}
        />
      </FormField>
      <FormField label="E-mail institucional" htmlFor="prof-email">
        <Input
          id="prof-email"
          type="email"
          placeholder="nome@unisapiens.edu.br"
          value={v.email}
          onChange={(e) => set("email", e.target.value)}
        />
      </FormField>
      <FormField label="Disciplinas que leciona" htmlFor="prof-disciplinas" hint="Separe por vírgula">
        <Input
          id="prof-disciplinas"
          placeholder="Ex.: Cálculo I, Matemática Computacional"
          value={v.disciplinas}
          onChange={(e) => set("disciplinas", e.target.value)}
        />
      </FormField>
      <div className="mt-1 flex gap-2">
        <Button type="submit">
          {editing ? <Check /> : <Plus />}
          {editing ? "Salvar alterações" : "Cadastrar professor"}
        </Button>
        {editing && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  )
}
