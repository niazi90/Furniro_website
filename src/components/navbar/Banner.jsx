import { Link } from 'react-router-dom';
import React from 'react';
import './Banner.css'; // Importing the CSS file

const Banner = () => {
  return (
    <div className="banner">
      <div className="content">
        <h1>New Arrival</h1>
        <h2>Discover Our New Collection</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus
          nec ullamcorper mattis.
        </p>
        <Link to='/single_product'> <button>BUY NOW </button></Link>
      </div>
    </div>
  );
};

export default Banner;
