import React, { useEffect, useState } from "react";
import ShareComponent from "../component/shareComponent";
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

            <div className="container-fluid mt-5 mb-5" >
                {oneProduct ? (
                    <div id="backgroundSingleProduct">
                        <div className="card m-0 border-0 " id="containerSingle">
                            <div className="row g-0 h-100">
                            <div className="col-md-3">
                                <img src={oneProduct.image} className="img-fluid rounded-start h-100" alt="..."/>
                            </div>
                            <div className="col-md-6">
                                <div className="card h-100 border-0 px-3">
                                    <h5 className="card-title ms-3 mt-3 mb-4 text-center" id="activityTitle">{oneProduct.title}</h5>
                                        <div className="d-flex flex-row mt-2" id="activityRow">
                                            <p className="card-text ms-2">{oneProduct.id}</p>
                                            <p className="card-text ms-2">{oneProduct.publishing_date}</p>
                                            <p className="card-text">{oneProduct.price}</p>
                                        </div>
                                    <p className="card-text"><i>{oneProduct.description}</i></p>
                                <div className="d-flex flex-row" id="activityRow2">
                                    <p className="card-text ms-2"><i>{oneProduct.link}</i></p>
                                    <ShareComponent />
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                ):(
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                )}
                <div className="container-fluid" id="commentSection">
                <h4 className="my-5">Comments</h4>
                <div className="input-group mb-5">
                    <span className="input-group-text rounded me-2" id="basic-addon1">Username</span>
                    <input type="text" className="form-control rounded-pill" placeholder="Lorem Ipsum" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                <div className="input-group mb-5">
                    <input type="text" className="form-control rounded-pill me-2" placeholder="Lorem Ipsum Xmas Banana Happy" aria-label="Username" aria-describedby="basic-addon1"/>
                    <span className="input-group-text rounded" id="basic-addon1">Username</span>
                </div>
                <div className="input-group mb-5">
                    <span className="input-group-text rounded me-2" id="basic-addon1">Username</span>
                    <input type="text" className="form-control rounded-pill" placeholder="Lorem Summer Coding Sad" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                <div className="input-group">
                    <span className="input-group-text rounded me-2" id="commentWrite">Write your comment:</span>
                    <textarea className="form-control rounded-pill" aria-label="With textarea"></textarea>
                </div>
                <button type="button" className="btn btn-dark mt-5" id="sumbitButtonSingle"> Send </button>
            </div>
            </div>
        )
    }
