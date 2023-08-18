
import React, { useContext, useEffect, useState  } from "react";
import { Context} from "../store/appContext";
import ActivityCard from "../component/activitycard"
import { ProductCard } from "../component/productcard.jsx";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import TriipCard from "../component/triipcard.jsx";
import DinamicText from "../component/dinamictext.jsx";
import { useParams } from "react-router-dom";

export const Home = () => {
	const params = useParams()
	const { store, actions } = useContext(Context);
	const navigate= useNavigate()
	const [activities, setActivities] = useState([]);
  	const [products, setProducts] = useState([]);
	const [trips,setTrips] = useState([])

	  
	useEffect(() => {		
		getActivities();
    	getProduct();
		getTrips()
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
	const getProduct = () =>{
		fetch(process.env.BACKEND_URL + 'api/review?category=product', {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(resp => {
			return resp.json();
		})
		.then(data=> {
			setProducts(data);
		})
		.catch(error => {
			console.log('Oops something went wrong'+ error);
		})
	}

	const getTrips = () =>{
		fetch(process.env.BACKEND_URL + 'api/review?category=trip', {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(resp => {
			return resp.json();
		})
		.then(data=> {
			setTrips(data);			
		})
		.catch(error => {
			console.log('Oops something went wrong'+ error);
		})
	}

	
	
	const showActivity = () =>{
		const reservedActivities = activities.slice().reverse();
		if (reservedActivities && reservedActivities.length > 0) {
			const firstThreeActivities = reservedActivities.slice(0, 3); 
			return firstThreeActivities.map((activity, index) => (
				<ActivityCard
					key={index} 
					item={activity}
					activity={activity}
					profile="https://cdn.pixabay.com/photo/2016/03/23/04/01/woman-1274056_1280.jpg"
					img={activity.image}
				/>
			));
			} else {
				return (
				<div className="spinner-border" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
				)
			}
	}
	const showProducts = () => {
		const reversedProducts = products.slice().reverse();
		if (reversedProducts && reversedProducts.length > 0) {
			return reversedProducts.slice(0, 3).map((product, index) => (
				<ProductCard
					key={index}
					product={product}
					profile="https://cdn.pixabay.com/photo/2016/03/23/04/01/woman-1274056_1280.jpg"
				/>
			));
			} else {
				return (
				<div className="spinner-border" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
				)
				}
	}

	const showTrips = () =>{
		const reservedTrips = trips.slice().reverse();
		if (reservedTrips && reservedTrips.length > 0) {
			const firstThreeTrips = reservedTrips.slice(0, 3); 
			return firstThreeTrips.map((trip, index) => (
				<TriipCard
					key={index} 
					item={trip}
					trip={trip}
					profile="https://cdn.pixabay.com/photo/2016/03/23/04/01/woman-1274056_1280.jpg"
					img={trip.image}
				/>
			));
			} else {
				return (
				<div className="spinner-border" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
				)
				}
	}
	return (
		
		<div className="">
			<div className="container-fluid">
				<DinamicText  phrase={"inspire you"} phrase2={"save your time"}  phrase3={"solve your planning problems"} phrase4={" support people's opinions"} phrase1={"provide value"}/>
			</div>
			<div className="container-fluid">
					<div className="general-image" id="imageContainerActivities">
						<h1 id="titleActivities">ACTIVITIES</h1>
					</div>
			</div>
			<div className="container-fluid mt-5">				
				<div className="container-fluid mt-5">			
					<div className="row row-cols-1 row-cols-md-5 g-4">													
						{showActivity()}						
					</div>	
				</div>						
			</div>
			<div className="container-fluid mt-5">
					<div class="general-image" id="imageContainerProducts">
						<h1 id="titleProducts">PRODUCTS</h1>
					</div>
    	
					<div className="container-fluid mt-4" >
						<div className="row row-cols-1 row-cols-md-4 g-3">
							{showProducts()}
						</div>
					</div>
			</div>	

			<div className="container-fluid mt-5">
				<div id="imageContainerTrips">
					<h1 id="titleTrips">TRIPS</h1>
    			</div>
				<div className="container-fluid mt-3">			
					<div className="row row-cols-1 row-cols-md-5 g-4">													
						{showTrips()}						
					</div>	
				</div>						
			</div>
			<div>
			</div>
		</div>	
	);
}
