from flask_sqlalchemy import SQLAlchemy

import enum
from sqlalchemy import Enum,ForeignKey,Float
from datetime import datetime



class myEnum(enum.Enum):
    activity = "activity"
    product = "product"
    trip = "trip"

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(120), nullable=False)
    favourites= db.Column(db.ARRAY(db.String(120)))
    password = db.Column(db.String(80), unique=False, nullable=False)
    image = db.Column(db.String(200), nullable=True,default="google.com")

    # 1 - N with Reviews
    reviews = db.relationship("Review", back_populates="users")
    # 1 - N with Comments
    comments = db.relationship("Comment", back_populates="userComment")
    # 1 - N with Reviews

    def __repr__(self):
        return f'<User {self.username}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "favourites": self.favourites,
            "reviews": [review.serialize() for review in self.reviews],  # serialize each review
            "comments": [comment.serialize() for comment in self.comments], # serialize each comment
            "image": self.image
        }        
      
class Review(db.Model):
    __tablename__ = "review"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    title = db.Column(db.String(120), nullable=False)
    type = db.Column(db.String(120), nullable=True)    
    description = db.Column(db.String(1000), nullable=False)
    location = db.Column(db.String(250), nullable=True)
    publishing_date = db.Column(db.String(10), nullable=False)
    link= db.Column(db.String(500), nullable=True)
    price = db.Column(db.String(200), nullable=False, default="0.0")
    category = db.Column(Enum(myEnum))
    comments = db.relationship("Comment", back_populates="review")
    user_id = db.Column(db.Integer, ForeignKey('user.id'))
    users = db.relationship("User", back_populates="reviews")
    image = db.Column(db.String(200), nullable=False,default="google.com")
    rating = db.Column(db.String(50), nullable=True, default="0")
    counter = db.Column(db.Integer, nullable=True, default=0)
    latitude = db.Column(Float, nullable=True)
    longitude = db.Column(Float, nullable=True)

    
    def __repr__(self):
        return f'<Reviews {self.id}>'
      
    def serialize(self):
       return {
            "id": self.id,
            "title": self.title,
            "type": self.type,           
            "description": self.description,
            "location":self.location,
            "publishing_date": self.publishing_date,
            "link": self.link,
            "price": self.price,
            "category": self.category.name if self.category else None,
            "image": self.image,
            "rating": self.rating,
            "user_id": self.user_id,
            "counter": self.counter,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "reviewOwner": self.users.username,
            "userImage": self.users.image
        }
    
class Comment(db.Model):
     __tablename__ = "comment"
     id = db.Column(db.Integer, primary_key=True, nullable=False)
     description = db.Column(db.String(1000), nullable=False)
     review_id = db.Column(db.Integer, ForeignKey('review.id'))
     review = db.relationship("Review", back_populates="comments")
     user_id = db.Column(db.Integer, ForeignKey('user.id'))
     userComment = db.relationship("User", back_populates="comments")
     author=db.Column(db.String(100), nullable=True)
     date=db.Column(db.String(50), default=datetime.utcnow, nullable=True)

     def __repr__(self):
        return f'<Comments {self.id}>'

     def serialize(self):
        return {
            "id": self.id,
            "description" : self.description,
            "review_id": self.review_id,
            "user_id": self.user_id,
            "author": self.author,
            "test": self.userComment.username,
            "testImage":self.userComment.image,
            "date":self.date
        }       
