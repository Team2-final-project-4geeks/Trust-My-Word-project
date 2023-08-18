import React, { useState,useContext } from "react";
import "../../styles/login.css";
import { useNavigate } from "react-router-dom";
import { Context} from "../store/appContext";


const Login = () =>{
    const {store,actions} = useContext(Context)
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [showHello, setShowHello] = useState(false);
    const handleClick = () => setShowHello(!showHello);

    const user_login = () =>{
			if(email ==='') {
				alert(' Email is Empty!')
			} else if(password === ''){
				alert('Password is empty!')
			} else {
				fetch( process.env.BACKEND_URL + `api/login`, { 
				method: "POST",
				headers: { 
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }) 
			})
			.then((res) => res.json())
			.then((result) => {
				localStorage.setItem("jwt-token", result.token);
                localStorage.setItem("userId",result.user_id)
                actions.addUsername(result.username)
                actions.getUser(localStorage.getItem("userId"))
				navigate("/")
			}).catch((err) => {
				console.log(err);
			})
			}
    }
    return(
        <div class="container-fluid login-card">
            <div class="row d-flex justify-content-center align-items-center vh-100">
                <div class="col-10">
                    <div class="card mb-3">
                        <div class="row g-0 d-flex justify-content-center align-items-center">
                            <div class="col-md-6 img-board">
                                <img src="https://cdn.pixabay.com/photo/2019/09/11/00/15/mountain-4467569_960_720.png" style={{width:'100%', height:'100%'}} class="img-fluid rounded-start" alt="..."/>
                            </div>
                            <div class="col-md-6 d-flex justify-content-center align-items-center flex-column">
                                <h1 className="mb-5">TRUST MY WORD</h1>
                                <div className="input-board">
                                    <i class="fa-solid fa-user me-3"></i>
                                    <input 
                                        type="text" 
                                        id="email" 
                                        className="p-3 col-10 login-input" 
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
                                        className="p-3 col-10 login-input"  
                                        placeholder="Password" 
                                        name="password"
                                        value={password}
                                        onChange={(e)=>{
                                            setPassword(e.target.value)
                                        }}
                                        /><br/><br/>
                                </div>
                                <button type="submit" className="btn btn-warning mt-4" 
                                onClick={()=>{
                                    user_login()
                                   
                                }}>Login</button>
                                <div className="d-flex flex-row mt-3">
                                    <a href="/" className="me-5 text-muted"><small>Forgot password?</small></a>
                                    <a href="/create-user"><small>Register now</small></a>
                                </div>
                                <br/>                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-4">
            <div className="row">
                <div className="col-6" onClick={handleClick}>
                    {showHello ? 'Adios' : 'Hola'}
                </div>
                <div className="col-6">
                    {showHello ? (
                       
                            <div className="half-content">
                                <img
                                    src="https://picsum.photos/id/295/600/380"
                                    alt="Foto Adios"
                                    className="img-fluid"
                                />
                            </div>
                       
                    ) : (
                        <div className="half-container">
                            <div className="half-content">
                            <img
                                    src="https://picsum.photos/id/233/600/380"
                                    alt="Foto Hola"
                                    className="img-fluid"
                                />
                            </div>
                            
                                
                            
                        </div>
                    )}
                </div>
            </div>
        </div>
        </div>
    )
}

export default Login
