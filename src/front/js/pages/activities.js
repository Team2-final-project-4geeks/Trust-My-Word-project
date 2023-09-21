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
    const [dataLoaded, setDataLoaded] = useState(false);

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

    useEffect(() => {
        if (filteredActivities.length > 0) {
          setDataLoaded(true);
        }
      }, [filteredActivities]);

    return (
        <div className="container-fluid mt-2">
            <FilterBarActivities/>

            <div className="card mt-4 mb-5 border-0 text-center" id="quoteActivity">                    
                <div className="card-body d-flex">
                    <div className="rowActivities">
                        <blockquote className="blockquote mb-0">
                            <p className=" col-sm-12 text-center mt-4" id="quote">"Activity equals results. If you want to increase your success, increase your activity."</p>
                            <footer className="col-sm-12 blockquote-footer text-center mt-4 mb-4" id="author">Brian Tracy</footer>
                        </blockquote>
                    </div>    
                </div>
            </div>

            <div className="noReviews d-flex flex-column mt-5"  >
            {dataLoaded ? (
                filteredActivities.length === 0 ? (
                    <div className="container text-center border-0 mt-5">
                        <h4 className="mb-5">We are very sorry, but there are either no reviews from the requested location or no reviews for that category</h4>
                        <img
                            className="justify-content-center mt-1 mb-5 border-0"
                            src="https://i2-prod.mirror.co.uk/incoming/article25609261.ece/ALTERNATES/s615b/0_PUSS-IN-BOOTS.jpg"
                            alt="No Reviews"
                        />
                    </div>
                    ) : (                
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            {filteredActivities.map((activity, index) => {
                                return (
                                    <div key={index} className="col-md-4 col-ms-12">
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
                                );
                            })}
                        </div>
                    )
                ) : (
                    <div className="container text-center border-0" >
                        <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    )}
                </div>
        </div>
    );
};

export default Activities