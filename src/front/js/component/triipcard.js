import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/triipcard.css";
import ViewMore from "./viewmore.js";
import { Context} from "../store/appContext";


const TriipCard = (props)=>{
    const { store, actions } = useContext(Context);
    return(
            <div className="card-body">
                <div className="image-container">
                    <img src={props.img} className="card-img-top" alt="..."/>
                    <div className="image-overlay d-flex justify-content-end align-items-start p-2">
                        <i className="fas fa-heart text-danger" onClick={() => {
                        actions.addFavourite(props.trip.id);
                        actions.addUserFavourites(localStorage.getItem("userId"))
                        }}></i>
                    </div>
                </div>
             <div className="card-body mx-3 ">
            <div className="d-flex flex-column">
                <div className=" col-11">
                    <div className="d-flex flex-row">
                        <img src={props.profile} className="profile-image" alt="..."/>
                            <div className="d-flex flex-column mx-3">
                                <p className="card-text"><small className="text-muted username">{store.userName}</small></p>
                                <hr className="mb-0"/>
                                <p className="card-text"><small className="text-muted publishing-date">{props.trip.publishing_date}</small></p>
                            </div>     
                    </div>
                    <div className="d-flex flex-column align-items-center ">
                        <h5 className="card-title text-center mt-2">{props.trip.title}</h5>
                        <div className="rating-board">      
                                {Array.from({ length: parseInt(props.trip.rating) }).map((_, index) => (
                                <span key={index} style={{ color: 'gold' }}>&#9733;</span>
                                ))}
					    </div>
                        <div id="trip-board" className="mt-2">
                            <div id="card-description-trip">
                                <p className="card-text"><i className="fas fa-quote-left mt-2 me-2"></i> <i> {props.trip.description}</i></p>
                            </div>
                            <p className="card-text mt-4">{props.trip.price}</p>
                        </div>
                    </div>
                    <div className="btn-container-trip">
                        <ViewMore item={props.item.id}/>
                    </div>
                 </div>
            </div>
        </div>
        </div>


    )
}

export default TriipCard