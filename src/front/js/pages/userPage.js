import React, {useState, useEffect,useContext, useRef } from "react";
import { Context} from "../store/appContext";
import profile from "../../img/profile.png";
import { FaPencilAlt } from 'react-icons/fa';
import "../../styles/userpage.css";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import CaraouselReview from "../component/carouselreviews";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";



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
    const currentUserId = localStorage.getItem("userId")

    const responsive = {        
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
          },
          desktop: {
            breakpoint: { max: 2999, min: 1024 },
            items: 4
          },
          tablet: {
            breakpoint: { max: 1023, min: 464 },
            items: 2
          },
          mobile: {
            breakpoint: { max: 463, min: 0 },
            items: 1
          }
      };



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
          Swal.fire({
            icon: 'success',
            text: "Profile image updated!"            
        })
          window.location.reload();
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
        const orderedArray = reviews.sort((a, b) => b.counter - a.counter);
        return orderedArray.map((review, index) =>{
            return(
                <CaraouselReview  image={review.userImage}  
                                  reviewUserId={review.user_id}  
                                  userId={currentUserId} 
                                  category={review.category} 
                                  id={review.id} 
                                  title={review.title} 
                                  author={review.reviewOwner} 
                                  description={review.description} 
                                  counter={review.counter}
                                  fetchReviews={getReviews} 
                />
            )
        })
    }

  // const showUsersFavorites =()=> {
  //   return favourites.map((favourite, index) =>{
  //       return(
  //           <CaraouselReview   category={favourite.category} id={favourite.id} title={favourite.title}  description={favourite.description} />
  //       )
  //   })
  // }
    return(
        <div id="userPage">
            <div className="userSection">
                <div className="row">
                    <div className="col-5" id="insight">
                            <div className="insight d-flex flex-row">
                                <div className="insightInfo">
                                    <p className="title mx-4">Reviews</p>
                                    <p className="reviews  mx-4">{reviews.length}</p>
                                </div>
                                <div className="">
                                    <p className="title mx-4">Favorites</p>
                                    <p className="reviews  mx-4">{favourites && favourites.length > 0 ? favourites.length: 0}</p>
                                </div>
                                <div className="">
                                    <p className="title mx-4">Comments</p>
                                    <p className="reviews  mx-4">{comments.length}</p> 
                                </div>
                            </div>
                    </div>
                    <div className="col-3">
                        <div className="circle">
                           { userimage != "image" ? (
                                <> 
                                    <img src={userimage} alt="profile-img"/>
                                </>
                           ):(
                            <>
                                <img src={profile} alt="Foto"/>
                            </>
                           )}
                           <div className="d-flex flex-row align-items-center justify-content-center mt-4" id="imageProfile">
                           <label htmlFor="fileInput">
                                <i
                                    className="fa-solid fa-pencil mx-3"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        fileInputRef.current.click()}} 
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
                    <div className="col-4" id="userInfo">
                        <div className="user-info d-flex flex-column justify-content-around">
                            <h3 className="mb-3">My details</h3>
                            <div className="email">
                                <p className="email"><i className="fas fa-at"></i> {email}</p>       
                            </div>
                            <div className="username">
                                <p className="username"><i className="fas fa-user "></i> {username}</p>
                            </div>
                            <div className="location">
                                <p><i className="fa-solid fa-location-pin fa-xl ps-2"></i> {localStorage.getItem("myLocation")}</p>
                            </div>
                        </div>
                    </div> 
                </div>
                <div className="row">
                        <div className="reviews-body">          
                            <h1>My reviews</h1>
                            <div className="container-fluid">
                            <Carousel showDots={true} responsive={responsive} arrows={false} swipeable={true} >
                                {showUsersReviews()}
                            </Carousel>
                        </div>
                        </div>
                </div>
                {/* <div className="row">
                        <div className="reviews-body">          
                            <h1>My favourites</h1>
                            <div className="container-fluid">
                            <Carousel showDots={true} responsive={responsive} arrows={false} swipeable={true} >
                                {showUsersFavorites()}
                            </Carousel>
                        </div>
                        </div>
                </div> */}
            </div>
        </div>
    )
}
export default UserPage