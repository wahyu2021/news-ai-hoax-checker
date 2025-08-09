from motor.motor_asyncio import AsyncIOMotorClient
from app.schemas.news import AnalysisResult
from datetime import datetime

async def save_analysis(conn: AsyncIOMotorClient, user_id: str, result: AnalysisResult):
    log_entry = result.model_dump()
    log_entry["user_id"] = user_id
    log_entry["created_at"] = datetime.now()

    await conn["analysis_logs"].insert_one(log_entry)
    return log_entry