
import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import {FaStar, FaMicrochip } from 'react-icons/fa';
import { BsSmartwatch, BsFillCarFrontFill } from 'react-icons/bs';
import {TbPlayFootball} from 'react-icons/tb';
import {HiChip} from 'react-icons/hi';
import { GiPerspectiveDiceSixFacesRandom, GiClothes } from 'react-icons/gi';

import "../../styles/filterbarproducts.css";

const FilterBarProducts = () => {
    const [query, setQuery] = useState("");
    //const [selectedType, setSelectedType] = useState("");
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
            <div className="d-flex flex-wrap justify-content-around" id="filterProducts">
                <div className="iconsPointer">
                    <button onClick={() => handleFilterClick("all")} className={store.selectedType === "all" ? "selected" : ""} id="iconAll"><FaStar className="reactIcon" /><br/>All results </button>
                </div>
                <div className="iconsPointer">
                    <button onClick={() => handleFilterClick("clothes")} className={store.selectedType === "clothes" ? "selected" : ""}id="iconClothes"><GiClothes className="reactIcon"/><br/> Clothes </button>
                </div>
                <div className="iconsPointer">
                    <button onClick={() => handleFilterClick("accesories")} className={store.selectedType === "accesories" ? "selected" : ""}id="iconAccesories"> <BsSmartwatch className="reactIcon" /><br/>Accesories </button>
                </div>
                <div className="iconsPointer">
                    <button onClick={() => handleFilterClick("electronics")} className={store.selectedType === "electronics" ? "selected" : ""} id="iconElectronics"> <HiChip className="reactIcon" /><br/>Electronics </button>
                </div>
                <div className="iconsPointer">
                    <button onClick={() => handleFilterClick("sports")} className={store.selectedType === "sports" ? "selected" : ""} id="iconSports"> <TbPlayFootball className="reactIcon" /><br/>Sports </button>
                </div>
                <div className="iconsPointer">
                    <button onClick={() => handleFilterClick("automotive")} className={store.selectedType === "automotive" ? "selected" : ""} id="iconAutomotive"> <BsFillCarFrontFill className="reactIcon" /><br/>Automotive </button>
                </div>
                <div className="iconsPointer">
                    <button onClick={() => handleFilterClick("other")} className={store.selectedType === "other" ? "selected" : ""} id="iconOther"> <GiPerspectiveDiceSixFacesRandom className="reactIcon" /><br/>Other </button> 
                </div>
            </div>
        </div>
    )
}
export default FilterBarProducts;