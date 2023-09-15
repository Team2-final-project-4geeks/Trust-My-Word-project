import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Context } from "../store/appContext";
import FilterBarProducts from "../component/filterbarproducts";
import { ProductCard } from "../component/productcard";

import "../../styles/products.css";



export const Products = () => {

	const { store, actions } = useContext(Context);
	const navigate= useNavigate();
	const [products, setProducts] = useState([]);

	useEffect(() =>{
		getProducts()
	}, [])

	const getProducts = () =>{
		fetch(process.env.BACKEND_URL + 'api/review?category=product', {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(res => res.json())
		.then(data => {
			setProducts(data)
			actions.addProducts(data)
		})
		.catch(err => console.error(err))	
	}

	const filteredProducts = products.filter((product)=>store.selectedType === "" || product.type === store.selectedType)
		
		return (
			<div className="container-fluid mt-2">
                <FilterBarProducts/>

                <div className="card mt-4 mb-5 border-0" id="quoteProduct">
                    <div className="card-body d-flex">
                        <div className="row">
                            <blockquote className="blockquote mb-0">
                                <p className=" col-sm-12 text-center mt-4" id="quote">“I've tested so many products that my house is considering requesting a review.”</p>
                                <footer className="col-sm-12 blockquote-footer text-center mt-4 mb-4" id="author">Unknown author</footer>
                            </blockquote>
                        </div>    
                    </div>
                </div>

                <div className="container-fluid" >                
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {(products.length !== 0 || store.query !== "") ? (filteredProducts.map((product, index) =>{           
                            return(
                                <div key={index} className="col-md-4 col-ms-12">
                                    <ProductCard
                                        key={index} 
                                        item={product}
                                        product={product}
                                        userImage={product.userImage}
                                        img={product.image}
                                        author={product.reviewOwner}
                                        rating={product.rating}                                        
                                    />
                                </div>
                            )
                            }
                            )) : (
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
	)
}