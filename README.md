# 📰 AI News Summarizer & Fake News Detector

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-Next.js-blue?logo=next.js">
  <img src="https://img.shields.io/badge/Backend-FastAPI-green?logo=fastapi">
  <img src="https://img.shields.io/badge/Python-3.10+-yellow?logo=python">
  <img src="https://img.shields.io/badge/Models-HuggingFace-orange?logo=huggingface">
  <img src="https://img.shields.io/badge/License-MIT-red">
</p>

---

## 📌 Deskripsi

**AI News Summarizer & Fake News Detector** adalah aplikasi berbasis **kecerdasan buatan** yang dapat:

- 📄 **Meringkas berita panjang** menjadi singkat & padat.
- 🔍 **Mendeteksi berita hoaks** menggunakan model NLP.
- 📊 Menampilkan **confidence score** sebagai tingkat keyakinan.

**Stack utama:**  
Frontend → **Next.js**  
Backend → **FastAPI**  
AI Models → **HuggingFace Transformers**  

---

## 🎯 Tujuan

- ⏱ **Cepat Memahami** inti berita hanya dalam beberapa kalimat.
- 🛡 **Validasi Fakta** untuk melawan hoaks & misinformasi.
- 📚 **Literasi Digital** dengan meningkatkan kesadaran pengguna.

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|-------|-----------|
| 📝 Ringkas Berita | Gunakan model `T5` untuk meringkas teks. |
| 🕵️ Deteksi Hoaks | Model `DistilBERT` untuk klasifikasi Valid/Hoaks. |
| 🌐 Ekstraksi URL | Ambil teks otomatis dari artikel online. |
| 🔑 Autentikasi | Login & Registrasi pengguna dengan JWT. |
| 📊 Confidence Score | Persentase keyakinan prediksi model. |
| 🎨 UI Modern | Dibangun dengan TailwindCSS & animasi Framer Motion. |

---

## 🛠 Tech Stack

| Layer | Teknologi |
|-------|-----------|
| **Frontend** | Next.js, React.js, TailwindCSS, TypeScript, Framer Motion |
| **Backend** | FastAPI, Python |
| **AI Models** | `Falconsai/text_summarization`, `dafqi/DistilBERT-Hoax-Detection` |
| **Database** | MongoDB (Motor) |
| **Libraries** | transformers, torch, uvicorn, passlib, python-jose |

---

## 🏗 Arsitektur Sistem

```mermaid
graph TD
    A[👤 Pengguna] -->|Teks/URL| B[🌐 Frontend (Next.js)]
    B -->|Request API| C[⚡ Backend (FastAPI)]
    C --> D1[📝 Summarizer Model (T5)]
    C --> D2[🕵️ Hoax Detector (DistilBERT)]
    D1 --> E[(🗄 Database MongoDB)]
    D2 --> E
    C -->|Response JSON| B
    B -->|Tampilkan Hasil| A
````

---

## 📂 Struktur Folder

```
news-ai-hoax-checker/
├── backend/
│   ├── app/
│   │   ├── api/endpoints/
│   │   ├── core/
│   │   ├── db/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── services/
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
└── frontend/
    ├── app/
    ├── components/
    ├── actions/
    ├── lib/
    └── package.json
```

---

## 🚀 Instalasi

### 1️⃣ Backend (FastAPI)

```bash
git clone https://github.com/wahyu2021/news-ai-hoax-checker.git
cd news-ai-hoax-checker/backend

python -m venv venv
source venv/Scripts/activate   # Windows
# source venv/bin/activate     # Mac/Linux

pip install -r requirements.txt

cp .env.example .env
uvicorn main:app --reload
```

📍 **Akses Backend:** [http://localhost:8000](http://localhost:8000)

---

### 2️⃣ Frontend (Next.js)

```bash
cd ../frontend
npm install
npm run dev
```

📍 **Akses Frontend:** [http://localhost:3000](http://localhost:3000)

---

## 📡 API Example

**Endpoint:** `POST /api/v1/analyze`
**Body (Teks):**

```json
{
  "text": "Contoh berita panjang...",
  "url": null
}
```

**Body (URL):**

```json
{
  "text": null,
  "url": "https://example.com/berita"
}
```

**Response:**

```json
{
  "summary": "Ringkasan berita...",
  "prediction": "Valid",
  "confidence_score": 0.98,
  "original_text": "Teks berita lengkap..."
}
```

---

## 🗺 Roadmap

* [x] Autentikasi pengguna
* [x] Input teks & URL

---

## 📜 Lisensi

MIT License © 2025 [Wahyu Wahid Nugroho](https://github.com/wahyu2021)
