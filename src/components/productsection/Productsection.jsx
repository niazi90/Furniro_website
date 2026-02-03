<<<<<<< Updated upstream
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
=======
import React, { useState, useEffect } from "react";
import { productsAPI, cartAPI } from '../../services/api';
import './Productsection.css';
import { useNavigate } from 'react-router-dom';

const ProductSection = ({ text, filters, onPaginationChange }) => {  // ← onPaginationChange add kiya
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
>>>>>>> Stashed changes
  const [activeCard, setActiveCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const navigate = useNavigate();
  const productsPerPage = 8;

<<<<<<< Updated upstream
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
=======
  useEffect(() => {
    setCurrentPage(1);
    fetchProducts(1);
  }, [filters]);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const fetchProducts = async (page) => {
    try {
      setLoading(true);

      const params = {
        limit: productsPerPage,
        page: page
      };

      if (filters?.category && filters.category !== 'All') {
        params.category = filters.category;
      }

      if (filters?.sort && filters.sort !== 'Newest') {
        params.sort = filters.sort === 'Newest' ? 'newest' : filters.sort;
      }

      const response = await productsAPI.getAll(params);

      const productsWithFullImage = response.data.data.map(product => ({
        ...product,
        image: product.image
          ? `http://localhost:5000/uploads/${product.image}`
          : '/placeholder.png'
      }));

      setProducts(productsWithFullImage);
      setTotalProducts(response.data.pagination.total);
      setTotalPages(response.data.pagination.pages);

      // ← Filter ko pagination info bheja
      if (onPaginationChange) {
        onPaginationChange({
          currentPage: page,
          totalProducts: response.data.pagination.total,
          productsPerPage: productsPerPage
        });
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (e, productId) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await cartAPI.addItem(productId, 1);
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart');
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // ← page change hone pe bhi update bheja
      if (onPaginationChange) {
        onPaginationChange({
          currentPage: page,
          totalProducts: totalProducts,
          productsPerPage: productsPerPage
        });
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  if (loading) return <div>Loading products...</div>;
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
                setActiveCard(activeCard === feature.id ? null : feature.id);
=======
                setActiveCard(activeCard === product._id ? null : product._id);
              } else {
                handleProductClick(product._id);
>>>>>>> Stashed changes
              }
            }}
            style={{ cursor: 'pointer' }}
          >
            {/* Discount */}
            {feature.discount_text && (
              <div className="discount-price">
                <p className="discount-text">{feature.discount_text}</p>
              </div>
            )}

            <img src={feature.image} alt={feature.image_title} />
            <div className="product-info">
<<<<<<< Updated upstream
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
=======
              <h3>{product.title}</h3>
              <p>{product.subtitle}</p>
              <span className="price">Rs. {product.price.toLocaleString()}</span>
              {product.discount >= 0 && (
                <span className="discount">Rs. {product.discount.toLocaleString()}</span>
              )}

              <div className="hover-overlay">
                <button
                  className="add-to-cart"
                  onClick={(e) => handleAddToCart(e, product._id)}
                >
                  Add to cart
                </button>
                <div className="actions">
                  <span onClick={(e) => e.stopPropagation()}>Share</span>
                  <span onClick={(e) => e.stopPropagation()}>Compare</span>
                  <span onClick={(e) => e.stopPropagation()}>Like</span>
>>>>>>> Stashed changes
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
<<<<<<< Updated upstream
      <button className="show-more">Show More</button>
=======

      {/* ===== PAGINATION — "pagination-info" div remove kiya ===== */}
      {totalPages > 1 && (
        <div className="pagination-wrapper">
          <div className="pagination-controls">
            <button
              className={`pagination-btn pagination-prev ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Prev
            </button>

            <div className="pagination-numbers">
              {getPageNumbers().map((page, index) => (
                page === '...' ? (
                  <span key={`dots-${index}`} className="pagination-dots">...</span>
                ) : (
                  <button
                    key={page}
                    className={`pagination-num ${currentPage === page ? 'active' : ''}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                )
              ))}
            </div>

            <button
              className={`pagination-btn pagination-next ${currentPage === totalPages ? 'disabled' : ''}`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      )}
>>>>>>> Stashed changes
    </div>
  );
};

export default ProductSection;