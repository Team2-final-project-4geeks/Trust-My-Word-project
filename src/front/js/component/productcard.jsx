import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import ViewMoreProduct from "./viewMoreProduct.js";
import Swal from 'sweetalert2';

import "../../styles/productcard.css";


export const ProductCard = (props) => {
    const navigate = useNavigate ()
    const {store, actions} = useContext(Context);
    const [showHeart, setShowHeart] = useState(false);

    const handleFavoriteClick = () => {
        setShowHeart(true);
        setTimeout(() => {
          setShowHeart(false);
        }, 2000);
      };

    return (
            <div className="card-body">
                <div className="image-container-product">
                    <img src={props.product.image} alt="..."/>
                    <div id="imageOverlay" className="d-flex justify-content-end align-items-start p-2">
                        <i className="fas fa-heart text-danger fa-2x" onClick={() => {
                        if (token) {
                            handleFavoriteClick();
                            actions.addFavourite(props.product.id, props.product.title, props.product.category);
                            actions.addUserFavourites(localStorage.getItem("userId"))
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
             <div className="card-body mx-3">
            <div className="d-flex flex-column">
                <div className=" col-11">
                    <div className="d-flex flex-row">
                        <img src={props.profile} className="profile-image" alt="..."/>
                            <div className="d-flex flex-column mx-3">
                                <p className="card-text"><small className="text-muted username">{store.userName}</small></p>
                                <hr className="mb-0"/>
                                <p className="card-text"><small className="text-muted publishing-date">{props.product.publishing_date}</small></p>
                            </div>
                            <div className="d-flex align-items-center">
                                <p className="text-muted"> <small>Visited {props.product.counter} <i class="fa-solid fa-eye"></i></small></p>
                            </div>       
                    </div>
                    <div className="d-flex flex-column align-items-center ">
                        <h5 className="card-title text-center mt-2">{props.product.title}</h5>
                        <div className="rating-board">      
                                {Array.from({ length: parseInt(props.product.rating) }).map((_, index) => (
                                <span key={index} style={{ color: 'gold' }}>&#9733;</span>
                                ))}
					    </div>
                        <div id="trip-board" className="mt-2">
                            <div id="card-description-trip">
                                <p className="card-text"><i className="fas fa-quote-left mt-2 me-2"></i> <i> {props.product.description}</i></p>
                            </div>
                            <p className="card-text mt-4">{props.product.price}€</p>
                        </div>
                    </div>
                    <div id="productCardViewMore">
                        <ViewMoreProduct item={props.product.id}/>
                    </div>
                    <div>
                        {showHeart && <div className="floating-heart">&hearts;</div>}
                    </div>
                 </div>
            </div>
        </div>
        </div>
    )
}
