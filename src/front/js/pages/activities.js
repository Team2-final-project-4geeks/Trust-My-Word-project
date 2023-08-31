import React, {useState, useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
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
                                <li key={index}>              
                                    <div className="col">
                                        <div className="card">
                                            <div className="image-container w-100">
                                                <img src={activity.image} className="card-img-top" alt="..."/>
                                                <div className="image-overlay d-flex justify-content-end align-items-start p-2 w-100" id="imageActivities">
                                                    <i className="fas fa-heart text-danger" onClick={() => {
                                                        actions.addFavourite(props.activity.title);
                                                        actions.addUserFavourites(localStorage.getItem("userId"))}}>
                                                    </i>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title">{activity.title}</h5>
                                                <div className="d-flex flex-row mt-2" id="rowActivities">
                                                    <p className="card-text">{activity.type}</p>
                                                    <p className="card-text">{activity.location}</p>
                                                    <p className="card-text">{activity.publishing_date}</p>
                                                </div>
                                                <p className="card-text">{activity.description}</p>
                                                <Link to={activity.link} className="card-text">{activity.link}</Link>
                                                <div class="sharethis-inline-share-buttons"></div>
                                            </div>
                                            <button className="btn" type="button" id="activityCardViewMore" onClick={()=> navigate("/activity/" + activity.id)}> <strong>View more</strong></button>
                                        </div>
                                    </div>
                                </li>
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