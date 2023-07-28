from flask_sqlalchemy import SQLAlchemy
import enum
from sqlalchemy import Enum,ForeignKey
from sqlalchemy.orm import relationship

class myEnum(enum.Enum):
    activity = "activity"
    product = "product"
    trip = "trip"
    
db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    reviews = relationship("Reviews", back_populates="user")
    comments = relationship("Comments", back_populates="user")

    def __repr__(self):
        return f'<User {self.email}>'
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
        }
class Reviews(db.Model):
    __tablename__ = "reviews"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, ForeignKey("user.id"))
    title = db.Column(db.String(120), nullable=False)
    type = db.Column(db.String(120), nullable=True)
    author_name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    location = db.Column(db.String(250), nullable=True)
    publishing_date = db.Column(db.String(10), nullable=False)
    link= db.Column(db.String(500), nullable=True)
    price = db.Column(db.String(200), nullable=False, default="0.0")
    comments = db.Column(db.String(200), nullable=False)
    status = db.Column(Enum(myEnum))
    user = relationship("User", back_populates="reviews")
    comments = relationship("Comments", back_populates="reviews")
    def __repr__(self):
        return f'<Reviews {self.id}>'
    def serialize(self):
       return {
            "id": self.id,
            "title": self.title,
            "type": self.type,
            "author_name":self.author_name,
            "description": self.description,
            "location":self.location,
            "publishing_date": self.publishing_date,
            "link": self.link,
            "price": self.price,
            "comments" : self.comments,
        }
    
class Comments(db.Model):
     __tablename__ = "comments"
     id = db.Column(db.Integer, primary_key=True, nullable=False)
     description = db.Column(db.String(1000), nullable=False)
     user_id = db.Column(db.Integer, ForeignKey("user.id"))
     review_id = db.Column(db.Integer, ForeignKey("reviews.id"))
     user = relationship("User", back_populates="comments")
     reviews = relationship("Reviews", back_populates="comments")
     def __repr__(self):
        return f'<Comments {self.id}>'
     def serialize(self):
        return {
            "id": self.id,
            "description" : self.description
        }
 