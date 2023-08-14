import React, {useEffect, useState, useContext} from "react";
import { useParams } from "react-router-dom";
import "../../styles/singleactivity.css";
import ShareComponent from "../component/shareComponent.js";
import { Context } from "../store/appContext";
import Swal from 'sweetalert2'

const SingleActivity = () => {

    const [activity, setActivity] = useState();
    const [city, setCity] = useState([]);
    const [weather,setWeather] = useState();
    const [allDescriptions, setAllDescriptions] = useState([]);
    const [description, setDescription] = useState("");
    const [author, setAuthor]= useState();    
    const params = useParams();
    const {store, actions} = useContext(Context);
    const user_id=store.userId;
    const userName=store.userName;
    const review_id= params.id;
    const map = `https://maps.googleapis.com/maps/api/staticmap?center=${city}&zoom=10&size=350x350&key=${process.env.API_KEY}`

    useEffect(() => {
        fetchSingleActivity();
        fetchComments();                     
    }, []);

    useEffect(() => {
        fetchTemp();
    }, [city]);


    const fetchSingleActivity = () => {
        fetch(process.env.BACKEND_URL + 'api/review/' + params.id,{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            } 
        })
        .then(resp=> {            
            return resp.json();
        })
        .then(data=>{
            setActivity(data);
            setCity(data.location)
            console.log(data.location);            
        })
        .catch(err => console.error(err))
    }

    const fetchTemp = () => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&limit=1&appid=331b322b5b7b3278dc6b42817399e72f&units=metric`,{
                method: "GET"                
            })
            .then(res => res.json())
            .then(data => {                
                setWeather(data.main.temp);
                console.log(data.main.temp);
            })
            .catch(err => console.error(err))
    }

    const fetchComments =() =>{
        fetch(process.env.BACKEND_URL + 'api/comments',{
			method: 'GET',
      		headers: {
				"Content-Type": "application/json"
			}
		})
     	.then(resp => {								
			return resp.json();
		})
		.then(data=> {		
            console.log(data)
            console.log(data.user_id)	
			setAllDescriptions(data);
            setAuthor(data.user_id);
		})
		.catch(error => {			
			console.log('Oops something went wrong'+ error);
		})
    }
    
    const createComment = () => {        
        fetch(process.env.BACKEND_URL + 'api/create-comment', {
          method: "POST",          
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({description, user_id, review_id}) 
        })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            console.log("Estoooy aquiiiiiiiiiiii");
            setDescription(data.description);
            Swal.fire(
                'Good job!',
                'You POSTed a comment!',
                'success'
            )
            setDescription("")
            fetchComments();            
        })
        .catch((error) => {
        console.error(error);
        });
    }

    const showComments = () =>{
        console.log(allDescriptions)
        return allDescriptions.map((comment, index) => {
            return(         
                <li key={index}>   
                    <div className="input-group mb-5">                    
                        <span className="input-group-text rounded me-2" id="basic-addon1">Author</span>
                        <input type="text" className="form-control rounded-pill" placeholder={comment.description} aria-label="Username" aria-describedby="basic-addon1"/> 
                    </div>
                </li>           
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
                                <h5 className="card-title fs-3 ms-3 mt-3 mb-4 text-center">{activity.title}</h5>                                
                                    <div className="d-flex flex-row mt-2" id="singleRow1">
                                        <p className="card-text ms-2"><i class="fas fa-heart fa-xs me-2"></i>{userName}</p>
                                        <p className="card-text text-center ms-2"><i class="fas fa-info-circle fa-sm me-2"></i>{activity.type} activity</p>
                                        <p className="card-text ms-2"><i class="fas fa-calendar-alt fa-sm me-2"></i>{activity.publishing_date}</p>   
                                    </div>
                                <p className="card-text ms-2"><i>" {activity.description} " </i></p>
                                    <div className="d-flex flex-row mt-2" id="singleRow2">                                        
                                        <p className="card-text ms-2 mb-0"><i class="fas fa-money-bill-wave me-2"></i>{activity.price}</p>
                                        <p className="card-text ms-2"><i class="fas fa-thermometer-half fa-sm me-2"></i>{weather}</p>
                                        <p className="card-text ms-2"><i class="fas fa-map-marker-alt fa-sm me-2"></i>{activity.location}</p> 
                                    </div>                                             
                                <div className="d-flex flex-row mt-4 position-absolute bottom-0" id="activityRow2">
                                    <p className="card-text ms-2 text-center"><i className="fas fa-pager fa-sm me-2"></i>{activity.link}</p>
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
                <h4 className="my-5">Comments</h4>
                <div>                             
                   {showComments()}
                </div>               
                <div className="input-group">
                    <span className="input-group-text rounded me-2" id="commentWrite">Write your comment:</span>
                    <textarea className="form-control rounded-pill" value={description} onChange={(e)=> setDescription(e.target.value)} aria-label="With textarea"></textarea>
                </div>
                <button 
                    type="button" className="btn btn-dark mt-5" 
                    onClick={createComment}
                    id="sumbitButtonSingle"> Send </button>                
            </div> 
            
        </div>

    )
}

export default SingleActivity