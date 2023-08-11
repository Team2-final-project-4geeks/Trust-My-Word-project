import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/footer.css";

export const Footer = () => {

	const navigate =  useNavigate()
	
	return (
		<div class="footer bg-black d-flex flex-column">
			<footer class="mt-auto">
				<ul class="nav justify-content-center border-bottom">
					<li class="nav-item px-3">
						<a class="nav-link text-light" href="#" onClick={() => navigate("/")}>Home </a>
					</li>
					<li class="nav-item px-3">
						<a class="nav-link text-light" href="#" onClick={() => navigate("/privacy-policy")}>Privacy Policy </a>	
					</li>
					<li class="nav-item px-3">
						<a class="nav-link text-light" href="#" onClick={() => navigate("/termsServices")}>Terms & Services </a>
					</li>
				</ul>
				<div class="b-example-divider my-1"></div>
					<p class="text-center text-light">&copy; 2023 4Geeks Academy</p>		
			</footer>
		</div>
		</div>
	)
};
