import React, {useState, useEffect} from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import "../../styles/activities.css";


const Activities = () =>{
    const [activities, setActivities] = useState([]);
    const [rating, setRating] = useState(0);
    useEffect(() => {
        getActivities();
    }, []);
    const getActivities = () => {
        fetch(process.env.BACKEND_URL + 'api/review',{
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => {
            console.log(resp);                  
            return resp.json();
        })
        .then(data=> {
            console.log(data);
            setActivities(data);
        })
        .catch(error => {
            console.log(error);
            console.log('Oops something went wrong'+ error);
        })
    }

    const handleStarClick = (index) => {
        setRating(index + 1);
    }
    
    const showActivity = () =>{
        return activities.map((activity, index) =>{
            return(
                <li key={index}>
                    <div className="container-fluid" id="containerActivities">
                        <div className="card h-100 border-0">
                            <img src="https://cdn.pixabay.com/photo/2020/04/30/02/14/bali-5111131_1280.jpg" className="card-img-top h-50" alt="..."/>
                            <div className="heart-icon">
        				    	<FaRegHeart />
      					    </div>
                            <div className="card-body mb-2">
                                <h5 className="card-title">{activity.title}</h5>
                                <span className="mb-2">
                                    {[...Array(5)].map((_, index) => {
                                        const starValue = index + 1;
                                        return (
                                            <span
                                            key={index}
                                            onClick={() => handleStarClick(index)}
                                            style={{ cursor: 'pointer' }}
                                            >
                                            {starValue <= rating ? (
                                                <FaStar color="#ffc107" />
                                                ) : starValue - 0.5 === rating ? (
                                                <FaStarHalfAlt color="#ffc107" />
                                                ) : (
                                                <FaRegStar color="#ffc107" />
                                                )
                                            }
                                            </span>                            
                                        );
                                    })}                    
                                </span>
                                <p className="card-text">{activity.author_name}</p>
                                <p className="card-text">{activity.description}</p>                            
                                <p className="card-text">{activity.link}</p>
                                <p className="card-text">{activity.publishing_date}</p>                                
                            </div>
                        </div>
                    </div>
                </li>
            )
        })
    }
    return (
        <div className="row row-cols-1 row-cols-md-2 g-4 mt-5">     
            {showActivity()}
        </div>
    )
}
export default Activities