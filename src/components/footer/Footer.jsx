import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        
        <div className="footer-left">
          <h1 className='Funiro'>Funiro</h1>
          <p className="footer-address">
            400 University Drive Suite 200 Coral Gables, <br />
            FL 33134 USA
          </p>
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <p className='links'>Links</p>
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="footer-column">
            <p className='help'>Help</p>
            <Link to="/payment-options">Payment Options</Link>
            <Link to="/returns">Returns</Link>
            <Link to="/privacy-policies">Privacy Policies</Link>
          </div>
          <div className="footer-newsletter">
            <p className='newsletter'>Newsletter</p>
            <div> 
               <input
              type="email"
              placeholder="Enter Your Email Address"
              className="newsletter-input"
            />&nbsp;&nbsp;
            <button className="subscribe-btn">SUBSCRIBE</button>
            </div>
           
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <hr />
        <p>&#169; 2025 funiro. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
