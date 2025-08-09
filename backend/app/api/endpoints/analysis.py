from fastapi import APIRouter, HTTPException, Body
from app.schemas.news import NewsInput, AnalysisResult
from app.services import summarization_service, detection_service, url_parser_service

router = APIRouter()

@router.post("/analyze", response_model=AnalysisResult)
async def analyze_news_endpoint(payload: NewsInput = Body(...)):
    """Endpoint untuk menganalisis berita"""
    content_to_analyze = ""
    if payload.url:
        # Jika ada URL, prioritaskan itu
        text_from_url = url_parser_service.extract_text_from_url(str(payload.url))
        if not text_from_url:
            raise HTTPException(status_code=400, detail="Gagal mengambil konten dari URL. Pastikan URL valid dan dapat diakses")
        content_to_analyze = text_from_url
    elif payload.text:
        content_to_analyze = payload.text
    else:
        raise HTTPException(status_code=400, detail="Input tidak valid. Harap berikan 'text' atau 'url'")
    
    if len(content_to_analyze) < 50:
        raise HTTPException(status_code=400, detail="Teks terlalu pendek untuk dianalisis. Masukkan setidaknya 50 karakter")
    
    try:
        summary = summarization_service.get_summary(content_to_analyze)
        detection_result = detection_service.get_fake_news_prediction(content_to_analyze)

        return AnalysisResult(
            summary=summary,
            prediction=detection_result["label"],
            confidence_score=detection_result["score"],
            original_text=content_to_analyze
        )
    except Exception as e:
        print(f"An error occured during AI processing: {e}")
        raise HTTPException(status_code=500, detail="Terjadi kesalahan internal saat memproses teks")
    
    