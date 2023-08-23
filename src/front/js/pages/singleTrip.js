import React, { useContext, useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/singletrip.css";
import ShareComponent from "../component/shareComponent.js";
import { Context } from "../store/appContext";

const SingleTrip = () =>{
    const params = useParams()
    const [singleTrip, setSingleTrip] = useState("")
    const [weather, setWeather] = useState("")
    const [city,setCity] = useState("")
    const [image,setImage] = useState("")
    const {store,actions} = useContext(Context)

    useEffect(()=>{
        get_single_trip()
        getCityFromApi()
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

export default SingleTrip 