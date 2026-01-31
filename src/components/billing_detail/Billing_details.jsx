import './Billing_details.css';
import React, { useState, useEffect } from 'react';
import { cartAPI, ordersAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function BillingDetailsForm() {
  const [cart, setCart] = useState({ items: [], subtotal: 0 });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: 'Pakistan',
    streetAddress: '',
    townCity: '',
    province: 'Sindh',
    zipCode: '',
    phone: '',
    email: '',
    additionalInfo: '',
    paymentMethod: 'bank'
  });

  const navigate = useNavigate();

  // Fetch cart on component mount
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await cartAPI.get();
      const data = response.data?.data || { items: [] };

      // Compute subtotal and total safely
      const computedSubtotal = data.items.reduce(
        (sum, item) => sum + ((item.price || item.product?.price || 0) * (item.quantity || 1)),
        0
      );

      setCart({ ...data, subtotal: computedSubtotal, total: computedSubtotal });
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCart({ items: [], subtotal: 0, total: 0 });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ordersAPI.create(formData, formData.paymentMethod);
      alert(`Order placed successfully! Order Number: ${response.data.data.orderNumber}`);
      navigate('/');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  if (!cart) return <div>Loading...</div>;

  return (
    <div className="billing-container_details">
      <div className="billing-wrapper_details">
        <form className="billing-form_details" onSubmit={handleSubmit}>
          <h2 className="form-title_details">Billing details</h2>

          {/* First Name / Last Name */}
          <div className="form-row_details">
            <div className="form-group_details">
              <label className="form-label_details">First Name</label>
              <input
                type="text"
                name="firstName"
                className="form-input_details"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group_details">
              <label className="form-label_details">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="form-input_details"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Other fields */}
          <div className="form-group_details">
            <label className="form-label_details">Company Name (Optional)</label>
            <input
              type="text"
              name="companyName"
              className="form-input_details"
              value={formData.companyName}
              onChange={handleInputChange}
            />
          </div>

          {/* Country / Province */}
          <div className="form-group_details">
            <label className="form-label_details">Country / Region</label>
            <select
              name="country"
              className="form-select_details"
              value={formData.country}
              onChange={handleInputChange}
            >
              <option value="Pakistan">Pakistan</option>
              <option value="India">India</option>
              <option value="Sri Lanka">Sri Lanka</option>
              <option value="Bangladesh">Bangladesh</option>
            </select>
          </div>

          <div className="form-group_details">
            <label className="form-label_details">Street Address</label>
            <input
              type="text"
              name="streetAddress"
              className="form-input_details"
              value={formData.streetAddress}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group_details">
            <label className="form-label_details">Town / City</label>
            <input
              type="text"
              name="townCity"
              className="form-input_details"
              value={formData.townCity}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group_details">
            <label className="form-label_details">Province</label>
            <select
              name="province"
              className="form-select_details"
              value={formData.province}
              onChange={handleInputChange}
            >
              <option value="Sindh">Sindh</option>
              <option value="Punjab">Punjab</option>
              <option value="Balochistan">Balochistan</option>
              <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
            </select>
          </div>

          {/* Zip, Phone, Email */}
          <div className="form-group_details">
            <label className="form-label_details">ZIP code</label>
            <input
              type="text"
              name="zipCode"
              className="form-input_details"
              value={formData.zipCode}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group_details">
            <label className="form-label_details">Phone</label>
            <input
              type="tel"
              name="phone"
              className="form-input_details"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group_details">
            <label className="form-label_details">Email address</label>
            <input
              type="email"
              name="email"
              className="form-input_details"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group_details">
            <input
              type="text"
              name="additionalInfo"
              placeholder="Additional information"
              className="form-input_details"
              value={formData.additionalInfo}
              onChange={handleInputChange}
            />
          </div>

          {/* Payment Method */}
          <div className="payment-methods_details">
            {['bank', 'check', 'delivery'].map((method) => (
              <div className="payment-option_details" key={method}>
                <input
                  type="radio"
                  id={method}
                  name="paymentMethod"
                  value={method}
                  className="payment-radio_details"
                  checked={formData.paymentMethod === method}
                  onChange={handleInputChange}
                />
                <label htmlFor={method} className="payment-label_details">
                  {method === 'bank' && <div className="payment-title_details">Direct Bank Transfer</div>}
                  {method === 'check' && <div className="payment-title_details">Check Payment</div>}
                  {method === 'delivery' && <div className="payment-title_details">Cash On Delivery</div>}
                </label>
              </div>
            ))}
          </div>

          <button type="submit" className="place-order-btn_details">
            Place order
          </button>
        </form>

        {/* Cart / Order Summary */}
        <div className="product-section_details">
          <div className="product-header_details">Product</div>
          {cart.items.map((item) => {
            const itemPrice = item.price || item.product?.price || 0;
            return (
              <div className="product-item_details" key={item._id}>
                <span className="product-name_details">
                  {item.product?.title} <span className="product-quantity_details">x {item.quantity}</span>
                </span>
                <span className="product-price_details">
                  Rs. {(itemPrice * (item.quantity || 1)).toLocaleString()}
                </span>
              </div>
            );
          })}

          <div className="total-row_details">
            <span className="total-label_details">Total</span>
            <span className="total-value_details">
              Rs. {(cart.total || cart.subtotal || 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
