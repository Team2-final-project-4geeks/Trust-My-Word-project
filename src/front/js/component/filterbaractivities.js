import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { FaHeart, FaStar, FaSpa} from 'react-icons/fa';
import { MdSurfing, MdGroup, MdFamilyRestroom } from 'react-icons/md';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import "../../styles/filterbaractivities.css";

const FilterBarActivities = () => {
    const [query, setQuery] = useState("");
    //const [selectedType, setSelectedType] = useState("");
    const {store, actions} = useContext(Context);
    useEffect(()=>{
        actions.addQuery(query)        
    }, [query])
    
    const handleFilterClick = (filterType) => {
        if (filterType === "all") {
            actions.setSelectedType(""); // Set selected filter to "all" without applying type filtering
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
            <div className="d-flex flex-row justify-content-around">
                <div className="iconsPointer">
                    <button onClick={() => handleFilterClick("all")} className={store.selectedType === "all" ? "selected" : ""} id="iconAll"><FaStar className="reactIcon" /> All results </button>
                </div>
                <div className="iconsPointer">
                    <button onClick={() => handleFilterClick("family")} className={store.selectedType === "family" ? "selected" : ""}id="iconFamily"><MdFamilyRestroom className="reactIcon"/> family </button>
                </div>
                <div className="iconsPointer">
                    <button onClick={() => handleFilterClick("adventure")} className={store.selectedType === "adventure" ? "selected" : ""}id="iconAdventure"> <MdSurfing className="reactIcon" /> adventure </button>
                </div>
                <div className="iconsPointer">
                    <button onClick={() => handleFilterClick("romantic")} className={store.selectedType === "romantic" ? "selected" : ""} id="iconRomantic"> <FaHeart className="reactIcon" /> romantic </button>
                </div>
                <div className="iconsPointer">
                    <button onClick={() => handleFilterClick("group")} className={store.selectedType === "group" ? "selected" : ""} id="iconGroup"> <MdGroup className="reactIcon" /> group </button>
                </div>
                <div className="iconsPointer">
                    <button onClick={() => handleFilterClick("relax")} className={store.selectedType === "relax" ? "selected" : ""} id="iconRelax"> <FaSpa className="reactIcon" /> relax </button>
                </div>
                <div className="iconsPointer">
                    <button onClick={() => handleFilterClick("other")} className={store.selectedType === "other" ? "selected" : ""} id="iconOther"> <GiPerspectiveDiceSixFacesRandom className="reactIcon" /> other </button> 
                </div>
            </div>
        </div>
    )
}
export default FilterBarActivities;