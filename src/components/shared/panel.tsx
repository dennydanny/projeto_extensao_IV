import type { ReactNode } from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PanelProps {
  children: ReactNode
  className?: string
  bodyClassName?: string
  /** `false` remove o padding interno (ex.: calendário, que vai até as bordas). */
  padded?: boolean
}

/** Card do shadcn com padding próprio e consistente (independe da versão do Card). */
export function Panel({ children, className, bodyClassName, padded = true }: PanelProps) {
  return (
    <Card className={cn("gap-0 overflow-hidden py-0 shadow-xs", className)}>
      <div className={cn(padded && "p-4 sm:p-5", bodyClassName)}>{children}</div>
    </Card>
  )
}
