import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import "../../styles/singleactivity.css";

const SingleActivity = () => {
    const [activity, setActivity] = useState();
    const [city, setCity] = useState([]);
    const [weather,setWeather] = useState();
    const params = useParams();

    useEffect(() => {
        fetchSingleActivity();        
    }, [])

    useEffect(() => {
        fetchTemp();
    }, [city])

    const fetchSingleActivity = () => {
        fetch('https://friendly-memory-pv77w5gwp6x299j6-3001.preview.app.github.dev/api/review/' + params.id,{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            } 
        })
        .then(resp=> {
            console.log(resp);
            return resp.json();
        })
        .then(data=>{
            setActivity(data);
            setCity(data.location)
            console.log(data.location)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const fetchTemp = () => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&limit=1&appid=331b322b5b7b3278dc6b42817399e72f&units=metric`,{
                method: "GET"                
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setWeather(data.main.temp);
                console.log(data.main.temp)
            })
            .catch(err => console.error(err))
    }

    return(
        <div className="container-fluid">
			{ activity ? (
                <div className="card mb-3">
                    <div className="row g-0 h-100">
                        <div className="col-md-4">
                            <img src="https://clubhipicoelpinar.es/wp-content/uploads/2016/05/IMG_8542-1024x683.jpg" className="img-fluid rounded-start h-100" alt="..."/>
                        </div>
                        <div className="col-md-8">
                        <div className="card-body h-100">
                            <h5 className="card-title">{activity.title}</h5>
                            <p className="card-text">{activity.id}</p>
                            <p className="card-text">{weather}</p>
                            <p className="card-text">{activity.type}</p>
                            <p className="card-text">{activity.location}</p>
                            <p className="card-text">{activity.description}</p>
                            <p className="card-text">{activity.price}</p>
                            <p className="card-text">{activity.link}</p>
                            <p className="card-text"><small className="text-muted">{activity.publishing_date}</small></p>
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
            

    )
}

export default SingleActivity
