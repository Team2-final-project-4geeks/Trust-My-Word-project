import React, { useEffect, useState } from "react";
import ShareComponent from "../component/shareComponent";
import "../../styles/singleproduct.css";

import { useParams} from "react-router-dom";



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
    const [image,setImage] = useState("")
    const {store,actions} = useContext(Context)
    const [allDescriptions, setAllDescriptions] = useState([]);
    const [description, setDescription] = useState("");
    const [oneProduct, setOneProduct]= useState();
    const user_id=localStorage.getItem("userId")
    const userName=store.userName;

    const review_id= params.id;
    
        useEffect (() => {
            getOneProduct();
            fetchComments();
            getCityFromApi(); 
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
            setCity(data.location); 
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
        fetch(process.env.BACKEND_URL + 'api/comments',{
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
        })
        .catch(error => {			
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'            
            })
        })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'            
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
            body: JSON.stringify({description, user_id, review_id}) 
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {  
            setDescription(data.description);
            Swal.fire(
                'Good job!',
                'You POSTed a comment!',
                'success'
            )
            setDescription("")
            fetchComments();            
        })
        .catch(err => Swal.fire({
            icon: 'error',
            title: 'Oops...'                        
            }))
        } else {       
            Swal.fire({
                icon: 'error',
                title: 'Oops...'                      
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
                <CarouselCard key={index} description={comment.description} url={comment.imageurl} />                      
            )
        }			
    )}
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
                                    <div className="d-flex flex-row mt-2" id="productRow">
                                        <p className="card-text ms-2">{oneProduct.id}</p>
                                        <p className="card-text ms-2">{oneProduct.publishing_date}</p>
                                        <p className="card-text">{oneProduct.price}</p>
                                    </div>
                                <p className="card-text"><i>{oneProduct.description}</i></p>
                                    <div className="d-flex flex-row" id="activityRow2">
                                        <p className="card-text ms-2"><i>{oneProduct.link}</i></p>
                                        <p className="card-text">{oneProduct.price}</p>
                                        <p className="card-text ms-2 pe-3"><i class="fas fa-map-marker-alt fa-sm me-2"></i>{oneProduct.location}</p>
                                    </div>
                                <div className="d-flex flex-row ms-4 mt-2 position-absolute bottom-0 pb-4" id="activityRow">
                                    <Link to={activity.link} className="card-text ms-3 me-5 text-center">{activity.link}</Link>
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
