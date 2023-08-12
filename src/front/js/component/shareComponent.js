import {
    FacebookIcon,
    FacebookShareButton,   
    LinkedinIcon,   
    LinkedinShareButton,   
    ViberShareButton,
    ViberIcon,
    WhatsappIcon,
    WhatsappShareButton,
  } from "react-share";
  import React from "react";
  import "../../styles/sharecomponent.css"

  const ShareComponent = () =>{
    
    const shareUrl = window.location.href; 
    return(
        <div>            
            < FacebookShareButton config={{color: 'white'}} url={shareUrl} >
                <FacebookIcon round={true} size={20}/>
            </FacebookShareButton>
        
            < LinkedinShareButton url={shareUrl} >
                <LinkedinIcon round={true} size={20}/>
            </LinkedinShareButton>
        
            < ViberShareButton url={shareUrl} >
                <ViberIcon round={true} size={20}/>
            </ViberShareButton>
        
            < WhatsappShareButton url={shareUrl} >
                <WhatsappIcon round={true} size={20}/>
            </WhatsappShareButton>            
        </div>
    )    
  }

  export default ShareComponent