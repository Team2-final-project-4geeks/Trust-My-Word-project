import React, { useEffect, useState } from "react";
import { FaPencilAlt } from 'react-icons/fa';
import { useParams } from "react-router-dom";

const ModifyReview = () => {


    const [review,setReview] = useState("")
    const [title,setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [publishing_date,setPublishing_date] = useState("")
    const [price, setPrice] = useState("")
    const [location,setLocation]= useState("")
    const [type,setType] = useState("")
    const [link,setLink] = useState("")

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
            setReview(data)
            setTitle(data.title)
            setDescription(data.description)
            setPublishing_date(data.publishing_date)
            setPrice(data.price)
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
            body: JSON.stringify({title, description, publishing_date, price ,location,link,type }) 
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
        <div className="container-fluid">            
            <div classname="reviewsSection mt-5">
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default"> Title </span>
                    <span className="input-group-text"><FaPencilAlt size={20} color="grey" id="pencil"/></span>
                    <input type="text" className="form-control" value={title}  onChange={(e)=> setTitle(e.target.value) } aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                    
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default"> Type </span>
                    <span className="input-group-text"><FaPencilAlt size={20} color="grey" id="pencil"/></span>
                    <input type="text" readonly className="form-control" value={type}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default"> Location </span>
                    <span className="input-group-text"><FaPencilAlt size={20} color="grey" id="pencil"/></span>
                    <input type="text" readonly className="form-control" value={location}   aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default"> Publishing Date </span>
                    <span className="input-group-text"><FaPencilAlt size={20} color="grey" id="pencil"/></span>
                    <input type="text" readonly className="form-control" value={publishing_date} onChange={(e)=> setPublishing_date(e.target.value) }  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default"> Price </span>
                    <span className="input-group-text"><FaPencilAlt size={20} color="grey" id="pencil"/></span>
                    <input type="text" className="form-control" value={price}  onChange={(e)=> setPrice(e.target.value) }  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default"> Description </span>
                    <span className="input-group-text"><FaPencilAlt size={20} color="grey" id="pencil"/></span>
                    <input type="text" className="form-control" value={description}   onChange={(e)=> setDescription(e.target.value) } aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default"> Link </span>
                    <span className="input-group-text"><FaPencilAlt size={20} color="grey" id="pencil"/></span>
                    <input type="text" readonly className="form-control"  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>
            </div>
            <div className="text-center">
            <button className="btn btn-warning mx-3 my-4"  onClick={updateReview}>submit</button>
            </div>
      </div>

    )
}

export default ModifyReview