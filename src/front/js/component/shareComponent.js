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
            < FacebookShareButton config={{color: 'white'}} url={shareUrl} className="mx-2" >
                <FacebookIcon round={true} size={20}/> 
            </FacebookShareButton>
        
            < LinkedinShareButton url={shareUrl} className="mx-2" >
                <LinkedinIcon round={true} size={20}/>
            </LinkedinShareButton>
        
            < ViberShareButton url={shareUrl} className="mx-2" >
                <ViberIcon round={true} size={20}/>
            </ViberShareButton>
        
            < WhatsappShareButton url={shareUrl} className="mx-2" >
                <WhatsappIcon round={true} size={20}/>
            </WhatsappShareButton>            
        </div>
    )    
  }

  export default ShareComponent