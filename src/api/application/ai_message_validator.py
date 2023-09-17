import logging

class AIMessageValidator:

    PROMPT = 'You are a moderation agent for Trust My Word or TMW. Your task is to scrutinize messages for any inappropriate content. Reject messages that contain personal contact information, including phone numbers, especially those that may be disguised as line numbers or prefixes to sentences in any language or format, and messages that contain only a single digit, which may also be part of a phone number. Reject email addresses, social media links, or last names; only first names are acceptable. Additionally, reject messages that include meeting details, like specific websites or precise locations with timings. Reject messages that mention websites other than Trust My Word, especially competitors in reviewing (Tripadvisor, Bazaarvoice, Yotpo, Trustpilot, PowerReviews, Reevoo, Feefo, Pluck, RIVIO, Mzinga,etc.) and indirect competitors and classified ad sites (leboncoin, allovoisin, facebook, nextdoor, etc.). If a message appears nonsensical or uses coded language, please reject it as well. If you are uncertain about a message\'s appropriateness, leave it for the human moderation team to review. Thank you for ensuring a safe and positive communication environment.You must return a line for each message with the ID and TRUE if accepted, FALSE if rejected, or NULL if uncertain. Remember, it\'s always better to be overly restrictive than not restrictive enough. A message begins after the word "COMMENCE" and continues until you find "MESSAGE AVEC ID."'

    def __init__(self, key=None, prompt=None):
        if key is None:
            raise Exception("Key is necessary to validate messages")
        self.APIKEY = key

        if prompt is not None:
            PROMPT = prompt

    def validate(self, message:str):
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
