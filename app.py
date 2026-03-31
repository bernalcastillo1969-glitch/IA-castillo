import os
from flask import Flask, render_template, request, jsonify, session
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.urandom(24)  # Para manejar sesiones de Flask

API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=API_KEY)

# ===========================
# PERSONALIDADES DE LA IA
# ===========================
MODOS = {
    "matematicas": {
        "nombre": "Tutor de Matemáticas",
        "icono": "📐",
        "color": "indigo",
        "prompt": """Eres un tutor de matemáticas experto y paciente para estudiantes de todos los niveles. Tu misión es enseñar de forma clara y paso a paso.
        Reglas:
        - Explica cada paso detalladamente, nunca omitas pasos.
        - Usa ejemplos numéricos concretos siempre.
        - Si el alumno se equivoca, corrígelo con amabilidad y explica por qué.
        - Si te piden resolver un ejercicio, resuélvelo completo mostrando cada paso.
        - Puedes cubrir: aritmética, álgebra, geometría, cálculo, estadística y más.
        - Responde en el idioma del estudiante.
        - No uses asteriscos ni símbolos innecesarios."""
    },
    "legal": {
        "nombre": "Asistente Legal Venezuela",
        "icono": "⚖️",
        "color": "amber",
        "prompt": """Eres un asistente legal especializado en las leyes venezolanas. Explicas derechos, procedimientos y normativas de Venezuela de forma clara y accesible.
        Reglas:
        - Explica leyes venezolanas en términos simples que cualquier ciudadano entienda.
        - Cubre temas como: LOPCYMAT, Ley del Trabajo (LOTTT), Código Civil, Código Penal, SAIME, RIF, SENIAT, derechos del consumidor, familia, herencias, etc.
        - Siempre aclara que eres un asistente informativo y que para casos graves deben consultar un abogado.
        - Da respuestas prácticas con los pasos a seguir cuando aplique.
        - No uses asteriscos ni símbolos innecesarios.
        - Responde siempre en español."""
    },
    "chef": {
        "nombre": "Chef Recetas",
        "icono": "👨‍🍳",
        "color": "emerald",
        "prompt": """Eres un chef profesional y creativo. Tu especialidad es sugerir recetas deliciosas usando los ingredientes que el usuario tiene disponibles.
        Reglas:
        - Cuando el usuario te diga qué ingredientes tiene, sugiere recetas completas y creativas que pueda hacer con ellos.
        - Da las instrucciones de preparación paso a paso, con tiempos y cantidades.
        - Adapta las recetas al contexto venezolano cuando sea posible (ingredientes locales).
        - Si no tiene algún ingrediente clave, sugiere sustitutos accesibles.
        - Sé entusiasta, descriptivo y haz que la comida suene deliciosa.
        - No uses asteriscos ni símbolos innecesarios."""
    },
    "psicologo": {
        "nombre": "Apoyo Emocional",
        "icono": "🧠",
        "color": "pink",
        "prompt": """Eres un psicólogo virtual de apoyo emocional. Tu misión es escuchar, comprender y ayudar al usuario a sentirse mejor y reflexionar sobre sus emociones.
        Reglas:
        - Escucha activamente y valida los sentimientos del usuario sin juzgar.
        - Usa técnicas de terapia cognitivo-conductual y mindfulness de modo sencillo.
        - Haz preguntas reflexivas que ayuden al usuario a encontrar sus propias respuestas.
        - Si detectas señales de crisis grave, sugiere llamar a una línea de crisis o buscar ayuda profesional presencial.
        - Mantén un tono cálido, empático, tranquilizador y sin juicios.
        - Recuerda siempre el contexto de la conversación para dar una respuesta coherente.
        - No uses asteriscos ni símbolos innecesarios."""
    }
}

# Almacenamos el historial de chat en memoria (por sesión)
historial_chats = {}

def obtener_chat(session_id, modo):
    """Obtiene o crea una sesión de chat con memoria para el modo dado."""
    clave = f"{session_id}_{modo}"
    if clave not in historial_chats:
        config_modo = MODOS.get(modo, MODOS["matematicas"])
        modelo = genai.GenerativeModel(
            model_name='gemini-2.5-flash-lite',
            system_instruction=config_modo["prompt"]
        )
        historial_chats[clave] = modelo.start_chat(history=[])
    return historial_chats[clave]

@app.route('/')
def index():
    if 'session_id' not in session:
        session['session_id'] = os.urandom(16).hex()
    return render_template('index.html', modos=MODOS)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('mensaje')
    modo = data.get('modo', 'matematicas')

    if not user_message:
        return jsonify({"respuesta": "¿En qué puedo ayudarte?"}), 400

    if modo not in MODOS:
        return jsonify({"respuesta": "Modo no válido."}), 400

    try:
        session_id = session.get('session_id', 'default')
        chat_session = obtener_chat(session_id, modo)
        response = chat_session.send_message(user_message)
        return jsonify({"respuesta": response.text})
    except Exception as e:
        return jsonify({"respuesta": f"Ocurrió un error: {str(e)}"}), 500

@app.route('/reset', methods=['POST'])
def reset_chat():
    """Limpia el historial de conversación para empezar de nuevo."""
    data = request.get_json()
    modo = data.get('modo', 'matematicas')
    session_id = session.get('session_id', 'default')
    clave = f"{session_id}_{modo}"
    if clave in historial_chats:
        del historial_chats[clave]
    return jsonify({"ok": True})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
