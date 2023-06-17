import os
import openai
from dotenv import load_dotenv
load_dotenv()

API_KEY = os.environ.get('API_KEY')

class GptService:

    def __init__(self):
        self.api_key = API_KEY
        openai.api_key = self.api_key

    def generate_event_info(self, tags: dict):
        requests = f"""generate campus event description using the info provided. If provided info is empty, exclude giving any infor about it.
keep the tone - {tags['tone']},
                        keep it around 100 words.
                                title is {tags['title']}, 
                               date is {tags['date']},
                               time is {tags['time']}
                                location is {tags['location']},
                                number of people is  {tags['number_of_people']},                  
                                other tags are {tags['tags']}"""

        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo-0613",
            messages=[{"role": "user", "content": requests}]
        )

        answer = completion["choices"][0]["message"]["content"]
        return answer
