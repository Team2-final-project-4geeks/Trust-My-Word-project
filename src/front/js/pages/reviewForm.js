import React, { useState, useEffect, useContext } from "react";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { cloudinary } from "cloudinary-core";
import { Context } from "../store/appContext";

import "../../styles/reviewform.css";

export const ReviewForm = () => {
  const presetKey = "dumn5jgp";
  const cloudName = "dbxeaqsv4"; 
  const [imageCloud, setImageCloud] = useState("");
  const [title, setTitle] = useState("")
  const [type, setType] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [publishing_date, setPublishing_date] = useState("")
  const [link, setLink] = useState("")
  const [price, setPrice] = useState("")
  const [shop, setShop] = useState("")
  const [image, setImage] = useState("")
  const [category, setCategory] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("");
  const user = localStorage.getItem("userId")
  const [rating, setRating] = useState(0);
  const [latitude,setLatitude] = useState("")
	const [longitude,setLongitude] = useState("")
  const [reviewLocation, setReviewLocation] = useState("")

  useEffect(()=>{
    getCoordinatesFromLocation()
  },[reviewLocation])

  const getCoordinatesFromLocation = ()=>{
			fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${reviewLocation}`)
			.then((response) => response.json())
			.then((data) => {
			  if (data.length > 0) {
				const firstResult = data[0];
				setLatitude(firstResult.lat)
				setLongitude(firstResult.lon)
				console.log(`Coordenadas para ${reviewLocation}: Latitud ${firstResult.lat}, Longitud ${firstResult.lon}`);
			  } else {
				console.log(`No se encontraron coordenadas para ${reviewLocation}.`);
			  }
			})
			.catch((error) => {
			  console.error("Error al obtener las coordenadas:", error);
			});
	}

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const getImageForCategory = () => {
    switch (selectedCategory) {
      case "activity":
        return "https://cdn.pixabay.com/photo/2016/08/01/20/13/girl-1561989_1280.jpg";
      case "product":
        return "https://cdn.pixabay.com/photo/2017/04/06/11/24/fashion-2208045_1280.jpg";
      case "trip":
        return "https://cdn.pixabay.com/photo/2017/08/03/21/48/drinks-2578446_640.jpg";
      default:
        return "https://cdn.pixabay.com/photo/2020/03/11/14/35/advice-4922319_640.jpg";
    }
  };

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const [imagePreview, setImagePreview] = useState(null);
  const navigate= useNavigate()
  
  const reviewImage = <img src={getImageForCategory()} className="image-create-review" alt="Preview" /> 

  const handleFile = (e) => {
    if (!category) {
      alert('Please select a category before creating a review.');
      return;
    };

    const file = e.target.files[0];

    if (file && file.type !== 'image/jpeg') {
      alert('Only .jpg format is allowed.');
      return;
    }
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);
  
  const handleUpload = async () => {
    let regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = publishing_date.match(regex);
  
    if (!match) {
      alert("Invalid Date Format. Format should be dd/mm/yyyy");
      return;
    }
  
    let day = parseInt(match[1], 10);
    let month = parseInt(match[2], 10);
    let year = parseInt(match[3], 10);
    let validDate = !(month < 1 || month > 12 || day < 1 || day > 31 || (month === 2 && day > 28 + (year % 4 == 0 ? 1 : 0)) || ((month === 4 || month === 6 || month === 9 || month === 11) && day > 30));
  
    if (!validDate) {
      alert('Invalid Date');
      return;
    }
  
    if (!image) {
      alert('Please select an image before uploading.');
      return;
    }
  
    try {
      const imageUrl = await uploadImage(image); 
      sendDataToAPI(imageUrl);
      Swal.fire(
        'Good job!',
        'You have created a Review',
        'success'
    )
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
    fetch(process.env.BACKEND_URL + `api/create-review`, { 
            method: "POST", 
            headers: { 
                "Content-Type": "application/json",
                "Authorization" : "Bearer " + token
            },
            body: JSON.stringify({title, type, description, location, publishing_date, link, price, category, imageCloud:image,user,rating, latitude, longitude}) 
        })
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        })
        }else  {
          alert(' You are not logged in!')
        }
      };

    return (
        <div class="container text-center" id="full-content">
             <h1>Insert Your Review</h1>
            
                <select class="form-select" onChange={(e) => {
                    handleCategoryChange(e);
                    setImagePreview(null); // Limpa a imagem de pré-visualização ao mudar a categoria
                    setCategory(e.target.value)}} aria-label="Default select example">
                    <option selected >Category</option>
                    <option value="activity" >Activities</option>
                    <option value="product" >Products</option>
                    <option value="trip" >Trips</option>
                </select>
            <div class="row" id="row-review">
                    <div class="col-4" id="left-side">
                        {imagePreview ? (
                        <img src={imagePreview} className="image-create-review" alt="Preview" />
                        ) : (
                            reviewImage
                        )}
                        <br/>
                        <label for="imageUpload" class="custom-file-upload">
                          <i class="fa-solid fa-upload"></i> Choose File
                        </label>
                        <input
                          id="imageUpload"
                          type="file"
                          name="imageCloud"
                          accept="image/jpeg"
                          style={{ display: 'none' }} 
                          onChange={handleFile}
                        />
                        <span className="date-title mb-1">Date</span>
                        <div className="form-group mt-1" id="inputs">
                            <input 
                                type="text" 
                                id="publishing_date" 
                                className="review-input"  
                                placeholder="dd/mm/yyyy" 
                                name="publishing_date"
                                value={publishing_date}
                                onChange={(e) => setPublishing_date(e.target.value)}
                                />
                            <p className="little-legends">You won't be able to chage that after</p> 
                        </div>
                        <div className="mt-3 mb-3" id="rating">
                          <h2>Your rating</h2>
                          <div>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                onClick={() => handleStarClick(star)}
                                style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
                              >
                                &#9733;
                              </span>
                            ))}
                          </div>
                        </div>
                    </div>
                    <div class="col-8" id="middle">
                        <div className="form-group" id="inputs">
                            <input 
                                type="text"
                                maxLength={30}
                                maxRows={1}
                                id="title" 
                                className="review-input"  
                                placeholder="Title"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                />  
                        </div>
                        {category === "activity" ? (
                        <div className="form-group" id="inputs">
                          <input 
                              type="text" 
                              id="type" 
                              className="review-input"  
                              name="type"
                              placeholder="family, adventure, romantic, group, relax, other"
                              value={type}
                              onChange={(e) => setType(e.target.value)}
                              />
                        </div> 
                        ) : ("")}
                        {category === "trip" ? (
                          <div className="form-group" id="inputs">
                            <input 
                                type="text" 
                                id="type" 
                                className="review-input"  
                                name="type"
                                placeholder="bar, restaurant, romantic, group, relax, other"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                />
                          </div> 
                        ) : ("")}
                        {category === "product" ? (
                          <div className="form-group" id="inputs">
                            <input 
                                type="text" 
                                id="type" 
                                className="review-input"  
                                name="type"
                                placeholder="clothes, accesories, electronics, sports, automotive, other"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                />
                          </div>
                        ) : (
                          <div className="form-group mb-3" id="inputs">
                            <input
                              type="text" 
                              id="location" 
                              className="review-input"  
                              placeholder="City" 
                              name="location"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                              onBlur={() => setReviewLocation(location)}
                              />
                            <p className="little-legends">You won't be able to change that after</p> 
                          </div>
                        )}
                        
                        <div className="form-group" id="inputs">
                            <input
                                type="text" 
                                id="link" 
                                className="review-input"  
                                placeholder="Link" 
                                name="link"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                />  
                        </div>
                        <div className="form-group" id="inputs">
                          <div className="priceWhithEuro">
                            <input
                                type="text" 
                                id="price" 
                                className="review-input"  
                                name="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value )}
                            />
                            <div className="euro-symbol">€</div>
                          </div>
                        </div>
                        <span className="title mt-2">Description</span>
                        <div className="form-group">
                            <textarea
                                maxLength={375}
                                className="form-control mt-3 mb-2"
                                id="description"
                                placeholder="Enter description..."
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                maxRows={6}
                            />  
                        </div>
                    </div>
        </div>
            <button className="finish-review" onClick={handleUpload}>Finish Review</button>
        </div>
    );
  };