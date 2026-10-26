import { useMemo, useState, type FormEvent } from "react"
import { AlertTriangle, Check, Plus } from "lucide-react"
import { toast } from "sonner"
import { FormField } from "@/components/shared/form-field"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSchedule } from "@/context/schedule-context"
import { DIAS, FORMATOS, type Dia, type Formato } from "@/lib/constants"
import { salasOcupadas, timeToMin } from "@/lib/schedule"
import type { Turma, TurmaInput } from "@/lib/types"

export interface TurmaFormValues {
  curso: string
  periodo: string
  disciplina: string
  professorId: string
  salaId: string
  dia: Dia
  formato: Formato
  inicio: string
  fim: string
}

export const EMPTY_TURMA_FORM: TurmaFormValues = {
  curso: "",
  periodo: "",
  disciplina: "",
  professorId: "",
  salaId: "",
  dia: "Segunda-feira",
  formato: "Presencial",
  inicio: "19:00",
  fim: "21:45",
}

export const turmaToForm = (t: Turma): TurmaFormValues => ({
  curso: t.curso,
  periodo: t.periodo,
  disciplina: t.disciplina,
  professorId: t.professorId,
  salaId: t.salaId,
  dia: t.dia,
  formato: t.formato,
  inicio: t.inicio ?? "19:00",
  fim: t.fim ?? "21:45",
})

interface TurmaFormProps {
  initial: TurmaFormValues
  /** id da turma em edição (para não contar a si mesma como ocupando a sala) */
  editingId: string | null
  onSubmit: (input: TurmaInput) => void
  onCancel: () => void
}

export function TurmaForm({ initial, editingId, onSubmit, onCancel }: TurmaFormProps) {
  const { salas, professores, turmas } = useSchedule()
  const [v, setV] = useState(initial)
  const set = <K extends keyof TurmaFormValues>(key: K, value: TurmaFormValues[K]) =>
    setV((prev) => ({ ...prev, [key]: value }))

  const assincrona = v.formato === "Assíncrona"
  const horarioValido = !!v.inicio && !!v.fim && timeToMin(v.fim) > timeToMin(v.inicio)

  // "Escolhe a sala (dentre as disponíveis)" — marca as salas já ocupadas neste dia/horário
  const ocupadas = useMemo(
    () =>
      assincrona || !horarioValido
        ? new Set<string>()
        : salasOcupadas(turmas, salas, { dia: v.dia, inicio: v.inicio, fim: v.fim, ignoreId: editingId }),
    [assincrona, horarioValido, turmas, salas, v.dia, v.inicio, v.fim, editingId],
  )
  const salaEscolhidaOcupada = v.salaId !== "" && ocupadas.has(v.salaId)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!v.curso.trim() || !v.disciplina.trim()) return void toast.error("Informe curso e disciplina.")
    if (!v.professorId) return void toast.error("Selecione um professor responsável.")
    if (!v.salaId) return void toast.error("Selecione a sala ou laboratório.")
    if (!assincrona && !horarioValido) return void toast.error("O término deve ser depois do início.")

    onSubmit({
      curso: v.curso.trim(),
      periodo: v.periodo.trim(),
      disciplina: v.disciplina.trim(),
      professorId: v.professorId,
      salaId: v.salaId,
      dia: v.dia,
      formato: v.formato,
      inicio: assincrona ? null : v.inicio,
      fim: assincrona ? null : v.fim,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Curso" htmlFor="turma-curso">
          <Input
            id="turma-curso"
            placeholder="Ex.: Eng. Software"
            value={v.curso}
            onChange={(e) => set("curso", e.target.value)}
          />
        </FormField>
        <FormField label="Período / turma" htmlFor="turma-periodo">
          <Input
            id="turma-periodo"
            placeholder="Ex.: 4º ou 2º B"
            value={v.periodo}
            onChange={(e) => set("periodo", e.target.value)}
          />
        </FormField>
      </div>

      <FormField label="Disciplina" htmlFor="turma-disciplina">
        <Input
          id="turma-disciplina"
          placeholder="Ex.: Algoritmos e Estrutura de Dados II"
          value={v.disciplina}
          onChange={(e) => set("disciplina", e.target.value)}
        />
      </FormField>

      <FormField label="Professor responsável" htmlFor="turma-professor">
        <Select value={v.professorId} onValueChange={(x) => set("professorId", x)}>
          <SelectTrigger id="turma-professor" className="w-full">
            <SelectValue placeholder="Selecione…" />
          </SelectTrigger>
          <SelectContent>
            {professores.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Dia da semana" htmlFor="turma-dia">
          <Select value={v.dia} onValueChange={(x) => set("dia", x as Dia)}>
            <SelectTrigger id="turma-dia" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DIAS.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="Formato" htmlFor="turma-formato">
          <Select value={v.formato} onValueChange={(x) => set("formato", x as Formato)}>
            <SelectTrigger id="turma-formato" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FORMATOS.map((f) => (
                <SelectItem key={f} value={f}>
                  {f}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      </div>

      {!assincrona && (
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Início" htmlFor="turma-inicio">
            <Input id="turma-inicio" type="time" value={v.inicio} onChange={(e) => set("inicio", e.target.value)} />
          </FormField>
          <FormField label="Término" htmlFor="turma-fim">
            <Input id="turma-fim" type="time" value={v.fim} onChange={(e) => set("fim", e.target.value)} />
          </FormField>
        </div>
      )}

      <FormField label="Sala ou laboratório" htmlFor="turma-sala">
        <Select value={v.salaId} onValueChange={(x) => set("salaId", x)}>
          <SelectTrigger id="turma-sala" className="w-full">
            <SelectValue placeholder="Selecione…" />
          </SelectTrigger>
          <SelectContent>
            {salas.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.nome} · {s.predio}
                {ocupadas.has(s.id) ? " · ocupada" : ""}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>

      {salaEscolhidaOcupada && (
        <Alert variant="destructive" className="border-destructive/40 bg-destructive-soft">
          <AlertTriangle />
          <AlertDescription>
            Essa sala já tem aula neste dia e horário. Você pode salvar, mas a turma ficará marcada como conflito.
          </AlertDescription>
        </Alert>
      )}

      <div className="mt-1 flex gap-2">
        <Button type="submit">
          {editingId ? <Check /> : <Plus />}
          {editingId ? "Salvar alterações" : "Cadastrar turma"}
        </Button>
        {editingId && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  )
}
