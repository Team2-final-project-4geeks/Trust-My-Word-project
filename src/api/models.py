from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tittle = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.String(1000), unique=True, nullable=False)
    image = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return '<People %r>' % self.tittle

    def serialize(self):
        return {
            "id": self.id,
            "tittle": self.tittle,
            "image": self.image,
        }