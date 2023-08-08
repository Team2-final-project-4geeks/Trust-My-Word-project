import React, { useEffect, useState } from "react";
import { FaPencilAlt } from 'react-icons/fa';
import { useParams } from "react-router-dom";

const ModifyReview = () => {
    const [review,setReview] = useState("")
    const [title,setTitle] = useState("")
    const params = useParams()

    const getSingleReview = () =>{
		fetch(process.env.BACKEND_URL + 'api/review/' + params.id, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(resp => {
			return resp.json();
		})
		.then(data=> {
            setReview(data)
			console.log(data);
		})
		.catch(error => {
			console.log('Oops something went wrong'+ error);
		})
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
                    <input type="text" className="form-control" value={review.title}  onChange={(e)=> setTitle(e.target.value) } aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                    
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default"> Type </span>
                    <span className="input-group-text"><FaPencilAlt size={20} color="grey" id="pencil"/></span>
                    <input type="text" readonly className="form-control" value={review.type}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default"> Location </span>
                    <span className="input-group-text"><FaPencilAlt size={20} color="grey" id="pencil"/></span>
                    <input type="text" readonly className="form-control" value={review.location}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default"> Publishing Date </span>
                    <span className="input-group-text"><FaPencilAlt size={20} color="grey" id="pencil"/></span>
                    <input type="text" readonly className="form-control" value={review.publishing_date}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default"> Price </span>
                    <span className="input-group-text"><FaPencilAlt size={20} color="grey" id="pencil"/></span>
                    <input type="text" className="form-control" value={review.price}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default"> Description </span>
                    <span className="input-group-text"><FaPencilAlt size={20} color="grey" id="pencil"/></span>
                    <input type="text" className="form-control" value={review.description}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default"> Link </span>
                    <span className="input-group-text"><FaPencilAlt size={20} color="grey" id="pencil"/></span>
                    <input type="text" readonly className="form-control"  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>
            </div>
      </div>

    )
}

export default ModifyReview