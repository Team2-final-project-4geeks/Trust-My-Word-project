import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/activitycard.css";
import { Context} from "../store/appContext";
import Swal from 'sweetalert2';


const ActivityCard = (props)=>{
    const { store, actions } = useContext(Context);
    const [showHeart, setShowHeart] = useState(false);
    const token = localStorage.getItem("jwt-token");
    const navigate= useNavigate();
    
    const handleReviewClick = (activityId) => {
        actions.addToCounter(activityId)
	  };

    const handleFavoriteClick = () => {
    setShowHeart(true);
    setTimeout(() => {
        setShowHeart(false);
    }, 2000);
    };

    return(
        <div className="card-body" id="activityBody">
            <div id="imageBoard">
                <img src={props.img} className="card-img-top" alt="..."/>
                <div id="imageOverlay" className="d-flex justify-content-end align-items-start p-2">
                        <i
                        className="fas fa-heart text-danger fa-2x"
                        onClick={() => {
                            if (token) {
                            handleFavoriteClick();
                            actions.addFavourite(props.activity.id, props.activity.title);
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
                        <div id="img-container" className="col-3 ms-2">
                            <img src={props.userImage} alt="..."/>
                        </div>
                        <div className="d-flex col-11  ms-2" id="photoData">
                            <div className="d-flex flex-column mx-1">
                                    <p className="card-text mb-0"><small className="text-muted username">{props.activity.reviewOwner}</small></p>
                                    <hr className="mb-1 mt-1"/>
                                    <p className="card-text"><small className="text-muted publishing-date">{props.activity.publishing_date}</small></p>
                            </div>
                            <div className="d-flex flex-column">
                                    <p className="text-muted mb-0"> <small>Visited {props.activity.counter} <i class="fa-solid fa-eye"></i></small></p>
                                    <p className="card-text"><small className="text-muted">{props.activity.location}</small></p>
                            </div>     
                        </div>     
                    </div>

                    <div className="d-flex flex-column align-items-center ">
                        <h5 className="card-title text-center mt-2">{props.activity.title}</h5>
                        <div className="rating-board">      
                                {Array.from({ length: parseInt(props.activity.rating) }).map((_, index) => (
                                <span key={index} style={{ color: 'gold' }}>&#9733;</span>
                                ))}
					    </div>
                        <div id="activity-board" className="mt-2">
                            <div id="card-description-activity">
                                <p className="card-text"><i className="fas fa-quote-left mt-2 me-2"></i> <i> {props.activity.description}</i></p>
                            </div>
                            <p className="card-text mt-4">{props.activity.price}€</p>
                        </div>
                    </div>

                    <div id="activityCardViewMore">
                        <button 
                            className="btn" 
                            type="button" id="activityCardViewMoreBtn" 
                            onClick={()=>{ 
                                navigate("/activity/" + props.activity.id)
                                handleReviewClick(props.activity.id)
                                }}> <strong>View more</strong>
                        </button>
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

export default ActivityCard