import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Product } from "../component/productcard.jsx";
import SideBar from "../component/sidebar";


export const Products = () => {

	const { store, actions } = useContext(Context);

	const [products, setProducts] = useState([])


	useEffect(() =>{
	getProduct()
	}, [])

	const getProduct = () =>{
		fetch(process.env.BACKEND_URL + 'api/review?category=product', {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			setProducts(data)
		})
		.catch(err => console.error(err))	
	}

	const showProducts = () => {
		return products.map((product, index) => {
			return (
				<li key={index} className= "col">
					<div className="col">
						<div className="card">
							<img src={product.image} className="card-img-top" alt="..."/>
						</div>
						<div className="card-body">
							<h5 className="card-title">{product.title}</h5>
							<p className="card-text">{product.description}</p>                            
							<p className="card-text">{product.link}</p>
							<p className="card-text">{product.publishing_date}</p> 
						</div>
					</div>
				</li>)
				})
			}

	return (
		<div className="Container">		
				<SideBar />
				<div className="row row-cols-1 row-cols-md-2 g-4 mt-3"> 
					{showProducts()}
				</div>
		</div>			
	);
};