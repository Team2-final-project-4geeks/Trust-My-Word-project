import React, { useEffect, useState, useContext  } from "react";
import ShareComponent from "../component/shareComponent.js";
import Swal from 'sweetalert2';
import CarouselCard from "../component/carouselcard.js";
import Carousel from "react-multi-carousel";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";

import "../../styles/singleproduct.css";

export const SingleProduct = () => {
    const responsive = {  
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    const params = useParams()
    const [city,setCity] = useState("")
    const {store,actions} = useContext(Context)
    const [allDescriptions, setAllDescriptions] = useState([]);
    const image= localStorage.getItem("image")
    const [date,setDate]= useState("");
    const author=localStorage.getItem("username")
    const [description, setDescription] = useState("");
    const [oneProduct, setOneProduct]= useState();
    const user_id=localStorage.getItem("userId")
    const userName=store.userName;
    const review_id= params.id;
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    
        useEffect (() => {
            getOneProduct();
            fetchComments();
        }, [])
    
    const getOneProduct = () => {
        const token = localStorage.getItem('jwt-token');
        if(token) {
        fetch(process.env.BACKEND_URL + 'api/review/' + params.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : "Bearer " + token
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setOneProduct(data);
        })
        .catch(err => Swal.fire({
            icon: 'error',
            title: 'Oops...'                        
            }))        
        } else {       
            console.log("error")
        }}
        
        const fetchComments =() =>{        
            const token = localStorage.getItem('jwt-token');        
            if(token) {        
            fetch(process.env.BACKEND_URL + 'api/comments/' + review_id,{
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : "Bearer " + token
                }
            })
            .then(resp => {								
                return resp.json();
            })
            .then(data=> {		
            setAllDescriptions(data);
            console.log(data);            
            })
            .catch(err => console.log('comments' + err))
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Access denied. Please log in!'            
                })
            }}
    
        const createComment = () => {
            if (description.trim() === '') {
                Swal.fire({
                    title: 'Oops!',
                    text: 'You cannot post a comment without text',
                    imageUrl: 'https://cdn.pixabay.com/photo/2015/08/05/15/04/mistake-876597_1280.jpg',
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: 'Custom image',
                  })
                return;
            }else{
            const token = localStorage.getItem('jwt-token');
            if(token) {
            fetch(process.env.BACKEND_URL + 'api/create-comment', {
                method: "POST",          
                headers: {
                "Content-Type": "application/json",
                "Authorization" : "Bearer " + token
                },
                body: JSON.stringify({description, user_id, review_id, author, date:formattedDate }) 
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {  
                setDescription(data.description);
                setDate(data.date);
                Swal.fire(
                    'Good job!',
                    'You POSTed a comment!',
                    'success'
                )
                setDescription("")
                fetchComments();            
            })
            .catch(err => console.log('create comment' + err))
            } else {       
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Access denied. Please log in!'            
                })
                }}
        }

    const deleteComment = (commentId) => {
        const token = localStorage.getItem('jwt-token');
        if(token) {
		fetch(process.env.BACKEND_URL + 'api/comment/' + commentId, {
			method: 'DELETE',
			headers: { 
                "Authorization" : "Bearer " + token
            },
		})
		.then(resp => {			
			console.log(resp.ok);
			console.log(resp.status);
			return resp.json();
		})
		.then(data => {
			Swal.fire('You have deleted a comment');					
			fetchComments();
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
    const showComments = () =>{
        return allDescriptions.map((comment, index) => {
            return(
                <CarouselCard 
                key={index} 
                id={comment.id} 
                description={comment.description} 
                author={comment.author} 
                image={comment.testImage} 
                fetchComments={fetchComments} 
                date={comment.date}
                userLogged={user_id}
                authorId={comment.user_id} 
                />                      
            )
        }			
    )}

    return (

        <div className="container-fluid mt-5 mb-5 d-flex flex-column align-items-center">
            {oneProduct ? (
                        <div className="col-11 card border-0" id="containerSingleProduct">
                            <div className="row g-0 h-100" >
                                <div className="col-sm-12 col-md-4">
                                    <img id="singleProductPicture"src={oneProduct.image} className="rounded-start h-100 w-100 col-sm-12" alt="..."/>
                                </div>
                                <div className="col-sm-12 col-md-8">
                                    <div className="card h-100 border-0 px-3" id="cardProduct">
                                        <h3 className="card-title ms-3 mt-4 mb-4 text-center" id="productTitle">{oneProduct.title}</h3>
                                            <div className="d-flex flex-row flex-wrap justify-content-center mt-3" id="productRow">
                                                <p className="col-sm-3 card-text text-start ms-2 me-2"><i class="fas fa-heart fa-xs me-2"></i>{oneProduct.reviewOwner}</p>
                                                <p className="col-sm-4 card-text text-center ms-2"><i class="fas fa-info-circle fa-sm me-2"></i>{oneProduct.type}</p>
                                                <p className="col-sm-4 card-text text-end ms-2"><i class="fas fa-calendar-alt fa-sm me-2"></i>{oneProduct.publishing_date}</p>
                                            </div>
                                        <div className="row">
                                            <p className="card-text ms-2 my-2"><i>" {oneProduct.description} " </i></p>
                                        </div>
                                        <div className="singleProductBottom d-flex flex-column">
                                            <div className="d-flex flex-row flex-wrap justify-content-center" id="productRow2">
                                                <p className="card-text text-center"><i class="fas fa-money-bill-wave me-2"></i>{oneProduct.price}€</p>
                                                <Link to={oneProduct.link} target="_blank" className="card-text ms-3 mb-3" id="productLink">{oneProduct.link}</Link>
                                            </div>
                                            <div className="col-sm-12" id="shareProduct">
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
                        <div className="container border-0">
                        <div className="row justify-content-center">                
                            <div className="col border-0" id="commentSection">
                                <h4 className="my-5 ms-4" id="commentsTitle">Comments</h4>
                                <div className="container border-0" id="cardArea">
                                    <div className="row">
                                        <Carousel showDots={true} arrows={false} responsive={responsive} swipeable={true}>
                                            {showComments()}
                                        </Carousel>
                                    </div>
                                </div>
                            </div>
                        </div>
        
                        <div className="row">                 
                            <div className="input-group mt-5 mx-auto justify-content-center" id="comment">
                                <span className="col-sm-3 input-group-text rounded me-2 text-wrap" id="commentWrite">Post a comment:</span>
                                <textarea 
                                    className="col-sm-9 col-lg-5 form-control" 
                                    id="commentBox" 
                                    maxLength={125} 
                                    value={description} 
                                    onChange={(e)=> setDescription(e.target.value)} 
                                    aria-label="With textarea">                                
                                </textarea>
                            </div>
                        </div>
                        <div className="row">
                            <div className="container-fluid d-flex justify-content-center">
                                <button 
                                    type="button"                            
                                    className="btn btn-dark mt-5" 
                                    onClick={createComment}
                                    id="sumbitButtonSingle"> Send 
                                </button>
                            </div> 
                        </div>               
                    </div>           
                </div>

        )
    }
