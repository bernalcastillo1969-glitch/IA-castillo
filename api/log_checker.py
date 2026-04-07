import os
from supabase import create_client
from dotenv import load_dotenv

# Cargar .env desde la raiz
load_dotenv(os.path.join(os.path.dirname(__file__), '../.env'))

# Configuracion
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

if not url or not key:
    print("ERR: Faltan credenciales en el .env")
    exit()

supabase = create_client(url, key)

try:
    print(f"Conectando a Supabase para verificar logs en 'logs_acceso'...")
    # Intentar obtener los ultimos 10 logs
    response = supabase.table("logs_acceso").select("*").order("created_at", desc=True).limit(10).execute()
    
    if response.data:
        print(f"EXITO: Se encontraron {len(response.data)} registros recientes:")
        print("-" * 50)
        for log in response.data:
            print(f"IP: {log.get('ip_usuario')} | Ruta: {log.get('ruta_visitada')} | Fecha: {log.get('created_at')}")
            print(f"Disp: {str(log.get('dispositivo'))[:80]}...")
            print("-" * 50)
    else:
        print("AVISO: No se encontraron registros en 'logs_acceso'.")
        print("CONSEJO: Visita tu pagina web en Vercel y vuelve a correr este test.")
        
except Exception as e:
    print(f"ERR: Error al consultar logs: {str(e)}")
    if "relation \"public.logs_acceso\" does not exist" in str(e).lower():
        print("CONSEJO: La tabla 'logs_acceso' aun no existe en tu Supabase. Cree la tabla con las columnas ip_usuario, ruta_visitada y dispositivo.")
