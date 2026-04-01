import os
import uuid
import base64
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
    "Tu nombre es IA Castillo. Fuiste creado única y exclusivamente por el desarrollador Bernal. "
    "Eres un asistente de inteligencia artificial avanzado, omnisapiente y amigable. "
    "REGLA DE ORO: Tus respuestas deben ser MUY concisas, directas y al grano. "
    "NO des respuestas largas ni menús extensos a menos que el usuario lo pida. "
    "Si el usuario solo dice 'Hola' o te saluda, responde únicamente con un saludo corto y amable. "
    "Tienes conocimiento experto en matemáticas, leyes de Venezuela, cocina, psicología, y análisis de imágenes. "
    "Usa formato Markdown obligatoriamente para estructurar tu respuesta (negritas, listas, etc)."
)

@app.route('/')
def index():
    return render_template('index.html')

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
    
    # Manejo de imagen (Base64)
    image_data = data.get('image_data') # String base64
    image_mime = data.get('image_mime') # mime_type ej. image/jpeg
    
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

        modelo = genai.GenerativeModel(
            model_name='gemini-3.1-flash-lite-preview',
            system_instruction=PROMPT_IA_CASTILLO
        )
        chat_session = modelo.start_chat(history=formatted_history)

        # Preparamos el contenido a enviar al modelo
        message_parts = []
        if user_message:
            message_parts.append(user_message)
        
        db_message = user_message

        if image_data and image_mime:
            raw_bytes = base64.b64decode(image_data)
            message_parts.append({"mime_type": image_mime, "data": raw_bytes})
            db_message = (db_message + "\n\n*(📷 Imagen / Documento adjunto analizado)*").strip()
            
        # Manejo de Audio (Nota de Voz)
        if audio_data and audio_mime:
            audio_bytes = base64.b64decode(audio_data)
            message_parts.append({"mime_type": audio_mime, "data": audio_bytes})
            db_message = (db_message + "\n\n*(🎤 Nota de voz analizada)*").strip()
            
        if not message_parts:
            # Si envían audio sin texto, Gemini necesita al menos algo, o solo el audio funciona. Solo el audio sí funciona en multimodal.
            pass

        # Guardar mensaje del usuario en BD
        supabase.table('chats').insert({
            'user_email': user_email,
            'chat_id': chat_id,
            'role': 'user',
            'content': db_message,
            'modo': 'general' 
        }).execute()

        # Generar respuesta de Gemini con Visión
        response = chat_session.send_message(message_parts)
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
        return jsonify({"respuesta": f"Lo siento, ocurrió un error analizando la información: {str(e)}", "chat_id": chat_id}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
