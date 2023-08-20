import React from "react";
import "../../styles/carouselcard.css";

const CarouselCard = (props) =>{
  return(
    <div className="card mb-5" id="carouselBody">
      <div className="card-body">
        <div className="d-flex flex-row">
          <img className="me-2" id="profile" id="fotoCarouselCard" src="https://cdn.pixabay.com/photo/2023/08/13/00/09/woman-8186582_1280.jpg"></img>
          <h5 class="card-title">Username</h5>
        </div>
        <p className="card-text">{props.description}</p>
      </div>  
    </div>
  )
}

export default CarouselCard;