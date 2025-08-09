"use client"

import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

type Theme = "light" | "dark"
const THEME_KEY = "theme"

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light")

  // Initialize from localStorage or prefers-color-scheme
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(THEME_KEY) as Theme | null
      if (saved === "dark" || saved === "light") {
        applyTheme(saved)
        return
      }
      // fallback to system
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      applyTheme(prefersDark ? "dark" : "light")
    } catch {
      applyTheme("light")
    }
  }, [])

  const applyTheme = (t: Theme) => {
    setTheme(t)
    if (typeof document !== "undefined") {
      const root = document.documentElement
      if (t === "dark") root.classList.add("dark")
      else root.classList.remove("dark")
    }
    try {
      window.localStorage.setItem(THEME_KEY, t)
    } catch {}
  }

  const toggle = () => applyTheme(theme === "dark" ? "light" : "dark")

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
      className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white px-3 py-1.5 text-sm font-medium text-cyan-700 hover:bg-cyan-50 active:scale-95 transition-all dark:bg-gray-900 dark:border-cyan-800 dark:text-cyan-300 dark:hover:bg-gray-800"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="hidden sm:inline">{theme === "dark" ? "Terang" : "Gelap"}</span>
    </button>
  )
}
