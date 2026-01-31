import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { cartAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import './ShoppingCartSidebar.css';
import { getImageUrl } from '../../utils/imageUrl';

export default function ShoppingCartSidebar({ isOpen, setIsOpen }) {
  const [cart, setCart] = useState({ items: [], subtotal: 0 });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) fetchCart();
  }, [isOpen]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await cartAPI.get();
      const data = res.data?.data || { items: [], subtotal: 0 };

      // Compute subtotal if not provided
      const computedSubtotal = data.items.reduce(
        (sum, item) => sum + ((item.price || item.product?.price || 0) * (item.quantity || 1)),
        0
      );

      setCart({ ...data, subtotal: computedSubtotal });
    } catch (err) {
      console.error('Cart fetch error:', err);
      setCart({ items: [], subtotal: 0 });
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id) => {
    try {
      await cartAPI.removeItem(id);
      fetchCart();
    } catch (err) {
      console.error('Remove item error:', err);
    }
  };

  if (!cart) return null;

  return (
    <div className={`cart-container_sidebar ${isOpen ? 'open' : ''}`}>
      <div className="cart-sidebar_sidebar">

        {/* HEADER */}
        <div className="cart-header_sidebar">
          <h2>Shopping Cart</h2>
          <button className="cart-icon_sidebar" onClick={() => setIsOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* ITEMS */}
        <div className="cart-items_sidebar">
          {loading ? (
            <p>Loading...</p>
          ) : cart.items.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart.items.map((item) => {
              const itemPrice = item.price || item.product?.price || 0;
              const itemTotal = itemPrice * (item.quantity || 1);

              return (
                <div key={item._id} className="cart-item_sidebar">

                  <div className="item-image-wrapper_sidebar">
                    <img
                      className="item-image_sidebar"
                      src={getImageUrl(item.product?.image)}
                      alt={item.product?.title || 'Product'}
                    />
                  </div>

                  <div className="item-details_sidebar">
                    <div className="item-header_sidebar">
                      <h4 className="item-name_sidebar">{item.product?.title || 'Product'}</h4>
                      <button className="remove-btn_sidebar" onClick={() => removeItem(item._id)}>
                        <X size={16} />
                      </button>
                    </div>

                    <div className="item-footer_sidebar">
                      <span>
                        {item.quantity || 1} × Rs. {itemPrice.toLocaleString()} = Rs. {itemTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                </div>
              );
            })
          )}
        </div>

        {/* FOOTER */}
        <div className="cart-footer_sidebar">
          <div className="subtotal-row_sidebar">
            <span>Subtotal</span>
            <span>Rs. {(cart.subtotal || 0).toLocaleString()}</span>
          </div>

          <div className="action-buttons_sidebar">
            <button className="action-btn_sidebar" onClick={() => navigate('/cart')}>Cart</button>
            <button className="action-btn_sidebar" onClick={() => navigate('/checkout')}>Checkout</button>
          </div>
        </div>

      </div>
    </div>
  );
}
