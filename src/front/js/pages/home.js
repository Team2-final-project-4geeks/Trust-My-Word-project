import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Product } from "../component/product.js";

import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	const [products, setProducts] = useState([])


	useEffect(() =>{
	getProduct()
	}, [])

	const getProduct = () =>{
		fetch('https://fakestoreapi.com/products', {
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
		if (products && products.length > 0){
		return products.map((product) => {
			return <Product product={product} />
		})
		} else {
			return (
			<div className="spinner-border" role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
			);
		}
	}

	return (
		<div className="Container">
			<div className="text-center mt-5">
				<h1>TRUSTMYWORD!</h1>
				<p>
					<img src="https://sd.keepcalms.com/i/keep-calm-and-trust-my-words.png" width="350" height="350" />
				</p>
			</div>
				<div className="scrollmenu" >
						<h1 className="font-bold text-white text-center my-5">Products</h1>
						<div className="general-products text-center">
							{products && showProducts()}
						</div>
				</div>
		</div>			
	);
};
