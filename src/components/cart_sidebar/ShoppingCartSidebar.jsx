import React, { useState } from 'react';
import { X, ShoppingCart } from 'lucide-react';
import './ShoppingCartSidebar.css'
export default function ShoppingCartSidebar({ isOpen, setIsOpen }) {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Asgaard sofa',
      price: 250000.00,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Casaliving Wood',
      price: 270000.00,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'
    }
  ]);

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

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

          
          <div className="cart-items_sidebar">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item_sidebar">
                <div className="item-image-wrapper_sidebar">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="item-image_sidebar"
                  />
                </div>
                
                <div className="item-details_sidebar">
                  <div className="item-header_sidebar">
                    <h3 className="item-name_sidebar">{item.name}</h3>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="remove-btn_sidebar"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  
                  <div className="item-footer_sidebar">
                    <div className="item-quantity_sidebar">
                      <span className="quantity-text_sidebar">{item.quantity}</span>
                      <span className="quantity-separator_sidebar">x</span>
                    </div>
                    <span className="item-price_sidebar">
                      Rs. {item.price.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          
          <div className="cart-footer_sidebar">
            <div className="subtotal-row_sidebar">
              <span className="subtotal-label_sidebar">Subtotal</span>
              <span className="subtotal-amount_sidebar">
                Rs. {subtotal.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="action-buttons_sidebar">
              <button className="action-btn_sidebar">Cart</button>
              <button className="action-btn_sidebar">Checkout</button>
              <button className="action-btn_sidebar">Comparison</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}