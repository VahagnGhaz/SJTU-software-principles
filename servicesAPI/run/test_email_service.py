import unittest
from unittest.mock import patch, MagicMock
from services.email_service import EmailService  # replace with your actual module name
import os

SENDER_EMAIL = "xingqiao.sjtu@gmail.com"
SENDER_PASSWORD = os.environ.get('EMAIL_PASSWORD')
RECIEVER = "vahagn.ghazaryan@gmail.com"


class TestEmailService(unittest.TestCase):

    @patch('smtplib.SMTP')
    def test_send_email_success(self, mock_smtp):
        mock_smtp_instance = MagicMock()
        mock_smtp.return_value = mock_smtp_instance

        email_service = EmailService('smtp.example.com', 587)
        result = email_service.send_email(RECIEVER, 'Test Subject', 'Test Body')

        self.assertEqual(result, {"message": "Email has been sent successfully"})
        mock_smtp.assert_called_once_with('smtp.example.com', 587)
        mock_smtp_instance.login.assert_called_once_with(SENDER_EMAIL, SENDER_PASSWORD)
        mock_smtp_instance.send_message.assert_called_once()
        mock_smtp_instance.quit.assert_called_once()

    @patch('smtplib.SMTP')
    def test_send_email_failure(self, mock_smtp):
        mock_smtp_instance = MagicMock()
        mock_smtp.return_value = mock_smtp_instance
        mock_smtp_instance.send_message.side_effect = Exception('Test error')

        email_service = EmailService('smtp.example.com', 587)
        result = email_service.send_email(RECIEVER, 'Test Subject', 'Test Body')

        self.assertEqual(result, {"error": "Test error"})
        mock_smtp.assert_called_once_with('smtp.example.com', 587)
        mock_smtp_instance.login.assert_called_once_with(SENDER_EMAIL, SENDER_PASSWORD)
        mock_smtp_instance.send_message.assert_called_once()
