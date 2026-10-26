import { CalendarDays, ClipboardList, Clock, LayoutDashboard, type LucideIcon } from "lucide-react"
import type { TabId } from "@/lib/types"

export const NAV_ITEMS: { id: TabId; label: string; icon: LucideIcon }[] = [
  { id: "painel", label: "Painel", icon: LayoutDashboard },
  { id: "semana", label: "Semana", icon: CalendarDays },
  { id: "hoje", label: "Hoje", icon: Clock },
  { id: "cadastro", label: "Cadastro", icon: ClipboardList },
]
