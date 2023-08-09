import React from "react"
import { useNavigate } from "react-router-dom";

import "../../styles/termsServices.css";


export const TermsServices = () =>{

    const navigate =  useNavigate()

    return (

<div className="termsServices">
  <h1>Sample Website Terms and Conditions Template</h1>
    <p>
      Please read these terms and conditions carefully before using <strong>TrustMyWord</strong> website operated by TrustMyWord Company.
    </p>

  <h2>Conditions of Use</h2>
    <p>
      By using this website, you certify that you have read and reviewed this Agreement and that you agree to comply with its terms. If you do not want to be bound by the terms of this Agreement, you are advised to stop using the website accordingly. TrustMyWord Company only grants use and access to this website, its products, and its services to those who have accepted its terms.
    </p>

  <h2>Privacy Policy</h2>
    <p>
      Before you continue using our website, we advise you to read our privacy <a class="nav-link text-light" href="#" onClick={() => navigate("/privacy-policy")}>Privacy Policy</a> regarding our user data collection. It will help you better understand our practices.
    </p>

  <h2>Age Restriction</h2>
    <p>
      You must be at least 18 years of age before you can use this website. By using this website, you warrant that you are at least 18 years of age and you may legally adhere to this Agreement. TrustMyWord Company assumes no responsibility for liabilities related to age misrepresentation.
    </p>

  <h2>Intellectual Property</h2>
    <p>
      You agree that all materials, products, and services provided on this website are the property of TrustMyWord Company, its affiliates, directors, officers, employees, agents, suppliers, or licensors, including all copyrights, trade secrets, trademarks, patents, and other intellectual property. You also agree that you will not reproduce or redistribute TrustMyWord Company's intellectual property in any way, including electronic, digital, or new trademark registrations.
    </p>
    <p>
      You grant TrustMyWord Company a royalty-free and non-exclusive license to display, use, copy, transmit, and broadcast the content you upload and publish. For issues regarding intellectual property claims, you should contact the company to come to an agreement.
    </p>

  <h2>User Accounts</h2>
    <p>
      As a user of this website, you may be asked to register with us and provide private information. You are responsible for ensuring the accuracy of this information and maintaining the safety and security of your identifying information. You are also responsible for all activities that occur under your account or password. If you think there are any possible issues regarding the security of your account on the website, inform us immediately so we may address them accordingly.
    </p>
    <p>
      We reserve all rights to terminate accounts, edit or remove content, and cancel orders at our sole discretion.
    </p>

  <h2>Applicable Law</h2>
    <p>
      By using this website, you agree that the laws of the UE, without regard to principles of conflict laws, will govern these terms and conditions or any dispute of any sort that might come between TrustMyWord Company and you, or its business partners and associates.
    </p>

  <h2>Disputes</h2>
    <p>
      Any dispute related in any way to your use of this website or products you purchase from us shall be arbitrated by state or federal court UE, and you consent to the exclusive jurisdiction and venue of such courts.
    </p>

  <h2>Indemnification</h2>
    <p>
      You agree to indemnify TrustMyWord Company and its affiliates and hold TrustMyWord Company harmless against legal claims and demands that may arise from your use or misuse of our services. We reserve the right to select our legal counsel.
    </p>

  <h2>Limitation on Liability</h2>
    <p>
      TrustMyWord Company is not liable for any damages that may occur to you as a result of your misuse of our website.
    </p>

    <p>
      TrustMyWord Company reserves the right to edit, modify, and change this Agreement at any time. We shall let our users know of these changes through electronic mail. This Agreement is an understanding between TrustMyWord Company and the user, and this supersedes and replaces all prior agreements regarding the use of this website.
    </p>

    <button type="button" className="btn-terms btn-secondary" onClick={() => navigate("/")}>Home</button>
</div>
);
}