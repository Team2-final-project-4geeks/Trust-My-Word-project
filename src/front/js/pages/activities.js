import React, {useState, useEffect, useContext} from "react";
import SideBar from "../component/sidebar.js"
import { Context } from "../store/appContext.js";
import "../../styles/activities.css"

const Activities = () =>{
    const [activities, setActivities] = useState([]);
    const { store, actions } = useContext(Context);
    const city = store.storeCities;
    const checked = store.checked;
    console.log(checked);
    
    
    useEffect(() => {          
        getActivities();
        showActivities();
    }, []);


    const getActivities = () => {
        fetch(process.env.BACKEND_URL + 'api/review?category=activity' ,{
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
    
    const showActivities = () =>{        
        return(
            checked ? 
            (activities.filter(activity => city[activity.location]).map((activity, index) =>{            
                return(                
                    <div className="col">
                        <div className="card h-100">
                            <img src="https://cdn.pixabay.com/photo/2016/11/29/13/08/skateboard-1869727_1280.jpg" className="card-img-top h-100" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">{activity.title}</h5>
                                <p className="card-text">{activity.id}</p>
                                <p className="card-text">{activity.location}</p>
                                <p className="card-text">{activity.publishing_date}</p>                            
                                <p className="card-text">{activity.description}</p>
                                <p className="card-text">{activity.link}</p>
                            </div>
                        </div>
                    </div>
                )
            })):
            (activities.map((activity, index) =>{            
                return(                
                    <div className="col">
                        <div className="card h-100">
                            <img src="https://cdn.pixabay.com/photo/2016/11/29/13/08/skateboard-1869727_1280.jpg" className="card-img-top h-100" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">{activity.title}</h5>
                                <p className="card-text">{activity.id}</p>
                                <p className="card-text">{activity.location}</p>
                                <p className="card-text">{activity.publishing_date}</p>                            
                                <p className="card-text">{activity.description}</p>
                                <p className="card-text">{activity.link}</p>
                            </div>
                        </div>
                    </div>
                )
            }))                
        )        
    }        
    
    return (
        <div className="container-fluid mt-2">
            <SideBar />
            <div className="py-2" >
                <h1 className="font-weight-light ms-5 my-5">ACTIVITIES </h1>
                <p className="mx-5 mb-5">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {activities.length !== 0 ? showActivities() : (
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Activities