import type { LucideIcon } from "lucide-react"
import { Panel } from "@/components/shared/panel"
import { cn } from "@/lib/utils"

const TONES = {
  primary: "bg-primary-soft text-primary",
  teal: "bg-predio-anexo-soft text-predio-anexo",
  violet: "bg-predio-anexo2-soft text-predio-anexo2",
  success: "bg-success-soft text-success",
  danger: "bg-destructive-soft text-destructive",
} as const

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  tone?: keyof typeof TONES
}

export function StatCard({ icon: Icon, label, value, tone = "primary" }: StatCardProps) {
  return (
    <Panel bodyClassName="p-4">
      <div className={cn("mb-3 flex size-9 items-center justify-center rounded-lg", TONES[tone])}>
        <Icon className="size-[18px]" />
      </div>
      <p className="font-serif text-2xl font-semibold">{value}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
    </Panel>
  )
}
