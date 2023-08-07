import React, { useState } from "react";
import { cloudinary } from "cloudinary-core";
import "../../styles/reviewform.css";

export const ReviewForm = () => {
  const presetKey = "dumn5jgp";
  const cloudName = "dbxeaqsv4"; 
  const [imageCloud, setImageCloud] = useState("https://fastly.picsum.photos/id/163/2000/1333.jpg?hmac=htdHeSJwlYOxS8b0TTpz2s8tD_QDlmsd3JHYa_HGrg8");
  const [title, setTitle] = useState("")
  const [type, setType] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [publishing_date, setPublishing_date] = useState("")
  const [link, setLink] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")

  const reviewImage = <img src="https://fastly.picsum.photos/id/163/2000/1333.jpg?hmac=htdHeSJwlYOxS8b0TTpz2s8tD_QDlmsd3JHYa_HGrg8" style={{width:'80%', height:'80%'}} class="img-fluid rounded-start" alt="..." /> 

  const handleFile = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  

  const handleUpload = () => {
    let regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = publishing_date.match(regex)
    if(match) {
        let day = parseInt(match[1], 10);
        let month = parseInt(match[2], 10);
        let year = parseInt(match[3], 10);
        let validDate = !(month < 1 || month > 12 || day < 1 || day > 31 || (month === 2 && day > 28 + (year % 4 == 0 ? 1 : 0)) || ((month === 4 || month === 6 || month === 9 || month === 11) && day > 30));
        if(validDate) {
            uploadImage(image);
            setTimeout(() => sendDataToAPI(), 5000)
            console.log(imageCloud)
        } else {
            console.log("Invalid Date");
            alert("Invalid Date Format. Format should be dd/mm/yyyy")
        }
    } else {
        alert("Invalid Date Format. Format should be dd/mm/yyyy");
    }  
  };

  const uploadImage = (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", presetKey);

    fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setImageCloud(data.secure_url)
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const sendDataToAPI = () => {

    fetch(process.env.BACKEND_URL + `/api/create-review`, { 
            method: "POST", 
            headers: { 
                "Content-Type": "application/json",
            },
            body: JSON.stringify({title, type, description, location, publishing_date, link, price, imageCloud}) 
        })
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        })
        }
    
    return (

            <div class="container-fluid login-card">
               <h1 className="mb-5 d-flex justify-content-center align-items-center">INSERT YOUR REVIEW </h1>
                        <div class="row-review d-flex justify-content-center">
                            <div class="col-10">
                                <div class="card-review mb-3">
                                    <div class="row-inputs g-0 d-flex justify-content-center">
                                        <div class="col-md-4 mt-5 img-board">
                                            <div className="review-image">
                                            {reviewImage}
                                            {image && typeof image === "string" && (
                                            <img src={image} style={{width:'80%', height:'80%'}} class="img-fluid rounded-start" alt="..." />
                                            )}
                                            <br/>
                                            <input type="file" name="imageCloud" onChange={handleFile} />
                                            </div>
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-center align-items-center flex-column">
                                                <select class="form-select" aria-label="Default select example">
                                                    <option selected>Category</option>
                                                    <option value="1">Activities</option>
                                                    <option value="2">Products</option>
                                                    <option value="3">Trips</option>
                                                </select>
                                            <div className="input-board mt-3">                                     
                                                <input 
                                                    type="text" 
                                                    id="title" 
                                                    className="p-1 col-12 review-input"  
                                                    placeholder="Title" 
                                                    name="title"
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                    />                               
                                            </div>
                                            <div className="input-board mt-3">
                                                <input 
                                                    type="text" 
                                                    id="type" 
                                                    className="p-1 col-12 review-input"  
                                                    name="type"
                                                    placeholder="Family, Adveture, Relax..."
                                                    value={type}
                                                    onChange={(e) => setType(e.target.value)}
                                                    />                               
                                            </div>
                                            <div className="input-board mt-3">
                                                <input 
                                                    type="text" 
                                                    id="description" 
                                                    className="p-1 col-12 review-input"  
                                                    placeholder="Description" 
                                                    name="description"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    />                               
                                            </div>
                                            <div className="input-board mt-3">
                                                <input 
                                                    type="text" 
                                                    id="location" 
                                                    className="p-1 col-12 review-input"  
                                                    placeholder="City" 
                                                    name="location"
                                                    value={location}
                                                    onChange={(e) => setLocation(e.target.value)}
                                                    />                               
                                            </div>
                                            <div className="input-board mt-3">
                                                <input 
                                                    type="text" 
                                                    id="publishing_date" 
                                                    className="p-1 col-12 review-input"  
                                                    placeholder="dd/mm/yyyy" 
                                                    name="publishing_date"
                                                    value={publishing_date}
                                                    onChange={(e) => setPublishing_date(e.target.value)}
                                                    />                               
                                            </div>
                                            <div className="input-board mt-3">
                                                <input 
                                                    type="text" 
                                                    id="link" 
                                                    className="p-1 col-12 review-input"  
                                                    placeholder="Link" 
                                                    name="link"
                                                    value={link}
                                                    onChange={(e) => setLink(e.target.value)}
                                                    />                               
                                            </div>
                                            <div className="input-board mt-3">
                                                <input 
                                                    type="text" 
                                                    id="price" 
                                                    className="p-1 col-12 review-input"  
                                                    placeholder=" €€€" 
                                                    name="price"
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                    />                               
                                            </div>
                                            <div>
                                                <button onClick={handleUpload}>Subir a Cloudinary y enviar a la API</button>
                                            </div> 
                                            <br/>                                
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    );
  };