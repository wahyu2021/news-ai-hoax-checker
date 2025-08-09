"use client"

import { Appear } from "./appear"

export function PageHeader() {
  return (
    <header className="relative overflow-hidden">
      {/* Gradient background with subtle pulse */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sky-50 via-cyan-50 to-transparent animate-pulse [animation-duration:6s] dark:from-sky-950 dark:via-cyan-950 dark:to-transparent" />
      <div className="container relative mx-auto px-4 py-10 sm:py-16 max-w-5xl">
        <div className="flex flex-col items-center text-center gap-4">
          <Appear>
            <span className="inline-flex items-center rounded-full bg-cyan-100 px-3 py-1 text-cyan-800 text-xs font-medium shadow-sm dark:bg-cyan-900/40 dark:text-cyan-300">
              AI News Analyzer
            </span>
          </Appear>
          <Appear delay={0.05}>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
              Ringkas. Deteksi Hoaks. Lebih Pasti.
            </h1>
          </Appear>
          <Appear delay={0.08}>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
              Dapatkan ringkasan cepat dan deteksi hoaks secara instan dari teks atau URL berita.
            </p>
          </Appear>
          <Appear delay={0.12}>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Privasi Anda terjaga. Analisis hanya dilakukan saat Anda mengirimkan permintaan.
            </div>
          </Appear>
        </div>
      </div>

      {/* Gelombang dekoratif dengan animasi pergeseran (versi mulus) */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none">
        <div className="relative h-24 sm:h-28 w-full overflow-hidden">
          {/* Layer 1 (lebih kuat) */}
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 h-full w-[300%]"
            aria-hidden="true"
          >
            <g className="wave-1">
              {/* Warna disetel via currentColor untuk dukungan light/dark */}
              <g className="text-cyan-100 dark:text-sky-900/60">
                {/* Ulangi path 2x agar bisa di-translate separuh lebar untuk loop mulus */}
                <path
                  fill="currentColor"
                  d="M0 60 Q 60 20 120 60 T 240 60 T 360 60 T 480 60 T 600 60 T 720 60 T 840 60 T 960 60 T 1080 60 T 1200 60 T 1320 60 T 1440 60 L 1440 120 L 0 120 Z"
                />
                <path
                  fill="currentColor"
                  transform="translate(1440, 0)"
                  d="M0 60 Q 60 20 120 60 T 240 60 T 360 60 T 480 60 T 600 60 T 720 60 T 840 60 T 960 60 T 1080 60 T 1200 60 T 1320 60 T 1440 60 L 1440 120 L 0 120 Z"
                />
              </g>
            </g>
          </svg>

          {/* Layer 2 (lebih lembut dan sedikit berbeda fase) */}
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 h-full w-[300%]"
            aria-hidden="true"
          >
            <g className="wave-2">
              <g className="text-sky-100 dark:text-cyan-900/50">
                <path
                  fill="currentColor"
                  d="M0 65 Q 60 30 120 65 T 240 65 T 360 65 T 480 65 T 600 65 T 720 65 T 840 65 T 960 65 T 1080 65 T 1200 65 T 1320 65 T 1440 65 L 1440 120 L 0 120 Z"
                />
                <path
                  fill="currentColor"
                  transform="translate(1440, 0)"
                  d="M0 65 Q 60 30 120 65 T 240 65 T 360 65 T 480 65 T 600 65 T 720 65 T 840 65 T 960 65 T 1080 65 T 1200 65 T 1320 65 T 1440 65 L 1440 120 L 0 120 Z"
                />
              </g>
            </g>
          </svg>
        </div>
      </div>

      {/* Keyframes khusus animasi wave */}
      <style>{`
        /* Geser kelompok path sebesar 50% dari lebar total (karena kita memakai dua duplikasi) */
        @keyframes waveSlide {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .wave-1 {
          animation: waveSlide 14s linear infinite;
          will-change: transform;
        }
        .wave-2 {
          animation: waveSlide 22s linear infinite;
          will-change: transform;
        }
      `}</style>
    </header>
  )
}
