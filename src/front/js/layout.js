import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";


import { Home } from "./pages/home.js";
import { Single } from "./pages/single";
import Login from "./pages/login.js";
import injectContext from "./store/appContext";
import CreateAcount from "./pages/create_acount.js";
import SingleTrip from "./pages/singleTrip.js";
import { SingleProduct } from "./pages/singleproduct.js";
import {Products} from "./pages/products.js";
import {Privacy_policy} from "./pages/privacy_policy.js";
import { TermsServices } from "./pages/termsServices.js";
import SingleActivity from "./pages/singleActivity.jsx";
import { Navbar } from "./component/navbar.js";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<SingleTrip />} path="/trip/:id" />
                        <Route element={<CreateAcount />} path="/create-user"/>                   
                        <Route element={<SingleProduct />} path="/product/:id" />
                        <Route element={<Products/>} path="/products"/>
                        <Route element={<Privacy_policy />} path="/privacy-policy" />
                        <Route element={<TermsServices/>} path="/termsServices" />
                        <Route element={<SingleActivity />} path="/activity/:id" />                        
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
