import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";


import { Home } from "./pages/home.js";
import { Single } from "./pages/single";
import Login from "./pages/login.js";
import injectContext from "./store/appContext";
import CreateAcount from "./pages/create_acount.js";
import ShowSingleTourism from "./pages/singleTourism.js";
import { SingleProduct } from "./pages/singleproduct.js";
import {Products} from "./pages/products.js";
import {Privacy_policy} from "./pages/privacy_policy.js";
import { Terms } from "./pages/terms&services.js";

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
                        <Route element={<ShowSingleTourism />} path="/tourism" />
                        <Route element={<CreateAcount />} path="/create-user"/>                   
                        <Route element={<SingleProduct />} path="/singleproduct/:id" />
                        <Route element={<Products />} path="/products" />
                        <Route element={<Privacy_policy />} path="/privacy_policy" />
                        <Route element={<Terms />} path="/terms&services" />
                        <Route element={<SingleActivity />} path="/activity/:id" />                        
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
