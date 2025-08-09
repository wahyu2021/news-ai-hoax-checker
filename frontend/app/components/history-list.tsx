"use client"

import { Clock, ExternalLink, Newspaper, RefreshCcw } from "lucide-react"
import type { AnalysisResult } from "../types"

export type HistoryItem = {
  id: string
  createdAt: number
  input: string
  isUrl: boolean
  result: AnalysisResult
}

type Props = {
  items: HistoryItem[]
  onSelect?: (item: HistoryItem) => void
}

function timeAgo(ts: number) {
  const s = Math.floor((Date.now() - ts) / 1000)
  if (s < 60) return `${s}s lalu`
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m lalu`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}j lalu`
  const d = Math.floor(h / 24)
  return `${d}h lalu`
}

export function HistoryList({ items, onSelect = () => {} }: Props) {
  if (!items?.length) {
    return <p className="text-sm text-gray-500 dark:text-gray-400">Belum ada riwayat analisis.</p>
  }
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {items.map((it) => {
        const hoax = it.result.prediction === "Hoaks"
        return (
          <li
            key={it.id}
            className="group rounded-xl border border-cyan-100 bg-white p-4 hover:bg-cyan-50/50 transition-colors cursor-pointer dark:bg-gray-900 dark:border-gray-800 dark:hover:bg-gray-800/50"
            onClick={() => onSelect(it)}
            role="button"
            aria-label="Gunakan item riwayat ini"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Clock className="h-3.5 w-3.5" />
                <span>{timeAgo(it.createdAt)}</span>
              </div>
              <span
                className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${
                  hoax
                    ? "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300"
                    : "bg-cyan-100 text-cyan-900 dark:bg-cyan-900/20 dark:text-cyan-300"
                }`}
              >
                {it.result.prediction}
              </span>
            </div>
            <div className="mt-3 flex items-start gap-2">
              {it.isUrl ? (
                <ExternalLink className="h-4 w-4 text-sky-600 dark:text-sky-400 mt-0.5" />
              ) : (
                <Newspaper className="h-4 w-4 text-cyan-600 dark:text-cyan-400 mt-0.5" />
              )}
              <div className="text-sm text-gray-700 line-clamp-3 dark:text-gray-200">
                {it.isUrl ? it.input : it.result.summary || it.input}
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Kepercayaan: {(it.result.confidence_score * 100).toFixed(1)}%</span>
              <span className="inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <RefreshCcw className="h-3.5 w-3.5" />
                Gunakan ulang
              </span>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
