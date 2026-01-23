import React from 'react';
import { FaUser, FaSearch, FaHeart, FaShoppingCart } from 'react-icons/fa'; // Importing React Icons
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Left: Logo with Image */}
      <div className="logo">
        <img src="/logo.png" alt="Furniro Logo" className="logo-image" /> {/* Add your logo image path */}
        <span className="logo-text">Furniro</span>
      </div>

      {/* Center: Navigation Links */}
      <ul className="nav-links">


        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
       
        
        
      </ul>

      {/* Right: Icons using React Icons */}
      <div className="icons">
        <div className="user-icon"><FaUser className="icon" /></div>
        <div className="search-icon"><FaSearch className="icon" /></div>
        <div className="wishlist-icon"><FaHeart className="icon" /></div>
        <div className="cart-icon"><FaShoppingCart className="icon" /></div>
      </div>
    </nav>
  );
};

export default Navbar;
