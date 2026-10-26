export const DIAS = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
] as const
export type Dia = (typeof DIAS)[number]

export const DIAS_CURTO: Record<Dia, string> = {
  "Segunda-feira": "Seg",
  "Terça-feira": "Ter",
  "Quarta-feira": "Qua",
  "Quinta-feira": "Qui",
  "Sexta-feira": "Sex",
  Sábado: "Sáb",
}

export const PREDIOS = ["Central", "Anexo", "Anexo 02", "Virtual"] as const
export type Predio = (typeof PREDIOS)[number]

export const ANDARES = ["Térreo", "1º Piso", "2º Piso", "—"] as const
export type Andar = (typeof ANDARES)[number]

export const FORMATOS = ["Presencial", "Híbrida", "Síncrona", "Assíncrona"] as const
export type Formato = (typeof FORMATOS)[number]

export const TIPOS_SALA = [
  { id: "sala", label: "Sala de aula" },
  { id: "laboratorio", label: "Laboratório" },
  { id: "online", label: "Ambiente virtual" },
] as const
export type TipoSala = (typeof TIPOS_SALA)[number]["id"]

export const FAIXAS = [
  { id: "matutino", label: "Matutino", sub: "até 11:59" },
  { id: "vespertino", label: "Vespertino", sub: "12:00 – 17:59" },
  { id: "noturno", label: "Noturno", sub: "a partir das 18:00" },
  { id: "assincrono", label: "Sem horário fixo", sub: "aulas assíncronas" },
] as const
export type FaixaId = (typeof FAIXAS)[number]["id"]

/** Grade do calendário (eixo de horas) */
export const HOUR_START = 7
export const HOUR_END = 22
export const HOUR_H = 52 // px por hora
export const GRID_HEIGHT = (HOUR_END - HOUR_START) * HOUR_H
