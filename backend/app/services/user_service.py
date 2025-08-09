from motor.motor_asyncio import AsyncIOMotorClient
from app.schemas.user import UserCreate
from app.core.security import get_password_hash

async def get_user_by_email(conn: AsyncIOMotorClient, email: str):
    user = await conn["users"].find_one({"email": email})
    return user

async def create_user(conn: AsyncIOMotorClient, user: UserCreate):
    hashed_password = get_password_hash(user.password)
    user_dict = user.model_dump()
    user_dict["hashed_password"] = hashed_password
    del user_dict["password"]

    await conn["users"].insert_one(user_dict)
    return user_dict