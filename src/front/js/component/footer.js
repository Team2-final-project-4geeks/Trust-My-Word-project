import React, { Component } from "react";
import { useNavigate } from "react-router-dom";


export const Footer = () => {

	const navigate =  useNavigate()
	
	return (
		<div class="footer bg-black">
			<footer class="py-3 my-4">
				<ul class="nav justify-content-center border-bottom pb-3 mb-3">
					<li class="nav-item p-3">
						<a class="nav-link text-light" href="#" onClick={() => navigate("/")}>Home </a>
					</li>
					<li class="nav-item p-3">
						<a class="nav-link text-light" href="#" onClick={() => navigate("/privacy-policy")}>Privacy Policy </a>	
					</li>
					<li class="nav-item p-3">
						<a class="nav-link text-light" href="#" onClick={() => navigate("/termsServices")}>Terms & Services </a>
					</li>
					<li class="nav-item p-3 text-light">About Us</li>
				</ul>
				<div class="b-example-divider"></div>
					<p class="text-center text-light">&copy; 2023 4Geeks Academy</p>		
			</footer>
		</div>
	)
};
