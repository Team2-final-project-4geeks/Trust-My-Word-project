import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

const SingleActivity = () => {
    const [activity, setActivity] = useState();
    const params = useParams();

    useEffect(() => {
        fetchSingleActivity();
    })

    const fetchSingleActivity = () => {
        fetch('https://lucymacko-curly-computing-machine-56vvr74rx7jc7jjr-3001.preview.app.github.dev/api/activities/' + params.id,{
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
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    return(
        <div className="container-fluid">
			{ activity ? (
                <div className="card mb-3" style="max-width: 540px;">
                    <div className="row g-0">
                        <div className="col-md-4">
                        <img src="..." className="img-fluid rounded-start" alt="..."/>
                        </div>
                        <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{activity.title}</h5>
                            <p className="card-text">{activity.description}</p>
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
