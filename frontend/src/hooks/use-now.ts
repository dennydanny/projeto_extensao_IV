import { useEffect, useState } from "react"

/** Data/hora atual, atualizada a cada minuto (linha "agora" e aulas em andamento). */
export function useNow(intervalMs = 60_000) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
  return now
}
