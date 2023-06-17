import unittest
from unittest.mock import patch
from services.gpt_service import GptService


class TestGptService(unittest.TestCase):

    @patch('openai.ChatCompletion.create')
    def test_generate_event_info_success(self, mock_create):
        mock_create.return_value = {
            "choices": [
                {"message": {"content": "Test Content"}}
            ]
        }

        gpt_service = GptService()
        result = gpt_service.generate_event_info({
            'tone': 'friendly',
            'title': 'Test Event',
            'date': '2023-06-17',
            'time': '10:00',
            'location': 'Test Location',
            'number_of_people': '50',
            'tags': 'test'
        })

        self.assertEqual(result, "Test Content")
        mock_create.assert_called_once()

    @patch('openai.ChatCompletion.create')
    def test_generate_event_info_failure(self, mock_create):
        mock_create.side_effect = Exception('Test error')

        gpt_service = GptService()
        with self.assertRaises(Exception) as context:
            gpt_service.generate_event_info({
                'tone': 'friendly',
                'title': 'Test Event',
                'date': '2023-06-17',
                'time': '10:00',
                'location': 'Test Location',
                'number_of_people': '50',
                'tags': 'test'
            })

        self.assertTrue('Test error' in str(context.exception))
        mock_create.assert_called_once()
