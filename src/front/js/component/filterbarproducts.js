import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import {FaStar } from 'react-icons/fa';
import { FcElectronics } from 'react-icons/fc';
import { BsSmartwatch } from 'react-icons/bs';
import {TbPlayFootball} from 'react-icons/tb';
import {IoCarSport} from 'react-icons/io';
import { GiPerspectiveDiceSixFacesRandom, GiClothes } from 'react-icons/gi';
import "../../styles/filterbaractivities.css";

const FilterBarProducts = () => {
    const [query, setQuery] = useState("");
    const [selectedType, setSelectedType] = useState("");
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
                    <button onClick={() => handleFilterClick("clothes")} className={store.selectedType === "clothes" ? "selected" : ""}id="iconClothes"><GiClothes className="reactIcon"/> clothes </button>
                </div>
                <div className="iconsPointer">
                    <button onClick={() => handleFilterClick("accessories")} className={store.selectedType === "accessories" ? "selected" : ""}id="iconAccessories"> <BsSmartwatch className="reactIcon" /> accessories </button>
                </div>
                <div className="iconsPointer">
                    <button onClick={() => handleFilterClick("electronics")} className={store.selectedType === "electronics" ? "selected" : ""} id="iconElectronics"> <FcElectronics className="reactIcon" /> electronics </button>
                </div>
                <div className="iconsPointer">
                    <button onClick={() => handleFilterClick("sports")} className={store.selectedType === "sports" ? "selected" : ""} id="iconSports"> <TbPlayFootball className="reactIcon" /> sports </button>
                </div>
                <div className="iconsPointer">
                    <button onClick={() => handleFilterClick("automotive")} className={store.selectedType === "automotive" ? "selected" : ""} id="iconAutomotive"> <IoCarSport className="reactIcon" /> automotive </button>
                </div>
                <div className="iconsPointer">
                    <button onClick={() => handleFilterClick("other")} className={store.selectedType === "other" ? "selected" : ""} id="iconOther"> <GiPerspectiveDiceSixFacesRandom className="reactIcon" /> other </button> 
                </div>
            </div>
        </div>
    )
}
export default FilterBarProducts;