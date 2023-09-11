import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from 'react-icons/gi';
import Swal from 'sweetalert2';
import ThemeSwitcher from "./themechanger";
import "../../styles/navbar.css";

import "../../styles/navbar.css";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const localUserId = localStorage.getItem("userId")
  const token = localStorage.getItem("jwt-token")
  const [favouritesUpdated, setFavouritesUpdated] = useState(0);

	const logOut = () => {
		localStorage.removeItem('jwt-token');
		localStorage.removeItem('userId')
    actions.setLoggedIn(false)
		navigate("/");
		alert("You are Logged Out")
	}
 
	useEffect(() => {		
		actions.getUser(localStorage.getItem("userId"))
	}, []);

  useEffect(() => {
    if (localUserId) {
      actions.getUser(localUserId);
    }
  }, [localUserId]);

  useEffect(() => {
    setFavouritesUpdated(favouritesUpdated + 1);
  }, [store.favourite]); 


  return (
      <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation" >
          <span class="navbar-toggler-icon" id="hamburguer">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
          </span>
        </button>
        <a class="navbar-brand" href="/"><img src="https://i.ibb.co/8m2mpN3/0d3b546942f94de196812ac8af0bf4d9-fotor-bg-remover-20230809143940.png" alt="0d3b546942f94de196812ac8af0bf4d9" border="0" id="imageBrand" /></a>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul class="navbar-nav me-auto mt-0 mb-2 mb-lg-0" id="navbarContent">
            <li class="nav-item">
              <a class="nav-link active text-warning" aria-current="page" href="/">Home</a>
            </li>
            <li class="nav-item text-warning mx-4">
              <ThemeSwitcher/>
            </li>
            <li class="nav-item" id="category-dropdown">
              <button class="btn dropdown text-warning" id="category" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Category
              </button>
                <ul class="dropdown-menu" id="scroll-down">
                  <li>
                    <a className="nav-link text-warning" id="scroll-down2" href="#" onClick={() => navigate("/activities")}>
                    Activities
                    </a>
                  </li>
                  <li>
                    <a className="nav-link text-warning" id="scroll-down2" href="#" onClick={() => navigate("/products")}>
                    Products
                    </a>
                  </li>
                  <li>
                    <a className="nav-link text-warning" id="scroll-down2" href="#" onClick={() => navigate("/trips")}>
                    Trips
                    </a>
                  </li>
                </ul>
            </li>
            <li class="nav-item" id="userNavbar">
              {token ? ( 
                  <div className="token">
                    <div className="nav-item">
                      <a className="nav-link text-warning" href="#" onClick={() => navigate("/user-page")}>
                        User Page
                      </a>
                    </div>
                    <div className="nav-item">
                      <a className="nav-link text-warning" href="#" onClick={() => navigate("/create-review")}>
                        Create Review
                      </a>
                    </div>
                    <div className="nav-item">
                      <a className="nav-link text-warning" href="#" onClick={logOut}>
                        Logout
                      </a>
                    </div>
                    <div className="btn-group" id="favourites">
                      <button type="button" className="btn-navbar dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside" id="dropdownMenuClickableInside" aria-expanded="false">
                          Favourites <span className="p-1 text-center text-warning">{(store.favourite && store.favourite!=null && store.favourite!=undefined)? store.favourite.length:"0"}</span>
                      </button>
                      {store.favourite && store.favourite.length > 0 ? (
                          <ul className="dropdown-menu dropdown-menu-lg-end" aria-labelledby="dropdownMenuClickableInside">
                              {store.favourite.map((fav, index) => {
                                  return (
                                      <li key={index} id="favourites-list">
                                          <a className="dropdown-item d-flex" id="dropdown-favourites" onClick={() => {
                                            navigate(`/${fav.category}/${fav.id}`)
                                          }}>
                                              {fav.title}
                                          </a>
                                          <i
                                                  className="fas fa-trash" id="delete-favourite"
                                                  onClick={() => {
                                                      actions.deleteFavourite(fav);
                                                      actions.addUserFavourites(localUserId);
                                                  }}
                                              ></i>
                                      </li>
                                  );
                              })}
                          </ul>
                      ) : (
                        ""
                      )}
                  </div>
                  </div>
                ) : (
                  <div className="nav-item">
                    <a className="nav-link text-warning" href="#" onClick={() => navigate("/login")}>
                      Login
                    </a>
                  </div>
                  )}
            </li>
          </ul>
        </div>
      </div>
      </nav>
          );
        };