import React, {useState, useEffect} from "react";
//import { useNavigate } from "react-router-dom";
import { FaPencilAlt } from 'react-icons/fa';
import "../../styles/userpage.css";

const UserPage = () =>{

    const [reviews, setReviews] = useState([]);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    //const navigate = useNavigate();

    useEffect(() => {		
		getReviews();
        getUser();    	
	}, []);

const getReviews = () =>{
    fetch("https://redesigned-eureka-w6vv5q955r9hgwp6-3001.app.github.dev/api/user/19",{
        method: 'GET',
          headers: {
            "Content-Type": "application/json"
        }
    })
     .then(resp => {								
        return resp.json();
    })
    .then(data=> {		
        console.log(data)	
        setReviews(data.reviews);
        console.log(data.reviews[1].title)
    })
    .catch(error => {			
        console.log('Oops something went wrong'+ error);
    })
}

const getUser = () =>{
    fetch("https://redesigned-eureka-w6vv5q955r9hgwp6-3001.app.github.dev/api/user/19",{
        method: 'GET',
          headers: {
            "Content-Type": "application/json"
        }
    })
     .then(resp => {								
        return resp.json();
    })
    .then(data=> {
        console.log("estoy aqui")			
        setEmail(data.email);
        setUsername(data.username);
    })
    .catch(error => {			
        console.log('Oops something went wrong'+ error);
    })
}

const showUsersReviews =()=> {
    console.log(reviews)
    return reviews.map((review, index) =>{
        return(
            <li key={index}>
                <div className="input-group mb-3">
                    <span className="input-group-text">Title</span>
                    <span className="input-group-text"><FaPencilAlt size={20} color="grey" id="pencil"/></span>
                    <input type="text" readonly className="form-control" aria-label="Dollar amount (with dot and two decimal places)" value={review.title}/>
                </div>                                  						
            </li>
        )
    })
}
    return(
        <div className="container-fluid">
            <div className="userSection">
                <div className="mb-3 row">
                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label"> Email :</label>
                    <div className="col-sm-10">
                        <input type="text" readonly className="form-control-plaintext" id="staticEmail" value={email}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="staticUsername" className="col-sm-2 col-form-label"> User name :</label>
                    <div className="col-sm-10">
                        <input type="text" readonly className="form-control-plaintext" id="staticUsername" value={username}/>
                    </div>
                </div>
            </div>
            <div>
                {showUsersReviews()}
            </div>
        </div>
    )
}

export default UserPage