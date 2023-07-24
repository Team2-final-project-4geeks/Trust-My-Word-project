import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Product } from "../component/product.js";


export const Products = (props) => {

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
				<div className="scrollmenu" >
						<h1 className="font-bold text-white text-center my-5">Products</h1>
						<div className="general-products text-center">
							{products && showProducts()}
						</div>
				</div>
		</div>			
	);
};