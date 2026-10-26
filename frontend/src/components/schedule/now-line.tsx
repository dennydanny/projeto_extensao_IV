/** Linha do horário atual no calendário. */
export function NowLine({ top }: { top: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 z-10 flex items-center"
      style={{ top }}
      aria-hidden
    >
      <span className="-ml-0.5 size-1.5 rounded-full bg-gold" />
      <span className="h-px flex-1 bg-gold" />
    </div>
  )
}
