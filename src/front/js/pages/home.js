
import React, { useContext, useEffect, useState  } from "react";
import { Context} from "../store/appContext";
import ActivityCard from "../component/activitycard"
import { ProductCard } from "../component/productcard.jsx";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import TriipCard from "../component/triipcard.js";
import DinamicText from "../component/dinamictext.js";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [activities, setActivities] = useState([]);
  	const [products, setProducts] = useState([]);
	const [trips,setTrips] = useState([])
	const [latitude,setLatitude] = useState("")
	const [longitude,setLongitude] = useState("")
	const [placeName, setPlaceName] = useState(""); 
	const [filteredReviews, setFilteredReviews] = useState([]);
	const [coordinatesAvailable, setCoordinatesAvailable] = useState(false);
	const [radio,setRadio] = useState("") 
	// const [reviewLocation, setReviewLocation] = useState([])
	// const [reviewLatitude,setReviewLatitude] = useState("")
	// const [reviewLongitude,setReviewLongitude] = useState("")

	useEffect(() => {
	  getActivities();
	  getProduct();
	  getTrips();
	  geo();
	}, []);

	// useEffect(()=>{
	// 	holaaaa1123344()
	// },[reviewLocation])

	useEffect(() => {
	  if (coordinatesAvailable) { 
		getPlaceFromCoordinates();
		fetchFilteredReviews()

	  }
	}, [coordinatesAvailable]);
  
	const fetchFilteredReviews = () => {
		fetch(process.env.BACKEND_URL + '/api/getFilteredReviews' ,{
			method: 'POST',
      		headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({latitude: latitude,longitude:longitude, radio: radio}) 
		})
     	.then(resp => {								
			return resp.json();
		})
		.then(data=> {		
			console.log(data);
			setFilteredReviews(data)
		})
		.catch(error => {			
			console.log('Oops something went wrong'+ error);
		})
	};
  
	const getPlaceFromCoordinates = () => {
	  fetch(`https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${latitude}&lon=${longitude}`)
		.then((response) => response.json())
		.then((data) => {
		  setPlaceName(data.features[0].properties.address.quarter);
		  localStorage.setItem("myLocation",data.features[0].properties.address.quarter)
		})
		.catch((error) => {
		  console.error("Error al obtener el lugar:", error);
		});
	};
  
	const geo = () => {
	  if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(success, error);
	  } else {
		console.log("Geolocation not supported");
	  }
	  function success(position) {
		console.log(position.coords.latitude, position.coords.longitude)
		setLatitude(position.coords.latitude);
		setLongitude(position.coords.longitude);
		setCoordinatesAvailable(true); 
	  }
	  function error() {
		console.log("Unable to retrieve your location");
	  }
	};

	const showNearReviews = () =>{
		const reversedTrips = filteredReviews.slice().reverse();
		if (reversedTrips && reversedTrips.length > 0) {
			const firstThreeTrips = reversedTrips.slice(0, 3); 
			return firstThreeTrips.map((trip, index) => (
				<TriipCard
					key={index} 
					item={trip}
					trip={trip}
					profile={trip.userImage}
					img={trip.image}
					author={trip.reviewOwner}
					rating={trip.rating}
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
		const reversedActivities = activities.slice().reverse();
		if (reversedActivities && reversedActivities.length > 0) {
			const firstThreeActivities = reversedActivities.slice(0, 3); 
			return firstThreeActivities.map((activity, index) => (
				<ActivityCard
					key={index} 
					item={activity}
					activity={activity}
					img={activity.image}
					rating={activity.rating}
					userImage={activity.userImage}
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
					rating={product.rating}
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
					profile={trip.userImage}
					img={trip.image}
					author={trip.reviewOwner}
					rating={trip.rating}
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
			<div className="locationContainer">
				<h2>Where am I?</h2>
				<i class="fa-solid fa-location-dot"></i>{placeName}
				<h3>Reviews near me</h3>
				<input placeholder="type the radio" value={radio} onChange={(e)=>setRadio(e.target.value)}/>	
				<button className="btn btn-warning" onClick={fetchFilteredReviews}>click me </button>		
			</div>

			<div className="nearmeReviews">
				<h1>Less distance, more fun!</h1>
				<div className="container-fluid mt-5">				
					<div className="row row-cols-1 row-cols-md-5 g-4">													
						{showNearReviews()}						
				</div>	
			</div>

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
					<div className="row row-cols-1 row-cols-md-5 ">													
						{showTrips()}						
					</div>	
				</div>						
			</div>
			<div>
			</div>
		</div>	
	);
}
