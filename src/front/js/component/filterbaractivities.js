import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { FaHeart, FaStar, FaSpa} from 'react-icons/fa';
import { MdSurfing, MdGroup, MdFamilyRestroom } from 'react-icons/md';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import "../../styles/filterbaractivities.css";

const FilterBarActivities = () => {
    const [query, setQuery] = useState("");    
    const {store, actions} = useContext(Context);
    
    useEffect(()=>{
        actions.addQuery(query)        
    }, [query])
    
    const handleFilterClick = (filterType) => {
        if (filterType === "all") {
            actions.setSelectedType(""); // Set selectedeeeee filter to "all" without applying type filtering
        } else {
            actions.setSelectedType(filterType);
        }
    }
    return(
        <div className="container-fluid"> 
            <div className="d-flex flex-row justify-content-center"id="inputGroup">
                <div className="col-sm-10 col-md-6 my-3">
                    <div className="input-group mb-3" >                        
                        <input
                        type="text"
                        onChange={(e)=>setQuery(e.target.value) } 
                        id="inputSearch"
                        className="form-control rounded-pill me-2" 
                        placeholder="Type in a city..." 
                        aria-label="city" 
                        aria-describedby="basic-addon1"/>                        
                    </div>
                </div>
            </div>

            <div className="d-flex flex-wrap justify-content-around">
                <div className="iconsPointer">
                    <button onClick={() => handleFilterClick("all")} className={store.selectedType === "all" ? "selected" : ""} id="iconAll"><FaStar className="reactIcon" /><span className="d-none d-sm-block">All results</span></button>
                </div>
                <div className="iconsPointer">
                    <button onClick={() => handleFilterClick("family")} className={store.selectedType === "family" ? "selected" : ""}id="iconFamily"><MdFamilyRestroom className="reactIcon"/><span className="d-none d-sm-block">family</span></button>
                </div>
                <div className="iconsPointer">
                    <button onClick={() => handleFilterClick("adventure")} className={store.selectedType === "adventure" ? "selected" : ""}id="iconAdventure"> <MdSurfing className="reactIcon" /><span className="d-none d-sm-block">adventure</span></button>
                </div>
                <div className="iconsPointer">
                    <button onClick={() => handleFilterClick("romantic")} className={store.selectedType === "romantic" ? "selected" : ""} id="iconRomantic"> <FaHeart className="reactIcon" /><span className="d-none d-sm-block">romantic</span></button>
                </div>
                <div className="iconsPointer">
                    <button onClick={() => handleFilterClick("group")} className={store.selectedType === "group" ? "selected" : ""} id="iconGroup"> <MdGroup className="reactIcon" /> <span className="d-none d-sm-block">group</span></button>
                </div>
                <div className="iconsPointer">
                    <button onClick={() => handleFilterClick("relax")} className={store.selectedType === "relax" ? "selected" : ""} id="iconRelax"> <FaSpa className="reactIcon" /><span className="d-none d-sm-block">relax</span></button>
                </div>
                <div className="iconsPointer">
                    <button onClick={() => handleFilterClick("other")} className={store.selectedType === "other" ? "selected" : ""} id="iconOther"> <GiPerspectiveDiceSixFacesRandom className="reactIcon" /><span className="d-none d-sm-block">other</span></button> 
                </div>
            </div>
        </div>
    )
}
export default FilterBarActivities;