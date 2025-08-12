# 📰 AI News Summarizer & Fake News Detector

Aplikasi web berbasis AI yang dapat **meringkas artikel berita panjang** dan **mendeteksi apakah berita tersebut hoaks atau tidak**, dibangun dengan **Next.js** untuk frontend dan **FastAPI** untuk backend.

---

## 📌 Deskripsi

Dengan memasukkan **teks berita** atau **URL artikel**, pengguna akan mendapatkan:

- Ringkasan singkat dari berita.
- Prediksi **Valid** atau **Hoaks**.
- Skor kepercayaan (confidence score) dari model AI.

---

## 🎯 Tujuan Proyek

- **Kecepatan Memahami** → Mempercepat pemahaman inti berita melalui ringkasan otomatis.
- **Validasi Informasi** → Membantu pengguna mengidentifikasi potensi berita palsu/hoaks.
- **Literasi Digital** → Meningkatkan kesadaran publik terhadap misinformasi di era digital.

---

## ✨ Fitur

- ✅ **Input Ganda**: Menerima input berupa **teks berita** atau **URL artikel**.
- ✅ **Peringkas AI**: Menggunakan model `T5` untuk membuat ringkasan.
- ✅ **Detektor Hoaks**: Ditenagai oleh model `DistilBERT` untuk klasifikasi teks.
- ✅ **Skor Kepercayaan**: Menampilkan persentase keyakinan model terhadap hasil prediksi.
- ✅ **Ekstraksi URL Otomatis**: Mengambil konten teks langsung dari URL berita.
- ✅ **Autentikasi Pengguna**: Login dan registrasi untuk mengamankan akses.
- ✅ **Antarmuka Modern**: Responsif, interaktif, dan menarik.

---

## 🛠 Tech Stack

| Komponen     | Teknologi |
| ------------ | --------- |
| **Frontend** | Next.js, React.js, TailwindCSS, TypeScript, Framer Motion |
| **Backend**  | FastAPI, Python |
| **Model AI** | Summarizer: `Falconsai/text_summarization`<br>Detector: `dafqi/DistilBERT-Hoax-Detection` |
| **Libraries**| `transformers`, `torch`, `uvicorn`, `passlib`, `python-jose` |
| **Database** | MongoDB (via Motor) |

---

## 📂 Struktur Folder

```

news-ai-hoax-checker/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── endpoints/
│   │   ├── core/
│   │   ├── db/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── services/
│   ├── main.py
│   ├── requirements.txt
│   └── .env (Contoh)
└── frontend/
├── app/
├── components/
│   ├── analysis/
│   └── auth/
├── actions/
├── lib/
└── package.json

````

---

## 🏗 Arsitektur Sistem

```mermaid
graph TD
    A[Pengguna] -->|"Teks atau URL"| B[Frontend - Next.js]
    B -->|"Request API"| C[Backend - FastAPI]
    C --> D1[Summarizer Model - T5]
    C --> D2[Hoax Detector - DistilBERT]
    D1 --> E[(Database MongoDB)]
    D2 --> E
    C -->|"Response JSON"| B
    B -->|"Tampilkan Hasil"| A
    
````

---

## 🚀 Instalasi

### 1️⃣ Backend (FastAPI)

```bash
# Clone repository
git clone https://github.com/wahyu2021/news-ai-hoax-checker.git
cd news-ai-hoax-checker/backend

# Buat dan aktifkan virtual environment
python -m venv venv
# Windows (Git Bash)
source venv/Scripts/activate
# Mac/Linux
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Buat file .env dan isi variabel yang diperlukan
echo "SUMMARIZER_MODEL=Falconsai/text_summarization" > .env
echo "DETECTOR_MODEL=dafqi/DistilBERT-Hoax-Detection" >> .env
echo "DATABASE_URL=mongodb://localhost:27017" >> .env
echo "DATABASE_NAME=news_ai_db" >> .env
echo "SECRET_KEY=kunci_rahasia_anda" >> .env
echo "ALGORITHM=HS256" >> .env
echo "ACCESS_TOKEN_EXPIRE_MINUTES=30" >> .env

# Jalankan server
uvicorn main:app --reload
```

Server: [http://localhost:8000](http://localhost:8000)

---

### 2️⃣ Frontend (Next.js)

```bash
cd ../frontend

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Akses aplikasi di: [http://localhost:3000](http://localhost:3000)

---

## 📡 API

**Endpoint**: `POST /api/v1/analyze`
**Auth**: Bearer Token (didapat setelah login)

**Body (Teks)**:

```json
{
  "text": "Anggota Komisi IV DPR RI meminta pemerintah tidak melanjutkan rencana impor beras...",
  "url": null
}
```

**Body (URL)**:

```json
{
  "text": null,
  "url": "https://www.antaranews.com/berita/contoh-artikel"
}
```

**Respons**:

```json
{
  "summary": "Anggota Komisi IV DPR RI meminta pemerintah untuk tidak melanjutkan rencana impor beras...",
  "prediction": "Valid",
  "confidence_score": 0.995,
  "original_text": "Teks lengkap berita..."
}
```

---

## 🗺 Roadmap

* [x] **Autentikasi Pengguna**.
* [x] Simpan Riwayat Analisis.
* [ ] Panel Admin.
* [ ] Fitur Tanya Jawab.
* [ ] Dukungan Multi-bahasa.

---

## 📜 Lisensi

MIT License © 2025 Wahyu Wahid Nugroho

