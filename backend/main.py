from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.api.endpoints import analysis, auth
from app.db.mongodb_utils import connect_to_mongo, close_mongo_connection
from app.models.loader import model_loader
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    print("Application startup: Loading AI models...")
    _ = model_loader
    print("Models loaded successfully")
    yield
    await close_mongo_connection()
    print("Application shutdown")

app = FastAPI(
    title="AI News Analyzer API",
    description="API untuk meringkas dan mendeteksi berita hoaks",
    version="1.0.0",
    lifespan=lifespan
)

# Konfigurasi CORS
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Daftarkan semua router Anda
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(analysis.router, prefix="/api/v1", tags=["Analysis"])

@app.get('/', tags=["Root"])
def read_root():
    return {"status": "AI Backend is running smoothly!"}