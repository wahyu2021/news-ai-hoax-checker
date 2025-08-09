"use client"

import type React from "react"

import { AlertCircle, Loader2, Stars } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { analyze } from "../lib/api"
import type { AnalysisResult } from "../types"
import { Appear } from "./appear"

type Props = {
  token?: string | null
  onAnalyzed?: (ctx: { result: AnalysisResult; input: string; isUrl: boolean }) => void
  prefill?: string
}

function looksLikeUrl(text: string) {
  if (!text) return false
  try {
    const u = new URL(text.trim())
    // pastikan hostname ada dan protocol http(s)
    return (u.protocol === "http:" || u.protocol === "https:") && !!u.hostname
  } catch {
    return false
  }
}

function validateInput(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return { valid: false, reason: "Input tidak boleh kosong." }
  const isUrl = looksLikeUrl(trimmed)
  if (isUrl) {
    // Validasi dasar URL
    if (trimmed.length < 12) return { valid: false, reason: "URL terlalu pendek." }
    return { valid: true, isUrl }
  }
  // Validasi teks: minimal panjang
  if (trimmed.length < 20) return { valid: false, reason: "Teks terlalu pendek. Masukkan minimal 20 karakter." }
  if (trimmed.length > 10000) return { valid: false, reason: "Teks terlalu panjang. Maksimal 10.000 karakter." }
  return { valid: true, isUrl }
}

export function AnalyzerForm({ token = null, onAnalyzed = () => {}, prefill = "" }: Props) {
  const [input, setInput] = useState(prefill)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // apply prefill changes from parent
  useEffect(() => {
    if (prefill) setInput(prefill)
  }, [prefill])

  const isUrl = useMemo(() => looksLikeUrl(input), [input])
  const validity = useMemo(() => validateInput(input), [input])

  const disabled = loading || !token || !validity.valid

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (disabled) return
    setError(null)
    setLoading(true)
    try {
      const payload = isUrl ? { url: input.trim(), text: null } : { text: input.trim(), url: null }
      const result = await analyze({ token: token as string, payload })
      onAnalyzed({ result, input: input.trim(), isUrl })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menganalisis berita.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-live="polite">
      <Appear>
        <div className="space-y-2">
          <label htmlFor="analysis-input" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Teks atau URL Berita
          </label>
          <textarea
            id="analysis-input"
            placeholder="Tempel teks artikel atau URL berita di sini..."
            className="min-h-44 w-full rounded-xl border border-gray-300 p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Stars className={`h-3.5 w-3.5 ${isUrl ? "text-sky-500" : "text-cyan-600"} animate-pulse`} />
            <span>
              {isUrl
                ? "Terdeteksi input berupa URL. Sistem akan mengambil konten dari halaman tersebut."
                : "Terdeteksi input berupa teks. Sistem akan menganalisis teks yang Anda masukkan."}
            </span>
          </div>
          {!validity.valid && input.trim().length > 0 ? (
            <div className="mt-1 inline-flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>{validity.reason}</span>
            </div>
          ) : null}
        </div>
      </Appear>

      <Appear delay={0.04}>
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={disabled}
            className="inline-flex items-center rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_-10px_rgba(8,145,178,0.7)] hover:bg-cyan-700 active:scale-[0.98] transition-all disabled:opacity-60 dark:bg-cyan-500 dark:hover:bg-cyan-400"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {loading ? "Menganalisis..." : "Analisis Sekarang"}
          </button>
          {!token && (
            <span className="text-sm text-gray-500 dark:text-gray-400">Anda harus login terlebih dahulu.</span>
          )}
        </div>
      </Appear>

      <Appear delay={0.06}>
        {loading && (
          <div className="overflow-hidden rounded-lg bg-sky-50 border border-sky-100 dark:bg-gray-800 dark:border-gray-700">
            <div className="h-2 w-1/3 bg-gradient-to-r from-sky-300 via-cyan-400 to-sky-300 animate-[loading_1.4s_ease_infinite]" />
          </div>
        )}
        {error && (
          <div
            role="alert"
            className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-300"
          >
            <div className="font-medium">Terjadi kesalahan</div>
            <div>{error}</div>
          </div>
        )}
      </Appear>

      {/* Keyframes untuk bar loading */}
      <style>{`@keyframes loading { 
        0% { transform: translateX(-100%); } 
        50% { transform: translateX(15%); } 
        100% { transform: translateX(100%); } 
      }`}</style>
    </form>
  )
}
