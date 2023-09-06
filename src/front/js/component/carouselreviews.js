import React from "react";
import {ImBin} from 'react-icons/im';
import Swal from 'sweetalert2';
import "../../styles/carouselreview.css";
import { useNavigate } from "react-router-dom";



const CaraouselReview = (props) =>{
    const navigate = useNavigate()
    return(
        <div className="card mb-5" id="carouselBodyReview">
        <div className="card-body">
            <div className="d-flex flex-row justify-content-between mt-1">
            <img className="me-2" id="fotoCarouselCardReview" src={props.image} alt="Photo provided by the User"></img>
            <h5 className="card-title">{props.author}</h5>
            </div>
            <p className="card-text mt-4"> <strong>{props.title}</strong></p>
            <p className="card-text">{props.description}</p>
        </div>  
        <div id="btn-review mb-3">
                <small className="text-muted publishing-date">{props.counter} Times visited</small>
        </div>
        <button onClick={()=> navigate(`/${props.category}/` + `${props.id}`)}><i class="fa-solid fa-arrow-right"></i></button>
        </div>
  )
}

export default CaraouselReview;