import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Product } from "../component/productcard.jsx";


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
		<div className="container-fluid mt-2">
            <div className="py-2" >
                <h1 className="font-weight-light ms-5 my-5">PRODUCTS </h1>
                <p className="mx-5 mb-5">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>                    
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {products.length !== 0 ? showProducts() : (
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    )}
                </div>
            </div>
        </div>	
	);
};