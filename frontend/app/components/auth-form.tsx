"use client"

import type React from "react"

import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useMemo, useState } from "react"
import { login, register } from "../lib/api"
import { Appear } from "./appear"

type Props = {
  onLoginSuccess?: (token: string) => void
}

export function AuthForm({ onLoginSuccess = () => {} }: Props) {
  const [mode, setMode] = useState<"login" | "register">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [info, setInfo] = useState<string | null>(null)

  const indicatorX = useMemo(() => (mode === "login" ? "translateX(0%)" : "translateX(100%)"), [mode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setInfo(null)
    setLoading(true)
    try {
      if (mode === "register") {
        await register({ email, password })
        setInfo("Registrasi berhasil! Silakan login menggunakan kredensial Anda.")
        setMode("login")
      } else {
        const token = await login({ email, password })
        onLoginSuccess(token)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Appear>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {mode === "login" ? "Masuk Akun" : "Buat Akun Baru"}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">Akses analisis berita dengan akun Anda.</p>
        </div>
      </Appear>

      {/* Tabs kustom dengan indikator geser */}
      <Appear delay={0.03}>
        <div className="mb-5 relative rounded-xl bg-sky-50 p-1 border border-sky-100 dark:bg-gray-800 dark:border-gray-700">
          <span
            className="absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] rounded-lg bg-white shadow-sm transition-transform duration-300 dark:bg-gray-900"
            style={{ transform: indicatorX }}
            aria-hidden="true"
          />
          <div className="grid grid-cols-2 gap-2 relative">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`z-10 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                mode === "login"
                  ? "text-cyan-700 dark:text-cyan-300"
                  : "text-gray-600 hover:text-gray-800 dark:text-gray-300"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`z-10 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                mode === "register"
                  ? "text-cyan-700 dark:text-cyan-300"
                  : "text-gray-600 hover:text-gray-800 dark:text-gray-300"
              }`}
            >
              Daftar
            </button>
          </div>
        </div>
      </Appear>

      <form onSubmit={handleSubmit} className="space-y-4" aria-live="polite">
        <Appear delay={0.04}>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
          </div>
        </Appear>

        <Appear delay={0.06}>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={mode === "register" ? "Minimal 8 karakter" : "********"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={mode === "register" ? 8 : undefined}
                autoComplete={mode === "register" ? "new-password" : "current-password"}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              />
              <button
                type="button"
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 active:scale-95 transition dark:text-gray-400 dark:hover:text-gray-200"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {mode === "register" ? (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Gunakan password yang kuat untuk keamanan akun Anda.
              </p>
            ) : null}
          </div>
        </Appear>

        <Appear delay={0.08}>
          <button
            type="submit"
            disabled={loading}
            className="group inline-flex w-full items-center justify-center rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_-10px_rgba(8,145,178,0.7)] hover:bg-cyan-700 active:scale-[0.98] transition-all disabled:opacity-60 dark:bg-cyan-500 dark:hover:bg-cyan-400"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {loading ? "Memproses..." : mode === "login" ? "Login" : "Daftar"}
          </button>
        </Appear>

        <Appear delay={0.1}>
          {error && (
            <div
              role="alert"
              className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-300"
            >
              <div className="font-medium">Gagal</div>
              <div>{error}</div>
            </div>
          )}
          {info && (
            <div
              role="status"
              className="rounded-lg border border-cyan-200 bg-cyan-50 p-3 text-sm text-cyan-900 dark:border-cyan-900 dark:bg-cyan-950/40 dark:text-cyan-300"
            >
              <div className="font-medium">Informasi</div>
              <div>{info}</div>
            </div>
          )}
        </Appear>
      </form>
    </div>
  )
}
