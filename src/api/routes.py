"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200



@api.route('/create-user', methods=['POST'])
def create_user():

   data = request.get_json()

   if data is None:
       response_body = {
           "msg": "Body should be passes with request"
       }
       return jsonify(response_body),200
   elif "email" not in data:
        response_body = {
           "msg": "Email dont exist in the request"
       }
        return jsonify(response_body),200
   
   elif "username" not in data:
        response_body = {
           "msg": "Username dont exist in the request"
       }
        return jsonify(response_body),200

   elif "password" not in data:
        response_body = {
           "msg": "Password dont exist in the request"
       }
        return jsonify(response_body),200
   
   new_user= User(email = data["email"], password= data["password"])
   db.session.add(new_user)
   db.session.commit()

   all_users = User.query.all()
   all_users = list(map(lambda x: x.serialize(),all_users))

   return jsonify(all_users),200




@api.route('/login', methods=['POST'])
def user_login():
    email = request.json.get("email",None)
    password = request.json.get("password",None)

    if(email is None):
        response_body = {
            "message": " email not exist"
        }
        return jsonify(response_body), 400

    elif(password is None):
        response_body = {
            "msg": "password not exist"
        }
        return jsonify(response_body), 400
    
    usuario = User.query.filter_by(email=email, password=password).first()
    if(usuario is None):
        response_body = {
            "msg": "something you type wrong"
        }
        return jsonify(response_body),401
    
    access_token = create_access_token(identity=usuario.id)
    return jsonify({ "token": access_token, "user_id": usuario.id })


   

