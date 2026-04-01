import os
import uuid
from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
from dotenv import load_dotenv
from supabase import create_client, Client

# Cargar variables de entorno
load_dotenv()

# Configurar Flask
app = Flask(__name__)

# Configurar Gemini API
API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=API_KEY)

# Configurar Supabase Database
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# ===========================
# PERSONALIDAD UNIFICADA
# ===========================
PROMPT_IA_CASTILLO = (
    "Eres IA Castillo, un asistente de inteligencia artificial avanzado y súper inteligente, "
    "desarrollado por Bernal en colaboración con el modelo de Gemini. Eres omnisapiente, amigable, "
    "altamente profesional pero conversacional y extremadamente útil. Tienes conocimiento experto "
    "como si fueras un Tutor de Matemáticas (detallista paso a paso), un Asistente en Leyes de "
    "Venezuela, un Chef de Cocina, y un Psicólogo que da apoyo emocional. Tu trabajo es interpretar "
    "inmediatamente qué necesita el usuario y darle la mejor y más completa respuesta sin preguntar en "
    "qué modo debe ponerse. Siempre háblale al usuario directamente. Usa formatos de Markdown (negritas, "
    "listas) para que tu texto sea muy atractivo."
)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/history', methods=['POST'])
def get_history():
    """Devuelve todo el historial de chats de un usuario específico."""
    data = request.get_json()
    user_email = data.get('email')
    
    if not user_email:
        return jsonify([])

    try:
        # Traer todos los mensajes del usuario desde Supabase
        response = supabase.table('chats').select('*').eq('user_email', user_email).order('created_at', desc=False).execute()
        return jsonify(response.data)
    except Exception as e:
        print("Error fetch history:", e)
        return jsonify([])

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('mensaje')
    user_email = data.get('email', 'invitado@iacastillo.com')
    
    # Si el frontend no manda chat_id, creamos uno nuevo
    chat_id = data.get('chat_id')
    if not chat_id:
        chat_id = str(uuid.uuid4())

    if not user_message:
        return jsonify({"respuesta": "¿En qué puedo ayudarte hoy?", "chat_id": chat_id}), 400

    try:
        # Recuperar memoria REAL de este chat desde Supabase
        history_data = supabase.table('chats').select('role', 'content').eq('chat_id', chat_id).order('created_at', desc=False).execute()
        
        # Formatear la historia para que Gemini la entienda
        formatted_history = []
        for msg in history_data.data:
            role = 'model' if msg['role'] == 'ai' else 'user'
            formatted_history.append({"role": role, "parts": [msg['content']]})

        # Iniciar el cerebro unificado
        modelo = genai.GenerativeModel(
            model_name='gemini-3.1-flash-lite-preview',
            system_instruction=PROMPT_IA_CASTILLO
        )
        chat_session = modelo.start_chat(history=formatted_history)

        # Guardar mensaje del usuario en BD
        supabase.table('chats').insert({
            'user_email': user_email,
            'chat_id': chat_id,
            'role': 'user',
            'content': user_message,
            'modo': 'general' # Modo general único para la BD
        }).execute()

        # Generar respuesta de Gemini
        response = chat_session.send_message(user_message)
        respuesta_ia = response.text

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
        return jsonify({"respuesta": f"Lo siento, mis servidores están en mantenimiento temporal: {str(e)}", "chat_id": chat_id}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
