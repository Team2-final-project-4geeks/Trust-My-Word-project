import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/activitycard.css";
import { Context} from "../store/appContext";
import Swal from 'sweetalert2';
import { BsTranslate } from 'react-icons/bs';


const ActivityCard = (props)=>{
    const { store, actions } = useContext(Context);
    const [showHeart, setShowHeart] = useState(false);
    const [translatedDescription, setTranslatedDescription] = useState(props.activity.description);
    const [isTranslated, setIsTranslated] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState(null);
    const token = localStorage.getItem("jwt-token");
    const navigate= useNavigate();
    
    const handleReviewClick = (activityId) => {
        actions.addToCounter(activityId)
	  };

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
              "Text": `${props.activity.description}`,
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
              console.error('The translation to the chosen language could not be performed');
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
  
      setIsTranslated(!isTranslated);
    }

    return(
        <div className="card-body mt-5 mb-4" id="activityBody">
            <div id="imageBoard">
                <img src={props.img} className="card-img-top" alt="image chosen by the user"/>
                <div id="imageOverlayActivity" className="d-flex justify-content-end align-items-start p-2">
                        <i
                        className="fas fa-heart text-danger fa-2x"
                        onClick={() => {
                            if (token) {
                            handleFavoriteClick();
                            actions.addFavourite(props.activity.id, props.activity.title, props.activity.category);
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
                    <div className="d-flex flex-row" id="activityInfoBoard">
                        <div id="img-container" className="col-3">
                            <img src={props.userImage} alt="image chosen by the user"/>
                        </div>
                        <div className="d-flex justify-content-around col-10 ms-3">
                            <div className="d-flex flex-column mx-3">
                                    <p className="card-text mb-0"><small className="text-muted username">{props.activity.reviewOwner}</small></p>
                                    <hr className="mb-1 mt-1"/>
                                    <p className="card-text"><small className="text-muted publishing-date">{props.activity.publishing_date}</small></p>
                            </div>
                            <div className="d-flex flex-column" id="visitBoard">
                                    <p className="text-muted mb-0"> <small>Visited {props.activity.counter} <i class="fa-solid fa-eye"></i></small></p>
                                    <p className="card-text"><small className="text-muted">{props.activity.location}</small></p>
                            </div>     
                        </div>     
                    </div>

                    <div className="d-flex flex-column align-items-center justify-content-center mt-2 ">
                        <h5 className="card-title text-center mt-2">{props.activity.title}</h5>

                        <div className="rating-board">      
                                {Array.from({ length: parseInt(props.activity.rating) }).map((_, index) => (
                                <span key={index} style={{ color: 'gold' }}>&#9733;</span>
                                ))}
					    </div>
                        <div id="activity-board" className="mt-2">
                            <div id="card-description-activity">
                                <p className="card-text">
                                    <i className="fas fa-quote-left mt-2 me-2"></i> 
                                    <i> {translatedDescription || props.activity.description}</i>
                                </p>
                            </div>
                            <div className="d-flex flex-row justify-content-between">
                                <p className="card-text mt-4">{props.activity.price}€</p>

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

                    <div id="activityCardViewMore">
                        <button 
                            className="btn" 
                            type="button" id="activityCardViewMoreBtn" 
                            onClick={()=>{ 
                                if(token){
                                    navigate("/activity/" + props.activity.id)
                                    handleReviewClick(props.activity.id)
                                }else{
                                    navigate("/login")
                                }
                               
                                }}> <strong>View more</strong>
                        </button>
                    </div>
                    
                    <div>
                        {showHeart && <div className="floatingHeartActivity">&hearts;</div>}
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default ActivityCard