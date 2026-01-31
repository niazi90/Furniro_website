import React, { useState } from 'react';
import './contactForm.css';
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { GoClockFill } from "react-icons/go";
import Banner_components from '../../components/banner_components/Banner_components';
import Acheivemnt from '../../components/achivement/Achivement';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResponseMessage('');

        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setResponseMessage(data.message || 'Message sent successfully!');
                // Clear form after successful submission
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            } else {
                setError(data.error || 'Failed to send message. Please try again.');
            }
        } catch (err) {
            setError('Network error. Please check your connection and try again.');
            console.error('Error submitting form:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Banner_components heading={"Contact"} para={"contact"} />
            <div className="contact-container">
                <div className="contact-content">
                    <div className="contact-header">
                        <h2>Get In Touch With Us</h2>
                        <p className="contact-description">
                            For More Information About Our Product & Services. Please Feel Free To Drop Us
                            An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
                        </p>
                    </div>

                    <div className="contact-details">
                        <div className='contact_icon'>
                         <div className='info-section-icon' > < FaLocationDot /></div>
                            <div className='info-section-icon'> < FaPhoneAlt /></div>
                            <div className='info-section-icon'> < GoClockFill /></div></div>

                        <div className="contact-info">
                           
                            <div className="info-section">


                                <h3>Address</h3>

                                <p>236 5th SE Avenue, New York NY10000, United States</p>
                            </div>

                            <div className="info-section">
                                <h3>Phone</h3>
                                <p>Mobile: +(84) 546-6789</p>
                                <p>Hotline: +(84) 456-6789</p>
                            </div>

                            <div className="info-section">
                                <h3>Working Time</h3>
                                <p>Monday-Friday: 9:00 - 22:00</p>
                                <p>Saturday-Sunday: 9:00 - 21:00</p>
                            </div>
                        </div>

                        <div className="contact-form-container">
                            <form className="contact-form" onSubmit={handleSubmit}>
                                {responseMessage && (
                                    <div style={{ 
                                        padding: '16px', 
                                        backgroundColor: '#d4edda', 
                                        color: '#155724', 
                                        borderRadius: '8px',
                                        marginBottom: '20px',
                                        border: '1px solid #c3e6cb'
                                    }}>
                                        {responseMessage}
                                    </div>
                                )}

                                {error && (
                                    <div style={{ 
                                        padding: '16px', 
                                        backgroundColor: '#f8d7da', 
                                        color: '#721c24', 
                                        borderRadius: '8px',
                                        marginBottom: '20px',
                                        border: '1px solid #f5c6cb'
                                    }}>
                                        {error}
                                    </div>
                                )}

                                <div className="form-group">
                                    <label htmlFor="name">Your name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Abc"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Abc@def.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject">Subject <span className="optional">(This is an optional)</span></label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        placeholder="Optional subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        placeholder="Hi! I'd like to ask about"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                <button type="submit" className="submit-btn" disabled={loading}>
                                    {loading ? 'Sending...' : 'Submit'}
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