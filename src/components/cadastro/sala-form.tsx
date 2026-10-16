import { useState, type FormEvent } from "react"
import { Check, Plus } from "lucide-react"
import { toast } from "sonner"
import { FormField } from "@/components/shared/form-field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ANDARES,
  PREDIOS,
  TIPOS_SALA,
  type Andar,
  type Predio,
  type TipoSala,
} from "@/lib/constants"
import type { Sala, SalaInput } from "@/lib/types"

export interface SalaFormValues {
  nome: string
  tipo: TipoSala
  predio: Predio
  andar: Andar
  capacidade: string
}

export const EMPTY_SALA_FORM: SalaFormValues = {
  nome: "",
  tipo: "sala",
  predio: "Central",
  andar: "1º Piso",
  capacidade: "",
}

export const salaToForm = (s: Sala): SalaFormValues => ({
  nome: s.nome,
  tipo: s.tipo,
  predio: s.predio,
  andar: s.andar,
  capacidade: s.capacidade ? String(s.capacidade) : "",
})

interface SalaFormProps {
  initial: SalaFormValues
  editing: boolean
  onSubmit: (input: SalaInput) => void
  onCancel: () => void
}

export function SalaForm({ initial, editing, onSubmit, onCancel }: SalaFormProps) {
  const [v, setV] = useState(initial)
  const set = <K extends keyof SalaFormValues>(key: K, value: SalaFormValues[K]) =>
    setV((prev) => ({ ...prev, [key]: value }))

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!v.nome.trim()) {
      toast.error("Informe o nome ou número da sala.")
      return
    }
    onSubmit({
      nome: v.nome.trim(),
      tipo: v.tipo,
      predio: v.predio,
      andar: v.andar,
      capacidade: Number(v.capacidade) || 0,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
      <FormField label="Nome / número" htmlFor="sala-nome">
        <Input
          id="sala-nome"
          placeholder="Ex.: Sala 03, LAB 02, Nova York"
          value={v.nome}
          onChange={(e) => set("nome", e.target.value)}
        />
      </FormField>

      <FormField label="Tipo de ambiente" htmlFor="sala-tipo">
        <Select value={v.tipo} onValueChange={(x) => set("tipo", x as TipoSala)}>
          <SelectTrigger id="sala-tipo" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TIPOS_SALA.map((t) => (
              <SelectItem key={t.id} value={t.id}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Prédio" htmlFor="sala-predio">
          <Select value={v.predio} onValueChange={(x) => set("predio", x as Predio)}>
            <SelectTrigger id="sala-predio" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PREDIOS.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="Andar" htmlFor="sala-andar">
          <Select value={v.andar} onValueChange={(x) => set("andar", x as Andar)}>
            <SelectTrigger id="sala-andar" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ANDARES.map((a) => (
                <SelectItem key={a} value={a}>
                  {a}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <FormField label="Capacidade de alunos" htmlFor="sala-capacidade" hint="Deixe em branco para ambientes virtuais">
        <Input
          id="sala-capacidade"
          type="number"
          min={0}
          inputMode="numeric"
          placeholder="Ex.: 45"
          value={v.capacidade}
          onChange={(e) => set("capacidade", e.target.value)}
        />
      </FormField>

      <div className="mt-1 flex gap-2">
        <Button type="submit">
          {editing ? <Check /> : <Plus />}
          {editing ? "Salvar alterações" : "Cadastrar sala"}
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
