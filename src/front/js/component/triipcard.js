import React, { useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/triipcard.css";
import ViewMore from "./viewmore.js";
import { Context} from "../store/appContext";
import Swal from 'sweetalert2';
import { BsTranslate } from 'react-icons/bs';


const TriipCard = (props)=>{
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const token = localStorage.getItem("jwt-token");
    const [showHeart, setShowHeart] = useState(false);
    const [translatedDescription, setTranslatedDescription] = useState(props.trip.description);
    const [isTranslated, setIsTranslated] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState(null)
  
    const handleFavoriteClick = () => {
      setShowHeart(true);
      setTimeout(() => {
        setShowHeart(false);
      }, 2000);
    };
  
    const translator = (language) => {
        fetch(`https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${language}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': 'aaaff2dc85024a69a048388cfdbbd3b2',
            'Ocp-Apim-Subscription-Region': 'northeurope'
          },
          body: JSON.stringify([
            {
              "Text": `${props.trip.description}`,
            }
          ])
        })
          .then(response => response.json())
          .then(data => {
            setCurrentLanguage(language)
            const translatedText = data[0].translations.find(translation => translation.to === language);
            if (translatedText) {
              setTranslatedDescription(translatedText.text);
            } else {
              console.error('No se encontró la traducción al español en la respuesta de la API.');
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
  
      setIsTranslated(!isTranslated);
    }
  
  

    return(
            <div className="card-body mt-5 mb-4" id="tripBody">
                    <div id="imageBoard">
                        <img src={props.img} className="card-img-top" alt="..." />
                        <div id="imageOverlay" className="d-flex justify-content-end align-items-start p-2">
                            <i
                            className="fas fa-heart text-danger fa-2x"
                            onClick={() => {
                                if (token) {
                                handleFavoriteClick();
                                actions.addFavourite(props.trip.id, props.trip.title, props.trip.category)
                                actions.addUserFavourites(localStorage.getItem("userId"));
                                } else {
                                Swal.fire({
                                    icon: "error",
                                    title: "Oops...",
                                    text: "You have to login first!",
                                });
                                navigate("/login");
                                }
                            }}
                            ></i>
                        </div>
                    </div>

                    <div id="infoBoard" className="mt-3">
                        <div className="d-flex flex-column">
                            <div className=" col-12">
                                <div className="d-flex flex-row" id="tripInfoBoard">
                                    <div id="img-container" className="col-3" alt="review-img">
                                        <img src={props.profile} alt="..."/>
                                    </div>
                                    <div className="d-flex justify-content-between col-10 ms-3">
                                        <div className="d-flex flex-column mx-3">
                                                <p className="card-text mb-0"><small className="text-muted username">{props.author}</small></p>
                                                <hr className="mb-1 mt-1"/>
                                                <p className="card-text"><small className="text-muted publishing-date">{props.trip.publishing_date}</small></p>
                                        </div>
                                        <div className="d-flex flex-column" id="visitBoard">
                                                <p className="text-muted  mb-0"> <small>Visited {props.trip.counter} <i className="fa-solid fa-eye"></i></small></p>
                                                <p className="card-text"><small className="text-muted">{props.trip.location}</small></p>
                                        </div>     
                                    </div>                                
                                </div>

                                <div className="d-flex flex-column  align-items-center justify-content-center mt-2" >
                                    <h5 className="card-title text-center mt-2">{props.trip.title}</h5>

                                    <div className="rating-board">      
                                            {Array.from({ length: parseInt(props.trip.rating) }).map((_, index) => (
                                            <span key={index} style={{ color: 'gold' }}>&#9733;</span>
                                            ))}
                                    </div>
                                    <div id="trip-board" className="mt-2">
                                        <div id="card-description-trip">
                                            <p className="card-text">
                                            <i className="fas fa-quote-left mt-2 me-2"></i>
                                            <i>{translatedDescription || props.trip.description}</i>
                                            </p>
                                        </div>
                                        <div className="d-flex flex-row justify-content-between">
                                          <p className="card-text mt-4">{props.trip.price}</p>

                                          <div class="dropdown">
                                          <BsTranslate className={`dropdown-toggle mt-4 ${ currentLanguage === null || currentLanguage === "en" ? "text-dark" : "text-warning"}`} data-bs-toggle="dropdown" aria-expanded="false" /> 
                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                              <div className="d-flex" id="dropdownTranslator">
                                              <a className="dropdown-item" 
                                                 onClick={(e)=>{
                                                  e.preventDefault()
                                                  translator("es")}} 
                                                 > <img src="https://img.asmedia.epimg.net/resizer/LQyBk5T2TfVttC_yVM8n5HuEYpM=/1472x828/cloudfront-eu-central-1.images.arcpublishing.com/diarioas/53YSJXSIZFHNTBV52Z4AMKISUM.png" /></a>
                                              <a className="dropdown-item" 
                                                 onClick={(e)=>{
                                                  e.preventDefault()
                                                  translator("en")}} 
                                                 > <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/1280px-Flag_of_the_United_Kingdom_%283-5%29.svg.png" /></a>
                                              <a className="dropdown-item" 
                                                 onClick={(e)=>{
                                                  e.preventDefault()
                                                  translator("de")}} 
                                                 > <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/640px-Flag_of_Germany.svg.png" /></a>
                                              </div>
                                            </ul>
                                          </div>
                                        </div>      
                                    </div>
                                </div>

                                <div id="btn-container-trip">
                                    <ViewMore item={props.item.id}/>

                                </div>
                                <div>
                                {showHeart && <div id="floating-heart">&hearts;</div>}
                                </div>
                            </div>
                        </div>
                    </div>
        </div>
    )
}

export default TriipCard