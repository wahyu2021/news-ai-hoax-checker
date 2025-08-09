import requests
from bs4 import BeautifulSoup

def extract_text_from_url(url: str) -> str | None:
    """Mengambil teks utama dari sebuah URL."""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers, timeout=15)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        paragraphs = soup.find_all('p')
        
        if not paragraphs:
            divs = soup.find_all('div')
            full_text = ' '.join(div.get_text(strip=True) for div in divs)
        else:
            full_text = ' '.join(p.get_text(strip=True) for p in paragraphs)
        
        return full_text
    except requests.RequestException as e:
        print(f"Error fetching URL {url}: {e}")
        return None