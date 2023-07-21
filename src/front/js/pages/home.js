import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import ActivityCard from "../component/activitycard.jsx";

export const Home = () => {
	const [tourism, setTourism] = useState([]);
	const [products, setProducts] = useState([]);	
	const [activities, setActivities] = useState([]);

	useEffect(() => {
		{/*getTourism();
	getProducts();*/}
		getActivities();	
	}, []);

	{/*const getTourism= () => {
		fetch('https://lucymacko-fluffy-engine-r97765r66x9h544-3001.preview.app.github.dev/tourism', {
			method: 'GET',
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(resp => {
			console.log(resp.ok);
			console.log(resp.status);			
		return resp.json();
		})
		.then(data=> {
			console.log(data);
			setCharacters(data.results);
		})
		.catch(error => {
			console.log(error);
			console.log('Oops something went wrong'+ error);
		})
	}

	const getProducts = () => {
		fetch('https://lucymacko-fluffy-engine-r97765r66x9h544-3001.preview.app.github.dev/products', {
			method: 'GET',
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(resp => {
			console.log(resp.ok);
			console.log(resp.status);			
		return resp.json();
		})
		.then(data=> {
			console.log(data);
			setPlanets(data.results);
		})
		.catch(error => {
			console.log(error);
			console.log('Oops something went wrong'+ error);
		});
	} */}
	const getActivities = () => {
		fetch('https://lucymacko-fluffy-engine-r97765r66x9h544-3001.preview.app.github.dev/activities', {
			method: 'GET',
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(resp => {
			console.log(resp.ok);
			console.log(resp.status);			
		return resp.json();
		})
		.then(data=> {
			console.log(data);
			setVehicles(data.results);
		})
		.catch(error => {
			console.log(error);
			console.log('Oops something went wrong'+ error);
		})
	}

	{/*const showTourism = () =>{
		return characters.map((character, index) =>{
				return(
					<li className="w-25" key={index}
					>
				 		<CharacterCard character={character} />
					</li>
				)				
			})
	}

	const showProducts = () =>{
		return planets.map((planet, index) =>{
				return(
					<li className="w-25" key={index}
					>
				 		<PlanetCard planet={planet} />
					</li>
				)				
			})
	} */}
	const showActivities = () =>{
		return activities.map((activity, index) =>{
				return(
					<li className="w-25" key={index}
					>
				 		<ActivityCard />
					</li>
				)				
			})
	}
	return (
		<div className="container-fluid">
			<h1> Activities</h1>
			<div className="row row-cols-1 row-cols-md-3 g-4">
  				<div className="col">
					<ul>
						{showActivities()}
					</ul>
				</div>	
			</div>		
		</div>
		
	)	
	{/*<div className="container-fluid">		
			<h1> Tourism</h1>
			<ul className="row d-flex flex-nowrap overflow-auto mx-4">
				{showTourism()}
			</ul>		
		

		<div className="container-fluid">
			<h1> Products</h1>
			<ul className="row d-flex flex-nowrap overflow-auto mx-4">
				{showProducts()}
			</ul>		
		</div>*/}
	
		
};
