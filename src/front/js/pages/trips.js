import React, { useEffect, useState,useContext } from "react";
import "../../styles/trips.css";
import { useNavigate } from "react-router-dom";
import ViewMore from "../component/viewmore.js";
import FilterBarTrips from "../component/filterbartrips";
import { Context } from "../store/appContext.js";

const Trips = () =>{
    const { store, actions } = useContext(Context);
    const navigate= useNavigate();
    const [trip,setTrips] = useState([])
    useEffect(()=>{
        get_all_trips()
    },[])
    
    const get_all_trips = () =>{
        fetch(process.env.BACKEND_URL + 'api/review?category=trip', {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(res => res.json())
		.then(data => {
            setTrips(data) 
            actions.addActivities(data);

		})
		.catch(err => console.error(err))	
    }
   
    const filteredtrips = trip.filter((trip)=> trip.location.toLowerCase().includes(store.query) &&
    (store.selectedType === "" || trip.type === store.selectedType))

    return(
        <div className="container-fluid">
            <FilterBarTrips/>
        <div className="quote-trip text-center">
            <p className="quote">“People don't take trips, trips take people”</p> 
            <p className="text-muted"><small id="trip-quote">-Someone</small></p>
        </div>

		<div className="row row-cols-1 row-cols-md-3 g-4">
        {(trip.length !== 0 || store.query !== "") ? (filteredtrips.map((trip, index) =>{            
                            return(
                                <li key={index}>                
                                    <div className="col">
                                        <div className="card-trips text-center">
                                            <div className="image-container-trips">
                                                <img src={trip.image} className="card-img-top" alt="..."/>
                                                <div className="image-overlay d-flex justify-content-end align-items-start p-2 w-100" id="imageActivities">
                                                    <i className="fas fa-heart text-danger" onClick={() => {
                                                        actions.addFavourite(trip.title);
                                                        actions.addUserFavourites(localStorage.getItem("userId"))}}>
                                                    </i>
                                                </div>
                                            </div>
                                            <div className="card-body p-4">
                                                <h3 className="card-title">{trip.title}</h3>
                                                <div className="trip-location mt-5">
                                                    <p className="card-text">{trip.location}</p>
                                                    <p className="card-text">{trip.publishing_date}</p> 
                                                </div>
                                                
                                                <div className="description-trips mb-3">
                                                    <p className="card-text">{trip.description}</p>
                                                    <p className="card-text">{trip.price}</p>
                                                </div>                           
                                            
                                                <ViewMore item={trip.id}/>
                                            </div>
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
    )
}

export default Trips

