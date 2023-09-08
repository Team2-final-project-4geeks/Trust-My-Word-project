import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import ViewMoreProduct from "./viewMoreProduct.js";
import Swal from 'sweetalert2';

import "../../styles/productcard.css";


export const ProductCard = (props) => {
    const navigate = useNavigate ()
    const {store, actions} = useContext(Context);
    const token = localStorage.getItem("jwt-token")
    const [showHeart, setShowHeart] = useState(false);

    const handleFavoriteClick = () => {
        setShowHeart(true);
        setTimeout(() => {
          setShowHeart(false);
        }, 2000);
      };

    return (
            <div className="card-body">
                <div id="imageBoard">
                        <img src={props.product.image} alt="..."/>
                        <div id="imageOverlay" className="d-flex justify-content-end align-items-start p-2">
                            <i 
                                className="fas fa-heart text-danger fa-2x" 
                                onClick={() => {
                                    if (token) {
                                        handleFavoriteClick();
                                        actions.addFavourite(props.product.id, props.product.title, props.product.category);
                                        actions.addUserFavourites(localStorage.getItem("userId"));
                                        } else {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Oops...",
                                            text: "You have to login first!",
                                        });
                                        navigate("/login");
                                        }
                                }}></i>
                    </div>
                </div>
                <div id="infoBoard" className="mt-3">
                        <div className="d-flex flex-column">
                            <div className=" col-12">
                                <div className="d-flex flex-row">
                                    <div id="img-container" className="col-3">
                                        <img src={props.profile} alt="..."/>
                                    </div>
                                    <div className="d-flex justify-content-between col-10 ms-3">
                                        <div className="d-flex flex-column mx-3">
                                            <p className="card-text mb-0"><small className="text-muted username">{props.author}</small></p>
                                            <hr className="mb-1 mt-1"/>
                                            <p className="card-text"><small className="text-muted publishing-date">{props.product.publishing_date}</small></p>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <p className="text-muted"> <small>Visited {props.product.counter} <i class="fa-solid fa-eye"></i></small></p>
                                    </div>  
                                </div>     
                       
                                <div className="d-flex flex-column  align-items-center justify-content-center mt-2" >
                                    <h5 className="card-title text-center mt-2">{props.product.title}</h5>
                                    <div className="rating-board">      
                                        {Array.from({ length: parseInt(props.product.rating) }).map((_, index) => (
                                        <span key={index} style={{ color: 'gold' }}>&#9733;</span>
                                        ))}
					                </div>
                                    <div id="product-board" className="mt-2">
                                        <div id="card-description-product">
                                            <p className="card-text"><i className="fas fa-quote-left mt-2 me-2"></i> <i> {props.product.description}</i></p>
                                        </div>
                                        <p className="card-text mt-4">{props.product.price}€</p>
                                    </div>
                                </div>
                                <div id="productCardViewMore">
                                    <ViewMoreProduct item={props.product.id}/>
                                </div>
                                <div>
                                    {showHeart && <div id="#floating-heartProduct">&hearts;</div>}
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
    )
}
