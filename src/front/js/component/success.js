import React from 'react';
import { useNavigate } from "react-router-dom";
import "../../styles/success.css";

const Success = () => {

    const navigate= useNavigate();
  return (
    <div className="container border-0 my-5 text-center">
      <h1 className="text-center">Email Verification Successful</h1>
      <p className="text-center" id="sucessText">Your email has been successfully verified. You can now log in and start using our platform.</p>
      <div className='container border-0' id="pictBtn">
        <img id="imageSuccess" src="https://cdn.pixabay.com/photo/2016/11/21/13/58/ball-1845546_1280.jpg"></img>
        <button className="btn-dark my-5" onClick={()=>navigate("/login")}>Log In</button>
    </div>
    </div>
  );
}

export default Success;
