import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import ViewMoreProduct from "./viewMoreProduct.js";

import "../../styles/productcard.css";


export const ProductCard = (props) => {

    const navigate = useNavigate ()
    const {store, actions} = useContext(Context);


    return (
        <div className="card-body">
            <div class="image-container">
             <img src={props.product.image} class="card-img-top" alt="..."/>
                <div class="image-overlay">
                    <i class="far fa-heart fa-1x" onClick={() => {
                            actions.addFavourite(props.product.title); 
                            	{/*Passar id Hardcoded pero después tendria que venir del store (stor.id o como lo tenga añadido Edi en flux)}*/}
                            actions.addUserFavourites(store.favourite, store.userId)
                            }}></i>
                    <h1></h1>
                </div>
            </div>
            <div class="card-body mx-3">
                <div class="d-flex flex-column align-items-center justify-content-center ">
                        <div className=" col-11">
                            <div className="d-flex flex-row">
                                <img src={props.profile} class="profile-image" alt="..."/>
                                <div className="d-flex flex-column mx-3">
                                    <p class="card-text"><small class="text-muted publishing-date">{props.product.publishing_date}</small></p>
                                </div>
                            </div>
                                <h3 class="card-title text-center mt-4">{props.product.title}</h3>
                            <div className="text-center">
                                <i class="fas fa-star fa-sm text-warning text-center"></i>
                                <i class="fas fa-star fa-sm text-warning text-center"></i>
                                <i class="fas fa-star fa-sm text-warning text-center"></i>
                            </div>
                            <div className="card-description">
                                <p class="card-text"><i class="fas fa-quote-left mt-2 me-2"></i> <i> {props.product.description}</i></p>
                                <p class="card-text"><i>{props.product.price}</i></p> 
                            </div>  
                            <div className="btn-container">
                                <ViewMoreProduct item={props.product.id}/>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}
