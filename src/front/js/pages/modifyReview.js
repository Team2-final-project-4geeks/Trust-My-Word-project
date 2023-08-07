import React from "react";
import { FaPencilAlt } from 'react-icons/fa';

const ModifyReview = () => {
    return(
        <div className="container-fluid">            
            <div classname="reviewsSection mt-5">
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default"> Title </span>
                    <span className="input-group-text"><FaPencilAlt size={20} color="grey" id="pencil"/></span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                    
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default"> Type </span>
                    <span className="input-group-text"><FaPencilAlt size={20} color="grey" id="pencil"/></span>
                    <input type="text" readonly className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default"> Location </span>
                    <span className="input-group-text"><FaPencilAlt size={20} color="grey" id="pencil"/></span>
                    <input type="text" readonly className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default"> Publishing Date </span>
                    <span className="input-group-text"><FaPencilAlt size={20} color="grey" id="pencil"/></span>
                    <input type="text" readonly className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default"> Price </span>
                    <span className="input-group-text"><FaPencilAlt size={20} color="grey" id="pencil"/></span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default"> Description </span>
                    <span className="input-group-text"><FaPencilAlt size={20} color="grey" id="pencil"/></span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default"> Link </span>
                    <span className="input-group-text"><FaPencilAlt size={20} color="grey" id="pencil"/></span>
                    <input type="text" readonly className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                </div>
            </div>
      </div>

    )
}

export default ModifyReview