import { Inbox } from "lucide-react"
import { DayList } from "@/components/schedule/day-list"
import { PageHeader } from "@/components/layout/page-header"
import { EmptyState } from "@/components/shared/empty-state"
import { Panel } from "@/components/shared/panel"
import { useNow } from "@/hooks/use-now"
import { formatDateLong, todayDia } from "@/lib/schedule"

export function HojePage() {
  const now = useNow()
  const hoje = todayDia(now)

  return (
    <div>
      <PageHeader title="Hoje" description={formatDateLong(now)} />
      {hoje ? (
        <DayList dia={hoje} now={now} />
      ) : (
        <Panel>
          <EmptyState
            icon={Inbox}
            title="Não há aulas cadastradas para domingo"
            description="A grade cobre de segunda a sábado."
          />
        </Panel>
      )}
    </div>
  )
}
