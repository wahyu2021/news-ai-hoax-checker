"use client"

import { Copy, FileText } from "lucide-react"
import { useEffect, useState } from "react"
import type { AnalysisResult } from "../types"

type Props = {
  result: AnalysisResult
}

export function AnalysisResultCard({ result }: Props) {
  const [copied, setCopied] = useState(false)
  const statusIsHoax = result.prediction === "Hoaks"
  const confidencePct = Math.max(0, Math.min(100, Number((result.confidence_score * 100).toFixed(1)) || 0))

  const copyAll = async () => {
    const text = `Status: ${result.prediction}
Skor Kepercayaan: ${confidencePct}%
Ringkasan: ${result.summary}
${result.original_text ? `Teks Asli:\n${result.original_text}` : ""}`.trim()
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  // animate progress on mount/update
  const [progressStyle, setProgressStyle] = useState({ width: "0%" })
  useEffect(() => {
    const t = setTimeout(() => setProgressStyle({ width: `${confidencePct}%` }), 50)
    return () => clearTimeout(t)
  }, [confidencePct])

  return (
    <div className="rounded-2xl border border-cyan-100 bg-white p-6 sm:p-8 shadow-[0_6px_30px_-15px_rgba(14,165,233,0.35)] ring-1 ring-transparent hover:ring-cyan-200 transition-all duration-300 dark:bg-gray-900 dark:border-gray-800 dark:hover:ring-cyan-700/40">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center rounded-md px-2.5 py-1 text-sm font-medium shadow-sm ${
              statusIsHoax
                ? "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300"
                : "bg-gradient-to-r from-cyan-100 to-sky-100 text-cyan-900 dark:from-cyan-900/20 dark:to-sky-900/20 dark:text-cyan-300"
            }`}
          >
            {"Status: "}
            {result.prediction}
          </span>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {"Skor Kepercayaan: "}
            <span className="font-medium">{confidencePct}%</span>
          </div>
        </div>
        <button
          type="button"
          onClick={copyAll}
          className="inline-flex items-center rounded-lg border border-cyan-200 bg-white px-3 py-2 text-sm font-medium text-cyan-800 hover:bg-cyan-50 active:scale-[0.98] transition-all dark:bg-gray-900 dark:text-cyan-300 dark:border-cyan-800 dark:hover:bg-gray-800"
        >
          <Copy className="mr-2 h-4 w-4" />
          {copied ? "Tersalin!" : "Salin Hasil"}
        </button>
      </div>

      {/* Progress dengan animasi lebar */}
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
        <div
          className={`h-full transition-[width] duration-700 ease-out ${statusIsHoax ? "bg-rose-500" : "bg-cyan-600 dark:bg-cyan-500"}`}
          style={progressStyle}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={confidencePct}
          role="progressbar"
        />
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Ringkasan</h4>
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed bg-gradient-to-br from-gray-50 to-white p-4 rounded-lg border border-gray-100 dark:from-gray-900 dark:to-gray-900 dark:border-gray-800">
            {result.summary}
          </p>
        </div>

        {result.original_text ? (
          <div>
            <div className="mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">Teks Asli</h5>
            </div>
            <p className="whitespace-pre-wrap rounded-lg border bg-white p-4 text-gray-600 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300">
              {result.original_text}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
