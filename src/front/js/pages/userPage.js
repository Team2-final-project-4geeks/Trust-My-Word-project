import React, {useState, useEffect,useContext} from "react";
import { Context} from "../store/appContext";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import "../../styles/carousel.css";
// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
//import { useNavigate } from "react-router-dom";
import { FaPencilAlt } from 'react-icons/fa';
import "../../styles/userpage.css";
import { useNavigate } from "react-router-dom";

const UserPage = () =>{
    const navigate= useNavigate()
    const {store,actions} = useContext(Context)
    const [reviews, setReviews] = useState([]);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {		
		getReviews();
	}, []);

const getReviews = () =>{
    fetch( process.env.BACKEND_URL + "/api/user/" + store.userId,{
        method: 'GET',
          headers: {
            "Content-Type": "application/json"
        }
    })
     .then(resp => {								
        return resp.json();
    })
    .then(data=> {		
        setReviews(data.reviews);
        setEmail(data.email);
        setUsername(data.username);
    })
    .catch(error => {			
        console.log('Oops something went wrong'+ error);
    })
}


const showUsersReviews =()=> {
    return reviews.map((review, index) =>{
        return(
            <SwiperSlide key={index}>
                <img src="https://swiperjs.com/demos/images/nature-1.jpg" alt="review-image"/>
                {review.title}  
                    <span className="input-group-text"><FaPencilAlt 
                     onClick={()=>{
                        navigate("/modify-review/" + review.id)
                     }} size={20} color="grey" id="pencil"/></span>
            </SwiperSlide>
        )
    })
}
    return(
        <div className="container-fluid">
            <div className="userSection bg-light ">
                <div className="row">
                    <div className="col-5">
                            <div className="insight d-flex flex-row p-5">
                                <div className="">
                                    <p className="title mx-4">Reviews</p>
                                    <p className="reviews  mx-4">{reviews.length}</p>
                                </div>
                                <div className="">
                                    <p className="title mx-4">Favorites</p>
                                    <p className="reviews  mx-4">0</p>
                                </div>
                                <div className="">
                                    <p className="title mx-4">Comments</p>
                                    <p className="reviews  mx-4">0</p>
                                </div>
                            </div>
                    </div>
                    <div className="col-3">
                        <div class="circle">
                            <img src="https://picsum.photos/id/3/700" alt="Foto"/>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="user-info d-flex flex-column py-5">
                            <h3 className="mb-3">My details</h3>
                            <div className="email">
                                <p><i class="fas fa-at "></i>: {email}</p>       
                            </div>
                            <div className="username">
                                <p><i class="fas fa-user "></i>: {username}</p>
                            </div>

                        </div>
                    </div>
                    
                </div>
                <div className="row">
                    <h1 className="px-5">MY REVIEWS</h1>
                    <div>
                    <div className='carousel-container'>
                        <Swiper
                            effect={'coverflow'}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={'auto'}
                            coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            }}
                            pagination={true}
                            modules={[EffectCoverflow, Pagination]}
                            className="mySwiper"
                        >
                            {showUsersReviews()}
                        </Swiper>
                    </div>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default UserPage