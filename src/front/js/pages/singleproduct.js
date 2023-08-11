import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/singleproduct.css";

import { useParams} from "react-router-dom";



export const SingleProduct = () => {

        const params = useParams ()

        const [oneProduct, setOneProduct]= useState()
    
        useEffect (() => {
            getOneProduct()
        }, [])
    
        const getOneProduct = () => {
            fetch(process.env.BACKEND_URL + 'api/review/' + params.id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setOneProduct(data);
            })
            .catch(err => console.error(err))
        }
    
        return (

            <div className="container-fluid" >
                {oneProduct ? (
                    <div className="card mb-3" id="containerSingle">
                        <div className="row g-0 h-100">
                            <div className="col-md-5">
                            <img src={oneProduct.image} className="img-fluid rounded-start h-100" alt="..."/>
                            </div>
                            <div className="col-md-7">
                            <div className="card-body h-100">
                                <h5 className="card-title">{oneProduct.title}</h5>
                                <p className="card-text">{oneProduct.description}</p>
                                <p className="card-text">{oneProduct.type}</p>
                                <p className="card-text">{oneProduct.price}</p>
                                <p className="card-text">{oneProduct.link}</p>
                                <p className="card-text"><small className="text-muted">{oneProduct.publishing_date}</small></p>
                            </div>
                            </div>
                        </div>
                    </div>
                ):(
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                )}

                <Link to="/">
                    <span className="btn btn-primary btn-lg my-5 text-center" href="#" role="button">
                        Back home
                    </span>
                </Link>
            </div>
                 
        )
    }
