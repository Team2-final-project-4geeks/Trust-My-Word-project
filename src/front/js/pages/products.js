import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Product } from "../component/productcard.jsx";
import FilterBarProducts from "../component/filterbarproducts.js";


export const Products = () => {

	const { store, actions } = useContext(Context);
	const navigate= useNavigate();
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
			setProducts(data)
			actions.addProducts(data)
		})
		.catch(err => console.error(err))	
	}

	const filteredProducts = products.filter((product)=> product.location.toLowerCase().includes(store.query) &&
    (store.selectedType === "" || product.type === store.selectedType)) 
		
		return (
			<div className="container-fluid mt-2">
            <FilterBarProducts/>
            <div className="card mt-4 mb-5 border-0" id="quoteProduct">                    
                <div className="card-body d-flex">
                    <blockquote className="blockquote mb-0">
                    <p className="text-center mt-4" id="quote">“I've tested so many products that my house is considering requesting a review.”</p>
                    <footer className="blockquote-footer text-center mt-4 mb-4">Someone</footer>
                    </blockquote>
                </div>
            </div>
            <div className="py-2" >                
                <div className="card-group">
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {(products.length !== 0 || store.query !== "") ? (filteredProducts.map((product, index) =>{            
                            return(
                                <li key={index}>              
                                    <div className="col">
                                        <div className="card">
                                            <div className="image-container w-100">
                                                <img src={product.image} className="card-img-top" alt="..."/>
                                                <div className="image-overlay d-flex justify-content-end align-items-start p-2 w-100" id="imageProducts">
                                                    <i className="fas fa-heart text-danger" onClick={() => {
                                                        actions.addFavourite(props.product.title);
                                                        actions.addUserFavourites(localStorage.getItem("userId"))}}>
                                                    </i>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title">{product.title}</h5>
                                                <p className="card-text">{product.type}</p>
                                                <p className="card-text">{product.location}</p>
                                                <p className="card-text">{product.publishing_date}</p>                            
                                                <p className="card-text">{product.description}</p>
                                                <Link to={product.link} className="card-text">{product.link}</Link>
                                                <div class="sharethis-inline-share-buttons"></div>
                                            </div>
                                            <button className="btn" type="button" id="productCardViewMore" onClick={()=> navigate("/product/" + product.id)}> <strong>View more</strong></button>
                                        </div>
                                    </div>
                                </li>
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
        </div>
	);
};