import React, {useState, useEffect} from "react";
import ActivityCard from "../component/activitycard.jsx";
import "../../styles/activities.css";
import "../../styles/activitycard.css";


const Activities = () =>{
    const [activities, setActivities] = useState([]);
    
    useEffect(() => {
        getActivities();
        showActivities();
    }, []);

    const getActivities = () => {
        fetch(process.env.BACKEND_URL + 'api/review?category=activity' ,{
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
    
    const showActivities = () =>{
        return activities.map((activity, index) =>{            
            return(
                <div className="col-md-4 card g-2">
                    <ActivityCard item={activity} key={index} activity={activity} img="https://cdn.pixabay.com/photo/2014/12/16/22/25/sunset-570881_1280.jpg"/>
                </div>
            )
        })
    }
        
    
    return (
        <div className="py-2" id="ActivitiesPageContainer">
            <h2 className="font-weight-light">ACTIVITIES </h2>
            <div className="d-flex flex-wrap">
                {activities.length !== 0 ? showActivities() : (
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Activities