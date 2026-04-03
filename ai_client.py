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
    def __init__(self, api_key: str, model_name: str = "gemini-1.5-flash"):
        genai.configure(api_key=api_key)
        self.model_name = model_name

    def get_response(self, prompt: str, system_instruction: str, history: List[Dict[str, Any]], multimodal_parts: List[Dict[str, Any]] = None) -> str:
        model = genai.GenerativeModel(
            model_name=self.model_name,
            system_instruction=system_instruction
        )
        
        # In Gemini history format is different: {"role": "user", "parts": ["text"]}
        # We assume history passed is already in Gemini format or we convert it here.
        # Given app.py, it was already formatting it as: {"role": role, "parts": [msg['content']]}
        
        chat_session = model.start_chat(history=history)
        
        message_parts = [prompt] if prompt else []
        if multimodal_parts:
            for part in multimodal_parts:
                message_parts.append(part)
        
        response = chat_session.send_message(message_parts)
        return response.text

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
            return GeminiProvider(os.getenv("GEMINI_API_KEY"), "gemini-1.5-flash")
        else:
            return GroqProvider(os.getenv("GROQ_API_KEY"), "llama-3.3-70b-versatile")
