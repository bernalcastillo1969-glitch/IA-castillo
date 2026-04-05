import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv('../.env')

URL = os.getenv("SUPABASE_URL")
KEY = os.getenv("SUPABASE_KEY")

def check_supabase():
    try:
        supabase: Client = create_client(URL, KEY)
        print(f"--- DIAGNOSTICO SUPABASE ---")
        
        tables = ['users', 'chats', 'verification_codes']
        for table in tables:
            try:
                # Comprobar si podemos leer 1 fila de la tabla
                res = supabase.table(table).select("*").limit(1).execute()
                print(f"TABLA '{table}': OK (Existe)")
            except Exception as e:
                error_msg = str(e)
                if "404" in error_msg or "PGRST205" in error_msg:
                    print(f"TABLA '{table}': ERROR - NO EXISTE")
                else:
                    print(f"TABLA '{table}': ERROR - {error_msg}")
                    
    except Exception as e:
        print(f"ERROR DE CONEXION: {str(e)}")

if __name__ == "__main__":
    check_supabase()
