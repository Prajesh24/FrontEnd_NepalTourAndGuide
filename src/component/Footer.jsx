
import React from "react";
import facebook from './../assets/icons8-facebook-48 (1).png';
import insta from './../assets/icons8-instagram-48 (1).png';
import twitter from './../assets/icons8-x-48.png';
import youtube from './../assets/icons8-youtube-48.png';
import './../style/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Us Section */}
        <div className="footer-about">
          <h3>About Us</h3>
          <p >
            At Nepal Tour and Guide, we are dedicated to providing you with exceptional travel experiences. Our expert team is here to assist you in exploring the beauty of Nepal and crafting unforgettable adventures.
          </p>
    
        </div>

        {/* Quick Links Section */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#places-to-visit">Places To Visit</a></li>
            <li><a href="#things-to-do">Things To Do</a></li>

            <li><a href="#aboutus">About Us</a></li>
            
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>If you have any questions or need assistance, feel free to reach out to us. We're here to help!</p>
          <p>
            <span className="icon">📍</span> Kathmandu, Nepal
          </p>
          <p>
            <span className="icon">✉️</span> info@nepaltourandguide.com
            9876543210
          </p>
         
        </div>

        {/* Follow Us Section */}
        <div className="footer-social">
          <h3 className="footer-heading">Follow Us</h3>
       
         
              <a href="https://www.facebook.com/" target="blank">
                <img src={facebook} alt="Facebook" className="social-logo" /> Facebook
              </a>
        
           
              <a href="https://www.instagram.com/" target="blank">
                <img src={insta} alt="Instagram" className="social-logo" /> Instagram
              </a>
            
              <a href="https://x.com/?lang=en" target="blank">
                <img src={twitter} alt="Twitter" className="social-logo" /> Twitter
              </a>
            
              <a href="https://www.youtube.com/" target="blank"> 
                <img src={youtube} alt="YouTube" className="social-logo" /> YouTube
              </a>
         
        </div>
        
      </div>

  

      {/* Footer Bottom Section */}
      <div className="footer-bottom">
        <p>© Nepal Tour and Guide 2025 &nbsp; | &nbsp; <a href="#">Privacy Policy</a></p>
      </div>
    </footer>
  );
};

export default Footer;
