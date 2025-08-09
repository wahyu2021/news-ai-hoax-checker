export function PageHeader() {
  return (
    <header className="bg-gradient-to-b from-emerald-50 to-transparent">
      <div className="container mx-auto px-4 py-10 sm:py-16 max-w-5xl">
        <div className="flex flex-col items-center text-center gap-4">
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-emerald-800 text-xs font-medium">
            AI News Analyzer
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Ringkas. Deteksi Hoaks. Lebih Pasti.
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Dapatkan ringkasan cepat dan deteksi hoaks secara instan dari teks atau URL berita.
          </p>
          <div className="mt-2 text-xs text-gray-500">
            Privasi Anda terjaga. Analisis hanya dilakukan saat Anda mengirimkan permintaan.
          </div>
        </div>
      </div>
    </header>
  )
}
