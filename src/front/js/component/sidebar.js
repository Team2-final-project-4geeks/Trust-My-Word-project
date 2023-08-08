import React from "react";
import { BiSearch } from 'react-icons/bi';
import "../../styles/sidebar.css";

const SideBar = () => {
    return(
        <div className="ms-2 mt-2">
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
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                        <label className="form-check-label" for="flexCheckDefault"> Malaga </label>
                    </div>
                    <div className="form-check">                    
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                        <label className="form-check-label" for="flexCheckChecked"> Cartama </label>
                    </div>
                    <div className="form-check">                    
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                        <label className="form-check-label" for="flexCheckDefault"> Almayate </label>
                    </div>
                    <div className="form-check">                    
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                        <label className="form-check-label" for="flexCheckChecked"> Nerja </label>
                    </div>
                    <div className="form-check">                    
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                        <label className="form-check-label" for="flexCheckChecked"> Bilbao </label>
                    </div>
                    <div className="form-check">                    
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                        <label className="form-check-label" for="flexCheckChecked"> Puerto de la Cruz </label>
                    </div>
                    <div className="form-check">                    
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                        <label className="form-check-label" for="flexCheckChecked"> Barcelona </label>
                    </div>
                    <div className="form-check">                    
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                        <label className="form-check-label" for="flexCheckChecked"> Algarve </label>
                    </div>
                    <button type="button" className="btn btn-secondary ms-2 mt-4" id="searchButtonSidebar"> Search </button>
                </div>
            </div>                
        </div>
    )
}

export default SideBar