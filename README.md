# 📰 AI News Summarizer & Fake News Detector

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/wahyu2021/news-ai-hoax-checker/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js-blue)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-green)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.9+-blue)](https://www.python.org/)
[![HuggingFace Models](https://img.shields.io/badge/Models-HuggingFace-orange)](https://huggingface.co/)

---

## 📌 Deskripsi

Aplikasi web berbasis AI yang dapat **meringkas artikel berita panjang** dan **mendeteksi apakah berita tersebut hoaks atau tidak**, dibangun dengan **Next.js** untuk frontend dan **FastAPI** untuk backend.

Pengguna dapat memasukkan **teks berita** atau **URL artikel**, lalu aplikasi akan memberikan:
- Ringkasan singkat berita (2–5 kalimat)
- Prediksi **Valid** atau **Hoaks**
- Skor kepercayaan (confidence score) dari model AI

---

## 🎯 Tujuan Proyek

- **Kecepatan Memahami** → Mempercepat pemahaman inti berita melalui ringkasan otomatis.
- **Validasi Informasi** → Mengidentifikasi potensi berita palsu/hoaks.
- **Literasi Digital** → Meningkatkan kesadaran publik terhadap misinformasi di era digital.

---

## ✨ Fitur

- ✅ **Input Ganda**: Terima input berupa teks berita atau URL artikel
- ✅ **Peringkas AI**: Menggunakan model `T5` (`Falconsai/text_summarization`)
- ✅ **Detektor Hoaks**: Menggunakan model `DistilBERT` (`dafqi/DistilBERT-Hoax-Detection`)
- ✅ **Confidence Score**: Menampilkan persentase keyakinan hasil prediksi
- ✅ **Ekstraksi URL Otomatis**: Ambil konten teks langsung dari URL berita
- ✅ **Autentikasi Pengguna**: Sistem login & registrasi
- ✅ **UI Modern**: Antarmuka responsif dan menarik

---

## 🛠 Tech Stack

| Komponen        | Teknologi |
|-----------------|-----------|
| **Frontend**    | Next.js, React.js, TailwindCSS, TypeScript, Framer Motion |
| **Backend**     | FastAPI, Python |
| **Model AI**    | Summarizer: `Falconsai/text_summarization`<br>Detector: `dafqi/DistilBERT-Hoax-Detection` |
| **Pustaka**     | `transformers`, `torch`, `uvicorn`, `passlib`, `python-jose` |
| **Database**    | MongoDB (via Motor) |

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

## 🚀 Instalasi

### 1️⃣ Backend (FastAPI)
```bash
# Clone repository
git clone https://github.com/wahyu2021/news-ai-hoax-checker.git
cd news-ai-hoax-checker/backend

# Buat virtual environment
python -m venv venv

# Aktivasi venv
# Windows (Git Bash)
source venv/Scripts/activate
# Mac/Linux
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Buat file .env
echo "SUMMARIZER_MODEL=Falconsai/text_summarization" > .env
echo "DETECTOR_MODEL=dafqi/DistilBERT-Hoax-Detection" >> .env
echo "DATABASE_URL=mongodb://localhost:27017" >> .env
echo "DATABASE_NAME=news_ai_db" >> .env
echo "SECRET_KEY=kunci_rahasia_anda" >> .env
echo "ALGORITHM=HS256" >> .env
echo "ACCESS_TOKEN_EXPIRE_MINUTES=30" >> .env

# Jalankan server
uvicorn main:app --reload
````

Server berjalan di: [http://localhost:8000](http://localhost:8000)

---

### 2️⃣ Frontend (Next.js)

```bash
cd ../frontend
npm install
npm run dev
```

Akses aplikasi di: [http://localhost:3000](http://localhost:3000)

---

## 📡 API

**Endpoint**: `POST /api/v1/analyze`
Memerlukan **Bearer Token** setelah login.

**Contoh Body (Teks)**:

```json
{
  "text": "Anggota Komisi IV DPR RI Daniel Johan meminta pemerintah tidak melanjutkan rencana impor beras...",
  "url": null
}
```

**Contoh Body (URL)**:

```json
{
  "text": null,
  "url": "https://www.antaranews.com/berita/contoh-artikel"
}
```

**Contoh Respons**:

```json
{
  "summary": "Anggota Komisi IV DPR RI, Daniel Johan, meminta pemerintah untuk tidak melanjutkan rencana impor beras...",
  "prediction": "Valid",
  "confidence_score": 0.995,
  "original_text": "Teks lengkap dari berita yang dianalisis..."
}
```

---

## 🗺 Roadmap

* [x] Autentikasi pengguna (registrasi & login)
* [ ] Simpan riwayat analisis di database
* [ ] Panel admin
* [ ] Fitur Tanya Jawab (Q\&A) berita
* [ ] Dukungan multi-bahasa

---

## 📜 Lisensi

MIT License © 2025 Wahyu Wahid Nugroho

```

Kalau mau lebih keren lagi, aku bisa tambahkan **preview screenshot UI** dan **diagram arsitektur sistem** supaya README ini terlihat seperti dokumentasi profesional startup tech besar.  
Mau aku buatkan versinya yang ada gambar dan diagramnya?
```
