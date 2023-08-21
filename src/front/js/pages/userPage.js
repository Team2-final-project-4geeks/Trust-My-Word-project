import React, {useState, useEffect,useContext, useRef } from "react";
import { Context} from "../store/appContext";
import profile from "../../img/profile.png";
import { FaPencilAlt } from 'react-icons/fa';
import "../../styles/userpage.css";
import { useNavigate } from "react-router-dom";

const UserPage = () =>{
    const navigate= useNavigate()
    const presetKey = "ptwmh2mt";
    const cloudName = "dhyrv5g3w"; 
    const {store,actions} = useContext(Context)
    const [reviews, setReviews] = useState([]);
    const [comments, setComments] = useState([])
    const [favourites, setFavourites] = useState([])
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [image,setImage] = useState("")
    const [userimage, setUserimage] = useState("")
    const fileInputRef = useRef(null);


    useEffect(() => {		
		getReviews();
        getUserItems()
	}, []);

    const handleFile = (e) => {
        const file = e.target.files[0];
    
        if (file && file.type !== 'image/jpeg') {
          alert('Only .jpg format is allowed.');
          return;
        }
        setImage(file);
      };
    
    
      const handleUpload = async () => {      
        if (!image) {
          alert('Please select an image before uploading.');
          return;
        }
      
        try {
          const imageUrl = await uploadImage(image); 
          sendDataToAPI(imageUrl);
          alert('You have created a Review');
          navigate('/');
        } catch (error) {
          console.error('Error uploading:', error);
          alert('Error uploading image. Please try again.');
        }
      };

    const uploadImage = (imageFile) => {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("file", imageFile);
          formData.append("upload_preset", presetKey);
      
          fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: formData,
          })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.secure_url) {
              resolve(data.secure_url);
            } else {
              reject(new Error("Image upload failed."));
            }
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
        });
      };

    const sendDataToAPI = (image) => {
        const token = localStorage.getItem('jwt-token');
            if(token) {
        fetch(process.env.BACKEND_URL + "api/user/" + localStorage.getItem("userId"), { 
                method: "PUT", 
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization" : "Bearer " + token
                },
                body: JSON.stringify({imageCloud:image}) 
            })
            .then((res) => res.json())
            .then((result) => {
              console.log("estoyyyy dentroooo");
              console.log(result);
            }).catch((err) => {
                console.log(err);
            })
            }else  {
              alert('Image not uploaded')
            }
    
          };

          const getUserItems = () => {
            const token = localStorage.getItem('jwt-token');
                if(token) {
            fetch(process.env.BACKEND_URL + "api/user/" + localStorage.getItem("userId"), { 
                    method: "GET", 
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization" : "Bearer " + token
                    },
                })
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    setUserimage(result.image)
                }).catch((err) => {
                    console.log(err);
                })
                }else  {
                  alert('User not found')
                }
              };
    

    const getReviews = () =>{
    const token = localStorage.getItem('jwt-token');
	if(token) {
    fetch( process.env.BACKEND_URL + "/api/user/" + localStorage.getItem("userId"),{
        method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer " + token
        }
    })
     .then(resp => {								
        return resp.json();
    })
    .then(data=> {	
        console.log(data);
        setComments(data.comments)
        setFavourites(data.favourites)	
        setReviews(data.reviews);
        setEmail(data.email);
        setUsername(data.username);
    })
    .catch(error => {			
        console.log('Oops something went wrong'+ error);
    })
    }else  {
    alert(' You are not logged in!')
    }
}
const showUsersReviews =()=> {
    return reviews.map((review, index) =>{
        return(
                <li style={{ '--cardColor': '#ffc600' }} key={index}>
                <div class="content">
                    <div class="icon"> <span className="input-group-text"><FaPencilAlt 
                      onClick={()=>{
                         navigate("/modify-review/" + review.id)
                        }} size={45} color="grey" id="pencil"/></span></div>
                    <div class="title">{review.title}</div>
                    <div class="text">{review.description}</div>
                </div>
            </li>
        )
    })
}
    return(
        <div className="container-fluid">
            <div className="userSection bg-light ">
                <div className="row">
                    <div className="col-5">
                            <div className="insight d-flex flex-row p-5">
                                <div className="">
                                    <p className="title mx-4">Reviews</p>
                                    <p className="reviews  mx-4">{reviews.length}</p>
                                </div>
                                <div className="">
                                    <p className="title mx-4">Favorites</p>
                                    <p className="reviews  mx-4">{favourites.length}</p>
                                </div>
                                <div className="">
                                    <p className="title mx-4">Comments</p>
                                    <p className="reviews  mx-4">{comments.length}</p>
                                </div>
                            </div>
                    </div>
                    <div className="col-3">
                        <div class="circle">
                           { userimage ? (
                                <> 
                                    <img src={userimage} alt="Foto"/>
                                </>
                           ):(
                            <>
                                <img src={profile} alt="Foto"/>
                            </>
                           )}
                           <div className="d-flex flex-row align-items-center justify-content-center mt-4">
                           <label htmlFor="fileInput">
                                <i
                                    className="fa-solid fa-pencil mx-3"
                                    onClick={() => fileInputRef.current.click()} 
                                ></i>
                            </label>
                            <input
                                id="fileInput"
                                type="file"
                                accept="image/jpeg"
                                onChange={handleFile}
                                ref={fileInputRef} 
                                style={{ display: 'none' }} 
                            />
                            <button className="btn btn-warning"  onClick={handleUpload}>Submit</button> 
                           </div>
                          
    
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="user-info d-flex flex-column py-5">
                            <h3 className="mb-3">My details</h3>
                            <div className="email">
                                <p><i class="fas fa-at"></i>: {email}</p>       
                            </div>
                            <div className="username">
                                <p><i class="fas fa-user "></i>: {username}</p>
                            </div>
                            <div className="location">
                                <p><i class="fa-solid fa-location-pin fa-2x"></i>: {localStorage.getItem("myLocation")}</p>
                            </div>
                        </div>
                    </div> 
                </div>
                <div className="row">
                    <div className='carousel-container'>
                        <div className="reviews-body">          
                            <h1>My reviews</h1>
                            <ol class="olcards">
                                {showUsersReviews()}
                            </ol>
                        </div>
                    </div>          
                </div>
            </div>
        </div>
    )
}

export default UserPage