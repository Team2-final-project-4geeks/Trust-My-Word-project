import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Product } from "../component/product.js";

import { useParams} from "react-router-dom";



export const SingleProduct = () => {

        const params = useParams ()

        const [oneProduct, setOneProduct]= useState()
    
        useEffect (() => {
            getOneProduct()
        }, [])
    
        const getOneProduct = () => {
            fetch("https://fakestoreapi.com/products/" + params.id,{
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
            <div className="card-single">
                <div className="card-body-single">
                    {oneProduct ? (
                        <div className="text-center">
                            <h1 className="card-title mt-3 mb-4">
                            {oneProduct.title}
                            </h1>
                                <p className="card-text">
                                    <p className='mt-0 mb-0'>Price: {oneProduct.price}</p>
                                    <p className='mt-0 mb-0'>Description: {oneProduct.description}</p>
                                    <img src={oneProduct.image} width="400" height="400" className="card-img-single"></img>
                                    <Link to="/">
                                        <span className="btn btn-primary btn-lg my-5 text-center" href="#" role="button">
                                            Back home
                                        </span>
			                        </Link>
                                </p>
                        </div>
                    ) : (
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    )}
                </div>
            </div>
        )
    }
