import { useMemo } from "react"
import { Panel } from "@/components/shared/panel"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useSchedule } from "@/context/schedule-context"
import { DIAS, FAIXAS } from "@/lib/constants"
import { faixaOf, sortByStart } from "@/lib/schedule"
import { predioStyle } from "@/lib/predio-style"
import { cn } from "@/lib/utils"

/** Grade semanal em tabela: faixas de horário × dias da semana (desktop). */
export function WeekMatrix() {
  const { turmas, getSala, getProfessor, conflitos } = useSchedule()

  const rows = useMemo(
    () =>
      FAIXAS.map((faixa) => ({
        faixa,
        cells: DIAS.map((dia) =>
          sortByStart(turmas.filter((t) => t.dia === dia && faixaOf(t) === faixa.id)),
        ),
      })).filter((r) => r.cells.some((c) => c.length > 0)),
    [turmas],
  )

  return (
    <Panel padded={false}>
      <Table className="min-w-[960px]">
        <TableHeader>
          <TableRow className="bg-muted/60 hover:bg-muted/60">
            <TableHead className="w-40 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Faixa
            </TableHead>
            {DIAS.map((dia) => (
              <TableHead key={dia} className="border-l text-xs font-semibold text-foreground">
                {dia}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(({ faixa, cells }) => (
            <TableRow key={faixa.id} className="align-top hover:bg-transparent">
              <TableCell className="bg-muted/60 px-4 py-3 align-top">
                <p className="text-sm font-medium">{faixa.label}</p>
                <p className="text-xs text-muted-foreground">{faixa.sub}</p>
              </TableCell>
              {cells.map((list, i) => (
                <TableCell key={DIAS[i]} className="border-l p-2.5 align-top whitespace-normal">
                  <div className="flex min-w-[170px] flex-col gap-2">
                    {list.map((t) => {
                      const sala = getSala(t.salaId)
                      const prof = getProfessor(t.professorId)
                      const ps = predioStyle(sala?.predio)
                      const conflito = conflitos.has(t.id)
                      return (
                        <div
                          key={t.id}
                          className={cn(
                            "rounded-lg px-2.5 py-2",
                            conflito ? "bg-destructive-soft text-destructive" : cn(ps.soft, ps.fg),
                          )}
                        >
                          <p className="text-xs leading-snug font-semibold">{t.disciplina}</p>
                          <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{prof?.nome}</p>
                          <p className="text-[11px] text-muted-foreground/80">
                            {sala?.nome ?? "Online"}
                            {t.inicio ? ` · ${t.inicio}–${t.fim}` : " · assíncrona"}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Panel>
  )
}
