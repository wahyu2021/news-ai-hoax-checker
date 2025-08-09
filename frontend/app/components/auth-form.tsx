"use client"

import type React from "react"

import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useState } from "react"
import { login, register } from "../lib/api"

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
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">{mode === "login" ? "Masuk Akun" : "Buat Akun Baru"}</h2>
        <p className="text-gray-600">Akses analisis berita dengan akun Anda.</p>
      </div>

      {/* Tabs sederhana */}
      <div className="mb-4 grid grid-cols-2 gap-2 rounded-lg bg-gray-100 p-1">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`${mode === "login" ? "bg-white shadow-sm" : "bg-transparent"} rounded-md px-3 py-2 text-sm font-medium text-gray-800`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setMode("register")}
          className={`${mode === "register" ? "bg-white shadow-sm" : "bg-transparent"} rounded-md px-3 py-2 text-sm font-medium text-gray-800`}
        >
          Daftar
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" aria-live="polite">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
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
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
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
              className="block w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="button"
              aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {mode === "register" ? (
            <p className="text-xs text-gray-500">Gunakan password yang kuat untuk keamanan akun Anda.</p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {loading ? "Memproses..." : mode === "login" ? "Login" : "Daftar"}
        </button>

        {error && (
          <div role="alert" className="rounded-md border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
            <div className="font-medium">Gagal</div>
            <div>{error}</div>
          </div>
        )}
        {info && (
          <div
            role="status"
            className="rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900"
          >
            <div className="font-medium">Informasi</div>
            <div>{info}</div>
          </div>
        )}
      </form>
    </div>
  )
}
