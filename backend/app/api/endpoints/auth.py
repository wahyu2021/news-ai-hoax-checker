from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from motor.motor_asyncio import AsyncIOMotorClient

from app.schemas.user import UserCreate, User
from app.schemas.token import Token
from app.services import user_service
from app.core.security import create_access_token, verify_password
from app.core.config import settings
from app.db.mongodb_utils import get_database

router = APIRouter()

@router.post("/register", response_model=User)
async def register_user(user_in: UserCreate, db: AsyncIOMotorClient = Depends(get_database)):
    user = await user_service.get_user_by_email(db, user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="Duh, email ini sudah terdaftar. Coba yang lain ya",
        )
    
    new_user = await user_service.create_user(db, user_in)
    new_user['id'] = str(new_user['_id'])
    return new_user

@router.post("/login", response_model=Token)
async def login_for_access_token(
    db: AsyncIOMotorClient = Depends(get_database),
    form_data: OAuth2PasswordRequestForm = Depends()
):
    user = await user_service.get_user_by_email(db, form_data.username)
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email atau password salah nih",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["email"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
        