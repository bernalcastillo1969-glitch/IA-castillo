import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

# Configuración
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

if not url or not key:
    print("❌ Faltan credenciales en el .env")
    exit()

supabase = create_client(url, key)

try:
    print(f"🔍 Conectando a Supabase para verificar logs en 'logs_acceso'...")
    # Intentar obtener los últimos 10 logs
    response = supabase.table("logs_acceso").select("*").order("created_at", desc=True).limit(10).execute()
    
    if response.data:
        print(f"✅ ¡ÉXITO! Se encontraron {len(response.data)} registros recientes:")
        print("-" * 50)
        for log in response.data:
            print(f"🌐 IP: {log.get('ip_usuario')} | 📍 Ruta: {log.get('ruta_visitada')} | 🕒 Fecha: {log.get('created_at')}")
            print(f"📱 Disp: {log.get('dispositivo')[:80]}...")
            print("-" * 50)
    else:
        print("⚠️ No se encontraron registros en 'logs_acceso'. ¿Ya has visitado la web en Vercel?")
        
except Exception as e:
    print(f"❌ Error al consultar logs: {e}")
    if "relation \"public.logs_acceso\" does not exist" in str(e):
        print("\n💡 CONSEJO: La tabla 'logs_acceso' aún no existe en tu Supabase. ¡Créala para que funcione!")
