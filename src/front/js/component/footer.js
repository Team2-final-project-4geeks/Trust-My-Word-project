import React, { Component } from "react";
import { Link } from "react-router-dom";


export const Footer = () => {
	
	return (
		<div class="container">
			<footer class="py-3 my-4">
				<ul class="nav justify-content-center border-bottom pb-3 mb-3">
					<li class="nav-item p-3">
						<a class="nav-link" href="#" onClick={() => navigate("/")}>Home </a>
					</li>
					<li class="nav-item p-3">
						<a class="nav-link" href="#" onClick={() => navigate("/privacy_policy")}>Privacy Policy </a>	
					</li>
					<li class="nav-item p-3">
						<a class="nav-link" href="#" onClick={() => navigate("/terms&services")}>Terms & Services </a>
					</li>
					<li class="nav-item"><a href="#" class="nav-link px-2 text-muted">FAQs</a></li>
					<li class="nav-item"><a href="#" class="nav-link px-2 text-muted">About Us</a></li>
				</ul>
				<div class="b-example-divider"></div>
					<p class="text-center text-muted">&copy; 2023 4Geeks Academy</p>		
			</footer>
		</div>
	)
};
