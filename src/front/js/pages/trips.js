import React, { useEffect, useState } from "react";
import TriipCard from "../component/triipcard.jsx";

const Trips = () =>{
    const [trip,setTrips] = useState([])

    const get_all_trips = () =>{
        fetch('https://edijavier99-upgraded-space-memory-7qgvvp774ww3w55r-3001.preview.app.github.dev/api/review', {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
            console.log("estttttt");
            setTrips(data)
          

		})
		.catch(err => console.error(err))	
    }
   
    const showTrips = () =>{
        return trip.map((trip, index) =>{
            console.log(trip);
            return(
                <TriipCard item={trip} key={index} trip={trip} img="https://picsum.photos/id/295/300/300" />
            )
        })
    }

     
    useEffect(()=>{
        get_all_trips()
        showTrips()
        console.log(trip);
    },[])

    return(
        <div className="py-2" style={{ overflowX: 'auto', overflowY: 'hidden', paddingLeft: 10, paddingRight: 10}}>
		<h2 className="font-weight-light">TRIPS </h2>
		<div className="d-flex flex-row flex-nowrap">
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