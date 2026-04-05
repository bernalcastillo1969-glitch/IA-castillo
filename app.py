import sys
import os

# Añadir el directorio api al path para que encuentre ai_client.py
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'api'))

from api.index import app

if __name__ == "__main__":
    app.run(debug=True, port=5000)
