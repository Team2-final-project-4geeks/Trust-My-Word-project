import React, {useState, useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import FilterBar from "../component/filterbar.js";
import "../../styles/activities.css";


const Activities = () =>{
    const [activities, setActivities] = useState([]);
    const [filterCity, setFilterCity] = useState("");
    const { store, actions } = useContext(Context);
    const navigate= useNavigate();

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
            return resp.json();
        })
        .then(data=> {            
            setActivities(data);
        })
        .catch(error => {           
            console.log('Oops something went wrong'+ error);
        })
    }    
    
    const showActivities = () =>{            
        return(        
            activities.filter((activity)=> activity.location.toLowerCase().includes(filterCity)).map((activity, index) =>{            
            return(  
                <li key={index}>              
                    <div className="col">
                        <div className="card h-100">
                            <img src="https://cdn.pixabay.com/photo/2016/11/29/13/08/skateboard-1869727_1280.jpg" className="card-img-top h-100" alt="..."/>
                            <div className="image-overlay d-flex justify-content-end align-items-start p-2" id="heartIconActivity">
                                <i className="fas fa-heart text-danger" onClick={()=> actions.addFavourite(props.activity.title)}></i>                        
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{activity.title}</h5>
                                <p className="card-text">{activity.id}</p>
                                <p className="card-text">{activity.location}</p>
                                <p className="card-text">{activity.publishing_date}</p>                            
                                <p className="card-text">{activity.description}</p>
                                <p className="card-text">{activity.link}</p>
                                <div class="sharethis-inline-share-buttons"></div>
                            </div>
                            <button className="btn" type="button" id="activityCardViewMore" onClick={()=> navigate("/activity/" + activity.id)}> <strong>View more</strong></button>
                        </div>
                    </div>
                </li>
            )
            }                        
        ))        
    }        
    
    return (
        <div className="container-fluid mt-2">
            <FilterBar />
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
                        {activities.length !== 0 ? showActivities() : (
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