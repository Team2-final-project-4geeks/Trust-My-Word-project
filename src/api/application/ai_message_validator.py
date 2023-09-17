import logging

import openai


class AIMessageValidator:

    PROMPT = 'You are a moderation agent for Trust My Word or TMW. Your task is to scrutinize messages for any inappropriate content. If the message is appropriate return TRUE if otherwise return FALSE. It is very important that you only return TRUE or FALSE nothing else. Appropriate means, no swear words and no vulgar language'

    def __init__(self, key=None, prompt=None):
        if key is None:
            raise Exception("Key is necessary to validate messages")
        self.APIKEY = key

        if prompt is not None:
            self.PROMPT = prompt

    def validate(self, message:str):
        openai.api_key = self.APIKEY
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": self.PROMPT},
                    {"role": "user", "content": message}
                ]
            )

            if response.choices[0].message.content == "TRUE":
                print("logic of the message is ok")
                return True
            else:
                print("logic of the message is NOT ok")
            return False
        except ValueError as e:
            logging.error(f"[validate_message_openai]: {str(e)}")
            return False
