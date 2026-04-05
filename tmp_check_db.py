import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv('../.env') # Localizar .env en la raíz

URL = os.getenv("SUPABASE_URL")
KEY = os.getenv("SUPABASE_KEY")

def check_supabase():
    try:
        supabase: Client = create_client(URL, KEY)
        print(f"--- Diagnóstico Supabase ({URL}) ---")
        
        # Intentar leer cada tabla para ver si existen
        tables = ['users', 'chats', 'verification_codes']
        for table in tables:
            try:
                # Intentamos un select vacío de 1 fila
                res = supabase.table(table).select("*").limit(1).execute()
                print(f"✅ Tabla '{table}': EXISTE")
            except Exception as e:
                error_msg = str(e)
                if "404" in error_msg or "PGRST204" in error_msg or "PGRST205" in error_msg:
                    print(f"❌ Tabla '{table}': NO EXISTE (Error: {error_msg})")
                else:
                    print(f"⚠️ Tabla '{table}': ERROR DESCONOCIDO ({error_msg})")
                    
    except Exception as e:
        print(f"💥 Error de conexión general: {str(e)}")

if __name__ == "__main__":
    check_supabase()
