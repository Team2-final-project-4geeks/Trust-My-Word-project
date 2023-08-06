import React from "react";
import { BiSearch } from 'react-icons/bi';
import "../../styles/sidebar.css";

const SideBar = () => {
    return(
        <div className="ms-2" id="sidebar">
            <button className="btn btn-outline-secondary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"><BiSearch /></button>
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
                        <label className="form-check-label" htmlFor="flexCheckDefault"> Malaga </label>
                    </div>
                    <div className="form-check">                    
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                        <label className="form-check-label" htmlFor="flexCheckChecked"> Cartama </label>
                    </div>
                    <div className="form-check">                    
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                        <label className="form-check-label" htmlFor="flexCheckDefault"> Almayate </label>
                    </div>
                    <div className="form-check">                    
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                        <label className="form-check-label" htmlFor="flexCheckChecked"> Nerja </label>
                    </div>
                    <div className="form-check">                    
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                        <label className="form-check-label" htmlFor="flexCheckChecked"> Bilbao </label>
                    </div>
                    <div className="form-check">                    
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                        <label className="form-check-label" htmlFor="flexCheckChecked"> Puerto de la Cruz </label>
                    </div>
                    <div className="form-check">                    
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                        <label className="form-check-label" htmlFor="flexCheckChecked"> Barcelona </label>
                    </div>
                    <div className="form-check">                    
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                        <label className="form-check-label" htmlFor="flexCheckChecked"> Algarve </label>
                    </div>
                <button type="button" className="btn btn-secondary ms-2 mt-4"> Search </button>    
                </div>                
            </div>           
        </div>
    )
}

export default SideBar