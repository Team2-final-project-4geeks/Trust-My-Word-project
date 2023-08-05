
import React, { useContext, useEffect, useState  } from "react";
import { Context} from "../store/appContext";
import ActivityCard from "../component/activitycard.jsx";
import { Product } from "../component/productcard.jsx";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import TriipCard from "../component/triipcard.jsx";

export const Home = () => {
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
		fetch(process.env.BACKEND_URL + 'api/review',{
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
			console.log(resp);					
			return resp.json();
		})
		.then(data=> {
			console.log(data);
			setProducts(data);
		})
		.catch(error => {
			console.log(error);
			console.log('Oops something went wrong'+ error);
		})
	}

	const getTrips = () =>{
		fetch('https://edijavier99-shiny-space-goggles-jjgrjrpvj43j5r7-3001.app.github.dev/api/review', {
			method: "GET",
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
			setTrips(data);
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
		if (trips && trips.length > 0){
			return trips.map((trips, index) => {
				return (
					
						<TriipCard item={trips} trip={trips} profile="https://cdn.pixabay.com/photo/2016/03/23/04/01/woman-1274056_1280.jpg" img="https://picsum.photos/id/295/600/380" />					
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
	return (
	
		<div className="">
			<div className="container-fluid">
				<h1 className="py-5">Activities</h1>
					<div className="container-fluid">			
						<div className="row row-cols-1 row-cols-md-5 g-4">													
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

			<div className="container-fluid">
				<h1 className="py-5">Trips</h1>
					<div className="container-fluid">			
						<div className="row row-cols-1 row-cols-md-5 g-4">													
							{showTrips()}						
						</div>	
					</div>						
			</div>

			</div>	
	);
}
