import os
import uuid
import base64
import random
import string
import requests
from flask import Flask, render_template, request, jsonify, redirect, url_for, session
from ai_client import AIFactory
from dotenv import load_dotenv
from supabase import create_client, Client
from flask_mail import Mail, Message

# Cargar variables de entorno
load_dotenv()

# Configurar Flask
app = Flask(__name__, template_folder='../templates', static_folder='../static')
app.secret_key = os.getenv("SECRET_KEY", "supersecretkey")

# Configuración de APIs manejada por ai_client.py

# Configurar Supabase Database
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Configurar Flask-Mail
app.config['MAIL_SERVER'] = os.getenv("MAIL_SERVER", "smtp.gmail.com")
app.config['MAIL_PORT'] = int(os.getenv("MAIL_PORT", 587))
app.config['MAIL_USE_TLS'] = os.getenv("MAIL_USE_TLS", "True").lower() == "true"
app.config['MAIL_USERNAME'] = os.getenv("MAIL_USERNAME")
app.config['MAIL_PASSWORD'] = os.getenv("MAIL_PASSWORD")
app.config['MAIL_DEFAULT_SENDER'] = os.getenv("MAIL_DEFAULT_SENDER", app.config['MAIL_USERNAME'])
mail = Mail(app)

# ===========================
# PERSONALIDAD UNIFICADA (Senior Hacker Mode)
# ===========================
PROMPT_IA_CASTILLO = (
    "Tu nombre es IA Castillo, creado por Bernal. Actúa como un colaborador auténtico y adaptativo. "
    "Tu meta es resolver la verdadera intención del usuario con respuestas perspicaces, claras y concisas. "
    "Háblale como un compañero que sabe mucho, no como un profesor rígido. "
    "Tus reglas de comportamiento: "
    "1. Tono Humano: Adapta tu energía y humor al estilo del usuario. Usa palabras sencillas y cotidianas a menos que el tema sea técnico. "
    "2. Sin Relleno: Sé directo. Si te preguntan algo simple, responde directo. No metas introducciones aburridas como 'Entiendo tu duda' o 'Aquí tienes la información'. "
    "3. Prioriza la Intención: No solo respondas lo que dicen, responde lo que necesitan. Si ves una forma mejor de hacer las cosas, dila con confianza. "
    "4. Formato Limpio: Usa negritas en lo importante para que se pueda leer rápido. "
    "5. Cierre Proactivo: Termina siempre con una sola propuesta o pregunta clave para avanzar, sin sonar como un cuestionario."
)


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    
    if not email:
        return jsonify({"error": "Email requerido"}), 400
    
    # Generar código de verificación
    code = ''.join(random.choices(string.digits, k=6))
    
    # Guardar código en Supabase (asumiendo tabla códigos_de_verificación con columnas: email, code, created_at)
    try:
        supabase.table('códigos_de_verificación').insert({
            'email': email,
            'code': code
        }).execute()
    except Exception as e:
        return jsonify({"error": f"Error guardando código: {str(e)}"}), 500
    
    # Enviar email
    try:
        msg = Message("Código de verificación - IA Castillo", recipients=[email])
        msg.body = f"Tu código de verificación es: {code}"
        mail.send(msg)
        return jsonify({"message": "Código enviado al email"}), 200
    except Exception as e:
        return jsonify({"error": f"Error enviando email: {str(e)}"}), 500


