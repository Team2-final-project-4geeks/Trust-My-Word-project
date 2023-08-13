import React, { useEffect, useState } from "react";
import "../../styles/trips.css";
import ViewMore from "../component/viewmore.jsx";

const Trips = () =>{
    const [trip,setTrips] = useState([])
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
		})
		.catch(err => console.error(err))	
    }
   
    const showTrips = () =>{
        return trip.map((trip, index) =>{
            console.log(trip);
            return(
                <li key={index}>                
                <div className="col">
                    <div className="card h-100 text-center">
                        <img src="https://picsum.photos/id/425/600/380" className="card-img-top h-100" alt="..."/>
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
        })
    }
    useEffect(()=>{
        get_all_trips()
        showTrips() 
    },[])
    return(
        <div>
        <div className="quote-trip text-center">
            <p className="quote">“People don't take trips, trips take people”</p> 
            <p className="text-muted"><small>-Someone</small></p>
        </div>

		<div className="row row-cols-1 row-cols-md-3 g-4">

			{trip.length !== 0 ? showTrips() : (
				<div className="spinner-border" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			)}
		</div>
        </div>
    )
}

export default Trips

