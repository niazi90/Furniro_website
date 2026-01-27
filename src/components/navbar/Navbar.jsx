import React, { useState } from 'react';
import { FaUser, FaSearch, FaHeart, FaShoppingCart, FaBars } from 'react-icons/fa';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ setIsCartOpen }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/logo.png" alt="Furniro Logo" className="logo-image" />
        <span className="logo-text">Furniro</span>
      </div>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link></li>
        <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
        <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
      </ul>

      <div className="icons">
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars className="icon" />
        </div>

        <FaUser className="icon" />
        <FaSearch className="icon" />
        <FaHeart className="icon" />
        <div className="cart-icon" onClick={() => setIsCartOpen(true)}>
          <FaShoppingCart className="icon" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
