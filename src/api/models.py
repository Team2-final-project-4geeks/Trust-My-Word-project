from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    username = db.Column(db.String(80), unique=True,  nullable = False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username" : self.username
        }        
      
class Activities(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    title = db.Column(db.String(120), nullable=False)
    type = db.Column(db.String(120), nullable=False)    
    author_name = db.Column(db.String(200), nullable=False)    
    description = db.Column(db.String(1000), nullable=False)
    location = db.Column(db.String(250), nullable=False)
    publishing_date = db.Column(db.String(10), nullable=False)
    link= db.Column(db.String(500), nullable=False)
    price = db.Column(db.String(200), nullable=False, default="0.0")
    
    def __repr__(self):
        return f'<Activities {self.id}>'
      
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
        }

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author_name = db.Column(db.String(200), nullable=False)    
    publishing_date = db.Column(db.String(10), nullable=False)
    title = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.String(1000), unique=True, nullable=False)
    image = db.Column(db.String(120), nullable=False)
    price = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return '<Product %r>' % self.title

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,            
            "price": self.price,          
            "image": self.image,
            "author_name" : self.author_name,
            "publishing_date" : self.publishing_date
        }


class Trips(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    title = db.Column(db.String(120), nullable=False)
    author_name = db.Column(db.String(200), nullable=False)    
    description = db.Column(db.String(1000), nullable=False)
    location = db.Column(db.String(250), nullable=False)
    publishing_date = db.Column(db.String(10), nullable=False)
    link= db.Column(db.String(500), nullable=False)
    price = db.Column(db.String(200), nullable=False, default="0.0")
    
    def __repr__(self):
        return f'<Trips {self.id}>'
      
    def serialize(self):
       return {
            "id": self.id,
            "title": self.title,
            "author_name":self.author_name,
            "description": self.description,
            "location":self.location,
            "publishing_date": self.publishing_date,
            "link": self.link,
            "price": self.price,
        }
