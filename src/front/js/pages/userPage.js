import React, {useState, useEffect} from "react";
//import { useNavigate } from "react-router-dom";
import { FaPencilAlt } from 'react-icons/fa';
import "../../styles/userpage.css";
import { useNavigate } from "react-router-dom";
import Carousel from "../component/usercarousel.jsx";

const UserPage = () =>{

    const [reviews, setReviews] = useState([]);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {		
		getReviews();
        getUser();    	
	}, []);

const getReviews = () =>{
    fetch( process.env.BACKEND_URL + "/api/user/99",{
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
    })
    .catch(error => {			
        console.log('Oops something went wrong'+ error);
    })
}

const getUser = () =>{
    fetch( process.env.BACKEND_URL + "/api/user/99",{
        method: 'GET',
          headers: {
            "Content-Type": "application/json"
        }
    })
     .then(resp => {								
        return resp.json();
    })
    .then(data=> {
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
            <li key={index}>
                <div className="input-group mb-3">
                    <span className="input-group-text">Title</span>
                    <span className="input-group-text"><FaPencilAlt 
                    onClick={()=>{
                        navigate("/modify-review/" + review.id)
                    }} size={20} color="grey" id="pencil"/></span>
                    <input type="text" readonly className="form-control" aria-label="Dollar amount (with dot and two decimal places)" value={review.title}/>
                </div>                                  						
            </li>
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
                <Carousel/>
                </div>
            
            </div>
           
               
            <div>
                {showUsersReviews()}
            </div>
        </div>
    )
}

export default UserPage