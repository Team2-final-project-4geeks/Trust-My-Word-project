import React, {useEffect, useState} from "react"
import "../../styles/activitycard.css"
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useNavigate } from "react-router";


const ActivityCard = (props) =>{
    const [activity, setActivity] = useState('');
    const [rating, setRating] = useState(0);
    const navigate = useNavigate();

    useEffect(()=>{
		getActivity()
	}, [])

    const getActivity = ()=>{
		fetch(process.env.BACKEND_URL + 'api/review/' + props.activity.id, {
			method: 'GET',
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(resp=> {			
			return resp.json();
		})
		.then(data=>{			
			setActivity(data);
		})
		.catch(error=>{
			console.log(error);
		})
	}

    const handleStarClick = (index) => {
        setRating(index + 1);
    }

    return(
        <div className="card-body d-flex flex-column p-0 h-100" id="cardActivityBody">
            <h5 className="card-title mt-4 mb-3">{activity.title}</h5>
            <div className="card-text d-inline"></div>
                <div className="row justify-content-between">
                    <div className="col">   
                        <p className="card-text">{activity.location}</p>
                    </div>
                    <div className="col">            
                        <p className="card-text">{activity.type}</p>
                    </div>
                    <div className="col">
                        <p className="card-text">{activity.publishing_date}</p>
                    </div>                
                    <p>{activity.user}</p>
                </div>
                <p id="cardDescription">{activity.description}</p>
                <span>
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
                {/*<button className="btn btn-outline-primary" onClick={(() => navigate("review/" + props.activity.id))} >I want to know more!</button>*/}           
        </div>
    )
}

export default ActivityCard