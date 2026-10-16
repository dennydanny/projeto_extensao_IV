import {
  DIAS,
  HOUR_END,
  HOUR_H,
  HOUR_START,
  type Dia,
  type FaixaId,
} from "@/lib/constants"
import type { Sala, Turma } from "@/lib/types"

type TimedTurma = Turma & { inicio: string; fim: string }

export function hasTime(t: Turma): t is TimedTurma {
  return Boolean(t.inicio && t.fim)
}

export function timeToMin(t: string): number {
  const [h, m] = t.split(":").map(Number)
  return h * 60 + m
}

export function overlaps(aIni: string, aFim: string, bIni: string, bFim: string) {
  return timeToMin(aIni) < timeToMin(bFim) && timeToMin(bIni) < timeToMin(aFim)
}

export function sortByStart(turmas: Turma[]): Turma[] {
  return [...turmas].sort((a, b) =>
    (a.inicio ?? "99:99").localeCompare(b.inicio ?? "99:99"),
  )
}

/** IDs das turmas que disputam a mesma sala, no mesmo dia e horário. Ambientes virtuais são ignorados. */
export function detectConflicts(turmas: Turma[], salas: Sala[]): Set<string> {
  const virtuais = new Set(salas.filter((s) => s.tipo === "online").map((s) => s.id))
  const timed = turmas.filter(hasTime).filter((t) => !virtuais.has(t.salaId))
  const out = new Set<string>()
  for (let i = 0; i < timed.length; i++) {
    for (let j = i + 1; j < timed.length; j++) {
      const a = timed[i]
      const b = timed[j]
      if (
        a.salaId === b.salaId &&
        a.dia === b.dia &&
        overlaps(a.inicio, a.fim, b.inicio, b.fim)
      ) {
        out.add(a.id)
        out.add(b.id)
      }
    }
  }
  return out
}

/** Salas já ocupadas num dia/horário (para avisar no cadastro de turma). */
export function salasOcupadas(
  turmas: Turma[],
  salas: Sala[],
  q: { dia: Dia; inicio: string; fim: string; ignoreId?: string | null },
): Set<string> {
  const virtuais = new Set(salas.filter((s) => s.tipo === "online").map((s) => s.id))
  const out = new Set<string>()
  for (const t of turmas.filter(hasTime)) {
    if (t.id === q.ignoreId || t.dia !== q.dia || virtuais.has(t.salaId)) continue
    if (overlaps(t.inicio, t.fim, q.inicio, q.fim)) out.add(t.salaId)
  }
  return out
}

/* ------------------------------- datas -------------------------------- */

export function todayDia(ref = new Date()): Dia | null {
  const i = ref.getDay()
  return i === 0 ? null : DIAS[i - 1]
}

/** Segunda a sábado da semana de referência (aos domingos, mostra a próxima semana). */
export function getWeekDates(ref = new Date()): Date[] {
  const monday = new Date(ref)
  monday.setHours(0, 0, 0, 0)
  const dow = monday.getDay()
  monday.setDate(monday.getDate() + (dow === 0 ? 1 : 1 - dow))
  return DIAS.map((_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return d
  })
}

export const sameDate = (a: Date, b: Date) => a.toDateString() === b.toDateString()

