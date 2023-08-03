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
		fetch('https://friendly-memory-pv77w5gwp6x299j6-3001.preview.app.github.dev/api/review/' + props.activity.id, {
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
        <div className="card-body d-flex flex-column p-0">
            <h5 className="card-title">{activity.title}</h5>
            <div className="card-text flex-grow-1"></div>
                <span>{activity.location}</span>            
                <span>{activity.type}</span>                
                <span>{activity.author_name}</span>
                <span>{activity.description}</span>
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
                <button className="btn btn-outline-primary" onClick={(() => navigate("review/" + props.activity.id))} >I want to know more!</button>                         				
            <div className="card-footer py-1 px-0">
                <small className="text-muted">{activity.publishing_date}</small>                
            </div>
        </div>
    )
}

export default ActivityCard