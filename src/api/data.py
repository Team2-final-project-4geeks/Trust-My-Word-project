
import json
from api.models import db, User, Review, Comment, myEnum

# Define the functions to populate users and reviews

def populate_user():
    Review.query.delete()
    User.query.delete()
    db.session.add(User(email='abc@4geeks.com', username='abc 4geeks', password='123456'))
    db.session.add(User(email='xyz@4geeks.com', username='xyz 4geeks', password='654897'))
    db.session.commit()


def populate_reviews():
    user = User.query.filter_by(email="abc@4geeks.com").first()

    print(user)

    db.session.add(Review(title='Riding in a paradise', type='adventure', description='Great horse riding experience! You are surrounded by nature and/or beautiful views. Horses are taken care of and the place is clean.', location='Malaga', publishing_date='16-07-2023', link='www.pinarmalaga.es', price='30€', user_id=user.id, category=myEnum.activity)) # ensure the status field is valid
    db.session.add(Review(title='Kayaking with amazing views', type='family', description='Kayaking in Nerja was a very pleasant surprise. My sister and I had a lot of fun despite not being able to control the kayak 100%. The water was transparent and blue. We actually felt sorry for not bringing goggles.', location='Nerja', publishing_date='02-10-2021', link='www.kayaknerja.es', price='25€', user_id=user.id))
    db.session.add(Review(title='Best karting in the area', type='adventure', description='Best what you can get when it comes to price and the time. There are plenty of curves to enjoy but also a straight road. There are also special offers, so ask at the till. You can later have a nice drink at the bar and watch others. Will come back again for sure', location='Cartama', publishing_date='15-05-2023', link='www.paintball-cartama.com', price='18€', user_id=user.id))
    db.session.add(Review(title='Challenging Paintball', type='adventure', description='Great for birthdays, parties or just with friends. There are many battlefields - some of them are pretty tough! You won\'t get bored.', location='Almayate', publishing_date='02-05-2022', link='www.karting-al.es', price='30€', user_id=user.id))
    db.session.add(Review(title='Paddlesurf and dolphins', type='family', description='We wanted to have an easy afternoon with friends, but still do something fun, so we got ourselves 5 paddle surf boards and an instructor. We were so lucky! Due to the weather conditions he decided to change the location and thanks to that, we were able to see dolphins. They did not want to come near us, but it was still pretty cool to be able to observe them for a while.', location='Puerto de la Cruz', publishing_date='31-08-2021', link='www.gopaddlesurf-tenerife.es', price='35€', user_id=user.id))
    db.session.add(Review(title='Copas Sur', description='I didn\'t like it at all, the cocktails were not very good', publishing_date='22-08-2021', price='35€', user_id=user.id))
    db.session.add(Review(title='Terraza Moyua', description='It was a very nice experience, the food and the views were very good but the price was a little bit high', publishing_date='12-05-2021', price='15€', user_id=user.id))
    db.session.add(Review(title='Chicker Tour', description='The food was very nice and is a perfect place to take dinner with your family', publishing_date='30-10-2021', price='45€', user_id=user.id))
    db.session.add(Review(title='Bar Gamba', description='I didn\'t like it, the place was very dirty, and the flavor of the food was not good', publishing_date='01-04-2023', price='55€', user_id=user.id))
    db.session.commit()
