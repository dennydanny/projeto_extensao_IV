import { HOUR_END, HOUR_H, HOUR_START } from "@/lib/constants"

export function HourLines() {
  return (
    <>
      {Array.from({ length: HOUR_END - HOUR_START }, (_, i) => (
        <div
          key={i}
          className="absolute inset-x-0 border-t border-border/60"
          style={{ top: i * HOUR_H }}
          aria-hidden
        />
      ))}
    </>
  )
}
