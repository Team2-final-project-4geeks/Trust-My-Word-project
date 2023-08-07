import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { Context } from "../store/appContext";

import "../../styles/productcard.css";


export const Product = (props) => {

    const navigate = useNavigate ()
    const [rating, setRating] = useState(0);

    const {store, actions} = useContext(Context);


    const handleStarClick = (index) => {
        setRating(index + 1);
    }

    return (
        <div className="card-body">
            <img src={props.product.image} class="card-img-top" alt="..."/>
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
                        <div className="card-description">
                            <p class="card-text"><i class="fas fa-quote-left mt-2 me-2"></i> <i> {props.product.description}</i></p>
                            <p class="card-text"><i>{props.product.price}</i></p>            
                            <span>
                                {[...Array(5)].map((_, index) => {
                                    const starValue = index + 1;
                                    return (
                                        <span
                                        key={index}
                                        onClick={() => handleStarClick(index)}
                                        style={{ cursor: 'pointer' }}
                                        >
                                        {starValue <= rating ? (
                                            <FaStar color="#ffc107" />
                                            ) : starValue - 0.5 === rating ? (
                                            <FaStarHalfAlt color="#ffc107" />
                                            ) : (
                                            <FaRegStar color="#ffc107" />
                                            )
                                        }
                                        </span>                         
                                    );
                                })}                    
                            </span> 
                        </div>  
                        <div className="btn-container">
                                <button
                                className="btn btn-success"
                                onClick={() => {
                                    navigate("/product/" + props.product.id);
                                }}
                                >
                                Learn more
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
