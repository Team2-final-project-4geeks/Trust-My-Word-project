import React from "react";
import { BiSearch } from 'react-icons/bi';
import "../../styles/sidebar.css";

const SideBar = () => {
    return(
        <div className="ms-2">
            <button class="btn btn-outline-secondary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"><BiSearch /></button>
            <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div class="offcanvas-header">
                    <h4 class="offcanvas-title" id="offcanvasScrollingLabel">Search for ... </h4>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <h6>Here you can filter your choices!</h6>                
                    <p>Choose the city...</p>
                    <div class="form-check">                    
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                        <label class="form-check-label" for="flexCheckDefault"> Malaga </label>
                    </div>
                    <div class="form-check">                    
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                        <label class="form-check-label" for="flexCheckChecked"> Cartama </label>
                    </div>
                    <div class="form-check">                    
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                        <label class="form-check-label" for="flexCheckDefault"> Almayate </label>
                    </div>
                    <div class="form-check">                    
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                        <label class="form-check-label" for="flexCheckChecked"> Nerja </label>
                    </div>
                    <div class="form-check">                    
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                        <label class="form-check-label" for="flexCheckChecked"> Bilbao </label>
                    </div>
                    <div class="form-check">                    
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                        <label class="form-check-label" for="flexCheckChecked"> Puerto de la Cruz </label>
                    </div>
                    <div class="form-check">                    
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                        <label class="form-check-label" for="flexCheckChecked"> Barcelona </label>
                    </div>
                    <div class="form-check">                    
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                        <label class="form-check-label" for="flexCheckChecked"> Algarve </label>
                    </div>
                </div>
            </div>                
        </div>
    )
}

export default SideBar