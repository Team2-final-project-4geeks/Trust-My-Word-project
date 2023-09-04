import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { FaStar} from 'react-icons/fa';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import { GrRestaurant } from 'react-icons/gr';
import { BiBeer } from 'react-icons/bi';
import { LiaCocktailSolid } from 'react-icons/lia';
import "../../styles/filterbartrips.css";

const FilterBarTrips = () => {
    const [query, setQuery] = useState("");
    const {store, actions} = useContext(Context);
    useEffect(()=>{
        actions.addQuery(query)        
    }, [query])
    
    const handleFilterClick = (filterType) => {
        if (filterType === "all") {
            actions.setSelectedType("");
        } else {
            actions.setSelectedType(filterType);
        }
    }
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
            <div className="d-flex flex-row justify-content-around " id="filterTripsBtnGroup">
                <div className="iconsPointer">
                    <button onClick={() => handleFilterClick("all")} className={store.selectedType === "all" ? "selected" : ""} id="iconAll"><FaStar className="reactIcon" /> All results </button>
                </div>
                <div className="iconsPointer">
                    <button onClick={() => handleFilterClick("pub")} className={store.selectedType === "pub" ? "selected" : ""}id="iconFamily"><BiBeer className="reactIcon"/> Pub </button>
                </div>
                <div className="iconsPointer">
                    <button onClick={() => handleFilterClick("restaurant")} className={store.selectedType === "restaurant" ? "selected" : ""}id="iconAdventure"> <GrRestaurant className="reactIcon" /> Restaurant </button>
                </div>
                <div className="iconsPointer">
                    <button onClick={() => handleFilterClick("cocktail")} className={store.selectedType === "cocktail" ? "selected" : ""} id="iconRomantic"> <LiaCocktailSolid className="reactIcon" /> Cocktail Bar </button>
                </div>
                <div className="iconsPointer">
                    <button onClick={() => handleFilterClick("other")} className={store.selectedType === "other" ? "selected" : ""} id="iconOther"> <GiPerspectiveDiceSixFacesRandom className="reactIcon" /> other </button> 
                </div>
            </div>
        </div>
    )
}
export default FilterBarTrips;