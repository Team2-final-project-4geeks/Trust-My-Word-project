import React, { useState, useEffect } from "react";
import ActivityCard from "../component/activitycard.jsx";
import "../../styles/home.css";


export const Home = () => {

	const [activities, setActivities] = useState([]);

	useEffect(() => {		
		getActivities();	
	}, []);
	
	const getActivities = () => {
		fetch(process.env.BACKEND_URL + '/api/activities',{
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

	const showActivity = () =>{
		return activities.map((activity, index) =>{
			return(
				<li key={index} className= "col">					
					<div className="card h-100">
						<img src="https://picsum.photos/id/1/200" className="card-img-top" alt="..."></img>
						<ActivityCard activity={activity}/>
					</div>						
				</li>
			)
		})
	}
	
	return (
		<div className="container-fluid">
			<h1 className="py-5">Activities</h1>
				<div className="container-fluid">			
					<div className="row row-cols-1 row-cols-md-5 g-4">													
						{showActivity()}						
					</div>	
				</div>						
		</div>

	)	
	
	
		
};
