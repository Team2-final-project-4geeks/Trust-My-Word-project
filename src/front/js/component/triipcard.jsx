import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/triipcard.css";


const TriipCard = (props)=>{
    const navigate = useNavigate()
    const [trip,setTrip] = useState("")

    const get_single_trip = () =>{
        fetch('https://edijavier99-shiny-space-goggles-jjgrjrpvj43j5r7-3001.app.github.dev/api/review' + props.item.id, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(res => res.json())
		.then(data => {
            console.log(data);
            setTrip(data)
		})
		.catch(err => console.error(err))	
    }
    useEffect(()=>{
        get_single_trip()
    },[])

    return(
            <div className="card-body">
                <img src={props.img} class="card-img-top" alt="..."/>

             <div class="card-body mx-3">
            <div class="d-flex flex-column align-items-center justify-content-center ">
                <div className=" col-11">
                    <div className="d-flex flex-row">
                        <img src={props.profile} class="profile-image" alt="..."/>
                            <div className="d-flex flex-column mx-3">
                                <p class="card-text"><small class="text-muted publishing-date">{props.trip.publishing_date}</small></p>
                            </div>
                        
                    </div>
                    
                    <h3 class="card-title text-center mt-4">{props.trip.title}</h3>
                    <div className="text-center">
                    <i class="fas fa-star fa-sm text-warning text-center"></i>
                    <i class="fas fa-star fa-sm text-warning text-center"></i>
                    <i class="fas fa-star fa-sm text-warning text-center"></i>
                    </div>
                    <div className="card-description">

                   
                    <p class="card-text"><i class="fas fa-quote-left mt-2 me-2"></i> <i> {props.trip.description}</i></p>
                    <p class="card-text"><i>{props.trip.price}</i></p>
                    </div>
                   
                    <div className="btn-container">
                        <button
                        className="btn btn-success"
                        onClick={() => {
                            navigate("/trip/" + props.item.id);
                        }}
                        >
                        Learn more
                        </button>
                    </div>
                 </div>
            </div>
        </div>
        </div>


    )
}

export default TriipCard