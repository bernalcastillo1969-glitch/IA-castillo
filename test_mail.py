import os
from flask import Flask
from flask_mail import Mail, Message
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config.update(
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=465,
    MAIL_USE_SSL=True,
    MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
    MAIL_DEFAULT_SENDER=os.getenv("MAIL_USERNAME")
)

mail = Mail(app)

print(f"Probando con el correo: {os.getenv('MAIL_USERNAME')}")

with app.app_context():
    try:
        msg = Message("PRUEBA BERNAL IA CASTILLO", recipients=[os.getenv("MAIL_USERNAME")])
        msg.body = "Si lees esto, tu configuración ya funciona."
        mail.send(msg)
        print("EXITO! El correo se envio correctamente. Revisa tu bandeja.")
    except Exception as e:
        print(f"FALLO CRITICO: {str(e)}")
        print("\nCONSEJO SENIOR: Revisa que tu contrasena de aplicacion sea de 16 letras.")
