from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.api.endpoints import analysis
from app.models.loader import model_loader

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Application startup: Loading AI models...")
    _ = model_loader
    print("Models loaded successfully")
    yield
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
app.include_router(analysis.router, prefix="/api/v1", tags=["Analysis"])

@app.get('/', tags=["Root"])
def read_root():
    return {"status": "AI Backend is running smoothly!"}