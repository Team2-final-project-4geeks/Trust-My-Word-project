import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/button.css";
import { useContext } from "react";
import { Context } from "../store/appContext";


const ViewMore = (props) =>{
    const { store, actions } = useContext(Context);

    const handleReviewClick = (tripId) => {
        actions.addToCounter(tripId)
	  };

    const navigate = useNavigate()
    return(
        <button id="viewMore"
                type="button"  
                onClick={()=> {
                    navigate("/trip/" + props.item)
                    handleReviewClick(props.item)
                }}> <strong>View more</strong></button>
    )
}

export default ViewMore