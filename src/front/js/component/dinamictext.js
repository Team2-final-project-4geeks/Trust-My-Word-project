import React from "react";
import  { useState, useEffect } from 'react';
import "../../styles/dinamictext.css";


const DinamicText = (props)=>{
    const {phrase1,phrase2,phrase,phrase3,phrase4} = props
    const names = [`${phrase1}`, `${phrase2}`, `${phrase}`,`${phrase3}`,`${phrase4}`];

    const [nameIndex, setNameIndex] = useState(0);
    const [showName, setShowName] = useState(true);
  
    useEffect(() => {

      const interval = setInterval(() => {
        setShowName(false);
        setTimeout(() => {
          setNameIndex((prevIndex) => (prevIndex + 1) % names.length);
          setShowName(true);
        }, 500);
      }, 3000);
  
      return () => {
        clearInterval(interval);
      };
    },[]);
  
  return (
    <div className="container-fluid d-flex align-items-center justify-content-center flex-column my-4"  style={{ height: '250px'}}>
        <div className="d-flex align-items-center justify-content-center flex-row" id="dinamicBoard">
            <div>
                <h4 className="mt-2 mx-3 titulo">We are here to </h4>
            </div>
            <div className="animated-text-board">
                <h4 id="text" className={`text-dark ${showName ? 'fade-in' : 'fade-out'}`}>{names[nameIndex]}</h4> 
            </div>
        </div>
            <p className="mt-2 text-muted" ><small>Trust my word</small></p>     
    </div>
  );
   
}

export default DinamicText;