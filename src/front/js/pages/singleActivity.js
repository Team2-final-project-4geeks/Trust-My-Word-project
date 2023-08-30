import React, {useEffect, useState, useContext} from "react";
import { useParams } from "react-router-dom";
import ShareComponent from "../component/shareComponent.js";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
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
    const responsive = {        
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
          },
          desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
          },
          tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3
          },
          mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
          }
      };

    const params = useParams();
    const {store, actions} = useContext(Context);

    const user_id=localStorage.getItem("userId")
    const image= localStorage.getItem("image")
    const author=localStorage.getItem("username")
    const review_id= params.id;
    const userName=store.userName;
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;


    const map = `https://maps.googleapis.com/maps/api/staticmap?center=${city}&zoom=10&size=350x350&key=${process.env.API_KEY}`

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
            console.log(data);
            setActivity(data);
            setCity(data.location);                        
        })
        .catch(err => console.log(err))        
        } else {       
            console.log("error")
        }}

    const fetchTemp = () => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&limit=1&appid=331b322b5b7b3278dc6b42817399e72f&units=metric`,{
                method: "GET"                
        })
        .then(res => res.json())
        .then(data => {                
            setWeather(data.main.temp);                
        })
        .catch(err => console.log(err))
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
        console.log(data);            
        })
        .catch(err => console.log(err))
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
        .catch(err => console.log(err))
        } else {       
            console.log(error)
            }
    }

    const showComments = () =>{
        return allDescriptions.map((comment, index) => {
            return(
                <CarouselCard key={index} id={comment.id} description={comment.description} author={comment.author} image={comment.testImage} fetchComments={fetchComments} date={comment.date}/>                      
            )
        }			
    )}

    return(
        <div className="container-fluid mt-5 mb-5" >
			{ activity ? (
            <div id="backgroundSingleActivity">
                <div className="card m-0 border-0 " id="containerSingle">                    
                    <div className="row g-0 h-100">
                        <div className="col-md-3">
                            <img id="singleActivityPicture"src="https://clubhipicoelpinar.es/wp-content/uploads/2016/05/IMG_8542-1024x683.jpg" className="img-fluid rounded-start h-100" alt="..."/>
                        </div>
                        <div className="col-md-6">
                            <div className="card h-100 border-0 px-3">
                                <h5 className="card-title fs-3 ms-3 mt-4 mb-5 text-center">{activity.title}</h5>                                
                                    <div className="d-flex flex-row mt-2" id="singleRow1">
                                        <p className="card-text ms-2"><i class="fas fa-heart fa-xs me-2"></i>{userName}</p>
                                        <p className="card-text text-center ms-2"><i class="fas fa-info-circle fa-sm me-2"></i>{activity.type} activity</p>
                                        <p className="card-text ms-2"><i class="fas fa-calendar-alt fa-sm me-2"></i>{activity.publishing_date}</p>   
                                    </div>
                                <p className="card-text ms-2 my-2"><i>" {activity.description} " </i></p>
                                    <div className="d-flex flex-row mt-3" id="singleRow2">                                        
                                        <p className="card-text ms-2 mb-0"><i class="fas fa-money-bill-wave me-2"></i>{activity.price}</p>
                                        <p className="card-text ms-2"><i class="fas fa-thermometer-half fa-sm me-2"></i>{weather}</p>
                                        <p className="card-text ms-2 pe-3"><i class="fas fa-map-marker-alt fa-sm me-2"></i>{activity.location}</p> 
                                    </div>                                             
                                <div className="d-flex flex-row ms-4 mt-2 position-absolute bottom-0 pb-4" id="activityRow">
                                    <a href={activity.link} target="_blank" rel="noopener noreferrer" className="card-text ms-3 me-5 text-center">{activity.link}</a>
                                    <ShareComponent />
                                </div>                                                            
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
            <div className="container-fluid" id="commentSection">
                <h4 className="my-5 ms-4">Comments</h4>
                <div className="container-fluid">
                    <Carousel showDots={true} arrows={false} responsive={responsive} >
                        {showComments()}
                    </Carousel>
                </div>               
                <div className="input-group mt-5 mx-auto" id="comment">
                    <span className="input-group-text rounded me-2" id="commentWrite">Write your comment:</span>
                    <textarea className="form-control" id="commentBox" value={description} onChange={(e)=> setDescription(e.target.value)} aria-label="With textarea"></textarea>
                </div>
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

    )
}

export default SingleActivity