import secrets
import string

def generate_verification_token():
    token = ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(16))
    return token