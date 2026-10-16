import { HOUR_END, HOUR_H, HOUR_START } from "@/lib/constants"

/** Coluna de horas (fixa à esquerda ao rolar na horizontal). */
export function TimeAxis() {
  const hours = Array.from({ length: HOUR_END - HOUR_START + 1 }, (_, i) => HOUR_START + i)
  return (
    <div className="sticky left-0 z-10 w-12 shrink-0 bg-card" aria-hidden>
      {hours.map((h) => (
        <div key={h} className="relative" style={{ height: h === HOUR_END ? 0 : HOUR_H }}>
          <span className="absolute -top-2 right-1.5 text-[10px] text-muted-foreground">
            {String(h).padStart(2, "0")}:00
          </span>
        </div>
      ))}
    </div>
  )
}
