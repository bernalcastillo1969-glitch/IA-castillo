import os
import uuid
import base64
import random
import string
import requests
import json
from flask import Flask, render_template, request, jsonify, redirect, url_for, session
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Configurar Flask
app = Flask(__name__, template_folder='../templates', static_folder='../static')
app.secret_key = os.getenv("SECRET_KEY", "super_ia_castillo_key")

# Configurar Supabase con protección total - Si falla, no mata la web
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = None
if SUPABASE_URL and SUPABASE_KEY:
    try:
        from supabase import create_client
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    except:
        pass

# Configurar Flask-Mail (Registro)
from flask_mail import Mail, Message
mail = None
try:
    app.config['MAIL_SERVER'] = os.getenv("MAIL_SERVER", "smtp.gmail.com")
    app.config['MAIL_PORT'] = int(os.getenv("MAIL_PORT", 587))
    app.config['MAIL_USE_TLS'] = os.getenv("MAIL_USE_TLS", "True").lower() == "true"
    app.config['MAIL_USERNAME'] = os.getenv("MAIL_USERNAME")
    app.config['MAIL_PASSWORD'] = os.getenv("MAIL_PASSWORD")
    mail = Mail(app)
except:
    pass

# PERSONALIDAD UNIFICADA (Senior Digital Assistant)
PROMPT_IA_CASTILLO = (
    "Eres IA Castillo, un asistente de élite diseñado por Bernal. Tu objetivo es ser brillante, eficiente y profesional. "
    "Misión: Dar respuestas claras y bien explicadas, pero sin relleno innecesario. "
    "Estilo: Moderno, directo y útil. Si el usuario pide más detalle, ofrécelo. Sin cortesías vacías tipo 'Hola, aquí tienes'. "
    "Importante: Mantén la respuesta limpia y usa **negritas** para conceptos clave."
)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/stats')
def view_stats():
    return "Consola IA Castillo"

@app.route('/chat', methods=['POST'])
def chat_handler():
    try:
        data = request.get_json()
        # Sincronización de campo mensaje/prompt
        raw_msg = data.get('mensaje') or data.get('prompt') or ''
        user_email = data.get('email', 'invitado@iacastillo.com')
        cid = data.get('chat_id') or str(uuid.uuid4())
        
        # Imports locales para evitar fallos de arranque
        from ai_client import AIFactory
        
        image_data = data.get('image_data')
        audio_data = data.get('audio_data')
        
        if not raw_msg and not image_data and not audio_data:
            return jsonify({"respuesta": "¿Qué quieres saber?", "chat_id": cid}), 400

        # Llamar al cerebro de IA
        has_multimodal = bool(image_data or audio_data)
        provider = AIFactory.get_provider(has_multimodal)
        
        m_parts = []
        if image_data:
            m_parts.append({"mime_type": data.get('image_mime', 'image/png'), "data": base64.b64decode(image_data)})
        if audio_data:
            m_parts.append({"mime_type": data.get('audio_mime', 'audio/wav'), "data": base64.b64decode(audio_data)})

        # Ejecución
        respuesta = provider.get_response(raw_msg, PROMPT_IA_CASTILLO, [], m_parts)

        # Guardado opcional en Supabase
        if supabase:
            try:
                supabase.table("chats").insert({'user_email': user_email, 'chat_id': cid, 'role': 'user', 'content': raw_msg}).execute()
                supabase.table("chats").insert({'user_email': user_email, 'chat_id': cid, 'role': 'ai', 'content': respuesta}).execute()
            except: pass

        return jsonify({"respuesta": respuesta, "chat_id": cid})
    except Exception as e:
        return jsonify({"respuesta": f"IA Castillo se está reiniciando: {str(e)}", "chat_id": cid}), 500

@app.route('/tts', methods=['POST'])
def speech_handler():
    data = request.get_json()
    txt = data.get('text', '')
    ckey = os.getenv("CARTESIA_API_KEY", "sk_car_KT8B4SrQ4RH82pbuU2dcHM")
    try:
        r = requests.post("https://api.cartesia.ai/tts/bytes", 
            headers={"X-API-Key": ckey, "Cartesia-Version": "2024-06-10", "Content-Type": "application/json"},
            json={"model_id": "sonic-multilingual", "transcript": txt, "voice": {"mode": "id", "id": os.getenv("CARTESIA_VOICE_ID", "a0e99829-27f8-4071-81cb-ff5421605528")}, "output_format": {"container": "mp3", "encoding": "pcm_f32_le", "sample_rate": 44100}},
            timeout=15
        )
        return (r.content, 200, {'Content-Type': 'audio/mpeg'})
    except:
        return jsonify({"error": "TTS Down"}), 500

if __name__ == '__main__':
    app.run(debug=True)
