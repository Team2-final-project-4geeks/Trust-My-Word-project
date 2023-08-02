import React, {useState, useEffect} from "react";
const Activities = () =>{
    const [activities, setActivities] = useState([]);
    useEffect(() => {
        getActivities();
    }, []);
    const getActivities = () => {
        fetch('https://friendly-memory-pv77w5gwp6x299j6-3001.preview.app.github.dev/api/review',{
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => {
            console.log(resp);                  
            return resp.json();
        })
        .then(data=> {
            console.log(data);
            setActivities(data);
        })
        .catch(error => {
            console.log(error);
            console.log('Oops something went wrong'+ error);
        })
    }
    const showActivity = () =>{
        return activities.map((activity, index) =>{
            return(
                <li key={index} className= "col">
                    <div className="col">
                        <div className="card">
                        <img src="..." className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{activity.title}</h5>
                            <p className="card-text">{activity.author_name}</p>
                            <p className="card-text">{activity.description}</p>                            
                            <p className="card-text">{activity.link}</p>
                            <p className="card-text">{activity.publishing_date}</p>
                            
                        </div>
                        </div>
                    </div>
                </li>
            )
        })
    }
    return (
        <div className="row row-cols-1 row-cols-md-2 g-4">     
            {showActivity()}
        </div>
    )
}
export default Activities