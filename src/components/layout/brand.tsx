import { GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"

export function Brand({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground",
          compact ? "size-8" : "size-9",
        )}
      >
        <GraduationCap className={compact ? "size-4" : "size-5"} />
      </div>
      <div className="min-w-0">
        <p className={cn("truncate font-serif font-semibold leading-tight", compact && "text-sm")}>
          Engetec
        </p>
        <p
          className={cn(
            "truncate leading-tight text-muted-foreground",
            compact ? "text-[11px]" : "text-xs",
          )}
        >
          Painel de horários
        </p>
      </div>
    </div>
  )
}
