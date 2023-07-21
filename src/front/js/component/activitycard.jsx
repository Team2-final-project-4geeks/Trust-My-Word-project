import React, {useEffect, useState} from "react"



const ActivityCard = (props) =>{

    const [activity, setActivity] = useState('');	
	

    useEffect(()=>{
		getActivity()
	}, [])

    const getActivity = ()=>{
		fetch('https://lucymacko-fluffy-engine-r97765r66x9h544-3001.preview.app.github.dev/activities/' + props.activity.id, {
			method: 'GET',
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(resp=> {
			console.log(resp.text)
			return resp.json();
		})
		.then(data=>{			
			console.log(data.result)
			setActivity(data.result.properties);
		})
		.catch(error=>{
			console.log(error);
		})
	}

    return(
        <div>
            <div className="card h-100">
                <img src="..." class="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">Happiness in Paradise</h5>
                    <p className="card-text">The first equestrian center of Málaga, has modern facilities built in a privileged area located a few kilometers from the social and cultural life of the city. The Equestrian Club El Pinar is popular for its riding school. It offers classes at all levels with qualified teachers with proven experience both in teaching and in the competition.</p>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                            <div className="star-rating">
                                <span className="fa fa-star-o" data-rating="1"></span>
                                <span className="fa fa-star-o" data-rating="2"></span>
                                <span className="fa fa-star-o" data-rating="3"></span>
                                <span className="fa fa-star-o" data-rating="4"></span>
                                <span className="fa fa-star-o" data-rating="5"></span>
                                <input type="hidden" name="whatever1" className="rating-value" value="2.56"/>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <small className="text-muted">Published: 21/07/2023</small>
                </div>
            </div>
        </div>
    )
}

export default ActivityCard