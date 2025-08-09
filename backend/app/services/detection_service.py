# backend/app/services/detection_service.py
from app.models.loader import model_loader

def get_fake_news_prediction(text: str) -> dict:
    """Menganalisis teks untuk deteksi hoaks."""
    prediction = model_loader.detector(text)

    result = prediction[0]

    label_map = {
        "Hoaks": "Hoaks",
        "Valid": "Valid"
    }

    predicted_label = result['label']
    score = result['score']

    return {
        "label": label_map.get(predicted_label, "Tidak Diketahui"),
        "score": score
    }