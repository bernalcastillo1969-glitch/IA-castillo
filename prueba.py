import os
import google.generativeai as genai
from dotenv import load_dotenv

# Cargar API Key
load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=API_KEY)

print(f"API Key detectada: {API_KEY[:10]}...")

try:
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(f"Modelo disponible: {m.name}")
except Exception as e:
    print(f"Error al listar modelos: {e}")
