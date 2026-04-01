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
# PERSONALIDADES DE LA IA
# ===========================
MODOS = {
    "matematicas": {
        "nombre": "Tutor de Matemáticas",
        "prompt": "Eres un tutor de matemáticas experto y paciente. Explica paso a paso con ejemplos."
    },
    "legal": {
        "nombre": "Asistente Legal",
        "prompt": "Eres un asistente legal especializado en las leyes venezolanas. Explica de forma clara y accesible."
    },
    "chef": {
        "nombre": "Chef Recetas",
        "prompt": "Eres un chef profesional. Sugiere recetas creativas con los ingredientes que te den."
    },
    "psicologo": {
        "nombre": "Apoyo Emocional",
        "prompt": "Eres un psicólogo virtual. Escucha activamente y ayuda con empatía y sin juicios."
    }
}

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
    modo = data.get('modo', 'matematicas')
    user_email = data.get('email', 'invitado@iacastillo.com')
    
    # Si el frontend no manda chat_id, creamos uno nuevo
    chat_id = data.get('chat_id')
    if not chat_id:
        chat_id = str(uuid.uuid4())

    if not user_message:
        return jsonify({"respuesta": "¿En qué puedo ayudarte?", "chat_id": chat_id}), 400

    config_modo = MODOS.get(modo, MODOS["matematicas"])

    try:
        # 1. Recuperar memoria REAL de este chat desde Supabase
        history_data = supabase.table('chats').select('role', 'content').eq('chat_id', chat_id).order('created_at', desc=False).execute()
        
        # 2. Formatear la historia para que Gemini la entienda
        formatted_history = []
        for msg in history_data.data:
            role = 'model' if msg['role'] == 'ai' else 'user'
            formatted_history.append({"role": role, "parts": [msg['content']]})

        # 3. Iniciar el cerebro de Gemini con toda la memoria pasada
        modelo = genai.GenerativeModel(
            model_name='gemini-flash-latest',
            system_instruction=config_modo["prompt"]
        )
        chat_session = modelo.start_chat(history=formatted_history)

        # 4. Guardar mensaje del usuario en Base de Datos
        supabase.table('chats').insert({
            'user_email': user_email,
            'chat_id': chat_id,
            'role': 'user',
            'content': user_message,
            'modo': modo
        }).execute()

        # 5. Generar respuesta de Gemini
        response = chat_session.send_message(user_message)
        respuesta_ia = response.text

        # 6. Guardar respuesta de la IA en Base de Datos
        supabase.table('chats').insert({
            'user_email': user_email,
            'chat_id': chat_id,
            'role': 'ai',
            'content': respuesta_ia,
            'modo': modo
        }).execute()

        return jsonify({"respuesta": respuesta_ia, "chat_id": chat_id})
    
    except Exception as e:
        return jsonify({"respuesta": f"Lo siento, mis servidores están saturados: {str(e)}", "chat_id": chat_id}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
