from app.models.loader import model_loader

def get_summary(text: str) -> str:
    """Meringkas teks menggunakan model yang sudah dimuat"""
    max_input_length = 1024 # Batas panjang input untuk model
    truncated_text = text[:max_input_length] # Memotong teks jika terlalu panjang

    result = model_loader.summarizer(
        truncated_text,
        max_length=150, # Panjang maksimal ringkasan
        min_length=30, # Panjang minimal ringkasan
        do_sample=False # Nonaktifkan sampling untuk hasil yang konsisten
    )
    return result[0]['summary_text'] if result else "No summary available"

print("Summarization service initialized")
