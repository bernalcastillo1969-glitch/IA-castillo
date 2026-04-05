import os
import sys
from supabase import create_client, Client
from dotenv import load_dotenv
import google.generativeai as genai

# Cargar variables
load_dotenv('../.env')
URL = os.getenv("SUPABASE_URL")
KEY = os.getenv("SUPABASE_KEY")
AI_KEY = os.getenv("GEMINI_API_KEY")

def test_full_flow():
    print("--- INICIANDO SUPER DIAGNOSTICO ---")
    
    # 1. Probar Supabase
    try:
        supabase: Client = create_client(URL, KEY)
        print("1. Conexión a Supabase: OK")
        
        # Test de inserción (usando un email de prueba)
        test_chat = {
            'user_email': 'test_diagnostico@iacastillo.com',
            'chat_id': 'test-123',
            'role': 'user',
            'content': 'Test de diagnóstico'
        }
        res = supabase.table('chats').insert(test_chat).execute()
        print("2. Inserción en tabla 'chats': OK")
        
    except Exception as e:
        print(f"ERROR EN SUPABASE: {str(e)}")
        return

    # 2. Probar Gemini
    try:
        genai.configure(api_key=AI_KEY)
        model = genai.GenerativeModel("gemini-1.5-flash-latest")
        response = model.generate_content("Hola, dime 'IA Castillo Online'")
        print(f"3. Respuesta de Gemini: {response.text.strip()}")
        print("--- DIAGNOSTICO COMPLETADO CON EXITO ---")
        
    except Exception as e:
        print(f"ERROR EN GEMINI: {str(e)}")

if __name__ == "__main__":
    test_full_flow()
