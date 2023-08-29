import React from "react";
import {ImBin} from 'react-icons/im';
import Swal from 'sweetalert2';
import "../../styles/carouselcard.css";

const CarouselCard = (props) =>{

  const deleteComment = (commentId) => {
    const token = localStorage.getItem('jwt-token');
    if(token) {
    fetch(process.env.BACKEND_URL + 'api/comment/' + commentId, {
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
      Swal.fire('You have deleted a comment');					
      props.fetchComments();      
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
            console.log("error from delete comment")
        }
    }

  return(
    <div className="card mb-5" id="carouselBody">
      <div className="card-body">
        <div className="d-flex flex-row justify-content-between mt-1">
          <img className="me-2" id="fotoCarouselCard" src={props.image} alt="Photo provided by the User"></img>
          <h5 className="card-title">{props.author}</h5>
          <ImBin className="deleteIcon mt-1" onClick={() => deleteComment(props.id)}/>
        </div>
        <p className="card-text mt-4">{props.description}</p>
        <p className="card-text mt-4"><small className="text-muted publishing-date">{props.date}</small></p>
      </div>  
    </div>
  )
}

export default CarouselCard;