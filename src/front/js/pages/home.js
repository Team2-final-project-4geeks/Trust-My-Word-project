import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Product } from "../component/productcard.jsx";

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

	return (
		<div className="container-fluid">
				<h1 className="py-5">Products</h1>
					<div className="container-fluid" >
							<div className="row row-cols-1 row-cols-md-4 g-4 ">
								{products && showProducts()}
							</div>
					</div>
		</div>			
	);
};
