import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import "../../styles/singleactivity.css";

const SingleActivity = () => {
    const [activity, setActivity] = useState();
    const [city, setCity] = useState([]);
    const [weather,setWeather] = useState();
    const params = useParams();
    const map = `https://maps.googleapis.com/maps/api/staticmap?center=${city}&zoom=10&size=350x350&key=${process.env.API_KEY}`

    useEffect(() => {
        fetchSingleActivity();               
    }, [])

    useEffect(() => {
        fetchTemp();
    }, [city])

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
                                <h5 className="card-title ms-3 mt-3 mb-4 text-center" id="activityTitle">{activity.title}</h5>
                                    <div className="d-flex flex-row mt-2" id="activityRow">
                                        <p className="card-text ms-2">{activity.id}</p>
                                        <p className="card-text ms-2">{weather} °C</p>                                        
                                        <p className="card-text ms-2">{activity.publishing_date}</p>
                                    </div>
                                <p className="card-text ms-2">{activity.type} activity</p>
                                <p className="card-text ms-2">{activity.location}</p>
                                <p className="card-text ms-2"><i>"{activity.description}"</i></p>
                                <p className="card-text ms-2">{activity.price}</p>
                                <p className="card-text ms-2"><i>{activity.link}</i></p>                               
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
            <div className="container-fluid">
                <h4 className="my-5">Comments</h4>
                <div class="input-group mb-3">                    
                    <span class="input-group-text" id="basic-addon1">Username</span>
                    <input type="text" class="form-control" placeholder="Lorem Ipsum" aria-label="Username" aria-describedby="basic-addon1"/> 
                </div>
                <div class="input-group mb-3">                    
                    <span class="input-group-text" id="basic-addon1">Username</span>
                    <input type="text" class="form-control" placeholder="Lorem Ipsum Xmas Banana Happy" aria-label="Username" aria-describedby="basic-addon1"/> 
                </div>
                <div class="input-group mb-3">                    
                    <span class="input-group-text" id="basic-addon1">Username</span>
                    <input type="text" class="form-control" placeholder="Lorem Summer Coding Sad" aria-label="Username" aria-describedby="basic-addon1"/> 
                </div>
                <div class="input-group">
                    <span class="input-group-text">Write your comment:</span>
                    <textarea class="form-control" aria-label="With textarea"></textarea>
                </div>
                <button type="button" className="btn btn-dark mt-5" id="sumbitButtonSingle"> Send </button>                
            </div>            
        </div>

    )
}

export default SingleActivity
