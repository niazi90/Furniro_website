import React, { useState, useEffect } from "react";
import { productsAPI, cartAPI } from '../../services/api';
import './Productsection.css';
import { useNavigate } from 'react-router-dom';

const ProductSection = ({ text, filters, onPaginationChange }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCard, setActiveCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const navigate = useNavigate();
  const productsPerPage = 8;

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

  return (
    <div className="product-section">
      <h2>{text}</h2>
      <div className="product-container">
        {products.map((product) => (
          <div
            className={`product-card ${activeCard === product._id ? "active" : ""}`}
            key={product._id}
            onClick={() => {
              // Only toggle on mobile (width <= 768px)
              if (window.innerWidth <= 768) {
                setActiveCard(activeCard === product._id ? null : product._id);
              } else {
                handleProductClick(product._id);
              }
            }}
            style={{ cursor: 'pointer' }}
          >
            {/* Discount */}
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
                  onClick={(e) => handleAddToCart(e, product._id)}
                >
                  Add to cart
                </button>
                <div className="actions">
                  <span onClick={(e) => e.stopPropagation()}>Share</span>
                  <span onClick={(e) => e.stopPropagation()}>Compare</span>
                  <span onClick={(e) => e.stopPropagation()}>Like</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
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
    </div>
  );
};

export default ProductSection;