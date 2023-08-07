
import React, { useContext, useEffect, useState  } from "react";
import { Context} from "../store/appContext";
import ActivityCard from "../component/activitycard.jsx";
import { Product } from "../component/productcard.jsx";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import TriipCard from "../component/triipcard.jsx";
import { FaRegHeart } from 'react-icons/fa';

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate= useNavigate()
	const [reversedTrips, setReversedTrips] = useState([])

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
		fetch('https://fakestoreapi.com/products', {
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
			console.log("estpy aqui");
			setTrips(data);
			setReversedTrips(data)
		})
		.catch(error => {
			console.log('Oops something went wrong'+ error);
		})
	}


	const showActivity = () =>{
		return activities.map((activity, index) =>{
			return(
				<li key={index} className= "col">					
					<div className="card h-100 border-0">
						<img src="https://cdn.pixabay.com/photo/2020/04/30/02/14/bali-5111131_1280.jpg" className="card-img-top" alt="..."></img>
						<div className="heart-icon">
        					<FaRegHeart />
      					</div>
						<ActivityCard activity={activity}/>
					</div>						
				</li>
			)
		})
	}
	const showProducts = () => {
		if (products && products.length > 0){
		return products.map((product, index) => {
			return (
				<li key={index} className= "col">					
					<div className="card h-100">
						<Product product={product}/>
					</div>						
				</li>
			)
		})
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
					img="https://picsum.photos/id/295/600/380"
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
		<div className="container-fluid mt-5">
			<div className="container-fluid mb-5" id="activityPhotoContainer">
				<div class="card bg-dark text-white mb-5">
					<img class="card-img h-100" id="activityPhoto" src="https://cdn.pixabay.com/photo/2020/04/30/02/14/bali-5111131_1280.jpg" alt="Card image"/>
					<div class="card-img-overlay">
						<h5 class="card-title" id="textActivity">Activities</h5>						
					</div>
				</div>
			</div>

			<div className="container-fluid mt-5">				
				<div className="container-fluid mt-5">			
					<div className="row row-cols-1 row-cols-md-3 g-4">													
						{showActivity()}						
					</div>	
				</div>						
			</div>
		
			<div className="container-fluid">
					<h1 className="py-5">Products</h1>
						<div className="container-fluid" >
								<div className="row row-cols-1 row-cols-md-4 g-4 ">
									{products && showProducts()}
								</div>
						</div>
			</div>	

			<div className="container-fluid mt-5">
				<div class="fondo">
					<div class="general-image">
						<h1 className="trip">TRIPS</h1>
					</div>
    			</div>
					<div className="container-fluid mt-4">			
						<div className="row row-cols-1 row-cols-md-5 g-4">													
							{showTrips()}						
						</div>	
					</div>						
			</div>

		</div>	
	);
}
