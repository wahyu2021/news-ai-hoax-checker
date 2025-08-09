# 📰 AI News Summarizer & Fake News Detector

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/nama-user-anda/news-ai-app/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js-blue)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-green)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.9+-blue)](https://www.python.org/)
[![HuggingFace Models](https://img.shields.io/badge/Models-HuggingFace-orange)](https://huggingface.co/)

---

<!-- ![UI Screenshot](docs/screenshot.png)   -->

---

## 📌 Deskripsi
Aplikasi web berbasis AI yang dapat **meringkas artikel berita panjang** dan **mendeteksi apakah berita tersebut hoaks atau tidak**, dibangun dengan **Next.js** untuk frontend dan **FastAPI** untuk backend.

Dengan memasukkan **teks berita** atau **URL artikel**, pengguna akan mendapatkan:
- Ringkasan singkat (2–5 kalimat)
- Prediksi valid / hoaks
- Skor kepercayaan model AI

---

## 🎯 Tujuan Proyek
- **Kecepatan Memahami** → Mempercepat pemahaman inti berita.
- **Validasi Informasi** → Mengidentifikasi berita palsu/hoaks.
- **Literasi Digital** → Meningkatkan kesadaran publik terhadap misinformasi.

---

## ✨ Fitur
- ✅ **Input Ganda**: Teks atau URL berita.
- ✅ **Peringkas AI**: Model `T5`.
- ✅ **Detektor Hoaks**: Model `DistilBERT`.
- ✅ **Confidence Score**: Persentase keyakinan.
- ✅ **Ekstraksi URL Otomatis**: Ambil teks dari artikel.

---

## 🛠 Tech Stack
| Komponen              | Teknologi                                                                                                        |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------- |
| **Frontend** | Next.js, React.js, TailwindCSS                                                                                     |
| **Backend** | FastAPI, Python                                                                                                    |
| **Model AI** | Summarizer: `Falconsai/text_summarization`<br>Detector: `dafqi/DistilBERT-Hoax-Detection`                |
| **Pustaka** | `transformers`, `torch`, `uvicorn`, `python-dotenv`, `beautifulsoup4`                                                |
| **Database (Opsional)** | MongoDB, PostgreSQL                                                                                                |
---

## 📂 Struktur Folder
```

news-ai-app/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── services/
│   ├── main.py
│   ├── .env
│   └── requirements.txt
└── frontend/
├── components/
├── pages/
└── package.json

````

---

## 🚀 Instalasi

### 1️⃣ Backend (FastAPI)
```bash
git clone https://github.com/nama-user-anda/news-ai-app.git
cd news-ai-app/backend

python -m venv venv
source venv/Scripts/activate  # Windows (Git Bash)
# source venv/bin/activate    # Mac/Linux

pip install -r requirements.txt

echo "SUMMARIZER_MODEL=Falconsai/text_summarization" > .env
echo "DETECTOR_MODEL=dafqi/DistilBERT-Hoax-Detection" >> .env

python -m uvicorn main:app --reload
````

Server → [http://localhost:8000](http://localhost:8000)

---

### 2️⃣ Frontend (Next.js)

```bash
cd ../frontend
npm install
npm run dev
```

Akses → [http://localhost:3000](http://localhost:3000)

---

## 📡 API

**Endpoint**: `POST /api/v1/analyze`
**Body (Teks)**:

```json
{
  "text": "Anggota Komisi IV DPR RI Daniel Johan meminta pemerintah tidak melanjutkan rencana impor beras...",
  "url": null
}
```

**Body (URL)**:

```json
{
  "text": null,
  "url": "https://www.antaranews.com/..."
}
```

**Response**:

```json
{
  "summary": "Anggota Komisi IV DPR RI Daniel Johan meminta pemerintah untuk tidak melanjutkan rencana impor...",
  "prediction": "Valid",
  "confidence_score": 0.995,
  "original_text": "..."
}
```

---

## 🗺 Roadmap

* [ ] Simpan riwayat pencarian di database
* [ ] Panel admin
* [ ] Fitur Q\&A ala ChatGPT
* [ ] Dukungan multi-bahasa
* [ ] Integrasi API pemeriksa fakta (TurnBackHoax)

---

## 📜 Lisensi

MIT License © 2025 Wahyu Wahid Nugroho

