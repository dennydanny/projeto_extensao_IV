import { Building2, GraduationCap, User } from "lucide-react"
import { PageHeader } from "@/components/layout/page-header"
import { ProfessoresTab } from "@/components/cadastro/professores-tab"
import { SalasTab } from "@/components/cadastro/salas-tab"
import { TurmasTab } from "@/components/cadastro/turmas-tab"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSchedule } from "@/context/schedule-context"
import type { CadastroTab } from "@/lib/types"

interface CadastroPageProps {
  tab: CadastroTab
  onTabChange: (tab: CadastroTab) => void
}

export function CadastroPage({ tab, onTabChange }: CadastroPageProps) {
  const { conflitos } = useSchedule()

  return (
    <div>
      <PageHeader title="Cadastro" description="Gerencie salas, professores e turmas em um só lugar" />
      <Tabs value={tab} onValueChange={(v) => onTabChange(v as CadastroTab)}>
        <TabsList className="mb-5 h-auto w-full justify-start overflow-x-auto p-1 sm:w-fit">
          <TabsTrigger value="salas" className="gap-2 px-4 py-2">
            <Building2 className="size-4" /> Salas
          </TabsTrigger>
          <TabsTrigger value="professores" className="gap-2 px-4 py-2">
            <User className="size-4" /> Professores
          </TabsTrigger>
          <TabsTrigger value="turmas" className="gap-2 px-4 py-2">
            <GraduationCap className="size-4" /> Turmas
            {conflitos.size > 0 && (
              <Badge className="h-5 min-w-5 rounded-full bg-destructive px-1.5 text-[10px] text-primary-foreground">
                {conflitos.size}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="salas">
          <SalasTab />
        </TabsContent>
        <TabsContent value="professores">
          <ProfessoresTab />
        </TabsContent>
        <TabsContent value="turmas">
          <TurmasTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
