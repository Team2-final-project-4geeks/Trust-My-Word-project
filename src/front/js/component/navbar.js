import React, {useContext} from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

import "../../styles/navbar.css";

export const Navbar = () => {

	const {store, actions} = useContext(Context);
	const navigate =  useNavigate()

	useEffect(() => {
		const storedFavourites = JSON.parse(localStorage.getItem("favourites"));
		if (storedFavourites) {
		  actions.AddFavourites(storedFavourites);
		}
	  }, []);

	useEffect(() => {
		localStorage.setItem("favourites", JSON.stringify(store.favourite));
	}, [store.favourite]);
	
	
    return (
        <nav className="navbar container-fluid">
				<Link to="/">
					<img src="https://sd.keepcalms.com/i/keep-calm-and-trust-my-words.png" width="150" alt="..." height="80" bg="light" className="d-inline-block align-text-top"/>                  
                </Link>		
			<div class="navbar-items">
					<ul class="d-flex align-items-endv">
					<li class="nav-item">
							<a class="nav-link" href="#" onClick={() => navigate("/")}>Home</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#" onClick={() => navigate("/create-user")}>Create User </a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#" onClick={() => navigate("/login")}>Login</a>
						</li>	
						<li class="nav-item">
							<a class="nav-link" href="#" onClick={() => navigate("/trips")}>Trips</a>
						</li>	
						<li class="nav-item">
							<a class="nav-link" href="#" onClick={() => navigate("/activities")}>Activities</a>
						</li>	
						<li class="nav-item">
							<a class="nav-link" href="#" onClick={() => navigate("/products")}>Products</a>
						</li>				
						<div className="btn-group mx-5">
							<button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside" id="dropdownMenuClickableInside" aria-expanded="false">
								Favourites <span className="p-1 text-secondary text-center text-white">{store.favourite.length}</span>
							</button>
							<ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start" aria-labelledby="dropdownMenuClickableInside">
								{store.favourite.map((fav, index) => {
									return(
										<li key={index}>
											<a className="dropdown-item d-flex justify-content-between ps-2 pe-2" href="#">
												{fav}
												<i className="fas fa-trash pt-1"
													onClick={() => {
														actions.deleteFavourite(fav)
													}}
												></i>
											</a>
										</li>
									)})}
							</ul>
						</div>				
					</ul>			
				<br/>			
			</div>			
        </nav>
    )
}