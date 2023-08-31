import React, { useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/triipcard.css";
import ViewMore from "./viewmore.js";
import { Context} from "../store/appContext";
import Swal from 'sweetalert2';



const TriipCard = (props)=>{
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    const token = localStorage.getItem("jwt-token")
    const [showHeart, setShowHeart] = useState(false);

    const handleFavoriteClick = () => {
      setShowHeart(true);
      setTimeout(() => {
        setShowHeart(false);
      }, 2000);
    };
  

    return(
            <div className="card-body mt-5">
                    <div id="imageBoard">
                        <img src={props.img} className="card-img-top" alt="..." />
                        <div id="imageOverlay" className="d-flex justify-content-end align-items-start p-2">
                            <i
                            className="fas fa-heart text-danger fa-2x"
                            onClick={() => {
                                if (token) {
                                handleFavoriteClick();
                                actions.addFavourite(props.trip.id, props.trip.title);
                                actions.addUserFavourites(localStorage.getItem("userId"));
                                } else {
                                Swal.fire({
                                    icon: "error",
                                    title: "Oops...",
                                    text: "You have to login first!",
                                });
                                navigate("/login");
                                }
                            }}
                            ></i>
                        </div>
                    </div>

                    <div id="infoBoard" className="mt-3">
                        <div className="d-flex flex-column">
                            <div className=" col-11">
                                <div className="d-flex flex-row">
                                    <div id="img-container" className="col-3">
                                        <img src={props.profile} alt="..."/>
                                    </div>
                                    <div className="d-flex justify-content-between col-11  ms-3">
                                        <div className="d-flex flex-column mx-3">
                                                <p className="card-text mb-0"><small className="text-muted username">{props.author}</small></p>
                                                <hr className="mb-1 mt-1"/>
                                                <p className="card-text"><small className="text-muted publishing-date">{props.trip.publishing_date}</small></p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                                <p className="text-muted"> <small>Visited {props.trip.counter} <i class="fa-solid fa-eye"></i></small></p>
                                        </div>     
                                    </div>                                
                                </div>

                                <div className="d-flex flex-column align-items-center mt-2">
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
                                <div>
                                {showHeart && <div className="floating-heart">&hearts;</div>}
                                </div>
                            </div>
                        </div>
                    </div>
        </div>
    )
}

export default TriipCard