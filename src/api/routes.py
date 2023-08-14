"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint

from api.models import db, User,Review,Comment
from api.utils import generate_sitemap, APIException
from api.data import populate_user, populate_reviews
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

api = Blueprint('api', __name__)

#@api.route('/hello', methods=['POST', 'GET'])
#def handle_hello():

#    populate_user();
#    populate_reviews();

#    response_body = {
#        "message": "Helloooo! This is 4Geeks Group 2 Final Project"
#    }
#    return jsonify(response_body), 200#


#FOR USERS
@api.route('/create-user', methods=['POST'])
def create_user():

   data = request.get_json()

   if data is None:
       response_body = {
           "msg": "Body should be passes with request"
       }
       return jsonify(response_body),400
   elif "email" not in data:
        response_body = {
           "msg": "Email doesnt exist in the request"
       }
        return jsonify(response_body),400

   elif "password" not in data:
        response_body = {
           "msg": "Password doesnt exist in the request"
       }
        return jsonify(response_body),400
  
   
   elif "username" not in data:
        response_body = {
           "msg": "username doesnt exist in the request"
       }
        return jsonify(response_body),400
   
   new_user= User(email = data["email"], password= data["password"], username=data["username"])
   db.session.add(new_user)
   db.session.commit() 

   return jsonify({"msg": "user has been added"}),200

@api.route('/users',methods=['GET'])
def get_all_users():
    all_users = User.query.all()
    all_users= list(map(lambda x: x.serialize(),all_users))
    return jsonify(all_users),200

@api.route('/user/<int:id>',methods=["GET"])
@jwt_required()
def get_single_user(id):
    user = User.query.get(id)
    return jsonify(user.serialize()), 200

@api.route('user/<int:id>',methods=['PUT'])
@jwt_required()
def update_user(id):
    data = request.get_json()

    if data is None:
        response_body={
            "msg":"body should be passed with request parameters"
        }
        return jsonify(response_body),400
    
    update_user= User.query.get(id)
    
    if "email" in data:
        update_user.email = data["email"]
    if "password" in data:
        update_user.password = data["password"]
    if "favourites" in data:
        update_user.favourites = data["favourites"]
    db.session.commit()

    return jsonify({"msg":"user updated"}),200
    
@api.route('/user/<int:id>',methods=['DELETE'])
@jwt_required()
def delete_user(id):
    user_to_delete = User.query.get(id)
    db.session.delete(user_to_delete)
    db.session.commit()

# LOGIN PART
@api.route('/login', methods=['POST'])
def user_login():
    email = request.json.get("email",None)
    password = request.json.get("password",None)

    if(email is None):
        response_body = {
            "message": " email does not exist"
        }
        return jsonify(response_body), 400

    elif(password is None):
        response_body = {
            "msg": "password does not exist"
        }
        return jsonify(response_body), 400
    
    user = User.query.filter_by(email=email, password=password).first()
    if(user is None):
        response_body = {
            "msg": "You typed something wrong"
        }
        return jsonify(response_body),400
    
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id , "username": user.username, "email":user.email})


# FOR REVIEWS 

@api.route('/review', methods=['GET'])
def get_all_reviews():
    category = request.args.get("category")
    print(category)
    all_reviews = Review.query.filter_by(category=category)
    all_reviews = list(map(lambda x: x.serialize(), all_reviews))

    return jsonify(all_reviews), 200


@api.route('/create-review', methods=['POST'])
@jwt_required()
def create_review():
    data =request.get_json()

    if data is None:
        response_body= {
            "msg" : "body should be passed with request"
        }
        return jsonify(response_body),400
    
    elif "title" not in data:
        response_body= {
            "msg" : "title should be passed with request"
        }
        return jsonify(response_body),400  
   
    elif "description" not in data:
        response_body = {
           "msg": "Description doesnt exist in the request"
       }
        return jsonify(response_body),400

    elif "publishing_date" not in data:
        response_body = {
           "msg": "publishing_date doesnt exist in the request"
       }
        return jsonify(response_body),400
    
    elif "price" not in data:
        response_body = {
           "msg": "Price doesnt exist in the request"
       }
        return jsonify(response_body),400
    
    elif "imageCloud" not in data:
        response_body = {
           "msg": "Image doesnt exist in the request"
       }
        return jsonify(response_body),400
    
    new_review= Review(title = data["title"], category=data["category"], type=data["type"], location=data["location"],link=data["link"],description=data["description"], publishing_date=data["publishing_date"], price=data["price"], user_id=data["user"], image=data["imageCloud"])
    db.session.add(new_review)
    db.session.commit()   

    return jsonify(new_review), 200


@api.route('/modify-review/<int:id>', methods=['PUT'])
@jwt_required()
def modify_review(id):
    data = request.get_json()
    if data is None:

        response_body= {
            "msg" : "body should be passed with request"
        }
        return jsonify(response_body),400
    
    elif "title" not in data:
        response_body= {
            "msg" : "title should be passed with request"
        }
        return jsonify(response_body),400
   
    elif "description" not in data:
        response_body = {
           "msg": "Description doesnt exist in the request"
       }
        return jsonify(response_body),400

    elif "publishing_date" not in data:
        response_body = {
           "msg": "publishing_date doesnt exist in the request"
       }
        return jsonify(response_body),400
    
    elif "price" not in data:
        response_body = {
           "msg": "Price doesnt exist in the request"
       }
        return jsonify(response_body),400
    
    update_review= Review.query.get(id)
    update_review.title = data["title"]
    update_review.description = data["description"]
    update_review.publishing_date = data["publishing_date"]
    update_review.price = data["price"]

    db.session.commit()

    review = Review.query.get(id)

    return jsonify(review.serialize()),200
    

@api.route('/review/<int:id>',methods=['DELETE'])
@jwt_required()
def delete_review(id):
    review_to_delete = Review.query.get(id)
    db.session.delete(review_to_delete)
    db.session.commit()

@api.route('/review/<int:id>',methods=["GET"])
@jwt_required()
def get_single_review(id):
    review = Review.query.get(id)

    return jsonify(review.serialize()),200


# FOR COMMENTS

@api.route('/comments',methods=['GET'])
@jwt_required()
def get_all_comments():    
    all_comments = Comment.query.all()
    all_comments = list(map(lambda x: x.serialize(), all_comments))
    return jsonify(all_comments), 200

@api.route('/create-comment',methods=['POST'])
@jwt_required()
def create_comment():
    data =request.get_json()

    if data is None:
        response_body= {
            "msg" : "body should be passed with request"
        }
        return jsonify(response_body),400
    
    elif "description" not in data:
        response_body= {
            "msg" : "description should be passed with request"
        }
        return jsonify(response_body),400        
    
    new_comment= Comment(description=data["description"], review_id=data["review_id"], user_id=data["user_id"])
    db.session.add(new_comment)
    db.session.commit()
    
    return jsonify(new_comment.serialize()), 200

@api.route('/comment/<int:id>',methods=['DELETE'])
@jwt_required()
def delete_comment(id):
    comment_to_delete = Comment.query.get(id)
    db.session.delete(comment_to_delete)
    db.session.commit()
    return jsonify({"message":"Comment deleted"}), 200