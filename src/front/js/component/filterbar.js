import React from "react";
import { BiSearch } from 'react-icons/bi';
import { FaHeart, FaStar} from 'react-icons/fa';
import { MdSurfing, MdGroup, MdFamilyRestroom } from 'react-icons/md';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import "../../styles/filterbar.css";



const FilterBar = () => {
    return(
        <div className="container-fluid"> 
            <div className="d-flex flex-row">
                <div className="input-group mb-3" id="inputGroup">
                    <span id="label"className="input-group-text rounded me-2"><BiSearch /></span>
                    <input type="text" id="inputSearch"className="form-control rounded-pill me-2" placeholder="Where do you want to go?" aria-label="City" aria-describedby="basic-addon1"/>
                    <button className="btn btn-dark rounded" type="submit"> Search</button>
                </div>
            </div>
            <div className="d-flex flex-row justify-content-around">
                <a> <FaStar size={30} /> All results</a>
                <a> <MdFamilyRestroom size={30} /> family</a>
                <a> <MdSurfing size={30} /> adventure</a>
                <a> <FaHeart size={30} /> romantic</a>
                <a> <MdGroup size={30} /> group</a>
                <a> <GiPerspectiveDiceSixFacesRandom size={30} /> other </a>                  
            </div>
        </div>
    )
}

export default FilterBar;