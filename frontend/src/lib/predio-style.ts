import type { Predio } from "@/lib/constants"

/** Classes Tailwind literais (precisam aparecer inteiras para o Tailwind gerar o CSS). */
export const PREDIO_STYLES: Record<
  Predio,
  { soft: string; fg: string; borderL: string }
> = {
  Central: {
    soft: "bg-predio-central-soft",
    fg: "text-predio-central",
    borderL: "border-l-predio-central",
  },
  Anexo: {
    soft: "bg-predio-anexo-soft",
    fg: "text-predio-anexo",
    borderL: "border-l-predio-anexo",
  },
  "Anexo 02": {
    soft: "bg-predio-anexo2-soft",
    fg: "text-predio-anexo2",
    borderL: "border-l-predio-anexo2",
  },
  Virtual: {
    soft: "bg-predio-virtual-soft",
    fg: "text-predio-virtual",
    borderL: "border-l-predio-virtual",
  },
}

export const predioStyle = (p?: Predio) => PREDIO_STYLES[p ?? "Virtual"]
