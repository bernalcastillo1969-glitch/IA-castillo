import os
import base64
from abc import ABC, abstractmethod
from typing import List, Dict, Optional, Any
import google.generativeai as genai

class AIProvider(ABC):
    @abstractmethod
    def get_response(self, prompt: str, system_instruction: str, history: List[Dict[str, Any]], multimodal_parts: List[Dict[str, Any]] = None) -> str:
        pass

class GeminiProvider(AIProvider):
    def __init__(self, api_key: str, model_name: str = "gemini-flash-latest"):
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
            if not response.candidates:
                return "⚠️ No se generó respuesta. Reintenta."
            
            return response.text
        except Exception as e:
            return f"Error en la comunicación con la IA: {str(e)}"

class AIFactory:
    @staticmethod
    def get_provider(has_multimodal: bool = False) -> AIProvider:
        # Solo Gemini por estabilidad absoluta
        return GeminiProvider(os.getenv("GEMINI_API_KEY"))
