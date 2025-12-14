import React from 'react';
import './Footer.css';

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
            <a href="/home">Home</a>
            <a href="/shop">Shop</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </div>
          <div className="footer-column">
            <p className='help'>Help</p>
            <a href="/payment-options">Payment Options</a>
            <a href="/returns">Returns</a>
            <a href="/privacy-policies">Privacy Policies</a>
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