export function formatDateLong(d: Date): string {
  const s = d.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" })
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function formatWeekRange(dates: Date[]): string {
  const a = dates[0]
  const b = dates[dates.length - 1]
  const month = (d: Date, style: "long" | "short") =>
    d.toLocaleDateString("pt-BR", { month: style }).replace(".", "")
  return a.getMonth() === b.getMonth()
    ? `${a.getDate()} – ${b.getDate()} de ${month(b, "long")}`
    : `${a.getDate()} de ${month(a, "short")} – ${b.getDate()} de ${month(b, "short")}`
}

export function formatDayLabel(dia: Dia, d: Date): string {
  return `${dia}, ${d.getDate()} de ${d.toLocaleDateString("pt-BR", { month: "long" })}`
}

/* ------------------------- posição no calendário ----------------------- */

export const minutesToTop = (min: number) => ((min - HOUR_START * 60) / 60) * HOUR_H

export function nowOffset(ref: Date): number | null {
  const min = ref.getHours() * 60 + ref.getMinutes()
  if (min < HOUR_START * 60 || min > HOUR_END * 60) return null
  return minutesToTop(min)
}

export function faixaOf(t: Turma): FaixaId {
  if (!t.inicio) return "assincrono"
  const m = timeToMin(t.inicio)
  if (m < 12 * 60) return "matutino"
  if (m < 18 * 60) return "vespertino"
  return "noturno"
}

/* ----------------- aulas simultâneas lado a lado (estilo Google Agenda) ----------------- */

interface Laid {
  turma: TimedTurma
  col: number
  cols: number
  cluster: number
}

function layoutEvents(turmas: Turma[]): Laid[] {
  const sorted = turmas
    .filter(hasTime)
    .sort(
      (a, b) =>
        timeToMin(a.inicio) - timeToMin(b.inicio) || timeToMin(a.fim) - timeToMin(b.fim),
    )
  const result: Laid[] = []
  let cluster: TimedTurma[] = []
  let clusterEnd = -1
  let clusterIdx = 0

  const flush = () => {
    if (!cluster.length) return
    const colEnds: number[] = []
    const placed = cluster.map((turma) => {
      const start = timeToMin(turma.inicio)
      let col = colEnds.findIndex((end) => end <= start)
      if (col === -1) {
        col = colEnds.length
        colEnds.push(timeToMin(turma.fim))
      } else {
        colEnds[col] = timeToMin(turma.fim)
      }
      return { turma, col }
    })
    placed.forEach((p) =>
      result.push({ turma: p.turma, col: p.col, cols: colEnds.length, cluster: clusterIdx }),
    )
    clusterIdx++
    cluster = []
  }

  for (const t of sorted) {
    const start = timeToMin(t.inicio)
    if (!cluster.length || start < clusterEnd) {
      cluster.push(t)
      clusterEnd = Math.max(clusterEnd, timeToMin(t.fim))
    } else {
      flush()
      cluster.push(t)
      clusterEnd = timeToMin(t.fim)
    }
  }
  flush()
  return result
}

interface PackedBase {
  start: number
  end: number
  col: number
  cols: number
  /** todas as turmas do mesmo bloco de horário (para o diálogo "ver todas") */
  group: Turma[]
}
export type PackedItem =
  | (PackedBase & { kind: "event"; turma: Turma })
  | (PackedBase & { kind: "overflow"; count: number })

/** Limita as colunas visíveis; o excedente vira um bloco "+N". */
export function packForDisplay(turmas: Turma[], maxCols: number): PackedItem[] {
  const byCluster = new Map<number, Laid[]>()
  for (const l of layoutEvents(turmas)) {
    byCluster.set(l.cluster, [...(byCluster.get(l.cluster) ?? []), l])
  }

  const out: PackedItem[] = []
  for (const group of byCluster.values()) {
    const cols = group[0].cols
    const all = group.map((g) => g.turma)
    const toEvent = (g: Laid, c: number): PackedItem => ({
      kind: "event",
      turma: g.turma,
      start: timeToMin(g.turma.inicio),
      end: timeToMin(g.turma.fim),
      col: g.col,
      cols: c,
      group: all,
    })

    if (cols <= maxCols) {
      group.forEach((g) => out.push(toEvent(g, cols)))
      continue
    }
    group.filter((g) => g.col < maxCols - 1).forEach((g) => out.push(toEvent(g, maxCols)))
    const hidden = group.filter((g) => g.col >= maxCols - 1)
    out.push({
      kind: "overflow",
      count: hidden.length,
      start: Math.min(...hidden.map((h) => timeToMin(h.turma.inicio))),
      end: Math.max(...hidden.map((h) => timeToMin(h.turma.fim))),
      col: maxCols - 1,
      cols: maxCols,
      group: all,
    })
  }
  return out
}
