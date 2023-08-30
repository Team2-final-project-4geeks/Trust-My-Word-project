import React, { useState,useContext } from "react";
import "../../styles/login.css";
import { useNavigate } from "react-router-dom";
import { Context} from "../store/appContext";
import createUser from "../../img/createUser.jpg";


const Login = () =>{
    const {store,actions} = useContext(Context)
    const [loginEmail,setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const navigate = useNavigate()
    const [showLogin, setShowLogin] = useState(true);
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username,setUsername] = useState("") 
    

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleCreateClick = () => {
        setShowLogin(false);
    };

    const create_user = () =>{
        if(email === '') {
            alert(' Email is Empty!')
        } else if(password === ''){
            alert('Password is empty!')
        } else if ( username === " "){
            alert("username empty")
        } else {
            fetch(process.env.BACKEND_URL + 'api/create-user', { 
            method: "POST", 
            headers: { 
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, username }) 
        })
        .then((res) => res.json())
        .then((result) => {
            console.log("you create user");
            console.log(result);
        }).catch((err) => {
            console.log(err);
        })
        }
    }

    const user_login = () =>{
			if(loginEmail ==='') {
				alert(' Email is Empty!')
			} else if(loginPassword === ''){
				alert('Password is empty!')
			} else {
				fetch( process.env.BACKEND_URL + `api/login`, { 
				method: "POST",
				headers: { 
					"Content-Type": "application/json",
				},
				body: JSON.stringify({loginEmail,loginPassword }) 
			})
			.then((res) => res.json())
			.then((result) => {
				localStorage.setItem("jwt-token", result.token);
                localStorage.setItem("userId",result.user_id)
                actions.addUsername(result.username)
                localStorage.setItem("username",result.username)
                actions.getUser(localStorage.getItem("userId"))
			}).catch((err) => {
				console.log(err);
			})
		}
    }
    return(
            <div className="general-container">
            <div className="row">
                <div className={showLogin ? "col-md-6" : "col-md-6 order-md-2"}>
                    {showLogin ? (
                        <div className="half-content bg-danger">
                            <img
                                src="https://cdn.pixabay.com/photo/2019/09/11/00/15/mountain-4467569_960_720.png"
                                alt=" Login image"
                                className="img-fluid"
                            />
                        </div>
                    ) : (
                        <div className="half-content ">
                            <img
                                src={createUser}
                                alt="Create Account image"
                                className="img-fluid"
                            />
                        </div>
                    )}
                </div>
                <div className={showLogin ? "col-md-6" : "col-md-6 order-md-1"}>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      
                        <div className="row g-0 d-flex justify-content-center align-items-center mt-4">
                            {showLogin ? (
                                <>
                               
                                <div class="col-md-12 d-flex justify-content-center align-items-center flex-column" id="login">
                                <h3 className="mb-5">TRUST MY WORD</h3>
                                <div className="input-board">
                                    <i class="fa-solid fa-user me-3"></i>
                                    <input
                                        type="text" 
                                        id="email" 
                                        className="p-3 col-10 login-input" 
                                        placeholder="Email" 
                                        name="email"
                                        value={loginEmail}
                                        onChange={(e)=>{setLoginEmail(e.target.value)}}
                                        /><br/><br/>
                                </div>
                                <div className="input-board mt-3">
                                    <i class="fa-solid fa-key me-3"></i>
                                    <input
                                        type="password" 
                                        id="password" 
                                        className="p-3 col-10 login-input"  
                                        placeholder="Password" 
                                        name="password"
                                        value={loginPassword}
                                        onChange={(e)=>{
                                            setLoginPassword(e.target.value)
                                        }}
                                        /><br/><br/>
                                </div>
                                <button type="submit" className="btn btn-warning mt-4" 
                                onClick={()=>{
                                    user_login()
                                }}>Login</button>
                                <div className="d-flex flex-row mt-3">
                                    <a href="/" className="me-5 text-muted"><small>Forgot password?</small></a>
                                    <a onClick={handleCreateClick} className="me-5 text-muted"><small>Create Account</small></a>
                                </div>
                                <br/>
                            </div>
                              
                            </>
                                
                            ) : (
                                <>
                            <div class="row g-0 d-flex justify-content-center align-items-center">
                        <div class="col-md-10 d-flex justify-content-center align-items-center flex-column ">
                            <h1 className="mb-3">CREATE ACCOUNT</h1>
                            <p className="text-center">Create an account to join our comunity and share your experiences</p>
                            <div className="input-board">
                                <i class="fa-solid fa-user me-3"></i>
                                <input 
                                    type="text" 
                                    id="username" 
                                    className="p-3 col-10 register-input" 
                                    placeholder="Username" 
                                    name="username"
                                    value={username}
                                    onChange={(e)=>{setUsername(e.target.value)}}
                                    /><br/><br/>
                            </div>
                            <div className="input-board mt-3">
                                <i class="fa-solid fa-at me-3"></i>
                                <input 
                                    type="text" 
                                    id="email" 
                                    className="p-3 col-10 register-input"  
                                    placeholder="Email" 
                                    name="email"
                                    value={email}
                                    onChange={(e)=>{setEmail(e.target.value)}}
                                    /><br/><br/>
                            </div>
                            <div className="input-board mt-3">
                                <i class="fa-solid fa-key me-3"></i>
                                <input 
                                    type="password" 
                                    id="password" 
                                    className="p-3 col-10 register-input"  
                                    placeholder="Password" 
                                    name="password"
                                    value={password}
                                    onChange={(e)=>{setPassword(e.target.value)}}
                                    /><br/><br/>
                            </div>
                            <div id="btn-container-login" className="d-flex flex-row ">
                                <button 
                                    type="submit" 
                                    className="btn btn-warning mt-4" 
                                    onClick={()=>{ create_user()
                                        handleLoginClick()
                                    }}
                                >SUBMIT</button>
                            </div>
                            
                        </div>
                    </div>     
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    )
}

export default Login
