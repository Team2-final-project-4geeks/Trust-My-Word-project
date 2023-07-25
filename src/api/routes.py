"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint

from api.models import db, User, Activities, Product
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! This is 4Geeks Group 2 Final Project"
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
   
   new_user= User(email = data["email"], password= data["password"], username=data["username"])
   db.session.add(new_user)
   db.session.commit()

   all_users = User.query.all()
   all_users = list(map(lambda x: x.serialize(),all_users))

   return jsonify(all_users),200

@api.route('/users',methods=['GET'])
def get_all_users():
    all_users = User.query.all()
    all_users= list(map(lambda x: x.serialize(),all_users))
    return jsonify(all_users),200

@api.route('/user/<int:id>',methods=["GET"])
def get_single_user(id):
    user = User.query.get(id)
    user.serialize()
    return jsonify(user)

@api.route('user/<int:id>',methods=['PUT'])
def update_user(id):
    data = request.get_json()
    if "email" not in data:
        response_body={
            "msg":"email is not in the request"
        }
        return jsonify(response_body),200
    elif "password" not in data:
        response_body={
            "msg":"password is not in the request"
        }
        return jsonify(response_body),200
    
    elif "username" not in data:
        response_body={
            "msg":"username is not in the request"
        }
        return jsonify(response_body),200
    elif data is None:
        response_body={
            "msg":"body should be passed with request parameters"
        }
        return jsonify(response_body),200
    
    update_user= User.query.get(id)
    update_user.email = data["email"]
    update_user.password = data["password"]
    update_user.username = data["username"]
    db.session.commit()

    user = User.query.get(id)
    user= user.serialize()

    return jsonify(user),200
    
@api.route('/user/<int:id>',methods=['DELETE'])
def delete_user(id):
    user_to_delete = User.query.get(id)
    db.session.delete(user_to_delete)
    db.session.commit()

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

@api.route('/activities', methods=['GET'])
def get_activities():

    all_activities = Activities.query.all()
    all_activities= list(map(lambda x: x.serialize(), all_activities))
    
    return jsonify(all_activities), 200

@api.route('/activities/<int:id>', methods=['GET'])
def get_single_activity(id):
    activity = Activities.query.get(id)
    activityjson = activity.serialize()
    return activityjson, 200

@api.route('/user', methods=['GET'])
def get_users():

    all_users = Activities.query.all()
    all_users= list(map(lambda x: x.serialize(), all_users))
    
    return jsonify(all_users), 200

@api.route('/product', methods=['GET'])
def get_all_product():
     
     all_product = Product.query.all()
     all_product = list(map(lambda x: x.serialize(), all_product))

     print(all_product)

     return jsonify(all_product), 200

@api.route('/<int:product_id>', methods=['GET'])
def get_one_product(product_id):
     
     product = Product.query.get(product_id)
     product = product.serialize()

     print(product)

     return jsonify(product), 200

@api.route('/create-product', methods=['POST'])
def create_product():

    data = request.get_json()

    if data is None:
            response_body_people = {
                "msg": "BODY should be passed with request"
            }
            return jsonify(response_body_people), 400
    
    new_product = Product(tittle=data["tittle"], description=data["description"])
    db.session.add(new_product)
    db.session.commit()

    all_product = Product.query.all()
    all_product = list(map(lambda x: x.serialize(), all_product)) 

    print(all_product)

    return jsonify(all_product, 200)

@api.route('/product/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
      
      product =  Product.query.get(product_id)
      db.session.delete(product)
      db.session.commit()

      response_body = {
            "msg": "Product Deleted Successfully!"
      }

      return jsonify(response_body)
