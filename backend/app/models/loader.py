from transformers import pipeline
from app.core.config import settings
import torch

class ModelLoader:
    def __init__(self):
        # Gunakan GPU jika tersedia, jika tidak gunakan CPU
        device = 0 if torch.cuda.is_available() else -1
        print(f"Loading models on device: {'cuda' if device == 0 else 'cpu'}")

        # Muat model Summarizer
        print(f"Loading summarizer: {settings.SUMMARIZER_MODEL}")
        self.summarizer = pipeline(
            "summarization",
            model=settings.SUMMARIZER_MODEL,
            device=device
        )
        print("Summarizer loaded")

        # Muat model Fake News Detector
        print(f"Loading detector: {settings.DETECTOR_MODEL}")
        self.detector = pipeline(
            "text-classification",
            model=settings.DETECTOR_MODEL,
            device=device
        )
        print("Detector loaded")
    
model_loader = ModelLoader()
print("ModelLoader initialized")
