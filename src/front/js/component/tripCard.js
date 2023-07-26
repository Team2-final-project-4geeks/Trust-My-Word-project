import React from "react";

const TripCard = (props) =>{
    return(
        <div className="row">
            <div className="col-6">
            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
            <img src={props.image1} class="d-block w-100" alt="..."/>
            </div>
            <div class="carousel-item">
            <img src={props.image2} class="d-block w-100" alt="..."/>
            </div>
            <div class="carousel-item">
            <img src={props.image3} class="d-block w-100" alt="..."/>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
            </div>
            <div>
                <h1>{props.title}</h1>
                <p>{props.description}</p>
                <p class="card-text"><small class="text-muted">{props.date}</small></p>
                <h3>Location</h3>
                <h4>Calculate distance</h4>
                

            </div>

        </div>
        
    )
}
export default TripCard 