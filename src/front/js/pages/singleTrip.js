import React, { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/singletrip.css";




const SingleTrip = (props) =>{
    const params = useParams()
    const [singleTrip, setSingleTrip] = useState("")
    const [weather, setWeather] = useState("")
    const location = "Bilbao"

    const get_single_trip = () =>{
        fetch('https://edijavier99-shiny-space-goggles-jjgrjrpvj43j5r7-3001.preview.app.github.dev/api/review/' + params.id ,{
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(res => res.json())
		.then(data => {
            console.log(data);
            setSingleTrip(data)
		})
		.catch(err => console.error(err))	
    }

    const getWeather = () =>{
		fetch('https://api.openweathermap.org/data/2.5/weather?q=bilbao&appid=331b322b5b7b3278dc6b42817399e72f&units=metric', {
			method: "GET",
	
		})
		.then(resp => {
			console.log(resp);					
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
  

    useEffect(()=>{
        get_single_trip()
        getWeather()
        console.log(process.env.API_KEY)
    },[])
    return(
        <div className="container-fluid">
       {singleTrip.price} <br/>
       {weather} grados
                <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4 img-container">
                    <img src="" class="img-fluid img" alt="..."/>
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{singleTrip.title}</h5>
                        <p class="card-text">{singleTrip.description}</p>
                        <p class="card-text"><small class="text-muted">{singleTrip.publishing_date}</small></p>

                    </div>
                    <div>
                        
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleTrip 