import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from 'react-icons/gi';
import Swal from 'sweetalert2';

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
      /*<nav className="navbar navbar-expand-lg bg-dark">
        <div class="container-fluid d-flex flex-row justify-content-end bg-primary">
          <div className="logo">
            <Link to="/">
              <img className="logo-link" src="https://i.ibb.co/8m2mpN3/0d3b546942f94de196812ac8af0bf4d9-fotor-bg-remover-20230809143940.png" alt="0d3b546942f94de196812ac8af0bf4d9" border="0" />
            </Link>
          </div>
            <button class="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon bg-secondary"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end bg-danger" id="navbarToggler">
              <div className="nav-item" id="item-home">
                <a className="nav-link text-light" href="#" onClick={() => navigate("/")}>
                  Home
                </a>
              </div>
              <div class="dropdown" id="all-button-content">
                <button class="btn dropdown text-light" id="category" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Category
                </button>
                <ul class="dropdown-menu" id="scroll-down">
                  <li>
                    <a className="nav-link text-light" id="scroll-down2" href="#" onClick={() => navigate("/activities")}>
                    Activities
                    </a>
                  </li>
                  <li>
                    <a className="nav-link text-light" id="scroll-down2" href="#" onClick={() => navigate("/products")}>
                    Products
                    </a>
                  </li>
                  <li>
                    <a className="nav-link text-light" id="scroll-down2" href="#" onClick={() => navigate("/trips")}>
                    Trips
                    </a>
                  </li>
                </ul>
              </div>
              {token ? ( 
                <div className="token">
                  <div className="nav-item">
                    <a className="nav-link text-light" href="#" onClick={() => navigate("/user-page")}>
                      User Page
                    </a>
                  </div>
                  <div className="nav-item">
                    <a className="nav-link text-light" href="#" onClick={() => navigate("/create-review")}>
                      Create Review
                    </a>
                  </div>
                  <div className="nav-item">
                    <a className="nav-link text-light" href="#" onClick={logOut}>
                      Logout
                    </a>
                  </div>
                  <div className="btn-group" id="favourites">
                    <button type="button" className="btn-navbar dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside" id="dropdownMenuClickableInside" aria-expanded="false">
                        Favourites <span className="p-1 text-center text-white">{(store.favourite && store.favourite!=null && store.favourite!=undefined)? store.favourite.length:"0"}</span>
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
                  <a className="nav-link text-light" href="#" onClick={() => navigate("/login")}>
                    Login
                  </a>
                </div>
              )}
            </div>
        </div>
      </nav>
  );
};*/

      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid d-flex flex-direction-row justify-content-space-between" id="navbarContainer">          
          <div className="logo d-flex justify-content-start">
            <Link to="/">
              <img className="logo-link" src="https://i.ibb.co/8m2mpN3/0d3b546942f94de196812ac8af0bf4d9-fotor-bg-remover-20230809143940.png" alt="0d3b546942f94de196812ac8af0bf4d9" border="0" />
            </Link>
          </div>
          <button class="navbar-toggler d-flex justify-content-end" type="button" data-bs-toggle="collapse" data-bs-target="#navbarItems" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon bg-secondary text-primary"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarItems">
              <div className="nav-item" id="item-home">
                <a className="nav-link text-light" href="#" onClick={() => navigate("/")}>
                  Home
                </a>
              </div>
              <div class="dropdown" id="all-button-content">
                <button class="btn dropdown text-light" id="category" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Category
                </button>
                <ul class="dropdown-menu" id="scroll-down">
                  <li>
                    <a className="nav-link text-light" id="scroll-down2" href="#" onClick={() => navigate("/activities")}>
                    Activities
                    </a>
                  </li>
                  <li>
                    <a className="nav-link text-light" id="scroll-down2" href="#" onClick={() => navigate("/products")}>
                    Products
                    </a>
                  </li>
                  <li>
                    <a className="nav-link text-light" id="scroll-down2" href="#" onClick={() => navigate("/trips")}>
                    Trips
                    </a>
                  </li>
                </ul>
              </div>
              {token ? ( 
                <div className="token">
                  <div className="nav-item">
                    <a className="nav-link text-light" href="#" onClick={() => navigate("/user-page")}>
                      User Page
                    </a>
                  </div>
                  <div className="nav-item">
                    <a className="nav-link text-light" href="#" onClick={() => navigate("/create-review")}>
                      Create Review
                    </a>
                  </div>
                  <div className="nav-item">
                    <a className="nav-link text-light" href="#" onClick={logOut}>
                      Logout
                    </a>
                  </div>
                  <div className="btn-group" id="favourites">
                    <button type="button" className="btn-navbar dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside" id="dropdownMenuClickableInside" aria-expanded="false">
                        Favourites <span className="p-1 text-center text-white">{(store.favourite && store.favourite!=null && store.favourite!=undefined)? store.favourite.length:"0"}</span>
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
                  <a className="nav-link text-light" href="#" onClick={() => navigate("/login")}>
                    Login
                  </a>
                </div>
              )}
            </div>
        </div>
      </nav>
    );
  };
