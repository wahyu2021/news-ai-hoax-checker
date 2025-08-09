"use client"

import type React from "react"

import { Loader2 } from "lucide-react"
import { useMemo, useState } from "react"
import { analyze } from "../lib/api"
import type { AnalysisResult } from "../types"

type Props = {
  token?: string | null
  onResult?: (result: AnalysisResult) => void
}

function looksLikeUrl(text: string) {
  if (!text) return false
  try {
    const u = new URL(text.trim())
    return u.protocol === "http:" || u.protocol === "https:"
  } catch {
    return false
  }
}

export function AnalyzerForm({ token = null, onResult = () => {} }: Props) {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isUrl = useMemo(() => looksLikeUrl(input), [input])
  const disabled = loading || !token || !input.trim()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (disabled) return
    setError(null)
    setLoading(true)
    try {
      const payload = isUrl ? { url: input.trim(), text: null } : { text: input.trim(), url: null }
      const res = await analyze({ token: token as string, payload })
      onResult(res)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menganalisis berita.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-live="polite">
      <div className="space-y-2">
        <label htmlFor="analysis-input" className="text-sm font-medium text-gray-700">
          Teks atau URL Berita
        </label>
        <textarea
          id="analysis-input"
          placeholder="Tempel teks artikel atau URL berita di sini..."
          className="min-h-44 w-full rounded-md border border-gray-300 p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <div className="text-xs text-gray-500">
          {isUrl
            ? "Terdeteksi input berupa URL. Sistem akan mengambil konten dari halaman tersebut."
            : "Terdeteksi input berupa teks. Sistem akan menganalisis teks yang Anda masukkan."}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={disabled}
          className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {loading ? "Menganalisis..." : "Analisis Sekarang"}
        </button>
        {!token && <span className="text-sm text-gray-500">Anda harus login terlebih dahulu.</span>}
      </div>

      {error && (
        <div role="alert" className="rounded-md border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
          <div className="font-medium">Terjadi kesalahan</div>
          <div>{error}</div>
        </div>
      )}
    </form>
  )
}
