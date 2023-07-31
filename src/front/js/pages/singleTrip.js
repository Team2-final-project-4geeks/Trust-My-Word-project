import React, { useEffect,useState } from "react";
import { useParams } from "react-router-dom";

const SingleTrip = (props) =>{
    const params = useParams()
    const [singleTrip, setSingleTrip] = useState("")

    const get_single_trip = () =>{
        fetch('https://edijavier99-studious-computing-machine-69vwpj9wqr9crvr7-3001.preview.app.github.dev/api/review/' + params.id ,{
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

    useEffect(()=>{
        get_single_trip()
        console.log("singoleeeee");
    },[])
    return(
        <div>
       {singleTrip.price}
        </div>
    )
}

export default SingleTrip 