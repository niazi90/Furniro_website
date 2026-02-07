import React, { useState } from 'react';
import './contactForm.css';
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { GoClockFill } from "react-icons/go";
import Banner_components from '../../components/banner_components/Banner_components';
import Acheivemnt from '../../components/achivement/Achivement';
import { contactAPI } from '../../services/api';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fill in all required fields'
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({
        type: 'error',
        message: 'Please enter a valid email address'
      });
      return;
    }

    try {
      setSubmitting(true);
      setSubmitStatus({ type: '', message: '' });
      
      console.log('📧 Submitting contact form:', formData);
      
      const response = await contactAPI.submit(formData);
      
      console.log('✅ Contact form response:', response.data);
      
      setSubmitStatus({
        type: 'success',
        message: 'Thank you for contacting us! We will get back to you soon.'
      });
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setSubmitStatus({ type: '', message: '' });
      }, 3000);
      
    } catch (error) {
      console.error('❌ Error submitting contact form:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      let errorMessage = 'Failed to submit form. Please try again.';
      
      if (error.response?.status === 405) {
        errorMessage = 'Service temporarily unavailable. Please try again later or contact us directly.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      setSubmitStatus({
        type: 'error',
        message: errorMessage
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Banner_components heading={"Contact"} para={"contact"} />
      <div className="contact-container_h">
        <div className="contact-content_h">
          <div className="contact-header_h">
            <h2>Get In Touch With Us</h2>
            <p className="contact-description_h">
              For More Information About Our Product & Services. Please Feel Free To Drop Us
              An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
            </p>
          </div>

          <div className="contact-details_h">
            <div className='contact_icon_h'>
              <div className='info-section-icon_h'><FaLocationDot /></div>
              <div className='info-section-icon_h'><FaPhoneAlt /></div>
              <div className='info-section-icon_h'><GoClockFill /></div>
            </div>

            <div className="contact-info_h">
              <div className="info-section_h">
                <h3>Address</h3>
                <p>236 5th SE Avenue, New York NY10000, United States</p>
              </div>

              <div className="info-section_h">
                <h3>Phone</h3>
                <p>Mobile: +(84) 546-6789</p>
                <p>Hotline: +(84) 456-6789</p>
              </div>

              <div className="info-section_h">
                <h3>Working Time</h3>
                <p>Monday-Friday: 9:00 - 22:00</p>
                <p>Saturday-Sunday: 9:00 - 21:00</p>
              </div>
            </div>

            <div className="contact-form-container_h">
              <form className="contact-form_h" onSubmit={handleSubmit}>
                
                {/* Status Message */}
                {submitStatus.message && (
                  <div style={{
                    padding: '12px',
                    marginBottom: '20px',
                    borderRadius: '5px',
                    backgroundColor: submitStatus.type === 'success' ? '#d4edda' : '#f8d7da',
                    color: submitStatus.type === 'success' ? '#155724' : '#721c24',
                    border: `1px solid ${submitStatus.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
                  }}>
                    {submitStatus.message}
                  </div>
                )}

                <div className="form-group_h">
                  <label htmlFor="name">Your name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Abc"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={submitting}
                  />
                </div>

                <div className="form-group_h">
                  <label htmlFor="email">Email address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Abc@def.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={submitting}
                  />
                </div>

                <div className="form-group_h">
                  <label htmlFor="subject">
                    Subject <span className="optional">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Optional subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                </div>

                <div className="form-group_h">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Hi! I'd like to ask about"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={submitting}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="submit-btn_h"
                  disabled={submitting}
                  style={{
                    opacity: submitting ? 0.6 : 1,
                    cursor: submitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {submitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Acheivemnt />
    </>
  );
};

export default ContactForm;