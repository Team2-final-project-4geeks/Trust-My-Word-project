import React, { useState, useEffect } from "react";
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
  const [category, setCategory] = useState("")

  const [imagePreview, setImagePreview] = useState(null);

  const reviewImage = <img src="https://fastly.picsum.photos/id/163/2000/1333.jpg?hmac=htdHeSJwlYOxS8b0TTpz2s8tD_QDlmsd3JHYa_HGrg8" class="image-create-review" alt="..." /> 

  const handleFile = (e) => {
    const file = e.target.files[0];
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
            alert("You have created a Review")
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

    fetch(process.env.BACKEND_URL + 'api/create-review', { 
            method: "POST", 
            headers: { 
                "Content-Type": "application/json",
            },
            body: JSON.stringify({title, type, description, location, publishing_date, link, price, category, imageCloud}) 
        })
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        })
        }
    
    return (
        <div class="container text-center">
            <div class="row" id="row-review">
                <h1>Insert Your Review</h1>
                <select class="form-select" onChange={(e) => setCategory(e.target.value)} aria-label="Default select example">
                    <option selected >Category</option>
                    <option value="activity" >Activities</option>
                    <option value="product" >Products</option>
                    <option value="trip" >Trips</option>
                </select>
                    <div class="col" id="left-side">
                        {imagePreview ? (
                        <img src={imagePreview} className="image-create-review" alt="Preview" />
                        ) : (
                            reviewImage
                        )}
                        <br/>
                        <input className="photo-uploader" type="file" name="imageCloud" onChange={handleFile} />
                    </div>
                    <div class="col" id="middle">
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input 
                                type="text" 
                                id="title" 
                                className="review-input"  
                                placeholder="Title"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                />  
                        </div>
                        <div className="form-group">
                            <label htmlFor="type">Type</label>
                            <input 
                                type="text" 
                                id="type" 
                                className="review-input"  
                                name="type"
                                placeholder="Family, Adveture, Relax..."
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                /> 
                        </div>
                        <div className="form-group">
                            <label htmlFor="type">Location</label>
                            <input
                                type="text" 
                                id="location" 
                                className="review-input"  
                                placeholder="City" 
                                name="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                /> 
                        </div>
                        <div className="form-group">
                            <label htmlFor="type">Link</label>
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
                        <div className="form-group">
                            <label htmlFor="type">Price</label>
                            <input
                                type="text" 
                                id="price" 
                                className="review-input"  
                                placeholder=" €€€" 
                                name="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                /> 
                        </div>
                    </div>
                    <div class="col" id="right-side">
                        <div className="form-group">
                            <label htmlFor="type">Descrition</label>
                            <textarea
                                className="form-control"
                                id="description"
                                placeholder="Enter description..."
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                rows={6}
                            />  
                        </div>
                        <div className="form-group">
                            <label htmlFor="type">Date</label>
                            <input 
                                type="text" 
                                id="publishing_date" 
                                className="review-input"  
                                placeholder="dd/mm/yyyy" 
                                name="publishing_date"
                                value={publishing_date}
                                onChange={(e) => setPublishing_date(e.target.value)}
                                />   
                        </div>
                    </div>
                    <button className="finish-review" onClick={handleUpload}>Finish Review</button>
            </div>
        </div>

            /*<div className="review-form">
            <h1>Insert Your Review</h1>
            <select class="form-select" onChange={(e) => setCategory(e.target.value)} aria-label="Default select example">
                <option selected >Category</option>
                <option value="activity" >Activities</option>
                <option value="product" >Products</option>
                <option value="trip" >Trips</option>
            </select>
            <form>
            <div className="image-section">
                <div>
                    {imagePreview ? (
                    <img src={imagePreview} className="image-create-review" alt="Preview" />
                    ) : (
                        reviewImage
                    )}
                    <br/>
                    <input className="photo-uploader" type="file" name="imageCloud" onChange={handleFile} />
                </div>
                <div>
                    <button className="finish-review" onClick={handleUpload}>Finish Review</button>
                </div> 
            </div>
                <div className="inputs-section">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input 
                        type="text" 
                        id="title" 
                        className="review-input"  
                        placeholder="Title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        />  
                </div>
                <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <input 
                        type="text" 
                        id="type" 
                        className="review-input"  
                        name="type"
                        placeholder="Family, Adveture, Relax..."
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        /> 
                </div>
                <div className="form-group">
                    <label htmlFor="type">Location</label>
                    <input
                        type="text" 
                        id="location" 
                        className="review-input"  
                        placeholder="City" 
                        name="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        /> 
                </div>
                <div className="form-group">
                    <label htmlFor="type">Descrition</label>
                    <textarea
                        className="form-control"
                        id="description"
                        placeholder="Enter description..."
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        rows={6}
                    />  
                </div>
                <div className="form-group">
                    <label htmlFor="type">Date</label>
                    <input 
                        type="text" 
                        id="publishing_date" 
                        className="review-input"  
                        placeholder="dd/mm/yyyy" 
                        name="publishing_date"
                        value={publishing_date}
                        onChange={(e) => setPublishing_date(e.target.value)}
                        />   
                </div>
                <div className="form-group">
                    <label htmlFor="type">Link</label>
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
                <div className="form-group">
                    <label htmlFor="type">Price</label>
                    <input
                        type="text" 
                        id="price" 
                        className="review-input"  
                        placeholder=" €€€" 
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        /> 
                </div>
                </div>
        </form>
      </div>
      a partir  de aqui era el nuevo
           <div class="review-content">
          
               <h1 className="title">INSERT YOUR REVIEW </h1>
                    <select class="form-select" onChange={(e) => setCategory(e.target.value)} aria-label="Default select example">
                        <option selected >Category</option>
                        <option value="activity" >Activities</option>
                        <option value="product" >Products</option>
                        <option value="trip" >Trips</option>
                    </select>
                        <div class="row-review">
                                <div class="inputs-content col-10">
                                        <div class="left-side col-3">
                                            <div className="review-image">
                                                {imagePreview ? (
                                                <img src={imagePreview} className="image-create-review" alt="Preview" />
                                                ) : (
                                                    reviewImage
                                                )}
                                                <br/>
                                                <input className="photo-uploader" type="file" name="imageCloud" onChange={handleFile} />
                                            </div>
                                        </div>
                                        <div class="middle col-4"> 
                                            <div className="input-board mt-2" id="inputs-review">                            
                                                <h3>Title</h3><div className="input-board mb-3" id="inputs-review">                                 
                                                <input 
                                                    type="text" 
                                                    id="title" 
                                                    className="review-input"  
                                                    placeholder="Title"
                                                    name="title"
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                    />                               
                                            </div>
                                                <h4>Type</h4>
                                            <div className="input-board mt-2" id="inputs-review">
                                                <input 
                                                    type="text" 
                                                    id="type" 
                                                    className="review-input"  
                                                    name="type"
                                                    placeholder="Family, Adveture, Relax..."
                                                    value={type}
                                                    onChange={(e) => setType(e.target.value)}
                                                    />                               
                                            </div>
                                            <div className="input-board mt-3" id="inputs-review">
                                                <h4 className="location p-2" >City</h4>
                                                <input 
                                                    type="text" 
                                                    id="location" 
                                                    className="review-input"  
                                                    placeholder="City" 
                                                    name="location"
                                                    value={location}
                                                    onChange={(e) => setLocation(e.target.value)}
                                                    />                               
                                            </div>
                                            <div className="input-board mt-3" id="inputs-review">
                                                <h4 className="date p-2">Date</h4>
                                                <input 
                                                    type="text" 
                                                    id="publishing_date" 
                                                    className="review-input"  
                                                    placeholder="dd/mm/yyyy" 
                                                    name="publishing_date"
                                                    value={publishing_date}
                                                    onChange={(e) => setPublishing_date(e.target.value)}
                                                    />                               
                                            </div>
                                                <h4>Link</h4>
                                            <div className="input-board mt-3" id="inputs-review">
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
                                            <div className="input-board mt-3" id="inputs-review">
                                                <h4 className="price p-2">Price</h4>
                                                <input 
                                                    type="text" 
                                                    id="price" 
                                                    className="review-input"  
                                                    placeholder=" €€€" 
                                                    name="price"
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                    />                               
                                            </div>
                                        </div>
                                        <div class="middle col-4"> 
                                            <h2 className="description mb-1">Description</h2>
                                            <div className="input-board mt-0" id="input-description">
                                                <textarea
                                                    className="form-control"
                                                    id="description"
                                                    placeholder="Enter description..."
                                                    value={description}
                                                    onChange={e => setDescription(e.target.value)}
                                                    rows={6}
                                                />              
                                            </div>
                                            <div>
                                                <button className="finish-review" onClick={handleUpload}>Finish Review</button>
                                            </div> 
                                        </div>
                                            <br/>                                
                                    </div>
                            </div>
                        </div>
                                                </div>*/
    );
  };