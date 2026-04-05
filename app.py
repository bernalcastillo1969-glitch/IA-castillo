import sys
import os

# Añadir el directorio raíz al path para que api/index.py encuentre ai_client.py
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from api.index import app

if __name__ == "__main__":
    app.run(debug=True, port=5000)
