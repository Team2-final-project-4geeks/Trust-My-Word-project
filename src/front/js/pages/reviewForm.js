import React, { useState } from "react";
import "../../styles/home.css";
import { cloudinary } from "cloudinary-core";

export const ReviewForm = () => {
  const presetKey = "dumn5jgp"; // Reemplaza con tu upload_preset de Cloudinary
  const cloudName = "dbxeaqsv4"; // Reemplaza con tu cloud_name de Cloudinary
  const [image, setImage] = useState("");
  const [data, setData] = useState({
    title: "",
    type: "",
    description: "",
    location: "",
    publishing_date: "",
    link: "",
    price: "",
  });
  const reviewImage = <img src="https://fastly.picsum.photos/id/163/2000/1333.jpg?hmac=htdHeSJwlYOxS8b0TTpz2s8tD_QDlmsd3JHYa_HGrg8" style={{width:'80%', height:'80%'}} class="img-fluid rounded-start" alt="..." /> 

  const handleFile = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleUpload = () => {
      uploadImage(image);
      sendDataToAPI(data);
  
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
        const imageUrl = data;
        setImage(imageUrl); // Actualizamos el estado de "image" con la URL de la imagen cargada en Cloudinary
        // Ahora, también podemos enviar los otros datos a tu API
        sendDataToAPI({ ...formData, image: imageUrl });
      })
      .catch((error) => {
        console.error("Error al cargar la imagen en Cloudinary:", error.message);
      });
  };
  
  const sendDataToAPI = (data) => {
    console.log("comienza la funcion", data);

    fetch(`https://upgraded-train-66jpxqv6q4jfx46w-3001.app.github.dev/api/create-review`, { 
            method: "POST", 
            headers: { 
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data) 
        })
        .then((res) => res.json())
        .then((result) => {
            console.log("you create a review");
            console.log(result);
        }).catch((err) => {
            console.log(err);
        })
        }
    

    return (

            <div class="container-fluid login-card">
               <h1 className="mb-5 d-flex justify-content-center align-items-center">INSERT YOUR REVIEW </h1>
                        <div class="row d-flex justify-content-center align-items-center vh-100">
                            <div class="col-10">
                                <div class="card mb-3">
                                    <div class="row g-0 d-flex justify-content-center align-items-center">
                                        <div class="col-md-4 img-board">
                                            <div>
                                                <input type="file" name="image" onChange={handleFile} />
                                            </div>
                                            {reviewImage}
                                            {image && typeof image === "string" && (
                                            <img src={image} style={{width:'80%', height:'80%'}} class="img-fluid rounded-start" alt="..." />
                                            )}
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-center align-items-center flex-column">
                                            <div className="input-board mt-3">
                                                <input 
                                                    type="text" 
                                                    id="title" 
                                                    className="p-1 col-12 review-input"  
                                                    placeholder="Title" 
                                                    name="title"
                                                    value={data.title}
                                                    onChange={handleInputChange}
                                                    />                               
                                            </div>
                                            <div className="input-board mt-3">
                                                <input 
                                                    type="text" 
                                                    id="type" 
                                                    className="p-1 col-12 review-input"  
                                                    name="type"
                                                    placeholder="Type"
                                                    value={data.type}
                                                    onChange={handleInputChange}
                                                    />                               
                                            </div>
                                            <div className="input-board mt-3">
                                                <input 
                                                    type="text" 
                                                    id="description" 
                                                    className="p-1 col-12 review-input"  
                                                    placeholder="Description" 
                                                    name="description"
                                                    value={data.description}
                                                    onChange={handleInputChange}
                                                    />                               
                                            </div>
                                            <div className="input-board mt-3">
                                                <input 
                                                    type="text" 
                                                    id="location" 
                                                    className="p-1 col-12 review-input"  
                                                    placeholder="Location" 
                                                    name="location"
                                                    value={data.location}
                                                    onChange={handleInputChange}
                                                    />                               
                                            </div>
                                            <div className="input-board mt-3">
                                                <input 
                                                    type="text" 
                                                    id="publishing_date" 
                                                    className="p-1 col-12 review-input"  
                                                    placeholder="dd-mm-yyyy" 
                                                    name="publishing_date"
                                                    value={data.publishing_date}
                                                    onChange={handleInputChange}
                                                    />                               
                                            </div>
                                            <div className="input-board mt-3">
                                                <input 
                                                    type="text" 
                                                    id="link" 
                                                    className="p-1 col-12 review-input"  
                                                    placeholder="Link" 
                                                    name="link"
                                                    value={data.link}
                                                    onChange={handleInputChange}
                                                    />                               
                                            </div>
                                            <div className="input-board mt-3">
                                                <input 
                                                    type="text" 
                                                    id="price" 
                                                    className="p-1 col-12 review-input"  
                                                    placeholder="Price" 
                                                    name="price"
                                                    value={data.price}
                                                    onChange={handleInputChange}
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