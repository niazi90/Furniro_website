import React, { useState, useEffect } from "react";
import { productsAPI, cartAPI } from '../../services/api';
import './Productsection.css';
import { Link } from 'react-router-dom';

const ProductSection = ({ text }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getAll({ limit: 8 });

      // Fix image URL
      const productsWithFullImage = response.data.data.map(product => ({
        ...product,
        image: product.image
          ? `http://localhost:5000/uploads/${product.image}`
          : '/placeholder.png'
      }));

      setProducts(productsWithFullImage);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await cartAPI.addItem(productId, 1);
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart');
    }
  };

  if (loading) return <div>Loading products...</div>;

  return (
    <div className="product-section">
      <h2>{text}</h2>
      <div className="product-container">
        {products.map((product) => (
          <div
            className={`product-card ${activeCard === product._id ? "active" : ""}`}
            key={product._id}
            onClick={() => {
              if (window.innerWidth <= 768) {
                setActiveCard(activeCard === product._id ? null : product._id);
              }
            }}
          >
            {product.discountPercentage && (
              <div className="discount-price">
                <p className="discount-text">{product.discountPercentage}%</p>
              </div>
            )}

            <img src={product.image} alt={product.title} />
            <div className="product-info">
              <h3>{product.title}</h3>
              <p>{product.subtitle}</p>
              <span className="price">Rs. {product.price.toLocaleString()}</span>
              {product.discount > 0 && (
                <span className="discount">Rs. {product.discount.toLocaleString()}</span>
              )}

              <div className="hover-overlay">
                <button 
                  className="add-to-cart"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product._id);
                  }}
                >
                  Add to cart
                </button>
                <div className="actions">
                  <span>Share</span>
                  <span>Compare</span>
                  <span>Like</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="show-more" onClick={fetchProducts}>Show More</button>
    </div>
  );
};

export default ProductSection;
