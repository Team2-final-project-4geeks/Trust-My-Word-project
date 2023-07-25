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

class Tourism(db.Model):
    id= db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Integer, nullable = False)
    date = db.Column(db.String(80), nullable=False)
    