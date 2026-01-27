import './Billing_details.css'
import React, { useState } from 'react';
export default function BillingDetailsForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: 'Sri Lanka',
    streetAddress: '',
    townCity: '',
    province: 'Western Province',
    zipCode: '',
    phone: '',
    email: '',
    additionalInfo: '',
    paymentMethod: 'bank'
  });

  const handleInputChange = (e) => {
    const { name, value } = e;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Order placed:', formData);
    alert('Order placed successfully!');
  };

  return (
    <>
    

      <div className="billing-container_details">
        <div className="billing-wrapper_details">
          
          <div className="billing-form_details">
            <h2 className="form-title_details">Billing details</h2>

            <div className="form-row_details">
              <div className="form-group_details">
                <label className="form-label_details">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-input_details"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange(e.target)}
                />
              </div>
              <div className="form-group_details">
                <label className="form-label_details">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-input_details"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange(e.target)}
                />
              </div>
            </div>

            <div className="form-group_details">
              <label className="form-label_details">Company Name (Optional)</label>
              <input
                type="text"
                name="companyName"
                className="form-input_details"
                value={formData.companyName}
                onChange={(e) => handleInputChange(e.target)}
              />
            </div>

            <div className="form-group_details">
              <label className="form-label_details">Country / Region</label>
              <select
                name="country"
                className="form-select_details"
                value={formData.country}
                onChange={(e) => handleInputChange(e.target)}
              >
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="India">India</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Bangladesh">Bangladesh</option>
              </select>
            </div>

            <div className="form-group_details">
              <label className="form-label_details">Street address</label>
              <input
                type="text"
                name="streetAddress"
                className="form-input_details"
                value={formData.streetAddress}
                onChange={(e) => handleInputChange(e.target)}
              />
            </div>

            <div className="form-group_details">
              <label className="form-label_details">Town / City</label>
              <input
                type="text"
                name="townCity"
                className="form-input_details"
                value={formData.townCity}
                onChange={(e) => handleInputChange(e.target)}
              />
            </div>

            <div className="form-group_details">
              <label className="form-label_details">Province</label>
              <select
                name="province"
                className="form-select_details"
                value={formData.province}
                onChange={(e) => handleInputChange(e.target)}
              >
                <option value="Western Province">Western Province</option>
                <option value="Central Province">Central Province</option>
                <option value="Southern Province">Southern Province</option>
                <option value="Northern Province">Northern Province</option>
              </select>
            </div>

            <div className="form-group_details">
              <label className="form-label_details">ZIP code</label>
              <input
                type="text"
                name="zipCode"
                className="form-input_details"
                value={formData.zipCode}
                onChange={(e) => handleInputChange(e.target)}
              />
            </div>

            <div className="form-group_details">
              <label className="form-label_details">Phone</label>
              <input
                type="tel"
                name="phone"
                className="form-input_details"
                value={formData.phone}
                onChange={(e) => handleInputChange(e.target)}
              />
            </div>

            <div className="form-group_details">
              <label className="form-label_details">Email address</label>
              <input
                type="email"
                name="email"
                className="form-input_details"
                value={formData.email}
                onChange={(e) => handleInputChange(e.target)}
              />
            </div>

            <div className="form-group_details">
              <input
                type="text"
                name="additionalInfo"
                placeholder="Additional information"
                className="form-input_details"
                value={formData.additionalInfo}
                onChange={(e) => handleInputChange(e.target)}
              />
            </div>
          </div>

          <div className="product-section_details">
            <div className="product-header_details">Product</div>
            <div className="product-item_details">
              <span className="product-name_details">
                Asgaard sofa <span className="product-quantity_details">x 1</span>
              </span>
              <span className="product-price_details">Rs. 250,000.00</span>
            </div>

            <div className="subtotal-row_details">
              <span className="subtotal-label_details">Subtotal</span>
              <span className="subtotal-value_details">Rs. 250,000.00</span>
            </div>

            <div className="total-row_details">
              <span className="total-label_details">Total</span>
              <span className="total-value_details">Rs. 250,000.00</span>
            </div>

            <div className="divider_details"></div>

            <div className="payment-methods_details">
              <div className="payment-option_details">
                <input
                  type="radio"
                  id="bank"
                  name="paymentMethod"
                  value="bank"
                  className="payment-radio_details"
                  checked={formData.paymentMethod === 'bank'}
                  onChange={(e) => handleInputChange(e.target)}
                />
                <label htmlFor="bank" className="payment-label_details">
                  <div className="payment-title_details">Direct Bank Transfer</div>
                  <p className="payment-description_details">
                    Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                  </p>
                </label>
              </div>

              <div className="payment-option_details">
                <input
                  type="radio"
                  id="check"
                  name="paymentMethod"
                  value="check"
                  className="payment-radio_details"
                  checked={formData.paymentMethod === 'check'}
                  onChange={(e) => handleInputChange(e.target)}
                />
                <label htmlFor="check" className="payment-label_details">
                  <div className="payment-title_details">Direct Bank Transfer</div>
                </label>
              </div>

              <div className="payment-option_details">
                <input
                  type="radio"
                  id="delivery"
                  name="paymentMethod"
                  value="delivery"
                  className="payment-radio_details"
                  checked={formData.paymentMethod === 'delivery'}
                  onChange={(e) => handleInputChange(e.target)}
                />
                <label htmlFor="delivery" className="payment-label_details">
                  <div className="payment-title_details">Cash On Delivery</div>
                </label>
              </div>
            </div>

            <p className="payment-note_details">
              Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.
            </p>

            <button className="place-order-btn_details" onClick={handleSubmit}>
              Place order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}