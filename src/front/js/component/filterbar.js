import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { FaHeart, FaStar} from 'react-icons/fa';
import { MdSurfing, MdGroup, MdFamilyRestroom } from 'react-icons/md';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import "../../styles/filterbar.css";



const FilterBar = () => {
    
    const [query, setQuery] = useState("");
    const {store, actions} = useContext(Context);

    useEffect(()=>{
        actions.addQuery(query)
        console.log(store.activities)
    }, [query])

   

    return(
        <div className="container-fluid"> 
            <div className="d-flex flex-row justify-content-center"id="inputGroup">
                <div className="col-6 my-3">
                    <div className="input-group mb-3" >                        
                        <input 
                        type="text"
                        onChange={(e)=>setQuery(e.target.value) } 
                        id="inputSearch"
                        className="form-control rounded-pill me-2" 
                        placeholder="Where do you want to go?" 
                        aria-label="city" 
                        aria-describedby="basic-addon1"/>                        
                    </div>                    
                </div>
            </div>
            <div className="d-flex flex-row justify-content-around">
                <p> <FaStar size={30} /> All results</p>
                <p> <MdFamilyRestroom size={30} /> family</p>
                <p> <MdSurfing size={30} /> adventure</p>
                <p> <FaHeart size={30} /> romantic</p>
                <p> <MdGroup size={30} /> group</p>
                <p> <GiPerspectiveDiceSixFacesRandom size={30} /> other </p>                  
            </div>          
        </div>
        
    )
}

export default FilterBar;