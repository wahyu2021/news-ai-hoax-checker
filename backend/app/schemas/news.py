from pydantic import BaseModel, HttpUrl
from typing import Optional

class NewsInput(BaseModel):
    text: str | None = None
    url: HttpUrl | None = None

class AnalysisResult(BaseModel):
    summary: str
    prediction: str
    confidence_score: float
    original_text: str
