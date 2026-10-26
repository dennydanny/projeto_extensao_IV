import type { Andar, Dia, Formato, Predio, TipoSala } from "@/lib/constants"

export interface Sala {
  id: string
  nome: string
  tipo: TipoSala
  predio: Predio
  andar: Andar
  capacidade: number
}

export interface Professor {
  id: string
  nome: string
  email: string
  disciplinas: string[]
}

export interface Turma {
  id: string
  curso: string
  periodo: string
  disciplina: string
  professorId: string
  salaId: string
  dia: Dia
  /** "HH:mm" — null quando a aula é assíncrona (sem horário fixo) */
  inicio: string | null
  fim: string | null
  formato: Formato
}

export type SalaInput = Omit<Sala, "id">
export type ProfessorInput = Omit<Professor, "id">
export type TurmaInput = Omit<Turma, "id">

export type TabId = "painel" | "semana" | "hoje" | "cadastro"
export type CadastroTab = "salas" | "professores" | "turmas"
