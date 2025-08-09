"use client"

import { useEffect, useMemo, useState } from "react"
import { LogOut } from "lucide-react"
import { AuthForm } from "./components/auth-form"
import { AnalyzerForm } from "./components/analyzer-form"
import { AnalysisResultCard } from "./components/analysis-result"
import { PageHeader } from "./components/page-header"
import { Appear } from "./components/appear"
import { ThemeToggle } from "./components/theme-toggle"
import { HistoryList, type HistoryItem } from "./components/history-list"
import type { AnalysisResult } from "./types"

const HISTORY_KEY = "analysis_history"
const TOKEN_KEY = "auth_token"
const HISTORY_LIMIT = 12

export default function Page() {
  const [token, setToken] = useState<string | null>(null)
  const [lastResult, setLastResult] = useState<AnalysisResult | null>(null)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [prefill, setPrefill] = useState<string>("")

  // Restore token and history on mount
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(TOKEN_KEY)
      if (saved) setToken(saved)
    } catch {}
    try {
      const raw = window.localStorage.getItem(HISTORY_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as HistoryItem[]
        setHistory(parsed)
      }
    } catch {}
  }, [])

  // Persist history when changed
  useEffect(() => {
    try {
      window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
    } catch {}
  }, [history])

  const handleLoginSuccess = (newToken: string) => {
    setToken(newToken)
    try {
      window.localStorage.setItem(TOKEN_KEY, newToken)
    } catch {}
  }

  const handleLogout = () => {
    setToken(null)
    setLastResult(null)
    try {
      window.localStorage.removeItem(TOKEN_KEY)
    } catch {}
  }

  const handleAnalyzed = (ctx: { result: AnalysisResult; input: string; isUrl: boolean }) => {
    setLastResult(ctx.result)
    const item: HistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: Date.now(),
      input: ctx.input,
      isUrl: ctx.isUrl,
      result: ctx.result,
    }
    setHistory((prev) => {
      const next = [item, ...prev].slice(0, HISTORY_LIMIT)
      return next
    })
  }

  const clearHistory = () => setHistory([])
  const hasHistory = useMemo(() => history.length > 0, [history])

  return (
    <main className="min-h-dvh bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors">
      <div className="container mx-auto px-4 max-w-5xl flex items-center justify-end py-3">
        <ThemeToggle />
      </div>

      <PageHeader />

      <section className="container mx-auto px-4 py-6 sm:py-10 max-w-5xl">
        {!token ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Appear delay={0.05}>
              <div className="rounded-2xl border border-cyan-100 bg-white p-6 sm:p-8 shadow-[0_6px_30px_-15px_rgba(14,165,233,0.35)] ring-1 ring-transparent hover:ring-cyan-200 transition-all duration-300 dark:bg-gray-900 dark:border-gray-800 dark:hover:ring-cyan-700/40">
                <AuthForm onLoginSuccess={handleLoginSuccess} />
              </div>
            </Appear>

            <Appear delay={0.1}>
              <div className="rounded-2xl border border-cyan-100 bg-white p-6 sm:p-8 shadow-[0_6px_30px_-15px_rgba(14,165,233,0.35)] ring-1 ring-transparent hover:ring-cyan-200 transition-all duration-300 dark:bg-gray-900 dark:border-gray-800 dark:hover:ring-cyan-700/40">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Tentang AI News Analyzer</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                    <li>Registrasi atau login untuk mulai menggunakan.</li>
                    <li>Tempel teks artikel atau link berita untuk dianalisis.</li>
                    <li>Dapatkan ringkasan dan deteksi status Valid/Hoaks.</li>
                    <li>Lihat skor kepercayaan dan salin hasil dengan cepat.</li>
                  </ul>
                  <div className="rounded-lg bg-cyan-50 text-cyan-900 p-4 text-sm dark:bg-cyan-900/30 dark:text-cyan-300">
                    Tip: Atur NEXT_PUBLIC_API_BASE untuk mengubah alamat server API Anda (default:{" "}
                    {"http://localhost:8000"}).
                  </div>
                </div>
              </div>
            </Appear>
          </div>
        ) : (
          <div className="space-y-6">
            <Appear>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Analisis Berita</h2>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center rounded-md border border-sky-200 bg-white px-3 py-2 text-sm font-medium text-sky-700 hover:bg-sky-50 hover:text-sky-800 active:scale-[0.98] transition-all dark:bg-gray-900 dark:text-sky-300 dark:border-sky-800 dark:hover:bg-gray-800"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Keluar
                </button>
              </div>
            </Appear>

            <Appear delay={0.05}>
              <div className="rounded-2xl border border-cyan-100 bg-white p-6 sm:p-8 shadow-[0_6px_30px_-15px_rgba(14,165,233,0.35)] ring-1 ring-transparent hover:ring-cyan-200 transition-all duration-300 dark:bg-gray-900 dark:border-gray-800 dark:hover:ring-cyan-700/40">
                <AnalyzerForm
                  token={token}
                  prefill={prefill}
                  onAnalyzed={(ctx) => {
                    handleAnalyzed(ctx)
                    // After using a history item, clear prefill so user can continue editing freely
                    setPrefill("")
                  }}
                />
              </div>
            </Appear>

            {lastResult ? (
              <Appear delay={0.06}>
                <AnalysisResultCard result={lastResult} />
              </Appear>
            ) : (
              <Appear delay={0.06}>
                <div className="rounded-2xl border border-cyan-100 bg-white p-6 sm:p-8 shadow-[0_6px_30px_-15px_rgba(14,165,233,0.35)] dark:bg-gray-900 dark:border-gray-800">
                  <p className="text-gray-600 dark:text-gray-300">
                    Masukkan teks berita atau URL di atas, lalu klik {'"Analisis Sekarang"'} untuk melihat hasil.
                  </p>
                </div>
              </Appear>
            )}

            {/* Riwayat Analisis */}
            <Appear delay={0.08}>
              <div className="rounded-2xl border border-cyan-100 bg-white p-6 sm:p-8 shadow-[0_6px_30px_-15px_rgba(14,165,233,0.35)] dark:bg-gray-900 dark:border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Riwayat Analisis</h3>
                  <button
                    type="button"
                    onClick={clearHistory}
                    disabled={!hasHistory}
                    className="text-sm rounded-md border px-3 py-1.5 border-cyan-200 text-cyan-700 hover:bg-cyan-50 disabled:opacity-50 dark:border-cyan-800 dark:text-cyan-300 dark:hover:bg-gray-800"
                  >
                    Bersihkan Riwayat
                  </button>
                </div>
                <HistoryList
                  items={history}
                  onSelect={(item) => {
                    setPrefill(item.input)
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                />
              </div>
            </Appear>
          </div>
        )}
      </section>
    </main>
  )
}
