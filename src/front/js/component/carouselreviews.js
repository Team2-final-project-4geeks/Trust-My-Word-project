import React from "react";
import {ImBin} from 'react-icons/im';
import Swal from 'sweetalert2';
import "../../styles/carouselreview.css";
import { useNavigate } from "react-router-dom";



const CaraouselReview = (props) =>{
    const navigate = useNavigate()

    const deleteReview = (reviewId, userId) => {
        const token = localStorage.getItem('jwt-token');
        if(token &&  props.reviewUserId == userId ) {
        fetch(process.env.BACKEND_URL + 'api/review/' + reviewId, {
          method: 'DELETE',
          headers: { 
                    "Authorization" : "Bearer " + token,
                    "Content-Type": "application/json"
                },
        })
        .then(resp => {			
          console.log(resp.ok);
          console.log(resp.status);
          return resp.json();
        })
        .then(data => {
            console.log(data);
            props.fetchReviews()
          Swal.fire('You have deleted a review');					
        })
        .catch(error => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'            
                })
            })		
        } else {
            console.log(props.reviewUserId);
            console.log(userId);

            console.log("error from delete review")
            }
        }
        
    return(
        <div className="card mb-5" id="carouselBodyReview">
        <div className="card-body">
            <div className="d-flex flex-row justify-content-between mt-1">
            <img className="me-2" id="fotoCarouselCardReview" src={props.image} alt="Photo provided by the User"></img>
            <h6 className="card-title">{props.author}</h6>
            <i className="fa-solid fa-pencil" onClick={()=> navigate( "/modify-review/"+ `${props.id}`)}></i>
            <i className="fa-solid fa-trash" onClick={()=> deleteReview(props.id , props.userId)}></i>
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