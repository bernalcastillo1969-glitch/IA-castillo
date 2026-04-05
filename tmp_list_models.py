import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv('../.env')
AI_KEY = os.getenv("GEMINI_API_KEY")

def list_my_models():
    print("--- CONSULTANDO MODELOS DISPONIBLES ---")
    try:
        genai.configure(api_key=AI_KEY)
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                print(f"Modelo: {m.name}")
        print("--- FIN DE LISTA ---")
    except Exception as e:
        print(f"ERROR: {str(e)}")

if __name__ == "__main__":
    list_my_models()
