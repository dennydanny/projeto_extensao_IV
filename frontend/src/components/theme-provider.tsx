import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type Theme = "dark" | "light" | "system"

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue>({ theme: "system", setTheme: () => {} })

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

/** Tema claro/escuro no padrão do shadcn/ui (classe `.dark` no <html>). */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "engetec-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme | null) ?? defaultTheme,
  )

 
useEffect(() => {
  const root = document.documentElement
  const media = window.matchMedia("(prefers-color-scheme: dark)")

  const apply = () => {
    const dark =
      theme === "dark" || (theme === "system" && media.matches)

    root.classList.toggle("dark", dark)

    console.log(
      "Tema selecionado:",
      theme,
      "| Classe dark:",
      root.classList.contains("dark"),
    )
  }

  apply()

  if (theme === "system") {
    media.addEventListener("change", apply)
    return () => media.removeEventListener("change", apply)
  }
}, [theme])


  const setTheme = (next: Theme) => {
    localStorage.setItem(storageKey, next)
    setThemeState(next)
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
