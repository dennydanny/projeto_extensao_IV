import { useMemo } from "react"
import { AlertTriangle, Building2, CalendarDays, Check, ChevronRight, Clock, Plus, Users } from "lucide-react"
import { ClassCard } from "@/components/schedule/class-card"
import { CalendarWidget } from "@/components/schedule/calendar-widget"
import { PageHeader } from "@/components/layout/page-header"
import { EmptyState } from "@/components/shared/empty-state"
import { Panel } from "@/components/shared/panel"
import { StatCard } from "@/components/shared/stat-card"
import { Button } from "@/components/ui/button"
import { useSchedule } from "@/context/schedule-context"
import { useNow } from "@/hooks/use-now"
import { DIAS_CURTO } from "@/lib/constants"
import { formatDateLong, sortByStart, timeToMin, todayDia } from "@/lib/schedule"
import type { CadastroTab, TabId } from "@/lib/types"

interface PainelPageProps {
  onNavigate: (tab: TabId, cadastroTab?: CadastroTab) => void
}

export function PainelPage({ onNavigate }: PainelPageProps) {
  const { turmas, salas, professores, conflitos, getSala } = useSchedule()
  const now = useNow()
  const hoje = todayDia(now)
  const nowMin = now.getHours() * 60 + now.getMinutes()

  const aulasHoje = useMemo(
    () => (hoje ? sortByStart(turmas.filter((t) => t.dia === hoje)) : []),
    [turmas, hoje],
  )
  const proximas = aulasHoje.filter((t) => !t.fim || timeToMin(t.fim) >= nowMin).slice(0, 5)
  const salasFisicas = salas.filter((s) => s.tipo !== "online")
  const salasEmUso = new Set(
    aulasHoje.filter((t) => getSala(t.salaId)?.tipo !== "online").map((t) => t.salaId),
  ).size
  const conflitantes = turmas.filter((t) => conflitos.has(t.id))

  return (
    <div>
      <PageHeader title="Painel" description={formatDateLong(now)} />

      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard icon={Clock} label="Turmas hoje" value={aulasHoje.length} tone="primary" />
        <StatCard icon={Building2} label="Salas em uso hoje" value={`${salasEmUso}/${salasFisicas.length}`} tone="teal" />
        <StatCard
          icon={conflitos.size ? AlertTriangle : Check}
          label="Turmas em conflito"
          value={conflitos.size}
          tone={conflitos.size ? "danger" : "success"}
        />
        <StatCard icon={Users} label="Professores ativos" value={professores.length} tone="violet" />
      </div>

      <div className="mb-5">
        <CalendarWidget />
      </div>

      <div className="grid gap-5 lg:grid-cols-5">
        <Panel className="lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Próximas aulas de hoje</h2>
            <Button variant="link" size="sm" className="h-auto p-0 text-xs" onClick={() => onNavigate("hoje")}>
              Ver agenda <ChevronRight className="size-3.5" />
            </Button>
          </div>
          {proximas.length === 0 ? (
            <EmptyState
              icon={CalendarDays}
              title={aulasHoje.length ? "As aulas de hoje já terminaram" : "Sem aulas previstas para hoje"}
              description="Aproveite para revisar cadastros ou planejar a próxima semana."
            />
          ) : (
            <div className="flex flex-col gap-2.5">
              {proximas.map((t) => (
                <ClassCard key={t.id} turma={t} conflito={conflitos.has(t.id)} compact />
              ))}
            </div>
          )}
        </Panel>

        <Panel className="h-fit lg:col-span-2">
          <h2 className="mb-4 text-sm font-semibold">Conflitos para revisar</h2>
          {conflitantes.length === 0 ? (
            <div className="flex items-center gap-3 rounded-xl bg-success-soft p-4 text-success">
              <Check className="size-[18px] shrink-0" />
              <p className="text-sm">Nenhum conflito de sala ou horário na grade atual.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {conflitantes.slice(0, 6).map((t) => (
                <div key={t.id} className="rounded-xl bg-destructive-soft p-3">
                  <p className="text-sm font-medium text-destructive">{t.disciplina}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {DIAS_CURTO[t.dia]} · {t.inicio}–{t.fim} · {getSala(t.salaId)?.nome}
                  </p>
                </div>
              ))}
            </div>
          )}
          <Button variant="outline" className="mt-4 w-full" onClick={() => onNavigate("cadastro", "turmas")}>
            <Plus /> Cadastrar nova turma
          </Button>
        </Panel>
      </div>
    </div>
  )
}
