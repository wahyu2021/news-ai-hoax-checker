"use client"

import { useEffect, useState } from "react"
import { LogOut } from "lucide-react"
import { AuthForm } from "./components/auth-form"
import { AnalyzerForm } from "./components/analyzer-form"
import { AnalysisResultCard } from "./components/analysis-result"
import { PageHeader } from "./components/page-header"
import type { AnalysisResult } from "./types"

export default function Page() {
  const [token, setToken] = useState<string | null>(null)
  const [lastResult, setLastResult] = useState<AnalysisResult | null>(null)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("auth_token")
      if (saved) setToken(saved)
    } catch {}
  }, [])

  const handleLoginSuccess = (newToken: string) => {
    setToken(newToken)
    try {
      window.localStorage.setItem("auth_token", newToken)
    } catch {}
  }

  const handleLogout = () => {
    setToken(null)
    setLastResult(null)
    try {
      window.localStorage.removeItem("auth_token")
    } catch {}
  }

  return (
    <main className="min-h-dvh bg-white">
      <PageHeader />

      <section className="container mx-auto px-4 py-6 sm:py-10 max-w-5xl">
        {!token ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
              <AuthForm onLoginSuccess={handleLoginSuccess} />
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">Tentang AI News Analyzer</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Registrasi atau login untuk mulai menggunakan.</li>
                  <li>Tempel teks artikel atau link berita untuk dianalisis.</li>
                  <li>Dapatkan ringkasan dan deteksi status Valid/Hoaks.</li>
                  <li>Lihat skor kepercayaan dan salin hasil dengan cepat.</li>
                </ul>
                <div className="rounded-lg bg-emerald-50 text-emerald-900 p-4 text-sm">
                  Tip: Atur NEXT_PUBLIC_API_BASE untuk mengubah alamat server API Anda (default:{" "}
                  {"http://localhost:8000"}).
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">Analisis Berita</h2>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center rounded-md border border-rose-200 bg-white px-3 py-2 text-sm font-medium text-rose-700 hover:bg-rose-50 hover:text-rose-800"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Keluar
              </button>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
              <AnalyzerForm token={token} onResult={(res) => setLastResult(res)} />
            </div>

            {lastResult ? (
              <AnalysisResultCard result={lastResult} />
            ) : (
              <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                <p className="text-gray-600">
                  Masukkan teks berita atau URL di atas, lalu klik {'"Analisis Sekarang"'} untuk melihat hasil.
                </p>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  )
}

