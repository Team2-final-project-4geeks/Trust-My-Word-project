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
          items: 4
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
                }
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
                    <div className="col-11 card border-0 " id="containerSingleProduct">
                        <div className="row g-0 h-100">
                            <div className="col-4">
                                <img id="singleProductPicture"src={oneProduct.image} className="img-fluid rounded-start h-100" alt="..."/>
                            </div>
                            <div className="col-8">
                                <div className="card h-100 border-0 px-3">
                                    <h3 className="card-title ms-3 mt-3 mb-4 text-center" id="productTitle">{oneProduct.title}</h3>
                                        <div className="d-flex flex-row mt-2" id="productRow">
                                            <p className="card-text ms-2"><i class="fas fa-heart fa-xs me-2"></i>{userName}</p>
                                            <p className="card-text"><i class="fas fa-info-circle fa-sm me-2"></i>{oneProduct.type}</p>
                                            <p className="card-text ms-2"><i class="fas fa-calendar-alt fa-sm me-2"></i>{oneProduct.publishing_date}</p>
                                        </div>
                                    <p className="card-text"><i>" {oneProduct.description} "</i></p>
                                        <div className="d-flex flex-row" id="productRow2">
                                            <p className="card-text"><i class="fas fa-money-bill-wave me-2"></i>{oneProduct.price}€</p>
                                        </div>
                                        <Link to={oneProduct.link} className="card-text ms-3 me-5 text-center">{oneProduct.link}</Link>
                                    <div className="d-flex flex-row ms-4 mt-2 position-absolute bottom-0 pb-4" id="link-share">
                                        <ShareComponent />
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
                    <div className="container-fluid">
                        <Carousel showDots={true} arrows={false} responsive={responsive} >
                            {showComments()}
                        </Carousel>
                    </div>
                    <div className="input-group mt-5" id="comment">
                        <span className="input-group-text rounded me-2" id="commentWrite">Write your comment:</span>
                        <textarea className="form-control" id="commentBox" value={description} onChange={(e)=> setDescription(e.target.value)} aria-label="With textarea"></textarea>
                    </div>
                    <button 
                        type="button" className="btn btn-dark mt-5" 
                        onClick={createComment}
                        id="sumbitButtonSingle"> Send 
                    </button>
                    </div>           
            </div>

        )
    }