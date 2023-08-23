import React, { useContext, useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/singletrip.css";
import ShareComponent from "../component/shareComponent.js";
import { Context } from "../store/appContext";
import Carousel from "react-multi-carousel";
import Swal from 'sweetalert2';
import "react-multi-carousel/lib/styles.css";
import CarouselCard from "../component/carouselcard";

const SingleTrip = () =>{
    const params = useParams()
    const [singleTrip, setSingleTrip] = useState("")
    const [weather, setWeather] = useState("")
    const [city,setCity] = useState("")
    const [image,setImage] = useState("")
    const {store,actions} = useContext(Context)
    const [allDescriptions, setAllDescriptions] = useState([]);
    const [description, setDescription] = useState("");

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

    const user_id=localStorage.getItem("userId")
    const userName=store.userName;
    const review_id= params.id;

    useEffect(()=>{
        get_single_trip()
        getCityFromApi()
        fetchComments();                           

    },[])

    useEffect(() => {
        getWeather()
    },[city])

    const map = `https://maps.googleapis.com/maps/api/staticmap?center=${city}&zoom=10&size=300x300&key=${process.env.API_KEY}`

    const get_single_trip = () =>{
        const token = localStorage.getItem('jwt-token');
        if(token) {
        fetch(process.env.BACKEND_URL + 'api/review/' + params.id ,{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
                "Authorization" : "Bearer " + token
			}
		})
		.then(res => res.json())
		.then(data => {
            setSingleTrip(data)
		})
		.catch(err => console.error(err))
    }
    }

    const getCityFromApi = () =>{
        const token = localStorage.getItem('jwt-token');
        if(token) {
        fetch(process.env.BACKEND_URL + 'api/review/' + params.id ,{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
                "Authorization" : "Bearer " + token
			}
		})
		.then(res => res.json())
		.then(data => {
            console.log(data);
            setImage(data.image)
            setCity(data.location)
		})
		.catch(err => console.error(err))
    }
}

    const getWeather = () =>{
		fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=331b322b5b7b3278dc6b42817399e72f&units=metric`, {
			method: "GET",
	
		})
		.then(resp => {
			return resp.json();
		})
		.then(data=> {
			setWeather(data.main.temp);
		})
		.catch(error => {
			console.log(error);
			console.log('Oops something went wrong'+ error);
		})
	}
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



    return(

    <div className="container-fluid mt-5 mb-5" >
			{ singleTrip ? (
            <div id="backgroundSingleTrip">
                <div className="card m-0 border-0 " id="containerSingleTrip">                    
                    <div className="row g-0 h-100">
                        <div className="col-md-3">
                            <img id="singleTripPicture"src={image} className="img-fluid rounded-start h-100" alt="..."/>
                        </div>
                        <div className="col-md-6">
                            <div className="card h-100 border-0 px-3">
                                <h5 className="card-title ms-3 mt-3 mb-4 text-center" id="activityTitle">{singleTrip.title}</h5>
                                    <div className="d-flex flex-row mt-2" id="activityRow">
                                        <p className="card-text ms-2">{singleTrip.id}</p>
                                        <p className="card-text ms-2">{weather} °C</p>   
                                        <p className="card-text ms-2"><i class="fas fa-heart fa-xs me-2"></i>{userName}</p>                                     
                                        <p className="card-text ms-2">{singleTrip.publishing_date}</p>
                                    </div>
                                <p className="card-text ms-2">{singleTrip.type}</p>
                                <p className="card-text ms-2">{singleTrip.location}</p>
                                <p className="card-text ms-2"><i>"{singleTrip.description}"</i></p>
                                <p className="card-text ms-2">{singleTrip.price}</p>
                                <ShareComponent/>
                            </div>
                        </div>
                        <div className="col-md-3 border-0 h-100">
                            <div className="container-fluid h-100">
                                <img className="img-fluid rounded-start" id="mapSingleActivity" src={map}/>
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
            <div>
            </div>
            <div className="container-fluid" id="commentSectionTrip">
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

export default SingleTrip 