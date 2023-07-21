"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Product
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/product', methods=['GET'])
def get_all_product():
     
     all_product = Product.query.all()
     all_product = list(map(lambda x: x.serialize(), all_product))

     print(all_product)

     return jsonify(all_product), 200

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