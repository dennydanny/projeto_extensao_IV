import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"
import { SEED_PROFESSORES, SEED_SALAS, SEED_TURMAS } from "@/data/seed"
import { detectConflicts } from "@/lib/schedule"
import type {
  Professor,
  ProfessorInput,
  Sala,
  SalaInput,
  Turma,
  TurmaInput,
} from "@/lib/types"

export type ActionResult = { ok: true } | { ok: false; message: string }

interface ScheduleContextValue {
  salas: Sala[]
  professores: Professor[]
  turmas: Turma[]
  /** IDs de turmas em conflito de sala/horário */
  conflitos: Set<string>
  getSala: (id?: string | null) => Sala | undefined
  getProfessor: (id?: string | null) => Professor | undefined
  addSala: (input: SalaInput) => void
  updateSala: (id: string, input: SalaInput) => void
  removeSala: (id: string) => ActionResult
  addProfessor: (input: ProfessorInput) => void
  updateProfessor: (id: string, input: ProfessorInput) => void
  removeProfessor: (id: string) => ActionResult
  addTurma: (input: TurmaInput) => void
  updateTurma: (id: string, input: TurmaInput) => void
  removeTurma: (id: string) => void
}

const ScheduleContext = createContext<ScheduleContextValue | null>(null)

const newId = (prefix: string) => `${prefix}_${crypto.randomUUID().slice(0, 8)}`

interface ProviderProps {
  children: ReactNode
  initialSalas?: Sala[]
  initialProfessores?: Professor[]
  initialTurmas?: Turma[]
}

/**
 * Estado em memória. Para ligar numa API/banco, troque as funções abaixo por chamadas
 * (ex.: TanStack Query) mantendo a mesma interface — os componentes não precisam mudar.
 */
export function ScheduleProvider({
  children,
  initialSalas = SEED_SALAS,
  initialProfessores = SEED_PROFESSORES,
  initialTurmas = SEED_TURMAS,
}: ProviderProps) {
  const [salas, setSalas] = useState(initialSalas)
  const [professores, setProfessores] = useState(initialProfessores)
  const [turmas, setTurmas] = useState(initialTurmas)

  const conflitos = useMemo(() => detectConflicts(turmas, salas), [turmas, salas])

  const getSala = useCallback((id?: string | null) => salas.find((s) => s.id === id), [salas])
  const getProfessor = useCallback(
    (id?: string | null) => professores.find((p) => p.id === id),
    [professores],
  )

  const value = useMemo<ScheduleContextValue>(
    () => ({
      salas,
      professores,
      turmas,
      conflitos,
      getSala,
      getProfessor,
      addSala: (input) => setSalas((prev) => [{ id: newId("s"), ...input }, ...prev]),
      updateSala: (id, input) =>
        setSalas((prev) => prev.map((s) => (s.id === id ? { ...s, ...input } : s))),
      removeSala: (id) => {
        const sala = salas.find((s) => s.id === id)
        if (turmas.some((t) => t.salaId === id)) {
          return {
            ok: false,
            message: `Não é possível excluir: ${sala?.nome ?? "a sala"} está vinculada a turmas cadastradas.`,
          }
        }
        setSalas((prev) => prev.filter((s) => s.id !== id))
        return { ok: true }
      },
      addProfessor: (input) =>
        setProfessores((prev) => [{ id: newId("p"), ...input }, ...prev]),
      updateProfessor: (id, input) =>
        setProfessores((prev) => prev.map((p) => (p.id === id ? { ...p, ...input } : p))),
      removeProfessor: (id) => {
        const prof = professores.find((p) => p.id === id)
        if (turmas.some((t) => t.professorId === id)) {
          return {
            ok: false,
            message: `Não é possível excluir: ${prof?.nome ?? "o professor"} está vinculado a turmas cadastradas.`,
          }
        }
        setProfessores((prev) => prev.filter((p) => p.id !== id))
        return { ok: true }
      },
      addTurma: (input) => setTurmas((prev) => [{ id: newId("t"), ...input }, ...prev]),
      updateTurma: (id, input) =>
        setTurmas((prev) => prev.map((t) => (t.id === id ? { ...t, ...input } : t))),
      removeTurma: (id) => setTurmas((prev) => prev.filter((t) => t.id !== id)),
    }),
    [salas, professores, turmas, conflitos, getSala, getProfessor],
  )

  return <ScheduleContext.Provider value={value}>{children}</ScheduleContext.Provider>
}

export function useSchedule() {
  const ctx = useContext(ScheduleContext)
  if (!ctx) throw new Error("useSchedule deve ser usado dentro de <ScheduleProvider>")
  return ctx
}
