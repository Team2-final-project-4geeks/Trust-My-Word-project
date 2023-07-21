import React from "react";

const CreateAcount = () =>{
    const create_user = () =>{
        if(email === '') {
            alert(' Email is Empty!')
        } else if(password === ''){
            alert('Password is empty!')
        } else {
            fetch(`https://edijavier99-improved-space-memory-44xjjwqqpvgcq99g-3001.preview.app.github.dev/api/create-user`, { 
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }) 
        })
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        })
        }
    }
    return(
        <div class="container-fluid">
        <div class="row d-flex justify-content-center align-items-center vh-100">
            <div class="col-5">
                <div class="card mb-3">
                    <div class="row g-0 d-flex justify-content-center align-items-center">
                        <div class="col-md-10 d-flex justify-content-center align-items-center flex-column mt-5">
                            <h1 className="mb-3">CREATE ACCOUNT</h1>
                            <p className="text-center">Create an account to join our comunity and share your experiences</p>
                            <div className="input-board">
                                <i class="fa-solid fa-user me-3"></i>
                                <input type="text" id="username" className="p-3 col-10 register-input" placeholder="Username" name="username"/><br/><br/>
                            </div>
                            <div className="input-board mt-3">
                                <i class="fa-solid fa-at me-3"></i>
                                <input type="text" id="email" className="p-3 col-10 register-input"  placeholder="Email" name="email"/><br/><br/>
                            </div>
                            <div className="input-board mt-3">
                                <i class="fa-solid fa-key me-3"></i>
                                <input type="text" id="password" className="p-3 col-10 register-input"  placeholder="Password" name="password"/><br/><br/>
                            </div>
                            <button type="submit" className="btn btn-success mt-4">SUBMIT</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default CreateAcount