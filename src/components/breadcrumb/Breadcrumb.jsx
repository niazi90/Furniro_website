import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumb.css';

const Breadcrumb = ({ productName }) => {
  return (
    <div className="breadcrumb-container">
      <div className="breadcrumb-wrapper">
        <Link to="/" className="breadcrumb-link">Home</Link>
        <span className="breadcrumb-separator">›</span>
        <Link to="/shop" className="breadcrumb-link">shop</Link>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-current">{productName || 'Product'}</span>
      </div>
    </div>
  );
};

export default Breadcrumb;
