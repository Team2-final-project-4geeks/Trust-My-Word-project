import React, {useState, useEffect,useContext} from "react";
import { Context} from "../store/appContext";
import profile from "../../img/profile.png";
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
    const token = localStorage.getItem('jwt-token');
	if(token) {
    fetch( process.env.BACKEND_URL + "/api/user/" + localStorage.getItem("userId"),{
        method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer " + token
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
    }else  {
    alert(' You are not logged in!')
     }

}
const showUsersReviews =()=> {
    return reviews.map((review, index) =>{
        return(
                <li style={{ '--cardColor': '#ffc600' }} key={index}>
                <div class="content">
                    <div class="icon"> <span className="input-group-text"><FaPencilAlt 
                      onClick={()=>{
                         navigate("/modify-review/" + review.id)
                        }} size={45} color="grey" id="pencil"/></span></div>
                    <div class="title">{review.title}</div>
                    <div class="text">{review.description}</div>
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
                            <img src={profile} alt="Foto"/>
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
                    <div className='carousel-container'>
                        <div className="reviews-body">          
                            <h1>My reviews</h1>
                            <ol class="olcards">
                                {showUsersReviews()}
                            </ol>
                        </div>
                    </div>          
                </div>
            </div>
        </div>
    )
}

export default UserPage