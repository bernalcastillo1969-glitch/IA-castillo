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

# Configurar Supabase con protección total
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = None
if SUPABASE_URL and SUPABASE_KEY:
    try:
        from supabase import create_client
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    except: pass

# Configurar Flask-Mail
from flask_mail import Mail, Message
mail = None
try:
    app.config.update(
        MAIL_SERVER=os.getenv("MAIL_SERVER", "smtp.gmail.com"),
        MAIL_PORT=int(os.getenv("MAIL_PORT", 587)),
        MAIL_USE_TLS=os.getenv("MAIL_USE_TLS", "True").lower() == "true",
        MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
        MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
        MAIL_DEFAULT_SENDER=os.getenv("MAIL_USERNAME")
    )
    mail = Mail(app)
except: pass

# PERSONALIDAD UNIFICADA
PROMPT_IA_CASTILLO = (
    "Eres IA Castillo, un asistente de élite diseñado por Bernal. Tu objetivo es ser brillante, eficiente y profesional. "
    "Misión: Respuestas claras, bien explicadas, sin relleno. Estilo: Moderno y directo. "
    "Importante: Usa **negritas** para conceptos clave."
)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/history', methods=['POST'])
def history_handler():
    data = request.get_json()
    email = data.get('email')
    if not email or not supabase: return jsonify([])
    try:
        resp = supabase.table("chats").select('*').eq('user_email', email).order('created_at').execute()
        return jsonify(resp.data)
    except: return jsonify([])

@app.route('/register', methods=['POST'])
def register_handler():
    data = request.get_json()
    email = data.get('email')
    if not email: return jsonify({"error": "Falta email"}), 400
    code = ''.join(random.choices(string.digits, k=6))
    try:
        if supabase: supabase.table("códigos_de_verificación").insert({'email': email, 'code': code}).execute()
        if mail:
            msg = Message("Código IA Castillo", recipients=[email])
            msg.body = f"Tu código: {code}"
            mail.send(msg)
        return jsonify({"message": "Código enviado"}), 200
    except: return jsonify({"error": "Error registro"}), 500

@app.route('/verify', methods=['POST'])
def verify_handler():
    data = request.get_json()
    email, code = data.get('email'), data.get('code')
    try:
        if supabase:
            resp = supabase.table("códigos_de_verificación").select('*').eq('email', email).eq('code', code).execute()
            if resp.data:
                supabase.table("códigos_de_verificación").delete().eq('email', email).eq('code', code).execute()
                supabase.table("usuarios").upsert({'email': email, 'verified': True}).execute()
                return jsonify({"message": "OK"}), 200
        return jsonify({"error": "Inválido"}), 400
    except: return jsonify({"error": "Error"}), 500

@app.route('/chat', methods=['POST'])
def chat_handler():
    try:
        data = request.get_json()
        raw_msg = data.get('mensaje') or data.get('prompt') or ''
        user_email = data.get('email', 'invitado@iacastillo.com')
        cid = data.get('chat_id') or str(uuid.uuid4())
        
        from ai_client import AIFactory
        image_data, audio_data = data.get('image_data'), data.get('audio_data')

        if not raw_msg and not image_data and not audio_data:
            return jsonify({"respuesta": "¿Qué quieres saber?", "chat_id": cid}), 400

        # RECUPERAR HISTORIAL REAL
        history = []
        if supabase:
            try:
                h_data = supabase.table("chats").select('role', 'content').eq('chat_id', cid).order('created_at').execute()
                history = [{"role": ('model' if m['role'] == 'ai' else 'user'), "parts": [m['content']]} for m in h_data.data]
            except: pass

        provider = AIFactory.get_provider(bool(image_data or audio_data))
        m_parts = []
        if image_data: m_parts.append({"mime_type": data.get('image_mime', 'image/png'), "data": base64.b64decode(image_data)})
        if audio_data: m_parts.append({"mime_type": data.get('audio_mime', 'audio/wav'), "data": base64.b64decode(audio_data)})

        respuesta = provider.get_response(raw_msg, PROMPT_IA_CASTILLO, history, m_parts)

        if supabase:
            try:
                supabase.table("chats").insert({'user_email': user_email, 'chat_id': cid, 'role': 'user', 'content': raw_msg}).execute()
                supabase.table("chats").insert({'user_email': user_email, 'chat_id': cid, 'role': 'ai', 'content': respuesta}).execute()
            except: pass

        return jsonify({"respuesta": respuesta, "chat_id": cid})
    except Exception as e:
        return jsonify({"respuesta": f"Reintentando: {str(e)}", "chat_id": cid}), 500

@app.route('/stats')
def stats_view():
    try:
        if not supabase: return "Servicio base no disponible"
        r = supabase.table('chats').select('user_email').execute()
        emails = [x['user_email'] for x in r.data]
        return f"Usuarios: {len(set(emails))} | Mensajes: {len(emails)}"
    except: return "Panel en mantenimiento"

@app.route('/tts', methods=['POST'])
def tts_handler():
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
    except: return jsonify({"error": "TTS Down"}), 500

if __name__ == '__main__':
    app.run(debug=True)
