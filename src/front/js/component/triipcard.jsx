import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/triipcard.css";
import ViewMore from "./viewmore.jsx";
import { Context} from "../store/appContext";


const TriipCard = (props)=>{
    const { store, actions } = useContext(Context);

    return(
            <div className="card-body">
                <div className="image-container">
                    <img src={props.img} className="card-img-top" alt="..."/>
                    <div className="image-overlay d-flex justify-content-end align-items-start p-2">
                        <i className="fas fa-heart text-danger" onClick={() => actions.addFavourite(props.trip.title)}></i>
                    </div>
                </div>
             <div className="card-body mx-3">
            <div className="d-flex flex-column">
                <div className=" col-11">
                    <div className="d-flex flex-row">
                        <img src={props.profile} className="profile-image" alt="..."/>
                            <div className="d-flex flex-column mx-3">
                                <hr className="mb-0"/>
                                <p className="card-text"><small className="text-muted publishing-date">{props.trip.publishing_date}</small></p>
                            </div>     
                    </div>
                    <div className="d-flex flex-column align-items-center ">
                        <h3 className="card-title text-center mt-2">{props.trip.title}</h3>
                        <div className="text-center">
                            <i className="fas fa-star fa-sm text-warning text-center"></i>
                            <i className="fas fa-star fa-sm text-warning text-center"></i>
                            <i className="fas fa-star fa-sm text-warning text-center"></i>
                        </div>
                        <div id="trip-board" classNameName="mt-2">
                            <div id="card-description-trip">
                                <p className="card-text"><i className="fas fa-quote-left mt-2 me-2"></i> <i> {props.trip.description}</i></p>
                            </div>
                            <p className="card-text mt-4">{props.trip.price}</p>
                        </div>
                    </div>
                    <div className="btn-container">
                        <ViewMore item={props.item.id}/>
                    </div>
                 </div>
            </div>
        </div>
        </div>


    )
}

export default TriipCard