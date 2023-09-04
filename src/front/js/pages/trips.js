import React, { useEffect, useState,useContext } from "react";
import "../../styles/trips.css";
import { useNavigate } from "react-router-dom";
import ViewMore from "../component/viewmore.js";
import FilterBarTrips from "../component/filterbartrips";
import { Context } from "../store/appContext.js";
import TriipCard from "../component/triipcard";

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

		<div className="container-fluid">
            <div className="row">   
        {(trip.length !== 0 || store.query !== "") ? (filteredtrips.map((trip, index) =>{            
                            return(         
                                <div key={index} className="col-md-4 col-ms-12">
                                    <TriipCard
                                        key={index} 
                                        item={trip}
                                        trip={trip}
                                        profile={trip.userImage}
                                        img={trip.image}
                                        author={trip.reviewOwner}
                                        rating={trip.rating}
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
    )
}

export default Trips

