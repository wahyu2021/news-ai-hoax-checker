from fastapi import APIRouter, HTTPException, Body, Depends, status
from motor.motor_asyncio import AsyncIOMotorClient
from jose import JWTError, jwt

from app.schemas.news import NewsInput, AnalysisResult
from app.schemas.token import TokenData
from app.services import summarization_service, detection_service, url_parser_service, analysis_log_service, user_service
from app.core.config import settings
from app.db.mongodb_utils import get_database
from fastapi.security import OAuth2PasswordBearer

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

async def get_current_user(
        db: AsyncIOMotorClient = Depends(get_database),
        token: str = Depends(oauth2_scheme)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Tokennya nggak valid nih, coba login lagi",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)    
    except JWTError:
        raise credentials_exception
    
    user = await user_service.get_user_by_email(db, email=token_data.email)
    
    if user is None:
        raise credentials_exception
    
    return user

@router.post("/analyze", response_model=AnalysisResult)
async def analyze_news_endpoint(
    payload: NewsInput = Body(...),
    db: AsyncIOMotorClient = Depends(get_database),
    current_user: dict = Depends(get_current_user)
):
    content_to_analyze = ""

    if payload.url:
        text_from_url = url_parser_service.extract_text_from_url(str(payload.url))
        if not text_from_url:
            raise HTTPException(status_code=400, detail="Gagal ngambil konten dari URL")
        content_to_analyze = text_from_url
    elif payload.text:
        content_to_analyze = payload.text
    else:
        raise HTTPException(status_code=400, detail="Inputnya nggak valid")
    
    if len(content_to_analyze) < 50:
        raise HTTPException(status_code=400, detail="Teksnya kependekan, coba yang lebih panjang yah")
    
    try:
        summary = summarization_service.get_summary(content_to_analyze)
        detection_result = detection_service.get_fake_news_prediction(content_to_analyze)

        result = AnalysisResult(
            summary=summary,
            prediction=detection_result["label"],
            confidence_score=detection_result['score'],
            original_text=content_to_analyze
        )
        
        await analysis_log_service.save_analysis(db, user_id=str(current_user["_id"]), result=result)

        return result
    except Exception as e:
        print(f"Waduh, ada error pas proses AI: {e}")
        raise HTTPException(
            status_code=500,
            detail="Ada masalah internal nih, coba lagi nanti"
        )