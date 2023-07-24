import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const Product = (props) => {

    const navigate = useNavigate ()

    const {store, actions} = useContext(Context);

    useEffect (() => {
    }, [])

    return (
        <div className="card-body d-flex flex-column p-0">
            <img src={props.product.image} width="400" height="400" className="card-img-single"></img>
                <div className="card-body">
                    <h5 className="card-title mt-3 mb-4">
                        {props.product.title}
                    </h5>           
                    {props.product ? (               
                        <p className="card-text">
                            <p className='mt-0 mb-0'><strong>INSERT LIKES COUNTER HERE:</strong></p>
                            <p className='mt-0 mb-0'>Description: {props.product.description}</p>
                        </p>                 
                    ) : (
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    )}
                </div>  
                <div className="card_buttons">
                    <button type="button" className="card-link btn-primary rounded" 
                        onClick={() => navigate("/singleproduct/" + props.product.id )}
                        >See More
                    </button>
                    <button type="button" className="btn_favorite " onClick={() => {
                         actions.addFavourite(props.product.title)}}>
                        <i className="far fa-heart"></i>
                    </button>              
                </div>  
    </div>
    )
}
