import os
from flask import Flask
from flask_mail import Mail, Message
from dotenv import load_dotenv

# Cargar .env desde la raíz
load_dotenv(os.path.join(os.path.dirname(__file__), '../.env'))

app = Flask(__name__)
app.config.update(
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=587,
    MAIL_USE_TLS=True,
    MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
    MAIL_DEFAULT_SENDER=os.getenv("MAIL_USERNAME")
)

mail = Mail(app)

print(f"DEBUG: Probando con {os.getenv('MAIL_USERNAME')}")

with app.app_context():
    try:
        msg = Message("PRUEBA BERNAL", recipients=[os.getenv("MAIL_USERNAME")])
        msg.body = "OK"
        mail.send(msg)
        print("RESULTADO: EXITO - El correo se envio correctamente.")
    except Exception as e:
        print(f"RESULTADO: FALLO - {str(e)}")
