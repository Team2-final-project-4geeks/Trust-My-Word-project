import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/button.css";


const ViewMore = (props) =>{

    const navigate = useNavigate()
    return(
        <button className="btn" type="button"  onClick={()=> navigate("/trip/" + props.item)}> <strong>View more</strong></button>
    )
}

export default ViewMore