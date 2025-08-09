"use client"

import { Copy, FileText } from "lucide-react"
import { useState } from "react"
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

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center rounded-md px-2.5 py-1 text-sm font-medium ${
              statusIsHoax ? "bg-rose-100 text-rose-800" : "bg-emerald-100 text-emerald-800"
            }`}
          >
            {"Status: "}
            {result.prediction}
          </span>
          <div className="text-sm text-gray-600">
            {"Skor Kepercayaan: "}
            <span className="font-medium">{confidencePct}%</span>
          </div>
        </div>
        <button
          type="button"
          onClick={copyAll}
          className="inline-flex items-center rounded-md border border-emerald-200 bg-white px-3 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-50"
        >
          <Copy className="mr-2 h-4 w-4" />
          {copied ? "Tersalin!" : "Salin Hasil"}
        </button>
      </div>

      {/* Progress */}
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className={`h-full ${statusIsHoax ? "bg-rose-500" : "bg-emerald-500"}`}
          style={{ width: `${confidencePct}%` }}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={confidencePct}
          role="progressbar"
        />
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-800">Ringkasan</h4>
          <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-md">{result.summary}</p>
        </div>

        {result.original_text ? (
          <div>
            <div className="mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4 text-gray-500" />
              <h5 className="text-sm font-medium text-gray-700">Teks Asli</h5>
            </div>
            <p className="whitespace-pre-wrap rounded-md border bg-white p-4 text-gray-600">{result.original_text}</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
