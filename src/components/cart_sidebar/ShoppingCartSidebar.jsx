import React, { useState } from 'react';
import { X, ShoppingCart } from 'lucide-react';
import './ShoppingCartSidebar.css'
export default function ShoppingCartSidebar() {
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
   

      <div className="cart-container">
        <div className="cart-sidebar">
          {/* Header */}
          <div className="cart-header">
            <h2 className="cart-title">Shopping Cart</h2>
            <button className="cart-icon">
              <ShoppingCart size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image-wrapper">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="item-image"
                  />
                </div>
                
                <div className="item-details">
                  <div className="item-header">
                    <h3 className="item-name">{item.name}</h3>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="remove-btn"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  
                  <div className="item-footer">
                    <div className="item-quantity">
                      <span className="quantity-text">{item.quantity}</span>
                      <span className="quantity-separator">x</span>
                    </div>
                    <span className="item-price">
                      Rs. {item.price.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="cart-footer">
            <div className="subtotal-row">
              <span className="subtotal-label">Subtotal</span>
              <span className="subtotal-amount">
                Rs. {subtotal.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="action-buttons">
              <button className="action-btn">Cart</button>
              <button className="action-btn">Checkout</button>
              <button className="action-btn">Comparison</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}