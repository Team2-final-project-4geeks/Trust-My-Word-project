import React, {useEffect, useState, useContext} from "react";
import { useParams } from "react-router-dom";
import ShareComponent from "../component/shareComponent.js";
import Swal from 'sweetalert2';
import CarouselCard from "../component/carouselcard.js";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../styles/singleactivity.css";

const SingleActivity = () => {
    
    const [activity, setActivity] = useState();
    const [city, setCity] = useState();
    const [weather,setWeather] = useState();
    const [allDescriptions, setAllDescriptions] = useState([]);
    const [description, setDescription] = useState("");
    const [date,setDate]= useState("");
    const params = useParams();
    const user_id=localStorage.getItem("userId")    
    const author=localStorage.getItem("username")
    const review_id= params.id;    
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    const responsive = {        
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1025 },
            items: 4
          },
          desktop: {
            breakpoint: { max: 1024, min: 769 },
            items: 3,
          },
          tablet: {
            breakpoint: { max: 768, min: 481 },
            items: 2
          },
          mobile: {
            breakpoint: { max: 480, min: 0 },
            items: 1
          }
      };

    const map = `https://maps.googleapis.com/maps/api/staticmap?center=${city}&zoom=10&size=400x400&key=${process.env.API_KEY}`

    useEffect(() => {
        fetchSingleActivity();
        fetchComments();
    }, []);

    useEffect(() => {
        fetchTemp();
    }, [city]);


    const fetchSingleActivity = () => {
        const token = localStorage.getItem('jwt-token');
        if(token) {
        fetch(process.env.BACKEND_URL + 'api/review/' + params.id,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : "Bearer " + token
            } 
        })
        .then(resp=> {            
            return resp.json();
        })
        .then(data=>{
            setActivity(data);
            setCity(data.location);                        
        })
        .catch(err => console.log('single activity'+ err))        
        } else {       
            console.log("fetch single activity error")
        }}

    const fetchTemp = () => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&limit=1&appid=331b322b5b7b3278dc6b42817399e72f&units=metric`,{
                method: "GET"                
        })
        .then(res => res.json())
        .then(data => {                
            setWeather(data.main.temp);                
        })
        .catch(err => console.log('temp'+ err))
    } 

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
            // Show an alert to the user
            Swal.fire({
                title: 'Oops!',
                text: 'You cannot post a comment without text',
                imageUrl: 'https://cdn.pixabay.com/photo/2015/08/05/15/04/mistake-876597_1280.jpg',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
              })
            return; // Do not proceed with creating the comment
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
            
            if (data.description) {
                setDescription(data.description);
                setDate(data.date);
                Swal.fire(
                  'Good job!',
                  'You POSTed a comment!',
                  'success'
                );
                setDescription('');
                fetchComments();
              } else {
                // Handle the 400 Bad Request response data here
                console.log('Error in request:', data.msg);
                // You can display an error message to the user if needed
                Swal.fire({
                    icon : 'error',
                    text :'Sorrt,but your comment was not appropriate!',
                    title : 'Comment BLOCKED',
                    footer : ''}
                  );
                  setDescription('');
              }         

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
    

    return(
        <div className="container mt-5 mb-5 border-0" >
            <div className="row">
			    { activity ? (                            
                    <div className="card m-0 border-0 mx-auto p-0" id="containerSingle">                    
                        <div className="row g-0 h-100 w-100">
                            <div className="col-sm-12 col-md-3" id="imageContainer">
                                <img id="singleActivityPicture"src={activity.image} className="rounded-start h-100 w-100 col-sm-12" alt="picture chosen by the user"/>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <div className="card h-100 border-0 px-3" id="activityCard">
                                    <h4 className="card-title fs-3 ms-3 mt-5 mb-4 text-center">{activity.title}</h4>                                
                                        <div className="d-flex flex-row mt-2 justify-content-center" id="singleRow1">
                                            <p className="col-sm-3 card-text ms-2"><i class="fas fa-heart fa-xs me-2"></i>{activity.reviewOwner}</p>
                                            <p className="col-sm-4 card-text text-center ms-2"><i class="fas fa-info-circle fa-sm me-2"></i>{activity.type} activity</p>
                                            <p className="col-sm-4 card-text text-center ms-2"><i class="fas fa-calendar-alt fa-sm me-2"></i>{activity.publishing_date}</p>   
                                        </div>
                                    <div className="row">
                                        <p className="col-sm-12 card-text ms-2 my-2"><i>" {activity.description} " </i></p>
                                    </div>
                                        <div className="d-flex flex-row mt-3 justify-content-center" id="singleRow2">                                        
                                            <p className="col-sm-3 card-text ms-2"><i class="fas fa-money-bill-wave me-2"></i>{activity.price}</p>
                                            <p className="col-sm-4 card-text ms-2 text-center"><i class="fas fa-thermometer-half fa-sm me-2"></i>{weather}</p>
                                            <p className="col-sm-4 card-text ms-2 text-center"><i class="fas fa-map-marker-alt fa-sm me-2"></i>{activity.location}</p> 
                                        </div>                                             
                                    <div className="card-text mt-1 bottom-0 pb-5" id="activityRow">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <a
                                                href={activity.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="card-link ms-2 me-3 pb-3 d-flex justify-content-center"
                                                >
                                                    <small className="text-center w-100">{activity.link}</small>
                                                </a>
                                            </div>
                                            <div className="col-sm-12">
                                                <ShareComponent />
                                            </div>
                                        </div>
                                    </div>                                                            
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-3 border-0">
                                <div className="container-fluid h-100">
                                    <img className="img-fluid rounded-start" id="mapSingleActivity" src={map}/>
                                </div>
                            </div>                        
                        </div>                    
                    </div>                
                ):(
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                )}
            </div>

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

export default SingleActivity;