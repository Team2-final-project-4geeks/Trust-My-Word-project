import React, {useState, useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import ActivityCard from "../component/activitycard"
import "../../styles/activities.css";

import FilterBarActivities from "../component/filterbaractivities.js";


const Activities = (props) =>{
    const [activities, setActivities] = useState([]);
    const { store, actions } = useContext(Context);
    const navigate= useNavigate();
    useEffect(() => {
        getActivities();
    }, []);

    const getActivities = () => {
        fetch(process.env.BACKEND_URL + 'api/review?category=activity' ,{
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => {                             
            return resp.json();
        })
        .then(data=> {     
            setActivities(data);
            console.log(data)
            actions.addActivities(data);
        })
        .catch(error => {           
            console.log('Oops something went wrong'+ error);
        })
    }
    const filteredActivities = activities.filter((activity)=> activity.location.toLowerCase().includes(store.query) &&
    (store.selectedType === "" || activity.type === store.selectedType))

    return (
        <div className="container-fluid mt-2">
            <FilterBarActivities/>
            <div className="card mt-4 mb-5 border-0" id="quoteActivity">                    
                <div className="card-body d-flex">
                    <blockquote className="blockquote mb-0">
                    <p className="text-center mt-4" id="quote">"Activity equals results. If you want to increase your success, increase your activity."</p>
                    <footer className="blockquote-footer text-center mt-4 mb-4">Brian Tracy</footer>
                    </blockquote>
                </div>
            </div>
            <div className="py-2" >                
                <div className="card-group">
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {(activities.length !== 0 || store.query !== "") ? (filteredActivities.map((activity, index) =>{            
                            return(
                                <div key={index} className="col-4">
                                    <ActivityCard
                                        key={index} 
                                        item={activity}
                                        activity={activity}
                                        userImage={activity.userImage}
                                        img={activity.image}
                                        author={activity.reviewOwner}
                                        rating={activity.rating}
                                        
                                    />
                                </div>
                            )
                            }
                            )) : (
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Activities