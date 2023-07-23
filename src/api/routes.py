"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Activities
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! This is 4Geeks Group 2 Final Project"
    }

    return jsonify(response_body), 200

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

    