import React, {useState, useEffect} from "react";
//import { useNavigate } from "react-router-dom";
import { FaPencilAlt } from 'react-icons/fa';
import "../../styles/userpage.css";
import { useNavigate } from "react-router-dom";

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
    fetch( process.env.BACKEND_URL + "/api/user/73",{
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
    fetch( process.env.BACKEND_URL + "/api/user/73",{
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

            <div className="userSection d-flex flex-column align-items-center bg-light ">
            <div class="circle">
                <img src="https://picsum.photos/id/345/200" alt="Foto"/>
            </div>
            <div class="container bg-light">
                <div className="row">
                    <div className="col-6 mt-3">
                    <div className="d-flex flex-row">
                        <p><i class="fas fa-at mt-2"></i>:</p>
                        <div className="col-sm-10">
                                <input type="text" 
                                       readonly className="form-control-plaintext" 
                                       id="staticEmail" 
                                       value={username}/>
                        </div>
                    </div>
                   
                    <div className="d-flex flex-row">
                        <p><i class="fas fa-at mt-2 "></i>:</p>
                        <div className="col-sm-10">
                            <input type="text" 
                                       readonly 
                                       className="form-control-plaintext" 
                                       id="staticEmail" 
                                       value={email}
                                       />
                                       
                            </div>
                        </div>            
                    </div>
                    <div className="col-6 right">
                        <div className="container-fluid dashboard-user mt-4"> 
                        <h3 className="mt-2">Insights</h3>
                        <div className="dashboard-insights d-flex flex-row mt-3">
                            <div className="d-flex flex-column">
                                <p className="title">Reviews</p>
                                <p className="reviews">{reviews.length}</p>
                            </div>
                            <div className="d-flex flex-column mx-5">
                                <p className="title">Favorites</p>
                                <p className="reviews">0</p>
                            </div>
                            <div className="d-flex flex-column">
                                <p className="title">Comments</p>
                                <p className="reviews">0</p>
                            </div>
                        </div>
                    </div>
                    </div>

                </div>
                    
                    {/* <div className="d-flex flex-column left">
                        <div className="d-flex flex-row">
                            <p><i class="fas fa-at"></i>:</p>
                            <div className="col-sm-10">
                                <input type="text" 
                                       readonly className="form-control-plaintext" 
                                       id="staticEmail" 
                                       value={email}/>
                            </div>
                        </div>
                      
                        <div className="d-flex flex-row">
                            <p> <i class="fas fa-user"></i>:</p>
                            <div className="col-sm-10">
                                <input type="text" 
                                       readonly className="form-control-plaintext" 
                                       id="staticEmail" 
                                       value={email}/>
                            </div>
                        </div>
                         
                    </div>
                    <div className="right">
                        
                    </div>  */}
                </div>
            </div>
           
               
            <div>
                {showUsersReviews()}
            </div>
        </div>
    )
}

export default UserPage