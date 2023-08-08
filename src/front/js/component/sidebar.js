import React, { useState,  useContext } from "react";
import { BiSearch } from 'react-icons/bi';
import { Context } from "../store/appContext.js";
import "../../styles/sidebar.css";

const SideBar = () => {

    const [cities, setCities] = useState({Malaga:false, Cartama: false, Almayate: false, Nerja:false, Bilbao: false, Barcelona:false, PuertoDeLaCruz:false, Algarve: false});
    const { store, actions } = useContext(Context);

    const handleCity =(city)=>{
        setCities(prev=> ({
            ...prev, 
            [city]: !prev[city]
        })
    )}

    return(
        <div className="ms-2" id="sidebar">
            <button className="btn btn-outline-secondary" id="magnifyingButton"type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"><BiSearch /></button>
            <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div className="offcanvas-header">
                    <h4 className="offcanvas-title" id="offcanvasScrollingLabel">Search for ... </h4>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <h6>Here you can filter your choices!</h6>                
                    <p>Choose the city...</p>
                    <div className="form-check">                    
                        <input className="form-check-input" type="checkbox" onChange={() => handleCity("Malaga")}  value="" id="Malaga"/>
                        <label className="form-check-label" htmlFor="Malaga"> Malaga </label>
                    </div>
                    <div className="form-check">                    
                        <input className="form-check-input" type="checkbox" onChange={() => handleCity("Cartama")}value="" id="Cartama"/>
                        <label className="form-check-label" htmlFor="Cartama"> Cartama </label>
                    </div>
                    <div className="form-check">                    
                        <input className="form-check-input" type="checkbox" onChange={() => handleCity("Almayate")} value="" id="Almayate"/>
                        <label className="form-check-label" htmlFor="Almayate"> Almayate </label>
                    </div>
                    <div className="form-check">                    
                        <input className="form-check-input" type="checkbox" onChange={() => handleCity("Nerja")}value="" id="Nerja"/>
                        <label className="form-check-label" htmlFor="Nerja"> Nerja </label>
                    </div>
                    <div className="form-check">                    
                        <input className="form-check-input" type="checkbox" onChange={() => handleCity("Bilbao")} value="" id="Bilbao"/>
                        <label className="form-check-label" htmlFor="Bilbao"> Bilbao </label>
                    </div>
                    <div className="form-check">                    
                        <input className="form-check-input" type="checkbox" onChange={() => handleCity("PuertoDeLaCruz")}value="" id="PuertoDeLaCruz"/>
                        <label className="form-check-label" htmlFor="PuertoDeLaCruz"> Puerto de la Cruz </label>
                    </div>
                    <div className="form-check">                    
                        <input className="form-check-input" type="checkbox" onChange={() => handleCity("Barcelona")}value="" id="Barcelona"/>
                        <label className="form-check-label" htmlFor="Barcelona"> Barcelona </label>
                    </div>
                    <div className="form-check">                    
                        <input className="form-check-input" type="checkbox" onChange={() => handleCity("Algarve")}value="" id="Algarve"/>
                        <label className="form-check-label" htmlFor="Algarve"> Algarve </label>
                    </div>
                <button type="button" id="searchButtonSidebar" onClick={()=> actions.addCity(cities)} className="btn btn-secondary ms-2 mt-4"> Search </button>    
                </div>                
            </div>           
        </div>
    )
}

export default SideBar