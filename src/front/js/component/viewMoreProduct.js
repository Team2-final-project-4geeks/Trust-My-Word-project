import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/button.css";
import { Context } from "../store/appContext";
import { useContext } from "react";


const ViewMoreProduct = (props) =>{
    const {store, actions} = useContext(Context);
    const handleReviewClick = (activityId) => {
        actions.addToCounter(activityId)
	  };
    const navigate = useNavigate()

    return(
        <button className="btn" 
                type="button"  
                onClick={()=>{ 
                    navigate("/product/" + props.item)
                    handleReviewClick(props.item)
                }}> <strong>View more</strong></button>
    )
}

export default ViewMoreProduct