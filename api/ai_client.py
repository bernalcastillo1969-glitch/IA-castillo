import os
import base64
from abc import ABC, abstractmethod
from typing import List, Dict, Optional, Any
import google.generativeai as genai
from groq import Groq

# Mensajes "Bonitos" para cuando la IA está descansando (Límite de cuota)
MSG_RECARGA_ENERGIA = "⚠️ **¡Hola! Soy la IA Castillo.** He trabajado mucho hoy y mi cerebro gratuito necesita un pequeño descanso de un par de minutos para recargar energías. ¡Vuelve a intentarlo en un momento y estaré lista para ti con todo el cariño! ✨💙"

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
        
        sanitized_history = []
        last_role = None
        for entry in history:
            role = entry.get("role")
            if role != last_role:
                sanitized_history.append(entry)
                last_role = role
        
        if sanitized_history and sanitized_history[-1]["role"] == "user":
            sanitized_history.pop()

        try:
            chat_session = model.start_chat(history=sanitized_history)
            
            message_parts = [prompt] if prompt else []
            if multimodal_parts:
                for part in multimodal_parts:
                    message_parts.append(part)
            
            response = chat_session.send_message(message_parts)
            return response.text
        except Exception as e:
            err_str = str(e).lower()
            if "429" in err_str or "quota" in err_str or "exhausted" in err_str:
                return MSG_RECARGA_ENERGIA
            return f"⚠️ Mi motor Gemini tuvo un percance técnico: {str(e)}. Pero no te preocupes, ¡vuelve a escribirme pronto!"

class GroqProvider(AIProvider):
    def __init__(self, api_key: str, model_name: str = "llama-3.3-70b-versatile"):
        self.client = Groq(api_key=api_key)
        self.model_name = model_name

    def get_response(self, prompt: str, system_instruction: str, history: List[Dict[str, Any]], multimodal_parts: List[Dict[str, Any]] = None) -> str:
        messages = [{"role": "system", "content": system_instruction}]
        for entry in history:
            role = "assistant" if entry["role"] == "model" else "user"
            content = entry["parts"][0] if isinstance(entry["parts"], list) else entry["parts"]
            messages.append({"role": role, "content": content})
        
        if prompt:
            messages.append({"role": "user", "content": prompt})
        
        try:
            completion = self.client.chat.completions.create(
                messages=messages,
                model=self.model_name,
            )
            return completion.choices[0].message.content
        except Exception as e:
            err_str = str(e).lower()
            if "429" in err_str or "rate_limit" in err_str:
                return MSG_RECARGA_ENERGIA
            return f"⚠️ Mi motor Groq está un poco cansado: {str(e)}. ¡Reintenta en un momento!"

class AIFactory:
    @staticmethod
    def get_provider(has_multimodal: bool = False) -> AIProvider:
        if has_multimodal:
            return GeminiProvider(os.getenv("GEMINI_API_KEY"))
        else:
            return GroqProvider(os.getenv("GROQ_API_KEY"))
