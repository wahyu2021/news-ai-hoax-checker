from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

class Database:
    client: AsyncIOMotorClient = None

db = Database()

async def get_database() -> AsyncIOMotorClient:
    return db.client[settings.DATABASE_NAME]

async def connect_to_mongo():
    print("Attempting to connect to MongoDB...")
    db.client = AsyncIOMotorClient(settings.DATABASE_URL)
    print("Database connected successfully")

async def close_mongo_connection():
    print("Closing connection to MongoDB...")
    db.client.close()
    print("MongoDB connection closed successfully.")
