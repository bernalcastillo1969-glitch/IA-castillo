import os
import base64
from abc import ABC, abstractmethod
from typing import List, Dict, Optional, Any
import google.generativeai as genai
from groq import Groq

class AIProvider(ABC):
    @abstractmethod
    def get_response(self, prompt: str, system_instruction: str, history: List[Dict[str, Any]], multimodal_parts: List[Dict[str, Any]] = None) -> str:
        pass

class GeminiProvider(AIProvider):
    def __init__(self, api_key: str, model_name: str = "gemini-2.0-flash"):
        genai.configure(api_key=api_key)
        self.model_name = model_name

    def get_response(self, prompt: str, system_instruction: str, history: List[Dict[str, Any]], multimodal_parts: List[Dict[str, Any]] = None) -> str:
        model = genai.GenerativeModel(
            model_name=self.model_name,
            system_instruction=system_instruction
        )
        
        # SANEAR HISTORIAL: Gemini falla si los roles no alternan o si termina en 'user'
        sanitized_history = []
        last_role = None
        for entry in history:
            role = entry.get("role")
            if role != last_role:
                sanitized_history.append(entry)
                last_role = role
        
        # Debe terminar en 'model' para que el primer mensaje de send_message sea 'user'
        if sanitized_history and sanitized_history[-1]["role"] == "user":
            sanitized_history.pop()

        chat_session = model.start_chat(history=sanitized_history)
        
        message_parts = [prompt] if prompt else []
        if multimodal_parts:
            for part in multimodal_parts:
                message_parts.append(part)
        
        try:
            response = chat_session.send_message(message_parts)
            # Verificar si hay candidatos (si no, probablemente fue bloqueado por seguridad)
            if not response.candidates:
                return "⚠️ La IA Castillo no pudo generar una respuesta debido a filtros de seguridad o un error técnico. Intenta reformular tu consulta."
            
            return response.text
        except Exception as e:
            error_msg = str(e)
            if "blocked" in error_msg.lower():
                return "⚠️ El contenido fue bloqueado por las políticas de seguridad de la IA."
            return f"Error en la comunicación con la IA: {error_msg}"

class GroqProvider(AIProvider):
    def __init__(self, api_key: str, model_name: str = "llama-3.3-70b-versatile"):
        self.client = Groq(api_key=api_key)
        self.model_name = model_name

    def get_response(self, prompt: str, system_instruction: str, history: List[Dict[str, Any]], multimodal_parts: List[Dict[str, Any]] = None) -> str:
        # Convert history from Gemini format to OpenAI/Groq format
        messages = [{"role": "system", "content": system_instruction}]
        
        for entry in history:
            role = "assistant" if entry["role"] == "model" else "user"
            content = entry["parts"][0] if isinstance(entry["parts"], list) else entry["parts"]
            messages.append({"role": role, "content": content})
        
        # Add current prompt
        if prompt:
            messages.append({"role": "user", "content": prompt})
        
        # Groq Llama 3.3 70b is text only. If multimodal_parts exist, they'll be handled by Gemini.
        
        completion = self.client.chat.completions.create(
            messages=messages,
            model=self.model_name,
        )
        return completion.choices[0].message.content

class AIFactory:
    @staticmethod
    def get_provider(has_multimodal: bool) -> AIProvider:
        if has_multimodal:
            return GeminiProvider(os.getenv("GEMINI_API_KEY"), "gemini-2.0-flash")
        else:
            return GroqProvider(os.getenv("GROQ_API_KEY"), "llama-3.3-70b-versatile")
