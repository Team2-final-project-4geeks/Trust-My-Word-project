import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/button.css";
import { Context } from "../store/appContext";
import { useContext } from "react";


const ViewMoreProduct = (props) =>{
    const {store, actions} = useContext(Context);
    const token = localStorage.getItem("jwt-token")

    const handleReviewClick = (productId) => {
        actions.addToCounter(productId)
	  };
    const navigate = useNavigate()

    return(
        <button id="viewMoreProduct" 
                type="button"
                style={{border:"none"}} 
                onClick={()=>{ 
                    if(token){
                        navigate("/product/" + props.item)
                        handleReviewClick(props.item)
                        }else{
                            navigate("/login")
                        }
                }}> <strong>View more</strong></button>
    )
}

export default ViewMoreProduct