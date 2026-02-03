import React, { useState, useEffect } from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cartAPI } from '../../services/api';
import { getImageUrl } from '../../utils/imageUrl';
import './ShoppingCartSidebar.css';

export default function ShoppingCartSidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchCart();
    }
  }, [isOpen]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await cartAPI.get();
      setCartItems(response.data?.data?.items || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id) => {
    try {
      await cartAPI.removeItem(id);
      fetchCart();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.price || item.product?.price || 0;
    const quantity = item.quantity || 1;
    return sum + (price * quantity);
  }, 0);

  const handleCartClick = () => {
    setIsOpen(false);
    navigate('/cart');
  };

  const handleCheckoutClick = () => {
    setIsOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      <div className={`cart-container_sidebar ${isOpen ? "open" : ""}`}>
        <div className="cart-sidebar_sidebar">
          {/* Header */}
          <div className="cart-header_sidebar">
            <h2 className="cart-title_sidebar">Shopping Cart</h2>
            <button className="cart-icon_sidebar" onClick={() => setIsOpen(false)}>
              <X size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="cart-items_sidebar">
            {loading ? (
              <p style={{ textAlign: 'center', padding: '20px' }}>Loading...</p>
            ) : cartItems.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '20px' }}>Your cart is empty</p>
            ) : (
              cartItems.map((item) => {
                const price = item.price || item.product?.price || 0;
                const product = item.product || {};
                
                return (
                  <div key={item._id} className="cart-item_sidebar">
                    <div className="item-image-wrapper_sidebar">
                      <img 
                        src={getImageUrl(product.image)} 
                        alt={product.title || 'Product'}
                        className="item-image_sidebar"
                      />
                    </div>
                    
                    <div className="item-details_sidebar">
                      <div className="item-header_sidebar">
                        <h3 className="item-name_sidebar">{product.title || 'Product'}</h3>
                        <button
                          onClick={() => removeItem(item._id)}
                          className="remove-btn_sidebar"
                        >
                          <X size={18} />
                        </button>
                      </div>
                      
                      <div className="item-footer_sidebar">
                        <div className="item-quantity_sidebar">
                          <span className="quantity-text_sidebar">{item.quantity || 1}</span>
                          <span className="quantity-separator_sidebar">x</span>
                        </div>
                        <span className="item-price_sidebar">
                          Rs. {price.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="cart-footer_sidebar">
            <div className="subtotal-row_sidebar">
              <span className="subtotal-label_sidebar">Subtotal</span>
              <span className="subtotal-amount_sidebar">
                Rs. {subtotal.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="action-buttons_sidebar">
              <button className="action-btn_sidebar" onClick={handleCartClick}>
                Cart
              </button>
              <button className="action-btn_sidebar" onClick={handleCheckoutClick}>
                Checkout
              </button>
              <button className="action-btn_sidebar">Comparison</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}