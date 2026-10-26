import type { CSSProperties } from "react"

interface OverflowBlockProps {
  count: number
  style: CSSProperties
  onClick: () => void
}

/** "+N" — resume as aulas simultâneas que não cabem nas colunas visíveis. */
export function OverflowBlock({ count, style, onClick }: OverflowBlockProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={style}
      aria-label={`Mais ${count} turmas neste horário. Ver todas`}
      className="absolute flex flex-col items-center justify-center gap-0.5 rounded-lg border border-dashed border-muted-foreground/50 bg-muted text-muted-foreground transition-transform hover:z-20 hover:scale-[1.02]"
    >
      <span className="text-xs font-semibold">+{count}</span>
      <span className="hidden text-[9px] leading-none sm:block">ver todas</span>
    </button>
  )
}
