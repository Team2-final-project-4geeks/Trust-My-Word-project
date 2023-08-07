
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

    db.session.add(Review(title='Riding in a paradise', category="activity", type='adventure', description='Great horse riding experience! You are surrounded by nature and/or beautiful views. Horses are taken care of and the place is clean.', location='Malaga', publishing_date='16-07-2023', link='www.pinarmalaga.es', price='30€', user_id=user.id)) # ensure the status field is valid
    db.session.add(Review(title='Kayaking with amazing views',category="activity", type='family', description='Kayaking in Nerja was a very pleasant surprise. My sister and I had a lot of fun despite not being able to control the kayak 100%. The water was transparent and blue. We actually felt sorry for not bringing goggles.', location='Nerja', publishing_date='02-10-2021', link='www.kayaknerja.es', price='25€', user_id=user.id))
    db.session.add(Review(title='Best karting in the area', category="activity", type='adventure', description='Best what you can get when it comes to price and the time. There are plenty of curves to enjoy but also a straight road. There are also special offers, so ask at the till. You can later have a nice drink at the bar and watch others. Will come back again for sure', location='Cartama', publishing_date='15-05-2023', link='www.paintball-cartama.com', price='18€', user_id=user.id))
    db.session.add(Review(title='Challenging Paintball', category="activity", type='adventure', description='Great for birthdays, parties or just with friends. There are many battlefields - some of them are pretty tough! You won\'t get bored.', location='Almayate', publishing_date='02-05-2022', link='www.karting-al.es', price='30€', user_id=user.id))
    db.session.add(Review(title='Paddlesurf and dolphins',category="activity", type='family', description='We wanted to have an easy afternoon with friends, but still do something fun, so we got ourselves 5 paddle surf boards and an instructor. We were so lucky! Due to the weather conditions he decided to change the location and thanks to that, we were able to see dolphins. They did not want to come near us, but it was still pretty cool to be able to observe them for a while.', location='Puerto de la Cruz', publishing_date='31-08-2021', link='www.gopaddlesurf-tenerife.es', price='35€', user_id=user.id))
    db.session.add(Review(title='Copas Sur',category="trip", location='Bilbao', description='I didn\'t like it at all, the cocktails were not very good', publishing_date='22-08-2021', price='35€', user_id=user.id))
    db.session.add(Review(title='Terraza Moyua', category="trip",location='Valencia',description='It was a very nice experience, the food and the views were very good but the price was a little bit high', publishing_date='12-05-2021', price='15€', user_id=user.id))
    db.session.add(Review(title='Chicker Tour',category="trip",location='Castro-Urdiales', description='The food was very nice and is a perfect place to take dinner with your family', publishing_date='30-10-2021', price='45€', user_id=user.id))
    db.session.add(Review(title='Bar Gamba',category="trip",location=' Laredo', description='I didn\'t like it, the place was very dirty, and the flavor of the food was not good', publishing_date='01-04-2023', price='55€', user_id=user.id))
    db.session.add(Review(title="John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet", type='jewelry', category="product", description="From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.", publishing_date='31-07-2021', price='75€', user_id=user.id, image="https://cdn.pixabay.com/photo/2016/11/15/18/46/bracelet-1827136_1280.jpg"))
    db.session.add(Review(title="Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA)  Super Ultrawide Screen QLED", type='info', category="product", description='49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag', publishing_date='22-10-2021', price='199€', user_id=user.id, image="https://cdn.pixabay.com/photo/2014/08/09/11/50/computer-414059_1280.jpg"))
    db.session.add(Review(title='WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive', type='info', category="product", description="Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty", publishing_date='12-05-2021', price='150€', user_id=user.id, image="https://cdn.pixabay.com/photo/2021/09/07/07/11/game-console-6603120_1280.jpg"))
    db.session.add(Review(title="BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats", type='clothes', category="product", description='Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates', publishing_date='30-12-2022', price='149€', user_id=user.id))
    db.session.add(Review(title='Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops', type='accessories', category="product",  description='Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday', publishing_date='01-02-2023', price='59€', user_id=user.id))
    db.session.commit()
