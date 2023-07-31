from api.models import db, User,Review,Comment

def populate_user():
    Review.query.delete()
    User.query.delete()
    db.session.add(User(email = 'abc@4geeks.com', username='abc 4geeks', password= '123456'))
    db.session.add(User(email = 'xyz@4geeks.com', username='xyz 4geeks', password= '654897'))
    db.session.commit()

def populate_reviews():
    user = User.query.filter_by(email = "abc@4geeks.com")
    user = list(map(lambda x: x.serialize(), user))

    print(user)

    db.session.add(Review(title = '123', description='sfdsdfsdfsdf', publishing_date= '31-08-2023', price= '123', user_id=user[0]['id']))
    db.session.add(Review(title = '123', description='dfgdf', publishing_date= '31-08-2023', price= '456', user_id=user[0]['id']))
    db.session.add(Review(title = '123', description='dgdfgd', publishing_date= '31-08-2023', price= '456', user_id=user[0]['id']))
    db.session.add(Review(title = '123', description='sdfsdf', publishing_date= '31-08-2023', price= '456', user_id=user[0]['id']))
    db.session.add(Review(title = '123', description='sdffsdf', publishing_date= '31-08-2023', price= '456', user_id=user[0]['id']))
    db.session.commit()