import smtplib
import os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from dotenv import load_dotenv

load_dotenv()

SENDER_EMAIL = "xingqiao.sjtu@gmail.com"
SENDER_PASSWORD = os.environ.get('EMAIL_PASSWORD')


class EmailService:

    def __init__(self, server, port):
        self.server_address = server
        self.port = port

    def send_email(self, receiver_email, subject, body):
        msg = MIMEMultipart()
        msg['From'] = SENDER_EMAIL
        msg['To'] = receiver_email
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))

        try:
            server = smtplib.SMTP(self.server_address, self.port)
            server.starttls()
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            server.send_message(msg)
            server.quit()

            return {"message": "Email has been sent successfully"}
        except Exception as e:
            return {"error": str(e)}
