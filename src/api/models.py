from flask_sqlalchemy import SQLAlchemy

import enum
from sqlalchemy import Enum,ForeignKey


class myEnum(enum.Enum):
    activity = 1
    product = 2
    trip = 3

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(120), nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    # 1 - N with Reviews
    reviews = db.relationship("Review", back_populates="user")
    # 1 - N with Comments
    comments = db.relationship("Comment", back_populates="user")

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "reviews": [review.serialize() for review in self.reviews],  # serialize each review
            "comments": [comment.serialize() for comment in self.comments]  # serialize each comment
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
    user = db.relationship("User", back_populates="reviews")
    image = db.Column(db.String(200), nullable=False,default="google.com")



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
            "image": self.image,
        }
    
class Comment(db.Model):
     __tablename__ = "comment"
     id = db.Column(db.Integer, primary_key=True, nullable=False)
     description = db.Column(db.String(1000), nullable=False)
     review_id = db.Column(db.Integer, ForeignKey('review.id'))
     review = db.relationship("Review", back_populates="comments")
     user_id = db.Column(db.Integer, ForeignKey('user.id'))
     user = db.relationship("User", back_populates="comments")

     def __repr__(self):
        return f'<Comments {self.id}>'

     def serialize(self):
        return {
            "id": self.id,
            "description" : self.description
        }       
