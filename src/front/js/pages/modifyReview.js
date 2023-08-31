import React, { useEffect, useState } from "react";
import { FaPencilAlt } from 'react-icons/fa';
import { useParams } from "react-router-dom";
import "../../styles/modifyreview.css";


const ModifyReview = () => {
    const [title,setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [publishing_date,setPublishing_date] = useState("")
    const [price, setPrice] = useState("")
    const [location,setLocation]= useState("")
    const [type,setType] = useState("")
    const [link,setLink] = useState("")
    const [imageCloud,setImageCloud] = useState("")
    const [rating,setRating] = useState("")
    const [latitude,setLatitude] = useState("")
    const [longitude,setLongitude] = useState("")
     

    const params = useParams()

    const getSingleReview = () =>{
        const token = localStorage.getItem('jwt-token');
		if(token) {
		fetch(process.env.BACKEND_URL + 'api/review/' + params.id, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
                "Authorization" : "Bearer " + token
			}
		})
		.then(resp => {
			return resp.json();
		})
		.then(data=> {
            console.log(data);
            setLocation(data.location)
            setTitle(data.title)
            setDescription(data.description)
            setPublishing_date(data.publishing_date)
            setPrice(data.price)
            setImageCloud(data.image)
            setRating(data.rating)
            setLatitude(data.latitude)
            setLongitude(data.longitude)
		})
		.catch(error => {
			console.log('Oops something went wrong'+ error);
		})
        }else {
            alert("errror")
        }
	}

        const updateReview = () =>{
            const token = localStorage.getItem('jwt-token');
            if(token) {
            fetch(process.env.BACKEND_URL + 'api/modify-review/' + params.id, {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization" : "Bearer " + token
                },
                body: JSON.stringify({title, description, publishing_date, price ,location,link,type,imageCloud,rating,latitude,longitude}) 
            })
            .then(resp => {
                return resp.json();
            })
            .then(data=> {
                console.log(data);
            })
            .catch(error => {
                console.log('Oops something went wrong'+ error);
            })
            }else {
                alert(' Review is not modified!')
            }
        }

    useEffect(()=>{
        getSingleReview()
    },[])

    return(
        <div className="container-fluid" id="modify-review-container">            
    <div className="row">
        <div className="col-12 col-md-7">
            <h1 className="text-center mb-4">Modify review</h1>
            <div className="reviewsSection mt-5">
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default"> Title </span>
                    <span className="input-group-text"><FaPencilAlt size={20} color="grey" id="pencil"/></span>
                    <input type="text" className="form-control" value={title} onChange={(e)=> setTitle(e.target.value)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default"> Price </span>
                    <span className="input-group-text"><FaPencilAlt size={20} color="grey" id="pencil"/></span>
                    <input type="text" className="form-control" value={price} onChange={(e)=> setPrice(e.target.value)}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default"> Description </span>
                    <span className="input-group-text"><FaPencilAlt size={20} color="grey" id="pencil"/></span>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"
                    />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default"> Link </span>
                    <span className="input-group-text"><FaPencilAlt size={20} color="grey" id="pencil"/></span>
                    <input type="text" readOnly className="form-control"  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                <div className="text-center">
                    <button className="btn btn-warning mx-3 my-4" onClick={updateReview}>Submit</button>
                </div>
            </div>
        </div>
        <div className="col-12 col-md-5 text-center mb-4">
            <div className="modify-review-img-container">
                <img src={imageCloud} alt="review-image" />
            </div>
        </div>
    </div>
</div>
    )
}

export default ModifyReview