import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/footer.css";

export const Footer = () => {

	const navigate =  useNavigate()
	
	return (
		<div className="footer bg-black d-flex flex-column">
			<footer className="mt-auto">
				<ul className="nav justify-content-center border-bottom">
					<li className="nav-item px-3">
						<a className="nav-link text-warning" href="#" onClick={() => navigate("/")}>Home </a>
					</li>
					<li className="nav-item px-3">
						<a className="nav-link text-warning" href="#" onClick={() => navigate("/privacy-policy")}>Privacy Policy </a>	
					</li>
					<li className="nav-item px-3">
						<a className="nav-link text-warning" href="#" onClick={() => navigate("/termsServices")}>Terms & Services </a>
					</li>
				</ul>
				<div className="b-example-divider my-1"></div>
					<p className="text-center text-warning">&copy; 2023 4Geeks Academy</p>		
			</footer>
		</div>
	)
};
