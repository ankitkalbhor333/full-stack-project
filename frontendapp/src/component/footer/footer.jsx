import React from "react";
import "./footer.css";
import { assets } from "../../assets/asset.js";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        {/* Left Section */}
        <div className="footer-content-left">
          <img src={assets.logo} alt="logo" className="footer-logo" />
          <p>
          “Connecting you with delicious, affordable, and hygienic meals — fresh from restaurants to your doorstep.”
          </p>
          <div className="footer-social-icon">
            <a href="#"><img src={assets.whatappicon} alt="whatsapp" /></a>
            <a href="#"><img src={assets.facebookicon} alt="facebook" /></a>
            <a href="#"><img src={assets.youtubeicon} alt="youtube" /></a>
          </div>
        </div>

        {/* Middle Section */}
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#delivery">Delivery</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="footer-content-right">
          <h2>Get In Touch</h2>
          <ul>
            <li><a href="tel:+918817457938">+91 8817457938</a></li>
            <li><a href="mailto:ankitkalbhor3@gmail.com">ankitkalbhor3@gmail.com</a></li>
          </ul>
        </div>
      </div>

      <hr />
      <p className="footer-copyright">
        © 2025 Food_Connect. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
