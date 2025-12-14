import React from 'react';
import { FaUser, FaSearch, FaHeart, FaShoppingCart } from 'react-icons/fa'; // Importing React Icons
import './Navbar.css';

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
        <li><a href="/">Home</a></li>
        <li><a href="/shop">Shop</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
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
