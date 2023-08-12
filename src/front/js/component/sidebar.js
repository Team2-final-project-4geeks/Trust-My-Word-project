import React, { useState,  useContext } from "react";
import { BiSearch } from 'react-icons/bi';
import { Context } from "../store/appContext.js";
import "../../styles/sidebar.css";

const SideBar = () => {

    const [cities, setCities] = useState({Malaga:false, Cartama: false, Almayate: false, Nerja:false, Bilbao: false, Barcelona:false, PuertoDeLaCruz:false, Algarve: false});
    const [types, setTypes] = useState({family: false, adventure:false, romantic: false, group:false});
    const { store, actions } = useContext(Context);
    

    const handleCity =(city)=>{
        setCities(prev=> ({
            ...prev, 
            [city]: !prev[city]
        })
    )}

    const handleTypes=(type)=>{
        setTypes(prev=> ({
            ...prev,
            [type]: !prev[type]
        })
    )}
    const uncheck=()=>{
        const checkbox = document.querySelectorAll(".form-check-input");
        checkbox.forEach(box=>{
            box.checked = false;
        })

    }
    return(
        <div className="ms-2">
            <button className="btn btn-outline-secondary" id="magnifyingButton"type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"><BiSearch /></button>
            {store.checked && <button className="btn btn-outline-secondary ms-5" type="button" id="showAll" onClick={()=> {actions.handleChecked(false); uncheck()}}>Show All</button>}
            <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div className="offcanvas-header">
                    <h4 className="offcanvas-title" id="offcanvasScrollingLabel">Search for ... </h4>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <h5 className="mb-4">Here you can filter your choices!</h5>                
                    <p><i>Choose the city...</i></p>
                    <div className="form-check">                    
                        <input className="form-check-input" type="checkbox" onChange={() => {handleCity("Malaga"); actions.handleChecked(true)}}  value="" id="Malaga"/>
                        <label className="form-check-label" htmlFor="Malaga"> Malaga </label>
                    </div>
                    <div className="form-check">                    
                        <input className="form-check-input" type="checkbox" onChange={() => {handleCity("Cartama"); actions.handleChecked(true)}}value="" id="Cartama"/>
                        <label className="form-check-label" htmlFor="Cartama"> Cartama </label>
                    </div>
                    <div className="form-check">                    
                        <input className="form-check-input" type="checkbox" onChange={() => {handleCity("Almayate"); actions.handleChecked(true)}} value="" id="Almayate"/>
                        <label className="form-check-label" htmlFor="Almayate"> Almayate </label>
                    </div>
                    <div className="form-check">                    
                        <input className="form-check-input" type="checkbox" onChange={() => {handleCity("Nerja"); actions.handleChecked(true)}}value="" id="Nerja"/>
                        <label className="form-check-label" htmlFor="Nerja"> Nerja </label>
                    </div>
                    <div className="form-check">                    
                        <input className="form-check-input" type="checkbox" onChange={() => {handleCity("Bilbao"); actions.handleChecked(true)}} value="" id="Bilbao"/>
                        <label className="form-check-label" htmlFor="Bilbao"> Bilbao </label>
                    </div>
                    <div className="form-check">                    
                        <input className="form-check-input" type="checkbox" onChange={() => {handleCity("PuertoDeLaCruz"); actions.handleChecked(true)}}value="" id="PuertoDeLaCruz"/>
                        <label className="form-check-label" htmlFor="PuertoDeLaCruz"> Puerto de la Cruz </label>
                    </div>
                    <div className="form-check">                    
                        <input className="form-check-input" type="checkbox" onChange={() => {handleCity("Barcelona"); actions.handleChecked(true)}}value="" id="Barcelona"/>
                        <label className="form-check-label" htmlFor="Barcelona"> Barcelona </label>
                    </div>
                    <div className="form-check mb-5">                    
                        <input className="form-check-input" type="checkbox" onChange={() => {handleCity("Algarve"); actions.handleChecked(true)}}value="" id="Algarve"/>
                        <label className="form-check-label" htmlFor="Algarve"> Algarve </label>
                    </div>
                    <p className="mt-5"><i>Choose the type...</i></p>
                    <div className="form-check">                    
                        <input className="form-check-input" type="checkbox" onChange={() => {handleTypes("family"); actions.handleChecked(true)}}value="" id="family"/>
                        <label className="form-check-label" htmlFor="Algarve"> family </label>
                    </div>
                    <div className="form-check">                    
                        <input className="form-check-input" type="checkbox" onChange={() => {handleTypes("adventure"); actions.handleChecked(true)}}value="" id="adventure"/>
                        <label className="form-check-label" htmlFor="Algarve"> adventure </label>
                    </div>
                    <div className="form-check">                    
                        <input className="form-check-input" type="checkbox" onChange={() => {handleTypes("romantic"); actions.handleChecked(true)}}value="" id="romantic"/>
                        <label className="form-check-label" htmlFor="Algarve"> romantic </label>
                    </div>
                    <div className="form-check">                    
                        <input className="form-check-input" type="checkbox" onChange={() => {handleTypes("group"); actions.handleChecked(true)}}value="" id="group"/>
                        <label className="form-check-label" htmlFor="Algarve"> group </label>
                    </div>

                <button type="button" id="searchButtonSidebar" onClick={()=> {actions.addCity(cities); actions.addType(types); actions.handleChecked(true)}} className="btn btn-secondary ms-2 mt-4"> Search </button>    
                </div>                
            </div>           
        </div>
    )
}

export default SideBar