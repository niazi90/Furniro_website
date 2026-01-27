import React, { useState } from "react";
import './Productsection.css'; 
import img1 from '/image1.png';
import img2 from '/image2.png';
import img3 from '/image3.png';
import img4 from '/image4.png';
import img5 from '/image5.png';
import img6 from '/image6.png';
import img7 from '/image7.png';
import img8 from '/image8.png';
import { Link } from 'react-router-dom';

const ProductSection = ({ text }) => {
  // product overlay is active on mobile
  const [activeCard, setActiveCard] = useState(null);

  const product = [
    {
      id: 1,
      title: "Syltherine",
      subtitle: "Stylish cafe chair",
      price: "Rp 2.500.000",
      discount: "Rp 3.500.000",
      add_to_cart: "Add to cart",
      discount_text: "-30%",
      share: "Share",
      compare: "Compare",
      like: "Like",
      image: img1,
      image_title: "Syltherine"
    },
    {
      id: 2,
      title: "Leviosa",
      subtitle: "Stylish cafe chair",
      price: "Rp 2.500.000",
      discount: "Rp 3.500.000",
      add_to_cart: "Add to cart",
      discount_text: "-20%",
      share: "Share",
      compare: "Compare",
      like: "Like",
      image: img2,
      image_title: "Leviosa"
    },
    {
      id: 3,
      title: "Lolito",
      subtitle: "Luxury big sofa",
      price: "Rp 7.500.000",
      discount: "Rp 14500.000",
      add_to_cart: "Add to cart",
      discount_text: "-20%",
      share: "Share",
      compare: "Compare",
      like: "Like",
      image: img3,
      image_title: "Luxury big sofa"
    },
    {
      id: 4,
      title: "Respira",
      subtitle: "Outdoor bar table and stool",
      price: "Rp 500.000",
      discount: "",
      add_to_cart: "Add to cart",
      discount_text: "New",
      share: "Share",
      compare: "Compare",
      like: "Like",
      image: img4,
      image_title: ""
    },
    {
      id: 5,
      title: "Grifo",
      subtitle: "Night lamp",
      price: "Rp 1.500.000",
      discount: "",
      add_to_cart: "Add to cart",
      discount_text: "",
      share: "Share",
      compare: "Compare",
      like: "Like",
      image: img5,
      image_title: "Night lamp"
    },
    {
      id: 6,
      title: "Muggo",
      subtitle: "Small mug",
      price: "Rp 1.500.000",
      discount: "",
      add_to_cart: "Add to cart",
      discount_text: "New",
      share: "Share",
      compare: "Compare",
      like: "Like",
      image: img6,
      image_title: ""
    },
    {
      id: 7,
      title: "Pingky",
      subtitle: "Cute bed set",
      price: "Rp 7.000.000",
      discount: "Rp 14.000.00",
      add_to_cart: "Add to cart",
      discount_text: "-50%",
      share: "Share",
      compare: "Compare",
      like: "Like",
      image: img7,
      image_title: ""
    },
    {
      id: 8,
      title: "Potty",
      subtitle: "Minimalist flower pot",
      price: "Rp 500.000",
      discount: "",
      add_to_cart: "Add to cart",
      discount_text: "New",
      share: "Share",
      compare: "Compare",
      like: "Like",
      image: img8,
      image_title: "Minimalist flower pot"
    },
  ];

  return (
    <div className="product-section">
      <h2>{text}</h2>
      <div className="product-container">
        {product.map((feature) => (
          <div
            className={`product-card ${activeCard === feature.id ? "active" : ""}`}
            key={feature.id}
            onClick={() => {
              // Only toggle on mobile (width <= 768px)
              if (window.innerWidth <= 768) {
                setActiveCard(activeCard === feature.id ? null : feature.id);
              }
            }}
          >
            {/* Discount */}
            {feature.discount_text && (
              <div className="discount-price">
                <p className="discount-text">{feature.discount_text}</p>
              </div>
            )}

            <img src={feature.image} alt={feature.image_title} />
            <div className="product-info">
              <h3>{feature.title}</h3>
              <p>{feature.subtitle}</p>
              <span className="price">{feature.price}</span>
              <span className="discount">{feature.discount}</span>

              <div className="hover-overlay">
                <Link to="/cart">
                  <button className="add-to-cart">{feature.add_to_cart}</button>
                </Link>
                <div className="actions">
                  <span>{feature.share}</span>
                  <span>{feature.compare}</span>
                  <span>{feature.like}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="show-more">Show More</button>
    </div>
  );
};

export default ProductSection;
