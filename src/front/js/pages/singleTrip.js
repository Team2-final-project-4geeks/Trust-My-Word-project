import React, { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/singletrip.css";




const SingleTrip = (props) =>{
    const params = useParams()
    const [singleTrip, setSingleTrip] = useState("")
    const [weather, setWeather] = useState("")
    const [city,setCity] = useState("")

    useEffect(()=>{
        get_single_trip()
        getCityFromApi()
    },[])

    useEffect(() => {
        getWeather()
    },[city])

    const map = `https://maps.googleapis.com/maps/api/staticmap?center=${city}&zoom=10&size=300x300&key=${process.env.API_KEY}`

    const get_single_trip = () =>{
        fetch('https://edijavier99-shiny-space-goggles-jjgrjrpvj43j5r7-3001.app.github.dev/api/review/' + params.id ,{
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(res => res.json())
		.then(data => {
            setSingleTrip(data)
		})
		.catch(err => console.error(err))	
    }

    const getCityFromApi = () =>{
        fetch('https://edijavier99-shiny-space-goggles-jjgrjrpvj43j5r7-3001.app.github.dev/api/review/' + params.id ,{
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(res => res.json())
		.then(data => {
            setCity(data.location)
		})
		.catch(err => console.error(err))
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
    //     <div className="container-fluid">
    //    {singleTrip.price} <br/>
    //    {weather} grados
    //             <div class="card mb-3" id="containerSingle">
    //             <div class="row h-100 g-0">
    //                 <div class="col-md-4">
    //                 <img className="" src="https://cdn.pixabay.com/photo/2017/07/31/11/44/laptop-2557572_1280.jpg"/>
    //                 </div>
    //                 <div class="col-md-8">
    //                 <div class="card-body h-100">
    //                     <h5 class="card-title">{singleTrip.title}</h5>
    //                     <p class="card-text">{singleTrip.description}</p>
    //                     <p class="card-text"><small class="text-muted">{singleTrip.publishing_date}</small></p>
    //                 </div>
    //                 </div>
    //             </div>
    //         </div>
    //         <div className="container-fluid">
    //                     <img className="rounded mx-auto d-block" src={map} id="map"/>
    //         </div>
    //     </div>

    <div className="container-fluid" >
            { singleTrip ? (
                <div className="card mb-3" id="containerSingle">
                    <div className="row g-0 h-100">
                        <div className="col-md-5">
                            <img src="https://clubhipicoelpinar.es/wp-content/uploads/2016/05/IMG_8542-1024x683.jpg" className="img-fluid rounded-start h-100" alt="..."/>
                        </div>
                        <div className="col-md-7">
                        <div className="card-body h-100">
                            <h5 className="card-title">{singleTrip.title}</h5>
                            <p className="card-text">{singleTrip.id}</p>
                            <p className="card-text"> Current weather: {weather}</p>
                            <p className="card-text">{singleTrip.location}</p>
                            <p className="card-text">{singleTrip.description}</p>
                            <p className="card-text">{singleTrip.price}</p>
                            <p className="card-text"><small className="text-muted">{singleTrip.publishing_date}</small></p>
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
                <img className="rounded mx-auto d-block" src={map} id="map"/>
            </div>
        </div>
    )
}

export default SingleTrip 