@app.route('/verify', methods=['POST'])
def verify():
    data = request.get_json()
    email = data.get('email')
    code = data.get('code')
    
    if not email or not code:
        return jsonify({"error": "Email y código requeridos"}), 400
    
    # Verificar código en Supabase
    try:
        response = supabase.table('códigos_de_verificación').select('*').eq('email', email).eq('code', code).execute()
        if response.data:
            # Código válido, eliminarlo y marcar usuario como verificado
            supabase.table('códigos_de_verificación').delete().eq('email', email).eq('code', code).execute()
            # Insertar en tabla usuarios (asumiendo tabla usuarios con columnas email, verified)
            supabase.table('usuarios').insert({
                'email': email,
                'verified': True
            }).execute()
            return jsonify({"message": "Usuario verificado"}), 200
        else:
            return jsonify({"error": "Código inválido"}), 400
    except Exception as e:
        return jsonify({"error": f"Error verificando: {str(e)}"}), 500


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/manifest.json')
def manifest():
    return app.send_static_file('manifest.json')

@app.route('/sw.js')
def service_worker():
    return app.send_static_file('sw.js')

@app.route('/stats')
def stats():
    try:
        # Consulta rápida a Supabase para contar usuarios y mensajes
        response = supabase.table('chats').select('user_email').execute()
        all_emails = [r['user_email'] for r in response.data]
        unique_users = len(set(all_emails)) if all_emails else 0
        total_messages = len(all_emails)
        
        return f"""
        <html>
            <head>
                <title>Stats | IA Castillo</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
            </head>
            <body class="bg-[#131314] text-[#e3e3e3] flex items-center justify-center h-screen font-sans">
                <div class="bg-[#1e1f20] p-10 rounded-[40px] border border-gray-800 shadow-2xl text-center max-w-lg w-full mx-4">
                    <div class="flex justify-center mb-6">
                        <div class="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center border border-blue-500/30">
                            <i class="fa-solid fa-chart-line text-blue-400 text-2xl"></i>
                        </div>
                    </div>
                    <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-8">Panel de Bernal</h1>
                    
                    <div class="grid grid-cols-2 gap-6">
                        <div class="bg-[#131314] p-6 rounded-3xl border border-gray-800">
                            <p class="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-1">Usuarios</p>
                            <p class="text-3xl font-bold">{unique_users}</p>
                        </div>
                        <div class="bg-[#131314] p-6 rounded-3xl border border-gray-800">
                            <p class="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-1">Mensajes</p>
                            <p class="text-3xl font-bold">{total_messages}</p>
                        </div>
                    </div>
                    
                    <p class="mt-10 text-gray-600 text-[11px] font-medium tracking-tight">Estadísticas reales registradas en Supabase.</p>
                </div>
            </body>
        </html>
        """
    except Exception as e:
        return f"Error al cargar estadísticas: {str(e)}"

@app.route('/history', methods=['POST'])
def get_history():
    data = request.get_json()
    user_email = data.get('email')
    
    if not user_email:
        return jsonify([])

    try:
        response = supabase.table('chats').select('*').eq('user_email', user_email).order('created_at', desc=False).execute()
        return jsonify(response.data)
    except Exception as e:
        print("Error fetch history:", e)
        return jsonify([])

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('mensaje', '')
    user_email = data.get('email', 'invitado@iacastillo.com')
    
    # Chat libre (Verificación desactivada por petición del usuario para simplificar el acceso)
    
    # Manejo de imagen (Base64)
    image_data = data.get('image_data') 
    image_mime = data.get('image_mime') 
    
    # Manejo de Audio (Nota de Voz)
    audio_data = data.get('audio_data')
    audio_mime = data.get('audio_mime')
    
    chat_id = data.get('chat_id')
    if not chat_id:
        chat_id = str(uuid.uuid4())

    if not user_message and not image_data and not audio_data:
        return jsonify({"respuesta": "¿En qué puedo ayudarte hoy?", "chat_id": chat_id}), 400

    try:
        # Recuperar memoria de este chat desde Supabase
        history_data = supabase.table('chats').select('role', 'content').eq('chat_id', chat_id).order('created_at', desc=False).execute()
        
        formatted_history = []
        for msg in history_data.data:
            role = 'model' if msg['role'] == 'ai' else 'user'
            formatted_history.append({"role": role, "parts": [msg['content']]})

        # Detectar si es multimodal (imagen o audio)
        has_multimodal = bool((image_data and image_mime) or (audio_data and audio_mime))
        
        # Obtener el proveedor adecuado (Groq para texto, Gemini para multimodal)
        provider = AIFactory.get_provider(has_multimodal)
        
        multimodal_parts = []
        db_message = user_message

        if image_data and image_mime:
            raw_bytes = base64.b64decode(image_data)
            multimodal_parts.append({"mime_type": image_mime, "data": raw_bytes})
            db_message = (db_message + "\n\n*(📷 Imagen / Documento adjunto analizado)*").strip()
            
        if audio_data and audio_mime:
            audio_bytes = base64.b64decode(audio_data)
            multimodal_parts.append({"mime_type": audio_mime, "data": audio_bytes})
            db_message = (db_message + "\n\n*(🎤 Nota de voz analizada)*").strip()

        # Guardar mensaje del usuario en BD
        supabase.table('chats').insert({
            'user_email': user_email,
            'chat_id': chat_id,
            'role': 'user',
            'content': db_message,
            'modo': 'general' 
        }).execute()

        # Generar respuesta usando el proveedor seleccionado
        respuesta_ia = provider.get_response(
            prompt=user_message,
            system_instruction=PROMPT_IA_CASTILLO,
            history=formatted_history,
            multimodal_parts=multimodal_parts
        )

        # Guardar respuesta IA en BD
        supabase.table('chats').insert({
            'user_email': user_email,
            'chat_id': chat_id,
            'role': 'ai',
            'content': respuesta_ia,
            'modo': 'general'
        }).execute()

        return jsonify({"respuesta": respuesta_ia, "chat_id": chat_id})
    
    except Exception as e:
        return jsonify({"respuesta": f"Lo siento, ocurrió un error analizando la información: {str(e)}", "chat_id": chat_id}), 500

@app.route('/tts', methods=['POST'])
def text_to_speech():
    data = request.get_json()
    text = data.get('text', '')
    if not text:
        return jsonify({"error": "No hay texto para procesar"}), 400

    api_key = os.getenv("CARTESIA_API_KEY")
    voice_id = os.getenv("CARTESIA_VOICE_ID", "a0e99829-27f8-4071-81cb-ff5421605528") # Voz 'Baron'

    url = "https://api.cartesia.ai/tts/bytes"
    headers = {
        "X-API-Key": api_key,
        "Cartesia-Version": "2024-06-10",
        "Content-Type": "application/json"
    }
    
    # Configuración sónica para latencia ultra-baja
    payload = {
        "model_id": "sonic-multilingual",
        "voice": {
            "mode": "id",
            "id": voice_id
        },
        "transcript": text,
        "output_format": {
            "container": "mp3",
            "bit_rate": 128000,
            "sample_rate": 44100
        }
    }

    try:
        response = requests.post(url, json=payload, headers=headers)
        if response.status_code == 200:
            return response.content, 200, {'Content-Type': 'audio/mpeg'}
        else:
            # Fallback a ElevenLabs si Cartesia falla (Cortesía Bernal)
            print("Cartesia falló, usando ElevenLabs como respaldo...")
            api_key_eb = os.getenv("ELEVENLABS_API_KEY")
            voice_id_eb = os.getenv("ELEVENLABS_VOICE_ID", "pNInz6ovhh93X5msDxMN")
            eb_url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id_eb}"
            eb_headers = {"xi-api-key": api_key_eb, "Content-Type": "application/json"}
            eb_payload = {"text": text, "model_id": "eleven_multilingual_v2"}
            eb_res = requests.post(eb_url, json=eb_payload, headers=eb_headers)
            if eb_res.status_code == 200:
                return eb_res.content, 200, {'Content-Type': 'audio/mpeg'}
            return jsonify({"error": f"Ambos servicios fallaron. Cartesia: {response.text}"}), response.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
