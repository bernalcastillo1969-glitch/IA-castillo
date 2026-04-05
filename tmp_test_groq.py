import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv('../.env')
GROQ_KEY = os.getenv("GROQ_API_KEY")

def test_groq():
    print("--- INICIANDO DIAGNOSTICO GROQ ---")
    try:
        client = Groq(api_key=GROQ_KEY)
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": "Dime 'Groq Online'"}]
        )
        print(f"Respuesta de Groq: {completion.choices[0].message.content}")
        print("--- GROQ OK ---")
    except Exception as e:
        print(f"ERROR EN GROQ: {str(e)}")

if __name__ == "__main__":
    test_groq()
