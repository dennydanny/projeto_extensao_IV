import type { CSSProperties } from "react"
import { Toaster } from "sonner"
import { useTheme } from "@/components/theme-provider"

/** Sonner ligado ao tema do app (não depende do next-themes). */
export function AppToaster() {
  const { theme } = useTheme()
  return (
    <Toaster
      theme={theme}
      position="top-center"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as CSSProperties
      }
    />
  )
}
